/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types, no-underscore-dangle

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

function Post({
  item, postList, setData, index,
}) {
  const deletePost = (id) => {
    fetch(`http://localhost:8787/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        if (d.success) {
          setData(postList.filter((e) => e._id !== id));
        }
      });
    console.log(postList);
  };
  return (
    <motion.div
      layoutId={index}
      initial={{
        y: 0,
        x: 600,
        opacity: 0,
      }}
      animate={{
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          delay: 0.1 * index,
          duration: 0.3,
        },
      }}
      exit={{
        y: 0,
        x: 600,
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      }}
      className="flex flex-row transition-all p-8 hover:shadow-2xl bg-amber-100 bg items-center justify-between border border-neutral border-1  "
    >
      <div>
        <div className="text-2xl tracking-wide">{item.name}</div>
        <div className="text-neutral-500">
          {(() => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(
              item.content,
              'text/html',
            );
            const text = doc.body.textContent || '';
            return text.substring(0, 100);
          })()}
        </div>
        <Link
          to={`/article/${item._id}`}
          className="flex gap-2 transition-all hover:gap-4 items-center"
        >
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
          <li className="flex flex-row items-center">
            <button
              type="button"
              onClick={() => deletePost(item._id)}
              className="w-full justify-start btn bg-transparent border-none hover:bg-rose-500"
            >
              <Icon
                icon="ant-design:delete-outlined"
                className="text-neutral w-7 h-7 -mt-[2px]"
              />
              Delete
            </button>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}

export default Post;
