import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Gavel, MapPin } from "lucide-react";

interface Lawyer {
  id: string;
  name: string;
  image: string;
  expertise: string;
  location: string;
  bio: string;
}

interface LawyerCardProps {
  lawyer: Lawyer;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border p-5 w-full max-w-sm flex flex-col h-full transition-transform transform hover:scale-105">
      <div className="relative w-full h-52">
        <Image
          src={lawyer.image}
          alt={lawyer.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col flex-grow p-5 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">{lawyer.name}</h2>
        <div className="flex items-center justify-center text-gray-600 text-sm mt-2 font-medium gap-2">
          <Gavel className="text-blue-600 w-5 h-5" />
          <span>{lawyer.expertise}</span>
        </div>
        <div className="flex items-center justify-center text-gray-500 text-xs mt-1 gap-2">
          <MapPin className="text-red-500 w-5 h-5" />
          <span>{lawyer.location}</span>
        </div>
        <p className="text-gray-700 text-sm mt-3 line-clamp-3 px-2 flex-grow">
          {lawyer.bio}
        </p>
        <div className="mt-auto pt-4">
          <Link href={`/home/explore/lawyer/${lawyer.id}`} passHref>
            <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl hover:bg-blue-500 transition shadow-md font-semibold">
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
