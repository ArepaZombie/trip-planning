import "firebase/firestore";
import firebase from "firebase/compat/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXgF7f71o_FbJKcOeFM90-JFiiURAOOME",
  authDomain: "trip-planner-c3a9f.firebaseapp.com",
  projectId: "trip-planner-c3a9f",
  storageBucket: "trip-planner-c3a9f.firebasestorage.app",
  messagingSenderId: "989205181346",
  appId: "1:989205181346:web:5bba3c54dd0984989278fb",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = getFirestore();
const TRIP_COLLECTION = "trip";

const getTrips = async () => {
  const query = await getDocs(collection(db, TRIP_COLLECTION));
  let trips = query.docs.map((d) => ({ id: d.id, ...d.data() }));
  console.log(trips);
  return trips;
};

const getTripInfo = async (id = "f5rP33j8rpikyHgv4naw") => {
  const docRef = doc(db, TRIP_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export { getTrips, getTripInfo };
