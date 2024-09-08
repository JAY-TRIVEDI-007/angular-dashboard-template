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

export interface CreateUserInterface extends SignUpFormInterface {
  is_active: boolean;
  is_bot: boolean;
}

export interface LoginAPIResponse {
  auth_token: string;
}

export interface CurrentUserInterface {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  is_bot: boolean;
}

export interface UserInterface extends CurrentUserInterface {
  last_login: string;
}

export interface UserProfile {
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface SetPassword {
  current_password: string;
  new_password: string;
}
