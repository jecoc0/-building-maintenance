const {gql} = require('apollo-server-express');
const { modelName } = require('../models/Facility');

const typeDefs = gql`
    type Facility {
        _id: ID
        facilityName: String
    }

    type Query {
        facilities: [Facility]
    }

    type Mutation {
        addFacility(facilityName: String) : Facility
    }
`

module.exports = typeDefs;