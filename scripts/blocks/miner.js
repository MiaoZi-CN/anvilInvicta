const statValueImpl = (cons) => new StatValue(){ display: cons };

const multiEfficientCoolant = extend(ConsumeLiquidFilter,
 (liq) => !liq.gas && liq.coolant && liq.temperature <= 0.5 && liq.flammability <= 0.1, // 筛选可用于冷却的液体
 0.1, // 消耗量(每帧)
 {
  efficiency(build) {
   var liq = this.getConsumed(build);
   return liq != null ? this.super$efficiency(build) * this.liquidEfficiencyMultiplier(liq) : 0;
  },
  liquidEfficiencyMultiplier(liquid) {
   return liquidCoolantMulti(liquid);
  },
 });
const drill = extend(Drill, "fast-drill", {
 size: 3,
 scaledHealth: 100,
 armor: 1,
 tier: 4,
 buildCostMultiplier: 0.8,
 hasPower: true,
 requirements: ItemStack.with(
  Items.titanium, 40,
  Items.silicon, 60,
  Items.graphite, 60
 ),
 setStats() {
  this.super$setStats();

  this.stats.remove(Stat.booster);
  this.stats.add(Stat.booster,
   multiCoolantStatValue("{0}" + StatUnit.timesSpeed.localized(),
    multiEfficientCoolant.amount,
    l => this.liquidBoostIntensity * this.liquidBoostIntensity * liquidCoolantMulti(l), false, l => multiEfficientCoolant.consumes(l))
  );
 }
});

drill.setupRequirements(Category.production, ItemStack.with(Items.titanium, 40, Items.silicon, 40))
drill.consume(multiEfficientCoolant).boost();
drill.consumePower(4.5);
drill.buildType = () => extend(Drill.DrillBuild, drill, {
 efficiencyScale() {
  let coolantMulti = multiEfficientCoolant.efficiency(this);
  return Mathf.zero(coolantMulti) ? 1 : coolantMulti;
 }
});

// 计算液体的冷却效率，水效率为1作为标准
function liquidCoolantMulti(liquid) {
 const heatCapacity = liquid.heatCapacity - 0.4;
 const temperature = 0.5 - liquid.temperature;
 return Math.exp(0.5 * heatCapacity + 0.2 * temperature);
}

function multiCoolantStatValue(unit, amount, speedProv, strength, filter) {
 return statValueImpl(table => {
  table.row();
  table.table(null, c => {
   Vars.content.liquids().each(liquid => {
    if (!filter(liquid)) return;

    const speed = speedProv(liquid);
    c.table(Styles.grayPanel, b => {
     b.image(liquid.uiIcon).size(40).pad(10).left().scaling(Scaling.fit).with(i => StatValues.withTooltip(i, liquid, false));
     b.table(null, info => {
      info.add(liquid.localizedName).left().row();
      info.add(Strings.autoFixed(amount * 60, 2) + StatUnit.perSecond.localized()).left().color(Color.lightGray);
     });

     b.table(null, bt => {
      bt.right().defaults().padRight(3).left();
      if (speed != java.lang.Float.MAX_VALUE) bt.add(unit.replace("{0}", "[stat]" + Strings.autoFixed(speed * (strength ? liquid.heatCapacity : 1) + (strength ? 1 : 0), 2) + "[lightgray]")).pad(5);
     }).right().grow().pad(10).padRight(15);
    }).growX().pad(5).row();
   });
  }).growX().colspan(table.getColumns());
  table.row();
 });
}