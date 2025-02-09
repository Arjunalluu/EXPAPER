import express from "express";
import { SAregister, SAlogin ,Aregister,Alogin , logout} from "../controllers/AuthController.js";
const router = express.Router();
router.post("/SAregister", SAregister);
router.post("/SAlogin", SAlogin);
router.post("/Aregister",Aregister);
router.post("/Alogin", Alogin);
router.post("/logout", logout);

export default router;
