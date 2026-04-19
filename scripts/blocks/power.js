const fluids = require("fluids");
const items = require("items");

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

//氰化高压釜 tetradCrackingEngine
const tetradCrackingEngine = new ConsumeGenerator("tetrad-cracking-engine");
exports.tetradCrackingEngine = tetradCrackingEngine;
Object.assign(tetradCrackingEngine, {
 powerProduction: 620 / 60,
 hasLiquids: true,
 size: 2,
 generateEffect: Fx.generatespark,
 generateEffectRange: 3.0,
 // outputLiquid: new LiquidStack(Liquids.cyanogen, 1 / 120),
 //outputItem: new ItemStack(Items.pyratite, 1),
 canOverdrive: false,
 ambientSound: Sounds.loopSmelter,
 ambientSoundVolume: 0.06,
 liquidCapacity: 30,
 drawer: new DrawMulti(
  new DrawRegion("-bottom"),
  Object.assign(new DrawCells(), {
   color: Color.valueOf("#FFFFFFFF"),
   particleColorFrom: Color.valueOf("#FFFFFFFF"),
   particleColorTo: Color.valueOf("#9CC5FFFF"),
   particles: 65,
   range: 4,
  }),
  Object.assign(new DrawLiquidTile(Liquids.water), {
   alpha: 0.6,
  }),
  new DrawDefault(),
 ),
 category: Category.power,
 buildVisibility: BuildVisibility.shown,
 requirements: ItemStack.with(
  Items.titanium, 60,
  Items.copper, 20,
  Items.lead, 15,
  Items.silicon, 30,
 ),
})
tetradCrackingEngine.consumeLiquid(Liquids.water, 12 / 60,)
tetradCrackingEngine.consumeItem(Items.graphite, 2)

const chemoRingEngine = new ImpactReactor("chemo-ring-engine");
exports.chemoRingEngine = chemoRingEngine;
Object.assign(chemoRingEngine, {
 powerProduction: 42,
 hasLiquids: true,
 size: 3,
 canOverdrive: false,
 liquidCapacity: 60,
 warmupSpeed: 0.01,
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
  Items.titanium, 250,
  Items.copper, 200,
  Items.metaglass, 155,
  Items.silicon, 120,
  Items.thorium, 40,
 ),
})
chemoRingEngine.consumeLiquid(Liquids.oil, 0.7,)
chemoRingEngine.consumePower(4)
//chemoRingEngine.consumeItem(Items.graphite, 1)
Events.on(EventType.ClientLoadEvent, () => {
 if (Vars.mods.getMod("new-horizon") != null) {

 }
},)