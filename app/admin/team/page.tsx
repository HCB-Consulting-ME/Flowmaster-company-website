"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, GripVertical, Loader2, Users } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedIn?: string;
  order: number;
  isActive: boolean;
}

export default function TeamManagementPage() {
  const { status } = useSession();
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    linkedIn: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [draggedItem, setDraggedItem] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch("/api/admin/team");
      if (res.ok) {
        const data = await res.json();
        setTeamMembers(data);
      }
    } catch (error) {
      console.error("Failed to fetch team members:", error);
      toast.error("Failed to load team members");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingMember
        ? `/api/admin/team/${editingMember.id}`
        : "/api/admin/team";
      const method = editingMember ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingMember ? "Team member updated!" : "Team member added!");
        setIsDialogOpen(false);
        setEditingMember(null);
        setFormData({ name: "", role: "", image: "", linkedIn: "" });
        fetchTeamMembers();
      } else {
        toast.error("Failed to save team member");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      image: member.image,
      linkedIn: member.linkedIn || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Team member deleted!");
        fetchTeamMembers();
      } else {
        toast.error("Failed to delete team member");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const openNewDialog = () => {
    setEditingMember(null);
    setFormData({ name: "", role: "", image: "", linkedIn: "" });
    setIsDialogOpen(true);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, member: TeamMember) => {
    setDraggedItem(member);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = useCallback(async (e: React.DragEvent, targetMember: TeamMember) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.id === targetMember.id) {
      setDraggedItem(null);
      return;
    }

    const newMembers = [...teamMembers];
    const draggedIndex = newMembers.findIndex(m => m.id === draggedItem.id);
    const targetIndex = newMembers.findIndex(m => m.id === targetMember.id);

    // Remove dragged item and insert at target position
    newMembers.splice(draggedIndex, 1);
    newMembers.splice(targetIndex, 0, draggedItem);

    // Update local state immediately for better UX
    setTeamMembers(newMembers);
    setDraggedItem(null);

    // Save new order to backend
    try {
      const orderedIds = newMembers.map(m => m.id);
      const res = await fetch("/api/admin/team", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });

      if (res.ok) {
        toast.success("Order updated!");
      } else {
        toast.error("Failed to update order");
        fetchTeamMembers(); // Revert on error
      }
    } catch {
      toast.error("Failed to update order");
      fetchTeamMembers(); // Revert on error
    }
  }, [draggedItem, teamMembers]);

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
          title="Team Management"
          description="Manage team members displayed on the company page. Drag to reorder."
        />

        <main className="p-6">
          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">
              {teamMembers.length} team member{teamMembers.length !== 1 ? "s" : ""}
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNewDialog} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingMember ? "Edit Team Member" : "Add Team Member"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Role *</label>
                    <Input
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="CEO & Founder"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Image URL</label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/Company/photo.png"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">LinkedIn URL</label>
                    <Input
                      value={formData.linkedIn}
                      onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                    />
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
                      ) : editingMember ? (
                        "Update"
                      ) : (
                        "Add Member"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Team List */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : teamMembers.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 mb-4">No team members yet</p>
              <Button onClick={openNewDialog} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Team Member
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <Card
                  key={member.id}
                  className={`p-4 transition-all ${
                    draggedItem?.id === member.id ? "opacity-50 scale-95" : ""
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, member)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, member)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-center gap-4">
                    <GripVertical className="h-5 w-5 text-slate-400 cursor-grab active:cursor-grabbing" />
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-slate-200">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400 text-lg font-bold">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{member.name}</h3>
                      <p className="text-sm text-slate-500">{member.role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {member.isActive ? "Active" : "Inactive"}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(member)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(member.id)}
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
