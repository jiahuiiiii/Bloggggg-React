/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import Post from './Post';

function Index({ isAuth, signUserOut }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8787/list')
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);
  return (
    <div className="flex-col w-full text-neutral min-h-screen bg-amber-300 flex items-center p-32 tracking-wider">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-row items-end gap-5 hover:tracking-wider hover:gap-7 transition-all">
          <div className="hover:tracking-wide transition-all text-6xl font-bold font-['Edu_NSW_ACT_Foundation'] ml-2">
            jiahuiiiii&apos;s bloggggg
          </div>
          <div className="font-['Edu_NSW_ACT_Foundation'] transition-all">
            EST. 2022
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!isAuth ? (
            <Link to="/login" className="flex flex-row items-center">
              <div
                to="/login"
                className="hover:shadow-2xl transition-all shadow-md bg-neutral px-8 py-6 text-white text-xl h-min"
              >
                Login
              </div>
            </Link>
          ) : (
            <div className="flex flex-row items-center">
              <div
                onClick={signUserOut}
                className="hover:shadow-2xl transition-all shadow-md bg-neutral px-8 py-6 text-white text-xl h-min"
              >
                Log out
              </div>
            </div>
          )}
          {isAuth && (
            <Link to="/create" className="flex flex-row items-center">
              <div
                to="/create"
                className="hover:shadow-2xl transition-all shadow-md bg-neutral px-8 py-6 text-white text-xl h-min"
              >
                Create post
              </div>
            </Link>
          )}
        </div>
      </div>
      {data ? (
        <AnimateSharedLayout>
          <div className="w-full space-y-10 mt-16 " layout>
            <AnimatePresence>
              {data.map((item, index) => (
                <Post
                  key={item._id}
                  item={item}
                  index={index}
                  setData={setData}
                  postList={data}
                  isAuth={isAuth}
                />
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
