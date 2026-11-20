"""Awakening Eden educational boards: landscape (desktop) + portrait (phone) variants.
Same approved wording across variants; portrait uses larger type for phone legibility."""
import sys
OUT=sys.argv[1]
SANS="'Source Sans 3','Segoe UI',Helvetica,Arial,sans-serif"
SERIF="Georgia,'Times New Roman',serif"
INK="#2f4a33"; UMBER="#5f4f3c"; PAPER="#f3ebd7"; CARD="#fdf9ef"; LINE="#7d8462"; GOLD="#b98d45"
WATER="#4f8c8c"; SOIL="#8a6446"; TERRA="#a7654f"
def esc(t): return t.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
def text(x,y,lines,size=22,weight=400,fill=UMBER,anchor='middle',font=SANS,lh=1.4,ls=0,style=''):
    o=[f'<text x="{x}" y="{y}" font-family="{font}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" letter-spacing="{ls}"{style}>']
    for i,l in enumerate(lines): o.append(f'<tspan x="{x}" dy="{0 if i==0 else round(size*lh,1)}">{esc(l)}</tspan>')
    return ''.join(o)+'</text>'
DEFS=('<defs>'
 '<filter id="rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="7"/></filter>'
 '<filter id="wash" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".012 .03" numOctaves="3" seed="11" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="14" result="d"/><feGaussianBlur in="d" stdDeviation=".6"/></filter>'
 '<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="3"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .07"/></feComponentTransfer><feComposite in2="SourceGraphic" operator="in"/></filter>'
 f'<marker id="ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="{GOLD}"/></marker>'
 f'<marker id="aw" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto"><path d="M0 0L10 5L0 10z" fill="{WATER}"/></marker>'
 '<linearGradient id="skyA" x2="0" y2="1"><stop stop-color="#f6e7cf"/><stop offset="1" stop-color="#f1dcc0"/></linearGradient>'
 '<linearGradient id="skyB" x2="0" y2="1"><stop stop-color="#eef0df"/><stop offset="1" stop-color="#e3ead6"/></linearGradient>'
 '<linearGradient id="soilA" x2="0" y2="1"><stop stop-color="#c99c74"/><stop offset="1" stop-color="#a56f52"/></linearGradient>'
 '<linearGradient id="soilB" x2="0" y2="1"><stop stop-color="#8a6446"/><stop offset="1" stop-color="#5e4331"/></linearGradient>'
 '</defs>')
def svg(w,h,title,desc,body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-labelledby="t d">'
            f'<title id="t">{esc(title)}</title><desc id="d">{esc(desc)}</desc>{DEFS}'
            f'<rect width="{w}" height="{h}" rx="36" fill="{PAPER}"/><rect width="{w}" height="{h}" rx="36" fill="{PAPER}" filter="url(#grain)"/>'
            + body + '</svg>')
def box(x,y,w,h,fill=CARD,stroke=LINE,rx=28,sw=3): return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
def save(name,s): open(f'{OUT}/{name}','w').write(s)

# ------------------------------------------------------------------ BIOMASS
B_TITLE='Biomass: stored sunlight in motion'
B_DESC='A five-step loop: photosynthesis grows biomass; it is managed at the right time; returned to the ground; decomposers transform it; and the next growth inherits shade, habitat and recycled nutrients. Mediterranean note: biomass is also potential dry fuel.'
B_CARDS=[
 ('1 · PHOTOSYNTHESIS GROWS IT',['Support plants, crop residues and cover crops','turn sunlight, air, water and soil nutrients','into biomass.']),
 ('2 · MANAGE AT THE RIGHT TIME',['Prune · mow · chop · graze · harvest.','Create light and redirect biomass into','the next layer of the living system.']),
 ('3 · RETURN IT TO THE GROUND',['Surface armour and decomposer habitat.','Keep useful nutrients cycling locally,','where biomass can safely decompose.']),
 ('4 · DECOMPOSERS DO THE QUIET WORK',['Fungi, microbes and soil fauna transform','residues. Roots, pores and organic matter','shape how water and nutrients move.']),
 ('5 · NEXT GROWTH INHERITS',['Shade, habitat, cooler soil and recycled','nutrients create new possibilities.','The loop begins again at a new stage.']),
]
B_NOTE='Mediterranean note: biomass is fertility and also dry fuel. Place it with summer fire risk, access and buildings in mind.'
def seedling(x,y,s=1):
    return (f'<g transform="translate({x} {y}) scale({s})" fill="none" stroke-linecap="round" filter="url(#rough)"><circle cx="0" cy="-128" r="30" fill="{GOLD}" stroke="none" opacity=".9"/>'
            f'<path d="M-80 70 C-40 52 40 52 80 70" stroke="{SOIL}" stroke-width="8"/><path d="M0 64 V-70" stroke="#6d5238" stroke-width="8"/>'
            '<path d="M0 -20 C-20 -55 -70 -60 -88 -40 C-64 -18 -24 -14 0 -20Z" fill="#7f8f5d" stroke="#56653d" stroke-width="3"/>'
            '<path d="M0 -40 C24 -78 72 -78 88 -56 C62 -34 26 -32 0 -40Z" fill="#7f8f5d" stroke="#56653d" stroke-width="3"/></g>')
