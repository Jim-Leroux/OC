import React, { useState } from "react";
import Axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (element) => {
    element.preventDefault();

    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passworderror = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );

    passwordConfirmError.innerHTML = "";

    if (password != controlPassword) {
      passwordConfirmError.innerHTML = "Password don't match";
    } else {
      await Axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passworderror.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
		  <br />
		  <span></span>
		  <span></span>
          <h4 className="success">Account created, please login</h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(element) => setPseudo(element.target.value)}
          />
          <div className="pseudo error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(element) => setEmail(element.target.value)}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(element) => setPassword(element.target.value)}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">controlPassword</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(element) => setControlPassword(element.target.value)}
          />
          <div className="password-confirm error"></div>
          <br />

          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
