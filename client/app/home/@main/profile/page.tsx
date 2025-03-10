"use client";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

export const GET_DATA = gql`
  query getdata {
    getData {
      ... on User {
        id
        name
        email
        role
      }
      ... on Lawyer {
        id
        name
        email
        role
        fee
        experience
        expertise
        casesHandled
        approvalStatus
        location
        bio
        description
      }
      ... on Admin {
        id
        name
        email
        role
      }
    }
  }
`;

export const UPDATE_LAWYER_PROFILE = gql`
  mutation UPDATE_LAWYER_PROFILE(
    $fee: Float
    $experience: Float
    $expertise: String
    $location: String
    $bio: String
    $description: String
    $casesHandled: Float
  ) {
    updateLawyerProfile(
      fee: $fee
      experience: $experience
      expertise: $expertise
      location: $location
      bio: $bio
      description: $description
      casesHandled: $casesHandled
    ) {
      id
      name
      fee
      experience
      expertise
      location
      bio
      description
      casesHandled
      updatedAt
    }
  }
`;

const ProfilePage = () => {
  const { data, loading, error } = useQuery(GET_DATA);
  const [updateProfile] = useMutation(UPDATE_LAWYER_PROFILE);

  const user = data?.getData;

  const [profileData, setProfileData] = useState({
    fee: user?.fee || "",
    experience: user?.experience || "",
    expertise: user?.expertise || "",
    location: user?.location || "",
    bio: user?.bio || "",
    description: user?.description || "",
    casesHandled: user?.casesHandled || "",
  });

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  if (!user) return <p className="text-center text-gray-500">No data found</p>;

  const handleUpdate = async () => {
    try {
      await updateProfile({
        variables: {
          fee: parseFloat(profileData.fee),
          experience: parseFloat(profileData.experience),
          expertise: profileData.expertise,
          location: profileData.location,
          bio: profileData.bio,
          description: profileData.description,
          casesHandled: parseFloat(profileData.casesHandled),
        },
      });
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="text-gray-700">Name: {user.name}</p>
      <p className="text-gray-700">Email: {user.email}</p>
      <p className="text-gray-700">Role: {user.role}</p>

      {user.role === "LAWYER" && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Update Profile</h2>
          <div className="grid grid-cols-1 gap-4">
            {Object.keys(profileData).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key}
                value={profileData[key as keyof typeof profileData]}
                onChange={(e) =>
                  setProfileData({ ...profileData, [key]: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-lg"
              />
            ))}
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
