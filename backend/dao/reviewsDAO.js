import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return
        }

        try {
            reviews = await conn.db("reviews").collection("reviews");
        } catch (error) {
            console.error(`Enable to establish collection handles in userDAO: ${error}`)
        }
    }
}