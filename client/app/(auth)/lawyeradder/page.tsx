"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LAWYER_SIGNUP } from "@/graphql/mutations";

const lawyersData = [
  {
    "name": "John Doe",
    "email": "john@gmail.com",
    "password": "123456",
    "image": "https://randomuser.me/api/portraits/men/1.jpg",
    "bio": "Experienced corporate lawyer with a decade of experience.",
    "description": "Specializes in mergers and acquisitions, corporate governance, and compliance.",
    "location": "New York, NY, USA",
    "expertise": "Corporate Law",
    "experience": 10,
    "fee": 250,
    "casesHandled": 150
  },
  {
    "name": "Jane Smith",
    "email": "jane@gmail.com",
    "password": "123456",
    "image": "https://randomuser.me/api/portraits/women/2.jpg",
    "bio": "Dedicated family law attorney with over a decade of experience.",
    "description": "Expert in divorce proceedings, child custody cases, and prenuptial agreements.",
    "location": "Los Angeles, CA, USA",
    "expertise": "Family Law",
    "experience": 12,
    "fee": 300,
    "casesHandled": 200
  },
  {
    "name": "Michael Johnson",
    "email": "michael@gmail.com",
    "password": "123456",
    "image": "https://randomuser.me/api/portraits/men/3.jpg",
    "bio": "Criminal defense attorney with a strong track record.",
    "description": "Specializes in defending clients against felony and misdemeanor charges.",
    "location": "Chicago, IL, USA",
    "expertise": "Criminal Law",
    "experience": 8,
    "fee": 275,
    "casesHandled": 180
  },
  {
    "name": "Emily Davis",
    "email": "emily@gmail.com",
    "password": "123456",
    "image": "https://randomuser.me/api/portraits/women/4.jpg",
    "bio": "Expert in intellectual property rights and trademark law.",
    "description": "Assists clients in protecting their intellectual property assets.",
    "location": "San Francisco, CA, USA",
    "expertise": "Intellectual Property Law",
    "experience": 15,
    "fee": 320,
    "casesHandled": 220
  },
  {
    "name": "William Brown",
    "email": "william@gmail.com",
    "password": "123456",
    "image": "https://randomuser.me/api/portraits/men/5.jpg",
    "bio": "Employment lawyer advocating for employee rights.",
    "description": "Handles cases related to workplace discrimination and wrongful termination.",
    "location": "Houston, TX, USA",
    "expertise": "Employment Law",
    "experience": 9,
    "fee": 260,
    "casesHandled": 140
  },
  {
    "name": "Sophia Anderson",
    "email": "sophia@gmail.com",
    "password": "123456",
    "image": "https://randomuser.me/api/portraits/women/8.jpg",
    "bio": "Experienced real estate attorney handling property transactions and disputes.",
    "description": "Specializes in property acquisitions, lease agreements, and land disputes.",
    "location": "Boston, MA, USA",
    "expertise": "Real Estate Law",
    "experience": 14,
    "fee": 280,
    "casesHandled": 190
  },
  {
    "name": "Daniel Carter",
    "email": "daniel@gmail.com",
    "password": "123456",
    "image": "https://randomuser.me/api/portraits/men/9.jpg",
    "bio": "Bankruptcy lawyer assisting clients with financial restructuring.",
    "description": "Helps businesses and individuals navigate debt relief and bankruptcy filings.",
    "location": "Seattle, WA, USA",
    "expertise": "Bankruptcy Law",
    "experience": 10,
    "fee": 270,
    "casesHandled": 175
  },
  {
    "name": "Emma Thomas",
    "email": "emma@gmail.com",
    "password": "123456",
    "image": "https://randomuser.me/api/portraits/women/10.jpg",
    "bio": "Attorney specializing in medical malpractice and patient rights.",
    "description": "Represents clients in cases against hospitals and healthcare providers.",
    "location": "Philadelphia, PA, USA",
    "expertise": "Medical Malpractice Law",
    "experience": 18,
    "fee": 350,
    "casesHandled": 230
  },
  {
    "name": "Benjamin White",
    "email": "benjamin@gmail.com",
    "password": "123456",
    "image": "https://randomuser.me/api/portraits/men/11.jpg",
    "bio": "Passionate civil rights lawyer advocating for justice.",
    "description": "Handles cases related to discrimination, wrongful imprisonment, and civil liberties.",
    "location": "Atlanta, GA, USA",
    "expertise": "Civil Rights Law",
    "experience": 16,
    "fee": 310,
    "casesHandled": 210
  },
  {
    name: "Oliver Martinez",
    email: "oliver@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    bio: "Expert in immigration law helping clients navigate complex legal processes.",
    description: "Specializes in visas, green cards, and deportation defense.",
    location: "Miami, FL, USA",
    expertise: "Immigration Law",
    experience: 11,
    fee: 310,
    casesHandled: 160,
  },
  {
    name: "Charlotte Wilson",
    email: "charlotte@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    bio: "Dedicated tax attorney with extensive experience in financial law.",
    description:
      "Provides legal advice on tax planning, audits, and dispute resolution.",
    location: "Dallas, TX, USA",
    expertise: "Tax Law",
    experience: 13,
    fee: 290,
    casesHandled: 180,
  },
  {
    name: "Lucas Harris",
    email: "lucas@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    bio: "Personal injury lawyer dedicated to getting justice for clients.",
    description:
      "Handles car accidents, workplace injuries, and medical malpractice cases.",
    location: "Las Vegas, NV, USA",
    expertise: "Personal Injury Law",
    experience: 9,
    fee: 260,
    casesHandled: 130,
  },
  {
    name: "Amelia Clark",
    email: "amelia@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    bio: "Corporate lawyer with a focus on business compliance and risk management.",
    description:
      "Assists companies with corporate structuring and regulatory compliance.",
    location: "San Diego, CA, USA",
    expertise: "Corporate Law",
    experience: 12,
    fee: 320,
    casesHandled: 210,
  },
  {
    name: "Henry Lewis",
    email: "henry@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
    bio: "Skilled criminal defense lawyer with years of courtroom experience.",
    description: "Defends clients against felony and misdemeanor charges.",
    location: "Phoenix, AZ, USA",
    expertise: "Criminal Law",
    experience: 14,
    fee: 300,
    casesHandled: 220,
  },
  {
    name: "Grace Allen",
    email: "grace@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    bio: "Experienced environmental lawyer advocating for sustainable legal solutions.",
    description:
      "Specializes in land use, conservation laws, and environmental litigation.",
    location: "Denver, CO, USA",
    expertise: "Environmental Law",
    experience: 10,
    fee: 270,
    casesHandled: 140,
  },
  {
    name: "Ethan Robinson",
    email: "ethan@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    bio: "Real estate attorney assisting clients with property transactions and disputes.",
    description:
      "Handles residential and commercial property agreements and disputes.",
    location: "Boston, MA, USA",
    expertise: "Real Estate Law",
    experience: 15,
    fee: 280,
    casesHandled: 190,
  },
  {
    name: "Lily King",
    email: "lily@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
    bio: "Elder law specialist focused on estate planning and guardianship.",
    description:
      "Advises clients on wills, trusts, and long-term care planning.",
    location: "Austin, TX, USA",
    expertise: "Elder Law",
    experience: 12,
    fee: 290,
    casesHandled: 175,
  },
  {
    name: "Nathan Wright",
    email: "nathan@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    bio: "Entertainment lawyer protecting artists and creators.",
    description:
      "Specializes in contract negotiations, intellectual property, and licensing.",
    location: "Nashville, TN, USA",
    expertise: "Entertainment Law",
    experience: 11,
    fee: 320,
    casesHandled: 160,
  },
  {
    name: "Hannah Scott",
    email: "hannah@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    bio: "Medical malpractice attorney ensuring justice for patients.",
    description:
      "Represents clients in lawsuits against hospitals and medical professionals.",
    location: "Philadelphia, PA, USA",
    expertise: "Medical Malpractice Law",
    experience: 18,
    fee: 350,
    casesHandled: 230,
  },
  {
    name: "Samuel Young",
    email: "samuel@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "International lawyer advising on global legal matters.",
    description:
      "Specializes in international trade, human rights, and diplomatic law.",
    location: "Washington, D.C., USA",
    expertise: "International Law",
    experience: 17,
    fee: 340,
    casesHandled: 240,
  },
  {
    name: "Zoe Turner",
    email: "zoe@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    bio: "Family lawyer helping clients through legal challenges.",
    description: "Handles divorce, custody disputes, and adoption cases.",
    location: "Seattle, WA, USA",
    expertise: "Family Law",
    experience: 14,
    fee: 280,
    casesHandled: 170,
  },
  {
    name: "David Green",
    email: "david@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/men/24.jpg",
    bio: "Bankruptcy attorney guiding clients through financial distress.",
    description: "Specializes in Chapter 7 and Chapter 13 bankruptcy filings.",
    location: "San Francisco, CA, USA",
    expertise: "Bankruptcy Law",
    experience: 13,
    fee: 300,
    casesHandled: 190,
  },
  {
    name: "Isabella Baker",
    email: "isabella@gmail.com",
    password: "123456",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    bio: "Civil rights lawyer advocating for marginalized communities.",
    description:
      "Represents clients in discrimination and social justice cases.",
    location: "Atlanta, GA, USA",
    expertise: "Civil Rights Law",
    experience: 15,
    fee: 310,
    casesHandled: 210,
  },
];

const UploadLawyers = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);

  const [lawyerSignup] = useMutation(LAWYER_SIGNUP);

  const handleUpload = async () => {
    setUploading(true);
    setUploadedCount(0);

    for (const lawyer of lawyersData) {
      try {
        const response = await lawyerSignup({ variables: lawyer });
        if (response.data) {
          setUploadedCount((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error uploading:", lawyer.name, error);
      }
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Upload Lawyers Data</h1>
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg disabled:opacity-50"
        >
          {uploading
            ? `Uploading... (${uploadedCount}/${lawyersData.length})`
            : "Upload Lawyers"}
        </button>
      </div>
    </div>
  );
};

export default UploadLawyers;
