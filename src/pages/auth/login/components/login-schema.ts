import { z } from "zod";

export const LoginFormSchema = z.object({
  userName: z
    .string({ required_error: "Please specify a name" })
    .trim()
    .min(1, {
      message: "Name is required ",
    })
    .max(255),
  password: z.string().trim().min(1, {
    message: "password is required ",
  }),
});

export type TLoginForm = z.infer<typeof LoginFormSchema>;
