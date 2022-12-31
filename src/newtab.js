// Load the three.js library
// const script = document.createElement('script');
// script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r119/three.min.js';
// script.nonce = nonce;
// document.head.appendChild(script);

// Set up the scene
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
  
    return tabs[0];
  }
  
  const iterateHistory = (history) => {
    console.log("getting history in new tab")
    var str = '<ul>'
    for (const item of history) {
      // Calculate the radius of the sphere based on the time spent on the URL
      // const radius = item.timeSpent / 1000; // timeSpent is in milliseconds, so divide by 1000 to get seconds
      // console.log("getting history")
      console.log(item)
      str += '<li>'+ item + '</li>';
    }
    str += '</ul>';
    document.getElementById("url_list").innerHTML = str;
  }
  
  
  
  
  document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    if (activeTab.url == "chrome://newtab/") {
      console.log("new tab active ")
    }
  
    // go fetch new tab data from background script
    chrome.runtime.sendMessage({ type: 'getHistory' }, function (response) {
   
      iterateHistory(response.history)
      // console.log(JSON.stringify(response.history))
      // console.log("getting history in new tab")
      // var str = '<ul>'
      // for (const item of response.history) {
      //   // Calculate the radius of the sphere based on the time spent on the URL
      //   // const radius = item.timeSpent / 1000; // timeSpent is in milliseconds, so divide by 1000 to get seconds
      //   // console.log("getting history")
      //   console.log(item)
      //   str += '<li>'+ item + '</li>';
      // }
      // str += '</ul>';
      // document.getElementById("url_list").innerHTML = str;
  
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
        iterateHistory(request.data)
        sendResponse({farewell: "goodbye"});
    }
  );
  
  
  
  
  
  //   const queryParameters = activeTab.url.split("?")[1];
  //   const urlParameters = new URLSearchParams(queryParameters);
  
  
  //   console.log(" from newTab.js");
  
    // chrome.storage.local.get('urls', function(data) {
    //   console.log(JSON.stringify(data.urls)); // This will log the map of URLs and time visited
    //   // for (const item of data.urls) {
    //   //   console.log(item)
    //   // }
    //   const map1 = (data.urls);
  
    //   // map1.forEach((value, key) => {
    //   //   console.log(value, key); // 👉️ Chile country, 30 age
    //   // });
  
    //   for (const [key, value] of Object.entries(map1)) {
    //     console.log(key, value);
    //   }
  
   
    
  
  
  //Get the user's history from the background script
  // chrome.runtime.sendMessage({ type: 'getHistory' }, function (response) {
   
  //   // console.log(JSON.stringify(response.history))
  //   console.log("getting history in new tab")
  //   var str = '<ul>'
  //   for (const item of response.history) {
  //     // Calculate the radius of the sphere based on the time spent on the URL
  //     // const radius = item.timeSpent / 1000; // timeSpent is in milliseconds, so divide by 1000 to get seconds
  //     // console.log("getting history")
  //     console.log(item)
  //     str += '<li>'+ item + '</li>';
  //   }
  //   str += '</ul>';
  //   document.getElementById("url_list").innerHTML = str;
  // })
  
  
  
  
  
  
  
    // const currentVideo = urlParameters.get("v");
  
    // if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    //   chrome.storage.sync.get([currentVideo], (data) => {
    //     const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];
  
    //     viewBookmarks(currentVideoBookmarks);
    //   });
    // } else {
    //   const container = document.getElementsByClassName("container")[0];
  
    //   container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
    // }
  
  
  // });
  
  
  
  // chrome.runtime.sendMessage({ type: 'getHistory' }, function (response) {
   
  //   console.log(JSON.stringify(response.history))
  //   console.log("getting history")
  //   var str = '<ul>'
  //   for (const item of response.history) {
  //     // Calculate the radius of the sphere based on the time spent on the URL
  //     // const radius = item.timeSpent / 1000; // timeSpent is in milliseconds, so divide by 1000 to get seconds
  //     console.log("getting history")
  //     console.log(item)
  //     str += '<li>'+ item + '</li>';
  //   }
  //   str += '</ul>';
  //   document.getElementById("url_list").innerHTML = str;
  // })
  
  
  
  // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //   console.log('message received in new tab')
    // console.log(JSON.stringify(request))
    //   if (request.type === 'sendHistoryFromBackground') {
    //     // Get the user's history from the chrome.history API
    //     console.log('get history from background');
    //     // console.log(urls)
    //     // sendResponse({ history: urls});
    //     // sendResponse({ history: activeTimes });
    //     // chrome.history.search({ text: '', maxResults: 100 }, function (historyItems) {
    //     //   // Send the history data back to the popup script
    //     //   sendResponse({ history: activeTimes });
    //     // });
    //     console.log(JSON.stringify(response.history))
    //     var str = '<ul>'
    //     for (const item of response.history) {
    //       // Calculate the radius of the sphere based on the time spent on the URL
    //       // const radius = item.timeSpent / 1000; // timeSpent is in milliseconds, so divide by 1000 to get seconds
    //       console.log("getting history")
    //       console.log(item)
    //       str += '<li>'+ item + '</li>';
    //     }
    //     str += '</ul>';
    //     document.getElementById("url_list").innerHTML = str;
  
  
    //   }
    // });
  
  
    //   // Create the sphere and label
    //   const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
    //   const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    //   const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    //   const label = document.createElement('div');
    //   label.innerHTML = item.url;
    //   label.style.position = 'absolute';
    //   label.style.top = '0';
    //   label.style.left = '0';
    //   document.body.appendChild(label);
  
    //   // Add the sphere and label to the scene
    //   scene.add(sphere);
    // }
  
    // // Render the scene
    // function animate() {
    //   requestAnimationFrame(animate);
    //   renderer.render(scene, camera);
    // }
    // animate();
  // });
  