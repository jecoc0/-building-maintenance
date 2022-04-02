const db = require('../config/connection');

const { Facility } = require('../models');
const { create } = require('../models/Facility');

console.log(Facility, "hi")

db.once('open', async () => {
    await Facility.deleteMany({});

    const facilityName = "City Offices";
    const address = "1234 Street";
    const photoName = "../../dummyassets/city-office.jpg"

    console.log("Creating faciliy");

    const createdFacility = await Facility.create({facilityName, address, photoName})


    console.log(createdFacility);

})

