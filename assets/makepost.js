import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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
const storage = getStorage(app);
const db = getFirestore(app);


onAuthStateChanged(auth, (user) => {
if (user) {
  const uid = user.uid;
  console.log(user);
  
} else {
  window.location.href = 'signup.html'
}
})

const uploadFile = document.querySelector('.submitbtn');
let loader = document.getElementById('loader')

let showLoader = () => {
  loader.classList.remove('loader-none')
    loader.classList.add('loading-wave')
}
let HideLoader = () => {
    loader.classList.remove('loading-wave')
    loader.classList.add('loader-none')
}

uploadFile.addEventListener('click', (event) => {
  event.preventDefault();
  showLoader()
  
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  const textarea = document.getElementById('textarea')
  const title = document.getElementById('title')
  const postStorageRef = ref(storage, file.name);
  uploadBytes(postStorageRef, ref(storage, file.name))
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((downloadURL) => {
      console.log('File available at', downloadURL);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(user);
        addDoc(collection(db, "UserPosts"), {
            userUid: uid,
            url: downloadURL,
            posts: {text: textarea.value , title:  title.value, file: file.name,timestamp: new Date().toDateString(),},
          });
          textarea.value = ''
          title.value = ''
          file.name = ''
        } else {
          alert('masla arha ha')
        }
      });
     
    })
    .then(() => {
        
      HideLoader()
    })
    .catch((e) => alert(e.message));
    HideLoader()
});




