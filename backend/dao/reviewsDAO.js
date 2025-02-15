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
}