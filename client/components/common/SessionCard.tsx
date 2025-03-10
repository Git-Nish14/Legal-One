import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Lawyer {
  name: string;
  image: string;
  expertise: string;
}

interface Session {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  lawyerCompleted: boolean;
  userCompleted: boolean;
  lawyer: Lawyer;
}

interface SessionCardProps {
  session: Session;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border p-4 max-w-sm">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{session.title}</h2>
        <p className="text-gray-600 text-sm mt-1">{session.description}</p>
        <p className="text-gray-500 text-xs mt-1">
          Created: {new Date(session.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Lawyer Completed: {session.lawyerCompleted ? "Yes" : "No"}
        </p>
        <p className="text-gray-500 text-xs">
          User Completed: {session.userCompleted ? "Yes" : "No"}
        </p>
        <div className="flex items-center mt-4">
          <Image
            src={session.lawyer.image}
            alt={session.lawyer.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-gray-900 font-semibold">{session.lawyer.name}</p>
            <p className="text-gray-500 text-xs">{session.lawyer.expertise}</p>
          </div>
        </div>
        <Link href={`/home/explore/session/${session.id}`} passHref>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SessionCard;
