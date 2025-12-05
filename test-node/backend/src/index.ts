import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

let currentFirstname = "Nicolas";

app.get("/hello-world", (req, res) => {
  res.json({ firstname: currentFirstname });
});

app.post("/hello-world", (req, res) => {
  const { firstname } = req.body;

  if (!firstname || typeof firstname !== "string") {
    return res.status(400).json({ error: "Invalid firstname" });
  }

  currentFirstname = firstname;
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
