import useForm from "./useForm";
import { SignUpUser } from "../../types/auth";

const INITIAL_LOGIN_STATE: SignUpUser = {
  name: "",
  username: "",
  email: "",
  password: "",
};

const useSingUpUserForm = () => {
  return useForm<SignUpUser>(INITIAL_LOGIN_STATE); 
};

export default useSingUpUserForm;
