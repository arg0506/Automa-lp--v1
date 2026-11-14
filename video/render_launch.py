# Launch video for Automa. Renders frames with Pillow and encodes with ffmpeg.
#   python render_launch.py            -> writes automa-launch.mp4
#   python render_launch.py --still 12 -> writes a PNG of the frame at 12 seconds
import math
import os
import subprocess
import sys

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFilter, ImageFont

import horse

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "assets")
W, H = 1920, 1080
FPS = 30
# Scene start times in seconds. Everything below reads from here.
TL = {
    "headline": 2.6, "horse": 6.4, "reins": 10.6, "bank": 14.8,
    "motifs": 18.6, "landing": 26.0, "docs": 31.0, "outro": 35.4, "end": 41.4,
}
TOTAL = TL["end"]
BG = (7, 7, 10)
INK = (255, 255, 255)
MUTED = (154, 154, 165)
DIM = (113, 113, 122)
VIOLET = (139, 92, 246)
EMERALD = (52, 211, 153)

FONTS = "C:/Windows/Fonts/"
SERIF = FONTS + "georgia.ttf"
SERIF_I = FONTS + "georgiai.ttf"
SANS = FONTS + "bahnschrift.ttf"
MONO = FONTS + "consola.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


def ease_out(t):
    t = min(max(t, 0.0), 1.0)
    return 1 - (1 - t) ** 3


def ease_in_out(t):
    t = min(max(t, 0.0), 1.0)
    return 0.5 * (1 - math.cos(math.pi * t))


def clamp(v, lo=0.0, hi=1.0):
    return max(lo, min(hi, v))


def window(t, start, length):
    # 0..1 progress of t inside [start, start+length]
    return clamp((t - start) / length)


# ---------- static layers ----------

def make_background():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    step = 80
    for x in range(0, W, step):
        d.line([(x, 0), (x, H)], fill=(18, 18, 24), width=1)
    for y in range(0, H, step):
        d.line([(0, y), (W, y)], fill=(18, 18, 24), width=1)
    return img


def make_glow(size=1400, color=VIOLET):
    g = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(g)
    r = size // 2
    for i in range(r, 0, -4):
        a = int(90 * (1 - i / r) ** 2)
        d.ellipse((r - i, r - i, r + i, r + i), fill=color + (a,))
    return g.filter(ImageFilter.GaussianBlur(20))


GLOW = make_glow()
BASE = make_background()


def load_rgba(name):
    return Image.open(os.path.join(ASSETS, name)).convert("RGBA")


def scaled(img, width):
    h = int(img.height * width / img.width)
    return img.resize((width, h), Image.LANCZOS)


def with_opacity(img, k):
    a = img.getchannel("A").point(lambda v: int(v * k))
    out = img.copy()
    out.putalpha(a)
    return out


def paste_rgba(canvas, sprite, x, y):
    canvas.alpha_composite(sprite, (int(x), int(y)))


def spaced_text(draw, x, y, text, fnt, fill, tracking=0):
    cx = x
    for ch in text:
        draw.text((cx, y), ch, font=fnt, fill=fill)
        cx += draw.textlength(ch, font=fnt) + tracking
    return cx


def text_width(text, fnt, tracking=0):
    d = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    return sum(d.textlength(c, font=fnt) + tracking for c in text) - tracking


def new_layer():
    return Image.new("RGBA", (W, H), (0, 0, 0, 0))


def base_frame():
    frame = BASE.convert("RGBA")
    return frame


# ---------- assets ----------

MOTIFS = [
    ("motif-agents-stop.png", "Agents can act.", "Payments still stop them."),
    ("motif-locked.png", "Credentials are too powerful.", "One bug can overspend an unrestricted key."),
    ("motif-budgets.png", "Budgets are fragmented.", "Limits sit across separate tools and dashboards."),
    ("motif-gears.png", "Services aren't built for machines.", "Each one has its own billing and authentication."),
    ("motif-receipt.png", "Actions need accountability.", "Know why each payment was made and what allowed it."),
    ("motif-target.png", "Make machine payments safe.", "Constrained, observable, and revocable."),
]

