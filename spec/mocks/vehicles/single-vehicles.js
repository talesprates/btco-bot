// Mockups for the Vehicle class
// this mocks are for the case where the each user return just one Vehicle
const Vehicle = require('../../../integrations/battlelog/models/Vehicle');

module.exports =
[
  // first vehicle
  {
    rawr: new Vehicle({
      category: 'Soldier Equiment',
      kills: 41,
      serviceStars: 0,
      slug: 'rawr',
      timeIn: 0
    })
  },
  // second vehicle
  {
    pwc: new Vehicle({
      category: 'Vehicle Transport',
      kills: 5,
      serviceStars: 0,
      slug: 'pwc',
      timeIn: 0
    })
  },
  // third vehicle
  {
    ucav1: new Vehicle({
      category: 'Soldier Equiment',
      kills: 4,
      serviceStars: 0,
      slug: 'ucav1',
      timeIn: 18855
    })
  }
];