def biomass_land():
    W,H=1600,1040; s=[]
    s.append(text(800,82,['BIOMASS: STORED SUNLIGHT IN MOTION'],52,700,INK,font=SERIF,ls=1))
    s.append(text(800,130,['Grow it · manage it · return it · let the next succession rise through it'],27,400,UMBER))
    pos=[(480,165,640,200),(1010,395,540,215),(880,690,600,200),(120,690,640,215),(50,395,540,215)]
    for d in ['M1125 265 C1220 285 1270 330 1285 385','M1290 615 C1290 650 1250 675 1220 685','M875 790 C850 790 800 790 770 790','M300 685 C290 660 300 640 310 618','M310 390 C330 300 400 270 472 262']:
        s.append(f'<path d="{d}" fill="none" stroke="{GOLD}" stroke-width="6" stroke-linecap="round" marker-end="url(#ah)"/>')
    for (x,y,w,h),(t,body) in zip(pos,B_CARDS):
        s.append(box(x,y,w,h)); s.append(text(x+w/2,y+54,[t],26,700,INK,ls=.4)); s.append(text(x+w/2,y+102,body,23,400,UMBER,lh=1.45))
    s.append(seedling(800,575))
    s.append(text(800,975,[B_NOTE],23,400,UMBER))
    return svg(W,H,B_TITLE,B_DESC,''.join(s))
def biomass_port():
    W,H=900,2080; s=[]
    s.append(text(450,92,['BIOMASS:'],50,700,INK,font=SERIF,ls=1)); s.append(text(450,150,['STORED SUNLIGHT IN MOTION'],40,700,INK,font=SERIF,ls=1))
    s.append(text(450,205,['Grow it · manage it · return it'],30,400,UMBER))
    s.append(seedling(450,385,.85))
    y=470
    for i,(t,body) in enumerate(B_CARDS):
        s.append(box(60,y,780,245)); s.append(text(450,y+58,[t],31,700,INK,ls=.3)); s.append(text(450,y+110,body,28,400,UMBER,lh=1.4))
        if i<4: s.append(f'<path d="M450 {y+250} V{y+282}" stroke="{GOLD}" stroke-width="7" stroke-linecap="round" marker-end="url(#ah)"/>')
        y+=290
    s.append(f'<path d="M840 {y-60} C890 {y-60} 890 520 845 520" fill="none" stroke="{GOLD}" stroke-width="5" stroke-dasharray="4 10" stroke-linecap="round" marker-end="url(#ah)"/>')
    s.append(text(450,y+10,['…and the loop begins again.'],30,400,INK,font=SERIF,style=' font-style="italic"'))
    s.append(text(450,y+80,['Mediterranean note: biomass is fertility','and also dry fuel. Place it with summer fire','risk, access and buildings in mind.'],26,400,UMBER,lh=1.4))
    return svg(W,H,B_TITLE,B_DESC,''.join(s))

