"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Trash2, Loader2, Image as ImageIcon, Copy, Check, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  alt?: string;
  category?: string;
  createdAt: string;
}

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "logo", label: "Logos" },
  { value: "team", label: "Team Photos" },
  { value: "hero", label: "Hero Images" },
  { value: "screenshot", label: "Screenshots" },
  { value: "technology", label: "Technology" },
  { value: "video", label: "Videos" },
  { value: "other", label: "Other" },
];

export default function MediaLibraryPage() {
  const { status } = useSession();
  const router = useRouter();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setMedia(data);
      }
    } catch (error) {
      console.error("Failed to fetch media:", error);
      toast.error("Failed to load media library");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success(`${files.length} file(s) uploaded!`);
        fetchMedia();
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to upload files");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("File deleted!");
        setSelectedMedia(null);
        fetchMedia();
      } else {
        toast.error("Failed to delete file");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const copyToClipboard = (path: string, id: string) => {
    navigator.clipboard.writeText(path);
    setCopiedId(id);
    toast.success("Path copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const isImage = (mimeType: string) => mimeType.startsWith("image/");

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
          title="Media Library"
          description="Upload and manage images for your website"
        />

        <main className="p-6">
          {/* Usage Info */}
          <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">How to Use Uploaded Images</h3>
            <p className="text-sm text-blue-800 mb-2">
              After uploading, copy the image path and use it in:
            </p>
            <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
              <li><strong>Team Members</strong> - Paste the path in the &quot;Image URL&quot; field</li>
              <li><strong>Settings &gt; Branding</strong> - Use for Logo, Favicon, or OG Image</li>
              <li><strong>Page Content</strong> - Add to JSON content for custom images</li>
              <li><strong>Pricing Plans</strong> - Use in features or specs if needed</li>
            </ul>
            <p className="text-xs text-blue-600 mt-2">
              Example: Copy path like <code className="bg-blue-100 px-1 rounded">/uploads/my-image.png</code> and paste where needed
            </p>
          </Card>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 flex gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search files..."
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/*,video/*,.pdf"
                multiple
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-4 text-sm text-slate-600">
            {filteredMedia.length} file{filteredMedia.length !== 1 ? "s" : ""}
            {searchQuery || categoryFilter !== "all" ? " (filtered)" : ""}
          </div>

          {/* Media Grid */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : filteredMedia.length === 0 ? (
            <Card className="p-12 text-center">
              <ImageIcon className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 mb-4">
                {searchQuery || categoryFilter !== "all"
                  ? "No files match your search"
                  : "No media files yet"}
              </p>
              {!searchQuery && categoryFilter === "all" && (
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Your First File
                </Button>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredMedia.map((item) => (
                <Card
                  key={item.id}
                  className="group cursor-pointer overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
                  onClick={() => setSelectedMedia(item)}
                >
                  <div className="aspect-square relative bg-slate-100">
                    {isImage(item.mimeType) ? (
                      <Image
                        src={item.path}
                        alt={item.alt || item.originalName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-slate-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-medium">View Details</span>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-slate-700 truncate font-medium">{item.originalName}</p>
                    <p className="text-xs text-slate-400">{formatFileSize(item.size)}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Media Detail Dialog */}
          <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Media Details</DialogTitle>
              </DialogHeader>
              {selectedMedia && (
                <div className="space-y-4">
                  <div className="aspect-video relative bg-slate-100 rounded-lg overflow-hidden">
                    {isImage(selectedMedia.mimeType) ? (
                      <Image
                        src={selectedMedia.path}
                        alt={selectedMedia.alt || selectedMedia.originalName}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-slate-300" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Filename:</span>
                      <span className="text-slate-900 font-medium">{selectedMedia.originalName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Type:</span>
                      <span className="text-slate-900">{selectedMedia.mimeType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Size:</span>
                      <span className="text-slate-900">{formatFileSize(selectedMedia.size)}</span>
                    </div>
                    {selectedMedia.category && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Category:</span>
                        <span className="text-slate-900 capitalize">{selectedMedia.category}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <code className="flex-1 text-xs text-slate-600 truncate">{selectedMedia.path}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(selectedMedia.path, selectedMedia.id)}
                    >
                      {copiedId === selectedMedia.id ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedMedia(null)}
                      className="flex-1"
                    >
                      Close
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(selectedMedia.id)}
                      className="flex-1"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
