
// Function to show the loader
function showLoader() {
  document.querySelector('.loader').style.display = 'flex';
}

// Function to hide the loader
function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}
// Retrieve the selected country and preferred number from the URL parameters

const urlParams = new URLSearchParams(window.location.search);
const selectedCountry = urlParams.get('country');
let preferredNumber = urlParams.get('number');


console.log(selectedCountry);
//////////////////////////////////////////////////////////////////////////////////////////////
showLoader();
// /////////////////////////////////////////////////////////////////////////

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import img from '../src/textures/earth_1.jpg';
import sky from '../src/galaxy.jpg';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 20);

// Define a constant for the minimum distance between the camera and the center of the Earth
const minCameraDistance = 8;
function updateCameraPosition() {
  // Calculate the current distance between the camera and the center of the Earth
  const cameraDistance = camera.position.length();

  // If the camera gets too close to the center, move it back to the minimum distance
  if (cameraDistance < minCameraDistance) {
    camera.position.set(0, 0, minCameraDistance);
  }
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const textureLoader = new THREE.TextureLoader();
// sky1texture =[sky,sky,sky,sky,sky,sky];
// // Create the skybox material
// const skyboxMaterial = sky1texture.map(texture => new THREE.MeshBasicMaterial({ map: textureLoader.load(texture), side: THREE.BackSide }));

// // Create the skybox (a cube with the skybox material)
// const skyboxGeometry = new THREE.BoxGeometry(500,500, 500);
// const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
// scene.add(skybox);


//////////////////////////////////////////////////////////
const radius = 10; // Earth's radius
const latitudeSegments =120;
const longitudeSegments = 120;
const sphereGeometry = new THREE.SphereGeometry(radius, latitudeSegments, longitudeSegments);
const material = new THREE.MeshBasicMaterial({
 map: textureLoader.load(img), //img path
 wireframe:false
});
const earthSphere = new THREE.Mesh(sphereGeometry, material);
scene.add(earthSphere);
earthSphere.rotation.y = Math.PI;
///////////////////////////////////////////////////////////////////////////
let plane;
const planeHeight = 1; 

const sphereGeometr = new THREE.SphereGeometry(1, 32, 32);
  const sphereMateria = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const sphere = new THREE.Mesh(sphereGeometr, sphereMateria);
  // Add the sphere to the scene
  scene.add(sphere);
  sphere.position.set(0.7137548607088738,-2.149602205435171,-5.4461608896645215);


function model (){
const fighterURL = new URL('../src/Hotairballo1.glb', import.meta.url);

const gltfLoader = new GLTFLoader();

const directionToSurface = randomCountryCoordinates[0].center.clone().normalize();

gltfLoader.load(fighterURL.href, function (gltf) {
 plane = gltf.scene;
  plane.scale.set(5, 5, 5);
  plane.position.copy(randomCountryCoordinates[0].center.clone().add(directionToSurface.multiplyScalar(planeHeight)));
  scene.add(plane);
  
function createSmallSphere(color) {
  const sphereGeometry = new THREE.SphereGeometry(0.1, 20, 20);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: color });
  return new THREE.Mesh(sphereGeometry, sphereMaterial);
    
}

// Create small spheres for each country and add them to the scene
randomCountryCoordinates.forEach((country, index) => {
  const color = (index === 0) ? 0xff0000 : 0x00ff00; // Red for first sphere, green for others
  const smallSphere = createSmallSphere(color);
  smallSphere.position.copy(country.center);
  scene.add(smallSphere);
  console.log(index);
});
hideLoader();
document.getElementById('startButton').addEventListener('click', function () {
 // Start the animation when the button is clicked
  animatePlane(); // Start the rendering loop for the scene
});

  
});
}
////////////////////////////////////////////////////////////////////
// Raycasting setup for country selection and its name

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  // Calculate normalized device coordinates (-1 to 1) for the mouse position
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the picking ray from the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate intersections with the country outlines
  const intersects = raycaster.intersectObjects(earthSphere.children, true);

  // Clear previous highlights
  earthSphere.children.forEach((child) => {
    if (child.material && child.material.color) {
      // Reset the main line color to white
      child.material.color.set(0x545454);

      // Check if the object has an inner border (previously set for highlighting)
      const innerBorder = child.userData.innerBorder;
      if (innerBorder) {
        // Remove the inner border from the country outline
        child.remove(innerBorder);
      }
    }
  });

  // Check if there is an intersection with a country outline
  if (intersects.length > 0) {
    const countryOutline = intersects[0].object;
    // Highlight the country outline by changing its main line color to red
    if (countryOutline.material && countryOutline.material.color) {
      countryOutline.material.color.set(0x545454);

      // Create an inner border with a slightly larger width and a different color (green in this case)
      const innerBorderMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
      const innerBorder = new THREE.Line(countryOutline.geometry.clone(), innerBorderMaterial);
       // Adjust the inner border scale to be slightly larger
      countryOutline.add(innerBorder);

      // Store the inner border in the object's user data to access it later
      countryOutline.userData.innerBorder = innerBorder;
       // Get the country name and show it near the country
       const countryName = countryOutline.name;
       //function that show names
       showCountryName(countryName, event);
    }
  }
  else {
    // If no intersection, clear the country name display
    hideCountryName();
  }
}
// Function to show the country name near the country
function showCountryName(name, event) {
  const countryNameElement = document.getElementById('countryNameElement');
  countryNameElement.innerText = name;
  countryNameElement.style.display = 'block';

  // Calculate the position on the screen based on the mouse cursor
  const x = event.clientX;
  const y = event.clientY

  // Position the country name element near the country
  countryNameElement.style.left = `${x}px`;
  countryNameElement.style.top = `${y+20}px`;
}

