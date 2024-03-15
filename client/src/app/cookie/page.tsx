"use client";
import React, { useEffect } from "react";
import axios from "axios";

type Props = {};
axios.defaults.withCredentials = true;
const Cookie = (props: Props) => {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:9000/api/auth/login",
        {
          password,
          email,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data.response);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:9000/me", {
          withCredentials: true,
        });
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Cookie;
