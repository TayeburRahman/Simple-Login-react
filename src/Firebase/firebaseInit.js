import { initializeApp } from "firebase/app";
import firebaseConfig from "./FirebaseConfic";


// Initialize Firebase login stp.2
const initilizeAuthentication = () =>{
    initializeApp(firebaseConfig)
};
export default initilizeAuthentication;