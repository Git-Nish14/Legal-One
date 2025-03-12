const ChatPageSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col h-screen p-6 md:p-10 ml-10 animate-pulse">
            {/* Back Button Skeleton */}
            <div className="w-32 h-10 bg-gray-300 rounded-lg mb-4"></div>

            {/* Session Info Skeleton */}
            <div className="flex flex-col md:flex-row gap-10 flex-grow">
                {/* Left Section - User & Session Info Skeleton */}
                <div className="flex flex-col w-full md:w-1/2 space-y-6">
                    <div className="flex flex-col items-center">
                        <div className="w-40 h-40 bg-gray-300 rounded-full border border-gray-300 shadow-lg"></div>
                        <div className="w-32 h-6 bg-gray-400 rounded mt-4"></div>
                        <div className="w-24 h-5 bg-gray-300 rounded mt-2"></div>
                    </div>

                    <div>
                        <div className="w-3/4 h-8 bg-gray-400 rounded"></div>
                        <div className="w-full h-6 bg-gray-300 rounded mt-2"></div>
                        <div className="w-5/6 h-6 bg-gray-300 rounded mt-1"></div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="w-32 h-6 bg-gray-300 rounded"></div>
                        <div className="w-32 h-6 bg-gray-300 rounded"></div>
                    </div>

                    {/* Completion Button Skeleton */}
                    <div className="w-2/3 h-12 bg-gray-400 rounded-lg mt-6"></div>
                </div>

                {/* Right Section - Chatbox Skeleton */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <div className="w-full h-80 bg-gray-300 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};

export default ChatPageSkeleton;
