#!/usr/bin/env python3
"""Build the printable Awakening Regeneration Living Guide."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "Awakening-Regeneration-Guide.pdf"
PAGE_W, PAGE_H = A4

FOREST = colors.HexColor("#344734")
DEEP = colors.HexColor("#233126")
OLIVE = colors.HexColor("#697052")
SAGE = colors.HexColor("#94A083")
TERRA = colors.HexColor("#A7654F")
GOLD = colors.HexColor("#B8944B")
UMBER = colors.HexColor("#765F43")
PAPER = colors.HexColor("#F6F0E2")
LIGHT = colors.HexColor("#FFFDF7")
LINEN = colors.HexColor("#E8DEC8")

pdfmetrics.registerFont(TTFont("AESans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("AESansBold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("AESerif", "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"))
pdfmetrics.registerFont(TTFont("AESerifItalic", "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"))
pdfmetrics.registerFontFamily("AESans", normal="AESans", bold="AESansBold")
pdfmetrics.registerFontFamily("AESerif", normal="AESerif", italic="AESerifItalic")


def img(path, width, height=None):
    item = Image(str(ROOT / path), width=width, height=height)
    item.hAlign = "CENTER"
    return item


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="GuideTitle", parent=styles["Title"], fontName="AESerif",
    fontSize=42, leading=39, textColor=FOREST, alignment=TA_CENTER,
    spaceAfter=8 * mm,
))
styles.add(ParagraphStyle(
    name="GuideSubtitle", parent=styles["Normal"], fontName="AESerifItalic",
    fontSize=17, leading=22, textColor=DEEP, alignment=TA_CENTER,
    spaceAfter=5 * mm,
))
styles.add(ParagraphStyle(
    name="GuideEyebrow", parent=styles["Normal"], fontName="AESansBold",
    fontSize=8.2, leading=11, textColor=OLIVE, alignment=TA_CENTER,
    tracking=1.4, spaceAfter=3 * mm,
))
styles.add(ParagraphStyle(
    name="Chapter", parent=styles["Heading1"], fontName="AESerif",
    fontSize=29, leading=31, textColor=FOREST, spaceBefore=2 * mm,
    spaceAfter=5 * mm,
))
styles.add(ParagraphStyle(
    name="ChapterKicker", parent=styles["Normal"], fontName="AESerifItalic",
    fontSize=13, leading=16, textColor=TERRA, spaceAfter=2 * mm,
))
styles.add(ParagraphStyle(
    name="Lead", parent=styles["Normal"], fontName="AESerif",
    fontSize=15.5, leading=20, textColor=FOREST, spaceAfter=4 * mm,
))
styles.add(ParagraphStyle(
    name="BodyAE", parent=styles["BodyText"], fontName="AESans",
    fontSize=10.4, leading=15.3, textColor=DEEP, spaceAfter=3.2 * mm,
))
styles.add(ParagraphStyle(
    name="SmallAE", parent=styles["BodyText"], fontName="AESans",
    fontSize=8.3, leading=12, textColor=UMBER, spaceAfter=2 * mm,
))
styles.add(ParagraphStyle(
    name="CardTitle", parent=styles["Heading2"], fontName="AESerif",
    fontSize=17, leading=18, textColor=FOREST, spaceAfter=2 * mm,
))
styles.add(ParagraphStyle(
    name="FieldLabel", parent=styles["Normal"], fontName="AESerifItalic",
    fontSize=14, leading=16, textColor=TERRA, spaceAfter=1.5 * mm,
))
styles.add(ParagraphStyle(
    name="Action", parent=styles["BodyText"], fontName="AESans",
    fontSize=10.2, leading=15, textColor=DEEP, leftIndent=4 * mm,
    borderColor=TERRA, borderWidth=1.2, borderPadding=5 * mm,
    backColor=LINEN, spaceBefore=3 * mm, spaceAfter=3 * mm,
))
styles.add(ParagraphStyle(
    name="Quote", parent=styles["BodyText"], fontName="AESerifItalic",
    fontSize=14, leading=19, textColor=FOREST, alignment=TA_CENTER,
    spaceBefore=5 * mm, spaceAfter=5 * mm,
))
styles.add(ParagraphStyle(
    name="Footer", parent=styles["Normal"], fontName="AESans",
    fontSize=7.2, leading=9, textColor=UMBER, alignment=TA_CENTER,
))


def draw_background(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    canvas.setStrokeColor(colors.Color(0.41, 0.44, 0.32, alpha=0.18))
    canvas.line(23 * mm, 16 * mm, PAGE_W - 23 * mm, 16 * mm)
    canvas.setFont("AESans", 7)
    canvas.setFillColor(UMBER)
    canvas.drawCentredString(PAGE_W / 2, 10.5 * mm, f"Awakening Eden - Living Guide 01   |   {doc.page}")
    if doc.page > 1:
        canvas.drawImage(str(ROOT / "assets/corners/botanical-corner-01.webp"),
                         PAGE_W - 43 * mm, PAGE_H - 36 * mm, 34 * mm, 36 * mm,
                         preserveAspectRatio=True, mask="auto", anchor="c")
    canvas.restoreState()


def draw_cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    canvas.setStrokeColor(colors.Color(0.41, 0.44, 0.32, alpha=0.24))
    canvas.roundRect(15 * mm, 15 * mm, PAGE_W - 30 * mm, PAGE_H - 30 * mm, 8 * mm, stroke=1, fill=0)
    canvas.drawImage(str(ROOT / "assets/frames/seed-to-tree-frame-clean-01.webp"),
                     8 * mm, 18 * mm, 30 * mm, PAGE_H - 36 * mm,
                     preserveAspectRatio=True, mask="auto", anchor="c")
    canvas.drawImage(str(ROOT / "assets/frames/seed-to-tree-frame-clean-01.webp"),
                     PAGE_W - 38 * mm, 18 * mm, 30 * mm, PAGE_H - 36 * mm,
                     preserveAspectRatio=True, mask="auto", anchor="c")
    canvas.restoreState()


frame = Frame(25 * mm, 20 * mm, PAGE_W - 50 * mm, PAGE_H - 40 * mm, id="body",
              leftPadding=0, rightPadding=0, topPadding=4 * mm, bottomPadding=5 * mm)
cover_frame = Frame(33 * mm, 23 * mm, PAGE_W - 66 * mm, PAGE_H - 46 * mm, id="cover",
                    leftPadding=0, rightPadding=0, topPadding=6 * mm, bottomPadding=5 * mm)

doc = BaseDocTemplate(
    str(OUT), pagesize=A4, rightMargin=25 * mm, leftMargin=25 * mm,
    topMargin=20 * mm, bottomMargin=20 * mm,
    title="Awakening Regeneration - Living Guide 01 - Awakening Eden",
    author="Benjy and Sofia - Awakening Eden",
    subject="A free living guide to regenerative interbeing, soil, syntropy and food forests",
)
doc.addPageTemplates([
    PageTemplate(id="Cover", frames=[cover_frame], onPage=draw_cover),
    PageTemplate(id="Body", frames=[frame], onPage=draw_background),
])


def p(text, style="BodyAE"):
    return Paragraph(text, styles[style])


def chapter(kicker, title, lead, body, action, note=None):
    parts = [p(kicker, "ChapterKicker"), p(title, "Chapter"), p(lead, "Lead")]
    parts.extend(p(x) for x in body)
    if note:
        parts.append(KeepTogether([p(note[0], "FieldLabel"), p(note[1], "SmallAE")]))
        parts.append(Spacer(1, 4 * mm))
    parts.append(p(f"<b>One living action</b><br/>{action}", "Action"))
    return parts


story = []

# Cover
story.extend([
    Spacer(1, 13 * mm),
    p("AWAKENING EDEN - THE LIVING LIBRARY", "GuideEyebrow"),
    p("Welcome home, fellow gardener", "Quote"),
    Spacer(1, 3 * mm),
    p("Awakening<br/>Regeneration", "GuideTitle"),
    p("The guide we wish someone had given us before we planted our first garden.", "GuideSubtitle"),
    img("assets/growth/growth-stage-03.webp", 64 * mm, 52 * mm),
    Spacer(1, 5 * mm),
    p("LIVING GUIDE 01  -  ABOUT 18 MINUTES  -  FREE FOREVER", "GuideEyebrow"),
    p("A heart-centred beginning into regenerative interbeing, living soil, syntropic thinking, food forests, water wisdom and practical ways to help life flourish.", "SmallAE"),
    Spacer(1, 4 * mm),
    p("By Benjy and Sofia", "GuideSubtitle"),
    NextPageTemplate("Body"), PageBreak(),
])

# Invitation
story.extend([
    p("A small letter before we begin", "ChapterKicker"),
    p("This is an invitation, not another thing to perfect.", "Chapter"),
    p("Regeneration begins wherever care becomes relationship.", "Lead"),
    p("You do not need a farm, a perfect plan or endless energy. You can begin with a balcony pot, a bare patch of soil, a bowl for compost, a conversation with a neighbour or ten quiet minutes beneath a tree."),
    p("We created this companion to gather foundations we wish we had understood earlier: soil is alive, water wants to slow and sink, diversity creates resilience, and our own wellbeing belongs inside the circle of care."),
    p("Take what nourishes you. Question what asks to be questioned. Let one paragraph become one living action."),
    Spacer(1, 4 * mm),
    p("How to walk with this guide", "CardTitle"),
    p("1. <b>Read one chapter.</b> Let one idea truly land."),
    p("2. <b>Try one practice.</b> Small and real is beautiful."),
    p("3. <b>Take one living action.</b> Let learning enter your hands."),
    p("4. <b>Return when you are ready.</b> Nature never hurries, yet everything grows."),
    p("One seed. One relationship. One living step.", "Quote"),
    PageBreak(),
])

story.extend(chapter(
    "Chapter one - The seed", "Find your why",
    "Before asking what to plant, ask what you want your life to nourish.",
    [
        "Perhaps your heart hurts when you see degraded land, lonely communities or food systems that no longer feed life. Perhaps you are searching for resilience in changing times. Perhaps you simply remember that another way of living is possible.",
        "A clear why grows deeper roots than motivation. It helps a small act - saving seeds, covering soil, sharing food - become part of a future you can feel and participate in.",
    ],
    "Sit outside for ten minutes. Ask: <b>What kind of world do I want my daily actions to feed?</b> Write one sentence and keep it somewhere visible.",
    ("Field note", "Hope is not waiting for someone else to repair the world. Hope becomes sturdy when it has hands, neighbours, roots and a next step."),
))
story.append(Spacer(1, 8 * mm))
story.extend(chapter(
    "Chapter two - The roots", "Regenerative interbeing",
    "Our wellbeing is inseparable from the wellbeing of the living world.",
    [
        "Healthy soil supports healthy plants. Healthy plants support insects, birds, animals and people. Communities flourish through trust, generosity and shared care. Our inner lives and our outer actions continuously shape one another.",
        "Regeneration is not only restoring landscapes. It is restoring relationship: with ourselves, each other, food, water, soil, community and future generations.",
    ],
    "Choose one meal today. Pause before eating and name three relationships that made it possible: soil, water, seed, farmer, pollinator, cook, sun or rain.",
    ("Regeneration includes the regenerators", "Rest, laughter, boundaries and receiving care belong inside the work. We are not asked to burn ourselves out."),
))
story.append(PageBreak())

# Principles
story.extend([
    p("Chapter three - Nature's pattern language", "ChapterKicker"),
    p("What life keeps teaching", "Chapter"),
    p("Patterns we can observe in forests, gardens and communities - invitations to design with life instead of against it.", "Lead"),
])
principles = [
    ("01", "Diversity creates resilience", "Flowers, herbs, fungi, insects, support species, food plants and trees make a living system stronger together."),
    ("02", "Cover and feed the soil", "Mulch is blanket, armour and food. Leaves, compost and chop-and-drop biomass protect the life below."),
    ("03", "Slow, spread and sink water", "Read the slope. Help rain enter soil where it can recharge life and build resilience."),
    ("04", "Think in layers", "Canopy, understory, shrubs, herbs, roots, groundcovers, climbers and fungi share light, space and time."),
    ("05", "Work with succession", "Pioneers prepare the way. Fast species make biomass. Long-lived plants inherit a richer future."),
    ("06", "Observe before acting", "Sun, wind, water, soil, wildlife and human needs are already speaking. Good design begins by listening."),
]
cells = []
for number, title, text in principles:
    cells.append([p(number, "GuideEyebrow"), p(title, "CardTitle"), p(text, "SmallAE")])
rows = []
for i in range(0, len(cells), 2):
    rows.append([cells[i], cells[i + 1]])
table = Table(rows, colWidths=[77 * mm, 77 * mm], hAlign="CENTER")
table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), LIGHT),
    ("BOX", (0, 0), (-1, -1), 0.5, SAGE),
    ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.Color(0.41, 0.44, 0.32, alpha=0.25)),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 6 * mm),
    ("RIGHTPADDING", (0, 0), (-1, -1), 6 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 5 * mm),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 5 * mm),
]))
story.extend([table, p("<b>One living action</b><br/>Walk slowly around your home or garden. Notice one place where water runs, one place where life gathers and one edge that could become more abundant.", "Action"), PageBreak()])

story.extend(chapter(
    "Chapter four - The living ground", "Soil is not dirt",
    "Soil is a living community - minerals, roots, fungi, bacteria, air, water and countless tiny beings.",
    [
        "Healthy soil holds water, cycles nutrients, stores carbon and supports resilient plants. The fastest first step is often not buying more products, but protecting the soil and feeding its biology.",
        "- Keep soil covered with mulch, leaves, straw, wood chips or living plants.<br/>- Add compost and varied organic matter.<br/>- Keep living roots in the ground as much as possible.<br/>- Reduce unnecessary disturbance and compaction.<br/>- Invite fungi with woody material, perennial plants and patience.",
    ],
    "Find one patch of bare soil and cover it with organic matter. Leave a little breathing space around plant stems.",
    ("Field note", "A handful of healthy soil is not inert material. It is a neighbourhood. Feed the relationships and fertility follows."),
))
story.extend([Spacer(1, 7 * mm), p("Pause and go outside", "ChapterKicker"), p("Put the guide down for five minutes. Feel the air. Notice the smallest living being you can find. Ask what this place needs - and listen before answering.", "Quote"), PageBreak()])

story.extend([
    p("Chapter five - Hands into life", "ChapterKicker"),
    p("Regenerate one corner", "Chapter"),
    p("A small, carefully tended corner can teach more than a grand plan made without relationship.", "Lead"),
])
quick = [
    [p("1", "GuideEyebrow"), p("Observe", "CardTitle"), p("Where does water flow? Where is morning sun or harsh afternoon heat? What already thrives after rain?", "SmallAE")],
    [p("2", "GuideEyebrow"), p("Feed", "CardTitle"), p("Layer leaves, compost, safe woody material, green cuttings and mulch to begin building a living sponge.", "SmallAE")],
    [p("3", "GuideEyebrow"), p("Plant diversity", "CardTitle"), p("Choose climate-suited herbs, flowers, groundcovers, support species, shrubs and trees that can help one another.", "SmallAE")],
]
qt = Table([quick], colWidths=[51 * mm] * 3, hAlign="CENTER")
qt.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), LIGHT), ("BOX", (0, 0), (-1, -1), 0.5, SAGE),
    ("INNERGRID", (0, 0), (-1, -1), 0.5, SAGE), ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm), ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
    ("TOPPADDING", (0, 0), (-1, -1), 6 * mm), ("BOTTOMPADDING", (0, 0), (-1, -1), 6 * mm),
]))
story.extend([qt, p("<b>One living action</b><br/>Choose one square metre, container or tree circle. Photograph it, observe it and begin with soil cover today.", "Action"), PageBreak()])

story.extend(chapter(
    "Chapter six - Where life gathers", "Benjy's Abundant Edge",
    "Edges are meeting places. Water slows. Roots overlap. Biomass collects. Fungi spread. Diversity increases.",
    [
        "Abundant Edge is Benjy's evolving pattern for creating fertile planting lines and tree connections with locally appropriate materials: woody matter, charged biochar where suitable, compost, green cuttings, mulch and carefully designed water-holding contours or raised edges.",
        "A gentle pattern:<br/>1. Read contour and water movement.<br/>2. Choose an appropriate, safe edge.<br/>3. Add varied organic matter.<br/>4. Use properly charged biochar thoughtfully if suitable.<br/>5. Plant climate-wise diversity.<br/>6. Mulch, monitor and feed with chop-and-drop.",
    ],
    "Map one existing edge: a path, fence, contour, roof drip line or tree circle. Notice how water, wind, shade and organic matter behave there.",
    ("Design with care", "Earthworks and water-retention structures are site-specific. Read the landscape, soils, safe overflow and legal context. Seek experienced help for consequential work."),
))
story.append(PageBreak())

story.extend(chapter(
    "Chapter seven - Life tending toward life", "Syntropic thinking",
    "Syntropy invites us to design with life's tendency to build complexity, cooperation and abundance over time.",
    [
        "In syntropic agroforestry, plants are arranged through space and succession. Fast-growing species create biomass, shade and protection. Timely pruning stimulates growth and feeds the soil. Each phase prepares conditions for what can come next.",
        "The lesson is larger than farming: a living system flourishes when each part can contribute to the greater whole.",
    ],
    "Pair one fast-growing support species with a slower, long-lived plant suited to your climate. Imagine how future pruning can feed the soil.",
    ("Field note", "A support plant's life continues as shade, mulch, fungal food, soil structure and protection for the next generation."),
))
story.append(Spacer(1, 7 * mm))
story.extend(chapter(
    "Chapter eight - Belonging to place", "Mediterranean regeneration",
    "Regeneration is not copying a tropical food forest everywhere. It is helping each landscape become more alive in its own character.",
    [
        "Mediterranean lands ask us to work with wet winters, dry summers, intense sun, fire and fragile water cycles. Shade, soil cover, organic matter, infiltration, wind protection and climate-suited diversity become essential.",
    ],
    "During the next rain, watch where water comes from, where it speeds up, where it pools and where it leaves. Make notes before making changes.",
    ("Water is a relationship", "Thoughtful water-retention design can rehydrate soils and support aquifer recharge, but every site has limits. Work from observation, contour, rainfall, soil and safe overflow."),
))
story.append(PageBreak())

# Authors and gratitude
author_photo = img("benjy-sofia-food-forest.webp", 74 * mm, 56 * mm)
author_copy = [
    p("A note from Benjy and Sofia", "ChapterKicker"),
    p("We are students before we are teachers.", "Chapter"),
    p("This guide grew from years of gardens, mistakes, retreats, circles, questions, teachers, tears, laughter and the quiet wonder of watching life return."),
    p("Australia shaped us deeply. So did Colombia, Portugal and every landscape, farmer, friend and community that welcomed us. We carry gratitude for the teachers and Original Peoples who helped us feel a deeper belonging to land, while recognising the continuing pain, courage and living movements of Indigenous communities."),
    p("We share this imperfectly, with love - not as the final answer, but as one seed in a much larger forest of wisdom."),
    p("With love, Benjy and Sofia", "GuideSubtitle"),
]
at = Table([[author_photo, author_copy]], colWidths=[78 * mm, 76 * mm], hAlign="CENTER")
at.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm), ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm)]))
story.extend([
    at,
    PageBreak(),
    p("Gratitude and lineage", "CardTitle"),
    p("No wisdom grows alone. This companion lives within a wider lineage: Indigenous land care, permaculture, syntropic agroforestry, regenerative agriculture, ecology, community practice and countless people learning directly from place."),
    p("Our heartfelt gratitude includes Gabu Damien of the Warrungu people in Far North Queensland; Bec Bop, Adam Collins and Watty; our PDC teachers and the Crystal Waters community; Jay Jackson, Analiese Horden, Brother Beans and Sustainable Barefoot Design; Charles Eisenstein; Sacred Earth tribe and foundation; the farmers, gardeners, retreat keepers, earth lovers and community leaders whose generosity continues to travel through us.", "SmallAE"),
    p("Names and teachings are shared with reverence, not as endorsements. Cultural knowledge belongs to its custodians. We will keep correcting, crediting and deepening this living guide as permissions and details are confirmed.", "SmallAE"),
    Spacer(1, 5 * mm),
    img("assets/dividers/botanical-divider-01.webp", 132 * mm, 21 * mm),
    Spacer(1, 5 * mm),
    p("Reciprocity keeps wisdom alive", "Chapter"),
    p("Credit the teachers. Honour the custodians. Ask permission before sharing cultural knowledge. Give back where you have received. Let gratitude become relationship rather than decoration.", "Lead"),
    p("<b>One living action</b><br/>Name someone, somewhere or something that taught you how to care. Thank them if you can. Let gratitude become reciprocity.", "Action"),
    PageBreak(),
])

# Closing
story.extend([
    Spacer(1, 8 * mm), img("assets/growth/growth-stage-08.webp", 64 * mm, 52 * mm), Spacer(1, 4 * mm),
    p("Before you go...", "ChapterKicker"),
    p("Every forest began as one small seed.", "GuideTitle"),
    p("May your inner garden flourish. May the gardens you create nourish others. May we leave this Earth, together, a little more alive than we found it.", "GuideSubtitle"),
    Spacer(1, 6 * mm),
    p("CONTINUE THE JOURNEY", "GuideEyebrow"),
    p("Read Guide 02 - Thriving in These Times<br/><link href='https://awakening-eden-library.netlify.app/Thriving-in-These-Times.html' color='#A7654F'>awakening-eden-library.netlify.app/Thriving-in-These-Times.html</link>", "BodyAE"),
    p("Join our WhatsApp circle<br/><link href='https://chat.whatsapp.com/EOQFxcKGSeaAFIvCWNHeDk?s=cl&amp;p=a&amp;ilr=0' color='#A7654F'>Awakening Eden community</link>", "BodyAE"),
    p("Gift back to keep the library growing<br/><link href='https://www.paypal.me/BSauber' color='#A7654F'>paypal.me/BSauber</link>", "BodyAE"),
    Spacer(1, 5 * mm),
    p("Earth care - People care - Fair share - Evolution on", "Quote"),
])

doc.build(story)
print(OUT)
