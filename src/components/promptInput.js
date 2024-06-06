import React, { useState } from 'react';
import './promptInput.css';

const PromptInput = ({ onSubmit }) => {
  const [systemPrompt, setSystemPrompt] = useState('');
  const [userPrompt, setUserPrompt] = useState('');

  const handleSubmit = () => {
    onSubmit(systemPrompt, userPrompt);
  };

  return (
    <div className="prompt-input-container">
      <input
        type="text"
        className="prompt-input"
        placeholder="System Prompt"
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
      />
      <input
        type="text"
        className="prompt-input"
        placeholder="User Prompt"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />
      <button className="submit-button" onClick={handleSubmit}>
        提交
      </button>
    </div>
  );
};

export default PromptInput;