const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
  async createRestaurant(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be signed in to do that!");
    }
    const restaurant = await ctx.db.mutation.createRestaurant(
      {
        data: {
          // this is how we create a relationship between restaurant & user
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );

    return restaurant;
  },

  updateRestaurant(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateRestaurant(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async deleteRestaurant(parent, args, ctx, info) {
    const where = { id: args.id };

    const restaurant = await ctx.db.query.restaurant({ where }, `{id,name}`);

    return ctx.db.mutation.deleteRestaurant({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    args.username = args.username.toLowerCase();

    const password = await bcyrpt.hash(args.password, 10);

    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    return user;
  },

  async signin(parent, { username, password }, ctx, info) {
    // check if there is a user with that username
    const user = await ctx.db.query.user({ where: { username } });
    if (!user) {
      throw new Error(`User wasn't found for username ${username}`);
    }
    // check if their password is correct
    const valid = await bcyrpt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }
    // generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set the cookie with the token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // return the user :)
    return user;
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Goodbye!" };
  }
};

module.exports = Mutations;