# ------------------------------------------------------------------ SOIL SPONGE
S_TITLE='From runoff to a living soil sponge'
S_DESC='Bare, compacted soil sheds rain as fast runoff; covered soil with living roots, pores and biology lets water infiltrate. Adding one volumetric percentage point of plant-available water across 30 cm of soil equals 3 litres per square metre, or 30,000 litres per hectare. This is arithmetic, not a promise about organic matter.'
def soil_bare(x,y):
    g=[f'<g transform="translate({x} {y})">']
    for rx in (70,150,230): g.append(f'<path d="M{rx} 10 V95" stroke="{WATER}" stroke-width="7" stroke-linecap="round"/><path d="M{rx} 115 V175" stroke="{WATER}" stroke-width="5" stroke-dasharray="10 12" opacity=".5"/>')
    g.append(f'<g stroke="{GOLD}" stroke-width="8" stroke-linecap="round"><circle cx="470" cy="60" r="44" fill="{GOLD}" stroke="none"/><path d="M470 -12V2M470 118V132M392 60H406M534 60H548"/></g>')
    g.append(f'<g filter="url(#rough)"><path d="M0 215 Q250 185 570 220 L570 350 L0 350Z" fill="url(#soilA)"/><path d="M0 215 Q250 185 570 220" stroke="#7a5a3f" stroke-width="10" fill="none"/></g>')
    g.append(f'<path d="M40 197 Q270 181 510 207" stroke="{WATER}" stroke-width="9" fill="none" stroke-linecap="round" marker-end="url(#aw)"/>')
    return ''.join(g)+'</g>'
def soil_living(x,y):
    g=[f'<g transform="translate({x} {y})">']
    for rx in (60,140,220): g.append(f'<path d="M{rx} 10 V75" stroke="{WATER}" stroke-width="7" stroke-linecap="round"/>')
    g.append(f'<g filter="url(#rough)"><path d="M0 200 L570 200 L570 350 L0 350Z" fill="url(#soilB)"/></g>')
    for mx in (20,120,220,320,420): g.append(f'<path d="M{mx} 197 l80 -8" stroke="#c9a46e" stroke-width="12" stroke-linecap="round"/>')
    for px in (100,300,480):
        g.append(f'<g fill="none" stroke="#5f7445" stroke-width="7" stroke-linecap="round"><path d="M{px} 195 V100"/><path d="M{px} 130 C{px-30} 95 {px-70} 100 {px-80} 122"/><path d="M{px} 130 C{px+30} 95 {px+70} 100 {px+80} 122"/></g>')
        g.append(f'<g fill="none" stroke="#e0c9a6" stroke-width="3.5" stroke-linecap="round" opacity=".75"><path d="M{px} 205 C{px-20} 255 {px-40} 290 {px-60} 340"/><path d="M{px} 205 C{px+10} 265 {px+30} 300 {px+20} 340"/></g>')
    for ix in (50,150,250,360,450,530): g.append(f'<path d="M{ix} 215 V330" stroke="#9fd0cb" stroke-width="5" stroke-dasharray="12 10" stroke-linecap="round"/>')
    return ''.join(g)+'</g>'
def soil_land():
    W,H=1600,1060; s=[]
    s.append(text(800,82,['FROM RUNOFF TO A LIVING SOIL SPONGE'],52,700,INK,font=SERIF,ls=1))
    s.append(text(800,130,['Cover · roots · structure · organic inputs · time for water to enter'],27,400,UMBER))
    for x,label,fn,cap in [(80,'BARE / COMPACTED',soil_bare,['Fast runoff · hot surface · erosion risk','fewer pores and fewer living pathways']),
                           (850,'COVERED / LIVING',soil_living,['More time to soak in · cooler surface','roots, pores and soil life move water down'])]:
        s.append(box(x,165,670,580)); s.append(text(x+335,222,[label],28,700,INK,ls=1)); s.append(fn(x+50,245)); s.append(text(x+335,660,cap,24,400,UMBER,lh=1.45))
    s.append(box(180,775,1240,190,fill="#ead9b4",stroke=GOLD))
    s.append(text(800,826,['WATER STORAGE IS MEASURABLE: USE THE SOIL, NOT A SLOGAN'],26,700,INK,ls=.4))
    s.append(text(800,866,['+1 volumetric percentage point of plant-available water across 30 cm of soil'],23,400,UMBER))
    s.append(text(800,912,['= 3 L/m² = 30,000 L/ha of extra plant-available water capacity'],33,700,'#2f6461',font=SERIF))
    s.append(text(800,948,['Example: +2 points across 30 cm = 6 L/m² = 60,000 L/ha · purely geometric conversion.'],21,400,UMBER))
    s.append(text(800,1012,['Not a “+1% organic matter = X water” promise. Texture, structure, compaction, rooting depth and organic carbon all matter.'],21,400,UMBER))
    return svg(W,H,S_TITLE,S_DESC,''.join(s))
