import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function Article() {
  const { id } = useParams();
  const [content, setContent] = useState('');
  useEffect(() => {
    fetch(`http://localhost:8787/article/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setContent(json);
      });
  }, []);

  return (
    <div className="bg-amber-300 flex-col flex w-full h-screen items-center">
      <div className="text-4xl font-bold mt-20">{content.name}</div>
      <div>{content.content}</div>
    </div>
  );
}

export default Article;
