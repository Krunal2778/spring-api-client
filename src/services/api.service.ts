import axios, { AxiosError, AxiosInstance } from 'axios';
import { 
  LoginUserDto, 
  LoginResponse, 
  User, 
  Role, 
  RegisterUserDto, 
  UpdateUserDto, 
  ResetPasswordDto, 
  ChangePasswordDto, 
  MessageResponse 
} from '../types/api.types';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API services
export const authService = {
  // Login user
  login: async (credentials: LoginUserDto): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    // Store token and user in localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  // Logout user
  logout: async (): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/logout');
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response.data;
  },

  // Forget password
  forgetPassword: async (email: string): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/forget-password', { email });
    return response.data;
  },
};

// User API services
export const userService = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (userData: RegisterUserDto): Promise<User> => {
    const response = await apiClient.post<User>('/users/create-user', userData);
    return response.data;
  },

  // Update user
  updateUser: async (id: number, userData: UpdateUserDto): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: number): Promise<MessageResponse> => {
    const response = await apiClient.delete<MessageResponse>(`/users/${id}`);
    return response.data;
  },

  // Get authenticated user
  getAuthenticatedUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  },

  // Get all roles
  getAllRoles: async (): Promise<Role[]> => {
    const response = await apiClient.get<Role[]>('/users/roles');
    return response.data;
  },
  
  // Toggle user enabled status
  toggleEnabled: async (id: number): Promise<MessageResponse> => {
    const response = await apiClient.put<MessageResponse>(`/users/toggle-enabled/${id}`);
    return response.data;
  },
  
  // Unlock user account
  unlockAccount: async (id: number): Promise<MessageResponse> => {
    const response = await apiClient.put<MessageResponse>(`/users/unlock-account/${id}`);
    return response.data;
  },
};

// Account management API services
export const accountService = {
  // Unlock user account
  unlockAccount: async (id: number): Promise<MessageResponse> => {
    const response = await apiClient.put<MessageResponse>(`/users/unlock-account/${id}`);
    return response.data;
  },

  // Toggle user enabled status
  toggleEnabled: async (id: number): Promise<MessageResponse> => {
    const response = await apiClient.put<MessageResponse>(`/users/toggle-enabled/${id}`);
    return response.data;
  },

  // Reset user password
  resetPassword: async (id: number, passwordData: ResetPasswordDto): Promise<MessageResponse> => {
    const response = await apiClient.put<MessageResponse>(`/users/reset-password/${id}`, passwordData);
    return response.data;
  },

  // Change user password
  changePassword: async (passwordData: ChangePasswordDto): Promise<MessageResponse> => {
    const response = await apiClient.put<MessageResponse>('/users/change-password', passwordData);
    return response.data;
  },
};

export default apiClient;
