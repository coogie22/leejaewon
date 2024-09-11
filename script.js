const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '온도',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1
        }, {
            label: '습도',
            data: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

let updateInterval = 1000;

// 시계 업데이트
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;
}

// 차트 업데이트
function updateChart() {
    const now = new Date();
    const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    if (myChart.data.labels.length >= 20) {
        myChart.data.labels.shift();
        myChart.data.datasets.forEach(dataset => dataset.data.shift());
    }

    myChart.data.labels.push(timeLabel);
    myChart.data.datasets[0].data.push(Math.random() * 30 + 20);
    myChart.data.datasets[1].data.push(Math.random() * 50 + 30);

    myChart.update();
}

// 주기적으로 차트와 시계 업데이트
let chartInterval = setInterval(() => {
    updateClock();
    updateChart();
}, updateInterval);

// 시간 단위 설정
function setTimeRange() {
    const input = document.getElementById('timeInput').value;
    const unit = document.getElementById('timeUnit').value;

    if (input) {
        let intervalInSeconds = parseInt(input);

        switch (unit) {
            case 'minutes':
                intervalInSeconds *= 60;
                break;
            case 'hours':
                intervalInSeconds *= 3600;
                break;
            case 'seconds':
            default:
                break;
        }

        updateInterval = intervalInSeconds * 1000;
        clearInterval(chartInterval);
        chartInterval = setInterval(() => {
            updateClock();
            updateChart();
        }, updateInterval);

        alert(`차트가 ${input} ${unit === 'seconds' ? '초' : unit === 'minutes' ? '분' : '시간'} 간격으로 업데이트됩니다.`);
    }
}

// 온도 및 습도 설정
function setTemperature() {
    const temperature = prompt('설정할 온도를 입력하세요 (예: 22):');
    if (temperature !== null) {
        alert(`온도가 ${temperature}로 설정되었습니다.`);
    }
}

function setHumidity() {
    const humidity = prompt('설정할 습도를 입력하세요 (예: 60):');
    if (humidity !== null) {
        alert(`습도가 ${humidity}로 설정되었습니다.`);
    }
}
