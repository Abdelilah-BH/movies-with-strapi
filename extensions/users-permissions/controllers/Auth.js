
module.exports = {
  async refreshToken(ctx) {
    const { authorization } = ctx.request.header;
    const cleanToken = authorization.replace("Bearer ", "");
    let payload = strapi.plugins["users-permissions"].services.jwt.verify(cleanToken);
    const promise = Promise.resolve(payload);
    promise.then(value => {
      ctx.send({isAuth: Date.now() / 1000 < value.exp, id: ctx.state.user.id, username: ctx.state.user.username});
    });
  },
};
