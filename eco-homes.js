// Awakening Eden eco-homes guide: self-contained, no tracking and no dependencies.
const filters=[...document.querySelectorAll('[data-filter]')];
const homes=[...document.querySelectorAll('.card[data-tier]')];
function showHomes(filter='all'){
  filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===filter)));
  homes.forEach(card=>{
    card.hidden=!(filter==='all'||card.dataset.tier===filter||card.dataset.audience===filter||(filter==='couple'&&card.dataset.audience==='cats'));
  });
  for(const id of ['curated','wood']){
    const heading=document.getElementById(id);
    const group=heading?.nextElementSibling;
    if(heading&&group?.classList.contains('cards')){
      const visible=[...group.querySelectorAll('.card')].some(card=>!card.hidden);
      heading.hidden=!visible;
      group.hidden=!visible;
    }
  }
}
filters.forEach(button=>button.addEventListener('click',()=>showHomes(button.dataset.filter)));
for(const img of document.querySelectorAll('.photo img')){
  const fallback=img.closest('.photo')?.querySelector('.photofallback');
  const hide=()=>{if(fallback)fallback.hidden=true};
  const show=()=>{img.hidden=true;img.style.display='none';if(fallback)fallback.hidden=false};
  img.addEventListener('load',hide);
  img.addEventListener('error',show);
  if(img.complete){if(img.naturalWidth>0)hide();else if(img.currentSrc)show();}
}
document.querySelector('[data-print]')?.addEventListener('click',()=>{showHomes('all');window.print()});
document.querySelector('[data-share]')?.addEventListener('click',async event=>{
  const button=event.currentTarget;
  const title=document.title;
  const url=location.href.split('#')[0];
  if(navigator.share){
    try{await navigator.share({title,url,text:'Awakening Eden: Affordable Eco Homes & Natural Building Kits'});return}
    catch(e){if(e?.name==='AbortError')return}
  }
  try{
    await navigator.clipboard.writeText(url);
    button.textContent='Link copied';
    setTimeout(()=>{button.textContent='Share guide'},2300);
  }catch{
    button.textContent='Copy URL from address bar';
    setTimeout(()=>{button.textContent='Share guide'},3500);
  }
});