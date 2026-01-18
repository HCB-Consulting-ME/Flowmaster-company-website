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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Globe, Mail, Image as ImageIcon, Building } from "lucide-react";
import toast from "react-hot-toast";

interface SiteSettings {
  companyName: string;
  copyrightYear: string;
  contactEmail: string;
  careersEmail: string;
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  ogImage: string;
  favicon: string;
  logoImage: string;
}

export default function SettingsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>({
    companyName: "",
    copyrightYear: "",
    contactEmail: "",
    careersEmail: "",
    siteTitle: "",
    siteDescription: "",
    siteUrl: "",
    ogImage: "",
    favicon: "",
    logoImage: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success("Settings saved successfully!");
      } else {
        toast.error("Failed to save settings");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
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
          title="Site Settings"
          description="Manage global website settings and SEO"
        />

        <main className="p-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="bg-white border">
                  <TabsTrigger value="general" className="data-[state=active]:bg-blue-50">
                    <Building className="h-4 w-4 mr-2" />
                    General
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="data-[state=active]:bg-blue-50">
                    <Globe className="h-4 w-4 mr-2" />
                    SEO
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="data-[state=active]:bg-blue-50">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </TabsTrigger>
                  <TabsTrigger value="branding" className="data-[state=active]:bg-blue-50">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Branding
                  </TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">General Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Company Name</label>
                        <Input
                          value={settings.companyName}
                          onChange={(e) =>
                            setSettings({ ...settings, companyName: e.target.value })
                          }
                          placeholder="FlowMaster FZC LLC"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Copyright Year</label>
                        <Input
                          value={settings.copyrightYear}
                          onChange={(e) =>
                            setSettings({ ...settings, copyrightYear: e.target.value })
                          }
                          placeholder="2026"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Site URL</label>
                        <Input
                          value={settings.siteUrl}
                          onChange={(e) =>
                            setSettings({ ...settings, siteUrl: e.target.value })
                          }
                          placeholder="https://flow-master.ai"
                        />
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* SEO Tab */}
                <TabsContent value="seo">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Site Title</label>
                        <Input
                          value={settings.siteTitle}
                          onChange={(e) =>
                            setSettings({ ...settings, siteTitle: e.target.value })
                          }
                          placeholder="FlowMaster | Enterprise-Ready AI Agents"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Displayed in browser tabs and search results
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">
                          Site Description
                        </label>
                        <Textarea
                          value={settings.siteDescription}
                          onChange={(e) =>
                            setSettings({ ...settings, siteDescription: e.target.value })
                          }
                          placeholder="The Platform for Enterprise-Ready AI Agents."
                          rows={3}
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Used for search engine results and social sharing
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">
                          Open Graph Image
                        </label>
                        <Input
                          value={settings.ogImage}
                          onChange={(e) =>
                            setSettings({ ...settings, ogImage: e.target.value })
                          }
                          placeholder="/Logo/image.png"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Image shown when sharing links on social media (1200x630 recommended)
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Contact Tab */}
                <TabsContent value="contact">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">
                          Contact Email
                        </label>
                        <Input
                          type="email"
                          value={settings.contactEmail}
                          onChange={(e) =>
                            setSettings({ ...settings, contactEmail: e.target.value })
                          }
                          placeholder="contact@flow-master.ai"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Where contact form submissions are sent
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">
                          Careers Email
                        </label>
                        <Input
                          type="email"
                          value={settings.careersEmail}
                          onChange={(e) =>
                            setSettings({ ...settings, careersEmail: e.target.value })
                          }
                          placeholder="careers@flow-master.ai"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Where job applications are sent
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Branding Tab */}
                <TabsContent value="branding">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Branding Assets</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Logo Image</label>
                        <Input
                          value={settings.logoImage}
                          onChange={(e) =>
                            setSettings({ ...settings, logoImage: e.target.value })
                          }
                          placeholder="/Logo/newLogo.png"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Main logo displayed in navbar
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Favicon</label>
                        <Input
                          value={settings.favicon}
                          onChange={(e) =>
                            setSettings({ ...settings, favicon: e.target.value })
                          }
                          placeholder="/Logo/logoicon2.png"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Small icon shown in browser tabs
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Save Button */}
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
