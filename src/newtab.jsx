import React, { useState, useEffect } from 'react';
import chrome from 'chrome';
// import { chrome } from 'chrome-extension-async';
import { render } from 'react-dom';

const Newtab = () => {

  const [selectedValues, setSelectedValues] = useState(["1", "2"]);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'getHistory' }, function (response) {
        console.log('send for history from newtab')
        setUrls(response.history);
      })
  }, []);

  useEffect(() => {

    // Register a listener for incoming messages
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.type == "sendHistoryFromBackground")
            console.log('listener for history from newtab')
            setUrls(request.data)
            sendResponse({farewell: "goodbye"});
          }
    );

  }, []); 

  return (
    <div >
      <header >
        <h4>FADER NEW TAB</h4>
        <p>
          ******fader******
        </p>
      </header>
      {urls.map((url) => {
            return (
                <div>
                <p>{url}</p>
                </div>
            )
        })}
    </div>
  );
};

render(<Newtab/>, document.getElementById('react-target-newtab'));