//require("fluids");
//require("items");
require("status");
require("units");
require("blocks/environment");
require("blocks/space");

//require("blocks/bundles");
require("blocks/core");
require("blocks/wall");
require("blocks/distribution");
require("blocks/turret");

require("blocks/pulsetype");
require("blocks/miner");

require("blocks/power");
require("blocks/product");


require("blocks/forceprojector");
/*
require("blocks/原版")
//require("blocks/draws");


require("improve/IOCounter");
require("improve/InputListener");
*/
//为了应对人类们的报复升级的防御体系！
Events.on(EventType.ClientLoadEvent, () => {//Anvil Invicta！
 // 获取模组实例（内部名 "ai"）
 // 判断是否为 Android 平台
 if (Vars.android) {
  Log.info("This is an Android device.");
 } else {
  Log.info("This is not an Android device. (Could be Desktop or iOS)");
 }
 if (Vars.mods.getMod("new-horizon") != null) {
  Log.info("人类什么时候冲出行星重力井了？");
  Log.info("对了，pulse钻机会因为NH修改原版类内容导致选择的物品来回跳");
 }
 if (Vars.mods.getMod("ac") != null) {//Anvil Invicta！
  Log.info("人类什么时候打的启示录战争？");
 }

})
Log.info("Anvil Invicta Load");
Log.info("已加载Anvil Invicta");
/*
                           _ooOoo_
                          o8888888o
                          88"  .  "88
                          ( |  -_-  | )
 .                         O\  =  /O
                         ____/`---'\____
                        .'  \\|     |//  `.
                       /  \\|||  :  |||//   \
                     /   _||||| -:-  |||||-    \
                     |    | \\\  -  /// |   |
                     |  \_|   ''\---/''   |   |
                     \  .-\__  `-`  ___/-. /
                    ___`. .'  /--.--\  `. . __
                ."" '<   `.___\_<|>_/___.'    >'"".
               |  | :  `- \`.; `\ _ /`;.`  / - ` : |  |
               \  \ `-.   \_ __\ /__ _/   .-` /  /
===============`-.____`-.___\_____/___.-`____.-'==========
                     佛祖保佑    永无bug*/