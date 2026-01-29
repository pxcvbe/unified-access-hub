import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "peternak" | "agent" | "mitra";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<UserRole, User> = {
  peternak: {
    id: "1",
    name: "Budi Santoso",
    email: "budi@peternak.com",
    role: "peternak",
  },
  agent: {
    id: "2",
    name: "Ahmad Wijaya",
    email: "ahmad@agent.com",
    role: "agent",
  },
  mitra: {
    id: "3",
    name: "PT Pakan Sejahtera",
    email: "admin@mitrapakan.com",
    role: "mitra",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("agrihub_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string, role: UserRole) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const mockUser = mockUsers[role];
    setUser(mockUser);
    localStorage.setItem("agrihub_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("agrihub_user");
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Return default values if not in provider (for initial render)
    return {
      user: null,
      login: async () => {},
      logout: () => {},
      isAuthenticated: false,
    };
  }
  return context;
}

export { AuthContext };
