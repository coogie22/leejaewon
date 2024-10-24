// 비 씬을 위한 Three.js 설정
const rainScene = new THREE.Scene();
const rainCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const rainRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('rainCanvas'), alpha: true });

rainRenderer.setSize(window.innerWidth, window.innerHeight);
rainCamera.position.z = 5;

// 바닥 생성
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x7CFC00 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
rainScene.add(floor);

// 비 생성
const rainCount = 1000;
const rainGeometry = new THREE.BufferGeometry();
const rainVertices = new Float32Array(rainCount * 3);
for (let i = 0; i < rainCount * 3; i++) {
    rainVertices[i] = (Math.random() - 0.5) * 30;
}
rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainVertices, 3));
const rainMaterial = new THREE.PointsMaterial({ color: 0xAAAAFF, size: 0.2 });
const rain = new THREE.Points(rainGeometry, rainMaterial);
rainScene.add(rain);

// 비 애니메이션 루프
function animateRain() {
    requestAnimationFrame(animateRain);
    rain.rotation.y += 0.01;
    rainRenderer.render(rainScene, rainCamera);
}

animateRain();

// 창 크기 조정 처리
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    rainRenderer.setSize(width, height);
    rainCamera.aspect = width / height;
    rainCamera.updateProjectionMatrix();
});
