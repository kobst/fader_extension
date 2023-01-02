import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer, controls, stats;

async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true
  });

  return tabs[0];
}

// const iterateHistory = (history) => {
//   console.log("getting history in new tab")
//   var str = '<ul>'
//   for (const item of history) {
//     // Calculate the radius of the sphere based on the time spent on the URL
//     // const radius = item.timeSpent / 1000; // timeSpent is in milliseconds, so divide by 1000 to get seconds
//     // console.log("getting history")
//     console.log(item)
//     str += '<li>'+ item + '</li>';
//   }
//   str += '</ul>';
//   document.getElementById("url_list").innerHTML = str;
// }

  
// document.addEventListener("DOMContentLoaded", async () => {
//   const activeTab = await getActiveTabURL();
//   if (activeTab.url == "chrome://newtab/") {
//     console.log("new tab active ")
//   }

//   // go fetch new tab data from background script
//   chrome.runtime.sendMessage({ type: 'getHistory' }, function (response) {
//     iterateHistory(response.history)
//   })
// });

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     // console.log(sender.tab ?
//     //             "from a content script:" + sender.tab.url :
//     //             "from the extension");
//     if (request.type == "sendHistoryFromBackground")
//       console.log("in new tab")
//       console.log(request.data)
//       iterateHistory(request.data)
//       sendResponse({farewell: "goodbye"});
//   }
// );

  // function iterateHistorySpheres(history) {
  //   console.log("getting history in new tab")
  //   for (item in history) {
  //     if (item.url in addedUrls) {
  //       return;
  //     }
  //     addedUrls.push(item.url);
  //     const geometry = new THREE.SphereGeometry( 22, 48, 24 );
  //     const material = new THREE.MeshLambertMaterial( {
  //       color: new THREE.Color().setHSL( Math.random(), 0.5, 0.5 ),
  //       side: THREE.DoubleSide,
  //       clippingPlanes: clipPlanes,
  //       clipIntersection: params.clipIntersection
  //     } );
  //     group.add( new THREE.Mesh( geometry, material ) );
  //   }
  // }



  let mesh;
  // const amount = parseInt( window.location.search.slice( 1 ) ) || 10;
  const amount = 1
  const count = Math.pow( amount, 3 );

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2( 1, 1 );

  const color = new THREE.Color();
  const white = new THREE.Color().setHex( 0xffffff );

  init();
  animate();

  function init() {

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( amount, amount, amount );
    camera.lookAt( 0, 0, 0 );

    scene = new THREE.Scene();

    const light = new THREE.HemisphereLight( 0xffffff, 0x888888 );
    light.position.set( 0, 1, 0 );
    scene.add( light );

    const geometry = new THREE.IcosahedronGeometry( 0.5, 3 );
    const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );




    mesh = new THREE.InstancedMesh( geometry, material, count );

    let i = 0;
    const offset = ( amount - 1 ) / 2;

    const matrix = new THREE.Matrix4();

    for ( let x = 0; x < amount; x ++ ) {

      for ( let y = 0; y < amount; y ++ ) {

        for ( let z = 0; z < amount; z ++ ) {

          matrix.setPosition( offset - x, offset - y, offset - z );

          mesh.setMatrixAt( i, matrix );
          mesh.setColorAt( i, color );

          i ++;

        }

      }

    }


    document.addEventListener("DOMContentLoaded", async () => {
      const activeTab = await getActiveTabURL();
      if (activeTab.url == "chrome://newtab/") {
        console.log("new tab active ")
      }

      // go fetch new tab data from background script
      chrome.runtime.sendMessage({ type: 'getHistory' }, function (response) {
        console.log(response.history)
        iterateHistorySpheres(response.history)
      })
    });

    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        // console.log(sender.tab ?
        //             "from a content script:" + sender.tab.url :
        //             "from the extension");
        if (request.type == "sendHistoryFromBackground")
          console.log("in new tab")
          console.log(request.data)
          iterateHistorySpheres(request.data)
          sendResponse({farewell: "goodbye"});
      }
    );

    function iterateHistorySpheres(history) {
      console.log("getting history in new tab")
      console.log(history)
      for (const item in history) {
        console.log(item + '' + history[item])

        // Create a sphere with radius 1
      let sphereGeometry = new THREE.SphereGeometry(10, 10, 10);

// Create a sphere material
      // let sphereMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
      let sphereMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});


// Create a sphere mesh by combining the geometry and material
      let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

      sphere.position.set(0, 0, 0);

// Add the sphere to the scene
      scene.add(sphere);

        // if (item.url in addedUrls) {
        //   return;
        // }
        // addedUrls.push(item.url);
        // const geometry = new THREE.SphereGeometry( 100, 100, 100 );
        // const material = new THREE.MeshLambertMaterial( {
        //   color: new THREE.Color().setHSL( Math.random(), 0.5, 0.5 ),
        //   side: THREE.DoubleSide,
        //   clippingPlanes: clipPlanes,
        //   clipIntersection: params.clipIntersection
        // } );
        // scene.add( new THREE.Mesh( geometry, material ) );






      }
    }


    const gui = new GUI();
    gui.add( mesh, 'count', 0, count );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;

    stats = new Stats();
    document.body.appendChild( stats.dom );

    window.addEventListener( 'resize', onWindowResize );
    document.addEventListener( 'mousemove', onMouseMove );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function onMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  }

  function animate() {

    requestAnimationFrame( animate );

    controls.update();

    raycaster.setFromCamera( mouse, camera );

    const intersection = raycaster.intersectObject( mesh );

    if ( intersection.length > 0 ) {

      const instanceId = intersection[ 0 ].instanceId;

      mesh.getColorAt( instanceId, color );

      if ( color.equals( white ) ) {

        mesh.setColorAt( instanceId, color.setHex( Math.random() * 0xffffff ) );

        mesh.instanceColor.needsUpdate = true;

      }

    }

    render();

    stats.update();

  }

  function render() {

    renderer.render( scene, camera );

  }
   