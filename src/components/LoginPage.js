import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
// This is the Login page component
//api endpoint used in /auth/login post request
const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [LoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.post(
          "https://frontend-take-home-service.fetch.com/auth/login",
          { name, email },
          {
            withCredentials: true,
            headers: {
              "fetch-api-key":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s",
            },
          }
        );
        setLoggedIn(true);
        console.log(response.data);
      } catch (error) {}
    };
    if (LoggedIn === true) {
      return;
    }

    login();
  }, [name, email]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoggedIn(false);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-name">
          <label> </label>
          <input
            type="text"
            className="Login-input"
            name="Name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <br />

        <div className="input-email">
          <label> </label>
          <input
            className="Login-input"
            type="text"
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <br />
        <div className="button-container">
          <input
            type="submit"
            className="Login-input"
            onClick={() => navigate(`/home`)}
            value="Login"
            onSubmit={handleSubmit}
          />
        </div>
        <br />
      </form>
    </div>
  );
};

export default LoginPage;
