import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import _ from "lodash";
const Mutation = {
  async signUp(parent, { data }, { db }, info) {
    const password = await bcrypt.hash(data.password, 10);
    const newData = Object.assign({}, data, { password });
    const user = await db.mutation.createUser({
      data: {
        ...newData
      }
    });
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    const retUser = _.omit(user, ["password"]);
    return { user: retUser, token };
  },
  async login(parent, { data }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email: data.email } });
    if (!user) {
      throw new Error("User not found");
    }
    const matched = await bcrypt.compare(data.password, user.password);
    if (!matched) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    const retUser = _.omit(user, ["password"]);
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 31
    });
    return {
      token,
      user: retUser
    };
  },
  async createAuthor(parent, { data }, { db }, info) {
    const author = await db.mutation.createAuthor({ data });
    return author;
  },
  async createPublisher(parent, { data }, { db }, info) {
    const publisher = await db.mutation.createPublisher({ data });
    return publisher;
  },
  async createBook(parent, { data }, { db }) {
    const book = await db.mutation.createBook(
      {
        data: {
          title: data.title,
          description: data.description,
          image: data.image,
          authors: {
            connect: {
              id: data.author
            }
          },
          publisher: {
            connect: {
              id: data.publisher
            }
          }
        }
      },
      `{ id title description image authors { id name } publisher{ name }}`
    );
    return book;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "success" };
  }
};

export default Mutation;
