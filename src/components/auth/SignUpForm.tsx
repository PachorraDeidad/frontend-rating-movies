import React, { useEffect } from "react";
import useSingUpUserForm from "../../hooks/authHooks/useSignUpForm";
import useErrorsForm from "../../hooks/authHooks/useErrorsForm";
import { Errors, SignUpUser } from "../../types/auth";
import InputField from "./InputField";

interface FormProps {
  signUpUser: (user: SignUpUser) => void;
  errors: Errors | null;
  userData: SignUpUser | null;
}

const SignUpForm = ({ signUpUser, errors, userData }: FormProps) => {
  const [formState, dispatch] = useSingUpUserForm();
  const [formErrorsState, errorsDispatch] = useErrorsForm();

  useEffect(() => {
    if (userData) {
      dispatch({
        type: "set_values",
        payload: {
          name: userData.name,
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });
    }
  }, [userData, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "change_value",
      payload: {
        inputName: e.target.name,
        inputValue: e.target.value,
      },
    });
  };

  const handleSubmit = () => {
    signUpUser(formState);
  };

  useEffect(() => {
    if (errors) {
      errorsDispatch({
        type: "set_values",
        payload: {
          ...errors,
        },
      });
    }
  }, [errors, errorsDispatch]);

  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <div className="w-full space-y-4">
        <InputField
          label="Your Name"
          inputName="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
          error={formErrorsState.name}
          icon={<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-label"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16.52 7h-10.52a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h10.52a1 1 0 0 0 .78 -.375l3.7 -4.625l-3.7 -4.625a1 1 0 0 0 -.78 -.375" /></svg>}
          placeHolder="Enter your name"
        />

        <InputField
          label="Your Username"
          inputName="username"
          type="text"
          value={formState.username}
          onChange={handleChange}
          error={formErrorsState.username}
          icon={<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>}
          placeHolder="Enter your username"
        />

        <InputField
          label="Your E-Mail"
          inputName="email"
          type="text"
          value={formState.email}
          onChange={handleChange}
          error={formErrorsState.email}
          icon={<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>}
          placeHolder="Enter your E-mail"
        />

        <InputField
          label="Password"
          inputName="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          error={formErrorsState.password}
          icon={<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-lock-password"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /><path d="M15 16h.01" /><path d="M12.01 16h.01" /><path d="M9.02 16h.01" /></svg>}
          placeHolder="Enter your password"
        />
      </div>
      <button
        className="mt-6 mb-3 bg-[#323b97] pt-2 pb-2 rounded-md text-[#F7EB2C] font-bold text-lg hover:bg-[#2a317d] duration-200"
        onClick={handleSubmit}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
