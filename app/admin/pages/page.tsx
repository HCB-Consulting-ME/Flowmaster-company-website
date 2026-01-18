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
import { Plus, Pencil, Trash2, Loader2, FileText } from "lucide-react";
import toast from "react-hot-toast";

interface PageContent {
  id: string;
  pageSlug: string;
  heroTitle: string;
  heroSubtitle: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
}

const PREDEFINED_SLUGS = [
  { slug: "home", name: "Home Page", icon: "🏠" },
  { slug: "platform", name: "Platform Page", icon: "🔧" },
  { slug: "pricing", name: "Pricing Page", icon: "💰" },
  { slug: "solutions", name: "Solutions Page", icon: "💡" },
  { slug: "careers", name: "Careers Page", icon: "💼" },
  { slug: "company", name: "Company Page", icon: "🏢" },
  { slug: "partners", name: "Partners Page", icon: "🤝" },
  { slug: "contact", name: "Contact Page", icon: "📧" },
];

export default function PagesManagementPage() {
  const { status } = useSession();
  const router = useRouter();
  const [pages, setPages] = useState<PageContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [formData, setFormData] = useState({
    pageSlug: "",
    heroTitle: "",
    heroSubtitle: "",
    content: "{}",
    metaTitle: "",
    metaDescription: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isCustomSlug, setIsCustomSlug] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch("/api/admin/pages");
      if (res.ok) {
        const data = await res.json();
        setPages(data);
      }
    } catch (error) {
      console.error("Failed to fetch pages:", error);
      toast.error("Failed to load pages");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingPage
        ? `/api/admin/pages/${editingPage.id}`
        : "/api/admin/pages";
      const method = editingPage ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingPage ? "Page updated!" : "Page created!");
        setIsDialogOpen(false);
        setEditingPage(null);
        setFormData({
          pageSlug: "",
          heroTitle: "",
          heroSubtitle: "",
          content: "{}",
          metaTitle: "",
          metaDescription: "",
        });
        setIsCustomSlug(false);
        fetchPages();
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to save page");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (page: PageContent) => {
    setEditingPage(page);
    setFormData({
      pageSlug: page.pageSlug,
      heroTitle: page.heroTitle,
      heroSubtitle: page.heroSubtitle,
      content: page.content,
      metaTitle: page.metaTitle || "",
      metaDescription: page.metaDescription || "",
    });
    // Check if it's a custom slug
    const isPredefined = PREDEFINED_SLUGS.some(p => p.slug === page.pageSlug);
    setIsCustomSlug(!isPredefined);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string, pageSlug: string) => {
    // Don't allow deleting predefined pages
    const isPredefined = PREDEFINED_SLUGS.some(p => p.slug === pageSlug);
    if (isPredefined) {
      toast.error("Cannot delete predefined pages. You can only edit them.");
      return;
    }

    if (!confirm("Are you sure you want to delete this page?")) return;

    try {
      const res = await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Page deleted!");
        fetchPages();
      } else {
        toast.error("Failed to delete page");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const openNewDialog = () => {
    setEditingPage(null);
    setFormData({
      pageSlug: "",
      heroTitle: "",
      heroSubtitle: "",
      content: "{}",
      metaTitle: "",
      metaDescription: "",
    });
    setIsCustomSlug(false);
    setIsDialogOpen(true);
  };

  const getPageInfo = (slug: string) => {
    return PREDEFINED_SLUGS.find((p) => p.slug === slug) || { name: slug, icon: "📄" };
  };

  // Get available predefined slugs that don't have content yet
  const availablePredefinedSlugs = PREDEFINED_SLUGS.filter(
    (ps) => !pages.some((p) => p.pageSlug === ps.slug)
  );

  // Get custom pages (not in predefined list)
  const customPages = pages.filter(
    (p) => !PREDEFINED_SLUGS.some((ps) => ps.slug === p.pageSlug)
  );

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
          title="Pages Management"
          description="Manage page content, hero sections, and SEO settings"
        />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">
              {pages.length} page{pages.length !== 1 ? "s" : ""} configured
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNewDialog} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Page
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {editingPage ? "Edit Page" : "Add New Page"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  {/* Page Slug Selection */}
                  {!editingPage && (
                    <div>
                      <label className="text-sm font-medium text-slate-700">Page Type *</label>
                      <Select
                        value={isCustomSlug ? "custom" : formData.pageSlug}
                        onValueChange={(val) => {
                          if (val === "custom") {
                            setIsCustomSlug(true);
                            setFormData({ ...formData, pageSlug: "" });
                          } else {
                            setIsCustomSlug(false);
                            setFormData({ ...formData, pageSlug: val });
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select page type" />
                        </SelectTrigger>
                        <SelectContent>
                          {availablePredefinedSlugs.map((ps) => (
                            <SelectItem key={ps.slug} value={ps.slug}>
                              {ps.icon} {ps.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">📝 Custom Page</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Custom Slug Input */}
                  {isCustomSlug && !editingPage && (
                    <div>
                      <label className="text-sm font-medium text-slate-700">Page Slug *</label>
                      <Input
                        value={formData.pageSlug}
                        onChange={(e) => setFormData({ ...formData, pageSlug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                        placeholder="my-custom-page"
                        required
                      />
                      <p className="text-xs text-slate-500 mt-1">URL will be: /{formData.pageSlug || "my-custom-page"}</p>
                    </div>
                  )}

                  {editingPage && (
                    <div>
                      <label className="text-sm font-medium text-slate-700">Page</label>
                      <Input value={getPageInfo(formData.pageSlug).name} disabled />
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-slate-700">Hero Title *</label>
                    <Input
                      value={formData.heroTitle}
                      onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                      placeholder="Main headline for the page"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Hero Subtitle *</label>
                    <Textarea
                      value={formData.heroSubtitle}
                      onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                      placeholder="Supporting text below the headline"
                      rows={2}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Additional Content (JSON)</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder='{"key": "value"}'
                      rows={3}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-slate-500 mt-1">Page-specific content in JSON format</p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-slate-700 mb-3">SEO Settings</p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-500">Meta Title</label>
                        <Input
                          value={formData.metaTitle}
                          onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                          placeholder="Page title for search engines"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500">Meta Description</label>
                        <Textarea
                          value={formData.metaDescription}
                          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                          placeholder="Brief description for search engines"
                          rows={2}
                        />
                      </div>
                    </div>
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
                      disabled={isSaving || (!editingPage && !formData.pageSlug)}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : editingPage ? (
                        "Update Page"
                      ) : (
                        "Create Page"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Predefined Pages */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Standard Pages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PREDEFINED_SLUGS.map((pageInfo) => {
                    const existingPage = pages.find((p) => p.pageSlug === pageInfo.slug);
                    return (
                      <Card key={pageInfo.slug} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{pageInfo.icon}</span>
                            <div>
                              <h3 className="font-semibold text-slate-900">{pageInfo.name}</h3>
                              <p className="text-xs text-slate-500">/{pageInfo.slug}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (existingPage) {
                                handleEdit(existingPage);
                              } else {
                                setEditingPage(null);
                                setIsCustomSlug(false);
                                setFormData({
                                  pageSlug: pageInfo.slug,
                                  heroTitle: "",
                                  heroSubtitle: "",
                                  content: "{}",
                                  metaTitle: "",
                                  metaDescription: "",
                                });
                                setIsDialogOpen(true);
                              }
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                        {existingPage ? (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-sm text-slate-700 font-medium truncate">
                              {existingPage.heroTitle || "No title set"}
                            </p>
                            <p className="text-xs text-slate-500 truncate mt-1">
                              {existingPage.heroSubtitle || "No subtitle set"}
                            </p>
                            <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                              Configured
                            </span>
                          </div>
                        ) : (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-sm text-slate-400 italic">Not configured</p>
                            <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-500">
                              Default
                            </span>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Custom Pages */}
              {customPages.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Custom Pages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {customPages.map((page) => (
                      <Card key={page.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">📄</span>
                            <div>
                              <h3 className="font-semibold text-slate-900">{page.heroTitle || page.pageSlug}</h3>
                              <p className="text-xs text-slate-500">/{page.pageSlug}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(page)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(page.id, page.pageSlug)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm text-slate-700 font-medium truncate">
                            {page.heroTitle || "No title set"}
                          </p>
                          <p className="text-xs text-slate-500 truncate mt-1">
                            {page.heroSubtitle || "No subtitle set"}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
