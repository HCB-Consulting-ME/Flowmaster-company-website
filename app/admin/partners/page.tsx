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
import { Plus, Pencil, Trash2, GripVertical, Loader2, Handshake } from "lucide-react";
import toast from "react-hot-toast";

interface PartnerBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

const ICON_OPTIONS = [
  "Lightbulb", "Handshake", "Headphones", "DollarSign", "Globe", "Shield",
  "Zap", "Award", "Users", "TrendingUp", "Star", "Heart"
];

export default function PartnersManagementPage() {
  const { status } = useSession();
  const router = useRouter();
  const [benefits, setBenefits] = useState<PartnerBenefit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<PartnerBenefit | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Lightbulb",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [draggedItem, setDraggedItem] = useState<PartnerBenefit | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      const res = await fetch("/api/admin/partners");
      if (res.ok) {
        const data = await res.json();
        setBenefits(data);
      }
    } catch (error) {
      console.error("Failed to fetch partner benefits:", error);
      toast.error("Failed to load partner benefits");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingBenefit
        ? `/api/admin/partners/${editingBenefit.id}`
        : "/api/admin/partners";
      const method = editingBenefit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingBenefit ? "Benefit updated!" : "Benefit added!");
        setIsDialogOpen(false);
        setEditingBenefit(null);
        setFormData({ title: "", description: "", icon: "Lightbulb" });
        fetchBenefits();
      } else {
        toast.error("Failed to save benefit");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (benefit: PartnerBenefit) => {
    setEditingBenefit(benefit);
    setFormData({
      title: benefit.title,
      description: benefit.description,
      icon: benefit.icon,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this benefit?")) return;

    try {
      const res = await fetch(`/api/admin/partners/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Benefit deleted!");
        fetchBenefits();
      } else {
        toast.error("Failed to delete benefit");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const openNewDialog = () => {
    setEditingBenefit(null);
    setFormData({ title: "", description: "", icon: "Lightbulb" });
    setIsDialogOpen(true);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, benefit: PartnerBenefit) => {
    setDraggedItem(benefit);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = useCallback(async (e: React.DragEvent, targetBenefit: PartnerBenefit) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.id === targetBenefit.id) {
      setDraggedItem(null);
      return;
    }

    const newBenefits = [...benefits];
    const draggedIndex = newBenefits.findIndex(b => b.id === draggedItem.id);
    const targetIndex = newBenefits.findIndex(b => b.id === targetBenefit.id);

    // Remove dragged item and insert at target position
    newBenefits.splice(draggedIndex, 1);
    newBenefits.splice(targetIndex, 0, draggedItem);

    // Update local state immediately for better UX
    setBenefits(newBenefits);
    setDraggedItem(null);

    // Save new order to backend
    try {
      const orderedIds = newBenefits.map(b => b.id);
      const res = await fetch("/api/admin/partners", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });

      if (res.ok) {
        toast.success("Order updated!");
      } else {
        toast.error("Failed to update order");
        fetchBenefits(); // Revert on error
      }
    } catch {
      toast.error("Failed to update order");
      fetchBenefits(); // Revert on error
    }
  }, [draggedItem, benefits]);

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
          title="Partners Management"
          description="Manage partner benefits displayed on the Partners page. Drag to reorder."
        />

        <main className="p-6">
          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">
              {benefits.length} partner benefit{benefits.length !== 1 ? "s" : ""}
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNewDialog} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Benefit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Handshake className="h-5 w-5" />
                    {editingBenefit ? "Edit Partner Benefit" : "Add Partner Benefit"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Title *</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Access to Technology"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Description *</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the benefit..."
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Icon</label>
                    <Select
                      value={formData.icon}
                      onValueChange={(val) => setFormData({ ...formData, icon: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {ICON_OPTIONS.map((icon) => (
                          <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      ) : editingBenefit ? (
                        "Update"
                      ) : (
                        "Add Benefit"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Benefits List */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : benefits.length === 0 ? (
            <Card className="p-12 text-center">
              <Handshake className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 mb-4">No partner benefits yet</p>
              <Button onClick={openNewDialog} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Benefit
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {benefits.map((benefit) => (
                <Card
                  key={benefit.id}
                  className={`p-4 transition-all ${
                    draggedItem?.id === benefit.id ? "opacity-50 scale-95" : ""
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, benefit)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, benefit)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-center gap-4">
                    <GripVertical className="h-5 w-5 text-slate-400 cursor-grab active:cursor-grabbing" />
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Handshake className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-1">{benefit.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
                        {benefit.icon}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          benefit.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {benefit.isActive ? "Active" : "Inactive"}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(benefit)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(benefit.id)}
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
