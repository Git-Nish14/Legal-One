export default function SidebarSkeleton() {
    return (
        <div className="w-72 h-full bg-gray-900 bg-opacity-75 backdrop-blur-lg text-white p-6 flex flex-col justify-between shadow-xl rounded-r-2xl">
            <div>
                {/* User Greeting Skeleton */}
                <div className="mb-6 text-center">
                    <div className="w-24 h-5 bg-gray-700 rounded mx-auto animate-pulse"></div>
                    <div className="w-32 h-6 bg-gray-600 rounded mx-auto mt-2 animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-700 rounded mx-auto mt-1 animate-pulse"></div>
                </div>

                {/* Navigation Links Skeleton */}
                <ul className="space-y-3">
                    {[1, 2, 3, 4].map((index) => (
                        <li key={index}>
                            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-700 animate-pulse">
                                <div className="w-5 h-5 bg-gray-600 rounded"></div>
                                <div className="w-24 h-4 bg-gray-600 rounded"></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Logout Button Skeleton */}
            <div className="mt-6 w-full h-12 bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
    );
}
