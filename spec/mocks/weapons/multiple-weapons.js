// Mockups for the weapon class
// this mocks are for the case where the user doesnt specify which weapon and it returns a list
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
    }),
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
    }),
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
  },
  // second player
  {
    mpx: new Weapon({
      category: 'PDWs',
      headshots: 1041,
      kills: 5855,
      kit: [2],
      serviceStars: 58,
      shotsFired: 184437,
      shotsHit: 31106,
      slug: 'mpx',
      timeEquipped: 173569
    }),
    aws: new Weapon({
      category: 'LMGs',
      headshots: 499,
      kills: 2577,
      kit: [32],
      serviceStars: 25,
      shotsFired: 103972,
      shotsHit: 13908,
      slug: 'aws',
      timeEquipped: 64237
    }),
    mp7: new Weapon({
      category: 'PDWs',
      headshots: 226,
      kills: 1286,
      kit: [2],
      serviceStars: 12,
      shotsFired: 57201,
      shotsHit: 8634,
      slug: 'mp7',
      timeEquipped: 36566
    })
  },
  // third player
  {
    bayonet: new Weapon({
      category: 'Special',
      headshots: null,
      kills: 864,
      kit: [8, 1, 2, 32],
      serviceStars: 8,
      shotsFired: null,
      shotsHit: null,
      slug: 'bayonet',
      timeEquipped: null
    }),
    p90: new Weapon({
      category: 'PDWs',
      headshots: 166,
      kills: 790,
      kit: [2],
      serviceStars: 7,
      shotsFired: 37987,
      shotsHit: 5524,
      slug: 'p90',
      timeEquipped: 22127
    }),
    cs5: new Weapon({
      category: 'Sniper Rifles',
      headshots: 211,
      kills: 727,
      kit: [8],
      serviceStars: 7,
      shotsFired: 3896,
      shotsHit: 1119,
      slug: 'cs5',
      timeEquipped: 34761
    })
  }
];
