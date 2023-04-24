import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp({});

const updateBatch = async (type: "daily" | "weekly") => {
  const firestore = admin.firestore();
  const collectionRef = firestore.collection("quests");
  const batch = firestore.batch();
  const querySnapshot = await collectionRef.get();
  querySnapshot.forEach((doc) => {
    const currentData = doc.data()[type];
    const newData = currentData + 1 > 3 ? 3 : currentData + 1;
    const docRef = collectionRef.doc(doc.id);
    batch.update(docRef, { [type]: newData });
  });
  await batch.commit();
};

export const updateDaily = functions.pubsub
  .schedule("0 1 * * *")
  .timeZone("Asia/Seoul")
  .onRun(async () => {
    updateBatch("daily");
  });

export const updateWeekly = functions.pubsub
  .schedule("0 1 * * 1")
  .timeZone("Asia/Seoul")
  .onRun(async () => {
    updateBatch("weekly");
  });
