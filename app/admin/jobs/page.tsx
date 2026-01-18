"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Briefcase, MapPin, Loader2, GripVertical } from "lucide-react";
import toast from "react-hot-toast";

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  scope: string;
  skills: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Operations",
  "HR",
  "Finance",
  "Product",
  "Product & Engineering",
];

const LOCATIONS = ["Remote", "Dubai, UAE", "Karachi, Pakistan", "Frankfurt, Germany", "Hybrid", "On-site"];

export default function JobsManagementPage() {
  const { status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    description: "",
    scope: "",
    skills: "",
    isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [draggedItem, setDraggedItem] = useState<JobListing | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/admin/jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      toast.error("Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingJob
        ? `/api/admin/jobs/${editingJob.id}`
        : "/api/admin/jobs";
      const method = editingJob ? "PUT" : "POST";

      // Parse scope and skills from comma-separated strings to arrays
      const payload = {
        ...formData,
        scope: formData.scope.split(",").map((s) => s.trim()).filter(Boolean),
        skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingJob ? "Job updated!" : "Job created!");
        setIsDialogOpen(false);
        setEditingJob(null);
        setFormData({
          title: "",
          department: "",
          location: "",
          description: "",
          scope: "",
          skills: "",
          isActive: true,
        });
        fetchJobs();
      } else {
        toast.error("Failed to save job");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (job: JobListing) => {
    setEditingJob(job);
    // Parse JSON strings back to comma-separated for editing
    let scopeStr = "";
    let skillsStr = "";
    try {
      const scopeArr = JSON.parse(job.scope);
      scopeStr = Array.isArray(scopeArr) ? scopeArr.join(", ") : "";
    } catch {
      scopeStr = job.scope || "";
    }
    try {
      const skillsArr = JSON.parse(job.skills);
      skillsStr = Array.isArray(skillsArr) ? skillsArr.join(", ") : "";
    } catch {
      skillsStr = job.skills || "";
    }

    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      description: job.description,
      scope: scopeStr,
      skills: skillsStr,
      isActive: job.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;

    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Job deleted!");
        fetchJobs();
      } else {
        toast.error("Failed to delete job");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const toggleJobStatus = async (job: JobListing) => {
    try {
      const res = await fetch(`/api/admin/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...job, isActive: !job.isActive }),
      });
      if (res.ok) {
        toast.success(`Job ${job.isActive ? "deactivated" : "activated"}!`);
        fetchJobs();
      }
    } catch {
      toast.error("Failed to update job status");
    }
  };

  const openNewDialog = () => {
    setEditingJob(null);
    setFormData({
      title: "",
      department: "",
      location: "",
      description: "",
      scope: "",
      skills: "",
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, job: JobListing) => {
    setDraggedItem(job);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = useCallback(async (e: React.DragEvent, targetJob: JobListing) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.id === targetJob.id) {
      setDraggedItem(null);
      return;
    }

    const newJobs = [...jobs];
    const draggedIndex = newJobs.findIndex(j => j.id === draggedItem.id);
    const targetIndex = newJobs.findIndex(j => j.id === targetJob.id);

    // Remove dragged item and insert at target position
    newJobs.splice(draggedIndex, 1);
    newJobs.splice(targetIndex, 0, draggedItem);

    // Update local state immediately for better UX
    setJobs(newJobs);
    setDraggedItem(null);

    // Save new order to backend
    try {
      const orderedIds = newJobs.map(j => j.id);
      const res = await fetch("/api/admin/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });

      if (res.ok) {
        toast.success("Order updated!");
      } else {
        toast.error("Failed to update order");
        fetchJobs(); // Revert on error
      }
    } catch {
      toast.error("Failed to update order");
      fetchJobs(); // Revert on error
    }
  }, [draggedItem, jobs]);

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="ml-64">
        <AdminHeader
          title="Job Listings"
          description="Manage career opportunities. Drag to reorder."
        />

        <main className="p-6">
          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">
              {jobs.length} job{jobs.length !== 1 ? "s" : ""} (
              {jobs.filter((j) => j.isActive).length} active)
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNewDialog} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Job Listing
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingJob ? "Edit Job Listing" : "Add Job Listing"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Job Title *
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Senior Software Engineer"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Department *
                      </label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) =>
                          setFormData({ ...formData, department: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {DEPARTMENTS.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Location *
                    </label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) =>
                        setFormData({ ...formData, location: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATIONS.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Description *
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Describe the role and responsibilities..."
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Scope (comma-separated)
                    </label>
                    <Textarea
                      value={formData.scope}
                      onChange={(e) =>
                        setFormData({ ...formData, scope: e.target.value })
                      }
                      placeholder="Design AI systems, Build scalable solutions, Lead technical initiatives"
                      rows={2}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      List key responsibilities, separated by commas
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Required Skills (comma-separated)
                    </label>
                    <Textarea
                      value={formData.skills}
                      onChange={(e) =>
                        setFormData({ ...formData, skills: e.target.value })
                      }
                      placeholder="Python, TypeScript, Machine Learning, AWS"
                      rows={2}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      List required skills and technologies, separated by commas
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    <label htmlFor="isActive" className="text-sm text-slate-700">
                      Active (visible on website)
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : editingJob ? (
                        "Update"
                      ) : (
                        "Create Job"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Jobs List */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : jobs.length === 0 ? (
            <Card className="p-12 text-center">
              <Briefcase className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 mb-4">No job listings yet</p>
              <Button onClick={openNewDialog} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Job
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  className={`p-5 transition-all ${
                    draggedItem?.id === job.id ? "opacity-50 scale-95" : ""
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, job)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, job)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-start gap-4">
                    <GripVertical className="h-5 w-5 text-slate-400 cursor-grab active:cursor-grabbing mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-slate-900">
                          {job.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {job.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleJobStatus(job)}
                      >
                        {job.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(job)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(job.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
