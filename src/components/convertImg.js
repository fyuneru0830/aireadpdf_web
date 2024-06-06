import React, { useEffect } from 'react';

const convertImg = async (taskId, updateStatus) => {
  console.log('开始转换');
  updateStatus(taskId, 'converting image');
  try {
    const response = await fetch(`http://localhost:3000/convert_img?id=${taskId}`);
    const result = await response.json();

    if (result.status === 'success') {
      updateStatus(taskId, 'convert to image success');
    } else {
      updateStatus(taskId, 'convert to image failed');
    }
  } catch (error) {
    console.error('转换失败:', error);
    updateStatus(taskId, 'convert to image failed');
  }
};

const ConvertImg = ({ taskId, updateStatus, uploadedFiles }) => {
  useEffect(() => {
    const file = uploadedFiles.find((file) => file.task_id === taskId);
    if (file && file.status === 'uploaded') {
      convertImg(taskId, updateStatus);
    }
  }, [taskId, updateStatus, uploadedFiles]);

  return null;
};

export default ConvertImg;