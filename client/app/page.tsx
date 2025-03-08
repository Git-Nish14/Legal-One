import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="bg-white shadow-lg py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-4xl font-extrabold text-indigo-500">Legal One</h1>
          <div className="space-x-6 flex">
            <Link
              href="/signin"
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-600 transition duration-300"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center h-screen text-center p-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
        <div className="max-w-3xl">
          <h2 className="text-6xl font-extrabold leading-tight drop-shadow-lg">
            Simplifying Legal Solutions
          </h2>
          <p className="mt-6 text-lg max-w-xl mx-auto drop-shadow-md">
            Your trusted platform for legal services, connecting users with
            professional lawyers seamlessly.
          </p>
          <div className="mt-8">
            <Link
              href="/signup"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Footer */}
      <footer className="bg-gray-200 shadow-lg py-6 text-center mt-10">
        <p className="text-gray-700 font-medium">
          &copy; {new Date().getFullYear()} Legal One. All rights reserved by
          <span className="font-bold text-indigo-500"> Team Techifive.</span>
        </p>
      </footer>
    </div>
  );
}