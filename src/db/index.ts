import admin from "firebase-admin";
import serviceAccount from "../../config/firebase/serviceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  //databaseURL: process.env.firebase_db_url,
  databaseURL: "https://czerwoniakplusplus-default-rtdb.europe-west1.firebasedatabase.app/",
});



const db = admin.database();
const announcementsRef = db.ref("news");
const luckyNumberRef = db.ref("luckyNumber");
const shortLessonsRef = db.ref("shortLessons");

async function insertAnnouncement(
  content: string,
  time: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    announcementsRef.push().set(
      {
        content: content,
        time: time,
      },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
}

async function getAnnouncements(): Promise<Object[]> {
  let announcements: Object[] = [];
  return new Promise((resolve, reject) => {
    announcementsRef
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((data) => {
            announcements.push(data);
          });
          resolve(announcements.reverse());
        } else {
          resolve(announcements);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function setLuckyNumber(number: number, info: string): Promise<void> {
  return new Promise((resolve, reject) => {
    luckyNumberRef
      .set({
        number: number,
        info: info,
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function getLuckyNumber(): Promise<Object> {
  return new Promise((resolve, reject) => {
    luckyNumberRef
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot);
        } else {
          reject({
            error: true,
            message: "Unable to find any lucky number data in the database",
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function getShortenedLessonsStatus(): Promise<Boolean> {
  let isShortLessons: boolean;
  return new Promise((resolve, reject) => {
    shortLessonsRef
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach(function (data) {
            isShortLessons = data.val();
          });
          if (isShortLessons === true) resolve(true);
          else resolve(false);
        } else
          reject({
            error: true,
            message: "Unable to find any short lessons data in the database",
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function setShortenedLessonsStatus(status: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    shortLessonsRef
      .set({
        isShortLessons: status,
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default {
    insertAnnouncement,
    getAnnouncements,
    setLuckyNumber,
    getLuckyNumber,
    getShortenedLessonsStatus,
    setShortenedLessonsStatus,
}
