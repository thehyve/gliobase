import Biomarker from '../../models/Biomarker';
import Category from '../../models/Category';
import Source from '../../models/Source';

export default {
    Query: {
      	biomarker: async (parent, {name}, context, info) => {
        	return await Biomarker.findOne({name: name}).exec();
      	},
      	biomarkers: async (parent, args, context, info) => {
			return await Biomarker.find({}).exec();
      	}
	},
	Biomarker: {
		category: async (biomarker) => {
			return await Category.findOne({_id: biomarker.categoryId}).exec();
		},
		source: async (biomarker) => {
			return await Source.findOne({_id: biomarker.sourceId}).exec();
		}
	}
}