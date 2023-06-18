// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import {getDatabase, ref, get, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa-P46BTzSiSqMI1AbA7IzBA21X3Cq0a8",
  authDomain: "cit-portal-7bd3e.firebaseapp.com",
  databaseURL: "https://cit-portal-7bd3e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cit-portal-7bd3e",
  storageBucket: "cit-portal-7bd3e.appspot.com",
  messagingSenderId: "629173744776",
  appId: "1:629173744776:web:fcdce37e06d9bf12535b3d",
  measurementId: "G-RYHM7XV0XX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

var idbox = document.getElementById("staffid");
var pwdbox = document.getElementById("password");

var loginBtn = document.getElementById("loginbtn");

function loginTo(){
    const dbref = ref(db);
    console.log("HI");
    get(child(dbref,"Staff/"+ idbox.value)).then((snapshot) =>{
        if(snapshot.exists()){
          if(pwdbox.value === snapshot.val().password){
            alert("Login Successful!");
            window.location.replace("./index.html");
          }
          else{
            alert("Incorrect password!")
          }
        }
        else{
          alert("No data found");
        }
      })
      .catch((error) => {
        alert("Error occured, unsuccessful!"+error);
      });
}

loginBtn.addEventListener('click',loginTo);