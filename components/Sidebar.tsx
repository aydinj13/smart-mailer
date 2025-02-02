import { Bot, FileText, Home, MessageSquare, BarChart2, Settings, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const routes = [
        {
            label: 'Dashboard',
            icon: Home,
            href: '/dashboard',
            color: 'text-gray-400'
        },
        {
            label: 'Send Email',
            icon: MessageSquare,
            href: '/dashboard/send',
            color: 'text-gray-400'
        },
        {
            label: 'Templates',
            icon: FileText,
            href: '/dashboard/templates',
            color: 'text-gray-400',
            pro: true
        },
        {
            label: 'Statistics',
            icon: BarChart2,
            href: '/dashboard/stats',
            color: 'text-gray-400',
            pro: true
        },
        {
            label: 'Settings',
            icon: Settings,
            href: '/dashboard/settings',
            color: 'text-gray-400'
        },
        {
            label: 'Updates & FAQ',
            icon: HelpCircle,
            href: '/dashboard/help',
            color: 'text-gray-400'
        }
    ];

    return (
        <div className="w-64 bg-[#1C1C1C] h-screen flex flex-col">
            <div 
                className="p-4 flex items-center space-x-2 cursor-pointer" 
                onClick={() => router.push('/dashboard')}
            >
                <div className="h-8 w-8 bg-blue-700 rounded-lg flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="text-white font-semibold">SmartMailer</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {routes.map((route) => (
                    <Button
                        key={route.href}
                        variant="ghost"
                        className={`w-full justify-start ${route.color} ${
                            pathname === route.href ? 'bg-white/10' : ''
                        }`}
                        onClick={() => router.push(route.href)}
                    >
                        <route.icon className="mr-2 h-5 w-5" />
                        {route.label}
                        {route.pro && (
                            <Badge variant="secondary" className="ml-auto">
                                PRO
                            </Badge>
                        )}
                    </Button>
                ))}
            </nav>

            <div className="p-4">
                <div className="bg-gradient-to-br from-blue-700 to-indigo-700 rounded-lg p-4 text-white">
                    <h3 className="font-semibold mb-2">Pro Plan</h3>
                    <p className="text-sm mb-4">Send unlimited smart emails and view analytics</p>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">$10/mo</span>
                        <Button 
                            size="sm" 
                            variant="secondary" 
                            className="bg-white text-black hover:bg-gray-200"
                            onClick={() => router.push('/pricing')}
                        >
                            Get
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}