"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import BackButton from "@/components/ui/back-button";

export default function PaymentIncomplete() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-md">
      <Card className="border-red-100">
        <BackButton link="/dashboard" />
        <CardContent className="pt-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t process your payment for the Summer Camp 2025
            registration.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
            <h3 className="font-medium text-sm mb-2">Possible reasons:</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Temporary connection issue</li>
              <li>Insufficient funds</li>
              <li>Incorrect card information</li>
              <li>Card expired or declined</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
