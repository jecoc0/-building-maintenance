const Facility = require("../models/Facility")

const resolvers = {
    Query: {
        facilities: async () => {
            return Facility.find();
        }
    },

    Mutation: {
        addFacility: async (parent,args) => {
            const facility = Facility.create({...args});
            return facility;
        }
    }
}

module.exports = resolvers;