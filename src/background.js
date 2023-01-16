

// a url and what time it was navigated to
// let urlActiveEvent = {
//     url: '',
//     timestamp:  Date.now() 
// }

// an array of urls and the times they were activated
// let urlHistory = [urlActiveEvent]

// let tabActives = {
//     startTime: Date.now(),
//     endTime: Date.now(),
// }

// let tabData = {
//     id: '',
//     urls: urlHistory,
//     activeTimes: tabActives
// }

// let tabs = [tabData]


// tabData = {
//     tabId1: {
//       url: {
//           url1: timestamp1,
//           url2: timestamp2,
//           ...
//       },
//       active: [timestamp1, timestamp2, ...]
//     },
//     tabId2: {
//       url: {
//           url1: timestamp1,
//           url2: timestamp2,
//           ...
//       },
//       active: [timestamp1, timestamp2, ...]
//     },
//     ...
//   }
  

  ////////////////////    USING LOCAL STORAGE  TO GET THE URLS OF ALL THE TABS    //////////////////////

let tabData = {}

chrome.storage.local.get('tabData', function(result) {
    console.log('get data from storage')
    if(result.tabData){
        tabData = result.tabData;
    }else{
        tabData = {};
    }
});

// 

chrome.tabs.query({}, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      tabData[tab.id] = {
        url: {},
        active: []
      };
      tabData[tab.id].url[tab.url] = Date().toString();
    }
    console.log('update tabData onQuery')
    chrome.storage.local.set({tabData: tabData});

  });

chrome.tabs.onActivated.addListener(function(activeInfo) {
    var tabId = activeInfo.tabId;
    if(!tabData[tabId]){
        tabData[tabId] = {
            url: {},
            active: []
        }
    }
    tabData[tabId].active.push(Date().toString());
    console.log('update tabData onActivated')
    chrome.storage.local.set({tabData: tabData});

});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        if(!tabData[tabId]){
            tabData[tabId] = {
                url: {},
                active: []
            }
        }
        tabData[tabId].url[changeInfo.url] = Date().toString();;
        console.log('update tabData onUpdated')
        chrome.storage.local.set({tabData: tabData});
    }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    delete tabData[tabId];
    chrome.storage.local.set({tabData: tabData});
});










  ////////////////////    PREVIOUS IMPLEMENTATION    //////////////////////


// chrome.tabs.query({}, function(tabs) {
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


// listen for changes to the user's browsing history
// chrome.history.onVisited.addListener(function (historyItem) {
//   // get the current time
//   // let currentTime = Date.now();
// //   console.log(historyItem.url);
//   // console.log(JSON.stringify(historyItem))
//   urls.push(historyItem.url);
//   // if the tab is already in the map, update its active time

//   chrome.runtime.sendMessage({ type: 'sendHistoryFromBackground', data: historyItem.url }, function (response) {
//     // console.log(response.farewell);
//   })

// });





///


// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     // console.log('message received in background......')
//       if (request.type === 'getHistory') {
//         // Get the user's history from the chrome.history API
//         // console.log('get history');
//         // console.log(urls)
//         sendResponse({ history: urls});
//       }
//     });

// const activeTab = {};
// let activeTabNow

// chrome.tabs.onActivated.addListener((activeInfo) => {
//     chrome.tabs.get(activeInfo.tabId, (tab) => {
//     activeTab.timestamp = Date.now();
//     activeTab.url = tab.url;
//     activeTabNow = tab
//     console.log(activeTabNow.url + " " + tab.id + " active tab now" + activeTab.timestamp)
//     });

// });
    


    
// chrome.webNavigation.onCommitted.addListener(function(details) {
//     // console.log("current url" + getActiveTabURL())
//     var currentTab
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         // The first element in the array (tabs[0]) represents the current tab
//         currentTab = tabs[0].title;
//         // console.log(currentTab.id);       // Outputs the ID of the current tab
//         // currentTab = currentTab      // Outputs the URL of the current tab
//         // console.log(currentTab.title);    // Outputs the title of the current tab
//       });
    
//     console.log("URL: " + activeTabNow.url + "  ID: " + activeTabNow.id + " Transition type: " + details.transitionType + " URL: " + details.url);
//     // console.log("Transition type: " + details.transitionType);
//     // console.log("URL: " + details.url);
//     // console.log("Details: " + JSON.stringify(details));
    
// });
      
// chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
//     console.log("Tab ID: " + tabId + " has been closed");
//   });
  


// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === "loading") {
//       if (tab.openerTabId) {
//         console.log(tab.url + " navigated to from a previous page in a different tab")
//       } else {
//         console.log(tab.url + "The tab was navigated to from a previous page in the same tab")
//         // The tab was navigated to from a previous page in the same tab
//       }
//     }
//     if (changeInfo.url && changeInfo.status === 'complete') {
//         console.log("Tab ID: " + tabId + " URL changed to: " + changeInfo.url);
//       }
//     chrome.runtime.sendMessage({tabId: tabId, changeInfo: changeInfo, tab: tab});
//   });

// //   chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
// //     chrome.runtime.sendMessage({tabId: tabId, changeInfo: changeInfo, tab: tab});
// //   });


  
  
  

// async function getActiveTabURL() {
//     const tabs = await chrome.tabs.query({
//         currentWindow: true,
//         active: true
//     });
//     return tabs[0];
//   }