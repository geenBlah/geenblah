
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { MTLLoader } from 'MTLLoader';
import { OBJLoader } from 'OBJLoader';
import gsap from 'gsap';
const textArray = Array("พื้นบ้านผม ทำจากไม้ธรรมดา"
  ,"เก้าอี้ที่ผมนังเล่นคอมทุกวัน ได้มาจากการ ที่ผมป้นเก้าอียายมาใช้ น้า เเล้วซื้อมา",
  "คอมพิวเตอร์พ่อแม่ซื้อเป็นเงินจำนวนหนึ่ง เนื่องจากผมง้อ แต่ก่อน ตอนท่ไม่มีคอมผกเรียนเขียนโคตภาษา C++ จากยูทูป เเล้วเขียนลงสมุด",
  "จอคอมนี้ซื้อทชมาพร้อม กับคอมพิวเตอร์",
  "ครีบอดนี้ได้มาฟรีบัจจุบันผ่านมา 2-3 ปียังไม่พังเลย",
  "ที่นอนนี้ผมเริมนอนตั้งแต่ได้คอม ปัจจุบันย้ายไปนอนห้องยาย",
  "โต็ะคอม นี้แข็งแรงมากๆ ขนาดที่ ยื่นเเล้ว กระโดนได้ ถึงโมเดลจะง้องๆ",
  "ถังขยะ จริงในห้องไม่มีนะ",
  "ประวัติ ส่วนตัว ชื่อ ยุรนันท นามสกุล และเล็ก เกิดเมื่อวันที่ 30/08/50 เรียนชั้นประถมศึกษาที่ โรงเรียน ปากบึงสิงโต เรียนชั้นมัมยมศึกษาที่ โรงเรียน หมอนทองวิทยา ส่วนสูง 162 น้ำหนัก 51 บ้านเลขที่ 36 ตอน ป.2 เคยมีเรื่องตอยกับเพื่อนแตสุดท้ายก็แพ้ เลือดกำเดาไหล ตอน ป.6 รู้ว่าตัวเองเป็นคนถนัดวิชาคณิตศาสตร์ เพราะได้คะเเนนเต็ม  ตอน ม.1 ได้เข้าเรียนชั้นมัทยม ได้มีเพื่อน ตอน ม.3 ได้รู้ว่าตัวเองชอบคอมพิวเตอร์ ของเขียนโปรแกรม ตอน ม.3 เริ่มศึกษา การเขียนโค้ต ภาษา C++ ตอน ม.3 เริ่มเรียนภาษา Python ตอน ม.3 ได้ซื้อคอม ตอน ม.4 เริ่มเรียนภาษา Lua ตอน ม.4 ได้เข้าร่วมการแข่งขัดเขียนโปรเกมระดับจังหวัด ภาษา Python ได้ที่ 6 ตอน ม.4 ได้เริ่มสร้างผลงาน หรื่อ Project บอร์ด Arduino ทำงานกับ FRID ตอน ม.5 ได้เข้าร่วมการแข่งขัน เขียนโปรแกรม ภาษา C ได้ที่ 3 ตอน ม.6 ปลอยผมงานที่ทำสรูปเจ้ง ตอม ม.6 เริ่มโปรแจค เว็ป ตอน ม.6 ต้องเตรียมทำค้ายคอมพิวเตอร์ ของโรงเรียน",
)
const numName = Array("Floor_Material","chair_Material.014","computer.001_computer.001","monitor_Material.007",
  "keyboard_Material.004","mattress_Material.010","table_Material.008","rubbish_Material.019","human");
const NameArray = Array("Floor","chair","computer","monitor","keyboard","mattress","table","rubbish","ยุรน้นท์ และเล็ก");
console.log(numName);
let copiedPart = null
const container = document.getElementById('view3d');


// --- Renderer ---
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);
// 
const renderer2 = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer2.setSize(container.clientWidth, container.clientHeight);
renderer2.setClearColor(0x0b0e13, 1);
container.appendChild(renderer2.domElement);


// --- Scene ---
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0b0e13')
// 
const scene2 = new THREE.Scene();


// --- Camera ---
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.z = 2;
camera.position.x = 2;
camera.position.y = 3;
const yaw = degToRad(45);
const pitch = degToRad(-15);
camera.quaternion.setFromEuler(new THREE.Euler(pitch, yaw, 0, 'YXZ'));

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.enableDamping = true;
controls.enablePan = false;  
//
const camera2 = new THREE.PerspectiveCamera(
  60,
  container.clientWidth / container.clientHeight,
  0.1,
  200
);
camera2.position.set(3, 2, 6);


// --- Light ---
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 7);
scene.add(light);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);
//
scene2.add(new THREE.HemisphereLight(0xffffff, 0x223344, 1));
const sun = new THREE.DirectionalLight(0xffffff, 1.6);
sun.position.set(5, 8, 5);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
scene2.add(sun);

// --- ObjLoader ---
const mtlLoader = new MTLLoader();
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("Image.png");
const geometry = new THREE.BoxGeometry();
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
cube.name = "human"

