import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const testFirestore = async () => {
  try {
    await setDoc(doc(db, "testCollection", "testDoc"), {
      name: "Test Document",
      description: "Testing Firestore connection",
    });
    console.log("Document written successfully!");

    const docRef = doc(db, "testCollection", "testDoc");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error testing Firestore:", error);
  }
};

export const testAuth = async () => {
  try {
    console.log("Testing Auth...");
    // Auth testing logic
  } catch (error) {
    console.error("Error testing Authentication:", error);
  }
};


export default testFirestore;
