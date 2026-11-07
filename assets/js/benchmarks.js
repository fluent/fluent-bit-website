document.querySelectorAll('[data-benchmark-switch]').forEach((select) => {
  const group = select.closest('[data-benchmark-group]');
  const panels = group.querySelectorAll('[data-benchmark-metric]');
  const update = () => {
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.benchmarkMetric !== select.value;
    });
  };
  select.addEventListener('change', update);
  update();
  select.closest('label').hidden = false;
});
