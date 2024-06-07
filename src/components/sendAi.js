export const sendAiRequest = async (taskId, systemPrompt, userPrompt) => {
  const controller = new AbortController();
  const signal = controller.signal;

  console.log('Sending request with:', { taskId, systemPrompt, userPrompt });

  try {
    const response = await fetch('http://localhost:3000/convert_txt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: taskId,
        system_prompt: systemPrompt,
        user_prompt: userPrompt
      }),
      signal: signal
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error during AI request:', error);
    return { status: 'error', message: error.message };
  }
};