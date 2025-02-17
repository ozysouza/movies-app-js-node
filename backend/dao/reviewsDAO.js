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
}