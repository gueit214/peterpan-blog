import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyProfile from "../components/profile/MyProfile";

const Profile = () => {
  const { myNickname } = useParams();
  const [profile, setProfile] = useState(null);
  const searchMyProfile = useCallback(async () => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://peterpan-blog-default-rtdb.firebaseio.com/profile.json"
      );
      return response.json();
    };
    try {
      const profiles = await sendRequest();
      const profile = Object.values(profiles).find(
        (profile) => profile.nickname === myNickname
      );
      const myProfile = Object.values(profile)[0];
      setProfile({
        id: myProfile.id,
        name: myProfile.name,
        nickname: myProfile.nickname,
        number: myProfile.number,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    searchMyProfile();
  }, [searchMyProfile]);
  console.log(profile);
  return (
    <div className="Profile">
      <MyProfile profile={profile} />
    </div>
  );
};

export default Profile;
