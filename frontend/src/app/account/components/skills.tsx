"use client";

import React, { useState } from "react";
import { AccountProps } from "@/type";
import { useAppData } from "@/context/AppContext";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Award, Sparkle, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

const Skills: React.FC<AccountProps> = ({ user, isYourAccount }) => {
  const { addSkill, btnLoading, removeSkill } = useAppData();
  const [skill, setSkill] = useState("");

  const addSkillHandler = () => {
    if (!skill.trim()) {
      alert("please enter a skill");
      return;
    }

    addSkill(skill, setSkill);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addSkillHandler();
    }
  };

  const removeSkillHandler = (skillToRemove: string) => {
    if (confirm(`Are you sure, you want to remove ${skillToRemove} ?`)) {
      removeSkill(skillToRemove);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Card className="shadow-lg border-2 overflow-hidden">
        <div className="bg-blue-500 p-6 border-b">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900
                flex items-center justify-center"
            >
              <Award size={20} className="text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-white">
              {isYourAccount ? "Your Skills" : "User Skills"}
            </CardTitle>

            {isYourAccount && (
              <CardDescription className="text-sm mt-1 text-white underline">
                Showcase your expertise and abilities
              </CardDescription>
            )}
          </div>
        </div>

        {/* add skills input */}
        {isYourAccount && (
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Sparkle
                size={18}
                className="absolute left-3 top-1/2 opacity-50"
              />
              <Input
                type="text"
                placeholder="HTML,CSS,React,Node.js...."
                className="h-11 pl-10 bg-background"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button
              onClick={addSkillHandler}
              className="h-11 gap-2 px-6"
              disabled={!skill.trim() || btnLoading}
            >
              <Plus size={18} /> Add Skills
            </Button>
          </div>
        )}

        {/* skills display */}

        <CardContent className="p-6">
          {user.skills && user.skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {user.skills.map((e, i) => (
                <div
                  key={i}
                  className="group relative inline-flex items-center gap-2 border-2
                  rounded-full hover:shadow-sm duration-200 transition-all pl-4 pr-3 py-2"
                >
                  <span className="font-medium text-md">{e}</span>
                  {isYourAccount && (
                    <button
                      onClick={() => removeSkillHandler(e)}
                      className="h-6 w-6 rounded-full
                    text-red-500 flex items-center justify-evenly transition-all hover:bg-blue-300  hover:scale-110"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="text-center py-12 ">
                <div
                  className="inline-flex items-center justify-center w-16 h-16
             rounded-full bg-gray-100 dark:bg-gray-800 mb-4"
                >
                  <Award size={32} className="opacity-40" />
                </div>
                <CardDescription className="text-base">
                  {isYourAccount
                    ? "No skills Added yet"
                    : "No added skills add by user"}
                </CardDescription>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Skills;
