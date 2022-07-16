import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

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
    <div className="bg-amber-300 flex-col flex w-full h-screen p-20 overflow-y-scroll overflow-x-hidden relative">
      <Link to="/" className="flex flex-row gap-3 hover:gap-5 mb-2 transition-all items-center">
        <div className="text-xl">Back to home</div>
        <Icon icon="bi:arrow-left" className="w-8 h-8" />
      </Link>
      <div>
        <div className="flex flex-row items-center gap-2">
          <div className="text-4xl font-bold tracking-wide hover:tracking-wider transition-all mb-6">{content.name}</div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: content.content }} />
      </div>
      <Icon icon="arcticons:carsmile" className="w-[72rem] h-[72rem] opacity-30 absolute bottom-0 right-0 translate-x-48 translate-y-48" />
    </div>
  );
}

export default Article;
