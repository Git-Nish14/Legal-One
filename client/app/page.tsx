"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, MessageSquare, CreditCard } from "lucide-react";
import { JSX } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Navbar */}
      <nav className="bg-black shadow-lg py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-500">
            Legal One
          </h1>
          <div className="space-x-4 md:space-x-6 flex">
            <Link
              href="/signin"
              className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-600 transition duration-300"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-700 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 h-[90vh] sm:h-[50vh] md:h-[65vh] lg:h-screen">
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-md opacity-80"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <motion.div
          className="relative max-w-3xl text-white z-10 px-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-lg">
            Empowering Justice, Simplifying Legal Solutions
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base max-w-lg mx-auto drop-shadow-md">
            A trusted platform for connecting users with professional legal
            experts effortlessly.
          </p>
          <motion.div
            className="mt-4 sm:mt-5"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/signup"
              className="bg-yellow-500 text-black px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-600 transition duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </header>

      {/* More Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto text-center px-6">
          <h3 className="text-4xl font-bold text-yellow-500 mb-8">
            Why Choose Legal One?
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            Experience seamless legal consultations with top-rated
            professionals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShieldCheck size={50} className="text-yellow-500" />}
              title="Verified Lawyers"
              description="Connect with experienced legal professionals across multiple fields."
            />
            <FeatureCard
              icon={<MessageSquare size={50} className="text-yellow-500" />}
              title="Seamless Communication"
              description="Chat, call, or video conference with your lawyer directly on our platform."
            />
            <FeatureCard
              icon={<CreditCard size={50} className="text-yellow-500" />}
              title="Secure Payments"
              description="Transparent and secure transactions ensuring peace of mind."
            />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto text-center px-6">
          <h3 className="text-4xl font-bold text-yellow-500 mb-8">
            What Our Users Say
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            Hear from real clients and legal professionals who trust Legal One.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ReviewCard
              name="John Doe"
              role="Client"
              review="Legal One made it so easy to find a lawyer. The entire process was seamless, and I got my issue resolved quickly!"
              photo="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <ReviewCard
              name="Sarah Johnson"
              role="Lawyer"
              review="As a lawyer, I love how the platform connects me with clients efficiently. The communication tools are top-notch."
              photo="https://randomuser.me/api/portraits/women/45.jpg"
            />
            <ReviewCard
              name="Michael Smith"
              role="Client"
              review="A fantastic service! The secure payment system and lawyer verification gave me confidence in my legal consultation."
              photo="https://randomuser.me/api/portraits/men/58.jpg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black shadow-lg py-6 text-center mt-0">
        <p className="text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} Legal One. All rights reserved by{" "}
          <Link
            href="https://www.nishpatel.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-yellow-500 hover:underline ml-1"
          >
            Nish Patel
          </Link>{" "}
          and{" "}
          <Link
            href="https://om.techifive.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-yellow-500 hover:underline ml-1"
          >
            Om Patel
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
}) {
  return (
    <motion.div
      className="bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
      whileHover={{ scale: 1.05 }}
    >
      {icon}
      <h4 className="text-2xl font-semibold text-yellow-500 mt-4">{title}</h4>
      <p className="text-gray-400 mt-2">{description}</p>
    </motion.div>
  );
}

function ReviewCard({
  name,
  role,
  review,
  photo,
}: {
  name: string;
  role: string;
  review: string;
  photo: string;
}) {
  return (
    <motion.div
      className="bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center"
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={photo}
        alt={name}
        className="w-20 h-20 mx-auto rounded-full border-4 border-yellow-500"
      />
      <p className="text-gray-300 italic mt-4">"{review}"</p>
      <h5 className="text-xl font-semibold text-yellow-500 mt-4">{name}</h5>
      <p className="text-gray-400">{role}</p>
    </motion.div>
  );
}
