const ChatboxSkeleton: React.FC = () => {
    return (
        <div className="w-96 h-[500px] flex flex-col border rounded-md bg-gray-100 shadow-md animate-pulse">
            {/* Chat Header Skeleton */}
            <div className="bg-gray-300 h-10 rounded-t-md"></div>

            {/* Messages Container Skeleton */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-200">
                {Array(4)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-lg max-w-xs h-6 bg-gray-300 w-3/4 ${index % 2 === 0 ? "ml-auto rounded-br-none" : "mr-auto rounded-bl-none"
                                }`}
                            style={{ maxWidth: "80%" }}
                        ></div>
                    ))}
            </div>

            {/* Input Box Skeleton */}
            <div className="flex items-center gap-2 p-3 bg-white border-t rounded-b-md">
                <div className="w-full h-10 bg-gray-300 rounded-full"></div>
                <div className="w-16 h-10 bg-gray-400 rounded-full"></div>
            </div>
        </div>
    );
};

export default ChatboxSkeleton;
