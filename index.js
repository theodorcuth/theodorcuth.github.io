const express = require("express");
const cors = require("cors");
const ogs = require("open-graph-scraper");

const app = express();
app.use(cors());

app.get("/og", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const options = {
      url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36'
      }
    };
    const { result } = await ogs(options);
    res.json({
      title: result.ogTitle,
      image: result.ogImage?.url || null,
      description: result.ogDescription,
      site: result.ogSiteName,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Open Graph data." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("OG Scraper running on port", PORT));
