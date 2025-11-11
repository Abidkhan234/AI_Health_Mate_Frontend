import React from "react";
import { Home, Search } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-white animate-pulse">404</h1>
        </div>

        {/* Friendly Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            We searched everywhere, but couldn't find the page you're looking
            for. It might have been moved or doesn't exist anymore.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-4 mb-8">
          <div
            className="w-3 h-3 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-gray-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
            to={`/`}
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Helpful Suggestions */}
        <div className="mt-12 p-6 bg-gray-900 rounded-xl border border-gray-800">
          <h3 className="font-semibold text-white mb-3">
            Helpful suggestions:
          </h3>
          <ul className="text-gray-400 space-y-2">
            <li>• Check the URL for typos</li>
            <li>• Use the search feature to find what you need</li>
            <li>• Visit our homepage to explore</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
