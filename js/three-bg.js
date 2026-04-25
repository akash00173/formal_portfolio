/* ============================================
   AKASH PORTFOLIO - THREE.JS BACKGROUND
   ============================================ */

// ============================================
// THREE.JS PARTICLE NETWORK BACKGROUND
// ============================================

// Only run if Three.js is loaded
if (typeof THREE !== 'undefined') {
  
  const container = document.getElementById('canvas-container');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Particle system
  const particleCount = 1500;
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    velocities.push({
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x6366f1,
    size: 0.08,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Lines connecting nearby particles
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending
  });

  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(particleCount * 6);
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

  const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineSegments);

  camera.position.z = 20;

  // Mouse tracking for parallax effect
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse following
    targetX += (mouseX - targetX) * 0.02;
    targetY += (-mouseY - targetY) * 0.02;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Update particle positions
    const positionAttribute = geometry.getAttribute('position');
    const posArray = positionAttribute.array;
    
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] += velocities[i].x;
      posArray[i * 3 + 1] += velocities[i].y;
      posArray[i * 3 + 2] += velocities[i].z;

      // Bounce particles back
      if (Math.abs(posArray[i * 3]) > 25) velocities[i].x *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 25) velocities[i].y *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 15) velocities[i].z *= -1;
    }

    positionAttribute.needsUpdate = true;

    // Update connecting lines
    const linePosArray = lineGeometry.getAttribute('position').array;
    let lineIndex = 0;
    const maxDistance = 3;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance && lineIndex < particleCount * 6 - 6) {
          linePosArray[lineIndex++] = posArray[i * 3];
          linePosArray[lineIndex++] = posArray[i * 3 + 1];
          linePosArray[lineIndex++] = posArray[i * 3 + 2];
          linePosArray[lineIndex++] = posArray[j * 3];
          linePosArray[lineIndex++] = posArray[j * 3 + 1];
          linePosArray[lineIndex++] = posArray[j * 3 + 2];
        }
      }
    }

    lineGeometry.setDrawRange(0, lineIndex / 3);
    lineGeometry.getAttribute('position').needsUpdate = true;

    renderer.render(scene, camera);
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Make particles and material accessible to theme.js
  window.particles = particles;
  window.lineMaterial = lineMaterial;

  // Start animation
  animate();
}