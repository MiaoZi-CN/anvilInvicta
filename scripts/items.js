


const alpha = new Item('alpha-crystal', Color.valueOf('#E43B44FF'));
exports.alpha = alpha;
Object.assign(alpha, {
 cost: 3.5,
 radioactivity: 0,
 explosiveness: 0.2,
 flammability: 1.8,
 hardness: 4,
 charge: 0.2,
 alwaysUnlocked: true,
});

const zenium = new Item('zenium', Color.valueOf('#F2A983FF'));
exports.zenium = zenium;
Object.assign(zenium, {
 cost: 3.5,
 radioactivity: 1.2,
 explosiveness: 0.2,
 flammability: 0.2,
 hardness: 6,
 charge: 0,
 alwaysUnlocked: true,
});

const xunetium = new Item('xunetium', Color.valueOf('#F2E5C9FF'));
exports.xunetium = xunetium;
Object.assign(xunetium, {
 cost: 1.25,
 radioactivity: 0,
 explosiveness: 0,
 flammability: 0,
 hardness: 4,
 charge: 0.2,
 alwaysUnlocked: true,
});

const vibrantAlloy = new Item('vibrant-alloy', Color.valueOf('#DEEDFFFF'));
exports.vibrantAlloy = vibrantAlloy;
Object.assign(vibrantAlloy, {
 cost: 6,
 radioactivity: 0.2,
 explosiveness: 0,
 flammability: 0,
 hardness: 7,
 charge: 1.4,
 alwaysUnlocked: true,
});

const glassSteel = new Item('glass-steel', Color.valueOf('#AFEFF3FF'));
exports.glassSteel = glassSteel;
Object.assign(glassSteel, {
 cost: 4,
 radioactivity: 0.05,
 explosiveness: 0,
 flammability: 0.05,
 hardness: 5,
 charge: 0,
 alwaysUnlocked: true,
});

const laindrium = new Item('laindrium', Color.valueOf('#F77622FF'));
exports.laindrium = laindrium;
Object.assign(laindrium, {
 cost: 8,
 radioactivity: 0,
 explosiveness: 0,
 flammability: 0,
 hardness: 6,
 charge: 0.2,
 alwaysUnlocked: true,
});

const phaseCoreEnergy = new Item('phase-core-energy', Color.valueOf('#FFE9D1FF'));
exports.phaseCoreEnergy = phaseCoreEnergy;
Object.assign(phaseCoreEnergy, {
 cost: 0,
 radioactivity: 0,
 explosiveness: 4,
 flammability: 2,
 hardness: 0,
 charge: 2,
 alwaysUnlocked: true,
});

//const chip = new Item('chip', Color.valueOf('#6E7080FF'));
//structure
const wiredGlass = new Item('wired-glass', Color.valueOf('#ffffffff'));
exports.wiredGlass = wiredGlass;
const structure = new Item('structure', Color.valueOf('#E0E9FFFF'));
structure.cost = 2,
exports.structure = structure;
const chip = extend(Item, "chip", {
 color: Color.valueOf('#6E7080FF'),
 compute: 30,
 setStats() {
  this.super$setStats();
  this.stats.add(Stat("computeTier"), this.compute);
 }
});
exports.chip = chip;

const viaonChip = extend(Item, "viaon-chip", {
 color: Color.valueOf('#D99F6BFF'),
 compute: 1500,
 setStats() {
  this.super$setStats();
  this.stats.add(Stat("computeTier"), this.compute);
 }
});
exports.viaonChip = viaonChip;

const crystalProcessor = extend(Item, "crystal-processor", {
 color: Color.valueOf('#0A9EFFFF'),
 compute: 90000,
 setStats() {
  this.super$setStats();
  this.stats.add(Stat("computeTier"), this.compute);//算力！
 }
});
exports.crystalProcessor = crystalProcessor;

exports.dirac = dirac;
const dirac = extend(Item, "dirac", {
 color: Color.valueOf('#6CDB58FF'),
 compute: 720000,
 setStats() {
  this.super$setStats();
  this.stats.add(Stat("computeTier"), this.compute);//算力！
 }
});
exports.dirac = dirac;