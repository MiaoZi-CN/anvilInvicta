var items = Stat("items");


global.Filter = function (name) {
 var m = Object.assign(extend(GenericCrafter, name, {
  setStats() {
   this.super$setStats();
   this.stats.remove(Stat.productionTime);
  }
 }), {
  size: 1,
  itemCapacity: 1,
  configurable: true
 });
 m.setupRequirements(
  Category.distribution,
  BuildVisibility.shown,
  ItemStack.with(Items.copper, 1));
 return m;
}


global.FourDireFilter = function (name) {//这个函数就是一坨s山，别看了大家都头疼。
 var m = new global.Filter(name);
 m.buildType = () => {
  var items = [Items.copper, Items.lead, Items.titanium, Items.silicon];
  var shown = [false, false, false, false];
  var current = 0;
  return extend(GenericCrafter.GenericCrafterBuild, m, {
   acceptItem(source, item) {
    return this.items.get(item) < this.getMaximumAccepted(item);
   },
   buildConfiguration(table) {
    table.background(Tex.pane);
    table.pane(buttons => {
     buttons.collapser(bs => {
      Vars.content.items().each(item => {
       bs.button(Core.atlas.drawable(item.uiIcon), Styles.flati, 24, run(() => {
        for (var i = 0; i < 4; i++) {
         if (shown[i]) {
          items[i] = item;
          shown[i] = false;
         }
        }
       })).size(30);
      })
     }, () => (shown[0] || shown[1] || shown[2] || shown[3]));
    }).size(120, 30).row();
    table.pane(buttons2 => {
     function place(index) {
      buttons2.button(Icon.add, Styles.flati, 24, run(() => {
       shown[current] = false;
       shown[index] = true;
       current = index;
      })).update(m => {
       m.getStyle().imageUp = (items[index].uiIcon == null ? Icon.add : Core.atlas.drawable(items[index].uiIcon))
      }).size(30);
     }

     place(1);
     place(0);
     place(3);
     place(2);
    }).row();
    table.table(cons(places => {
     places.defaults().size(30);
     places.image(Icon.up);
     places.image(Icon.right);
     places.image(Icon.down);
     places.image(Icon.left);
    }));
   },
   updateTile() {
    for (var i = 0; i < 4; i++) {
     var build = this.nearby(i);
     if (build != null && build.acceptItem(this, items[i]) && this.items.has(items[i])) {
      build.handleItem(this, items[i]);
      this.items.remove(items[i], 1);
     }
    }
   },//我的持久化呢？
   //读取写入马上更新，歇逼了
  });//还要转换类型?
 }
}

new global.FourDireFilter('super-router');


const stackBridge = extend(BufferedItemBridge, "stackBridge", {
 /*setStats() {
 this.super$setStats();
 this.stats.add(package, "yes")
},*/
});

