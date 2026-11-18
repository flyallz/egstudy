import type { QuizQuestion } from "./content";
import { A2_MOVEMENT_MEDIUM } from "./currentSiteA2MovementMedium";

const route = "判断介词时，要看移动的路线、起点和终点，而不只是静止位置。";
const choice = (q: string, options: string[], answer: string, explain: string): QuizQuestion => ({
  q, options, answer: options.indexOf(answer), explain: `${explain}${route}`, difficulty: "困难", keepChoice: true,
});
const repeat = (mediumIndex: number): QuizQuestion => ({ ...A2_MOVEMENT_MEDIUM[mediumIndex], difficulty: "困难" });

export const A2_MOVEMENT_HARD: QuizQuestion[] = [
  repeat(21),
  choice("Pollutants enter the soil at the surface and travel all the way ___ it to the aquifer below.", ["in", "through", "into", "onto"], "through", "污染物从表面进入土壤，穿过整层土壤到达下方的含水层。enter the soil 已说明进入；all the way to the aquifer 表明穿越整个介质，所以用 through。"),
  repeat(22),
  repeat(23),
  choice("The storm moved ___ the coast overnight, but by morning it was still out at sea.", ["in", "onto", "towards", "into"], "towards", "暴风雨整夜向海岸移动，但早晨仍在海上，说明尚未登陆。towards 只表示朝某方向移动。"),
  choice("Carbon is released ___ the soil into the air when peat is drained.", ["into", "out of", "in", "onto"], "out of", "泥炭排水时，碳从土壤中释放到空气里。into the air 已给出终点；空格应表示从土壤内部出来的起点，用 out of。"),
  repeat(24),
  repeat(25),
  repeat(26),
  repeat(27),
  repeat(28),
  repeat(29),
  choice("Sediment settles ___ to the seabed over centuries.（提示：向下朝地面）", ["into", "onto", "down", "in"], "down", "沉积物经历数百年沉降到海床；down 表示向下移动。"),
  choice("选择正确的句子。", ["Fish migrate upstream to spawn each spring.", "Fish migrate in upstream to spawn each spring.", "Fish migrate upstream for spawn each spring.", "Fish migrate to upstream to spawn each spring."], "Fish migrate upstream to spawn each spring.", "鱼每年春天逆流而上产卵。upstream 本身是表示方向的副词，前面不用介词；to spawn 表示目的。"),
  choice("The current circulates ___ the entire basin.", ["towards", "around", "into", "onto"], "around", "洋流在整个海盆周围循环；around 表示绕着某处移动。"),
  choice("选择正确的句子。", ["The species has spread from the islands onto the mainland.", "The species has spread of the islands onto the mainland.", "The species has spread from the islands into on the mainland.", "The species has spread from the islands on the mainland to."], "The species has spread from the islands onto the mainland.", "该物种从岛屿扩散到大陆。from 指起点，onto 表示移动到一片表面上。"),
  choice("The water flowed ___ the drainage channel, following it all the way to the treatment plant.", ["across", "along", "over", "into"], "along", "水沿排水渠一直流到处理厂。following it all the way 表明水顺着渠道的长度移动，用 along；into 只表示进入渠道。"),
  choice("The migrating birds flew ___ the mountain range, high above its peaks, and reached the valley on the other side.", ["along", "into", "over", "out of"], "over", "候鸟高飞越过山峰，到达另一侧山谷。high above its peaks 和 on the other side 表明路线是从山脉上方跨越，用 over。"),
  choice("Chemical residues can move ___ porous soil into nearby wells.", ["onto", "through", "across", "past"], "through", "化学残留物穿过多孔土壤，进入附近的水井。through 表示在土壤这种介质内部穿行。"),
  choice("The rescue team moved ___ the damaged building after the safety inspection and searched every room.", ["into", "along", "past", "on"], "into", "安全检查后，救援队进入受损建筑物并搜查每个房间。searched every room 说明他们进了建筑物内部，用 into。"),
  choice("The oil spread ___ the water surface after the accident.", ["through", "under", "into", "across"], "across", "事故后石油在水面上扩散。across 表示跨越一片表面扩散。"),
  repeat(4),
  repeat(7),
  repeat(11),
  repeat(16),
  repeat(17),
  repeat(19),
  repeat(1),
  repeat(14),
  repeat(18),
];
