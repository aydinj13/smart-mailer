"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Send, Mail, MessageSquare, Bot } from "lucide-react";
import PricingGrids from "@/components/PricingGrids";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Navigation - Added glassmorphism */}
<Navbar />

      {/* Hero Section - Enhanced with gradients */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        <div className="absolute -top-24 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute top-32 -left-12 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                className="inline-block mb-2 px-4 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-medium">
                  AI-Powered Email Assistant
                </span>
              </motion.div>
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-transparent bg-clip-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Send Emails with AI Assistance
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Experience the future of email communication with our AI-powered
                chatbot. Simply describe what you want to say, and let AI handle
                the rest.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href="/chat"
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#features"
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors hover:bg-white/50 backdrop-blur-sm"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>

            {/* Chat Preview - Enhanced with glassmorphism */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-6 relative z-10 border border-gray-200/20">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-1.5">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    AI Assistant
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gray-100/70 backdrop-blur-sm rounded-2xl p-4 max-w-[80%]">
                      <p className="text-gray-700">
                        Can you help me draft an email to schedule a meeting with
                        the team?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 max-w-[80%]">
                      <p className="text-white">
                        I'll help you compose a professional email for your team
                        meeting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-10 blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section - Added cards with hover effects */}
      <section id="features" className="py-20 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-transparent bg-clip-text mb-12">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon={<MessageSquare className="h-6 w-6 text-blue-600" />}
              title="Natural Conversations"
              description="Chat naturally with our AI to compose emails. No complex commands needed."
            />
            <Feature
              icon={<Mail className="h-6 w-6 text-blue-600" />}
              title="Smart Email Composition"
              description="Let AI help you write professional and engaging emails in seconds."
            />
            <Feature
              icon={<Send className="h-6 w-6 text-blue-600" />}
              title="Instant Delivery"
              description="Send emails directly through the chat interface with instant delivery."
            />
          </div>
        </div>
      </section>

      <PricingGrids />


      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-6 md:px-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Email Communication?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who are already experiencing the future of
            email composition.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Using SmartMailer
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Bot className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">
                SmartMailer
              </span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500">
            © {new Date().getFullYear()} SmartMailer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
    );
  }
  
  // Enhanced Feature component with hover effects
  function Feature({ icon, title, description }) {
    return (
      <div className="group p-6 rounded-xl bg-white/50 hover:bg-gradient-to-r from-blue-50 to-purple-50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 border border-gray-200/50">
        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }