import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Page() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/convert_img');
        setPages(response.data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };

    fetchPages();
  }, []);

  return (
    <div>
      {pages.map((page, index) => (
        <div key={index}>
          <img src={`data:image/png;base64,${page}`} alt={`Page ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default Page;