LANDING = load_rgba("landing.png")
DOCS = load_rgba("documentation.png")
LOGO = load_rgba("Automalogo.png")


# ---------- scenes ----------

def scene_intro(t, canvas):
    # 0 to 3.2s: mono label, then the opening line fades up.
    a = ease_out(window(t, 0.2, 0.8)) * (1 - ease_in_out(window(t, 2.7, 0.5)))
    if a <= 0:
        return
    layer = new_layer()
    d = ImageDraw.Draw(layer)
    label = font(MONO, 26)
    tw = text_width("AUTOMA  /  LAUNCH", label, 6)
    spaced_text(d, (W - tw) / 2, 470, "AUTOMA  /  LAUNCH", label, DIM + (int(255 * a),), 6)
    line = font(SANS, 58)
    s = "AI agents can do more than think."
    lw = text_width(s, line)
    y_off = int(18 * (1 - ease_out(window(t, 0.6, 0.9))))
    d.text(((W - lw) / 2, 530 + y_off), s, font=line, fill=MUTED + (int(255 * a),))
    canvas.alpha_composite(layer)


def scene_headline(t, canvas):
    # 3.2 to 7.6s: the hero headline, word by word.
    fade_out = 1 - ease_in_out(window(t, TL["horse"] - 0.5, 0.5))
    if fade_out <= 0:
        return
    glow_k = 0.55 + 0.25 * math.sin(t * 1.6)
    g = GLOW.copy()
    g.putalpha(g.getchannel("A").point(lambda v: int(v * glow_k * fade_out)))
    paste_rgba(canvas, g, W / 2 - g.width / 2, H / 2 - g.height / 2 - 40)

    sans_big = font(SANS, 118)
    serif_big = font(SERIF_I, 150)
    layer = new_layer()
    d = ImageDraw.Draw(layer)

    line1 = ["Give", "AI", "Agents", "the", "Power", "to"]
    start = 3.3
    total_w = text_width(" ".join(line1), sans_big, 0) + 40
    x = (W - total_w) / 2
    y1 = 380
    for i, word in enumerate(line1):
        p = ease_out(window(t, start + i * 0.12, 0.6))
        alpha = int(255 * p * fade_out)
        dy = int(40 * (1 - p))
        d.text((x, y1 + dy), word, font=sans_big, fill=INK + (alpha,))
        x += d.textlength(word, font=sans_big) + 30

    p2 = ease_out(window(t, start + 0.85, 0.8))
    word2 = "Transact."
    w2 = text_width(word2, serif_big)
    d.text(((W - w2) / 2, 500 + int(50 * (1 - p2))), word2, font=serif_big,
           fill=(228, 228, 231, int(255 * p2 * fade_out)))

    p3 = ease_out(window(t, start + 1.3, 0.7))
    sub = "Automa is building the financial infrastructure for autonomous agents."
    sf = font(SANS, 34)
    sw = text_width(sub, sf)
    d.text(((W - sw) / 2, 740 + int(16 * (1 - p3))), sub, font=sf, fill=MUTED + (int(255 * p3 * fade_out),))

    # Two CTAs, the way the landing page shows them.
    p4 = ease_out(window(t, start + 1.7, 0.6))
    cta_font = font(SANS, 30)
    primary = "Explore Automa"
    pw = text_width(primary, cta_font) + 80
    px = (W - pw - 260) / 2
    d.rounded_rectangle((px, 860, px + pw, 930), radius=10, fill=(255, 255, 255, int(255 * p4 * fade_out)))
    d.text((px + 40, 878), primary, font=cta_font, fill=(7, 7, 10, int(255 * p4 * fade_out)))
    secondary = "Read the Docs"
    sw2 = text_width(secondary, cta_font) + 80
    sx = px + pw + 24
    d.rounded_rectangle((sx, 860, sx + sw2, 930), radius=10, outline=(255, 255, 255, int(60 * p4 * fade_out)), width=2)
    d.text((sx + 40, 878), secondary, font=cta_font, fill=(255, 255, 255, int(255 * p4 * fade_out)))
    canvas.alpha_composite(layer)



