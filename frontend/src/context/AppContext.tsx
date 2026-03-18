// to send all the data type TO EVERY SEPARATE PAGE

"use client";

import { AppProviderProps, AppContextType, User, Application } from "@/type";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
// import { cookies } from "next/headers";
import axios from "axios";

export const utils_service =
  process.env.NEXT_PUBLIC_UTILS_SERVICE || "http://localhost:5001";
export const auth_service =
  process.env.NEXT_PUBLIC_AUTH_SERVICE || "http://localhost:5000";
export const user_service =
  process.env.NEXT_PUBLIC_USER_SERVICE || "http://localhost:5002";
export const job_service =
  process.env.NEXT_PUBLIC_JOB_SERVICE || "http://localhost:5003";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const token = Cookies.get("token");

  async function fetchUser() {
    const token = Cookies.get("token");

    if (!token) {
      setIsAuth(false);
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${user_service}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfilePic(fromData: any) {
    setLoading(true);
    try {
      console.log(fromData);
      const { data } = await axios.put(
        `${user_service}/api/user/update/pic`,
        fromData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateResume(fromData: any) {
    setLoading(true);
    try {
      console.log(fromData);
      const { data } = await axios.put(
        `${user_service}/api/user/update/resume`,
        fromData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(name: string, phoneNumber: string) {
    setBtnLoading(true);
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/update/profile`,
        { name, phoneNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }
  async function logoutUser() {
    Cookies.set("token", "");
    setUser(null);
    setIsAuth(false);
    toast.success("Logged out succesfully");
    window.location.href = "/";
  }

  async function addSkill(
    skill: string,
    setSkill: React.Dispatch<React.SetStateAction<string>>,
  ) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${user_service}/api/user/skill/add`,
        { skillName: skill },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);
      setSkill("");
      fetchUser();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }

  async function removeSkill(skill: string) {
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/skill/delete`,
        { skillName: skill },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);
      fetchApplications();

      fetchUser();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  async function applyJob(job_id: number) {
    setBtnLoading(true);
    try {
      const currentToken = Cookies.get("token");
      const { data } = await axios.post(
        `${user_service}/api/user/apply/job`,
        { job_id },
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        },
      );
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
      // FIXED lines 96-106 JobCard: Refetch after applyJob to populate applications → green "Applied" badge
      fetchApplications();
    }
  }
  const [applications, setApplications] = useState<Application[]>([]);
  async function fetchApplications() {
    try {
      const currentToken = Cookies.get("token");
      if (!currentToken) return;
      const { data } = await axios.get(
        `${user_service}/api/user/application/all`,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        },
      );
      // FIXED for JobCard lines 96-106: Backend returns {applications: []}, expect array
      setApplications(Array.isArray(data) ? data : data.applications || []);
      console.log("Applications loaded:", data.applications || data); // DEBUG
    } catch (error) {
      console.error("fetchApplications failed:", error);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchApplications();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        btnLoading,
        setUser,
        isAuth,
        setIsAuth,
        setLoading,
        logoutUser,
        updateProfilePic,
        updateResume,
        updateUser,
        addSkill,
        removeSkill,
        applyJob,
        applications,
        fetchApplications,
      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppData must be used within App provider");
  }
  return context;
};
