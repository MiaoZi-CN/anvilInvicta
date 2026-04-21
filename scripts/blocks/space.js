const mblock = extend(Wall, "墙体拆除器", {
 ox: 0,
 oy: 0,
 drawPlace(x, y, rotation, valid) {
  this.super$drawPlace(x, y, rotation, valid);
  this.ox = Angles.trnsx(rotation * 90, 1, 0);
  this.oy = Angles.trnsy(rotation * 90, 1, 0);
   Drawf.dashSquare(al.accent,x * 8 + this.offset + this.ox * 8,y * 8 + this.offset + this.oy * 8,8);
 },
 //canBreak(tile) { return false }
});
Object.assign(mblock, {
 size: 1,
 health: 40,
 buildVisibility: BuildVisibility.shown,
 solid: true,
 update: true,
 hasShadow: false,
 destructible: true,
 rotate: true,
 hasItems: true,
});
mblock.buildType = prov(() => extend(Building, {
 updateTile() {
  this.super$updateTile();
  if (this.time <= 0) {
   let ox = Angles.trnsx(this.rotation * 90, 1, 0)
   let oy = Angles.trnsy(this.rotation * 90, 1, 0) 
      Vars.world.tile(
    this.tileX() + ox,
    this.tileY() + oy
   ).setAir();
  }
 }
}))