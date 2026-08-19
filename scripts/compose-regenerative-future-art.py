#!/usr/bin/env python3
"""Create public responsive vision art with the canonical Lotus of Life.

The supplied source artwork is preserved outside the bottom-root medallion.
The generated bottom rosette is concealed, then a browser raster rendered
directly from the canonical repository SVG is composited without distortion.
"""

from pathlib import Path
from xml.etree import ElementTree

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

try:
    import pillow_avif  # noqa: F401
except ImportError:
    pillow_avif = None


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(
    "/home/benjy/.codex/attachments/31012ccd-e314-4023-a187-3983c3dd656e/image-1.png"
)
CANONICAL_SVG = ROOT / "assets/geometry/lotus-of-life-12-exact.svg"
OUTPUT_STEM = ROOT / "assets/hero/awakening-eden-regenerative-future-community-v1"


def canonical_lotus_layer(size: int) -> Image.Image:
    root = ElementTree.parse(CANONICAL_SVG).getroot()
    namespace = {"svg": "http://www.w3.org/2000/svg"}
    geometry_group = root.find("svg:g", namespace)
    if geometry_group is None:
        raise ValueError("Canonical Lotus SVG is missing its geometry group")

    petal_circles = geometry_group.findall("svg:circle", namespace)
    centre_dot = root.findall("svg:circle", namespace)
    if len(petal_circles) != 13 or len(centre_dot) != 1:
        raise ValueError("Canonical Lotus SVG no longer has the expected 12 petals, boundary and centre")

    supersample = 4
    canvas_size = size * supersample
    scale = canvas_size / 512
    stroke_width = round(float(geometry_group.attrib["stroke-width"]) * scale)
    opacity = float(geometry_group.attrib.get("opacity", "1")) * 0.84
    stroke = Image.new("RGBA", (1, 1), geometry_group.attrib["stroke"]).getpixel((0, 0))
    stroke = (*stroke[:3], round(255 * opacity))

    rendered = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(rendered)
    for circle in petal_circles:
        cx = float(circle.attrib["cx"]) * scale
        cy = float(circle.attrib["cy"]) * scale
        radius = float(circle.attrib["r"]) * scale
        draw.ellipse(
            (cx - radius, cy - radius, cx + radius, cy + radius),
            outline=stroke,
            width=stroke_width,
        )

    dot = centre_dot[0]
    cx = float(dot.attrib["cx"]) * scale
    cy = float(dot.attrib["cy"]) * scale
    radius = float(dot.attrib["r"]) * scale
    fill = Image.new("RGBA", (1, 1), dot.attrib["fill"]).getpixel((0, 0))
    draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=(*fill[:3], round(255 * 0.84)))
    return rendered.resize((size, size), Image.Resampling.LANCZOS)


def compose() -> Image.Image:
    source = Image.open(SOURCE).convert("RGB")
    if source.size != (1448, 1086):
        raise ValueError(f"Unexpected source size: {source.size}")

    softened = source.filter(ImageFilter.GaussianBlur(radius=45))
    softened = ImageEnhance.Brightness(softened).enhance(0.93)

    conceal_mask = Image.new("L", source.size, 0)
    mask_draw = ImageDraw.Draw(conceal_mask)
    mask_draw.ellipse((512, 700, 936, 1100), fill=255)
    conceal_mask = conceal_mask.filter(ImageFilter.GaussianBlur(radius=28))
    corrected = Image.composite(softened, source, conceal_mask).convert("RGBA")

    lotus = canonical_lotus_layer(342)
    lotus_position = (553, 733)

    glow_alpha = lotus.getchannel("A").filter(ImageFilter.GaussianBlur(radius=8))
    glow_alpha = glow_alpha.point(lambda value: round(value * 0.38))
    glow = Image.new("RGBA", lotus.size, (255, 174, 45, 0))
    glow.putalpha(glow_alpha)

    corrected.alpha_composite(glow, lotus_position)
    corrected.alpha_composite(lotus, lotus_position)
    return corrected.convert("RGB")


def save_derivatives(image: Image.Image) -> None:
    derivatives = {
        "": image,
        "-960": image.resize((960, 720), Image.Resampling.LANCZOS),
        "-640": image.resize((640, 480), Image.Resampling.LANCZOS),
    }
    for suffix, derivative in derivatives.items():
        derivative.save(
            OUTPUT_STEM.with_name(f"{OUTPUT_STEM.name}{suffix}.webp"),
            "WEBP",
            quality=91,
            method=6,
        )
        if pillow_avif is not None:
            derivative.save(
                OUTPUT_STEM.with_name(f"{OUTPUT_STEM.name}{suffix}.avif"),
                "AVIF",
                quality=72,
                speed=6,
            )

    close_up = image.crop((480, 640, 968, 1086))
    close_up.save("/tmp/awakening-eden-regenerative-future-lotus-close.png")


if __name__ == "__main__":
    save_derivatives(compose())