// Function to hide the country name element
function hideCountryName() {
  const countryNameElement = document.getElementById('countryNameElement');
  countryNameElement.style.display = 'none';
}
// Add an event listener to call onMouseMove when the mouse moves
window.addEventListener('mousemove', onMouseMove, false);
//////////////////////////////////////////////////////////////////

// fetch data to add outlines of countries
let randomCountryCoordinates=[];

function calculateCenter(Coordinates) {
  var mid = Coordinates.length;
  return Coordinates[Math.ceil(mid/2)];
  
}

//********************************************************************************************** */

const jsonUrl='https://raw.githubusercontent.com/gajendra000/countries_outline/main/countries.geojson';

fetch(jsonUrl)
  .then((response) => response.json())
  .then((data) => {
    // Step 1: Process the GeoJSON data and get the processed data array
    const processedData = processGeoJSON(data);

    // Step 2: Create a material for the country outlines
    const outlineMaterial = new THREE.LineBasicMaterial({ color: 0x545454 });

    // Step 3: Loop through the processed data and create country outlines
    processedData.forEach(({ bufferGeometry, countryName,Coordinates}) => {
      const countryOutline = new THREE.Line(bufferGeometry, outlineMaterial);
      countryOutline.name = countryName; // Set the country name as a custom property
      countryOutline.rotation.y = Math.PI ;//to map with texture
      earthSphere.add(countryOutline); // Add the country outline to the Earth sphere

      if (randomCountryList.includes(countryName.toLowerCase())) {
        const center = calculateCenter(Coordinates);
        randomCountryCoordinates.push({ countryName, center });
        console.log(`${countryName} center:`, center);
      }
    });
    randomCountryCoordinates.sort((a, b) => {
      const indexA = randomCountryList.indexOf(a.countryName.toLowerCase());
      const indexB = randomCountryList.indexOf(b.countryName.toLowerCase());
      return indexA - indexB;
    });
    console.log(randomCountryCoordinates);

    model();
    
    animate();
  })
  .catch((error) => {
    console.error('Error loading JSON:', error);
  });
    

//******************************************************************************************* */
  
function processGeoJSON(data) {
  const processedData = []; // Create an empty array to hold the processed data

  // Loop through the features in the GeoJSON data
  data.features.forEach((feature) => {
    const geometry = feature.geometry; // Access the geometry of each feature
    const properties = feature.properties; // Access the properties of each feature

    // Check if the geometry type is MultiPolygon
    if (geometry.type === 'MultiPolygon') {
      let Coordinates = [];
      // Loop through the coordinates and flatten the array
      geometry.coordinates.forEach((coords) => {
        coords[0].forEach((coord) => {
          // Convert the 2D latitude and longitude to 3D coordinates on the sphere
          const lat = coord[1];
          const lon = coord[0];
          const phi = (90 - lat) * (Math.PI / 180);
          const theta = (180 - lon) * (Math.PI / 180);
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);

          // Add the 3D coordinate to the array
          Coordinates.push(new THREE.Vector3(x, y, z));
          
        });
      });

      // Create a BufferGeometry representing the geometry of the features
      const bufferGeometry = new THREE.BufferGeometry().setFromPoints(Coordinates);

      // Get the country name from the properties
      const countryName = properties.ADMIN; // Replace "ADMIN" with the actual key for the country name

      // Store the buffer geometry and country name as an object and push it to the processedData array

      processedData.push({ bufferGeometry, countryName ,Coordinates });
    }
  });

  return processedData;
}
/////////////////////////////////////////////////////////////////////////////////////////

const randomCountryList = getRandomCountries(preferredNumber);
randomCountryList[0] = selectedCountry;
console.log('Random list of countries:', randomCountryList);

