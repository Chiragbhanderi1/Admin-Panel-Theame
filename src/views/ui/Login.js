import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const Navigate = useNavigate();
  const [number, setnumber] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (Cookies.get("number")) {
      Navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://15.206.66.176:8080/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number: number, password: password }),
    })
      .then((res) => {
        if (res.status === 200) {
          const expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 24);
          Cookies.set("number", number, {
            expires: expirationDate,
          });
          Navigate("/");
        } else {
          alert("Check Credentails Or Internal Error");
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="bg-white">
      <section className="vh-100 d-flex justify-content-center align-items-center">
        <div className="container-fluid h-custom ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form className="border p-5" onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="number">
                    Number
                  </label>
                  <input
                    type="text"
                    id="number"
                    className="form-control form-control-lg"
                    required
                    value={number}
                    onChange={(e) => setnumber(e.target.value)}
                    placeholder="Enter a valid Number"
                  />
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{
                    paddingLeft: "2.5rem",
                    paddingRight: "2.5rem",
                    width: "100%",
                  }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
