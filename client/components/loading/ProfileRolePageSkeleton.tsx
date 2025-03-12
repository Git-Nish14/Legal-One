const ProfileRolePageSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-6 animate-pulse">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-6">
                {/* Title Skeleton */}
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                    <div className="w-32 h-8 bg-gray-300 rounded"></div>
                </div>

                {/* Email Skeleton */}
                <div className="flex items-center gap-2 mt-4">
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                    <div className="w-48 h-6 bg-gray-300 rounded"></div>
                </div>

                {/* Role Skeleton */}
                <div className="flex items-center gap-2 mt-2">
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                    <div className="w-32 h-6 bg-gray-300 rounded"></div>
                </div>

                {/* Form Skeleton (For Lawyers Only) */}
                <div className="mt-6 space-y-4">
                    {Array(7)
                        .fill(0)
                        .map((_, index) => (
                            <div key={index} className="flex flex-col space-y-2">
                                <div className="w-1/3 h-5 bg-gray-300 rounded"></div>
                                <div className="w-full h-10 bg-gray-300 rounded"></div>
                            </div>
                        ))}
                </div>

                {/* Submit Button Skeleton */}
                <div className="mt-6 w-full h-12 bg-gray-400 rounded-lg"></div>
            </div>
        </div>
    );
};

export default ProfileRolePageSkeleton;
