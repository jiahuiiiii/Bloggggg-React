/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import Logo from '../assets/blog.svg';
import Post from './Post';

function Index() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8787/list')
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);
  return (
    <div className="flex-col w-full text-neutral min-h-screen bg-amber-300 flex items-center p-32 tracking-wider">
      <div className="flex flex-row w-full justify-between items-center">
        <img alt="bruh" src={Logo} className="w-72" />
        {/* <h1 className="text-4xl tracking-wider transition-all hover:tracking-widest">
          BLOGGGGG
        </h1> */}
        <Link to="/create" className="flex flex-row items-center">
          <div
            to="/create"
            className="hover:shadow-2xl transition-all shadow-md bg-neutral px-8 py-6 text-white text-xl h-min"
          >
            Create post
          </div>
        </Link>
      </div>
      {data ? (
        <AnimateSharedLayout>
          <div className="w-full space-y-10 mt-16 " layout>
            <AnimatePresence>
              {data.map((item, index) => (
                <Post key={item._id} item={item} index={index} setData={setData} postList={data} />
              ))}
            </AnimatePresence>
          </div>
        </AnimateSharedLayout>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Index;
