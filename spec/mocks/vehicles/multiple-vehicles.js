// Mockups for the Vehicle class
// this mocks are for the case where the user doesnt specify which Vehicle and it returns a list
const Vehicle = require('../../../integrations/battlelog/models/Vehicle');

module.exports =
[
  // first player
  {
    rawr: new Vehicle({
      category: 'Soldier Equiment',
      kills: 41,
      serviceStars: 0,
      slug: 'rawr',
      timeIn: 0
    }),
    pwc: new Vehicle({
      category: 'Vehicle Transport',
      kills: 5,
      serviceStars: 0,
      slug: 'pwc',
      timeIn: 0
    }),
    ucav1: new Vehicle({
      category: 'Soldier Equiment',
      kills: 4,
      serviceStars: 0,
      slug: 'ucav1',
      timeIn: 18855
    })
  },
  // second player
  {
    rawr: new Vehicle({
      category: 'Soldier Equiment',
      kills: 41,
      serviceStars: 0,
      slug: 'rawr',
      timeIn: 0
    }),
    pwc: new Vehicle({
      category: 'Vehicle Transport',
      kills: 16565,
      serviceStars: 165,
      slug: 'pwc',
      timeIn: 0
    }),
    ucav1: new Vehicle({
      category: 'Soldier Equiment',
      kills: 4,
      serviceStars: 0,
      slug: 'ucav1',
      timeIn: 18855
    })
  },
  // third player
  {
    rawr: new Vehicle({
      category: 'Soldier Equiment',
      kills: 41,
      serviceStars: 0,
      slug: 'rawr',
      timeIn: 0
    }),
    pwc: new Vehicle({
      category: 'Vehicle Transport',
      kills: 5,
      serviceStars: 0,
      slug: 'pwc',
      timeIn: 0
    }),
    ucav1: new Vehicle({
      category: 'Soldier Equiment',
      kills: 1512,
      serviceStars: 15,
      slug: 'ucav1',
      timeIn: 18855
    })
  }
];
