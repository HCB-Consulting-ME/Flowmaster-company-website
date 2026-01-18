"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { Plus, Pencil, Trash2, Loader2, Lightbulb, Building } from "lucide-react";
import toast from "react-hot-toast";

interface Industry {
  id: string;
  name: string;
  slug: string;
  icon: string;
  order: number;
  isActive: boolean;
  solutions: Solution[];
}

interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string;
  industryId: string;
  order: number;
  isActive: boolean;
}

const ICON_OPTIONS = [
  "Landmark", "RadioTower", "Zap", "Wallet", "Truck", "UserPlus", "FileText",
  "Gavel", "Banknote", "Globe", "Activity", "ClipboardList", "CheckCircle2",
  "Server", "ShieldCheck", "Lightbulb", "Headphones", "DollarSign"
];

export default function SolutionsManagementPage() {
  const { status } = useSession();
  const router = useRouter();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isIndustryDialogOpen, setIsIndustryDialogOpen] = useState(false);
  const [isSolutionDialogOpen, setIsSolutionDialogOpen] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<Industry | null>(null);
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null);
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>("");

  const [industryForm, setIndustryForm] = useState({
    name: "",
    slug: "",
    icon: "Landmark",
  });

  const [solutionForm, setSolutionForm] = useState({
    title: "",
    description: "",
    icon: "Lightbulb",
    industryId: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const res = await fetch("/api/admin/solutions");
      if (res.ok) {
        const data = await res.json();
        setIndustries(data.industries || []);
      }
    } catch (error) {
      console.error("Failed to fetch industries:", error);
      toast.error("Failed to load solutions data");
    } finally {
      setIsLoading(false);
    }
  };

  // Industry handlers
  const handleIndustrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingIndustry
        ? `/api/admin/solutions/industries/${editingIndustry.id}`
        : "/api/admin/solutions/industries";
      const method = editingIndustry ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(industryForm),
      });

      if (res.ok) {
        toast.success(editingIndustry ? "Industry updated!" : "Industry added!");
        setIsIndustryDialogOpen(false);
        setEditingIndustry(null);
        setIndustryForm({ name: "", slug: "", icon: "Landmark" });
        fetchIndustries();
      } else {
        toast.error("Failed to save industry");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditIndustry = (industry: Industry) => {
    setEditingIndustry(industry);
    setIndustryForm({
      name: industry.name,
      slug: industry.slug,
      icon: industry.icon,
    });
    setIsIndustryDialogOpen(true);
  };

  const handleDeleteIndustry = async (id: string) => {
    if (!confirm("Delete this industry? All its solutions will also be deleted.")) return;

    try {
      const res = await fetch(`/api/admin/solutions/industries/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Industry deleted!");
        fetchIndustries();
      } else {
        toast.error("Failed to delete industry");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  // Solution handlers
  const handleSolutionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingSolution
        ? `/api/admin/solutions/${editingSolution.id}`
        : "/api/admin/solutions";
      const method = editingSolution ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(solutionForm),
      });

      if (res.ok) {
        toast.success(editingSolution ? "Solution updated!" : "Solution added!");
        setIsSolutionDialogOpen(false);
        setEditingSolution(null);
        setSolutionForm({ title: "", description: "", icon: "Lightbulb", industryId: "" });
        fetchIndustries();
      } else {
        toast.error("Failed to save solution");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditSolution = (solution: Solution) => {
    setEditingSolution(solution);
    setSolutionForm({
      title: solution.title,
      description: solution.description,
      icon: solution.icon,
      industryId: solution.industryId,
    });
    setIsSolutionDialogOpen(true);
  };

  const handleDeleteSolution = async (id: string) => {
    if (!confirm("Delete this solution?")) return;

    try {
      const res = await fetch(`/api/admin/solutions/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Solution deleted!");
        fetchIndustries();
      } else {
        toast.error("Failed to delete solution");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const openNewSolutionDialog = (industryId: string) => {
    setEditingSolution(null);
    setSolutionForm({ title: "", description: "", icon: "Lightbulb", industryId });
    setIsSolutionDialogOpen(true);
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const totalSolutions = industries.reduce((acc, ind) => acc + ind.solutions.length, 0);

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="ml-64">
        <AdminHeader
          title="Solutions Management"
          description="Manage industry solutions displayed on the Solutions page"
        />

        <main className="p-6">
          {/* Stats & Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 text-sm text-slate-600">
              <span>{industries.length} industries</span>
              <span>•</span>
              <span>{totalSolutions} solutions</span>
            </div>
            <Dialog open={isIndustryDialogOpen} onOpenChange={setIsIndustryDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingIndustry(null);
                    setIndustryForm({ name: "", slug: "", icon: "Landmark" });
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Industry
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {editingIndustry ? "Edit Industry" : "Add Industry"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleIndustrySubmit} className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Name *</label>
                    <Input
                      value={industryForm.name}
                      onChange={(e) => setIndustryForm({ ...industryForm, name: e.target.value })}
                      placeholder="Banking & Finance"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Slug *</label>
                    <Input
                      value={industryForm.slug}
                      onChange={(e) => setIndustryForm({ ...industryForm, slug: e.target.value })}
                      placeholder="banking"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Icon</label>
                    <Select
                      value={industryForm.icon}
                      onValueChange={(val) => setIndustryForm({ ...industryForm, icon: val })}
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
                    <Button type="button" variant="outline" onClick={() => setIsIndustryDialogOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={isSaving}>
                      {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingIndustry ? "Update" : "Add"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Industries & Solutions */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : industries.length === 0 ? (
            <Card className="p-12 text-center">
              <Building className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 mb-4">No industries configured yet</p>
              <Button
                onClick={() => setIsIndustryDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Industry
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {industries.map((industry) => (
                <Card key={industry.id} className="p-4">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Lightbulb className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{industry.name}</h3>
                        <p className="text-xs text-slate-500">
                          {industry.solutions.length} solution{industry.solutions.length !== 1 ? "s" : ""} • /{industry.slug}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => openNewSolutionDialog(industry.id)}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Solution
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditIndustry(industry)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteIndustry(industry.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {industry.solutions.length === 0 ? (
                    <p className="text-sm text-slate-400 italic py-4 text-center">
                      No solutions yet. Add one to get started.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {industry.solutions.map((solution) => (
                        <div
                          key={solution.id}
                          className="p-3 rounded-lg border bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm text-slate-900">{solution.title}</h4>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleEditSolution(solution)}>
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteSolution(solution.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{solution.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Solution Dialog */}
          <Dialog open={isSolutionDialogOpen} onOpenChange={setIsSolutionDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  {editingSolution ? "Edit Solution" : "Add Solution"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSolutionSubmit} className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Industry *</label>
                  <Select
                    value={solutionForm.industryId}
                    onValueChange={(val) => setSolutionForm({ ...solutionForm, industryId: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind.id} value={ind.id}>{ind.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Title *</label>
                  <Input
                    value={solutionForm.title}
                    onChange={(e) => setSolutionForm({ ...solutionForm, title: e.target.value })}
                    placeholder="Merchant Onboarding"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Description *</label>
                  <Textarea
                    value={solutionForm.description}
                    onChange={(e) => setSolutionForm({ ...solutionForm, description: e.target.value })}
                    placeholder="Describe the solution..."
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Icon</label>
                  <Select
                    value={solutionForm.icon}
                    onValueChange={(val) => setSolutionForm({ ...solutionForm, icon: val })}
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
                  <Button type="button" variant="outline" onClick={() => setIsSolutionDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingSolution ? "Update" : "Add"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
