import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import {
  findUserByEmail,
  findUserById,
} from "../services/userService.js";

export function configurePassport() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await findUserByEmail(email);

          if (!user) {
            return done(null, false, {
              message: "Invalid email or password.",
            });
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            user.passwordHash,
          );

          if (!passwordsMatch) {
            return done(null, false, {
              message: "Invalid email or password.",
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user._id.toString());
  });

  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await findUserById(userId);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });

  return passport;
}
