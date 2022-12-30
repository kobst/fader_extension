import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const Popup = () => {

  const [selectedValues, setSelectedValues] = useState(["1", "2"]);

  useEffect(() => {
    console.log(selectedValues);
  }, []);

  return (
    <div >
      <header >
        <h4>FADER</h4>
        <p>
          ******fader******
        </p>
      </header>
    </div>
  );
};

render(<Popup/>, document.getElementById('react-target'));