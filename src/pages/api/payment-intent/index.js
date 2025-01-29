import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: "2023-10-16",
});

 export default async function POST(req,res) {

  const {data}  = await req.body;
  const  amount  = Number(data.amount * 100).toFixed(2);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency: "CAD",
    });

    res.status(200).json({data: paymentIntent.client_secret })
 
  } catch (error) {
    res.status(400).json({error})
  }
}
