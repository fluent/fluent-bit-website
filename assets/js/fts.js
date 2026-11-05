document.querySelectorAll('[data-fts-signals]').forEach((explorer) => {
  const tablist = explorer.querySelector('.fts-signal-tabs');
  const tabs = Array.from(explorer.querySelectorAll('[data-fts-tab]'));
  const panels = Array.from(explorer.querySelectorAll('[data-fts-panel]'));

  function select(tab, moveFocus = false) {
    tabs.forEach((item) => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.ftsPanel !== tab.dataset.ftsTab;
    });
    if (moveFocus) tab.focus();
  }

  tablist.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `fts-panel-${tab.dataset.ftsTab}`);
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        select(tabs[next], true);
      }
    });
  });
  panels.forEach((panel) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `fts-tab-${panel.dataset.ftsPanel}`);
    panel.tabIndex = 0;
  });
  select(tabs[0]);
  tablist.hidden = false;
});
