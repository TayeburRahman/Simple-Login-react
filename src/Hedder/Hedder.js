import React, { useState } from 'react';
import initilizeAuthentication from '../Firebase/firebaseInit';
import {getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import From from '../ResisterFrom/From';

// login  stp.3
initilizeAuthentication();

//login  stp.4
const googleProvider = new GoogleAuthProvider();

const Hedder = () => {
    //login  stp.5
    const auth = getAuth()

    // google login stp.6
    const handelGooleSignIn = () =>{
        signInWithPopup(auth,googleProvider)
        .then( result =>{
            const user =result.user;
        })
    }

    return (
        <div className="row p-1">
            <nav className="navMenu bg-info">
            <div className="col-cd-7">
            </div>
            <div className="col-md-5">
                <button onClick={handelGooleSignIn} className="btn btn-success">Google Sign In</button>
                <button className="btn btn-success m-3">GitHub Sign In</button>
                <button className="btn btn-warning">log out</button>
            </div>
            </nav>
            <div>
            <br />
            <br />
            <br />
            <From></From>
            </div>
        </div>
    );
};

export default Hedder;