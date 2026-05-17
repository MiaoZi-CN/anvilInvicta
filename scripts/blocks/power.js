const fluids = require("fluids");
const items = require("items");
var shell = Core.atlas.find("shell")
//hightech-power-node highTechPowerNode 动力节点
const particle = new ParticleEffect();
Object.assign(particle, {
 particles: 1,
 sizeTo: 0,
 sizeFrom: 3,
 colorTo: Color.valueOf("#ffffff"),
 colorFrom: Color.valueOf("#A8BDFFFF"),
 cone: -360,
 lifetime: 30,
 layer: 100,
 length: 36,
 region: shell,
 useRotation: false,
 baseRotation: 0,
})

const highTechPowerNode = extend(PowerNode, "hightech-power-node", {
 size: 1,
 health: 160,
 buildTime: 0.5,
 laserRange: 12,
 maxNodes: 6,
 update: true,
 category: Category.power,
 buildVisibility: BuildVisibility.shown,
 placeableLiquid: true,
 selfHeal:10,
 requirements: ItemStack.with(
  Items.titanium, 5,
  Items.silicon, 3,
 ),
 setStats() {//stat部分，显示修复速度
  this.super$setStats();
  this.stats.add(Stat("selfHeal"), "40");
 },
  loadIcon() {//获取图标
  this.super$loadIcon();
  this.fullIcon = this.uiIcon = Core.atlas.find(this.name + "-full");
 },
});

highTechPowerNode.buildType = () =>
 extend(PowerNode.PowerNodeBuild, highTechPowerNode, {
  updateTile() {//电网，这里写不下，去看LMM的消耗器部分，实际上PowerNode本身甚至不需要update，但为了更新自己是属性需要使用update。
   if (!this.power) return;
   const graph = this.power.graph;
   if (!graph) return;

   // 获取当前帧的发电量和需求电量（单位：功率/帧）
   const produced = graph.getLastPowerProduced();
   const needed = graph.getLastPowerNeeded();
   this.surplus = produced - needed;   // 正值代表盈余
   
   if (this.surplus > 0.001) {
    // 每秒恢复 10 生命值
    this.health = Math.min(this.block.health, this.health + 40/60);
    if (Mathf.chanceDelta(0.1) && this.health < this.block.health) { // 每帧 10% 几率，约 6次/秒（60帧）
     particle.at(this.x, this.y);
    }
   }
  },
  draw() {
   const tile = this.tile;
   if (!tile) return;
   const floor = tile.floor();
   Draw.z(Layer.floor + 0.01);
   if (floor != null && floor.isLiquid) {
    Draw.rect(Core.atlas.find(this.block.name + "-bottom"), this.x, this.y,);
   }
   Draw.reset(),
    Draw.z(Layer.block);
   if (this.surplus > 0.001 && this.health < this.block.health) { // 每帧 10% 几率，约 6次/秒（60帧）
    Draw.rect(Core.atlas.find(this.block.name + "-fix"), this.x, this.y,);
   }
   else {
    Draw.rect(Core.atlas.find(this.block.name + "-unfix"), this.x, this.y,);
   }
   this.super$draw()
  }
 })








