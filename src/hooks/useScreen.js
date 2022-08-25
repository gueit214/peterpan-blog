import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AlertModal from "../components/UI/AlertModal";
import Loading from "../components/UI/Loading";

const useScreen = ({
  status,
  errorMessage,
  successMessage,
  setFetchStateDefault,
  goToMainIfSuccess = true,
}) => {
  const navigate = useNavigate();
  const whichScreen = (status) => {
    switch (status) {
      case "loading":
        return <Loading />;
      case "success":
        return (
          successMessage && (
            <AlertModal
              title="수정 완료!!"
              message={successMessage}
              handleClose={() => {
                setFetchStateDefault();
                if (goToMainIfSuccess) {
                  navigate("/");
                }
              }}
            />
          )
        );
      case "error":
        return (
          <AlertModal
            title="에러가 발생하였습니다."
            message={errorMessage}
            handleClose={() => {
              setFetchStateDefault();
            }}
          />
        );
    }
  };
  const screen = whichScreen(status);
  return screen;
};

export default useScreen;
