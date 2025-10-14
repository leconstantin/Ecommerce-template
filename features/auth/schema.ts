import z from "zod";

export const signInFormSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
export type TsignFormSchema = z.infer<typeof signInFormSchema>;

export const signUpFormSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
export type TsignUpFormSchema = z.infer<typeof signUpFormSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email().min(1, "Email is required"),
});
export type TforgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  pin: z.string().min(8, {
    message: "Your code must be 8 characters.",
  }),
  new_password: z.string().min(1, "Password is required"),
  confirm_password: z.string().min(1, "Password is required"),
});
export type TresetPasswordSchema = z.infer<typeof resetPasswordSchema>;

// verify email have pin only
export const verifyEmailSchema = z.object({
  pin: z.string().min(8, {
    message: "Your code must be 8 characters.",
  }),
});
export type TverifyEmailSchema = z.infer<typeof verifyEmailSchema>;
