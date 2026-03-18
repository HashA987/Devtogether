"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Lock,
  Link,
  ArrowRight,
  BringToFront,
  Eye,
  EyeOff,
  Briefcase,
  Phone,
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

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnloading] = useState(false);

  const { isAuth, setUser, loading, setIsAuth } = useAppData();

  if (loading) return <Loading />;
  if (isAuth) return redirect("/");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBtnloading(true);

    const formData = new FormData();

    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    if (resume) {
      formData.append("file", resume);
    }

    try {
      const { data } = await axios.post(
        `${auth_service}/api/auth/register`,
        formData,
      );

      toast.success(data.message);

      cookies.set("token", data.token, {
        expires: 15,
        secure: true,
        path: "/",
      });
      setUser(data.registeredUser);
      setIsAuth(true);
    } catch (error: any) {
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
            Join
            <span className="text-blue-500">
              Dev<span className="text-red-500">Togather</span>
            </span>
          </h1>
          <p className="text-lg opacity-70">Create new account </p>
        </div>
        <div className="border border-gray-400 rounded-2xl p-8 shadow-lg backdrop-blur-sm bg-white ">
          <form onSubmit={submitHandler} className="space-y-5 ">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-md font-medium">
                I want to
              </Label>
              <div className="relative">
                <Briefcase className="icon-style" />
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 border-2 border-gray-300 rounded-md bg-transparent"
                  required
                >
                  <option value="">Select your role</option>
                  <option value="jobseeker">Find a job</option>
                  <option value="recruiter">Hire </option>
                </select>
              </div>
            </div>

            {role && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-md font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="icon-style" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>{" "}
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
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-md font-medium">
                    Phone
                  </Label>
                  <div className="relative">
                    <Phone className="icon-style" />
                    <Input
                      id="phone"
                      type="number"
                      placeholder="+49123456789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>
                {role === "jobseeker" && (
                  <div className="space-y-5 pt-4 border-t border-gray-400">
                    <div className="space-y-2">
                      <Label htmlFor="resume" className="text-md font-medium">
                        Resume (PDF)
                      </Label>
                      <div className="relative">
                        <Mail className="icon-style" />
                        <Input
                          id="resume"
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setResume(e.target.files[0]);
                            }
                          }}
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>
                  </div>
                )}
                <Button disabled={btnLoading} className="w-full mb-3 text-md">
                  {btnLoading ? "wait a moment please..." : "Register"}
                  <ArrowRight size={18} />
                </Button>
              </div>
            )}
          </form>
          {/* route to register page */}
          <div className="mt-6 p-t-6 border-t border-gray-400 mb-3 ">
            <p className="text-center text-md mt-5">
              Already have an account
              <NextLink
                href="/register"
                className="text-blue-500 font-medium hover:underline transition-all"
              >
                {" "}
                Login
              </NextLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
