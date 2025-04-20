export interface User {
  id: number;
  username: string;
  email: string;
  enabled: boolean;
  roles: Role[];
  // Other potential fields
  createdAt?: string;
  updatedAt?: string;
}

export interface Role {
  id: number;
  name: string;
  description?: string;
}

export interface LoginUserDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
  roles: number[] | string[]; // Role IDs or role names
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  roles?: number[] | string[]; // Role IDs or role names
}

export interface ResetPasswordDto {
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface MessageResponse {
  message: string;
  status?: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
  status: number;
  timestamp: string;
}
