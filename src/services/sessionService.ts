const STORAGE_KEY: string = 'quickly.session';

interface User {
  CompanyId: number;
  cognito_id: string;
  company_id: number;
  createdAt: string;
  email: string;
  first_name: string;
  full_name: string;
  id: number;
  last_name: string;
  updatedAt: string;
  verified: boolean;
}

interface Session {
  token: string;
  user: User;
}

export const saveSession = (token: string, user: User): void => {
  const session: Session = { token, user };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

export const getStoredSession = (): Session | null => {
  const storedSession: string | null = localStorage.getItem(STORAGE_KEY);
  if (storedSession) {
    return JSON.parse(storedSession);
  }
  return null;
};

export const endSession = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
