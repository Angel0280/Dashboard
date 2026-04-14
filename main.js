function loadSidebar() {
  const isPageFolder = window.location.pathname.includes('/page/');
  const sidebarPath = isPageFolder ? '../sidebar.html' : 'sidebar.html';

  fetch(sidebarPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error ${response.status} cargando ${sidebarPath}`);
      }
      return response.text();
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const header = doc.querySelector('header');
      const sidebar = doc.querySelector('.sidebar');
      if (!header || !sidebar) {
        throw new Error('No se encontró header o sidebar en sidebar.html');
      }

      const placeholder = document.getElementById('sidebar-placeholder');
      if (!placeholder) {
        throw new Error('No se encontró el placeholder para el sidebar');
      }

      if (isPageFolder) {
        sidebar.querySelectorAll('[data-href]').forEach(link => {
          const target = link.dataset.href;
          if (target) {
            link.setAttribute('href', target);
          }
        });
      }

      placeholder.innerHTML = header.outerHTML + sidebar.outerHTML;
    })
    .catch(error => console.error('Error cargando el sidebar:', error));
}

loadSidebar();
