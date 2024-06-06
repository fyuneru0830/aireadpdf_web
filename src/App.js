import React, { useState, useEffect } from 'react';
import MultipleFilesUpload from './components/upload';
import FileList from './components/fileList';
import ConvertImg from './components/convertImg';
import PromptInput from './components/promptInput';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(true);
  const [showFileList, setShowFileList] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);

  const handleUploadComplete = (files) => {
    setUploadedFiles(files);
    setShowFileList(true); // 显示 FileList 组件
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
    const allConverted = uploadedFiles.every(file => file.status === 'convert to image success');
    if (allConverted && uploadedFiles.length > 0) {
      setShowFileList(false);
      setShowPromptInput(true); // 显示 PromptInput 组件
    }
  }, [uploadedFiles]);

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
      {showPromptInput && <PromptInput />}
    </div>
  );
}

export default App;