import React, { useState, useEffect } from 'react';
import './TextDisplay.css';

const TextDisplay = ({ text, targetInputLanguage, targetOutputLanguage }) => {
  const [selectedText, setSelectedText] = useState('');

  const handleSelection = async () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(selectedText);

      try {
        const response = await fetch('http://localhost:3001/highlight', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            text: selectedText, 
            targetInputLanguage: targetInputLanguage, 
            targetOutputLanguage: targetOutputLanguage 
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to translate text');
        }

        const { translatedText } = await response.json();

        const highlightDiv = document.createElement('div');
        highlightDiv.textContent = translatedText;
        highlightDiv.className = 'highlighted-text';
        highlightDiv.style.top = `${rect.top + window.scrollY - 30}px`;
        highlightDiv.style.left = `${rect.left + window.scrollX}px`;
        highlightDiv.addEventListener('click', () => {
          highlightDiv.remove();
          setSelectedText('');
        });
        document.body.appendChild(highlightDiv);
      } catch (error) {
        console.error('Error translating text:', error);
      }
    }
  };

  return (
    <div className="text-display" onMouseUp={handleSelection}>
      {text.split('\n').map((paragraph, index) => (
        <div key={index}>
          {paragraph}
          {index !== text.split('\n').length - 1 && <br />}
        </div>
      ))}
    </div>
  );
};

export default TextDisplay;
