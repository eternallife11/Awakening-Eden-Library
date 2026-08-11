(function(){
  const symbol = document.querySelector('.ae-growth-symbol');
  const root = document.documentElement;
  if(!symbol) return;
  const stages = [
    {p:0.00, src:'assets/growth/growth-stage-01.webp'},
    {p:0.16, src:'assets/growth/growth-stage-02.webp'},
    {p:0.34, src:'assets/growth/growth-stage-03.webp'},
    {p:0.54, src:'assets/growth/growth-stage-05.webp'},
    {p:0.78, src:'assets/growth/growth-stage-07.webp'},
    {p:0.94, src:'assets/growth/growth-stage-08.webp'}
  ];
  let image = symbol.querySelector('img');
  if(!image){
    image = document.createElement('img');
    image.className = 'growth-seed-icon';
    image.width = 96;
    image.height = 96;
    image.alt = '';
    symbol.replaceChildren(image);
  }
  function updateGrowth(){
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, window.scrollY / max));
    root.style.setProperty('--ae-growth', p.toFixed(3));
    let src = stages[0].src;
    for(const stage of stages){ if(p >= stage.p) src = stage.src; }
    if(image.getAttribute('src') !== src){
      symbol.style.opacity = '0';
      setTimeout(()=>{ image.src = src; symbol.style.opacity = '1'; },120);
    }
    document.body.classList.toggle('ae-growth-final', p > .90);
  }
  updateGrowth();
  window.addEventListener('scroll', updateGrowth, {passive:true});
  window.addEventListener('resize', updateGrowth);
})();
