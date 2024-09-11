const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['1시', '2시', '3시', '4시', '5시', '6시'],
        datasets: [{
            label: '온도',
            data: [20, 22, 19, 21, 24, 23],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1
        }, {
            label: '습도',
            data: [30, 32, 35, 31, 33, 30],
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

// 버튼 기능 예시 (실제 기능은 서버와 통신해야 함)
function water() {
    alert('물 주기 기능 호출');
}

function setTemperature() {
    alert('온도 조절 기능 호출');
}

function setHumidity() {
    alert('습도 조절 기능 호출');
}
