//var package = Stat("package");


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
  Category.production,
  BuildVisibility.shown,
  ItemStack.with(Items.copper, 1));
 return m;
}


global.FourDireFilter = function (name) {
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
   },
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
  updateTransport(other) {
   if (this.items.total() >= block.itemCapacity && other != null && other.items.total() < block.itemCapacity) {
    other.setAmount(this.items.total());
    other.items.add(lastItem, other.getAmount());
    /*               Fx.itemTransfer.at(this.x, this.y, 2, lastItem.color, other);Fx.plasticburn.at(this);*/
    this.items.clear();
   }
  },
  //4倍速度出物品，原版速度为准
  doDump() {
   for (var i = 0; i < 2; i++) {
    var other = this.nearby(i);
    if (other instanceof StackConveyor.StackConveyorBuild && other.link == -1) other.cooldown = 0;
    this.dumpAccumulate();
   }
  },
  /*       draw(){
              this.super$draw();
              var other = Vars.world.build(this.link);
              if(other == null || this.getLastItem() == null || this.link == -1) return;
              var angle = this.angleTo(other);
              //Draw.rect(stackRegion, this.x, this.y, angle);
              var size = Vars.itemSize * Mathf.lerp(Math.min(this.items.total() / block.itemCapacity, 1), 1, 0.4);
              Drawf.shadow(Tmp.v1.x, Tmp.v1.y, size * 1.2);
              Draw.rect(this.getLastItem().fullIcon, this.x, this.y, size, size, 0);
          },*/
  acceptItem(source, item) {
   if (this == source && this.items.total() < block.itemCapacity) return true;
   var other = Vars.world.tile(this.link);
   return (!((this.items.any() && !this.items.has(item)) || (this.items.total() >= this.getMaximumAccepted(item)))) && other != null && block.linkValid(this.tile, other);
  },
 }, stackBridge);
});
stackBridge.itemCapacity = 40;
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

//以下非机制类
/*
const T2Duct = new Duct("T2-duct");
exports.T2Duct = T2Duct;
Object.assign(T2Duct,{
    health: 200,
    armor: 2,
    size: 1,
    speed: 60 / 26,
    itemCapacity: 1,
    placeableLiquid: true,
    buildVisibility: BuildVisibility.shown,
 category: Category.distribution,
 requirements: ItemStack.with(
     Items.tungsten, 1,
        Items.beryllium, 1,
        Items.graphite, 1,
 )
})

const T2OverflowDuct = new OverflowDuct("T2-overflow-duct");
exports.T2OverflowDuct = T2OverflowDuct;
Object.assign(T2OverflowDuct,{
    invert: false,
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
*/ /*
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

const T2DuctBridge = new DuctBridge("T2-duct-bridge");
exports.T2DuctBridge = T2DuctBridge;
Object.assign(T2DuctBridge,{
    health: 420,
    size: 1,
    hasPower: false,
    underBullets: true,
    placeableLiquid: true,
    range: 6,
    itemCapacity: 6,
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
        Items.tungsten, 2,
 )
})
 */