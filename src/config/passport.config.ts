import passport from "passport";
import passportLocal from "passport-local";
import { createHash, isValidPassword } from "../utils/passwordHashing";
import { usersModel } from "../dao/models/users.model";
import { Request } from "express";
import User from "../interfaces/User";
import dbUser from "../interfaces/dbUser";
import "dotenv/config";
import GitHubStrategy from "passport-github2";
import { CartManagerDB } from "../dao/services/CartManagerDB";
import DbCart from "../interfaces/DbCart";
import config from "./env.config";

const githubClientId = config.githubClientId;
const githubClientSecret = config.githubClientSecret;

const LocalStrategy = passportLocal.Strategy;

const cartManagerDB: CartManagerDB = new CartManagerDB();

const initializePassport = () => {
  // Register
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req: Request, username: string, password: string, done) => {
        try {
          const { email, firstName, lastName, age, rol } = req.body;
          const userExist = await usersModel.findOne({ email: username });
          if (userExist) {
            console.log("El usuario ya existe");
            return done(null, false); // User exist. No error.
          }
          const newCart: DbCart = await cartManagerDB.createCart();
          const newUser = {
            firstName,
            lastName,
            email,
            age,
            password: createHash(password),
            rol,
            cart: newCart._id,
          };
          const result = await usersModel.create(newUser);
          return done(null, result); // User successfully added
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Login
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username: string, password: string, done) => {
        try {
          const user: User = await usersModel.findOne({ email: username });
          if (!user) return done(null, false);
          const valid = isValidPassword(user, password);
          if (!valid) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // GitHub
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: githubClientId,
        clientSecret: githubClientSecret,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user: User = await usersModel.findOne({
            email: profile._json.email,
          });
          if (!user) {
            const newCart: DbCart = await cartManagerDB.createCart();
            const newUser = {
              firstName: profile._json.name || "firstName",
              lastName: profile._json.name || "lastName",
              // email: profile.emails[0].value || "email",
              email: profile.login || "email",
              age: 0,
              // password: profile._json.email,
              password: " ",
              // rol: profile._json.type.toLowerCase(),
              rol: "user",
              cart: newCart._id,
            };
            const result = await usersModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user: dbUser, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      let user: dbUser = await usersModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializePassport;
