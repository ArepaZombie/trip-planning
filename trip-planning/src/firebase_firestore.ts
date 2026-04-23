import "firebase/firestore";
import firebase from "firebase/compat/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import type { Activity, Day, Trip } from "./types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = getFirestore();
const TRIP_COLLECTION = "trips";
const DAYS_COLLECTION = "days";
const ACTIVITIES_COLLECTION = "activities";
const HONEYMOON_ID = "honeymoon";
const PACKING_ITEMS = "packingItems";

export const getTrips = async () => {
  const query = await getDocs(collection(db, TRIP_COLLECTION));
  let trips = query.docs.map((d) => ({ id: d.id, ...d.data() }));
  return trips;
};

export const getTripInfo = async (id: string = HONEYMOON_ID) => {
  const docRef = doc(db, TRIP_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Trip;
  } else {
    console.log("No such document!");
  }
};

export const getDaysByTrip = async (tripId: string = HONEYMOON_ID) => {
  const daysRef = collection(
    db,
    `${TRIP_COLLECTION}/${tripId}/${DAYS_COLLECTION}`,
  );
  const query = await getDocs(daysRef);
  let days = query.docs.map((d) => ({ id: d.id, ...d.data() })) as Day[];
  return days;
};

export const getDayInfo = async (id: string, tripId: string = HONEYMOON_ID) => {
  if (id) {
    //Query para info del día
    let linkArray = [TRIP_COLLECTION, tripId, DAYS_COLLECTION];
    const daySnap = await getDoc(doc(db, linkArray.join("/"), id));

    // Query para actividades
    linkArray = linkArray.concat([id, ACTIVITIES_COLLECTION]);
    const actSnap = await getDocs(collection(db, linkArray.join("/")));

    //Retorno Objectificado
    return {
      id: daySnap.id,
      ...daySnap.data(),
      activities: actSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    } as Day & { activities: Activity[] };
  }
};

export const updateDayInfo = async (
  id: string,
  dayInfo: Day,
  tripId: string = HONEYMOON_ID,
) => {
  if (id) {
    //Query para info del día
    let linkArray = [TRIP_COLLECTION, tripId, DAYS_COLLECTION];
    const docRed = doc(db, linkArray.join("/"), id);
    const newDay = {
      title: dayInfo.title,
      date: dayInfo.date,
      packingItems: dayInfo.packingItems,
      budget: dayInfo.budget,
    };

    await updateDoc(docRed, newDay);
  }
};

export const updateBudget = async (
  dayId: string,
  budgetUse: number,
  tripId: string = HONEYMOON_ID,
) => {
  if (dayId) {
    //Query para info del día
    let linkArray = [TRIP_COLLECTION, tripId, DAYS_COLLECTION];
    const dayRef = doc(db, linkArray.join("/"), dayId);
    const daySnap = await getDoc(dayRef);
    const budget = daySnap.data()?.budget;
    const newBudget = { ...budget, spent: budget.spent + budgetUse };

    await updateDoc(dayRef, { budget: newBudget });
  }
};

export const getActivityInfo = async (
  activityId: string,
  dayId: string,
  tripId: string = HONEYMOON_ID,
) => {
  //Query para info
  let linkArray = [
    TRIP_COLLECTION,
    tripId,
    DAYS_COLLECTION,
    dayId,
    ACTIVITIES_COLLECTION,
  ];
  const daySnap = await getDoc(doc(db, linkArray.join("/"), activityId));

  return daySnap.data() as Activity;
};

export const checkItem = async (
  dayId: string,
  index: number,
  checked: boolean,
  tripId: string = HONEYMOON_ID,
) => {
  //Query para info del día
  let linkArray = [TRIP_COLLECTION, tripId, DAYS_COLLECTION];
  const dayRef = doc(db, linkArray.join("/"), dayId);
  const daySnap = await getDoc(dayRef);
  const packingItems = daySnap.data()?.packingItems ?? [];

  packingItems[index] = { ...packingItems[index], checked };

  await updateDoc(dayRef, { packingItems });
};

export const checkTask = async (
  dayId: string,
  activityId: string,
  index: number,
  done: boolean,
  tripId: string = HONEYMOON_ID,
) => {
  //Query para info del día
  let linkArray = [
    TRIP_COLLECTION,
    tripId,
    DAYS_COLLECTION,
    dayId,
    ACTIVITIES_COLLECTION,
  ];
  const actRef = doc(db, linkArray.join("/"), activityId);
  const actSnap = await getDoc(actRef);
  const tasks = actSnap.data()?.tasks ?? [];

  tasks[index] = { ...tasks[index], done };

  await updateDoc(actRef, { tasks });
};
