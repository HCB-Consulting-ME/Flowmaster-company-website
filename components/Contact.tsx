'use client'
import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
export default function Contact() {
    const router = useRouter()
    return (
        <div>
            <button
                className="bg-navy-900 dark:bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-2xl hover:scale-105 transition-transform"
                onClick={() => router.push("/contact-us")}
            >
                <MessageCircle className="h-5 w-5" />
                <span className="font-bold">Let&apos;s Talk</span>
            </button>
        </div>
    )
}