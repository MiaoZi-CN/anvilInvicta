
const sage = new UnitType("sage");
exports.sage = sage;
Object.assign(sage, {
 ammoCapacity: 80,
 speed: 2,
 accel: 0.4,
 drag: 0.017,
 engineOffset: 8,
 engineSize: 2.5,
 hitSize: 10,
 health: 270,
 armor: 1,
 buildSpeed: 0,
 rotateSpeed: 6,
 itemCapacity: 20,
 trailColor: Color.valueOf("#99BAFFFF"),
 engineColor: Color.valueOf("#99BAFFFF"),
 targetAir: true,
 flying: true,
 targetable:true,
 outlineColor: Color.valueOf('#25272BFF'),
 constructor: () => new UnitEntity.create(),
})
sage.weapons.add(
 Object.assign(new PointDefenseWeapon(), {
  x: 0,
  y: -2,
  reload: 30,
  targetInterval: 5,
  targetSwitchInterval: 5,
  mirror: false,//镜像
  rotate: true,
  top: false,
  bullet: Object.assign(new BulletType(), {
   shootEffect: Fx.sparkShoot,
   hitEffect: Fx.pointHit,
   maxRange: 60,
   damage: 40,
  })
 }),
 Object.assign(new Weapon(), {
  x: 0,
  y: 0,
  top: false,
  mirror: false,//镜像
  rotate: false,
  reload: 80,//装弹时间
  //alternate:false,
  recoil: 4,
  shootSound: Vars.tree.loadSound("spacejump"),
  shake: 0,
  inaccuracy: 0,
  /*shootEffect: new MultiEffect(
   Object.assign(new ParticleEffect, {
    offset: 8,
    particles: 8,
    length: 32,
    baseLength: 0,
    lifetime: 20,
    cone: 20,
    line: false,
    colorFrom: Color.valueOf("#CBA3FFFF"),
    colorTo: Color.valueOf("#CBA3FFFF"),
    sizeFrom: 0.8,
    sizeTo: 0.8,
    interp: Interp.circleOut,
    sizeInterp: Interp.pow5In
   })
  ),*/
  bullet: Object.assign(new LaserBulletType(), {
   damage: 80,
   sideAngle: 30,
   sideWidth: 1,
   sideLength: 35,
   length: 130,
   colors: [Color.valueOf("#C5A4E5FF"), Color.valueOf("#ffffff"), Color.valueOf("#ffffff")],//颜色
  })
 })
);
//RUS-31BM rus31bm
const rus31bm = new UnitType("RUS-31BM");
exports.rus31bm = rus31bm;
Object.assign(rus31bm, {
 ammoCapacity: 10,
 speed: 1.1,
 accel: 0.3,
 drag: 0.017,
 engineOffset: 4,
 engineSize: 1.5,
 hitSize: 10,
 health: 15,
 armor: -1,
 buildSpeed: 0,
 rotateSpeed: 3,
 itemCapacity: 1,
 targetAir: true,
 flying: true,
 outlineColor: Color.valueOf('#25272BFF'),
 constructor: () => new UnitEntity.create(),
})

rus31bm.weapons.add(
 Object.assign(new Weapon(), {
  x: 0,
  y: 0,
  top: false,
  mirror: false,//镜像
  rotate: false,
  reload: 80,//装弹时间
  recoil: 4,
  shootSound: Vars.tree.loadSound("rocket1"),
  shake: 0,
  inaccuracy: 0,
  bullet: Object.assign(new MissileBulletType(5, 10), {
   trailColor: Color.valueOf("#a9d8ffff"),
   backColor: Color.valueOf("#a9d8ffff"),
   frontColor: Color.valueOf("#ffffffff"),
   mixColorFrom: Color.valueOf("#ffffff00"),
   mixColorTo: Color.valueOf("#ffffff00"),
   lifetime: 16,
   hitEffect: new MultiEffect(
    Object.assign(new ParticleEffect(), {
     startDelay: 1.25,
     particles: 3,
     sizeFrom: 3,
     sizeTo: 0,
     length: 6,
     lifetime: 16,
     interp: Interp.pow10Out,
     sizeInterp: Interp.pow5In,
     colorFrom: Color.valueOf("#a9d8ffff"),
     colorTo: Color.valueOf("#a9d8ffff"),
    })),
   despawnEffect: new MultiEffect(
    Object.assign(new ParticleEffect(), {
     startDelay: 1.25,
     particles: 3,
     sizeFrom: 3,
     sizeTo: 0,
     length: 6,
     lifetime: 16,
     interp: Interp.pow10Out,
     sizeInterp: Interp.pow5In,
     colorFrom: Color.valueOf("#a9d8ffff"),
     colorTo: Color.valueOf("#a9d8ffff"),
    })),
  }),
 })
);
//NGF-262M ngf262m
const ngf262m = new UnitType("NGF-262M");
exports.ngf262m = ngf262m;
Object.assign(ngf262m, {
 ammoCapacity: 10,
 speed: 0.65,
 accel: 0.2,
 drag: 0.032,
 engineOffset: 4,
 engineSize: 1.5,
 hitSize: 10,
 health: 20,
 armor: 0,
 buildSpeed: 0,
 rotateSpeed: 3,
 itemCapacity: 1,
 targetAir: true,
 flying: true,
 outlineColor: Color.valueOf('#25272BFF'),
 constructor: () => new UnitEntity.create(),
})
ngf262m.weapons.add(
 Object.assign(new Weapon(), {
  x: 0,
  y: 0,
  top: false,
  mirror: false,//镜像
  rotate: false,
  reload: 60,//装弹时间
  recoil: 4,
  shootSound: Vars.tree.loadSound("rocket1"),
  shake: 0,
  inaccuracy: 0,
  bullet: Object.assign(new MissileBulletType(3, 10), {
   trailColor: Color.valueOf("#a9d8ffff"),
   backColor: Color.valueOf("#a9d8ffff"),
   frontColor: Color.valueOf("#ffffffff"),
   mixColorFrom: Color.valueOf("#ffffff00"),
   mixColorTo: Color.valueOf("#ffffff00"),
   lifetime: 16,
   hitEffect: new MultiEffect(
    Object.assign(new ParticleEffect(), {
     startDelay: 1.25,
     particles: 3,
     sizeFrom: 3,
     sizeTo: 0,
     length: 6,
     lifetime: 16,
     interp: Interp.pow10Out,
     sizeInterp: Interp.pow5In,
     colorFrom: Color.valueOf("#a9d8ffff"),
     colorTo: Color.valueOf("#a9d8ffff"),
    })),
   despawnEffect: new MultiEffect(
    Object.assign(new ParticleEffect(), {
     startDelay: 1.25,
     particles: 3,
     sizeFrom: 3,
     sizeTo: 0,
     length: 6,
     lifetime: 16,
     interp: Interp.pow10Out,
     sizeInterp: Interp.pow5In,
     colorFrom: Color.valueOf("#a9d8ffff"),
     colorTo: Color.valueOf("#a9d8ffff"),
    })),
  }),
 })
);