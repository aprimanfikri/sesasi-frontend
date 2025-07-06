import axios from 'axios';
import {
  AccountFormValues,
  LoginFormValues,
  PasswordFormValues,
  RegisterFormValues,
} from '@/lib/validation/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginRequest = async (credentials: LoginFormValues) => {
  const res = await axios.post(`${API_URL}/auth/login`, credentials);

  return res.data;
};

export const registerRequest = async (credentials: RegisterFormValues) => {
  const res = await axios.post(`${API_URL}/auth/register`, credentials);

  return res.data;
};

export const getProfileRequest = async (token: string) => {
  const res = await axios.get(`${API_URL}/auth`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateAccountRequest = async (
  session: Session,
  values: AccountFormValues
) => {
  const res = await axios.patch(`${API_URL}/auth`, values, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.data;
};

export const updatePasswordRequest = async (
  session: Session,
  values: PasswordFormValues
) => {
  const res = await axios.patch(`${API_URL}/auth/password`, values, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return res.data;
};
