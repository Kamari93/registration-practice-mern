import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // used to make http requests to the backend

function App() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name, email, password);
    axios
      .post("http://localhost:5000/register", { name, email, password })
      .then((result) => console.log(result.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>{" "}
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              className="form-control rounded-0"
              name="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>{" "}
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              autoComplete="off"
              className="form-control rounded-0"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>{" "}
            </label>
            <input
              type="text"
              placeholder="Enter Password"
              autoComplete="off"
              className="form-control rounded-0"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
          <p>Already have an account?</p>
          <button className="btn btn-default bg-secondary border w-100 rounded-0 text-decoration-none">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
