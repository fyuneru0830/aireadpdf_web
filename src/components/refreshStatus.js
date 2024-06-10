export const refreshStatus = async (taskId) => {
    try {
      const response = await fetch(`http://210.239.67.21:3000/result?id=${taskId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      const pendingCount = result.filter(item => item.status === 'pending').length;
      const completedCount = result.filter(item => item.status === 'completed').length;
      //如果都完成则显示done，否则显示pending/completed
      if (pendingCount === 0) {
        return { status: 'Done', result };
      } else {
        return { status: `${completedCount}/${pendingCount + completedCount}`, result };
      }
    } catch (error) {
      console.error('Error during status refresh:', error);
      return { status: 'error', message: error.message };
    }
  };