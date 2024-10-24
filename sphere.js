// 구체 애니메이션을 위한 Three.js 설정
const sphereScene = new THREE.Scene();
const sphereCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const sphereRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('sphereCanvas'), alpha: true });

sphereRenderer.setSize(window.innerWidth, window.innerHeight);
sphereCamera.position.z = 30;

// 구체 생성
const geometry = new THREE.SphereGeometry(10, 64, 64);

// 텍스처 로딩 (커비 이미지)
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

// 클릭 또는 터치 시 효과 추가 (구체 크기 변환 + 파동 효과)
function onClickOrTouch(event) {
    // 구체 크기 변환 (커졌다가 원래 크기로 돌아오기)
    gsap.to(sphere.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3, yoyo: true, repeat: 1 });

    // 파동 효과 추가
    const { clientX, clientY } = event;
    createRippleEffect(clientX, clientY);
}

// 이벤트 리스너 추가
document.addEventListener('click', onClickOrTouch);  // PC 클릭 시
document.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    onClickOrTouch(touch);  // 모바일 터치 시
});

// 파동 효과 생성 함수
function createRippleEffect(x, y) {
    // 2D 화면의 클릭 좌표를 Three.js의 3D 좌표로 변환
    const vector = new THREE.Vector3(
        (x / window.innerWidth) * 2 - 1,
        -(y / window.innerHeight) * 2 + 1,
        0.5
    );
    vector.unproject(sphereCamera); // 카메라 좌표계로 변환

    // 파동 효과 생성 (작은 크기로 시작)
    const rippleGeometry = new THREE.RingGeometry(1, 1.5, 32);  // 파동을 작게 시작
    const rippleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide, transparent: true, opacity: 0.9 });
    const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);

    ripple.position.copy(vector);  // 클릭된 위치에 파동 배치
    ripple.lookAt(sphereCamera.position);  // 카메라 방향을 바라보도록 설정
    ripple.scale.set(0.3, 0.3, 0.3);  // 더 작은 크기로 시작
    sphereScene.add(ripple);

    // 파동 애니메이션 (크기가 커지면서 사라짐, 크기 조절)
    gsap.to(ripple.scale, { x: 1, y: 1, z: 1, duration: 0.6 });
    gsap.to(ripple.material, { opacity: 0, duration: 0.6, onComplete: () => sphereScene.remove(ripple) });
}

// 구체 애니메이션
let autoRotateSpeedX = 0.01;
let autoRotateSpeedY = 0.01;
let mouseX = 0;
let mouseY = 0;

// 마우스 이동 이벤트
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// 터치 이동 이벤트 (모바일)
document.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
});

// 구체 애니메이션 루프
function animateSphere() {
    requestAnimationFrame(animateSphere);

    // 구체 자동 회전
    sphere.rotation.x += autoRotateSpeedX;
    sphere.rotation.y += autoRotateSpeedY;

    // 마우스나 터치 상호작용에 따른 추가 회전
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
