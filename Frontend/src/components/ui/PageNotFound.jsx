import React from "react";
import { Link } from "react-router-dom";

// General 404 Page Not Found component
// Usage: <NotFound404 />

export default function PageNotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <h1 className="text-7xl font-extrabold text-gray-900">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-600 max-w-md">
        The page you're looking for doesn’t exist or may have been moved.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-blue-600 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Go to Home
        </Link>

        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none"
        >
          Contact Support
        </Link>
      </div>

      <footer className="mt-10 text-sm text-gray-400">
        © {new Date().getFullYear()} PlantVerse. All rights reserved.
      </footer>
    </main>
  );
}
