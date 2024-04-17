import { useState } from 'react';
import { saveSession } from './services/sessionService';
import { useNavigate } from 'react-router-dom';

interface ServerResponse {
  message: string;
  success: boolean;
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<{ value: string; isSet: boolean }>({
    value: '',
    isSet: false,
  });
  const [password, setPassword] = useState<{ value: string; isSet: boolean }>({
    value: '',
    isSet: false,
  });
  const [validForm, setValidForm] = useState<boolean>(true);

  const [responseFromServer, setResponseFromServer] = useState<ServerResponse>({
    message: '',
    success: false,
  });

  const validateEmail = (emailAdd: string) => {
    return String(emailAdd)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const ValidateEmailAddress = () => {
    return email.isSet && !validateEmail(email.value) ? (
      <p className="h-3 text-red-500 text-sm">
        Email does not have correct format
      </p>
    ) : (
      <p className="h-3"></p>
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponseFromServer({ message: '', success: false });
    setValidForm(true);

    if (!validateEmail(email.value)) {
      setValidForm(false);
      return;
    }

    const body = {
      email: email.value,
      password: password.value,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    try {
      const result = await fetch(
        'https://api-dev.quicklyinc.com/auth/login',
        requestOptions
      ).then((response) => response.json());

      if (result.success) {
        const userRequestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${result.token}`,
          },
        };

        const userResponse = await fetch(
          'https://api-dev.quicklyinc.com/auth/user',
          userRequestOptions
        ).then((response) => response.json());

        if (userResponse.success) {
          saveSession(userResponse.token, userResponse.user);
        }
        setTimeout(() => {
          navigate('/profile');
        }, 1000);
      }
      if (result.message) {
        setResponseFromServer({
          message: result.message,
          success: result.success,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className=" w-72 mx-auto my-10">
        <h1 className="text-2xl text-center text-teal-500">Login</h1>
        <div className="flex flex-col justify-center items-start gap-2">
          <input
            className="bg-gray-700 bg-opacity-0 border-b w-full mt-7"
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none',
            }}
            required
            value={email.value}
            onChange={(e) => {
              setEmail({ ...email, value: e.target.value });
            }}
            onBlur={() => {
              setEmail({ ...email, isSet: true });
            }}
            type="text"
            placeholder="e-mail address"
          />
          <ValidateEmailAddress />
          <input
            className="bg-gray-700 bg-opacity-0 border-b w-full mt-4"
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none',
            }}
            type="password"
            required
            value={password.value}
            onChange={(e) => {
              setPassword({ ...password, value: e.target.value });
            }}
            onBlur={() => {
              setPassword({ ...password, isSet: true });
            }}
            placeholder="password"
          />
        </div>
        <button className="bg-teal-500 rounded-full  mt-7 py-1 px-4">
          Login
        </button>
      </form>
      {!validForm && (
        <p className="px-2 rounded-full text-lg 0 font-bold text-center py-1 m-3 text-red-50 bg-red-400">
          You have an error in one of the fields. Please fix it and submit again
        </p>
      )}
      {responseFromServer.message && (
        <p
          className={`px-2 rounded-full text-lg 0 font-bold text-center py-1 m-3 ${
            responseFromServer.success
              ? 'text-green-50 bg-green-400 '
              : 'text-red-50 bg-red-400'
          }`}
        >
          {responseFromServer.message}
        </p>
      )}
    </>
  );
}

export default Login;
