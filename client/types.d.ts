type Role = "tester" | "projectManager" | "customer";

interface TestRequestType {
  _id: string;
  name: string;
  status: string;
  url: string;
  comments: {
    name: string;
    image: string;
    message: string;
  };
  testerId?: TesterType | undefined;
  projectManagerId?: ProjectManagerType | undefined;
  clientId?: CustomerType | undefined;
  credientials?: {
    email: string;
    password: string;
  };
  createdAt?: string; // 2024-03-15T13:17:56.183Z
  updatedAt?: string; // 2024-03-15T13:17:56.183Z
  summary?: string;
}

interface BugType {
  _id: string;
  name: string;
  status: string;
  images: string[];
  feature?: string;
  stepsToReproduce?: string;
  summary?: string;
  comments: {
    name: string;
    image: string;
    message: string;
  };
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

interface CustomerType extends UserType {
  role?: "customer";
}

interface NotificationType {
  _id: string;
  title: string;
  message: string;
  senderId: string;
  receiverId: string;
  isSeen: boolean;
  createdAt?: string; // 2024-03-15T13:17:56.183Z
  updatedAt?: string; // 2024-03-15T13:17:56.183Z
}
