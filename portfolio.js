// Progressive enhancement: the story and project details work without JavaScript.
const tools = document.querySelector('.archive-tools');
if (tools) {
  tools.hidden = false;
  const projects = [...document.querySelectorAll('.project')];
  const search = document.querySelector('#project-search');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const count = document.querySelector('#project-count');
  let category = 'All';
  function filter() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    projects.forEach(project => {
      const matches = (category === 'All' || project.dataset.category === category) && project.textContent.toLowerCase().includes(query);
      project.hidden = !matches;
      if (matches) visible++;
    });
    count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
    document.querySelector('.empty-state').hidden = visible !== 0;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  }
  buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; filter(); }));
  search.addEventListener('input', filter);
  function openProject(hash, focus = false) {
    const target = projects.find(project => '#' + project.id === hash);
    if (!target) return;
    category = 'All'; search.value = ''; filter(); target.open = true;
    requestAnimationFrame(() => {
      target.scrollIntoView({block:'start',behavior:'instant'});
      if (focus) target.querySelector('summary').focus({preventScroll:true});
    });
  }
  document.querySelectorAll('.project-jump').forEach(anchor => anchor.addEventListener('click', event => {
    event.preventDefault();
    const hash = anchor.getAttribute('href');
    history.pushState(null, '', hash);
    openProject(hash, true);
  }));
  window.addEventListener('hashchange', () => openProject(location.hash));
  openProject(location.hash);
}
const emailBtn = document.getElementById('email-copy');
if (emailBtn) {
  emailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('buzzaryanrai@gmail.com').then(() => {
      emailBtn.textContent = 'Copied!';
      emailBtn.classList.add('copied');
      setTimeout(() => {
        emailBtn.textContent = 'buzzaryanrai@gmail.com';
        emailBtn.classList.remove('copied');
      }, 2000);
    });
  });
}
const chapters = [...document.querySelectorAll('.chapter')];
if (chapters.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.chapter-nav a').forEach(anchor => {
        const current = anchor.hash === '#' + entry.target.id;
        if (current) anchor.setAttribute('aria-current', 'location');
        else anchor.removeAttribute('aria-current');
      });
    });
  }, {rootMargin:'-20% 0px -65% 0px'});
  chapters.forEach(chapter => observer.observe(chapter));
}
