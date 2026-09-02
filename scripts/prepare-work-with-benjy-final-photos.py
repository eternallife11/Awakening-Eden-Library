#!/usr/bin/env python3
"""Create privacy-stripped responsive derivatives from the approved final photo pack.

The source masters remain outside the repository.  Public files omit EXIF so
the site does not publish camera metadata, including any location data.
"""

from pathlib import Path

from PIL import Image, ImageOps

try:
    import pillow_avif  # noqa: F401
except ImportError:
    pillow_avif = None


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = Path(
    "/home/benjy/awakening-eden-photo-library/final claude handoff 17thaugust/"
    "awakening-eden-final-claude-pack"
)
DESTINATION = ROOT / "assets/work-with-benjy/final-proof"
SOURCES = {
    "food-forest-abundant-edge": SOURCE_ROOT / "01-real-photos-new-mulched-beds/20260817_102131.jpg",
    "planting-implementation": SOURCE_ROOT / "01-real-photos-new-mulched-beds/20260817_102149.jpg",
    "orchard-living-system": SOURCE_ROOT / "01-real-photos-new-mulched-beds/20260817_102143.jpg",
    "water-living-soil": SOURCE_ROOT / "01-real-photos-new-mulched-beds/20260810_135910.jpg",
    "living-edge-biodiversity": SOURCE_ROOT / "01-real-photos-new-mulched-beds/20260811_095137.jpg",
    "benjy-sofia-tree-planting": SOURCE_ROOT / "03-latest-uploaded-final-items/benjy-sofia-tree-planting.webp",
    "botanical-seed-water-roots-divider": SOURCE_ROOT / "03-latest-uploaded-final-items/botanical-seed-water-roots-divider.png",
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
