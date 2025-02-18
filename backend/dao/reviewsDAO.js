import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
    async injectDB(conn) {
        if (reviews) {
            return
        }

        try {
            reviews = await conn.db("reviews").collection("reviews");
        } catch (error) {
            console.error(`Enable to establish collection handles in userDAO: ${error}`)
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review
            }

            return await reviews.insertOne(reviewDoc);
        } catch (error) {
            console.error(`Enable to post review: ${error}`)
        }
    }

    static async getReview(reviewId) {
        try {
            return await reviews.findOne({

                _id: ObjectId(reviewId)
            })
        } catch (error) {
            console.error(`Enable to request post: ${error}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            const updateResponse = await reviews.updateOne(
                { _id: ObjectId(reviewId) },
                { $set: { user: user, review: review } }
            );

            return updateResponse;
        } catch (error) {
            console.error(`Unable to update review: ${error}`);
            return { error: error };
        }
    }

    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
            });

            return deleteResponse;
        } catch (error) {
            console.error(`Unable to update review: ${error}`);
            return { error: error };
        }
    }

    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await reviews.find({
                movieId: parseInt(movieId)
            });

            return cursor.toArray();
        } catch (error) {
            console.error(`Unable to update review: ${error}`);
            return { error: error };
        }
    }
}