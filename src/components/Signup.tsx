import { useState } from 'react';
import { saveSession } from '../services/sessionService';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState({
    value: '',
    isSet: false,
  });
  const [confirmEmail, setConfirmEmail] = useState<{
    value: string;
    isSet: boolean;
  }>({
    value: '',
    isSet: false,
  });
  const [password, setPassword] = useState<{ value: string; isSet: boolean }>({
    value: '',
    isSet: false,
  });
  const [confirmPassword, setConfirmPassword] = useState<{
    value: string;
    isSet: boolean;
  }>({
    value: '',
    isSet: false,
  });
  const [validForm, setValidForm] = useState<boolean>(true);
  const [website, setWebsite] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [responseFromServer, setResponseFromServer] = useState<string>('');

  const validateEmail = (emailAdd: string) => {
    return String(emailAdd)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidForm(true);

    if (
      !validateEmail(email.value) ||
      !validateEmail(confirmEmail.value) ||
      confirmEmail.value !== email.value ||
      password.value.length < 6 ||
      confirmPassword.value !== password.value
    ) {
      setValidForm(false);
      return;
    }
    const body = {
      user: {
        first_name: firstName,
        last_name: lastName,
        email: email.value,
        password: password.value,
      },
      company: {
        activity: {
          early_pay_intent: true,
          expected_activity: 'Get my invoices paid early',
        },
        early_pay_intent: true,
        industry: { value: 'Apps', label: 'Apps' },
        business_type: {
          label: 'Digital products',
          value: 'Digital products',
        },
        website: website,
        business_registration: 'corporation',
        phone: phone,
        business_number: phone,
        has_trade_name: false,
        legal_name: firstName + lastName,
        expected_activity: 'Get my invoices paid early',
      },
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
        'https://api-dev.quicklyinc.com/auth/signup',
        requestOptions
      ).then((response) => response.json());
      console.log(result);
      // const result = {
      //   message: 'Signup Succesful!',
      //   success: true,
      //   token:
      //     'eyJraWQiOiJrclhKajg5WTE0bWNxalRsNkRjR0hlMURoWTlvXC90QlgrOU8yTGp4NGwzMD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiODRmZjM5NS1lYTlhLTRlNWYtYmRlOS04OGUwNjc1ZTA4ZDMiLCJjb2duaXRvOmdyb3VwcyI6WyJvd25lciJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2xDTWowTnJKeSIsImNvZ25pdG86dXNlcm5hbWUiOiJiODRmZjM5NS1lYTlhLTRlNWYtYmRlOS04OGUwNjc1ZTA4ZDMiLCJvcmlnaW5fanRpIjoiNmExNzlkODgtZmRjNi00MDA1LWFkY2UtZjBiYjI4MGMxYzJhIiwiYXVkIjoiMm45aHB0MDkxOHZmdmFsMTFsZnFwajdubTEiLCJldmVudF9pZCI6ImVjYTE2OTg4LTc0ZGMtNDUwZi04OTZjLTY5M2EzZmI1MTNmYSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzEzMzAxODkyLCJuYW1lIjoiam9obiBzbWl0aCIsImV4cCI6MTcxMzMxOTg5MiwiaWF0IjoxNzEzMzAxODkyLCJqdGkiOiIzODBiNDE4Yy0zOGIwLTQ0YjAtYjZjNC04YWE2NTg2YTk2NzkiLCJlbWFpbCI6InNtaXRAZy5jb20ifQ.cwDmst-imAGD0L22fPlnL06wjtIy3xgDosNOMpJN--Qk-gxi5KxV25vTBDugfB9iC1FiY_TVJs0ecr4rLikcw3KBBbJf7Pb_ZkVJkAgQ1aKpDBPjgNWzWZa4yrKn-mY52RwmLq6Rq-GaTfhSnmOcgqzMN0qeAtR0inKMFLnJe2tptlCC3CnIDnENu689X8rzbxgAAFMXv93IOPoObD0mNJqw0-Xbam9Is_eRU3fypuZJS0eyxozucQ2eZWxO-uQR4-6H8BPl01eE4nkhbWxoddsQI8oLQBCPYuAv1yIRut0ZHRDolzTo-S-7sq2R19oyDrOcKwXfjbGtQwZ0KJv48A',
      //   user: {
      //     CompanyId: 483,
      //     cognito_id: 'b84ff395-ea9a-4e5f-bde9-88e0675e08d3',
      //     company_id: 483,
      //     createdAt: '2024-04-16T21:11:32.478Z',
      //     email: 'smit@g.com',
      //     first_name: 'john',
      //     full_name: 'john smith',
      //     id: 495,
      //     last_name: 'smith',
      //     updatedAt: '2024-04-16T21:11:32.478Z',
      //     verified: false,
      //   },
      // };
      if (result.success) {
        saveSession(result.token, result.user);
      }
      if (result.message) {
        setResponseFromServer(result.message);
      }
    } catch (error) {
      console.log(error);
    }

    clearForm();
    setTimeout(() => {
      navigate('/profile');
    }, 1000);
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail({
      value: '',
      isSet: false,
    });
    setConfirmEmail({
      value: '',
      isSet: false,
    });
    setPassword({
      value: '',
      isSet: false,
    });
    setConfirmPassword({
      value: '',
      isSet: false,
    });
    setWebsite('');
    setPhone('');
  };
  const PasswordErrorMessage = () => {
    return password.isSet && password.value.length < 6 ? (
      <p className="h-3 text-red-500 text-sm">
        Password should have at least 6 characters
      </p>
    ) : (
      <p className="h-3"></p>
    );
  };
  const ConfirmPasswordErrorMessage = () => {
    return confirmPassword.isSet && confirmPassword.value !== password.value ? (
      <p className="h-3 text-red-500 text-sm">Does not match the password</p>
    ) : (
      <p className="h-3"></p>
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

  const ValidateConfirmEmailAddress = () => {
    return confirmEmail.isSet && email.value !== confirmEmail.value ? (
      <p className="h-3 text-red-500 text-sm">Does not match the email</p>
    ) : (
      <p className="h-3"></p>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className=" w-72 mx-auto my-10">
        <h1 className="text-2xl text-center text-teal-500">Sign up</h1>

        <input
          className="bg-gray-700 bg-opacity-0 border-b w-full mt-7"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
          }}
          required
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
          placeholder="first name"
        />
        <input
          className="bg-gray-700 bg-opacity-0 border-b w-full mt-7"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
          }}
          required
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          type="text"
          placeholder="last name"
        />
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
          required
          value={confirmEmail.value}
          onChange={(e) => {
            setConfirmEmail({ ...confirmEmail, value: e.target.value });
          }}
          onBlur={() => {
            setConfirmEmail({ ...confirmEmail, isSet: true });
          }}
          type="text"
          placeholder="confirm e-mail address"
        />
        <ValidateConfirmEmailAddress />
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
        <PasswordErrorMessage />
        <input
          className="bg-gray-700 bg-opacity-0 border-b w-full mt-4"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
          }}
          type="password"
          required
          value={confirmPassword.value}
          onChange={(e) => {
            setConfirmPassword({ ...confirmPassword, value: e.target.value });
          }}
          onBlur={() => {
            setConfirmPassword({ ...confirmPassword, isSet: true });
          }}
          placeholder="confirm password"
        />
        <ConfirmPasswordErrorMessage />

        <input
          className="bg-gray-700 bg-opacity-0 border-b w-full mt-4"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
          }}
          required
          value={website}
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
          type="text"
          placeholder="website"
        />
        <input
          className="bg-gray-700 bg-opacity-0 border-b w-full mt-7"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
          }}
          required
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="text"
          placeholder="phone number"
        />
        <button className="bg-teal-500 rounded-full text-white mt-7 py-1 px-4">
          Sign up
        </button>
      </form>
      {!validForm && (
        <p className="bg-red-200 px-2 rounded-full text-xs text-red-500 font-bold text-center py-1 m-3">
          You have an error in one of the fields. Please fix it and submit again
        </p>
      )}
      {responseFromServer && (
        <p className="bg-green-200 px-2 rounded-full text-lg text-green-500 font-bold text-center py-1 m-3">
          {responseFromServer}
        </p>
      )}
    </>
  );
}

export default Signup;
