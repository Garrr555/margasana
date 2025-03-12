import app from "./init";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const firestore = getFirestore(app);

export async function retriveData(collectionName) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retriveDataById(collectionName, id) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function retriveDataByField(collectionName, field, value) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function addData(collectionName, data, callback) {
  await addDoc(collection(firestore, collectionName), data)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
}

// export async function updateData(collectionName, id, data, callback) {
//   const docRef = doc(firestore, collectionName, id);
//   await updateDoc(docRef, data)
//     .then(() => {
//       callback(true);
//     })
//     .catch(() => {
//       callback(false);
//     });
// }

export async function updateData(collectionName, id, data) {
  try {
    const docRef = doc(firestore, collectionName, id);
    await updateDoc(docRef, data);
    return true; // Mengembalikan true jika berhasil
  } catch (error) {
    console.error("Error updating document:", error);
    return false; // Mengembalikan false jika gagal
  }
}


// export async function deleteData(collectionName, id, callback) {
//   const docRef = doc(firestore, collectionName, id);
//   await deleteDoc(docRef)
//   .then(() => {
//     callback(true);
//   })
//   .catch(() => {
//     callback(false);
//   })
// }

export async function deleteData(collectionName, id) {
  try {
    const docRef = doc(firestore, collectionName, id);
    await deleteDoc(docRef);
    return true; // Mengembalikan hasil sukses
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document"); // Melempar error agar bisa ditangkap di API
  }
}
