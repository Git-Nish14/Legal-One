const SessionsPageSkeleton: React.FC = () => {
    return (
        <div className="container mx-auto p-6 animate-pulse">
            {/* Page Title Skeleton */}
            <div className="w-64 h-8 bg-gray-300 rounded mx-auto mb-6"></div>

            {/* Grid Layout for Session Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg border p-5 flex flex-col h-[280px] w-full max-w-sm animate-pulse"
                        >
                            {/* Title Placeholder */}
                            <div className="w-3/4 h-6 bg-gray-300 rounded"></div>

                            {/* Description Placeholder */}
                            <div className="w-full h-4 bg-gray-300 rounded mt-2"></div>
                            <div className="w-2/3 h-4 bg-gray-300 rounded mt-1"></div>

                            {/* Session Info */}
                            <div className="mt-4 space-y-2">
                                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                                <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
                                <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
                            </div>

                            {/* User & Lawyer Placeholder */}
                            <div className="flex items-center gap-3 mt-4">
                                <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                                <div>
                                    <div className="w-24 h-5 bg-gray-300 rounded"></div>
                                    <div className="w-16 h-4 bg-gray-300 rounded mt-1"></div>
                                </div>
                            </div>

                            {/* Buttons Placeholder */}
                            <div className="mt-auto space-y-2">
                                <div className="w-full h-10 bg-gray-400 rounded"></div>
                                <div className="w-full h-10 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SessionsPageSkeleton;
