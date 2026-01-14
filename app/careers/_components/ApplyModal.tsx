import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useState } from "react";
interface Job {
    title: string;
    dept: string;
    location: string;
    description: string;
    scope: string[];
    skills: string[];
}

interface ApplyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    job: Job | null;
}
export const ApplyModal = ({ open, onOpenChange, job }: ApplyModalProps) => {
    const [loading, setLoading] = useState(false);

    if (!job) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            formData.append('jobTitle', job.title); // Add job title to the payload

            const res = await fetch('/api/apply-now', {
                method: 'POST',
                body: formData, // Send as FormData, not JSON
            });

            if (res.ok) {
                toast.success("Application sent successfully!");
                onOpenChange(false);
            } else {
                toast.error("Something went wrong.");
            }
        } catch (error) {
            toast.error("Failed to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                {/* ... Header and Job Info remains the same ... */}
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground">{job.title}</DialogTitle>
                    <DialogDescription className="text-base text-slate-500">
                        {job.dept} • {job.location}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* ... (About, Scope, Skills sections) ... */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-2">About the Role</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {job.description}
                        </p>
                    </div>

                    {/* Scope */}
                    {job.scope && (
                        <div>
                            <h4 className="font-semibold text-foreground mb-2">Scope & Responsibilities</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                {job.scope.map((item, i) => (
                                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400">{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Skills */}
                    {job.skills && (
                        <div>
                            <h4 className="font-semibold text-foreground mb-2">Required Skills</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                {job.skills.map((item, i) => (
                                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400">{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="border-t border-border my-6"></div>


                    <div className="border-t border-border my-6"></div>

                    <div>
                        <h3 className="text-xl font-bold text-foreground mb-4">Apply for this position</h3>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
                                    <Input name="name" placeholder="John Doe" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address <span className="text-red-500">*</span></label>
                                    <Input name="email" type="email" placeholder="john@example.com" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phone Number <span className="text-red-500">*</span></label>
                                <Input name="phone" type="tel" placeholder="+92 300 1234567" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Upload CV / Resume <span className="text-red-500">*</span></label>
                                <Input name="cv" type="file" accept=".pdf,.doc,.docx" required className="cursor-pointer" />
                                <p className="text-xs text-slate-500">PDF, DOC, DOCX up to 10MB</p>
                            </div>

                            <div className="pt-4">
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold h-12"
                                >
                                    {loading ? "Sending..." : "Submit Application"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
