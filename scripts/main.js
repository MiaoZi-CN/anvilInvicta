//require("fluids");
//require("items");
require("status");
require("units");
require("blocks/environment");

//require("blocks/bundles");
require("blocks/core");
require("blocks/wall");
require("blocks/distribution");
require("blocks/turret");

require("blocks/pulsetype");
require("blocks/miner");

require("blocks/power");
require("blocks/product");


require("blocks/forceprojector");/*
require("blocks/shield");

require("blocks/原版")
//require("blocks/draws");


require("improve/IOCounter");
require("improve/InputListener");
*/
//为了应对人类们的报复升级的防御体系！
Events.on(EventType.ClientLoadEvent, () => {
 if (Vars.mods.getMod("new-horizon") != null) {
  Log.info("人类什么时候冲出行星重力井了？");
  Log.info("对了，pulse钻机会因为NH修改原版类内容导致选择的物品来回跳");
 }
 if (Vars.mods.getMod("ac") != null) {
  Log.info("人类什么时候打的启示录战争？");
 }
},)
Log.info("Anvil Invicta Load");
Log.info("已加载Anvil Invicta");