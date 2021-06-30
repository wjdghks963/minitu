import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";
const PORT = 4000;

const handleListening = () =>
  console.log(`Server listening on http://loaclhost:${PORT}`);

app.listen(PORT, handleListening); // listen에는 callback있음
