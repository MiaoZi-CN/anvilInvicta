const floorBuilder = extend(Wall, "floor-builder", {
 ox: 0,
 oy: 0,
 drawPlace(x, y, rotation, valid) {//放置计划时的预览
  this.super$drawPlace(x, y, rotation, valid);
  this.ox = Angles.trnsx(rotation * 90, 1, 0);
  this.oy = Angles.trnsy(rotation * 90, 1, 0);
  Drawf.dashSquare(Pal.accent, x * 8 + this.offset + this.ox * 8, y * 8 + this.offset + this.oy * 8, 8);
 },
 canBreak(tile) { return false }

});
Object.assign(floorBuilder, {
 size: 1,
 health: 40,
 buildVisibility: BuildVisibility.shown,
 category: Category.effect,
 solid: true,
 update: true,
 hasShadow: false,
 destructible: true,
 rotate: true,
 hasItems: true,
 requirements: ItemStack.with(
  Items.graphite, 50,
  Items.titanium, 50,
 ),
});

floorBuilder.buildType = prov(() => extend(Building, {//这个是建造完成后的实体类实现修改地板
 updateTile() {
  this.super$updateTile();
  let ox = Angles.trnsx(this.rotation * 90, 1, 0)//偏移值
  let oy = Angles.trnsy(this.rotation * 90, 1, 0)
  Vars.world.tile(this.tileX() + ox, this.tileY() + oy).setFloor(Blocks.metalTiles8);//把地板换成金属地板
  this.tile.setAir()//我死了
 }
}
))