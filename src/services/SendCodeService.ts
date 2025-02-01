import api from '../utils/network';
import { SignUpUser, Errors } from '../types/auth';

export const sendCodeService = ({ name, password, username, email }: SignUpUser) => {
  return fetchSendCode({ name, password, username, email });
};

const fetchSendCode = async ({ username, email }: SignUpUser): Promise<Errors | undefined> => {
  try {
    await api.post('/signup/sendVerificationCode', { email, username });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { general: error.response?.data || 'Error inesperado. Intenta de nuevo.' };
  }
};
