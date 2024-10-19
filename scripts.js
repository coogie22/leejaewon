// scripts.js
document.getElementById('myButton').addEventListener('click', function() {
    window.location.href = 'https://github.com/coogie22'; // 원하는 링크로 변경
});

setInterval(function() {
    document.querySelector('.container input').click();
  }, 300); // 1000ms = 1초

        // Three.js를 사용하여 비 내리는 씬 생성
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('rainCanvas'), alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);

        // 바닥 생성
        const geometry = new THREE.PlaneGeometry(10, 10);
        const material = new THREE.MeshBasicMaterial({ color: 0x7CFC00 });
        const floor = new THREE.Mesh(geometry, material);
        floor.rotation.x = -Math.PI / 2; // 바닥을 수평으로
        scene.add(floor);

        // 비 생성
        const rainCount = 1000;
        const rainGeometry = new THREE.BufferGeometry();
        const rainVertices = new Float32Array(rainCount * 3);
        for (let i = 0; i < rainCount * 3; i++) {
            rainVertices[i] = (Math.random() - 0.5) * 30; // -50에서 50 사이의 값
        }
        rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainVertices, 3));
        const rainMaterial = new THREE.PointsMaterial({ color: 0xAAAAFF, size: 0.2 });
        const rain = new THREE.Points(rainGeometry, rainMaterial);
        scene.add(rain);

        camera.position.z = 5;

        const animate = function () {
            requestAnimationFrame(animate);
            rain.rotation.y += 0.01; // 비가 회전
            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

