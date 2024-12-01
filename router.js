import { Router } from "express";
import * as test from "./controller/test.controller.js"
import * as user from "./controller/user.controller.js"
import auth from "./middlewares/auth.js"

const router = Router()

router.route("/test").get(test.abcd);
router.route("/write").post(test.write);
router.route("/read").get(test.read)
router.route("/update/:id").put(test.update)
router.route("/delete/:id").delete(test.del)

router.route("/register").post(user.register)
router.route("/login").post(user.login)
router.route("/profile").get(auth,user.profile)
router.route("/editEmail").put(auth,user.editEmail)
router.route("/editPassword").put(auth,user.editPassword)


export default router; 