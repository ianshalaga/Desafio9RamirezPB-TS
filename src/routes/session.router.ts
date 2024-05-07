import { Router } from "express";
import passport from "passport";
import adminAuth from "../middlewares/adminAuth";
import sessionController from "../controllers/session.controller";

const sessionsRouter = Router();

/** REGISTER */
sessionsRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  sessionController.register
);

sessionsRouter.get("/failregister", sessionController.registerFail);

/** LOGIN */
sessionsRouter.post(
  "/login",
  adminAuth,
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  sessionController.login
);

sessionsRouter.get("/faillogin", sessionController.loginFail);

/** LOGOUT */
sessionsRouter.post("/logout", sessionController.logout);

/** GITHUB */
sessionsRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  sessionController.githubLogin
);

sessionsRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  sessionController.githubCallback
);

/** CURRENT */
sessionsRouter.get("/current", sessionController.current);

export default sessionsRouter;
