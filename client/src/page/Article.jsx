import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import moment from 'moment';
import 'animate.css';
import Lottie from 'lottie-react';
import loading from '../assets/loading.json';

function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  useEffect(() => {
    fetch(`https://api.blog.jiahuiiiii.mrga.thecodeblog.net/article/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setContent(json);
      });
  }, []);

  return (
    <div className="bg-amber-300 flex-col flex w-full h-screen p-20 overflow-y-scroll overflow-x-hidden relative">
      <Link to="/" className="flex z-[9999] flex-row gap-3 hover:gap-5 mb-2 transition-all items-center">
        <div to="/" className="text-xl">Back to home</div>
        <Icon icon="bi:arrow-left" className="w-8 h-8" />
      </Link>
      {
        content ? (
          <div className="animate__animated animate__bounce">
            <div className="mt-6 text-6xl font-bold tracking-wide hover:tracking-wider transition-all">{content.name}</div>
            <div className="mt-4">{moment(content.date).format('LLL')}</div>
            <div dangerouslySetInnerHTML={{ __html: content.content }} className="text-xl mt-6" />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: loading,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={400}
              width={400}
            />

          </div>
        )
      }
      <Icon icon="arcticons:carsmile" className="w-[72rem] h-[72rem] opacity-30 absolute bottom-0 right-0 translate-x-48 translate-y-48" />
    </div>
  );
}

export default Article;
