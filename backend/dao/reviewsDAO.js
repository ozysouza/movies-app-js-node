import mongodb from "mongodb";

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return
        }

        try {
            reviews = await conn.db("reviews").collection("reviews");
            console.info("Reviews collection initialized!");
        } catch (e) {
            console.error(`Enable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review) {
        try {
            if (!reviews) {
                throw new Error("No database connection. Reviews collection is not initialized.");
            }

            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review
            }

            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Enable to post review: ${e}`)
        }
    }

    static async getReview(reviewId) {
        try {
            return await reviews.findOne({
                _id: reviewId
            });
        } catch (e) {
            console.error(`Enable to request post: ${e}`)
            return { error: e.message }
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            const updateResponse = await reviews.updateOne(
                { _id: reviewId },
                { $set: { user: user, review: review } }
            );

            return updateResponse;
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e.message };
        }
    }

    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: reviewId,
            });

            return deleteResponse;
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e.message };
        }
    }

    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await reviews.find({
                movieId: parseInt(movieId)
            });

            return cursor.toArray();
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e.message };
        }
    }
}