// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  addDoc,
  Timestamp,
  getFirestore,
  getDocs,
  doc,
  query,
  where,
  limit,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQa5gpsEASuLNVfJ3SF4ssb-zsgnBzD1E",
  authDomain: "gym-dekast.firebaseapp.com",
  projectId: "gym-dekast",
  storageBucket: "gym-dekast.firebasestorage.app",
  messagingSenderId: "926608341237",
  appId: "1:926608341237:web:d5819d5bb3823f31302dbc",
  measurementId: "G-NVBC1ERWJ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Timestamp;
};

export async function login(username: string): Promise<User> {
  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    limit(1)
  );

  const snap = await getDocs(q);
  if (snap.empty) {
    throw new Error("User not found");
  }

  const d = snap.docs[0];
  const user = { id: d.id, ...(d.data() as Omit<User, "id">) } as User;

  await localStorage.setItem("userId", user.id);
  return user;
}

export async function createUser(
  name: string,
  email: string,
  sub_type: string
) {
  try {
    const userRef = await addDoc(collection(db, "users"), {
      name,
      email,
      createdAt: Timestamp.now(),
    });

    const subRef = await addDoc(
      collection(doc(db, "users", userRef.id), "subscriptions"),
      {
        type: sub_type,
        startedAt: Timestamp.now(),
      }
    );

    console.log("User ID:", userRef.id, "Subscription ID:", subRef.id);
    return { userId: userRef.id, subscriptionId: subRef.id };
  } catch (e) {
    console.error("Error adding document:", e);
    throw e;
  }
}

export async function getCourses() {
  const snapshot = await getDocs(collection(db, "courses"));

  const courses = snapshot.docs.map((doc: { id: any; data: () => any }) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return courses;
}

export async function getCoursesFromUser(userId: string) {
  try {
    const userRef = doc(db, "users", userId);

    const courseRef = collection(userRef, "courses");
    const snapshot = await getDocs(courseRef);

    const courses = snapshot.docs.map((doc: { id: any; data: () => any }) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return courses;
  } catch (error) {
    console.error("Error getting course:", error);
    throw error;
  }
}

export async function getSubscribtions() {
  const snapshot = await getDocs(collection(db, "subscribtions"));

  const subs = snapshot.docs.map((doc: { id: any; data: () => any }) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return subs;
}

export async function getAllAppointments() {
  const snapshot = await getDocs(collection(db, "appointments"));

  const appointments = snapshot.docs.map(
    (doc: { id: any; data: () => any }) => ({
      id: doc.id,
      ...doc.data(),
    })
  );

  return appointments;
}

export async function getAppointmentsFromUser(userId: string) {
  try {
    const userRef = doc(db, "users", userId);
    const appointmentsRef = collection(userRef, "appointments");

    const snapshot = await getDocs(appointmentsRef);

    const appointments = snapshot.docs.map(
      (doc: { id: any; data: () => any }) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    return appointments;
  } catch (error) {
    console.error("Error getting appointment:", error);
    throw error;
  }
}

export async function addUserToCourse(userId: string, type: string) {
  try {
    const userRef = doc(db, "users", userId);
    const courseRef = collection(userRef, "courses");

    const docRef = await addDoc(courseRef, {
      type,
      createdAt: Timestamp.now(),
    });

    console.log("Appointment created with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
}

export default db;
