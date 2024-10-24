// 구체 애니메이션을 위한 Three.js 설정
const sphereScene = new THREE.Scene();
const sphereCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const sphereRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('sphereCanvas'), alpha: true });

sphereRenderer.setSize(window.innerWidth, window.innerHeight);
sphereCamera.position.z = 30;

// 구체 생성
const geometry = new THREE.SphereGeometry(10, 64, 64);

// 커비 이미지로 텍스처 변경
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('image.png'); // 커비 이미지 URL로 교체

const material = new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.7,
    roughness: 0.1,
});

const sphere = new THREE.Mesh(geometry, material);
sphereScene.add(sphere);

// 조명 설정
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(20, 20, 20);
sphereScene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040, 1);
sphereScene.add(ambientLight);

// 마우스 상호작용
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// 구체 애니메이션
function animateSphere() {
    requestAnimationFrame(animateSphere);
    sphere.rotation.x += mouseY * 0.05;
    sphere.rotation.y += mouseX * 0.05;
    sphereRenderer.render(sphereScene, sphereCamera);
}

animateSphere();

// 창 크기 조정 처리
window.addEventListener('resize', () => {
    sphereRenderer.setSize(window.innerWidth, window.innerHeight);
    sphereCamera.aspect = window.innerWidth / window.innerHeight;
    sphereCamera.updateProjectionMatrix();
});
