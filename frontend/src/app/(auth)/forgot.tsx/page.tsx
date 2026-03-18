"use client";

import { user_service, useAppData } from "@/context/AppContext";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { FormEvent } from "react";
import Link from "next/link";

import toast from "react-hot-toast";

const ForgotPage = () => {
  const [email, setEmail] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);

  const { isAuth } = useAppData();

  if (isAuth) return redirect("/");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${user_service}/api/user/forgot-password`,
        {
          email,
        },
      );
      toast.success(data.message);
      setEmail("");
    } catch (error: any) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="mt-15 md:mt-5 z-0">
      <div className="md:w-1/3 h-100 border border-green-600 rounded-lg p-8 flex flex-col w-full relative shadow-md m-auto">
        <h2 className="mb-6">
          <span className="text-3xl flex items-center justify-center font-bold">
            Forgot Password
          </span>
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className=" text-lg border-green-600 border flex justify-center items-center font-medium "
            ></label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-5 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <button
            type="submit"
            disabled={btnLoading}
            className="w-full mb-4 mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {btnLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <Link
          href={"/login"}
          className="mt-4 flex items-center justify-center text-blue-500 underline text-md ml-2"
        >
          Back to login page
        </Link>
        <span className="text-blue-500 text-2xl mt-18">
          Dev<span className=" text-red-600">Together</span>
        </span>
      </div>
    </div>
  );
};

export default ForgotPage;
