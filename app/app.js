import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import dbase from "./dataStructure/dbase";

import router from "./routes/redflagRoute";

const app = express();

const port = (process.env.PORT || 3000);

app.set("appData", dbase);
app.set("appVersion", "/api/v1/record");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(app.get("appVersion"), router);
app.get("*", (req, res) => {
	res.status(404).json({ error: "The page cannot be found!" });
});


app.listen(port, () => console.log(`Server started on port ${port}`));


export default app;