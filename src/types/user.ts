export interface User {
    id: number;
    full_name: string;
    email: string;
    password: string;
    token?: string; // Optional because it may not be present in all operations.
  }
