const items = require("items");
const status = require("status");
var tiers = Stat("tiers");

function AddCoolant(turret, amount) {
 return turret.coolant = turret.consumeCoolant(amount);
}
var PartRecoil = DrawPart.PartProgress.recoil
/*
钍 碳素玻璃穿透 
钛速射 
石墨击退 
阿尔法 火石BUFF 
塑钢 玻璃分裂 
爆混高伤低穿甲 
巨浪闪电 
脉冲合金破盾 
玻璃钢只能用于半穿甲弹而且尽量少搞
*/

//我提前编码了贴图
var shell = Core.atlas.find("shell")
//这部分是炮台与子弹的实例
const restricted = new TractorBeamTurret("restricted");
exports.restricted = restricted;
Object.assign(restricted, {
 hasPower: true,
 size: 3,
 damage: 8,
 range: 200,
 coolantMultiplier: 4,
 buildVisibility: BuildVisibility.shown,
 category: Category.turret,
 requirements: ItemStack.with(
  Items.beryllium, 80,
  Items.graphite, 60,
  Items.silicon, 40,
  Items.oxide, 10)
})
restricted.consumePower(7)



const arklight = new PowerTurret("arklight");
exports.arklight = arklight
Object.assign(arklight, {
 targetAir: true,
 targetGround: false,
 health: 300,
 size: 1,
 inaccuracy: 0,
 reload: 30,
 hasPower: true,
 shootSound: Vars.tree.loadSound("L9"),
 liquidCapacity: 24,
 rotateSpeed: 25,
 range: 160,
 xRand: 0,
 shootY: -2,
 shootType: Object.assign(new RailBulletType(), {
  length: 168,
  pointEffectSpace: 8,
  pierceEffect: Fx.none,
  trailColor: Color.valueOf("#A4B8FAFF"),
  smokeEffect: Fx.none,
  damage: 100,
  pierceArmor: false,
  knockback: 2,
  pierceDamageFactor: 0.5,
  armorMultiplier: 15,
  displayAmmoMultiplier: false,
  collidesGround: false,
  shootEffect: new MultiEffect(
   Object.assign(new ParticleEffect(), {
    offset: 8,
    particles: 4,
    lifetime: 30,
    length: 32,
    interp: Interp.circleOut,
    sizeInterp: Interp.pow5In,
    cone: 20,
    line: true,
    strokeFrom: 0.8,
    strokeTo: 0.8,
    lenFrom: 4,
    lenTo: 0,
    lightColor: Color.valueOf("#A4B8FAFF"),
    colorFrom: Color.valueOf("#A4B8FAFF"),
    colorTo: Color.valueOf("#A4B8FAFF"),
   })),
  despawnEffect: Fx.none,
  pointEffect: Object.assign(new ParticleEffect(), {
   colorFrom: Color.valueOf("#A4B8FAFF"), //开始时颜色
   colorTo: Color.valueOf("#A4B8FAFF"), //结束时颜色
   particles: 1, //粒子数量
   lifetime: 10, //存在时间
   cone: 0, //粒子扩散角度
   length: 1, //粒子移动长度
   baseLength: 0, //粒子在一定长度内出现
   line: true, //形状为方形
   strokeFrom: 1.5, //开始时宽度
   strokeTo: 0.5, //结束时宽度
   lenFrom: 8, //开始时长度
   lenTo: 8,
  }),
  hitEffect: new MultiEffect(
   Object.assign(new ParticleEffect(), {
    startDelay: 1.25,
    particles: 6,
    sizeFrom: 1.8,
    sizeTo: 0,
    length: 20,
    lifetime: 22,
    interp: Interp.pow10Out,
    sizeInterp: Interp.pow5In,
    colorFrom: Color.valueOf("#A4B8FAFF"),
    colorTo: Color.valueOf("#A4B8FAFF"),
   })),
 }),
 buildVisibility: BuildVisibility.shown,
 category: Category.turret,
 requirements: ItemStack.with(
  Items.copper, 20,
  Items.lead, 20,
  Items.silicon, 10,
  Items.metaglass, 10)
})
arklight.consumePower(3);
AddCoolant(arklight, 0.2)

const cersei = new PowerTurret("cersei");
exports.cersei = cersei;
Object.assign(cersei, {
 targetAir: true,
 targetGround: true,
 health: 800,
 size: 2,
 inaccuracy: 3,
 reload: 52,
 hasPower: true,
 liquidCapacity: 24,
 rotateSpeed: 4.5,
 range: 250,
 xRand: 0,
 shootCone: 1,
 shootType: Object.assign(new BasicBulletType(5, 20), {
  lifetime: 50,
  width: 15,
  height: 15,
  shrinkX: 0,
  shrinkY: 0,
  recoil: 2,
  collidesAir: true,
  collidesGround: true,
  fragOnHit: false,
  armorMultiplier: 0.75,
  backColor: Color.valueOf("#E1EFFFFF"),
  frontColor: Color.valueOf("#FFFFFFFF"),
  sprite: "large-orb",
  status: status.EMP,
  splashDamage: 48,
  splashDamageRadius: 3,
  fragVelocityMin: 0.5,
  fragVelocityMax: 1.5,
  fragLifeMin: 0.5,
  intervalBullets: 4,
  intervalAngle: 180,
  intervalSpread: 300,
  bulletInterval: 3,
  intervalRandomSpread: 20,
  lightningDamage: 2,
  lightning: 4,
  lightningLength: 4,
  lightningLengthRand: 2,
  lightningColor: Color.valueOf("#E1EFFFFF"),
  hitEffect: new MultiEffect(
   Object.assign(new WaveEffect(), {
    lifetime: 15,
    sizeFrom: 0,
    sizeTo: 20,
    strokeFrom: 4,
    strokeTo: 0,
    colorFrom: Color.valueOf("#E1EFFFFF"),
    colorTo: Color.valueOf("#E1EFFFFF"),
   }),
   Object.assign(new ParticleEffect(), {
    offset: 30,
    particles: 8,
    lifetime: 25,
    length: 30,
    interp: Interp.circleOut,
    sizeInterp: Interp.pow5In,
    cone: -360,
    line: true,
    strokeFrom: 1.5,
    strokeTo: 1.5,
    lightColor: Color.valueOf("#FFFFFFFF"),
    colorFrom: Color.valueOf("#FFFFFFFF"),
    colorTo: Color.valueOf("#FFFFFFFF"),
   })),
  despawnEffect: new MultiEffect(
   Object.assign(new WaveEffect(), {
    lifetime: 15,
    sizeFrom: 0,
    sizeTo: 20,
    strokeFrom: 4,
    strokeTo: 0,
    colorFrom: Color.valueOf("#E1EFFFFF"),
    colorTo: Color.valueOf("#E1EFFFFF"),
   }),
   Object.assign(new ParticleEffect(), {
    offset: 30,
    particles: 8,
    lifetime: 25,
    length: 30,
    interp: Interp.circleOut,
    sizeInterp: Interp.pow5In,
    cone: -360,
    line: true,
    strokeFrom: 1.5,
    strokeTo: 1.5,
    lightColor: Color.valueOf("#FFFFFFFF"),
    colorFrom: Color.valueOf("#FFFFFFFF"),
    colorTo: Color.valueOf("#FFFFFFFF"),
   })),
  buildingDamageMultiplier: 0.4,
  intervalBullet: Object.assign(new LightningBulletType(), {
   status: status.EMP,
   lightningLength: 3,
   lightningColor: Color.valueOf("#E1EFFFFF"),
   damage: 4,
   buildingDamageMultiplier: 0.4,
   hitEffect: Fx.none,
   //despawnSound: Sounds.spark,
   lightningLengthRand: 2,
  })
 }),
 buildVisibility: BuildVisibility.shown,
 category: Category.turret,
 requirements: ItemStack.with(
  Items.titanium, 40,
  Items.lead, 60,
  Items.silicon, 30)
})
cersei.consumePower(6);
AddCoolant(cersei, 0.2)


