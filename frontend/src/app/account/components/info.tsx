import { AccountProps } from "@/type";
import React, { ChangeEvent, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Briefcase, Mail, NotepadText, Phone, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useAppData } from "@/context/AppContext";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

const Info: React.FC<AccountProps> = ({ user, isYourAccount }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editRef = useRef<HTMLButtonElement | null>(null);
  const resumeRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("false");
  const [phoneNumber, setPhoneNumber] = useState("false");

  const { updateProfilePic, updateResume, btnLoading, updateUser } =
    useAppData();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData.get("file"));

      updateProfilePic(formData);
    }
  };

  const handleEditClick = () => {
    editRef.current?.click();
    setName(user.name);
    setPhoneNumber(user.phone_number);
  };

  const updateProfileHandler = () => {
    updateUser(name, phoneNumber);
  };

  const handleResumeClick = () => {
    resumeRef.current?.click();
  };

  const changeResume = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("please upload a pdf file");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      updateResume(formData);
    }
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-shadow-secondary-foreground">
      <Card className="overflow-hidden shadow-lg border-2">
        <div className="h-32 bg-blue-500 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="relative group">
              <div
                className="w-32 h-32 rounded-full border-4 border-background
            overflow-hidden shadow-xl bg-background"
              >
                <img
                  src={
                    user.profile_pic ? user.profile_pic : "/avatarImage.jpeg"
                  }
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* edit your account  profole pic*/}
              {isYourAccount && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleClick}
                    className="absolute bottom-0 right-0 rounded-full h-10 w-10 shadow-lg"
                  >
                    <Camera size={18} className="text-black dark:text-white" />
                  </Button>

                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={inputRef}
                    onChange={changeHandler}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* main content */}
        <div className="pt-20 pb-8 px-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{user.name}</h1>

                {isYourAccount && (
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="h-8 w-8"
                    onClick={handleEditClick}
                  >
                    <Edit size={16} />
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2 text-md font-bold opacity-70">
                <Briefcase size={20} />
                <span className="capitalize">{user.role}</span>
              </div>
            </div>
          </div>

          {/* contact info */}

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail size={20} className="text-blue-600" />
              Contac Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div
                className="flex items-center gap-3 p-4 rounded-lg border
              hover:border-blue-500 transition-colors"
              >
                <div
                  className="h-10 w-10 rounded-full bg-blue-100
                dark:bg-blue-900 flex items-center justify-center"
                >
                  <Mail size={18} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-bold opacity-70 ">Email</p>
                  <p className="text-sm truncate">{user.email}</p>
                </div>
              </div>
              <div
                className="flex items-center gap-3 p-4 rounded-lg border
              hover:border-blue-500 transition-colors"
              >
                <div
                  className="h-10 w-10 rounded-full bg-blue-100
                dark:bg-blue-900 flex items-center justify-center"
                >
                  <Phone size={18} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-bold opacity-70 ">Phone</p>
                  <p className="text-sm truncate">{user.phone_number}</p>
                </div>
              </div>
            </div>
          </div>

          {/* resume section */}

          {user.role === "jobseeker" && user.resume && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mt-4 flex items-center gap-2">
                <NotepadText size={20} className="text-blue-600" />
                Resume
              </h2>
              <div
                className="flex items-center gap-3 p-4 rounded-lg border
            hover:border-blue-500 transition-colors"
              >
                <div
                  className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900
                flex items-center justify-center"
                >
                  <NotepadText size={20} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Resume Document</p>

                  <Link
                    href={user.resume}
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Resume
                  </Link>
                </div>

                {/* edit button */}
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={handleResumeClick}
                  className="gap-2"
                >
                  Update
                </Button>
                <input
                  type="file"
                  ref={resumeRef}
                  className="hidden"
                  accept="application/pdf"
                  onChange={changeResume}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* {dialogue box for edit} */}
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={editRef} variant={"outline"} className="hidden">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle className="text-2xl">Edit profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium flex item-center gap-2"
              >
                <UserIcon size={16} /> Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="h-11"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium flex item-center gap-2"
              >
                <Phone size={16} /> Phone
              </Label>
              <Input
                id="phone"
                type="number"
                placeholder="Enter your phone number"
                className="h-11"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                disabled={btnLoading}
                onClick={updateProfileHandler}
                className="w-full h-11"
                type="submit"
              >
                {btnLoading ? "Saving Changes..." : "Save changes"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Info;
