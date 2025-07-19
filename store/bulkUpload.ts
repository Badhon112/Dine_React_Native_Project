import { db } from "@/config/fireBaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { slots } from "./Resturent";

const restaurentData = slots;

const upload = async () => {
  try {
    for (let i = 0; i < restaurentData.length; i++) {
      const element = restaurentData[i];
      const docref = doc(collection(db, "slots"), `slots_${i + 1}`);
      await setDoc(docref, element);
    }
    console.log("Data Upload");
  } catch (error) {
    console.log(error);
  }
};
export default upload;
