import { object, string, TypeOf } from "zod";

export const UserRoleSchema = object({
  email: string().email().min(1, "Email is Required"),
  password: string().min(3, "Min 3 Characters"),
  confirmPassword: string().min(3, "Min 3 Characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password Doesn't Match",
  path: ["confirmPassword"],
});

export type UserRoleSchemaZod = TypeOf<typeof UserRoleSchema>;
