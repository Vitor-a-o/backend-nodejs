import express from "express";
import AccountController from "../controllers/account.controller"
import { logger } from "../../src/application";

const router = express.Router();

router.put("/saque", AccountController.saque);
router.put("/deposito", AccountController.deposito);
router.post("/", AccountController.criar_conta)

//Guardando erros no log

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);    
    res.status(400).send({ error: err.message });    
});

export default router;