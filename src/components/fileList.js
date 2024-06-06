import React from 'react';
import './fileList.css';

const FileList = ({ files }) => {
  return (
    <div className="table-scroll">
      <table className="file-table">
        <thead>
          <tr>
            <th>文件名</th>
            <th>状态</th>
            <th>任务ID</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td data-label="文件名">{file.file_name}</td>
              <td data-label="状态">{file.status}</td>
              <td data-label="任务ID">{file.task_id || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;