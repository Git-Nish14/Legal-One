const CreateSessionPageSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row ml-0 md:ml-10 p-4 md:p-10 relative animate-pulse">
            {/* Left Section - Lawyer Image Placeholder */}
            <div className="w-full md:w-1/3 bg-gray-300 flex justify-center items-center p-6 md:p-10 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                <div className="w-40 h-40 md:w-64 md:h-64 bg-gray-400 rounded-full border-8 border-white shadow-lg"></div>
            </div>

            {/* Right Section - Form Skeleton */}
            <div className="w-full md:w-2/3 p-6 md:p-16 bg-white shadow-md flex flex-col justify-center relative rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
                {/* Back Button Skeleton - Only visible on md+ */}
                <div className="hidden md:flex absolute top-6 right-6 items-center gap-2 bg-gray-300 px-4 py-2 rounded-md shadow">
                    <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                    <div className="w-16 h-5 bg-gray-400 rounded"></div>
                </div>

                {/* Title Skeleton */}
                <div className="w-2/3 h-10 bg-gray-400 rounded mx-auto"></div>
                <div className="w-1/3 h-6 bg-gray-300 rounded mx-auto mt-2"></div>

                {/* Form Skeleton */}
                <div className="mt-6 space-y-6">
                    <div>
                        <div className="w-1/3 h-5 bg-gray-300 rounded mb-2"></div>
                        <div className="w-full h-12 bg-gray-300 rounded"></div>
                    </div>

                    <div>
                        <div className="w-1/3 h-5 bg-gray-300 rounded mb-2"></div>
                        <div className="w-full h-24 bg-gray-300 rounded"></div>
                    </div>

                    <div className="w-full h-12 bg-gray-400 rounded-md"></div>
                </div>
            </div>
        </div>
    );
};

export default CreateSessionPageSkeleton;
