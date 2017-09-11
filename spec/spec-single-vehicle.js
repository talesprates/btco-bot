const { singleVehicles } = require('./mocks/vehicles');
const personaList = require('./mocks/personas');

const assertMessage =
  [
    '1. **Chap0linColorad0** *RAWR* - **41**',
    '2. **Pirat4Alm4Negr4** *PWC* - **5**',
    '3. **patodomau** *UCAV1* - **4**'
  ];

describe('Weapon Tracking Single Vehicle', () => {
  it('should display a message with a given vehicle stats of each persona', () => {
    const message = generateResponseMessage([singleVehicles, personaList]);
    expect(message).toEqual(assertMessage);
  });
});

function generateResponseMessage([vehicles, personas]) {
  const serverMessage = vehicles.map((vehicle, index) => {
    const sortedVehicles = Object.values(vehicle)
      .sort((vehicle1, vehicle2) => vehicle2.kills - vehicle1.kills);
    return { vehicle: sortedVehicles[0], persona: personas[index] };
  }).sort((player1, player2) => player2.vehicle.kills - player1.vehicle.kills)
    .map(({ vehicle, persona }, index) => `${index + 1}. **${persona.personaName}** *${vehicle.slug.toUpperCase()}* - **${vehicle.kills}**`);
  return serverMessage;
}
