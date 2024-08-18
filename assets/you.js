

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,

}
  from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";



import {
  getFirestore, collection, addDoc, getDocs, query,
  where,
  onSnapshot, deleteDoc, updateDoc, deleteField, doc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"
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


let row = document.getElementById('row')
let email = document.getElementById('email')
let name = document.getElementById('name')
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    // console.log(uid);
    
    onSnapshot(collection(db, "UserDetails"), (snapshot) => {
      snapshot.forEach((doc) => {
        let data = doc.data()
    
        
        if (uid == data.userUid) {
          // console.log('mil gaya')
          let data = doc.data()
          // console.log(data, 'data hae');
          email.innerHTML = user.email
          name.innerText = data.userName
          let UserKaname = data.userName
          let img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTdD2LkrqGa6G0A-JObFZNgHdbTDgXW-m2KQ&s'

          // Clear the row innerHTML to prevent duplicate posts
          row.innerHTML = '';

          onSnapshot(collection(db, "UserPosts"), (snapshot) => {
            let hasPosts = false;
            snapshot.forEach((doc) => {
              let data = doc.data()
              // console.log(data , "user post data");
              // console.log(uid == data.userUid , "dekhtae hae" , uid , data.userUid);
              if (uid== data.userUid) {
                hasPosts = true;
                row.innerHTML += `<div class="col-sm-12 col-lg-4 col-md-6 blog-card">

                              <div class="title">
                              <span id='span'>
                                  <img src=${img} alt="" width="4%" height='auto' style="border-radius: 80%;">
                                  <div class='nameDate'>
                                <h1>${UserKaname.charAt(0).toUpperCase()}${UserKaname.slice(1)}</h1>
                                <p>${data.posts.timestamp}</p>
                                </div>
                                </span>
                            </div>
                            <div class="description">
                            <h1> ${data.posts.title} </h1>
                               <p id="text">${data.posts.text.substring(0, 200)}
                                 ${data.posts.text.length > 200 ? ".... <a href='makepost.html'>Read More</a>" : ''}
                               </p>
                              
                            </div>
                        </div>`

                     
              }
            })
            if (!hasPosts) {
              alert("Post Please");
            }
          })
        }
      })
    })
  } else {
    // User is signed out
  }
})



window.addEventListener('click', () => {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      // console.log(user);

    } else {
      window.location.href = 'signup.html'
    }

  });

})



// onSnapshot(collection(db, "UserDetails"), (snapshot) => {
//   snapshot.forEach((doc) => {
//     let data = doc.data()
//     console.log(data.userUid)
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const uid = user.uid;
//         if (uid == data.userUid) {
//           console.log('mil gaya')
//           let data = doc.data()
//           console.log(data, 'data hae');
//           email.innerHTML = user.email
//           name.innerText = data.userName
//           let UserKaname = data.userName
//           let img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTdD2LkrqGa6G0A-JObFZNgHdbTDgXW-m2KQ&s'
//           onSnapshot(collection(db, "UserPosts"), (snapshot) => {
//             snapshot.forEach((doc) => {
//               let data = doc.data()
//               row.innerHTML += `<div class="col-sm-12 col-lg-4 col-md-6 blog-card">

                        
//               <div class="title">
//               <span id='span'>
//                   <img src=${img} alt="" width="4%" height='auto' style="border-radius: 80%;">
//                   <div class='nameDate'>
//                 <h1>${UserKaname.charAt(0).toUpperCase()}${UserKaname.slice(1)}</h1>
//                 <p>${data.posts.timestamp}</p>
//                 </div>
//                 </span>
//             </div>
//             <div class="description">
//             <h1> ${data.posts.title} </h1>
//                 <p>${data.posts.text}</p>
//             </div>
//         </div>`
//             })
//           })
//         }
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/auth.user
//         // ...
//       } else {


//       }

//     })
//   })
// })

let userProfile = document.getElementById('user-profile')

userProfile.addEventListener('click', (event) => {
  event.preventDefault()
  window.location.href = 'assets/you.html'
})


let logoutBtn = document.getElementById('logout-btn')
console.log(logoutBtn);
logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log("User signed out successfully");
    window.location.href = "signup.html";
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
})


let addposts = document.getElementById('addposts')

addposts.addEventListener('click' , (event) => {
    event.preventDefault()
    window.location.href = 'makepost.html'
})


function readMoreBtn(){
  window.location.href = 'makepost.html'
}