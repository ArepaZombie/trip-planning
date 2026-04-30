import { useState } from "react";
import { logInFirebase } from "../../firebase_firestore";
import "./Login.css";

export const Login = ({ setUser }: { setUser: any }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handlerLogIn = async () => {
    try {
      let fbUser = await logInFirebase(email, password);
      if (fbUser) {
        setUser(fbUser);
      }
    } catch (e) {
      alert(`Error: ${e}`);
    }
  };

  return (
    <div className="login-page">
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <img
        className="login-button"
        onClick={handlerLogIn}
        src="/img/seal.png"
        alt=""
      />
    </div>
  );
};
