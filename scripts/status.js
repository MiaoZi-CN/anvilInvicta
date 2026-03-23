var SecShieldDamage = Stat("SecShieldDamage");
var ArmorBreak = Stat("armorBreak");
var MinArmor = Stat("MinArmor");

function shieldDamage(name, shieldDamage) {
 return extend(StatusEffect, name, {
  setStats() {
   this.super$setStats();
   this.stats.add(SecShieldDamage, shieldDamage)
  },
  update(unit) {
   if (unit.shield)
    unit.shield -= shieldDamage;
  },
 });
};
shieldDamage("shieldDamageBuff", 1);


function armorBreakStatus(name, armorBreak, minArmor) {
 return extend(StatusEffect, name, {
 setStats() {
  this.super$setStats();
  this.stats.add(ArmorBreak, armorBreak)
  this.stats.add(MinArmor, minArmor)
 },
 update(unit) {
  unit.armor = unit.type.armor < minArmor ? unit.type.armor : Math.max(unit.type.armor - armorBreak, minArmor)//三元大人!!!
 },
 })
};

const alphaBurning = extend(StatusEffect, "alpha-burning", {
 armorBreak:12,
 minArmor:-4,
 setStats() {
  this.super$setStats();
  this.stats.add(ArmorBreak, this.armorBreak)
  this.stats.add(MinArmor, this.minArmor)
 },
 update(unit) {
  unit.armor = unit.type.armor < this.minArmor ? unit.type.armor : Math.max(unit.type.armor - this.armorBreak, this.minArmor)//三元大人!!!
 },
 permanent: false,
 show:true,
 color: Color.valueOf("#FF5B5BFF"),
 healthMultiplier: 0.9,
 damage: 3,
 effect: Object.assign(new ParticleEffect(), {
  offset: 30,
  particles: 1,
  lifetime: 50,
  length: 40,
  interp: Interp.circleOut,
  sizeInterp: Interp.pow5In,
  cone: -360,
  strokeFrom: 1.3,
  strokeTo: 0,
  lightColor: Color.valueOf("#FF5B5BFF"),
  colorFrom: Color.valueOf("#FFFFFFFF"),
  colorTo: Color.valueOf("#FF5B5BFF")
 }),
 effectChance: 0.8,
});
exports.alphaBurning = alphaBurning;