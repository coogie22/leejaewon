document.addEventListener("DOMContentLoaded", function() {
    const progressBar = document.getElementById('progress-bar');
    const percentageDisplay = document.getElementById('percentage');
    const remainingDaysDisplay = document.getElementById('remaining-days');

    function updateProgressBar() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const endOfYear = new Date(now.getFullYear(), 11, 31);

        const totalTimeInYear = endOfYear - startOfYear; // 밀리초로 연 계산
        const timePassed = now - startOfYear; // 올해가 시작된 후 경과한 시간(밀리초)
        const timeLeft = totalTimeInYear - timePassed; // 남은 시간(밀리초)

        const percentagePassed = (timePassed / totalTimeInYear) * 100; // 퍼센트 계산
        const daysLeft = timeLeft / (1000 * 60 * 60 * 24); // 남은 일 계산

        // 프로그래스 바 업데이트
        progressBar.style.width = percentagePassed + "%";

        // 텍스트 업데이트
        percentageDisplay.textContent = `올해가 ${percentagePassed.toFixed(8)}% 지났습니다.`;
        remainingDaysDisplay.textContent = `남은 일수: ${Math.ceil(daysLeft)}일`;

        // 퍼센트가 실시간으로 증가하는 효과를 위해 100 밀리초마다 갱신
    }

    // 페이지가 로드되면 즉시 실행되고, 매 100밀리초마다 업데이트
    setInterval(updateProgressBar, 100);
});
