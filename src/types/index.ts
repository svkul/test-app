// User
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  photo: string;
}

export interface UsersResponse {
  success: boolean;
  page: number;
  count: number;
  total_pages: number;
  total_users: number;
  users: User[];
}

export interface UsersParams {
  count: number;
}

export interface UserParams {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: File;
  token: string;
}

export interface UserResponse {
  success: boolean;
  user_id: number;
  message: string;
  fails?: Record<string, string[]>;
}

// Position
export interface Position {
  id: number;
  name: string;
}

export interface PositionsResponse {
  success: boolean;
  positions: Position[];
}

// Token
export interface TokenResponse {
  success: boolean;
  token: string;
}
