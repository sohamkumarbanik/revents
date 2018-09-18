import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvtAZQEHV_66DideOB4PypaixgKpFKGk0",
  authDomain: "revents-216108.firebaseapp.com",
  databaseURL: "https://revents-216108.firebaseio.com",
  projectId: "revents-216108",
  storageBucket: "revents-216108.appspot.com",
  messagingSenderId: "974543499766"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings);

export default firebase;
