export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
