import Elysia, { t } from "elysia";
import deleteUsers from "./deleteUsers";
import getUsers from "./getUsers";
import postUsers from "./postUsers";
import updateUsers from "./putUsers";



const usersInfo = new Elysia().group("/users", (app) =>
  app
    .get("/", getUsers)
    .put("/", updateUsers)
    .post("/", postUsers)
    .delete("/", deleteUsers)
);

export default usersInfo;
