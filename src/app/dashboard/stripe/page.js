import { Button } from "@/components/ui/button";

export default async function IndexPage({ searchParams }) {
  const { canceled } = await searchParams;

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and checkout when you’re ready."
    );
  }
  return (
    <form action="/api/checkout_sessions" method="POST">
      <section className="container flex flex-col justify-around align-center w-full mx-auto min-h-screen">
        
          {/* <div>Details: </div> */}
          <div>
            <Button type="submit" role="link">
              Checkout
            </Button>
          </div>
        
      </section>
    </form>
  );
}
