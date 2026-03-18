"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Lock,
  Link,
  ArrowRight,
  BringToFront,
  Eye,
  EyeOff,
} from "lucide-react";
import NextLink from "next/link";
import axios from "axios";
import React, { useState, FormEvent } from "react";
import { auth_service, useAppData } from "@/context/AppContext";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import cookies from "js-cookie";
import path from "path";
import Loading from "@/components/loading";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnloading] = useState(false);

  const { isAuth, setUser, loading, setIsAuth, fetchApplications } =
    useAppData();

  if (loading) return <Loading />;
  if (isAuth) return redirect("/");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBtnloading(true);

    try {
      const { data } = await axios.post(`${auth_service}/api/auth/login`, {
        email,
        password,
      });

      toast.success(data.message);

      cookies.set("token", data.token, {
        expires: 15,
        secure: true,
        path: "/",
      });
      setUser(data.userObject);
      setIsAuth(true);
      fetchApplications();
    } catch (error: any) {
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
      setIsAuth(false);
    } finally {
      setBtnloading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-secondary font-medium ">
      <div className="w-full  max-w-md">
        <div className="text-center mb-8 ">
          <h1 className="text-4xl font-bold mb-5">
            Welcome back to{" "}
            <span className="text-blue-500">
              Dev<span className="text-red-500">Togather</span>
            </span>
          </h1>
          <p className="text-lg opacity-70">Sign in to continue </p>
        </div>
        <div className="border border-gray-400 rounded-2xl p-8 shadow-lg backdrop-blur-sm bg-white ">
          <form onSubmit={submitHandler} className="space-y-5 ">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-md font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="icon-style" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>
            <div className="space-y-2 ">
              <Label htmlFor="password" className="text-md  font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="icon-style" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder=" *******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <NextLink
                href="/forgot.tsx"
                className="text-md text-blue-500 hover:underline transition-all"
              >
                Forgot Password?
              </NextLink>
            </div>

            <Button disabled={btnLoading} className="w-full mb-3 text-md">
              {btnLoading ? "signing in..." : "sign in"}
              <ArrowRight size={18} />
            </Button>
          </form>
          {/* route to register page */}
          <div className="mt-6 p-t-6 border-t border-gray-400 mb-3 ">
            <p className="text-center text-md mt-5">
              Don't have an account?
              <NextLink
                href="/register"
                className="text-blue-500 font-medium hover:underline transition-all"
              >
                {" "}
                Sign Up
              </NextLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
