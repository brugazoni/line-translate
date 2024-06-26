import React, { useState } from 'react';
import './TextDisplay.css';
import { ClipLoader } from 'react-spinners';

const TextDisplay = ({ text, targetInputLanguage, targetOutputLanguage }) => {
  const [selectedText, setSelectedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelection = async () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(selectedText);
      setIsLoading(true);

      try {
        const response = await fetch('https://line-translate.onrender.com/highlight', {
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
      } finally {
        setIsLoading(false); // Set loading state to false after the request is complete
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
      {isLoading && (
        <div className="loading-icon">
          <ClipLoader color="#000" size={50} />
        </div>
      )}
    </div>
  );
};

export default TextDisplay;
