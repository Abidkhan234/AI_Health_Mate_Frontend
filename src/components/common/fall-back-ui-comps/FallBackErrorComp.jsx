import React from "react";
import { AlertCircle, RefreshCw, Home, Mail } from "lucide-react";
import { Link } from "react-router";

const FallBackErrorComp = ({ error, resetError }) => {
  const handleRefresh = () => {
    if (resetError) {
      resetError();
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="relative mb-8 inline-block">
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
          <AlertCircle className="w-24 h-24 text-red-500 relative animate-pulse" />
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Something went wrong
          </h1>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            We encountered an unexpected error. Don't worry, our team has been
            notified and we're working on it.
          </p>
        </div>

        {/* Error Details (Optional) */}
        {error && (
          <div className="mb-8 p-4 bg-gray-900 border border-gray-800 rounded-lg max-w-lg mx-auto">
            <p className="text-sm text-gray-500 font-mono text-left break-all">
              {error.message || "An unexpected error occurred"}
            </p>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="flex justify-center gap-4 mb-8">
          <div
            className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={handleRefresh}
            className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>

          <Link
            to={"/"}
            className="flex items-center gap-2 bg-transparent text-gray-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 hover:text-white transform hover:scale-105 transition-all duration-200 border border-gray-800"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-12 p-6 bg-gray-900 rounded-xl border border-gray-800">
          <h3 className="font-semibold text-white mb-3">Need help?</h3>
          <p className="text-gray-400 mb-4">
            If this problem persists, please contact our support team
          </p>
          <button className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
            <Mail className="w-4 h-4" />
            <span className="text-sm">support@example.com</span>
          </button>
        </div>

        {/* Error ID (Optional) */}
        <div className="mt-6">
          <p className="text-xs text-gray-600">
            Error ID: {Math.random().toString(36).substring(2, 15)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FallBackErrorComp;
