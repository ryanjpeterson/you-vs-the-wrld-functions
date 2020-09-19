const admin = require("firebase-admin");
const serviceAccount = require("../keys/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://you-vs-the-wrld.firebaseio.com",
});

const db = admin.firestore();

module.exports = { admin, db };
