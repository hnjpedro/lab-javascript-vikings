// Soldier
class Soldier {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }
  attack() {
    return this.strength;
  }
  receiveDamage(dmg) {
    this.health -= dmg;
  }
}

// Viking
class Viking extends Soldier {
  constructor(name, health, strength) {
    super(health, strength);
    this.name = name;
  }
  receiveDamage(dmg) {
    this.health -= dmg;
    if (this.health > 0) {
      return this.name + ' has received ' + dmg + ' points of damage';
    } else {
      return this.name + ' has died in act of combat';
    }
  }
  battleCry() {
    return 'Odin Owns You All!';
  }
}

// Saxon
class Saxon extends Soldier {
  receiveDamage(dmg) {
    this.health -= dmg;
    if (this.health > 0) {
      return 'A Saxon has received ' + dmg + ' points of damage';
    } else {
      return 'A Saxon has died in combat';
    }
  }
}

// War
class War {
  constructor() {
    this.vikingArmy = [];
    this.saxonArmy = [];
  }
  addViking(Viking) {
    this.vikingArmy.push(Viking);
  }
  addSaxon(Saxon) {
    this.saxonArmy.push(Saxon);
  }
  armyAttack(army) {
    let randomSaxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
    let randomVikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
    let randomSaxon = this.saxonArmy[randomSaxonIndex];
    let randomViking = this.vikingArmy[randomVikingIndex];
    if (army === 'Viking') {
      const attackResult = randomSaxon.receiveDamage(randomViking.strength);
      this.checkDead(randomSaxon);
      return attackResult;
    } else {
      const attackResult = randomViking.receiveDamage(randomSaxon.strength);
      this.checkDead(randomViking);
      return attackResult;
    }
  }
  checkDead(soldier) {
    if (soldier.health <= 0) {
      if (soldier instanceof Viking) {
        const index = this.vikingArmy.indexOf(soldier);
        if (index > -1) {
          this.vikingArmy.splice(index, 1);
        }
      } else {
        const index = this.saxonArmy.indexOf(soldier);
        if (index > -1) {
          this.saxonArmy.splice(index, 1);
        }
      }
    }
  }
  vikingAttack() {
    return this.armyAttack('Viking');
  }
  saxonAttack() {
    return this.armyAttack('Saxon');
  }
  showStatus() {
    if (this.saxonArmy.length == 0) {
      return 'Vikings have won the war of the century!';
    } else if (this.vikingArmy.length == 0) {
      return 'Saxons have fought for their lives and survived another day...';
    } else {
      return 'Vikings and Saxons are still in the thick of battle.';
    }
  }
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = { Soldier, Viking, Saxon, War };
}
