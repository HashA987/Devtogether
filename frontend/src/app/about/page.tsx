import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
const About = () => {
  return (
    <div className="min-h-screen">
      {/* Mission part */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Image */}
          <div className="flex justify-center mb-8">
            <img
              src="/jobs.jpg"
              alt="about page photo"
              className="w-full  rounded-2xl shadow-lg"
            />
          </div>
          {/* content */}
          <div className="text-center space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Our Mission is to Connect Developers with Opportunities,
              Empowering Careers and
            </h1>
            <p className="text-lg md:text-xl leading-relaxed opacity-90 max-w-3xl mx-auto">
              At{" "}
              <span className="text-blue-500">
                Dev<span className="text-red-500">Together</span>
              </span>
              , we are dedicated to connecting talented developers with exciting
              job opportunities. Our mission is to empower developers to find
              their ideal careers and help companies discover the best tech
              talent. We believe in fostering a vibrant community where
              developers can thrive, learn, and grow together. Join us on this
              journey to create a more connected and inclusive tech industry.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold ">
              Ready to Find Your Dream Job? Explore Opportunities with our
              website
              <span className="text-blue-500 mx-4">
                Dev<span className="text-red-500">Together</span>{" "}
              </span>
            </h2>
            <p className="text-lg md:text-xl opca">
              Whether you're a seasoned developer or just starting your tech
              career, DevTogather is here to help you find the perfect job.
              Explore our curated job listings, connect with top companies, and
              take the next step in your career journey. Your dream job is just
              a click away!
            </p>
            <div className="pt-4">
              <Link href="/jobs">
                <Button size="lg" className="gap-2 h-12 px-8 text-base">
                  Explore Jobs
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
