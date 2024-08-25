export interface LoginFormInterface {
  email: string;
  password: string;
}

export interface SignUpFormInterface {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginAPIResponse {
  auth_token: string;
}

export interface UserInterface {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_bot: boolean;
}

export interface UserProfile {
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}
