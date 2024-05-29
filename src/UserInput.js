// UserInput.js
import React, { useState, useEffect } from 'react';
import './UserInput.css';

const UserInput = ({ onInputChange, defaultText, onInputLanguageChange, onOutputLanguageChange }) => {
  const [inputText, setInputText] = useState(defaultText);
  const [selectedInputLanguage, setSelectedInputLanguage] = useState('en');
  const [selectedOutputLanguage, setSelectedOutputLanguage] = useState('pt');

  useEffect(() => {
    onInputChange(defaultText);
  }, [defaultText, onInputChange]);

  const handleChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    onInputChange(text);
  };

  const handleInputLanguageChange = (e) => {
    const inputLanguage = e.target.value;
    setSelectedInputLanguage(inputLanguage);
    onInputLanguageChange(inputLanguage);
  };

  const handleOutputLanguageChange = (e) => {
    const outputLanguage = e.target.value;
    setSelectedOutputLanguage(outputLanguage);
    onOutputLanguageChange(outputLanguage);
  };

  return (
    <div className="user-input">
      <textarea value={inputText} onChange={handleChange} />
      <InputSelectLanguage selectedLanguage={selectedInputLanguage} onLanguageChange={handleInputLanguageChange} />
      <OutputSelectLanguage selectedLanguage={selectedOutputLanguage} onLanguageChange={handleOutputLanguageChange} />
    </div>
  );
};

const InputSelectLanguage = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <label>Input language:
      <select name="inputLanguage" value={selectedLanguage} onChange={onLanguageChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="pt">Portuguese</option>
        <option value="it">Italian</option>
        <option value="es">Spanish</option>
      </select>
    </label>
  );
};

const OutputSelectLanguage = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <label>Output language:
      <select name="outputLanguage" value={selectedLanguage} onChange={onLanguageChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="pt">Portuguese</option>
        <option value="it">Italian</option>
        <option value="es">Spanish</option>
      </select>
    </label>
  );
};

export default UserInput;
