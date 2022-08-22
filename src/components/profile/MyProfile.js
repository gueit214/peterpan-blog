import React from "react";
import ProfileForm from "../UI/ProfileForm";

const MyProfile = (props) => {
  return (
    <div className="MyProfile">
      {/* <section className="title">{props.profile.name}</section> */}

      <ProfileForm />
    </div>
  );
};

export default MyProfile;
