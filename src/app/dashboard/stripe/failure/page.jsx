"use client"
import { toast } from "sonner"

export default function PaymentIncomplete({error}) {

  //have to fix this later
  return (<div className="w-full container flex items-center">{error ? toast({error}) : "There was no session with your payment, something went wrong"}</div>)
}

// stripeCustomerId String?
  // paid             Boolean?