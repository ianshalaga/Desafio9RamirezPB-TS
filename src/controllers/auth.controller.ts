import { Request } from "express";
import { createHash, isValidPassword } from "../utils/passwordHashing";
// Interfaces
import DbCart from "../interfaces/DbCart";
import dbUser from "../interfaces/dbUser";
// Services
import cartDbService from "../dao/services/cartDB.service";
import userService from "../dao/services/user.service";

class AuthController {
  constructor() {}

  // @@@@
  async register(req: Request, username: string, password: string, done) {
    try {
      const { email, firstName, lastName, age, rol } = req.body;
      const userExist: dbUser = await userService.getUser(email);
      if (userExist) {
        console.log("El usuario ya existe");
        return done(null, false); // User exist. No error.
      }
      const newCart: DbCart = await cartDbService.createCart();
      const newUser = {
        firstName,
        lastName,
        email,
        age,
        password: createHash(password),
        rol,
        cart: newCart._id,
      };
      const result = await userService.createUser(newUser);
      return done(null, result); // User successfully added
    } catch (error) {
      return done(error);
    }
  }

  // @@@@
  async login(username: string, password: string, done) {
    try {
      const user: dbUser = await userService.getUser(username);
      if (!user) return done(null, false);
      const valid = isValidPassword(user, password);
      if (!valid) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }

  // @@@@
  async githubLogin(accessToken, refreshToken, profile, done) {
    try {
      const user: dbUser = await userService.getUser(profile._json.email);
      if (!user) {
        const newCart: DbCart = await cartDbService.createCart();
        const newUser = {
          firstName: profile._json.name || "firstName",
          lastName: profile._json.name || "lastName",
          email: profile.login || "email",
          age: 0,
          password: " ",
          rol: "user",
          cart: newCart._id,
        };
        const result = await userService.createUser(newUser);
        done(null, result);
      } else {
        done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  }

  // @@@@
  async serializeUser(user: dbUser, done) {
    done(null, user._id);
  }

  // @@@@
  async deserializeUser(id: string, done) {
    try {
      let user: dbUser = await userService.getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}

export default new AuthController();
