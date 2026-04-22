const items = require("items")
const status = require("status");

Blocks.daciteWall.attributes.set(Attribute.sand, 3);
Blocks.dirtWall.attributes.set(Attribute.sand, 1.25);
Blocks.duneWall.attributes.set(Attribute.sand, 1.5);
Blocks.ferricStoneWall.attributes.set(Attribute.sand, 1);
Blocks.iceWall.attributes.set(Attribute.sand, 0.75);
Blocks.saltWall.attributes.set(Attribute.sand, 1);
Blocks.sandWall.attributes.set(Attribute.sand, 1.75);
Blocks.shaleWall.attributes.set(Attribute.sand, 1.5);
Blocks.snowWall.attributes.set(Attribute.sand, 0.5);
Blocks.stoneWall.attributes.set(Attribute.sand, 1);
//新的属性！ 
Attribute.add("SO2");


const clayRock = new Floor("clay-rock");
Object.assign(clayRock, {
 speedMultiplier: 1,
 dragMultiplier: 0.9,
 variants: 5
})

const quartzite = extend(Floor, "quartzite", {
 speedMultiplier: 1.3,
 dragMultiplier: 1.1,
 variants: 4

});


const quartziteSand = new Floor("quartzite-sand");
Object.assign(quartziteSand, {
 speedMultiplier: 0.9,
 dragMultiplier: 0.9,
 variants: 3,
 itemDrop: Items.sand
})//StaticWall

const quartziteSandWall = new StaticWall("quartzite-sand-wall");
Object.assign(quartziteSandWall, {
 variants: 2,
})


const limeStone = new Floor("lime-stone");
Object.assign(limeStone, {
 speedMultiplier: 1.1,
 dragMultiplier: 1.1,
 variants: 4,
})

const kensenite = new Floor("kensenite");
Object.assign(kensenite, {
 speedMultiplier: 1.1,
 dragMultiplier: 1.1,
 variants: 3,
})
const bedrock = new Floor("bedrock", 0);


function Shader(name) {
 let shaders = Vars.mods.locateMod("ai").root.child("shaders");
 let s = new Shaders.SurfaceShader(Shaders.getShaderFi("screenspace.vert").readString(), shaders.child(name + ".frag").readString());
 let m = new CacheLayer.ShaderLayer(s);
 CacheLayer.add(m);
 return m
}

const rainbow = new Floor("rainbow", 0);
Object.assign(rainbow, {
 liquidDrop: Liquids.water,
 cacheLayer: Shader("rrrrrainbow"),
});

const abyss = new Floor("abyss", 0);
Object.assign(abyss, {
 cacheLayer: Shader("pit"),
 solid: true,
 placeableOn: false,
});

const waterPit = new Floor("water-pit", 0);
Object.assign(waterPit, {
 liquidDrop: Liquids.water,
 cacheLayer: Shader("water-pit"),
 liquidMultiplier: 8,
 buildVisibility: BuildVisibility.shown,
 category: Category.effect,
 requirements: ItemStack.with(
  Items.graphite, 40,
  Items.titanium, 120,
 ),
});
/*
const blackTop1 = new Floor("blackTop-white-1");
Object.assign(blackTop1,{
    speedMultiplier:1.3,
    dragMultiplier:1.3,
    variants: 0
})

const blackTop2 = new Floor("blackTop-white-2");
Object.assign(blackTop2,{
    speedMultiplier:1.3,
    dragMultiplier:1.3,
    variants: 0
})

const blackTop3 = new Floor("blackTop-yellow-1");
Object.assign(blackTop3,{
    speedMultiplier:1.3,
    dragMultiplier:1.3,
    variants: 0
})

const blackTop4 = new Floor("blackTop-yellow-2");
Object.assign(blackTop4,{
    speedMultiplier:1.3,
    dragMultiplier:1.3,
    variants: 0
})

const darkPanel7 = new Floor("dark-panel7");
darkPanel7.variants = 0;

const darkPanel8 = new Floor("dark-panel8");
darkPanel8.variants = 0;

const darkPanel9 = new Floor("dark-panel9");
darkPanel9.variants = 0;

const glassFloor1 = new Floor("glass-floor1");
exports.glassFloor1 = glassFloor1;
Object.assign(glassFloor1,{
 placeableLiquid:false,
 requiresWater:false,
 hasShadow:false,
 variants: 0,
 //research: "experimental-machine",
 buildVisibility: BuildVisibility.shown,
 category: Category.effect,
 requirements: ItemStack.with(
  Items.metaglass, 40,
 )
})

const glassFloor2 = new Floor("glass-floor2");
exports.glassFloor2 = glassFloor2;
Object.assign(glassFloor2,{
 placeableLiquid:false,
 requiresWater:false,
 hasShadow:false,
 variants: 0,
 //research: "experimental-machine",
 buildVisibility: BuildVisibility.shown,
 category: Category.effect,
 requirements: ItemStack.with(
  Items.metaglass, 40,
 )
})

const glassFloor3 = new Floor("glass-floor3");
exports.glassFloor3 = glassFloor3;
Object.assign(glassFloor3,{
 placeableLiquid:false,
 requiresWater:false,
 hasShadow:false,
 variants: 0,
 //research: "experimental-machine",
 buildVisibility: BuildVisibility.shown,
 category: Category.effect,
 requirements: ItemStack.with(
  Items.metaglass, 40,
 )
})

const glassFloor4 = new Floor("glass-floor4");
exports.glassFloor4 = glassFloor4;
Object.assign(glassFloor4,{
 placeableLiquid:false,
 requiresWater:false,
 hasShadow:false,
 variants: 0,
 //research: "experimental-machine",
 buildVisibility: BuildVisibility.shown,
 category: Category.effect,
 requirements: ItemStack.with(
  Items.metaglass, 40,
 )
})

const glassSteelFloor1 = new Floor("glass-steel-floor1");
exports.glassSteelFloor1 = glassSteelFloor1;
Object.assign(glassSteelFloor1,{
 placeableLiquid:false,
 requiresWater:false,
 hasShadow:false,
 variants: 0,
 //research: "experimental-machine",
 buildVisibility: BuildVisibility.shown,
 category: Category.effect,
 requirements: ItemStack.with(
  items.glassSteel, 40,
 )
})

const glassSteelFloor2 = new Floor("glass-steel-floor2");
exports.glassSteelFloor2 = glassSteelFloor2;
Object.assign(glassSteelFloor2,{
 placeableLiquid:false,
 requiresWater:false,
 hasShadow:false,
 variants: 0,
 //research: "experimental-machine",
 buildVisibility: BuildVisibility.shown,
 category: Category.effect,
 requirements: ItemStack.with(
  items.glassSteel, 40,
 )
})

const heatPanel = new Floor("heat-panel");
Object.assign(heatPanel,{
    variants: 0
})
heatPanel.attributes.set(Attribute.heat, 1);
heatPanel.attributes.set(Attribute.spores, 0);
heatPanel.attributes.set(Attribute.water, -0.4);
heatPanel.attributes.set(Attribute.oil, 0);

const metalFloor2Damaged = new Floor("metal-floor2-damaged");
metalFloor2Damaged.variants = 3;
*/
/*const lightMetal = new StaticWall("light-metal");
Object.assign(lightMetal,{
    emitLight: true,
    lightRadius: 30,
    lightColor: Color.valueOf("#DAEEF2"),
    variants: 9
})*/
/*
new OreBlock("alpha-ore", items.alpha);
new OreBlock("ore-silicon", Items.silicon);*/
