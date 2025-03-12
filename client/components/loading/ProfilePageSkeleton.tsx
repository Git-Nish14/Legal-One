const ProfilePageSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen flex bg-gray-100 ml-10 relative animate-pulse">
            {/* Back Button Skeleton */}
            <div className="absolute top-6 right-10 flex items-center gap-2 bg-gray-300 px-4 py-2 rounded-md shadow">
                <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                <div className="w-16 h-5 bg-gray-400 rounded"></div>
            </div>

            {/* Left Section - Image Placeholder */}
            <div className="w-1/3 bg-gray-300 flex justify-center items-center p-10 rounded-2xl">
                <div className="w-64 h-64 bg-gray-400 rounded-full border-8 border-white shadow-lg"></div>
            </div>

            {/* Right Section - Lawyer Details Skeleton */}
            <div className="w-2/3 p-16 bg-white shadow-md flex flex-col justify-center">
                {/* Name Placeholder */}
                <div className="w-2/3 h-10 bg-gray-400 rounded"></div>

                {/* Expertise Placeholder */}
                <div className="w-1/3 h-6 bg-gray-300 rounded mt-2"></div>

                {/* Lawyer Information Skeleton */}
                <div className="mt-6 space-y-4 text-lg">
                    {Array(4)
                        .fill(0)
                        .map((_, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                                <div className="w-1/2 h-5 bg-gray-300 rounded"></div>
                            </div>
                        ))}
                </div>

                {/* Description Placeholder */}
                <div className="mt-6 space-y-2">
                    <div className="w-full h-5 bg-gray-300 rounded"></div>
                    <div className="w-4/5 h-5 bg-gray-300 rounded"></div>
                    <div className="w-3/5 h-5 bg-gray-300 rounded"></div>
                </div>

                {/* Book Session Button Skeleton */}
                <div className="mt-10 w-1/3 h-12 bg-gray-400 rounded-md"></div>
            </div>
        </div>
    );
};

export default ProfilePageSkeleton;
