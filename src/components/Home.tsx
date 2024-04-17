import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import { getStoredSession } from '../services/sessionService';

function Home() {
  const location = useLocation();
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const session = getStoredSession();

  useEffect(() => {
    if (location.pathname === '/signup') {
      setIsSignup(true);
      setIsLogin(false);
    } else if (location.pathname === '/login') {
      setIsLogin(true);
      setIsSignup(false);
    }
  }, [location]);

  if (session && session.user) {
    return <Navigate to="/profile" />;
  }

  return (
    <div
      className={`w-full h-screen md:p-20 rounded bg-gray-100 ${
        location.pathname === '/profile'
          ? ' grid'
          : ' md:grid md:grid-cols-2 flex flex-col'
      }`}
    >
      {location.pathname !== '/profile' && (
        <div className="bg-teal-500 rounded-l-lg flex items-center shadow-xl">
          <p
            data-testid="welcome"
            className="text-center w-full text-white font-light text-3xl p-10"
          >
            Welcome!
          </p>
        </div>
      )}
      <div
        className={`${
          location.pathname === '/profile'
            ? 'rounded '
            : location.pathname === '/'
            ? 'rounded-r-lg shadow-xl flex flex-col'
            : 'rounded-r-lg shadow-xl'
        }`}
      >
        {location.pathname !== '/profile' && (
          <div className="flex justify-end m-5 text-white text-sm">
            <Link
              className={`bg-teal-500 rounded-l-full w-16 text-center ${
                isLogin || location.pathname === '/'
                  ? 'bg-opacity-100'
                  : 'bg-opacity-50'
              }`}
              to="/login"
              style={{ padding: 5 }}
            >
              Log in
            </Link>
            <Link
              className={`bg-teal-500 rounded-r-full w-16 text-center ${
                isSignup || location.pathname === '/'
                  ? 'bg-opacity-100'
                  : 'bg-opacity-50'
              }`}
              to="/signup"
              style={{ padding: 5 }}
            >
              Sign up
            </Link>
          </div>
        )}
        {
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        }

        {location.pathname === '/' && (
          <div className="flex grow items-center">
            <p className="text-center w-full text-teal-500 font-light text-3xl md:-mt-20">
              Please sign up or log in!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
