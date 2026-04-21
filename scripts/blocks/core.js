const items = require("items")

const arouse = new UnitType("arouse");
exports.arouse = arouse;
Object.assign(arouse, {
    constructor: () => new UnitEntity.create(),
    flying: true,
//    ammoType: new ItemAmmoType(Items.copper),
    ammoCapacity: 400,
    speed: 6.2,
    accel: 1.2,
    drag:1.1,
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

const prismCore = new CoreBlock("prism-core");
exports.prismCore = prismCore;
Object.assign(prismCore, {
    unitType: arouse,
    unitCapModifier: 12,
    armor: 0,
    health: 800,
    size: 3,
    itemCapacity: 24000,
    insulated: true,
    absorbLasers: true,
    buildVisibility: BuildVisibility.shown,
    category: Category.effect,
    requirements: ItemStack.with(
    Items.copper, 1000,
    Items.titanium, 400,
    items.chip, 200,
    Items.silicon, 600, 
    )
})