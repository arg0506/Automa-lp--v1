# Demo video for the Automa documentation page.
# Opens on the problem, pans the whole /docs page in a browser window, and ends with a next step.
#   python render_demo.py   -> writes automa-docs-demo.mp4
import os
import subprocess

import imageio_ffmpeg
from PIL import Image, ImageDraw

import render_launch as rl

HERE = rl.HERE
W, H, FPS = rl.W, rl.H, rl.FPS
ASSETS = rl.ASSETS

TITLE_END = 4.0
PAN_START = 4.0
PAN_DUR = 40.0
END_START = PAN_START + PAN_DUR
TOTAL = END_START + 6.0

# Captions only describe what is visible on the page.
CAPTIONS = [
    (5.0, "22 sections", "From the problem and the approach through to security, the roadmap, and a glossary."),
    (15.0, "Searchable sidebar", "Find any section by title. The section you are reading is highlighted."),
    (25.0, "Eight diagrams", "Architecture, reasoning versus authority, the payment lifecycle, and the trust boundary."),
    (35.0, "Built on NEAR Protocol", "An agent requests a payment. Policies decide. The wallet pays only what is allowed."),
]


def content_crop(path):
    # Trim the empty space under the page so the pan ends on the footer.
    img = Image.open(path).convert("RGB")
    col = img.convert("L").resize((1, img.height), Image.BOX)
    last = 0
    for y in range(img.height):
        if col.getpixel((0, y)) > 14:
            last = y
    return img.crop((0, 0, img.width, min(img.height, last + 60))).convert("RGBA")


DOCS = content_crop(os.path.join(ASSETS, "docs_full.png"))
# Pre-scale to the window width once, so each frame only crops.
DOCS = DOCS.resize((1000, int(DOCS.height * 1000 / DOCS.width)), Image.LANCZOS)


def caption_block(canvas, t):
    for start, title, body in CAPTIONS:
        local = t - start
        if local < 0 or local > 9.0:
            continue
        a = rl.ease_out(rl.window(local, 0.0, 0.6)) * (1 - rl.ease_in_out(rl.window(local, 8.2, 0.8)))
        layer = rl.new_layer()
        d = ImageDraw.Draw(layer)
        d.text((120, 380 + int(16 * (1 - a))), title, font=rl.font(rl.SANS, 72), fill=rl.INK + (int(255 * a),))
        wrapped = rl.wrap(body, rl.font(rl.SANS, 32), 640)
        y = 500
        for line in wrapped:
            d.text((120, y), line, font=rl.font(rl.SANS, 32), fill=rl.MUTED + (int(255 * a),))
            y += 46
        canvas.alpha_composite(layer)


def frame_at(t):
    canvas = rl.base_frame()
    if t < TITLE_END:
        local = t
        a = rl.ease_out(rl.window(local, 0.2, 0.8)) * (1 - rl.ease_in_out(rl.window(local, TITLE_END - 0.5, 0.5)))
        layer = rl.new_layer()
        d = ImageDraw.Draw(layer)
        d.text((120, 380), "Agents need money.", font=rl.font(rl.SANS, 96), fill=rl.INK + (int(255 * a),))
        d.text((120, 500), "Owners need limits.", font=rl.font(rl.SERIF_I, 110), fill=(228, 228, 231, int(255 * a)))
        canvas.alpha_composite(layer)
    if PAN_START <= t < END_START + 0.5:
        rl.browser_frame(canvas, DOCS, t, PAN_START, PAN_DUR, "automa-docs  /  docs", 860, 160, 1000, 760)
        caption_block(canvas, t - PAN_START)
    if t >= END_START:
        local = t - END_START
        a = rl.ease_out(rl.window(local, 0.0, 0.7)) * (1 - rl.ease_in_out(rl.window(local, 5.4, 0.6)))
        layer = rl.new_layer()
        d = ImageDraw.Draw(layer)
        d.text((120, 380), "Read the docs.", font=rl.font(rl.SANS, 96), fill=rl.INK + (int(255 * a),))
        d.text((120, 500), "Then try the landing page.", font=rl.font(rl.SERIF_I, 80), fill=(228, 228, 231, int(255 * a)))
        d.text((120, 640), "github.com/arg0506/Automa-lp--v1", font=rl.font(rl.MONO, 34), fill=rl.MUTED + (int(255 * a),))
        canvas.alpha_composite(layer)
    k = 1 - rl.ease_in_out(rl.window(t, TOTAL - 0.5, 0.5))
    if k < 1:
        canvas.alpha_composite(Image.new("RGBA", (W, H), rl.BG + (int(255 * (1 - k)),)))
    return canvas.convert("RGB")


def main():
    out = os.path.join(HERE, "automa-docs-demo.mp4")
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
        proc.stdin.write(frame_at(i / FPS).tobytes())
        if i % 300 == 0:
            print(f"frame {i}/{n}", flush=True)
    proc.stdin.close()
    proc.wait()
    print("wrote", out)


if __name__ == "__main__":
    main()
