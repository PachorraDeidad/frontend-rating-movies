import useForm from "./useForm";
import { Errors } from "../../types/auth";

const INITIAL_LOGIN_STATE: Errors = {
  name:"",
  email: "",
  username: "",
  password: "",
  general: "",
  otpCode:""
};

const useErrorsForm = () => {
  return useForm<Errors>(INITIAL_LOGIN_STATE); 
};

export default useErrorsForm;
