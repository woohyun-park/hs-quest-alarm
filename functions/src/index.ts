import { pubsub } from "firebase-functions";
import { initializeApp, firestore } from "firebase-admin";

initializeApp({});

const updateBatch = async (type: "daily" | "weekly", increment: number) => {
  const fs = firestore();
  const collectionRef = fs.collection("quests");
  const batch = fs.batch();
  const querySnapshot = await collectionRef.get();
  querySnapshot.forEach((doc) => {
    const currentData = doc.data()[type];
    const newData = currentData + increment > 3 ? 3 : currentData + increment;
    const docRef = collectionRef.doc(doc.id);
    batch.update(docRef, { [type]: newData });
  });
  await batch.commit();
};

export const updateDaily = pubsub
  .schedule("0 1 * * *")
  .timeZone("Asia/Seoul")
  .onRun(async () => {
    updateBatch("daily", 1);
  });

export const updateWeekly = pubsub
  .schedule("0 1 * * 1")
  .timeZone("Asia/Seoul")
  .onRun(async () => {
    updateBatch("weekly", 3);
  });
