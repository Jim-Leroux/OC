import React from "react";
import Axios from "axios";
import Cookies from "js-cookie";

const Logout = () => {
  const removeCookie = (key) => {
    if (window != "undefined") {
      Cookies.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await Axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/profil";
  };
  return (
    <li onClick={logout}>
      <img src=".img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
