/* Gráficos do protótipo com Apache ECharts 6.1.0. */
(() => {
  if (!window.echarts) return;

  const instances = new Set();
  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const instance = echarts.getInstanceByDom(entry.target);
      if (instance) instance.resize();
    }
  });
  const tooltip = {
    trigger: 'item',
    confine: true,
    backgroundColor: '#172033',
    borderWidth: 0,
    textStyle: { color: '#fff', fontFamily: 'Manrope, Arial, sans-serif', fontSize: 12 },
    extraCssText: 'border-radius:8px;box-shadow:0 8px 24px rgba(23,32,51,.16);'
  };

  function register(node) {
    const chart = echarts.init(node, null, { renderer: 'canvas' });
    instances.add(chart);
    resizeObserver.observe(node);
    return chart;
  }

  function donut(node, items, total, unit) {
    if (echarts.getInstanceByDom(node)) return;
    node.replaceChildren();
    node.classList.add('echarts-mounted');
    node.style.background = 'none';
    const chart = register(node);
    chart.setOption({
      animationDuration: 350,
      aria: { enabled: true, decal: { show: false } },
      tooltip: { ...tooltip, formatter: params => `${params.marker} ${params.name}: <b>${params.value}</b> (${params.percent}%)` },
      series: [{
        type: 'pie',
        radius: ['38%', '84%'],
        center: ['50%', '50%'],
        label: { show: false },
        labelLine: { show: false },
        itemStyle: { borderColor: '#fff', borderWidth: 2 },
        emphasis: { scale: true, scaleSize: 5, itemStyle: { shadowBlur: 12, shadowColor: 'rgba(23,32,51,.22)' } },
        data: items.map(item => ({ name: item.name, value: item.value, itemStyle: { color: item.color } }))
      }]
    });
    const center = document.createElement('span');
    center.className = 'echarts-center';
    const value = document.createElement('strong');
    value.textContent = String(total);
    const caption = document.createElement('small');
    caption.textContent = unit;
    center.append(value, caption);
    node.append(center);
  }

  function bars(node, numeric) {
    if (echarts.getInstanceByDom(node)) return;
    const categories = [...node.querySelectorAll(':scope > div > small')].map(label => label.textContent.trim());
    if (!categories.length) return;
    node.replaceChildren();
    node.classList.add('echarts-mounted');
    const chart = register(node);

    if (!numeric) {
      const seriesData = [
        { name: 'Não observado', color: '#92969f', values: [0, 0, 0, 0] },
        { name: 'Em desenvolvimento', color: '#f28d36', values: [0, 0, 50, 0] },
        { name: 'Esperado', color: '#3694d9', values: [100, 50, 0, 100] },
        { name: 'Referência', color: '#afd06b', values: [0, 50, 50, 0] }
      ];
      chart.setOption({
        animationDuration: 350,
        aria: { enabled: true, decal: { show: false } },
        tooltip: {
          ...tooltip,
          formatter: params => `${params.marker} <b>${params.name}</b> · ${params.seriesName}: <b>${params.value}%</b>`
        },
        grid: { left: 4, right: 4, top: 8, bottom: 32, containLabel: false },
        xAxis: { type: 'category', data: categories, axisTick: { show: false }, axisLine: { show: false }, axisLabel: { color: '#536176', fontFamily: 'Manrope, Arial', fontSize: 12, fontWeight: 500, interval: 0 } },
        yAxis: { type: 'value', max: 100, show: false },
        series: seriesData.map(item => ({
          name: item.name,
          type: 'bar',
          stack: 'respostas',
          barWidth: 52,
          data: item.values,
          itemStyle: { color: item.color, borderColor: '#fff', borderWidth: 1 },
          emphasis: { focus: 'self', itemStyle: { shadowBlur: 10, shadowColor: 'rgba(23,32,51,.24)' } }
        }))
      });
    } else {
      const scoreColors = ['#a50e1b', '#cd1929', '#ed263b', '#f34d59', '#ef7911', '#f4ad37', '#56c66c', '#39ac51', '#2f9441', '#267536'];
      // Realistic score distribution across perspectives: Líder (nota 9: 100%), Pares (nota 10: 50%, nota 9: 25%, nota 8: 25%), Outros (nota 8: 50%, nota 7: 50%), Auto (nota 9: 100%)
      const dist = {
        'Nota 7': [0, 0, 50, 0],
        'Nota 8': [0, 25, 50, 0],
        'Nota 9': [100, 25, 0, 100],
        'Nota 10': [0, 50, 0, 0]
      };
      const seriesList = scoreColors.map((color, i) => {
        const name = `Nota ${i + 1}`;
        return {
          name,
          type: 'bar',
          stack: 'respostas',
          barWidth: 52,
          data: dist[name] || [0, 0, 0, 0],
          itemStyle: { color, borderColor: '#fff', borderWidth: 0.5 },
          emphasis: { focus: 'self', itemStyle: { shadowBlur: 10, shadowColor: 'rgba(23,32,51,.24)' } }
        };
      });
      chart.setOption({
        animationDuration: 350,
        aria: { enabled: true, decal: { show: false } },
        tooltip: {
          ...tooltip,
          formatter: params => params.value > 0 ? `${params.marker} <b>${params.name}</b> · ${params.seriesName}: <b>${params.value}%</b>` : ''
        },
        grid: { left: 4, right: 4, top: 8, bottom: 32, containLabel: false },
        xAxis: { type: 'category', data: categories, axisTick: { show: false }, axisLine: { show: false }, axisLabel: { color: '#536176', fontFamily: 'Manrope, Arial', fontSize: 12, fontWeight: 500, interval: 0 } },
        yAxis: { type: 'value', max: 100, show: false },
        series: seriesList
      });
    }
  }

  function mountAll() {
    for (const instance of instances) {
      if (!instance.getDom().isConnected) {
        resizeObserver.unobserve(instance.getDom());
        instance.dispose();
        instances.delete(instance);
      }
    }
    document.querySelectorAll('.chart-card .mini-donut').forEach(node => {
      const card = node.closest('.chart-card');
      const items = [...card.querySelectorAll('.chart-legend > div')].map(row => ({
        name: row.querySelector('span').textContent.trim(),
        value: Number(row.querySelector('b').textContent.trim()),
        color: row.querySelector('i').style.backgroundColor
      }));
      donut(node, items, node.querySelector('b')?.textContent.trim() || items.reduce((sum, item) => sum + item.value, 0), 'Total');
    });
    document.querySelectorAll('.report .donut').forEach(node => {
      const numeric = node.classList.contains('numeric-donut');
      if (numeric) {
        const items = [
          { name: 'Nota 10', value: 2, color: '#267536' },
          { name: 'Nota 9', value: 3, color: '#2f9441' },
          { name: 'Nota 8', value: 2, color: '#39ac51' },
          { name: 'Nota 7', value: 1, color: '#56c66c' }
        ];
        donut(node, items, 8, 'Respostas');
      } else {
        const items = [
          { name: 'Esperado', value: 4, color: '#3694d9' },
          { name: 'Referência', value: 3, color: '#afd06b' },
          { name: 'Em desenvolvimento', value: 1, color: '#f28d36' }
        ];
        donut(node, items, 8, 'Respostas');
      }
    });
    document.querySelectorAll('.report .bars').forEach(node => bars(node, !!node.querySelector('.numeric-bar')));
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; mountAll(); });
  };
  new MutationObserver(schedule).observe(document.querySelector('#app'), { childList: true, subtree: true });
  new MutationObserver(schedule).observe(document.querySelector('#modal-body'), { childList: true, subtree: true });
  addEventListener('resize', schedule);
  schedule();
})();
