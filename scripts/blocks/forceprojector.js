//DirectionalForceProjector 
//directionalForceProjector

const directionalForceProjector = extend(DirectionalForceProjector, "directional-force-projector", {
 shieldHealth: 6000,
 width:96,
 length: 96,
 size: 3,
 category: Category.defense,
 buildVisibility: BuildVisibility.shown,
});
directionalForceProjector.buildType = () => extend(DirectionalForceProjector.DirectionalForceProjectorBuild, directionalForceProjector, {
 loadTime: 0,//现在的冷却时间
 updateTile() {
  this.super$updateTile();
  if (this.buildup >= 0) {
   this.buildup -= 8 //每帧回复速度
  }
  else (this.buildup = 0);
  if (this.buildup >= this.block.shieldHealth) {
   this.broken = true;
   this.buildup = 0;
   this.loadTime = 15900//完全恢复所需时间
  };
  if (this.loadTime >= 1) {
   this.broken = true;
  }
  else { this.broken = false };
 },
 write(write) {
  this.super$write(write);
  write.f(this.buildup);
 },
 read(read, revision) {
  this.super$read(read, revision);
  this.n = read.f();
  this.buildup = read.f();
 }
});
directionalForceProjector.consumePower(10)
