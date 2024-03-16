import { createWithEqualityFn } from "zustand/traditional";

interface useUserType {
  user: UserType | null;
  setUser: (user: UserType) => void;
}

const useUser = createWithEqualityFn<useUserType>()((set) => ({
  user: null,
  setUser: (user: UserType) => set({ user }),
}));

export default useUser;