def soil_port():
    W,H=900,2280; s=[]
    s.append(text(450,92,['FROM RUNOFF TO A'],46,700,INK,font=SERIF,ls=1)); s.append(text(450,148,['LIVING SOIL SPONGE'],46,700,INK,font=SERIF,ls=1))
    s.append(text(450,200,['Cover · roots · structure · time'],30,400,UMBER))
    y=240
    for label,fn,cap in [('BARE / COMPACTED',soil_bare,['Fast runoff · hot surface','erosion risk · fewer pores']),('COVERED / LIVING',soil_living,['More time to soak in','roots and soil life move water down'])]:
        s.append(box(60,y,780,660)); s.append(text(450,y+60,[label],33,700,INK,ls=1)); s.append(f'<g transform="translate(105 {y+95}) scale(1.21)">{fn(0,0)}</g>')
        s.append(text(450,y+580,cap,30,400,UMBER,lh=1.4)); y+=690
    s.append(box(60,y+10,780,400,fill="#ead9b4",stroke=GOLD))
    s.append(text(450,y+72,['WATER STORAGE IS MEASURABLE'],31,700,INK,ls=.4))
    s.append(text(450,y+122,['+1 volumetric percentage point of','plant-available water across 30 cm of soil'],27,400,UMBER,lh=1.4))
    s.append(text(450,y+232,['= 3 L/m²'],52,700,'#2f6461',font=SERIF)); s.append(text(450,y+292,['= 30,000 L/ha of water capacity'],33,700,'#2f6461',font=SERIF))
    s.append(text(450,y+352,['Purely geometric conversion.'],25,400,UMBER))
    s.append(text(450,y+480,['Not a “+1% organic matter = X water”','promise. Texture, structure, compaction,','rooting depth and carbon all matter.'],26,400,UMBER,lh=1.4))
    return svg(W,H,S_TITLE,S_DESC,''.join(s))

# ------------------------------------------------------------------ ORCHARD
O_TITLE='From exposed ground toward a living orchard'
O_DESC='Illustrated comparison of two design conditions, not a before-and-after. Left: an orchard tree on bare, sun-baked ground where rain runs off and carries soil. Right: the same kind of tree with mulch, living groundcover, support shrubs and herbs, where more rain can soak in and roots and soil life build structure. Water, species and earthworks must fit the actual site.'
O_LEFT=['Bare, sun-baked surface','Rain runs off and carries soil','Few roots and little soil life']
O_RIGHT=['Mulch and living cover shade the soil','More rain can soak in where it falls','Roots and fungi build soil structure','Varied plants feed pollinators and birds']
def tree(cx,base,scale=1,lush=True):
    k=scale; c1,c2,c3=('#6f8a55','#86a066','#a4b97d') if lush else ('#8b9468','#9fa577','#b7b98b')
    blobs=[(-70,-150,62),(0,-185,70),(70,-150,62),(-38,-110,55),(40,-110,55),(0,-135,60)] if lush else [(-55,-150,50),(10,-178,55),(60,-145,46),(-15,-118,44)]
    g=[f'<g transform="translate({cx} {base}) scale({k})"><g filter="url(#wash)">']
    g.append('<path d="M-9 0 C-6 -40 -12 -80 -4 -115 L6 -115 C12 -80 8 -40 12 0Z" fill="#6d5238"/><path d="M2 -70 C20 -90 34 -100 52 -112" stroke="#6d5238" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M0 -60 C-18 -80 -34 -92 -50 -104" stroke="#6d5238" stroke-width="8" fill="none" stroke-linecap="round"/>')
    for i,(x,y,r) in enumerate(blobs): g.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{(c1,c2,c3)[i%3]}" opacity=".93"/>')
    if lush:
        for x,y in [(-60,-140),(30,-170),(62,-120),(-20,-100),(10,-150)]: g.append(f'<circle cx="{x}" cy="{y}" r="9" fill="#e0a43c"/>')
    g.append('</g></g>'); return ''.join(g)
