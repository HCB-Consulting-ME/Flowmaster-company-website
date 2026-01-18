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
import { Plus, Pencil, Trash2, MapPin, Building2, Loader2, GripVertical } from "lucide-react";
import toast from "react-hot-toast";

interface OfficeLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  isHeadquarters: boolean;
  isActive: boolean;
  order: number;
}

export default function LocationsManagementPage() {
  const { status } = useSession();
  const router = useRouter();
  const [locations, setLocations] = useState<OfficeLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<OfficeLocation | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
    address: "",
    latitude: "",
    longitude: "",
    phone: "",
    email: "",
    isHeadquarters: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [draggedItem, setDraggedItem] = useState<OfficeLocation | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await fetch("/api/admin/locations");
      if (res.ok) {
        const data = await res.json();
        setLocations(data);
      }
    } catch (error) {
      console.error("Failed to fetch locations:", error);
      toast.error("Failed to load locations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingLocation
        ? `/api/admin/locations/${editingLocation.id}`
        : "/api/admin/locations";
      const method = editingLocation ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingLocation ? "Location updated!" : "Location added!");
        setIsDialogOpen(false);
        setEditingLocation(null);
        setFormData({
          name: "",
          city: "",
          country: "",
          address: "",
          latitude: "",
          longitude: "",
          phone: "",
          email: "",
          isHeadquarters: false,
        });
        fetchLocations();
      } else {
        toast.error("Failed to save location");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (location: OfficeLocation) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      city: location.city,
      country: location.country,
      address: location.address || "",
      latitude: location.latitude?.toString() || "",
      longitude: location.longitude?.toString() || "",
      phone: location.phone || "",
      email: location.email || "",
      isHeadquarters: location.isHeadquarters,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this location?")) return;

    try {
      const res = await fetch(`/api/admin/locations/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Location deleted!");
        fetchLocations();
      } else {
        toast.error("Failed to delete location");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const openNewDialog = () => {
    setEditingLocation(null);
    setFormData({
      name: "",
      city: "",
      country: "",
      address: "",
      latitude: "",
      longitude: "",
      phone: "",
      email: "",
      isHeadquarters: false,
    });
    setIsDialogOpen(true);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, location: OfficeLocation) => {
    setDraggedItem(location);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = useCallback(async (e: React.DragEvent, targetLocation: OfficeLocation) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.id === targetLocation.id) {
      setDraggedItem(null);
      return;
    }

    const newLocations = [...locations];
    const draggedIndex = newLocations.findIndex(l => l.id === draggedItem.id);
    const targetIndex = newLocations.findIndex(l => l.id === targetLocation.id);

    // Remove dragged item and insert at target position
    newLocations.splice(draggedIndex, 1);
    newLocations.splice(targetIndex, 0, draggedItem);

    // Update local state immediately for better UX
    setLocations(newLocations);
    setDraggedItem(null);

    // Save new order to backend
    try {
      const orderedIds = newLocations.map(l => l.id);
      const res = await fetch("/api/admin/locations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });

      if (res.ok) {
        toast.success("Order updated!");
      } else {
        toast.error("Failed to update order");
        fetchLocations(); // Revert on error
      }
    } catch {
      toast.error("Failed to update order");
      fetchLocations(); // Revert on error
    }
  }, [draggedItem, locations]);

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
          title="Office Locations"
          description="Manage office locations displayed on the map. Drag to reorder."
        />

        <main className="p-6">
          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">
              {locations.length} location{locations.length !== 1 ? "s" : ""}
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNewDialog} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Location
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {editingLocation ? "Edit Location" : "Add Location"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Office Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Dubai Headquarters"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        City *
                      </label>
                      <Input
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        placeholder="Dubai"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Country *
                      </label>
                      <Input
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        placeholder="UAE"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Full Address
                    </label>
                    <Input
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="123 Business Bay, Dubai, UAE"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Latitude
                      </label>
                      <Input
                        type="number"
                        step="any"
                        value={formData.latitude}
                        onChange={(e) =>
                          setFormData({ ...formData, latitude: e.target.value })
                        }
                        placeholder="25.2048"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Longitude
                      </label>
                      <Input
                        type="number"
                        step="any"
                        value={formData.longitude}
                        onChange={(e) =>
                          setFormData({ ...formData, longitude: e.target.value })
                        }
                        placeholder="55.2708"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Phone
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+971 4 123 4567"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="dubai@flow-master.ai"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isHeadquarters"
                      checked={formData.isHeadquarters}
                      onChange={(e) =>
                        setFormData({ ...formData, isHeadquarters: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    <label htmlFor="isHeadquarters" className="text-sm text-slate-700">
                      This is the headquarters
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
                      ) : editingLocation ? (
                        "Update"
                      ) : (
                        "Add Location"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Locations List */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : locations.length === 0 ? (
            <Card className="p-12 text-center">
              <MapPin className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 mb-4">No office locations yet</p>
              <Button onClick={openNewDialog} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Location
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {locations.map((location) => (
                <Card
                  key={location.id}
                  className={`p-4 transition-all ${
                    draggedItem?.id === location.id ? "opacity-50 scale-95" : ""
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, location)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, location)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-center gap-4">
                    <GripVertical className="h-5 w-5 text-slate-400 cursor-grab active:cursor-grabbing" />

                    <div className="p-2 bg-blue-50 rounded-lg">
                      {location.isHeadquarters ? (
                        <Building2 className="h-6 w-6 text-blue-600" />
                      ) : (
                        <MapPin className="h-6 w-6 text-blue-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">
                          {location.name}
                        </h3>
                        {location.isHeadquarters && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                            HQ
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            location.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {location.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">
                        {location.city}, {location.country}
                      </p>
                      {location.address && (
                        <p className="text-xs text-slate-400 mt-1">
                          {location.address}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {(location.phone || location.email) && (
                        <div className="text-xs text-slate-400 text-right mr-4">
                          {location.phone && <p>{location.phone}</p>}
                          {location.email && <p>{location.email}</p>}
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(location)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(location.id)}
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
