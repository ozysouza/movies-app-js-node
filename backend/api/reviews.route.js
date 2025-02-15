import express from "express";
import ReviewCtrl from "./reviews.controller.js"

const router = express.Router();

router.route("/movie/:id")
    .get(ReviewCtrl.apiGetReview);

router.route("/new")
    .post(ReviewCtrl.apiPostReview);

router.route("/:id")
    .get(ReviewCtrl.apiGetReview)
    .put(ReviewCtrl.apiUpdateReview)
    .delete(ReviewCtrl.apiDeleteReview)

export default router;