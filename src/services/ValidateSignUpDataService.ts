import api from '../utils/network';
import { Errors, SignUpUser } from '../types/auth';

export const validateSignUpDataService = ({ name, password, username, email }: SignUpUser) => {
  return fetchUser({ name, password, username, email });
};

const fetchUser = async ({ name, password, username, email }: SignUpUser): Promise<Errors | undefined> => {
  try {
    await api.post('/signup/verifySignUpData', { password, username, name, email });
    
  } catch (error: any) {
    return error.response ? error.response.data : { general: 'Error inesperado. Intenta de nuevo.' };
  }
};


