import React, { useState, useEffect } from 'react';
import './promptInput.css';

const PromptInput = ({ onSubmit }) => {
  const [systemPrompt, setSystemPrompt] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [jsonPrompt, setJsonPrompt] = useState('');

  useEffect(() => {
    setJsonPrompt(JSON.stringify({ systemPrompt, userPrompt }));
  }, [systemPrompt, userPrompt]);

  const handleJsonChange = (e) => {
    const { value } = e.target;
    setJsonPrompt(value);
    try {
      const parsed = JSON.parse(value);
      if (parsed.systemPrompt !== undefined) setSystemPrompt(parsed.systemPrompt);
      if (parsed.userPrompt !== undefined) setUserPrompt(parsed.userPrompt);
    } catch (error) {
      // Handle JSON parse error if needed
    }
  };

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
      <input
        type="text"
        className="prompt-input"
        placeholder="System+User Prompt"
        value={jsonPrompt}
        //输入框为浅绿色
        style={{ backgroundColor: 'lightgreen' }}
        onChange={handleJsonChange}
      />
      <button className="submit-button" onClick={handleSubmit}>
        提交
      </button>
    </div>
  );
};

export default PromptInput;