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
//surgePhaseWall
const surgePhaseWall = new Wall("surge-phase-wall");
exports.surgePhaseWall = surgePhaseWall;
Object.assign(surgePhaseWall, {
 size: 1,
 scaledHealth: 1300,
 armor: 18,
 chanceDeflect: 12,
 flashHit: true,
 buildCostMultiplier: 0.8,
 requirements: ItemStack.with(
  Items.surgeAlloy, 6,
  Items.phaseFabric, 6
 ),
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
});
const surgePhaseWallLarge = new Wall("surge-phase-wall-large");
exports.surgePhaseWallLarge = surgePhaseWallLarge;
Object.assign(surgePhaseWallLarge, {
 size: 2,
 scaledHealth: 1250,
 armor: 18,
 chanceDeflect: 12,
 flashHit: true,
 buildCostMultiplier: 0.8,
 requirements: ItemStack.with(
  Items.surgeAlloy, 6 * 4,
  Items.phaseFabric, 6 * 4
 ),
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
});
//heavyTitanium
const heavyTitaniumWall = new Wall("heavy-titanium-wall");
exports.heavyTitaniumWall = heavyTitaniumWall;
Object.assign(heavyTitaniumWall, {
 size: 1,
 scaledHealth: 1000,
 armor: 4,
 buildCostMultiplier: 0.8,
 requirements: ItemStack.with(
  Items.thorium, 9,
  Items.titanium, 9
 ),
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
});
const heavyTitaniumWallLarge = new Wall("heavy-titanium-wall-large");
exports.heavyTitaniumWallLarge = heavyTitaniumWallLarge;
Object.assign(heavyTitaniumWallLarge, {
 size: 2,
 scaledHealth: 950,
 armor: 4,
 buildCostMultiplier: 0.8,
 requirements: ItemStack.with(
  Items.thorium, 9 * 4,
  Items.titanium, 9 * 4
 ),
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
});

const glassSteelWall = extend(Wall, "glass-steel-wall", {
 size: 1,
 scaledHealth: 1800,
 armor: 38,
 buildCostMultiplier: 0.8,
 chanceDeflect: 8,
 flashHit: true,
 absorbLasers: true,
 requirements: ItemStack.with(
  items.glassSteel, 6,
  Items.graphite, 2,
  items.chip, 2
 ),
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
 drawPlace(x, y, rotation, valid) {
  this.super$drawPlace(x, y, rotation, valid);
  Draw.color(Color.valueOf('#AFEFF3FF'));
  Draw.alpha(0.8);
  Draw.z(Layer.block);
  Lines.stroke(2);
  Lines.poly(x * 8, y * 8, 4, 10, 45);
 },
});

glassSteelWall.buildType = () =>
 extend(Wall.WallBuild, glassSteelWall, {
  draw() {
   // this.super$draw();
   let autotileRegions;
   if (!autotileRegions) {
    autotileRegions = TileBitmask.load(glassSteelWall.name + "-autotile"); // 贴图多了-autotile，这里也写吧，按理应该删掉-autotile
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
 });
exports.glassSteelWall = glassSteelWall;

/*const glassSteelWallLarge = new Wall("glass-steel-wall-large");
exports.glassSteelWallLarge = glassSteelWallLarge;
Object.assign(glassSteelWallLarge, {
 size: 2,
 scaledHealth: 1900,
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
});*/

const pulseWall = new ShieldWall("pulse-wall");
exports.pulseWall = pulseWall;
Object.assign(pulseWall, {
 size: 1,
 scaledHealth: 2400,
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
  items.chip, 2
 ),
 category: Category.defense,
 buildVisibility: BuildVisibility.shown
});
pulseWall.consumePower(0.25);

const pulseWallLarge = new ShieldWall("pulse-wall-large");
exports.pulseWallLarge = pulseWallLarge;
Object.assign(pulseWallLarge, {
 size: 2,
 scaledHealth: 2550,
 armor: 50,
 chanceDeflect: 12,
 shieldHealth: 1600,
 breakCooldown: 3200,
 regenSpeed: 3.2,
 hasPower: true,
 requirements: ItemStack.with(
  items.vibrantAlloy, 24,
  items.glassSteel, 8,
  Items.phaseFabric, 8,
  items.chip, 8
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
  items.chip, 3
 ),
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
 setStats() {
  this.super$setStats();
  this.stats.add(unHealable, false)
 },
});
rejection.buildType = prov(() =>
 extend(AutoDoor.AutoDoorBuild, rejection, {
  update() {
   this.super$update();  // 为什么是this._lastHealth？ 成员变量啊！
   // 初始化上一刻生命值（首次调用时）
   if (this._lastHealth === undefined) {
    this._lastHealth = this.health;
   }
   //在上一刻生命，现在生命，最大生命中取较小值赋予给生命
   this.health = Math.min(this._lastHealth, this.health, this.maxHealth);
   // 更新上一刻生命值为当前生命值
   this._lastHealth = this.health;
  },
  write(write) {
   this.super$write(write);
   write.f(this._lastHealth); // 持久化的地图写入
  },
  read(read, revision) {
   this.super$read(read, revision);
   this._lastHealth = read.f();     // 持久化的地图读取
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
 buildTime: 60,
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
 requirements: ItemStack.with(
  Items.graphite, 12,
  Items.silicon, 4,
  Items.titanium, 6,
 ),
 setStats() {
  this.super$setStats();
  this.stats.add(maxArmorMultiplier, "5");
  this.stats.add(maxHealthMultiplier, "5");
  this.stats.add(selfHealThreshold, "10 %");
  this.stats.add(selfHeal, 0.1 * 60);
 },
 drawPlace(x, y, rotation, valid) {
  this.super$drawPlace(x, y, rotation, valid);
  Draw.color(Color.valueOf('#ffd37f'));
  Draw.alpha(0.8);
  Draw.z(Layer.block);
  Lines.stroke(2);
  Lines.poly(x * 8, y * 8, 4, 10, 45);
 },
});
//const adamantaneWall = new Wall("adamantane-wall");


adamantaneWall.buildType = () =>
 extend(Wall.WallBuild, adamantaneWall, {
  draw() {
   // this.super$draw();
   let autotileRegions;
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

Events.on(EventType.ClientLoadEvent, () => {
 if (Vars.mods.getMod("new-horizon") != null) {
  glassSteelWall.health = 2000 * 2
  rejection.health = 2200 * 2
  pulseWall.health = 2400 * 2
  pulseWallLarge.health = 2400 * 2 * 4
  adamantaneWall.health = 400
 }
})