let all_OBJ = null;
let Floor = null;
let WallX = null;
let WallZ = null;
const MTL_URL = 'Inside.mtl';
const OBJ_URL = 'Inside.obj';

mtlLoader.load(MTL_URL, (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load(OBJ_URL, (object) => {
    all_OBJ = object
    console.log(all_OBJ)
    Floor = all_OBJ.getObjectByName('Floor_Object') || null;
    WallX = all_OBJ.getObjectByName('WallX_Object') || null;
    WallZ = all_OBJ.getObjectByName('WallY_Object') || null;
    all_OBJ.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }});

    
   scene.add(all_OBJ);
})
});
//
let model = null;
mtlLoader.load(
  'Inside.mtl',
  (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load(
      'Inside.obj',
      (object) => {
        model = object;
        copiedPart = model
        model.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });

        // จัดสเกล/ตำแหน่งเริ่มต้นให้พอดีจอ
        model.position.set(0, 0, 0);
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());
        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;
        if (size > 0) {
          const dist = THREE.MathUtils.clamp(size * 0.6, 3, 15);
          camera.position.set(dist, dist * 0.5, dist);
        }

        scene2.add(model);
        controls.update();
      },
      undefined,
      (err) => {
        console.error('โหลด OBJ ไม่ได้:', err);
        // ถ้าโหลดไม่ได้ ให้สร้างกล่องทดแทน
        addFallbackCube();
      }
    );
  },
  undefined,
  (err) => {
    console.error('โหลด MTL ไม่ได้:', err);
    // ถ้าโหลดไม่ได้ ให้สร้างกล่องทดแทน
    addFallbackCube();
  }
);

// --- Function ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  // คำนวณตำแหน่งเมาส์แบบ normalized

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycast หา object
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    let num = null;
    const obj = intersects[0].object;
    console.log(obj.name)
      for (let i = 0; i<numName.length;i++){
    if(numName[i] == obj.name){
      console.log(i)
      num = i;
    }
  }
  tooltip.style.display = "flex";
    tooltip.style.left = event.clientX + 10 + "px";
    tooltip.style.top = event.clientY + 10 + "px";
    tooltip.innerText = `คลิก ${NameArray[num]}` || "ไม่มีชื่อ";
  } else {
    tooltip.style.display = "none";
  }
}
//
function addFallbackCube() {
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshStandardMaterial({ color: 0x468585, emissive: 0x102a2a });
  const cube = new THREE.Mesh(geo, mat);
  cube.position.y = 0.5;
  scene.add(cube);
}

function clickObj(event) {
      if (!right_box.contains(event.target)) {
       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycast หา object
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
      let num = null;
      const obj = intersects[0].object;
      console.log(obj.name)
      for (let i = 0; i<numName.length;i++){
        if(numName[i] == obj.name){
        console.log(i)
        num = i;
      }
    }
      ui.style.display = "flex"
      head.textContent = NameArray[num]
      d.textContent = textArray[num]
if (copiedPart.parent) {
  copiedPart.parent.remove(copiedPart);
}
const part = all_OBJ.getObjectByName("ชื่อPart");
  copiedPart = obj.clone(); // ✅ คัดลอก
    copiedPart.position.set(0, 0, 2);
    scene2.add(copiedPart);
  }
}
else {
  ui.style.display = "none"
}}

// --- Event ---
const myBtn = document.getElementById("myBtn");
myBtn.addEventListener("click", () => {
  ui.style.display = "none"
});
const head = document.getElementById("head");
const d = document.getElementById("d");
const right_box = document.getElementById("right-box");

const area = document.getElementById("area");

let isDragging = false;
let startX, startY;

area.addEventListener("mousedown", (e) => {
  // เมื่อกดเมาส์ลง
  isDragging = false;
  startX = e.clientX; // ตำแหน่ง X ของเมาส์
  startY = e.clientY; // ตำแหน่ง Y ของเมาส์
});

area.addEventListener("mousemove", (e) => {
  // ถ้าเมาส์ขยับเกิน 5px จากจุดเริ่มต้น → นับว่าเป็นการลาก
  if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
    isDragging = true;
  }
});

area.addEventListener("mouseup", (e) => {
  // เมื่อปล่อยเมาส์ขึ้น
  if (isDragging) {
    
  } else {
    clickObj(e)
  }
});


window.addEventListener("mousemove", onMouseMove);
function degToRad(deg) {
  return deg * Math.PI / 180;
}
function tick() {
      controls.update();
      renderer2.render(scene2, camera);
      requestAnimationFrame(tick);
    }
    tick();
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
    // --- Handle Resize ---
window.addEventListener('resize', () => {
  // --- camera ตัวแรก ---
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // --- camera2 และ renderer2 ---
  camera2.aspect = container.clientWidth / container.clientHeight;
  camera2.updateProjectionMatrix();
  renderer2.setSize(container.clientWidth, container.clientHeight);

});

