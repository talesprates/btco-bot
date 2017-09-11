module.exports = class Vehicle {
  constructor(vehicle) {
    this.category = vehicle.category;
    this.kills = vehicle.kills;
    this.serviceStars = vehicle.serviceStars;
    this.slug = vehicle.slug;
    this.timeIn = vehicle.timeIn;
  }

  static add(w1, w2) {
    const vehicle = {};
    vehicle.category = w1.category;
    vehicle.kills = w1.kills + w2.kills;
    vehicle.serviceStars = w1.serviceStars + w2.serviceStars;
    vehicle.slug = w1.slug;
    vehicle.timeIn = w1.timeIn + w2.timeIn;
    return new Vehicle(vehicle);
  }
};
