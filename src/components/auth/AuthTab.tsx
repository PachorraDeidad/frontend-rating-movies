import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, SignUpUser, Errors, ConfirmCodeSignUpUser, PublicUser } from '../../types/auth';
import LoginForm from './LogInForm';
import SignUpForm from './SignUpForm';
import ConfirmCodeForm from './ConfirmCodeForm';
import { verifyCodeAndSignUp } from '../../services/VerifyCodeAndSignUpService';
import { validateSignUpDataService } from '../../services/ValidateSignUpDataService';
import { sendCodeService } from '../../services/SendCodeService';
import { getUser } from '../../services/LogInUser';

interface FormProps {
  closeAuthTab: (close: string) => void;
  tab: string;
}

function AuthTab({ closeAuthTab, tab }: FormProps) {
  const { login } = useAuth();
  const [userData, setUserData] = useState<SignUpUser | null>(null);
  const [errorsData, setErrorsData] = useState<Errors | null>(null);
  const [form, setForm] = useState(tab);

  const clearLoginErrors = (user: LogIn): void => {
    setErrorsData((prevErrors) => ({
      ...prevErrors,
      emailOrUsername: user.emailOrUsername ? '' : prevErrors?.emailOrUsername,
      password: user.password ? '' : prevErrors?.password,
    }));
  };

  const handleLogIn = async (user: LogIn): Promise<void> => {
    clearLoginErrors(user);
    const response = await getUser(user);

    if (response && (response as PublicUser).id) {
      login(response as PublicUser);
      console.log('Login exitoso:', response);
    } else {
      setErrorsData(response as Errors);
      console.log('Errores:', response);
    }
  };

  const clearSignUpErrors = (user: SignUpUser): void => {
    setErrorsData((prevErrors) => ({
      ...prevErrors,
      name: user.name ? '' : prevErrors?.name,
      username: user.username ? '' : prevErrors?.username,
      email: user.email ? '' : prevErrors?.email,
      password: user.password ? '' : prevErrors?.password,
    }));
  };

  const handleSignUp = async (user: SignUpUser): Promise<void> => {
    clearSignUpErrors(user);
    const response = await validateSignUpDataService(user);
    if (response === undefined) {
      setUserData(user);
      setForm('verifyCode');
      await sendCodeService(user);
    } else {
      setErrorsData(response);
    }
  };

  const handleConfirmCode = async (user: ConfirmCodeSignUpUser): Promise<void> => {
    const response = await verifyCodeAndSignUp(user);
    if (response === undefined) {
      const logIn: LogIn = {
        emailOrUsername: user.email,
        password: user.password,
      };
      const logInResponse = await getUser(logIn);
      if (logInResponse && (logInResponse as PublicUser).id) {
        login(logInResponse as PublicUser);
        console.log('Login exitoso:', logInResponse);
      } else {
        setErrorsData(logInResponse as Errors);
        console.log('Errores:', logInResponse);
      }
    } else {
      setErrorsData(response);
    }
  };

  const reSendCode = async (user: SignUpUser | null): Promise<void> => {
    if (user) {
      await sendCodeService(user);
    }
  };

  const handleBack = (): void => {
    setForm('register');
  };

  const indicatorPosition = form === 'login' ? 'left-[13%]' : 'left-[calc(86%-110px)]';

  const authContent = (
    <div className="w-[440px] max-w-[32rem] p-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#171C1E] rounded-s flex flex-col gap-7">
      <div className="flex items-center justify-between text-center">
        <img src="/img/pngwing.com.png" alt="Logo" width={100} height={30} />
        <button
          className="w-10 h-10 flex items-center justify-center hover:bg-zinc-700 duration-300 rounded-md"
          onClick={() => closeAuthTab('close')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white icon icon-tabler icons-tabler-outline icon-tabler-x"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>
      {form !== 'verifyCode' && (
        <div className="flex justify-center gap-[33%] text-center text-white relative">
          <div
            className={`cursor-pointer ${form === 'login' ? 'font-medium' : 'opacity-75'}`}
            onClick={() => {
              setForm('login');
              setErrorsData(null);
            }}
          >
            Log In
          </div>
          <div
            className={`cursor-pointer ${form === 'register' ? 'font-medium' : 'opacity-75'}`}
            onClick={() => {
              setForm('register');
              setErrorsData(null);
            }}
          >
            Sign Up
          </div>
          <span className="absolute w-full h-0.5 bg-slate-500 -bottom-3" />
          <span className={`absolute w-28 h-0.5 bg-white -bottom-3 transition-all ${indicatorPosition}`} />
        </div>
      )}
      <div>
        {form === 'login' ? (
          <LoginForm logInUser={handleLogIn} errors={errorsData} />
        ) : form === 'register' ? (
          <SignUpForm signUpUser={handleSignUp} errors={errorsData} userData={userData} />
        ) : form === 'verifyCode' ? (
          <ConfirmCodeForm
            errors={errorsData}
            confirmCodeUser={handleConfirmCode}
            userData={userData}
            reSendCode={reSendCode}
            back={handleBack}
          />
        ) : null}
      </div>
    </div>
  );

  const portalContainer = document.getElementById('portal') || document.body;

  return createPortal(authContent, portalContainer);
}

export default AuthTab;
