// Mockups for the weapon class
// this mocks are for the case where the each user return just one weapon
const Weapon = require('../../../integrations/battlelog/models/Weapon');

module.exports =
[
  // first player
  {
    m416: new Weapon({
      category: 'Assault Rifles',
      headshots: 1894,
      kills: 10349,
      kit: [1],
      serviceStars: 103,
      shotsFired: 376801,
      shotsHit: 62048,
      slug: 'm416',
      timeEquipped: 267932
    })
  },
  // second player
  {
    g18: new Weapon({
      category: 'Handguns',
      headshots: 658,
      kills: 3339,
      kit: [8, 1, 2, 32],
      serviceStars: 33,
      shotsFired: 91103,
      shotsHit: 17428,
      slug: 'g18',
      timeEquipped: 69796
    })
  },
  // third player
  {
    bulldog: new Weapon({
      category: 'Assault Rifles',
      headshots: 560,
      kills: 3056,
      kit: [1],
      serviceStars: 30,
      shotsFired: 80714,
      shotsHit: 12809,
      slug: 'bulldog',
      timeEquipped: 85025
    })
  }
];
