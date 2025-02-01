import api from '../utils/network';
import { ConfirmCodeSignUpUser, Errors } from '../types/auth';

export const verifyCodeAndSignUp = ({ otpCode, name, password, username, email }: ConfirmCodeSignUpUser) => {
  return fetchUser({ otpCode, name, password, username, email });
};

const fetchUser = async ({ otpCode, name, password, username, email }: ConfirmCodeSignUpUser): Promise<Errors | undefined> => {
  try {
    await api.post('/signup/verifyCodeAndSignUp', { otpCode, password, username, name, email });
    return
  } catch (error: any) {
    return error.response ? error.response.data : { general: 'Error inesperado. Intenta de nuevo.' };
  }
};