def envelope(local, dur):
    return ease_out(window(local, 0.0, 0.5)) * (1 - ease_in_out(window(local, dur - 0.5, 0.5)))


def horse_backdrop(canvas, t, env):
    canvas.alpha_composite(with_opacity(horse.DUSK, env))
    canvas.alpha_composite(with_opacity(horse.landscape(t), env))


def scene_horse(t, canvas, t0=TL["horse"], dur=4.0):
    if t < t0 or t > t0 + dur:
        return
    local = t - t0
    env = envelope(local, dur)
    gt = t - t0
    horse_backdrop(canvas, t, env)
    hl, hand, bit = horse.horse_layer(760, 880, 1.6, t)
    canvas.alpha_composite(with_opacity(hl, env))
    canvas.alpha_composite(with_opacity(horse.dust(t, 760, 880, 1.6), env))
    layer = new_layer()
    d = ImageDraw.Draw(layer)
    a = ease_out(window(local, 0.3, 0.8)) * env
    d.text((1120, 300 + int(20 * (1 - a))), "Give your agent a horse.", font=font(SANS, 62), fill=INK + (int(255 * a),))
    d.text((1120, 390), "It moves on its own.", font=font(SERIF_I, 52), fill=(228, 228, 231, int(255 * a)))
    canvas.alpha_composite(layer)


def scene_reins(t, canvas, t0=TL["reins"], dur=4.2):
    if t < t0 or t > t0 + dur:
        return
    local = t - t0
    env = envelope(local, dur)
    horse_backdrop(canvas, t, env)
    hl, hand, bit = horse.horse_layer(760, 880, 1.6, t)
    canvas.alpha_composite(with_opacity(hl, env))
    # Reins in white, with three policy labels pinned along them.
    rein = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    rd = ImageDraw.Draw(rein)
    rd.line([hand, bit], fill=(255, 255, 255, int(220 * env)), width=3)
    canvas.alpha_composite(rein)
    labels = ["Budget limit", "Approved recipients", "Human approval"]
    rows = [430, 530, 630]
    layer = new_layer()
    d = ImageDraw.Draw(layer)
    lf = font(MONO, 28)
    for i, (text, row) in enumerate(zip(labels, rows)):
        p = ease_out(window(local, 0.5 + i * 0.35, 0.5)) * env
        f = (0.25, 0.5, 0.8)[i]
        px = hand[0] + (bit[0] - hand[0]) * f
        py = hand[1] + (bit[1] - hand[1]) * f
        d.ellipse((px - 6, py - 6, px + 6, py + 6), fill=VIOLET + (int(255 * p),))
        d.line([(px, py), (1150, row + 20)], fill=VIOLET + (int(200 * p),), width=2)
        d.text((1170, row), text, font=lf, fill=INK + (int(255 * p),))
    a = ease_out(window(local, 0.1, 0.7)) * env
    d.text((1120, 260), "You hold the reins.", font=font(SANS, 62), fill=INK + (int(255 * a),))
    d.text((1120, 340), "Limits, recipients, and approvals are yours to set.", font=font(SANS, 30),
           fill=MUTED + (int(255 * a),))
    canvas.alpha_composite(layer)


