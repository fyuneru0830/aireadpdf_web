import React, { useState, useRef } from 'react';
import './upload.css';

const MultipleFilesUpload = ({ onUploadComplete, onHide }) => {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const handleFilesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    const uploadedFiles = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('file_name', file.name);

      // 更新文件状态为上传中
      uploadedFiles.push({ file_name: file.name, status: 'uploading', task_id: null });

      try {
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        const task_id = result.taskId;

        // 更新文件状态为已上传，并保存 task_id
        uploadedFiles[uploadedFiles.length - 1] = {
          file_name: file.name,
          status: 'uploaded',
          task_id: task_id,
        };
      } catch (error) {
        console.error('上传失败:', error);
        uploadedFiles[uploadedFiles.length - 1] = {
          file_name: file.name,
          status: 'failed',
          task_id: null,
        };
      }
    }
    onUploadComplete(uploadedFiles);
    onHide(); // 隐藏组件
  };

  const handleClear = () => {
    setFiles([]);
  };

  return (
    <div>
      <div
        className="upload-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          multiple
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={handleFilesChange}
        />
        <button className="upload-button" onClick={() => inputRef.current.click()}>选择文件</button>
        <button className="upload-button" onClick={handleClear}>清空文件</button>
        <div className="file-list">
          {files.map((file, index) => (
            <p className="file-item" key={index}>{file.name}</p>
          ))}
        </div>
      </div>
      <button className="upload-button upload-button-outside" onClick={handleUpload}>上传文件</button>
    </div>
  );
};

export default MultipleFilesUpload;