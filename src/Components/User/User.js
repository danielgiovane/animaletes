import React from "react";
import { Route, Routes } from "react-router-dom";
import Feed from "../Feed/Feed";
import UserHeader from "./UserHeader";
import UserPhotoPosts from "./UserPhotoPosts";
import UserStatics from "./UserStatics";

const User = () => {
  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="postar" element={<UserPhotoPosts />} />
        <Route path="estasticas" element={<UserStatics />} />
      </Routes>
    </section>
  );
};

export default User;
