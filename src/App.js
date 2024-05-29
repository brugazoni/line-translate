import React, { useState } from 'react';
import './App.css';
import UserInput from './UserInput';
import TextDisplay from './TextDisplay';
import Header from './Header';

const defaultText = `When the flush of a newborn sun fell first on Eden's green and gold,
Our father Adam sat under the Tree and scratched with a stick in the mold;
And the first rude sketch that the world had seen was joy to his mighty heart,
Till the Devil whispered behind the leaves: "It's pretty, but is it Art?"`;

function App() {
  const [displayText, setDisplayText] = useState(defaultText);
  const [selectedInputLanguage, setSelectedInputLanguage] = useState('en');
  const [selectedOutputLanguage, setSelectedOutputLanguage] = useState('pt');

  const handleInputChange = (text) => {
    setDisplayText(text);
  };

  const handleInputLanguageChange = (inputLanguage) => {
    setSelectedInputLanguage(inputLanguage);
  };

  const handleOutputLanguageChange = (outputLanguage) => {
    setSelectedOutputLanguage(outputLanguage);
  };

  return (
    <div className="App">
      <Header />
      <div className="Main-content">
        <div className="UserInput">
          <UserInput 
            onInputChange={handleInputChange}
            defaultText={defaultText}
            onInputLanguageChange={handleInputLanguageChange}
            onOutputLanguageChange={handleOutputLanguageChange}
          />
        </div>
        <div className="TextDisplay">
          <TextDisplay 
            text={displayText} 
            targetInputLanguage={selectedInputLanguage} 
            targetOutputLanguage={selectedOutputLanguage} 
            onOutputLanguageChange={handleOutputLanguageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
