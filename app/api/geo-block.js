export default function handler(req, res) {
  const country = req.headers["x-vercel-ip-country"];
  const region = req.headers["x-vercel-ip-region"];

  // Check if the user is from the US and specifically Florida
  if (country === "US" && region === "FL") {
    res.status(200).send("Welcome, Florida visitor!");
  } else {
    res.status(403).send("Access restricted to Florida visitors only.");
  }
}
