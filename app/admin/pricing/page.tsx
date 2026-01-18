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
import { Plus, Pencil, Trash2, CreditCard, Star, Loader2, GripVertical } from "lucide-react";
import toast from "react-hot-toast";

interface PricingPlan {
  id: string;
  name: string;
  subtitle?: string;
  price: string;
  period?: string;
  features: string;
  isPopular: boolean;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  order: number;
}

export default function PricingManagementPage() {
  const { status } = useSession();
  const router = useRouter();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    price: "",
    period: "month",
    features: "",
    isPopular: false,
    ctaText: "Get Started",
    ctaLink: "/contact",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [draggedItem, setDraggedItem] = useState<PricingPlan | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/admin/pricing");
      if (res.ok) {
        const data = await res.json();
        setPlans(data);
      }
    } catch (error) {
      console.error("Failed to fetch pricing plans:", error);
      toast.error("Failed to load pricing plans");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to convert feature to displayable string
  const featureToString = (feature: unknown): string => {
    if (typeof feature === "string") {
      return feature;
    }
    if (typeof feature === "object" && feature !== null) {
      const obj = feature as { label?: string; value?: string };
      if (obj.label && obj.value) {
        return `${obj.label}: ${obj.value}`;
      }
      if (obj.label) {
        return obj.label;
      }
    }
    return String(feature);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingPlan
        ? `/api/admin/pricing/${editingPlan.id}`
        : "/api/admin/pricing";
      const method = editingPlan ? "PUT" : "POST";

      // Parse features from newline-separated string to array
      const payload = {
        ...formData,
        features: formData.features.split("\n").map((f) => f.trim()).filter(Boolean),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingPlan ? "Plan updated!" : "Plan created!");
        setIsDialogOpen(false);
        setEditingPlan(null);
        setFormData({
          name: "",
          subtitle: "",
          price: "",
          period: "month",
          features: "",
          isPopular: false,
          ctaText: "Get Started",
          ctaLink: "/contact",
        });
        fetchPlans();
      } else {
        toast.error("Failed to save plan");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    // Parse JSON features back to newline-separated for editing
    let featuresStr = "";
    try {
      const featuresArr = JSON.parse(plan.features);
      if (Array.isArray(featuresArr)) {
        featuresStr = featuresArr.map(featureToString).join("\n");
      }
    } catch {
      featuresStr = plan.features || "";
    }

    setFormData({
      name: plan.name,
      subtitle: plan.subtitle || "",
      price: plan.price,
      period: plan.period || "month",
      features: featuresStr,
      isPopular: plan.isPopular,
      ctaText: plan.ctaText || "Get Started",
      ctaLink: plan.ctaLink || "/contact",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pricing plan?")) return;

    try {
      const res = await fetch(`/api/admin/pricing/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Plan deleted!");
        fetchPlans();
      } else {
        toast.error("Failed to delete plan");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const openNewDialog = () => {
    setEditingPlan(null);
    setFormData({
      name: "",
      subtitle: "",
      price: "",
      period: "month",
      features: "",
      isPopular: false,
      ctaText: "Get Started",
      ctaLink: "/contact",
    });
    setIsDialogOpen(true);
  };

  const parseFeatures = (features: string): string[] => {
    try {
      const parsed = JSON.parse(features);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(featureToString);
    } catch {
      return [];
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, plan: PricingPlan) => {
    setDraggedItem(plan);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = useCallback(async (e: React.DragEvent, targetPlan: PricingPlan) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.id === targetPlan.id) {
      setDraggedItem(null);
      return;
    }

    const newPlans = [...plans];
    const draggedIndex = newPlans.findIndex(p => p.id === draggedItem.id);
    const targetIndex = newPlans.findIndex(p => p.id === targetPlan.id);

    // Remove dragged item and insert at target position
    newPlans.splice(draggedIndex, 1);
    newPlans.splice(targetIndex, 0, draggedItem);

    // Update local state immediately for better UX
    setPlans(newPlans);
    setDraggedItem(null);

    // Save new order to backend
    try {
      const orderedIds = newPlans.map(p => p.id);
      const res = await fetch("/api/admin/pricing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });

      if (res.ok) {
        toast.success("Order updated!");
      } else {
        toast.error("Failed to update order");
        fetchPlans(); // Revert on error
      }
    } catch {
      toast.error("Failed to update order");
      fetchPlans(); // Revert on error
    }
  }, [draggedItem, plans]);

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
          title="Pricing Plans"
          description="Manage pricing tiers and features. Drag to reorder."
        />

        <main className="p-6">
          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">
              {plans.length} pricing plan{plans.length !== 1 ? "s" : ""}
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNewDialog} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Pricing Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingPlan ? "Edit Pricing Plan" : "Add Pricing Plan"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Plan Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Professional"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Subtitle
                      </label>
                      <Input
                        value={formData.subtitle}
                        onChange={(e) =>
                          setFormData({ ...formData, subtitle: e.target.value })
                        }
                        placeholder="For growing businesses"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Price *
                      </label>
                      <Input
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="$999 or Custom"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Period
                      </label>
                      <Input
                        value={formData.period}
                        onChange={(e) =>
                          setFormData({ ...formData, period: e.target.value })
                        }
                        placeholder="month, year, or leave empty"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Features (one per line)
                    </label>
                    <Textarea
                      value={formData.features}
                      onChange={(e) =>
                        setFormData({ ...formData, features: e.target.value })
                      }
                      placeholder="Up to 20 AI agents&#10;Advanced analytics&#10;Priority support&#10;API access"
                      rows={6}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Enter each feature on a new line
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        CTA Button Text
                      </label>
                      <Input
                        value={formData.ctaText}
                        onChange={(e) =>
                          setFormData({ ...formData, ctaText: e.target.value })
                        }
                        placeholder="Get Started"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        CTA Button Link
                      </label>
                      <Input
                        value={formData.ctaLink}
                        onChange={(e) =>
                          setFormData({ ...formData, ctaLink: e.target.value })
                        }
                        placeholder="/contact"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isPopular"
                      checked={formData.isPopular}
                      onChange={(e) =>
                        setFormData({ ...formData, isPopular: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    <label htmlFor="isPopular" className="text-sm text-slate-700">
                      Mark as "Most Popular"
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
                      ) : editingPlan ? (
                        "Update"
                      ) : (
                        "Create Plan"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Plans List */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : plans.length === 0 ? (
            <Card className="p-12 text-center">
              <CreditCard className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 mb-4">No pricing plans yet</p>
              <Button onClick={openNewDialog} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Plan
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`p-5 transition-all ${
                    draggedItem?.id === plan.id ? "opacity-50 scale-95" : ""
                  } ${plan.isPopular ? "ring-2 ring-blue-500" : ""}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, plan)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, plan)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-start gap-4">
                    <GripVertical className="h-5 w-5 text-slate-400 cursor-grab active:cursor-grabbing mt-1" />

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg text-slate-900">
                              {plan.name}
                            </h3>
                            {plan.isPopular && (
                              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                Popular
                              </span>
                            )}
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                plan.isActive
                                  ? "bg-green-100 text-green-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {plan.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                          {plan.subtitle && (
                            <p className="text-sm text-slate-500 mt-1">{plan.subtitle}</p>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(plan)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(plan.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-slate-500">/{plan.period}</span>
                        )}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {parseFeatures(plan.features).slice(0, 5).map((feature, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                        {parseFeatures(plan.features).length > 5 && (
                          <span className="text-xs text-slate-400">
                            +{parseFeatures(plan.features).length - 5} more
                          </span>
                        )}
                      </div>
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
