"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "@/graphql/queries";
import UserMain from "@/components/user/main";
import LawyerMain from "@/components/lawyer/main";

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
  } else {
    return <div>Unauthorized</div>;
  }
};

export default HomePage;
