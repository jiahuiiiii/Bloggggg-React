/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit({ notifyFinish }) {
  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const [confirmLeave, setConfirmLeave] = useState(true);
  const { id } = useParams();

  function insertToEditor(url) {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', url);
  }
  function saveToServer(file) {
    const fd = new FormData();
    fd.append('image', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.blog.jiahuiiiii.mrga.thecodeblog.net/upload/image', true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const url = JSON.parse(xhr.responseText).data;
        insertToEditor(url);
      }
    };
    xhr.send(fd);
  }
  function selectLocalImage() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    input.onchange = () => {
      const file = input.files[0];

      if (/^image\//.test(file.type)) {
        saveToServer(file);
      } else {
        console.warn('You could only upload images.');
      }
    };
  }
  function update() {
    const data = {
      name: title,
      content: quill.root.innerHTML,
      date: new Date(),
    };
    fetch(`https://api.blog.jiahuiiiii.mrga.thecodeblog.net/article/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.success) {
          localStorage.clear();
          notifyFinish('Post updated successfully');
          navigate('/');
        }
      });
  }
  useEffect(() => {
    if (quill) {
      quill.getModule('toolbar').addHandler('image', () => {
        selectLocalImage();
      });
      fetch(`https://api.blog.jiahuiiiii.mrga.thecodeblog.net/article/${id}`)
        .then((res) => res.json())
        .then((d) => {
          setTitle(d.name);
          quill.root.innerHTML = d.content;
        });
    }
  }, [quill]);

  return (
    <div className="w-full h-screen p-32 bg-amber-300">
      {!confirmLeave ? (
        <div className="fixed overscroll-contain w-full h-screen top-0 left-0 bg-slate-600 bg-opacity-40 z-[9999]">
          <div className=" border border-neutral bg-amber-200 alert rounded-none flex-col items-start shadow-lg z-9999 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 z-[9999]">
            <div className="items-start flex flex-col">
              <h2 className="text-xl font-medium">
                Are you sure you want to leave?
              </h2>
              <p>You&apos;ll lose all the stuff you&apos;ve wirtten</p>
            </div>
            <div className="flex-none w-full flex justify-end">
              <button
                onClick={() => setConfirmLeave(true)}
                type="button"
                className="btn btn-sm btn-ghost rounded-none"
              >
                No
              </button>
              <Link
                to="/"
                onClick={() => setConfirmLeave(true)}
                type="button"
                className="btn btn-sm rounded-none "
              >
                Yes
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex w-full justify-between flex-row items-center">
        <div className="text-4xl">Edit a Post</div>
        <div className="flex flex-row gap-2">
          <button
            onClick={() => setConfirmLeave(false)}
            type="button"
            className="flex underline px-6 py-4"
          >
            Cancel
          </button>
          <Link
            onClick={update}
            to="/"
            type="button"
            className="flex bg-neutral text-white px-6 py-4"
          >
            Update
          </Link>
        </div>
      </div>
      <div className="w-full h-full flex items-start flex-col">
        <label className="mt-8 mb-2 block font-medium">Article title</label>
        <input
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article titie here"
          className="border border-neutral focus:outline-none text-2xl bg-amber-100 tracking-wider w-full px-6 py-4 "
        />
        <label className="mt-6 mb-2 block font-medium">Article content</label>
        <div className="w-full h-2/5 bg-amber-100 outline-none">
          <div ref={quillRef} />
        </div>
      </div>
    </div>
  );
}

export default Edit;
