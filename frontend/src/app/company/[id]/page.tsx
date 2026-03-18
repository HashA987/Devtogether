"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { job_service, useAppData } from "@/context/AppContext";
import { Company, Job } from "@/type";
import axios from "axios";
import Loading from "@/components/loading";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  Globe,
  Laptop,
  MapPin,
  XCircle,
  Plus,
  FileText,
  Users,
} from "lucide-react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Eye } from "lucide-react";
import { Pencil } from "lucide-react";

const CompanyPage = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const { user } = useAppData();

  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [openings, setOpenings] = useState("");
  const [job_type, setJobType] = useState("");
  const [work_location, setWorkLocation] = useState("");
  const [is_active, setIsActive] = useState(true);

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setRole("");
    setSalary("");
    setLocation("");
    setOpenings("");
    setJobType("");
    setWorkLocation("");
    setIsActive(true);
  };

  async function fetchCompany() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${job_service}/api/job/company/${id}`);
      setCompany(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const isRecruiterOwner =
    user && company && user.user_id === company.recruiter_id;

  const addJobHandler = async () => {
    setBtnLoading(true);
    try {
      const jobData = {
        title,
        description,
        role,
        salary: salary ? Number(salary) : null,
        location,
        openings: Number(openings),
        job_type,
        work_location,
        company_id: id as string,
      };

      await axios.post(`${job_service}/api/job/new`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Job posted successfully");
      fetchCompany();
      clearInputs();
      setIsAddModalOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error posting job");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (jobId: number) => {
    if (confirm("Are you sure you want to delete this job?")) {
      setBtnLoading(true);
      try {
        await axios.delete(`${job_service}/api/job/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Job deleted successfully");
        fetchCompany();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Error deleting job");
      } finally {
        setBtnLoading(false);
      }
    }
  };

  const handleOpenUpdateModal = (job: Job) => {
    setSelectedJob(job);
    setTitle(job.title);
    setDescription(job.description);
    setRole(job.role);
    setSalary(job.salary ? job.salary.toString() : "");
    setLocation(job.location || "");
    setOpenings(job.openings.toString());
    setJobType(job.job_type);
    setWorkLocation(job.work_location);
    setIsActive(job.is_active);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedJob(null);
    clearInputs();
  };

  const updateJobHandler = async () => {
    if (!selectedJob) return;

    setBtnLoading(true);
    try {
      const updateData = {
        title,
        description,
        role,
        salary: salary ? Number(salary) : null,
        location,
        openings: Number(openings),
        job_type,
        work_location,
        is_active,
      };

      await axios.put(
        `${job_service}/api/job/${selectedJob.job_id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Job updated successfully");
      fetchCompany();
      handleCloseUpdateModal();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error updating job");
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-secondary/30">
      {company && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Company Profile Card */}
          <Card className="overflow-hidden shadow-lg border-2 mb-8">
            <div className="h-32 bg-blue-600" />
            <div className="px-8 pb-8 -mt-16 relative">
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
                <div className="w-32 h-32 rounded-2xl border-4 border-background overflow-hidden shadow-xl bg-background shrink-0">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                  <p className="text-base leading-relaxed opacity-80 max-w-3xl">
                    {company.description}
                  </p>
                </div>
                <Link
                  href={company.website}
                  target="_blank"
                  className="shrink-0"
                >
                  <Button className="gap-2 font-bold">
                    <Globe size={20} />
                    Visit Website
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Jobs Section */}
          <Card className="shadow-lg border-2 overflow-hidden">
            <div className="bg-blue-600 border-b p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Briefcase size={20} className="text-blue-600" />
                  </div>
                </div>
                <div className="text-center flex-1">
                  <h2 className="text-2xl font-bold text-white">
                    Open Positions
                  </h2>
                  <p className="text-lg text-white/90">
                    {company.jobs?.length || 0} Active Job
                    {company.jobs?.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {isRecruiterOwner && (
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full h-12 gap-2 mb-6">
                      <Plus size={18} />
                      Post New Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-137.5 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl flex items-center gap-2">
                        <Briefcase size={24} />
                        Post New Job
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="title"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Briefcase size={16} />
                          Job Title
                        </Label>
                        <Input
                          id="title"
                          type="text"
                          placeholder="Enter job title"
                          className="h-11"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="description"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <FileText size={16} />
                          Description
                        </Label>
                        <Input
                          id="description"
                          type="text"
                          placeholder="Enter job description"
                          className="h-11"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="role"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Building2 size={16} />
                          Role/Department
                        </Label>
                        <Input
                          id="role"
                          type="text"
                          placeholder="Enter job role"
                          className="h-11"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="salary"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <DollarSign size={16} />
                            Salary
                          </Label>
                          <Input
                            id="salary"
                            type="text"
                            placeholder="Enter salary"
                            className="h-11"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="openings"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <Users size={16} />
                            Openings
                          </Label>
                          <Input
                            id="openings"
                            type="number"
                            placeholder="0"
                            className="h-11"
                            value={openings}
                            onChange={(e) => setOpenings(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="location"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <MapPin size={16} />
                          Location
                        </Label>
                        <Input
                          id="location"
                          type="text"
                          placeholder="Enter location"
                          className="h-11"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="job_type"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <Clock size={16} />
                            Job Type
                          </Label>
                          <Select value={job_type} onValueChange={setJobType}>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full-time">
                                Full-time
                              </SelectItem>
                              <SelectItem value="Part-time">
                                Part-time
                              </SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                              <SelectItem value="Internship">
                                Internship
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="work_location"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <Laptop size={16} />
                            Work Location
                          </Label>
                          <Select
                            value={work_location}
                            onValueChange={setWorkLocation}
                          >
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select work location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="On-site">On-site</SelectItem>
                              <SelectItem value="Remote">Remote</SelectItem>
                              <SelectItem value="Hybrid">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        onClick={addJobHandler}
                        disabled={btnLoading}
                        className="gap-2"
                      >
                        {btnLoading ? "Posting..." : "Post Job"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              {/* Update Modal */}
              {isRecruiterOwner && (
                <Dialog
                  open={isUpdateModalOpen}
                  onOpenChange={setIsUpdateModalOpen}
                >
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl flex items-center gap-2">
                        <Briefcase size={24} />
                        Update Job
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="title"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Briefcase size={16} />
                          Job Title
                        </Label>
                        <Input
                          id="title"
                          type="text"
                          className="h-11"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="description"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <FileText size={16} />
                          Description
                        </Label>
                        <Input
                          id="description"
                          type="text"
                          className="h-11"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="role"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Building2 size={16} />
                          Role/Department
                        </Label>
                        <Input
                          id="role"
                          type="text"
                          className="h-11"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="salary"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <DollarSign size={16} />
                            Salary
                          </Label>
                          <Input
                            id="salary"
                            type="text"
                            className="h-11"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="openings"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <Users size={16} />
                            Openings
                          </Label>
                          <Input
                            id="openings"
                            type="number"
                            className="h-11"
                            value={openings}
                            onChange={(e) => setOpenings(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="location"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <MapPin size={16} />
                          Location
                        </Label>
                        <Input
                          id="location"
                          type="text"
                          className="h-11"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="job_type"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <Clock size={16} />
                            Job Type
                          </Label>
                          <Select value={job_type} onValueChange={setJobType}>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full-time">
                                Full-time
                              </SelectItem>
                              <SelectItem value="Part-time">
                                Part-time
                              </SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                              <SelectItem value="Internship">
                                Internship
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="work_location"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <Laptop size={16} />
                            Work Location
                          </Label>
                          <Select
                            value={work_location}
                            onValueChange={setWorkLocation}
                          >
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select work location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="On-site">On-site</SelectItem>
                              <SelectItem value="Remote">Remote</SelectItem>
                              <SelectItem value="Hybrid">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="is_active"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          Status
                        </Label>
                        <Select
                          value={is_active ? "true" : "false"}
                          onValueChange={(value) =>
                            setIsActive(value === "true")
                          }
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Active</SelectItem>
                            <SelectItem value="false">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        onClick={updateJobHandler}
                        disabled={btnLoading}
                        className="gap-2"
                      >
                        {btnLoading ? "Updating..." : "Update Job"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              {company.jobs && company.jobs.length > 0 ? (
                <div className="space-y-4">
                  {company.jobs.map((j) => (
                    <div
                      key={j.job_id}
                      className="p-6 rounded-lg border hover:border-blue-500 transition-all bg-card"
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-4 flex-wrap">
                            <h3 className="text-xl font-semibold flex-1 min-w-0 pr-4">
                              {j.title}
                            </h3>
                            <span
                              className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${
                                j.is_active
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              {j.is_active ? (
                                <CheckCircle size={14} />
                              ) : (
                                <XCircle size={14} />
                              )}
                              {j.is_active ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-3 line-clamp-2 font-bold border border-blue-100">
                            {j.description}
                          </p>
                          <div className="flex flex-wrap gap-x-10 font-mono text-green-800 gap-y-3 ">
                            <div className="flex items-center  gap-2">
                              <Building2 size={14} />
                              <span>{j.role}</span>
                            </div>
                            {j.salary && (
                              <div className="flex items-center gap-1">
                                <DollarSign size={14} />
                                <span>${j.salary.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 ">
                              <MapPin size={14} />
                              <span>{j.location}</span>
                            </div>
                            <div className="flex items-center gap-2 ">
                              <Laptop size={16} />
                              <span>
                                {j.work_location}({j.job_type})
                              </span>
                            </div>
                            <div className="flex items-center gap-2 ">
                              <Users size={16} />
                              <span>{j.openings} Openings</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/jobs/${j.job_id}`}>
                            <Button
                              variant={"destructive"}
                              size={"sm"}
                              className="gap-2"
                            >
                              <Eye size={16} />
                              View
                            </Button>
                          </Link>
                        </div>
                        {isRecruiterOwner && (
                          <div className="flex gap-2 flex-wrap">
                            <Button
                              variant={"default"}
                              size="sm"
                              onClick={() => handleOpenUpdateModal(j)}
                              className="gap-2"
                            >
                              <Pencil size={16} />
                              Edit
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Briefcase className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>No jobs posted yet.</p>
                  {isRecruiterOwner && (
                    <Dialog
                      open={isUpdateModalOpen}
                      onOpenChange={setIsUpdateModalOpen}
                    >
                      <DialogContent className="max-w-137.5 max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl flex items-center gap-2">
                            <Briefcase size={24} />
                            Update Job
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="title"
                              className="text-sm font-medium flex items-center gap-2"
                            >
                              <Briefcase size={16} />
                              Job Title
                            </Label>
                            <Input
                              id="title"
                              type="text"
                              placeholder="Enter job title"
                              className="h-11"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="description"
                              className="text-sm font-medium flex items-center gap-2"
                            >
                              <FileText size={16} />
                              Description
                            </Label>
                            <Input
                              id="description"
                              type="text"
                              placeholder="Enter job description"
                              className="h-11"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="role"
                              className="text-sm font-medium flex items-center gap-2"
                            >
                              <Building2 size={16} />
                              Role/Department
                            </Label>
                            <Input
                              id="role"
                              type="text"
                              placeholder="Enter job role"
                              className="h-11"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label
                                htmlFor="salary"
                                className="text-sm font-medium flex items-center gap-2"
                              >
                                <DollarSign size={16} />
                                Salary
                              </Label>
                              <Input
                                id="salary"
                                type="text"
                                placeholder="Enter salary"
                                className="h-11"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="openings"
                                className="text-sm font-medium flex items-center gap-2"
                              >
                                <Users size={16} />
                                Openings
                              </Label>
                              <Input
                                id="openings"
                                type="number"
                                placeholder="0"
                                className="h-11"
                                value={openings}
                                onChange={(e) => setOpenings(e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label
                                htmlFor="update-is_active"
                                className="text-sm
                              font-medium flex items-center gap-2"
                              >
                                {is_active ? (
                                  <CheckCircle
                                    size={160}
                                    className="text-green-600"
                                  />
                                ) : (
                                  <XCircle size={16} className="text-gray-50" />
                                )}
                              </Label>
                              <Select
                                value={is_active ? "true" : "false"}
                                onValueChange={(value) =>
                                  setIsActive(value === "true")
                                }
                              >
                                <SelectTrigger className="h-11">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="true">Active</SelectItem>
                                  <SelectItem value="false">
                                    Inactive
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="location"
                              className="text-sm font-medium flex items-center gap-2"
                            >
                              <MapPin size={16} />
                              Location
                            </Label>
                            <Input
                              id="location"
                              type="text"
                              placeholder="Enter location"
                              className="h-11"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label
                                htmlFor="job_type"
                                className="text-sm font-medium flex items-center gap-2"
                              >
                                <Clock size={16} />
                                Job Type
                              </Label>
                              <Select
                                value={job_type}
                                onValueChange={setJobType}
                              >
                                <SelectTrigger className="h-11">
                                  <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Full-time">
                                    Full-time
                                  </SelectItem>
                                  <SelectItem value="Part-time">
                                    Part-time
                                  </SelectItem>
                                  <SelectItem value="Contract">
                                    Contract
                                  </SelectItem>
                                  <SelectItem value="Internship">
                                    Internship
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="work_location"
                                className="text-sm font-medium flex items-center gap-2"
                              >
                                <Laptop size={16} />
                                Work Location
                              </Label>
                              <Select
                                value={work_location}
                                onValueChange={setWorkLocation}
                              >
                                <SelectTrigger className="h-11">
                                  <SelectValue placeholder="Select work location" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="On-site">
                                    On-site
                                  </SelectItem>
                                  <SelectItem value="Remote">Remote</SelectItem>
                                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button
                            onClick={updateJobHandler}
                            disabled={btnLoading}
                            className="gap-2"
                          >
                            {btnLoading ? "updating job..." : "update Job"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
