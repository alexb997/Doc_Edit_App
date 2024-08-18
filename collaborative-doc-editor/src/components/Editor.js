import React, { useEffect, useState } from 'react';
import socket from '../services/socket';

function Editor({ documentId }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Join the document room
    socket.emit('joinDocument', documentId);

    // Listen for document updates
    socket.on('documentUpdate', (newContent) => {
      setContent(newContent);
    });

    return () => {
      socket.disconnect();
    };
  }, [documentId]);

  const handleChange = (e) => {
    setContent(e.target.value);
    socket.emit('editDocument', { documentId, content: e.target.value });
  };

  return (
    <textarea value={content} onChange={handleChange}></textarea>
  );
}

export default Editor;
