export const sendAiRequest = async (taskId, systemPrompt, userPrompt) => {
    try {
      const response = await fetch(`http://localhost:3000/convert_txt?id=${taskId}&system_prompt=${systemPrompt}&user_prompt=${userPrompt}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error during AI request:', error);
      return { status: 'error', message: error.message };
    }
  };