const items = require("items")

const arouse = new UnitType("arouse");
exports.arouse = arouse;
Object.assign(arouse, {
 constructor: () => new UnitEntity.create(),
 flying: true,
 //    ammoType: new ItemAmmoType(Items.copper),
 ammoCapacity: 400,
 speed: 6.2,
 accel: 0.55,
 drag: 1.1,
 engineOffset: 6,
 engineSize: 2,
 lowAltitude: false,
 trailLength: 3,
 trailColor: Color.valueOf("#99BAFFFF"),
 engineColor: Color.valueOf("#99BAFFFF"),
 hitSize: 8,
 health: 70,
 armor: 0.5,
 rotateSpeed: 16,
 faceTarget: true,
 itemCapacity: 50,
 buildSpeed: 3,
})
arouse.weapons.add(
 Object.assign(new BuildWeapon("arouse-build-weapon"), {
  x: 4.75,
  y: 0,
  shootY: 6,
  rotate: false,
  rotateSpeed: 0,
  mirror: true,
  layerOffset: -0.001,
 }))

const powerProduction = 8; //输出电量
const prismCore = extend(CoreBlock, 'prism-core'/*方块名*/, {
 unitType: arouse,
 unitCapModifier: 12,
 armor: 0,
 health: 800,
 size: 3,
 itemCapacity: 24000,
 insulated: true,
 absorbLasers: true,
 setStats() {
  this.super$setStats();
  this.stats.add(Stat.basePowerGeneration, 60 * powerProduction, StatUnit.powerSecond);
 },
 setBars() {
  this.super$setBars();
  this.addBar("power", func(e => new Bar(
   prov(() => Core.bundle.format("bar.poweroutput", Mathf.round(60 * e.getPowerProduction()), 1)),
   prov(() => Pal.powerBar),
   floatp(() => e.getPowerProduction() / powerProduction)))
  );
 },
 canPlaceOn(tile, team, rotation) {
  return true;
 },
 canBreak(tile) {
  return Vars.state.teams.get(prismCore).getCount(this) > 1;
 }
});
prismCore.hasPower = true;
prismCore.consumesPower = false;
prismCore.outputsPower = true;
prismCore.setupRequirements(
 Category.effect,
 BuildVisibility.shown,
 ItemStack.with(
  Items.copper, 1000,
  Items.titanium, 400,
  Items.silicon, 600,
  items.chip, 200,
 )
);
prismCore.buildType = () => {
 return extend(CoreBlock.CoreBuild, prismCore, {
  getPowerProduction() {
   return powerProduction;
  },
 });
}