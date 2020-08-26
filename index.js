const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");
const { admin, db } = require("./util/admin");

app.use(cors());

app.get("/posts", async (req, res) => {
  await db
    .collection("posts")
    .get()
    .then((querySnapshot) => {
      let posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return res.json(posts);
    })
    .catch((err) => {
      return res.json({ error: err.code });
    });
});

app.listen(5000, () => {
  console.log("Listening on 5000");
});

exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
