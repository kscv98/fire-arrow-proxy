import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());

// Proxy route
app.get("/service", async (req, res) => {
  try {
    const url = req.query.url;

    if (!url) return res.status(400).send("No URL provided");

    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    res.set("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error loading page");
  }
});

// IMPORTANT for Render
const PORT = process.env.PORT || 3000;
//because render dosn't have a standerd port
app.listen(PORT, () => {
  console.log("serever running on port", PORT);
});
