import { Link } from 'react-router-dom';
import { getStoredSession, endSession } from './services/sessionService';
import { useEffect, useState } from 'react';

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface Session {
  user: User | null;
}
function Profile() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const storedSession = getStoredSession();
    setSession(storedSession);
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const clearSession = () => {
    endSession();
    setSession({ user: null });
  };

  if (!session || !session.user) {
    return (
      <div className="text-center">
        <h1 className="text-9xl font-bold">401</h1>
        <p>You need to sign in before you can access this page</p>
        <Link
          className="bg-teal-500 rounded-full text-white py-1 px-4"
          to="/login"
        >
          Login
        </Link>
        <Link
          className="bg-teal-500 rounded-full text-white py-1 px-4 ml-2"
          to="/signup"
        >
          Sign up
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full h-screen md:p-20 p-2 rounded bg-gray-100">
      <div className="w-full p-5 rounded drop-shadow-xl  bg-gray-100">
        <h1 className="text-2xl font-bold text-teal-400">Basic Information</h1>
        <div className="grid grid-cols-2 gap-5 p-5">
          <div className=" flex flex-col justify-center items-start gap-2">
            <label>First Name</label>
            <input
              className="bg-teal-500 rounded-lg p-2 bg-opacity-20  border-b w-full"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
              }}
              value={session.user.first_name}
              readOnly
            />
          </div>
          <div className=" flex flex-col justify-center items-start gap-2">
            <label>Last Name</label>
            <input
              className="bg-teal-500 rounded-lg p-2 bg-opacity-20  border-b w-full"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
              }}
              value={session.user.last_name}
              readOnly
            />
          </div>
          <div className=" flex flex-col justify-center items-start gap-2">
            <label>Email</label>
            <input
              className="bg-teal-500 rounded-lg p-2 bg-opacity-20  border-b w-full"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
              }}
              value={session.user.email}
              type="text"
              readOnly
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-teal-500 rounded-full  mt-7  py-1 px-4"
              onClick={clearSession}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
