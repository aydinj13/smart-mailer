import { Bot } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200/20 flex justify-between items-center py-4 px-6 md:px-12">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            SmartMailer
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/send"
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Try Demo
          </Link>
          <Link
            href="/dashboard/send"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all hover:shadow-lg hover:shadow-blue-500/25"
          >
            Get Started
          </Link>
        </div>
      </nav>
    )
}
