import * as z from "zod";

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { error: "Name must be at least 2 characters long." })
      .trim(),
    email: z.email({ error: "Please enter a valid email." }).trim(),
    phone: z
      .string()
      .min(10, { error: "Be at least 10 characters long" })
      .regex(/^08\d+$/, { error: "Use format 08xxxx" })
      .trim(),
    password: z
      .string()
      .min(8, { error: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
      .regex(/[0-9]/, { error: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        error: "Contain at least one special character.",
      })
      .trim(),
    passwordRepeat: z.string(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Password do not match",
    path: ["passwordRepeat"],
  });

export const LoginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z.string().trim(),
});

export const SendProfileSchema = z.object({
  nik: z
    .string()
    .length(16, { error: "Must 16 character" })
    .regex(/^\d+$/, { error: "All must digit" })
    .trim(),
  birthPlace: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .trim(),
  birthDate: z.date(),
});

export const AddProductFormSchema = z.object({
  name: z.string().min(4, { error: "Be at least 4 characters long" }).trim(),
  category: z
    .string()
    .min(4, { error: "Be at least 4 characters long" })
    .trim()
    .toLowerCase(),
  description: z
    .string()
    .min(10, { error: "Be at least 10 characters long" })
    .trim(),
  price: z.int(),
});

export const AddCartSchema = z.object({
  id: z.uuid(),
  durationDay: z.int(),
  needDeliver: z.boolean(),
});

export type AddCartData = z.infer<typeof AddCartSchema>;

export const AddAddressSchema = z.object({
  name: z.string().min(4, { error: "Be at least 4 characters long" }).trim(),
  address: z.string().min(4, { error: "Be at least 4 characters long" }).trim(),
});