const steamPressurizer = new ThermalGenerator("steam-pressurizer");
exports.steamPressurizer = steamPressurizer;
Object.assign(steamPressurizer, {
 outputLiquid: new LiquidStack(fluids.steam, 0.1),
 size: 3,
 health: 680,
 // attribute: Attribute.steam,
 displayEfficiencyScale: 0,
 displayEfficiency: false,
 generateEffect: Fx.none,
 effectChance: 0,
 // ambientSound: Sounds.steam,
 // ambientSoundVolume: 0.06,
 squareSprite: false,
 hasLiquids: true,
 liquidCapacity: 30,
 fogRadius: 3,
 drawer: new DrawMulti(
  new DrawRegion("-bottom"),
  Object.assign(new DrawLiquidTile(fluids.steam), {
   //suffix: "-steam"
   padLeft: 9.5,
   padRight: 9.5,
   padTop: 9.5,
   padBottom: 9.5
  }),
  new DrawDefault()
 ),
 powerProduction: 0.1,
 buildVisibility: BuildVisibility.shown,
 category: Category.power,
 requirements: ItemStack.with(
  Items.beryllium, 40,
  Items.graphite, 30,
  Items.silicon, 20,
 )
})
/*
const turbineSet = new ImpactReactor("turbine-set");
exports.turbineSet = turbineSet;
Object.assign(turbineSet, {
 health: 2000,
 size: 3,
 powerProduction: 10,
 warmupSpeed: 0.08,
 liquidCapacity: 200, //液体容量
 explosionRadius: 24, //爆炸半径
 explosionDamage: 1200, //爆炸伤害
 drawer: new DrawMulti(
  new DrawRegion("-bottom"),
  Object.assign(new DrawLiquidTile(fluids.steam), {
   //   suffix: "-steam"
  }),
  new DrawRegion("-rotator", 40),
  new DrawDefault()
 ),
 buildVisibility: BuildVisibility.shown,
 category: Category.power,
 requirements: ItemStack.with(
  Items.beryllium, 100,
  Items.graphite, 40,
  Items.silicon, 30,
 )
})
turbineSet.consumePower(1)
turbineSet.consumeLiquid(fluids.steam, 24 / 60)

const boiler = new GenericCrafter("boiler");
exports.boiler = boiler
Object.assign(boiler, {
 outputLiquid: new LiquidStack(fluids.steam, 0.4),
 liquidCapacity: 50,
 size: 2,
 hasPower: false,
 hasItems: false,
 hasLiquids: true,
 drawer: new DrawMulti(
  new DrawRegion("-bottom"),
  Object.assign(new DrawLiquidTile(Liquids.water), {
   //suffix: "-water"
  }),
  Object.assign(new DrawLiquidTile(fluids.steam), {
   //suffix: "-steam"
  }),
  new DrawDefault()
 ),
 buildVisibility: BuildVisibility.shown,
 category: Category.power,
 requirements: ItemStack.with(
  Items.tungsten, 30,
  Items.beryllium, 30,
  Items.graphite, 40,
  Items.silicon, 20,
 )
})
boiler.consumeLiquid(Liquids.water, 5 / 60)
//research":"steam-pressurizer"

const steamHeater = new HeatProducer("steam-heater");
exports.steamHeater = steamHeater;
Object.assign(steamHeater, {
 health: 800,
 size: 3,
 hasLiquids: true,
 heatOutput: 6,
 regionRotated1: 1,
 drawer: new DrawMulti(
  new DrawRegion("-bottom"),
  Object.assign(new DrawLiquidTile(fluids.steam), {
   //suffix: "-steam"
  }),
  new DrawDefault(),
  new DrawHeatOutput(),
  new DrawHeatInput("-heat")
 ),
 buildVisibility: BuildVisibility.shown,
 category: Category.power,
 requirements: ItemStack.with(
  Items.tungsten, 30,
  Items.beryllium, 60,
  Items.graphite, 20,
  Items.silicon, 20,
 )
})
steamHeater.consumeLiquid(fluids.steam, 0.3)
*/
//energy-capacitor energyCapacitor
const energyCapacitor = new Battery("energy-capacitor");
exports.energyCapacitor = energyCapacitor;
Object.assign(energyCapacitor, {
 size: 1,
 scaledHealth: 200,
 armor: 2,
 baseExplosiveness: 1,
 buildCostMultiplier: 0.8,
 emptyLightColor: Color.valueOf("#3973C5FF"),
 fullLightColor: Color.valueOf("#D1EFFFFF"),
 requirements: ItemStack.with(
  Items.titanium, 15,
  Items.silicon, 20,
  Items.graphite, 20
 ),
 category: Category.power,
 buildVisibility: BuildVisibility.shown,
});
energyCapacitor.consumePowerBuffered(10000)
//high-energy-capacitor highEnergyCapacitor
const highEnergyCapacitor = new Battery("high-energy-capacitor");
exports.highEnergyCapacitor = highEnergyCapacitor;
Object.assign(highEnergyCapacitor, {
 size: 1,
 scaledHealth: 400,
 armor: 4,
 baseExplosiveness: 3,
 buildCostMultiplier: 0.8,
 emptyLightColor: Color.valueOf("#3973C5FF"),
 fullLightColor: Color.valueOf("#D1EFFFFF"),
 requirements: ItemStack.with(
  Items.surgeAlloy, 10,
  Items.silicon, 20
 ),
 category: Category.power,
 buildVisibility: BuildVisibility.shown,
});
highEnergyCapacitor.consumePowerBuffered(200000)
//氰化高压釜 tetradCrackingEngine
const tetradCrackingEngine = new ConsumeGenerator("tetrad-cracking-engine");
exports.tetradCrackingEngine = tetradCrackingEngine;
Object.assign(tetradCrackingEngine, {
 powerProduction: 840 / 60,
 hasLiquids: true,
 size: 2,
 generateEffect: Fx.generatespark,
 generateEffectRange: 3.0,
 // outputLiquid: new LiquidStack(Liquids.cyanogen, 1 / 120),
 //outputItem: new ItemStack(Items.pyratite, 1),
 canOverdrive: false,
 ambientSound: Vars.tree.loadSound("ray1"),
 ambientSoundVolume: 0.06,
 liquidCapacity: 30,
 itemCapacity: 6,
 buildTime: 35,
 drawer: new DrawMulti(
  new DrawRegion("-bottom"),
  Object.assign(new DrawLiquidTile(Liquids.water), {
  }),
  Object.assign(new DrawArcSmelt(), {
   midColor: Color.valueOf("#9CC5FFFF"),
   flameColor: Color.valueOf("#C9DFFFFF"),
   flameRad: 2,
   flameRadiusScl: 3,
   flameRadiusMag: 0.4,
  }),
  new DrawDefault(),
 ),
 category: Category.power,
 buildVisibility: BuildVisibility.shown,
 requirements: ItemStack.with(
  Items.titanium, 45,
  Items.silicon, 30,
  Items.metaglass, 30,
 ),
})
tetradCrackingEngine.consumeLiquid(Liquids.water, 12 / 60,)
tetradCrackingEngine.consumeItems(ItemStack.with(Items.graphite, 1, Items.copper, 1))

