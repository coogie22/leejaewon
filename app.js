// app.js
document.addEventListener('DOMContentLoaded', () => {
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const svg = d3.select('#chart')
        .attr('width', width)
        .attr('height', height);

    const x = d3.scaleTime().range([margin.left, width - margin.right]);
    const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);

    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value));

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height - margin.bottom})`);

    svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${margin.left},0)`);

    const tempLine = svg.append('path')
        .attr('class', 'line')
        .attr('stroke', 'red');

    const humidityLine = svg.append('path')
        .attr('class', 'line')
        .attr('stroke', 'blue');

    const waterLevelLine = svg.append('path')
        .attr('class', 'line')
        .attr('stroke', 'green');

    let data = {
        temperature: [],
        humidity: [],
        waterLevel: []
    };

    const updateChart = () => {
        const now = new Date();

        // 임의의 데이터 생성 (실제 사용 시 서버에서 받아오는 데이터로 대체)
        const newTemp = Math.floor(Math.random() * 10) + 20;
        const newHumidity = Math.floor(Math.random() * 20) + 50;
        const newWaterLevel = Math.floor(Math.random() * 20) + 60;

        data.temperature.push({ date: now, value: newTemp });
        data.humidity.push({ date: now, value: newHumidity });
        data.waterLevel.push({ date: now, value: newWaterLevel });

        // 데이터가 20개를 초과하면 오래된 데이터 삭제
        if (data.temperature.length > 20) {
            data.temperature.shift();
            data.humidity.shift();
            data.waterLevel.shift();
        }

        x.domain(d3.extent(data.temperature, d => d.date));
        y.domain([0, 100]);

        svg.select('.x-axis').call(xAxis);
        svg.select('.y-axis').call(yAxis);

        tempLine.datum(data.temperature)
            .attr('d', line)
            .attr('stroke', 'red');

        humidityLine.datum(data.humidity)
            .attr('d', line)
            .attr('stroke', 'blue');

        waterLevelLine.datum(data.waterLevel)
            .attr('d', line)
            .attr('stroke', 'green');
    };

    let updateInterval;

    document.getElementById('startUpdates').addEventListener('click', () => {
        if (!updateInterval) {
            updateInterval = setInterval(updateChart, 2000); // 2초마다 데이터 업데이트
        }
    });

    document.getElementById('stopUpdates').addEventListener('click', () => {
        clearInterval(updateInterval);
        updateInterval = null;
    });
});
