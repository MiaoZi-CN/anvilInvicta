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

let passable = Stat("passable");

const reinforcedForceProjector = extend(ForceProjector, "unit-force-projector", {
    radius: 72,
    sides: 4,
    shieldRotation: 45,
    shieldHealth: 1200,
    consumeCoolant: false,
    hasLiquids: false,
    cooldownNormal: 40 / 60,
    cooldownBrokenBase: 50 / 60,
    phaseRadiusBoost: 0,
    phaseShieldBoost: 400,
    phaseUseTime: 600,
    size: 1,
    itemConsumer: new ConsumeItems([new ItemStack(Items.silicon, 1)]),
    //coolantConsumer: new ConsumeLiquid(liquid.naturalGas, 0.1),
    buildVisibility: BuildVisibility.shown,
    category: Category.effect,
    
    setStats() {
        this.super$setStats();
        
        this.stats.add(passable, false);
    }
});
reinforcedForceProjector.buildType = prov(() => extend(ForceProjector.ForceBuild, reinforcedForceProjector, {
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
                    //stop
                    unit.vel.setZero();
                    //get out
                    unit.impulse(
    		            Math.cos(Angles.angle(this.x, this.y, unit.x, unit.y)* Math.PI / 180) * unit.type.hitSize * unit.type.hitSize,
    					Math.sin(Angles.angle(this.x, this.y, unit.x, unit.y)* Math.PI / 180) * unit.type.hitSize * unit.type.hitSize
    		        )
                    
                    if (Mathf.chanceDelta(0.12 * Time.delta)) {
                        Fx.circleColorSpark.at(unit.x, unit.y, this.team.color);
                    }
                }
            })
        }
    }
}))
reinforcedForceProjector.consumePower(2);