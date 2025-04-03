"use client";

import { useForm } from "react-hook-form";
import { FormValues } from "./schema";

const HookPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({});

  const onSubmit = (data: FormValues) => {
    console.log("회원가입 정보:", data);
    alert("회원가입이 완료되었습니다!");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 space-y-4"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium">이메일</label>
        <input
          type="email"
          className="w-full p-2 border rounded"
          {...register("email", {
            required: { value: true, message: "이메일을 입력해주세요!" },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "이메일 형식이 올바르지 않습니다.",
            },
          })}
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">비밀번호</label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          {...register("password", {
            required: { value: true, message: "비밀번호를 입력해주세요!" },
            minLength: {
              value: 8,
              message: "비밀번호 길이를 8자리 이상 입력해주세요.",
            },
          })}
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">비밀번호 확인</label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          {...register("passwordConfirm", {
            required: {
              value: true,
              message: "비밀번호를 다시 한번 입력해주세요!",
            },
            validate: (value, formValues) =>
              value === formValues.password || "비밀번호가 일치하지 않습니다.",
          })}
        />
        {errors.passwordConfirm && (
          <div className="text-red-500 text-sm">
            {errors.passwordConfirm.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
      >
        회원가입
      </button>
    </form>
  );
};

export default HookPage;
