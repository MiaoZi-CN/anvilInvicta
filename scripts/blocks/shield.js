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