def scene_bank(t, canvas, t0=TL["bank"], dur=3.8):
    if t < t0 or t > t0 + dur:
        return
    local = t - t0
    env = envelope(local, dur)
    bank = Image.open(os.path.join(ASSETS, "banknotes.jpg")).convert("RGBA")
    ph = 860
    pw = int(bank.width * ph / bank.height)
    panel = bank.resize((pw, ph), Image.LANCZOS)
    drift = math.sin(local * 1.1) * 14
    px, py = 1240, 110 + drift
    mask = Image.new("L", (pw, ph), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, pw, ph), radius=26, fill=int(255 * env))
    panel.putalpha(mask)
    canvas.alpha_composite(panel, (int(px), int(py)))
    layer = new_layer()
    d = ImageDraw.Draw(layer)
    a = ease_out(window(local, 0.2, 0.7)) * env
    d.text((120, 380 + int(18 * (1 - a))), "Agents pay for", font=font(SANS, 84), fill=INK + (int(255 * a),))
    d.text((120, 470 + int(18 * (1 - a))), "what they need.", font=font(SANS, 84), fill=INK + (int(255 * a),))
    d.text((120, 600), "Within the limits you set.", font=font(SERIF_I, 58), fill=(228, 228, 231, int(255 * a)))
    canvas.alpha_composite(layer)


