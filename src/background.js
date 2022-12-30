let urls = [];

// listen for changes to the user's browsing history
chrome.history.onVisited.addListener(function (historyItem) {
  // get the current time
  // let currentTime = Date.now();
  console.log(historyItem.url);
  // console.log(JSON.stringify(historyItem))
  urls.push(historyItem.url);
  // if the tab is already in the map, update its active time

  chrome.runtime.sendMessage({ type: 'sendHistoryFromBackground', data: urls }, function (response) {
    console.log(response.farewell);
  })

});



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('message received in background......')
      if (request.type === 'getHistory') {
        // Get the user's history from the chrome.history API
        console.log('get history');
        console.log(urls)
        sendResponse({ history: urls});
      }
    });
    