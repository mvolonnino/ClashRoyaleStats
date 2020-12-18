import React, { useState } from "react";

import { useDataLayerValue } from "../../../../context/DataLayer";
import { auth, gProvider } from "../../../../firebase/firebase";
import { MDBAnimation } from "mdbreact";
import clashLogin from "../../../../assets/clash-login-2.svg";
import miniPekka from "../../../../assets/mini_pekka.png";
import archer from "../../../../assets/archers.png";

import "./Login.css";

function Login() {
  const [{}, dispatch] = useDataLayerValue();
  const [signup, setSignup] = useState(false);
  const [userObj, setUserObj] = useState({});

  const handleSignInLogin = () => {
    setSignup(!signup);
    setUserObj({});
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(userObj.email, userObj.password)
      .then((res) => {
        console.log({ res });
        dispatch({
          type: "SET_USER",
          user: {
            email: res.email,
            uid: res.uid,
          },
        });
      })
      .catch((err) => {
        const { code, message } = err;
        console.error({ code, message });
      });
  };

  return (
    <div className="login-wrap">
      <div className="row">
        <div className="col-md-8">
          {/* <MDBAnimation type="fadeInLeft" duration="1.8s"> */}
          <div className="left-panel">
            <div className="clash-illastration">
              <MDBAnimation type="fadeInDown" delay="1s">
                <img
                  src={clashLogin}
                  alt="Barbarians"
                  className="image img-fluid"
                />
              </MDBAnimation>
            </div>
            <MDBAnimation type="fadeInUp" delay="1s">
              <h2 className="motto">Clash Royale Stats Made Easy</h2>
            </MDBAnimation>
          </div>
          {/* </MDBAnimation> */}
        </div>
        {signup && (
          <div className={`col-md-4`}>
            <MDBAnimation type="fadeInRight" duration="1s">
              <div className="right-panel">
                <h1>
                  <strong>Time to join,</strong> <br />
                  Clashers!
                </h1>
                <form className="animated-form">
                  <h3>Create your account</h3>
                  <div
                    className={`form-group ${
                      userObj?.email?.length > 0 ? "has-content" : ""
                    }`}
                  >
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      onChange={(e) =>
                        setUserObj({ ...userObj, email: e.target.value })
                      }
                    />
                  </div>
                  <div
                    className={`form-group ${
                      userObj?.password?.length > 0 ? "has-content" : ""
                    }`}
                  >
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      onChange={(e) =>
                        setUserObj({ ...userObj, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group flex-end">
                    <button className="button" onClick={handleSignUp}>
                      SIGNUP
                    </button>
                  </div>
                  <MDBAnimation type="fadeInUp" delay="1s">
                    <div className="new-user">
                      <img src={archer} alt="miner" className="clash-pic" />
                      <hr className="line" />
                      <h3>Already a member?</h3>
                      <p className="link" onClick={handleSignInLogin}>
                        Login
                      </p>
                    </div>
                  </MDBAnimation>
                </form>
              </div>
            </MDBAnimation>
          </div>
        )}
        {!signup && (
          <div className={`col-md-4 slide-left`}>
            <MDBAnimation type="fadeInRight" duration="1s">
              <div className="right-panel">
                <h1>
                  <strong>Welcome Back,</strong> <br />
                  Clashers!
                </h1>
                <form className="animated-form">
                  <h3>Login to your account</h3>
                  <div
                    className={`form-group ${
                      userObj?.email?.length > 0 ? "has-content" : ""
                    }`}
                  >
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      onChange={(e) =>
                        setUserObj({ ...userObj, email: e.target.value })
                      }
                    />
                  </div>
                  <div
                    className={`form-group ${
                      userObj?.password?.length > 0 ? "has-content" : ""
                    }`}
                  >
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      onChange={(e) =>
                        setUserObj({ ...userObj, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group flex-end">
                    <button className="button">LOGIN</button>
                  </div>
                  <MDBAnimation type="fadeInUp" delay="1s">
                    <div className="new-user">
                      <img
                        src={miniPekka}
                        alt="mini pekka"
                        className="clash-pic"
                      />
                      <hr className="line" />
                      <h3>New Here?</h3>
                      <p className="link" onClick={handleSignInLogin}>
                        Sign up
                      </p>
                    </div>
                  </MDBAnimation>
                </form>
              </div>
            </MDBAnimation>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
