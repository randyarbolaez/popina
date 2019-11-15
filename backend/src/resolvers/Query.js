const { forwardTo } = require("prisma-binding");

const Query = {
  restaurants: forwardTo("db"),
  restaurant: forwardTo("db"),
  restaurantsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    // check if current user ID
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  }
};

module.exports = Query;
