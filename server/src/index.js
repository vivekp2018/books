import { config } from "dotenv";
config({ path: ".env" });
import cookieParser from "cookie-parser";
import axios from "axios";
import jwt from "jsonwebtoken";
import createServer from "./createServer";
const server = createServer();
server.express.use(cookieParser());
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }

  next();
});
/*server.express.get("/books/:name", async (req, res, next) => {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${
      req.params.name
    }&key=${process.env.BOOK_API_KEY}&maxResults=10`;
    const books = await axios.get(url);
    if (books.data && books.data.items) {
        const filteredBooks = books.data.items.map((book)=>{
            return {
                title:book.volumeInfo.title,
                description: book.volumeInfo.description,
                authors:book.volumeInfo.authors.map
                
            }
        })
      res.send(books.data.items);
    }
    //title
    //description
    //authors
    //publisher
  } catch (e) {
    console.log(e.Error);
  }
});*/
server.start(
  {
    cors: {
      credentials: true,
      origin: true
    }
  },
  () => {
    console.log("server running");
  }
);
