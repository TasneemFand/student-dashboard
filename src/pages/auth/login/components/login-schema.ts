import { z } from "zod";

export const LoginFormSchema = z.object({
  userName: z
    .string({ required_error: "Please specify a name" })
    .trim()
    .min(1, {
      message: "Name is required ",
    })
    .max(255),
  password:  z.string()
  .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
  .max(100, { message: "Password must be less than 100 characters" }) // Maximum length
});

export type TLoginForm = z.infer<typeof LoginFormSchema>;
