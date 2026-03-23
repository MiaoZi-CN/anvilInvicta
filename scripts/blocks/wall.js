const items = require("items")
var damageThreshold = Stat("damageThreshold");
var unHealable = Stat("unHealable");
var maxArmorMultiplier = Stat("maxArmorMultiplier");
var maxHealthMultiplier = Stat("maxHealthMultiplier");
var selfHealThreshold = Stat("selfHealThreshold");
var selfHeal = Stat("selfHeal");
const armorBlock = new Wall("armor-block");
exports.armorBlock = armorBlock;
Object.assign(armorBlock, {
 hasPower: true,
 conductivePower: true,
 size: 1,
 variants: 4,
 health: 8000,
 armor: 48,
 buildCostMultiplier: 0.8,
 chanceDeflect: 40,
 flashHit: true,
 absorbLasers: true,
 category: Category.defense,
 buildVisibility: BuildVisibility.shown
});
const compositeWall = extend(Wall, "composite-wall", {
 size: 2,
 scaledHealth: 660,
 armor: 6,
 update: true,
 absorbLasers: true,
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
 requirements: ItemStack.with(
  Items.titanium, 24,
  Items.graphite, 8,
  Items.plastanium, 8,
 ),
 setStats() {
  this.super$setStats();
  this.stats.add(damageThreshold, "20")
 },
})

compositeWall.buildType = prov(() =>
 extend(Wall.WallBuild, compositeWall, {
  collision(bullet) {
   if (bullet.damage < 20) {
    bullet.damage = 0
   }
   if (bullet.splashDamage < 20) {
    bullet.splashDamage = 0
   }//没错，是分开算的，没想到吧？
   this.super$collision(bullet);
   return true
  }
 }))//splashDamage
exports.compositeWall = compositeWall;


//carbon-fiber-reinforced-wall
const carbonFiberReinforcedWall = new Wall("carbon-fiber-reinforced-wall");
exports.carbonFiberReinforcedWall = carbonFiberReinforcedWall;
Object.assign(carbonFiberReinforcedWall, {
 size: 1,
 scaledHealth: 800,
 armor: -8,
 buildCostMultiplier: 0.8,
 requirements: ItemStack.with(
  Items.graphite, 32
 ),
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
});


const glassSteelWall = new Wall("glass-steel-wall");
exports.glassSteelWall = glassSteelWall;
Object.assign(glassSteelWall, {
 size: 1,
 scaledHealth: 1600,
 armor: 38,
 buildCostMultiplier: 0.8,
 chanceDeflect: 8,
 flashHit: true,
 absorbLasers: true,
 requirements: ItemStack.with(
  items.glassSteel, 6,
  Items.graphite, 2
 ),
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
});

const glassSteelWallLarge = new Wall("glass-steel-wall-large");
exports.glassSteelWallLarge = glassSteelWallLarge;
Object.assign(glassSteelWallLarge, {
 size: 2,
 scaledHealth: 1650,
 armor: 40,
 buildCostMultiplier: 0.8,
 chanceDeflect: 8,
 flashHit: true,
 absorbLasers: true,
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
 requirements: ItemStack.with(
  items.glassSteel, 24,
  Items.graphite, 8,
 ),
});

const pulseWall = new ShieldWall("pulse-wall");
exports.pulseWall = pulseWall;
Object.assign(pulseWall, {
 size: 1,
 scaledHealth: 2200,
 armor: 46,
 chanceDeflect: 12,
 hasPower: true,
 shieldHealth: 400,
 breakCooldown: 3200,
 regenSpeed: 0.8,
 requirements: ItemStack.with(
  items.vibrantAlloy, 6,
  items.glassSteel, 2,
  Items.phaseFabric, 2,
 ),
 category: Category.defense,
 buildVisibility: BuildVisibility.shown
});
pulseWall.consumePower(0.25);

const pulseWallLarge = new ShieldWall("pulse-wall-large");
exports.pulseWallLarge = pulseWallLarge;
Object.assign(pulseWallLarge, {
 size: 2,
 scaledHealth: 2350,
 armor: 50,
 chanceDeflect: 12,
 shieldHealth: 1600,
 breakCooldown: 3200,
 regenSpeed: 3.2,
 hasPower: true,
 requirements: ItemStack.with(
  items.vibrantAlloy, 24,
  items.glassSteel, 8,
  Items.phaseFabric, 8
 ),
 category: Category.defense,
 buildVisibility: BuildVisibility.shown
});
pulseWallLarge.consumePower(1);

//他不是墙!!!
const rejection = extend(AutoDoor, "rejection", {
 size: 1,
 health: 1800,
 armor: 12,
 update: true,
 insulated: true,
 absorbLasers: true,
 requirements: ItemStack.with(
  items.glassSteel, 10,
  Items.graphite, 3,
  Items.silicon, 3
 ),
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
 setStats() {
  this.super$setStats();
  this.stats.add(unHealable, "cannot")
 },
});
rejection.buildType = prov(() =>
 extend(AutoDoor.AutoDoorBuild, rejection, {
  update() {
   this.super$update();
   this.maxHealth = Math.min(this.maxHealth, this.health)
  }
 })
);
exports.rejection = rejection;

const adamantaneWall = extend(Wall, "adamantane-wall", {
 size: 1,
 health: 250,
 armor: 4,
 update: true,
 absorbLasers: false,
 drawCracks: false,
 chanceDeflect: 2,
 flashHit: true,
 autotiler: true,
 autotileMidVariants: 1,
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
 requirements: ItemStack.with(
  Items.graphite, 12,
  Items.titanium, 6,
 ),
 setStats() {
  this.super$setStats();
  this.stats.add(maxArmorMultiplier, "5");
  this.stats.add(maxHealthMultiplier, "5");
  this.stats.add(selfHealThreshold, "10 %");
  this.stats.add(selfHeal, 0.1 * 60);
 }
});
//const adamantaneWall = new Wall("adamantane-wall");

let autotileRegions;
adamantaneWall.buildType = () =>
 extend(Wall.WallBuild, adamantaneWall, {
  draw() {
   // this.super$draw();
   if (!autotileRegions) {
    autotileRegions = TileBitmask.load(adamantaneWall.name + "-autotile"); // 贴图多了-autotile，这里也写吧，按理应该删掉-autotile
   }//我受够了
   const { x, y } = this;
   let bits = 0;
   for (let i = 0; i < 8; i++) {
    let p = Geometry.d8[i];
    let other = this.nearby(p.x, p.y);
    if (other != null && other.block == this.block) {
     bits |= (1 << i);
    }
   }
   let bit = TileBitmask.values[bits];
   const region = autotileRegions[bit];
   Draw.rect(region, x, y);
  },
  updateTile() {
   this.super$updateTile();
   let count = 0;
   this.proximity.each((other) => {
    if (other.block == this.block) {
     count++;
    }
   });
   this.armor = this.block.armor * count + this.block.armor
   this.maxHealth = this.block.health * count + this.block.health
  },
  update() {
   this.super$update();
   if (this.health > this.maxHealth * 0.1) { Math.min(this.health += 0.1, this.maxHealth) };
  }
 });
exports.adamantaneWall = adamantaneWall;
//Object.assign(adamantaneWall, {})


