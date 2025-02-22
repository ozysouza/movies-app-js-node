import app from './server.js';
import mongodb from 'mongodb';
import ReviewsDAO from './dao/reviewsDAO.js';

const MongoClient = mongodb.MongoClient;
const mongodb_passwd = process.env.MONGODB_PASSWD;
const mongodb_username = process.env.MONGODB_USERNAME;
const uri = `mongodb+srv://${mongodb_username}:${mongodb_passwd}@cluster0.q65d3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port = 8000;

async function connectToMongoDB() {
	const client = new MongoClient(uri, {
		maxPoolSize: 50,
		writeConcern: {
			w: 'majority',
			journal: true,
			wtimeout: 2500,
		},
	});

	try {
		await client.connect();
		await ReviewsDAO.injectDB(client);

		app.listen(port, () =>
			console.log(`Listening on port ${port}!`)
		);

		await client.db('admin').command({ ping: 1 });
		console.info('Connected to MongoDB!');
		return client;
	} catch (error) {
		console.error('Error connecting to MongoDBL', error);
		throw error;
	}
}

connectToMongoDB().catch(console.error);
