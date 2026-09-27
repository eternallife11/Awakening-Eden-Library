(() => {
  const input = document.querySelector('.library-search__input');
  const clear = document.querySelector('.library-search__clear');
  const status = document.querySelector('.library-search__status');
  const cards = Array.from(document.querySelectorAll('.resource-card'));
  const sections = Array.from(document.querySelectorAll('.library-section'));

  if (!input || !cards.length) return;

  const normalize = (value) => value
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  const apply = () => {
    const query = normalize(input.value);
    let visible = 0;

    cards.forEach((card) => {
      const matches = !query || normalize(card.textContent).includes(query);
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    sections.forEach((section) => {
      const sectionCards = Array.from(section.querySelectorAll('.resource-card'));
      if (!sectionCards.length) return;
      section.hidden = Boolean(query) && !sectionCards.some((card) => !card.hidden);
    });

    clear.hidden = !query;
    status.textContent = query
      ? (visible ? `Showing ${visible} of ${cards.length} curated resources.` : 'No direct match yet. Try a broader word such as water, soil, film, breath or community.')
      : `Browse ${cards.length} curated resources, or search for one useful thread.`;
  };

  input.addEventListener('input', apply);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && input.value) {
      input.value = '';
      apply();
    }
  });
  clear.addEventListener('click', () => {
    input.value = '';
    apply();
    input.focus();
  });

  apply();
})();