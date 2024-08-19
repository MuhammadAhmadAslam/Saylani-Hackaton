
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

  import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

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

const storage = getStorage(app);
  window.addEventListener('click' , () => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
        
      } else {
        window.location.href = 'assets/signup.html'
      }
      
    });
    
  })

let logoutBtn = document.getElementById('logout-btn')
console.log(logoutBtn);
logoutBtn.addEventListener('click' , () => {
    signOut(auth).then(() => {
      console.log("User signed out successfully");
      window.location.href = "assets/signup.html"; 
  }).catch((error) => {
      console.error("Error signing out: ", error);
  });
})


let createAPost = document.getElementById('create-a-post')
console.log(createAPost);
createAPost.addEventListener('click' ,(event) => {
    console.log('kaam horaha ah');
     window.location.href = 'assets/makepost.html'
    })
    let disabledInput = document.getElementById('disabled-input')
    disabledInput.addEventListener('click' , ()=> {
    window.location.href = 'assets/makepost.html'
    console.log('hello');
})

function getPosts(){
    let postContainr = document.getElementById('post-container')
    let blogrow = document.getElementById('blog-row')

    onSnapshot(collection(db, "UserPosts"), (snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id);   
            console.log(doc.data() , 'data');   
            let data = doc.data()
            console.log(data);
          console.log(data.url);
          
            blogrow.innerHTML += `<div class="col-sm-12 col-lg-5 col-md-5 blog-card">
            <div class="title-image">
                <img src="" alt="">
            </div>
            <div class="title">
                <h1>${data.posts.title.substring(0,30)} ${data.posts.text.length > 200 ? "...." : ''}</h1>
                <p>${data.posts.timestamp}</p>
            </div>
            <div class="description">
                <p>${data.posts.text.substring(0, 200)}
                ${data.posts.text.length > 200 ? ".... <a href='assets/fullscreen.html'>Read More</a>" : ''}</p>
            </div>
        </div>`

        })
    })
}

getPosts()

let userProfile = document.getElementById('user-profile')

userProfile.addEventListener('click' ,(event) => {
  event.preventDefault()
  window.location.href = 'assets/you.html'
})