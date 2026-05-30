(() => {
  const root = document.documentElement;
  const storageKey = 'tadami-theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const setTheme = (theme, persist = true) => {
    root.dataset.theme = theme;
    if (persist) localStorage.setItem(storageKey, theme);
  };

  const savedTheme = localStorage.getItem(storageKey);
  setTheme(savedTheme || (prefersDark.matches ? 'dark' : 'light'), Boolean(savedTheme));

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  });

  prefersDark.addEventListener?.('change', (event) => {
    if (!localStorage.getItem(storageKey)) setTheme(event.matches ? 'dark' : 'light', false);
  });

  const header = document.querySelector('[data-header]');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(open));
    navLinks?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  });
  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle?.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    });
  });

  const revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }

  document.querySelectorAll('.feature-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });

  const mediaCopy = {
    Anime: {
      title: 'Start watching',
      copy: 'Add anime sources and continue your queue from a single Aurora hub.',
      glyph: 'play'
    },
    Manga: {
      title: 'Continue reading',
      copy: 'Manage chapters, covers and updates with polished title cards.',
      glyph: 'book'
    },
    Ranobe: {
      title: 'Open a novel',
      copy: 'Tune long-form reading, sync progress and keep your library calm.',
      glyph: 'novel'
    }
  };

  const mediaTabs = [...document.querySelectorAll('[data-media-tab]')];
  const mediaTitle = document.querySelector('[data-media-title]');
  const mediaText = document.querySelector('[data-media-copy]');
  const mediaGlyph = document.querySelector('[data-media-glyph]');
  let mediaIndex = 0;

  const activateMedia = (name) => {
    const copy = mediaCopy[name];
    if (!copy) return;
    mediaTabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.mediaTab === name));
    if (mediaTitle) mediaTitle.textContent = copy.title;
    if (mediaText) mediaText.textContent = copy.copy;
    if (mediaGlyph) mediaGlyph.dataset.glyph = copy.glyph;
  };

  mediaTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      mediaIndex = index;
      activateMedia(tab.dataset.mediaTab);
    });
  });

  if (mediaTabs.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => {
      mediaIndex = (mediaIndex + 1) % mediaTabs.length;
      activateMedia(mediaTabs[mediaIndex].dataset.mediaTab);
    }, 3600);
  }

  const formatNumber = (value) => new Intl.NumberFormat('en', { notation: value > 999 ? 'compact' : 'standard' }).format(value);
  const repo = 'andarcanum/Tadami-Aniyomi-fork';
  const releaseFallback = {
    tag_name: '0.45',
    name: 'Tadami v0.45',
    html_url: 'https://github.com/andarcanum/Tadami-Aniyomi-fork/releases/latest',
    body: 'Guided onboarding, Treasury rewards, per-media library auto-update schedules and another round of Aurora and novel sync refinements.',
    published_at: '2026-05-20T20:14:00Z',
    assets: []
  };

  const updateRelease = (release) => {
    const name = release.name || `Tadami ${release.tag_name}`;
    const title = document.querySelector('[data-release-title]');
    const nameBadge = document.querySelector('[data-release-name]');
    const body = document.querySelector('[data-release-body]');
    const date = document.querySelector('[data-release-date]');
    const apk = release.assets?.find((asset) => /\.apk$/i.test(asset.name));
    const releaseUrl = apk?.browser_download_url || release.html_url || releaseFallback.html_url;

    if (title) title.textContent = name;
    if (nameBadge) nameBadge.textContent = release.tag_name?.replace(/^v/i, 'v') || 'Latest';
    if (body && release.body) {
      const cleanBody = release.body
        .replace(/[#*_`>-]/g, '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, 2)
        .join(' ');
      body.textContent = cleanBody || releaseFallback.body;
    }
    if (date && release.published_at) {
      date.textContent = `Published ${new Date(release.published_at).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    }
    document.querySelectorAll('[data-download-link]').forEach((link) => {
      link.href = releaseUrl;
      if (apk) link.setAttribute('title', `Download ${apk.name}`);
    });
  };

  fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers: { Accept: 'application/vnd.github+json' } })
    .then((response) => response.ok ? response.json() : releaseFallback)
    .then(updateRelease)
    .catch(() => updateRelease(releaseFallback));

  fetch(`https://api.github.com/repos/${repo}`, { headers: { Accept: 'application/vnd.github+json' } })
    .then((response) => response.ok ? response.json() : null)
    .then((data) => {
      if (!data) return;
      document.querySelectorAll('[data-stars]').forEach((node) => { node.textContent = formatNumber(data.stargazers_count); });
    })
    .catch(() => {});

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
})();
