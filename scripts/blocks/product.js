const fluids = require("fluids");
const items = require("items");

const advancedCompressor = new GenericCrafter("advanced-compressor");
exports.advancedCompressor = advancedCompressor;
Object.assign(advancedCompressor, {
 health: 850,
 size: 2,
 itemCapacity: 10,
 liquidCapacity: 40,
 craftTime: 75,
 outputItem: new ItemStack(items.glassSteel, 2),
 drawer: new DrawMulti(
  new DrawDefault(),
  Object.assign(new DrawFade(), {
   scale: 1.13,
   alpha: 0.99
  })
 ),
 craftEffect: Object.assign(new MultiEffect(/*
  Object.assign(new ParticleEffect(), {
   region: Core.atlas.find("ai-方"),
   particles: 16,
   length: 20,
   interp: Interp.circleOut,
   sizeInterp: Interp.pow5Out,
   cone: 360,
   colorFrom: Color.valueOf("#E6FDFFFF"),
   colorTo: Color.valueOf("#E6FDFFFF"),
   sizeFrom: 3,
   sizeTo: 1
  })*/
 ), {
  lifetime: 30,
 }),
 buildVisibility: BuildVisibility.shown,
 category: Category.crafting,
 requirements: ItemStack.with(
  items.viaonChip, 20,
  Items.surgeAlloy, 48,
  Items.plastanium, 75,
  Items.graphite, 36,
  Items.silicon, 48,
  items.chip, 40,
 )
})
advancedCompressor.consumePower(8),
 advancedCompressor.consumeItems(ItemStack.with(
  Items.plastanium, 1,
  Items.thorium, 1,
  items.wiredGlass, 1,
 ));

const advancedKiln = new GenericCrafter("advanced-kiln");
Object.assign(advancedKiln, {
 health: 600,
 size: 2,
 itemCapacity: 10,
 liquidCapacity: 0,
 outputItem: new ItemStack(items.wiredGlass, 3),
 drawer: new DrawMulti(
  new DrawDefault(),
  new DrawFlame()
 ),
 craftEffect: Fx.smeltsmoke,
 updateEffect: Fx.smeltsmoke,
 buildVisibility: BuildVisibility.shown,
 category: Category.crafting,
 requirements: ItemStack.with(
  Items.lead, 60,
  Items.thorium, 45,
  Items.graphite, 30,
  Items.silicon, 30,
 )
})
advancedKiln.consumePower(3),
 advancedKiln.consumeItems(ItemStack.with(
  Items.graphite, 2,
  Items.metaglass, 2,
 ));

const advancedSmelter = new GenericCrafter("advanced-smelter");
exports.advancedSmelter = advancedSmelter;
Object.assign(advancedSmelter, {
 health: 2850,
 size: 3,
 itemCapacity: 20,
 liquidCapacity: 0,
 craftTime: 120,
 outputItem: new ItemStack(items.vibrantAlloy, 1),
 drawer: new DrawMulti(
  new DrawRegion("-bottom"),
  Object.assign(new DrawCrucibleFlame(), {
   midColor: Color.valueOf("#9CC5FFFF"),
   flameColor: Color.valueOf("#C9DFFFFF"),
   flameRad: 4.45,
   circleSpace: 3,
   flameRadiusScl: 16,
   flameRadiusMag: 3,
   circleStroke: 0.6,
   particles: 18,
   particleLife: 67,
   particleRad: 16,
   particleSize: 2.68,
   rotateScl: 1.7
  }),
  new DrawDefault()
 ),
 craftEffect: Fx.none,
 buildVisibility: BuildVisibility.shown,
 category: Category.crafting,
 requirements: ItemStack.with(
  Items.copper, 240,
  Items.thorium, 60,
  Items.surgeAlloy, 100,
  items.glassSteel, 80,
  items.chip, 100,
 )
})
advancedSmelter.consumePower(20),
 advancedSmelter.consumeItems(ItemStack.with(
  Items.graphite, 1,
  items.zenium, 2,
 ));

const photoetchingMachine = new GenericCrafter("photoetching-machine");
exports.photoetchingMachine = photoetchingMachine;
Object.assign(photoetchingMachine, {
 health: 480,
 size: 2,
 itemCapacity: 10,
 liquidCapacity: 0,
 craftTime: 90,
 outputItem: new ItemStack(items.chip, 3),
 drawer: new DrawMulti(
  new DrawRegion("-bottom"),
//Object.assign(new DrawFade(), {scale: 1.13,alpha: 0.99}),
//  new DrawWeave(),
  new DrawDefault()
 ),
 craftEffect: Fx.none,
 buildVisibility: BuildVisibility.shown,
 category: Category.crafting,
 // ambientSound: Sounds.techloop,
 // ambientSoundVolume: 0.35,
 requirements: ItemStack.with(
  Items.titanium, 40,
  Items.lead, 40,
  Items.silicon, 30,
  Items.graphite, 20,
 )
})
photoetchingMachine.consumePower(2),
 photoetchingMachine.consumeItems(ItemStack.with(
  Items.titanium, 2,
  Items.silicon, 1,
 ));
