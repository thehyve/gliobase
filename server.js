import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import schema from './server/graphql';
import seeder from 'mongoose-seed';
import fs from 'fs';
import path from 'path';

dotenv.config()

const APP = express();

const PORT = process.env.PORT || 3001;

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
	APP.use(express.static("client/build"));
}

console.log(process.env.NODE_ENV)

if(true || process.env.NODE_ENV === "development"){
	const jsonData = JSON.parse(fs.readFileSync('data/output/seed.json', 'utf8'));
	seeder.connect(process.env.DB_CONNECTION, () => {
		seeder.loadModels([
			'server/models/Biomolecule.js',
			'server/models/Biomarker.js',
			'server/models/Source.js',
			'server/models/Category.js',
			'server/models/Evidence.js'
		])
		seeder.clearModels(['Biomolecule','Biomarker','Source','Category', 'Evidence'], () => {
			seeder.populateModels(jsonData, () => {
				//seeder.disconnect();
			})
		})
	})
}

mongoose.connect(process.env.DB_CONNECTION,
    {
        useCreateIndex: true,
        useNewUrlParser: true
    })
.then(() => {
	console.log("MongoDB connected")
})
.catch(err => console.log(err));

const SERVER = new ApolloServer({
    schema: schema,
    playground: {
        endpoint: `http://localhost:${PORT}/graphql`,
        settings: {
            'editor.theme': 'light'
        }
    }
});

SERVER.applyMiddleware({
    app: APP
});

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
	// Handles any requests that don't match the ones above
	APP.get('*', (req,res) =>{
		res.sendFile(path.join(__dirname+'/client/build/index.html'));
	});
}

APP.listen(PORT, () => {
  console.log(`The server has started on port: ${PORT}`);
  console.log(`http://localhost:${PORT}/graphql`);
});

export default APP;