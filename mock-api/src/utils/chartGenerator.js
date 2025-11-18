const QuickChart = require('quickchart-js');

const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 320;

function createChart(config, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
  const chart = new QuickChart();
  chart.setConfig(config);
  chart.setBackgroundColor('#ffffff');
  chart.setWidth(width);
  chart.setHeight(height);
  return chart;
}

async function renderChart(config, width, height) {
  const chart = createChart(config, width, height);
  try {
    return await chart.getShortUrl();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('QuickChart short URL fallback', error);
    return chart.getUrl();
  }
}

async function generateSalesChart(series) {
  const config = {
    type: 'line',
    data: {
      labels: series.labels,
      datasets: [
        {
          label: 'This week',
          data: series.currentWeek,
          borderColor: '#2563eb',
          fill: false,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: '#2563eb',
        },
        {
          label: 'Last week',
          data: series.previousWeek,
          borderColor: '#94a3b8',
          borderDash: [6, 4],
          fill: false,
          tension: 0.35,
          pointRadius: 0,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Sales trend (7 days)',
        },
        legend: {
          position: 'bottom',
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => `$${value.toLocaleString()}`,
          },
          beginAtZero: true,
        },
      },
    },
  };

  return renderChart(config);
}

async function generateProductChart(products) {
  const labels = products.map((item) => item.name);
  const values = products.map((item) => item.percentage);
  const colors = products.map((item) => {
    if (item.status === 'winner') return '#16a34a';
    if (item.status === 'underperformer') return '#dc2626';
    return '#3b82f6';
  });

  const config = {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Share of sales (%)',
          data: values,
          backgroundColor: colors,
          borderRadius: 6,
          barThickness: 18,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      plugins: {
        title: {
          display: true,
          text: 'Product performance',
        },
        legend: { display: false },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `${value}%`,
          },
          max: 30,
        },
      },
    },
  };

  return renderChart(config, 640, 360);
}

async function generateTrendChart(series) {
  const anomalyPoints = series.anomalies?.map((index) => ({
    x: series.labels[index],
    y: series.sales[index],
  })) || [];

  const config = {
    type: 'line',
    data: {
      labels: series.labels,
      datasets: [
        {
          label: 'Sales ($)',
          data: series.sales,
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14, 165, 233, 0.08)',
          tension: 0.35,
          yAxisID: 'ySales',
          fill: true,
        },
        {
          label: 'Traffic',
          data: series.traffic,
          borderColor: '#a855f7',
          tension: 0.35,
          yAxisID: 'yTraffic',
          fill: false,
        },
        {
          label: 'Avg ticket ($)',
          data: series.avgTicket,
          borderColor: '#f97316',
          tension: 0.35,
          yAxisID: 'yTicket',
          fill: false,
        },
        {
          type: 'scatter',
          label: 'Anomaly',
          data: anomalyPoints,
          pointBackgroundColor: '#ef4444',
          pointBorderColor: '#ef4444',
          pointRadius: 5,
          showLine: false,
          yAxisID: 'ySales',
        },
      ],
    },
    options: {
      interaction: { mode: 'index', intersect: false },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: '30-day performance trends',
        },
        legend: {
          position: 'bottom',
        },
      },
      scales: {
        ySales: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Sales ($)',
          },
          grid: { drawOnChartArea: false },
        },
        yTraffic: {
          type: 'linear',
          position: 'right',
          title: { display: true, text: 'Traffic' },
          grid: { drawOnChartArea: false },
        },
        yTicket: {
          type: 'linear',
          position: 'right',
          title: { display: true, text: 'Avg Ticket ($)' },
          grid: { drawOnChartArea: false },
          min: 12,
          max: 24,
        },
      },
    },
  };

  return renderChart(config, 680, 360);
}

async function generateCampaignAudienceChart(audience) {
  const config = {
    type: 'doughnut',
    data: {
      labels: audience.map((segment) => segment.segment),
      datasets: [
        {
          label: 'Audience share',
          data: audience.map((segment) => segment.percentage),
          backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#ef4444'],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Campaign audience mix',
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  };

  return renderChart(config, 460, 300);
}

async function generateSparklineChart(metrics) {
  const config = {
    type: 'line',
    data: {
      labels: metrics.labels,
      datasets: metrics.series.map((metric) => ({
        label: metric.label,
        data: metric.trend,
        borderColor: metric.color,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35,
        fill: false,
      })),
    },
    options: {
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { display: false },
        y: { display: false },
      },
    },
  };

  return renderChart(config, 420, 180);
}

async function generateActionMatrixChart(actions) {
  const actionDataset = actions.map((action) => ({
    x: action.effort,
    y: action.impact,
    r: Math.max(6, Math.min(18, Math.round(action.lift / 250))),
    label: action.title,
    lift: action.lift,
  }));

  const guideLines = [
    {
      type: 'line',
      label: 'Impact threshold',
      data: [
        { x: 0, y: 5 },
        { x: 10, y: 5 },
      ],
      borderColor: '#d4d4d8',
    },
    {
      type: 'line',
      label: 'Effort threshold',
      data: [
        { x: 5, y: 0 },
        { x: 5, y: 10 },
      ],
      borderColor: '#d4d4d8',
    },
  ].map((line) => ({
    type: 'line',
    data: line.data,
    borderColor: line.borderColor,
    borderDash: [4, 4],
    pointRadius: 0,
    fill: false,
    showLine: true,
  }));

  const config = {
    type: 'bubble',
    data: {
      datasets: [
        ...guideLines,
        {
          label: 'Recommended actions',
          data: actionDataset,
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          borderColor: '#2563eb',
        },
      ],
    },
    options: {
      parsing: false,
      plugins: {
        title: {
          display: true,
          text: 'Impact vs. effort',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const data = context.raw;
              return `${data.label}: impact ${data.y}/10, effort ${data.x}/10, ~$${data.lift.toLocaleString()} lift`;
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: 'Effort' },
          min: 0,
          max: 10,
        },
        y: {
          title: { display: true, text: 'Impact' },
          min: 0,
          max: 10,
        },
      },
    },
  };

  return renderChart(config, 520, 340);
}

module.exports = {
  generateSalesChart,
  generateProductChart,
  generateTrendChart,
  generateCampaignAudienceChart,
  generateSparklineChart,
  generateActionMatrixChart,
};
