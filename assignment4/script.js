// Mock Data for Multiple Cities
const weatherData = {
    london: {
        current: { temp: 15, humidity: 72, wind: 12, aqi: 45 },
        trends: {
            temp: [12, 14, 15, 13, 16, 18, 15],
            humidity: [65, 70, 72, 68, 60, 62, 72],
            wind: [10, 15, 12, 8, 14, 20, 12]
        },
        conditions: { sunny: 30, cloudy: 50, rainy: 20 }
    },
    newyork: {
        current: { temp: 22, humidity: 45, wind: 18, aqi: 62 },
        trends: {
            temp: [18, 20, 22, 21, 25, 23, 22],
            humidity: [50, 48, 45, 42, 40, 44, 45],
            wind: [15, 12, 18, 22, 10, 14, 18]
        },
        conditions: { sunny: 60, cloudy: 30, rainy: 10 }
    },
    tokyo: {
        current: { temp: 26, humidity: 60, wind: 8, aqi: 85 },
        trends: {
            temp: [24, 25, 26, 26, 28, 27, 26],
            humidity: [55, 58, 60, 65, 62, 59, 60],
            wind: [5, 6, 8, 10, 7, 5, 8]
        },
        conditions: { sunny: 40, cloudy: 40, rainy: 20 }
    },
    mumbai: {
        current: { temp: 32, humidity: 80, wind: 10, aqi: 110 },
        trends: {
            temp: [30, 31, 32, 33, 31, 30, 32],
            humidity: [75, 78, 80, 85, 82, 79, 80],
            wind: [8, 9, 10, 12, 15, 11, 10]
        },
        conditions: { sunny: 20, cloudy: 60, rainy: 20 }
    }
};

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Chart Instances
let tempChart, humidityChart, windChart, conditionChart;

let isDarkMode = false;

document.addEventListener('DOMContentLoaded', () => {
    // Initial Load
    initDashboard('london');

    // Location Change Listener
    document.getElementById('location-select').addEventListener('change', (e) => {
        showLoading();
        setTimeout(() => {
            updateDashboard(e.target.value);
            hideLoading();
        }, 800); // Simulate network request
    });

    // Theme Toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode');
        const icon = document.querySelector('#theme-toggle i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }

        // Update Chart colors globally
        updateChartThemes();
    });

    // Hide loading screen after full init
    setTimeout(() => hideLoading(), 1000);
});

function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

function getCurrentChartColors() {
    const root = getComputedStyle(document.body);
    return {
        textColor: root.getPropertyValue('--text-primary').trim() || (isDarkMode ? '#f9fafb' : '#1f2937'),
        gridColor: root.getPropertyValue('--chart-grid').trim() || (isDarkMode ? '#374151' : '#e5e7eb'),
    };
}

function initDashboard(cityKey) {
    updateDOM(weatherData[cityKey].current);
    initCharts(weatherData[cityKey]);
}

function updateDashboard(cityKey) {
    const data = weatherData[cityKey];
    updateDOM(data.current);

    // Update Chart Data smoothly
    tempChart.data.datasets[0].data = data.trends.temp;
    tempChart.update();

    humidityChart.data.datasets[0].data = data.trends.humidity;
    humidityChart.update();

    windChart.data.datasets[0].data = data.trends.wind;
    windChart.update();

    conditionChart.data.datasets[0].data = [
        data.conditions.sunny,
        data.conditions.cloudy,
        data.conditions.rainy
    ];
    conditionChart.update();
}

function updateDOM(currentData) {
    // Animate DOM elements
    const elements = [
        { id: 'temp-val', text: currentData.temp + '°C' },
        { id: 'humidity-val', text: currentData.humidity + '%' },
        { id: 'wind-val', text: currentData.wind + ' km/h' },
        { id: 'aqi-val', text: currentData.aqi }
    ];

    elements.forEach(el => {
        const domEl = document.getElementById(el.id);
        domEl.style.opacity = '0';
        setTimeout(() => {
            domEl.textContent = el.text;
            domEl.style.opacity = '1';
        }, 300);
    });
}

