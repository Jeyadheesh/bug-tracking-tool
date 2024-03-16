import { createWithEqualityFn } from "zustand/traditional";

interface useUserType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const useUser = createWithEqualityFn<useUserType>()((set) => ({
  user: null,
  setUser: (user: UserType | null) => set({ user }),
}));

export default useUser;
