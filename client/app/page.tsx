import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-extrabold text-indigo-400">Legal One</h1>
          <div className="space-x-6 hidden md:flex">
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Services
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contact
            </Link>
            <Link
              href="/signin"
              className="bg-indigo-400 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center h-screen text-center p-6 bg-gradient-to-r from-gray-300 to-blue-400 text-white">
        <div>
          <h2 className="text-5xl font-extrabold leading-tight">
            Simplifying Legal Solutions
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto">
            Your trusted platform for legal services, connecting users with
            professional lawyers seamlessly.
          </p>
          <div className="mt-6 flex space-x-4">
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
            <Link
              href="#services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </header>

      {/* Footer */}
      <footer className="bg-gray-100 shadow-md py-6 text-center mt-10">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Legal One. All rights reserved by
          Team Techifive.
        </p>
      </footer>
    </div>
  );
}