function getRandomCountries(numberOfCountries) {
  const countryList = [
      "afghanistan", "albania", "algeria", "andorra", "angola", "antigua and barbuda", "argentina", "armenia",
      "australia", "austria", "azerbaijan", "bahamas", "bahrain", "bangladesh", "barbados", "belarus", "belgium",
      "belize", "benin", "bhutan", "bolivia", "bosnia and herzegovina", "botswana", "brazil", "brunei", "bulgaria",
      "burkina faso", "burundi", "cabo verde", "cambodia", "cameroon", "canada", "central african republic", "chad",
      "chile", "china", "colombia", "comoros", "congo (congo-brazzaville)", "costa rica", "croatia", "cuba", "cyprus",
      "czechia (czech republic)", "denmark", "djibouti", "dominica", "dominican republic", "ecuador", "egypt", "el salvador",
      "equatorial guinea", "eritrea", "estonia", "eswatini (fmr. swaziland)", "ethiopia", "fiji", "finland", "france",
      "gabon", "gambia", "georgia", "germany", "ghana", "greece", "grenada", "guatemala", "guinea", "guinea-bissau",
      "guyana", "haiti", "holy see", "honduras", "hungary", "iceland", "india", "indonesia", "iran", "iraq", "ireland",
      "israel", "italy", "jamaica", "japan", "jordan", "kazakhstan", "kenya", "kiribati", "korea, north", "korea, south",
      "kosovo", "kuwait", "kyrgyzstan", "laos", "latvia", "lebanon", "lesotho", "liberia", "libya", "liechtenstein",
      "lithuania", "luxembourg", "madagascar", "malawi", "malaysia", "maldives", "mali", "malta", "marshall islands",
      "mauritania", "mauritius", "mexico", "micronesia", "moldova", "monaco", "mongolia", "montenegro", "morocco",
      "mozambique", "myanmar (formerly burma)", "namibia", "nauru", "nepal", "netherlands", "new zealand", "nicaragua",
      "niger", "nigeria", "north macedonia", "norway", "oman", "pakistan", "palau", "palestine state", "panama", "papua new guinea",
      "paraguay", "peru", "philippines", "poland", "portugal", "qatar", "romania", "russia", "rwanda", "saint kitts and nevis",
      "saint lucia", "saint vincent and the grenadines", "samoa", "san marino", "sao tome and principe", "saudi arabia",
      "senegal", "serbia", "seychelles", "sierra leone", "singapore", "slovakia", "slovenia", "solomon islands", "somalia",
      "south africa", "south sudan", "spain", "sri lanka", "sudan", "suriname", "sweden", "switzerland", "syria", "tajikistan",
      "tanzania", "thailand", "timor-leste", "togo", "tonga", "trinidad and tobago", "tunisia", "turkey", "turkmenistan",
      "tuvalu", "uganda", "ukraine", "united arab emirates", "united kingdom", "united states of america", "uruguay", "uzbekistan",
      "vanuatu", "venezuela", "vietnam", "yemen", "zambia", "zimbabwe"
    ]

  const randomCountries = [];
  while (randomCountries.length < numberOfCountries) {
    const randomIndex = Math.floor(Math.random() * countryList.length);
    const countryName = countryList[randomIndex];

    // Check if the country name is not already in the list to avoid duplicates
    if (!randomCountries.includes(countryName)) {
      randomCountries.push(countryName);
    }
  }

  return randomCountries;
}
console.log(randomCountryCoordinates);
////////////////////////////////////////////

/************************************** */

let currentPointIndex = 0;
const clock = new THREE.Clock();
let t=0;




function animatePlane() {

  const timeDelta = clock.getDelta(); // Get the time difference between frames
    const movementSpeed = 0.07; // Adjust this value to control the speed of movement

    // Calculate the next position of the plane based on the movement speed
    t += movementSpeed * timeDelta;

  // Check if the interpolation factor exceeds 1, meaning we have reached the next country
    if (t > 1) {
      // Move to the next country in the randomCountryCoordinates array
      currentPointIndex = (currentPointIndex + 1) % randomCountryCoordinates.length;
      t = 0; // Reset the interpolation factor for the next movement
      // updateHighlightedCountry(currentPointIndex);
    }
    const floorIndex = Math.floor(currentPointIndex);
  const startPoint = randomCountryCoordinates[floorIndex].center;
  const endPoint = randomCountryCoordinates[(floorIndex + 1) % randomCountryCoordinates.length].center;

  // Use THREE.Spherical to interpolate between the start and end points along the Earth's surface
  const startSpherical = new THREE.Spherical().setFromVector3(startPoint);
  const endSpherical = new THREE.Spherical().setFromVector3(endPoint);

  const interpolatedSpherical = new THREE.Spherical().set(
    THREE.MathUtils.lerp(startSpherical.radius, endSpherical.radius, t),
    THREE.MathUtils.lerp(startSpherical.phi, endSpherical.phi, t),
    THREE.MathUtils.lerp(startSpherical.theta, endSpherical.theta, t)
  );

  // Convert the interpolated spherical coordinates back to Cartesian coordinates
  const positionOnSphere = new THREE.Vector3().setFromSpherical(interpolatedSpherical);

  // Calculate the normalized direction vector from the center of the sphere to the plane's position
  const directionToSurface = positionOnSphere.clone().normalize();

  // Set the position of the plane with the desired height above the surface
  plane.position.copy(positionOnSphere.add(directionToSurface.multiplyScalar(planeHeight)));

  requestAnimationFrame(animatePlane);
}

/**************************************************************** */

function animate() {
  requestAnimationFrame(animate);
  
  updateCameraPosition();
  renderer.render(scene, camera);
}
animate();
// Call the startAnimation function to initiate the animation