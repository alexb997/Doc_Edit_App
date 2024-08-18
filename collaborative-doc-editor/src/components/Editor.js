import React, { useEffect, useState } from 'react';
import socket from '../services/socket';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function Editor() {
  const { documentId } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    // Join the document room
    socket.emit('joinDocument', documentId);

    // Load the document content from the server
    api.get(`/documents/${documentId}`).then((res) => {
      setContent(res.data.content);
    });

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
    <textarea
      value={content}
      onChange={handleChange}
      style={{ width: '100%', height: '90vh' }}
    ></textarea>
  );
}

export default Editor;
