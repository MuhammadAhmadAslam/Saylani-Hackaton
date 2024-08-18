const forms = document.querySelector(".forms"),
  pwShowHide = document.querySelectorAll(".eye-icon"),
  links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
  eyeIcon.addEventListener("click", () => {
    let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

    pwFields.forEach(password => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("bx-hide", "bx-show");
        return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
    })

  })
})

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault(); //preventing form submit
    forms.classList.toggle("show-signup");
  })
})








// import {
//   auth, createUserWithEmailAndPassword, sendSignInLinkToEmail
//   , GoogleAuthProvider, signInWithPopup, provider, onAuthStateChanged, signInWithEmailAndPassword , signOut       
// } from "./firebase.js"


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth , 
 createUserWithEmailAndPassword , 
 GoogleAuthProvider , 
 sendSignInLinkToEmail  ,
 signInWithPopup ,
  onAuthStateChanged , 
  signInWithEmailAndPassword ,
  signOut ,

 } 
  from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";



  import {getFirestore , collection , addDoc , getDocs, query,
   where,
    onSnapshot ,    deleteDoc  , updateDoc, deleteField , doc   } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"
const firebaseConfig = {
  apiKey: "AIzaSyAcEusuBViHZG_gqw8BqABccSmVDXUvH70",
  authDomain: "muhammad-ahmed-demo-work.firebaseapp.com",
  projectId: "muhammad-ahmed-demo-work",
  storageBucket: "muhammad-ahmed-demo-work.appspot.com",
  messagingSenderId: "1045072993781",
  appId: "1:1045072993781:web:cb6313a279bed9978014bc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


function signUpFunction(event) {
  event.preventDefault()
  const toast = document.querySelector('.toast')
  const signupEmail = document.getElementById('signup-email')
  const signupPassword = document.getElementById('signup-password')
  const signupUserName = document.getElementById('signup-userName')
  if (signupUserName.value != '') {
    createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      signupEmail.value = ''
      signupPassword.value = ''
      console.log(user);   
      Swal.fire({
          title: "Good job!",
          text: "You have sucessfully created account",
          icon: "success"
        });
        const signupUserName = document.getElementById('signup-userName')
      addDoc(collection(db, "UserDetails"), {
        userUid: user.uid,
        userName: signupUserName.value,
        email : user.email
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      signupEmail.value = ''
      signupPassword.value = ''
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorCode,
      });
    });
}
}

let signupbtn = document.getElementById('signupbtn')

signupbtn.addEventListener('click', signUpFunction);

let googleAuthenticationFunction = (event) => {
  event.preventDefault()
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      Swal.fire({
        title: "Good job!",
        text: "You have sucessfully created account",
        icon: "success"
      });

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorCode,
      });
    });
}
let googleLoginFunction = (event) => {
  event.preventDefault()
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      Swal.fire({
        title: "Good job!",
        text: "You have sucessfully LogIn",
        icon: "success"
      });
      window.location.href = '../index.html'
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorCode,
      });
    });
}


const signupGoogle = document.getElementById('signup-google')

signupGoogle.addEventListener('click', googleAuthenticationFunction)

const loginGoogle = document.getElementById('login-google')
loginGoogle.addEventListener('click', googleLoginFunction)


const loginEmail = document.getElementById('login-email'),
  loginPassword = document.getElementById('login-password'),
  loginBtn = document.getElementById('loginBtn')


let loginAuthenticate = (event) => {
  event.preventDefault()
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.href = '../index.html'
      console.log(user);
      loginEmail.value = ''
      loginPassword.value = ''
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      loginEmail.value = ''
      loginPassword.value = ''
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'InValid Password And Email Address',
      });

    });
}

loginBtn.addEventListener('click', loginAuthenticate)