stackBridge.buildType = prov(() => {
 var lastItem = null;
 var amount = 0;

 const block = stackBridge;
//可以用extend来重写buildType
 return new JavaAdapter(BufferedItemBridge.BufferedItemBridgeBuild, {
  setLastItem(v) {
   lastItem = v;
  },
  getLastItem() {
   return lastItem;
  },
  setAmount(v) {
   amount = v;
  },
  getAmount() {
   return amount;
  },
  updateTile() {
   if (this.getLastItem() == null || !this.items.has(this.getLastItem())) {
    this.setLastItem(this.items.first());
   }
   this.super$updateTile();
  },
  updateTransport(other) {//重写updateTransport方法，实现传送老多物品功能
   if (this.items.total() >= block.itemCapacity && other != null && other.items.total() < block.itemCapacity) {
    other.setAmount(this.items.total());
    other.items.add(lastItem, other.getAmount());
    //    Fx.itemTransfer.at(this.x, this.y, 2, lastItem.color, other);
    Fx.plasticburn.at(this)
    Fx.plasticburn.at(other)
    this.items.clear();
   }
  },
  //4倍速度出物品，原版速度为准
  doDump() {//每当附近的块发生变化时都会调用这个方法，来更新堆积功能 
   for (var i = 0; i < 2; i++) {
    var other = this.nearby(i);
    if (other instanceof StackConveyor.StackConveyorBuild && other.link == -1) other.cooldown = 0;//让冷却为0
    this.dumpAccumulate();
   }
  },
  draw() {
   this.super$draw();
   var other = Vars.world.build(this.link);
   if (other == null || this.getLastItem() == null || this.link == -1) return;
   var angle = this.angleTo(other);
   //Draw.rect(stackRegion, this.x, this.y, angle);
   var size = Vars.itemSize * Mathf.lerp(Math.min(this.items.total() / block.itemCapacity, 1), 1, 0.4);
   Drawf.shadow(Tmp.v1.x, Tmp.v1.y, size * 1.2);
   Draw.rect(this.getLastItem().fullIcon, this.x, this.y, size, size, 0);//实际上这可以再添加一个两个方块间的动画，来表现物品在桥上的移动，不过我觉得没必要了。
  },
  acceptItem(source, item) {//实现所谓的堆叠功能
   if (this == source && this.items.total() < block.itemCapacity) return true;
   var other = Vars.world.tile(this.link);
   return (!((this.items.any() && !this.items.has(item)) || (this.items.total() >= this.getMaximumAccepted(item)))) && other != null && block.linkValid(this.tile, other);
  },
 }, stackBridge);
});
stackBridge.itemCapacity = 20;
stackBridge.size = 1;
stackBridge.range = 8;
stackBridge.requirements = ItemStack.with(
 Items.lead, 15,
 Items.silicon, 12,
 Items.titanium, 15,
 Items.plastanium, 10
);
stackBridge.buildVisibility = BuildVisibility.shown;
stackBridge.category = Category.distribution;

exports.stackBridge = stackBridge;

const fluxRail = extend(Duct, "flux-rail", {//光速轨，很帅！
 health: 200,
 armor: 2,
 size: 1,
 speed: 60 / 30,
 itemCapacity: 1,
 update: true,
 buildVisibility: BuildVisibility.shown,
 category: Category.distribution,
 placeableLiquid: true,
 hasPower: true,
 consumesPower: false,
 outputsPower: true,
 conductivePower: true,

 requirements: ItemStack.with(
  Items.silicon, 2
 ),

 loadIcon() {//获取图标
  this.super$loadIcon();
  this.fullIcon = this.uiIcon = Core.atlas.find(this.name + "-full");
 },
 drawPlanRegion(plan, list) {//放置计划预览
  this.drawDefaultPlanRegion(plan, list);
 },
 setStats() {//stat部分，继承直线传送，防止二愣子玩家以为这个东西和普通轨道一样了
  this.super$setStats();
  this.stats.add(Stat("straight"), true)
 },
})

