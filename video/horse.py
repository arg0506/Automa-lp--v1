# A galloping horse and rider, drawn procedurally for the launch video.
# The horse stands for the agent and the reins stand for the owner's policies.
import math

from PIL import Image, ImageChops, ImageDraw, ImageFilter

W, H = 1920, 1080
INK = (12, 10, 18)
RIM = (176, 140, 255)


def make_dusk():
    # Violet dusk gradient, a low sun and a soft horizon glow.
    img = Image.new("RGB", (W, H), (7, 7, 10))
    d = ImageDraw.Draw(img)
    top, bottom = (36, 20, 74), (7, 7, 10)
    for y in range(H):
        f = y / H
        c = tuple(int(a * (1 - f) + b * f) for a, b in zip(top, bottom))
        d.line([(0, y), (W, y)], fill=c)
    base = img.convert("RGBA")
    sun = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sun)
    sd.ellipse((1310, 470, 1550, 710), fill=(240, 164, 132, 230))
    sun = sun.filter(ImageFilter.GaussianBlur(10))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((W * 0.5 - 1000, 560 - 420, W * 0.5 + 1000, 560 + 420), fill=(139, 92, 246, 80))
    glow = glow.filter(ImageFilter.GaussianBlur(140))
    base.alpha_composite(glow)
    base.alpha_composite(sun)
    return base


DUSK = make_dusk()


def landscape(t, horizon=800, speed=160):
    # Two hill layers scroll at different speeds, and a dotted path runs across the ground.
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    far = []
    for x in range(-20, W + 40, 16):
        y = horizon - 70 - 36 * math.sin(x * 0.0045 + t * speed * 0.004) - 18 * math.sin(x * 0.013 + t * speed * 0.006)
        far.append((x, y))
    d.polygon(far + [(W + 40, H), (-20, H)], fill=(52, 30, 84, 255))
    near = []
    for x in range(-20, W + 40, 16):
        y = horizon + 10 - 22 * math.sin(x * 0.007 + t * speed * 0.009)
        near.append((x, y))
    d.polygon(near + [(W + 40, H), (-20, H)], fill=(18, 12, 30, 255))
    d.rectangle((0, horizon + 60, W, H), fill=(9, 7, 14, 255))
    # Dotted path, moving left with the scroll.
    off = (t * speed) % 60
    for x in range(-60, W + 60, 60):
        xx = x - off
        d.line([(xx, horizon + 92), (xx + 28, horizon + 92)], fill=(139, 92, 246, 170), width=4)
    return layer


def _point(cx, gy, s, x, y, bob):
    return (cx + x * s, gy - 150 * s + y * s + bob)


def horse_mask(cx, gy, s, t):
    # Silhouette of the horse and rider as a grey mask, plus the reins' ends.
    mask = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(mask)
    phase = t * 7.2
    bob = -abs(math.sin(phase)) * 9 * s

    def P(x, y):
        return _point(cx, gy, s, x, y, bob)

    # Body, neck, head, ear, tail.
    d.ellipse([P(-115, -44), P(115, 44)], fill=255)
    d.polygon([P(60, -20), P(118, -112), P(152, -118), P(108, 8)], fill=255)
    d.polygon([P(124, -124), P(184, -96), P(196, -82), P(172, -76), P(132, -96), P(112, -116)], fill=255)
    d.polygon([P(128, -124), P(134, -150), P(146, -126)], fill=255)
    d.polygon([P(-110, -20), P(-160, 4), P(-190, 44), P(-172, 46), P(-146, 18), P(-108, -6)], fill=255)

    # Legs in gallop pairing: front pair and back pair move out of step.
    legs = [((62, 18), 0.0), ((92, 20), math.pi), ((-78, 20), math.pi / 2), ((-106, 18), 3 * math.pi / 2)]
    for (hx, hy), off in legs:
        a = 0.55 * math.sin(phase + off)
        kx, ky = hx + 72 * math.sin(a), hy + 72 * math.cos(a)
        b = a + 0.4 * math.sin(phase + off + 0.8)
        fx, fy = kx + 66 * math.sin(b), ky + 66 * math.cos(b)
        pts = [P(hx, hy), P(kx, ky), P(fx, fy)]
        d.line(pts, fill=255, width=max(3, int(15 * s)))
        for px, py in pts:
            r = 8 * s
            d.ellipse((px - r, py - r, px + r, py + r), fill=255)

    # Rider: torso, head, arm, and the hand that holds the reins.
    d.polygon([P(-14, -52), P(14, -52), P(22, -120), P(-6, -128)], fill=255)
    hx0, hy0 = P(2, -146)
    r = 17 * s
    d.ellipse((hx0 - r, hy0 - r, hx0 + r, hy0 + r), fill=255)
    hand = P(96, -82)
    d.line([P(16, -108), hand], fill=255, width=max(3, int(12 * s)))
    bit = P(182, -92)
    return mask, hand, bit


def horse_layer(cx, gy, s, t):
    mask, hand, bit = horse_mask(cx, gy, s, t)
    # Violet rim light: the mask shifted up and left, minus the mask itself.
    shifted = ImageChops.offset(mask, -4, -3)
    rim = ImageChops.subtract(shifted, mask)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    layer.paste(RIM + (255,), (0, 0), rim)
    layer.paste(INK + (255,), (0, 0), mask)
    return layer, hand, bit


def reins_line(canvas, hand, bit, width=3):
    d = ImageDraw.Draw(canvas)
    d.line([hand, bit], fill=(255, 255, 255, 220), width=width)
    return d


def dust(t, cx, gy, s):
    # Small puffs under the hooves, fading out behind the horse.
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for k in range(10):
        life = (t * 1.6 + k * 0.1) % 1.0
        x = cx - 150 * s - life * 260
        y = gy - 2 + 6 * math.sin(k * 1.7)
        r = 10 + life * 34
        a = int(90 * (1 - life))
        d.ellipse((x - r, y - r * 0.4, x + r, y + r * 0.4), fill=(200, 180, 230, a))
    return layer.filter(ImageFilter.GaussianBlur(4))
