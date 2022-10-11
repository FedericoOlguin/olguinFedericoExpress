import { Router } from "express";

const router = Router()



router.get("/", async (req, res) => {
    console.log(req.query.cant);
    res.send(req.query.cant)
})


export default router