fluxRail.buildType = () =>
 extend(Duct.DuctBuild, fluxRail, {
  progress: 0,
  capped: false,
  backCapped: false,

  draw() {
   const { x, y, rotation, current: item, block, progress, team } = this;//结构化赋值，简化代码
   let teamColor = team.color;
   const lastZ = Draw.z();
   Draw.z(lastZ - 0.1);

   if (rotation == 2 || rotation == 0) {
    //左和右
    Draw.rect(Core.atlas.find(block.name + "-x"), x, y);
   } else {//上和下
    Draw.rect(Core.atlas.find(block.name + "-y"), x, y);
   }//类似我的世界的贴图，分为横竖两种情况，就像木头一样是不是很聪明？喂，你们这些美术设计师是不是觉得分两种情况更好看啊？（虽然我也觉得分两种情况更好看，美术设计也是我）

   Draw.z(lastZ - 0.09);
    if (item != null) {
         const itemSize = 4;
    const padding = itemSize;
     const dir = Geometry.d4[Mathf.mod(rotation, 4)];//根据旋转方向获取单位向量
     const offset = Tmp.v1.set(dir.x, dir.y).scl(block.size * Vars.tilesize / 2)
      .add(padding * dir.x, padding * dir.y).scl(Mathf.clamp(progress) - 0.5);
     // 变化的alpha值
     let alpha = 0.6 + Mathf.sin(Time.globalTime * 0.3) * 0.2;
     // 设置颜色时使用这个alpha值
     //    Draw.color(255, 255, 255, alpha); 丢掉使用颜色
     Draw.alpha(alpha);
     //     Drawf.light(this.x, this.y, 40, Pal.accent, 1.0);
     Draw.rect(item.fullIcon, x + offset.x, y + offset.y, itemSize, itemSize);
     Draw.reset();
    }

   //头疼的绘制
   // 水平方向 (左=2, 下=3) 使用 cap2 作为前端，cap1 作为后端
   //cpa1较亮cpa2较暗，cap1作为上右端更好明亮，所以左和下使用cap2作为前端
   if (this.capped && (rotation == 2 || rotation == 3)) {
    Draw.rect(Core.atlas.find(block.name + "-cap2"), x, y, rotation * 90);
   }
   if (this.backCapped && (rotation == 2 || rotation == 3)) {
    Draw.rect(Core.atlas.find(block.name + "-cap1"), x, y, rotation * 90 + 180);
   }

   // 竖直方向 (上=1, 右=1) 使用 cap1 作为前端，cap2 作为后端
   if (this.capped && (rotation == 0 || rotation == 1)) {
    Draw.rect(Core.atlas.find(block.name + "-cap1"), x, y, rotation * 90);
   }
   if (this.backCapped && (rotation == 0 || rotation == 1)) {
    Draw.rect(Core.atlas.find(block.name + "-cap2"), x, y, rotation * 90 + 180);
   }
   // 变化的alpha值
   let alpha = 0.6 + Mathf.sin(Time.globalTime * 0.4) * 0.2;
   // 设置颜色时使用这个alpha值
   Draw.color(teamColor.r, teamColor.g, teamColor.b, alpha);
   Drawf.light(x, y, 40, teamColor, 1.0);
   Draw.rect(Core.atlas.find(block.name + "-top"), x, y, rotation * 90);
   Draw.reset();

   Draw.z(lastZ);
  },

  acceptItem(source, item) {//重写acceptItem方法，只有当前没有物品且来源是正确的方向时才接受物品，实现所谓的直线传送
   const { current, items, rotation } = this;
   return current == null && items.total() == 0 && source.relativeTo(this) == rotation;
  },

  onProximityUpdate() {//每当附近的块发生变化时都会调用这个方法，来更新capped和backCapped状态
   this.super$onProximityUpdate();

   const { team } = this;
   let next = this.front(), prev = this.back();
   this.capped = next == null || next.team != team || !next.block.hasItems;//我很天才吧？
   this.backCapped = prev == null || prev.team != team || !prev.block.hasItems;//同上！
  },

  updateTile() {
   const { block, items } = this;
   const { speed } = block;
   this.progress += this.edelta() / speed * 2;//速度调整

   if (this.current == null && items.total() > 0) {//如果当前没有物品但是有物品了，拿出第一个物品放到当前物品内
    this.current = items.first();
   }

   const { current, progress, next } = this;
   if (current != null && next != null) {
    if (progress >= (1 - 1 / speed) && this.moveForward(current)) {//进度达到1时尝试推进物品，如果成功了就把物品移除，当前物品置空，进度取模保持连续
     items.remove(current, 1);
     this.current = null;
     this.progress %= (1 - 1 / speed);

     if (next.block === block) {//如果下一个也是同样的轨道，直接把进度传递过去，保持物品连续平滑移动
      next.progress = this.progress;
      this.progress = 0;
     }
    }
   }
  }
 });
exports.fluxRail = fluxRail;



//以下非机制类
/*
const fluxRail = new Duct("flux-rail");
exports.fluxRail = fluxRail;
Object.assign(fluxRail, {

 )
})*/
//传送带计算公式RealSpeed = 2.5*60*speed = 150speed

const fluxRailJunction = new Junction("flux-rail-junction");
exports.fluxRailJunction = fluxRailJunction;
Object.assign(fluxRailJunction, {
 squareSprite: false,
 health: 100,
 speed: 60 / 40,
 displayedSpeed: 30,
 capacity: 2,
 buildCostMultiplier: 4,
 buildVisibility: BuildVisibility.shown,
 category: Category.distribution,
 placeableLiquid: true,
 hasPower: true,
 hasItems: true,
 consumesPower: false,
 outputsPower: true,
 conductivePower: true,
 requirements: ItemStack.with(
  Items.silicon, 10,
  Items.graphite, 10,
 )
})


