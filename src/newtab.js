import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



chrome.storage.local.get('tabData', function(result) {

  if(result.tabData){ 
    presentTable(result.tabData);
  }

});



chrome.storage.local.onChanged.addListener(function(changes, namespace) {
  if(changes.tabData){
    let tabData = changes.tabData.newValue;
    presentTable(tabData);
  }
});


function presentTable(tabData) {
  var table = document.getElementById("tab-table");
  var rowCount = table.rows.length;
    for (var i = 1; i < rowCount; i++) {
        table.deleteRow(1);
    }
  for (var tabId in tabData) {
    var tab = tabData[tabId];
    var row = table.insertRow();
    var tabIdCell = row.insertCell();
    var urlsCell = row.insertCell();
    var activeCell = row.insertCell();
    tabIdCell.innerHTML = tabId;
    var urls = "";
    for (var url in tab.url) {
        urls += url + " navigated at " + tab.url[url] + "<br>";
    }
    urlsCell.innerHTML = urls;
    var active = "";
    for (var i = 0; i < tab.active.length; i++) {
        active += tab.active[i] + "<br>";
    }
    activeCell.innerHTML = active;
  }
}



let camera, scene, renderer, container, stats;

async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true
  });
  return tabs[0];
}



			let mouseX = 0, mouseY = 0;

			let windowHalfX = window.innerWidth / 2;
			let windowHalfY = window.innerHeight / 2;

			// init();
			// animate();

			function init() {

				container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 500;

        // const controls = new OrbitControls( camera, container );
				// controls.minDistance = 0;
				// controls.maxDistance = 100;

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xffffff );

				const light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 0, 1 );
				scene.add( light );


				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				document.addEventListener( 'mousemove', onDocumentMouseMove );

				window.addEventListener( 'resize', onWindowResize );


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
    
        // chrome.runtime.onMessage.addListener(
        //   function(request, sender, sendResponse) {
        //     // console.log(sender.tab ?
        //     //             "from a content script:" + sender.tab.url :
        //     //             "from the extension");
        //     if (request.type == "sendHistoryFromBackground")
        //       // console.log("in new tab")
        //       console.log("from background " + request.data)
        //       addSphere(request.data)
        //       sendResponse({farewell: "goodbye"});
        //   }
        // );

        function addSphere(_url) {
          // console.log("adding sphere")
          let sphereGeometry = new THREE.SphereGeometry(40, 40, 40);
    
    // // Create a sphere material
    //       // let sphereMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
          let color = new THREE.Color();
          color.setHSL(Math.random(), Math.random(), Math.random());
          let sphereMaterial = new THREE.MeshBasicMaterial({color: color});
    
    
    // // Create a sphere mesh by combining the geometry and material
          let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
          // sphere.position.set(0, 0, 0);

          sphere.position.x = Math.random() * 400 - 200;
          sphere.position.y = Math.random() * 400 - 200;
          sphere.position.z = Math.random() * 200 - 200;  
    
    // // Add the sphere to the scene
          scene.add(sphere);

        }
    
        function iterateHistorySpheres(history) {
          // console.log("getting history in new tab")
          console.log(history)
          for( var i = scene.children.length - 1; i >= 0; i--) { 
            obj = scene.children[i];
            scene.remove(obj); 
          }
          for (const item in history) {
            console.log(item + '' + history[item])
            addSphere(history[item])
          }
        }
			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX );
				mouseY = ( event.clientY - windowHalfY );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}

			function render() {

				// camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				// camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}


// var tabs = [];

// iterateTabs()
      


// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if (request.type == "sendHistoryFromBackground")
//       iterateTabs()
//       // console.log("in new tab")
//       // console.log(request.data)
//       // iterateHistory(request.data)
//       // sendResponse({farewell: "goodbye"});
//   }
// );


// function iterateTabs() {
//   chrome.tabs.query({}, function(tabs) {
//     var tabList = document.getElementById("url_list");
//     tabList.innerHTML = "";
//     for (var i = 0; i < tabs.length; i++) {
//       if (tabs.includes(tabs[i].id)) {
//         continue
//       }
//       var row = document.createElement("tr");
//       row.innerHTML = "<td>" + tabs[i].id + "</td>" +
//                       "<td>" + tabs[i].url + "</td>" +
//                       "<td>" + tabs[i].lastAccessed + "</td>";
//       tabList.appendChild(row);
//       tabs.push(tabs[i].id)
//     }
//   });
// }


      // chrome.runtime.onMessage.addListener(
      //   function(request, sender, sendResponse) {
      //     updateTabInfo(request.tabId, request.changeInfo, request.tab);
      //   });
      
      // function updateTabInfo(tabId, changeInfo, tab) {
      //   var tabList = document.getElementById("url_list");
      //   for (var i = 0; i < tabList.rows.length; i++) {
      //     var row = tabList.rows[i];
      //     if (row.cells[0].innerHTML == tabId) {
      //       row.cells[1].innerHTML = tab.url;
      //       row.cells[2].innerHTML = tab.lastAccessed;
      //       break;
      //     }
      //   }
      // }
      

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









