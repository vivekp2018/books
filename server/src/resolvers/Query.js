import getuserId from "../utils/getUserId";
const Query = {
  async users(parent, { id, email }, { db, request }, info) {
    const userId = getuserId(request);
    if (!userId) {
      throw new Error("invalid Authorization");
    }
    const users = await db.query.users({
      where: {
        OR: [
          {
            id
          },
          { email }
        ]
      }
    });
    return users;
  },
  async books(parent, { id, title, author, publisher }, { db }, info) {
    let searchObj = {};

    if (id || title || author || publisher) {
      let conditionObj = [];

      id ? conditionObj.push({ id }) : "";

      title ? conditionObj.push({ title }) : "";

      author ? conditionObj.push({ authors_some: { id_in: [author] } }) : "";

      publisher ? conditionObj.push({ publisher }) : "";

      searchObj.where = {
        AND: conditionObj
      };
    }

    //`{id title description authors { id name } publisher {id name}}`
    const books = await db.query.books(searchObj, info);
    return books;
  },
  async authors(parent, { id, name }, { db }, info) {
    let searchObj = {};
    if (id || name) {
      let conditionObj = [];

      id ? conditionObj.push({ id }) : "";

      name ? conditionObj.push({ name }) : "";
      searchObj.where = {
        AND: conditionObj
      };
    }
    const authors = await db.query.authors(searchObj, info);
    return authors;
  },
  async publishers(parent, { id, name }, { db }, info) {
    let searchObj = {};
    if (id || name) {
      let conditionObj = [];

      id ? conditionObj.push({ id }) : "";

      name ? conditionObj.push({ name }) : "";
      searchObj.where = {
        AND: conditionObj
      };
    }
    const publishers = await db.query.publishers(searchObj, info);
    return publishers;
  },
  async me(parent, args, { db, request }, info) {
    const { userId } = request;
    if (!userId) {
      return null;
    }
    return await db.query.user(
      {
        where: {
          id: userId
        }
      },
      info
    );
  }
};
export default Query;
