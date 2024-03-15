type Role = "tester" | "projectManager" | "customer";

interface TestRequestType {
  _id: string;
  name: string;
  status: string;
  url: string;
  comments: string;
  testerId?: TesterType | undefined;
  projectManagerId?: ProjectManagerType | undefined;
  credientials?: {
    email: string;
    password: string;
  };
  createdAt?: string; // 2024-03-15T13:17:56.183Z
  updatedAt?: string; // 2024-03-15T13:17:56.183Z
}

interface BugType {
  _id: string;
  name: string;
  status: string;
  image: string;
  comments: string;
  priority: string;
  testRequestId?: TestRequestType | undefined;
  createdAt?: string; // 2024-03-15T13:17:56.183Z
  updatedAt?: string; // 2024-03-15T13:17:56.183Z
}

interface UserType {
  _id: string;
  email: string;
  img?: string;
  isVerified?: boolean;
  name?: string;
  role: Role;
  createdAt?: string; // 2024-03-15T13:17:56.183Z
}

interface TesterType extends UserType {
  role?: "tester";
}

interface ProjectManagerType extends UserType {
  role?: "projectManager";
}
