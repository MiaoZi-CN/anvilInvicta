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
 category: Category.crafting,
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
 category: Category.crafting,
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
 category: Category.crafting,
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
 category: Category.crafting,
 requirements: ItemStack.with(
  Items.tungsten, 30,
  Items.beryllium, 60,
  Items.graphite, 20,
  Items.silicon, 20,
 )
})
steamHeater.consumeLiquid(fluids.steam, 0.3)

const highEnergyCapacitor = new Battery("high-energy-capacitor");
exports.highEnergyCapacitor = highEnergyCapacitor;
Object.assign(highEnergyCapacitor, {
 health: 1000,
 size: 1,
 update: true,
 buildVisibility: BuildVisibility.shown,
 category: Category.crafting,
 requirements: ItemStack.with(
  items.glassSteel, 5,
  items.chip, 5,
  Items.surgeAlloy, 5,
 )
})
highEnergyCapacitor.consumePowerBuffered(50000)

highEnergyCapacitor.buildType = () =>
 extend(Battery.BatteryBuild, highEnergyCapacitor, {
  updateTile() {
   this.super$updateTile();
   this.count = 0;//嗯嗯作用域大人
   this.proximity.each((other) => {
    if (other.block == this.block) {
     this.count++;
    }
   });
  },
  update() {
  
  }
 })