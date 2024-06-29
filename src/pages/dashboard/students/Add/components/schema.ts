import { z } from "zod";

export const FormSchema = z.object({
  firstName: z
    .string({ required_error: "Please specify a name" })
    .trim()
    .min(1, {
      message: "first Name is required ",
    })
    .max(255),
  lastName: z
    .string({ required_error: "Please specify a name" })
    .trim()
    .min(1, {
      message: "first Name is required ",
    })
    .max(255),
  birthDate: z.string().min(1, {
    message: "birth date is required ",
  }),
  grade: z
    .string({ required_error: "Please specify a name" })
    .trim()
    .min(1, {
      message: "Grade is required ",
    })
    .max(255),
  gender: z
    .string({ required_error: "Please specify a name" })
    .trim()
    .min(1, {
      message: "gender is required ",
    })
    .max(255),
  country: z.string().min(1, {
    message: "country is required ",
  }),
  city: z.string().min(1, {
    message: "city is required ",
  }),
  phone: z.string().min(1, {
    message: "phone is required ",
  }),
  remarks: z.string().optional(),
});

export type TNewForm = z.infer<typeof FormSchema>;
