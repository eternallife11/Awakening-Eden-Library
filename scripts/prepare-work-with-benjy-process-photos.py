#!/usr/bin/env python3
"""Create privacy-stripped responsive public derivatives for the Moinhos proof story.

The supplied camera masters remain untouched in the external photo library.  This
script deliberately omits EXIF (including the source GPS metadata) from every
public derivative.
"""

from pathlib import Path

from PIL import Image, ImageOps

try:
    import pillow_avif  # noqa: F401
except ImportError:
    pillow_avif = None


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = Path("/home/benjy/awakening-eden-photo-library")
DESTINATION = ROOT / "assets/work-with-benjy/projects/moinhos-process"
SOURCES = {
    "01-project-start": SOURCE_ROOT / "1a-dated-camera-photos-needs-your-eye/20260216_164635.jpg",
    "02-trees-arrive": SOURCE_ROOT / "1a-dated-camera-photos-needs-your-eye/20260220_112219.jpg",
    "03-building-soil-biomass": SOURCE_ROOT / "1a-dated-camera-photos-needs-your-eye/20260225_135647.jpg",
    "04-planted-mulched": SOURCE_ROOT / "1a-dated-camera-photos-needs-your-eye/20260302_130930.jpg",
    "benjy-working-orange-tree": SOURCE_ROOT / "2-people-benjy-sofia/benjy gardening moinhos.jpg",
}
WIDTHS = (640, 1280, 1920)


def save_derivatives(name: str, source: Path) -> None:
    image = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
    for width in WIDTHS:
        derivative = image.copy()
        derivative.thumbnail((width, 10000), Image.Resampling.LANCZOS)
        suffix = "" if width == WIDTHS[-1] else f"-{width}"
        derivative.save(DESTINATION / f"{name}{suffix}.webp", "WEBP", quality=84, method=6)
        if pillow_avif is not None:
            derivative.save(DESTINATION / f"{name}{suffix}.avif", "AVIF", quality=56, speed=6)


def main() -> None:
    DESTINATION.mkdir(parents=True, exist_ok=True)
    for name, source in SOURCES.items():
        if not source.is_file():
            raise FileNotFoundError(source)
        save_derivatives(name, source)


if __name__ == "__main__":
    main()
