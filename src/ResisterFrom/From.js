import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,updateProfile
} from "firebase/auth";

const From = () => {
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [error, setError] = useState(' ');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const auth = getAuth();

  // firebase Resister(Create user) stp.7
  const createNewUser = (email, password) => {
    // firebase 'Password Authentication' include
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
        sendEmailVerify();
        addUserName();
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  // Resister Email Verification  stp.7_1
  const sendEmailVerify = () => {
    sendEmailVerification(auth.currentUser)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Login (allredy resister) stp.7_2
  const processLogin = (email, password) => {
    // firebase 'Password Authentication' include
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Resister(check Create user) stp.8
  const handelResister = (e) => {
    e.preventDefault();
    // check password
    if (password.length < 6) {
      setError("Password Must be at least 6 characters long.");
      return;
    }
    if (!/(?=.*[A-Z])(?=.*[a-z])/.test(password)) {
      setError("Password Must Contain 2 Upper Case");
      return;
    }
    if (isLogin) {
      processLogin(email, password);
    } else {
      createNewUser(email, password);
    }
  };
  //Resister Email add 8_1
  const handelEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // Resister password add 8_2
  const handelPassowordChange = (e) => {
    setPassword(e.target.value);
  };
  // Resister user Name add 8_3
  const addUserName =()=>{
    updateProfile (auth.currentUser, {displayName: name})
    .then((result) => { })

  }
  // chaeck box (Registerd ask 'Allredy Registerd?') stp.9
  const toggoleLogIn = (t) => {
    setIsLogin(t.target.checked);
  };

  // user password reset stp.10
  const handelResetPassword = () => {
    sendPasswordResetEmail(auth, email).then((result) => {});
  };

  // Resister Name add stp.11
  const handelNameChange=e=>{
    setName(e.target.value)

  }
  return (
    <form onSubmit={handelResister}>
      <h3>Please {isLogin ? "Login" : "Regeter"}</h3>
      {/* from er je sob vlo importent tar jonno sudhu 'required' input tag er vitor dite hoy*** */}
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          {/* onChange /onBlur(protita type a consol korbe na onno kothao click korar pore e console korbe) 2ta e evenHandel a ai khetre beboha kora jay */}
          <input
            onChange={handelEmailChange}
            type="email"
            className="form-control"
            id="inputEmail3"
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input
            onBlur={handelPassowordChange}
            type="password"
            className="form-control"
            id="inputPassword3"
          />
        </div>
      </div>
      {! isLogin && <div className="row mb-3">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">
          Your Name
        </label>
        <div className="col-sm-10">
          <input
            onBlur={handelNameChange}
            type="name"
            className="form-control"
            id=""
          />
        </div>
      </div>}
      <fieldset className="row mb-3">
        <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
      </fieldset>
      <div className="row mb-3">
        <div className="col-sm-10 offset-sm-2">
          <div className="form-check">
            <input
              onChange={toggoleLogIn}
              className="form-check-input"
              type="checkbox"
              id="gridCheck1"
            />
            <label className="form-check-label" htmlFor="gridCheck1">
              Allredy Registerd?
            </label>
          </div>
        </div>
      </div>
      <div className="row mb-3 text-danger p-5">{error}</div>
      <button type="submit" className="btn btn-primary">
        {isLogin ? "Login" : "Regeter"}
      </button>
      <button
        onClick={handelResetPassword}
        type="button"
        className="btn btn-secondary m-3"
      >
        Reset Password
      </button>
    </form>
  );
};

export default From;
