import express from "express";

import { getUser, getUserFollows, addRemoveFollow } from "../Controllers/Users";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFollows);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFollow);
