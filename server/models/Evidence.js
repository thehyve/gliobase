import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	_id: {
		type: String,
		validate: {
			validator: function(v) {
			  return /E([A-Z0-9]){6}/.test(v);
			},
			message: props => `${props.value} is not a valid evidence ID of the form EXXXXXX.`
		  }
	},
	biomarkerId: {
		type: String,
		ref: 'Biomarker',
		required: true
	},
	pmid: String,
  	sourceIds: [{
	  type: String,
	  ref: 'Source'
  	}],
	samples: String,
	species: [String],
	age: {
		min: Number,
		max: Number,
		med: Number,
		avg: Number,
		sd: Number,
		range: {
			cutoff: Number,
			under: Number,
			over: Number
		} 
	},
	gender: {
		male: Number,
		female: Number,
		other: Number
	},
	stage: [String],
	whoclass: String,
	region: [String],
	research: {
		methods: [String],
		results: [String],
		conclusions: [String]
	},
	application: {
		validated: String,
		valcom: String,
		diagnosis: String,
		prognosis: String,
		predictive: String,
		therapeutic: String
	},
	clinical:{
		relevance: String,
		implication: String,
		treatment: String
	},
	comments: String,
	curator: String
});

schema.virtual('biomarker', {
	ref: 'Biomarker', // The model to use
	localField: 'biomarkerId', // Find people where `localField`
	foreignField: '_id', // is equal to `foreignField`
});

export default mongoose.model("Evidence", schema);