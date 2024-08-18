
    
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


onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user);
    
  } else {
    window.location.href = 'signup.html'
  }
  
});

window.addEventListener('click' , () => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
        
      } else {
        window.location.href = 'signup.html'
      }
      
    });
    
  })
    let row = document.getElementById('row')
let email  =  document.getElementById('email')
let name = document.getElementById('name')
    onSnapshot(collection(db, "UserDetails"), (snapshot) => {
        snapshot.forEach((doc) => {
            let data = doc.data()
            console.log(data.userUid)
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    if(uid == data.userUid){
                        console.log('mil gaya')
                        let data = doc.data()
                        console.log(data , 'data hae');
                        email.innerHTML = user.email
                        name.innerText = data.userName
                        onSnapshot(collection(db, "UserPosts"), (snapshot) => {
                          snapshot.forEach((doc) => {
                            let data = doc.data()
                        row.innerHTML += `<div class="col-sm-12 col-lg-4 col-md-6 blog-card">
            <div class="title">
                <h1>${data.posts.title}</h1>
                <p>${data.posts.timestamp}</p>
            </div>
            <div class="description">
                <p>${data.posts.text}</p>
            </div>
        </div>`
                          })
                        })                
                    }
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/auth.user
                  // ...
                } else {
                  
                  
                }
        
        })
    })
})

let userProfile = document.getElementById('user-profile')

userProfile.addEventListener('click' ,(event) => {
  event.preventDefault()
  window.location.href = 'assets/you.html'
})


let logoutBtn = document.getElementById('logout-btn')
console.log(logoutBtn);
logoutBtn.addEventListener('click' , () => {
    signOut(auth).then(() => {
      console.log("User signed out successfully");
      window.location.href = "signup.html"; 
  }).catch((error) => {
      console.error("Error signing out: ", error);
  });
})