const chemoRingEngine = new ImpactReactor("chemo-ring-engine");
exports.chemoRingEngine = chemoRingEngine;
Object.assign(chemoRingEngine, {
 powerProduction: 54,
 hasLiquids: true,
 size: 3,
 canOverdrive: false,
 liquidCapacity: 60,
 warmupSpeed: 0.01,
 explosionShake: 6,
 explosionShakeDuration: 16,
 explosionDamage: 2000,
 explosionMinWarmup: 0.8,
 explosionRadius: 10,
 explodeEffect: new MultiEffect(
  Object.assign(new ParticleEffect(), {
   particles: 25,
   sizeTo: 0,
   sizeFrom: 5,
   colorTo: Color.valueOf("#8CFFFF"),
   colorFrom: Color.valueOf("#9CC5FFFF"),
   cone: -360,
   lifetime: 80,
   layer: 100,
   length: 100,
   region: shell,
   useRotation: false,
   baseRotation: 0,
  },
  ),
  Object.assign(new ParticleEffect(), {
   particles: 14,
   sizeTo: 0,
   sizeFrom: 16,
   colorTo: Color.valueOf("#8CFFFF"),
   colorFrom: Color.valueOf("#9CC5FFFF"),
   cone: -360,
   lifetime: 40,
   layer: 100,
   length: 100,
   region: shell,
   useRotation: false,
   baseRotation: 0,
  },),
  Object.assign(new ParticleEffect(), {
   particles: 14,
   sizeTo: 0,
   sizeFrom: 13,
   colorTo: Color.valueOf("#8CFFFF"),
   colorFrom: Color.valueOf("#9CC5FFFF"),
   cone: -360,
   lifetime: 100,
   layer: 100,
   length: 100,
   region: shell,
   useRotation: false,
   baseRotation: 0,
  },),
  Object.assign(new ParticleEffect(), {
   particles: 14,
   sizeTo: 0,
   sizeFrom: 18,
   colorTo: Color.valueOf("#8CFFFF"),
   colorFrom: Color.valueOf("#9CC5FFFF"),
   cone: -360,
   lifetime: 130,
   layer: 100,
   length: 100,
   region: shell,
   useRotation: false,
   baseRotation: 0,
  }
  ),
 ),
 drawer: new DrawMulti(
  new DrawRegion("-bottom"),
  Object.assign(new DrawLiquidTile(Liquids.oil), {
   //   alpha:0.6,
  }),
  Object.assign(new DrawPlasma(), {
   plasma1: Color.valueOf("#8CFFFF"),
   plasma2: Color.valueOf("#9CC5FFFF"),
  }),
  new DrawDefault(),
 ),
 category: Category.power,
 buildVisibility: BuildVisibility.shown,
 requirements: ItemStack.with(
  Items.thorium, 100,
  Items.silicon, 120,
  Items.metaglass, 150,
 ),
})
chemoRingEngine.consumeLiquid(Liquids.oil, 0.7,)
chemoRingEngine.consumePower(4)
//chemoRingEngine.consumeItem(Items.graphite, 1)


