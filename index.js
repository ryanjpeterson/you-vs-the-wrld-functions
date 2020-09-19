const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");
const { db } = require("./util/admin");

app.use(cors());

app.get("/posts", (req, res) => {
  db.collection("posts")
    .get()
    .then((querySnapshot) => {
      let posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return res.status(200).json(posts);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    });
});

app.get("/posts/:postId", (req, res) => {
  let postData = {};

  db.doc(`/posts/${req.params.postId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      }

      postData = doc.data();
      postData.id = doc.id;
    })
    .then(() => {
      return res.status(200).json(postData);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
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
