import React, { useState, useEffect } from 'react';
import MultipleFilesUpload from './components/upload';
import FileList from './components/fileList';
import ConvertImg from './components/convertImg';
import PromptInput from './components/promptInput';
import { sendAiRequest } from './components/sendAi';
import { refreshStatus } from './components/refreshStatus';
import { exportExcel } from './components/export';
import './App.css';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(true);
  const [showFileList, setShowFileList] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [polling, setPolling] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const handleUploadComplete = (files) => {
    setUploadedFiles(files);
    setShowFileList(true);
  };

  const handleHideUpload = () => {
    setShowUpload(false);
  };

  const updateStatus = (taskId, newStatus) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.task_id === taskId ? { ...file, status: newStatus } : file
      )
    );
  };

  useEffect(() => {
    let interval;
    if (polling) {
      interval = setInterval(async () => {
        for (const file of uploadedFiles) {
          const { status } = await refreshStatus(file.task_id);
          updateStatus(file.task_id, status);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [polling, uploadedFiles]);

  useEffect(() => {
    const allConverted = uploadedFiles.every(file => file.status === 'convert to image success');
    if (allConverted && uploadedFiles.length > 0) {
      setShowFileList(false);
      setShowPromptInput(true);
    }
  }, [uploadedFiles]);

  useEffect(() => {
    const allDone = uploadedFiles.every(file => file.status === 'Done');
    setAllDone(allDone);
  }, [uploadedFiles]);

  const handlePromptSubmit = async (systemPrompt, userPrompt) => {
    setShowFileList(true);
    setShowPromptInput(false);
    for (const file of uploadedFiles) {
      if (file.status === 'convert to image success') {
        updateStatus(file.task_id, 'waiting AI response');
        try {
          setPolling(true);
          const result = await sendAiRequest(file.task_id, systemPrompt, userPrompt);
        } catch (error) {
          console.error('AI 请求失败:', error);
          updateStatus(file.task_id, 'AI response failed');
        }
      }
    }
  };

  const handleExport = async () => {
    for (const file of uploadedFiles) {
      try {
        await exportExcel(file.task_id, file.file_name);
      } catch (error) {
        console.error(`导出失败 (task_id: ${file.task_id}):`, error);
      }
    }
  };

  return (


    <div className="App">
      <h1>文件上传</h1>
      {showUpload && (
        <MultipleFilesUpload
          onUploadComplete={handleUploadComplete}
          onHide={handleHideUpload}
        />
      )}
      {showFileList && <FileList files={uploadedFiles} />}
      {uploadedFiles
        .filter((file) => file.status === 'uploaded')
        .map((file) => (
          <ConvertImg key={file.task_id} taskId={file.task_id} updateStatus={updateStatus} uploadedFiles={uploadedFiles} />
        ))}
      {showPromptInput && <PromptInput onSubmit={handlePromptSubmit} />}
      {
      uploadedFiles.length > 0 && 
      allDone && <button className="export-button" onClick={handleExport}>导出 Excel</button>}
    </div>
  );
}

export default App;