import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Lawyer {
    id: string;
    name: string;
    image: string;
    expertise: string;
    location: string;
}

interface LawyerCardProps {
    lawyer: Lawyer;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border p-4 max-w-sm">
            <Image
                src={lawyer.image}
                alt={lawyer.name}
                width={100}
                height={100}
                className="w-full h-48 object-cover rounded-md"
            />
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900">{lawyer.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{lawyer.expertise}</p>
                <p className="text-gray-500 text-xs mt-1">📍 {lawyer.location}</p>
                <Link href={`/home/explore/lawyer/${lawyer.id}`} passHref>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">View Profile</button>
                </Link>
            </div>
        </div>
    );
};

export default LawyerCard;
