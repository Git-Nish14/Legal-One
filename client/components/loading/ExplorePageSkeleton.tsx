const ExplorePageSkeleton: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8 ml-10 animate-pulse">
            {/* Header Section with Search Bar Skeleton */}
            <div className="flex items-center justify-between mb-6">
                <div className="w-64 h-8 bg-gray-300 rounded"></div>
                <div className="w-80 h-10 bg-gray-300 rounded"></div>
            </div>

            {/* Loading Skeletons for Lawyer Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(8)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden border p-5 w-full max-w-sm flex flex-col h-full animate-pulse"
                        >
                            {/* Image Skeleton */}
                            <div className="w-full h-52 bg-gray-300 rounded-lg"></div>

                            <div className="flex flex-col flex-grow p-5 text-center">
                                {/* Name Skeleton */}
                                <div className="w-32 h-6 bg-gray-300 rounded mx-auto"></div>

                                {/* Expertise Skeleton */}
                                <div className="flex items-center justify-center mt-2 space-x-2">
                                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                                    <div className="w-24 h-4 bg-gray-300 rounded"></div>
                                </div>

                                {/* Location Skeleton */}
                                <div className="flex items-center justify-center mt-1 space-x-2">
                                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                                </div>

                                {/* Bio Skeleton */}
                                <div className="mt-3 space-y-2 px-2">
                                    <div className="w-full h-4 bg-gray-300 rounded"></div>
                                    <div className="w-4/5 h-4 bg-gray-300 rounded"></div>
                                    <div className="w-3/5 h-4 bg-gray-300 rounded"></div>
                                </div>

                                {/* Button Skeleton */}
                                <div className="mt-auto pt-4">
                                    <div className="w-full h-10 bg-gray-300 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ExplorePageSkeleton;
