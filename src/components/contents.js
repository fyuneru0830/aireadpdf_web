import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contents() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/result');
        setContents(response.data);
      } catch (error) {
        console.error('Error fetching contents:', error);
      }
    };

    fetchContents();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await axios.get('http://localhost:3000/export', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted_images.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download</button>
      <div>
        {contents.map((content, index) => (
          <div key={index}>
            <p>{content.api_response}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contents;