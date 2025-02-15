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
}