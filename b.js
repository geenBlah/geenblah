import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { MTLLoader } from 'MTLLoader';
import { OBJLoader } from 'OBJLoader';
import gsap from 'gsap';
console.log("ไฟล์ b.js ทำงานแล้ว!");
console.log(window.innerWidth);


let opened = false;
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("Image.png");


// --- Scene ---
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0b0e13');



// --- Camera ---
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.z = 10;


// --- Light ---
const light = new THREE.DirectionalLight(0xFFFFFF,5);
light.position.set(1,1,1)
scene.add(light);

// cube
const geometry = new THREE.BoxGeometry();
//const material = new THREE.MeshLambertMaterial({Color:'#468585',emissive:'#468585'});
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,        // สีของวัตถุ
  emissive: 0x00ffff,     // สีเรืองแสง
  emissiveIntensity: 1.5, // ความสว่าง
  metalness: .1,
  roughness: .3
});
const cube = new THREE.Mesh(geometry,material);
cube.position.y += 3
      cube.material = new THREE.MeshStandardMaterial({
        map: texture
      });
scene.add(cube);


// --- ObjLoader ---
const MTL_URL = 'Untitled.mtl';
const OBJ_URL = 'Untitled.obj';
let door = null;
let all_OBJ = null;
let part = null;
const mtlLoader = new MTLLoader();
mtlLoader.load(MTL_URL, (materials) => {
  materials.preload();
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load(OBJ_URL, (object) => {
    all_OBJ = object
    all_OBJ.position.x = -1
    all_OBJ.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }});
    part = all_OBJ.getObjectByName('Cube.001_Cube.001') || null;
    door = all_OBJ.getObjectByName('Cube_Material') || null;
    console.log(part)
    if (part) {
      console.log("เจอเวยไอน้อง")
      part.material = part.material.clone();
      part.material.metalness = 0;   // ไม่สะท้อนโลหะ
      part.material.roughness = 1;   // ทำให้ด้านสุด
      part.material.shininess = 0;   // ความเงา = 0
      part.castShadow = false;   // ไม่ทิ้งเงา
      part.receiveShadow = false; // ไม่รับเงา
      part.material.envMap = null; // ปิดแผนที่สะท้อน
      part.material.color.setRGB(0, 0, 0);   // เปลี่ยนสีได้แค่ของมัน
      part.material = new THREE.MeshBasicMaterial({ 
      color: 0x000000
      });}


    findPartByName(all_OBJ);
    scene.add(all_OBJ);
  })
})

// --- Raycaster for clicking the door ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onPointerDown(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ( (event.clientX - rect.left) / rect.width ) * 2 - 1;
      const y = - ( (event.clientY - rect.top) / rect.height ) * 2 + 1;
      mouse.set(x, y);

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(door, true);
      if (intersects.length > 0) {
        openAndEnter();
      }
    }
 window.addEventListener('pointerdown', onPointerDown);

// --- Function ---
function openAndEnter() {
  if (!all_OBJ) return;
  console.log("ขยับแล้ว");
  opened = true;
  gsap.to(camera.position, {
       z:camera.position.z-9,
        duration: 1.2, ease: 'power3.inOut'
      });

 gsap.to(door.rotation, { 
  y: 0 - Math.PI / 2, // หมุนเพิ่ม 90°
  duration: 1.2, 
  ease: 'power3.out' 
});
setTimeout(() => {
  window.location.href = "Home.html";
}, 1200)
};
function resetS()  {
  camera.position.z = 10;
  door.rotation.y = 0; 
};
function findPartByName(obj, name) {
  if (obj.name === name) return obj;
  for (let child of obj.children) {
    const found = findPartByName(child, name);
    if (found) return found;
  }
  return null;
}
// --- Event ---
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("myBtn");
  btn.addEventListener("click", openAndEnter);
  const reset = document.getElementById("myReset");
  reset.addEventListener("click", resetS);
});

// --- renderer --- 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}

animate();
    // --- Handle Resize ---
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

