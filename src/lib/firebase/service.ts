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
import app from "./init";
import { error } from "console";

import { Result } from "postcss";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firestore = getFirestore(app);

const storage = getStorage(app);

// retrieveData, retrieveDataById, retrieveDataByField, addData adalah fungsi yang berhubungan dengan Firebase

// retrieveData untuk mengambil data
export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function retrieveDataByField(
  collectionName: string,
  field: string,
  value: string
) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
}

// addData untuk menambahkan data
export async function addData(
  collectionName: string,
  data: any,
  callback: Function
) {
  await addDoc(collection(firestore, collectionName), data)
    .then((res) => {
      console.log(res);
      callback(true, res);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
}

// updateData untuk memperbarui data
export async function updateData(
  collectionName: string,
  id: string,
  data: any,
  callback: Function
) {
  const docsRef = doc(firestore, collectionName, id);
  await updateDoc(docsRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

// deleteData untuk menghapus data
export async function deleteData(
  collectionName: string,
  id: string,
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);

  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

// uploadFile untuk mengupload file
export async function uploadFile(
  id: string,
  file: any,
  newName: string,
  collection: string,
  callback: Function
) {
  console.log(file);
  if (file) {
    if (file.size < 104888576) {
      console.log(newName);
      const storageRef = ref(storage, `images/${collection}/${id}/${newName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
            console.log(downloadURL);
            callback(true, downloadURL);
          });
        }
      );
    } else {
      return false;
    }
  }

  console.log(file);

  return true;
}

export async function deleteFile(url: string, callabck: Function){
  const storageRef = ref(storage, url);
  await deleteObject(storageRef).then(() => {
    return callabck(true);
  }).catch(() => {
    return callabck(false);
  })
}
