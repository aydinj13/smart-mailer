"use client"

import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function PricingGrids() {
    const router = useRouter()

return (

<div className="max-w-md mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 md:max-w-2xl gap-8 lg:max-w-4xl">
<div className="ring-1 ring-gray-200 p-8 h-fit pb-12 rounded-3xl">
    <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-gray-300">
        Starter Plan
    </h3>
    <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
        Explore Core Features at No Cost
    </p>
    <p className="mt-6 flex items-baseline gap-x-1">
      <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
        Free
      </span>
    </p>

    <ul
      role="list"
      className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300"
      >
        <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-blue-600" />2 Emails
        </li>
        <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-blue-600" />AI Chat Functionality
        </li>
        <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-blue-600" />Basic AI Creative Writing
        </li>
        <li className="flex gap-x-3 text-gray-400">
            <XIcon className="h-6 w-5 flex-none text-gray-400" />Custom Domains
        </li>
        <li className="flex gap-x-3 text-gray-400">
            <XIcon className="h-6 w-5 flex-none text-gray-400" />Schedule Sending
        </li>
        <li className="flex gap-x-3 text-gray-400">
            <XIcon className="h-6 w-5 flex-none text-gray-400" />Advanced Analytics
        </li>
        <li className="flex gap-x-3 text-gray-400">
            <XIcon className="h-6 w-5 flex-none text-gray-400" />Custom Formatting
        </li>
      </ul>
</div>

<div className="ring-2 ring-blue-600 rounded-3xl p-8">
  <h3 className="text-lg font-semibold leading-8 text-blue-600">
    Pro Plan
  </h3>
  <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-white">
    Maximize Productivity with PRO Features
  </p>
  <p className="mt-6 flex items-baseline gap-x-1">
    <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-blue-600">
        $9.99
    </span>
    <span className="text-sm font-semibold leading-6 text-gray-900 dark:text-blue-600">
        / month
    </span>
  </p>
  <Button className="bg-blue-600 w-full text-white shadow-sm hover:bg-blue-500 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onClick={() => router.push("/dashboard/upgrade")}>
                    Go to Pricing
                  </Button>
   <h3 className="text-md font-semibold leading-8 text-black-600 mt-5">
    Everything in Starter, plus:
  </h3>

  <ul
      role="list"
      className="mt-5 space-y-3 text-sm leading-6 text-gray-600 dark:text-white"
      >
        <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-blue-600" />Unlimited Emails & Messages
        </li>
        <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-blue-600" />Advanced Creative Writing
        </li>
        <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-blue-600" />Custom Email Domains
        </li>
        <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-blue-600" />Scheduled Sending
        </li>
        <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-blue-600" />Advanced Analytics
        </li>
        <li className="flex gap-x-3">
            <CheckIcon className="h-6 w-5 flex-none text-blue-600" />Custom Formatting
        </li>

        
      </ul>
</div>
</div>

)
}