(()=>{var e=[];chrome.history.onVisited.addListener((function(o){console.log(o.url),e.push(o.url),chrome.runtime.sendMessage({type:"sendHistoryFromBackground",data:e},(function(e){console.log(e.farewell)}))})),chrome.runtime.onMessage.addListener((function(o,n,s){console.log("message received in background......"),"getHistory"===o.type&&(console.log("get history"),console.log(e),s({history:e}))}))})();