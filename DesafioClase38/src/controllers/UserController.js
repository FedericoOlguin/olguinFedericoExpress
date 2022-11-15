import service from "../dao/configDao.js"
import jwt from "jsonwebtoken"
import config from "../config/config.js";



const UserController = {

    createUser: async (req, res) => {
        console.log(req.body);
        let result = await service.userService.getAll()
        res.json({
            success: true,
            result
        })
    },
    login: async (req, res) => {
        console.log(req.user.email);
        console.log(req.user.imageUrl);
        let loginUser = {
            rol: req.user.rol,
            email: req.user.email,
            address: req.user.address,
            age: req.user.age,
            _id: req.user._id,
            imageUrl: req.user.imageUrl,
            name: req.user.name
        }
        const token = jwt.sign(loginUser, config.jwt.SECRET, { expiresIn: "20h" })

        res.cookie(config.jwt.COOKIE, token, { maxAge: 400000000, httpOnly: true })
            .json({
                success: true,
                message: "logged in",
            })
    },
    isCurrent: async (req, res) => {
        try {
            const token = req.cookies[config.jwt.COOKIE]
            if (!token) return res.redirect("/")
            const user = jwt.verify(token, config.jwt.SECRET)
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            console.log(user.imageUrl);
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            res.json({
                success: true,
                user
            })
        } catch (err) {
            console.log(err);
            if (err.expireAt) { //si el objeor err tiene esta propiedad, es porque el token ya expiró
                res.json({
                    success: false,
                    message: "El token ya expiró"
                })
            }
        }
    }
}


export default UserController