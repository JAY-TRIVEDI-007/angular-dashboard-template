export interface LoginFormInterface {
  email: string;
  password: string;
}

export interface SignUpFormInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginAPIResponse {
  auth_token: string;
}

export interface UserInterface {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
}
