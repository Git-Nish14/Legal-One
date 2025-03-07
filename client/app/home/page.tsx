"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "@/graphql/queries";
import UserMain from "@/components/user/UserMain";
import LawyerMain from "@/components/lawyer/LawyerMain";
import AdminMain from "@/components/admin/AdminMain";

const HomePage = () => {
  const { data, loading, error } = useQuery(GET_DATA);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const userData = data?.getData;

  if (!userData) return <div>No data available</div>;

  if (userData.role === "USER") {
    return <UserMain />;
  } else if (userData.role === "LAWYER") {
    return <LawyerMain />;
  } else if (userData.role === "ADMIN") {
    return <AdminMain />;
  } else {
    return <div>Unauthorized</div>;
  }
};

export default HomePage;
