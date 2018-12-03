import express from "express";
import redFlags from "../controllers/red_flags";

const router = express.Router();

router.get("/red-flags", redFlags.getAllRedflags);

router.get("/red-flags/:id", redFlags.getRedflag);

router.post("/red-flags", redFlags.createRedflag);

router.patch("/red-flags/:id", redFlags.updateRedflag);

router.delete("/red-flags/:id", redFlags.deleteRedflag);



export default router;