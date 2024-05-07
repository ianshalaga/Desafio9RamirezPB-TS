import config from "./env.config";
import authController from "../controllers/auth.controller";
// Passport
import passport from "passport";
import passportLocal from "passport-local";
import GitHubStrategy from "passport-github2";

const githubClientId = config.githubClientId;
const githubClientSecret = config.githubClientSecret;

const LocalStrategy = passportLocal.Strategy;

const initializePassport = () => {
  /** REGISTER */
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      authController.register
    )
  );

  /** LOGIN */
  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, authController.login)
  );

  // GITHUB
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: githubClientId,
        clientSecret: githubClientSecret,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      authController.githubLogin
    )
  );

  passport.serializeUser(authController.serializeUser);
  passport.deserializeUser(authController.deserializeUser);
};

export default initializePassport;