def scene_motifs(t, canvas, t0=TL["motifs"], per=1.2):
    # Six problem motifs, one at a time: the illustration enters, its title and gap follow.
    local = t - t0
    if local < 0 or local >= per * len(MOTIFS):
        return
    idx = int(local // per)
    lt = local - idx * per
    name, title, body = MOTIFS[idx]
    fade_in = ease_out(window(lt, 0.0, 0.35))
    fade_out = 1 - ease_in_out(window(lt, per - 0.3, 0.3))
    k = fade_in * fade_out

    sprite = load_rgba(name)
    size = 640
    sprite = scaled(sprite, size)
    rot = (1 - ease_out(window(lt, 0.0, 0.7))) * -12
    sprite = sprite.rotate(rot, resample=Image.BICUBIC, expand=True)
    sprite = with_opacity(sprite, k)
    scale_k = 0.9 + 0.1 * ease_out(window(lt, 0.0, 0.7))
    if scale_k != 1:
        sprite = sprite.resize((int(sprite.width * scale_k), int(sprite.height * scale_k)), Image.LANCZOS)
    cx, cy = 560, 540
    paste_rgba(canvas, sprite, cx - sprite.width / 2, cy - sprite.height / 2)

    layer = new_layer()
    d = ImageDraw.Draw(layer)
    tx = 1000
    # Title slides in from the right and fades.
    slide = (1 - ease_out(window(lt, 0.15, 0.6))) * 60
    tf = font(SERIF_I, 60)
    ty = 360
    for line in wrap(title, tf, 860):
        d.text((tx + slide, ty), line, font=tf, fill=INK + (int(255 * k * ease_out(window(lt, 0.15, 0.5))),))
        ty += 74
    bf = font(SANS, 34)
    by = ty + 20
    for line in wrap(body, bf, 860):
        d.text((tx + slide, by), line, font=bf, fill=MUTED + (int(255 * k * ease_out(window(lt, 0.3, 0.5))),))
        by += 48

    # Step indicator, bottom right.
    for i in range(len(MOTIFS)):
        x = tx + i * 34
        on = i == idx
        r = 7
        col = VIOLET + (255,) if on else (255, 255, 255, 60)
        d.ellipse((x, 680, x + r * 2, 680 + r * 2), fill=col)
    counter = font(MONO, 26)
    d.text((tx, 640), f"0{idx + 1} / 0{len(MOTIFS)}", font=counter, fill=DIM + (int(255 * k),))
    canvas.alpha_composite(layer)


def wrap(text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if text_width(trial, fnt) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def browser_frame(canvas, src, t, start, dur, label, x, y, w, h, caption=None, caption_font=None):
    # Chrome-style window with the screenshot panned top to bottom.
    alpha = ease_out(window(t, start, 0.6)) * (1 - ease_in_out(window(t, start + dur - 0.5, 0.5)))
    if alpha <= 0:
        return
    bar_h = 56
    layer = new_layer()
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle((x, y, x + w, y + h), radius=18, fill=(14, 14, 19, int(255 * alpha)),
                        outline=(255, 255, 255, int(40 * alpha)), width=2)
    d.rounded_rectangle((x, y, x + w, y + bar_h), radius=18, fill=(22, 22, 30, int(255 * alpha)))
    d.rectangle((x, y + bar_h - 18, x + w, y + bar_h), fill=(22, 22, 30, int(255 * alpha)))
    for i, col in enumerate([(255, 95, 87), (254, 188, 46), (40, 200, 64)]):
        cxp = x + 28 + i * 24
        d.ellipse((cxp - 7, y + 21, cxp + 7, y + 35), fill=col + (int(255 * alpha),))
    pill_w = 520
    d.rounded_rectangle((x + (w - pill_w) / 2, y + 14, x + (w + pill_w) / 2, y + 42), radius=14,
                        fill=(7, 7, 10, int(255 * alpha)))
    lf = font(MONO, 20)
    lw = text_width(label, lf)
    d.text((x + (w - lw) / 2, y + 17), label, font=lf, fill=DIM + (int(255 * alpha),))
    canvas.alpha_composite(layer)

    inner_w = w
    inner_h = h - bar_h
    shot = scaled(src, inner_w)
    max_y = max(shot.height - inner_h, 0)
    p = ease_in_out(window(t, start + 0.6, dur - 1.6))
    oy = int(max_y * p)
    crop = shot.crop((0, oy, inner_w, oy + inner_h))
    crop = with_opacity(crop, alpha)
    mask = Image.new("L", (inner_w, inner_h), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, inner_w, inner_h + 18), radius=18, fill=255)
    mask = mask.point(lambda v: int(v * alpha))
    layer_mask = Image.new("RGBA", (inner_w, inner_h), (0, 0, 0, 0))
    layer_mask.paste(crop, (0, 0), mask)
    canvas.alpha_composite(layer_mask, (int(x), int(y + bar_h)))

    if caption:
        cap = new_layer()
        cd = ImageDraw.Draw(cap)
        cd.text((120, 880), caption, font=caption_font, fill=INK + (int(255 * alpha),))
        canvas.alpha_composite(cap)


def scene_landing(t, canvas, t0=TL["landing"], dur=5.0):
    if t < t0 or t > t0 + dur:
        return
    local = t - t0
    # Left column: kicker and headline, then the frame on the right.
    layer = new_layer()
    d = ImageDraw.Draw(layer)
    a = ease_out(window(local, 0.0, 0.7)) * (1 - ease_in_out(window(local, dur - 0.5, 0.5)))
    kf = font(MONO, 26)
    spaced_text(d, 120, 360, "THE LANDING PAGE", kf, VIOLET + (int(255 * a),), 5)
    hf1 = font(SANS, 72)
    hf2 = font(SERIF_I, 84)
    d.text((120, 420 + int(18 * (1 - a))), "Nine sections.", font=hf1, fill=INK + (int(255 * a),))
    d.text((120, 520 + int(18 * (1 - a))), "One clear story.", font=hf2, fill=(228, 228, 231, int(255 * a)))
    bf = font(SANS, 34)
    d.text((120, 690), "Motion that explains, not decorates.", font=bf, fill=MUTED + (int(255 * a),))
    canvas.alpha_composite(layer)
    browser_frame(canvas, LANDING, t, t0, dur, "automa-landing  /  localhost", 940, 240, 900, 700)


def scene_docs(t, canvas, t0=TL["docs"], dur=4.6):
    if t < t0 or t > t0 + dur:
        return
    local = t - t0
    layer = new_layer()
    d = ImageDraw.Draw(layer)
    a = ease_out(window(local, 0.0, 0.7)) * (1 - ease_in_out(window(local, dur - 0.5, 0.5)))
    kf = font(MONO, 26)
    spaced_text(d, 120, 360, "DOCUMENTATION", kf, VIOLET + (int(255 * a),), 5)
    hf1 = font(SANS, 72)
    hf2 = font(SERIF_I, 84)
    d.text((120, 420 + int(18 * (1 - a))), "Twenty-two sections.", font=hf1, fill=INK + (int(255 * a),))
    d.text((120, 520 + int(18 * (1 - a))), "Eight diagrams.", font=hf2, fill=(228, 228, 231, int(255 * a)))
    bf = font(SANS, 34)
    d.text((120, 690), "Searchable, with a live section highlight.", font=bf, fill=MUTED + (int(255 * a),))
    canvas.alpha_composite(layer)
    browser_frame(canvas, DOCS, t, t0, dur, "automa-docs  /  docs", 940, 240, 900, 700)


def scene_outro(t, canvas, t0=TL["outro"]):
    if t < t0:
        return
    local = t - t0
    a = ease_out(window(local, 0.0, 0.8))
    glow_k = 0.5 + 0.2 * math.sin(local * 1.3)
    g = GLOW.copy()
    g.putalpha(g.getchannel("A").point(lambda v: int(v * glow_k * a)))
    paste_rgba(canvas, g, W / 2 - g.width / 2, H / 2 - g.height / 2 - 60)

    logo = scaled(LOGO, 150)
    logo = with_opacity(logo, a)
    paste_rgba(canvas, logo, W / 2 - logo.width / 2, 250 + 20 * (1 - a))

    layer = new_layer()
    d = ImageDraw.Draw(layer)
    wf = font(SANS, 96)
    word = "AUTOMA"
    tw = text_width(word, wf, 22)
    spaced_text(d, (W - tw) / 2, 430 + 14 * (1 - a), word, wf, INK + (int(255 * a),), 22)
    tf = font(SERIF_I, 52)
    tag = "Financial infrastructure for the agentic economy."
    tgw = text_width(tag, tf)
    d.text(((W - tgw) / 2, 560), tag, font=tf, fill=(228, 228, 231, int(255 * a)))

    b = ease_out(window(local, 1.0, 0.7))
    nf = font(MONO, 26)
    net = "BUILT ON NEAR PROTOCOL"
    nw = text_width(net, nf, 5)
    nx = (W - nw - 40) / 2
    d.ellipse((nx, 690, nx + 14, 704), fill=EMERALD + (int(255 * b),))
    spaced_text(d, nx + 30, 682, net, nf, MUTED + (int(255 * b),), 5)

    c = ease_out(window(local, 1.6, 0.7))
    cf = font(SANS, 34)
    cta = "Explore Automa"
    cw = text_width(cta, cf) + 90
    cx = (W - cw) / 2
    d.rounded_rectangle((cx, 780, cx + cw, 862), radius=12, fill=(255, 255, 255, int(255 * c)))
    d.text((cx + 45, 802), cta, font=cf, fill=(7, 7, 10, int(255 * c)))
    canvas.alpha_composite(layer)


def scene_fade_out(t, canvas):
    # Last half second: fade to black.
    k = 1 - ease_in_out(window(t, TOTAL - 0.5, 0.5))
    if k >= 1:
        return
    black = Image.new("RGBA", (W, H), BG + (int(255 * (1 - k)),))
    canvas.alpha_composite(black)




def frame_at(t):
    canvas = base_frame()
    scene_intro(t, canvas)
    scene_headline(t, canvas)
    scene_horse(t, canvas)
    scene_reins(t, canvas)
    scene_bank(t, canvas)
    scene_motifs(t, canvas)
    scene_landing(t, canvas)
    scene_docs(t, canvas)
    scene_outro(t, canvas)
    scene_fade_out(t, canvas)
    return canvas.convert("RGB")


def main():
    if len(sys.argv) > 2 and sys.argv[1] == "--still":
        t = float(sys.argv[2])
        frame_at(t).save(os.path.join(HERE, f"still_{t:05.2f}.png"))
        print("still written")
        return

    out = os.path.join(HERE, "automa-launch.mp4")
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg, "-y", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
        "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", out,
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    n = int(TOTAL * FPS)
    for i in range(n):
        frame = frame_at(i / FPS)
        proc.stdin.write(frame.tobytes())
        if i % 150 == 0:
            print(f"frame {i}/{n}", flush=True)
    proc.stdin.close()
    proc.wait()
    print("wrote", out)


if __name__ == "__main__":
    main()