//gaseous-fission-reactor gaseousFissionReactor
const gaseousFissionReactor = new ConsumeGenerator("gaseous-fission-reactor");
exports.gaseousFissionReactor = gaseousFissionReactor;
Object.assign(gaseousFissionReactor, {
 powerProduction: 4500 / 60,
 itemDuration: 3 * 60,
 health: 1400,
 hasLiquids: true,
 size: 3,
 generateEffect: Fx.none,
 //generateEffectRange: 3.0,
 // outputLiquid: new LiquidStack(Liquids.cyanogen, 1 / 120),
 //outputItem: new ItemStack(Items.pyratite, 1),
 canOverdrive: false,
 ambientSound: Vars.tree.loadSound("ray1"),
 ambientSoundVolume: 0.28,
 liquidCapacity: 100,
 itemCapacity: 20,
 buildTime: 200,
 drawer: new DrawMulti(
  new DrawRegion("-bottom"),
  Object.assign(new DrawLiquidTile(Liquids.water), {
  }),
  Object.assign(new DrawArcSmelt(), {
   midColor: Color.valueOf("#B18AFFFF"),
   flameColor: Color.valueOf("#D3BDFFFF"),
   circleSpace: 4,
   flameRad: 3,
   flameRadiusScl: 3,
   flameRadiusMag: 0.4,
   particleRad: 6,
   particles: 30,
  }),
  new DrawDefault(),
 ),
 category: Category.power,
 buildVisibility: BuildVisibility.shown,
 requirements: ItemStack.with(
  Items.titanium, 400,
  Items.thorium, 300,
  Items.lead, 200,
  Items.silicon, 200,
  Items.metaglass, 150,
 ),
})
gaseousFissionReactor.consumeLiquid(Liquids.water, 48 / 60,)
gaseousFissionReactor.consumeItems(ItemStack.with(Items.thorium, 1))

//光伏单元
const photovoltaicModule = new SolarGenerator("photovoltaic-module");
exports.photovoltaicModule = photovoltaicModule;
Object.assign(photovoltaicModule, {
 category: Category.power,
 buildVisibility: BuildVisibility.shown,
 requirements: ItemStack.with(
  Items.thorium, 5,
  Items.lead, 5,
  Items.silicon, 5
 ),
 size: 1,
 powerProduction: 0.5,
 update: true
})

photovoltaicModule.buildType = () =>
 extend(SolarGenerator.SolarGeneratorBuild, photovoltaicModule, {
  draw() {
   // this.super$draw();
   let autotileRegions
   if (!autotileRegions) {
    autotileRegions = TileBitmask.load(photovoltaicModule.name + "-autotile"); // 贴图多了-autotile，这里也写吧，按理应该删掉-autotile
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
   Draw.reset()
   //  if(){
   //  Draw.rect(Core.atlas.find("square"), x, this.y - 1);
   //  Draw.reset()
   //   }
  },
 })