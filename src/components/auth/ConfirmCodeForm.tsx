import { useCallback, useEffect, useRef, useState } from "react";
import useConfirmCodeForm from "../../hooks/authHooks/useConfirmCodeForm";
import { ConfirmCodeSignUpUser, Errors, SignUpUser } from "../../types/auth";
import useErrorsForm from "../../hooks/authHooks/useErrorsForm";

interface FormProps {
  confirmCodeUser: (user: ConfirmCodeSignUpUser) => void;
  reSendCode: (user: SignUpUser | null) => void;
  back: () => void;
  errors: Errors | null;
  userData: SignUpUser | null;
}

const ConfirmCodeForm = ({ confirmCodeUser, userData, back, reSendCode, errors }: FormProps) => {
  const [formState, dispatch] = useConfirmCodeForm();
  const [formErrorsState, errorsDispatch] = useErrorsForm();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (userData) {
      dispatch({
        type: "set_values",
        payload: {
          ...userData,
          otpCode: "",
        },
      });
    }
  }, [userData, dispatch]);

  const handleChange = (index: number, value: string) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;

      dispatch({
        type: "change_value",
        payload: {
          inputName: "otpCode",
          inputValue: newCode.join(""),
        },
      });

      return newCode;
    });

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (code.join("").length < 6) {
      setIsSubmitted(false);
      errorsDispatch({
        type: "set_values",
        payload: {
          otpCode: "",
        },
      });
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (code.join("").length < 6) {
      setIsSubmitted(false);
      errorsDispatch({
        type: "set_values",
        payload: {
          otpCode: "",
        },
      });
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newCode = [...code];

    pastedData.forEach((char, i) => {
      if (i < 6) newCode[i] = char;
    });

    setCode(newCode);
    dispatch({
      type: "change_value",
      payload: {
        inputName: "otpCode",
        inputValue: newCode.join(""),
      },
    });

    const nextEmptyIndex = newCode.findIndex((char) => char === "");
    if (nextEmptyIndex !== -1) {
      inputsRef.current[nextEmptyIndex]?.focus();
    }

    if (newCode.join("").length < 6) {
      setIsSubmitted(false);
      errorsDispatch({
        type: "set_values",
        payload: {
          otpCode: "", 
        },
      });
    }
  };

  const handleSubmit = useCallback(() => {
    if (code.join("").length === 6 && !isSubmitted) {
      confirmCodeUser(formState);
      setIsSubmitted(true);
    }
  }, [confirmCodeUser, formState, isSubmitted, code]);

  useEffect(() => {
    if (code.join("").length === 6 && !isSubmitted) {
      handleSubmit();
    }
  }, [code, handleSubmit, isSubmitted]);

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

  const handleResendCode = () => {
    reSendCode(userData);
    setIsSubmitted(false); // Permitir reenviar después de solicitar un nuevo código
  };

  return (
    <div className="flex h-full flex-col gap-6 items-center">
      <div className="text-neutral-50 text-center">
        <div className="relative">
          <svg
            onClick={back}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute top-1/2 -translate-y-1/2 left-24 hover:text-zinc-50 text-zinc-300 duration-300 rounded-sm cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-caret-left size-8"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 6l-6 6l6 6v-12" />
          </svg>
          <h1 className="font-extrabold text-xl">Verify E-Mail</h1>
        </div>
        <h2 className="text-neutral-200">Please, enter the 6-digit security code.</h2>
        <h2 className="text-neutral-200">We just sent to your e-mail, {formState.email}.</h2>
      </div>
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <div className="flex gap-2 justify-center">
            {code.map((digit, index) => (
              <input
                className="w-10 h-10 text-center border border-gray-700 bg-[#1C2124] rounded-md text-xl text-neutral-200"
                key={index}
                ref={(el) => (inputsRef.current[index] = el!)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
              />
            ))}
          </div>
          <p className="text-red-500 text-xs group-first:mt-0.5 mb-0.5 h-[3px]">{formErrorsState.otpCode}</p>
        </div>
        <button
          onClick={handleResendCode}
          className="mt-6 mb-3 bg-[#323b97] pt-2 pb-2 rounded-md text-[#F7EB2C] font-bold text-lg hover:bg-[#2a317d] duration-200"
        >
          Resend Code
        </button>
      </form>
    </div>
  );
};

export default ConfirmCodeForm;
