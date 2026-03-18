import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "DevTogather Job Portal - Information",
  description:
    "Learn more about DevTogather, the premier job platform for tech professionals.",
};

const JobPortalInfo = () => {
  return (
    <div className="min-h-screen">
      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need for Your Tech Career
          </h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Discover powerful features designed to make job hunting effortless
            and effective.
          </p>
        </div>
        <div className=" flex items-center md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <Card className="group hover:shadow-xl transition-all border-2 hover:border-blue-500/50">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors mb-4">
                <Users size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl mb-3">For Job Seekers</CardTitle>
              <CardDescription className="mb-6">
                Personalized job recommendations, easy applications, profile
                optimization, and career resources tailored for developers.
              </CardDescription>
              <Link href="/account">
                <Button
                  variant="default"
                  className="w-full group-hover:bg-blue-500 group-hover:text-white transition-colors"
                >
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all border-2 hover:border-blue-500/50 bg-t">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors mb-4">
                <Building2 size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl mb-3">For Companies</CardTitle>
              <CardDescription className="mb-6">
                Post jobs instantly, access top tech talent, advanced filtering,
                and analytics to build your dream team efficiently.
              </CardDescription>
              <Link href="/account">
                <Button
                  variant="default"
                  className="w-full group-hover:bg-green-500 group-hover:text-white transition-colors"
                >
                  Post a Job
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Ready to Launch Your Tech Career? Join{" "}
              <span className="text-blue-500">
                Dev<span className="text-red-500">Together</span>
              </span>{" "}
              Today!
            </h2>
            <p className="text-lg md:text-xl opacity-90">
              Thousands of tech professionals trust DevTogather to find their
              next big opportunity. Start your journey now and connect with the
              best companies in tech.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobPortalInfo;
