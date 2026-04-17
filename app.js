const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(a => {
  const href = a.getAttribute('href');
  if (href === path) a.classList.add('active');
});

const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('.main');

if (sidebar && main) {
  const titleSource =
    document.querySelector('.hero h1')?.textContent?.trim() ||
    document.querySelector('.subtitle')?.textContent?.trim() ||
    document.title;

  sidebar.id = 'site-sidebar';

  const mobileBar = document.createElement('div');
  mobileBar.className = 'mobile-bar';
  mobileBar.innerHTML = `
    <button class="mobile-menu-button" type="button" aria-expanded="false" aria-controls="site-sidebar">
      <span class="mobile-menu-icon" aria-hidden="true">☰</span>
      <span>目录</span>
    </button>
    <div class="mobile-bar-title">${titleSource}</div>
  `;

  const overlay = document.createElement('button');
  overlay.className = 'mobile-overlay';
  overlay.type = 'button';
  overlay.setAttribute('aria-label', '关闭目录');

  document.body.appendChild(overlay);
  main.prepend(mobileBar);

  const menuButton = mobileBar.querySelector('.mobile-menu-button');

  const setSidebarOpen = (open) => {
    document.body.classList.toggle('sidebar-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  };

  menuButton.addEventListener('click', () => {
    setSidebarOpen(!document.body.classList.contains('sidebar-open'));
  });

  overlay.addEventListener('click', () => setSidebarOpen(false));

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => setSidebarOpen(false));
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setSidebarOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) setSidebarOpen(false);
  });
}

const backToTopButton = document.createElement('button');
backToTopButton.className = 'back-to-top';
backToTopButton.type = 'button';
backToTopButton.setAttribute('aria-label', '回到顶部');
backToTopButton.innerHTML = '<span aria-hidden="true">↑</span>';
document.body.appendChild(backToTopButton);

const syncBackToTopVisibility = () => {
  const shouldShow = window.scrollY > 360;
  backToTopButton.classList.toggle('visible', shouldShow);
};

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', syncBackToTopVisibility, { passive: true });
syncBackToTopVisibility();
