import { create } from "zustand";

type AuthState = {
  signupEmail: string;
  setSignupEmail: (email: string) => void;
  clearSignupEmail: () => void;
  // nanti bisa ditambah state lain: user, role, dll
};

export const useAuthStore = create<AuthState>((set) => ({
  signupEmail: "",
  setSignupEmail: (email) => set({ signupEmail: email }),
  clearSignupEmail: () => set({ signupEmail: "" }),
}));
