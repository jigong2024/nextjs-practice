import { z } from "zod";

export const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "이메일을 입력해주세요." })
      .email({ message: "이메일 형식이 올바르지 않습니다." }),

    password: z
      .string()
      .min(1, { message: "비밀번호를 입력해주세요." })
      .min(8, { message: "비밀번호를 8자리 이상 입력해주세요." }),

    passwordConfirm: z
      .string()
      .min(1, { message: "비밀번호를 다시 한번 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"], // 오류가 표시될 필드
  });

export type FormValues = z.infer<typeof formSchema>;
