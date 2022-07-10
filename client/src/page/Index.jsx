/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function Index() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8787/list')
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);
  console.log(data);
  return (
    <div className="flex-col w-full text-neutral min-h-screen bg-amber-300 flex items-center p-32 tracking-wider">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className="text-4xl tracking-wider transition-all hover:tracking-widest">
          BLOGGGGG
        </h1>
        <Link to="/create" className="flex flex-row items-center">
          <div to="/create" className="hover:shadow-2xl transition-all shadow-md bg-neutral px-8 py-6 text-white text-xl h-min">
            Create post
          </div>
        </Link>
      </div>
      {data ? (
        <div className="w-full space-y-10 mt-16">
          {data.map((item) => (
            <div className="flex flex-row transition-all p-8 hover:shadow-2xl bg-amber-100 bg items-center justify-between border border-neutral border-1  ">
              <div>
                <div className="text-2xl tracking-wide">{item.name}</div>
                <div className="text-neutral-500">
                  {(() => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(item.content, 'text/html');
                    const text = doc.body.textContent || '';
                    return text.substring(0, 100);
                  })()}

                </div>
                <Link to={`/article/${item._id}`} className="flex gap-2 transition-all hover:gap-4 items-center">
                  <Icon icon="akar-icons:arrow-right" />
                  <div>Read Aricle</div>
                </Link>
              </div>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex="0"
                  className="btn bg-transparent border-none hover:bg-amber-50 transition-all m-1"
                >
                  <Icon
                    icon="bx:dots-vertical-rounded"
                    className="h-8 w-8 text-neutral"
                  />
                </label>
                <ul
                  tabIndex="0"
                  className="dropdown-content menu p-2 shadow bg-amber-50 rounded-box w-52"
                >
                  <li className="flex flex-row items-center ">
                    <a className="w-full justify-start btn bg-transparent border-none hover:bg-teal-500">
                      <Icon
                        icon="ant-design:edit-outlined"
                        className="text-neutral w-7 h-7 -mt-[2px]"
                      />
                      <a>Edit</a>
                    </a>
                  </li>
                  <li className="flex flex-row items-center ">
                    <a className="w-full justify-start btn bg-transparent border-none hover:bg-rose-500">
                      <Icon
                        icon="ant-design:delete-outlined"
                        className="text-neutral w-7 h-7 -mt-[2px]"
                      />
                      <a>Delete</a>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Index;
