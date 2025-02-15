import ReviewsDAO from "./dao/reviewsDAP.js";

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = req.body.movieId;
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review
            );
            res.status(200)
                .json({
                    status: "success"
                });
        } catch (error) {
            res.status(500)
                .json({
                    error: error.message
                });
        }
    }

    static async apiGetReview(req, res, next) {
        try {
            let id = req.params.id || {};
            let review = await ReviewsDAO.getReview(id);
            if (!review) {
                res.status(404)
                    .json({
                        error: "Not found"
                    });
            }
        } catch (error) {
            console.error(`api, ${error}`);
            res.status(500)
                .json({
                    error: error.message
                });
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const review = req.body.id;
            const user = req.body.id;

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review
            );

            var { error } = reviewResponse;
            if (error) {
                res.status(400)
                    .jsonq({
                        error
                    });
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update review",
                );
            }

            res.json({
                status: "success"
            });
        } catch (error) {
            res.status(500)
                .json({
                    error: error.message
                });
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.params.id;
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId);

            if (reviewResponse) {
                res.json({
                    status: "success"
                });
            }
        } catch (error) {
            res.status(500)
                .json({
                    error: error.message
                });
        }
    }

    static async apiGetReviews(req, res, next) {
        try {
            let id = req.params.id || {};
            let reviews = await ReviewsDAO.getReviewsByMovieId(id);
            if (!reviews) {
                res.status(404)
                    .json({
                        error: "Not found"
                    });
            }
            res.json(reviews);
        } catch (error) {
            console.error(`api, ${error}`);
            res.status(500)
                .json({
                    error: error.message
                });
        }
    }

}