def orchard_scene(kind):
    """Scene drawn in a 640x420 box."""
    g=[]
    sky='url(#skyA)' if kind=='bare' else 'url(#skyB)'
    g.append(f'<rect x="0" y="0" width="640" height="420" rx="18" fill="{sky}"/>')
    # rain
    for rx in (90,170,250,330):
        g.append(f'<path d="M{rx} 30 l-10 40" stroke="{WATER}" stroke-width="5" stroke-linecap="round" opacity=".8"/>')
    if kind=='bare':
        g.append(f'<g stroke="{GOLD}" stroke-width="7" stroke-linecap="round"><circle cx="560" cy="70" r="36" fill="{GOLD}" stroke="none"/><path d="M560 14V24M560 116V126M504 70H514M606 70H616"/></g>')
        g.append('<g filter="url(#wash)"><path d="M-10 300 C140 250 330 255 650 300 L650 430 L-10 430Z" fill="url(#soilA)"/></g>')
        g.append('<path d="M10 300 C140 258 330 262 630 302" stroke="#8d6246" stroke-width="5" fill="none" stroke-dasharray="2 14" stroke-linecap="round"/>')
        g.append(tree(330,286,.9,lush=False))
        g.append(f'<path d="M60 268 C200 248 360 262 560 312" stroke="{WATER}" stroke-width="8" fill="none" stroke-linecap="round" marker-end="url(#aw)"/>')
        g.append('<path d="M470 320 l30 40 l-14 8 l24 38" stroke="#7a4d34" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>')
        g.append('<g stroke="#9b6c4e" stroke-width="3" fill="none" opacity=".6"><path d="M300 330 l-30 50"/><path d="M340 330 l20 55"/></g>')
    else:
        g.append('<g filter="url(#wash)"><path d="M-10 300 C140 250 330 255 650 300 L650 430 L-10 430Z" fill="url(#soilB)"/></g>')
        g.append('<g filter="url(#wash)"><path d="M-10 296 C140 246 330 251 650 296 L650 312 C330 268 140 266 -10 314Z" fill="#c9a46e"/></g>')
        # roots + fungal threads
        g.append('<g fill="none" stroke-linecap="round"><g stroke="#e0c9a6" stroke-width="4" opacity=".85"><path d="M330 290 C310 330 280 360 250 405"/><path d="M330 290 C335 340 345 370 360 410"/><path d="M330 290 C360 320 400 340 440 360"/><path d="M150 290 C140 330 130 360 120 400"/><path d="M520 300 C530 340 520 370 535 405"/></g>'
                 '<g stroke="#f3e6cf" stroke-width="1.6" opacity=".7"><path d="M250 380 C200 370 170 390 120 380"/><path d="M360 395 C410 380 460 395 535 385"/><path d="M440 360 C470 350 500 360 520 340"/></g></g>')
        for ix in (60,190,270,410,480,590): g.append(f'<path d="M{ix} 320 V400" stroke="#9fd0cb" stroke-width="5" stroke-dasharray="11 9" stroke-linecap="round"/>')
        # groundcover, herbs, shrubs
        g.append('<g filter="url(#wash)">')
        for x,r,c in [(70,34,'#7f9a5e'),(140,26,'#93ab6c'),(450,42,'#6f8a55'),(520,32,'#88a064'),(600,28,'#93ab6c'),(215,22,'#88a064')]:
            g.append(f'<ellipse cx="{x}" cy="{286-r*0.55}" rx="{r*1.25}" ry="{r}" fill="{c}"/>')
        g.append('</g>')
        for x,c in [(110,'#b98fc9'),(150,'#e0a43c'),(470,'#c56f7a'),(505,'#b98fc9'),(590,'#e0a43c'),(205,'#c56f7a')]:
            g.append(f'<circle cx="{x}" cy="{268-((x*7)%14)}" r="7" fill="{c}"/>')
        g.append(tree(330,288,1.0,lush=True))
        # a small bird
        g.append('<path d="M500 120 q12 -10 24 0 q12 -10 24 0" stroke="#3f4f3a" stroke-width="4" fill="none" stroke-linecap="round"/>')
    return ''.join(g)
