/*const acid = extend(Liquid,"acid",Color.valueOf("#84a94b"),{
 update(puddle){
   if(Mathf.chanceDelta(0.05)){
    Fx.mineSmall.at(puddle.x,puddle.y)
   }
  }
 });*/

const steam = new Liquid('steam', Color.valueOf('#A7A9B5FF'));
exports.steam = steam;
Object.assign(steam, {
 viscosity: 0,
 heatCapacity: 0.8,
 temperature: 0.4,
 flammability: 0,
 capPuddles: false,
 coolant: false,
 gas: true,
});
const neon = new Liquid('neon', Color.valueOf('#B60CFFFF'));
exports.neon = neon;
Object.assign(neon, {
 viscosity: 0,
 heatCapacity: 1.2,
 temperature: 0.2,
 flammability: 0,
 capPuddles: false,
 gas: true,
});
Liquids.nitrogen.heatCapacity = 1.1
Liquids.nitrogen.temperature = 0.2
/*LLLLLLL*/