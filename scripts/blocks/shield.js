const shield = new ForceProjector('shield');
shield.buildType = prov(() =>
  extend(ForceProjector.ForceBuild, shield, {
    updateTile() {
      this.super$updateTile();
      if ((this.broken = false)) {
        Units.nearby(unit.team, unit.x, unit.y, range, (other) => {
          //other表示其他单位
          if (other.team != this.team) {
            unit.impulse(
              Math.cos(Angles.angle(this.x, this.y, this.target.x, this.target.y)* Math.PI / 180) * 24,//24都是推力系数
              Math.sin(Angles.angle(this.x, this.y, this.target.x, this.target.y)* Math.PI / 180) * 24
            );
          }
        });
      }
    },
  })
);

const breaker = new DirectionalForceProjector('breaker');
breaker.buildType = prov(() =>
  extend(DirectionalForceProjector.DirectionalForceProjectorBuild, breaker, {
    updateTile() {
      this.super$updateTile();
      if (this.buildup > -300 && this.broken == false) {
        this.buildup -= 3;
      }
      if (this.buildup > -300 && this.broken == true) {
        this.buildup -= 1;
      }
    },
  })
);
//DirectionalForceProjector
const 定向力墙投影 = extend(DirectionalForceProjector, "定向力墙投影", {});
定向力墙投影.buildType = () => extend(DirectionalForceProjector.DirectionalForceProjectorBuild, 定向力墙投影, {
n: 0,
    updateTile(){
    this.super$updateTile();
    if(this.buildup >= 0){
    this.buildup -= 1.5 //每帧回复速度
    }
    else(this.buildup = 0);
    if(this.buildup >= this.block.shieldHealth){
    this.broken = true;
    this.buildup = 0;
    this.n = 3900;   //完全恢复所需时间
    };
    if(this.n >= 1){
    this.n -= 1;
    this.broken = true;
    }
    else{this.broken = false};
    },
    write(write) {
            this.super$write(write);
            write.f(this.n);
            write.f(this.buildup);
            
    },
    read(read, revision) {
            this.super$read(read, revision);
            this.n = read.f();
            this.buildup = read.f();
    }
});

