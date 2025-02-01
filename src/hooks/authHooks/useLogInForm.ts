import useForm from "./useForm";
import { LogIn } from "../../types/auth";

const INITIAL_LOGIN_STATE: LogIn = {
  emailOrUsername: "",
  password: "",
};

const useLoginUserForm = () => {
  return useForm<LogIn>(INITIAL_LOGIN_STATE);
};

export default useLoginUserForm;