const metaglassConveyor = new Conveyor("metaglass-conveyor");
exports.metaglassConveyor = metaglassConveyor;
Object.assign(metaglassConveyor, {
 health: 10,
 itemCapacity: 3,
 speed: 0.15,
 displayedSpeed: 22.5,
 placeableLiquid: true,
 buildVisibility: BuildVisibility.shown,
 category: Category.distribution,
 requirements: ItemStack.with(
  Items.titanium, 1,
  Items.graphite, 1,
 )
})

const routerKing = extend(Router, "router-king", {
 size: 16,
 health: 500000,
 armor: 500000,
 speed: 1 / 600,
 itemCapacity: 500000,
 buildVisibility: BuildVisibility.shown,
 category: Category.distribution,
 underBullets: false,
 requirements: ItemStack.with(
  Items.copper, 4200000,
 ),
 setStats() {//stat部分，显示神！
  this.super$setStats();
  this.stats.add(Stat("god"), true)
 },
})

routerKing.buildType = () =>
 extend(Router.RouterBuild, routerKing, {
  draw() {

   const { block, x, y, team, lastItem } = this//结构化赋值，简化代码
   let teamColor = team.color;
   let alpha = 0.9 + Mathf.sin(Time.globalTime * 0.4) * 0.1;
   // 设置颜色时使用这个alpha值
   Draw.color(teamColor.r, teamColor.g, teamColor.b, alpha);
   Drawf.light(this.x, this.y, 40, teamColor, 1.0);
   Draw.rect(Core.atlas.find(this.block.name), x, y,);

   if(lastItem != null){Draw.rect(lastItem.fullIcon, x, y, 16, 16, Time.globalTime * 6);}
  },
  update() {
   this.super$update();

  },
  canControl() {//重写canControl方法，允许玩家直接控制这个路由器
   return true;
  }
 })

/*
const T2UnderflowDuct = new OverflowDuct("T2-underflow-duct");
exports.T2UnderflowDuct = T2UnderflowDuct;
Object.assign(T2UnderflowDuct,{
   invert: true,
   health: 100,
   armor: 1,
   speed: 60 / 26,
   itemCapacity: 2,
   suppressable: true,
   squareSprite: false,
   placeableLiquid: true,
   buildVisibility: BuildVisibility.shown,
category: Category.distribution,
requirements: ItemStack.with(
    Items.tungsten, 4,
       Items.beryllium, 6,
       Items.graphite, 6,
)
})

const ductJunction = new Junction("duct-junction");
exports.ductJunction = ductJunction;
Object.assign(ductJunction,{
   squareSprite: false,
   health: 100,
   speed: 12,
   capacity: 3,
   buildCostMultiplier: 4,
   buildVisibility: BuildVisibility.shown,
category: Category.distribution,
requirements: ItemStack.with(
       Items.beryllium, 2,
       Items.graphite, 2,
)
})

const T2DuctBridge = new BufferedItemBridge("T2-duct-bridge");
exports.T2DuctBridge = T2DuctBridge;
Object.assign(T2DuctBridge,{
   health: 420,
   size: 1,
   placeableLiquid: true,
   range: 6,
   itemCapacity: 4,
   buildVisibility: BuildVisibility.shown,
category: Category.distribution,
requirements: ItemStack.with(
    Items.tungsten, 12,
       Items.beryllium, 10,
       Items.graphite, 10,
)
})

T2Duct.bridgeReplacement = T2DuctBridge;

//以下流体类

const T2ReinforcedConduit = new Conduit("T2-reinforced-conduit");
exports.T2ReinforcedConduit = T2ReinforcedConduit;
Object.assign(T2ReinforcedConduit,{
   health: 400,
   liquidCapacity: 30,
   liquidPressure: 2,
   buildVisibility: BuildVisibility.shown,
category: Category.liquid,
requirements: ItemStack.with(
       Items.beryllium, 2,
)
})
*/