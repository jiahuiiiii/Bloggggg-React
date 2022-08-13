/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { signInWithPopup, getAuth } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import { auth, provider } from '../firebase-config';

function Login({ setIsAuth }) {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      const auth_ = getAuth();
      const user = auth_.currentUser;
      const { uid } = user;
      if (uid === 'ZpPDuoTyNBOUKP4RgL3lh1oOzDr2') {
        localStorage.setItem('isAuth', true);
        setIsAuth(true);
        toast.success('Log in succeeded!');
        navigate('/');
      } else {
        localStorage.setItem('isAuth', false);
        setIsAuth(false);
        toast.error("You don't have admin access");
        navigate('/');
      }
    });
  };
  return (
    <div className="w-full h-screen p-32 bg-amber-300">
      <Link
        to="/"
        className="flex z-[9999] flex-row gap-3 hover:gap-5 mb-2 transition-all items-center"
      >
        <div to="/" className="text-xl">
          Back to home
        </div>
        <Icon icon="bi:arrow-left" className="w-8 h-8" />
      </Link>
      <div className="flex w-full justify-between flex-col items-center">
        <div className="text-4xl mt-4">Login</div>
        <div className="mt-20 w-full flex-col flex items-center">
          <button
            type="button"
            className="flex flex-col items-center"
            onClick={signInWithGoogle}
          >
            <Icon className="w-20 h-20" icon="akar-icons:google-fill" />
            <div>Sign in with Google</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
