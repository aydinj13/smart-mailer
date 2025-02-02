"use client";
import { useState } from 'react';
import { UserButton } from "@clerk/nextjs";
import { MessageSquare, FileText, BarChart2, Settings, HelpCircle, Bot, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Sidebar from '@/components/Sidebar';

export default function DashboardPage() {

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <UserButton afterSignOutUrl="/" />
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Emails Sent</CardTitle>
                <MessageSquare className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold blur-sm">158</div>
                <p className="text-xs text-gray-500"><span className="blur-sm">+12%</span> from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <BarChart2 className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold blur-sm">98.5%</div>
                <p className="text-xs text-gray-500"><span className="blur-sm">+2%</span> from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Templates Used</CardTitle>
                <FileText className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold blur-sm">12</div>
                <p className="text-xs text-gray-500"><span className="blur-sm">+4</span> new this month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Emails</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">Meeting Invitation</p>
                        <p className="text-sm text-gray-500">to: john@example.com</p>
                      </div>
                      <Badge>Sent</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Meeting Request', 'Follow Up', 'Thank You'].map((template) => (
                    <div key={template} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">{template}</p>
                        <p className="text-sm text-gray-500">Used 24 times</p>
                      </div>
                      <Button variant="outline" size="sm">Use</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}