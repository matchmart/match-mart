import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import type { LoginPayload } from "@/types/auth";

const msg = (e: unknown, f: string) =>
  axios.isAxiosError<{ message?: string }>(e)
    ? e.response?.data?.message || e.message || f
    : e instanceof Error
      ? e.message
      : f;

const LoginPage = () => {
  const { login } = useAuth();
  const nav = useNavigate();
  const [sub, setSub] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const onSubmit = async (d: LoginPayload) => {
    setSub(true);
    try {
      await login(d);
      toast.success("Welcome back");
      nav("/profile");
    } catch (e) {
      const errorData = axios.isAxiosError(e) ? e.response?.data : e instanceof Error ? e.message : e;
      console.log(errorData);
      toast.error(msg(e, "Login failed"));
    } finally {
      setSub(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-secondary">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <input type="email" placeholder="Email" className="w-full rounded-lg border px-4 py-3" {...register("email", { required: "Email required" })} />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        <input type="password" placeholder="Password" className="w-full rounded-lg border px-4 py-3" {...register("password", { required: "Password required" })} />
        <button disabled={sub} className="w-full rounded-lg bg-primary py-3 font-semibold text-white">
          {sub ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-4 text-sm text-secondary/60">
        No account? <Link className="text-primary" to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
