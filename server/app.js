const express = require("express");
const app = express();
const webpush = require("web-push");
const cors = require("cors");

const port = 3001;

app.use(cors());
app.use(express.json());

const userSubscriptions = [];

webpush.setVapidDetails(
  "https://www.leenplaats.nl/contact",
  "BFxlTUlmSCQYBhiE1effnkMMAsSxma_34LWMWOx2OUgpwwjMHjC5BWpvkbikZXyIVxW2tCeWckycgtEAgMqscrU",
  "kuKtjSzgeQh56Q4Mb3AolfJ3unjI0p_yY1zUSI4aTmM"
);

app.post("/save-subscription", (req, res) => {
  userSubscriptions.push(req.body);

  console.log(userSubscriptions);

  res.json({ success: true });
});

app.get("/send-notification", (req, res) => {
  userSubscriptions.forEach((userSubscription, index) => {
    webpush.sendNotification(
      userSubscription,
      "Hello everybody! [" + index + "]"
    );
  });

  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
