const phasedrill = new Drill("phasedrill");
const status = require("status");

phasedrill.buildType = prov(() => extend(Drill.DrillBuild, phasedrill, {
    draw(){
        this.super$draw();
        Draw.color(Color.valueOf('#ffd37f'));
        Draw.alpha(0.8);
        Draw.z(Layer.block);
        Lines.stroke(2);
        Lines.poly(this.x, this.y, 4, 8, Time.time * 0.5);
    }
}));

/*
function Shader(name) {
	let shaders = Vars.mods.locateMod("dj").root.child("shaders");
	let s = new Shaders.SurfaceShader(Shaders.getShaderFi("screenspace.vert").readString(), shaders.child(name + ".frag").readString());
	let m = new CacheLayer.ShaderLayer(s);
	CacheLayer.add(m);
	return m
}
*/
const waterPit = new Floor("water-pit",0);
Object.assign(waterPit, {
	speedMultiplier: 0.1,
	variants: 0,
	status: status.wet,
	statusDuration: 90,
	liquidDrop: Liquids.water,
	cacheLayer: Shader("water-pit"),
	isLiquid: true,
	albedo: 0.9,
	supportsOverlay: true,
	liquidMultiplier: 4
});
