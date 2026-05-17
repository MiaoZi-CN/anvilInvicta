//DirectionalForceProjector 
//directionalForceProjector
let passable = Stat("passable");

const directionalForceProjector = extend(DirectionalForceProjector, "directional-force-projector", {
 shieldHealth: 6000,
 width: 96,
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


//pardon的我恩造过来了 force-shield forceShield
const forceShield = extend(ForceProjector, "force-shield", {
 radius: 128,
 sides: 4,
 shieldRotation: 45,
 shieldHealth: 1400,
 consumeCoolant: true,
 hasLiquids: true,
 cooldownNormal: 120 / 60,
 cooldownBrokenBase: 180 / 60,
 phaseRadiusBoost: 20,
 phaseShieldBoost: 400,
 phaseUseTime: 600,
 size: 3,
 itemConsumer: new ConsumeItems([new ItemStack(Items.silicon, 1)]),
 //coolantConsumer: new ConsumeLiquid(liquid.naturalGas, 0.1),
 buildVisibility: BuildVisibility.shown,
 category: Category.effect,
 requirements: ItemStack.with(
  Items.titanium, 120,
  Items.thorium, 60,
  Items.graphite, 120,
  Items.silicon, 140,

 ),
 setStats() {
  this.super$setStats();
  this.stats.add(passable, false);
 },
 loadIcon() {//获取图标
  this.super$loadIcon();
  this.fullIcon = this.uiIcon = Core.atlas.find(this.name + "-full");
 },
});
forceShield.buildType = prov(() => extend(ForceProjector.ForceBuild, forceShield, {
 updateTile() {
  this.super$updateTile();
  let realRadius = this.realRadius();
  if (realRadius > 0 && !this.broken) {
   Units.nearbyEnemies(null, this.x, this.y, realRadius, unit => {
    if (unit.team != this.team && Intersector.isInRegularPolygon(this.block.sides, this.x, this.y, this.realRadius(), this.block.shieldRotation, unit.x, unit.y)) {
     if (unit.isMissile()) {
      unit.kill()
      this.buildup -= unit.health * 2 * Vars.state.rules.unitDamage(unit.team)
      this.block.hitSound.at(unit.x, unit.y, 1 + Mathf.range(0.1), this.block.hitSoundVolume);
      this.block.absorbEffect.at(unit);
      this.hit = 1
     }
     //动量，停下来！
     unit.vel.setZero();
     unit.damage(1)
     //立刻从这里滚出去！
     unit.impulse(
      Math.cos(Angles.angle(this.x, this.y, unit.x, unit.y) * Math.PI / 180) * unit.type.hitSize * unit.type.hitSize,
      Math.sin(Angles.angle(this.x, this.y, unit.x, unit.y) * Math.PI / 180) * unit.type.hitSize * unit.type.hitSize
     )

     if (Mathf.chanceDelta(0.12 * Time.delta)) {
      Fx.circleColorSpark.at(unit.x, unit.y, this.team.color);
     }
    }
   })/*
   Groups.bullet.intersect(this.x - realRadius, this.y - realRadius, realRadius * 2, realRadius * 2, b => {
    if (b.type.absorbable && b.team != this.team) {
     b.vel.setAngle(b.rotation() + 180);
     b.team = this.team
    }
   });*/
  }
 },
 draw() {
  this.super$draw();
  let alpha = 0.75 + Mathf.sin(Time.globalTime * (0.4 / 5)) * 0.25;
  Draw.color(this.team.color.r, this.team.color.g, this.team.color.b, alpha);
  Draw.rect(Core.atlas.find(this.block.name + "-breath-light"), this.x, this.y,);
  Draw.reset()
  // 设置颜色时使用这个alpha值
  //  Drawf.light(this.x, this.y, 40, team.color, 1.0);
 }
}))
forceShield.consumePower(10);
//sky-barrier skyBarrier
const skyBarrier = extend(ForceProjector, "sky-barrier", {
 radius: 48,
 sides: 4,
 shieldRotation: 45,
 shieldHealth: 125,
 consumeCoolant: false,
 hasLiquids: false,
 cooldownNormal: 10 / 60,
 cooldownBrokenBase: 10 / 60,
 //phaseRadiusBoost: 20,
 //phaseShieldBoost: 400,
 //phaseUseTime: 600,
 size: 1,
 //itemConsumer: new ConsumeItems([new ItemStack(Items.silicon, 1)]),
 //coolantConsumer: new ConsumeLiquid(liquid.naturalGas, 0.1),
 buildVisibility: BuildVisibility.shown,
 category: Category.effect,
 requirements: ItemStack.with(
  Items.titanium, 30,
  Items.graphite, 30,
  Items.silicon, 30,

 ),
 setStats() {
  this.super$setStats();
  this.stats.add(passable, false);
 },
 loadIcon() {//获取图标
  this.super$loadIcon();
  this.fullIcon = this.uiIcon = Core.atlas.find(this.name + "-full");
 },
});
skyBarrier.buildType = prov(() => extend(ForceProjector.ForceBuild, skyBarrier, {
 updateTile() {
  this.super$updateTile();
  let realRadius = this.realRadius();
  if (realRadius > 0 && !this.broken) {
   Units.nearbyEnemies(null, this.x, this.y, realRadius, unit => {
    if (unit.team != this.team && Intersector.isInRegularPolygon(this.block.sides, this.x, this.y, this.realRadius(), this.block.shieldRotation, unit.x, unit.y)) {
     if (unit.isMissile()) {
      unit.kill()
      this.buildup -= unit.health * 2 * Vars.state.rules.unitDamage(unit.team)
      this.block.hitSound.at(unit.x, unit.y, 1 + Mathf.range(0.1), this.block.hitSoundVolume);
      this.block.absorbEffect.at(unit);
      this.hit = 1
     }
     //动量，停下来！
     unit.vel.setZero();
     unit.damage(1)
     //立刻从这里滚出去！
     unit.impulse(
      Math.cos(Angles.angle(this.x, this.y, unit.x, unit.y) * Math.PI / 180) * unit.type.hitSize * unit.type.hitSize,
      Math.sin(Angles.angle(this.x, this.y, unit.x, unit.y) * Math.PI / 180) * unit.type.hitSize * unit.type.hitSize
     )

     if (Mathf.chanceDelta(0.12 * Time.delta)) {
      Fx.circleColorSpark.at(unit.x, unit.y, this.team.color);
     }
    }
   })/*
   Groups.bullet.intersect(this.x - realRadius, this.y - realRadius, realRadius * 2, realRadius * 2, b => {
    if (b.type.absorbable && b.team != this.team) {
     b.vel.setAngle(b.rotation() + 180);
     b.team = this.team
    }
   });*/
  }
 },
 draw() {
  this.super$draw();
  let alpha = 0.75 + Mathf.sin(Time.globalTime * (0.4 / 5)) * 0.25;
  Draw.color(this.team.color.r, this.team.color.g, this.team.color.b, alpha);
  Draw.rect(Core.atlas.find(this.block.name + "-breath-light"), this.x, this.y,);
  Draw.reset()
 // Drawf.light(this.x, this.y, 40, this.team.color, 1.0);
 }
}))
skyBarrier.consumePower(3.5);