function getBaseChartOptions(yAxisTitle) {
    const colors = getCurrentChartColors();
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: colors.textColor, font: { family: "'Inter', sans-serif" } }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
                titleColor: isDarkMode ? '#000' : '#fff',
                bodyColor: isDarkMode ? '#000' : '#fff',
                padding: 10,
                cornerRadius: 8,
                titleFont: { family: "'Inter', sans-serif" },
                bodyFont: { family: "'Inter', sans-serif" }
            }
        },
        scales: {
            x: {
                grid: { color: colors.gridColor, display: false },
                ticks: { color: colors.textColor, font: { family: "'Inter', sans-serif" } }
            },
            y: {
                grid: { color: colors.gridColor, drawBorder: false, borderDash: [5, 5] },
                ticks: { color: colors.textColor, font: { family: "'Inter', sans-serif" } },
                title: { display: true, text: yAxisTitle, color: colors.textColor, font: { family: "'Inter', sans-serif", weight: 'bold' } }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        },
        animation: {
            duration: 1000,
            easing: 'easeOutQuart'
        }
    };
}

function initCharts(data) {
    const colors = getCurrentChartColors();

    // 1. Temperature Line Chart (7 Days)
    const tempCtx = document.getElementById('tempChart').getContext('2d');
    const gradientTemp = tempCtx.createLinearGradient(0, 0, 0, 300);
    gradientTemp.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
    gradientTemp.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    tempChart = new Chart(tempCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: data.trends.temp,
                borderColor: '#3b82f6',
                backgroundColor: gradientTemp,
                borderWidth: 3,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#3b82f6',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.4 // Smooth curve
            }]
        },
        options: getBaseChartOptions('Celsius')
    });

    // 2. Humidity Bar Chart
    const humCtx = document.getElementById('humidityChart').getContext('2d');
    humidityChart = new Chart(humCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Humidity (%)',
                data: data.trends.humidity,
                backgroundColor: '#0ea5e9',
                borderRadius: 6,
                hoverBackgroundColor: '#0284c7'
            }]
        },
        options: getBaseChartOptions('Percentage')
    });

    // 3. Wind Speed Area Chart
    const windCtx = document.getElementById('windChart').getContext('2d');
    const gradientWind = windCtx.createLinearGradient(0, 0, 0, 300);
    gradientWind.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
    gradientWind.addColorStop(1, 'rgba(168, 85, 247, 0.0)');

    windChart = new Chart(windCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Wind Speed (km/h)',
                data: data.trends.wind,
                borderColor: '#a855f7',
                backgroundColor: gradientWind,
                borderWidth: 2,
                pointRadius: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: getBaseChartOptions('km/h')
    });

    // 4. Weather Condition Doughnut Chart
    const condCtx = document.getElementById('conditionChart').getContext('2d');
    conditionChart = new Chart(condCtx, {
        type: 'doughnut',
        data: {
            labels: ['Sunny', 'Cloudy', 'Rainy'],
            datasets: [{
                data: [data.conditions.sunny, data.conditions.cloudy, data.conditions.rainy],
                backgroundColor: ['#f59e0b', '#94a3b8', '#3b82f6'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: colors.textColor,
                        padding: 20,
                        font: { family: "'Inter', sans-serif" }
                    }
                },
                tooltip: {
                    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
                    titleColor: isDarkMode ? '#000' : '#fff',
                    bodyColor: isDarkMode ? '#000' : '#fff',
                    padding: 10,
                    cornerRadius: 8
                }
            },
            cutout: '70%',
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

function updateChartThemes() {
    const colors = getCurrentChartColors();
    const tooltipBg = isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)';
    const tooltipColor = isDarkMode ? '#000' : '#fff';

    const lineCharts = [tempChart, humidityChart, windChart];

    lineCharts.forEach(chart => {
        if (chart) {
            chart.options.scales.x.ticks.color = colors.textColor;
            chart.options.scales.y.ticks.color = colors.textColor;
            chart.options.scales.y.title.color = colors.textColor;
            chart.options.scales.x.grid.color = colors.gridColor;
            chart.options.scales.y.grid.color = colors.gridColor;
            chart.options.plugins.legend.labels.color = colors.textColor;

            // Tooltip colors
            chart.options.plugins.tooltip.backgroundColor = tooltipBg;
            chart.options.plugins.tooltip.titleColor = tooltipColor;
            chart.options.plugins.tooltip.bodyColor = tooltipColor;

            chart.update();
        }
    });

    if (conditionChart) {
        conditionChart.options.plugins.legend.labels.color = colors.textColor;
        conditionChart.options.plugins.tooltip.backgroundColor = tooltipBg;
        conditionChart.options.plugins.tooltip.titleColor = tooltipColor;
        conditionChart.options.plugins.tooltip.bodyColor = tooltipColor;
        conditionChart.update();
    }
}
