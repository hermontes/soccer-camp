import { redirect } from 'next/navigation'

import { stripe } from '@/lib/stripe'
import { toast } from 'sonner'
import PaymentIncomplete from '../failure/page'
export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    redirect("/dashboard/stripe/failure")
    // return  <PaymentIncomplete error='Please provide a valid session_id (`cs_test_...`)'></PaymentIncomplete>
    // paymentIncomplete()
    
  }

  const {
    status,
    customer,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent', 'customer']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}. If you have any questions, please email{' '}
        </p>
        {console.log("cus ID:", customer.id)}
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </section>
    )
  }
}