def bullet_list(x,y,items,size,color,dot,lh=1.55):
    out=[]
    for i,t in enumerate(items):
        yy=y+i*size*lh
        out.append(f'<circle cx="{x}" cy="{yy-size*0.32}" r="{size*0.22}" fill="{dot}"/>')
        out.append(text(x+size*0.75,yy,[t],size,400,color,anchor='start'))
    return ''.join(out)
def orchard_land():
    W,H=1600,1010; s=[]
    s.append(text(800,82,['FROM EXPOSED GROUND TOWARD A LIVING ORCHARD'],46,700,INK,font=SERIF,ls=1))
    s.append(text(800,128,['An illustrated comparison of two design conditions · not a before-and-after'],26,400,UMBER))
    for x,label,kind,items,dot,stroke in [(70,'EXPOSED GROUND','bare',O_LEFT,TERRA,'#c7a58a'),(830,'COVERED & DIVERSIFIED','living',O_RIGHT,'#5f7445',LINE)]:
        s.append(box(x,160,700,720,stroke=stroke)); s.append(text(x+350,215,[label],30,700,INK,ls=1.2))
        s.append(f'<g transform="translate({x+30} 240)">{orchard_scene(kind)}</g>')
        s.append(bullet_list(x+60,722,items,26,UMBER,dot))
    s.append(text(800,925,['Fit water, species and earthworks to the actual site: observe slope, soil, rainfall and fire exposure, and plan safe overflow.'],22,400,UMBER))
    s.append(text(800,965,['Illustrative concept · not matched before/after imagery · not a surveyed drainage or earthworks plan'],21,700,'#6b6650'))
    return svg(W,H,O_TITLE,O_DESC,''.join(s))
def orchard_port():
    W,H=900,2170; s=[]
    s.append(text(450,90,['FROM EXPOSED GROUND'],44,700,INK,font=SERIF,ls=1)); s.append(text(450,144,['TOWARD A LIVING ORCHARD'],44,700,INK,font=SERIF,ls=1))
    s.append(text(450,196,['Two design conditions · not a before-and-after'],27,400,UMBER))
    y=232
    for label,kind,items,dot,stroke,hh in [('EXPOSED GROUND','bare',O_LEFT,TERRA,'#c7a58a',800),('COVERED & DIVERSIFIED','living',O_RIGHT,'#5f7445',LINE,845)]:
        s.append(box(50,y,800,hh,stroke=stroke)); s.append(text(450,y+60,[label],34,700,INK,ls=1.2))
        s.append(f'<g transform="translate(82 {y+88}) scale(1.15)">{orchard_scene(kind)}</g>')
        s.append(bullet_list(95,y+665,items,30,UMBER,dot,lh=1.5)); y+=hh+30
    s.append(text(450,y+45,['Fit water, species and earthworks to','the actual site: slope, soil, rainfall,','fire exposure and safe overflow.'],27,400,UMBER,lh=1.4))
    s.append(text(450,y+180,['Illustrative concept · not a surveyed','drainage or earthworks plan'],24,700,'#6b6650',lh=1.4))
    return svg(W,H,O_TITLE,O_DESC,''.join(s))

save('12-biomass-loop-v2.svg',biomass_land()); save('12-biomass-loop-v2-portrait.svg',biomass_port())
save('10-living-soil-sponge-water-v2.svg',soil_land()); save('10-living-soil-sponge-water-v2-portrait.svg',soil_port())
save('13-living-orchard-relationships-v2.svg',orchard_land()); save('13-living-orchard-relationships-v2-portrait.svg',orchard_port())
print('ok')
