import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleUpload() {
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('file_name', file.name);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseText = await response.text();
      const [fileMessage, taskIdMessage] = responseText.split('\n');
      const fileName = fileMessage.split(': ')[1];
      const taskId = taskIdMessage.split(': ')[1];
      setUploadedFiles([...uploadedFiles, { fileName, taskId, status: 'Uploaded' }]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

async function fetchStatus(taskId) {
  try {
    const response = await axios.get(`http://localhost:3000/result?id=${taskId}`);
      const newStatus = response.data.status;
      console.log(newStatus)
      setUploadedFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.taskId === taskId ? { ...file, status: newStatus } : file
        )
      );
  } catch (error) {
    console.error('Error fetching status:', error);
  }
}

  const handleDelete = (taskId) => {
    // Delete logic to be added here
  };

  const handleAnalyze = (taskId) => {
    // Image analysis logic to be added here
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Task ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles.map((file, index) => (
            <tr key={index}>
              <td>{file.fileName}</td>
              <td>{file.taskId}</td>
              <td>
                {file.status}
                <button onClick={() => fetchStatus(file.taskId)}>Refresh Status</button>
              </td>
              <td>
                <button onClick={() => handleDelete(file.taskId)}>Delete</button>
                <button onClick={() => handleAnalyze(file.taskId)}>Analyze Image</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Upload;