const hell = new ItemTurret("hell");
exports.hell = hell;
Object.assign(hell, {
 health: 820,
 size: 2,
 reload: 260,
 range: 248,
 maxAmmo: 20,
 recoilTime: 48,
 recoil: 1,
 shake: 0,
 targetGround: true,
 targetAir: false,
 shootSound: Vars.tree.loadSound("missile1"),
 shootSoundVolume: 0.5,
 inaccuracy: 3,
 rotateSpeed: 6,
 shootY: 3,
 shoot: Object.assign(new ShootBarrel(), {
  shots: 3,
  shotDelay: 12,
 }),
 buildVisibility: BuildVisibility.shown,
 category: Category.turret,
 requirements: ItemStack.with(
  Items.titanium, 80,
  Items.copper, 65,
  Items.graphite, 25)
})
AddCoolant(hell, 0.2);
hell.ammo(
 Items.graphite, Object.assign(new BasicBulletType(4, 12), {
  sprite: "ai-missile1",
  trailColor: Color.valueOf("#FFFFFFFF"),
  backColor: Color.valueOf("#7d89d8ff"),
  frontColor: Color.valueOf("#dae1eeff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  armorMultiplier: 3,
  lifetime: 60,
  width: 8,
  height: 16,
  collidesAir: false,
  pierceArmor: false,
  homingPower: 0.05,
  splashDamageRadius: 12,
  //范围伤害的范围
  splashDamage: 50,
  //范围伤害的伤害
  shootEffect: Fx.shootPyraFlame,
  smokeEffect: Fx.shootBigSmoke,
  hitEffect: Fx.explosion,
  despawnEffect: Fx.explosion,
  trailChance: 1,
  trailInterval: 8,
  trailEffect: Object.assign(new ParticleEffect(), {
   particles: 2,
   length: 6,
   baseLength: 0,
   lifetime: 22,
   cone: 25,
   interp: Interp.pow5In,
   colorFrom: Color.valueOf("#737373"),
   colorTo: Color.valueOf("#73737300"),
   sizeFrom: 0.5,
   sizeTo: 3
  }),
  buildingDamageMultiplier: 3,
 }),
 Items.pyratite, Object.assign(new BasicBulletType(4, 12), {
  sprite: "ai-missile1",
  trailColor: Color.valueOf("#f68021ff"),
  backColor: Color.valueOf("#f68021ff"),
  frontColor: Color.valueOf("#f8ad42ff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  armorMultiplier: 4,
  lifetime: 60,
  width: 8,
  height: 16,
  collidesAir: false,
  pierceArmor: false,
  homingPower: 0.05,
  splashDamageRadius: 12,
  //范围伤害的范围
  splashDamage: 50,
  //范围伤害的伤害
  shootEffect: Fx.shootPyraFlame,
  smokeEffect: Fx.shootBigSmoke,
  hitEffect: Fx.explosion,
  despawnEffect: Fx.explosion,
  trailChance: 1,
  trailInterval: 8,
  trailEffect: Object.assign(new ParticleEffect(), {
   particles: 2,
   length: 6,
   baseLength: 0,
   lifetime: 22,
   cone: 25,
   interp: Interp.pow5In,
   colorFrom: Color.valueOf("#737373"),
   colorTo: Color.valueOf("#73737300"),
   sizeFrom: 0.5,
   sizeTo: 3,
  }),
  buildingDamageMultiplier: 3,
  incendAmount: 14,
  incendSpread: 20,
  incendChance: 10,
 }),
 Items.blastCompound, Object.assign(new BasicBulletType(4, 12), {
  sprite: "ai-missile1",
  trailColor: Color.valueOf("#e9665bff"),
  backColor: Color.valueOf("#e9665bff"),
  frontColor: Color.valueOf("#eeab89ff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  armorMultiplier: 5,
  lifetime: 60,
  width: 8,
  height: 16,
  collidesAir: false,
  pierceArmor: false,
  homingPower: 0.05,
  splashDamageRadius: 12,
  //范围伤害的范围
  splashDamage: 125,
  //范围伤害的伤害
  shootEffect: Fx.shootPyraFlame,
  smokeEffect: Fx.shootBigSmoke,
  hitEffect: Fx.explosion,
  despawnEffect: Fx.explosion,
  trailChance: 1,
  trailInterval: 8,
  trailEffect: Object.assign(new ParticleEffect(), {
   particles: 2,
   length: 6,
   baseLength: 0,
   lifetime: 22,
   cone: 25,
   interp: Interp.pow5In,
   colorFrom: Color.valueOf("#737373"),
   colorTo: Color.valueOf("#73737300"),
   sizeFrom: 0.5,
   sizeTo: 3,
  }),
  buildingDamageMultiplier: 4,
 }),
 Items.thorium, Object.assign(new BasicBulletType(8, 44), {
  sprite: "ai-missile1",
  trailColor: Color.valueOf("#f595beff"),
  backColor: Color.valueOf("#f595beff"),
  frontColor: Color.valueOf("#ffffffff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  armorMultiplier: 0.5,
  lifetime: 30,
  width: 8,
  height: 16,
  collidesAir: false,
  pierceArmor: false,
  homingPower: 0.05,
  splashDamageRadius: 0,
  //范围伤害的范围
  splashDamage: 0,
  //范围伤害的伤害
  shootEffect: Fx.shootPyraFlame,
  smokeEffect: Fx.shootBigSmoke,
  hitEffect: Fx.explosion,
  despawnEffect: Fx.explosion,
  trailChance: 1,
  trailInterval: 8,
  trailLength: 6,
  trailEffect: Object.assign(new ParticleEffect(), {
   particles: 2,
   length: 6,
   baseLength: 0,
   lifetime: 22,
   cone: 25,
   interp: Interp.pow5In,
   colorFrom: Color.valueOf("#737373"),
   colorTo: Color.valueOf("#73737300"),
   sizeFrom: 0.5,
   sizeTo: 3,
  }),
  buildingDamageMultiplier: 1.25,
 }),
 items.chip, Object.assign(new BasicBulletType(8, 0), {
  trailColor: Color.valueOf("#ffb855"),
  backColor: Color.valueOf("#ffb855"),
  frontColor: Color.valueOf("#ffffff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  armorMultiplier: 0.5,
  ammoMultiplier: 20,
  lifetime: 30,
  width: 8,
  height: 16,
  collidesAir: false,
  pierceArmor: false,
  homingPower: 0.05,
  splashDamageRadius: 12,
  //范围伤害的范围
  splashDamage: 30,
  //范围伤害的伤害
  shootEffect: Fx.shootPyraFlame,
  smokeEffect: Fx.shootBigSmoke,
  trailChance: 1,
  trailInterval: 8,
  trailLength: 6,
  trailEffect: Object.assign(new ParticleEffect(), {
   particles: 2,
   sizeTo: 0,
   sizeFrom: 3,
   colorTo: Color.valueOf("#ffb855"),
   colorFrom: Color.valueOf("#ffb855"),
   cone: -360,
   lifetime: 30,
   length: 3,
   layer: 100,
   region: shell,
   useRotation: false,
   baseRotation: 0,
  }),
  hitEffect: new MultiEffect(
   Object.assign(new ParticleEffect(), {
    particles: 13,
    sizeTo: 0,
    sizeFrom: 5,
    colorTo: Color.valueOf("#ffb855"),
    colorFrom: Color.valueOf("#ffb855"),
    cone: -360,
    lifetime: 30,
    layer: 100,
    length: 36,
    region: shell,
    useRotation: false,
    baseRotation: 0,
   }
   ),
   Object.assign(new WaveEffect(), {
    lifetime: 15,
    sizeFrom: 0,
    sizeTo: 14,
    strokeFrom: 4,
    strokeTo: 0,
    colorFrom: Color.valueOf("#ffb855"),
    colorTo: Color.valueOf("#ffb855"),
   }),
  ),
  despawnEffect: new MultiEffect(
   Object.assign(new ParticleEffect(), {
    particles: 13,
    sizeTo: 0,
    sizeFrom: 5,
    colorTo: Color.valueOf("#ffb855"),
    colorFrom: Color.valueOf("#ffb855"),
    cone: -360,
    lifetime: 30,
    layer: 100,
    length: 36,
    region: shell,
    useRotation: false,
    baseRotation: 0,
   }
   ),
   Object.assign(new WaveEffect(), {
    lifetime: 15,
    sizeFrom: 0,
    sizeTo: 14,
    strokeFrom: 4,
    strokeTo: 0,
    colorFrom: Color.valueOf("#ffb855"),
    colorTo: Color.valueOf("#ffb855"),
   }),
  ),
  buildingDamageMultiplier: 1,
 }),
)
hell.drawer.parts.addAll(
 Object.assign(new RegionPart("-shoot"), {
  y: 1,
  moveY: - 1.25,
  under: true,
  progress: PartRecoil
 },),
 Object.assign(new RegionPart("-back"), {
  y: 1.5,
  moveY: - 2.5,
  under: false,
  // progress: PartRecoil
 }
 ),)

const nameReturn = extend(ItemTurret, "return", {});
exports.nameReturn = nameReturn;
Object.assign(nameReturn, {
 health: 1480,
 armor: 6,
 range: 269.5,
 reload: 210,
 size: 2,
 inaccuracy: 3,
 maxAmmo: 45,
 consumeAmmoOnce: false,
 shootSound: Vars.tree.loadSound("rocket1"),
 shootSoundVolume: 0.5,
 shootEffect: new MultiEffect(
  Object.assign(new ParticleEffect(), {
   particles: 7,
   sizeTo: 0,
   sizeFrom: 2,
   colorTo: Color.valueOf("#ffb855"),
   colorFrom: Color.valueOf("#db661c"),
   cone: 10,
   length: 36,
   lifetime: 22,
   layer: 101,
   interp: Interp.circleOut,
   sizeInterp: Interp.pow2In,
  }),
  Object.assign(new ParticleEffect(), {
   particles: 14,
   sizeTo: 0,
   sizeFrom: 2,
   colorTo: Color.valueOf("#454545ff"),
   colorFrom: Color.valueOf("#db661c"),
   cone: 10,
   length: 36,
   lifetime: 18,
   layer: 100,
   interp: Interp.circleOut,
  })),
 shoot: Object.assign(new ShootAlternate(), {
  shots: 12,
  barrels: 3,
  spread: 3,
  shotDelay: 3,
 }),
 buildVisibility: BuildVisibility.shown,
 category: Category.turret,
 requirements: ItemStack.with(
  Items.thorium, 120,
  Items.graphite, 50,
  Items.plastanium, 50,
  items.chip, 40,
  items.glassSteel, 80
 )
})
AddCoolant(nameReturn, 0.3)

nameReturn.ammo(
 Items.titanium, Object.assign(new MissileBulletType(10, 54), {
  armorMultiplier: 1.5,
  trailColor: Color.valueOf("#a9d8ffff"),
  backColor: Color.valueOf("#a9d8ffff"),
  frontColor: Color.valueOf("#ffffffff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  pierce: false,
  pierceCap: 1,
  ammoMultiplier: 2,
  knockback: 0.5,
  reloadMultiplier: 1.2,
  lifetime: 26.95,
  hitEffect: Fx.hitScepterSecondary,
  hitColor: Color.valueOf("#A4B8FAFF"),
  /*hitEffect: new MultiEffect(Object.assign(new ParticleEffect(), {startDelay: 1.25,particles: 3,sizeFrom: 3,sizeTo: 0,length: 6,lifetime: 22,interp: Interp.pow10Out,sizeInterp: Interp.pow5In,colorFrom: Color.valueOf("#8896DEFF"),colorTo: Color.valueOf("#8896DEFF"),})),*/
  despawnEffect: new MultiEffect(
   Object.assign(new ParticleEffect(), {
    startDelay: 1.25,
    particles: 3,
    sizeFrom: 3,
    sizeTo: 0,
    length: 6,
    lifetime: 22,
    interp: Interp.pow10Out,
    sizeInterp: Interp.pow5In,
    colorFrom: Color.valueOf("#a9d8ffff"),
    colorTo: Color.valueOf("#a9d8ffff"),
   })),
 }),
 Items.thorium, Object.assign(new MissileBulletType(7, 54), {
  armorMultiplier: 0.75,
  trailColor: Color.valueOf("#f595beff"),
  backColor: Color.valueOf("#f595beff"),
  frontColor: Color.valueOf("#ffffffff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  pierce: true,
  pierceCap: 2,
  ammoMultiplier: 2,
  knockback: 0.5,
  reloadMultiplier: 0.6,
  lifetime: 38.5,
  hitEffect: Fx.hitScepterSecondary,
  hitColor: Color.valueOf("#F9A3C7FF"),
  /*
  hitEffect: new MultiEffect(
   Object.assign(new ParticleEffect(), {
    particles: 7,
    sizeTo: 0,
    sizeFrom: 2,
    colorTo: Color.valueOf("#CB8EBFFF"),
    colorFrom: Color.valueOf("#F9A3C7FF"),
    cone: 10,
    length: 42,
    lifetime: 22,
    layer: 101,
    interp: Interp.circleOut,
    sizeInterp: Interp.pow2In,
   })),*/
  despawnEffect: new MultiEffect(
   Object.assign(new ParticleEffect(), {
    particles: 7,
    sizeTo: 0,
    sizeFrom: 2,
    colorTo: Color.valueOf("#CB8EBFFF"),
    colorFrom: Color.valueOf("#F9A3C7FF"),
    cone: 10,
    length: 42,
    lifetime: 22,
    layer: 101,
    interp: Interp.circleOut,
    sizeInterp: Interp.pow2In,
   })),
 }),
 Items.graphite, Object.assign(new MissileBulletType(7, 34), {
  trailColor: Color.valueOf("#FFFFFFFF"),
  backColor: Color.valueOf("#7d89d8ff"),
  frontColor: Color.valueOf("#dae1eeff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  hitEffect: Fx.flakExplosion,
  despawnEffect: Fx.flakExplosion,
  ammoMultiplier: 2,
  knockback: 4.4,
  reloadMultiplier: 1,
  lifetime: 38.5,
  splashDamage: 24,
  splashDamageRadius: 12,
 }),
 Items.pyratite, Object.assign(new MissileBulletType(7, 29), {
  hitEffect: Fx.blastExplosion,
  despawnEffect: Fx.blastExplosion,
  ammoMultiplier: 4,
  knockback: 0.5,
  reloadMultiplier: 1,
  lifetime: 38.5,
  splashDamage: 31,
  splashDamageRadius: 16,
  backColor: Color.valueOf("#D37F47FF"),
  frontColor: Color.valueOf("#FFAA5FFF"),
  incendAmount: 1.4,
  incendSpread: 2,
  incendChance: 1,
 }),
 Items.blastCompound, Object.assign(new MissileBulletType(7, 29), {
  hitEffect: Fx.blastExplosion,
  despawnEffect: Fx.blastExplosion,
  ammoMultiplier: 4,
  knockback: 0.9,
  reloadMultiplier: 1,
  lifetime: 38.5,
  splashDamage: 46,
  splashDamageRadius: 16,
  backColor: Color.valueOf("#C85C51FF"),
  frontColor: Color.valueOf("#FF795EFF"),
  status: StatusEffects.blasted,
 }),
 Items.surgeAlloy, Object.assign(new MissileBulletType(7, 48), {
  hitEffect: Fx.blastExplosion,
  despawnEffect: Fx.blastExplosion,
  ammoMultiplier: 2,
  knockback: 0.5,
  reloadMultiplier: 1,
  lifetime: 38,
  splashDamage: 30,
  splashDamageRadius: 12,
  backColor: Color.valueOf("#F7E97EFF"),
  frontColor: Color.valueOf("#F7E97EFF"),
  lightningDamage: 20,
  lightning: 3,
  lightningLength: 5,
  lightningLengthRand: 4,
 }),
/*items.glassSteel, Object.assign(new MissileBulletType(7, 48), {
  ammoMultiplier: 4,
  knockback: 0.8,
  reloadMultiplier: 1,
  lifetime: 38,
  splashDamage: 36,
  splashDamageRadius: 14,
  backColor: Color.valueOf("#BFFBFFFF"),
  frontColor: Color.valueOf("#BFFBFFFF"),
  hitEffect: new MultiEffect(
   Object.assign(new ParticleEffect(), {
    region: "ai-block1",
    startDelay: 1.25,
    particles: 3,
    sizeFrom: 3,
    sizeTo: 0,
    length: 6,
    lifetime: 22,
    interp: Interp.pow10Out,
    sizeInterp: Interp.pow5In,
    colorFrom: Color.valueOf("#9BDEE3FF"),
    colorTo: Color.valueOf("#9BDEE3FF"),
   })),
  despawnEffect: new MultiEffect(
   Object.assign(new ParticleEffect(), {
    region: "ai-block1",
    startDelay: 1.25,
    particles: 3,
    sizeFrom: 3,
    sizeTo: 0,
    length: 6,
    lifetime: 22,
    interp: Interp.pow10Out,
    sizeInterp: Interp.pow5In,
    colorFrom: Color.valueOf("#BFFBFFFF"),
    colorTo: Color.valueOf("#9BDEE3FF"),
   })),玻璃钢弹药
 })*/)

const obituary = extend(ItemTurret, "obituary", {
 update: true,
 setStats() {
  this.super$setStats();
  this.stats.add(tiers, "2")
 }
});
exports.obituary = obituary;
Object.assign(obituary, {
 targetAir: true,
 targetGround: true,
 health: 4280,
 armor: 18,
 size: 4,
 range: 772,
 reload: 428,
 maxAmmo: 200,
 recoilTime: 220,
 recoil: 3,
 shake: 0,
 inaccuracy: 0,
 rotateSpeed: 2,
 shootY: 4,
 buildVisibility: BuildVisibility.shown,
 category: Category.turret,
 requirements: ItemStack.with(
  Items.copper, 2850,
  Items.thorium, 800,
  items.chip, 400,
  items.viaonChip, 300,
  Items.graphite, 650,
  Items.plastanium, 650,
  items.glassSteel, 460,
  Items.surgeAlloy, 800)
})
obituary.consumePower(2240 / 60);
AddCoolant(obituary, 0.2)
obituary.ammo(
 Items.surgeAlloy, Object.assign(new RailBulletType(), {
  knockback: 40,
  shootEffect: Fx.railShoot,
  length: 772,
  pointEffectSpace: 40,
  pierceEffect: Fx.railHit,
  pointEffect: Fx.railTrail,
  hitEffect: Fx.massiveExplosion,
  smokeEffect: Fx.shootBig2,
  damage: 1850,
  pierceDamageFactor: 0.5,
  buildingDamageMultiplier: 0.5,
 }))

const skynet = new ItemTurret("skynet");
exports.skynet = skynet;
Object.assign(skynet, {
 health: 2620,
 size: 3,
 reload: 32,
 range: 288,
 maxAmmo: 80,
 recoilTime: 15,
 recoil: 3,
 shake: 0.5,
 inaccuracy: 1,
 targetGround: false,
 targetAir: true,
 rotateSpeed: 6,
 shootSound: Vars.tree.loadSound("missile2"),
 shoot: Object.assign(new ShootBarrel, {
  shots: 3,
  shotDelay: 3,
  barrels: [-5, 3.5, 0, 5, 3.5, 0]
 }),

 buildVisibility: BuildVisibility.shown,
 category: Category.turret,
 requirements: ItemStack.with(
  Items.titanium, 90,
  Items.lead, 65,
  Items.graphite, 80,
  items.chip, 65),
 alwaysUnlocked: false,
 researchCostMultiplier: 30,
});
skynet.drawer.parts.addAll(
 Object.assign(new RegionPart("-shoot"), {
  moveX: 0,
  moveY: 1.5,
  x: 0,
  y: 0
 }),)
// 添加冷却剂消耗
AddCoolant(skynet, 0.2);

// 添加弹药类型
skynet.ammo(
 Items.graphite, Object.assign(new BasicBulletType(12, 28), {
  trailLength: 4,
  trailColor: Color.valueOf("#7d89d8ff"),
  backColor: Color.valueOf("#7d89d8ff"),
  frontColor: Color.valueOf("#dae1eeff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  reloadMultiplier: 0.85,
  lifetime: 24,
  width: 8,
  height: 12,
  hitSize: 12,
  collidesGround: false,
  pierceArmor: false,
  homingPower: 0.05,
  splashDamageRadius: 18,
  splashDamage: 62,
  hitEffect: Fx.flakExplosion,
  despawnEffect: Fx.flakExplosion,
  knockback: 2,
  shootEffect: Object.assign(new ParticleEffect(), {
   particles: 2,
   length: 25,
   lifetime: 48,
   interp: Interp.circleOut,
   sizeInterp: Interp.pow5Out,
   cone: 0,
   colorFrom: Color.valueOf("#7d89d8ff"),
   colorTo: Color.valueOf("#7d89d8ff"),
   sizeFrom: 5.5,
   sizeTo: 0
  })
 }),
 Items.titanium, Object.assign(new BasicBulletType(12, 25), {
  trailLength: 4,
  lifetime: 24,
  width: 8,
  height: 12,
  hitSize: 12,
  collidesGround: false,
  pierceArmor: false,
  trailColor: Color.valueOf("#7d89d8ff"),
  backColor: Color.valueOf("#7d89d8ff"),
  frontColor: Color.valueOf("#dae1eeff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  homingPower: 0.05,
  splashDamageRadius: 18,
  splashDamage: 40,
  hitEffect: Fx.flakExplosion,
  despawnEffect: Fx.flakExplosion,
  knockback: 2,
  shootEffect: Object.assign(new ParticleEffect(), {
   particles: 2,
   length: 25,
   lifetime: 48,
   interp: Interp.circleOut,
   sizeInterp: Interp.pow5Out,
   cone: 0,
   colorFrom: Color.valueOf("#D0DAFDFF"),
   colorTo: Color.valueOf("#D0DAFDFF"),
   sizeFrom: 5.5,
   sizeTo: 0
  })
 }),
 Items.plastanium, Object.assign(new BasicBulletType(12, 30), {
  trailLength: 4,
  lifetime: 24,
  width: 8,
  height: 12,
  hitSize: 12,
  reloadMultiplier: 0.9,
  trailColor: Color.valueOf("#9CB664FF"),
  backColor: Color.valueOf("#9CB664FF"),
  frontColor: Color.valueOf("#dae1eeff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  collidesGround: false,
  pierceArmor: false,
  homingPower: 0.05,
  fragBullets: 4,
  splashDamageRadius: 18,
  splashDamage: 50,
  knockback: 2,
  hitEffect: Fx.plasticExplosion,
  despawnEffect: Fx.plasticExplosion,
  fragBullet: Object.assign(new BasicBulletType(5.5, 12), {
   width: 9,
   height: 3,
   lifetime: 6,
   backColor: Color.valueOf("#ffffff"),
   frontColor: Color.valueOf("#9CB664FF"),
   hitEffect: Fx.none,
   despawnEffect: Fx.none
  }),
  shootEffect: Object.assign(new ParticleEffect(), {
   particles: 2,
   length: 25,
   lifetime: 48,
   interp: Interp.circleOut,
   sizeInterp: Interp.pow5Out,
   cone: 0,
   colorFrom: Color.valueOf("#9CB664FF"),
   colorTo: Color.valueOf("#9CB664FF"),
   sizeFrom: 5.5,
   sizeTo: 0
  })
 }),
 items.alpha, Object.assign(new BasicBulletType(12, 28), {
  status: status.alphaBurning,
  statusDuration: 150,
  trailLength: 4,
  speed: 12,
  damage: 28,
  lifetime: 24,
  width: 8,
  height: 12,
  hitSize: 12,
  reloadMultiplier: 0.9,
  trailColor: Color.valueOf("#FF5B5BFF"),
  backColor: Color.valueOf("#FF5B5BFF"),
  frontColor: Color.valueOf("#ffffff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  collidesGround: false,
  pierceArmor: false,
  pierceCap: 2,
  homingPower: 0.05,
  fragBullets: 4,
  splashDamageRadius: 18,
  splashDamage: 56,
  hitEffect: new MultiEffect(
   Object.assign(new WaveEffect(), {
    lifetime: 15,
    sizeFrom: 0,
    sizeTo: 30,
    strokeFrom: 7.5,
    strokeTo: 0,
    colorFrom: Color.valueOf("#FF5B5BFF"),
    colorTo: Color.valueOf("#FF5B5BFF")
   }),
   Object.assign(new ParticleEffect(), {
    offset: 30,
    particles: 10,
    lifetime: 25,
    length: 30,
    interp: Interp.circleOut,
    sizeInterp: Interp.pow5In,
    cone: -360,
    line: true,
    strokeFrom: 1.5,
    strokeTo: 1.5,
    lightColor: Color.valueOf("#ffffff"),
    colorFrom: Color.valueOf("#FF5B5BFF"),
    colorTo: Color.valueOf("#ffffff")
   })),
  despawnEffect: new MultiEffect(
   Object.assign(new WaveEffect(), {
    lifetime: 15,
    sizeFrom: 0,
    sizeTo: 30,
    strokeFrom: 7.5,
    strokeTo: 0,
    colorFrom: Color.valueOf("#FF5B5BFF"),
    colorTo: Color.valueOf("#ffffff")
   }),
   Object.assign(new ParticleEffect(), {
    offset: 30,
    particles: 10,
    lifetime: 25,
    length: 30,
    interp: Interp.circleOut,
    sizeInterp: Interp.pow5In,
    cone: -360,
    line: true,
    strokeFrom: 1.5,
    strokeTo: 1.5,
    lightColor: Color.valueOf("#ffffff"),
    colorFrom: Color.valueOf("#FF5B5BFF"),
    colorTo: Color.valueOf("#ffffff")
   })),
  incendAmount: 14,
  incendSpread: 20,
  incendChance: 10,
  fragBullet: Object.assign(new BasicBulletType(5.5, 5), {
   width: 9,
   height: 3,
   lifetime: 6,
   backColor: Color.valueOf("#ffffff"),
   frontColor: Color.valueOf("#FF5B5BFF"),
   despawnEffect: Fx.none,
   instantDisappear: true,
   incendAmount: 14,
   incendSpread: 20,
   incendChance: 10,
  }),
  shootEffect: Object.assign(new ParticleEffect(), {
   particles: 2,
   length: 25,
   lifetime: 48,
   interp: Interp.circleOut,
   sizeInterp: Interp.pow5Out,
   cone: 0,
   colorFrom: Color.valueOf("#ffffff"),
   colorTo: Color.valueOf("#ffffff"),
   sizeFrom: 5.5,
   sizeTo: 0
  })
 }),
 Items.thorium, Object.assign(new BasicBulletType(12, 40), {
  trailLength: 4,
  lifetime: 24,
  width: 8,
  height: 12,
  collidesGround: false,
  pierceArmor: false,
  trailColor: Color.valueOf("#f595beff"),
  backColor: Color.valueOf("#f595beff"),
  frontColor: Color.valueOf("#ffffff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  homingPower: 0.05,
  splashDamageRadius: 18,
  splashDamage: 40,
  hitSize: 12,
  hitEffect: Fx.flakExplosion,
  despawnEffect: Fx.flakExplosion,
  knockback: 2,
  pierce: true,
  pierceCap: 2,
  reloadMultiplier: 0.8,
  shootEffect: Object.assign(new ParticleEffect(), {
   particles: 2,
   length: 25,
   lifetime: 48,
   interp: Interp.circleOut,
   sizeInterp: Interp.pow5Out,
   cone: 0,
   colorFrom: Color.valueOf("#f595beff"),
   colorTo: Color.valueOf("#f595beff"),
   sizeFrom: 5.5,
   sizeTo: 0
  })
 }))
const wraith = extend(ItemTurret, "wraith", {
 update: true,
 setStats() {
  this.super$setStats();
  this.stats.add(tiers, "2")
 }
});
exports.wraith = wraith;
Object.assign(wraith, {
 shootSound: Vars.tree.loadSound("shoot1"),
 health: 5080,
 armor: 18,
 maxAmmo: 120,
 range: 385,
 reload: 18.75,
 size: 4,
 inaccuracy: 2,
 //shootSound: Sounds.shootBig,
 shoot: Object.assign(new ShootBarrel(), {
  shots: 4,
  shotDelay: 3,
  barrels: [
   -3, 2, 0,
   -3, 2, 0,
   -3, 2, 0,
   -3, 2, 0,
   3, 2, 0,
   3, 2, 0,
   3, 2, 0,
   3, 2, 0]
 }),
 buildVisibility: BuildVisibility.shown,
 category: Category.turret,
});

// Add coolant consumption
AddCoolant(wraith, 0.3);

// Add ammo types
wraith.ammo(
 Items.thorium, Object.assign(new BasicBulletType(10, 88), {
  shootEffect: Fx.shootPyraFlame,
  pierce: true,
  pierceCap: 3,
  reloadMultiplier: 0.9,
  ammoMultiplier: 2,
  knockback: 6,
  width: 13,
  height: 23,
  smokeEffect: Fx.shootSmallSmoke,
  lifetime: 38.5,
  trailLength: 6,
  armorMultiplier: 0.5,
  trailColor: Color.valueOf("#f595beff"),
  backColor: Color.valueOf("#f595beff"),
  frontColor: Color.valueOf("#ffffffff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
 }),

 Items.graphite, Object.assign(new BasicBulletType(10, 70), {
  pierce: true,
  pierceCap: 2,
  reloadMultiplier: 1,
  ammoMultiplier: 2,
  knockback: 5,
  width: 13,
  height: 22,
  smokeEffect: Fx.shootSmallSmoke,
  lifetime: 38.5,
  trailLength: 6,
  trailColor: Color.valueOf("#7d89d8ff"),
  backColor: Color.valueOf("#7d89d8ff"),
  frontColor: Color.valueOf("#dae1eeff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
 }),

 Items.plastanium, Object.assign(new BasicBulletType(10, 62), {
  shootEffect: Fx.shootPyraFlame,
  pierce: true,
  pierceCap: 3,
  reloadMultiplier: 0.9,
  ammoMultiplier: 2,
  armorMultiplier: 0.75,
  knockback: 6,
  width: 13,
  height: 22,
  trailLength: 6,
  trailColor: Color.valueOf("#C6D676FF"),
  backColor: Color.valueOf("#C6D676FF"),
  frontColor: Color.valueOf("#dae1eeff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  fragBullets: 5,
  fragBullet: Object.assign(new BasicBulletType(4, 12), {
   width: 16,
   height: 6,
   lifetime: 14,
   pierce: true,
   pierceCap: 2,
   armorMultiplier: 1.5,
   trailColor: Color.valueOf("#FFFFFFFF"),
   backColor: Color.valueOf("#C6D676FF"),
   frontColor: Color.valueOf("#dae1eeff"),
   mixColorFrom: Color.valueOf("#ffffff00"),
   mixColorTo: Color.valueOf("#ffffff00"),
   hitEffect: Fx.none,
   despawnEffect: Fx.none
  }),
  smokeEffect: Fx.shootSmallSmoke,
  hitEffect: Fx.plasticExplosion,
  lifetime: 38.5
 }),

 items.alpha, Object.assign(new BasicBulletType(10, 64), {
  shootEffect: Fx.shootPyraFlame,
  status: status.alphaBurning,
  pierce: false,
  pierceCap: 1,
  reloadMultiplier: 0.9,
  ammoMultiplier: 2,
  armorMultiplier: 1.5,
  knockback: 5,
  width: 13,
  height: 22,
  splashDamage: 34,
  splashDamageRadius: 25.6,
  smokeEffect: Fx.shootSmallSmoke,
  trailLength: 6,
  trailColor: Color.valueOf("#FF5B5BFF"),
  backColor: Color.valueOf("#FF5B5BFF"),
  frontColor: Color.valueOf("#dae1eeff"),
  mixColorFrom: Color.valueOf("#ffffff00"),
  mixColorTo: Color.valueOf("#ffffff00"),
  lifetime: 38.5,
  incendAmount: 3,
  incendSpread: 3,
  incendChance: 4,
  hitEffect: new MultiEffect(
   Object.assign(new WaveEffect(), {
    lifetime: 15,
    sizeFrom: 0,
    sizeTo: 30,
    strokeFrom: 7.5,
    strokeTo: 0,
    colorFrom: Color.valueOf("#FFFFFFFF"),
    colorTo: Color.valueOf("#FF5B5BFF")
   }),
   Object.assign(new ParticleEffect(), {
    offset: 30,
    particles: 10,
    lifetime: 25,
    length: 30,
    interp: Interp.circleOut,
    sizeInterp: Interp.pow5In,
    cone: -360,
    line: false,
    strokeFrom: 1.3,
    strokeTo: 0.3,
    lightColor: Color.valueOf("#FF5B5BFF"),
    colorFrom: Color.valueOf("#FFFFFFFF"),
    colorTo: Color.valueOf("#FF5B5BFF")
   })),
  despawnEffect: new MultiEffect(
   Object.assign(new WaveEffect(), {
    lifetime: 15,
    sizeFrom: 0,
    sizeTo: 30,
    strokeFrom: 7.5,
    strokeTo: 0,
    colorFrom: Color.valueOf("#FFFFFFFF"),
    colorTo: Color.valueOf("#FF5B5BFF")
   }),
   Object.assign(new ParticleEffect(), {
    offset: 30,
    particles: 10,
    lifetime: 25,
    length: 30,
    interp: Interp.circleOut,
    sizeInterp: Interp.pow5In,
    cone: -360,
    line: true,
    strokeFrom: 1.3,
    strokeTo: 0.3,
    lightColor: Color.valueOf("#FF5B5BFF"),
    colorFrom: Color.valueOf("#FFFFFFFF"),
    colorTo: Color.valueOf("#FF5B5BFF")
   }))
 }),);

// Add requirements
wraith.requirements = ItemStack.with(
 Items.copper, 2250,
 Items.thorium, 1400,
 items.chip, 600,
 Items.graphite, 850,
 Items.plastanium, 650,
 items.glassSteel, 500,
 items.viaonChip, 340,
 Items.surgeAlloy, 420,);

const pfc = extend(ItemTurret, "pfc", {});
exports.pfc = pfc;
Object.assign(pfc, {
 health: 250,
 armor: 2,
 range: 21.5 * 8,
 reload: 60 / 4,
 size: 1,
 inaccuracy: 0.2,
 liquidCapacity: 10,
 maxAmmo: 20,
 consumeAmmoOnce: true,
 buildTime: 2 * 60,
 //shootSound: Vars.tree.loadSound("shootMini1"),
 shootSound: Vars.tree.loadSound("pfc-shoot"),
 shootSoundVolume: 0.5,
 shootEffect: new MultiEffect(
  Object.assign(new ParticleEffect(), {
   particles: 1,
   sizeTo: 0,
   sizeFrom: 0.5,
   colorTo: Color.valueOf("#ffb855"),
   colorFrom: Color.valueOf("#db661c"),
   cone: 10,
   length: 2.5,
   lifetime: 14,
   layer: 101,
   interp: Interp.circleOut,
   sizeInterp: Interp.pow2In,
  }),
  Object.assign(new ParticleEffect(), {
   particles: 2,
   sizeTo: 0,
   sizeFrom: 0.5,
   colorTo: Color.valueOf("#454545ff"),
   colorFrom: Color.valueOf("#db661c"),
   cone: 10,
   length: 4,
   lifetime: 12,
   layer: 100,
   interp: Interp.circleOut,
  })),
 buildVisibility: BuildVisibility.shown,
 category: Category.turret,
 requirements: ItemStack.with(
  Items.copper, 20,
  Items.lead, 10,
 )
}),


 pfc.ammo(
  Items.copper, Object.assign(new BasicBulletType(16, 12), {//speed,damage
   sprite: "ai-fast-bullet",
   ammoMultiplier: 2,
   trailColor: Color.valueOf("#ffb855"),
   backColor: Color.valueOf("#ffb855"),
   frontColor: Color.valueOf("#ffffff"),
   mixColorFrom: Color.valueOf("#ffffff00"),
   lifetime: 11.5,
   width: 4,
   height: 22,
   hitEffect: new MultiEffect(
    Fx.hitScepterSecondary,
   )
  }
  ),
  Items.lead, Object.assign(new BasicBulletType(16, 8), {//speed,damage
   sprite: "ai-fast-bullet",
   ammoMultiplier: 2,
   reloadMultiplier: 1.25,
   trailColor: Color.valueOf("#ffb855"),
   backColor: Color.valueOf("#ffb855"),
   frontColor: Color.valueOf("#ffffff"),
   mixColorFrom: Color.valueOf("#ffffff00"),
   lifetime: 11.5,
   width: 4,
   height: 22,
   hitEffect: new MultiEffect(
    Fx.hitScepterSecondary,
   )
  }),
  Items.beryllium, Object.assign(new BasicBulletType(16, 20), {//speed,damage
   sprite: "ai-fast-bullet",
   ammoMultiplier: 2,
   reloadMultiplier: 0.75,
   trailColor: Color.valueOf("#ffb855"),
   backColor: Color.valueOf("#ffb855"),
   frontColor: Color.valueOf("#ffffff"),
   mixColorFrom: Color.valueOf("#ffffff00"),
   lifetime: 11.5,
   width: 4,
   height: 22,
   hitEffect: new MultiEffect(
    Fx.hitScepterSecondary,
   )
  }),
  Items.thorium, Object.assign(new BasicBulletType(16, 20), {//speed,damage
   sprite: "ai-fast-bullet",
   armorMultiplier: 0.5,
   ammoMultiplier: 2,
   reloadMultiplier: 0.75,
   trailColor: Color.valueOf("#ffb855"),
   backColor: Color.valueOf("#ffb855"),
   frontColor: Color.valueOf("#ffffff"),
   mixColorFrom: Color.valueOf("#ffffff00"),
   lifetime: 11.5,
   width: 4,
   height: 22,
   hitEffect: new MultiEffect(
    Fx.hitScepterSecondary,
   ),
  }),
  items.chip, Object.assign(new BasicBulletType(16, 12), {//speed,damage
   sprite: "ai-fast-bullet",
   ammoMultiplier: 20,
   shieldDamageMultiplier: 3,
   backColor: Color.valueOf("#ffb855"),
   frontColor: Color.valueOf("#ffffff"),
   mixColorFrom: Color.valueOf("#ffffff00"),
   lifetime: 11.5,
   width: 5,
   height: 22,
   trailColor: Color.valueOf("#ffb855"),
   trailLength: 4,
   hitEffect: new MultiEffect(
    Fx.hitScepterSecondary,
    Object.assign(new ParticleEffect(), {
     particles: 8,
     sizeTo: 0,
     sizeFrom: 5,
     colorTo: Color.valueOf("#ffb855"),
     colorFrom: Color.valueOf("#ffb855"),
     cone: -360,
     lifetime: 30,
     layer: 100,
     region: shell,
     useRotation: false,
     baseRotation: 0,
    },
    )
   ),
   despawnEffect: new MultiEffect(
    Object.assign(new ParticleEffect(), {
     particles: 8,
     sizeTo: 0,
     sizeFrom: 5,
     colorTo: Color.valueOf("#ffb855"),
     colorFrom: Color.valueOf("#ffb855"),
     cone: -360,
     lifetime: 30,
     layer: 100,
     region: shell,
     useRotation: false,
     baseRotation: 0,
    }
    )
   )
  }
  ))
pfc.drawer.parts.addAll(
 Object.assign(new RegionPart("-shoot"), {
  y: 1,
  moveY: - 1,
  progress: PartRecoil
 }),)