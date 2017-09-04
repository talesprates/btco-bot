module.exports = class Weapon {
  constructor(weapon) {
    this.category = weapon.category;
    this.headshots = weapon.headshots;
    this.kills = weapon.kills;
    this.kit = weapon.kit;
    this.serviceStars = weapon.serviceStars;
    this.shotsFired = weapon.shotsFired;
    this.shotsHit = weapon.shotsHit;
    this.slug = weapon.slug;
    this.timeEquipped = weapon.timeEquipped;
  }

  static add(w1, w2) {
    const weapon = {};
    weapon.category = w1.category;
    weapon.headshots = w1.headshots + w2.headshots;
    weapon.kills = w1.kills + w2.kills;
    weapon.kit = w1.kit;
    weapon.serviceStars = w1.serviceStars + w2.serviceStars;
    weapon.shotsFired = w1.shotsFired + w2.shotsFired;
    weapon.shotsHit = w1.shotsHit + w2.shotsHit;
    weapon.slug = w1.slug;
    weapon.timeEquipped = w1.timeEquipped + w2.timeEquipped;
    return new Weapon(weapon);
  }
};
