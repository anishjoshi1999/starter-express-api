const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();
app.get("/", (req, res) => {
  res.send("Welcome to Facebook Meme API");
});
app.get("/hello", (req, res) => {
  console.log("Hello from hello route");
  res.send("Hello anish");
});
app.get("/facebook", async (req, res) => {
  try {
    // Fetch a meme from MEME_URIaa
    const memeResponse = await axios.get(process.env.MEME_URI);
    const { title, url } = memeResponse.data;

    // Add a caption to the meme
    const caption = `${title}`;

    // Post the meme with caption to Facebook
    console.log(memeResponse);
    const facebookResponse = await postMemeToFacebook(url, caption);
    console.log("Automatic POST request triggered:", facebookResponse.data);
    //res.status(200).json({ message: "Meme posted on Facebook successfully" });
  } catch (error) {
    console.error("An error occurred:", error);
    //res.status(500).json({ error: "Internal server error" });
  }
});

async function postMemeToFacebook(url, caption) {
  const facebookUrl = `https://graph.facebook.com/${process.env.FACEBOOK_PAGE_ID}/photos`;
  let value =
    "EAAVd9ZBHGyd8BO6m6jwGJ7eDsGbbZCyQ1LMes2t0zYbM1ultYZBe0NNw2IagQ6AqSlFF2Qn1gpL0SUPEGTTagrNE2SAp4O1qevGYAZAEdwZBJT97NP9TPUuER33EJZCZAxwHphEH7eb7WtzuZCXC2brUHnicon8weStcG05BFusZCjLSJzbnVgjqapuILJn8nIZBgZD";
  const data = {
    url,
    caption, // Include the caption here
    access_token: value,
  };

  return axios.post(facebookUrl, data);
}

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on PORT ${process.env.PORT}`);
});
