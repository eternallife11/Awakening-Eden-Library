(function(){
  const symbol = document.querySelector('.ae-growth-symbol');
  const root = document.documentElement;
  if(!symbol) return;
  const stages = [
    {p:0.00, icon:'🌰'},
    {p:0.16, icon:'🌱'},
    {p:0.34, icon:'🌿'},
    {p:0.54, icon:'🌳'},
    {p:0.78, icon:'🌳🦋'},
    {p:0.94, icon:'🦋'}
  ];
  function updateGrowth(){
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, window.scrollY / max));
    root.style.setProperty('--ae-growth', p.toFixed(3));
    let icon = stages[0].icon;
    for(const stage of stages){ if(p >= stage.p) icon = stage.icon; }
    if(symbol.textContent !== icon){ symbol.style.opacity = '0'; setTimeout(()=>{symbol.textContent = icon; symbol.style.opacity='1';},120); }
    document.body.classList.toggle('ae-growth-final', p > .90);
  }
  updateGrowth();
  window.addEventListener('scroll', updateGrowth, {passive:true});
  window.addEventListener('resize', updateGrowth);
})();
