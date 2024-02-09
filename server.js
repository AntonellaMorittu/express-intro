import cors from "cors";
import express from "express";
import data from "./data.json";


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/shows", (req, res) => {
  res.json(data)
})


app.get("/shows/:id", (req, res) => {
  const id = req.params.id
  const showId = data.filter((item) => item.show_id === +id)
  res.json(showId)
})

app.get("/year/:year", (req, res) => {
  const year = req.params.year
  const type = req.query.type

  let showsFromYear = data.filter((item) => item.release_year === +year)

  if (type === "movie") {
    showsFromYear = showsFromYear.filter((item) => item.type === "Movie")
  } else if (type === "tv_show") {
    showsFromYear = showsFromYear.filter((item) => item.type === "TV Show")
  }

  res.json(showsFromYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
