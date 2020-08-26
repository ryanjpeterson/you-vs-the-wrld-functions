const admin = require("firebase-admin");
const serviceAccount = require("../keys/you-vs-the-wrld-firebase-adminsdk-xeqt1-480df36244.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://you-vs-the-wrld.firebaseio.com",
});

const db = admin.firestore();

module.exports = { admin, db };
