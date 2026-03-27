
const sage = new UnitType("sage");
exports.sage = sage;
Object.assign(sage,{
    ammoCapacity: 80,
    speed: 2,
    accel: 0.4,
    drag: 0.017,
    engineOffset: 10,
    engineSize:2.5,
    hitSize: 10,
    health: 270,
    armor: 1,
    mineSpeed: 0,
    mineTier: 0,
    buildSpeed: 0,
    rotateSpeed: 6,
    itemCapacity: 20,
    targetAir:true,
    flying: true,
    trailLength: 3,//拖尾长
 //   trailColor:Color.valueOf("#FFC999FF"),//拖尾颜色
 outlineColor:Color.valueOf('#25272BFF'),
   constructor: () => new UnitEntity.create(),
})/*
sage.abilities.add();
sage.engines.add(
    new UnitType.UnitEngine(3, -8, 2.5, -0.8),
);
sage.weapons.add(
    Object.assign(new PointDefenseWeapon(),{
        x: 0,
        y: -2,
        reload: 30,
        targetInterval: 5,
        targetSwitchInterval: 5,
        mirror: false,//镜像
        rotate: true,
        top: false,
        bullet: Object.assign(new BulletType(),{
            shootEffect: Fx.sparkShoot,
            hitEffect: Fx.pointHit,
            maxRange: 60,
            damage: 40,
        })
    }),
    Object.assign(new Weapon(),{
        x:0,
        y:0,
        top:false,
        mirror:false,//镜像
        rotation:false,
        reload:80,//装弹时间
        //alternate:false,
        recoil:4,
        //shootSound:Sounds.laser,
        shake:0,
        inaccuracy:0,
        shootEffect: new MultiEffect(
            Object.assign(new ParticleEffect,{
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
        ),
        bullet: Object.assign(new LaserBulletType(),{
            damage:80,
            sideAngle:30,
            sideWidth:1,
            sideLength:35,
            length:130,
            colors:[Color.valueOf("#C5A4E5FF"),Color.valueOf("#000000FF"),Color.valueOf("#000000FF")],//颜色
        })
    })
);*/
/*
const legacy = new UnitType("legacy");
exports.legacy = legacy;
Object.assign(legacy,{
    flying: true,
    ammoCapacity: 150,
    ammoType: Items.titanium,
    speed: 3,
    accel: 0.02,
    drag: 0.02,
    engineOffset: 10,
    engineSize: 8,
    lowAltitude:false,
    hitSize:23,
    health:560,
    armor:3,
    rotateSpeed:4,
    faceTarget:true,
    itemCapacity:40,
})
legacy.abilities.add(
    Object.assign(new ShieldArcAbility(),{
		radius: 26,
		angle: 60,
		regen: 1,
		cooldown: 60 * 20,
		max: 140,
		width: 2,
		drawArc:true,
		whenShooting:false,
	}),
	Object.assign(new ShieldArcAbility(),{
		radius: 26,
		angle: 60,
		regen: 1,
		cooldown: 60 * 20,
		max: 140,
		width: 2,
		drawArc:false,
		whenShooting:false,
	}),
	Object.assign(new ShieldArcAbility(),{
		radius: 26,
		angle: -60,
		regen: 1,
		cooldown: 60 * 20,
		max: 140,
		width: 2,
		drawArc:true,
		whenShooting:false,
	}),
)
legacy.weapons.add(
    Object.assign(new Weapon("ai-legacy-missile-nest"),{
        x:0,
        y:-0.4,
        mirror:false,
        rotation:true,
        recoil:4,
        shake:1,
        inaccuracy:1.2,
        velocityRnd:0.2,
        //shootSound:Vars.tree.loadSound("L50"),
        reload:60,
        shoot: Object.assign(new ShootBarrel(),{
            shots:4,
            shotDelay:8,
            barrels:[
                {-3.25,-2,0},
                {0,-2,0},
                {3.25,-2,0}
            ]
        })
        bullet: Object.assign(new MissileBulletType(8,45,"ai-missile1"),{})
    })
)



bullet:{
sprite:ai-missile1,
trailLength:4,
trailColor:CBA3FFFF,
type:BasicBulletType,
frontColor:CBA3FFFF,
backColor:CBA3FFFF,
statusDuration:60,
width:6,
height:8.5,
shrinkY:0,
speed:8,
lifetime:33,
damage:45,
homingRange:60,
splashDamage:11,
splashDamageRadius:26,
shootEffect:{
type:ParticleEffect,
particles:4,
lifetime:8,
sizeFrom:0.66,
sizeTo:0,
interp:pow5Out,
sizeInterp:pow10In,
length:13,
colorFrom:CBA3FFFF,
colorTo:CBA3FFFF,
cone:6
},
hitEffect:{
type:multiEffect,
effects:[
{
type:WaveEffect,
lifetime:12,
sizeFrom:0,
sizeTo:8,
strokeFrom:2,
strokeTo:0,
colorFrom:CBA3FFFF,
colorTo:CBA3FFFF
},
{
type:ParticleEffect,
particles:1,
lifetime:18,
length:0,
interp:circleOut,
sizeInterp:pow5In,
cone:-360,
line:true,
spirit:ai-棱
strokeFrom:0.8,
strokeTo:0,
sizeFrom:0,
sizeTo:8,
lightColor:CBA3FFFF,
colorFrom:CBA3FFFF,
colorTo:CBA3FFFF
}
{
type:ParticleEffect,
particles:6,
lifetime:40,
length:10,
interp:circleOut,
sizeInterp:pow5In,
cone:-360,
line:true,
strokeFrom:0.8,
strokeTo:0.8,
lenFrom:4,
lenTo:0,
lightColor:CBA3FFFF,
colorFrom:CBA3FFFF,
colorTo:CBA3FFFF
}
]
},
despawnEffect:{
type:multiEffect,
effects:[
{
type:WaveEffect,
lifetime:30,
sizeFrom:0,
sizeTo:16,
strokeFrom:2,
strokeTo:0,
colorFrom:CBA3FFFF,
colorTo:CBA3FFFF
},
{
type:ParticleEffect,
particles:12,
lifetime:60,
length:18,
interp:circleOut,
sizeInterp:pow5In,
cone:-360,
line:true,
strokeFrom:0.8,
strokeTo:0.8,
lenFrom:4,
lenTo:0,
lightColor:CBA3FFFF,
colorFrom:CBA3FFFF,
colorTo:CBA3FFFF
}
]
},
weaveScale:1,
weaveMag:3,
collidesTeam:true,
collidesAir:true,
//scaleLife:true,
healPercent:3,
healAmount:10
}
},
{
name:none,
x:0,
y:0,
top:false,
mirror:false,
rotation:false,
reload:80,
recoil:4,
//shootSound:laser,
shake:0,
inaccuracy:0,
bullet:{
type:LaserBulletType,
damage:120,
sideAngle:30,
sideWidth:1,
sideLength:35,
length:114,
hitEffect:{
type:multiEffect,
effects:[
{
type:ParticleEffect,
offset:8,
particles:4,
lifetime:30,
length:10,
interp:circleOut,
sizeInterp:pow5In,
cone:55,
line:true,
strokeFrom:0.8,
strokeTo:0.8,
lenFrom:2,
lenTo:2,
lightColor:CBA3FFFF,
colorFrom:CBA3FFFF,
colorTo:CBA3FFFF
}
]
},
shootEffect:{
type:multiEffect,
effects:[
{
type:ParticleEffect,
offset:8,
particles:8,
lifetime:20,
length:32,
interp:circleOut,
sizeInterp:pow5In,
cone:20,
line:true,
strokeFrom:0.8,
strokeTo:0,
lenFrom:2.5,
lenTo:5,
lightColor:CBA3FFFF,
colorFrom:CBA3FFFF,
colorTo:CBA3FFFF
}
]
},
colors:[
C5A4E5FF,
000000FF,
000000FF"
]
}
}
]
}*/