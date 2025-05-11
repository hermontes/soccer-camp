"use client";
import Navigation from "@/components/ui/navigation/Navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Trophy, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-10 md:py-24 lg:py-32 bg-[#4CAF50] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Summer Soccer Camp 2025
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl">
                Join our premier soccer camp for kids ages 7-16. Develop skills,
                make friends, and have fun!
              </p>
            </div>
            <div className="space-x-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#4CAF50] hover:bg-gray-100"
              >
                <Link href="/signup">
                  Register Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 lg:gap-12 gap-6">
            <Card>
              <div className="flex md:flex-row md:gap-0 md:justify-between flex-col lg:flex-col">
                <div className="md:w-1/2 lg:w-full">
                  <CardHeader>
                    <Calendar className="h-10 w-10 text-[#4CAF50] mb-2" />
                    <CardTitle className="text-2xl">Camp Dates</CardTitle>
                    <CardDescription>
                      Multiple sessions available
                    </CardDescription>
                  </CardHeader>
                </div>
                <div className="md:w-1/2 lg:w-full">
                  <CardContent>
                    <ul className="py-5 space-y-2">
                      <li>Session 1: June 10-21, 2025</li>
                      <li>Session 2: July 8-19, 2025</li>
                      <li>Session 3: August 5-16, 2025</li>
                    </ul>
                  </CardContent>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex md:flex-row md:gap-0 md:justify-between flex-col lg:flex-col">
                <div className="md:w-1/2 lg:w-full">
                  <CardHeader>
                    <MapPin className="h-10 w-10 text-[#4CAF50] mb-2" />
                    <CardTitle className="text-2xl">Location</CardTitle>
                    <CardDescription>Premier soccer facilities</CardDescription>
                  </CardHeader>
                </div>
                <div className="md:w-1/2 lg:w-full">
                  <CardContent className="py-5 space-y-2">
                    <p>Greenfield Soccer Complex</p>
                    <p>123 Sports Avenue</p>
                    <p>Soccerville, CA 90210</p>
                  </CardContent>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex md:flex-row md:gap-0 md:justify-between flex-col lg:flex-col">
                <div className="md:w-1/2 lg:w-full">
                  <CardHeader>
                    <Trophy className="h-10 w-10 text-[#4CAF50] mb-2" />
                    <CardTitle className="text-2xl">
                      Program Highlights
                    </CardTitle>
                    <CardDescription>
                      What makes our camp special
                    </CardDescription>
                  </CardHeader>
                </div>
                <div className="md:w-1/2 lg:w-full">
                  <CardContent className="py-5 space-y-2">
                    <ul className="list-disc pl-5">
                      <li>Professional coaching staff</li>
                      <li>Small group training sessions</li>
                      <li>Daily scrimmages and tournaments</li>
                      <li>Camp t-shirt and soccer ball included</li>
                    </ul>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container  mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Age Groups
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer specialized training for different age groups and skill
                levels
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {[
              {
                name: "Junior Kickers",
                ages: "7-9 years",
                description: "Focus on fundamental skills and fun games",
              },
              {
                name: "Rising Stars",
                ages: "10-12 years",
                description: "Developing technical skills and basic tactics",
              },
              {
                name: "Elite Squad",
                ages: "13-16 years",
                description: "Advanced training and competitive play",
              },
            ].map((group) => (
              <Card key={group.name}>
                <CardHeader>
                  <Users className="h-8 w-8 text-[#4CAF50] mb-2" />
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>Ages: {group.ages}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{group.description}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-[#4CAF50] hover:bg-[#3e8e41]"
                  >
                    <Link href="/register">Register for this Group</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#4CAF50] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Join?
              </h2>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl">
                Spots fill up quickly! Register today to secure your place in
                our summer soccer camp.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#4CAF50] hover:bg-gray-100"
              >
                <Link href="/signup">
                  Register Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
