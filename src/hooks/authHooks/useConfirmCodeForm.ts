import useForm from "./useForm";
import { ConfirmCodeSignUpUser } from "../../types/auth";

const INITIAL_LOGIN_STATE: ConfirmCodeSignUpUser = {
  otpCode:"",
  name: "",
  username: "",
  email: "",
  password: "",
};

const useConfirmCodeForm = () => {
  return useForm<ConfirmCodeSignUpUser>(INITIAL_LOGIN_STATE); 
};

export default useConfirmCodeForm;
