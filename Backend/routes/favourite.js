import express from "express";

import {
  postAddFavourite,
  getFavourites,
  removeFavourite,
} from "../controller/favourite.js";

const favouriteRouter = express.Router();

favouriteRouter.post("/favourite-product/product/:id", postAddFavourite);

favouriteRouter.get("/favourites", getFavourites);

favouriteRouter.delete("/remove-favourite/favourite/:id", removeFavourite);

export default favouriteRouter;
