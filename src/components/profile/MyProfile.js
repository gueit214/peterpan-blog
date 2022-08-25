import React, { useCallback, useEffect, useState } from "react";
import useFetch, {
  getProfileFetchFromAuth,
  getProfileFromDatabase,
} from "../../hooks/useFetch";
import AlertModal from "../UI/AlertModal";
import Loading from "../UI/Loading";
import ProfileForm from "./ProfileForm";

const idToken = JSON.parse(localStorage.getItem("loginInfo"))?.idToken;

const MyProfile = () => {
  const { sendRequest, status, message, data, setFetchStateDefault } = useFetch(
    getProfileFetchFromAuth
  );
  const [profileData, setProfileData] = useState(null);
  const {
    sendRequest: sendRequestFromDB,
    status: statusFromDB,
    message: messageFromDB,
    data: dataFromDB,
    setFetchStateDefault: setFetchStateDefaultFromDB,
  } = useFetch(getProfileFromDatabase);

  const getProfile = useCallback(async () => {
    const dataFromAuto = await sendRequest({ idToken });
    const dataFromDB = await sendRequestFromDB(
      dataFromAuto?.users[0].displayName
    );
    setProfileData({
      ...dataFromAuto?.users[0],
      ...Object.values(dataFromDB)[0],
    });
  }, [idToken]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const loadingScreen = (status === "loading" ||
    statusFromDB === "loading") && <Loading />;
  const errorScreen = (status === "error" || statusFromDB === "error") && (
    <AlertModal
      title="에러가 발생하였습니다."
      message={message || messageFromDB}
      handleClose={setFetchStateDefault}
    />
  );
  // console.log(profileData);

  return (
    <div className="MyProfile">
      {loadingScreen}
      {errorScreen}
      <ProfileForm myProfile={profileData} idToken={idToken} />
    </div>
  );
};

export default MyProfile;
