//this is creating the Stripe instance using the stripe secret key
//helpful to keep it server side and import this file to make creating new instances easier
import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)