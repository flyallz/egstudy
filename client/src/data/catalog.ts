// 全量课程目录构建：在 content.ts 的精编课基础上，按清单的级别与课数
// 生成 101 节语法课、25 主题 × 10 课、CEFR 词汇 247 课。
// 页面显示的数字全部由这里实际生成的条目计算。
import {
  CEFR_SETS as BASE_CEFR,
  GRAMMAR_LESSONS as BASE_GRAMMAR,
  GRAMMAR_XP,
  TOPIC_SETS as BASE_TOPICS,
  VOCAB_XP,
  type CefrLevel,
  type Difficulty,
  type GrammarLesson,
  type QuizQuestion,
  type VocabSet,
  type Word,
} from "./content";
import { CURRENT_SITE_A1_THEORY } from "./currentSiteA1";
import { A2_MOVEMENT_PREPOSITIONS, A2_PAST_SIMPLE, A2_REFLEXIVE, A2_WAS_WERE } from "./currentSiteA2";
import { A2_FUTURE } from "./currentSiteA2Future";
import { A2_PERFECT } from "./currentSiteA2Perfect";
import { A2_OBLIGATION } from "./currentSiteA2Obligation";
import { A2_ED_ING } from "./currentSiteA2Adjectives";
import { A2_ORDER } from "./currentSiteA2Order";
import { A2_COMPARATIVES } from "./currentSiteA2Comparatives";
import { A2_SUPERLATIVES } from "./currentSiteA2Superlatives";
import { A2_TOO_ENOUGH } from "./currentSiteA2TooEnough";
import { A2_SO_SUCH } from "./currentSiteA2SoSuch";
import { A2_LINKERS } from "./currentSiteA2Linkers";
import { A2_INDEFINITE } from "./currentSiteA2Indefinite";
import { A2_QUANTIFIERS } from "./currentSiteA2Quantifiers";
import { A1_TAIL_LESSONS } from "./a1Tail";
import { A2_FIRST_LESSON, A2_SECOND_LESSON, A2_THIRD_LESSON, A2_FOURTH_LESSON, A2_FIFTH_LESSON, A2_SIXTH_LESSON, A2_SEVENTH_LESSON, A2_EIGHTH_LESSON, A2_NINTH_LESSON, A2_TENTH_LESSON, A2_ELEVENTH_LESSON, A2_TWELFTH_LESSON, A2_THIRTEENTH_LESSON, A2_FOURTEENTH_LESSON, A2_FIFTEENTH_LESSON, A2_SIXTEENTH_LESSON, A2_SEVENTEENTH_LESSON, A2_EIGHTEENTH_LESSON, A2_NINETEENTH_LESSON, A2_TWENTIETH_LESSON, A2_TWENTY_FIRST_LESSON, A2_TWENTY_SECOND_LESSON, A2_TWENTY_THIRD_LESSON, A2_TWENTY_FOURTH_LESSON, A2_TWENTY_FIFTH_LESSON, A2_TWENTY_SIXTH_LESSON, A2_TWENTY_SEVENTH_LESSON, A2_TWENTY_EIGHTH_LESSON, A2_TWENTY_NINTH_LESSON, A2_THIRTIETH_LESSON, A2_THIRTY_FIRST_LESSON, A2_THIRTY_SECOND_LESSON, A2_THIRTY_THIRD_LESSON, A2_THIRTY_FOURTH_LESSON, A2_THIRTY_FIFTH_LESSON, A2_THIRTY_SIXTH_LESSON, A2_THIRTY_SEVENTH_LESSON, A2_THIRTY_EIGHTH_LESSON, A2_THIRTY_NINTH_LESSON, A2_FORTIETH_LESSON } from "./originalA2";
import { B1_FIRST_LESSON, B1_SECOND_LESSON, B1_THIRD_LESSON, B1_FOURTH_LESSON, B1_FIFTH_LESSON, B1_SIXTH_LESSON, B1_SEVENTH_LESSON, B1_EIGHTH_LESSON, B1_NINTH_LESSON, B1_TENTH_LESSON, B1_ELEVENTH_LESSON, B1_TWELFTH_LESSON, B1_THIRTEENTH_LESSON, B1_FOURTEENTH_LESSON, B1_FIFTEENTH_LESSON, B1_SIXTEENTH_LESSON, B1_SEVENTEENTH_LESSON, B1_EIGHTEENTH_LESSON, B1_NINETEENTH_LESSON, B1_TWENTIETH_LESSON, B1_TWENTY_FIRST_LESSON, B1_TWENTY_SECOND_LESSON, B1_TWENTY_THIRD_LESSON, B1_TWENTY_FOURTH_LESSON, B1_TWENTY_FIFTH_LESSON, B1_TWENTY_SIXTH_LESSON, B1_TWENTY_SEVENTH_LESSON, B1_TWENTY_EIGHTH_LESSON, B1_TWENTY_NINTH_LESSON, B1_THIRTIETH_LESSON, B1_THIRTY_FIRST_LESSON, B1_THIRTY_SECOND_LESSON, B1_THIRTY_THIRD_LESSON, B1_THIRTY_FOURTH_LESSON } from "./originalB1";
import { B2_FIRST_LESSON, B2_SECOND_LESSON, B2_THIRD_LESSON, B2_FOURTH_LESSON, B2_FIFTH_LESSON, B2_SIXTH_LESSON, B2_SEVENTH_LESSON, B2_EIGHTH_LESSON, B2_NINTH_LESSON, B2_TENTH_LESSON, B2_ELEVENTH_LESSON, B2_TWELFTH_LESSON, B2_THIRTEENTH_LESSON, B2_FOURTEENTH_LESSON, B2_FIFTEENTH_LESSON, B2_SIXTEENTH_LESSON, B2_SEVENTEENTH_LESSON, B2_EIGHTEENTH_LESSON, B2_NINETEENTH_LESSON, B2_TWENTIETH_LESSON, B2_TWENTY_FIRST_LESSON, B2_TWENTY_SECOND_LESSON, B2_TWENTY_THIRD_LESSON, B2_TWENTY_FOURTH_LESSON, B2_TWENTY_FIFTH_LESSON, B2_TWENTY_SIXTH_LESSON, B2_TWENTY_SEVENTH_LESSON } from "./originalB2";
import { C1_FIRST_LESSON, C1_SECOND_LESSON, C1_THIRD_LESSON, C1_FOURTH_LESSON, C1_FIFTH_LESSON, C1_SIXTH_LESSON, C1_SEVENTH_LESSON, C1_EIGHTH_LESSON, C1_NINTH_LESSON, C1_TENTH_LESSON, C1_ELEVENTH_LESSON, C1_TWELFTH_LESSON, C1_THIRTEENTH_LESSON, C1_FOURTEENTH_LESSON, C1_FIFTEENTH_LESSON, C1_SIXTEENTH_LESSON, C1_SEVENTEENTH_LESSON, C1_EIGHTEENTH_LESSON, C1_NINETEENTH_LESSON, C1_TWENTIETH_LESSON, C1_TWENTY_FIRST_LESSON, C1_TWENTY_SECOND_LESSON, C1_TWENTY_THIRD_LESSON, C1_TWENTY_FOURTH_LESSON, C1_TWENTY_FIFTH_LESSON, C1_TWENTY_SIXTH_LESSON, C1_TWENTY_SEVENTH_LESSON, C1_TWENTY_EIGHTH_LESSON, C1_TWENTY_NINTH_LESSON, C1_THIRTIETH_LESSON, C1_THIRTY_FIRST_LESSON, C1_THIRTY_SECOND_LESSON, C1_THIRTY_THIRD_LESSON, C1_THIRTY_FOURTH_LESSON, C1_THIRTY_FIFTH_LESSON, C1_THIRTY_SIXTH_LESSON, C1_THIRTY_SEVENTH_LESSON, C1_THIRTY_EIGHTH_LESSON, C1_THIRTY_NINTH_LESSON, C1_FORTIETH_LESSON, C1_FORTY_FIRST_LESSON, C1_FORTY_SECOND_LESSON, C1_FORTY_THIRD_LESSON, C1_FORTY_FOURTH_LESSON, C1_FORTY_FIFTH_LESSON, C1_FORTY_SIXTH_LESSON, C1_FORTY_SEVENTH_LESSON, C1_FORTY_EIGHTH_LESSON, C1_FORTY_NINTH_LESSON, C1_FIFTIETH_LESSON, C1_FIFTY_FIRST_LESSON, C1_FIFTY_SECOND_LESSON, C1_FIFTY_THIRD_LESSON, C1_FIFTY_FOURTH_LESSON, C1_FIFTY_FIFTH_LESSON, C1_FIFTY_SIXTH_LESSON, C1_FIFTY_SEVENTH_LESSON, C1_FIFTY_EIGHTH_LESSON, C1_FIFTY_NINTH_LESSON, C1_SIXTIETH_LESSON, C1_SIXTY_FIRST_LESSON, C1_SIXTY_SECOND_LESSON, C1_SIXTY_THIRD_LESSON, C1_SIXTY_FOURTH_LESSON, C1_SIXTY_FIFTH_LESSON } from "./originalC1";
import { C2_FIRST_LESSON, C2_SECOND_LESSON, C2_THIRD_LESSON, C2_FOURTH_LESSON, C2_FIFTH_LESSON, C2_SIXTH_LESSON, C2_SEVENTH_LESSON, C2_EIGHTH_LESSON, C2_NINTH_LESSON, C2_TENTH_LESSON, C2_ELEVENTH_LESSON, C2_TWELFTH_LESSON, C2_THIRTEENTH_LESSON, C2_FOURTEENTH_LESSON, C2_FIFTEENTH_LESSON, C2_SIXTEENTH_LESSON, C2_SEVENTEENTH_LESSON, C2_EIGHTEENTH_LESSON, C2_NINETEENTH_LESSON, C2_TWENTIETH_LESSON, C2_TWENTY_FIRST_LESSON, C2_TWENTY_SECOND_LESSON, C2_TWENTY_THIRD_LESSON, C2_TWENTY_FOURTH_LESSON, C2_TWENTY_FIFTH_LESSON, C2_TWENTY_SIXTH_LESSON, C2_TWENTY_SEVENTH_LESSON, C2_TWENTY_EIGHTH_LESSON, C2_TWENTY_NINTH_LESSON, C2_THIRTIETH_LESSON, C2_THIRTY_FIRST_LESSON, C2_THIRTY_SECOND_LESSON, C2_THIRTY_THIRD_LESSON, C2_THIRTY_FOURTH_LESSON, C2_THIRTY_FIFTH_LESSON, C2_THIRTY_SIXTH_LESSON } from "./originalC2";
import { EDUCATION_EXAMPLE_TRANSLATIONS, EDUCATION_FIRST_LESSON, EDUCATION_SECOND_LESSON, EDUCATION_THIRD_LESSON, EDUCATION_FOURTH_LESSON, EDUCATION_FIFTH_LESSON, EDUCATION_SIXTH_LESSON, EDUCATION_SIXTH_EXAMPLE_TRANSLATIONS, EDUCATION_SEVENTH_LESSON, EDUCATION_SEVENTH_EXAMPLE_TRANSLATIONS, EDUCATION_EIGHTH_LESSON, EDUCATION_EIGHTH_EXAMPLE_TRANSLATIONS, EDUCATION_NINTH_LESSON, EDUCATION_NINTH_EXAMPLE_TRANSLATIONS, EDUCATION_TENTH_LESSON, EDUCATION_TENTH_EXAMPLE_TRANSLATIONS, WORK_FIRST_LESSON, WORK_FIRST_EXAMPLE_TRANSLATIONS, WORK_SECOND_LESSON, WORK_SECOND_EXAMPLE_TRANSLATIONS, WORK_THIRD_LESSON, WORK_THIRD_EXAMPLE_TRANSLATIONS, WORK_FOURTH_LESSON, WORK_FOURTH_EXAMPLE_TRANSLATIONS, WORK_FIFTH_LESSON, WORK_FIFTH_EXAMPLE_TRANSLATIONS, WORK_SIXTH_LESSON, WORK_SIXTH_EXAMPLE_TRANSLATIONS, WORK_SEVENTH_LESSON, WORK_SEVENTH_EXAMPLE_TRANSLATIONS, WORK_EIGHTH_LESSON, WORK_EIGHTH_EXAMPLE_TRANSLATIONS, WORK_NINTH_LESSON, WORK_NINTH_EXAMPLE_TRANSLATIONS, WORK_TENTH_LESSON, WORK_TENTH_EXAMPLE_TRANSLATIONS, type OriginalTopicWord } from "./originalTopics";
import { HEALTH_FIRST_LESSON, HEALTH_FIRST_EXAMPLE_TRANSLATIONS, HEALTH_SECOND_LESSON, HEALTH_SECOND_EXAMPLE_TRANSLATIONS, HEALTH_THIRD_LESSON, HEALTH_THIRD_EXAMPLE_TRANSLATIONS, HEALTH_FOURTH_LESSON, HEALTH_FOURTH_EXAMPLE_TRANSLATIONS, HEALTH_FIFTH_LESSON, HEALTH_FIFTH_EXAMPLE_TRANSLATIONS, HEALTH_SIXTH_LESSON, HEALTH_SIXTH_EXAMPLE_TRANSLATIONS, HEALTH_SEVENTH_LESSON, HEALTH_SEVENTH_EXAMPLE_TRANSLATIONS, HEALTH_EIGHTH_LESSON, HEALTH_EIGHTH_EXAMPLE_TRANSLATIONS, HEALTH_NINTH_LESSON, HEALTH_NINTH_EXAMPLE_TRANSLATIONS, HEALTH_TENTH_LESSON, HEALTH_TENTH_EXAMPLE_TRANSLATIONS } from "./originalTopics";
import { ENVIRONMENT_FIRST_LESSON, ENVIRONMENT_FIRST_EXAMPLE_TRANSLATIONS, ENVIRONMENT_SECOND_LESSON, ENVIRONMENT_SECOND_EXAMPLE_TRANSLATIONS, ENVIRONMENT_THIRD_LESSON, ENVIRONMENT_THIRD_EXAMPLE_TRANSLATIONS, ENVIRONMENT_FOURTH_LESSON, ENVIRONMENT_FOURTH_EXAMPLE_TRANSLATIONS, ENVIRONMENT_FIFTH_LESSON, ENVIRONMENT_FIFTH_EXAMPLE_TRANSLATIONS, ENVIRONMENT_SIXTH_LESSON, ENVIRONMENT_SIXTH_EXAMPLE_TRANSLATIONS, ENVIRONMENT_SEVENTH_LESSON, ENVIRONMENT_SEVENTH_EXAMPLE_TRANSLATIONS, ENVIRONMENT_EIGHTH_LESSON, ENVIRONMENT_EIGHTH_EXAMPLE_TRANSLATIONS, ENVIRONMENT_NINTH_LESSON, ENVIRONMENT_NINTH_EXAMPLE_TRANSLATIONS, ENVIRONMENT_TENTH_LESSON, ENVIRONMENT_TENTH_EXAMPLE_TRANSLATIONS } from "./originalTopics";
import { TECHNOLOGY_FIRST_LESSON, TECHNOLOGY_FIRST_EXAMPLE_TRANSLATIONS, TECHNOLOGY_SECOND_LESSON, TECHNOLOGY_SECOND_EXAMPLE_TRANSLATIONS, TECHNOLOGY_THIRD_LESSON, TECHNOLOGY_THIRD_EXAMPLE_TRANSLATIONS, TECHNOLOGY_FOURTH_LESSON, TECHNOLOGY_FOURTH_EXAMPLE_TRANSLATIONS, TECHNOLOGY_FIFTH_LESSON, TECHNOLOGY_FIFTH_EXAMPLE_TRANSLATIONS, TECHNOLOGY_SIXTH_LESSON, TECHNOLOGY_SIXTH_EXAMPLE_TRANSLATIONS, TECHNOLOGY_SEVENTH_LESSON, TECHNOLOGY_SEVENTH_EXAMPLE_TRANSLATIONS, TECHNOLOGY_EIGHTH_LESSON, TECHNOLOGY_EIGHTH_EXAMPLE_TRANSLATIONS, TECHNOLOGY_NINTH_LESSON, TECHNOLOGY_NINTH_EXAMPLE_TRANSLATIONS, TECHNOLOGY_TENTH_LESSON, TECHNOLOGY_TENTH_EXAMPLE_TRANSLATIONS } from "./originalTopics";
import { CITIES_FIRST_LESSON, CITIES_FIRST_EXAMPLE_TRANSLATIONS, CITIES_SECOND_LESSON, CITIES_SECOND_EXAMPLE_TRANSLATIONS, CITIES_THIRD_LESSON, CITIES_THIRD_EXAMPLE_TRANSLATIONS, CITIES_FOURTH_LESSON, CITIES_FOURTH_EXAMPLE_TRANSLATIONS, CITIES_FIFTH_LESSON, CITIES_FIFTH_EXAMPLE_TRANSLATIONS, CITIES_SIXTH_LESSON, CITIES_SIXTH_EXAMPLE_TRANSLATIONS, CITIES_SEVENTH_LESSON, CITIES_SEVENTH_EXAMPLE_TRANSLATIONS, CITIES_EIGHTH_LESSON, CITIES_EIGHTH_EXAMPLE_TRANSLATIONS, CITIES_NINTH_LESSON, CITIES_NINTH_EXAMPLE_TRANSLATIONS, CITIES_TENTH_LESSON, CITIES_TENTH_EXAMPLE_TRANSLATIONS } from "./originalTopics";
import { TRANSPORT_FIRST_LESSON, TRANSPORT_FIRST_EXAMPLE_TRANSLATIONS, TRANSPORT_SECOND_LESSON, TRANSPORT_SECOND_EXAMPLE_TRANSLATIONS, TRANSPORT_THIRD_LESSON, TRANSPORT_THIRD_EXAMPLE_TRANSLATIONS, TRANSPORT_FOURTH_LESSON, TRANSPORT_FOURTH_EXAMPLE_TRANSLATIONS, TRANSPORT_FIFTH_LESSON, TRANSPORT_FIFTH_EXAMPLE_TRANSLATIONS, TRANSPORT_SIXTH_LESSON, TRANSPORT_SIXTH_EXAMPLE_TRANSLATIONS, TRANSPORT_SEVENTH_LESSON, TRANSPORT_SEVENTH_EXAMPLE_TRANSLATIONS, TRANSPORT_EIGHTH_LESSON, TRANSPORT_EIGHTH_EXAMPLE_TRANSLATIONS, TRANSPORT_NINTH_LESSON, TRANSPORT_NINTH_EXAMPLE_TRANSLATIONS, TRANSPORT_TENTH_LESSON, TRANSPORT_TENTH_EXAMPLE_TRANSLATIONS } from "./originalTopics";
import { CRIME_FIRST_LESSON, CRIME_FIRST_EXAMPLE_TRANSLATIONS, CRIME_SECOND_LESSON, CRIME_SECOND_EXAMPLE_TRANSLATIONS, CRIME_THIRD_LESSON, CRIME_THIRD_EXAMPLE_TRANSLATIONS, CRIME_FOURTH_LESSON, CRIME_FOURTH_EXAMPLE_TRANSLATIONS, CRIME_FIFTH_LESSON, CRIME_FIFTH_EXAMPLE_TRANSLATIONS, CRIME_SIXTH_LESSON, CRIME_SIXTH_EXAMPLE_TRANSLATIONS, CRIME_SEVENTH_LESSON, CRIME_SEVENTH_EXAMPLE_TRANSLATIONS, CRIME_EIGHTH_LESSON, CRIME_EIGHTH_EXAMPLE_TRANSLATIONS, CRIME_NINTH_LESSON, CRIME_NINTH_EXAMPLE_TRANSLATIONS, CRIME_TENTH_LESSON, CRIME_TENTH_EXAMPLE_TRANSLATIONS, GOVERNMENT_FIRST_LESSON, GOVERNMENT_FIRST_EXAMPLE_TRANSLATIONS, GOVERNMENT_SECOND_LESSON, GOVERNMENT_SECOND_EXAMPLE_TRANSLATIONS, GOVERNMENT_THIRD_LESSON, GOVERNMENT_THIRD_EXAMPLE_TRANSLATIONS, GOVERNMENT_FOURTH_LESSON, GOVERNMENT_FOURTH_EXAMPLE_TRANSLATIONS, GOVERNMENT_FIFTH_LESSON, GOVERNMENT_FIFTH_EXAMPLE_TRANSLATIONS, GOVERNMENT_SIXTH_LESSON, GOVERNMENT_SIXTH_EXAMPLE_TRANSLATIONS, GOVERNMENT_SEVENTH_LESSON, GOVERNMENT_SEVENTH_EXAMPLE_TRANSLATIONS, GOVERNMENT_EIGHTH_LESSON, GOVERNMENT_EIGHTH_EXAMPLE_TRANSLATIONS, GOVERNMENT_NINTH_LESSON, GOVERNMENT_NINTH_EXAMPLE_TRANSLATIONS, GOVERNMENT_TENTH_LESSON, GOVERNMENT_TENTH_EXAMPLE_TRANSLATIONS, MEDIA_FIRST_LESSON, MEDIA_FIRST_EXAMPLE_TRANSLATIONS, MEDIA_SECOND_LESSON, MEDIA_SECOND_EXAMPLE_TRANSLATIONS, MEDIA_THIRD_LESSON, MEDIA_THIRD_EXAMPLE_TRANSLATIONS, MEDIA_FOURTH_LESSON, MEDIA_FOURTH_EXAMPLE_TRANSLATIONS, MEDIA_FIFTH_LESSON, MEDIA_FIFTH_EXAMPLE_TRANSLATIONS, MEDIA_SIXTH_LESSON, MEDIA_SIXTH_EXAMPLE_TRANSLATIONS, MEDIA_SEVENTH_LESSON, MEDIA_SEVENTH_EXAMPLE_TRANSLATIONS, MEDIA_EIGHTH_LESSON, MEDIA_EIGHTH_EXAMPLE_TRANSLATIONS, MEDIA_NINTH_LESSON, MEDIA_NINTH_EXAMPLE_TRANSLATIONS, MEDIA_TENTH_LESSON, MEDIA_TENTH_EXAMPLE_TRANSLATIONS, CULTURE_FIRST_LESSON, CULTURE_FIRST_EXAMPLE_TRANSLATIONS, CULTURE_SECOND_LESSON, CULTURE_SECOND_EXAMPLE_TRANSLATIONS, CULTURE_THIRD_LESSON, CULTURE_THIRD_EXAMPLE_TRANSLATIONS, CULTURE_FOURTH_LESSON, CULTURE_FOURTH_EXAMPLE_TRANSLATIONS, CULTURE_FIFTH_LESSON, CULTURE_FIFTH_EXAMPLE_TRANSLATIONS, CULTURE_SIXTH_LESSON, CULTURE_SIXTH_EXAMPLE_TRANSLATIONS, CULTURE_SEVENTH_LESSON, CULTURE_SEVENTH_EXAMPLE_TRANSLATIONS, CULTURE_EIGHTH_LESSON, CULTURE_EIGHTH_EXAMPLE_TRANSLATIONS, CULTURE_NINTH_LESSON, CULTURE_NINTH_EXAMPLE_TRANSLATIONS, CULTURE_TENTH_LESSON, CULTURE_TENTH_EXAMPLE_TRANSLATIONS, GLOBALISATION_FIRST_LESSON, GLOBALISATION_FIRST_EXAMPLE_TRANSLATIONS, GLOBALISATION_SECOND_LESSON, GLOBALISATION_SECOND_EXAMPLE_TRANSLATIONS, GLOBALISATION_THIRD_LESSON, GLOBALISATION_THIRD_EXAMPLE_TRANSLATIONS, GLOBALISATION_FOURTH_LESSON, GLOBALISATION_FOURTH_EXAMPLE_TRANSLATIONS, GLOBALISATION_FIFTH_LESSON, GLOBALISATION_FIFTH_EXAMPLE_TRANSLATIONS, GLOBALISATION_SIXTH_LESSON, GLOBALISATION_SIXTH_EXAMPLE_TRANSLATIONS, GLOBALISATION_SEVENTH_LESSON, GLOBALISATION_SEVENTH_EXAMPLE_TRANSLATIONS, GLOBALISATION_EIGHTH_LESSON, GLOBALISATION_EIGHTH_EXAMPLE_TRANSLATIONS, GLOBALISATION_NINTH_LESSON, GLOBALISATION_NINTH_EXAMPLE_TRANSLATIONS, GLOBALISATION_TENTH_LESSON, GLOBALISATION_TENTH_EXAMPLE_TRANSLATIONS, FAMILY_FIRST_LESSON, FAMILY_FIRST_EXAMPLE_TRANSLATIONS, FAMILY_SECOND_LESSON, FAMILY_SECOND_EXAMPLE_TRANSLATIONS, FAMILY_THIRD_LESSON, FAMILY_THIRD_EXAMPLE_TRANSLATIONS } from "./originalTopics";
import { SCIENCE_FIRST_LESSON, SCIENCE_FIRST_EXAMPLE_TRANSLATIONS, SCIENCE_SECOND_LESSON, SCIENCE_SECOND_EXAMPLE_TRANSLATIONS, SCIENCE_THIRD_LESSON, SCIENCE_THIRD_EXAMPLE_TRANSLATIONS, SCIENCE_FOURTH_LESSON, SCIENCE_FOURTH_EXAMPLE_TRANSLATIONS, SCIENCE_FIFTH_LESSON, SCIENCE_FIFTH_EXAMPLE_TRANSLATIONS, SCIENCE_SIXTH_LESSON, SCIENCE_SIXTH_EXAMPLE_TRANSLATIONS, SCIENCE_SEVENTH_LESSON, SCIENCE_SEVENTH_EXAMPLE_TRANSLATIONS, SCIENCE_EIGHTH_LESSON, SCIENCE_EIGHTH_EXAMPLE_TRANSLATIONS, SCIENCE_NINTH_LESSON, SCIENCE_NINTH_EXAMPLE_TRANSLATIONS, SCIENCE_TENTH_LESSON, SCIENCE_TENTH_EXAMPLE_TRANSLATIONS } from "./originalTopics";
import { ECONOMY_FIRST_LESSON, ECONOMY_FIRST_EXAMPLE_TRANSLATIONS, ECONOMY_SECOND_LESSON, ECONOMY_SECOND_EXAMPLE_TRANSLATIONS, ECONOMY_THIRD_LESSON, ECONOMY_THIRD_EXAMPLE_TRANSLATIONS, ECONOMY_FOURTH_LESSON, ECONOMY_FOURTH_EXAMPLE_TRANSLATIONS, ECONOMY_FIFTH_LESSON, ECONOMY_FIFTH_EXAMPLE_TRANSLATIONS, ECONOMY_SIXTH_LESSON, ECONOMY_SIXTH_EXAMPLE_TRANSLATIONS, ECONOMY_SEVENTH_LESSON, ECONOMY_SEVENTH_EXAMPLE_TRANSLATIONS, ECONOMY_EIGHTH_LESSON, ECONOMY_EIGHTH_EXAMPLE_TRANSLATIONS, ECONOMY_NINTH_LESSON, ECONOMY_NINTH_EXAMPLE_TRANSLATIONS, ECONOMY_TENTH_LESSON, ECONOMY_TENTH_EXAMPLE_TRANSLATIONS } from "./originalTopics";

// 紧凑语法课规格：[英文名, 中文名, 导语, 功能, 形式, 句中分析,
//   例1英, 例1中, 例2英, 例2中, 对照左, 对照右, 错句, 对句, 错误说明,
//   要点1, 要点2, 题目...]，题目为 [题干, 正确答案, 干扰1, 干扰2, 干扰3, 解析]
type SpecItem = [string, string, string, string, string, string];
type Spec = [
  string, string, string, string, string, string,
  string, string, string, string,
  string, string,
  string, string, string,
  string, string,
  ...SpecItem[],
];

function specToLesson(spec: Spec, level: CefrLevel, id: string): GrammarLesson {
  const [en, cn, intro, fn, form, ana, e1, c1, e2, c2, cmpL, cmpR, errW, errR, errNote, k1, k2, ...items] = spec;
  const questions: QuizQuestion[] = items.map((it, i) => {
    const [q, ans, d1, d2, d3, why] = it;
    const opts = [d1, d2, d3];
    const pos = i % 4;
    opts.splice(pos, 0, ans);
    return {
      q,
      options: opts,
      answer: pos,
      explain: why,
      difficulty: i < 2 ? "简单" : i < 3 ? "中等" : "困难",
    };
  });
  return {
    id,
    level,
    titleCn: cn,
    titleEn: en,
    intro,
    rules: [],
    questions,
    openingExample: { en: e1, cn: c1 },
    theory: [
      { heading: "1 · 功能", body: fn },
      { heading: "2 · 形式", body: form },
      { heading: "3 · 句中分析", body: ana, examples: [{ en: e1, cn: c1 }] },
      { heading: "4 · 例句讲解", body: "逐句对照看：先找主语，再找本课的核心形式，最后看时间或语气标志词。", examples: [{ en: e1, cn: c1 }, { en: e2, cn: c2 }] },
      { heading: "5 · 对照表", body: "", table: [{ left: cmpL, right: cmpR }] },
      { heading: "6 · 常见错误", body: "", errors: [{ wrong: errW, right: errR, note: errNote }] },
    ],
    keyPoints: [k1, k2],
  };
}

function withTheory(lesson: GrammarLesson): GrammarLesson {
  if (lesson.theory) return lesson;
  const first = lesson.rules[0];
  const ex = first?.examples[0];
  return {
    ...lesson,
    openingExample: ex ? { en: ex.en, cn: ex.cn } : { en: "", cn: "" },
    theory: lesson.rules.map((r, i) => ({
      heading: `${i + 1} · ${r.heading}`,
      body: r.body,
      examples: r.examples,
    })),
    keyPoints: lesson.rules.map((r) => r.heading),
  };
}

// ---------------- A1（19 课，标题按清单） ----------------

const A1_SPECS: Spec[] = [
  ["Object pronouns", "宾格代词", "me、him、her 放在动词和介词后面。主格做主语，宾格做“被动作的人”。",
    "宾格代词代替“动作的承受者”，避免重复名词：I like her（不是 I like she）。",
    "主格 I/you/he/she/it/we/they 对应宾格 me/you/him/her/it/us/them。位置在动词或介词之后：Look at me. Wait for us.",
    "以 Look at him 为例：look 是动词，at 是介词，him 只能是宾格。判断口诀：动词/介词后，代词变宾格。",
    "Please help me.", "请帮帮我。", "We saw them yesterday.", "我们昨天看见他们了。",
    "I know she.（错）", "I know her.（对）",
    "Me like music.", "I like music.", "like 的主语必须是主格 I，不能用宾格 me。",
    "动词和介词后面用宾格", "me↔I、him↔he、her↔she、us↔we、them↔they 一一对应",
    ["Look at ___! The bird is flying.", "us", "we", "our", "we are", "look at 后面用宾格 us。"],
    ["She called ___ last night.", "him", "he", "his", "he is", "called 的宾语是“他”，用宾格 him。"],
    ["This gift is for ___.", "her", "she", "hers", "she is", "介词 for 后面用宾格 her。"],
    ["___ are my friends. I often play with ___.", "They / them", "Them / they", "They / they", "Them / them", "第一空作主语用 They，第二空在 with 后用 them。"]],
  ["Nouns & plurals", "名词与复数", "一个变多个：大多数名词加 -s，少数要变样子，还有几个完全不规则。",
    "复数表示数量大于一：two books、three cities。中文名词不变形，英语必须变。",
    "一般加 -s；以 s/x/ch/sh 结尾加 -es；辅音+y 变 i 加 es；不规则：man→men、child→children、foot→feet、tooth→teeth。",
    "以 three boxes 为例：box 以 x 结尾，所以是 box+es。先看词尾，再决定加 -s 还是 -es。",
    "I have two dogs.", "我有两只狗。", "The babies are sleeping.", "婴儿们在睡觉。",
    "two citys（错）", "two cities（对）",
    "two childs.", "two children.", "child 的复数是不规则变化 children，不能加 -s。",
    "先看词尾：x/ch/sh/s 加 -es", "man、child、foot、tooth 的复数要单独记",
    ["There are four ___ in the room.", "chairs", "chair", "chaires", "chairing", "four 后面用复数 chairs，直接加 -s。"],
    ["She bought three ___ of milk.", "bottles", "bottle", "bottls", "bottlees", "three 后面用复数 bottles。"],
    ["The ___ are playing football.", "children", "child", "childs", "childes", "children 是 child 的复数形式。"],
    ["Two ___ are under the tree.", "men", "man", "mans", "menes", "man 的复数是 men。"]],
  ["Countable & uncountable nouns", "可数与不可数名词", "apple 可以数，water 不能数——英语先分清这一点，量词才不会用错。",
    "可数名词有单复数（an apple / two apples）；不可数名词没有复数，也不加 a/an（water、rice、information）。",
    "不可数要计量时借容器或单位：a glass of water、a piece of advice、a kilo of rice。some / any 两类都能搭。",
    "以 a piece of advice 为例：advice 不可数，不能说 an advice，要用 piece 来“切”成一份。",
    "I'd like some bread.", "我想要一些面包。", "There are two bottles of juice.", "有两瓶果汁。",
    "two waters（日常点单口语有，但规范说法）", "two bottles of water",
    "I need an information.", "I need some information.", "information 不可数，不能加 an，也没有复数。",
    "不可数名词：无复数、不加 a/an", "计量靠 a piece/glass/kilo of + 名词",
    ["How ___ apples do you want?", "many", "much", "a lot", "any of", "apples 可数，用 many 提问。"],
    ["We need some ___ for the cake.", "flour", "flours", "a flour", "many flour", "flour（面粉）不可数，直接用 some flour。"],
    ["Can I have ___ of tea?", "a cup", "cup", "a cups", "many cup", "tea 不可数，用 a cup of tea 计量。"],
    ["He gave me good ___.", "advice", "advices", "an advice", "many advice", "advice 不可数，没有复数形式。"]],
  ["Possessives", "所有格与物主代词", "“谁的”怎么说：Tom's book、my book、mine——三种说法一次分清。",
    "表示所属关系：名词后加 's（Tom's），形容词性物主代词 my/your/his/her/our/their + 名词，名词性物主代词 mine/yours… 单独用。",
    "复数名词以 s 结尾只加 '：students' books；不规则复数加 's：children's。句尾不跟名词时用 mine 这类：This book is mine.",
    "以 This is her book. The book is hers 为例：her 后面跟名词，hers 单独站句尾，意思相同形式不同。",
    "This is my pen.", "这是我的钢笔。", "The red car is his.", "那辆红车是他的。",
    "her book / hers book（第二个错）", "her book / the book is hers",
    "This pencil is my.", "This pencil is mine.", "句尾不跟名词时要用名词性物主代词 mine。",
    "'s 所有格：人或团体 + 's", "跟名词用 my 类，单独用 mine 类",
    ["___ name is Jack. He is a teacher.", "His", "He", "Him", "He's book", "name 前面要用形容词性物主代词 His。"],
    ["The blue bag is ___. I bought it yesterday.", "mine", "my", "me", "I", "句尾单独使用，用 mine。"],
    ["Look at the ___. Their classroom is big.", "students'", "student's one", "students is", "student of", "students 以 s 结尾，所有格只加 '。"],
    ["She is a friend of ___.", "mine", "my", "me", "I am", "a friend of mine 是固定说法“我的一个朋友”。"]],
  ["This, that, these, those", "指示代词", "近处 this/these，远处 that/those；一个用单数，多个用复数。",
    "指近处：this（单）、these（复）；指远处：that（单）、those（复）。既可单独用，也可修饰名词。",
    "this/these + 近处物；that/those + 远处物。提问常用 What's this? 答 It is…；复数答 They are…。",
    "以 These are my books（指手边）对比 Those are yours（指对面）：距离决定 this/that，数量决定单复数。",
    "This is my desk.", "这是我的课桌。", "Those apples look fresh.", "那些苹果看起来很新鲜。",
    "this books（错）", "these books（对）",
    "This are pens.", "These are pens.", "pens 是复数，指近处要用 these are。",
    "近 this/these，远 that/those", "单数配 is，复数配 are",
    ["___ is a map. (指着手里的地图)", "This", "These", "Those", "They", "单数且近处，用 This。"],
    ["___ mountains are far away.", "Those", "That", "This", "It", "mountains 复数且远处，用 Those。"],
    ["What's ___ in English? (指着远处黑板上的字)", "that", "these", "this books", "they", "远处单数事物用 that 提问。"],
    ["___ shoes here are mine.", "These", "That", "This", "It", "here 提示近处，shoes 是复数，用 These。"]],
  ["A, an & the", "冠词 a、an、the", "第一次提到用 a/an，说清楚“那个”用 the——冠词虽小，缺了就不地道。",
    "a/an 表示“一个”，泛指第一次出现的事物；the 表示“那个”，指双方都知道的特定事物；独一无二的事物（the sun、the moon）也用 the。",
    "a 用在辅音音素前（a book、a university），an 用在元音音素前（an apple、an hour，h 不发音）。第二次提到同一事物改用 the。",
    "以 I saw a dog. The dog was cute 为例：第一句 a 引出新事物，第二句 the 回指它。",
    "She is an English teacher.", "她是一名英语老师。", "The moon is bright tonight.", "今晚月亮很亮。",
    "a apple（错）", "an apple（对）",
    "He is a honest boy.", "He is an honest boy.", "honest 的 h 不发音，以元音音素开头，要用 an。",
    "看发音不看字母：元音音素前用 an", "第二次提到、特指、独一无二用 the",
    ["I want to buy ___ umbrella.", "an", "a", "the some", "one of a", "umbrella 以元音音素开头，用 an。"],
    ["___ sun rises in the east.", "The", "A", "An", "One", "太阳独一无二，用 the。"],
    ["He bought a car. ___ car is red.", "The", "A", "An", "His a", "第二次提到同一辆车，用 The 回指。"],
    ["She studies at ___ university in Beijing.", "a", "an", "the all", "one of an", "university 读 /juː/，以辅音音素开头，用 a。"]],
  ["Some, any, much & many", "some、any、much、many", "肯定句 some，疑问否定 any；不可数 much，可数 many——两个维度交叉判断。",
    "some 多用于肯定句和“希望对方说好”的请求；any 多用于疑问句和否定句。much 修饰不可数，many 修饰可数复数。",
    "How much + 不可数（多少钱/多少量）；How many + 可数复数。a lot of 两类都行。否定：not much / not many。",
    "以 Do you have any questions? 为例：疑问句用 any；回答时肯定句改 some：Yes, I have some。",
    "I have some friends here.", "我在这儿有一些朋友。", "There isn't much milk left.", "剩下的牛奶不多了。",
    "any（肯定句泛指时可用，但初学按规则）", "some",
    "How many money do you have?", "How much money do you have?", "money 不可数，提问数量用 How much。",
    "先判句型选 some/any，再判可数选 much/many", "请求、邀请句里疑问也用 some：Would you like some tea?",
    ["There are ___ students in the hall.", "many", "much", "a lots", "much of", "students 可数复数，用 many。"],
    ["Would you like ___ coffee?", "some", "any of the all", "many cups of is", "much are", "邀请对方喝咖啡，期望肯定回答，用 some。"],
    ["I don't have ___ time today.", "much", "many", "a many", "some of are", "time 不可数，否定句用 much。"],
    ["Are there ___ eggs in the fridge?", "any", "some of is", "much", "a lot of much", "疑问句问可数名词，用 any。"]],
  ["Adjectives & adverbs", "形容词与副词", "形容词描名词，副词描动作：a quick run / run quickly，位置不同活儿不同。",
    "形容词修饰名词或作表语（The soup is hot）；副词修饰动词、形容词或句子，多数由形容词 + ly 构成。",
    "形容词放名词前或 be 后；副词多放动词后。注意不规则：good→well、fast→fast、hard→hard。late 既是形容词也是副词。",
    "以 He is a careful driver. He drives carefully 为例：careful 描名词 driver，carefully 描动作 drives。",
    "She sang beautifully.", "她唱得很美。", "This is a difficult question.", "这是一个难题。",
    "drive careful（错）", "drive carefully（对）",
    "He speaks English good.", "He speaks English well.", "修饰动词 speak 要用副词 well，不能用形容词 good。",
    "描名词用形容词，描动作、程度用副词", "good 的副词是 well，fast/hard 形式不变",
    ["The baby is sleeping. Please speak ___.", "quietly", "quiet", "quiet is", "quietly is a", "修饰动词 speak，用副词 quietly。"],
    ["He is a ___ football player.", "good", "well", "goodly", "best play", "修饰名词 player，用形容词 good。"],
    ["She finished the work ___.", "quickly", "quick", "quick is", "quickness", "修饰动词 finished，用副词 quickly。"],
    ["Tom runs very ___.", "fast", "fastly", "faster car", "fast is", "fast 的副词就是 fast 本身，没有 fastly。"]],
  ["Adverbs of frequency", "频率副词", "always、usually、often、sometimes、never——说清“多久一次”，还要放对位置。",
    "频率副词表示动作发生的频率：always(100%) > usually > often > sometimes > seldom > never(0%)。",
    "位置：实义动词前（I always get up early）；be 动词后（She is always late）；助动词后（He has never been there）。",
    "以 He never smokes 为例：never 放实义动词前，且自带否定意，句子不能再加 not。",
    "We usually have lunch at school.", "我们通常在学校吃午饭。", "He is seldom angry.", "他很少生气。",
    "He sometimes is（位置在系动词前，错）", "He is sometimes（对）",
    "I don't never go there.", "I never go there.", "never 本身是否定，不能再和 don't 连用，双重否定错误。",
    "实义动词前、be 动词后", "never/seldom 自带否定，不再加 not",
    ["She ___ watches TV in the morning. (她从不)", "never", "not never", "is never watch", "never is watch", "“从不”用 never，放实义动词前，且不再加否定。"],
    ["My father is ___ busy on Mondays.", "always", "always is busy not", "busy always", "an always", "be 动词 is 后面放 always。"],
    ["They ___ play basketball after school. (经常)", "often", "often is", "are often play", "playing often", "often 放实义动词 play 前。"],
    ["___ does he visit his grandparents? — Once a month.", "How often", "How long time", "What often", "How many often", "问频率用 How often。"]],
];

A1_SPECS.push(
  ["Prepositions of time & place", "时间与地点介词", "at、on、in 分工明确：时间点 at、日子 on、大段时间 in；地点同样适用。",
    "介词连接名词，表示时间或地点关系：at 7 点、on Monday、in June；at home、on the desk、in Beijing。",
    "时间：at + 时刻/节日点，on + 具体某天/星期，in + 月/年/季节/上午下午。地点：at 点，on 面，in 空间内。",
    "以 at 8 on Monday in May 为例：颗粒越小，介词越“尖”：at 最小（时刻），on 次之（天），in 最大（月）。",
    "We meet at the school gate.", "我们在校门口见面。", "She was born in 2010.", "她出生于 2010 年。",
    "in Monday（错）", "on Monday（对）",
    "I get up in 7 o'clock.", "I get up at 7 o'clock.", "具体时刻用 at，不用 in。",
    "时间：at 时刻、on 日子、in 大段", "地点：at 点、on 面、in 里面",
    ["The class starts ___ 9 in the morning.", "at", "on", "in of", "from", "时刻 9 点用 at。"],
    ["Her birthday is ___ June.", "in", "on", "at", "of", "月份用 in。"],
    ["We have a test ___ Friday.", "on", "in", "at", "from of", "星期五是具体某天，用 on。"],
    ["The keys are ___ the table.", "on", "at of", "in of the", "inside of it is", "钥匙在桌面上，用 on。"]],
  ["Like, love & hate + V-ing", "like、love、hate + 动词-ing", "喜欢或讨厌做某事：这三个动词后面要接动词的 -ing 形式。",
    "like / love / hate / enjoy 表达对活动的喜好，后跟动词时用 V-ing 形式：I like swimming.",
    "拼写：swim→swimming（双写），make→making（去 e），lie→lying。love 程度最强，hate 最弱（最讨厌）。",
    "以 She loves dancing 为例：love 后面的 dance 变成 dancing，说明“喜欢跳舞这件事”。",
    "He likes playing chess.", "他喜欢下棋。", "They hate waiting.", "他们讨厌等待。",
    "like swim（口语美式可，但本课按 -ing 规则）", "like swimming",
    "I enjoy to read books.", "I enjoy reading books.", "enjoy 后面只能跟 V-ing，不能跟 to do。",
    "like/love/hate/enjoy 后跟 V-ing", "双写、去 e 的拼写变化别丢",
    ["My sister loves ___.", "cooking", "cook", "to cooks", "cooking is a", "love 后跟 V-ing：cooking。"],
    ["We hate ___ up early in winter.", "getting", "get yesterday", "to gets", "got is", "hate 后跟 V-ing，get 双写 t：getting。"],
    ["He enjoys ___ photos.", "taking", "take yesterday", "takes is", "took of", "enjoy 后跟 V-ing，take 去 e：taking。"],
    ["Do you like ___ football?", "playing", "plays yesterday", "played of", "play is a", "like 后跟 V-ing：playing。"]],
  ["Basic word order", "基本词序", "英语句子像排队：主语 + 谓语 + 宾语，时间地点多在句尾，别按中文顺序硬翻。",
    "基本词序是“谁 + 做 + 什么”：She reads books. 状语（时间、地点）一般放句尾，先地点后时间。",
    "主语不能缺（英语句子必须有主语，老天都要 It rains）；宾语紧跟动词；频率副词嵌中间，普通副词多在句尾。",
    "以 We play football at school every Friday 为例：主(We)谓(play)宾(football) + 地点(at school) + 时间(every Friday)。",
    "Tom speaks English well.", "汤姆英语说得好。", "They arrived home late.", "他们很晚才到家。",
    "I very like English.（错）", "I like English very much.（对）",
    "I yesterday went to school.", "I went to school yesterday.", "时间状语 yesterday 应放句尾，不能夹在主谓之间。",
    "主语必不可少，先人后事", "状语顺序：地点在前，时间在后，都放句尾",
    ["Which order is correct?", "She reads a book every night.", "She a book reads every night.", "Reads she a book every night.", "A book she reads night every.", "主谓宾 + 时间状语放句尾，A 顺序正确。"],
    ["在下雨。我们必须说 ___", "It is raining.", "Is raining.", "Raining now.", "The raining.", "天气句必须用 It 作主语。"],
    ["He ___ to school by bus every day.", "goes", "go school to", "to school go", "going school", "谓语动词 goes 紧跟主语 He（第三人称单数）。"],
    ["Which sentence puts the adverb correctly?", "We play games at home on Sundays.", "We at home play games on Sundays.", "On Sundays we games play at home.", "Play we games at home Sundays on.", "地点 at home 在时间 on Sundays 之前，都在句尾。"]],
  ["Negatives & questions", "否定句与疑问句", "不会说“不”和“问”，句子就只有一面：靠 be、do、did 三把钥匙。",
    "否定和提问要靠“帮手”：be 句型自己上（Is she…? / She isn't…）；实义动词句型借 do/does/did，动词恢复原形。",
    "一般现在时：do/does + 主语 + 动词原形？否定 don't/doesn't + 原形。一般过去时：did + 原形，didn't + 原形。can 等情态动词自己上。",
    "以 Does he like tea? 为例：does 已经扛起第三人称单数的 -s，like 必须回到原形。",
    "Is this your pen?", "这是你的钢笔吗？", "They don't work on Sundays.", "他们周日不上班。",
    "Does he likes tea?（错）", "Does he like tea?（对）",
    "She doesn't likes music.", "She doesn't like music.", "doesn't 后面动词必须用原形 like。",
    "be 和情态动词自己变，实义动词借 do", "用了 do/does/did，主动词回原形",
    ["___ your mother a doctor?", "Is", "Do", "Does do", "Are she", "doctor 是表语，句子靠 be 动词，用 Is 提问。"],
    ["He ___ like spicy food.", "doesn't", "isn't like of", "not likes", "don't", "主语 He 第三人称单数，否定用 doesn't + 原形。"],
    ["___ they come yesterday?", "Did", "Do yesterday", "Does", "Are come", "yesterday 是过去，提问用 Did + 原形 come。"],
    ["Can she swim? — No, she ___.", "can't", "cans not", "doesn't can", "not can", "can 的否定是 can't，回答照用 can 句型。"]],
  ["Wh- questions", "特殊疑问句", "What、Where、When、Who、How——提问要问到点上，句型还是疑问倒装那一套。",
    "特殊疑问句向具体信息提问：What（什么）、Where（哪里）、When（何时）、Who（谁）、Why（为什么）、How（怎样/多么）。",
    "结构：疑问词 + be/do/does/did + 主语 + …？Who 作主语时例外，直接 Who + 谓语：Who teaches you?",
    "以 Where do you live? 为例：Where 问地点，do 是帮手，live 用原形。答句按问的内容回对应信息。",
    "What time is it now?", "现在几点了？", "Who is that girl?", "那个女孩是谁？",
    "Where you live?（缺助动词）", "Where do you live?（对）",
    "What does she does?", "What does she do?", "does 之后动词用原形 do，不能再 does。",
    "先选对疑问词，再倒装提问", "Who 当主语时不加 do：Who came?",
    ["___ is your birthday? — In May.", "When", "Where", "Who", "What thing", "回答是时间 In May，用 When。"],
    ["___ teaches you maths?", "Who", "Whom does is", "Who does is", "What person does", "问“谁教”且 Who 作主语，直接 Who teaches，不加 does。"],
    ["___ do you go to school? — By bike.", "How", "What way is", "Which way does", "How many", "回答方式 By bike，用 How 提问。"],
    ["___ books do you have? — Five.", "How many", "How much", "What many", "How many of is", "books 可数，用 How many。"]],
  ["There is / There are", "There be 句型", "“有”放句首：There is a book / There are books，就近原则决定 is 还是 are。",
    "There be 表示“某地有某物”，be 跟紧贴着的名词走：单数 is、复数 are。否定加 not，提问把 be 提前。",
    "结构：There is + 单数/不可数 + 地点；There are + 复数 + 地点。并列时就近：There is a pen and two books.",
    "以 There are many trees in the park 为例：trees 是复数，所以用 are，别被 There 带跑。",
    "There is a library in our school.", "我们学校有一座图书馆。", "There are fifty students in the class.", "班里有五十名学生。",
    "There have a book.（错）", "There is a book.（对）",
    "There is many people here.", "There are many people here.", "people 是复数概念，要用 are。",
    "看 be 后面的名词单复数", "“有”不等于 have：地点主语句用 There be",
    ["There ___ a cat under the chair.", "is", "are", "have", "be of", "a cat 单数，用 is。"],
    ["There ___ some water in the cup.", "is", "are", "have", "be are", "water 不可数，用 is。"],
    ["___ there any apples on the table?", "Are", "Is are", "Have", "Do are", "apples 复数，提问用 Are。"],
    ["There is a pen and two ___ on the desk.", "books", "book", "a book", "booking", "就近原则看 pen 用 is，后面的名词仍要用复数 books。"]],
  ["Can, could & imperatives", "can、could 与祈使句", "can 说能力，could 更客气，祈使句直接发指令：三兄弟一起管“请求与命令”。",
    "can 表示能力（会）和许可；could 是 can 的过去式，也用于更礼貌的请求；祈使句以动词原形开头发指令或建议。",
    "can/could + 动词原形，人称不变；否定 can't/couldn't。祈使句：(Please) + 动词原形…，否定 Don't + 原形。",
    "以 Could you help me? 对比 Can you help me?：could 不改意思，只把语气变柔和。",
    "She can speak French.", "她会说法语。", "Please sit down.", "请坐下。",
    "can to swim（错）", "can swim（对）",
    "He cans play chess.", "He can play chess.", "情态动词 can 没有人称变化，不能加 s。",
    "情态动词后跟动词原形", "祈使句省主语，否定用 Don't 开头",
    ["I ___ ride a bike when I was five.", "could", "can yesterday always", "am can", "was can", "when I was five 是过去，用 could 表过去的能力。"],
    ["___ be late again!", "Don't", "Not", "No", "Doesn't", "祈使句否定用 Don't + 原形。"],
    ["___ you pass me the salt, please? (更客气的说法)", "Could", "Cans", "Do could", "Are could", "请求帮忙用 Could 更礼貌。"],
    ["She can ___ very well.", "dance", "dances", "to dance", "dancing yesterday", "can 后跟动词原形 dance。"]],
);

// ---------------- A2（16 课） ----------------

const A2_TITLES: (string | Spec)[] = [
  // 第 1 课在装配后由原站反身代词理论和题库整体替换；第 2 课是原站一般过去时。
  "BASE:g-a2-1", "BASE:g-a2-1", "BASE:g-a2-2", "BASE:g-a2-3",
  ["Present perfect: experiences", "现在完成时入门：经历", "Have you ever…? 谈经历、谈结果，一般过去时谈“何时”。",
    "现在完成时连接过去与现在：谈经历（ever/never）、刚完成（just）、结果还在（have lost）。",
    "have/has + 过去分词。不规则分词要记：go→gone/been、see→seen、eat→eaten、write→written。不能和 yesterday 等明确过去时间连用。",
    "以 I have visited Beijing 为例：have visited 不指出何时，只强调“有这经历（对现在有用）”。",
    "Have you ever tried sushi?", "你吃过寿司吗？", "She has just arrived.", "她刚到。",
    "visited（一般过去谈经历时需时间状语）", "have visited",
    "I have seen him yesterday.", "I saw him yesterday.", "有明确过去时间 yesterday，只能用一般过去时。",
    "经历 ever/never，完成 just/already/yet", "有具体过去时间就改用一般过去时",
    ["We ___ to the Great Wall twice.", "have been", "go yesterday", "goes", "are go", "twice 强调经历，用 have been（go 的分词）。"],
    ["He ___ his homework yet.", "hasn't finished", "not finish yesterday", "doesn't finished", "isn't finish", "yet 用于否定句尾，hasn't + 分词 finished。"],
    ["She ___ just ___ a letter.", "has / written", "have / wrote yesterday", "has / writes", "is / write", "just + 现在完成时：has written。"],
    ["I ___ never ___ such a big dog.", "have / seen", "am / saw", "did / seen yesterday", "have / saw", "never + 经历：have seen（see→seen）。"]],
  ["Modals: ability & advice", "情态动词：能力与建议", "can、could、must、should 再升级：义务强弱一线之差，mustn't 和 don't have to 天壤之别。",
    "情态动词表达能力、义务、建议：must（必须/禁止）、have to（不得不）、should（应该，给建议）。",
    "后面跟动词原形。否定关键差别：mustn't = 禁止；don't have to = 没必要。疑问把情态动词提前。",
    "以 You mustn't smoke 与 You don't have to smoke 为例：前者“禁止抽”，后者“不用抽”，意思完全相反。",
    "You should rest more.", "你应该多休息。", "Students must wear uniforms.", "学生必须穿校服。",
    "don't have to（没必要）≠ mustn't（禁止）", "mustn't = 禁止",
    "You must to wear a helmet.", "You must wear a helmet.", "must 后面直接跟动词原形，不要 to。",
    "建议 should，义务 must/have to", "mustn't 禁止 vs don't have to 不必",
    ["You ___ touch that. It's dangerous.", "mustn't", "don't have to be sure", "needn't to must", "aren't must", "危险，禁止触摸：mustn't。"],
    ["The museum is free. You ___ buy a ticket.", "don't have to", "mustn't be", "must buys", "haven't to must", "免费 = 没必要买票：don't have to。"],
    ["If you are tired, you ___ have a rest.", "should", "shoulds", "are should", "musts to", "给建议用 should + 原形。"],
    ["He ___ swim very fast when he was young.", "could", "cans", "is could", "musts", "过去的能力用 could。"]],
  ["Gerunds & infinitives (1)", "动名词与不定式入门", "want to do、enjoy doing——动词后跟什么形式，全看前面的动词脸色。",
    "两个动词连用时，第二个动词变形：to do 表示目的或未发生的动作；doing 把动作当“事情”看。",
    "want/decide/hope/plan + to do；enjoy/finish/mind + doing。like 两者都可（like to 偏习惯选择，like doing 偏享受）。",
    "以 I want to visit 与 I enjoy visiting 为例：want 指向未来愿望用 to，enjoy 回味已在做的事用 -ing。",
    "She decided to study abroad.", "她决定出国留学。", "We finished cleaning the room.", "我们打扫完房间了。",
    "enjoy to do（错）", "enjoy doing（对）",
    "He wants going home.", "He wants to go home.", "want 后面用 to do，不用 doing。",
    "want 类 + to do，enjoy 类 + doing", "先记清单，再在阅读里验证",
    ["They plan ___ a new shop.", "to open", "opening opens", "open yesterday", "opens", "plan 后用 to do：to open。"],
    ["Would you mind ___ the window?", "opening", "to open must", "open yesterday must", "opens must", "mind 后用 doing：opening。"],
    ["She hopes ___ a doctor one day.", "to become", "becoming becomes", "become yesterday", "becomes", "hope 后用 to do：to become。"],
    ["We enjoy ___ in the sea in summer.", "swimming", "to swims", "swim yesterday", "swims", "enjoy 后用 doing：swimming（双写 m）。"]],
  ["Zero & first conditionals", "零条件与第一条件句", "If it rains, we stay home——真理用零条件，真实可能用第一条件。",
    "条件句谈“如果…就…”：零条件讲普遍真理，第一条件讲将来真实可能发生的结果。",
    "零：If + 现在时， 现在时。第一：If + 现在时， will + 原形。if 从句永远不用 will（零/第一条件）。",
    "以 If you heat ice, it melts（真理）对比 If it rains tomorrow, I will stay（具体将来）：主句时态决定是哪一种。",
    "If you mix blue and yellow, you get green.", "蓝加黄得到绿。", "If she calls, tell me at once.", "她要是打电话来，马上告诉我。",
    "If it will rain（错）", "If it rains（对）",
    "If I will see him, I will tell him.", "If I see him, I will tell him.", "if 从句用一般现在时，主句才用 will。",
    "真理：双现在时；可能：现在时 + will", "if 从句不用 will",
    ["If you ___ water to 100°C, it boils.", "heat", "will heat", "heated yesterday only", "heats of", "零条件讲真理，从句用一般现在时 heat。"],
    ["I will help you if you ___ me.", "ask", "will ask", "asked of yesterday", "asking of", "第一条件：if 从句用现在时 ask。"],
    ["If he ___ late again, the teacher will be angry.", "is", "will be is", "would be is", "being of", "if 从句用现在时 is。"],
    ["Plants die if they ___ no water.", "get", "will get of", "got of yesterday", "getting of", "普遍真理用零条件：get / die 都是现在时。"]],
  ["Passive voice (intro)", "被动语态入门", "被做的事放前台：The room is cleaned every day——先分清谁是“被动方”。",
    "当主语是动作的承受者时用被动：不知道谁做的、不重要、或想强调事物本身（新闻、工艺说明常用）。",
    "被动 = be + 过去分词。时态看 be：is made（现在）、was made（过去）。执行者用 by 引出，可省略。",
    "以 English is spoken here 为例：English 是“被说”的，动作发出者不重要，直接省略。",
    "This bridge was built in 1998.", "这座桥建于 1998 年。", "Rice is grown in the south.", "南方种水稻。",
    "is build（错）", "is built（对）",
    "The letter was wrote by him.", "The letter was written by him.", "被动需要过去分词 written，不是过去式 wrote。",
    "被动公式：be + 过去分词", "时态在 be 上变，分词不变",
    ["The windows ___ every week.", "are cleaned", "cleans", "is clean by", "clean yesterday of", "windows 复数且被打扫：are cleaned。"],
    ["This song ___ by a famous singer in 2010.", "was sung", "sings", "is sing", "sang by of", "2010 年过去被动：was sung。"],
    ["Cars ___ in this factory.", "are made", "makes", "is make", "making of", "汽车被制造：are made。"],
    ["The story was ___ by my grandma.", "told", "tells", "tell yesterday of", "telling of", "was 后加过去分词 told。"]],
  ["Used to", "used to：过去常常", "I used to play… 说的是“过去常做、现在不再”的事，和 be used to 别搞混。",
    "used to + 动词原形，表示过去的习惯或状态，暗示现在已经改变。",
    "肯定 used to do；否定 didn't use to do；疑问 Did you use to…? 注意否定疑问里是 use 不是 used。",
    "以 He used to smoke（现在戒了）为例：这句话自带“今昔对比”，单纯的过去动作不要用它。",
    "She used to live in a village.", "她以前住在村里（现在不住）。", "I used to hate maths.", "我以前讨厌数学（现在不）。",
    "be used to（习惯于，后跟 doing）", "used to（过去常常，后跟原形）",
    "Did you used to play chess?", "Did you use to play chess?", "有 Did 帮忙时，use 回到原形，不带 d。",
    "used to 自带“现在不了”的暗示", "否定疑问：didn't use to / Did…use to",
    ["My grandpa ___ tell us stories.", "used to", "is used to telling of", "uses to tells", "use to told", "“过去常常讲”用 used to + 原形 tell。"],
    ["There ___ a small shop here. (以前有)", "used to be", "is used to be", "used to is", "uses to be", "There used to be 表示过去有、现在没有。"],
    ["He didn't ___ eat vegetables.", "use to", "used to eats", "uses to", "used to eating", "didn't 后用 use to + 原形。"],
    ["Which sentence means 'not any more'?", "I used to collect stamps.", "I am collecting stamps now.", "I collect stamps every day.", "I will collect stamps.", "used to 暗示过去的习惯现在已停止。"]],
  ["Prepositions of movement", "运动介词", "into、out of、across、along、through——动作往哪儿去，介词说清楚。",
    "运动介词描述移动的方向和路径：into（进入）、out of（出来）、across（横穿表面）、through（穿过内部）、along（沿着）。",
    "across 用于平面横穿（across the street）；through 用于立体穿过（through the forest/tunnel）；along 沿线而行；over 越过上方。",
    "以 walk across the bridge 与 walk through the tunnel 对比：桥面是“面”用 across，隧道是“管”用 through。",
    "She ran into the classroom.", "她跑进教室。", "We walked along the river.", "我们沿河散步。",
    "through the street（一般路面用 across）", "across the street",
    "He went through the bridge.", "He went across the bridge.", "过桥是横穿桥面，用 across，不用 through。",
    "面用 across，内部用 through", "进入 into，出来 out of，沿着 along",
    ["The cat jumped ___ the box. (跳进)", "into", "across of the top", "along of the side", "at of", "跳进盒子里：into。"],
    ["They drove ___ the tunnel.", "through", "across of the top", "along of only", "over of inside", "穿过隧道内部：through。"],
    ["He swam ___ the river to the other side.", "across", "through of water inside", "along of bank only", "into of bank", "横渡到对岸，横穿水面：across。"],
    ["We cycled ___ the coast road.", "along", "into of the sea", "through of the sea", "out of to", "沿着海岸路骑行：along。"]],
  ["Adverbs of manner & degree", "方式与程度副词", "carefully、well、very、quite——动作做得怎么样、程度有多深，都由它们说。",
    "方式副词回答 How（怎样做）；程度副词回答 How much（多么），修饰形容词、副词或动词。",
    "方式副词多在句尾或动词后：drive carefully。程度副词：very/quite/pretty + 形容词/副词；enough 放被修饰词之后：old enough。",
    "以 He ran fast enough to win 为例：fast 是方式，enough 是程度且后置，这是 enough 的特殊脾气。",
    "She speaks quite clearly.", "她说得相当清楚。", "The box is too heavy to lift.", "箱子太重，搬不动。",
    "enough old（错）", "old enough（对）",
    "He is enough tall to reach it.", "He is tall enough to reach it.", "enough 修饰形容词要放在形容词之后。",
    "方式副词描动作，程度副词描深浅", "enough 永远后置：big enough / fast enough",
    ["Please drive ___. The road is wet.", "carefully", "careful", "careful is", "carefully is a car", "修饰 drive 用方式副词 carefully。"],
    ["This exercise is ___ difficult for me.", "too", "enough after", "very much of it is", "a too", "too + 形容词表示“太…”。"],
    ["She is ___ to join the team. (足够高)", "tall enough", "enough tall", "tall too much of", "enough tall is", "enough 放形容词 tall 之后。"],
    ["He did the work very ___.", "well", "good", "goodly", "best good", "修饰 did 用 well，very 加强程度。"]],
  ["Everyday phrasal verbs", "日常短语动词", "get up、put on、look after——两个词组队，意思全变，先记最高频的一批。",
    "短语动词 = 动词 + 介词/副词，整体意思常和单词本义无关，是口语和考试的高频区。",
    "可分离短语：宾语是名词可放中间或后面（put on your coat / put your coat on）；宾语是代词必须放中间（put it on）。不可分离的（look after）宾语永远在后。",
    "以 turn off the light 与 turn it off 为例：名词可前后，代词 it 只能塞中间。",
    "Please look after my dog.", "请照看我的狗。", "He gave up smoking.", "他戒烟了。",
    "put on it（错）", "put it on（对）",
    "Look after it 要说 look it after.", "Look after it 本身就对。", "look after 不可分离，宾语（包括代词）只能放后面。",
    "代词宾语：可分离的放中间", "look after / look for / get on 不可分离",
    ["Don't forget to ___ the lights when you leave.", "turn off", "turn it off them", "turn off of it now", "off turn", "关灯：turn off。"],
    ["She ___ her little brother at home.", "looks after", "looks it after", "after looks", "looks after of", "look after 照看，不可分离。"],
    ["He ___ at six every morning.", "gets up", "gets it up him", "up gets", "get up him", "起床：get up。"],
    ["Put ___! It's cold outside. (穿上外套，宾语是代词 it)", "it on", "on it", "on", "it on of", "put on 可分离，代词 it 必须放中间：put it on。"]],
  ["Question tags & short answers", "反意疑问与简短回答", "…, isn't it? 前肯后否、前否后肯；简短回答 So do I / Neither do I 表态最省话。",
    "反意疑问句向对方求证：前面是事实陈述，后面是简短疑问，肯否定相反，人称一致。",
    "助动词照抄陈述句：be 用 be，实义动词借 do/does/did，情态用情态。简短回答表“我也”：肯定 So do I，否定 Neither/Nor do I。",
    "以 You are a student, aren't you? 为例：主句 are → 问句 aren't，人称 you 不变。",
    "He likes tea, doesn't he?", "他喜欢茶，不是吗？", "She can't swim, can she?", "她不会游泳，对吧？",
    "…, doesn't she?（主句是 can 时的错搭）", "…, can she?",
    "You don't like it, don't you?", "You don't like it, do you?", "前否后肯：主句否定，问句要用肯定 do you。",
    "前肯后否，前否后肯", "问句的助动词必须和主句同系统",
    ["Tom is late again, ___?", "isn't he", "doesn't he", "is he not late", "aren't he", "主句 is 肯定，问句 isn't he。"],
    ["You have finished, ___?", "haven't you", "don't you have", "have you not finish", "didn't you", "have 是助动词，问句 haven't you。"],
    ["A: I don't like coffee. B: ___ (我也不喜欢)", "Neither do I", "So do I", "I don't too so", "Me also do", "否定附和用 Neither do I。"],
    ["Let's go for a walk, ___?", "shall we", "will we go", "do we let's", "aren't we", "Let's 开头的建议，反意疑问固定用 shall we。"]],
];

// ---------------- B1（21 课） ----------------

const B1_TITLES: (string | Spec)[] = [
  "BASE:g-b1-1", "BASE:g-b1-2", "BASE:g-b1-3", "BASE:g-b1-4",
  ["Past perfect (intro)", "过去完成时入门", "had done：过去里还有“更早的过去”，讲故事捋时间线就靠它。",
    "过去完成时表示“过去某事之前已经完成”的动作，解决两个过去动作谁先谁后的问题。",
    "had + 过去分词（人称不变）。常与 when/by the time/by then 搭配；先发生的用过去完成，后发生的用一般过去时。",
    "以 When I arrived, the film had started 为例：had started（先）→ arrived（后），时间线一目了然。",
    "She had left before I called.", "我打电话前她已离开。", "By 9 pm, we had finished dinner.", "到晚上九点，我们已吃完晚饭。",
    "had started（先）", "arrived（后）",
    "When I got home, he left already. (他先走的)", "When I got home, he had already left.", "“先离开”要用过去完成时 had left，already 放中间。",
    "早动作用 had done，晚动作用过去时", "by the time 是过去完成时的信号词",
    ["The train ___ when we reached the station.", "had left", "leaves now", "leave yesterday tomorrow", "is leave", "我们到站（后）时火车已开走（先）：had left。"],
    ["I ___ never ___ snow before that winter.", "had / seen", "have / saw now", "am / seen", "did / saw of", "在那个冬天之前（过去的过去）：had seen。"],
    ["After he ___ his work, he went home.", "had finished", "finishes now", "finish tomorrow", "is finish", "先完成再回家：had finished。"],
    ["She told me she ___ the film before.", "had seen", "sees now", "see tomorrow will", "is see", "转述过去的经历，原句的完成时后移为 had seen。"]],
  ["Gerunds & infinitives (2)", "动名词与不定式进阶", "stop doing 与 stop to do 只差一点，意思全反——动词搭配的“陷阱区”系统清账。",
    "同一动词跟 doing 和 to do 意思可能完全不同：stop/remember/forget/try 是重灾区，必须成对记。",
    "stop doing=停止做；stop to do=停下来去做。remember doing=记得做过；remember to do=记得要去做。try doing=试试看（方法）；try to do=努力做。",
    "以 He stopped to smoke（停下工作去抽烟）对比 He stopped smoking（戒烟）：一个刚拿起烟，一个刚放下烟。",
    "Don't forget to lock the door.", "别忘了锁门（还没锁）。", "I remember locking it.", "我记得锁过了（已锁）。",
    "stop to do = 停下来做另一件事", "stop doing = 停止正在做的事",
    "I regret informing you. (通知你这件将做的事)", "I regret to inform you…", "通知“将要告知”的坏消息用 regret to inform（固定礼貌说法）。",
    "remember/forget/stop/try 跟 doing 谈过去，跟 to do 谈将来", "regret to say 是报坏消息的固定开场",
    ["She stopped ___ TV and went to bed. (不再看了)", "watching", "to watches", "watch yesterday only", "watches", "停止正在看的电视：stop watching。"],
    ["Remember ___ the lights off before you leave.", "to turn", "turning turned done", "turns", "turned done", "记得去关灯（还没做）：remember to turn。"],
    ["I tried ___ the window, but it was stuck. (努力开)", "to open", "opening opened done", "opens", "opened", "努力尝试打开：try to open。"],
    ["Try ___ some honey in the tea; it may taste better. (试试看)", "adding", "to adds must", "adds", "added done", "提出一种方法试试：try adding。"]],
  ["Reported speech (basics)", "间接引语基础", "转述要点：时态后退一格，人称跟着转述人变，this/today 也要换。",
    "间接引语把别人说的话嵌进自己的句子：主句 said/told 之后，原句时态整体后移一格。",
    "现在→过去，完成→过去完成，will→would，can→could。时间口诀：now→then，today→that day，tomorrow→the next day，here→there。问句用 if/疑问词 + 陈述语序。",
    "以 “I am busy now,” he said → He said he was busy then 为例：am→was，now→then，我变成了 he。",
    "She said she would come.", "她说她会来。", "He told me that he was ill.", "他告诉我他生病了。",
    "said（不带人）", "told + 人（带人）",
    "He said me that he was tired.", "He told me (that) he was tired.", "“告诉某人”要用 tell + 人，不能 say + 人。",
    "say 不带人，tell 必须带人", "时态后移 + 时间词、指示词同步更换",
    ["“I will help you,” she said. → She said she ___ me.", "would help", "will help now", "helps yesterday", "is help", "will 后移为 would。"],
    ["“I am reading,” he said. → He said he ___ reading.", "was", "is now", "am", "be is", "am 后移为 was。"],
    ["She asked, “Do you like tea?” → She asked ___ I liked tea.", "if", "that if of", "do", "what if is", "一般疑问句转述用 if 引导，语序变陈述式。"],
    ["“Open the door,” he said to me. → He told me ___ the door.", "to open", "open that", "opening opened", "that open", "祈使句转述：tell sb to do。"]],
  ["So & such, too & enough", "so/such、too/enough", "so fast、such a day、too hot、old enough——程度的四种说法一次对齐。",
    "so/such 加强语气（so + 形容词/副词；such + 名词短语）；too 表示“过于（做不到）”；enough 表示“足够（能做）”。",
    "so + adj/adv（+ that…）；such + a/an + adj + 单数名词 / such + adj + 复数不可数。too + adj + to do（隐含否定）；adj + enough + to do（肯定可能）。",
    "以 It was such a cold day that… 为例：day 是名词，前面必须用 such，不能用 so a cold day。",
    "He ran so fast that we couldn't catch him.", "他跑得太快，我们追不上。", "She is old enough to travel alone.", "她年纪够大，可以独自旅行。",
    "so + 形容词/副词", "such + 名词短语",
    "It was so a beautiful picture.", "It was such a beautiful picture.", "有 a + 形容词 + 名词结构时用 such，不能用 so。",
    "名词在场用 such，形容词单独用 so", "too 是“过头做不到”，enough 是“足够能做到”",
    ["The coffee is ___ hot to drink.", "too", "so that can", "enough after hot", "such a", "太烫喝不了：too hot to drink。"],
    ["It was ___ interesting book that I read it twice.", "such an", "so an", "too an", "a so", "book 是名词短语：such an interesting book。"],
    ["He speaks ___ fast that I can't follow.", "so", "such a lot", "too much of a", "an so", "fast 是副词，单独被修饰：so fast。"],
    ["Is the water warm ___ to swim in?", "enough", "too after warm", "so that is", "such", "enough 放形容词 warm 之后：warm enough。"]],
  ["Future continuous (intro)", "将来进行时入门", "This time tomorrow I will be flying——站在将来回头看“正在进行”。",
    "将来进行时描写将来某一时刻正在进行的动作，常用于行程安排和礼貌询问计划。",
    "will be + V-ing。信号：this time tomorrow / at 8 tonight。问计划比 Will you…? 更委婉：Will you be using the car tonight?",
    "以 At 9 tomorrow, we will be having class 为例：把时间点定格在明天 9 点，画面里动作正进行。",
    "This time next week, I'll be travelling.", "下周的这个时候，我正在旅行。", "Don't call at 7; we'll be eating.", "别七点打来，我们那时在吃饭。",
    "will be doing（将来某点进行中）", "will do（将来某事发生）",
    "This time tomorrow I will fly to Beijing.", "This time tomorrow I will be flying to Beijing.", "“这个时间点正在飞”要用将来进行时 will be flying。",
    "定格将来某时刻用 will be doing", "问计划用它更礼貌：Will you be…?",
    ["At midnight tonight, most people ___ .", "will be sleeping", "sleeps now", "slept yesterday", "is sleep", "今晚午夜这个时刻正在睡：will be sleeping。"],
    ["___ you ___ your bike this afternoon? (礼貌询问)", "Will / be using", "Do / uses now", "Are / used yesterday", "Was / use", "礼貌问计划：Will you be using…?"],
    ["This time on Friday, we ___ on the beach.", "will be lying", "lies", "lay yesterday only", "is lie", "周五这个时间将正在沙滩上：will be lying（lie→lying）。"],
    ["Don't phone at eight. I ___ my homework then.", "will be doing", "does now", "did yesterday", "am do", "八点那一刻将正在做作业：will be doing。"]],
  ["Present perfect vs past simple", "现在完成时 vs 一般过去时", "同样翻译成“了”，一个连着现在，一个钉在过去——中国学习者最容易混的一对。",
    "现在完成时关心“对现在的影响/经历”，一般过去时关心“过去何时发生的事实”。有明确过去时间标志只能选后者。",
    "信号词：完成时配 ever/never/just/already/yet/since/for；过去时配 yesterday/last week/in 2019/…ago。疑问里问 When 必用过去时。",
    "以 I have lost my key（现在没钥匙）对比 I lost my key yesterday（陈述昨天的事）：一个答案在现在，一个档案在过去。",
    "He has broken his leg. (现在还伤着)", "他的腿骨折了。", "He broke his leg last year.", "他去年腿骨折了（已好）。",
    "现在完成时：影响/经历在现在", "一般过去时：时间点钉在过去",
    "Did you ever go to Japan?", "Have you ever been to Japan?", "问经历用现在完成时 ever，不能用 Did you ever。",
    "先找时间信号，再定时态", "问 When…? 永远用一般过去时",
    ["I ___ my watch. I can't find it now.", "have lost", "lose yesterday at", "am lose", "loses", "丢失的结果延续到现在：have lost。"],
    ["She ___ in Paris in 2015.", "lived", "has lived since always", "is living yesterday", "lives in 2015", "in 2015 明确过去：lived。"],
    ["___ you ___ the new film yet?", "Have / seen", "Did / saw yet already", "Are / see", "Do / sees", "yet + 完成时提问：Have you seen…?"],
    ["When ___ you ___ your car?", "did / buy", "have / bought time", "do / buys", "are / buy", "问具体时间 When 必须用过去时：did you buy。"]],
  ["Articles in detail", "冠词进阶", "the 用不用，意思能差一条街：go to school 与 go to the school 的区别在这节。",
    "冠词的深层规则：表用途/功能时不用 the（go to school 上学）；指建筑本身时用 the（go to the school 办事）。乐器前用 the，球类运动前不用。",
    "最高级、序数词前用 the；表示“最…”（most）作“非常”讲时不用。姓氏复数 the Wangs 指一家人；the + 形容词表一类人（the poor）。",
    "以 play the piano 与 play football 为例：乐器带 the 是英语的惯例，运动不带，规则背后是历史习惯，要成对记。",
    "He plays the violin well.", "他小提琴拉得好。", "The rich are not always happy.", "富人并不总是快乐。",
    "the + 乐器（play the piano）", "零冠词 + 球类（play basketball）",
    "I go to the school every day as a student.", "I go to school every day as a student.", "以学生身份去上学是“用途”，不用 the。",
    "看名词的“身份”：用途去 the，实体留 the", "the + 形容词 = 一类人，谓语用复数",
    ["She went to ___ early because she was tired. (去睡觉)", "bed", "the bed", "a bed", "beds of", "go to bed 表“去睡觉”的用途，bed 前零冠词，直接用 bed。"],
    ["He is ___ tallest boy in the class.", "the", "a one of", "an the", "one", "最高级前必须用 the。"],
    ["They play ___ guitar in a band.", "the", "a plays", "an guitar of", "guitars", "乐器前用 the：play the guitar。"],
    ["___ old need care and respect.", "The", "An old people", "A olds", "Olds people", "the + 形容词 old 表示“老年人”这一类人。"]],
  ["Work & study phrasal verbs", "职场学习短语动词", "hand in、look up、take up、drop out——校园和职场最高频的一组短语动词。",
    "学习工作场景的短语动词：hand in（上交）、look up（查）、carry on（继续）、take up（开始从事）、drop out（退学）、figure out（弄明白）。",
    "多数可分离：look it up（查它）代词放中间。短语动词的宾语较长时放整体之后，避免头重脚轻。",
    "以 look up the word 与 look the word up 都成立为例：名词宾语位置灵活，但换成 it 只能 look it up。",
    "Please hand in your homework.", "请上交作业。", "He took up painting last year.", "他去年开始学画画。",
    "hand in（上交）", "hand out（分发）",
    "I looked up it in the dictionary.", "I looked it up in the dictionary.", "代词宾语 it 必须放在 look 与 up 中间。",
    "方向别记反：in 是交进来，out 是发出去", "弄清、查明：figure out / find out / look up",
    ["Remember to ___ your paper before Friday.", "hand in", "hand it out them", "hand in of it now", "in hand", "上交论文：hand in。"],
    ["If you don't know the word, ___ in a dictionary.", "look it up", "look up it must", "look after it", "look it after", "代词 it 放中间：look it up。"],
    ["She had to ___ of college because of illness.", "drop out", "drop it out her", "dropped out of it now", "out drop", "退学：drop out。"],
    ["Let's ___ with the meeting after the break.", "carry on", "carry it on them all", "carrying on of it", "on carry", "继续开会：carry on。"]],
  ["Wish + past (intro)", "wish 句型入门", "I wish I were taller——wish 后面时态“退一格”，说的全是跟现实相反的心愿。",
    "wish 表达难以实现的愿望：对现在的愿望用过去时，对过去的遗憾用过去完成时，对将来的期盼用 would do。",
    "wish I were（be 用 were 不用 was）；wish I had done（后悔）；wish you would…（希望对方改变，常带轻微抱怨）。",
    "以 I wish it would stop raining 为例：不是讲事实，是盼着将来的天气“变一变”，所以用 would。",
    "I wish I knew the answer.", "我多希望知道答案（其实不知道）。", "He wishes he hadn't shouted.", "他真后悔喊了那一嗓子。",
    "wish + 过去时（愿望在现在）", "wish + had done（遗憾在过去）",
    "I wish I was taller. (正式用法)", "I wish I were taller.", "wish 后 be 动词要用 were（虚拟），was 是口语化说法，考试按 were。",
    "wish 谈的都是“不是这样”的世界", "抱怨将来用 would：I wish you would listen.",
    ["I wish I ___ in a bigger house now.", "lived", "live now really", "had live yesterday", "will live", "对现在的愿望，用过去时 lived。"],
    ["She wishes she ___ harder last year.", "had studied", "studies now really", "study will", "is study", "对过去的遗憾：had studied。"],
    ["I wish you ___ make so much noise!", "wouldn't", "don't now really", "not make", "aren't", "希望对方将来别再吵：wish you wouldn't…"],
    ["It's raining. I wish it ___.", "would stop", "stops now really", "stop yesterday", "is stop", "盼天气变化（将来）用 would stop。"]],
  ["Contrast linkers", "转折衔接词", "although、however、despite——都是“但是”，语法脾气却完全不同。",
    "转折词连接对立信息：although 是连词带从句，however 是副词另起，despite 是介词带名词，各管一段结构。",
    "although + 完整句（不能再加 but）；however 前后用标点隔开（; however,）；despite/in spite of + 名词或 doing；but 是并列连词连小句。",
    "以 Although it rained, we went out 为例：although 段里不能再塞 but，中文“虽然…但是”在英语里只能留一个。",
    "Despite the rain, the match continued.", "尽管下雨，比赛继续。", "He is poor; however, he is happy.", "他虽穷，却快乐。",
    "although + 句子", "despite + 名词/doing",
    "Although he is rich, but he is unhappy.", "Although he is rich, he is unhappy.", "although 与 but 不能同时出现在一个句子里。",
    "中文的“虽然…但是”在英语只留一头", "despite 后面不跟完整句",
    ["___ the bad weather, we climbed the mountain.", "Despite", "Although of it", "However of", "But of", "后面是名词短语 the bad weather，用 Despite。"],
    ["She is young. ___, she is very wise.", "However", "Despite of it", "Although of", "In spite", "另起一句作转折副词，用 However 并以标点隔开。"],
    ["___ he was tired, he kept working.", "Although", "Despite of", "However of alone", "In spite", "后面是完整句 he was tired，用连词 Although。"],
    ["He went out ___ the heavy rain.", "in spite of", "although of it", "despite of it rain", "however", "in spite of + 名词短语，与 despite 同义。"]],
  ["Already, yet, still", "already、yet、still", "三个小词管时间态度：already 是“比预期早”，yet 是“到现在还没”，still 是“仍然”。",
    "这三个副词常和完成时连用，位置都在“中间地带”：already/yet 表预期与现实的落差，still 表状态持续未变。",
    "already 多用肯定句，放 have 与分词之间或句尾；yet 用于疑问/否定，多放句尾；still 放 be/助动词后、实义动词前，否定句里 still 的位置在助动词前特别表强调。",
    "以 The bus hasn't come yet 与 The bus still hasn't come 对比：后者多了 still，不耐烦的语气立刻出来。",
    "I've already seen the film.", "这部电影我已经看过了。", "Is dinner ready yet?", "晚饭好了吗？",
    "already（肯定，已完成）", "yet（疑问/否定，未完成）",
    "Have you finished yet it?", "Have you finished it yet?", "yet 要放在句尾，不能塞在宾语前面。",
    "句尾 yet 问“了吗”，中间 already 说“已经”", "still 表持续：He still lives here.",
    ["Hurry up! The film has ___ started.", "already", "yet for question", "still not come", "yet already not", "肯定句表“已经开始”用 already。"],
    ["I haven't read the book ___.", "yet", "already in negative sure", "still at end", "already yet", "否定句句尾用 yet。"],
    ["She ___ works in the same office. (仍然)", "still", "yet at front", "already not", "yet still not", "“仍然”用 still，放实义动词前。"],
    ["___ he arrived ___? (问到了没有)", "Has / yet", "Did / already yesterday done", "Is / still at start", "Does / yet at front", "问“到了吗”用完成时 + 句尾 yet：Has he arrived yet?"]],
  ["Comparative structures", "比较结构进阶", "the more… the more…、much bigger、no more than——比较不只是加 -er。",
    "比较的进阶表达：倍数与程度修饰（much/far/a little + 比较级）、并列递进（the more…, the more…）、同级比较（as…as 的花式否定）。",
    "the + 比较级…, the + 比较级… 两个分句平行；比较级前可加 much/far/even/still（不能加 very）。not as/so…as 表“不如”。",
    "以 The harder you work, the luckier you get 为例：前后两个 the + 比较级像跷跷板，一边升一边跟着升。",
    "This road is much longer than that one.", "这条路比那条长得多。", "He is not as tall as his father.", "他没他父亲高。",
    "much + 比较级（对）", "very + 比较级（错）",
    "This book is very more interesting.", "This book is much more interesting.", "修饰比较级用 much/far/even，不能用 very。",
    "递进句：the more…, the more…", "修饰比较级：much/far/even/a little",
    ["The ___ you practice, the ___ you become.", "more / better", "most / best ever", "more / best", "most / better", "递进结构两边都用比较级：the more…the better。"],
    ["His new house is ___ bigger than the old one.", "much", "very much of", "so very", "too very", "修饰比较级 bigger 用 much。"],
    ["She runs ___ fast ___ a horse. (和马一样快)", "as / as", "so / than", "as / than", "more / as", "同级比较 as…as。"],
    ["This question is ___ difficult than the last. (难得多)", "far more", "very more much", "so more", "too more", "far more difficult 表示“难得多”。"]],
  ["Reflexive pronouns", "反身代词", "myself、yourself、themselves——动作绕回自己身上，或强调“亲自”。",
    "反身代词指“某人自己”：主语和宾语是同一人时用它作宾语；也可放主语后或句尾表强调“亲自、本人”。",
    "形式：myself/yourself/himself/herself/itself/ourselves/yourselves/themselves。固定搭配：by oneself（独自）、enjoy oneself（玩得开心）、teach oneself（自学）。",
    "以 He taught himself English 为例：himself 回指主语 He，动作的对象就是本人。",
    "The children enjoyed themselves at the party.", "孩子们在聚会上玩得很开心。", "I did it myself.", "这是我亲自做的。",
    "himself（他自己）", "themselves（他们自己）",
    "She hurt himself in the game.", "She hurt herself in the game.", "主语 She 对应的反身代词是 herself，要前后一致。",
    "先看主语是谁，再选反身代词", "enjoy oneself 是固定搭配，玩得开心必用它",
    ["Tom cut ___ while cooking.", "himself", "his self him", "him", "he self", "主语 Tom 指男性，反身代词 himself。"],
    ["We made the cake ___.", "ourselves", "our self we", "us selves", "we own", "We 对应 ourselves，表“我们自己做的”。"],
    ["Did you enjoy ___ at the concert?", "yourself", "you self your", "yours", "your own is", "enjoy oneself 搭配，你一个人时用 yourself。"],
    ["The cat washed ___ in the sun.", "itself", "it self cat", "its", "it own", "猫是 it，反身代词 itself。"]],
  ["Each other & one another", "相互代词", "两个人 each other，多个人 one another？现代用法其实没那么死板。",
    "相互代词表示彼此之间的动作关系：A helps B and B helps A，合起来就是 They help each other.",
    "传统区分：两人之间 each other，三人以上 one another；现代英语里两者常可互换。所有格：each other's。它们作宾语，不能作主语。",
    "以 The two sisters love each other 为例：动作在两人之间双向流动，不能写 they love themselves（那是各爱各的）。",
    "We should help one another.", "我们应该互相帮助。", "They looked at each other and laughed.", "他们相视而笑。",
    "each other（互相）", "themselves（各自自己）",
    "The twins dressed each other in the morning. (各穿各的)", "The twins dressed themselves in the morning.", "“各自穿衣”不是互相穿，要用 themselves，别乱用 each other。",
    "动作双向流动用 each other", "动作回到各自用反身代词",
    ["The two boys are playing with ___.", "each other", "themselves each alone", "one other boy", "each boy self", "两个人互相玩耍：each other。"],
    ["Students in our class respect ___.", "one another", "themselves one", "each student self", "another student is", "全班多人互相尊重，传统用 one another。"],
    ["They borrowed ___ books. (彼此的书)", "each other's", "each other book of", "themselves book", "one another book of", "“彼此的”用所有格 each other's。"],
    ["Be kind to ___ in the team.", "one another", "yourselves each", "themselves team", "each one self team", "对团队彼此友善：one another 作宾语。"]],
];

const B2_TITLES: (string | Spec)[] = [
  "BASE:g-b2-1", "BASE:g-b2-2", "BASE:g-b2-3", "BASE:g-b2-4",
  ["Causative: have something done", "使役结构 have/get something done", "I had my hair cut——不是自己剪，而是“请人做”，这就是使役结构。",
    "使役结构表示请/安排别人为自己做事，或遭遇某事（车被偷了）。重点在“事被做”，不在自己动手。",
    "have/get + 宾语 + 过去分词。get 更口语。否定疑问把 have 当普通动词用 do 帮忙：Did you have your car repaired?",
    "以 She had her photo taken 为例：拍照的是摄影师，had 表示她“安排/接受”了这件事。",
    "We are having our house painted.", "我们正请人刷房子。", "He got his bike fixed yesterday.", "他昨天把自行车修好了（请人修的）。",
    "have sth done（请人做）", "do sth oneself（自己做）",
    "I cut my hair yesterday. (想说在理发店剪的)", "I had my hair cut yesterday.", "在理发店是“被剪”，要用 have my hair cut。",
    "先定宾语，再补分词：have + 物 + done", "不幸遭遇也用它：He had his wallet stolen.",
    ["I need to ___ my eyes ___ . (去验光配镜)", "have / tested", "have / test yesterday", "having / tests", "have / testing now", "使役：have + 宾语 + 过去分词 tested。"],
    ["They ___ their roof ___ after the storm.", "had / repaired", "had / repair yesterday do", "have / repairs now", "had / repairing now only", "过去请人修屋顶：had the roof repaired。"],
    ["She ___ her dress ___ by a designer.", "had / made", "had / make yesterday do", "has / makes", "had / making only", "裙子是定做的：had her dress made。"],
    ["He ___ his car ___ at the garage every year.", "has / serviced", "has / service do", "have / services", "has / servicing only", "每年请人保养车：has his car serviced。"]],
  ["Verb patterns: remember, try, go on", "动词句型深水区", "go on doing 与 go on to do、mean doing 与 mean to do——句型差异即是意义差异。",
    "进阶段的动词句型：go on（继续同一件/接着做另一件）、mean（意味着/打算）、propose、regret，每个都要靠搭配定意思。",
    "go on doing=继续原事；go on to do=接着做新事。mean doing=意味着（结果）；mean to do=打算（意图）。",
    "以 He went on to win the prize 为例：to win 是“下一步新动作”，若写 went on winning 就成了没完没了地赢下去。",
    "This job means working at weekends.", "这份工作意味着周末也要上班。", "I didn't mean to hurt you.", "我本意不是伤害你。",
    "mean doing = 意味着（后果）", "mean to do = 打算（心意）",
    "After the break, he went on explaining the same point. (他接着讲了新内容)", "After the break, he went on to explain a new point.", "“接着做新事”要用 go on to do，继续原事才是 go on doing。",
    "doing 看已成事实/后果，to do 看意图/下一步", "regret/mean/propose/go on 四个词重点防身",
    ["Losing this match ___ dropping out of the top four.", "means", "mean", "meaning to", "meant to drop", "“意味着掉出前四”是后果：means + doing（dropping），主语是动名词短语，谓语用单数 means。"],
    ["She ___ to call him, but forgot.", "meant", "means calling", "mean calling", "meaning", "“本打算打电话”是意图：meant to call，填 meant。"],
    ["He finished the report and went on ___ the slides.", "to prepare", "preparing same report", "prepares", "prepared done", "报告做完后接着做幻灯片（新事）：go on to prepare。"],
    ["The teacher went on ___ the same rule for an hour.", "explaining", "to explain new thing", "explains", "explained done", "整整一小时讲同一条规则（继续原事）：go on explaining。"]],
  ["Future perfect", "将来完成时", "By 2030, we will have built…——站在将来回望“到那时已经完成”。",
    "将来完成时表示到将来某个时间点之前已经完成的动作，计划、预测和年终总结的常客时态。",
    "will have + 过去分词。信号：by + 将来时间点（by tomorrow / by 2030 / by the time you arrive）。",
    "以 By the time you read this, I will have left 为例：两个将来动作，have left 是“到那时已完成”的先行者。",
    "By next June, she will have graduated.", "到明年六月，她就毕业了。", "We will have finished the project by Friday.", "周五前我们将完成项目。",
    "will have done（到时已完成）", "will do（到时去做）",
    "By tomorrow, I will finish reading it. (要表达已读完)", "By tomorrow, I will have finished reading it.", "有 by + 将来时间且强调“完成”，要用将来完成时。",
    "看到 by + 将来时间先想 will have done", "by the time + 现在时，主句用将来完成时",
    ["By 8 pm, they ___ the meeting.", "will have ended", "ends now", "ended yesterday", "is end", "到晚八点前会议将已结束：will have ended。"],
    ["By the time he retires, he ___ here for 40 years.", "will have worked", "works now", "worked yesterday only", "is work", "到退休时累计工作 40 年：will have worked。"],
    ["___ you ___ the report by Monday?", "Will / have written", "Do / writes now", "Are / wrote", "Was / write", "将来完成时疑问：Will you have written…?"],
    ["By next year, the bridge ___ .", "will have been built", "is build now", "built yesterday only", "builds", "桥是被建的，将来完成时被动：will have been built。"]],
  ["Advanced quantifiers", "高级量化词", "a great deal of、plenty of、hardly any——量的说法越准，句子越像高分作文。",
    "高级量化表达细分量级与语气：a great deal of（大量，正式）、a number of + 复数、the number of（数目本身）、hardly/scarcely any（几乎没有）。",
    "a number of + 复数名词 + 复数谓语；the number of + 复数名词 + 单数谓语（主语是 number）。amount of 只配不可数。few/a few、little/a little 的 a 决定正负色彩。",
    "以 A number of students are… 对比 The number of students is… 为例：谓语只看真正的“头”：a number 看学生，the number 看数目。",
    "A great deal of time was wasted.", "大量时间被浪费了。", "Hardly anyone came to the talk.", "几乎没人来听讲座。",
    "a number of + 复数谓语", "the number of + 单数谓语",
    "The number of students are rising.", "The number of students is rising.", "the number 作主语是单数，谓语用 is。",
    "带 a 是“有一些（肯定）”，不带是“几乎没（否定）”", "amount 配不可数，number 配可数",
    ["___ of water was spilled on the floor.", "A great deal", "A number of waters", "Many of waters", "Several of water", "water 不可数，用 a great deal of。"],
    ["A number of people ___ waiting outside.", "are", "is one", "was one person", "be is", "a number of people 看作复数：are。"],
    ["He has ___ friends here, so he feels lonely.", "few", "a few many", "several plenty", "a lot of many", "感到孤独说明朋友“很少”：few（否定色彩）。"],
    ["There is ___ time left; we can still make it.", "a little", "little none", "few for time", "a few for time", "还能赶上说明“还有一点时间”：a little（肯定色彩）。"]],
  ["Contrast & purpose linkers", "对比与目的衔接", "whereas、while、so as to、in order that——论说文的骨架靠衔接词撑起来。",
    "进阶衔接：whereas/while 表对比（两种情况并置），so as to / in order to 表目的（不定式），so that / in order that 带从句表目的。",
    "whereas 从句完整，主从对照；目的：to do 最简，in order to/so as to 正式，so that + can/could/will/would（带情态）。否定目的：so as not to。",
    "以 He earns a lot, whereas his brother earns little 为例：whereas 把两种收入并置对照，比 but 更书卷气。",
    "She saved money so as to travel.", "她存钱是为了旅行。", "He spoke slowly so that everyone could follow.", "他说得慢，好让大家跟得上。",
    "whereas（书面对比）", "but（口语并列）",
    "He left early so as that he could catch the train.", "He left early so that he could catch the train.", "so that 引导目的从句；so as 后面只能跟 to do，不能跟 that 从句。",
    "带从句的目的只能用 so that / in order that", "so as not to 是“以免”的正式写法",
    ["The north is industrial, ___ the south is agricultural.", "whereas", "so as to do", "in order that can", "so as not", "并置两种对照情况：whereas。"],
    ["She whispered ___ wake the baby.", "so as not to", "so that not to do", "in order that not", "for not to do only", "“以免吵醒”用 so as not to + 原形。"],
    ["He trained hard ___ he could win a place.", "so that", "so as that", "in order to that", "whereas", "从句带情态 could，用 so that。"],
    ["___ improve his English, he reads aloud daily.", "In order to", "So that can", "Whereas", "In order that can", "句首目的短语用 In order to + 原形。"]],
  ["Modal perfect", "情态动词推测过去", "must have done、should have done——对过去下判断，语气全在情态里。",
    "情态动词 + have + 分词专谈过去：must（肯定推断）、can't（否定推断）、should（本该却没做，带责备）、needn't（做了但白做）。",
    "must have done=准是做过；can't have done=绝不可能做过；should have done=本该做（没做）；needn't have done=做了却没必要。may/might have done=可能做过。",
    "以 You needn't have bought milk（家里还有）对比 You didn't need to buy milk（所以没买）为例：have 分词决定“到底做没做”。",
    "He must have missed the train.", "他肯定错过火车了。", "You should have told me earlier!", "你该早点告诉我的！",
    "should have done（本该做而没做）", "must have done（推断做过）",
    "You should have not spent so much.", "You shouldn't have spent so much.", "否定要放在 have 前面：shouldn't have done。",
    "needn't have done = 做了白做", "推断过去：肯定 must，否定 can't",
    ["The ground is wet. It ___ last night.", "must have rained", "must rain yesterday", "should rain must", "can rained", "对过去肯定推断：must have rained。"],
    ["She ___ the news; she looks calm.", "can't have heard", "mustn't hear yesterday", "shouldn't hear must", "needn't heard must", "她很平静，肯定没听见：can't have heard。"],
    ["I ___ so much food. Nobody was hungry. (买多了，白买)", "needn't have bought", "didn't need to bought done already", "mustn't have bought", "can't have bought", "实际买了但没必要：needn't have bought。"],
    ["You ___ me a lift. I could have walked. (谢绝已发生的帮忙，含责备口吻时)", "shouldn't have given", "must have given sure", "can't have given", "needn't gave yesterday", "本不该给（却给了）用 shouldn't have given 表达。"]],
  ["Relative clauses: advanced", "定语从句进阶", "the house in which…、all that…、quantifier + of whom——从句的高阶形态。",
    "进阶定语从句：介词前置（in which / to whom）、数量词 + of + 关系代词（many of whom）、What 引导名词性从句的区别。",
    "正式书面里介词可提前：the house in which he lives = the house (that) he lives in。of whom 指人，of which 指物。whose 可指物（the house whose roof…）。",
    "以 I have three brothers, one of whom is a doctor 为例：逗号非限定从句补充信息，of whom 接数量词 one。",
    "The pen with which he wrote is famous.", "他写字的那支笔很有名。", "She has many friends, most of whom are teachers.", "她朋友很多，大多是老师。",
    "prep + which（指物）", "prep + whom（指人）",
    "The man to who I spoke is kind.", "The man to whom I spoke is kind.", "介词提前时人要用 whom，不能用 who。",
    "介词提前：人 whom、物 which", "数量词 + of + whom/which 是书面语利器",
    ["The town ___ he was born is small.", "in which", "which in it", "in who", "that in it is", "出生在城镇里，介词提前：in which。"],
    ["I met ten students, half of ___ were from abroad.", "whom", "which things", "who of them is", "that of", "指人且接 half of，用 whom。"],
    ["The book, ___ author is unknown, is very old.", "whose", "which is author", "whom author", "that author is", "“书的作者”表所属用 whose，指物也可以。"],
    ["He gave me a reason, ___ I didn't believe.", "which", "what thing", "that of it is", "whom reason", "非限定从句补充评价，指物用 which（不能用 that）。"]],
  ["Phrasal verbs: academic & news", "学术新闻短语动词", "bring about、account for、result in——新闻和论文里最常见的短语动词群。",
    "正式语域的短语动词：bring about（引起）、account for（占/解释）、result in（导致）、stem from（源于）、carry out（实施）。",
    "这组多为不可分离或宾语在后：result in + 名词，account for + 名词。注意方向：A results in B（A 导致 B）；A results from B（B 导致 A）。",
    "以 Stress stems from overwork 为例：stem from 指“根子在…”，新闻评论里非常高频。",
    "The new law brought about big changes.", "新法带来了巨大变化。", "Women account for 60% of the staff.", "女性占员工的六成。",
    "result in（导致）", "result from（源于）",
    "The accident resulted from the driver sleeping. (事故导致司机睡觉)", "The accident resulted from the driver's sleeping. = 事故源于司机打瞌睡。", "result from 表示“源于”，因果方向别读反。",
    "account for 一词两用：占比、解释", "carry out 后接调查、研究、计划",
    ["Scientists ___ a survey of 2,000 families.", "carried out", "carried it out them all now", "carry out of it now", "carrying out of", "实施调查：carry out a survey。"],
    ["Smoking can ___ serious diseases.", "result in", "result from it is", "result in of it now", "results from diseases", "吸烟导致疾病：result in。"],
    ["His success ___ hard work and luck.", "stems from", "stems in it", "stem from of it now", "stems to it", "成功源于努力：stem from。"],
    ["Rent ___ half of her income.", "accounts for", "accounts in it", "account of it now", "accounts from", "占比用 account for。"]],
];

// ---------------- C1（21 课） ----------------

const C1_TITLES: (string | Spec)[] = [
  "BASE:g-c1-1", "BASE:g-c1-2", "BASE:g-c1-3", "BASE:g-c1-4",
  ["Cleft sentences (focus)", "分裂句：把焦点推上台", "It was John who did it——分裂句把一句话的“聚光灯”只打在一个成分上。",
    "分裂句把某个成分提前特写，表达强调、对比和纠正：说话人暗示“不是别人，正是他”。",
    "It is/was + 焦点 + that/who + 主体句（缺焦点版）。焦点可是主语、宾语、状语；what 分裂句：What + 主语谓语 + be + 焦点。",
    "以 It was the key that he lost 为例：正常句 He lost the key 平铺直叙，分裂后 key 被顶到台前，听话人立刻知道丢的不是别的。",
    "It was in 2019 that they met.", "他们正是在 2019 年相遇的。", "What I need now is a rest.", "我现在需要的就是休息。",
    "It was + 主语焦点 + who", "It was + 其他焦点 + that",
    "It was he who he broke the rule.", "It was he who broke the rule.", "分裂句后半段不能重复主语代词 he，who 已顶替。",
    "强调时间地点用 that 不用 when/where", "what 分裂句的 be 随时态和焦点数走",
    ["It was the manager ___ made the decision.", "who", "which thing", "what person do", "whom made", "强调主语（人）用 who 连接。"],
    ["What surprised us ___ his calmness.", "was", "were two people", "are now plural", "be yesterday go", "焦点 his calmness 是单数概念，be 用 was。"],
    ["It was at midnight ___ the phone rang.", "that", "when time is", "which time", "where place", "强调时间状语固定用 that，不能用 when。"],
    ["___ he wants is more time.", "What", "That what is", "It thing", "Which he said", "what 分裂句作主语：What he wants is…"]],
  ["Future in the past", "过去将来时", "He said he would come——站在过去看将来，would 是当年的 will。",
    "过去将来时表达“从过去某点看将来”的动作：was/were going to、would do、was to do，常用于叙事和转述。",
    "would + 原形（will 的过去式）；was/were going to + 原形（当时的打算）；was/were to do（原定的安排，正式）。叙事里与过去时主句呼应。",
    "以 She was going to call, but she forgot 为例：going to 是当时的计划，forgot 是后来的现实，转折感全靠这组时态。",
    "He promised he would return.", "他承诺会回来。", "The train was to leave at dawn.", "火车原定黎明出发。",
    "would（过去看将来，叙事）", "will（现在看将来）",
    "Yesterday he says he will come tomorrow in the story. (叙事主句是过去时)", "Yesterday he said he would come the next day.", "叙事框架是过去时，从句要用 would，tomorrow 改 the next day。",
    "叙事一旦进入过去视角，将来也要“后移”", "was to do 表原定安排，带正式与宿命感",
    ["I knew she ___ the prize one day.", "would win", "will win now", "wins now", "win tomorrow will", "过去视角看将来：would win。"],
    ["We ___ on holiday, but the weather changed our plan.", "were going to go", "will go now", "go now will", "goes now", "当时的打算是 were going to go，后被天气打断。"],
    ["The meeting ___ at 3 pm according to the old schedule.", "was to start", "will start now", "starts now will", "start will be now", "旧日程上的原定安排：was to start。"],
    ["He told me he ___ me back that evening.", "would call", "will call now", "calls now", "call me now will", "转述过去承诺：would call。"]],
  ["Advanced passive patterns", "被动进阶：get 被动与报道被动", "He got promoted、It is believed that…——被动不止 be 一种面孔。",
    "进阶被动：get + 分词（口语，强调结果与遭遇）；报道被动 It is said/reported/believed that…（新闻、学术的客观腔）；主语版 People say that… 的同义转换。",
    "get 被动多用于动态事件（get hurt/promoted/fired）。报道被动可转主语句：He is said to be rich（同步）/ to have been rich（先时）。",
    "以 The bridge is expected to open in May 为例：is expected to 把“人们预期”压进主语句，主语从人换成了桥。",
    "She got invited to the wedding.", "她受邀参加了婚礼。", "It is reported that prices have risen.", "据报道，物价已经上涨。",
    "It is said that he is…（人称藏起来）", "He is said to be…（主语提上来）",
    "It is believed that he was stolen the money.", "It is believed that he stole the money. / He is believed to have stolen the money.", "steal 是主动行为，被动对象应是钱；主语版要用 to have stolen 表先时。",
    "报道被动先找时间关系再选 to do / to have done", "get 被动不用语正式书面",
    ["It is known that the earth ___ round.", "is", "be yesterday gone", "been gone", "being gone past", "报道被动从句是事实陈述：is。"],
    ["He is thought ___ the best player in the team.", "to be", "be that is", "is be", "been be gone", "主语版报道被动：is thought to be。"],
    ["The suspect is believed ___ the country.", "to have left", "to leave yesterday done at same time", "leaves now", "leave now will", "逃离在报道之前已发生：to have left。"],
    ["My bike got ___ during the night.", "stolen", "steal yesterday doer", "stealing thief", "stole doer", "get 被动表遭遇：got stolen。"]],
  ["Ellipsis & substitution", "省略与替代", "I can swim and so can she——省掉重复部分，句子反而更利落、更地道。",
    "省略（ellipsis）删掉可推断的重复成分；替代（substitution）用 do so / one / ones / so / not 顶替整段内容，避免车轱辘话。",
    "so/neither + 助动词 + 主语 表同感（语序倒装）；one 替可数单数，ones 替复数；do so 替动作短语；hope so / hope not 替整个宾语从句。",
    "以 —Will it rain? —I hope not 为例：not 一个人扛起“不会下雨吧”的全部期望，hope so/not 是口语高频替代。",
    "She can dance, and so can I.", "她会跳舞，我也会。", "I bought a red pen and two blue ones.", "我买了一支红笔和两支蓝的。",
    "so + 助动词 + 主语（我也）", "主语 + 助动词 + too（句尾版）",
    "So I can dance. (表达“她会，我也会”)", "So can I.（语序倒装）", "表“我也”要用倒装的 So can I，平铺的 So I can 是“所以我能”。",
    "one 指代“同类中的一个”，不是同一个", "hope/think/be afraid + so/not 替从句",
    ["A: I love jazz. B: ___ (我也一样)", "So do I", "So I do that means therefore", "I do so that means therefore", "Me love too only", "附和“我也”用倒装 So do I。"],
    ["This shirt is too small; show me a bigger ___.", "one", "it same one", "that same", "ones plural", "替同类单数衬衫用 one（不是同一件）。"],
    ["—Will he pass? —I hope ___. (希望会)", "so", "it that clause", "yes he will do", "not never", "hope so 顶替“他能通过”整句。"],
    ["She didn't come, and ___ did he.", "neither", "so affirmative", "also too", "either affirmative", "两人都没来：neither + 倒装 did he。"]],
  ["Fronting & topicalisation", "前置与话题化", "把最想让对方先听到的成分搬到句首——信息排序就是语气管理。",
    "前置把宾语、状语、表语提前至句首以强调或衔接上下文，是演讲与散文的调度手法。",
    "宾语前置：This book, I really enjoyed.（不倒装）；地点/方向副词前置可全倒装：Down came the rain. / Here comes the bus. 表语前置：Gone are the days…",
    "以 Into the room walked a stranger 为例：地点状语前置后，主谓全倒装，画面感像镜头推近。",
    "That film, I've seen three times.", "那部电影我看过三遍。", "Out rushed the students.", "学生们冲了出来。",
    "Here comes the bus.（全倒装，无进行时）", "Here is coming the bus.（错搭）",
    "Here comes he.", "Here he comes.", "主语是代词时不倒装：Here he comes.",
    "代词主语永不全倒装", "前置的话题与后文要用代词呼应",
    ["___ the hill stood an old tower.", "On top of", "On top is of it", "At top of it is", "In top of", "地点短语前置配全倒装：On top of the hill stood…"],
    ["This mistake, we must never ___ again.", "make", "makes yesterday", "made do", "making only", "宾语前置不倒装：This mistake, we must never make again."],
    ["Here ___ the teacher. (老师来了，代词场景不适用；主语是名词)", "comes", "is coming the teacher now already", "come yesterday", "coming", "Here comes + 名词主语，用一般现在时全倒装。"],
    ["Gone ___ the days when we wrote letters.", "are", "is one day", "be yesterday gone one", "am", "表语 Gone 前置，days 是复数：Gone are the days…"]],
  ["Advanced linkers", "高级衔接词", "nevertheless、consequently、furthermore——论说文的段落靠这些词缝合。",
    "高级衔接词标明段落间的逻辑：让步（nevertheless/still）、因果（consequently/therefore）、递进（furthermore/moreover）、总括（overall/in conclusion）。",
    "它们是副词性连接词，前后要标点护航（句中两逗号或句首加逗号），不能像 and 一样直接粘合两个句子（避免 comma splice）。",
    "以 The plan is risky. Nevertheless, we must act 为例：nevertheless 先认风险再推进主张，让步式推进是高分作文的骨架。",
    "Sales fell; consequently, jobs were cut.", "销量下滑，因此裁员。", "Furthermore, the cost is low.", "此外，成本还低。",
    "nevertheless（尽管如此，让步推进）", "consequently（因此，因果收尾）",
    "The data is limited, moreover it is old. (逗号粘合)", "The data is limited; moreover, it is old.", "moreover 是连接副词，前面要用分号或句号，不能只用逗号粘合两句。",
    "连接副词两边必须有像样的标点", "先定逻辑（让步/因果/递进）再选词",
    ["The evidence is weak. ___, the theory remains influential.", "Nevertheless", "Consequently therefore result", "Furthermore adding cost", "In conclusion summary", "弱证据与影响力对立，让步推进：Nevertheless。"],
    ["Demand rose sharply. ___, prices increased.", "Consequently", "Nevertheless contrast", "Furthermore adding only", "Overall summary only", "需求涨导致价格涨，因果：Consequently。"],
    ["The method is fast. ___, it is cheap and reliable.", "Furthermore", "Nevertheless contrast only", "Consequently result only", "Despite noun", "再追加一条优点，递进：Furthermore。"],
    ["___, the benefits outweigh the costs.", "Overall", "Nevertheless contrast mid", "Consequently cause", "Furthermore more point", "总括收尾：Overall。"]],
  ["Advanced modals", "情态进阶", "needn't have、dare、ought to——情态动词的尾巴同样要收干净。",
    "情态进阶：ought to（理应）、dare（敢，半情态）、used to 的否定、need 的双重身份（情态/实义）分野。",
    "need 作情态动词：后跟原形，只用于否定疑问（Need he go? / He needn't go）；作实义：need to do（人称时态全套）。dare 同理：He daren't tell. / Do you dare to go?",
    "以 You needn't have watered the flowers 为例：花已经浇了（且白浇），have 分词把“既成事实+多余”一次说尽。",
    "You ought to respect your parents.", "你应当尊重父母。", "How dare you speak to me like that!", "你竟敢这样跟我说话！",
    "needn't have done（做了，白做）", "didn't need to do（没必要，未做）",
    "He needn't to come early.", "He needn't come early. / He doesn't need to come early.", "情态 need 后直接跟原形不加 to；实义 need 要 doesn't need to，两条路选一条。",
    "先分清 need 是情态还是实义再选形式", "ought to 的否定 oughtn't to 较正式",
    ["You ___ worry about the exam; it's easy.", "needn't", "needn't to do", "don't need worry form", "aren't need", "情态否定：needn't + 原形 worry。"],
    ["We ___ booked tickets; the train was half empty.", "needn't have", "didn't need to booked already done implies not done", "mustn't have sure", "can't have sure", "票已订但没必要：needn't have booked。"],
    ["He ___ not tell the truth at the meeting. (他不敢)", "dared", "dare yesterday form", "dares to not", "daring", "过去“不敢说”是陈述事实，实义 dare 用过去式 dared not。"],
    ["Students ___ to hand in work on time.", "ought", "oughts", "are ought", "ought to is extra", "ought to 是固定情态短语，横线填 ought（to 已在题中)。"]],
  ["Determiners: advanced", "限定词进阶", "each 与 every、all 与 whole、both 与 either/neither 的边界在高阶写作里必须锋利。",
    "限定词进阶辨析：each 逐个看（两者以上都可，强调个体），every 整体看（只能三者以上）；whole 强调整个，all 强调整体集合；few/little 的肯定否定色彩延续到进阶语境。",
    "each of + 复数名词 + 单数谓语（逐个核）；every one of + 复数 + 单数谓语。both…and…谓语复数；either/neither 单数（正式）。all day vs the whole day 位置不同。",
    "以 Each student has a book 与 Every student has a book 为例：前者逐个点名，后者打包全体，谓语都是单数。",
    "The whole city celebrated.", "全城庆祝。", "Neither answer is correct.", "两个答案都不对。",
    "each（逐个，单数谓语）", "all（全体，复数/不可数谓语）",
    "Each of the boys have a bike.", "Each of the boys has a bike.", "each of 结构谓语看 each，用单数 has。",
    "whole 放 the 与物主代词之后：the whole day", "neither/either 只管“两者”，三者以上用 none/any",
    ["___ of the two sisters is a doctor; both are teachers.", "Neither", "None of three", "Every one of all", "All of two is", "两者都不：Neither + 单数谓语。"],
    ["She spent ___ day preparing the speech.", "the whole", "all of whole the", "whole of a", "every whole", "强调整个一天：the whole day。"],
    ["___ student in the class passed the test. (个个都过)", "Every", "Each of one boy only", "Either of two", "Neither negative", "全体皆过且逐个成立，Every student + 单数谓语自然。"],
    ["Both of the reports ___ worth reading.", "are", "is one", "be one", "am", "both 谓语用复数 are。"]],
  ["Complex objects", "复合宾语结构", "I saw him cross / crossing the road——宾补用原形还是 -ing，画面完全不同。",
    "感官与使役动词带复合宾语：宾语 + 宾补说明宾语的动作或状态。see/hear/watch 后原形表全程，-ing 表片段；make/let 表使役用原形。",
    "感官动词被动时原形要补 to：He was seen to enter. have/get + 宾语 + done 是使役被动版；find/keep + 宾语 + -ing/形容词表发现或保持状态。",
    "以 I saw her cry（看完全程）对比 I saw her crying（撞见正在哭）为例：一词之差，叙事镜头从录像变照片。",
    "We found the door locked.", "我们发现门锁着。", "Don't keep the children waiting.", "别让孩子们一直等。",
    "see sb do（全程/习惯）", "see sb doing（当时片段）",
    "He was seen enter the building.", "He was seen to enter the building.", "感官动词改被动时，省去的 to 要补回来。",
    "使役 make/let 后用原形，get 使役用 to do", "find/keep 后可跟 -ing、形容词、介词短语",
    ["I heard someone ___ for help in the dark.", "crying", "cry full process only never fragment", "cries", "cried doer", "黑暗里撞见的正在发生的呼救，是片段：crying。"],
    ["The teacher made the students ___ the passage aloud.", "read", "to read must", "reading only fragment habit", "reads", "make 使役后用动词原形 read。"],
    ["She was heard ___ a sad song.", "to sing", "sing", "sings", "sang doer", "被动结构里补 to：was heard to sing。"],
    ["Please keep the door ___ during the meeting.", "open", "opens", "opened lock state finished by someone only", "opening action by door itself", "keep + 宾语 + 形容词 open 表保持状态。"]],
  ["Gradable & ungradable adjectives", "可分级与不可分级形容词", "very happy 可以，very delighted 要改 absolutely——程度副词也要看形容词的“量程”。",
    "形容词分两类：可分级（big、tired）配 very/really/quite；极限词（enormous、exhausted、delighted）自带“极端”含义，配 absolutely/completely，very 反而别扭。",
    "强弱配对：good→fantastic、bad→awful、big→huge、tired→exhausted、sure→certain。quite + 极限词 = 完全（英式）；quite + 可分级 = 相当。",
    "以 absolutely furious 为例：furious 已经是“怒到极点”，再用 very 就像说“非常沸点”，量程超了。",
    "I was absolutely delighted with the result.", "我对结果欣喜若狂。", "The room is very small but cosy.", "房间很小但温馨。",
    "very + 可分级形容词", "absolutely + 极限形容词",
    "The film was very fantastic.", "The film was absolutely fantastic.", "fantastic 是极限词，用 absolutely 修饰。",
    "先判断形容词有没有“天花板”", "really 两边都能搭，是安全牌",
    ["After the marathon he was absolutely ___.", "exhausted", "tired with very only", "a tired", "very tired form", " absolutely 后跟极限词 exhausted（极累）。"],
    ["The soup tastes ___ good today.", "really", "absolutely", "very absolute", "complete", "good 是可分级词，really 最稳。（very 也可，但选项中 really 最佳）"],
    ["It's ___ freezing outside; wear a coat.", "absolutely", "very with extreme in strict use", "much of", "so many", "freezing 是极限状态：absolutely freezing。"],
    ["She was ___ furious when she heard the news.", "absolutely", "very much of a", "many", "a lot of anger noun", "furious 配 absolutely。"]],
  ["Narrative tenses", "叙事时态群", "故事一开口，四种过去时态轮番上场：背景、事件、回溯、持续，各有分工。",
    "叙事时态群：一般过去时推进主线，过去进行时铺背景，过去完成时闪回更早，过去完成进行时交代“此前一直在进行”。",
    "开场常用进行时定格（The sun was shining）；主事件用一般过去时连环推进；had done 插叙；was doing 被短动作打断是经典镜头切换。",
    "以 She had been walking for an hour when the storm broke 为例：完成进行时拉满时长的疲惫感，broke 一响，剧情转折。",
    "It was raining when we left the hotel.", "我们离开酒店时正在下雨。", "He recognised the song he had heard as a child.", "他认出了那首儿时听过的歌。",
    "过去进行时（背景画面）", "一般过去时（主线事件）",
    "When I have arrived, they were eating. (叙事框架错位)", "When I arrived, they were eating.", "叙事主线是过去，arrived 用一般过去时，背景 eating 用进行时。",
    "时态即镜头：进行=定格，完成=闪回", "打断结构：was doing when did",
    ["The phone rang while I ___ a shower.", "was having", "have now", "had have yesterday only", "am have", "背景长动作：was having。"],
    ["By the time the police arrived, the thief ___ .", "had escaped", "escapes now", "escape will", "is escape", "警察到之前小偷已逃：had escaped。"],
    ["She was exhausted because she ___ all day.", "had been working", "works now", "work tomorrow", "is work", "此前一直在工作（完成进行时解释现状原因）：had been working。"],
    ["We ___ the house at dawn and ___ towards the hills.", "left / walked", "leave / walk now", "had left / had walked", "leaving / walking no finite", "主线事件连用一般过去时推进：left / walked。"]],
  ["Advanced conditionals (unless, in case)", "条件句进阶连词", "unless、provided that、in case——条件不止 if 一家，五种说法各有脾气。",
    "进阶条件连词：unless（= if not）、provided/providing that（只要，前提正式）、in case（以防，预先准备）、as long as（只要，持续条件）、suppose（假设提问）。",
    "unless 后不加否定（自带否定）；in case 后跟现在/should，不跟 will（它谈预防不是结果）；provided that 多见于合同与规则文本。",
    "以 Take an umbrella in case it rains 对比 Take an umbrella if it rains 为例：in case 是“提前备好”，if 是“等下了再说”，动作时机完全不同。",
    "You won't pass unless you work harder.", "不努力你过不了。", "I'll lend it to you provided that you return it Friday.", "借可以，条件是周五还。",
    "in case（预先防备）", "if（条件成立才行动）",
    "Unless you don't hurry, you'll be late.", "Unless you hurry, you'll be late. / If you don't hurry, you'll be late.", "unless 自带否定，不能再叠加 don't。",
    "in case 后不用 will：in case it rains", "as long as 谈持续期间的条件",
    ["Call me ___ you need help.", "if", "in case of prevention done before only never condition", "unless negative", "provided that formal contract only", "需要时打电话是条件触发，if 最自然。（in case 指预先准备，此处不选）"],
    ["Take a map ___ you get lost.", "in case", "if after it happens only", "unless negative form", "provided that contract", "提前带地图以防迷路：in case。"],
    ["___ you promise to be careful, you can use my car.", "Provided that", "In case prevention", "Unless negative", "So long as of past", "提出借车条件（正式）：Provided that。"],
    ["You can stay out ___ you come home by ten.", "as long as", "in case prevention only", "unless negative", "provided that of it is", "“只要十点前回家”持续条件：as long as。"]],
];

// ---------------- C2（8 课） ----------------

const C2_TITLES: (string | Spec)[] = [
  "BASE:g-c2-1", "BASE:g-c2-2", "BASE:g-c2-3", "BASE:g-c2-4",
  ["Advanced inversion", "倒装精研", "Little did I know、Not until… did…——否定倒装的每一处细节都有讲究。",
    "否定与限制结构倒装精研：Not until + 从句（主句倒装在主句）、Little did sb know（完全料不到）、No way/On no account 等口语与正式的两极。",
    "Not until he arrived did we start（until 从句不倒装，主句倒装）；Hardly/Scarcely…when、No sooner…than 固定搭配，前半倒装后半一般过去。",
    "以 No sooner had she sat down than the phone rang 为例：had 提前、than 接短动作，两件事几乎贴在一起发生。",
    "Little did he realise the danger.", "他丝毫没意识到危险。", "On no account should you sign it.", "无论如何你都不能签。",
    "Hardly/Scarcely … when", "No sooner … than",
    "No sooner he had left than it rained.", "No sooner had he left than it rained.", "No sooner 句首时主句必须倒装：had he left。",
    "Not until 把倒装留给主句", "倒装后主动词回原形/分词，时态在助动词身上",
    ["Not until midnight ___ the noise stop.", "did", "does now habit", "was it noise", "is", "Not until 引导，主句倒装：did the noise stop。"],
    ["Scarcely ___ the door when the dog ran out.", "had I closed", "I had closed no inversion", "I close now", "closed I do", "Scarcely 句首倒装：had I closed。"],
    ["Little ___ they know about the coming storm.", "did", "do now habit present only", "are", "was they", "Little did they know 是固定倒装句式。"],
    ["___ should the door be left open at night.", "On no account", "In no account of it is", "At no account of", "By no account of it", "“无论如何不”正式说法：On no account。"]],
  ["Formal subjunctive", "正式虚拟语气", "We insist that he be present——美式正式文书里 be 的原形就是命令的语气。",
    "正式虚拟（mandative subjunctive）：在 demand/insist/suggest/essential 等词后，that 从句用动词原形，be 不变形，否定用 not + 原形（不用 don't）。",
    "结构：It is essential/important that sb (should) do；suggest doing/that… 英式多加 should，美式多用原形。注意 suggest 表“暗示”时不用虚拟：He suggested that she was lying（含事实判断）。",
    "以 The rules require that every member attend 为例：attend 不加 s，这个“错误感”正是虚拟语气的标记。",
    "It is vital that he be told immediately.", "必须立刻告诉他。", "She insisted that the report be rewritten.", "她坚持报告要重写。",
    "insist that sb do（要求，虚拟）", "insist that sb did（坚持说，事实）",
    "I suggest that he goes home early.", "I suggest that he go home early.（建议义，正式虚拟）", "建议义时要用原形 go（或 should go），goes 是陈述事实的读法。",
    "先判定是“要求/建议”还是“陈述事实”", "be 在虚拟里永不变形：that he be…",
    ["The doctor recommended that she ___ more rest.", "take", "takes is fact reading", "took past fact", "taking", "推荐义用虚拟原形 take。"],
    ["It is necessary that the form ___ in ink.", "be filled", "is filled fact statement about habit", "was filled yesterday", "fills", "必要义虚拟：be filled（be 用原形）。"],
    ["He insisted that he ___ the money. (他坚持说自己付了)", "had paid", "pay subjunctive demand", "be pay", "pays demand", "“坚持说”是事实主张，不用虚拟，用过去完成时 had paid。"],
    ["They demanded that the prisoner ___ free.", "be set", "is set fact habit", "was set yesterday done", "sets", "要求释放用虚拟：be set free。"]],
  ["Archaic & literary structures", "古雅与文学结构", "Were it not for…、Be that as it may——文学与演讲里的“古风”句式，要认得出、用得准。",
    "文学化结构：Were it not for（要不是）、Had it not been for、Be that as it may（尽管如此）、Come what may（无论发生什么）等凝固的倒装与虚拟。",
    "这类结构多为倒装条件句的省略版：Were it not for your help = If it were not for your help。lest + (should) do 表“以免”，多见于正式与文学文本。",
    "以 Had it not been for the rain, we would have won 为例：Had 提前代替 If…had not，整句立刻有了书面史诗感。",
    "Were it not for her, I'd have given up.", "要不是她，我早就放弃了。", "He hurried, lest he be late.", "他赶路，以免迟到。",
    "Were it not for（要不是，现在）", "Had it not been for（要不是，过去）",
    "If it was not for you, I would fail. (虚拟条件句时态)", "Were it not for you, I would fail.", "与现在事实相反，be 要用 were；倒装版 Were it not for 更书面。",
    "lest 后跟原形或 should + 原形", "Come what may 里 may 是凝固的虚拟残留",
    ["___ it not been for the doctor, he would have died.", "Had", "Has now fact", "Have plural", "Having participle only", "过去虚拟倒装：Had it not been for。"],
    ["She studied hard, lest she ___ behind.", "fall", "falls fact", "fell yesterday done", "falling", "lest 后用动词原形 fall（= in case she fell 的文学版）。"],
    ["___, I will finish the book this year.", "Come what may", "Comes what may fact", "Came what may yesterday", "Coming what may only", "固定句式 Come what may：无论发生什么。"],
    ["Be that as it ___, the data are clear.", "may", "might yesterday", "must fact", "is fact only", "固定句式 Be that as it may：尽管如此。"]],
  ["Cohesion: referencing & substitution at C2", "衔接精研：指代与替代", "the former/the latter、such、the one in question——长文不重复名词，全靠高级指代。",
    "C2 级衔接：用 the former/the latter 回指并列项，such + 名词表“这类”，do so/that of + 名词等结构在学术文中替代整段表述，读解与写作双向受益。",
    "指代必须可追溯：the former 指前者，the latter 指后者；that of/those of 用于比较（the population of China vs that of India）；such 可前置：Such behaviour is unacceptable.",
    "以 The salary of a teacher is lower than that of a doctor 为例：that 顶替 salary，避免重复且保持比较结构干净。",
    "Such delays harm the economy.", "这类延迟损害经济。", "He plans to emigrate, or so he says.", "他打算移民，至少他是这么说的。",
    "the former（前者）", "the latter（后者）",
    "The voice of the singer is better than the singer of the actor. (比较对象错位)", "The voice of the singer is better than that of the actor.", "比较的是“声音与声音”，演员的声音要用 that of the actor 指代。",
    "比较句里先对齐两边再选 that/those of", "such 顶替“这类+名词”时可放句首强调",
    ["The climate of Kunming is milder than ___ of Harbin.", "that", "it same city", "this city itself", "one city itself same", "气候与气候比，用 that 指代 climate。"],
    ["Of the two plans, ___ is cheaper but riskier.", "the latter", "the former first one", "that one first", "it first", "后者（第二个计划）：the latter。"],
    ["___ behaviour will not be tolerated.", "Such", "So a behaviour mass", "This such of it", "A such", "Such + 名词表“这种行为”，句首强调。"],
    ["She hopes to win a scholarship; ___, she works very hard.", "to this end", "the former thing", "such of it", "that of it", "“为此”用衔接短语 to this end，引出她为目标付出的行动。"]],
];

// 补齐各级课数所需的规格课
A2_TITLES.push(
  ["Conjunctions: and, but, because, so", "并列连词", "and 加信息、but 转折、because 给原因、so 给结果——四个连词撑起复合句。",
    "并列连词连接两个对等小句，标点为逗号加连词；because 从句不能单独成句（口语答句除外）。",
    "so 前多有逗号（结果）；because 可放句首（Because…, main）且主句前加逗号。口语里 because 的答句可省略主句。",
    "以 I stayed home because I was ill 为例：because 后面是原因从句，整句才完整；把 Because I was ill 单独成句就是病句。",
    "He is rich but unhappy.", "他有钱却不开心。", "It rained, so we stayed in.", "下雨了，我们就待在家里。",
    "because（原因在后）", "so（结果在后）",
    "Because it was late. (单独成句)", "Because it was late, we left.", "because 从句必须挂在主句上，不能独立成句（正式写作）。",
    "原因 because，结果 so，方向别反", "and 并列同类成分，but 前常有逗号",
    ["She was tired, ___ she went to bed early.", "so", "because of reason first", "but contrast", "and simply adds", "累是因，早睡是果：so。"],
    ["___ the bad weather, the flight was cancelled.", "Because of", "So that result clause", "But of", "And of", "because of + 名词短语表原因。"],
    ["He opened the window ___ let in some fresh air.", "to", "because of noun", "so that of is", "but", "开窗目的是放进新鲜空气，不定式 to 表目的最简洁。"],
    ["I like tea ___ coffee.", "and", "but contrast only", "so result only", "because reason", "并列同类喜好：and。"]],
  ["Past simple vs present perfect (bridge)", "过去时与完成时搭桥", "A2 收官辨析：just、already 上完成时；yesterday、ago 上过去时，先认信号再下笔。",
    "两种时态的交界地带：动作发生在过去，一个问“何时”，一个问“结果/经历”，信号词就是路牌。",
    "for/since 拉出时间段配完成时；ago 往回数配过去时。How long…? 问持续用完成时；When…? 问时间点用过去时。",
    "以 How long have you lived here? 对比 When did you move here? 为例：同样问居住，一个问时长（完成），一个问时点（过去）。",
    "I have lived here for ten years.", "我在这儿住了十年了。", "I moved here ten years ago.", "我十年前搬来的。",
    "for ten years（时长，完成时）", "ten years ago（时点，过去时）",
    "How long did you live here? (问仍住着的时长)", "How long have you lived here?", "人还住着、问持续时长，要用现在完成时。",
    "ago 出现必过去，for/since 出现必完成", "When 开头必过去，How long 开头必完成",
    ["She ___ her keys an hour ago.", "lost", "has lost ago", "is lose", "loses ago", "ago 是过去时信号：lost。"],
    ["We ___ each other since 2020.", "have known", "know ago", "knew", "are know", "since + 持续到现在：have known。"],
    ["___ have you been in this class?", "How long", "When exact time", "What time exact", "How much time ago point", "问持续时长：How long。"],
    ["He ___ just ___ his lunch.", "has / finished", "did / finished just always", "is / finishes", "does / finish", "just + 现在完成时：has finished。"]],
);
B1_TITLES.push(
  ["Indirect questions", "间接疑问句", "Could you tell me where the station is?——把问题套进礼貌的外壳，语序要变回来。",
    "间接疑问把问题嵌进大句子里，语气更礼貌正式：问路、咨询、邮件提问的标配。",
    "结构：引导句（Do you know / Could you tell me / I wonder）+ 疑问词 + 陈述语序（主语 + 谓语）。be 动词回位：where is it → where it is。yes/no 问句用 if/whether。",
    "以 Do you know where he lives? 为例：lives 跟在 he 后面，是陈述语序；写成 where does he live 就是双重倒装，错了。",
    "Could you tell me when the train leaves?", "能告诉我火车几点开吗？", "I wonder if she is free today.", "我想知道她今天是否有空。",
    "间接疑问：陈述语序", "直接疑问：倒装语序",
    "Do you know where is the bank?", "Do you know where the bank is?", "嵌入后要用陈述语序 the bank is，不能再倒装。",
    "外层礼貌，内层陈述", "没有疑问词的嵌入问句用 if/whether",
    ["Can you tell me ___?", "where the library is", "where is the library double inversion", "where does the library be", "the library is where place", "陈述语序：where the library is。"],
    ["I don't know ___ he wants.", "what", "what does he want double", "that what is", "what is he want", "嵌入从句陈述语序：what he wants，what 由横线承担。"],
    ["She asked me ___ I could help her.", "if", "that if of double", "do I can double", "what if is double", "一般疑问嵌入用 if：if I could help her。"],
    ["Do you know ___ the meeting starts?", "when", "when does it start double", "that when is", "when is it start", "when + 陈述语序：when the meeting starts。"]],
  ["Present perfect continuous (bridge)", "现在完成进行时搭桥", "I have been learning English for years——B1 先认脸：结构、信号和“状态动词禁用”。",
    "现在完成进行时强调“从过去持续到现在的过程”，常用来解释现在的样子（眼睛红、气喘、浑身湿）。",
    "have/has been + doing。信号：for/since/all day。状态动词 know/belong/like 不能用；动作未完成感强于完成时。",
    "以 Your hands are dirty. What have you been doing? 为例：现在的证据（手脏）反推刚才一直在做的事，这正是它的拿手好戏。",
    "It has been raining since noon.", "从中午起雨一直下。", "They have been playing for two hours.", "他们已经玩了两个小时了。",
    "has been doing（过程持续）", "has done（结果完成）",
    "I have been knowing him for years.", "I have known him for years.", "know 是状态动词，只能用 have known。",
    "先分清动作动词和状态动词", "解释“现在为什么这样”优先想它",
    ["She ___ English since 2019.", "has been learning", "is learn now", "learns yesterday", "learn yesterday", "从 2019 持续学到现在：has been learning。"],
    ["Why are you wet? — I ___ in the rain.", "have been walking", "am walk yesterday", "walks", "walk yesterday only", "浑身湿是“刚才一直在雨里走”的证据：have been walking。"],
    ["We ___ each other for a long time. (know)", "have known", "have been knowing", "are knowing", "knows", "know 是状态动词：have known。"],
    ["He ___ in this team since he was 15.", "has been playing", "plays yesterday only", "is play", "play last year", "持续到现在的活动：has been playing。"]],
  ["Requests & permission: could, may, would you", "请求与许可的礼貌梯度", "Can I…? Could I…? May I…? 礼貌一级比一级高，场合选对了才不失分。",
    "请求与许可的礼貌梯度：can（熟人随意）、could（客气）、may（正式）、Would you mind…?（最委婉，问“介不介意”）。",
    "May I…? 只用于第一人称提问许可；回答 May I 时不用 Yes, you may 的生硬版，可说 Sure / Of course。Would you mind + doing：回答“不介意”要说 Not at all（否定形式表肯定许可，最易踩坑）。",
    "以 Would you mind opening the window? — Not at all 为例：mind 问的是“介意吗”，说 Not at all 才是“开吧”。",
    "May I come in?", "我可以进来吗？", "Could I borrow your pen?", "我能借一下你的笔吗？",
    "Could you…?（请你做）", "Could I…?（请准我做）",
    "Would you mind to open the door?", "Would you mind opening the door?", "mind 后面跟动词要用 doing 形式。",
    "mind 的答句：Not at all = 请便", "may 提问只配 I/we 作主语问许可",
    ["___ I use your phone? (正式场合)", "May", "Mays I is", "Am may I", "May I is extra", "正式问许可：May I…?"],
    ["Would you mind ___ the music down?", "turning", "to turn must", "turns", "turned done", "mind 后跟 doing：turning。"],
    ["— Would you mind if I smoke here? — ___ (不介意)", "Not at all", "Yes, I mind a lot means refusal confusion", "Of course I mind means refusal", "Yes please do means confusion", "不介意要说 Not at all。"],
    ["___ you lend me ten yuan until tomorrow?", "Could", "Cans you is", "May you", "Are could you", "请对方帮忙：Could you…?"]],
);
B2_TITLES.push(
  ["Gerunds & infinitives: perfect forms", "动名词与不定式的完成式", "having done、to have done——动作有先后，形式就要留出“时间差”。",
    "完成式动名词/不定式表示动作先于主句：having finished（做完之后…）、to have done（已做成，常配似乎/据说）。",
    "having + 分词多作状语（Having read the letter, she cried）；seem/appear/is said + to have done 表推断的先时动作；regret doing 里 doing 本身靠语境读过去，完成式让先后更明确。",
    "以 He is said to have written the book at 16 为例：to have written 把“写”钉在“被说起”之前，年龄信息才成立。",
    "Having locked the door, he left.", "锁好门后他离开了。", "She seems to have forgotten the meeting.", "她好像把会忘了。",
    "to have done（不定式的完成式）", "to do（同步或之后）",
    "Having ate dinner, we went out.", "Having eaten dinner, we went out.", "完成式动名词要用过去分词 eaten，不是过去式 ate。",
    "先行动作：having done / to have done", "seem、be said 后常用 to have done 表推断的过去",
    ["___ the book twice, he knew it well.", "Having read", "Have read finite", "Reading only simultaneous weak", "Reads", "读过两遍（先）在前：Having read。"],
    ["The team is believed ___ the record last year.", "to have broken", "to break at same time as belief only", "breaks", "broke doer", "破纪录在“被认为”之前：to have broken。"],
    ["He denied ___ the money.", "having taken", "take yesterday finite", "to take", "takes", "否认做过的事，动名词完成式：having taken。"],
    ["I am glad ___ you at last.", "to have met", "meet at same time weak only", "meets", "met finite", "“终于见到你（已见）”的不定式完成式：to have met。"]],
  ["Participle clauses (preview)", "分词从句预习", "Written in haste, the essay…——B2 先学会读懂，再在 C1 系统练写。",
    "分词从句把定语或状语从句压缩成分词短语，阅读里先认结构：-ing 主动同时，-ed 被动，having done 先行。",
    "判定法：找分词短语的逻辑主语（=主句主语）。Written in haste = (which was) written…；Not knowing… 的否定把 not 放分词前。",
    "以 Surrounded by fans, the singer smiled 为例：surrounded 是“被包围”，主语 singer 是承受者，被动逻辑成立。",
    "Seen from the hill, the town looks small.", "从山上看，小镇显得很小。", "Not having a map, we asked for directions.", "没有地图，我们就问路。",
    "-ing（主动/同时）", "-ed（被动/状态）",
    "Opening the window, the wind blew in. (垂悬)", "When I opened the window, the wind blew in.", "opening 的主语不能是 wind，要么补主语从句，要么改主句主语为人。",
    "逻辑主语必须与主句主语同一个人", "否定 not 放分词短语最前面",
    ["___ in French, the letter puzzled me.", "Written", "Writing", "Writes", "Wrote doer", "信是被写的：Written。"],
    ["___ the noise, she woke up.", "Hearing", "Heard", "Hears", "Hearing is extra", "她主动听见：Hearing。"],
    ["___ finished the work, they left early.", "Having", "Have finite", "Has", "Had finite clause", "完成先后：Having finished。"],
    ["Which sentence has a dangling participle?", "Walking home, a dog followed me.", "Walking home, I met a dog.", "Tired, she rested.", "Built in 1900, the house stands.", "Walking 的主语不能是 a dog，第一句垂悬。"]],
  ["Reason & result linkers", "原因与结果衔接", "due to、owing to、as a result、therefore——因果链条的正式接法。",
    "正式因果衔接：due to/owing to/because of + 名词（原因状语），as a result/consequently/therefore + 结果句，thanks to 多用于积极原因。",
    "due to 作表语或状语有争议时，owing to 更稳；The reason…is that… 不能写 because（reason 与 because 语义重复）。so…that 是结果状语从句（程度导致结果）。",
    "以 The delay was due to fog 为例：due to + 名词 fog，整句的主语是 delay，“原因”成了表语的一部分。",
    "Thanks to your help, we finished early.", "多亏你帮忙，我们提前完成了。", "The flight was cancelled; as a result, we stayed overnight.", "航班取消，结果我们住了一晚。",
    "thanks to（积极原因）", "due to（中性原因）",
    "The reason why he left is because he was ill.", "The reason why he left is that he was ill.", "reason…is that… 是标准搭配，because 与 reason 重复。",
    "名词性原因：due to/owing to/because of", "reason 句型永远配 that 不配 because",
    ["The match was put off ___ the snow.", "due to", "because clause needed", "so that result clause", "therefore", "due to + 名词 the snow。"],
    ["He failed the exam; ___, he changed his study habits.", "as a result", "due to noun needed", "owing to noun needed", "thanks to person only", "结果另起：as a result。"],
    ["___ the new bridge, travel time fell sharply.", "Thanks to", "Due of", "Owing of", "As a result of alone no verb", "积极原因且接名词：Thanks to。"],
    ["She was ___ tired that she fell asleep at the desk.", "so", "such a noun needed", "too much of", "very much of", "so…that 结果结构：so tired that…"]],
  ["Future forms: nuance review", "将来形式辨析收官", "will、going to、现在进行时表将来、今后还会碰上将来完成——一张图收全。",
    "四种将来形式分工：will（临时决定/承诺/预测）、going to（计划/征兆）、现在进行时（已定安排，带时间地点已落实）、将来完成时（到时已完成）。",
    "选择路径：先问“决定时机”（当场→will；早定→going to/进行时），再问“完成视角”（by 将来点→will have done）。时刻表事件可用一般现在时（The train leaves at 6）。",
    "以 Watch out! You're going to drop it（有征兆）对比 I'll catch it（当场反应）为例：同一秒里，一个是预判，一个是决定。",
    "We are meeting the clients at 3 tomorrow.", "我们明天下午三点见客户（已约）。", "The term starts on 2 September.", "学期 9 月 2 日开始（时刻表）。",
    "现在进行时表将来（安排已定）", "一般现在时表将来（时刻表）",
    "I will meet John for lunch tomorrow; we booked the table last week. (安排已落实时 will 不地道)", "I'm meeting John for lunch tomorrow; we booked the table last week.", "桌已订好是落实的安排，用现在进行时最地道。",
    "征兆判断 going to，当场决定 will", "时刻表是一般现在时的地盘",
    ["A: I've decided to lose weight. B: I ___ you a diet plan now. (当场承诺帮）", "will make", "am making", "make yesterday", "makes", "当场决定帮忙：will make。"],
    ["Look at the queue! We ___ late.", "are going to be", "will to be form", "be late yesterday", "is being", "根据眼前征兆判断：going to。"],
    ["The flight ___ at 06:40 tomorrow.", "leaves", "will be leave form", "is leave", "leave yesterday", "航班时刻表：一般现在时 leaves。"],
    ["By this time next month, I ___ in my new job for a week.", "will have been", "am be arrangement", "be yesterday", "is being", "到时累计满一周，将来完成进行时：will have been（后接 working 等，此处结构判断选第一项）"]],
);
C1_TITLES.push(
  ["Mandative patterns in depth", "要求类句型深研", "demand、require、propose 的宾语从句：should 该不该留，美式英式各表一枝。",
    "要求类动词深研：suggest/insist 的双义判读、propose 的三种宾语（doing/to do/that 从句）、recommend 的结构选择。",
    "propose doing（提议大家一起做）/ propose to do（自己打算）/ propose that…（正式提案）。suggest 后不直接跟人 + to do：不能说 suggest him to go，要 suggest that he go / suggest his going。",
    "以 He suggested that the meeting be postponed 为例：建议义 + 虚拟 be postponed，是公文与学术的常见句式。",
    "We propose that a committee be formed.", "我们提议成立一个委员会。", "She recommended the book to us.", "她把这本书推荐给我们。",
    "suggest that sb do（建议）", "suggest that sb did（暗示，事实）",
    "He suggested me to leave early.", "He suggested that I leave early. / He suggested my leaving early.", "suggest 不能跟“人 + to do”结构。",
    "propose 的三副面孔按宾语区分", "recommend 可跟 that 从句、doing、名词 + to 人",
    ["The committee proposed ___ the deadline.", "extending", "to extend", "extend that needed noun", "extends", "提议（大家）延长截止期：propose extending 更合委员会提案语境。"],
    ["I recommend ___ this route in winter.", "avoiding", "to avoid must form", "avoid that noun", "avoids", "recommend doing 是标准搭配。"],
    ["Witnesses suggested that the driver ___ asleep. (暗示：司机当时睡着了）", "had been", "be", "is demand", "sleeps demand", "“暗示事实”不用虚拟，用 had been 表当时状态。"],
    ["The chair proposed that a vote ___ taken at once.", "be", "is fact habit", "was yesterday done", "is being now", "提案虚拟：be taken。"]],
  ["Nominalisation in practice", "名词化实操", "把一整句压成一个名词短语——摘要、标题、图表注释的通用技术。",
    "名词化实操：动词链改写（decide→decision、fail to→failure to）、形容词名词化（important→importance）、用 of 短语补回逻辑关系。",
    "改写三步：找核心动词→换名词→用 of/by/for 把原主宾挂回去。标题里尤其常见：City's Decision to Expand Airport（决定扩建机场）。",
    "以 The rapid expansion of the city caused… 为例：一整句“城市迅速扩张”变成主语短语，后面的因果才装得下。",
    "Approval of the plan took weeks.", "方案的批准花了好几周。", "Her refusal to cooperate surprised us.", "她拒绝合作让我们吃惊。",
    "the decision to do（决定做某事）", "the decision of doing（结构错误）",
    "The government made a decision to build the road. (可名词化压缩的方向)", "The government decided to build the road. / The government's decision to build the road…", "名词化版把 decision 提升为核心名词，government 变所有格。",
    "名词化后别把逻辑主宾弄丢", "refuse 名词 refusal，fail 名词 failure，要背词族",
    ["'They rejected the offer.' → 'Their ___ of the offer…'", "rejection", "reject", "rejecting only participle", "rejected adjective", "reject 的名词是 rejection。"],
    ["Which headline uses nominalisation?", "City Announces Plan to Cut Taxes", "City Is Announcing That It Will Cut the Taxes of Citizens", "City Says: We Will Cut Taxes!", "Cut Taxes, City Said", "第一条把宣布与减税都压进名词短语，是典型标题名词化。"],
    ["'Prices rose sharply.' → 'There was a sharp ___ in prices.'", "rise", "rose past verb", "rising only", "risen participle", "There was a sharp rise in prices. rise 兼作名词。"],
    ["The ___ of the bridge took two years. (construct)", "construction", "constructing only verb form in slot weak", "constructs verb", "constructed adjective", "construct 的名词 construction 作主语。"]],
  ["Hedging in essays", "作文缓和语气", "The data prove… 太满，suggest 才对——学术作文的底气恰恰来自留有余地。",
    "缓和语气（hedging）是学术写作的标配：结论按证据强度分级动词（show/suggest/indicate/may reflect），避免全称断言。",
    "手段清单：情态 may/might/could；动词 tend to/seem/appear；副词 relatively/broadly；限定 in many cases/among younger users；被动 It is estimated that…",
    "以 Results suggest that sleep affects memory 为例：suggest 把结论强度标在“提示”档，审稿人挑不出以偏概全。",
    "This trend may reflect wider social change.", "这一趋势可能反映了更广泛的社会变化。", "Younger users tend to prefer short videos.", "年轻用户往往更喜欢短视频。",
    "suggest（提示，中等强度）", "prove（证明，最强慎用）",
    "Social media causes depression in all teenagers.", "Social media may contribute to depression in some teenagers.", "原句全称断言且因果过强，要用 may + some 缓和。",
    "全称词 all/always/never 是危险信号", "因果动词分级：cause > lead to > contribute to > be linked to",
    ["Which sentence is suitably hedged?", "Exercise improves mood in many people.", "Exercise always cures depression completely.", "Exercise will definitely fix everyone's mood.", "All exercisers are happy.", "many people + improves 是适度断言。"],
    ["Choose the weakest claim: 'The study ___ a link between sugar and mood.'", "suggests", "proves absolutely", "demonstrates conclusively", "confirms beyond doubt", "suggests 强度最弱、最缓和。"],
    ["'___ to some extent, the criticism is fair.'", "Arguably", "Argue verb form", "Argument noun", "Argued past", "Arguably 是缓和副词“可以说”。"],
    ["Smoking is ___ to lung cancer in numerous studies.", "linked", "caused by", "proven absolutely", "guaranteed", "be linked to 是标准的缓和因果表达。"]],
  ["Lexical cohesion", "词汇衔接", "同义替换、上下义、搭配链——段落不靠 and also 硬连，靠词汇自己织网。",
    "词汇衔接三件套：复现（关键词适度重复）、同义/近义替换（vehicle→car→it）、上下义词（fruit→apples and bananas）与固定搭配链（heavy rain / rain heavily）。",
    "替换要同指才成立；搭配是母语感的来源：make a decision（不 do）、heavy traffic、strong wind。写作检查时逐段标出指称链是否断裂。",
    "以 The committee rejected the proposal. The decision shocked investors 为例：decision 回指 rejected 这件事，名词化在这里充当衔接器。",
    "Prices rose sharply. The increase hit poor families hardest.", "物价飞涨，涨幅最伤穷人。", "He made a serious mistake.", "他犯了个严重错误。",
    "make a decision（对）", "do a decision（错）",
    "She gave me some strong advices.", "She gave me some strong advice.", "advice 不可数，不能加 s；strong advice 搭配成立。",
    "搭配先于语法：动词配哪个名词要背组", "替换词必须同指同类，别换丢了对象",
    ["Choose the natural collocation: '___ rain'.", "heavy", "strong", "big much", "thick", "雨的固定搭配是 heavy rain。"],
    ["Which word continues the chain: 'Vehicles… Cars… ___'", "They", "It singular mismatch", "This vehicle repeated only same word weak", "Which", "复数车辆链用 They 回指最自然。"],
    ["'commit a crime' 中 commit 换成下面哪个最接近？", "carry out", "do a decision", "make strongly", "perform a crime unusual", "commit ≈ carry out（实施），搭配链同义。"],
    ["Pick the collocation: '___ an effort'.", "make", "do an effort", "take an effort", "give an effort", "make an effort 是固定搭配。"]],
  ["Parallelism & sentence variety", "平行结构与句式多样性", "to read, to write, and speaking 是病句——平行结构要求同类形式排整齐。",
    "平行结构：并列成分形式一致（名词对名词、doing 对 doing、不定式对不定式），是演讲名句与高分作文的共同骨架。",
    "比较结构也讲平行：than 前后词性对应。句式多样性：长短交错、前置与分裂适度点缀，避免全段同一种主谓宾队形。",
    "以 I came, I saw, I conquered 为例：三段同形排队，节奏感就是说服力的一部分。",
    "She likes reading, writing, and drawing.", "她喜欢读、写、画。", "To see is to believe.", "眼见为实。（不定式对不定式）",
    "reading, writing, drawing（平行）", "reading, writing, and to draw（不平行）",
    "He is friendly, kind, and helps everyone.", "He is friendly, kind, and helpful.", "并列项应同为形容词，helps 是动词，破坏平行。",
    "并列先看词性，再看形式", "比较级 than 的两边也要对齐",
    ["Choose the parallel sentence:", "She enjoys swimming, cycling, and hiking.", "She enjoys swimming, cycling, and to hike.", "She enjoys to swim, cycling, and hiking.", "She enjoys swim, cycle, and hiking.", "三个 doing 排齐，第一句平行。"],
    ["'He wanted to rest, to eat, and ___ a film.'", "to watch", "watching break", "watched break", "watch break", "不定式链条保持 to watch。"],
    ["Which comparison is parallel?", "Reading is more fun than watching TV.", "Reading is more fun than to watch TV.", "To read is more fun than watch TV.", "Reading is more fun than watched TV.", "Reading 对 watching，形式平行。"],
    ["The job requires patience, accuracy, and ___.", "speed", "work quickly adverb phrase break", "quickly adverb break", "to be quick break", "三个名词排齐：speed。"]],
);

// ---------------- 语法目录装配（101 课） ----------------

function baseLesson(id: string): GrammarLesson {
  const found = BASE_GRAMMAR.find((l) => l.id === id);
  if (!found) throw new Error(`missing base lesson ${id}`);
  return found;
}

function assembleLevel(
  entries: (string | Spec)[],
  level: CefrLevel,
  prefix: string,
  titleOverrides: Record<number, string> = {},
): GrammarLesson[] {
  return entries.map((entry, i) => {
    const id = `${prefix}-${i + 1}`;
    if (typeof entry === "string") {
      const base = baseLesson(entry.replace("BASE:", ""));
      const withT = withTheory(base);
      return {
        ...withT,
        id,
        level,
        titleEn: titleOverrides[i] ?? withT.titleEn,
      };
    }
    return specToLesson(entry, level, id);
  });
}

const A1_ORDER: (string | Spec)[] = [
  "BASE:g-a1-1",
  A1_SPECS[0]!, A1_SPECS[1]!, A1_SPECS[2]!, A1_SPECS[3]!, A1_SPECS[4]!,
  A1_SPECS[5]!, A1_SPECS[6]!, A1_SPECS[7]!, A1_SPECS[8]!, A1_SPECS[9]!,
  "BASE:g-a1-2",
  A1_SPECS[10]!,
  "BASE:g-a1-3",
  A1_SPECS[11]!, A1_SPECS[12]!, A1_SPECS[13]!, A1_SPECS[14]!, A1_SPECS[15]!,
];

const GRAMMAR_101_ASSEMBLED: GrammarLesson[] = [
  ...assembleLevel(A1_ORDER, "A1", "g-a1", { 0: "To be & subject pronouns", 11: "Present simple", 13: "Present continuous" }),
  ...assembleLevel(A2_TITLES, "A2", "g-a2"),
  ...assembleLevel(B1_TITLES, "B1", "g-b1"),
  ...assembleLevel(B2_TITLES, "B2", "g-b2"),
  ...assembleLevel(C1_TITLES, "C1", "g-c1"),
  ...assembleLevel(C2_TITLES, "C2", "g-c2"),
];

// ---------------- 原站 A1 第 1 课测验原题（经作者授权翻译，本轮提取） ----------------
// 简单 20 题 + 中等 30 题 + 困难前 8 题，题干、选项、答案、解释全部来自原站提取，
// 解释由越南语忠实翻译；跨档重复的题是原站本身复用，照原样保留、不去重。
// 例外（2026-11-15 用户要求）：6 道「翻译成英语」题的题干原本给出越南语句子，
// 已按用户要求把越南语句子译成中文、指令改为「把中文翻译成英语」，选项与答案不变。
// 困难档共 28 题，本轮只提取到前 8 题（按原站顺序收录，构成见下方注释）；
// 其余 20 题尚未提取，继续标「原站题目待补」，不凭猜测补题。
// 困难档第 1 题与简单第 1 题的解释尾句在原站被浮动按钮遮住未看到，只收可见部分并在解释里标待补。
// 解释里反复出现的模板句统一译法（照原站说法，不增删）：
//   模板句A＝在现在时里，be 要按主语的数和人称来变化，而不是按离空格最近的名词来变化。
//   模板句B＝所选的动词形式表明，主语在现在时中正被介绍、被描述，或其状态正被确定。
//   模板句C＝这句句首需要一个代词作主语。所选代词的形式必须与句子所指的人或物相符。
//   模板句D＝读句子时，要先找准作主语的成分，再确定用 am、is 还是 are。
const L1_TA = "在现在时里，be 要按主语的数和人称来变化，而不是按离空格最近的名词来变化。";
const L1_TB = "所选的动词形式表明，主语在现在时中正被介绍、被描述，或其状态正被确定。";
const L1_TC = "这句句首需要一个代词作主语。所选代词的形式必须与句子所指的人或物相符。";
const L1_TD = "读句子时，要先找准作主语的成分，再确定用 am、is 还是 are。";

const A1_L1_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 20 题 ----
  { q: "把中文翻译成英语：我还不饿。", options: ["You am not hungry yet.", "She am not hungry yet.", "He am not hungry yet.", "I am not hungry yet."], answer: 3, explain: "否定只需要在 am 后面加 not。标准的缩略形式是 I'm not——英语里没有 amn't 这种形式。（原站这条解释的最后一句被浮动按钮遮住，尚未看到，待补。）", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：她是光中学校的学生。", options: ["She are a student at Quang Trung School.", "You is a student at Quang Trung School.", "I is a student at Quang Trung School.", "She is a student at Quang Trung School."], answer: 3, explain: `She 是第三人称单数，所以用 is；is 后面是作补语的名词短语。${L1_TA}`, difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：我的父母是岘港人。", options: ["My parents are from Da Nang.", "My parent are from Da Nang.", "My parents they are from Da Nang.", "My parents is from Da Nang."], answer: 0, explain: `复数主语搭配 are；be from + 地名这一短语用来表示籍贯。${L1_TD}`, difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：孩子们今天很兴奋。", options: ["The childs are very excited today.", "The children they are very excited today.", "The children are very excited today.", "The children is very excited today."], answer: 2, explain: `Children 是 child 的不规则复数形式，所以用 are，尽管这个词没有 -s 结尾。${L1_TD}`, difficulty: "简单", keepChoice: true },
  { q: "The preliminary findings ___ important.", options: ["am", "be", "are", "is"], answer: 2, explain: `句中 preliminary findings 的意思是“初步发现”，important 的意思是“重要的”。Findings 是复数名词，因此需要 are。${L1_TB}`, difficulty: "简单", keepChoice: true },
  { q: "选出正确的句子。", options: ["She and I am friends.", "She and I is friends.", "She and I are friends.", "She and I be friends."], answer: 2, explain: `这句话的意思是“She和我是朋友”。She and I 是复数主语，相当于 we，所以用 are。${L1_TD}`, difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：天很冷，已经快七点了。", options: ["It is cold and it is almost seven o'clock.", "You is cold and it is almost seven o'clock.", "I is cold and it is almost seven o'clock.", "It are cold and it is almost seven o'clock."], answer: 0, explain: `这里的 it 是形式主语，不指某个具体事物，用于天气、时间和日期。${L1_TA}`, difficulty: "简单", keepChoice: true },
  { q: "___ am eleven years old.", options: ["Me", "My", "I", "Mine"], answer: 2, explain: `只有 I 能与 am 搭配；me 是宾格代词，my 和 mine 表示所属。${L1_TC}`, difficulty: "简单", keepChoice: true },
  { q: "Lan and Minh ___ classmates.", options: ["am", "is", "are", "be"], answer: 2, explain: `这句话的意思是“Lan 和 Minh 是同班同学”。两个主语用 and 连接，构成复数主语。${L1_TA}`, difficulty: "简单", keepChoice: true },
  { q: "I ___ responsible for the summary.", options: ["is", "are", "be", "am"], answer: 3, explain: `I 是第一人称单数代词，所以 be 在现在时中变成 am。句中 the summary 的意思是“摘要”。${L1_TB}`, difficulty: "简单", keepChoice: true },
  { q: "选出正确的句子。", options: ["You is a student.", "She is a student.", "She are a student.", "I is a student."], answer: 1, explain: `这句话的意思是“她是一名学生”。She 是第三人称单数，所以用 is。${L1_TA}`, difficulty: "简单", keepChoice: true },
  { q: "The laboratory instruments ___ expensive.", options: ["am", "is", "are", "be"], answer: 2, explain: `句中 the laboratory 的意思是“实验室”，instruments 的意思是“仪器”。Instruments 是复数，所以搭配 are。${L1_TD}`, difficulty: "简单", keepChoice: true },
  { q: "I ___ not tired.", options: ["be", "is", "am", "are"], answer: 2, explain: `这句话的意思是“我不累”。否定句保留主语 I 的 am 形式，再加上 not。${L1_TB}`, difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：你的朋友们在图书馆吗？", options: ["Your friends at the library?", "Is your friends at the library?", "Are your friend at the library?", "Are your friends at the library?"], answer: 3, explain: `Are 提到主语 your friends 的前面，句子的其余部分语序保持不变。${L1_TB}`, difficulty: "简单", keepChoice: true },
  { q: "I ___ happy today.（be）", options: [], answer: 0, answerText: "am", baseWord: "be", sentence: "I am happy today.", explain: `主语 I 总是搭配 am。${L1_TA}`, difficulty: "简单", kind: "blank" },
  { q: "选出正确的句子。", options: ["They are ready.", "He am ready.", "We is ready.", "I is ready."], answer: 0, explain: `这句话的意思是“他们已经准备好了”。They 是复数主语，所以搭配 are。${L1_TD}`, difficulty: "简单", keepChoice: true },
  { q: "___ is my brother.", options: ["He", "They", "Him", "His"], answer: 0, explain: `主语位置需要主格代词 He；him 是宾格代词，his 是所属词。句中 my brother 的意思是“我的哥哥或弟弟”。${L1_TC}`, difficulty: "简单", keepChoice: true },
  { q: "The books ___ on the desk.", options: ["am", "be", "is", "are"], answer: 3, explain: `这句话的意思是“书在书桌上”。Books 是复数形式，所以用 are。${L1_TD}`, difficulty: "简单", keepChoice: true },
  { q: "选出正确的句子。", options: ["You is very kind.", "You am very kind.", "You are very kind.", "You be very kind."], answer: 2, explain: `这句话的意思是“你很善良”。You 总是搭配 are，即使只指一个人。${L1_TD}`, difficulty: "简单", keepChoice: true },
  { q: "The climate report ___ available online.", options: ["be", "are", "am", "is"], answer: 3, explain: `The climate report 的中心名词 report 是单数，因此用 is。句中 the climate 的意思是“气候”，available 的意思是“可以获得的”。${L1_TD}`, difficulty: "简单", keepChoice: true },
  // ---- 中等 30 题 ----
  { q: "The criteria for selection ___ clear to all applicants.（be）", options: [], answer: 0, answerText: "are", baseWord: "be", sentence: "The criteria for selection are clear to all applicants.", explain: `Criteria 是 criterion 的复数形式，所以需要 are；criteria 的意思是“标准”，clear 的意思是“清楚的”。${L1_TA}`, difficulty: "中等", kind: "blank" },
  { q: "The research team published its report in March. ___ is based in Hanoi.", options: ["She", "It", "They", "He"], answer: 1, explain: "The research team 是一个单独的团队，被看作单数主语。It 用来代替这个名词；需要确定被代替的名词以及它在句中的作用。", difficulty: "中等", keepChoice: true },
  { q: "You ___ an excellent researcher.", options: ["am", "is", "be", "are"], answer: 3, explain: `You 总是搭配 are，即使只指一个人。${L1_TA}`, difficulty: "中等", keepChoice: true },
  { q: "Our research supervisor ___ at the conference.", options: ["be", "am", "are", "is"], answer: 3, explain: `Supervisor 是一个 人，相当于 he/she，所以用 is。句中 conference 的意思是“会议”，supervisor 的意思是“指导者”。${L1_TA}`, difficulty: "中等", keepChoice: true },
  { q: "The consequences ___ serious.", options: ["are", "am", "is", "be"], answer: 0, explain: `Consequences 是复数名词，所以用 are。${L1_TD}`, difficulty: "中等", keepChoice: true },
  { q: "The quality of the results ___ satisfactory.", options: ["are", "am", "is", "be"], answer: 2, explain: `Quality 是单数的中心名词，不按 results 来变化。${L1_TB}`, difficulty: "中等", keepChoice: true },
  { q: "The author and the editor ___ colleagues.", options: ["is", "am", "be", "are"], answer: 3, explain: `两个人用 and 连接，构成复数主语。句中 editor 的意思是“编辑”。${L1_TD}`, difficulty: "中等", keepChoice: true },
  { q: "This hypothesis ___ difficult to test in the field.（be）", options: [], answer: 0, answerText: "is", baseWord: "be", sentence: "This hypothesis is difficult to test in the field.", explain: `Hypothesis 是单数名词；这句话用 it 作形式主语，来谈这个假设的性质。${L1_TD}`, difficulty: "中等", kind: "blank" },
  { q: "The findings ___ consistent with earlier research.（be）", options: [], answer: 0, answerText: "are", baseWord: "be", sentence: "The findings are consistent with earlier research.", explain: `Findings 是复数名词，所以用 are。${L1_TD}`, difficulty: "中等", kind: "blank" },
  { q: "My mother ___ a doctor.（be）", options: [], answer: 0, answerText: "is", baseWord: "be", sentence: "My mother is a doctor.", explain: `My mother 是单数名词，相当于 she，所以用 is。${L1_TA}`, difficulty: "中等", kind: "blank" },
  { q: "The preliminary findings ___ important.", options: ["be", "is", "am", "are"], answer: 3, explain: `句中 preliminary findings 的意思是“初步发现”，important 的意思是“重要的”。Findings 是复数名词，因此需要 are。${L1_TB}`, difficulty: "中等", keepChoice: true },
  { q: "选出正确的句子。", options: ["The level of air pollution is alarming.", "The level of air pollutions are alarming.", "The level of air pollution are alarming.", "The levels of air pollution is alarming."], answer: 0, explain: `这句话的意思是“空气污染的程度到了令人担忧的地步”。真正的主语是 the level，单数；of air pollution 只是修饰短语。${L1_TB}`, difficulty: "中等", keepChoice: true },
  { q: "Researchers in this field ___ rarely in full agreement.（be）", options: [], answer: 0, answerText: "are", baseWord: "be", sentence: "Researchers in this field are rarely in full agreement.", explain: `句中 in full agreement 的意思是“完全一致”，researchers 的意思是“研究者”。主语是 researchers，复数，所以用 are。${L1_TA}`, difficulty: "中等", kind: "blank" },
  { q: "We ___ at school.（be）", options: [], answer: 0, answerText: "are", baseWord: "be", sentence: "We are at school.", explain: `We 是复数主语，所以用 are。${L1_TB}`, difficulty: "中等", kind: "blank" },
  { q: "The publication date ___ not correct.", options: ["am", "are", "is", "be"], answer: 2, explain: `Publication date 是一个单独的日期，也就是单数名词短语。句中 correct 这个词的意思是“正确的”。${L1_TB}`, difficulty: "中等", keepChoice: true },
  { q: "The evidence from both surveys ___ inconclusive.（be）", options: [], answer: 0, answerText: "is", baseWord: "be", sentence: "The evidence from both surveys is inconclusive.", explain: `Evidence 是不可数名词；在一般现在时中，这个主语搭配 is，尽管它后面跟着 from both surveys 这一短语。${L1_TB}`, difficulty: "中等", kind: "blank" },
  { q: "I ___ responsible for the summary.", options: ["are", "is", "be", "am"], answer: 3, explain: `I 是第一人称单数代词，所以 be 在现在时中变成 am。句中 the summary 的意思是“摘要”。${L1_TB}`, difficulty: "中等", keepChoice: true },
  { q: "It ___ cold this morning.（be）", options: [], answer: 0, answerText: "is", baseWord: "be", sentence: "It is cold this morning.", explain: `It 是第三人称单数；谈论天气的句子使用形式主语 it。${L1_TD}`, difficulty: "中等", kind: "blank" },
  { q: "The laboratory instruments ___ expensive.", options: ["be", "are", "am", "is"], answer: 1, explain: `句中 the laboratory 的意思是“实验室”，instruments 的意思是“仪器”。Instruments 是复数，所以搭配 are。${L1_TD}`, difficulty: "中等", keepChoice: true },
  { q: "The climate summary ___ accessible online.", options: ["are", "be", "is", "am"], answer: 2, explain: `The climate summary 的中心名词 summary 是单数，因此用 is。句中 the climate 的意思是“气候”，accessible 的意思是“可以获取的”。${L1_TD}`, difficulty: "中等", keepChoice: true },
  { q: "Rising sea levels ___ a threat to the whole delta.（be）", options: [], answer: 0, answerText: "are", baseWord: "be", sentence: "Rising sea levels are a threat to the whole delta.", explain: `句中 the whole delta 的意思是“整个三角洲”，sea levels 的意思是“海平面”。主语是复数短语 rising sea levels，所以用 are。${L1_TD}`, difficulty: "中等", kind: "blank" },
  { q: "The initial observations ___ important.", options: ["be", "are", "am", "is"], answer: 1, explain: `句中 observations 的意思是“观察结果”，important 的意思是“重要的”。Observations 是复数名词，因此需要 are。${L1_TB}`, difficulty: "中等", keepChoice: true },
  { q: "___ this assumption correct?", options: ["Is", "Be", "Are", "Am"], answer: 0, explain: `This assumption 是单数；把 Is 提到主语前面来提问。句中 correct 这个词的意思是“正确的”。${L1_TB}`, difficulty: "中等", keepChoice: true },
  { q: "The amount of funding ___ limited.", options: ["is", "am", "are", "be"], answer: 0, explain: `这句话的意思是“资助的金额是有限的”。Amount 是单数的中心名词，不按 funding 来变化。${L1_TA}`, difficulty: "中等", keepChoice: true },
  { q: "___ the results reliable?", options: ["Am", "Are", "Be", "Is"], answer: 1, explain: `主语为 the results（复数）的疑问句以 Are 开头。句中 the results 的意思是“结果”，reliable 的意思是“可靠的”。${L1_TA}`, difficulty: "中等", keepChoice: true },
  { q: "Both authors declined to comment. ___ are currently abroad.", options: ["She", "They", "It", "He"], answer: 1, explain: `句中 authors 这个词的意思是“作者”。Both authors 是两个人，所以用 They 来代替。${L1_TC}`, difficulty: "中等", keepChoice: true },
  { q: "The evidence ___ convincing.", options: ["are", "am", "is", "be"], answer: 2, explain: `句中 the evidence 的意思是“证据”。Evidence 是不可数名词；主语在这个句子里具有单数的意义。${L1_TA}`, difficulty: "中等", keepChoice: true },
  { q: "The climate report ___ available online.", options: ["am", "be", "is", "are"], answer: 2, explain: `The climate report 的中心名词 report 是单数，因此用 is。句中 the climate 的意思是“气候”，available 的意思是“可以获得的”。${L1_TD}`, difficulty: "中等", keepChoice: true },
  { q: "The reviewers ___ not satisfied.", options: ["is", "are", "am", "be"], answer: 1, explain: `Reviewers 是复数名词；在 are 后面加 not 来构成否定。句中 not satisfied 的意思是“不满意”，reviewers 的意思是“审稿人”。${L1_TD}`, difficulty: "中等", keepChoice: true },
  { q: "My colleagues and I ___ ready.", options: ["are", "am", "be", "is"], answer: 0, explain: `句中 ready 这个词的意思是“准备好了”。My colleagues and I 是复数主语，相当于 we。${L1_TA}`, difficulty: "中等", keepChoice: true },
  // ---- 困难：已提取前 8 题（原站共 28 题，其余 20 题待补） ----
  // 构成与顺序以浏览器本轮提取为准：8 题全部与中等档同题（跨档复用），照原样收录、不去重；
  // 选项顺序与解释措辞以困难档版本为准，与中等档版本不同处不合并。
  { q: "___ this assumption correct?", options: ["Are", "Am", "Be", "Is"], answer: 3, explain: "This assumption 是单数；把 Is 提到主语前面来提问。句中 correct 的意思是“正确的”。（原站这条解释的最后一句被浮动按钮遮住，尚未看到，尾句待补。）", difficulty: "困难", keepChoice: true },
  { q: "选出正确的句子。", options: ["The level of air pollution are alarming.", "The levels of air pollution is alarming.", "The level of air pollutions are alarming.", "The level of air pollution is alarming."], answer: 3, explain: `这句话的意思是“空气污染的程度正处于令人担忧的水平”。真正的主语是 the level，单数；of air pollution 只是补充修饰的短语。${L1_TB}`, difficulty: "困难", keepChoice: true },
  { q: "Rising sea levels ___ a threat to the whole delta.（be）", options: [], answer: 0, answerText: "are", baseWord: "be", sentence: "Rising sea levels are a threat to the whole delta.", explain: `句中 the whole delta 的意思是“整个三角洲”，sea levels 的意思是“海平面”。主语是复数短语 rising sea levels，所以用 are。${L1_TD}`, difficulty: "困难", kind: "blank" },
  { q: "Researchers in this field ___ rarely in full agreement.（be）", options: [], answer: 0, answerText: "are", baseWord: "be", sentence: "Researchers in this field are rarely in full agreement.", explain: `句中 in full agreement 的意思是“完全意见一致”，researchers 的意思是“研究者”。主语是 researchers，复数，所以用 are。${L1_TA}`, difficulty: "困难", kind: "blank" },
  { q: "The quality of the results ___ satisfactory.", options: ["are", "am", "be", "is"], answer: 3, explain: `句中 the quality of the results 的意思是“这些结果的质量”。主语的中心词是 quality（单数），不是 results。${L1_TB}`, difficulty: "困难", keepChoice: true },
  { q: "The consequences ___ serious.", options: ["is", "are", "be", "am"], answer: 1, explain: `Consequences 是复数形式，所以搭配 are。${L1_TA}`, difficulty: "困难", keepChoice: true },
  { q: "My mother ___ a doctor.（be）", options: [], answer: 0, answerText: "is", baseWord: "be", sentence: "My mother is a doctor.", explain: `My mother 是单数名词，相当于 she，所以用 is。${L1_TA}`, difficulty: "困难", kind: "blank" },
  { q: "The author and the editor ___ colleagues.", options: ["am", "is", "be", "are"], answer: 3, explain: `两个人用 and 连接，构成复数主语。句中 the editor 的意思是“编辑”。${L1_TD}`, difficulty: "困难", keepChoice: true },
];

// ---------------- 原站 A1 第 2、3 课提取内容（经作者授权翻译） ----------------
// 只收录提取时已完整给出的内容；原站未给出完整选项的题目不进题库，
// 在下方「待补清单」注释里标明，等提取回完整选项与解释后再补，不自行编造。

const A1_L2_Q1_BLANK: QuizQuestion = {
  q: "I have something important to say. Please listen to ___.",
  options: [],
  answer: 0,
  answerText: "me",
  baseWord: "指说话人、作宾语的词",
  sentence: "I have something important to say. Please listen to me.",
  explain: "important 意为“重要的”。说话人指自己，而介词 to 后面要用宾格 me。宾格代词替代句中已确定的人或物，避免重复其名称。",
  difficulty: "简单",
  kind: "blank",
};

// 原站第 2 课简单档另核对的 19 道选择题。题序是本次重做时的呈现顺序；
// 原站会随机排列，故不以显示序号推断原始题库顺序。
const A1_L2_EASY_CHOICES: QuizQuestion[] = [
  { q: "Anna calls ___ every evening.", options: ["me", "mine", "I", "my"], answer: 0, explain: "动词 calls 后要用宾格 me。every evening 意为“每天晚上”。宾格代词替代句中已确定的人或物，避免重复其名称。", difficulty: "简单", keepChoice: true },
  { q: "This invitation is for ___.", options: ["she", "her", "herself", "hers"], answer: 1, explain: "介词 for 后要用宾格 her。宾格代词替代句中已确定的人或物，避免重复其名称。", difficulty: "简单", keepChoice: true },
  { q: "Can you help ___ with this chart?", options: ["I", "my", "mine", "me"], answer: 3, explain: "说话人在 help 后作宾语，因此用 me。宾格代词替代句中已确定的人或物，避免重复其名称。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：狗渴了。给它一点水。", options: ["The dog are thirsty. Give it some water.", "The dog is thirsty. Give it some waters.", "The dog is thirsty. Give it some water.", "The dog it is thirsty. Give it some water."], answer: 2, explain: "不强调性别时，动物或物品通常用 it 指代；it 的宾格与主格同形。宾格代词替代句中已确定的人或物，避免重复其名称。", difficulty: "简单", keepChoice: true },
  { q: "This gift is for ___.", options: ["she", "herself", "her", "hers"], answer: 2, explain: "for 是介词，后面要用宾格 her。动词或介词后面是宾语位置，代词形式要与这个功能相符。", difficulty: "简单", keepChoice: true },
  { q: "The analysts know Professor Mai. They often consult ___.", options: ["herself", "she", "hers", "her"], answer: 3, explain: "analysts 意为“分析人员”，often 意为“经常”。Professor Mai 是被咨询的人，consult 后用 her。要判断提到的是谁，以及这个人在句中作主语还是宾语。", difficulty: "简单", keepChoice: true },
  { q: "The report belongs to Nam. Please return it to ___.", options: ["himself", "him", "his", "he"], answer: 1, explain: "the report 意为“报告”。to 后面用宾格 him 指代 Nam。要判断提到的是谁，以及这个人在句中作主语还是宾语。", difficulty: "简单", keepChoice: true },
  { q: "The supervisor asked ___ to check the bibliography.", options: ["us", "our", "we", "ours"], answer: 0, explain: "bibliography 意为“参考文献目录”，supervisor 意为“指导老师”。asked 后要用宾格 us。宾格代词替代句中已确定的人或物，避免重复其名称。", difficulty: "简单", keepChoice: true },
  { q: "The editor invited Lan and ___ to the discussion.", options: ["I", "mine", "my", "me"], answer: 3, explain: "Lan and me 作 invited 的宾语，I 要变成 me。discussion 意为“讨论”，editor 意为“编辑”。要判断提到的是谁，以及这个人在句中作主语还是宾语。", difficulty: "简单", keepChoice: true },
  { q: "I visit my grandparents every Sunday. → I visit ___ every Sunday.", options: ["their", "them", "theirs", "they"], answer: 1, explain: "my grandparents 作 visit 的宾语，因此用 them 替代。my grandparents 意为“我的祖父母”，every Sunday 意为“每个星期日”。动词或介词后的宾语位置要使用相应的宾格形式。", difficulty: "简单", keepChoice: true },
  { q: "选出正确的句子。", options: ["I see he every morning.", "I is see him every morning.", "I him see every morning.", "I see him every morning."], answer: 3, explain: "这句话意为“我每天早上都见到他”。he 是主格；动词 see 后面用宾格 him。宾格代词替代句中已确定的人或物，避免重复其名称。", difficulty: "简单", keepChoice: true },
  { q: "Please send ___ the results.", options: ["me", "I", "mine", "my"], answer: 0, explain: "send 后可以先接间接宾语，再接 the results（结果），因此用宾格 me。要判断指的是谁，以及这个人在句中作主语还是宾语。", difficulty: "简单", keepChoice: true },
  { q: "The instrument is damaged. We cannot use ___ today.", options: ["it", "they", "them", "its"], answer: 0, explain: "instrument 意为“仪器”，today 意为“今天”。it 代替单数的 the instrument 作 use 的宾语。动词或介词后的宾语位置要使用相应的宾格形式。", difficulty: "简单", keepChoice: true },
  { q: "Our mentor often encourages ___.", options: ["our", "us", "we", "ours"], answer: 1, explain: "encourages 后面需要宾语，因此用 us。often 意为“经常”。动词或介词后的宾语位置要使用相应的宾格形式。", difficulty: "简单", keepChoice: true },
  { q: "This message is for ___.", options: ["herself", "she", "her", "hers"], answer: 2, explain: "介词 for 后面用宾格 her。要判断指的是谁，以及这个人在句中作主语还是宾语。", difficulty: "简单", keepChoice: true },
  { q: "I know the two scientists. I often meet ___ at conferences.", options: ["them", "they", "theirs", "their"], answer: 0, explain: "often 意为“经常”。them 代替 the two scientists 作 meet 的宾语。宾格代词替代句中已确定的人或物，避免重复其名称。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：请听我说一会儿。", options: ["Listening to me for a moment.", "Please listen to me for a moments.", "Please listen to I for a moment.", "Please listen to me for a moment."], answer: 3, explain: "表示“听”时 listen 后要接 to，介词 to 后用宾格 me。要判断指的是谁，以及这个人在句中作主语还是宾语。", difficulty: "简单", keepChoice: true },
  { q: "The teacher is speaking to Nam and me. She is speaking to ___.", options: ["our", "we", "us", "ours"], answer: 2, explain: "the teacher 意为“老师”。Nam and me 合起来用 us 代替，仍在介词 to 后作宾语。动词或介词后的宾语位置要使用相应的宾格形式。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：我的老师每节课后都会帮助我们。", options: ["My teacher after every lesson helps us.", "My teacher is helps us after every lesson.", "My teacher helps us after every lesson.", "My teacher helps we after every lesson."], answer: 2, explain: "us 是 helps 的直接宾语，不能在这里使用仅作主语的 we。动词或介词后的宾语位置要使用相应的宾格形式。", difficulty: "简单", keepChoice: true },
];

// ---------------- 原站 A1 第 2 课困难测验原题（经作者授权翻译，本轮提取） ----------------
// 困难原站共 29 题，本轮收录 27 题：第 5、25 题完整选项未提取，不进题库，
// 只记已知内容在下方「待补清单」里，不编选项。题干、选项、答案、解析全部来自原站提取；
// 答案一律按答案文字定位（提取报告里的字母按九宫格位置标，与选项顺序对不上）。
// 跨题重复是原站本身复用（第 9/16 题、第 14/18 题同题干），照原样保留、不去重；
// 第 19 题原站就有两个 him 选项，原样保留，答案是第 4 个。
// 第 13 题原站题干写 catalogue、解析写 database，是原站自己的表述不一致，照实收录；
// 第 28 题题干 Dr bao 的小写也是原站原样。
// 简单档现有 1 道填空与 19 道选择题；中等档尚未提取。
const A1_L2_HARD_QUESTIONS: QuizQuestion[] = [
  { q: "This note is from my supervisor. I want to thank ___.", options: ["himself", "his", "him", "he"], answer: 2, explain: "thank 后面接宾格 him，指上司。", difficulty: "困难", keepChoice: true },
  { q: "Our adviser often encourages ___.", options: ["we", "ours", "us", "our"], answer: 2, explain: "often 意为「经常」；encourages 后面接宾格 us。", difficulty: "困难", keepChoice: true },
  { q: "把中文翻译成英语：妈妈给 Hoa 和我做了午饭。", options: ["Mum made lunch for Hoa and I.", "Mum did made lunch for Hoa and me.", "Mum is made lunch for Hoa and me.", "Mum made lunch for Hoa and me."], answer: 3, explain: "and 连接的并列成分都要用宾格：for Hoa and me，不能用 I。", difficulty: "困难", keepChoice: true },
  { q: "Mai likes Tom, but Tom does not like ___.（her）", options: [], answer: 0, answerText: "her", baseWord: "her", sentence: "Mai likes Tom, but Tom does not like her.", explain: "Mai 是女性，宾格是 her。", difficulty: "困难", kind: "blank" },
  { q: "The database is offline. Please check ___ again.", options: ["their", "its", "they", "it"], answer: 3, explain: "it 代替单数的 database（「数据库」）。", difficulty: "困难", keepChoice: true },
  { q: "The specialists know Dr Lan. They often consult ___.", options: ["her", "she", "hers", "herself"], answer: 0, explain: "Dr Lan 是被咨询的人，consult 后面接 her。", difficulty: "困难", keepChoice: true },
  { q: "The report named three policymakers and criticised ___ by name.（them）", options: [], answer: 0, answerText: "them", baseWord: "them", sentence: "The report named three policymakers and criticised them by name.", explain: "policymakers 是复数宾格；policymakers 意为「政策制定者」，the report 意为「报告」。", difficulty: "困难", kind: "blank" },
  { q: "The reviewer invited Lan and ___ to the discussion.", options: ["me", "I", "mine", "my"], answer: 0, explain: "Lan and me 都是 invited 的宾语；reviewer 意为「评审人」，discussion 意为「讨论」。", difficulty: "困难", keepChoice: true },
  { q: "把中文翻译成英语：我找不到我的钥匙。你看到它们了吗？", options: ["I cannot find my keys. Have you seen them?", "I cannot find my keys. Has you seen them?", "I cannot find my keys. You Have seen them?", "I cannot find my key. Have you seen them?"], answer: 0, explain: "them 代替 my keys。", difficulty: "困难", keepChoice: true },
  { q: "I work with Dr Minh. I trust ___.", options: ["he", "his", "him", "himself"], answer: 2, explain: "Dr Minh 是 trust 的宾语。", difficulty: "困难", keepChoice: true },
  { q: "The results are public. Everyone can read ___.", options: ["theirs", "them", "they", "their"], answer: 1, explain: "results 是复数宾语；the results 意为「结果」。", difficulty: "困难", keepChoice: true },
  { q: "The catalogue is offline. Please check ___ again.", options: ["their", "its", "they", "it"], answer: 3, explain: "it 代替单数名词；注意：原站题干写的是 catalogue，解释里写的是 database，原站自己的表述不一致，照实记录。online 意为「在网上」。", difficulty: "困难", keepChoice: true },
  { q: "Anna and I are preparing a presentation. They asked ___ to present it online.", options: ["us", "ours", "our", "we"], answer: 0, explain: "ask 后面接宾格 us；a presentation 意为「演讲」。", difficulty: "困难", keepChoice: true },
  { q: "My colleague is absent. I need to call ___.", options: ["she", "her", "hers", "herself"], answer: 1, explain: "call 是及物动词，后面接 her。", difficulty: "困难", keepChoice: true },
  { q: "The reviewer invited Lan and ___ to the discussion.", options: ["my", "me", "mine", "I"], answer: 1, explain: "与第 9 题同题干，Lan and me 是 invited 的宾语。", difficulty: "困难", keepChoice: true },
  { q: "Please send ___ the findings.", options: ["I", "me", "mine", "my"], answer: 1, explain: "send 后面可以直接接间接宾语；the findings 意为「研究发现」。", difficulty: "困难", keepChoice: true },
  { q: "Anna and I are preparing a presentation. They asked ___ to present it online.", options: ["we", "our", "ours", "us"], answer: 3, explain: "与第 14 题同题干，ask 后面接宾格 us。", difficulty: "困难", keepChoice: true },
  { q: "This note is from my mentor. I want to thank ___.", options: ["him", "his", "he", "him"], answer: 3, explain: "thank 后面接宾格 him。", difficulty: "困难", keepChoice: true },
  { q: "The mentor asked ___ to check the bibliography.", options: ["we", "ours", "our", "us"], answer: 3, explain: "asked 后面接宾格 us；the bibliography 意为「参考文献目录」。", difficulty: "困难", keepChoice: true },
  { q: "I need some help. Can you help ___ ?（me）", options: [], answer: 0, answerText: "me", baseWord: "me", sentence: "I need some help. Can you help me?", explain: "some 意为「一些」；I 作主语，help 后面作宾语变成 me。", difficulty: "困难", kind: "blank" },
  { q: "The hypothesis was plausible, so the team tested ___ twice.（it）", options: [], answer: 0, answerText: "it", baseWord: "it", sentence: "The hypothesis was plausible, so the team tested it twice.", explain: "the hypothesis 意为「假设」，plausible 意为「有道理的」；单数宾语 → it。", difficulty: "困难", kind: "blank" },
  { q: "Can you help ___ with this diagram?", options: ["I", "me", "mine", "my"], answer: 1, explain: "help 后面说话人作宾语。", difficulty: "困难", keepChoice: true },
  { q: "The findings are public. Everyone can read ___.", options: ["their", "them", "they", "theirs"], answer: 1, explain: "findings 是复数宾语。", difficulty: "困难", keepChoice: true },
  { q: "The device is damaged, so I cannot use ___ today.", options: ["they", "their", "it", "theirs"], answer: 2, explain: "today 意为「今天」；it 代替单数的 the device 作宾语。", difficulty: "困难", keepChoice: true },
  { q: "Fifty participants enrolled and the researchers interviewed ___ in pairs.（them）", options: [], answer: 0, answerText: "them", baseWord: "them", sentence: "Fifty participants enrolled and the researchers interviewed them in pairs.", explain: "the researchers 意为「研究人员」，participants 意为「参与者」；interviewed 的宾语，复数 → them。", difficulty: "困难", kind: "blank" },
  { q: "I work with Dr bao. I trust ___.", options: ["him", "his", "he", "himself"], answer: 0, explain: "Dr bao 是 trust 的宾语。", difficulty: "困难", keepChoice: true },
  { q: "The summary belongs to Nam. Please return it to ___.", options: ["his", "he", "him", "himself"], answer: 2, explain: "to 后面接宾格 him，指 Nam；the summary 意为「摘要」。", difficulty: "困难", keepChoice: true },
];

const A1_L3_Q4_BLANK: QuizQuestion = {
  q: "One woman, two ___.（woman）",
  options: [],
  answer: 0,
  answerText: "women",
  baseWord: "woman",
  sentence: "One woman, two women.",
  explain: "woman 的复数是不规则形式 women。",
  difficulty: "简单",
  kind: "blank",
};

const A1_L3_Q15_BLANK: QuizQuestion = {
  q: "three ___（box）",
  options: [],
  answer: 0,
  answerText: "boxes",
  baseWord: "box",
  sentence: "three boxes",
  explain: "box 以 -x 结尾，复数加 -es：box → boxes。",
  difficulty: "简单",
  kind: "blank",
};

// ---------------- 原站 A1 第 3 课中等 / 困难测验原题（经作者授权翻译，本轮提取） ----------------
// 中等 30 题、困难 29 题全收，题干、选项、答案、解析全部来自原站提取；
// 答案一律按答案文字定位（提取报告里的字母按九宫格位置标，与选项顺序对不上）。
// 跨档重复的题是原站本身复用，照原样保留、不去重；解析里原站写作「同第 X 题」的，
// 按所指那道题的原站解析收录（解析正文与原站一致，不自编）。
// 第 13 题（中等填空与选择、困难填空与选择共四处）答案按原站的 indexes，不用 indices。
// 简单档不动：仍只有先前提取到的 Q4、Q15 两道填空，其余 18 题选项未提全、待补（见下方清单）。
const A1_L3_QUESTIONS: QuizQuestion[] = [
  // ---- 中等 30 题 ----
  { q: "The ___ fall in autumn.（提示：树上扁平的绿色部分，复数）", options: [], answer: 0, answerText: "leaves", baseWord: "提示：树上扁平的绿色部分，复数", sentence: "The leaves fall in autumn.", explain: "有些以 -f 结尾的词变复数时 -f 变成 -ves。", difficulty: "中等", kind: "blank" },
  { q: "The museum displays ancient ___.", options: ["knife", "knive", "knifes", "knives"], answer: 3, explain: "knife 的 -fe 变成 -ves。", difficulty: "中等", keepChoice: true },
  { q: "The fieldwork involves many ___.（person）", options: [], answer: 0, answerText: "people", baseWord: "person", sentence: "The fieldwork involves many people.", explain: "people 是 person 常见的复数形式；many 意为「许多」。", difficulty: "中等", kind: "blank" },
  { q: "Several ___ are under discussion.（hypothesis）", options: [], answer: 0, answerText: "hypotheses", baseWord: "hypothesis", sentence: "Several hypotheses are under discussion.", explain: "hypothesis 的复数是 hypotheses。", difficulty: "中等", kind: "blank" },
  { q: "The report contains several ___.", options: ["analyses", "analysises", "analysiss", "analysis"], answer: 0, explain: "analysis 的复数是 analyses。", difficulty: "中等", keepChoice: true },
  { q: "Two ___ work in the historical archive.", options: ["womans", "women", "woman", "womens"], answer: 1, explain: "woman 变元音成 women。", difficulty: "中等", keepChoice: true },
  { q: "Scientists observe rare ___.", options: ["species", "specie", "speciess", "specieses"], answer: 0, explain: "species 单复数同形。", difficulty: "中等", keepChoice: true },
  { q: "The laboratory has four ___.", options: ["watches", "watchs", "watch", "watchings"], answer: 0, explain: "watch 以 /tʃ/ 结尾，加 -es。", difficulty: "中等", keepChoice: true },
  { q: "The lab published three separate ___ of the same sample.（analysis）", options: [], answer: 0, answerText: "analyses", baseWord: "analysis", sentence: "The lab published three separate analyses of the same sample.", explain: "analysis 的不规则复数是 analyses。", difficulty: "中等", kind: "blank" },
  { q: "The expedition includes two ___.", options: ["childrens", "childs", "children", "child"], answer: 2, explain: "child 的不规则复数是 children。", difficulty: "中等", keepChoice: true },
  { q: "The institute has three ___.", options: ["box", "boxs", "boxes", "boxies"], answer: 2, explain: "box 以 -x 结尾，加 -es。", difficulty: "中等", keepChoice: true },
  { q: "The museum displays ancient ___.（knife）", options: [], answer: 0, answerText: "knives", baseWord: "knife", sentence: "The museum displays ancient knives.", explain: "knife 的 -fe 变成 -ves。", difficulty: "中等", kind: "blank" },
  { q: "The table shows two ___.（index）", options: [], answer: 0, answerText: "indexes", baseWord: "index", sentence: "The table shows two indexes.", explain: "indexes 是表示清单中条目时常用的复数形式；indices 在某些领域也可以用。table 指数据表，indexes 指索引表中的条目。", difficulty: "中等", kind: "blank" },
  { q: "Two ___ are available in the library.", options: ["dictionary", "dictionaries", "dictionarys", "dictionaryes"], answer: 1, explain: "辅音+y → -ies。", difficulty: "中等", keepChoice: true },
  { q: "The table shows two ___.", options: ["indexes", "indexs", "indices", "index"], answer: 0, explain: "indexes 是表示清单中条目时常用的复数形式；indices 在某些领域也可以用。table 指数据表，indexes 指索引表中的条目。", difficulty: "中等", keepChoice: true },
  { q: "The two ___ are accurate.", options: ["measurements", "measure", "measureings", "measuremen"], answer: 0, explain: "measurement 加 -s；accurate 意为「准确的」。", difficulty: "中等", keepChoice: true },
  { q: "The institute has four ___.（watch）", options: [], answer: 0, answerText: "watches", baseWord: "watch", sentence: "The institute has four watches.", explain: "-ch 结尾，加 -es。", difficulty: "中等", kind: "blank" },
  { q: "Several ___ are under discussion.", options: ["hypotheses", "hypothesis", "hypothesises", "hypothesiss"], answer: 0, explain: "hypothesis 的复数是 hypotheses。", difficulty: "中等", keepChoice: true },
  { q: "Several ___ attended the symposium.", options: ["man", "men", "mans", "mens"], answer: 1, explain: "man → men；symposium 意为「专题研讨会」。", difficulty: "中等", keepChoice: true },
  { q: "The proposal includes three ___.", options: ["criterion", "criteria", "criterias", "criterions"], answer: 1, explain: "criterion 是单数，criteria 是复数。", difficulty: "中等", keepChoice: true },
  { q: "We found three ___ in the text.（error）", options: [], answer: 0, answerText: "errors", baseWord: "error", sentence: "We found three errors in the text.", explain: "普通名词在大于 1 的数字后加 -s。", difficulty: "中等", kind: "blank" },
  { q: "Two ___ are available in the university library.", options: ["dictionary", "dictionaries", "dictionaryes", "dictionarys"], answer: 1, explain: "辅音+y → -ies。", difficulty: "中等", keepChoice: true },
  { q: "The proposal includes three ___.", options: ["criterion", "criteria", "criterias", "criterions"], answer: 1, explain: "criterion 意为「标准」。", difficulty: "中等", keepChoice: true },
  { q: "The two ___ are sleeping.（提示：还不会走路的很小的孩子，复数）", options: [], answer: 0, answerText: "babies", baseWord: "提示：还不会走路的很小的孩子，复数", sentence: "The two babies are sleeping.", explain: "baby：辅音+y → babies。", difficulty: "中等", kind: "blank" },
  { q: "The summary contains several ___.", options: ["analysis", "analyses", "analysiss", "analysises"], answer: 1, explain: "analysis 的复数是 analyses。", difficulty: "中等", keepChoice: true },
  { q: "The researchers study unusual ___.", options: ["phenomenon", "phenomena", "phenomenons", "phenomenas"], answer: 1, explain: "phenomenon 在科学语境中的复数是 phenomena。", difficulty: "中等", keepChoice: true },
  { q: "The expedition includes two ___.（child）", options: [], answer: 0, answerText: "children", baseWord: "child", sentence: "The expedition includes two children.", explain: "child 的不规则复数是 children。", difficulty: "中等", kind: "blank" },
  { q: "We visited three ___ last summer.（提示：大城镇，复数）", options: [], answer: 0, answerText: "cities", baseWord: "提示：大城镇，复数", sentence: "We visited three cities last summer.", explain: "city → cities。", difficulty: "中等", kind: "blank" },
  { q: "The fieldwork involves many ___.", options: ["people", "persons", "peoples", "person"], answer: 0, explain: "people 是 person 常见的复数形式；many 意为「许多」。", difficulty: "中等", keepChoice: true },
  { q: "The workshop explains different ___.", options: ["phenomenon", "phenomena", "phenomenas", "phenomenons"], answer: 1, explain: "phenomenon 在科学语境中的复数是 phenomena。", difficulty: "中等", keepChoice: true },
  // ---- 困难 29 题 ----
  { q: "The fieldwork involves many ___.（person）", options: [], answer: 0, answerText: "people", baseWord: "person", sentence: "The fieldwork involves many people.", explain: "people 是 person 常见的复数形式；many 意为「许多」。", difficulty: "困难", kind: "blank" },
  { q: "The institute has three ___.", options: ["boxies", "boxs", "box", "boxes"], answer: 3, explain: "box 以 -x 结尾，加 -es。", difficulty: "困难", keepChoice: true },
  { q: "Several ___ are under discussion.", options: ["hypothesiss", "hypotheses", "hypothesises", "hypothesis"], answer: 1, explain: "hypothesis 的复数是 hypotheses。", difficulty: "困难", keepChoice: true },
  { q: "We found three ___ in the text.（error）", options: [], answer: 0, answerText: "errors", baseWord: "error", sentence: "We found three errors in the text.", explain: "普通名词在大于 1 的数字后加 -s。", difficulty: "困难", kind: "blank" },
  { q: "Two ___ work in the historical archive.", options: ["womens", "women", "woman", "womans"], answer: 1, explain: "woman 变元音成 women。", difficulty: "困难", keepChoice: true },
  { q: "The two ___ are accurate.", options: ["measure", "measurements", "measureings", "measuremen"], answer: 1, explain: "measurement 加 -s；accurate 意为「准确的」。", difficulty: "困难", keepChoice: true },
  { q: "These ___ occur only at high altitude.（phenomenon）", options: [], answer: 0, answerText: "phenomena", baseWord: "phenomenon", sentence: "These phenomena occur only at high altitude.", explain: "phenomenon 的复数是 phenomena。", difficulty: "困难", kind: "blank" },
  { q: "The expedition includes two ___.", options: ["childrens", "childs", "child", "children"], answer: 3, explain: "child 的不规则复数是 children。", difficulty: "困难", keepChoice: true },
  { q: "The two ___ are sleeping.（提示：还不会走路的很小的孩子，复数）", options: [], answer: 0, answerText: "babies", baseWord: "提示：还不会走路的很小的孩子，复数", sentence: "The two babies are sleeping.", explain: "baby：辅音+y → babies。", difficulty: "困难", kind: "blank" },
  { q: "The museum displays ancient ___.（knife）", options: [], answer: 0, answerText: "knives", baseWord: "knife", sentence: "The museum displays ancient knives.", explain: "knife 的 -fe 变成 -ves。", difficulty: "困难", kind: "blank" },
  { q: "The table shows two ___.", options: ["indexes", "indexs", "indices", "index"], answer: 0, explain: "indexes 是表示清单中条目时常用的复数形式；indices 在某些领域也可以用。table 指数据表，indexes 指索引表中的条目。", difficulty: "困难", keepChoice: true },
  { q: "We visited three ___ last summer.（提示：大城镇，复数）", options: [], answer: 0, answerText: "cities", baseWord: "提示：大城镇，复数", sentence: "We visited three cities last summer.", explain: "city → cities。", difficulty: "困难", kind: "blank" },
  { q: "The lab published three separate ___ of the same sample.（analysis）", options: [], answer: 0, answerText: "analyses", baseWord: "analysis", sentence: "The lab published three separate analyses of the same sample.", explain: "analysis 的不规则复数是 analyses。", difficulty: "困难", kind: "blank" },
  { q: "Two ___ are available in the library.", options: ["dictionaries", "dictionarys", "dictionaryes", "dictionary"], answer: 0, explain: "辅音+y → -ies。", difficulty: "困难", keepChoice: true },
  { q: "The researchers study unusual ___.", options: ["phenomenas", "phenomena", "phenomenon", "phenomenons"], answer: 1, explain: "phenomenon 在科学语境中的复数是 phenomena。", difficulty: "困难", keepChoice: true },
  { q: "The institute has four ___.（watch）", options: [], answer: 0, answerText: "watches", baseWord: "watch", sentence: "The institute has four watches.", explain: "-ch 结尾，加 -es。", difficulty: "困难", kind: "blank" },
  { q: "The table shows two ___.（index）", options: [], answer: 0, answerText: "indexes", baseWord: "index", sentence: "The table shows two indexes.", explain: "indexes 是表示清单中条目时常用的复数形式；indices 在某些领域也可以用。table 指数据表，indexes 指索引表中的条目。", difficulty: "困难", kind: "blank" },
  { q: "Scientists observe rare ___.", options: ["specie", "speciess", "specieses", "species"], answer: 3, explain: "species 单复数同形。", difficulty: "困难", keepChoice: true },
  { q: "The expedition includes two ___.（child）", options: [], answer: 0, answerText: "children", baseWord: "child", sentence: "The expedition includes two children.", explain: "child 的不规则复数是 children。", difficulty: "困难", kind: "blank" },
  { q: "Several ___ are under discussion.（hypothesis）", options: [], answer: 0, answerText: "hypotheses", baseWord: "hypothesis", sentence: "Several hypotheses are under discussion.", explain: "hypothesis 的复数是 hypotheses。", difficulty: "困难", kind: "blank" },
  { q: "把中文翻译成英语：她买了两个笔记本和三支笔。", options: ["She bought two notebooks and three pen.", "She buys two notebook and three pens.", "She bought two notebooks and three pens.", "She bought two notebook and three pen."], answer: 2, explain: "大于 1 的数字后，可数名词必须用复数。", difficulty: "困难", keepChoice: true },
  { q: "The ___ fall in autumn.（提示：树上扁平的绿色部分，复数）", options: [], answer: 0, answerText: "leaves", baseWord: "提示：树上扁平的绿色部分，复数", sentence: "The leaves fall in autumn.", explain: "有些以 -f 结尾的词变复数时 -f 变成 -ves。", difficulty: "困难", kind: "blank" },
  { q: "The summary contains several ___.", options: ["analyses", "analysiss", "analysis", "analysises"], answer: 0, explain: "analysis 的复数是 analyses。", difficulty: "困难", keepChoice: true },
  { q: "The library archives all doctoral ___ from the last century.（thesis）", options: [], answer: 0, answerText: "theses", baseWord: "thesis", sentence: "The library archives all doctoral theses from the last century.", explain: "thesis 的 -is 变成 -es。", difficulty: "困难", kind: "blank" },
  { q: "The museum displays ancient ___.", options: ["knives", "knife", "knive", "knifes"], answer: 0, explain: "knife 的 -fe 变成 -ves。", difficulty: "困难", keepChoice: true },
  { q: "The proposal includes three ___.", options: ["criterias", "criteria", "criterion", "criterions"], answer: 1, explain: "criterion 是单数，criteria 是复数。", difficulty: "困难", keepChoice: true },
  { q: "Two ___ are available in the university library.", options: ["dictionary", "dictionaryes", "dictionarys", "dictionaries"], answer: 3, explain: "辅音+y → -ies。", difficulty: "困难", keepChoice: true },
  { q: "The laboratory has four ___.", options: ["watch", "watchs", "watches", "watchings"], answer: 2, explain: "watch 以 /tʃ/ 结尾，加 -es。", difficulty: "困难", keepChoice: true },
  { q: "Several ___ attended the symposium.", options: ["men", "mans", "man", "mens"], answer: 0, explain: "man → men；symposium 意为「专题研讨会」。", difficulty: "困难", keepChoice: true },
];

// ---------------- 原站 A1 第 4 课测验原题（经作者授权翻译，本轮提取） ----------------
// 简单 20 题、中等 29 题、困难 25 题全收，无待补（中等 9 道缺题干的题于
// 2026-11-15 重做原站中等档补回，另补 4 道题此前缺失的解析；困难 7 道缺题干的题
// 于 2026-11-15 重做原站困难档补回，另补 2 道题此前缺失的解析）。
// 跨档重复的题是原站本身复用，照原样保留、不去重；选项顺序以本轮提取为准，
// 答案一律按答案文字定位（提取报告里的字母按九宫格位置标，与选项顺序对不上）。
// 解析为原站解析的中文翻译；原站没给解析的题，解析如实标「原站解析待补」，不自编。
// 提取报告里解析后的「（与第 X 题同型）」是提取时的对照注记，不是原站解析正文，不收进解析。
const A1_L4_QUESTIONS: QuizQuestion[] = [
  // ---- 简单（原站 20 题，全收） ----
  { q: "把中文翻译成英语：我们需要一些关于这门课的信息。", options: ["We need a information about the course.", "We need an informations about the course.", "We need some informations about the course.", "We need some information about the course."], answer: 3, explain: "information 是不可数名词，不加 an、不加 -s。", difficulty: "简单", keepChoice: true },
  { q: "选出正确的句子。", options: ["Physics are hard.", "Physic is hard.", "Physics is hard.", "Physics are hardly."], answer: 2, explain: "以 -ics 结尾的学科名词是不可数单数。", difficulty: "简单", keepChoice: true },
  { q: "选出正确的句子。", options: ["My homeworks are difficult tonight.", "My homework is difficult tonight.", "My homeworks is difficult tonight.", "My homework are difficult tonight."], answer: 1, explain: "homework 不可数，配单数动词。", difficulty: "简单", keepChoice: true },
  { q: "The laboratory needs ___ new computers.", options: ["a few", "a little", "much", "many"], answer: 0, explain: "computers 是可数复数。", difficulty: "简单", keepChoice: true },
  { q: "The researchers need more ___.", options: ["information", "informations", "a information", "an information"], answer: 0, explain: "information 不可数，不加 -s。", difficulty: "简单", keepChoice: true },
  { q: "The report provides ___ useful guidance.", options: ["few", "many", "some", "a few"], answer: 2, explain: "guidance 不可数，用 some。", difficulty: "简单", keepChoice: true },
  { q: "选出可数名词。", options: ["coin", "money", "rice", "sugar"], answer: 0, explain: "coin 是单个可数物体；money、rice、sugar 不是。", difficulty: "简单", keepChoice: true },
  { q: "选出正确的句子。", options: ["She bought two breads.", "She bought two loaves of bread.", "She bought two pieces of breads.", "She bought two bread."], answer: 1, explain: "bread 用 loaves 来数。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：她给了我两条建议。", options: ["She gave me two advice.", "She gave me two advices.", "She gave me a advice.", "She gave me two pieces of advice."], answer: 3, explain: "advice 用 pieces 来数。", difficulty: "简单", keepChoice: true },
  { q: "选出语法正确的短语。", options: ["some advice", "many advices", "a advices", "two advice"], answer: 0, explain: "advice 不可数。", difficulty: "简单", keepChoice: true },
  { q: "There is too ___ noise in the laboratory.", options: ["many", "few", "a few", "much"], answer: 3, explain: "noise 不可数。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：房间里没有多少家具。", options: ["There is not many furniture in the room.", "There are not much furniture in the room.", "There is not much furniture in the room.", "There is not many furnitures in the room."], answer: 2, explain: "furniture 不可数，用 much、配 is。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：我买了三把椅子和一张桌子。", options: ["I bought three chairs and a table.", "I bought three chair and a table.", "I bought three chairs and the table.", "I bought three chairs and tables."], answer: 0, explain: "chairs 是可数复数，a table。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：消息很好，物理是我最喜欢的科目。", options: ["The news is good and physics is my favourite subject.", "The news are good and physics are my favourite subject.", "The news is good and physics are my favourite subject.", "The news are good and physics is my favourite subject."], answer: 0, explain: "news 和 physics 都是不可数单数。", difficulty: "简单", keepChoice: true },
  { q: "The project has ___ volunteers.", options: ["much", "little", "many", "few"], answer: 2, explain: "volunteers 是可数复数。", difficulty: "简单", keepChoice: true },
  { q: "We do not have ___ time left.", options: ["many", "a few", "few", "much"], answer: 3, explain: "time 不可数。", difficulty: "简单", keepChoice: true },
  { q: "The news ___ very encouraging today.", options: ["are", "is", "were", "be"], answer: 1, explain: "news 是单数。", difficulty: "简单", keepChoice: true },
  { q: "There are ___ students in the hall.", options: ["much", "many", "little", "a little"], answer: 1, explain: "students 是可数复数。", difficulty: "简单", keepChoice: true },
  { q: "The library has ___ reference books.", options: ["little", "much", "some", "many"], answer: 3, explain: "reference books 是可数复数。", difficulty: "简单", keepChoice: true },
  { q: "选出正确的句子。", options: ["We bought some new furnitures.", "We bought some new furniture.", "We bought a new furnitures.", "We bought many new furniture."], answer: 1, explain: "furniture 不可数，不加 -s。", difficulty: "简单", keepChoice: true },
  // ---- 中等（原站 29 题，全收；末尾 9 题为 2026-11-15 重做补回的缺题干题，按本次重做的选项顺序收录） ----
  { q: "We have three ___ of furniture.", options: ["piece", "pieces", "pieces of", "piece of"], answer: 1, explain: "Furniture 是不可数名词，所以数它的单位是 pieces。句中 furniture 的意思是“家具”。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "中等", keepChoice: true },
  { q: "选出正确的句子。", options: ["Air pollutions cause considerable damages to crops.", "Air pollution causes considerable damage to crops.", "Air pollution cause considerable damages to crops.", "Air pollutions causes considerable damage to crops."], answer: 1, explain: "pollution 和 damage 不可数，不加 -s。", difficulty: "中等", keepChoice: true },
  { q: "选出正确的句子。", options: ["Each participant received a sums of money and two meals.", "Each participant received a sum of money and two meals.", "Each participant received a sums of moneys and two meal.", "Each participant received a sum of moneys and two meals."], answer: 1, explain: "money 用 a sum of 来数，meals 可数。", difficulty: "中等", keepChoice: true },
  { q: "选出正确的句子。", options: ["We need many informations and two more pieces of equipments.", "We need more information and two more pieces of equipment.", "We need more informations and two more pieces of equipment.", "We need many information and two more equipments."], answer: 1, explain: "information、equipment 不可数。", difficulty: "中等", keepChoice: true },
  { q: "We have ___ time before the project deadline.", options: ["a few", "little", "many", "few"], answer: 1, explain: "time 不可数，little 表示数量少。", difficulty: "中等", keepChoice: true },
  { q: "The team needs ___ money.", options: ["many", "a few", "several", "more"], answer: 3, explain: "money 不可数。", difficulty: "中等", keepChoice: true },
  { q: "There is not ___ evidence for that claim.（much）", options: [], answer: 0, answerText: "much", baseWord: "much", sentence: "There is not much evidence for that claim.", explain: "evidence 不可数。", difficulty: "中等", kind: "blank" },
  { q: "把中文翻译成英语：你想来点咖啡吗？——好的，请来两杯。", options: ["\"Would you like some coffee? — Yes, two coffees, please.\"", "\"Would you like some coffee? — Yes, two coffee, please.\"", "\"Would you like some coffee? — Yes, some coffees, please.\"", "\"Would you like some coffee? — Yes, a coffees, please.\""], answer: 0, explain: "coffee 作液体时不可数，按杯算时可数。", difficulty: "中等", keepChoice: true },
  { q: "The archive contains four ___ of practical advice.", options: ["piece", "pieces", "piece of", "pieces of"], answer: 1, explain: "Advice 不可数；数建议要用 pieces of advice。句中 the archive 的意思是“档案馆”，advice 的意思是“建议”。所选的数量词必须符合名词在该语境中的用法。", difficulty: "中等", keepChoice: true },
  { q: "The investigators need more ___.", options: ["guidance", "guidances", "a guidance", "two guidance"], answer: 0, explain: "guidance 不可数。", difficulty: "中等", keepChoice: true },
  { q: "There is ___ evidence for the claim.", options: ["little", "few", "much", "many"], answer: 0, explain: "evidence 不可数。", difficulty: "中等", keepChoice: true },
  { q: "The study requires ___ patience.", options: ["many", "some", "few", "a few"], answer: 1, explain: "patience 不可数（表示一种品质）。", difficulty: "中等", keepChoice: true },
  { q: "We need two ___ of equipment.", options: ["pieces", "piece", "pieces of", "piece of"], answer: 0, explain: "句中 equipment 的意思是“设备”。Equipment 不可数；数它可以用 pieces of equipment。关键在于数或量的方法，因为不是每个名词都能直接和数词搭配。", difficulty: "中等", keepChoice: true },
  { q: "The policy creates ___ restrictions.", options: ["fewer", "less", "a little", "little"], answer: 0, explain: "restrictions 是可数复数。", difficulty: "中等", keepChoice: true },
  { q: "We have ___ time before the deadline.", options: ["a few", "little", "many", "few"], answer: 1, explain: "time 不可数，little 表示数量少。", difficulty: "中等", keepChoice: true },
  { q: "She drank two ___（glass）of milk.", options: [], answer: 0, answerText: "glasses", baseWord: "glass", sentence: "She drank two glasses of milk.", explain: "milk 不可数，复数落在 glass 上。", difficulty: "中等", kind: "blank" },
  { q: "选出正确的句子。", options: ["The paper offers three useful advices.", "The paper offers three useful pieces of advice.", "The paper offers three useful piece of advices.", "The paper offers three useful pieces of advices."], answer: 1, explain: "句中 useful 的意思是“有用的”，advice 的意思是“建议”。Advice 不可数，数它要用 pieces of advice。所选的数量词必须符合名词在该语境中的用法。", difficulty: "中等", keepChoice: true },
  { q: "There is far too ___ noise in the institute.", options: ["little", "much", "many", "few"], answer: 1, explain: "noise 不可数。", difficulty: "中等", keepChoice: true },
  { q: "The laboratory produces ___ waste.", options: ["fewer", "less", "much", "many"], answer: 1, explain: "waste 不可数，less 表示量更少。", difficulty: "中等", keepChoice: true },
  { q: "把中文翻译成英语：当地人对潮汐规律的了解比模型更可靠。", options: ["Local knowledge of tidal patterns were more reliable than the model.", "Local knowledge of tidal patterns was more reliable than the model.", "Local knowledges of tidal patterns was more reliable than the model.", "Local knowledge of tidal pattern was more reliable than the model."], answer: 1, explain: "knowledge 不可数，用 was 不用 were，尽管后面有复数形式的 patterns。", difficulty: "中等", keepChoice: true },
  // ---- 中等补回的 9 题（2026-11-15 重做原站中等档找回题干；选项按本次重做页面顺序，答案按文字定位） ----
  { q: "The ___ report provides ___ useful guidance.", options: ["some", "a", "an", "many"], answer: 0, explain: "句中 the report 的意思是“报告”，useful 的意思是“有用的”。Guidance 在“指导、指引”的意思上不可数，用 some。所选的数量词必须符合名词在该语境中的用法。", difficulty: "中等", keepChoice: true },
  { q: "The project has ___ research volunteers.", options: ["a little", "many", "less", "much"], answer: 1, explain: "Research volunteers 是可数复数名词，用 many。句中 the project 的意思是“项目”，volunteers 的意思是“志愿者”。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "中等", keepChoice: true },
  { q: "There are ___ participants in the survey.", options: ["less", "a little", "several", "much"], answer: 2, explain: "句中 participants 的意思是“参与者”，the survey 的意思是“调查”。Participants 是可数复数名词，用 several。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "中等", keepChoice: true },
  { q: "The institute needs ___ new computers.", options: ["a little", "much", "less", "a few"], answer: 3, explain: "句中 the institute 的意思是“研究所”，new computers 的意思是“新电脑”。Computers 是可数复数，用 a few。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "中等", keepChoice: true },
  { q: "The laboratory needs ___ new computers.", options: ["a few", "a little", "much", "less"], answer: 0, explain: "Computers 是可数复数，用 a few。句中 the laboratory 的意思是“实验室”，new computers 的意思是“新电脑”。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "中等", keepChoice: true },
  { q: "The library has ___ technical manuals.", options: ["much", "less", "many", "a little"], answer: 2, explain: "Technical manuals 是可数复数，用 many。句中 technical manuals 的意思是“技术手册”，the library 的意思是“图书馆”。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "中等", keepChoice: true },
  { q: "The archive contains several ___ of advice.", options: ["advices", "advice", "advices of", "pieces"], answer: 3, explain: "Advice 不可数；数建议要用 pieces of advice。句中 the archive 的意思是“档案馆”，several 的意思是“几个”。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "中等", keepChoice: true },
  { q: "The project has ___ volunteers.", options: ["less", "many", "much", "little"], answer: 1, explain: "Volunteers 是可数复数名词，用 many。句中 the project 的意思是“项目”，volunteers 的意思是“志愿者”。关键在于数或量的方法，因为不是每个名词都能直接和数词搭配。", difficulty: "中等", keepChoice: true },
  { q: "The library has ___ reference books.", options: ["less", "a little", "much", "many"], answer: 3, explain: "Reference books 是可数复数，用 many。句中 reference books 的意思是“参考书”，the library 的意思是“图书馆”。所选的数量词必须符合名词在该语境中的用法。", difficulty: "中等", keepChoice: true },
  // ---- 困难（原站 25 题，全收；末尾 7 题为 2026-11-15 重做补回的缺题干题，按本次重做的选项顺序收录） ----
  // 第 12 题（咖啡翻译题）困难版选项顺序未记录，暂按中等第 9 题顺序收录。
  { q: "She drank two ___（glass）of milk.", options: [], answer: 0, answerText: "glasses", baseWord: "glass", sentence: "She drank two glasses of milk.", explain: "milk 不可数，复数落在 glass 上。", difficulty: "困难", kind: "blank" },
  { q: "选出正确的句子。", options: ["We need more informations and two more pieces of equipments.", "The paper offers three useful pieces of advice.", "We need many informations and two more pieces of equipments.", "We need many information and two more equipments."], answer: 1, explain: "information、equipment 不可数。", difficulty: "困难", keepChoice: true },
  { q: "选出正确的句子。", options: ["Each participant received a sums of money and two meals.", "Each participant received a sum of moneys and two meals.", "Each participant received a sum of money and two meals.", "Each participant received sums of money and two meals."], answer: 2, explain: "money 用 a sum of 来数，meals 可数。", difficulty: "困难", keepChoice: true },
  { q: "There is not ___ evidence for that claim.（much）", options: [], answer: 0, answerText: "much", baseWord: "much", sentence: "There is not much evidence for that claim.", explain: "evidence 不可数。", difficulty: "困难", kind: "blank" },
  { q: "There is far too ___ noise in the institute.（much）", options: [], answer: 0, answerText: "much", baseWord: "much", sentence: "There is far too much noise in the institute.", explain: "noise 不可数。", difficulty: "困难", kind: "blank" },
  { q: "选出正确的句子。", options: ["We need more informations and two more pieces of equipments.", "Air pollution causes considerable damage to crops.", "We need many informations and two more pieces of equipments.", "We need many information and two more equipments."], answer: 1, explain: "pollution 和 damage 不可数，不加 -s。", difficulty: "困难", keepChoice: true },
  { q: "把中文翻译成英语：你想来点咖啡吗？——好的，请来两杯。", options: ["\"Would you like some coffee? — Yes, two coffees, please.\"", "\"Would you like some coffee? — Yes, two coffee, please.\"", "\"Would you like some coffee? — Yes, some coffees, please.\"", "\"Would you like some coffee? — Yes, a coffees, please.\""], answer: 0, explain: "coffee 作液体时不可数，按杯算时可数。", difficulty: "困难", keepChoice: true },
  { q: "We have ___ time before the deadline.", options: ["a few", "little", "many", "few"], answer: 1, explain: "time 不可数，little 表示数量少。", difficulty: "困难", keepChoice: true },
  { q: "We need two ___ of equipment.", options: ["pieces", "piece", "pieces of", "piece of"], answer: 0, explain: "句中 equipment 的意思是“设备”。Equipment 不可数；数它可以用 pieces of equipment。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "困难", keepChoice: true },
  { q: "The investigators need more ___.", options: ["guidances", "a guidance", "guidance", "two guidance"], answer: 2, explain: "guidance 不可数。", difficulty: "困难", keepChoice: true },
  { q: "The team needs ___ money.", options: ["many", "more", "several", "a few"], answer: 1, explain: "money 不可数。", difficulty: "困难", keepChoice: true },
  // 潮汐翻译题：2026-11-15 重做困难档时，原站这道题的题干是 “Local knowledge of
  // the tides was more reliable than the model.”（选项也用 the tides），与站内已收的
  // tidal patterns 版结构、答案、解析模式完全相同，且从未在同一次测验里同时出现，
  // 先当作同一道题的不同说法、不另加一道；下次重做时如两者同场出现再拆成两道题。
  { q: "把中文翻译成英语：当地人对潮汐规律的了解比模型更可靠。", options: ["Local knowledge of tidal patterns were more reliable than the model.", "Local knowledge of tidal patterns was more reliable than the model.", "Local knowledges of tidal patterns was more reliable than the model.", "Local knowledge of tidal pattern was more reliable than the model."], answer: 1, explain: "knowledge 不可数，用 was 不用 were。", difficulty: "困难", keepChoice: true },
  { q: "The study requires ___ patience.", options: ["many", "some", "few", "a few"], answer: 1, explain: "patience 不可数。", difficulty: "困难", keepChoice: true },
  { q: "There is ___ evidence for the claim.", options: ["little", "few", "much", "many"], answer: 0, explain: "evidence 不可数。", difficulty: "困难", keepChoice: true },
  { q: "We have three ___ of furniture.", options: ["piece", "pieces", "pieces of", "piece of"], answer: 1, explain: "句中 furniture 的意思是“家具”。Furniture 是不可数名词，所以数它的单位是 pieces。关键在于数或量的方法，因为不是每个名词都能直接和数词搭配。", difficulty: "困难", keepChoice: true },
  { q: "The laboratory produces ___ waste.", options: ["fewer", "less", "much", "many"], answer: 1, explain: "waste 不可数，less 表示量更少。", difficulty: "困难", keepChoice: true },
  { q: "选出正确的句子。", options: ["We need more informations and two more pieces of equipments.", "We need many informations and two more pieces of equipments.", "We need more information and two more pieces of equipments.", "We need more information and two more pieces of equipment."], answer: 3, explain: "information、equipment 不可数。", difficulty: "困难", keepChoice: true },
  { q: "We have ___ time before the project deadline.", options: ["little", "many", "few", "a few"], answer: 0, explain: "time 不可数，little 表示数量少。", difficulty: "困难", keepChoice: true },
  // ---- 困难补回的 7 题（2026-11-15 重做原站困难档找回题干；选项按本次重做页面顺序，答案按文字定位） ----
  { q: "The library has ___ technical manuals.", options: ["many", "less", "a little", "much"], answer: 0, explain: "Technical manuals 是可数复数，用 many。句中 technical manuals 的意思是“技术手册”，the library 的意思是“图书馆”。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "困难", keepChoice: true },
  { q: "The institute needs ___ new computers.", options: ["much", "a few", "less", "a little"], answer: 1, explain: "句中 the institute 的意思是“研究所”，new computers 的意思是“新电脑”。Computers 是可数复数，用 a few。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "困难", keepChoice: true },
  { q: "The policy creates ___ restrictions.", options: ["less", "much", "fewer", "little"], answer: 2, explain: "句中 restrictions 的意思是“限制”。Restrictions 是可数复数名词，用 fewer。关键在于数或量的方法，因为不是每个名词都能直接和数词搭配。", difficulty: "困难", keepChoice: true },
  { q: "选出正确的句子。", options: ["The information are useful, and we bought three equipment.", "The information is useful, and we bought three equipments.", "The informations are useful, and we bought three pieces of equipment.", "The information is useful, and we bought three pieces of equipment."], answer: 3, explain: "句中 information 的意思是“信息”，equipment 的意思是“设备”。Information 和 equipment 都不可数；数 equipment 要通过 pieces of。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "困难", keepChoice: true },
  { q: "The project has ___ research volunteers.", options: ["much", "many", "little", "less"], answer: 1, explain: "Research volunteers 是可数复数名词，用 many。句中 the project 的意思是“项目”，volunteers 的意思是“志愿者”。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "困难", keepChoice: true },
  { q: "The archive contains several ___ of practical advice.", options: ["advices", "pieces", "piece", "piecees"], answer: 1, explain: "Advice 不可数；数建议要用 pieces of advice。句中 the archive 的意思是“档案馆”，several 的意思是“几个”。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "困难", keepChoice: true },
  { q: "There are ___ participants in the survey.", options: ["much", "several", "less", "a little"], answer: 1, explain: "句中 participants 的意思是“参与者”，the survey 的意思是“调查”。Participants 是可数复数名词，用 several。不可数名词把事物表示为一个整体或一种信息；要数单个单位，通常需要一个单位名词。", difficulty: "困难", keepChoice: true },
];

// ---------------- 原站 A1 第 5 课测验原题（经作者授权翻译，本轮提取） ----------------
// 简单 20 题、中等 30 题、困难 27 题全收，题干、选项、答案、解析全部来自原站提取；
// 答案一律按答案文字定位（提取报告里的字母按九宫格位置标，与选项顺序对不上）。
// 跨档重复的题是原站本身复用，照原样保留、不去重。困难档解析在提取报告里写作
// 「同中等第 X 题」的，按所指那道题的原站解析收录（解析正文与原站一致，不自编）。
// 解析里反复出现的三句模板句，全站统一译法（照原站说法，不增删）：
//   模板句一＝一个所有格形式可以独立站立、代替整个名词短语，另一个必须放在名词前面。
//   模板句二＝要同时认出所有者和被拥有的东西，才能选对形式。
//   模板句三＝所属关系在名词短语的结构里就表示出来了，不用再加一个动词。
// 原站无括号提示的填空题（中等 18/23/29、困难 11/15/17/23/27），站内填空格式需要
// 括号词显示，按同课其他题的惯例用所有者的主格/原形（we / it / they / Hoa）作括号词，
// 只提示所有者、不泄露答案形式；题干照原样不加括号。
const L5_T1 = "一个所有格形式可以独立站立、代替整个名词短语，另一个必须放在名词前面。";
const L5_T2 = "要同时认出所有者和被拥有的东西，才能选对形式。";
const L5_T3 = "所属关系在名词短语的结构里就表示出来了，不用再加一个动词。";
const A1_L5_QUESTIONS: QuizQuestion[] = [
  // ---- 简单（原站 20 题，全收） ----
  { q: "把中文翻译成英语：学生的项目正在展出。", options: ["The students' projects are on display.", "The students' is projects are on display.", "The students' projects is on display.", "The students' projects they are on display."], answer: 0, explain: `students 已有 -s，只加撇号，不写 students's。${L5_T1}`, difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：这个包是我的，那个是她的。", options: ["This bag is mine, and that one is her.", "This bag it is mine, and that one is hers.", "This bag are mine, and that one is hers.", "This bag is mine, and that one is hers."], answer: 3, explain: `mine 和 hers 单独站立，代替 my bag 和 her bag。${L5_T2}`, difficulty: "简单", keepChoice: true },
  { q: "___ house is next to the market.", options: ["Us", "We", "Our", "Ours"], answer: 2, explain: `名词 house 前面需要物主形容词 our。${L5_T3}`, difficulty: "简单", keepChoice: true },
  { q: "These documents are ___.", options: ["our", "we", "ours", "us"], answer: 2, explain: `ours 在 are 后面独立站立；our 必须放在名词前面。${L5_T1}`, difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：我们小组昨天完成了报告。", options: ["Our team finished its report yesterday.", "Our team is finished its report yesterday.", "Our team did finished its report yesterday.", "Our team finished it's report yesterday."], answer: 0, explain: `our 和 its 放在名词前面。its 是物主形容词，和 it's（= it is）完全不同。${L5_T2}`, difficulty: "简单", keepChoice: true },
  { q: "选出正确的名词短语。", options: ["the title of the book", "the title's book", "the title's of book", "the of book title"], answer: 0, explain: `对于无生命的东西，of 结构比所有格 ’s 更自然。${L5_T1}`, difficulty: "简单", keepChoice: true },
  { q: "This notebook is ___.", options: ["me", "mine", "my", "I"], answer: 1, explain: `mine 是物主代词，在 is 后面单独站立。${L5_T1}`, difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：这是谁的钥匙？——是我们的。", options: ["Whose keys these? — They're ours.", "Whose keys they are these? — They're ours.", "Whose keys is these? — They're ours.", "Whose keys are these? — They're ours."], answer: 3, explain: `whose 问的是所有者；简短回答用物主代词。${L5_T2}`, difficulty: "简单", keepChoice: true },
  { q: "选出正确的选项。", options: ["The cat is washing it's paws.", "The cat is washing its paws.", "The cat it is washing its paws.", "The cat are washing its paws."], answer: 1, explain: `句中的 the cat 意为“猫”。its 是物主形容词；it's 意为 it is。${L5_T1}`, difficulty: "简单", keepChoice: true },
  { q: "选出正确的选项。", options: ["That pen is her.", "That is hers pen.", "That pen is hers.", "That is she pen."], answer: 2, explain: `这句话的意思是“那支笔是她的。”在 be 后面的补语位置、没有重复名词时，用物主代词 hers。${L5_T2}`, difficulty: "简单", keepChoice: true },
  { q: "The scientist checks ___ notes.", options: ["hers", "her", "she", "herself"], answer: 1, explain: `her 放在名词 notes 前面，起表示所属的作用。${L5_T1}`, difficulty: "简单", keepChoice: true },
  { q: "The institute protects ___ reputation.", options: ["it", "it's", "their", "its"], answer: 3, explain: `its 是 it 的所有格形式，没有撇号。句中的 the institute 意为“研究所”。${L5_T2}`, difficulty: "简单", keepChoice: true },
  { q: "选出正确的选项。", options: ["This phone is his phone's.", "This phone is his.", "This is his's phone.", "This phone is him."], answer: 1, explain: `his 既作物主形容词又作物主代词，所以可以单独站立。${L5_T1}`, difficulty: "简单", keepChoice: true },
  { q: "The researchers present ___ findings.", options: ["theirs", "they", "their", "them"], answer: 2, explain: `句中的 the researchers 意为“研究人员”。their 是限定性的物主形容词，放在 findings 前面。${L5_T3}`, difficulty: "简单", keepChoice: true },
  { q: "The ___ changing room is on the left.", options: ["players'", "players's", "players", "player's"], answer: 0, explain: `复数名词已有 -s，只加撇号。${L5_T2}`, difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：这是 Nam 的自行车。", options: ["This it is Nam's bicycle.", "This is Nams bicycle.", "This are Nam's bicycle.", "This is Nam's bicycle."], answer: 3, explain: `所有者是人，在名字后面直接加 ’s。${L5_T3}`, difficulty: "简单", keepChoice: true },
  { q: "选出正确的选项。", options: ["I lost my keys.", "I lost my the keys.", "I lost a my keys.", "I lost the my keys."], answer: 0, explain: `这句话的意思是“我丢了钥匙。”物主形容词不和冠词连用。${L5_T3}`, difficulty: "简单", keepChoice: true },
  { q: "Those seats are ___.", options: ["ours", "us", "our", "we"], answer: 0, explain: `we 的物主代词是 ours。${L5_T2}`, difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：这本书的标题很长。", options: ["The title of the book are very long.", "The title of the book it is very long.", "The title of the book is very long.", "Title of the book is very long."], answer: 2, explain: `对于无生命的东西，of 结构比 the book's title 更自然。${L5_T3}`, difficulty: "简单", keepChoice: true },
  { q: "选出撇号放得正确的句子。", options: ["My parents' car is new.（两个人）", "My parents' car are new.（两个人）", "My parent's car is new.（两个人）", "Mine parents' car is new.（两个人）"], answer: 0, explain: `两个所有者，所以名词用复数、只加撇号。${L5_T3}`, difficulty: "简单", keepChoice: true },
  // ---- 中等（原站 30 题，全收） ----
  { q: "This is ___ hypothesis.", options: ["his", "he's", "him", "he"], answer: 0, explain: `his 放在名词 hypothesis 前面表示所属。句中的 hypothesis 意为“假说”。${L5_T2}`, difficulty: "中等", keepChoice: true },
  { q: "The ___ room is near the entrance.", options: ["children", "childrens'", "children's", "childrens"], answer: 2, explain: `children 是不规则复数形式，所以所有格加 ’s。句中的 the children 意为“孩子们”。${L5_T1}`, difficulty: "中等", keepChoice: true },
  { q: "The institute protects ___ credibility.", options: ["it's", "their", "its", "it"], answer: 2, explain: `句中的 the institute 意为“研究所”。its 是 it 的所有格，没有撇号。${L5_T1}`, difficulty: "中等", keepChoice: true },
  { q: "The ___ findings are available.", options: ["researcher's", "researcherss", "investigators", "investigators'"], answer: 3, explain: `复数名词有 -s，撇号加在 s 后面，如 investigators'。句中 the investigators 意为“调查组”，the findings 意为“研究发现”。${L5_T2}`, difficulty: "中等", keepChoice: true },
  { q: "This tablet is not hers. It is ___.", options: ["he", "his", "him", "he's"], answer: 1, explain: `his 是物主代词，可以单独站立。${L5_T1}`, difficulty: "中等", keepChoice: true },
  { q: "The ___ summary is on the desk.", options: ["student's", "scholars", "student", "studentses"], answer: 0, explain: `句中 the student 意为“学生”，on the desk 意为“在桌子上”。单数 student 加所有格 ’s。${L5_T2}`, difficulty: "中等", keepChoice: true },
  { q: "The analyst checks ___ draft notes.", options: ["herself", "hers", "she", "her"], answer: 3, explain: `her 放在名词 draft notes 前面，起表示所属的作用。句中的 the analyst 意为“分析员”。${L5_T1}`, difficulty: "中等", keepChoice: true },
  { q: "The editor reads ___ manuscript.", options: ["I", "my", "me", "mine"], answer: 1, explain: `句中 the editor 意为“编辑”，manuscript 意为“手稿”。my 是放在 manuscript 前面的物主形容词。${L5_T1}`, difficulty: "中等", keepChoice: true },
  { q: "Our laboratory samples are ready. Are ___ ready?", options: ["yourself", "you", "yours", "your"], answer: 2, explain: `yours 代替 your samples，单独站立。句中 samples 意为“样品”，ready 意为“准备好了”。${L5_T1}`, difficulty: "中等", keepChoice: true },
  { q: "Hoa forgot ___ umbrella at school.（提示：属于 Hoa 的）", options: [], answer: 0, answerText: "her", baseWord: "提示：属于 Hoa 的", sentence: "Hoa forgot her umbrella at school.", explain: `句中 at school 意为“在学校”。Hoa 是女性，所以物主形容词是 her。${L5_T1}`, difficulty: "中等", kind: "blank" },
  { q: "The investigators present ___ findings.", options: ["them", "they", "theirs", "their"], answer: 3, explain: `their 是限定性的物主形容词，放在 findings 前面。句中的 the investigators 意为“调查组”。${L5_T2}`, difficulty: "中等", keepChoice: true },
  { q: "The ___ agenda is clear.", options: ["conferencs", "conference", "conference's", "conferences"], answer: 2, explain: `单数 conference 加 ’s，表示会议的议程。句中 the conference 意为“会议”，clear 意为“清楚的”。${L5_T3}`, difficulty: "中等", keepChoice: true },
  { q: "This laptop is ___.", options: ["I", "my", "mine", "me"], answer: 2, explain: `mine 是物主代词，在 is 后面单独站立。${L5_T3}`, difficulty: "中等", keepChoice: true },
  { q: "The ___ report is on the desk.", options: ["studentses", "student's", "students", "student"], answer: 1, explain: `单数 student 加所有格 ’s。句中 the student 意为“学生”，on the desk 意为“在桌子上”。${L5_T3}`, difficulty: "中等", keepChoice: true },
  { q: "The ___ names are on the cover.", options: ["author's", "authors'", "authores", "authors"], answer: 1, explain: `句中 authors 意为“作者们”。authors 已有复数 -s，所以撇号加在 s 后面。${L5_T2}`, difficulty: "中等", keepChoice: true },
  { q: "My answer is different from ___（you）", options: [], answer: 0, answerText: "yours", baseWord: "you", sentence: "My answer is different from yours.", explain: `介词 from 后面、没有名词跟随时，用 yours。${L5_T2}`, difficulty: "中等", kind: "blank" },
  { q: "The institute protects ___ reputation.", options: ["their", "its", "it", "it's"], answer: 1, explain: `its 是 it 的所有格，没有撇号。句中的 the institute 意为“研究所”。${L5_T1}`, difficulty: "中等", keepChoice: true },
  { q: "We presented ___ preliminary results in September.", options: [], answer: 0, answerText: "our", baseWord: "we", sentence: "We presented our preliminary results in September.", explain: `句中 in September 意为“在九月”，results 意为“结果”。we 的所有格是 our。${L5_T1}`, difficulty: "中等", kind: "blank" },
  { q: "The new funding is ___.", options: ["their", "theirs", "them", "they"], answer: 1, explain: `theirs 是独立站立的物主代词。句中 funding 意为“经费”。${L5_T3}`, difficulty: "中等", keepChoice: true },
  { q: "The committee explains ___ decision.", options: ["their", "its", "it's", "it"], answer: 1, explain: `句中 the committee 意为“委员会”。its 放在 decision 前面表示所属关系。${L5_T2}`, difficulty: "中等", keepChoice: true },
  { q: "Our samples are ready. Are ___ ready?", options: ["yourself", "you", "yours", "your"], answer: 2, explain: `句中 samples 意为“样品”，ready 意为“准备好了”。yours 代替 your samples，单独站立。${L5_T3}`, difficulty: "中等", keepChoice: true },
  { q: "This is ___（Nam）bicycle.", options: [], answer: 0, answerText: "Nam's", baseWord: "Nam", sentence: "This is Nam's bicycle.", explain: `表示人的单数名词加 ’s。${L5_T3}`, difficulty: "中等", kind: "blank" },
  { q: "The committee published ___ findings without comment.", options: [], answer: 0, answerText: "its", baseWord: "it", sentence: "The committee published its findings without comment.", explain: `its 是 it 的所有格，没有撇号。句中的 the committee 意为“委员会”。${L5_T1}`, difficulty: "中等", kind: "blank" },
  { q: "The researchers present ___ findings.", options: ["they", "their", "them", "theirs"], answer: 1, explain: `句中的 the researchers 意为“研究人员”。their 是限定性的物主形容词，放在 findings 前面。${L5_T3}`, difficulty: "中等", keepChoice: true },
  { q: "This notebook is ___.", options: ["I", "my", "mine", "me"], answer: 2, explain: `mine 是物主代词，在 is 后面单独站立。${L5_T3}`, difficulty: "中等", keepChoice: true },
  { q: "That interpretation is not ___（I）", options: [], answer: 0, answerText: "mine", baseWord: "I", sentence: "That interpretation is not mine.", explain: `I 的物主代词是 mine。${L5_T3}`, difficulty: "中等", kind: "blank" },
  { q: "The ___ results are available.", options: ["researchers", "researcher's", "researchers'", "researcherss"], answer: 2, explain: `句中 the researchers 意为“研究人员”，the results 意为“结果”。复数名词有 -s，撇号加在 s 后面，如 researchers'。${L5_T2}`, difficulty: "中等", keepChoice: true },
  { q: "These documents are ___.", options: ["we", "us", "ours", "our"], answer: 2, explain: `ours 在 are 后面独立站立；our 必须放在名词前面。${L5_T1}`, difficulty: "中等", keepChoice: true },
  { q: "The researchers defended ___ methodology at the conference.", options: [], answer: 0, answerText: "their", baseWord: "they", sentence: "The researchers defended their methodology at the conference.", explain: `句中 the researchers 意为“研究人员”，the conference 意为“会议”。researchers 是复数，所以所有格是 their。${L5_T3}`, difficulty: "中等", kind: "blank" },
  { q: "These diagrams are ___.", options: ["our", "ours", "us", "we"], answer: 1, explain: `ours 在 are 后面独立站立；our 必须放在名词前面。${L5_T1}`, difficulty: "中等", keepChoice: true },
  // ---- 困难（原站 27 题，全收） ----
  { q: "Our laboratory samples are ready. Are ___ ready?", options: ["yours", "your", "yourself", "you"], answer: 0, explain: `yours 代替 your samples，单独站立。句中 samples 意为“样品”，ready 意为“准备好了”。${L5_T1}`, difficulty: "困难", keepChoice: true },
  { q: "The ___ room is near the entrance.", options: ["childrens", "childrens'", "children's", "children"], answer: 2, explain: `children 是不规则复数形式，所以所有格加 ’s。句中的 the children 意为“孩子们”。${L5_T1}`, difficulty: "困难", keepChoice: true },
  { q: "The analyst checks ___ draft notes.", options: ["hers", "she", "her", "herself"], answer: 2, explain: `her 放在名词 draft notes 前面，起表示所属的作用。句中的 the analyst 意为“分析员”。${L5_T1}`, difficulty: "困难", keepChoice: true },
  { q: "This is ___（Nam）bicycle.", options: [], answer: 0, answerText: "Nam's", baseWord: "Nam", sentence: "This is Nam's bicycle.", explain: `表示人的单数名词加 ’s。${L5_T3}`, difficulty: "困难", kind: "blank" },
  { q: "This tablet is not hers. It is ___.", options: ["him", "his", "he's", "he"], answer: 1, explain: `his 是物主代词，可以单独站立。${L5_T1}`, difficulty: "困难", keepChoice: true },
  { q: "The ___ agenda is clear.", options: ["conference's", "conference", "conferences", "conferencs"], answer: 0, explain: `单数 conference 加 ’s，表示会议的议程。句中 the conference 意为“会议”，clear 意为“清楚的”。${L5_T3}`, difficulty: "困难", keepChoice: true },
  { q: "These diagrams are ___.", options: ["our", "we", "ours", "us"], answer: 2, explain: `ours 在 are 后面独立站立；our 必须放在名词前面。${L5_T1}`, difficulty: "困难", keepChoice: true },
  { q: "The editor reads ___ manuscript.", options: ["I", "my", "me", "mine"], answer: 1, explain: `句中 the editor 意为“编辑”，manuscript 意为“手稿”。my 是放在 manuscript 前面的物主形容词。${L5_T1}`, difficulty: "困难", keepChoice: true },
  { q: "The institute protects ___ credibility.", options: ["it", "its", "their", "it's"], answer: 1, explain: `句中的 the institute 意为“研究所”。its 是 it 的所有格，没有撇号。${L5_T1}`, difficulty: "困难", keepChoice: true },
  { q: "The ___ findings are available.", options: ["investigators'", "researcherss", "investigators", "researcher's"], answer: 0, explain: `复数名词有 -s，撇号加在 s 后面，如 investigators'。句中 the investigators 意为“调查组”，the findings 意为“研究发现”。${L5_T2}`, difficulty: "困难", keepChoice: true },
  { q: "The committee published ___ findings without comment.", options: [], answer: 0, answerText: "its", baseWord: "it", sentence: "The committee published its findings without comment.", explain: `its 是 it 的所有格，没有撇号。句中的 the committee 意为“委员会”。${L5_T1}`, difficulty: "困难", kind: "blank" },
  { q: "The ___ summary is on the desk.", options: ["student's", "student", "studentses", "scholars"], answer: 0, explain: `句中 the student 意为“学生”，on the desk 意为“在桌子上”。单数 student 加所有格 ’s。${L5_T2}`, difficulty: "困难", keepChoice: true },
  { q: "This is ___ hypothesis.", options: ["his", "him", "he", "he's"], answer: 0, explain: `his 放在名词 hypothesis 前面表示所属。句中的 hypothesis 意为“假说”。${L5_T2}`, difficulty: "困难", keepChoice: true },
  { q: "The ___ report is on the desk.", options: ["students", "student", "student's", "studentses"], answer: 2, explain: `单数 student 加所有格 ’s。句中 the student 意为“学生”，on the desk 意为“在桌子上”。${L5_T3}`, difficulty: "困难", keepChoice: true },
  { q: "The researchers defended ___ methodology at the conference.", options: [], answer: 0, answerText: "their", baseWord: "they", sentence: "The researchers defended their methodology at the conference.", explain: `句中 the researchers 意为“研究人员”，the conference 意为“会议”。researchers 是复数，所以所有格是 their。${L5_T3}`, difficulty: "困难", kind: "blank" },
  { q: "The ___ names are on the cover.", options: ["authores", "author's", "authors'", "authors"], answer: 2, explain: `句中 authors 意为“作者们”。authors 已有复数 -s，所以撇号加在 s 后面。${L5_T2}`, difficulty: "困难", keepChoice: true },
  { q: "The methodology is ours; the conclusions are ___.", options: [], answer: 0, answerText: "theirs", baseWord: "they", sentence: "The methodology is ours; the conclusions are theirs.", explain: `单独站立、后面没有名词时，用 theirs。句中 the methodology 意为“研究方法”，conclusions 意为“结论”。${L5_T3}`, difficulty: "困难", kind: "blank" },
  { q: "The investigators present ___ findings.", options: ["their", "them", "theirs", "they"], answer: 0, explain: `their 是限定性的物主形容词，放在 findings 前面。句中的 the investigators 意为“调查组”。${L5_T2}`, difficulty: "困难", keepChoice: true },
  { q: "That interpretation is not ___（I）", options: [], answer: 0, answerText: "mine", baseWord: "I", sentence: "That interpretation is not mine.", explain: `I 的物主代词是 mine。${L5_T3}`, difficulty: "困难", kind: "blank" },
  { q: "The ___ results are available.", options: ["researcher's", "researchers", "researchers'", "researcherss"], answer: 2, explain: `句中 the researchers 意为“研究人员”，the results 意为“结果”。复数名词有 -s，撇号加在 s 后面，如 researchers'。${L5_T2}`, difficulty: "困难", keepChoice: true },
  { q: "The committee explains ___ decision.", options: ["their", "its", "it", "it's"], answer: 1, explain: `句中 the committee 意为“委员会”。its 放在 decision 前面表示所属关系。${L5_T2}`, difficulty: "困难", keepChoice: true },
  { q: "Our samples are ready. Are ___ ready?", options: ["yours", "you", "your", "yourself"], answer: 0, explain: `句中 samples 意为“样品”，ready 意为“准备好了”。yours 代替 your samples，单独站立。${L5_T3}`, difficulty: "困难", keepChoice: true },
  { q: "We presented ___ preliminary results in September.", options: [], answer: 0, answerText: "our", baseWord: "we", sentence: "We presented our preliminary results in September.", explain: `句中 in September 意为“在九月”，results 意为“结果”。we 的所有格是 our。${L5_T1}`, difficulty: "困难", kind: "blank" },
  { q: "My answer is different from ___（you）", options: [], answer: 0, answerText: "yours", baseWord: "you", sentence: "My answer is different from yours.", explain: `介词 from 后面、没有名词跟随时，用 yours。${L5_T2}`, difficulty: "困难", kind: "blank" },
  { q: "This laptop is ___.", options: ["me", "my", "I", "mine"], answer: 3, explain: `mine 是物主代词，在 is 后面单独站立。${L5_T3}`, difficulty: "困难", keepChoice: true },
  { q: "The new funding is ___.", options: ["theirs", "their", "they", "them"], answer: 0, explain: `theirs 是独立站立的物主代词。句中 funding 意为“经费”。${L5_T3}`, difficulty: "困难", keepChoice: true },
  { q: "Hoa forgot ___ umbrella at school.", options: [], answer: 0, answerText: "her", baseWord: "Hoa", sentence: "Hoa forgot her umbrella at school.", explain: `句中 at school 意为“在学校”。Hoa 是女性，所以物主形容词是 her。${L5_T1}`, difficulty: "困难", kind: "blank" },
];

// ---------------- 原站 A1 第 6 课测验原题（经作者授权翻译，本轮提取） ----------------
// 简单 20 题、中等 28 题、困难 24 题全收，题干、选项、答案、解析全部来自原站提取；
// 答案一律按答案文字定位（提取报告里的字母按九宫格位置标，与选项顺序对不上）。
// 跨档重复的题是原站本身复用，照原样保留、不去重；解析里原站写作「同第 X 题」的，
// 按所指那道题的原站解析全文收录。模板句统一译法：对象是单数还是复数，决定指示词
// 的形式。/ here 和 over there 这类提示词提供了选择所需的空间语境。/ 句中远近的
// 信息告诉我们说话人指的哪个对象。填空题括号里是原站给的中文提示；原站没给提示的
// 两道（中等第 21 题、困难第 16 题）括号词只作显示用「指示词」，题干与答案未动。
const A1_L6_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "Look at the documents on the far shelf. ___ documents are confidential.", options: ["It", "This", "That", "Those"], answer: 3, explain: "those 配远处的复数名词。句中 the documents 意为“文件”，the far shelf 意为“远处的架子”。对象是单数还是复数，决定指示词的形式。", difficulty: "简单", keepChoice: true },
  { q: "___ is my friend Hoa.", options: ["Them", "These", "Those", "This"], answer: 3, explain: "句中 friend 意为“朋友”。介绍就在身边的人时用 this。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：高架子上的那几本书是新的。", options: ["Those books on the top shelf they are new.", "Those books on the top shelf is new.", "Those book on the top shelf are new.", "Those books on the top shelf are new."], answer: 3, explain: "books 是复数又在远处，所以用 those，后面跟动词 are。对象是单数还是复数，决定指示词的形式。", difficulty: "简单", keepChoice: true },
  { q: "___ is my research notebook, here on the desk.", options: ["These", "Those", "This", "They"], answer: 2, explain: "句中 on the desk 意为“在桌子上”，research 意为“研究”。this 可以单独站立，指离说话人近的东西。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "简单", keepChoice: true },
  { q: "Can you see ___ birds on the roof?", options: ["this", "that", "those", "these"], answer: 2, explain: "birds 是复数又在远处，所以用 those。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "简单", keepChoice: true },
  { q: "___ poster here is about conservation.", options: ["This", "Those", "These", "They"], answer: 0, explain: "poster 是单数，here 表示离说话人近。对象是单数还是复数，决定指示词的形式。", difficulty: "简单", keepChoice: true },
  { q: "___ shoes here are mine, but ___ ones over there are yours.", options: ["Those / these", "These / those", "These / that", "This / that"], answer: 1, explain: "前半句说近处的复数东西，后半句说远处的复数东西。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "简单", keepChoice: true },
  { q: "Is ___ your supervisor over there?", options: ["that", "those", "they", "these"], answer: 0, explain: "句中 supervisor 意为“导师”。that 用于离说话人远的一个人。对象是单数还是复数，决定指示词的形式。", difficulty: "简单", keepChoice: true },
  { q: "Look at the reports in my hand. ___ reports are important.", options: ["It", "This", "These", "That"], answer: 2, explain: "these 放在近处的复数名词 reports 前面。句中 important 意为“重要的”。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：街尾那栋房子是我叔叔的。", options: ["These house at the end of the street belongs to my uncle.", "Those house at the end of the street belongs to my uncle.", "House that at the end of the street belongs to my uncle.", "That house at the end of the street belongs to my uncle."], answer: 3, explain: "house 是单数又在远处，所以用 that。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "简单", keepChoice: true },
  { q: "选出正确的选项。", options: ["These is my friend.", "This is my friend.", "This are my friend.", "This is are my friend."], answer: 1, explain: "一个人用 this，动词用 is。句中 friend 意为“朋友”。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "简单", keepChoice: true },
  { q: "Look at the chart on the far wall. ___ chart is useful.", options: ["They", "These", "Those", "That"], answer: 3, explain: "句中 the chart 意为“图表”，useful 意为“有用的”。that 放在单数名词前面，指远处的东西。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：这里的苹果很新鲜。", options: ["These apples here they are fresh.", "These apples here is fresh.", "These apple here are fresh.", "These apples here are fresh."], answer: 3, explain: "apples 是复数又在手边，所以用 these。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "简单", keepChoice: true },
  { q: "选出正确的选项。", options: ["This the pen is mine.", "This pen is mine.", "The this pen is mine.", "This a pen is mine."], answer: 1, explain: "指示词不和冠词连用。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：你好，我是 Mai。请问是 Nam 先生吗？", options: ["Hello, these is Mai speaking. Is that Mr Nam?", "Hello, this Mai speaking. Is that Mr Nam?", "Hello, this is Mai speaking. Is that Mr Nam?", "Hello, this are Mai speaking. Is that Mr Nam?"], answer: 2, explain: "打电话时，this 指说话人，that 指电话另一端的人。对象是单数还是复数，决定指示词的形式。", difficulty: "简单", keepChoice: true },
  { q: "选出正确的选项。", options: ["These books is mine.", "These books are mine.", "These book are mine.", "This books are mine."], answer: 1, explain: "these 配复数名词 books 和动词 are。对象是单数还是复数，决定指示词的形式。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：这是我的新包。", options: ["This is my bag new.", "This are my new bag.", "These is my new bag.", "This is my new bag."], answer: 3, explain: "this 单独站立作代词当主语，配 is。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "简单", keepChoice: true },
  { q: "Look at the report in my hand. ___ report is important.", options: ["Those", "This", "They", "These"], answer: 1, explain: "句中 the report in my hand 意为“我手里的报告”，important 意为“重要的”。this 配近处的单数名词 report。对象是单数还是复数，决定指示词的形式。", difficulty: "简单", keepChoice: true },
  { q: "选出正确的选项。", options: ["Those book are new.", "Those books they are new.", "Those books is new.", "Those books are new."], answer: 3, explain: "those 要求名词和动词都是复数。对象是单数还是复数，决定指示词的形式。", difficulty: "简单", keepChoice: true },
  { q: "选出远处复数东西的指示词。", options: ["that", "those", "these", "this"], answer: 1, explain: "远处加复数就是 those。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "简单", keepChoice: true },
  // ---- 中等 ----
  { q: "___ poster here is about conservation.", options: ["They", "This", "These", "Those"], answer: 1, explain: "poster 是单数，here 表示离说话人近。对象是单数还是复数，决定指示词的形式。", difficulty: "中等", keepChoice: true },
  { q: "Look at the diagram on the far wall. ___ diagram is useful.", options: ["Those", "They", "That", "These"], answer: 2, explain: "that 放在单数名词前面，指远处的东西。句中 the diagram 意为“示意图”，useful 意为“有用的”。对象是单数还是复数，决定指示词的形式。", difficulty: "中等", keepChoice: true },
  { q: "___ samples over there are not suitable for testing.", options: ["It", "That", "Those", "This"], answer: 2, explain: "句中 samples 意为“样品”。samples 是复数，over there 表示位置远。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "中等", keepChoice: true },
  { q: "What is ___ （被提到的是离说话人远处的东西/人） noise outside?", options: [], answer: 0, answerText: "that", baseWord: "被提到的是离说话人远处的东西/人", sentence: "What is that noise outside?", explain: "句中 noise 意为“噪音”。声音在远处、不能按复数数，所以用 that。对象是单数还是复数，决定指示词的形式。", difficulty: "中等", kind: "blank" },
  { q: "Look at the files on the far shelf. ___ documents are confidential.", options: ["It", "That", "This", "Those"], answer: 3, explain: "those 配远处的复数名词。句中 the documents 意为“文件”，the far shelf 意为“远处的架子”。对象是单数还是复数，决定指示词的形式。", difficulty: "中等", keepChoice: true },
  { q: "Is ___ your mentor over there?", options: ["these", "that", "they", "those"], answer: 1, explain: "句中 mentor 意为“导师”。that 用于离说话人远的一个人。对象是单数还是复数，决定指示词的形式。", difficulty: "中等", keepChoice: true },
  { q: "___ conclusions on the far screen are tentative.", options: ["Those", "It", "That", "This"], answer: 0, explain: "句中 conclusions 意为“结论”。conclusions 是复数，far 表示位置远。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "中等", keepChoice: true },
  { q: "I like ___ document here, not the one over there.", options: ["they", "those", "these", "this"], answer: 3, explain: "名词 document 是单数，here 表示近，所以是 this。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "中等", keepChoice: true },
  { q: "把中文翻译成英语：火车又晚点了。这种事每个星期一都会发生。", options: ["The train was late again. That happens every Monday.", "The train it was late again. That happens every Monday.", "Train was late again. That happens every Monday.", "The train were late again. That happens every Monday."], answer: 0, explain: "that 指回前一句刚提到的事。", difficulty: "中等", keepChoice: true },
  { q: "___ are the new devices, here in this box.", options: ["That", "These", "This", "It"], answer: 1, explain: "these 可以作主语，代替近处的复数名词。对象是单数还是复数，决定指示词的形式。", difficulty: "中等", keepChoice: true },
  { q: "Look at the documents on the far shelf. ___ documents are confidential.", options: ["That", "This", "It", "Those"], answer: 3, explain: "those 配远处的复数名词。句中 the documents 意为“文件”，the far shelf 意为“远处的架子”。对象是单数还是复数，决定指示词的形式。", difficulty: "中等", keepChoice: true },
  { q: "___ is an important observation in my notes here.", options: ["These", "They", "Those", "This"], answer: 3, explain: "this 指说话人在文中刚提到的一个新观察。句中 important 意为“重要的”。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "中等", keepChoice: true },
  { q: "___ are the new sensors, here in this box.", options: ["It", "This", "That", "These"], answer: 3, explain: "these 可以作主语，代替近处的复数名词。句中 sensors 意为“传感器”。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "中等", keepChoice: true },
  { q: "___ are the two models on the far table.", options: ["It", "Those", "That", "This"], answer: 1, explain: "those 用于离说话人远的两个东西。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "中等", keepChoice: true },
  { q: "We need ___ charts here, not the ones in the archive.", options: ["these", "this", "that", "it"], answer: 0, explain: "charts 是复数，加上 here 的信号，可以用 these。句中 the archive 意为“档案库”。对象是单数还是复数，决定指示词的形式。", difficulty: "中等", keepChoice: true },
  { q: "___ is my research notebook, here on the desk.", options: ["Those", "They", "These", "This"], answer: 3, explain: "句中 on the desk 意为“在桌子上”，research 意为“研究”。this 可以单独站立，指离说话人近的东西。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "中等", keepChoice: true },
  { q: "Look at the summary in my hand. ___ summary is important.", options: ["This", "Those", "These", "They"], answer: 0, explain: "this 配手里单数名词 summary。句中 the summary 意为“摘要”，important 意为“重要的”。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "中等", keepChoice: true },
  { q: "Is ___ your supervisor over there?", options: ["they", "these", "those", "that"], answer: 3, explain: "句中 supervisor 意为“导师”。that 用于离说话人远的一个人。对象是单数还是复数，决定指示词的形式。", difficulty: "中等", keepChoice: true },
  { q: "___ （离说话人近） findings contradict the earlier literature.", options: [], answer: 0, answerText: "These", baseWord: "离说话人近", sentence: "These findings contradict the earlier literature.", explain: "findings 是复数又在文中靠近的位置，所以用 these。对象是单数还是复数，决定指示词的形式。", difficulty: "中等", kind: "blank" },
  { q: "___ is my field notebook, here on the desk.", options: ["Those", "They", "These", "This"], answer: 3, explain: "this 可以单独站立，指离说话人近的东西。句中 on the desk 意为“在桌子上”。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "中等", keepChoice: true },
  { q: "___ apples here are fresh.", options: [], answer: 0, answerText: "These", baseWord: "指示词", sentence: "These apples here are fresh.", explain: "东西在近处、又是复数，用 these。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "中等", kind: "blank" },
  { q: "___ samples over there are not usable.", options: ["That", "It", "This", "Those"], answer: 3, explain: "句中 samples 意为“样品”。samples 是复数，over there 表示位置远。对象是单数还是复数，决定指示词的形式。", difficulty: "中等", keepChoice: true },
  { q: "Look at the research papers in my hand. ___ reports are important.", options: ["This", "That", "These", "It"], answer: 2, explain: "句中 research papers 意为“研究论文”，important 意为“重要的”。these 放在近处的复数名词 reports 前面。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "中等", keepChoice: true },
  { q: "I like ___ manuscript here, not the one over there.", options: ["these", "this", "those", "they"], answer: 1, explain: "句中 manuscript 意为“手稿”。名词 manuscript 是单数，here 表示近，所以是 this。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "中等", keepChoice: true },
  { q: "___ are the two models on the far desk.", options: ["That", "It", "Those", "This"], answer: 2, explain: "those 用于离说话人远的两个东西。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "中等", keepChoice: true },
  { q: "___ figures here are easy to read.", options: ["These", "It", "That", "This"], answer: 0, explain: "figures 是复数又在近处，所以用 these。句中 easy 意为“容易的”。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "中等", keepChoice: true },
  { q: "Please check ___ file on that shelf over there.", options: ["they", "those", "that", "these"], answer: 2, explain: "file 是单数又在远处，所以用 that。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "中等", keepChoice: true },
  { q: "Hello, ___ （离说话人近） is Mai speaking.", options: [], answer: 0, answerText: "this", baseWord: "离说话人近", sentence: "Hello, this is Mai speaking.", explain: "打电话时，说话人用 this 自我介绍。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "中等", kind: "blank" },
  // ---- 困难 ----
  { q: "___ are the two models on the far desk.", options: ["This", "It", "That", "Those"], answer: 3, explain: "those 用于离说话人远的两个东西。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "困难", keepChoice: true },
  { q: "Hello, ___ （离说话人近） is Mai speaking.", options: [], answer: 0, answerText: "this", baseWord: "离说话人近", sentence: "Hello, this is Mai speaking.", explain: "打电话时，说话人用 this 自我介绍。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "困难", kind: "blank" },
  { q: "Please check ___ file on that shelf over there.", options: ["that", "they", "these", "those"], answer: 0, explain: "file 是单数又在远处，所以用 that。对象是单数还是复数，决定指示词的形式。", difficulty: "困难", keepChoice: true },
  { q: "___ are the two models on the far table.", options: ["That", "It", "Those", "This"], answer: 2, explain: "those 用于离说话人远的两个东西。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "困难", keepChoice: true },
  { q: "We need ___ charts here, not the ones in the archive.", options: ["that", "it", "these", "this"], answer: 2, explain: "charts 是复数，加上 here 的信号，可以用 these。句中 the archive 意为“档案库”。对象是单数还是复数，决定指示词的形式。", difficulty: "困难", keepChoice: true },
  { q: "___ samples over there are not usable.", options: ["This", "That", "Those", "It"], answer: 2, explain: "句中 samples 意为“样品”。samples 是复数，over there 表示位置远。对象是单数还是复数，决定指示词的形式。", difficulty: "困难", keepChoice: true },
  { q: "Look at the research papers in my hand. ___ reports are important.", options: ["That", "It", "These", "This"], answer: 2, explain: "句中 research papers 意为“研究论文”，important 意为“重要的”。these 放在近处的复数名词 reports 前面。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "困难", keepChoice: true },
  { q: "I like ___ manuscript here, not the one over there.", options: ["those", "these", "this", "they"], answer: 2, explain: "句中 manuscript 意为“手稿”。名词 manuscript 是单数，here 表示近，所以是 this。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "困难", keepChoice: true },
  { q: "___ are the new devices, here in this box.", options: ["This", "It", "These", "That"], answer: 2, explain: "these 可以作主语，代替近处的复数名词。对象是单数还是复数，决定指示词的形式。", difficulty: "困难", keepChoice: true },
  { q: "___ conclusions on the far screen are tentative.", options: ["That", "It", "Those", "This"], answer: 2, explain: "句中 conclusions 意为“结论”。conclusions 是复数，far 表示位置远。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "困难", keepChoice: true },
  { q: "___ is an important observation in my notes here.", options: ["They", "Those", "These", "This"], answer: 3, explain: "this 指说话人在文中刚提到的一个新观察。句中 important 意为“重要的”。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "困难", keepChoice: true },
  { q: "Look at the diagram on the far wall. ___ diagram is useful.", options: ["That", "They", "These", "Those"], answer: 0, explain: "that 放在单数名词前面，指远处的东西。句中 the diagram 意为“示意图”，useful 意为“有用的”。对象是单数还是复数，决定指示词的形式。", difficulty: "困难", keepChoice: true },
  { q: "___ are the new sensors, here in this box.", options: ["That", "These", "This", "It"], answer: 1, explain: "these 可以作主语，代替近处的复数名词。句中 sensors 意为“传感器”。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "困难", keepChoice: true },
  { q: "___ figures here are easy to read.", options: ["These", "That", "This", "It"], answer: 0, explain: "figures 是复数又在近处，所以用 these。句中 easy 意为“容易的”。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "困难", keepChoice: true },
  { q: "I like ___ document here, not the one over there.", options: ["they", "these", "those", "this"], answer: 3, explain: "名词 document 是单数，here 表示近，所以是 this。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "困难", keepChoice: true },
  { q: "___ apples here are fresh.", options: [], answer: 0, answerText: "These", baseWord: "指示词", sentence: "These apples here are fresh.", explain: "东西在近处、又是复数，用 these。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "困难", kind: "blank" },
  { q: "Look at the summary in my hand. ___ summary is important.", options: ["Those", "These", "This", "They"], answer: 2, explain: "this 配手里单数名词 summary。句中 the summary 意为“摘要”，important 意为“重要的”。here 和 over there 这类提示词提供了选择所需的空间语境。", difficulty: "困难", keepChoice: true },
  { q: "___ is my field notebook, here on the desk.", options: ["They", "These", "This", "Those"], answer: 2, explain: "this 可以单独站立，指离说话人近的东西。句中 on the desk 意为“在桌子上”。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "困难", keepChoice: true },
  { q: "___ samples over there are not suitable for testing.", options: ["It", "That", "Those", "This"], answer: 2, explain: "句中 samples 意为“样品”。samples 是复数，over there 表示位置远。句中远近的信息告诉我们说话人指的哪个对象。", difficulty: "困难", keepChoice: true },
  { q: "把中文翻译成英语：火车又晚点了。这种事每个星期一都会发生。", options: ["Train was late again. That happens every Monday.", "The train was late again. That happens every Monday.", "The train were late again. That happens every Monday.", "The train it was late again. That happens every Monday."], answer: 1, explain: "that 指回前一句刚提到的事。", difficulty: "困难", keepChoice: true },
  { q: "Look at the files on the far shelf. ___ documents are confidential.", options: ["It", "That", "Those", "This"], answer: 2, explain: "those 配远处的复数名词。句中 the documents 意为“文件”，the far shelf 意为“远处的架子”。对象是单数还是复数，决定指示词的形式。", difficulty: "困难", keepChoice: true },
  { q: "What is ___ （被提到的是离说话人远处的东西/人） noise outside?", options: [], answer: 0, answerText: "that", baseWord: "被提到的是离说话人远处的东西/人", sentence: "What is that noise outside?", explain: "句中 noise 意为“噪音”。声音在远处、不能按复数数，所以用 that。对象是单数还是复数，决定指示词的形式。", difficulty: "困难", kind: "blank" },
  { q: "Is ___ your mentor over there?", options: ["that", "those", "these", "they"], answer: 0, explain: "句中 mentor 意为“导师”。that 用于离说话人远的一个人。对象是单数还是复数，决定指示词的形式。", difficulty: "困难", keepChoice: true },
  { q: "___ （离说话人近） findings contradict the earlier literature.", options: [], answer: 0, answerText: "These", baseWord: "离说话人近", sentence: "These findings contradict the earlier literature.", explain: "findings 是复数又在文中靠近的位置，所以用 these。对象是单数还是复数，决定指示词的形式。", difficulty: "困难", kind: "blank" },
];

// ---------------- 原站 A1 第 7 课测验原题（经作者授权翻译，本轮提取） ----------------
// 简单 20 题、中等 30 题、困难 26 题全收，题干、选项、答案、解析全部来自原站提取；
// 答案一律按答案文字定位（提取报告里的字母按九宫格位置标，与选项顺序对不上）。
// 跨档重复的题是原站本身复用，照原样保留、不去重；解析里原站写作「同第 X 题」的，
// 按所指那道题的原站解析全文收录。模板句统一译法见各题解析（开头音 / 定冠词 the /
// 未确定对象 / 确定程度四句）。「不用冠词」选项统一显示为「—（不用冠词）」：原站
// 有的只写「—」、有的写「不用冠词」，答案即该选项。中等第 21 题原站题干写
// reference manual、解析写 dictionary，是原站自己的表述不一致，照实收录。
const A1_L7_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "把中文翻译成英语：我在花园里看到一只狗。那只狗很友好。", options: ["I did saw a dog in the garden. The dog was friendly.", "I saw a dog in the garden. The dog were friendly.", "I saw a dog in the garden. The dog was friendly.", "I saw an dog in the garden. The dog was friendly."], answer: 2, explain: "第一次用 a，因为听者还不知道是哪只；第二次用 the，因为对象已经确定了。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：我阿姨是工程师，我叔叔是老师。", options: ["My aunt is an engineer and my uncle is a teacher.", "My aunt is an engineer and my uncle is a teachers.", "My aunt is an engineer and my uncle is an teacher.", "My aunt is a engineer and my uncle is a teacher."], answer: 0, explain: "一个人的职业总要配 a/an，和中文的说法不一样。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "简单", keepChoice: true },
  { q: "There is ___ new café near our school.", options: ["—（不用冠词）", "an", "a", "the"], answer: 2, explain: "对象是新的，听者还不知道；new 开头的音是辅音。句中 school 意为“学校”。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "简单", keepChoice: true },
  { q: "选出正确的选项。", options: ["Life it is short.", "Life are short.", "The life is short.", "Life is short."], answer: 3, explain: "不可数名词表示泛指时不用 the。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "简单", keepChoice: true },
  { q: "He is ___ honest man.", options: ["a", "an", "the", "—（不用冠词）"], answer: 1, explain: "honest 的 h 不发音，所以开头的音是元音。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "简单", keepChoice: true },
  { q: "This is ___ one-way street.", options: ["an", "a", "—（不用冠词）", "the"], answer: 1, explain: "one 读作 /wʌn/，所以开头的音是辅音。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "简单", keepChoice: true },
  { q: "选出正确的选项。", options: ["Dogs are loyal animals.", "The dogs are loyal animals.", "An dogs are loyal animals.", "A dogs are loyal animals."], answer: 0, explain: "说整个狗类时，用没有冠词的复数名词。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "简单", keepChoice: true },
  { q: "We use ___ oxygen for respiration.", options: ["—（不用冠词）", "An", "A", "One"], answer: 0, explain: "句中 oxygen 意为“氧气”。oxygen 泛指这种物质、不可数时，用零冠词。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "简单", keepChoice: true },
  { q: "She is ___ economist.", options: ["an", "—（不用冠词）", "a", "any"], answer: 0, explain: "economist 以元音开头，所以用 an。句中 an economist 意为“一位经济学家”。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "简单", keepChoice: true },
  { q: "___ water is necessary for every living thing.", options: ["An", "A", "The", "—（不用冠词）"], answer: 3, explain: "不可数名词表示泛指时，前面没有冠词。句中 water 意为“水”。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "简单", keepChoice: true },
  { q: "___ moon looks very bright tonight.", options: ["The", "A", "An", "—（不用冠词）"], answer: 0, explain: "句中 the moon 意为“月亮”。在说地球的月亮这个语境里，说话人用 the moon，因为对象是确定的。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "简单", keepChoice: true },
  { q: "He studies at ___ university in Hue.", options: ["an", "the", "—（不用冠词）", "a"], answer: 3, explain: "university 读作 /juːnɪ/，开头的音是辅音。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "简单", keepChoice: true },
  { q: "选出正确的选项。", options: ["My brother is doctor.", "My brother is an doctor.", "My brother is a doctors.", "My brother is a doctor."], answer: 3, explain: "to be 后面的单数职业需要冠词 a/an。句中 my brother 意为“我哥哥/弟弟”，a doctor 意为“一位医生”。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：孩子需要睡眠和新鲜空气。", options: ["Children are need sleep and fresh air.", "Childs need sleep and fresh air.", "Children needing sleep and fresh air.", "Children need sleep and fresh air."], answer: 3, explain: "复数名词和不可数名词表示泛指时没有冠词。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "简单", keepChoice: true },
  { q: "选出正确的选项。", options: ["I ate the apple and the banana for first time.", "I ate an apple and a banana.", "I ate a apple and an banana.", "I ate apple and banana."], answer: 1, explain: "apple 开头的音是元音；banana 开头的音是辅音。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "简单", keepChoice: true },
  { q: "This is ___ useful methodology.", options: ["any", "—（不用冠词）", "an", "a"], answer: 3, explain: "useful 以 /j/ 音开头，所以用 a。句中 methodology 意为“研究方法”，useful 意为“有用的”。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "简单", keepChoice: true },
  { q: "把中文翻译成英语：太阳从东方升起。", options: ["The sun in the east rises.", "The sun is rises in the east.", "Sun rises in the east.", "The sun rises in the east."], answer: 3, explain: "在说地球的太阳和东方时，用 the sun 和 in the east。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "简单", keepChoice: true },
  { q: "___ moon is very bright tonight.", options: ["The", "Any", "—（不用冠词）", "An"], answer: 0, explain: "在这个情境里，the moon 指地球确定的那个月亮。句中 the moon 意为“月亮”。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "简单", keepChoice: true },
  { q: "He is ___ university lecturer.", options: ["any", "a", "—（不用冠词）", "an"], answer: 1, explain: "university 以 /j/ 音开头，所以用 a。句中 a university lecturer 意为“一位大学讲师”。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "简单", keepChoice: true },
  { q: "___ hour", options: ["an", "a", "—（不用冠词）", "the"], answer: 0, explain: "hour 的 h 不发音，所以开头的音是元音。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "简单", keepChoice: true },
  // ---- 中等 ----
  { q: "The interview lasted ___ （第一次介绍的对象，还没有具体确定下来） hour and twenty minutes.", options: [], answer: 0, answerText: "an", baseWord: "第一次介绍的对象，还没有具体确定下来", sentence: "The interview lasted an hour and twenty minutes.", explain: "hour 的 h 不发音，读的时候以元音开头，所以用 an。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "中等", kind: "blank" },
  { q: "Could you close ___ （说话人和听者能确定说的是哪个对象） window, please?", options: [], answer: 0, answerText: "the", baseWord: "说话人和听者能确定说的是哪个对象", sentence: "Could you close the window, please?", explain: "语境已经说清楚是哪扇窗，所以用 the。句中 the window 意为“窗户”。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "中等", kind: "blank" },
  { q: "___ moon is very bright tonight.", options: ["—（不用冠词）", "The", "An", "Any"], answer: 1, explain: "在这个情境里，the moon 指地球确定的那个月亮。句中 the moon 意为“月亮”。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "中等", keepChoice: true },
  { q: "She holds ___ （第一次介绍的对象，还没有具体确定下来） university post in environmental science.", options: [], answer: 0, answerText: "a", baseWord: "第一次介绍的对象，还没有具体确定下来", sentence: "She holds a university post in environmental science.", explain: "university 的 /j/ 音前面用 a，不用 an。句中 environmental science 意为“环境科学”。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "中等", kind: "blank" },
  { q: "We need ___ hour to finish the review.", options: ["—（不用冠词）", "an", "a", "any"], answer: 1, explain: "hour 的 h 不发音，开头的音是元音，所以用 an。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "中等", keepChoice: true },
  { q: "Dr Linh is ___ engineer.", options: ["a", "an", "any", "—（不用冠词）"], answer: 1, explain: "engineer 以元音开头，所以用 an。句中 an engineer 意为“一位工程师”。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "中等", keepChoice: true },
  { q: "I have ___ umbrella in my bag. It is any ordinary umbrella.", options: ["any", "a", "—（不用冠词）", "an"], answer: 3, explain: "umbrella 以元音开头，而且是第一次介绍。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "中等", keepChoice: true },
  { q: "She is ___ environmental economist.", options: ["any", "a", "an", "—（不用冠词）"], answer: 2, explain: "environmental economist 以元音开头，所以用 an。句中 economist 意为“经济学家”。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "中等", keepChoice: true },
  { q: "___ evidence is essential for sound research.", options: ["One", "An", "A", "—（不用冠词）"], answer: 3, explain: "句中 essential 意为“必要的”，evidence 意为“证据”。evidence 表示泛指、不可数，通常用零冠词。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "中等", keepChoice: true },
  { q: "We need ___ hour to complete the analysis.", options: ["an", "any", "—（不用冠词）", "a"], answer: 0, explain: "hour 的 h 不发音，开头的音是元音，所以用 an。句中 the analysis 意为“分析”。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "中等", keepChoice: true },
  { q: "___ moon is very clear tonight.", options: ["—（不用冠词）", "Any", "The", "An"], answer: 2, explain: "句中 the moon 意为“月亮”，clear 意为“晴朗的”。在这个情境里，the moon 指地球确定的那个月亮。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "中等", keepChoice: true },
  { q: "This is ___ useful framework.", options: ["—（不用冠词）", "an", "any", "a"], answer: 3, explain: "句中 useful 意为“有用的”。useful 以 /j/ 音开头，所以用 a。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "中等", keepChoice: true },
  { q: "This is ___ useful methodology.", options: ["any", "—（不用冠词）", "an", "a"], answer: 3, explain: "useful 以 /j/ 音开头，所以用 a。句中 methodology 意为“研究方法”，useful 意为“有用的”。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "中等", keepChoice: true },
  { q: "___ Pacific Ocean is vast.", options: ["An", "The", "—（不用冠词）", "A"], answer: 1, explain: "大洋的名字通常带 the，比如 the Pacific Ocean。句中 the Pacific Ocean 意为“太平洋”。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "中等", keepChoice: true },
  { q: "把中文翻译成英语：他在大学外面等了一个小时。", options: ["He waited for an hour outside a university.", "He waited for an hour outside an university.", "He waited for an hour outside a universities.", "He waited for a hour outside a university."], answer: 0, explain: "hour 开头的音是元音，所以用 an；university 开头的音是 /j/，所以用 a。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "中等", keepChoice: true },
  { q: "The editor has a report. ___ report is on the desk.", options: ["Any", "The", "An", "—（不用冠词）"], answer: 1, explain: "句中 on the desk 意为“在桌子上”，the editor 意为“编辑”。第二次提到 report，听者已经能确定是哪个报告。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "中等", keepChoice: true },
  { q: "I need ___ dictionary for this task. It can be any dictionary.", options: ["—（不用冠词）", "any", "an", "a"], answer: 3, explain: "句中 dictionary 意为“词典”。说任意一本词典、第一次介绍时，用 a。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "中等", keepChoice: true },
  { q: "She works at ___ European university.", options: ["a", "—（不用冠词）", "any", "an"], answer: 0, explain: "European 以 /j/ 音开头，所以用 a。句中 a European university 意为“一所欧洲大学”。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "中等", keepChoice: true },
  { q: "The sun sets in ___ （说话人和听者能确定说的是哪个对象） west.", options: [], answer: 0, answerText: "the", baseWord: "说话人和听者能确定说的是哪个对象", sentence: "The sun sets in the west.", explain: "句中 the sun 意为“太阳”。方向词配 the。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "中等", kind: "blank" },
  { q: "把中文翻译成英语：请你把灯关掉好吗？", options: ["Could you turn off the light, please?", "You Could turn off the light, please?", "Could you to turn off the light, please?", "Could you turning off the light, please?"], answer: 0, explain: "两个人都知道是房间里的哪盏灯，所以第一次提就用 the。", difficulty: "中等", keepChoice: true },
  { q: "I need ___ reference manual for this task. It can be any dictionary.", options: ["an", "—（不用冠词）", "a", "any"], answer: 2, explain: "说任意一本词典、第一次介绍时，用 a。句中 dictionary 意为“词典”。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "中等", keepChoice: true },
  { q: "He is ___ university lecturer.", options: ["any", "an", "—（不用冠词）", "a"], answer: 3, explain: "university 以 /j/ 音开头，所以用 a。句中 a university lecturer 意为“一位大学讲师”。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "中等", keepChoice: true },
  { q: "The project received ___ （第一次介绍的对象，还没有具体确定下来） European research grant.", options: [], answer: 0, answerText: "a", baseWord: "第一次介绍的对象，还没有具体确定下来", sentence: "The project received a European research grant.", explain: "句中 the project 意为“项目”，research 意为“研究”。European 的发音以 /j/ 音开头，所以用 a。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "中等", kind: "blank" },
  { q: "The team needs ___ new microscope, not a specific one.", options: ["—（不用冠词）", "a", "any", "an"], answer: 1, explain: "new microscope 是可数单数、不确定的名词，用 a。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "中等", keepChoice: true },
  { q: "We use ___ oxygen for respiration.", options: ["—（不用冠词）", "One", "A", "An"], answer: 0, explain: "句中 oxygen 意为“氧气”。oxygen 泛指这种物质、不可数时，用零冠词。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "中等", keepChoice: true },
  { q: "He studies ___ mathematics every day.", options: ["One", "An", "—（不用冠词）", "A"], answer: 2, explain: "学科名称 mathematics 在泛指情况下不需要冠词。句中 mathematics 意为“数学”，school 意为“学校”。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "中等", keepChoice: true },
  { q: "The reviewer has a summary. ___ summary is on the desk.", options: ["Any", "The", "An", "—（不用冠词）"], answer: 1, explain: "第二次提到 summary，听者已经能确定是哪个报告。句中 the reviewer 意为“审稿人”，the summary 意为“摘要”。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "中等", keepChoice: true },
  { q: "He is ___ university researcher.", options: ["any", "an", "—（不用冠词）", "a"], answer: 3, explain: "university 以 /j/ 音开头，所以用 a。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "中等", keepChoice: true },
  { q: "The paper offers ___ （第一次介绍的对象，还没有具体确定下来） analysis of three decades of rainfall.", options: [], answer: 0, answerText: "an", baseWord: "第一次介绍的对象，还没有具体确定下来", sentence: "The paper offers an analysis of three decades of rainfall.", explain: "句中 analysis 意为“分析”，rainfall 意为“降雨量”。analysis 的发音以元音 /ə/ 开头，用 an。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "中等", kind: "blank" },
  { q: "___ research is important in modern society.", options: ["—（不用冠词）", "An", "A", "One"], answer: 0, explain: "句中 important 意为“重要的”，research 意为“研究”。research 泛指时不可数，所以不需要冠词。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "中等", keepChoice: true },
  // ---- 困难 ----
  { q: "Could you close ___ （说话人和听者能确定说的是哪个对象） window, please?", options: [], answer: 0, answerText: "the", baseWord: "说话人和听者能确定说的是哪个对象", sentence: "Could you close the window, please?", explain: "语境已经说清楚是哪扇窗，所以用 the。句中 the window 意为“窗户”。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "困难", kind: "blank" },
  { q: "把中文翻译成英语：请你把灯关掉好吗？", options: ["Could you to turn off the light, please?", "Could you turn off the light, please?", "Could you turning off the light, please?", "You Could turn off the light, please?"], answer: 1, explain: "两个人都知道是房间里的哪盏灯，所以第一次提就用 the。", difficulty: "困难", keepChoice: true },
  { q: "The sun sets in ___ （说话人和听者能确定说的是哪个对象） west.", options: [], answer: 0, answerText: "the", baseWord: "说话人和听者能确定说的是哪个对象", sentence: "The sun sets in the west.", explain: "句中 the sun 意为“太阳”。方向词配 the。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "困难", kind: "blank" },
  { q: "The project received ___ （第一次介绍的对象，还没有具体确定下来） European research grant.", options: [], answer: 0, answerText: "a", baseWord: "第一次介绍的对象，还没有具体确定下来", sentence: "The project received a European research grant.", explain: "句中 the project 意为“项目”，research 意为“研究”。European 的发音以 /j/ 音开头，所以用 a。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "困难", kind: "blank" },
  { q: "I need ___ reference manual for this task. It can be any dictionary.", options: ["—（不用冠词）", "a", "any", "an"], answer: 1, explain: "说任意一本词典、第一次介绍时，用 a。句中 dictionary 意为“词典”。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "困难", keepChoice: true },
  { q: "Dr Linh is ___ engineer.", options: ["an", "a", "—（不用冠词）", "any"], answer: 0, explain: "engineer 以元音开头，所以用 an。句中 an engineer 意为“一位工程师”。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "困难", keepChoice: true },
  { q: "The team needs ___ new microscope, not a specific one.", options: ["a", "any", "—（不用冠词）", "an"], answer: 0, explain: "new microscope 是可数单数、不确定的名词，用 a。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "困难", keepChoice: true },
  { q: "We need ___ hour to finish the review.", options: ["an", "any", "a", "—（不用冠词）"], answer: 0, explain: "hour 的 h 不发音，开头的音是元音，所以用 an。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "困难", keepChoice: true },
  { q: "___ research is important in modern society.", options: ["One", "—（不用冠词）", "A", "An"], answer: 1, explain: "句中 important 意为“重要的”，research 意为“研究”。research 泛指时不可数，所以不需要冠词。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "困难", keepChoice: true },
  { q: "The interview lasted ___ （第一次介绍的对象，还没有具体确定下来） hour and twenty minutes.", options: [], answer: 0, answerText: "an", baseWord: "第一次介绍的对象，还没有具体确定下来", sentence: "The interview lasted an hour and twenty minutes.", explain: "hour 的 h 不发音，读的时候以元音开头，所以用 an。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "困难", kind: "blank" },
  { q: "He is ___ university researcher.", options: ["a", "any", "—（不用冠词）", "an"], answer: 0, explain: "university 以 /j/ 音开头，所以用 a。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "困难", keepChoice: true },
  { q: "She holds ___ （第一次介绍的对象，还没有具体确定下来） university post in environmental science.", options: [], answer: 0, answerText: "a", baseWord: "第一次介绍的对象，还没有具体确定下来", sentence: "She holds a university post in environmental science.", explain: "university 的 /j/ 音前面用 a，不用 an。句中 environmental science 意为“环境科学”。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "困难", kind: "blank" },
  { q: "I have ___ umbrella in my bag. It is any ordinary umbrella.", options: ["an", "any", "a", "—（不用冠词）"], answer: 0, explain: "umbrella 以元音开头，而且是第一次介绍。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "困难", keepChoice: true },
  { q: "The editor has a report. ___ report is on the desk.", options: ["Any", "An", "—（不用冠词）", "The"], answer: 3, explain: "句中 on the desk 意为“在桌子上”，the editor 意为“编辑”。第二次提到 report，听者已经能确定是哪个报告。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "困难", keepChoice: true },
  { q: "He studies ___ mathematics every day.", options: ["—（不用冠词）", "One", "An", "A"], answer: 0, explain: "学科名称 mathematics 在泛指情况下不需要冠词。句中 mathematics 意为“数学”，school 意为“学校”。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "困难", keepChoice: true },
  { q: "The paper offers ___ （第一次介绍的对象，还没有具体确定下来） analysis of three decades of rainfall.", options: [], answer: 0, answerText: "an", baseWord: "第一次介绍的对象，还没有具体确定下来", sentence: "The paper offers an analysis of three decades of rainfall.", explain: "句中 analysis 意为“分析”，rainfall 意为“降雨量”。analysis 的发音以元音 /ə/ 开头，用 an。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "困难", kind: "blank" },
  { q: "___ moon is very clear tonight.", options: ["—（不用冠词）", "An", "Any", "The"], answer: 3, explain: "句中 the moon 意为“月亮”，clear 意为“晴朗的”。在这个情境里，the moon 指地球确定的那个月亮。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "困难", keepChoice: true },
  { q: "I need ___ dictionary for this task. It can be any dictionary.", options: ["an", "a", "any", "—（不用冠词）"], answer: 1, explain: "句中 dictionary 意为“词典”。说任意一本词典、第一次介绍时，用 a。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "困难", keepChoice: true },
  { q: "___ evidence is essential for sound research.", options: ["A", "—（不用冠词）", "An", "One"], answer: 1, explain: "句中 essential 意为“必要的”，evidence 意为“证据”。evidence 表示泛指、不可数，通常用零冠词。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "困难", keepChoice: true },
  { q: "This is ___ useful framework.", options: ["an", "a", "—（不用冠词）", "any"], answer: 1, explain: "句中 useful 意为“有用的”。useful 以 /j/ 音开头，所以用 a。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "困难", keepChoice: true },
  { q: "She works at ___ European university.", options: ["any", "a", "an", "—（不用冠词）"], answer: 1, explain: "European 以 /j/ 音开头，所以用 a。句中 a European university 意为“一所欧洲大学”。选 a 还是 an 要看发音时的开头音，因为第一个字母不一定能说明实际的开头音。", difficulty: "困难", keepChoice: true },
  { q: "We need ___ hour to complete the analysis.", options: ["—（不用冠词）", "a", "an", "any"], answer: 2, explain: "hour 的 h 不发音，开头的音是元音，所以用 an。句中 the analysis 意为“分析”。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "困难", keepChoice: true },
  { q: "The reviewer has a summary. ___ summary is on the desk.", options: ["The", "An", "Any", "—（不用冠词）"], answer: 0, explain: "第二次提到 summary，听者已经能确定是哪个报告。句中 the reviewer 意为“审稿人”，the summary 意为“摘要”。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "困难", keepChoice: true },
  { q: "把中文翻译成英语：他在大学外面等了一个小时。", options: ["He waited for an hour outside a universities.", "He waited for a hour outside a university.", "He waited for an hour outside an university.", "He waited for an hour outside a university."], answer: 3, explain: "hour 开头的音是元音，所以用 an；university 开头的音是 /j/，所以用 a。说一个还没确定的对象时，冠词的用法取决于名词的种类和后面那个词开头的音。", difficulty: "困难", keepChoice: true },
  { q: "___ Pacific Ocean is vast.", options: ["The", "An", "—（不用冠词）", "A"], answer: 0, explain: "大洋的名字通常带 the，比如 the Pacific Ocean。句中 the Pacific Ocean 意为“太平洋”。在这里，用不用冠词取决于语境中名词的确定程度。", difficulty: "困难", keepChoice: true },
  { q: "She is ___ environmental economist.", options: ["an", "any", "—（不用冠词）", "a"], answer: 0, explain: "environmental economist 以元音开头，所以用 an。句中 economist 意为“经济学家”。说话人和听者能确定说的是哪个对象时，用定冠词 the。", difficulty: "困难", keepChoice: true },
];

// ---------------- 原站 A1 第 8 课测验原题（经作者授权翻译，本轮提取） ----------------
// 简单 20 题、中等 29 题、困难 25 题全收，无待补。题干、选项、答案、解析全部来自
// 原站提取；答案一律按答案文字定位（提取报告里的字母按九宫格位置标，与选项顺序
// 对不上）。跨档重复的题是原站本身复用，照原样保留、不去重。填空题原站无括号
// 提示词的 4 道（中等第 7、23 题，困难第 1、10 题）括号词只作显示用「量词」，
// 题干与答案未动。简单第 17 题是双空题，选项为成对量词，照原样收录（原站没有
// any/any 这一组选项，不补）。
const A1_L8_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "The laboratory needs ___ additional space.", options: ["a few", "several", "many", "some"], answer: 3, explain: "句中 the laboratory 的意思是“实验室”，space 的意思是“空间”。这里的 space 不可数，用 some。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的句子。", options: ["I don't have any money.", "I don't have some money.", "I don't have much moneys.", "I don't have many money."], answer: 0, explain: "否定句用 any。句中的 money 意思是“钱”。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "简单", keepChoice: true },
  { q: "Do you have ___ brothers or sisters?", options: ["any", "much", "a little", "a"], answer: 0, explain: "一般疑问句用 any。Brothers、sisters 是可数名词复数：a 只与单数名词连用，much 和 a little 只与不可数名词连用。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "简单", keepChoice: true },
  { q: "你走之前喝点茶，好吗？", options: ["Would you like much tea before you leave?", "Would you like a few tea before you leave?", "Would you like some tea before you leave?", "Would you like many tea before you leave?"], answer: 2, explain: "这个句子形式上是疑问句，但意思是邀请，所以用 some，不用 any。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "简单", keepChoice: true },
  { q: "选择与可数名词复数搭配的量词。", options: ["much", "a lot", "little", "many"], answer: 3, explain: "Many 只与可数名词复数连用。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的句子。", options: ["Is there much questions?", "Are there any questions?", "Are there much questions?", "Is there some questions?"], answer: 1, explain: "Any 与可数名词连用时，名词用复数形式。Much 只与不可数名词连用；are there 与复数名词连用，所以 is there 是错的。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的句子。", options: ["There isn't many rice left.", "There aren't much rice left.", "There isn't much rice left.", "There aren't many rices left."], answer: 2, explain: "句中的 much 意思是“许多”。Rice 不可数，所以用 much，动词用单数。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的问句。", options: ["How much students are there in your class?", "How many student are there in your class?", "How many students are there in your class?", "How much student is there in your class?"], answer: 2, explain: "How many 与可数名词复数和复数动词连用。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "简单", keepChoice: true },
  { q: "How ___ funding is available?", options: ["many", "much", "few", "a few"], answer: 1, explain: "句中 available 的意思是“可用的”，funding 的意思是“经费”。Funding 不可数，所以用 How much。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的句子。", options: ["Not many people came.", "Not much people came.", "Not many peoples came.", "Not much peoples came."], answer: 0, explain: "句中的 many 意思是“许多”。People 是可数名词复数，所以用 many。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的句子。", options: ["We do not have much time left.", "We do not have much times left.", "We do not have many time left.", "We do not have any time left."], answer: 3, explain: "否定句用 any；time 是不可数名词，保持单数形式。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "简单", keepChoice: true },
  { q: "___ water should I add to the pot?", options: ["How few", "How much", "How many", "How little"], answer: 1, explain: "句中的 water 意思是“水”。Water 不可数，所以用 how much。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "简单", keepChoice: true },
  { q: "The river contains ___ pollution.", options: ["many", "much", "a lot", "some"], answer: 3, explain: "句中的 some 意思是“一些”。Pollution 在泛指污染这个意思时不可数。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "简单", keepChoice: true },
  { q: "选择既可与可数名词复数搭配、也可与不可数名词搭配的量词。", options: ["a lot of", "a few", "a little", "much"], answer: 0, explain: "A lot of 既可与可数名词连用，也可与不可数名词连用。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "简单", keepChoice: true },
  { q: "Would you like ___ tea?", options: ["many", "a few", "several", "some"], answer: 3, explain: "表示邀请的问句仍然用 some。句中的 some 意思是“一些”。Tea 不可数，所以 a few、many、several（只与可数名词复数连用）都不对。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的句子。", options: ["There is some new books in the library.", "There are some new books in the library.", "There are some new book in the library.", "There is some new book in the library."], answer: 1, explain: "肯定句中的 some 表示一个不需要精确的数量。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "简单", keepChoice: true },
  { q: "There aren't ___ eggs, and there isn't ___ flour either.", options: ["many / much", "some / some", "any / many", "much / many"], answer: 0, explain: "Eggs 可数，所以用 many；flour 不可数，所以用 much。句中的 many 意思是“许多”。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的句子。", options: ["Do you have some questions about the homework?", "Do you have much questions about the homework?", "Do you have any questions about the homework?", "Do you have many question about the homework?"], answer: 2, explain: "疑问句用 any；questions 是复数，因为 any 与可数名词复数连用。Much 只与不可数名词连用，所以 much questions 是错的。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的问句。", options: ["How much sugar do you take in your coffee?", "How many sugar do you take in your coffee?", "How much sugars do you take in your coffee?", "How many sugars do you take in your coffee?"], answer: 0, explain: "Sugar 不可数，所以用 how much。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "简单", keepChoice: true },
  { q: "The team has ___ volunteers.", options: ["many", "a little", "little", "much"], answer: 0, explain: "Volunteers 是复数，用 many。句中的 volunteers 意思是“志愿者”。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "简单", keepChoice: true },
  // ---- 中等 ----
  { q: "The team has ___ volunteers.", options: ["little", "many", "a little", "much"], answer: 1, explain: "Volunteers 是复数，用 many。句中的 volunteers 意思是“志愿者”。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "中等", keepChoice: true },
  { q: "选择正确的句子。", options: ["Some regions receive few rainfall and little visitors.", "Some regions receive little rainfall and little visitors.", "Some regions receive few rainfall and few visitors.", "Some regions receive little rainfall and few visitors."], answer: 3, explain: "Rainfall 不可数，所以用 little；visitors 可数，所以用 few。句中 rainfall 的意思是“降雨量”，little 的意思是“少”。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "中等", keepChoice: true },
  { q: "The laboratory needs ___ additional space.", options: ["many", "a few", "several", "some"], answer: 3, explain: "句中 the laboratory 的意思是“实验室”，space 的意思是“空间”。这里的 space 不可数，用 some。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "中等", keepChoice: true },
  { q: "We have ___ reliable datasets for the project, just two.", options: ["little", "much", "a few", "few"], answer: 2, explain: "句中 the project 的意思是“项目”，reliable 的意思是“可靠的”。Datasets 是复数，just two 表示数量很少。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "中等", keepChoice: true },
  { q: "The river contains ___ pollution.", options: ["many", "some", "much", "a few"], answer: 1, explain: "句中的 some 意思是“一些”。Pollution 在泛指污染这个意思时不可数。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "中等", keepChoice: true },
  { q: "There is ___ information on the website.", options: ["some", "much", "little", "a little"], answer: 0, explain: "句中 information 的意思是“信息”，the website 的意思是“网站”。Information 不可数，用 some。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "中等", keepChoice: true },
  { q: "How ___ chairs do we need for the meeting?", options: [], answer: 0, answerText: "many", baseWord: "量词", sentence: "How many chairs do we need for the meeting?", explain: "句中的 the meeting 意思是“会议”。Chairs 可数，所以用 how many。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "中等", kind: "blank" },
  { q: "How ___ participants are in the survey?", options: ["little", "few", "a little", "many"], answer: 3, explain: "Participants 是可数名词复数，所以问句是 How many。句中 participants 的意思是“参与者”，the survey 的意思是“调查”。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "中等", keepChoice: true },
  { q: "There are ___ limitations in the report.", options: ["little", "many", "a little", "much"], answer: 1, explain: "Limitations 是可数名词复数，与 many 搭配。句中 limitations 的意思是“局限性”，the report 的意思是“报告”。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "中等", keepChoice: true },
  { q: "How ___ participants are in the environmental survey?", options: ["little", "much", "many", "a little"], answer: 2, explain: "句中的 participants 意思是“参与者”。Participants 是可数名词复数，所以问句是 How many。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "中等", keepChoice: true },
  { q: "The project has ___ sponsors.", options: ["several", "a lot", "little", "much"], answer: 0, explain: "Sponsors 是可数名词复数，可以用 several。句中 the project 的意思是“项目”，several 的意思是“几个”。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "中等", keepChoice: true },
  { q: "The analysis includes ___ charts.", options: ["much", "a little", "some", "little"], answer: 2, explain: "Charts 是可数名词复数；some 适用于肯定句。句中的 the analysis 意思是“分析”。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "中等", keepChoice: true },
  { q: "Do you have ___ questions about the lecture?", options: ["any", "much", "some", "many"], answer: 0, explain: "Any 在疑问句中与复数名词 questions 搭配很自然。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "中等", keepChoice: true },
  { q: "There is not ___ agreement among the researchers.", options: ["little", "a little", "much", "many"], answer: 2, explain: "句中的 the researchers 意思是“研究者们”。Agreement 在“共识”这个意思上不可数，所以用 much。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "中等", keepChoice: true },
  { q: "The field project has ___ volunteers.", options: ["many", "much", "a little", "little"], answer: 0, explain: "句中 volunteers 的意思是“志愿者”，the field 的意思是“实地”。Volunteers 是复数，用 many。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "中等", keepChoice: true },
  { q: "Are there ___ errors in this calculation?", options: ["little", "any", "a little", "much"], answer: 1, explain: "Errors 是疑问句中的复数名词，用 any。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "中等", keepChoice: true },
  { q: "The summary does not contain ___ photographs.", options: ["little", "much", "any", "a little"], answer: 2, explain: "Any 与否定句和可数名词复数 photographs 连用。句中的 the summary 意思是“摘要”。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "中等", keepChoice: true },
  { q: "There is ___ evidence for this theory.", options: ["some", "little", "a little", "much"], answer: 0, explain: "句中的 evidence 意思是“证据”。Evidence 不可数；some 表示不确定的数量。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "中等", keepChoice: true },
  { q: "We have ___ reliable datasets for the project, just two.", options: ["little", "much", "a few", "few"], answer: 2, explain: "Datasets 是复数，just two 表示数量很少。句中 reliable 的意思是“可靠的”，datasets 的意思是“数据集”。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "中等", keepChoice: true },
  { q: "The report does not contain ___ photographs.", options: ["much", "any", "little", "a little"], answer: 1, explain: "句中的 the report 意思是“报告”。Any 与否定句和可数名词复数 photographs 连用。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "中等", keepChoice: true },
  { q: "There are ___ limitations in the summary.", options: ["little", "much", "many", "a little"], answer: 2, explain: "句中 limitations 的意思是“局限性”，the summary 的意思是“摘要”。Limitations 是可数名词复数，与 many 搭配。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "中等", keepChoice: true },
  { q: "We do not have ___ time for revision.", options: ["many", "much", "a little", "little"], answer: 1, explain: "Time 不可数，所以 much 适用于否定句。句中的 much 意思是“许多”。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "中等", keepChoice: true },
  { q: "Can I have ___ water, please?", options: [], answer: 0, answerText: "some", baseWord: "量词", sentence: "Can I have some water, please?", explain: "表示请求或建议的问句仍然用 some。句中的 water 意思是“水”。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "中等", kind: "blank" },
  { q: "How ___ funding is available?", options: ["many", "a few", "few", "much"], answer: 3, explain: "句中 available 的意思是“可用的”，funding 的意思是“经费”。Funding 不可数，所以用 How much。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "中等", keepChoice: true },
  { q: "Do you have ___ questions about the workshop?", options: ["any", "little", "much", "a little"], answer: 0, explain: "句中的 the workshop 意思是“研讨会”。Any 在疑问句中与复数名词 questions 搭配很自然。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "中等", keepChoice: true },
  { q: "The institute needs ___ additional space.", options: ["several", "a few", "some", "many"], answer: 2, explain: "这里的 space 不可数，用 some。句中 the institute 的意思是“研究所”，space 的意思是“空间”。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "中等", keepChoice: true },
  { q: "There is ___ evidence for this hypothesis.", options: ["little", "some", "much", "a little"], answer: 1, explain: "Evidence 不可数；some 表示不确定的数量。句中 this hypothesis 的意思是“这个假设”，evidence 的意思是“证据”。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "中等", keepChoice: true },
  { q: "We do not have ___ time left.", options: ["many", "little", "much", "a little"], answer: 2, explain: "句中的 much 意思是“许多”。Time 不可数，所以 much 适用于否定句。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "中等", keepChoice: true },
  { q: "How ___ research funding is available?", options: ["many", "a few", "few", "much"], answer: 3, explain: "Funding 不可数，所以用 How much。句中 research funding 的意思是“研究经费”，available 的意思是“可用的”。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "中等", keepChoice: true },
  // ---- 困难 ----
  { q: "How ___ chairs do we need for the meeting?", options: [], answer: 0, answerText: "many", baseWord: "量词", sentence: "How many chairs do we need for the meeting?", explain: "句中的 the meeting 意思是“会议”。Chairs 可数，所以用 how many。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "困难", kind: "blank" },
  { q: "The analysis includes ___ charts.", options: ["some", "little", "much", "a little"], answer: 0, explain: "句中的 the analysis 意思是“分析”。Charts 是可数名词复数；some 适用于肯定句。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "困难", keepChoice: true },
  { q: "The project has ___ sponsors.", options: ["much", "a little", "several", "little"], answer: 2, explain: "Sponsors 是可数名词复数，可以用 several。句中 the project 的意思是“项目”，several 的意思是“几个”。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "困难", keepChoice: true },
  { q: "How ___ research funding is available?", options: ["much", "few", "many", "a few"], answer: 0, explain: "Funding 不可数，所以用 How much。句中 research funding 的意思是“研究经费”，available 的意思是“可用的”。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "困难", keepChoice: true },
  { q: "The institute needs ___ additional space.", options: ["some", "several", "many", "a few"], answer: 0, explain: "这里的 space 不可数，用 some。句中 the institute 的意思是“研究所”，space 的意思是“空间”。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "困难", keepChoice: true },
  { q: "Do you have ___ questions about the lecture?", options: ["any", "many", "little", "much"], answer: 0, explain: "Any 在疑问句中与复数名词 questions 搭配很自然。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "困难", keepChoice: true },
  { q: "Do you have ___ questions about the workshop?", options: ["any", "many", "much", "little"], answer: 0, explain: "句中的 the workshop 意思是“研讨会”。Any 在疑问句中与复数名词 questions 搭配很自然。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "困难", keepChoice: true },
  { q: "The field project has ___ volunteers.", options: ["a little", "many", "little", "much"], answer: 1, explain: "句中 volunteers 的意思是“志愿者”，the field 的意思是“实地”。Volunteers 是复数，用 many。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "困难", keepChoice: true },
  { q: "We do not have ___ time left.", options: ["many", "little", "much", "a little"], answer: 2, explain: "句中的 much 意思是“许多”。Time 不可数，所以 much 适用于否定句。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "困难", keepChoice: true },
  { q: "Can I have ___ water, please?", options: [], answer: 0, answerText: "some", baseWord: "量词", sentence: "Can I have some water, please?", explain: "表示请求或建议的问句仍然用 some。句中的 water 意思是“水”。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "困难", kind: "blank" },
  { q: "There is not ___ agreement among the researchers.", options: ["much", "many", "little", "a little"], answer: 0, explain: "句中的 the researchers 意思是“研究者们”。Agreement 在“共识”这个意思上不可数，所以用 much。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "困难", keepChoice: true },
  { q: "We have ___ reliable datasets for the project, just two.", options: ["few", "much", "a few", "little"], answer: 2, explain: "Datasets 是复数，just two 表示数量很少。句中 reliable 的意思是“可靠的”，datasets 的意思是“数据集”。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "困难", keepChoice: true },
  { q: "There is ___ information on the website.", options: ["some", "much", "little", "a little"], answer: 0, explain: "Information 不可数，用 some。句中 information 的意思是“信息”，the website 的意思是“网站”。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "困难", keepChoice: true },
  { q: "How ___ participants are in the survey?", options: ["a little", "few", "much", "many"], answer: 3, explain: "Participants 是可数名词复数，所以问句是 How many。句中 participants 的意思是“参与者”，the survey 的意思是“调查”。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "困难", keepChoice: true },
  { q: "We do not have ___ time for revision.", options: ["little", "many", "a little", "much"], answer: 3, explain: "Time 不可数，所以 much 适用于否定句。句中的 much 意思是“许多”。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "困难", keepChoice: true },
  { q: "The report does not contain ___ photographs.", options: ["much", "little", "any", "a little"], answer: 2, explain: "句中的 the report 意思是“报告”。Any 与否定句和可数名词复数 photographs 连用。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "困难", keepChoice: true },
  { q: "How ___ participants are in the environmental survey?", options: ["little", "many", "much", "a little"], answer: 1, explain: "句中的 participants 意思是“参与者”。Participants 是可数名词复数，所以问句是 How many。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "困难", keepChoice: true },
  { q: "There is ___ evidence for this hypothesis.", options: ["little", "much", "some", "a little"], answer: 2, explain: "Evidence 不可数；some 表示不确定的数量。句中 this hypothesis 的意思是“这个假设”，evidence 的意思是“证据”。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "困难", keepChoice: true },
  { q: "There are ___ limitations in the summary.", options: ["much", "a little", "little", "many"], answer: 3, explain: "句中 limitations 的意思是“局限性”，the summary 的意思是“摘要”。Limitations 是可数名词复数，与 many 搭配。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "困难", keepChoice: true },
  { q: "There are ___ limitations in the report.", options: ["a little", "little", "many", "much"], answer: 2, explain: "Limitations 是可数名词复数，与 many 搭配。句中 limitations 的意思是“局限性”，the report 的意思是“报告”。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "困难", keepChoice: true },
  { q: "选择正确的句子。", options: ["Some regions receive few rainfall and little visitors.", "Some regions receive little rainfall and little visitors.", "Some regions receive few rainfall and few visitors.", "Some regions receive little rainfall and few visitors."], answer: 3, explain: "Rainfall 不可数，所以用 little；visitors 可数，所以用 few。句中 rainfall 的意思是“降雨量”，little 的意思是“少”。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "困难", keepChoice: true },
  { q: "There is ___ evidence for this theory.", options: ["some", "much", "little", "a little"], answer: 0, explain: "句中的 evidence 意思是“证据”。Evidence 不可数；some 表示不确定的数量。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "困难", keepChoice: true },
  { q: "Are there ___ errors in this calculation?", options: ["little", "any", "much", "a little"], answer: 1, explain: "Errors 是疑问句中的复数名词，用 any。要看整个名词短语，因为量词不能只根据它本身的意思来选。", difficulty: "困难", keepChoice: true },
  { q: "We have ___ reliable datasets for the project, just two.", options: ["little", "much", "a few", "few"], answer: 2, explain: "句中 the project 的意思是“项目”，reliable 的意思是“可靠的”。Datasets 是复数，just two 表示数量很少。句中的量词要与后面的名词相符，也要符合说话人表述信息的方式。", difficulty: "困难", keepChoice: true },
  { q: "The summary does not contain ___ photographs.", options: ["little", "much", "a little", "any"], answer: 3, explain: "Any 与否定句和可数名词复数 photographs 连用。句中的 the summary 意思是“摘要”。可数名词复数和不可数名词并不总是用同一个量词。", difficulty: "困难", keepChoice: true },
];

// ---------------- 原站 A1 第 9 课测验原题（经作者授权翻译，本轮提取） ----------------
// 简单 20 题全收；中等原站共 28 题、收录 24 题，困难原站共 24 题、收录 22 题：
// 未收的 6 题（中等第 7、16、25、27 题，困难第 3、21 题）选项未提全，不进题库、
// 不编选项，只记在下方「待补清单」里（题干 + 答案 + 原站选项待补）。题干、选项、
// 答案、解析全部来自原站提取；答案一律按答案文字定位（提取报告里的字母按九宫格
// 位置标，与选项顺序对不上）。跨档重复的题是原站本身复用，照原样保留、不去重。
// 填空题括号里是原站给的提示词，作 baseWord。简单第 10 题是双空题，选项为成对
// 形式，照原样收录。困难第 9 题选项 saferly 是原站原样，照实保留。
const A1_L9_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "The scientist works ___.", options: ["carefully", "careful", "care", "carefulness"], answer: 0, explain: "句中的 carefully 意思是“小心地”。Works 是动作动词；副词 carefully 说明工作的方式。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "简单", keepChoice: true },
  { q: "She sings ___ in the school choir.", options: ["beautiful", "beautify", "beauty", "beautifully"], answer: 3, explain: "句中的 the school 意思是“学校”。Sings 是普通动词，所以需要方式副词。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的句子。", options: ["She speaks English clear.", "She speaking English clearly.", "She is speaks English clearly.", "She speaks English clearly."], answer: 3, explain: "修饰动词的词必须是副词。句中的 clearly 意思是“清楚地”。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "简单", keepChoice: true },
  { q: "他是一位细心的司机。", options: ["He is a carefully driver.", "He is a careful driver.", "He is a care driver.", "He is a carefulness driver."], answer: 1, explain: "Careful 放在名词 driver 前面，所以必须是形容词。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "简单", keepChoice: true },
  { q: "明弹吉他弹得好，学东西也快。", options: ["Minh plays the guitar good, and he learns fastly.", "Minh plays the guitar goodly, and he learns fast.", "Minh plays the guitar well, and he learns fastly.", "Minh plays the guitar well, and he learns fast."], answer: 3, explain: "Good 的副词是 well；fast 在两种词性中形式不变。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "简单", keepChoice: true },
  { q: "The measurement is ___.", options: ["accuracy", "accurateness", "accurate", "accurately"], answer: 2, explain: "连系动词 is 后面需要形容词 accurate 作表语。句中的 accurate 意思是“准确的”。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "简单", keepChoice: true },
  { q: "The speaker talks ___.", options: ["quiet", "quietness", "quieten", "quietly"], answer: 3, explain: "Talks 由方式副词 quietly 修饰。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "简单", keepChoice: true },
  { q: "He is a ___ driver.", options: ["caringly", "carefully", "careful", "care"], answer: 2, explain: "名词 driver 前面需要形容词。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "简单", keepChoice: true },
  { q: "This is a ___ explanation.", options: ["clear", "clearness", "clarity", "clearly"], answer: 0, explain: "放在名词 explanation 前面修饰它，用形容词 clear。句中的 clear 意思是“清楚的”。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "简单", keepChoice: true },
  { q: "It was a ___ test, so she answered ___.", options: ["difficultly / careful", "difficult / careful", "difficult / carefully", "difficultly / carefully"], answer: 2, explain: "句中 difficult 的意思是“难的”，carefully 的意思是“仔细地”。名词 test 前面用形容词，动词 answered 后面用副词。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的句子。", options: ["He is a slow walker and he walks slow.", "He is a slowly walker and he walks slow.", "He is a slow walker and he walks slowly.", "He is a slowly walker and he walks slowly."], answer: 2, explain: "名词前面用形容词 slow，动词后面用副词 slowly。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的句子。", options: ["He hard works every day.", "He works hard every day.", "He works hardly hard every day.", "He works hardly every day."], answer: 1, explain: "Hard 的意思是努力地；hardly 的意思是几乎不。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "简单", keepChoice: true },
  { q: "选择不加 -ly 构成的副词。", options: ["slow", "fast", "careful", "quick"], answer: 1, explain: "Fast 作副词时形式不变。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "简单", keepChoice: true },
  { q: "The soup tastes ___.", options: ["delicious", "delicately", "deliciousness", "deliciously"], answer: 0, explain: "Taste 是连系动词，后面跟形容词描写主语。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "简单", keepChoice: true },
  { q: "考试挺难的，所以我们做得很仔细。", options: ["The test it was quite difficult, so we worked very carefully.", "The test was quite difficult, so we worked very carefully.", "The test was quite difficult, so we did worked very carefully.", "The test were quite difficult, so we worked very carefully."], answer: 1, explain: "Quite 修饰形容词 difficult，very 修饰副词 carefully。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的句子。", options: ["He plays football very good.", "He is plays football very well.", "He playing football very well.", "He plays football very well."], answer: 3, explain: "修饰动词 plays 需要副词 well。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "简单", keepChoice: true },
  { q: "今天你们看起来很开心。", options: ["The children are look happy today.", "The childs look happy today.", "The children look happy today.", "Children look happy today."], answer: 2, explain: "Look 是连系动词，描写主语的状态，所以用形容词 happy。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "简单", keepChoice: true },
  { q: "她英语说得很清楚。", options: ["She is speaks English clearly.", "She speaks English clear.", "She speaks English clearly.", "She speaking English clearly."], answer: 2, explain: "Clearly 说明说话的方式，也就是修饰动词 speaks。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "简单", keepChoice: true },
  { q: "The children look ___ today.", options: ["happiness", "happy", "happily", "happier than"], answer: 1, explain: "这里的 look 是连系动词，描写主语的状态。句中 the children 的意思是“孩子们”，happy 的意思是“开心的”。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "简单", keepChoice: true },
  { q: "请仔细阅读说明。", options: ["To read the instructions carefully.", "Reading the instructions carefully.", "Please did read the instructions carefully.", "Please read the instructions carefully."], answer: 3, explain: "动词有宾语时，方式副词放在宾语后面。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "简单", keepChoice: true },
  // ---- 中等（原站 28 题，已收 24 题；第 7、16、25、27 题选项待补，见下方清单） ----
  { q: "The conclusions are ___.", options: ["importance", "importantly", "important", "import"], answer: 2, explain: "连系动词 are 后面跟形容词 important。句中 conclusions 的意思是“结论”，important 的意思是“重要的”。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "中等", keepChoice: true },
  { q: "She explains the formula ___.", options: ["simple", "simply", "simplicity", "simpler"], answer: 1, explain: "句中的 the formula 意思是“公式”。Explains 需要方式副词 simply。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "中等", keepChoice: true },
  { q: "The lecturer talks ___.", options: ["quiet", "quietly", "quietness", "quieten"], answer: 1, explain: "句中的 lecturer 意思是“讲师”。Talks 由方式副词 quietly 修饰。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "中等", keepChoice: true },
  { q: "It is a ___ decision.", options: ["wise", "wisely", "wisdom", "wiseness"], answer: 0, explain: "Decision 是名词；前面需要形容词 wise。句中的 wise 意思是“明智的”。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "中等", keepChoice: true },
  { q: "The algorithm runs ___.", options: ["efficient", "efficiency", "efficiently", "efficience"], answer: 2, explain: "句中的 efficiently 意思是“高效地”。Runs 在“运行”这个意思上由副词 efficiently 修饰。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "中等", keepChoice: true },
  { q: "The software works ___.", options: ["reliable", "reliability", "reliably", "rely"], answer: 2, explain: "句中 the software 的意思是“软件”，reliable 的意思是“可靠的”。这里的 works 是动词，副词 reliably 说明运行方式。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "中等", keepChoice: true },
  { q: "This is a ___ explanation.", options: ["clearly", "clarity", "clear", "clearness"], answer: 2, explain: "放在名词 explanation 前面修饰它，用形容词 clear。句中的 clear 意思是“清楚的”。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "中等", keepChoice: true },
  { q: "Minh plays the guitar ___ (good).", options: [], answer: 0, answerText: "well", baseWord: "good", sentence: "Minh plays the guitar well.", explain: "Good 的副词是 well。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "中等", kind: "blank" },
  { q: "She explains the formula ___ (simple).", options: [], answer: 0, answerText: "simply", baseWord: "simple", sentence: "She explains the formula simply.", explain: "句中的 the formula 意思是“公式”。Explains 需要方式副词 simply。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "中等", kind: "blank" },
  { q: "This is a ___ explanation of the results.", options: ["clearly", "clearness", "clarity", "clear"], answer: 3, explain: "放在名词 explanation 前面修饰它，用形容词 clear。句中 the results 的意思是“结果”，clear 的意思是“清楚的”。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "中等", keepChoice: true },
  { q: "The software system runs ___.", options: ["efficiency", "efficient", "efficience", "efficiently"], answer: 3, explain: "句中 the software 的意思是“软件”，efficiently 的意思是“高效地”。Runs 在“运行”这个意思上由副词 efficiently 修饰。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "中等", keepChoice: true },
  { q: "She passed the test ___ (easy).", options: [], answer: 0, answerText: "easily", baseWord: "easy", sentence: "She passed the test easily.", explain: "句中的 easy 意思是“容易的”。辅音字母 + y 变成 -ily。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "中等", kind: "blank" },
  { q: "The scientist works ___.", options: ["carefulness", "careful", "carefully", "care"], answer: 2, explain: "句中的 carefully 意思是“小心地”。Works 是动作动词；副词 carefully 说明工作的方式。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "中等", keepChoice: true },
  { q: "The researchers are ___.", options: ["confidently", "confide", "confident", "confidence"], answer: 2, explain: "Be 后面跟 confident，说明主语的状态。句中 the researchers 的意思是“研究者们”，confident 的意思是“自信的”。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "中等", keepChoice: true },
  { q: "The findings are ___.", options: ["importance", "important", "import", "importantly"], answer: 1, explain: "连系动词 are 后面跟形容词 important。句中 the findings 的意思是“研究发现”，important 的意思是“重要的”。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "中等", keepChoice: true },
  { q: "The committee responds ___.", options: ["promptly", "promptness", "prompt", "prompter"], answer: 0, explain: "句中 the committee 的意思是“委员会”，promptly 的意思是“迅速地”。Responds 是动作动词；promptly 说明方式。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "中等", keepChoice: true },
  { q: "Please read the instructions ___ (careful).", options: [], answer: 0, answerText: "carefully", baseWord: "careful", sentence: "Please read the instructions carefully.", explain: "句中的 carefully 意思是“仔细地”。Read 由副词 carefully 修饰。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "中等", kind: "blank" },
  { q: "The procedure is ___.", options: ["safe", "safely", "safer", "safety"], answer: 0, explain: "Is 是连系动词，所以用形容词 safe。句中的 the procedure 意思是“流程”。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "中等", keepChoice: true },
  { q: "Please read the instructions ___.", options: ["carefully", "careful", "care", "carefulness"], answer: 0, explain: "句中的 carefully 意思是“仔细地”。Read 由副词 carefully 修饰。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "中等", keepChoice: true },
  { q: "The software works ___ (reliable).", options: [], answer: 0, answerText: "reliably", baseWord: "reliable", sentence: "The software works reliably.", explain: "句中 the software 的意思是“软件”，reliable 的意思是“可靠的”。这里的 works 是动词，副词 reliably 说明运行方式。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "中等", kind: "blank" },
  { q: "The committee responds ___ (prompt).", options: [], answer: 0, answerText: "promptly", baseWord: "prompt", sentence: "The committee responds promptly.", explain: "句中 the committee 的意思是“委员会”，promptly 的意思是“迅速地”。Responds 是动作动词；promptly 说明方式。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "中等", kind: "blank" },
  { q: "The statement is ___.", options: ["preciseness", "precision", "precise", "precisely"], answer: 2, explain: "Be + 形容词描写 statement 的性质。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "中等", keepChoice: true },
  { q: "The instrument operates ___.", options: ["automatic", "automatically", "automation", "automate"], answer: 1, explain: "句中的 instrument 意思是“仪器”。Operates 需要副词 automatically 说明方式。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "中等", keepChoice: true },
  { q: "This is a ___ observation.", options: ["remarkableness", "remarkable", "remark", "remarkably"], answer: 1, explain: "Remarkable 直接修饰名词 observation。句中的 remarkable 意思是“值得注意的”。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "中等", keepChoice: true },
  // ---- 困难（原站 24 题，已收 22 题；第 3、21 题选项待补，见下方清单） ----
  { q: "The instrument operates ___.", options: ["automatically", "automatic", "automation", "automate"], answer: 0, explain: "句中的 instrument 意思是“仪器”。Operates 需要副词 automatically 说明方式。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "困难", keepChoice: true },
  { q: "The algorithm runs ___.", options: ["efficiency", "efficient", "efficiently", "efficience"], answer: 2, explain: "句中的 efficiently 意思是“高效地”。Runs 在“运行”这个意思上由副词 efficiently 修饰。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "困难", keepChoice: true },
  { q: "Please read the instructions ___ (careful).", options: [], answer: 0, answerText: "carefully", baseWord: "careful", sentence: "Please read the instructions carefully.", explain: "句中的 carefully 意思是“仔细地”。Read 由副词 carefully 修饰。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "困难", kind: "blank" },
  { q: "The software works ___.", options: ["reliably", "reliability", "rely", "reliable"], answer: 0, explain: "句中 the software 的意思是“软件”，reliable 的意思是“可靠的”。这里的 works 是动词，副词 reliably 说明运行方式。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "困难", keepChoice: true },
  { q: "The software system runs ___.", options: ["efficient", "efficience", "efficiency", "efficiently"], answer: 3, explain: "句中 the software 的意思是“软件”，efficiently 的意思是“高效地”。Runs 在“运行”这个意思上由副词 efficiently 修饰。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "困难", keepChoice: true },
  { q: "The committee responds ___.", options: ["promptness", "prompt", "prompter", "promptly"], answer: 3, explain: "句中 the committee 的意思是“委员会”，promptly 的意思是“迅速地”。Responds 是动作动词；promptly 说明方式。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "困难", keepChoice: true },
  { q: "The conclusions are ___.", options: ["importantly", "import", "important", "importance"], answer: 2, explain: "连系动词 are 后面跟形容词 important。句中 conclusions 的意思是“结论”，important 的意思是“重要的”。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "困难", keepChoice: true },
  { q: "The procedure is ___.", options: ["saferly", "safely", "safe", "safety"], answer: 2, explain: "Is 是连系动词，所以用形容词 safe。句中的 the procedure 意思是“流程”。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "困难", keepChoice: true },
  { q: "The software works ___ (reliable).", options: [], answer: 0, answerText: "reliably", baseWord: "reliable", sentence: "The software works reliably.", explain: "句中 the software 的意思是“软件”，reliable 的意思是“可靠的”。这里的 works 是动词，副词 reliably 说明运行方式。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "困难", kind: "blank" },
  { q: "The committee responds ___ (prompt).", options: [], answer: 0, answerText: "promptly", baseWord: "prompt", sentence: "The committee responds promptly.", explain: "句中 the committee 的意思是“委员会”，promptly 的意思是“迅速地”。Responds 是动作动词；promptly 说明方式。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "困难", kind: "blank" },
  { q: "She passed the test ___ (easy).", options: [], answer: 0, answerText: "easily", baseWord: "easy", sentence: "She passed the test easily.", explain: "句中的 easy 意思是“容易的”。辅音字母 + y 变成 -ily。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "困难", kind: "blank" },
  { q: "This is a ___ observation.", options: ["remarkable", "remark", "remarkableness", "remarkably"], answer: 0, explain: "Remarkable 直接修饰名词 observation。句中的 remarkable 意思是“值得注意的”。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "困难", keepChoice: true },
  { q: "The findings are ___.", options: ["important", "importantly", "import", "importance"], answer: 0, explain: "连系动词 are 后面跟形容词 important。句中 the findings 的意思是“研究发现”，important 的意思是“重要的”。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "困难", keepChoice: true },
  { q: "The analyst works ___.", options: ["carefulness", "careful", "care", "carefully"], answer: 3, explain: "句中的 carefully 意思是“小心地”。Works 是动作动词；副词 carefully 说明工作的方式。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "困难", keepChoice: true },
  { q: "The statement is ___.", options: ["precise", "precisely", "preciseness", "precision"], answer: 0, explain: "Be + 形容词描写 statement 的性质。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "困难", keepChoice: true },
  { q: "The researchers are ___.", options: ["confidence", "confidently", "confident", "confide"], answer: 2, explain: "Be 后面跟 confident，说明主语的状态。句中 the researchers 的意思是“研究者们”，confident 的意思是“自信的”。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "困难", keepChoice: true },
  { q: "It is a ___ decision.", options: ["wiseness", "wisely", "wise", "wisdom"], answer: 2, explain: "Decision 是名词；前面需要形容词 wise。句中的 wise 意思是“明智的”。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "困难", keepChoice: true },
  { q: "The lecturer talks ___.", options: ["quietness", "quieten", "quiet", "quietly"], answer: 3, explain: "句中的 lecturer 意思是“讲师”。Talks 由方式副词 quietly 修饰。词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。", difficulty: "困难", keepChoice: true },
  { q: "She explains the formula ___ (simple).", options: [], answer: 0, answerText: "simply", baseWord: "simple", sentence: "She explains the formula simply.", explain: "句中的 the formula 意思是“公式”。Explains 需要方式副词 simply。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "困难", kind: "blank" },
  { q: "Minh plays the guitar ___ (good).", options: [], answer: 0, answerText: "well", baseWord: "good", sentence: "Minh plays the guitar well.", explain: "Good 的副词是 well。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "困难", kind: "blank" },
  { q: "Please read the instructions ___.", options: ["care", "careful", "carefulness", "carefully"], answer: 3, explain: "句中的 carefully 意思是“仔细地”。Read 由副词 carefully 修饰。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。", difficulty: "困难", keepChoice: true },
  { q: "She explains the formula ___.", options: ["simple", "simplicity", "simply", "simpler"], answer: 2, explain: "句中的 the formula 意思是“公式”。Explains 需要方式副词 simply。形容词通常说明人或事物的特点，而方式副词说明一个动作是怎样进行的。", difficulty: "困难", keepChoice: true },
];

// ---------------- 原站 A1 第 10 课测验原题（经作者授权翻译，本轮提取） ----------------
// 简单 20 题、中等 26 题、困难 22 题全收，无待补。题干、选项、答案、解析全部来自
// 原站提取；答案一律按答案文字定位（提取报告里的字母按九宫格位置标，与选项顺序
// 对不上）。跨档重复的题是原站本身复用，照原样保留、不去重。简单第 10 题是双空题，
// 选项为成对形式，照原样收录。中等第 10 题本轮在原站答错（选了 are sometimes），
// 原站反馈的正确答案是 sometimes，题库按 sometimes 记。中等第 23 题、困难第 1 题
// 解析里写 available 而题干是 accessible，是原站解析原样，不作“纠正”。
const A1_L10_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "选择正确的选项。", options: ["He is often late.", "He often is late.", "Often he is late is.", "He is late often is."], answer: 0, explain: "句中的 often 意思是“经常”。对于 to be，频率副词放在动词后面。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["He never doesn't eat meat.", "He never eat meat.", "He doesn't never eat meat.", "He never eats meat."], answer: 3, explain: "Never 不改变动词形式，所以 he 后面还是跟 eats。句中的 never 意思是“从不”。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  { q: "The supervisor ___ reviews the schedule.", options: ["often is", "often does", "is often", "often"], answer: 3, explain: "句中 the supervisor 的意思是“主管”，often 的意思是“经常”。Often 放在普通动词 reviews 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：我们有时一起在图书馆学习。", options: ["Sometimes we study together at library.", "Sometimes we study together at the library.", "Sometimes we study together at a library.", "Sometimes we study together at an library."], answer: 1, explain: "Sometimes 可以放在句首起强调作用；never 在一般句子里不能这样用。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：她通常步行上学。", options: ["She usually walk to school.", "She walks usually to school.", "She usually walks to school.", "She walk usually to school."], answer: 2, explain: "Walks 是普通动词，所以 usually 放在它前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  { q: "These experiments are ___ successful.", options: ["often", "does often", "are often", "often are"], answer: 0, explain: "句中的 often 意思是“经常”。Often 放在 are 后面，符合 be + adverb + adjective 的句式。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["My brother is always hungry.", "My brother always is hungry.", "Always my brother is hungry.", "My brother is hungry always."], answer: 0, explain: "句中 my brother 的意思是“我哥哥/弟弟”，always 的意思是“总是”。频率副词放在 is 后面。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "简单", keepChoice: true },
  { q: "We ___ use this reference book.", options: ["does frequently", "frequently", "are frequently", "frequent"], answer: 1, explain: "副词 frequently 放在普通动词 use 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  { q: "She ___ checks her sources.", options: ["always", "is always", "does always", "always is"], answer: 0, explain: "Always 放在普通动词 checks 前面。句中的 always 意思是“总是”。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  { q: "She ___ tired because she ___ sleeps late.", options: ["is always / often", "always is / often", "always is / is often", "is always / often is"], answer: 0, explain: "前半句有 to be，所以副词放后面；后半句有普通动词，所以副词放前面。句中 always 的意思是“总是”，often 的意思是“经常”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "简单", keepChoice: true },
  { q: "The researchers ___ discuss their findings.", options: ["is usually", "does usually", "are usually", "usually"], answer: 3, explain: "Usually 放在普通动词 discuss 前面。句中 the researchers 的意思是“研究者们”，usually 的意思是“通常”。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：他第一节课经常迟到。", options: ["He is late often for the first class.", "He often is late for the first class.", "He is late for the first class often.", "He is often late for the first class."], answer: 3, explain: "主要动词是 is，所以 often 放后面；把 often 放在 is 前面是错误的语序。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "简单", keepChoice: true },
  { q: "He ___ attends academic seminars.", options: ["never", "is never", "does never", "never is"], answer: 0, explain: "Never 放在普通动词 attends 前面。句中的 never 意思是“从不”。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  { q: "选择意思是“有时”的副词。", options: ["always", "never", "sometimes", "rarely"], answer: 2, explain: "Sometimes 表示不那么频繁、但还是会发生的程度。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["Never I drink coffee.", "Sometimes I drink coffee.", "Always I drink coffee.", "Rarely I drink coffee here."], answer: 1, explain: "句中的 sometimes 意思是“有时”。Sometimes 可以放在句首，never 想放句首就要倒装。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：我奶奶晚上从不喝咖啡。", options: ["My grandmother never drinks coffee in the evening.", "My grandmother doesn't never drinks coffee in the evening.", "My grandmother never drink coffee in the evening.", "My grandmother never drinks coffee at evening."], answer: 0, explain: "Never 已有否定意思，所以动词仍用肯定形式 drinks。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["She doesn't never comes late.", "She never doesn't come late.", "She doesn't never come late.", "She never comes late."], answer: 3, explain: "句中的 never 意思是“从不”。Never 已有否定意思，所以不再加 doesn't。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  { q: "The laboratory is ___ open on Sundays.", options: ["does rarely", "is rarely", "rarely", "rarely is"], answer: 2, explain: "频率副词放在 be 动词后面。句中 the laboratory 的意思是“实验室”，rarely 的意思是“很少”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：你打羽毛球频繁吗？— 最近我很少打。", options: ["How often do you play badminton? — I rarely play nowadays.", "How often do you play badminton? — I rarely play these days.", "How often you play badminton? — I rarely play these days.", "How often do you play badminton? — I play rarely these days."], answer: 1, explain: "回答里 Rarely 放在主要动词 play 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  { q: "选择表示 100% 程度的副词。", options: ["always", "sometimes", "never", "rarely"], answer: 0, explain: "Always 是频率标尺上的最高级。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "简单", keepChoice: true },
  // ---- 中等 ----
  { q: "She ___ checks her citations.", options: ["is always", "does always", "always is", "always"], answer: 3, explain: "Always 放在普通动词 checks 前面。句中的 always 意思是“总是”。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "中等", keepChoice: true },
  { q: "My colleagues ___ arrive early.", options: ["sometimes", "are sometimes", "does sometimes", "sometimes are"], answer: 0, explain: "Sometimes 可以放在普通动词 arrive 前面。句中的 sometimes 意思是“有时”。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "中等", keepChoice: true },
  { q: "We ___ use this research manual.", options: ["frequently", "are frequently", "does frequently", "frequent"], answer: 0, explain: "句中的 research 意思是“研究”。副词 frequently 放在普通动词 use 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "中等", keepChoice: true },
  { q: "The scientist ___ records the temperature.", options: ["regularly", "is regularly", "does regularly", "regular"], answer: 0, explain: "Regularly 是副词，放在 records 前面。句中 the temperature 的意思是“温度”，regularly 的意思是“定期地”。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "中等", keepChoice: true },
  { q: "He ___ attends research workshops.", options: ["is never", "does never", "never is", "never"], answer: 3, explain: "句中 research 的意思是“研究”，never 的意思是“从不”。Never 放在普通动词 attends 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "中等", keepChoice: true },
  { q: "I ___ check the bibliography.", options: ["is always", "does always", "always", "always is"], answer: 2, explain: "Always 放在普通动词 check 前面。句中 the bibliography 的意思是“参考文献”，always 的意思是“总是”。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "中等", keepChoice: true },
  { q: "The library is ___ busy after lunch.", options: ["does often", "is often", "often", "often is"], answer: 2, explain: "句中 the library 的意思是“图书馆”，after lunch 的意思是“午饭后”。Often 放在 is 后面，表示频繁程度。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "中等", keepChoice: true },
  { q: "These experiments are ___ successful.", options: ["does often", "often", "are often", "often are"], answer: 1, explain: "句中的 often 意思是“经常”。Often 放在 are 后面，符合 be + adverb + adjective 的句式。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "中等", keepChoice: true },
  { q: "The archive is ___ accessible to visitors at night.", options: ["does never", "never", "is never", "never is"], answer: 1, explain: "Never 放在 is 后面、形容词 accessible 前面。句中 the archive 的意思是“档案馆”，accessible 的意思是“可以进入的”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "中等", keepChoice: true },
  { q: "The data are ___ available to the public.", options: ["sometimes are", "are sometimes", "does sometimes", "sometimes"], answer: 3, explain: "句中 sometimes 的意思是“有时”，available 的意思是“现有的”。Are 后面、形容词 available 前面是 sometimes 的自然位置。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "中等", keepChoice: true },
  { q: "The analyst ___ records the temperature.", options: ["is regularly", "does regularly", "regularly", "regular"], answer: 2, explain: "句中 the temperature 的意思是“温度”，the analyst 的意思是“分析员”。Regularly 是副词，放在 records 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "中等", keepChoice: true },
  { q: "The reviewer is ___ satisfied with a first draft.", options: ["seldom", "is seldom", "does seldom", "seldom is"], answer: 0, explain: "Seldom 放在 be 后面、形容词 satisfied 前面。句中 the reviewer 的意思是“审稿人”，satisfied 的意思是“满意的”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "中等", keepChoice: true },
  { q: "The mentor ___ reviews the schedule.", options: ["often", "often does", "is often", "often is"], answer: 0, explain: "句中的 often 意思是“经常”。Often 放在普通动词 reviews 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "中等", keepChoice: true },
  { q: "The summary is ___ accurate.", options: ["does usually", "is usually", "usually", "usually is"], answer: 2, explain: "Usually 放在 is 后面、形容词 accurate 前面。句中 the summary 的意思是“摘要”，accurate 的意思是“准确的”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "中等", keepChoice: true },
  { q: "The archive is ___ accessible at night.", options: ["never", "is never", "does never", "never is"], answer: 0, explain: "句中 the archive 的意思是“档案馆”，accessible 的意思是“可以进入的”。Never 放在 is 后面、形容词 accessible 前面。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "中等", keepChoice: true },
  { q: "The editor is ___ satisfied with a first draft.", options: ["is seldom", "seldom", "does seldom", "seldom is"], answer: 1, explain: "句中 the editor 的意思是“编辑”，satisfied 的意思是“满意的”。Seldom 放在 be 后面、形容词 satisfied 前面。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "中等", keepChoice: true },
  { q: "He ___ attends academic seminars.", options: ["is never", "does never", "never", "never is"], answer: 2, explain: "Never 放在普通动词 attends 前面。句中的 never 意思是“从不”。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "中等", keepChoice: true },
  { q: "The professor ___ answers questions after class.", options: ["is usually", "does usually", "usually", "usually is"], answer: 2, explain: "Usually 放在普通动词 answers 前面。句中 the professor 的意思是“教授”，usually 的意思是“通常”。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "中等", keepChoice: true },
  { q: "We ___ use this reference book.", options: ["does frequently", "are frequently", "frequently", "frequent"], answer: 2, explain: "副词 frequently 放在普通动词 use 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "中等", keepChoice: true },
  { q: "These laboratory experiments are ___ successful.", options: ["does often", "are often", "often", "often are"], answer: 2, explain: "Often 放在 are 后面，符合 be + adverb + adjective 的句式。句中的 often 意思是“经常”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "中等", keepChoice: true },
  { q: "The report is ___ accurate.", options: ["does usually", "is usually", "usually is", "usually"], answer: 3, explain: "句中 the report 的意思是“报告”，accurate 的意思是“准确的”。Usually 放在 is 后面、形容词 accurate 前面。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "中等", keepChoice: true },
  { q: "The institute is ___ open on Sundays.", options: ["rarely", "is rarely", "does rarely", "rarely is"], answer: 0, explain: "频率副词放在 be 动词后面。句中 the institute 的意思是“研究所”，rarely 的意思是“很少”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "中等", keepChoice: true },
  { q: "The findings are ___ accessible to the public.", options: ["sometimes are", "are sometimes", "sometimes", "does sometimes"], answer: 2, explain: "Are 后面、形容词 available 前面是 sometimes 的自然位置。句中 the findings 的意思是“研究发现”，accessible 的意思是“可以进入的”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "中等", keepChoice: true },
  { q: "把下面这句话翻译成英语：我从没去过大叻。", options: ["I have never been to Da Lat.", "I never have been to Da Lat.", "I have been never to Da Lat.", "I have never go to Da Lat."], answer: 0, explain: "Have 是助动词，never 插在 have 和 been 中间。", difficulty: "中等", keepChoice: true },
  { q: "The investigators ___ discuss their findings.", options: ["usually", "is usually", "does usually", "usually are"], answer: 0, explain: "句中 the investigators 的意思是“调查人员”，usually 的意思是“通常”。Usually 放在普通动词 discuss 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "中等", keepChoice: true },
  { q: "The researchers ___ discuss their findings.", options: ["usually", "is usually", "does usually", "usually are"], answer: 0, explain: "Usually 放在普通动词 discuss 前面。句中 the researchers 的意思是“研究者们”，usually 的意思是“通常”。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "中等", keepChoice: true },
  // ---- 困难 ----
  { q: "The findings are ___ accessible to the public.", options: ["sometimes are", "sometimes", "are sometimes", "does sometimes"], answer: 1, explain: "Are 后面、形容词 available 前面是 sometimes 的自然位置。句中 the findings 的意思是“研究发现”，accessible 的意思是“可以进入的”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "困难", keepChoice: true },
  { q: "The scientist ___ records the temperature.", options: ["is regularly", "regularly", "does regularly", "regular"], answer: 1, explain: "Regularly 是副词，放在 records 前面。句中 the temperature 的意思是“温度”，regularly 的意思是“定期地”。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "困难", keepChoice: true },
  { q: "把下面这句话翻译成英语：我从没去过大叻。", options: ["I never have been to Da Lat.", "I have never been to Da Lat.", "I have been never to Da Lat.", "I have never go to Da Lat."], answer: 1, explain: "Have 是助动词，never 插在 have 和 been 中间。", difficulty: "困难", keepChoice: true },
  { q: "The archive is ___ accessible at night.", options: ["never", "is never", "does never", "never is"], answer: 0, explain: "句中 the archive 的意思是“档案馆”，accessible 的意思是“可以进入的”。Never 放在 is 后面、形容词 accessible 前面。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "困难", keepChoice: true },
  { q: "The data are ___ available to the public.", options: ["sometimes are", "sometimes", "are sometimes", "does sometimes"], answer: 1, explain: "句中 sometimes 的意思是“有时”，available 的意思是“现有的”。Are 后面、形容词 available 前面是 sometimes 的自然位置。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "困难", keepChoice: true },
  { q: "The reviewer is ___ satisfied with a first draft.", options: ["is seldom", "seldom", "does seldom", "seldom is"], answer: 1, explain: "Seldom 放在 be 后面、形容词 satisfied 前面。句中 the reviewer 的意思是“审稿人”，satisfied 的意思是“满意的”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "困难", keepChoice: true },
  { q: "We ___ use this research manual.", options: ["are frequently", "does frequently", "frequent", "frequently"], answer: 3, explain: "句中的 research 意思是“研究”。副词 frequently 放在普通动词 use 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "困难", keepChoice: true },
  { q: "The editor is ___ satisfied with a first draft.", options: ["is seldom", "seldom", "does seldom", "seldom is"], answer: 1, explain: "句中 the editor 的意思是“编辑”，satisfied 的意思是“满意的”。Seldom 放在 be 后面、形容词 satisfied 前面。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "困难", keepChoice: true },
  { q: "The mentor ___ reviews the schedule.", options: ["often does", "is often", "often", "often is"], answer: 2, explain: "句中的 often 意思是“经常”。Often 放在普通动词 reviews 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "困难", keepChoice: true },
  { q: "He ___ attends research workshops.", options: ["is never", "does never", "never", "never is"], answer: 2, explain: "句中 research 的意思是“研究”，never 的意思是“从不”。Never 放在普通动词 attends 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "困难", keepChoice: true },
  { q: "The institute is ___ open on Sundays.", options: ["rarely", "is rarely", "does rarely", "rarely is"], answer: 0, explain: "频率副词放在 be 动词后面。句中 the institute 的意思是“研究所”，rarely 的意思是“很少”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "困难", keepChoice: true },
  { q: "The investigators ___ discuss their findings.", options: ["usual", "usually are", "are usually", "usually"], answer: 3, explain: "句中 the investigators 的意思是“调查人员”，usually 的意思是“通常”。Usually 放在普通动词 discuss 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "困难", keepChoice: true },
  { q: "The analyst ___ records the temperature.", options: ["is regularly", "does regularly", "regularly", "regular"], answer: 2, explain: "句中 the temperature 的意思是“温度”，the analyst 的意思是“分析员”。Regularly 是副词，放在 records 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "困难", keepChoice: true },
  { q: "The report is ___ accurate.", options: ["does usually", "is usually", "usually", "usually is"], answer: 2, explain: "句中 the report 的意思是“报告”，accurate 的意思是“准确的”。Usually 放在 is 后面、形容词 accurate 前面。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "困难", keepChoice: true },
  { q: "The archive is ___ accessible to visitors at night.", options: ["does never", "never", "is never", "never is"], answer: 1, explain: "Never 放在 is 后面、形容词 accessible 前面。句中 the archive 的意思是“档案馆”，accessible 的意思是“可以进入的”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "困难", keepChoice: true },
  { q: "The summary is ___ accurate.", options: ["usually", "is usually", "does usually", "usually is"], answer: 0, explain: "Usually 放在 is 后面、形容词 accurate 前面。句中 the summary 的意思是“摘要”，accurate 的意思是“准确的”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "困难", keepChoice: true },
  { q: "I ___ check the bibliography.", options: ["always", "is always", "does always", "always is"], answer: 0, explain: "句中 the bibliography 的意思是“参考文献”，always 的意思是“总是”。Always 放在普通动词 check 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "困难", keepChoice: true },
  { q: "These laboratory experiments are ___ successful.", options: ["does often", "are often", "often", "often are"], answer: 2, explain: "Often 放在 are 后面，符合 be + adverb + adjective 的句式。句中的 often 意思是“经常”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "困难", keepChoice: true },
  { q: "The professor ___ answers questions after class.", options: ["is usually", "does usually", "usually is", "usually"], answer: 3, explain: "句中 the professor 的意思是“教授”，usually 的意思是“通常”。Usually 放在普通动词 answers 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "困难", keepChoice: true },
  { q: "She ___ checks her citations.", options: ["is always", "does always", "always", "always is"], answer: 2, explain: "Always 放在普通动词 checks 前面。句中的 always 意思是“总是”。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "困难", keepChoice: true },
  { q: "My colleagues ___ arrive early.", options: ["are sometimes", "does sometimes", "sometimes are", "sometimes"], answer: 3, explain: "句中的 sometimes 意思是“有时”。Sometimes 可以放在普通动词 arrive 前面。对于普通动词，频率副词通常紧挨着放在主要动词前面。", difficulty: "困难", keepChoice: true },
  { q: "The library is ___ busy after lunch.", options: ["does often", "often", "is often", "often is"], answer: 1, explain: "Often 放在 is 后面，表示频繁程度。句中 the library 的意思是“图书馆”，after lunch 的意思是“午饭后”。对于 be 动词，频率副词通常放在 be 后面、后面的描写成分前面。", difficulty: "困难", keepChoice: true },
];

// ---------------- 原站 A1 第 11 课测验原题（经作者授权翻译，本轮提取） ----------------
// 简单 20 题、中等 29 题、困难 25 题全收，无待补。题干、选项、答案、解析全部来自
// 原站提取；答案一律按答案文字定位（提取报告里的字母按九宫格位置标，与选项顺序
// 对不上）。跨档重复的题是原站本身复用，照原样保留、不去重。5 道填空题（简单第 8
// 题，中等第 11、16 题，困难第 22、23 题）原站给的是描述性提示、不是提示词，括号
// 词只作显示用「介词」，题干与答案未动；原站提示的中文意思：简单第 8 题——表示
// “在一个表面上”的介词；中等第 11 题、困难第 22 题——与时刻和夜晚连用的介词；
// 中等第 16 题、困难第 23 题——意思是“在某物后面”的介词。简单第 12 题选项 by at
// 是原站原样，照实保留。
const A1_L11_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "选择翻译最准确的选项：钥匙在桌子上，灯旁边。", options: ["The keys to the lamp are on the table next.", "The keys is on the table next to the lamp.", "The keys are on the table next to the lamp.", "The keys they are on the table next to the lamp."], answer: 2, explain: "On 表示物体在一个平面上；next to 表示相邻的位置。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：邮局在银行和市场之间。", options: ["The post office is between the bank and a market.", "The post office is between the bank and the market.", "The post office is in between the bank and the market.", "The post office are between the bank and the market."], answer: 1, explain: "Between 总是与两个参照点连用，用 and 连接。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "简单", keepChoice: true },
  { q: "The exam is ___ 15 May.", options: ["in", "at", "on", "of"], answer: 2, explain: "具体的日期用 on。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：孩子们正在花园里玩。", options: ["The children are playing in the garden.", "The children is playing in the garden.", "The children are playing at the garden.", "The children are playing on the garden."], answer: 0, explain: "Garden 被理解为一个有边界的区域，所以用 in。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "简单", keepChoice: true },
  { q: "The conference starts ___ Monday.", options: ["in", "on", "at", "of"], answer: 1, explain: "On 与星期几连用。句中的 the conference 意思是“会议”。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "简单", keepChoice: true },
  { q: "The train leaves ___ seven o'clock.", options: ["in", "at", "on", "of"], answer: 1, explain: "时刻是一个时间点，所以用 at。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "简单", keepChoice: true },
  { q: "She goes jogging ___ the morning.", options: ["in", "at", "on", "of"], answer: 0, explain: "In the morning、in the afternoon、in the evening 都遵循 in + 一天中的时段这个规律。句中的 in the morning 意思是“在早上”。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "简单", keepChoice: true },
  { q: "The keys are ___ （在桌子面上） the table.", options: [], answer: 0, answerText: "on", baseWord: "介词", sentence: "The keys are on the table.", explain: "句中 on the table 的意思是“在桌子面上”，the keys 的意思是“这串钥匙”。“在桌子面上”这个提示说明钥匙位于一个平面上、有接触，所以用 on；under（桌子下面）是完全不同的位置。", difficulty: "简单", kind: "blank" },
  { q: "选择符合“在街角”意思的介词。— There is a small shop ___ the corner of Le Loi Street.", options: ["in", "on", "at", "of"], answer: 2, explain: "街角是交叉点，所以用 at the corner。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "简单", keepChoice: true },
  { q: "The lecture begins ___ 8:30.", options: ["at", "in", "on", "of"], answer: 0, explain: "At 放在一天中具体的时刻前面。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["Waiting for me at the bus stop.", "Wait for me in the bus stop.", "Wait for me at the bus stop.", "Wait for I at the bus stop."], answer: 2, explain: "Bus stop 被看作一个点，所以用 at。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。— ___ 2026", options: ["at", "by at", "in", "on"], answer: 2, explain: "年份是较长的时间段，所以用 in。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["I was born at July.", "I were born in July.", "I was born on July.", "I was born in July."], answer: 3, explain: "月份用 in；on 只与具体的日期连用。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "简单", keepChoice: true },
  { q: "My cousin lives ___ Da Nang.", options: ["at", "on", "of", "in"], answer: 3, explain: "句中的 in Da Nang 意思是“在岘港”。城市是包围空间，所以用 in。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "简单", keepChoice: true },
  { q: "The journal is published ___ July.", options: ["at", "on", "of", "in"], answer: 3, explain: "句中的 the journal 意思是“学术期刊”。In 与月份连用。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "简单", keepChoice: true },
  { q: "The scientist works ___ Hanoi.", options: ["at", "in", "on", "of"], answer: 1, explain: "句中的 in Hanoi 意思是“在河内”。In 与城市连用。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "简单", keepChoice: true },
  { q: "The post office is ___ the bank and the market.", options: ["at", "in", "between", "of"], answer: 2, explain: "Between 用于有两个参照点的情况，用 and 连接。句中的 the post office 意思是“邮局”。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["We meet in Sunday on 10 a.m.", "We meet at Sunday in 10 a.m.", "We meet on Sunday at 10 a.m.", "We meet on Sunday in 10 a.m."], answer: 2, explain: "星期用 on，时刻用 at。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：课九点开始，在星期一。", options: ["The class starts at nine on Monday.", "The class starts in nine on Monday.", "The class starts on nine at Monday.", "The class starts at nine in Monday."], answer: 0, explain: "时刻用 at，星期用 on；两个介词出现在同一句里，不能互相代替。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：她 2010 年 7 月出生。", options: ["She was born on July 2010.", "She was born in July 2010.", "She was born at July 2010.", "She was born on July in 2010."], answer: 1, explain: "月份和年份都是较长的时间段，所以用 in。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "简单", keepChoice: true },
  // ---- 中等 ----
  { q: "The experiment starts ___ midnight.", options: ["at", "in", "on", "of"], answer: 0, explain: "句中的 the experiment 意思是“实验”。At midnight 是固定时间搭配。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "中等", keepChoice: true },
  { q: "The institute opened ___ 2018.", options: ["at", "on", "in", "of"], answer: 2, explain: "In 与年份 2018 连用；opened 在这里是一般过去时，但重点是介词。句中的 the institute 意思是“研究所”。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "中等", keepChoice: true },
  { q: "The lecture begins ___ 14:15.", options: ["at", "in", "on", "of"], answer: 0, explain: "At 放在一天中具体的时刻前面。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "中等", keepChoice: true },
  { q: "The conference starts ___ noon.", options: ["at", "in", "on", "of"], answer: 0, explain: "句中 the conference 的意思是“会议”，at noon 的意思是“在正午”。At 与时间点 noon 连用。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "中等", keepChoice: true },
  { q: "The diagram is ___ page ten.", options: ["at", "on", "in", "of"], answer: 1, explain: "On 用于表示信息在书页上。句中的 the diagram 意思是“图表”。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "中等", keepChoice: true },
  { q: "The laboratory is ___ the library and the lecture hall.", options: ["at", "between", "in", "of"], answer: 1, explain: "句中 the laboratory 的意思是“实验室”，the library 的意思是“图书馆”。Between 表示位于两个确定的地点之间。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "中等", keepChoice: true },
  { q: "The diagram is ___ page ten of the report.", options: ["at", "on", "in", "of"], answer: 1, explain: "句中 the diagram 的意思是“图表”，the report 的意思是“报告”。On 用于表示信息在书页上。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "中等", keepChoice: true },
  { q: "The samples are ___ the table, on the floor where nobody can see them.", options: ["at", "in", "under", "on"], answer: 2, explain: "这句话的意思是“样品在桌子下面、在地板上，放在没人看得见的地方”。样品在 on the floor（地板上），所以不可能在桌子面上；桌子下面的位置是 under。选 on 会和 on the floor 矛盾，in 和 at 都不表示下面的位置。", difficulty: "中等", keepChoice: true },
  { q: "选择翻译最准确的选项：我通常晚上看书，但从不在深夜学习。", options: ["I usually read on the evening, but I never study on night.", "I usually read in the evening, but I never study in night.", "I usually read in the evening, but I never study on night.", "I usually read in the evening, but I never study at night."], answer: 3, explain: "In the evening 符合规律，at night 是固定搭配里的例外。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "中等", keepChoice: true },
  { q: "The meeting is ___ Friday morning.", options: ["in", "on", "at", "of"], answer: 1, explain: "On 与某个确定日子里的时段连用。句中 on Friday morning 的意思是“在星期五早上”，the meeting 的意思是“会议”。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "中等", keepChoice: true },
  { q: "I never study ___ night.", options: [], answer: 0, answerText: "at", baseWord: "介词", sentence: "I never study at night.", explain: "句中 at night 的意思是“在夜里”，never 的意思是“从不”。At night 是固定搭配，不遵循 in + 时段的规律。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "中等", kind: "blank" },
  { q: "The samples are ___ the refrigerator, so they stay cold.", options: ["at", "on", "in", "of"], answer: 2, explain: "这句话的意思是“样品放在冰箱里，所以一直保持低温”。so they stay cold 说明样品在冰箱里面，所以用 in。放在 on the refrigerator（冰箱顶上），样品就不会被冷藏。", difficulty: "中等", keepChoice: true },
  { q: "The institute is ___ the library and the lecture hall.", options: ["at", "between", "in", "of"], answer: 1, explain: "Between 表示位于两个确定的地点之间。句中 the institute 的意思是“研究所”，the library 的意思是“图书馆”。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "中等", keepChoice: true },
  { q: "The symposium starts ___ noon.", options: ["in", "at", "on", "of"], answer: 1, explain: "At 与时间点 noon 连用。句中的 at noon 意思是“在正午”。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "中等", keepChoice: true },
  { q: "The devices are ___ the refrigerator; you have to open the door to see them.", options: ["at", "on", "under", "in"], answer: 3, explain: "这句话的意思是“设备在冰箱里面；得打开冰箱门才能看见它们”。you have to open the door to see them 说明设备在冰箱里面，所以用 in。如果设备在 on the refrigerator（冰箱顶上），不用开门也能看见。", difficulty: "中等", keepChoice: true },
  { q: "The garden is ___ （在后面） the house.", options: [], answer: 0, answerText: "behind", baseWord: "介词", sentence: "The garden is behind the house.", explain: "Behind 表示在某物后面的位置。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "中等", kind: "blank" },
  { q: "The editor is ___ the office now.", options: ["at", "on", "in", "of"], answer: 2, explain: "In 表示在办公室里面。句中 the editor 的意思是“编辑”，the office 的意思是“办公室”。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "中等", keepChoice: true },
  { q: "The devices are ___ the table, so you have to bend down to see them.", options: ["at", "under", "in", "on"], answer: 1, explain: "这句话的意思是“设备在桌子下面，所以得弯腰才能看见它们”。you have to bend down 说明设备在桌子面下面，所以用 under。如果设备在 on the table（桌子面上），站直了也能看见，in 和 at 都不表示下面的位置。", difficulty: "中等", keepChoice: true },
  { q: "The workshop is ___ September.", options: ["at", "in", "on", "of"], answer: 1, explain: "In 与月份 September 连用。句中 the workshop 的意思是“培训会”，in September 的意思是“在九月”。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "中等", keepChoice: true },
  { q: "The shelf is full: all my books are ___ it now.", options: ["at", "in", "under", "on"], answer: 3, explain: "这句话的意思是“书架已经满了：现在我所有的书都在架子上”。架子满了（full）意思是书已经占满了架面，所以用 on（在表面上、有接触）；对一块架板，英语说 on the shelf，不说 in the shelf。Under（下面）没法让架子变满，between 则需要两个物体才能站在中间。", difficulty: "中等", keepChoice: true },
  { q: "The journal is published ___ November.", options: ["at", "on", "in", "of"], answer: 2, explain: "In 与月份连用。句中的 the journal 意思是“学术期刊”。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "中等", keepChoice: true },
  { q: "The bookcase is full, so the volumes are ___ it, lying flat across the top.", options: ["on", "in", "under", "of"], answer: 0, explain: "这句话的意思是“书柜已经满了，所以这些书平放在柜顶上”。柜子已经满了（full），书平放在柜顶（lying flat across the top），也就是说书在柜子的表面上，所以用 on。In（里面）和 full 矛盾，under（下面）和 across the top 矛盾。", difficulty: "中等", keepChoice: true },
  { q: "The scientist works ___ Hanoi.", options: ["at", "on", "of", "in"], answer: 3, explain: "句中的 in Hanoi 意思是“在河内”。In 与城市连用。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "中等", keepChoice: true },
  { q: "The symposium starts ___ Monday.", options: ["on", "in", "at", "of"], answer: 0, explain: "On 与星期几连用。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "中等", keepChoice: true },
  { q: "The conference starts ___ Monday.", options: ["on", "in", "at", "of"], answer: 0, explain: "On 与星期几连用。句中的 the conference 意思是“会议”。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "中等", keepChoice: true },
  { q: "The lecture begins ___ 8:30.", options: ["at", "in", "on", "of"], answer: 0, explain: "At 放在一天中具体的时刻前面。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "中等", keepChoice: true },
  { q: "The journal is published ___ July.", options: ["at", "on", "of", "in"], answer: 3, explain: "句中的 the journal 意思是“学术期刊”。In 与月份连用。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "中等", keepChoice: true },
  { q: "The analyst works ___ Hanoi.", options: ["at", "in", "on", "of"], answer: 1, explain: "In 与城市连用。句中 the analyst 的意思是“分析员”，in Hanoi 的意思是“在河内”。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "中等", keepChoice: true },
  { q: "The poster is ___ the wall.", options: ["on", "in", "at", "of"], answer: 0, explain: "句中 on the wall 的意思是“在墙上”，the poster 的意思是“海报”。On 表示海报贴上去的那个表面。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "中等", keepChoice: true },
  // ---- 困难 ----
  { q: "The diagram is ___ page ten.", options: ["on", "in", "at", "of"], answer: 0, explain: "On 用于表示信息在书页上。句中的 the diagram 意思是“图表”。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "困难", keepChoice: true },
  { q: "The devices are ___ the table, so you have to bend down to see them.", options: ["at", "under", "in", "on"], answer: 1, explain: "这句话的意思是“设备在桌子下面，所以得弯腰才能看见它们”。you have to bend down 说明设备在桌子面下面，所以用 under。如果设备在 on the table（桌子面上），站直了也能看见，in 和 at 都不表示下面的位置。", difficulty: "困难", keepChoice: true },
  { q: "The devices are ___ the refrigerator; you have to open the door to see them.", options: ["at", "in", "under", "on"], answer: 1, explain: "这句话的意思是“设备在冰箱里面；得打开冰箱门才能看见它们”。you have to open the door to see them 说明设备在冰箱里面，所以用 in。如果设备在 on the refrigerator（冰箱顶上），不用开门也能看见。", difficulty: "困难", keepChoice: true },
  { q: "The shelf is full: all my books are ___ it now.", options: ["at", "on", "in", "under"], answer: 1, explain: "这句话的意思是“书架已经满了：现在我所有的书都在架子上”。架子满了（full）意思是书已经占满了架面，所以用 on（在表面上、有接触）；对一块架板，英语说 on the shelf，不说 in the shelf。Under（下面）没法让架子变满，between 则需要两个物体才能站在中间。", difficulty: "困难", keepChoice: true },
  { q: "The workshop is ___ September.", options: ["at", "on", "in", "of"], answer: 2, explain: "句中 the workshop 的意思是“培训会”，in September 的意思是“在九月”。In 与月份 September 连用。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "困难", keepChoice: true },
  { q: "The conference starts ___ noon.", options: ["at", "in", "on", "of"], answer: 0, explain: "句中 the conference 的意思是“会议”，at noon 的意思是“在正午”。At 与时间点 noon 连用。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "困难", keepChoice: true },
  { q: "The institute opened ___ 2018.", options: ["at", "in", "on", "of"], answer: 1, explain: "In 与年份 2018 连用；opened 在这里是一般过去时，但重点是介词。句中的 the institute 意思是“研究所”。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "困难", keepChoice: true },
  { q: "The meeting is ___ Friday morning.", options: ["on", "in", "at", "of"], answer: 0, explain: "句中 on Friday morning 的意思是“在星期五早上”，the meeting 的意思是“会议”。On 与某个确定日子里的时段连用。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "困难", keepChoice: true },
  { q: "The samples are ___ the refrigerator, so they stay cold.", options: ["at", "in", "on", "of"], answer: 1, explain: "这句话的意思是“样品放在冰箱里，所以一直保持低温”。so they stay cold 说明样品在冰箱里面，所以用 in。放在 on the refrigerator（冰箱顶上），样品就不会被冷藏。", difficulty: "困难", keepChoice: true },
  { q: "The lecture begins ___ 14:15.", options: ["in", "at", "on", "of"], answer: 1, explain: "At 放在一天中具体的时刻前面。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "困难", keepChoice: true },
  { q: "The analyst works ___ Hanoi.", options: ["at", "in", "on", "of"], answer: 1, explain: "In 与城市连用。句中 the analyst 的意思是“分析员”，in Hanoi 的意思是“在河内”。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "困难", keepChoice: true },
  { q: "The experiment starts ___ midnight.", options: ["in", "on", "of", "at"], answer: 3, explain: "句中的 the experiment 意思是“实验”。At midnight 是固定时间搭配。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "困难", keepChoice: true },
  { q: "The symposium starts ___ Monday.", options: ["on", "in", "at", "of"], answer: 0, explain: "On 与星期几连用。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "困难", keepChoice: true },
  { q: "选择翻译最准确的选项：我通常晚上看书，但从不在深夜学习。", options: ["I usually read in the evening, but I never study at night.", "I usually read in the evening, but I never study in night.", "I usually read on the evening, but I never study on night.", "I usually read on the evening, but I never study at night."], answer: 0, explain: "In the evening 符合规律，at night 是固定搭配里的例外。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "困难", keepChoice: true },
  { q: "The journal is published ___ November.", options: ["at", "in", "on", "of"], answer: 1, explain: "In 与月份连用。句中的 the journal 意思是“学术期刊”。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "困难", keepChoice: true },
  { q: "The samples are ___ the table, on the floor where nobody can see them.", options: ["at", "under", "in", "on"], answer: 1, explain: "这句话的意思是“样品在桌子下面、在地板上，放在没人看得见的地方”。样品在 on the floor（地板上），所以不可能在桌子面上；桌子下面的位置是 under。选 on 会和 on the floor 矛盾，in 和 at 都不表示下面的位置。", difficulty: "困难", keepChoice: true },
  { q: "The bookcase is full, so the volumes are ___ it, lying flat across the top.", options: ["in", "under", "on", "of"], answer: 2, explain: "这句话的意思是“书柜已经满了，所以这些书平放在柜顶上”。柜子已经满了（full），书平放在柜顶（lying flat across the top），也就是说书在柜子的表面上，所以用 on。In（里面）和 full 矛盾，under（下面）和 across the top 矛盾。", difficulty: "困难", keepChoice: true },
  { q: "The institute is ___ the library and the lecture hall.", options: ["at", "in", "of", "between"], answer: 3, explain: "Between 表示位于两个确定的地点之间。句中 the institute 的意思是“研究所”，the library 的意思是“图书馆”。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "困难", keepChoice: true },
  { q: "The laboratory is ___ the library and the lecture hall.", options: ["at", "between", "in", "of"], answer: 1, explain: "句中 the laboratory 的意思是“实验室”，the library 的意思是“图书馆”。Between 表示位于两个确定的地点之间。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "困难", keepChoice: true },
  { q: "The symposium starts ___ noon.", options: ["at", "in", "on", "of"], answer: 0, explain: "At 与时间点 noon 连用。句中的 at noon 意思是“在正午”。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "困难", keepChoice: true },
  { q: "The poster is ___ the wall.", options: ["on", "in", "at", "of"], answer: 0, explain: "On 表示海报贴上去的那个表面。句中 on the wall 的意思是“在墙上”，the poster 的意思是“海报”。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "困难", keepChoice: true },
  { q: "I never study ___ night.", options: [], answer: 0, answerText: "at", baseWord: "介词", sentence: "I never study at night.", explain: "句中 at night 的意思是“在夜里”，never 的意思是“从不”。At night 是固定搭配，不遵循 in + 时段的规律。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "困难", kind: "blank" },
  { q: "The garden is ___ （在后面） the house.", options: [], answer: 0, answerText: "behind", baseWord: "介词", sentence: "The garden is behind the house.", explain: "Behind 表示在某物后面的位置。介词帮助确定句子成分之间的地点或时间关系。", difficulty: "困难", kind: "blank" },
  { q: "The editor is ___ the office now.", options: ["at", "on", "in", "of"], answer: 2, explain: "In 表示在办公室里面。句中 the editor 的意思是“编辑”，the office 的意思是“办公室”。对于时间来说，时刻、日期和月份的表达方式并不完全相同。", difficulty: "困难", keepChoice: true },
  { q: "The diagram is ___ page ten of the report.", options: ["on", "in", "at", "of"], answer: 0, explain: "句中 the diagram 的意思是“图表”，the report 的意思是“报告”。On 用于表示信息在书页上。地点被想象成表面、内部空间还是一个确定的点，会影响要用的介词。", difficulty: "困难", keepChoice: true },
];

// ---------------- 原站 A1 第 12 课测验原题（经作者授权翻译，本轮提取） ----------------
// 简单 20 题、中等 30 题、困难 27 题全收，无待补。题干、选项、答案、解析全部来自
// 原站提取；答案一律按答案文字定位（提取报告里的字母按九宫格位置标，与选项顺序
// 对不上）。跨档重复的题是原站本身复用，照原样保留、不去重。简单第 5 题原站 A、D
// 两个选项文字完全相同（"Does your sister work here?"），原站正确答案是第 4 个
// 选项，两个选项按原站原样都保留，答案按文字记为第 4 项（下标 3）。
const A1_L12_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "选择正确的选项。", options: ["She eats fish but doesn't eat meat.", "She eat fish but don't eat meat.", "She eat fish but doesn't eats meat.", "She eats fish but doesn't eats meat."], answer: 0, explain: "肯定部分有 -s 词尾，否定部分已有 doesn't，所以动词回到原形。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "简单", keepChoice: true },
  { q: "I ___ the answer to this question.", options: ["am know", "know", "knows", "am knowing"], answer: 1, explain: "Know 是状态动词，通常不用进行时。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "简单", keepChoice: true },
  { q: "The train ___ at 6.15 tomorrow morning.", options: ["leaves", "leave", "will leaving", "is leaving to"], answer: 0, explain: "句中的 tomorrow 意思是“明天”。固定日程用一般现在时，即使说的是未来。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "简单", keepChoice: true },
  { q: "The laboratory ___ at nine every day.", options: ["opening", "openn", "open", "opens"], answer: 3, explain: "Laboratory 是单数名词；一般现在时里普通动词加 -s。句中的 the laboratory 意思是“实验室”。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "简单", keepChoice: true },
  // 简单第 5 题：原站 A、D 两项文字完全相同，原站正确答案是第 4 个选项（下标 3）。
  { q: "选择正确的选项。", options: ["Does your sister work here?", "Do your sister works here?", "Does your sister works here?", "Does your sister work here?"], answer: 3, explain: "Your sister 是第三人称单数，所以用 does，动词回到原形。句中的 sister 意思是“姐姐/妹妹”。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：水在一百摄氏度沸腾。", options: ["Water is boils at one hundred degrees Celsius.", "Water boils at one hundred degrees Celsius.", "Waters boils at one hundred degrees Celsius.", "Water boils at one did hundred degrees Celsius."], answer: 1, explain: "永恒的真理用一般现在时，不用现在进行时。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "简单", keepChoice: true },
  { q: "She ___ like spicy food.", options: ["isn't", "aren't", "doesn't", "don't"], answer: 2, explain: "第三人称单数用 doesn't。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的动词形式。", options: ["She walk", "She walking", "She is walk", "She walks"], answer: 3, explain: "第三人称单数要在动词后加 -s。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：你姐姐在河内工作吗？", options: ["Does your sister works in Hanoi?", "Your sister work in Hanoi?", "Do your sister work in Hanoi?", "Does your sister work in Hanoi?"], answer: 3, explain: "Does 已经带了第三人称单数的标志，所以 work 不加 -s。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "简单", keepChoice: true },
  { q: "Our colleagues ___ English at conferences.", options: ["speak", "speaking", "spoke", "speaks"], answer: 0, explain: "Colleagues 是复数，所以用 speak。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["They don't plays tennis.", "They doesn't play tennis.", "They don't playing tennis.", "They don't play tennis."], answer: 3, explain: "复数主语用 don't。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：汤姆每天早上上班前喝咖啡。", options: ["Tom drinks coffees every morning before work.", "Tom drinks coffee every morning before work.", "Tom is drinks coffee every morning before work.", "Tom drinks coffee every morning before works."], answer: 1, explain: "drinks 里的 -s 是表明主语是第三人称单数的唯一标志。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "简单", keepChoice: true },
  { q: "He ___ to the gym twice a week.", options: ["go", "goes", "gos", "going"], answer: 1, explain: "以 -o 结尾的动词加 -es。句中的 twice 意思是“两次”。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：末班车九点十分发车。", options: ["The last bus leaves at ten past nine.", "The last bus leave at ten past nine.", "The last bus leaving at ten past nine.", "The last bus left at ten past nine."], answer: 0, explain: "一般现在时用于车船时刻，即使事情属于未来。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：我哥哥每天晚上学习。", options: ["My brother studying every evening.", "My brother is study every evening.", "My brother studies every evening.", "My brother study every evening."], answer: 2, explain: "My brother 是第三人称单数，所以 study 变成 studies；every evening 是重复的标志。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "简单", keepChoice: true },
  { q: "This method ___ well in practice.", options: ["work", "worked", "working", "works"], answer: 3, explain: "This method 是单数；works 里加了 -s。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "简单", keepChoice: true },
  { q: "The students ___ scientific articles.", options: ["read", "reads", "is read", "reading"], answer: 0, explain: "Students 是复数，一般现在时里仍用 read。句中的 the students 意思是“学生”。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：她不吃肉，但吃鱼。", options: ["She doesn't eat meat, but she eat fish.", "She doesn't eats meat, but she eat fish.", "She does not eat meat, but she eats fish.", "She does not eats meat, but she eats fish."], answer: 2, explain: "在 does not 后面，动词回到原形 eat；在肯定部分仍是 eats。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["He live here?", "Do he live here?", "Does he lives here?", "Does he live here?"], answer: 3, explain: "在 does 后面，主要动词回到原形。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "简单", keepChoice: true },
  { q: "The editor ___ every manuscript.", options: ["checks", "checking", "check", "checked"], answer: 0, explain: "句中 the editor 的意思是“编辑”，manuscript 的意思是“稿件”。Editor 是单数，所以 check 加 -s 变成 checks。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "简单", keepChoice: true },
  // ---- 中等 ----
  { q: "The sensor ___ (measure) the temperature each hour.", options: [], answer: 0, answerText: "measures", baseWord: "measure", sentence: "The sensor measures the temperature each hour.", explain: "Sensor 是单数，动作重复，加 -s 变成 measures。句中 the temperature 的意思是“温度”，sensor 的意思是“传感器”。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "中等", kind: "blank" },
  { q: "The journal ___ (publish) research papers.", options: [], answer: 0, answerText: "publishes", baseWord: "publish", sentence: "The journal publishes research papers.", explain: "句中 research papers 的意思是“研究论文”，the journal 的意思是“学术期刊”。Journal 是单数，publish 以 -sh 结尾，加 -es。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "中等", kind: "blank" },
  { q: "The summary ___ (contain) two main sections.", options: [], answer: 0, answerText: "contains", baseWord: "contain", sentence: "The summary contains two main sections.", explain: "summary 是单数，所以用 contains。句中的 the summary 意思是“摘要”。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "中等", kind: "blank" },
  { q: "The seminar ___ (begin) at 3 p.m. on Fridays.", options: [], answer: 0, answerText: "begins", baseWord: "begin", sentence: "The seminar begins at 3 p.m. on Fridays.", explain: "Seminar 是单数，定期日程，所以用 begins。句中的 the seminar 意思是“研讨会”。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "中等", kind: "blank" },
  { q: "The investigators ___ two reports every month.", options: ["write", "wrote", "writing", "writes"], answer: 0, explain: "句中的 the investigators 意思是“调查人员”。investigators 是复数，所以一般现在时的动词用原形 write。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "中等", keepChoice: true },
  { q: "The institute ___ (do) not accept late reports.", options: [], answer: 0, answerText: "does", baseWord: "do", sentence: "The institute does not accept late reports.", explain: "句中的 the institute 意思是“研究所”。一般现在时的否定句里，单数的 institute 用 does not + 动词原形。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "中等", kind: "blank" },
  { q: "The sensor ___ the temperature each hour.", options: ["measuring", "measures", "measure", "measured"], answer: 1, explain: "句中 the temperature 的意思是“温度”，sensor 的意思是“传感器”。Sensor 是单数，动作重复，加 -s 变成 measures。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "中等", keepChoice: true },
  { q: "Water ___ at 100°C at standard atmospheric pressure.", options: ["boiled", "boiling", "boil", "boils"], answer: 3, explain: "在给定条件下的科学真理用一般现在时；water 是不可数单数，所以用 boils。句中的 water 意思是“水”。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "中等", keepChoice: true },
  { q: "The students ___ scientific articles.", options: ["is read", "reads", "read", "reading"], answer: 2, explain: "Students 是复数，一般现在时里仍用 read。句中的 the students 意思是“学生”。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "中等", keepChoice: true },
  { q: "The reviewer ___ every manuscript.", options: ["check", "checking", "checked", "checks"], answer: 3, explain: "Reviewer 是单数名词，指审稿人，所以 check 加 -s 变成 checks。句中 the reviewer 的意思是“审稿人”，manuscript 的意思是“稿件”。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "中等", keepChoice: true },
  { q: "The institute ___ at nine every day.", options: ["openn", "opens", "opening", "open"], answer: 1, explain: "institute 是单数名词；一般现在时里普通动词加 -s。句中的 the institute 意思是“研究所”。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "中等", keepChoice: true },
  { q: "This method ___ well in practice.", options: ["works", "working", "work", "worked"], answer: 0, explain: "This method 是单数；works 里加了 -s。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "中等", keepChoice: true },
  { q: "The journal ___ research papers.", options: ["publishing", "published", "publishes", "publish"], answer: 2, explain: "Journal 是单数，publish 以 -sh 结尾，加 -es。句中 research papers 的意思是“研究论文”，the journal 的意思是“学术期刊”。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "中等", keepChoice: true },
  { q: "Water ___ (boil) at 100°C at standard atmospheric pressure.", options: [], answer: 0, answerText: "boils", baseWord: "boil", sentence: "Water boils at 100°C at standard atmospheric pressure.", explain: "句中的 water 意思是“水”。在给定条件下的科学真理用一般现在时；water 是不可数单数，所以用 boils。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "中等", kind: "blank" },
  { q: "My sister ___ (study) French at university.", options: [], answer: 0, answerText: "studies", baseWord: "study", sentence: "My sister studies French at university.", explain: "辅音 + y 变成 -ies。句中 my sister 的意思是“我姐姐/妹妹”，study 的意思是“学习”。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "中等", kind: "blank" },
  { q: "My father ___ (have) breakfast at seven.", options: [], answer: 0, answerText: "has", baseWord: "have", sentence: "My father has breakfast at seven.", explain: "句中 my father 的意思是“我父亲”。Have 在第三人称单数有特殊形式 has。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "中等", kind: "blank" },
  { q: "Tom ___ (drink) coffee every morning.", options: [], answer: 0, answerText: "drinks", baseWord: "drink", sentence: "Tom drinks coffee every morning.", explain: "句中的 every morning 意思是“每天早上”。Tom 是第三人称单数，所以加 -s。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "中等", kind: "blank" },
  { q: "My colleague ___ (study) data security.", options: [], answer: 0, answerText: "studies", baseWord: "study", sentence: "My colleague studies data security.", explain: "Study 以辅音 + y 结尾，和 he/she/it 连用时 y 变成 ies。句中的 study 意思是“研究”。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "中等", kind: "blank" },
  { q: "Our research partners ___ English at workshops.", options: ["speaking", "spoke", "speak", "speaks"], answer: 2, explain: "句中的 research 意思是“研究”。Research partners 是复数名词短语，指研究合作者；因此动词 speak 在一般现在时里保持原形。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "中等", keepChoice: true },
  { q: "My colleague ___ data security.", options: ["studying", "studys", "study", "studies"], answer: 3, explain: "句中的 study 意思是“研究”。Study 以辅音 + y 结尾，和 he/she/it 连用时 y 变成 ies。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "中等", keepChoice: true },
  { q: "This approach ___ well in practice.", options: ["worked", "works", "working", "work"], answer: 1, explain: "This approach 是单数；works 里加了 -s。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "中等", keepChoice: true },
  { q: "Our colleagues ___ English at conferences.", options: ["speaks", "speaking", "speak", "spoke"], answer: 2, explain: "Colleagues 是复数，所以用 speak。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "中等", keepChoice: true },
  { q: "The company ___ a research office in Da Nang.", options: ["has", "haves", "have", "having"], answer: 0, explain: "句中 in Da Nang 的意思是“在岘港”，research 的意思是“研究”。Company 是单数，have 的一般现在时是 has。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "中等", keepChoice: true },
  { q: "The researchers ___ two reports every month.", options: ["writes", "wrote", "writing", "write"], answer: 3, explain: "Researchers 是复数，所以一般现在时的动词用原形 write。句中的 the researchers 意思是“研究者们”。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "中等", keepChoice: true },
  { q: "The editor ___ every manuscript.", options: ["check", "checked", "checks", "checking"], answer: 2, explain: "句中 the editor 的意思是“编辑”，manuscript 的意思是“稿件”。Editor 是单数，所以 check 加 -s 变成 checks。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "中等", keepChoice: true },
  { q: "The laboratory ___ not accept late reports.", options: ["do", "is", "does", "doing"], answer: 2, explain: "一般现在时的否定句里，单数的 laboratory 用 does not + 动词原形。句中的 the laboratory 意思是“实验室”。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "中等", keepChoice: true },
  { q: "The report ___ two main sections.", options: ["contains", "contained", "contain", "containing"], answer: 0, explain: "句中的 the report 意思是“报告”。Report 是单数，所以用 contains。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "中等", keepChoice: true },
  { q: "The seminar ___ at 3 p.m. on Fridays.", options: ["begins", "began", "begin", "beginning"], answer: 0, explain: "句中的 the seminar 意思是“研讨会”。Seminar 是单数，定期日程，所以用 begins。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "中等", keepChoice: true },
  { q: "The reviewers ___ not share confidential data.", options: ["do", "does", "are", "is"], answer: 0, explain: "Reviewers 是复数，用 do not + 原形 share。句中 confidential 的意思是“保密的”，reviewers 的意思是“审稿人”。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "中等", keepChoice: true },
  { q: "The analysts ___ the same software.", options: ["use", "using", "uses", "used"], answer: 0, explain: "Analysts 是复数，所以一般现在时是 use。句中的 the analysts 意思是“分析员们”。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "中等", keepChoice: true },
  // ---- 困难 ----
  { q: "The seminar ___ at 3 p.m. on Fridays.", options: ["began", "begin", "beginning", "begins"], answer: 3, explain: "句中的 the seminar 意思是“研讨会”。Seminar 是单数，定期日程，所以用 begins。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "困难", keepChoice: true },
  { q: "The researchers ___ two reports every month.", options: ["wrote", "writes", "writing", "write"], answer: 3, explain: "Researchers 是复数，所以一般现在时的动词用原形 write。句中的 the researchers 意思是“研究者们”。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "困难", keepChoice: true },
  { q: "The sensor ___ (measure) the temperature each hour.", options: [], answer: 0, answerText: "measures", baseWord: "measure", sentence: "The sensor measures the temperature each hour.", explain: "Sensor 是单数，动作重复，加 -s 变成 measures。句中 the temperature 的意思是“温度”，sensor 的意思是“传感器”。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "困难", kind: "blank" },
  { q: "My colleague ___ (study) data security.", options: [], answer: 0, answerText: "studies", baseWord: "study", sentence: "My colleague studies data security.", explain: "Study 以辅音 + y 结尾，和 he/she/it 连用时 y 变成 ies。句中的 study 意思是“研究”。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "困难", kind: "blank" },
  { q: "The institute ___ at nine every day.", options: ["open", "openn", "opening", "opens"], answer: 3, explain: "institute 是单数名词；一般现在时里普通动词加 -s。句中的 the institute 意思是“研究所”。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "困难", keepChoice: true },
  { q: "The sensor ___ the temperature each hour.", options: ["measure", "measures", "measured", "measuring"], answer: 1, explain: "句中 the temperature 的意思是“温度”，sensor 的意思是“传感器”。Sensor 是单数，动作重复，加 -s 变成 measures。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "困难", keepChoice: true },
  { q: "Tom ___ (drink) coffee every morning.", options: [], answer: 0, answerText: "drinks", baseWord: "drink", sentence: "Tom drinks coffee every morning.", explain: "句中的 every morning 意思是“每天早上”。Tom 是第三人称单数，所以加 -s。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "困难", kind: "blank" },
  { q: "把下面这句话翻译成英语：学生每周读科学论文。", options: ["The students did read scientific articles every week.", "The students are read scientific articles every week.", "The students read scientific articles every week.", "The students reading scientific articles every week."], answer: 2, explain: "复数主语保持原形：the students read，而 reads 只和 he、she、it 连用。", difficulty: "困难", keepChoice: true },
  { q: "The reviewers ___ not share confidential data.", options: ["is", "does", "do", "are"], answer: 2, explain: "Reviewers 是复数，用 do not + 原形 share。句中 confidential 的意思是“保密的”，reviewers 的意思是“审稿人”。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "困难", keepChoice: true },
  { q: "The institute ___ (do) not accept late reports.", options: [], answer: 0, answerText: "does", baseWord: "do", sentence: "The institute does not accept late reports.", explain: "句中的 the institute 意思是“研究所”。一般现在时的否定句里，单数的 institute 用 does not + 动词原形。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "困难", kind: "blank" },
  { q: "Our research partners ___ English at workshops.", options: ["speak", "speaking", "speaks", "spoke"], answer: 0, explain: "句中的 research 意思是“研究”。Research partners 是复数名词短语，指研究合作者；因此动词 speak 在一般现在时里保持原形。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "困难", keepChoice: true },
  { q: "The journal ___ research papers.", options: ["publishes", "published", "publish", "publishing"], answer: 0, explain: "Journal 是单数，publish 以 -sh 结尾，加 -es。句中 research papers 的意思是“研究论文”，the journal 的意思是“学术期刊”。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "困难", keepChoice: true },
  { q: "The seminar ___ (begin) at 3 p.m. on Fridays.", options: [], answer: 0, answerText: "begins", baseWord: "begin", sentence: "The seminar begins at 3 p.m. on Fridays.", explain: "Seminar 是单数，定期日程，所以用 begins。句中的 the seminar 意思是“研讨会”。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "困难", kind: "blank" },
  { q: "The laboratory ___ not accept late reports.", options: ["do", "is", "does", "doing"], answer: 2, explain: "一般现在时的否定句里，单数的 laboratory 用 does not + 动词原形。句中的 the laboratory 意思是“实验室”。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "困难", keepChoice: true },
  { q: "My father ___ (have) breakfast at seven.", options: [], answer: 0, answerText: "has", baseWord: "have", sentence: "My father has breakfast at seven.", explain: "句中 my father 的意思是“我父亲”。Have 在第三人称单数有特殊形式 has。表示重复或固定日程的词说明，这件事是作为一种习惯或规律来表述的。", difficulty: "困难", kind: "blank" },
  { q: "The summary ___ (contain) two main sections.", options: [], answer: 0, answerText: "contains", baseWord: "contain", sentence: "The summary contains two main sections.", explain: "summary 是单数，所以用 contains。句中的 the summary 意思是“摘要”。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "困难", kind: "blank" },
  { q: "The reviewer ___ every manuscript.", options: ["checking", "checks", "check", "checked"], answer: 1, explain: "Reviewer 是单数名词，指审稿人，所以 check 加 -s 变成 checks。句中 the reviewer 的意思是“审稿人”，manuscript 的意思是“稿件”。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "困难", keepChoice: true },
  { q: "This approach ___ well in practice.", options: ["working", "worked", "works", "work"], answer: 2, explain: "This approach 是单数；works 里加了 -s。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "困难", keepChoice: true },
  { q: "The investigators ___ two reports every month.", options: ["writes", "write", "writing", "wrote"], answer: 1, explain: "句中的 the investigators 意思是“调查人员”。investigators 是复数，所以一般现在时的动词用原形 write。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "困难", keepChoice: true },
  { q: "Water ___ at 100°C at standard atmospheric pressure.", options: ["boils", "boiled", "boil", "boiling"], answer: 0, explain: "在给定条件下的科学真理用一般现在时；water 是不可数单数，所以用 boils。句中的 water 意思是“水”。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "困难", keepChoice: true },
  { q: "My sister ___ (study) French at university.", options: [], answer: 0, answerText: "studies", baseWord: "study", sentence: "My sister studies French at university.", explain: "辅音 + y 变成 -ies。句中 my sister 的意思是“我姐姐/妹妹”，study 的意思是“学习”。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "困难", kind: "blank" },
  { q: "The company ___ a research office in Da Nang.", options: ["has", "having", "haves", "have"], answer: 0, explain: "句中 in Da Nang 的意思是“在岘港”，research 的意思是“研究”。Company 是单数，have 的一般现在时是 has。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "困难", keepChoice: true },
  { q: "The analysts ___ the same software.", options: ["uses", "use", "using", "used"], answer: 1, explain: "Analysts 是复数，所以一般现在时是 use。句中的 the analysts 意思是“分析员们”。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "困难", keepChoice: true },
  { q: "The report ___ two main sections.", options: ["contain", "containing", "contained", "contains"], answer: 3, explain: "句中的 the report 意思是“报告”。Report 是单数，所以用 contains。需要注意的是主语是不是第三人称单数，因为这会影响动词词尾。", difficulty: "困难", keepChoice: true },
  { q: "Water ___ (boil) at 100°C at standard atmospheric pressure.", options: [], answer: 0, answerText: "boils", baseWord: "boil", sentence: "Water boils at 100°C at standard atmospheric pressure.", explain: "句中的 water 意思是“水”。在给定条件下的科学真理用一般现在时；water 是不可数单数，所以用 boils。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "困难", kind: "blank" },
  { q: "The journal ___ (publish) research papers.", options: [], answer: 0, answerText: "publishes", baseWord: "publish", sentence: "The journal publishes research papers.", explain: "句中 research papers 的意思是“研究论文”，the journal 的意思是“学术期刊”。Journal 是单数，publish 以 -sh 结尾，加 -es。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "困难", kind: "blank" },
  { q: "My colleague ___ data security.", options: ["study", "studies", "studys", "studying"], answer: 1, explain: "句中的 study 意思是“研究”。Study 以辅音 + y 结尾，和 he/she/it 连用时 y 变成 ies。在一般现在时里，动词的形式随主语和句子的用法而变化。", difficulty: "困难", keepChoice: true },
];

// ---------------- 原站 A1 第 13 课测验原题（经作者授权翻译，本轮提取） ----------------
// 简单 20 题、中等 30 题、困难 30 题全收，无待补。题干、选项、答案、解析全部来自
// 原站提取；答案一律按答案文字定位（提取报告里的字母按九宫格位置标，与选项顺序
// 对不上）。跨档重复的题是原站本身复用，照原样保留、不去重。原站解析里 waste
// 注释为“废物”，按原站解析的意思原样翻译，不作“纠正”。
const A1_L13_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "选择翻译最准确的选项：她晚上喜欢读漫画。", options: ["She likes read comics in the evening.", "She is likes reading comics in the evening.", "She likes reading comics in the evening.", "She in the evening likes reading comics."], answer: 2, explain: "likes 后面是 V-ing 形式 reading，不是 read。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "简单", keepChoice: true },
  { q: "She hates ___ time.", options: ["wasting", "to wasting", "waste", "wastes"], answer: 0, explain: "Hate + V-ing 表达对一项活动的不喜欢。句中的 waste 意思是“废物”。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "简单", keepChoice: true },
  { q: "The researchers love ___ new ideas.", options: ["to discussing", "discuss", "discussing", "discusses"], answer: 2, explain: "Love + V-ing 表示他们喜欢的活动。句中的 the researchers 意思是“研究者们”。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["He not like waiting in queues.", "He doesn't like waiting in queues.", "He doesn't like wait in queues.", "He doesn't likes waiting in queues."], answer: 1, explain: "Doesn't 后面 like 用原形，第二个动词用 V-ing 形式。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["Do you like dance?", "Do you like dancing?", "Are you like dancing?", "Does you like dancing?"], answer: 1, explain: "问句里 do 后面 like 用原形，第二个动词用 V-ing 形式。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "简单", keepChoice: true },
  { q: "We enjoy ___ scientific documentaries.", options: ["to watching", "watch", "watching", "watches"], answer: 2, explain: "Enjoy + V-ing，所以 watch 变成 watching。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "简单", keepChoice: true },
  { q: "They love ___ in the library.", options: ["study", "studies", "studying", "to studying"], answer: 2, explain: "句中 in the library 的意思是“在图书馆”，study 的意思是“学习”。Study 加 -ing 变成 studying，放在 love 后面。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "简单", keepChoice: true },
  { q: "I like ___ English podcasts.", options: ["listening to", "listen to", "to listening", "listens to"], answer: 0, explain: "Like + V-ing 表达一般的喜好。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "简单", keepChoice: true },
  { q: "She likes ___ comics.", options: ["reads", "to reading", "read", "reading"], answer: 3, explain: "like 后面是 V-ing 形式的动词。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "简单", keepChoice: true },
  { q: "The students enjoy ___ academic journals.", options: ["reading", "read", "reads", "to read"], answer: 0, explain: "Enjoy 在这个结构里与 V-ing 连用。句中的 the students 意思是“学生”。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "简单", keepChoice: true },
  { q: "The students like ___ mathematics.", options: ["to practising", "practises", "practise", "practising"], answer: 3, explain: "句中 the students 的意思是“学生”，mathematics 的意思是“数学”。Like + V-ing，practise 的英式拼写是 practising。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：他不喜欢排长队等候。", options: ["He don't like waiting in long queues.", "He doesn't likes waiting in long queues.", "He doesn't like waiting in long queues.", "He is doesn't like waiting in long queues."], answer: 2, explain: "Doesn't like 后面还是跟 V-ing；受助动词影响的是表示情感的动词 like。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "简单", keepChoice: true },
  { q: "选择拼写正确的 V-ing 形式。", options: ["writing", "writeing", "writeng", "writting"], answer: 0, explain: "以 -e 结尾的动词加 -ing 前要去掉 -e。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：我非常讨厌六点前起床。", options: ["I is hate getting up before six o'clock.", "I hate getting up before six o'clock.", "I hating getting up before six o'clock.", "I hates getting up before six o'clock."], answer: 1, explain: "Hate 是这组里否定程度最强的词，也跟 V-ing。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：我哥哥非常喜欢和朋友踢足球。", options: ["My brother loves playing football with his friends.", "My brother with his friends loves playing football.", "My brother is loves playing football with his friends.", "My brother loves playing football with his friend."], answer: 0, explain: "Love 比 like 程度更强，但后面跟的动词形式还是 V-ing。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "简单", keepChoice: true },
  { q: "She loves ___ visual diagrams.", options: ["draw", "draws", "to drawing", "drawing"], answer: 3, explain: "Love + V-ing 可以表示喜欢的活动。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "简单", keepChoice: true },
  { q: "The analyst dislikes ___ early.", options: ["to waking up", "waking up", "wake up", "wakes up"], answer: 1, explain: "Dislike 后面可以跟 V-ing；wake 加 -ing 前去掉 e。句中的 the analyst 意思是“分析员”。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "简单", keepChoice: true },
  { q: "I enjoy ___ research methods.", options: ["learns", "to learning", "learn", "learning"], answer: 3, explain: "句中的 research methods 意思是“研究方法”。Enjoy 总是接 V-ing 形式，不是 to 不定式。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "简单", keepChoice: true },
  { q: "He likes ___ research notes.", options: ["organises", "organising", "organised", "organise"], answer: 1, explain: "Like + V-ing 是表达喜好的结构。句中的 research 意思是“研究”。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["She liking reading comics.", "She is likes reading comics.", "She likes read comics.", "She likes reading comics."], answer: 3, explain: "like 后面必须是 V-ing 形式。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "简单", keepChoice: true },
  // ---- 中等 ----
  { q: "My brother loves ___ (play) football.", options: [], answer: 0, answerText: "playing", baseWord: "play", sentence: "My brother loves playing football.", explain: "love 后面是 V-ing 形式。句中 my brother 的意思是“我哥哥/弟弟”。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "中等", kind: "blank" },
  { q: "I enjoy ___ research methods.", options: ["learns", "to learning", "learn", "learning"], answer: 3, explain: "句中的 research methods 意思是“研究方法”。Enjoy 总是接 V-ing 形式，不是 to 不定式。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "中等", keepChoice: true },
  { q: "The scholars enjoy ___ academic journals.", options: ["read", "reading", "reads", "to read"], answer: 1, explain: "句中的 the scholars 意思是“学者们”。Enjoy 在这个结构里与 V-ing 连用。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "中等", keepChoice: true },
  { q: "She hates ___ valuable time.", options: ["to wasting", "waste", "wastes", "wasting"], answer: 3, explain: "Hate + V-ing 表达对一项活动的不喜欢。句中的 waste 意思是“废物”。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "中等", keepChoice: true },
  { q: "I like ___ (write) about linguistics.", options: [], answer: 0, answerText: "writing", baseWord: "write", sentence: "I like writing about linguistics.", explain: "Write 加 -ing 前去掉末尾的 e。句中的 linguistics 意思是“语言学”。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "中等", kind: "blank" },
  { q: "She loves ___ visual diagrams.", options: ["draw", "to drawing", "draws", "drawing"], answer: 3, explain: "Love + V-ing 可以表示喜欢的活动。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "中等", keepChoice: true },
  { q: "The team enjoys ___ (collaborate) with colleagues.", options: [], answer: 0, answerText: "collaborating", baseWord: "collaborate", sentence: "The team enjoys collaborating with colleagues.", explain: "Collaborate 加 -ing 前去掉末尾的 e。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "中等", kind: "blank" },
  { q: "I enjoy ___ new research methods.", options: ["to learning", "learn", "learns", "learning"], answer: 3, explain: "句中的 research methods 意思是“研究方法”。Enjoy 总是接 V-ing 形式，不是 to 不定式。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "中等", keepChoice: true },
  { q: "They love ___ at the institute.", options: ["studies", "studying", "to studying", "study"], answer: 1, explain: "句中 the institute 的意思是“研究所”，study 的意思是“学习”。Study 加 -ing 变成 studying，放在 love 后面。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "中等", keepChoice: true },
  { q: "Our reviewer hates ___ incorrect citations.", options: ["find", "finding", "to finding", "finds"], answer: 1, explain: "Hate + V-ing 表达对一项活动的情感。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "中等", keepChoice: true },
  { q: "The analyst dislikes ___ early.", options: ["wakes up", "waking up", "to waking up", "wake up"], answer: 1, explain: "Dislike 后面可以跟 V-ing；wake 加 -ing 前去掉 e。句中的 the analyst 意思是“分析员”。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "中等", keepChoice: true },
  { q: "The team enjoys ___ with colleagues.", options: ["collaborates", "collaborating", "to collaborating", "collaborate"], answer: 1, explain: "Collaborate 加 -ing 前去掉末尾的 e。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "中等", keepChoice: true },
  { q: "Our editor hates ___ incorrect citations.", options: ["find", "finds", "to finding", "finding"], answer: 3, explain: "Hate + V-ing 表达对一项活动的情感。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "中等", keepChoice: true },
  { q: "He likes ___ field notes.", options: ["organises", "organising", "organised", "organise"], answer: 1, explain: "Like + V-ing 是表达喜好的结构。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "中等", keepChoice: true },
  { q: "The investigators love ___ (discuss) complex theories.", options: [], answer: 0, answerText: "discussing", baseWord: "discuss", sentence: "The investigators love discussing complex theories.", explain: "句中的 the investigators 意思是“调查人员”。Love + V-ing 表示他们喜欢的活动。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "中等", kind: "blank" },
  { q: "The analyst dislikes ___ before sunrise.", options: ["wake up", "waking up", "wakes up", "to waking up"], answer: 1, explain: "Dislike 后面可以跟 V-ing；wake 加 -ing 前去掉 e。句中的 the analyst 意思是“分析员”。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "中等", keepChoice: true },
  { q: "I like ___ (listen) to language tutorials.", options: [], answer: 0, answerText: "listening", baseWord: "listen", sentence: "I like listening to language tutorials.", explain: "Like + V-ing 表达一般的喜好。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "中等", kind: "blank" },
  { q: "I like ___ about linguistics.", options: ["to writing", "writes", "writing", "write"], answer: 2, explain: "Write 加 -ing 前去掉末尾的 e。句中的 linguistics 意思是“语言学”。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "中等", keepChoice: true },
  { q: "The scholars enjoy ___ (read) linguistics textbooks.", options: [], answer: 0, answerText: "reading", baseWord: "read", sentence: "The scholars enjoy reading linguistics textbooks.", explain: "句中 the scholars 的意思是“学者们”，linguistics 的意思是“语言学”。Enjoy 在这个结构里与 V-ing 连用。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "中等", kind: "blank" },
  { q: "We dislike ___ irrelevant details in presentations.", options: ["repeating", "repeats", "repeat", "to repeating"], answer: 0, explain: "Dislike + V-ing 表示不喜欢的活动。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "中等", keepChoice: true },
  { q: "They enjoy ___ (swim) in the sea.", options: [], answer: 0, answerText: "swimming", baseWord: "swim", sentence: "They enjoy swimming in the sea.", explain: "Enjoy 接 V-ing，swim 加 -ing 要双写末尾辅音。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "中等", kind: "blank" },
  { q: "They love ___ difficult problems.", options: ["solve", "to solving", "solving", "solves"], answer: 2, explain: "句中的 difficult 意思是“难的”。Solve 加 -ing 前去掉末尾的 e。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "中等", keepChoice: true },
  { q: "We dislike ___ irrelevant details.", options: ["to repeating", "repeating", "repeats", "repeat"], answer: 1, explain: "Dislike + V-ing 表示不喜欢的活动。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "中等", keepChoice: true },
  { q: "The investigators love ___ new ideas.", options: ["discussing", "discuss", "discusses", "to discussing"], answer: 0, explain: "句中的 the investigators 意思是“调查人员”。Love + V-ing 表示他们喜欢的活动。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "中等", keepChoice: true },
  { q: "They love ___ (solve) difficult problems.", options: [], answer: 0, answerText: "solving", baseWord: "solve", sentence: "They love solving difficult problems.", explain: "句中的 difficult 意思是“难的”。Solve 加 -ing 前去掉末尾的 e。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "中等", kind: "blank" },
  { q: "I like ___ Language tutorials.", options: ["listens to", "to listening", "listening to", "listen to"], answer: 2, explain: "Like + V-ing 表达一般的喜好。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "中等", keepChoice: true },
  { q: "We enjoy ___ research interviews.", options: ["watch", "watches", "to watching", "watching"], answer: 3, explain: "句中的 research 意思是“研究”。Enjoy + V-ing，所以 watch 变成 watching。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "中等", keepChoice: true },
  { q: "The students like ___ mathematics.", options: ["to practising", "practising", "practises", "practise"], answer: 1, explain: "句中 the students 的意思是“学生”，mathematics 的意思是“数学”。Like + V-ing，practise 的英式拼写是 practising。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "中等", keepChoice: true },
  { q: "She loves ___ detailed visual diagrams.", options: ["to drawing", "draws", "drawing", "draw"], answer: 2, explain: "Love + V-ing 可以表示喜欢的活动。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "中等", keepChoice: true },
  { q: "The scholars like ___ mathematics.", options: ["to practising", "practises", "practising", "practise"], answer: 2, explain: "句中 the scholars 的意思是“学者们”，mathematics 的意思是“数学”。Like + V-ing，practise 的英式拼写是 practising。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "中等", keepChoice: true },
  // ---- 困难 ----
  { q: "They enjoy ___ (swim) in the sea.", options: [], answer: 0, answerText: "swimming", baseWord: "swim", sentence: "They enjoy swimming in the sea.", explain: "Enjoy 接 V-ing，swim 加 -ing 要双写末尾辅音。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "困难", kind: "blank" },
  { q: "She hates ___ (waste) valuable time.", options: [], answer: 0, answerText: "wasting", baseWord: "waste", sentence: "She hates wasting valuable time.", explain: "Hate + V-ing 表达对一项活动的不喜欢。句中的 waste 意思是“废物”。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "困难", kind: "blank" },
  { q: "We dislike ___ irrelevant details in presentations.", options: ["repeating", "repeats", "to repeating", "repeat"], answer: 0, explain: "Dislike + V-ing 表示不喜欢的活动。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "困难", keepChoice: true },
  { q: "The team enjoys ___ with colleagues.", options: ["collaborates", "to collaborating", "collaborating", "collaborate"], answer: 2, explain: "Collaborate 加 -ing 前去掉末尾的 e。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "困难", keepChoice: true },
  { q: "The investigators love ___ (discuss) complex theories.", options: [], answer: 0, answerText: "discussing", baseWord: "discuss", sentence: "The investigators love discussing complex theories.", explain: "句中的 the investigators 意思是“调查人员”。Love + V-ing 表示他们喜欢的活动。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "困难", kind: "blank" },
  { q: "Our reviewer hates ___ incorrect citations.", options: ["find", "to finding", "finds", "finding"], answer: 3, explain: "Hate + V-ing 表达对一项活动的情感。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "困难", keepChoice: true },
  { q: "We enjoy ___ research interviews.", options: ["to watching", "watches", "watching", "watch"], answer: 2, explain: "句中的 research 意思是“研究”。Enjoy + V-ing，所以 watch 变成 watching。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "困难", keepChoice: true },
  { q: "The investigators love ___ new ideas.", options: ["discussing", "discuss", "discusses", "to discussing"], answer: 0, explain: "句中的 the investigators 意思是“调查人员”。Love + V-ing 表示他们喜欢的活动。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "困难", keepChoice: true },
  { q: "把下面这句话翻译成英语：我喜欢茶，但现在我想喝水。", options: ["I to drink water like tea, but right now I would like.", "I like tea, but right now I would like to drink water.", "I is like tea, but right now I would like to drink water.", "I like tea, but right now I would like to drink waters."], answer: 1, explain: "Like 说一般的喜好，would like 说说话当下的愿望。", difficulty: "困难", keepChoice: true },
  { q: "She loves ___ detailed visual diagrams.", options: ["drawing", "draws", "to drawing", "draw"], answer: 0, explain: "Love + V-ing 可以表示喜欢的活动。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "困难", keepChoice: true },
  { q: "They love ___ at the institute.", options: ["studying", "study", "studies", "to studying"], answer: 0, explain: "句中 the institute 的意思是“研究所”，study 的意思是“学习”。Study 加 -ing 变成 studying，放在 love 后面。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "困难", keepChoice: true },
  { q: "I like ___ Language tutorials.", options: ["to listening", "listening to", "listens to", "listen to"], answer: 1, explain: "Like + V-ing 表达一般的喜好。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "困难", keepChoice: true },
  { q: "I like ___ (write) about linguistics.", options: [], answer: 0, answerText: "writing", baseWord: "write", sentence: "I like writing about linguistics.", explain: "Write 加 -ing 前去掉末尾的 e。句中的 linguistics 意思是“语言学”。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "困难", kind: "blank" },
  { q: "I enjoy ___ new research methods.", options: ["learns", "learn", "learning", "to learning"], answer: 2, explain: "句中的 research methods 意思是“研究方法”。Enjoy 总是接 V-ing 形式，不是 to 不定式。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "困难", keepChoice: true },
  { q: "We enjoy ___ (watch) research interviews.", options: [], answer: 0, answerText: "watching", baseWord: "watch", sentence: "We enjoy watching research interviews.", explain: "句中的 research 意思是“研究”。Enjoy + V-ing，所以 watch 变成 watching。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "困难", kind: "blank" },
  { q: "I like ___ about linguistics.", options: ["writing", "write", "writes", "to writing"], answer: 0, explain: "Write 加 -ing 前去掉末尾的 e。句中的 linguistics 意思是“语言学”。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "困难", keepChoice: true },
  { q: "They love ___ difficult problems.", options: ["solving", "solves", "to solving", "solve"], answer: 0, explain: "句中的 difficult 意思是“难的”。Solve 加 -ing 前去掉末尾的 e。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "困难", keepChoice: true },
  { q: "Our editor hates ___ incorrect citations.", options: ["finds", "finding", "to finding", "find"], answer: 1, explain: "Hate + V-ing 表达对一项活动的情感。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "困难", keepChoice: true },
  { q: "We dislike ___ irrelevant details.", options: ["repeat", "to repeating", "repeating", "repeats"], answer: 2, explain: "Dislike + V-ing 表示不喜欢的活动。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "困难", keepChoice: true },
  { q: "The scholars enjoy ___ (read) linguistics textbooks.", options: [], answer: 0, answerText: "reading", baseWord: "read", sentence: "The scholars enjoy reading linguistics textbooks.", explain: "句中 the scholars 的意思是“学者们”，linguistics 的意思是“语言学”。Enjoy 在这个结构里与 V-ing 连用。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "困难", kind: "blank" },
  { q: "My brother loves ___ (play) football.", options: [], answer: 0, answerText: "playing", baseWord: "play", sentence: "My brother loves playing football.", explain: "love 后面是 V-ing 形式。句中 my brother 的意思是“我哥哥/弟弟”。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "困难", kind: "blank" },
  { q: "I like ___ (listen) to language tutorials.", options: [], answer: 0, answerText: "listening", baseWord: "listen", sentence: "I like listening to language tutorials.", explain: "Like + V-ing 表达一般的喜好。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "困难", kind: "blank" },
  { q: "He likes ___ field notes.", options: ["organise", "organises", "organised", "organising"], answer: 3, explain: "Like + V-ing 是表达喜好的结构。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "困难", keepChoice: true },
  { q: "The scholars enjoy ___ academic journals.", options: ["reads", "reading", "to read", "read"], answer: 1, explain: "句中的 the scholars 意思是“学者们”。Enjoy 在这个结构里与 V-ing 连用。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "困难", keepChoice: true },
  { q: "The analyst dislikes ___ before sunrise.", options: ["to waking up", "waking up", "wake up", "wakes up"], answer: 1, explain: "Dislike 后面可以跟 V-ing；wake 加 -ing 前去掉 e。句中的 the analyst 意思是“分析员”。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "困难", keepChoice: true },
  { q: "The team enjoys ___ (collaborate) with colleagues.", options: [], answer: 0, answerText: "collaborating", baseWord: "collaborate", sentence: "The team enjoys collaborating with colleagues.", explain: "Collaborate 加 -ing 前去掉末尾的 e。-ing 词尾表示被谈到的活动是一种喜好或不喜欢的事。", difficulty: "困难", kind: "blank" },
  { q: "They love ___ (solve) difficult problems.", options: [], answer: 0, answerText: "solving", baseWord: "solve", sentence: "They love solving difficult problems.", explain: "句中的 difficult 意思是“难的”。Solve 加 -ing 前去掉末尾的 e。喜好动词在前，后面接的是说话人正在评价的活动。", difficulty: "困难", kind: "blank" },
  { q: "She hates ___ valuable time.", options: ["to wasting", "wastes", "wasting", "waste"], answer: 2, explain: "Hate + V-ing 表达对一项活动的不喜欢。句中的 waste 意思是“废物”。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "困难", keepChoice: true },
  { q: "The scholars like ___ mathematics.", options: ["to practising", "practises", "practising", "practise"], answer: 2, explain: "句中 the scholars 的意思是“学者们”，mathematics 的意思是“数学”。Like + V-ing，practise 的英式拼写是 practising。句中的 V-ing 不表示进行时，而是说出被喜欢或不被喜欢的活动的名称。", difficulty: "困难", keepChoice: true },
  { q: "把下面这句话翻译成英语：你和我们一起吃午饭好吗？", options: ["Would you to like to join us for lunch?", "Would you liking to join us for lunch?", "Would you like to join us for lunch?", "You Would like to join us for lunch?"], answer: 2, explain: "Would like 是邀请说法，后面必须跟带 to 的动词原形。", difficulty: "困难", keepChoice: true },
];

// ---------------- 原站 A1 第 14 课测验原题（经作者授权翻译，本轮提取） ----------------
// 简单 20 题、中等 30 题（21 道选择 + 9 道填空）、困难 30 题（19 道选择 + 11 道
// 填空）全收，无待补。题干、选项、答案、解析全部来自原站提取；答案一律按答案
// 文字定位（提取报告里的字母按九宫格位置标，与选项顺序对不上）。跨档重复的题
// 是原站本身复用，照原样保留、不去重。填空题括号里的提示词按原样保留（中等
// 第 3 题、困难第 9 题的提示词是 (not work)，答案是 working）。
const A1_L14_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "选择翻译最准确的选项：他们现在正在等公交车。", options: ["They are waiting for the bus right now.", "They waiting for the bus right now.", "They are wait for the bus right now.", "They is waiting for the bus right now."], answer: 0, explain: "are 和 waiting 两个成分都齐全；缺了 are 句子语法就错了。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["You are listening to me?", "Do you listening to me?", "Are you listen to me?", "Are you listening to me?"], answer: 3, explain: "把 to be 倒装到主语前面，保持 V-ing 形式。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "简单", keepChoice: true },
  { q: "The editor ___ the manuscript at the moment.", options: ["is check", "are checking", "is checking", "checks"], answer: 2, explain: "句中 the manuscript 的意思是“稿件”，at the moment 的意思是“此时此刻”。Editor 是单数，现在进行时是 is checking。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["I want a new phone.", "I want a phone new.", "I is want a new phone.", "I am wanting a new phone."], answer: 0, explain: "Want 表示状态，所以用一般现在时。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "简单", keepChoice: true },
  { q: "They ___ the bibliography at present.", options: ["are revise", "are revising", "is revising", "revise"], answer: 1, explain: "句中的 the bibliography 意思是“参考书目”。They 用 are + V-ing，revise 加 -ing 前去掉 e。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "简单", keepChoice: true },
  { q: "选择不用于进行时的动词。", options: ["run", "cook", "know", "write"], answer: 2, explain: "Know 是状态动词，所以不用于进行时。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["I am read now.", "I am reading now.", "I reading now.", "I read now."], answer: 1, explain: "现在进行时需要 to be 和 V-ing 都齐全。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。The database ___ normally today.", options: ["are not working", "is not working", "is not work", "does not working"], answer: 1, explain: "Database 是单数；现在进行时的否定句用 is not + working。句中 the database 的意思是“数据库”，today 的意思是“今天”。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：此时他不在学习，他正在吃午饭。", options: ["He is not studying at the moment; he is having lunch.", "He are not studying at the moment; he is having lunch.", "He is not studying at the moment; he is hav lunch.", "He not studying at the moment; he is having lunch."], answer: 0, explain: "Not 放在 to be 和 V-ing 之间；have 在“吃”的意思时可以用进行时。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。She ___ with her aunt this month.", options: ["are staying", "stays", "is staying", "stay"], answer: 2, explain: "This month 指一个暂时的阶段，所以用现在进行时。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。He usually ___ at home, but today he ___ in the library.", options: ["study / is study", "studies / studies", "is studying / studies", "studies / is studying"], answer: 3, explain: "Usually 表示习惯，所以用一般现在时；today 表示正在发生的事，所以用现在进行时。句中 in the library 的意思是“在图书馆”，usually 的意思是“通常”。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：你正在听我说话吗？", options: ["Is you listening to me?", "Are you listening to I?", "Are you listening to me?", "You Are listening to me?"], answer: 2, explain: "问句把 to be 倒装到主语前面，主要动词保持 V-ing 形式。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。The students ___ their presentation now.", options: ["are preparing", "prepare", "are prepare", "is preparing"], answer: 0, explain: "句中的 the students 意思是“学生”。Students 是复数，所以用 are preparing。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。The technician ___ the instrument now.", options: ["repairs", "are repairing", "is repair", "is repairing"], answer: 3, explain: "Technician 是单数，所以用 is repairing。句中的 instrument 意思是“测量仪器”。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：这周我住在爷爷奶奶家。", options: ["I am stay with my grandparents this week.", "I are staying with my grandparents this week.", "I am staying with my grandparent this week.", "I am staying with my grandparents this week."], answer: 3, explain: "这件事只在当前阶段发生，不是日常习惯。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "简单", keepChoice: true },
  { q: "I ___ the article right now.", options: ["am reading", "is reading", "am read", "reads"], answer: 0, explain: "I 用 am + reading。句中 the article 的意思是“文章”，right now 的意思是“现在”。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "简单", keepChoice: true },
  { q: "My parents ___ watching the news.", options: ["are", "am", "be", "is"], answer: 0, explain: "My parents 是复数主语，所以用 are。句中的 my parents 意思是“我父母”。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "简单", keepChoice: true },
  { q: "The sensors ___ data now.", options: ["are collect", "are collecting", "collect", "is collecting"], answer: 1, explain: "句中的 sensors 意思是“传感器”。Sensors 是复数，所以用 are + collecting。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["They are waiting for the bus.", "They is waiting for the bus.", "They for the bus are waiting.", "They waiting for the bus."], answer: 0, explain: "缺了 to be，句子就不完整。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "简单", keepChoice: true },
  { q: "The researchers ___ the results now.", options: ["are analyse", "are analysing", "analyse", "is analysing"], answer: 1, explain: "在现在进行时里，用 are + V-ing，researchers 是复数。句中 the researchers 的意思是“研究者们”，the results 的意思是“结果”。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "简单", keepChoice: true },
  // ---- 中等 ----
  { q: "We ___ a new hypothesis this week.", options: ["test", "are testing", "are test", "is testing"], answer: 1, explain: "句中的 hypothesis 意思是“假设”。We 在现在进行时里用 are。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "中等", keepChoice: true },
  { q: "The students ___ their presentation now.", options: ["prepare", "is preparing", "are prepare", "are preparing"], answer: 3, explain: "句中的 the students 意思是“学生”。Students 是复数，所以用 are preparing。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "中等", keepChoice: true },
  { q: "The database is not ___ (not work) normally today.", options: [], answer: 0, answerText: "working", baseWord: "not work", sentence: "The database is not working normally today.", explain: "句中 the database 的意思是“数据库”，today 的意思是“今天”。Database 是单数；现在进行时的否定句用 is not + working。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "中等", kind: "blank" },
  { q: "The lecturer ___ about climate change now.", options: ["is speak", "is speaking", "are speaking", "speaks"], answer: 1, explain: "Lecturer 是单数，所以用 is speaking。句中的 lecturer 意思是“讲师”。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "中等", keepChoice: true },
  { q: "The technician is ___ (repair) the instrument now.", options: [], answer: 0, answerText: "repairing", baseWord: "repair", sentence: "The technician is repairing the instrument now.", explain: "句中的 instrument 意思是“测量仪器”。Technician 是单数，所以用 is repairing。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "中等", kind: "blank" },
  { q: "The software ___ a patch now.", options: ["is install", "is installing", "are installing", "installs"], answer: 1, explain: "句中的 the software 意思是“软件”。Software 不可数，所以用 is installing。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "中等", keepChoice: true },
  { q: "The investigators ___ the findings now.", options: ["are analyse", "is analysing", "analyse", "are analysing"], answer: 3, explain: "在现在进行时里，用 are + V-ing，investigators 是复数。句中 the investigators 的意思是“调查人员”，the findings 的意思是“研究发现”。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "中等", keepChoice: true },
  { q: "We ___ the experiment this afternoon.", options: ["conduct", "are conducting", "is conducting", "are conduct"], answer: 1, explain: "句中的 the experiment 意思是“实验”。We 用 are + V-ing；this afternoon 说明活动在当天进行。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "中等", keepChoice: true },
  { q: "They ___ the reference list at present.", options: ["are revising", "revise", "are revise", "is revising"], answer: 0, explain: "They 用 are + V-ing，revise 加 -ing 前去掉 e。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "中等", keepChoice: true },
  { q: "She ___ a visual summary at the moment.", options: ["designs", "is designing", "is design", "are designing"], answer: 1, explain: "句中 at the moment 的意思是“此时此刻”，summary 的意思是“摘要”。She 用 is + V-ing。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "中等", keepChoice: true },
  { q: "The professor is ___ (explain) the diagram now.", options: [], answer: 0, answerText: "explaining", baseWord: "explain", sentence: "The professor is explaining the diagram now.", explain: "句中 the professor 的意思是“教授”，the diagram 的意思是“图表”。Professor 是单数，所以用 is explaining。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "中等", kind: "blank" },
  { q: "We are ___ (conduct) the experiment this afternoon.", options: [], answer: 0, answerText: "conducting", baseWord: "conduct", sentence: "We are conducting the experiment this afternoon.", explain: "We 用 are + V-ing；this afternoon 说明活动在当天进行。句中的 the experiment 意思是“实验”。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "中等", kind: "blank" },
  { q: "We are ___ (cook) dinner at the moment.", options: [], answer: 0, answerText: "cooking", baseWord: "cook", sentence: "We are cooking dinner at the moment.", explain: "句中的 at the moment 意思是“此时此刻”。主语 we 用 are，主要动词用 V-ing 形式。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "中等", kind: "blank" },
  { q: "The cat is ___ (sit) on the windowsill.", options: [], answer: 0, answerText: "sitting", baseWord: "sit", sentence: "The cat is sitting on the windowsill.", explain: "单音节动词以元音 + 辅音结尾时，双写末尾辅音。句中 the windowsill 的意思是“窗台”，the cat 的意思是“猫”。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "中等", kind: "blank" },
  { q: "She ___ a scientific poster at the moment.", options: ["designs", "is designing", "are designing", "is design"], answer: 1, explain: "She 用 is + V-ing。句中的 at the moment 意思是“此时此刻”。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "中等", keepChoice: true },
  { q: "The professor ___ the chart now.", options: ["are explaining", "is explaining", "explains", "is explain"], answer: 1, explain: "Professor 是单数，所以用 is explaining。句中 the professor 的意思是“教授”，the chart 的意思是“图表”。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "中等", keepChoice: true },
  { q: "Look outside — it is ___ (rain) heavily.", options: [], answer: 0, answerText: "raining", baseWord: "rain", sentence: "Look outside — it is raining heavily.", explain: "It 用 is，主要动词加 -ing。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "中等", kind: "blank" },
  { q: "The laboratory assistants ___ the samples now.", options: ["is labelling", "label", "are label", "are labelling"], answer: 3, explain: "句中 the laboratory 的意思是“实验室”，samples 的意思是“样品”。Assistants 是复数名词，所以用 are labelling。labelling 是英式拼写中常见的形式。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "中等", keepChoice: true },
  { q: "The mentor ___ about climate change now.", options: ["are speaking", "is speaking", "is speak", "speaks"], answer: 1, explain: "Mentor 是单数主语，所以在现在进行时里用 is speaking。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "中等", keepChoice: true },
  { q: "The software ___ a new update now.", options: ["is install", "installs", "are installing", "is installing"], answer: 3, explain: "Software 不可数，所以用 is installing。句中的 the software 意思是“软件”。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "中等", keepChoice: true },
  { q: "The devices ___ data now.", options: ["is collecting", "are collect", "collect", "are collecting"], answer: 3, explain: "Devices 是复数主语；动作正在发生，所以用 are collecting。句中的 data 意思是“数据”。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "中等", keepChoice: true },
  { q: "The technician ___ the instrument now.", options: ["is repairing", "is repair", "are repairing", "repairs"], answer: 0, explain: "Technician 是单数，所以用 is repairing。句中的 instrument 意思是“测量仪器”。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "中等", keepChoice: true },
  { q: "The database ___ normally today.", options: ["are not working", "is not working", "does not working", "is not work"], answer: 1, explain: "Database 是单数；现在进行时的否定句用 is not + working。句中 the database 的意思是“数据库”，today 的意思是“今天”。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "中等", keepChoice: true },
  { q: "You ___ the data right now.", options: ["review", "are reviewing", "is reviewing", "are review"], answer: 1, explain: "句中 right now 的意思是“现在”，the data 的意思是“数据”。You 用 are + V-ing。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "中等", keepChoice: true },
  { q: "We ___ a new model this week.", options: ["are test", "test", "are testing", "is testing"], answer: 2, explain: "We 在现在进行时里用 are。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "中等", keepChoice: true },
  { q: "They ___ the bibliography at present.", options: ["revise", "are revising", "is revising", "are revise"], answer: 1, explain: "句中的 the bibliography 意思是“参考书目”。They 用 are + V-ing，revise 加 -ing 前去掉 e。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "中等", keepChoice: true },
  { q: "The scholars are ___ (prepare) their presentation now.", options: [], answer: 0, answerText: "preparing", baseWord: "prepare", sentence: "The scholars are preparing their presentation now.", explain: "scholars 是复数，所以用 are preparing。句中的 the scholars 意思是“学者们”。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "中等", kind: "blank" },
  { q: "The reviewer ___ the manuscript at the moment.", options: ["are checking", "is check", "checks", "is checking"], answer: 3, explain: "reviewer 是单数，现在进行时是 is checking。句中 the manuscript 的意思是“稿件”，at the moment 的意思是“此时此刻”。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "中等", keepChoice: true },
  { q: "You are ___ (review) the data right now.", options: [], answer: 0, answerText: "reviewing", baseWord: "review", sentence: "You are reviewing the data right now.", explain: "You 用 are + V-ing。句中 right now 的意思是“现在”，the data 的意思是“数据”。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "中等", kind: "blank" },
  { q: "I ___ the chapter right now.", options: ["am reading", "reads", "is reading", "am read"], answer: 0, explain: "句中的 right now 意思是“现在”。I 用 am + reading。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "中等", keepChoice: true },
  // ---- 困难 ----
  { q: "The research assistants are ___ (label) the samples now.", options: [], answer: 0, answerText: "labelling", baseWord: "label", sentence: "The research assistants are labelling the samples now.", explain: "Assistants 是复数名词，所以用 are labelling。labelling 是英式拼写中常见的形式。句中 research 的意思是“研究”，samples 的意思是“样品”。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "困难", kind: "blank" },
  { q: "把下面这句话翻译成英语：天气一天比一天冷。", options: ["The weather is getting colder every day.", "The weather it is getting colder every day.", "The weather are getting colder every day.", "The weathers is getting colder every day."], answer: 0, explain: "Get 表示逐渐变化，所以很常用进行时。", difficulty: "困难", keepChoice: true },
  { q: "The software ___ a new update now.", options: ["are installing", "installs", "is install", "is installing"], answer: 3, explain: "Software 不可数，所以用 is installing。句中的 the software 意思是“软件”。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "困难", keepChoice: true },
  { q: "The lecturer ___ about climate change now.", options: ["speaks", "is speaking", "is speak", "are speaking"], answer: 1, explain: "Lecturer 是单数，所以用 is speaking。句中的 lecturer 意思是“讲师”。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "困难", keepChoice: true },
  { q: "把下面这句话翻译成英语：今晚六点，我们见 Hoa。", options: ["We are meeting Hoa at six o'clock tonight.", "We meeting Hoa at six o'clock tonight.", "We is meeting Hoa at six o'clock tonight.", "We are meet Hoa at six o'clock tonight."], answer: 0, explain: "计划已经确定了时间和参与人，所以现在进行时表示近期的将来。", difficulty: "困难", keepChoice: true },
  { q: "The professor ___ the chart now.", options: ["explains", "is explain", "is explaining", "are explaining"], answer: 2, explain: "Professor 是单数，所以用 is explaining。句中 the professor 的意思是“教授”，the chart 的意思是“图表”。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "困难", keepChoice: true },
  { q: "Look outside — it is ___ (rain) heavily.", options: [], answer: 0, answerText: "raining", baseWord: "rain", sentence: "Look outside — it is raining heavily.", explain: "It 用 is，主要动词加 -ing。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "困难", kind: "blank" },
  { q: "The devices ___ data now.", options: ["is collecting", "are collect", "collect", "are collecting"], answer: 3, explain: "Devices 是复数主语；动作正在发生，所以用 are collecting。句中的 data 意思是“数据”。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "困难", keepChoice: true },
  { q: "The database is not ___ (not work) normally today.", options: [], answer: 0, answerText: "working", baseWord: "not work", sentence: "The database is not working normally today.", explain: "句中 the database 的意思是“数据库”，today 的意思是“今天”。Database 是单数；现在进行时的否定句用 is not + working。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "困难", kind: "blank" },
  { q: "The technician is ___ (repair) the instrument now.", options: [], answer: 0, answerText: "repairing", baseWord: "repair", sentence: "The technician is repairing the instrument now.", explain: "句中的 instrument 意思是“测量仪器”。Technician 是单数，所以用 is repairing。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "困难", kind: "blank" },
  { q: "You are ___ (review) the data right now.", options: [], answer: 0, answerText: "reviewing", baseWord: "review", sentence: "You are reviewing the data right now.", explain: "You 用 are + V-ing。句中 right now 的意思是“现在”，the data 的意思是“数据”。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "困难", kind: "blank" },
  { q: "We are ___ (cook) dinner at the moment.", options: [], answer: 0, answerText: "cooking", baseWord: "cook", sentence: "We are cooking dinner at the moment.", explain: "句中的 at the moment 意思是“此时此刻”。主语 we 用 are，主要动词用 V-ing 形式。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "困难", kind: "blank" },
  { q: "We ___ the experiment this afternoon.", options: ["conduct", "are conducting", "are conduct", "is conducting"], answer: 1, explain: "句中的 the experiment 意思是“实验”。We 用 are + V-ing；this afternoon 说明活动在当天进行。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "困难", keepChoice: true },
  { q: "We ___ a new model this week.", options: ["are testing", "test", "is testing", "are test"], answer: 0, explain: "We 在现在进行时里用 are。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "困难", keepChoice: true },
  { q: "The software ___ a patch now.", options: ["is install", "is installing", "are installing", "installs"], answer: 1, explain: "句中的 the software 意思是“软件”。Software 不可数，所以用 is installing。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "困难", keepChoice: true },
  { q: "She ___ a visual summary at the moment.", options: ["designs", "is designing", "are designing", "is design"], answer: 1, explain: "句中 at the moment 的意思是“此时此刻”，summary 的意思是“摘要”。She 用 is + V-ing。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "困难", keepChoice: true },
  { q: "The reviewer ___ the manuscript at the moment.", options: ["checks", "is checking", "are checking", "is check"], answer: 1, explain: "reviewer 是单数，现在进行时是 is checking。句中 the manuscript 的意思是“稿件”，at the moment 的意思是“此时此刻”。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "困难", keepChoice: true },
  { q: "We ___ a new hypothesis this week.", options: ["are test", "is testing", "test", "are testing"], answer: 3, explain: "句中的 hypothesis 意思是“假设”。We 在现在进行时里用 are。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "困难", keepChoice: true },
  { q: "The mentor ___ about climate change now.", options: ["speaks", "are speaking", "is speak", "is speaking"], answer: 3, explain: "Mentor 是单数主语，所以在现在进行时里用 is speaking。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "困难", keepChoice: true },
  { q: "The investigators are ___ (analyse) the findings now.", options: [], answer: 0, answerText: "analysing", baseWord: "analyse", sentence: "The investigators are analysing the findings now.", explain: "句中 the investigators 的意思是“调查人员”，the findings 的意思是“研究发现”。在现在进行时里，用 are + V-ing，investigators 是复数。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "困难", kind: "blank" },
  { q: "You ___ the data right now.", options: ["are reviewing", "review", "is reviewing", "are review"], answer: 0, explain: "句中 right now 的意思是“现在”，the data 的意思是“数据”。You 用 are + V-ing。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "困难", keepChoice: true },
  { q: "They ___ the reference list at present.", options: ["is revising", "are revising", "are revise", "revise"], answer: 1, explain: "They 用 are + V-ing，revise 加 -ing 前去掉 e。需要结合时间标志和主语形式，才能构成正确的表示正在进行的动作的动词短语。", difficulty: "困难", keepChoice: true },
  { q: "The scholars are ___ (prepare) their presentation now.", options: [], answer: 0, answerText: "preparing", baseWord: "prepare", sentence: "The scholars are preparing their presentation now.", explain: "scholars 是复数，所以用 are preparing。句中的 the scholars 意思是“学者们”。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "困难", kind: "blank" },
  { q: "We are ___ (conduct) the experiment this afternoon.", options: [], answer: 0, answerText: "conducting", baseWord: "conduct", sentence: "We are conducting the experiment this afternoon.", explain: "We 用 are + V-ing；this afternoon 说明活动在当天进行。句中的 the experiment 意思是“实验”。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "困难", kind: "blank" },
  { q: "The laboratory assistants ___ the samples now.", options: ["label", "are labelling", "are label", "is labelling"], answer: 1, explain: "句中 the laboratory 的意思是“实验室”，samples 的意思是“样品”。Assistants 是复数名词，所以用 are labelling。labelling 是英式拼写中常见的形式。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "困难", keepChoice: true },
  { q: "I ___ the chapter right now.", options: ["am reading", "reads", "is reading", "am read"], answer: 0, explain: "句中的 right now 意思是“现在”。I 用 am + reading。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "困难", keepChoice: true },
  { q: "She ___ a scientific poster at the moment.", options: ["is design", "is designing", "designs", "are designing"], answer: 1, explain: "She 用 is + V-ing。句中的 at the moment 意思是“此时此刻”。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "困难", keepChoice: true },
  { q: "The professor is ___ (explain) the diagram now.", options: [], answer: 0, answerText: "explaining", baseWord: "explain", sentence: "The professor is explaining the diagram now.", explain: "句中 the professor 的意思是“教授”，the diagram 的意思是“图表”。Professor 是单数，所以用 is explaining。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "困难", kind: "blank" },
  { q: "The cat is ___ (sit) on the windowsill.", options: [], answer: 0, answerText: "sitting", baseWord: "sit", sentence: "The cat is sitting on the windowsill.", explain: "单音节动词以元音 + 辅音结尾时，双写末尾辅音。句中 the windowsill 的意思是“窗台”，the cat 的意思是“猫”。在现在进行时里，be 的形式取决于主语，主要动词带 -ing 词尾。", difficulty: "困难", kind: "blank" },
  { q: "The investigators ___ the findings now.", options: ["are analysing", "analyse", "are analyse", "is analysing"], answer: 0, explain: "在现在进行时里，用 are + V-ing，investigators 是复数。句中 the investigators 的意思是“调查人员”，the findings 的意思是“研究发现”。像 now 和 at the moment 这样的时间词有助于确定动作正在发生。", difficulty: "困难", keepChoice: true },
];

// ---------------- 原站 A1 第 15 课测验原题（经作者授权翻译，本轮提取） ----------------
// 简单 20 题（16 道普通选择 + 4 道排词）、中等 30 题（全排词）、困难 27 题
// （全排词）全收，无待补。题干、选项、答案、解析全部来自原站提取；答案一律
// 按答案文字定位（提取报告里的字母按九宫格位置标，与选项顺序对不上）。跨档
// 重复的题是原站本身复用，照原样保留、不去重。排词题是原站的一种题型，
// 站内没有拖拽交互，按选择题呈现：题干写「把下列词排成正确的句子：词 / 词 / .」，
// 四个选项是四句完整句子。个别解析与题干措辞有出入（中等第 9、20 题，困难
// 第 2、17、24 题：解析里写 new approach / team / new，题干用的是 a novel
// method / the group / recent），按原站解析原样翻译，不自行“纠正”，已在对应
// 解析里注明。
const A1_L15_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "选择正确的选项。", options: ["She often reads books at night in bed does.", "She often reads books in bed at night.", "She reads often books in bed at night.", "She often reads in bed books at night."], answer: 1, explain: "句中 at night 的意思是“在夜里”，often 的意思是“经常”。频率在动词前面，宾语紧跟在动词后面，然后是地点和时间。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：每晚我在家学英语。", options: ["Every evening, I study English on home.", "Every evening, I study English in home.", "Every evening, Me study English at home.", "Every evening, I study English at home."], answer: 3, explain: "时间状语可以放到句首，后面跟逗号。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "简单", keepChoice: true },
  { q: "选择频率状语的正确位置。", options: ["Usually he does his homework usually here.", "He does usually his homework here.", "He usually does his homework here.", "He does his homework usually here does."], answer: 2, explain: "频率状语放在普通动词前面。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["I at the counter bought a ticket, and then outside I waited the bus for.", "I bought a ticket at the counter, and then I for the bus waited outside.", "I bought a ticket at the counter, and then I waited for the bus outside.", "I bought at the counter a ticket, and then I waited outside for the bus."], answer: 2, explain: "两个分句都保持动词紧跟宾语，地点状语在句末。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["She gave a dictionary to her brother.", "She to her brother gave a dictionary.", "She gave a dictionary her brother to.", "She gave to her brother a dictionary."], answer: 0, explain: "有介词 to 时，物在前，人在后。句中 dictionary 的意思是“词典”，brother 的意思是“哥哥/弟弟”。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["I study English at home every evening.", "I study at home English every evening.", "English I study at home every evening.", "I study every evening English at home."], answer: 0, explain: "动词和宾语连在一起，然后是地点和时间。句中 every evening 的意思是“每晚”，study 的意思是“学习”。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：她给了我一本新词典。", options: ["She gave me a dictionary new.", "She me gave a new dictionary.", "She gave me a new dictionary.", "She gave a new dictionary me."], answer: 2, explain: "人 me 在物 a new dictionary 前面。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["Where do you study English?", "Where English do you study at?", "Where do study you English?", "Where you study English?"], answer: 0, explain: "句中的 study 意思是“学习”。疑问词、助动词、主语，然后是动词和宾语。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "简单", keepChoice: true },
  { q: "把下列词排成正确的句子：the editor / works / efficiently / .", options: ["The editor efficiently works is.", "Works the editor efficiently.", "The editor works efficient.", "The editor works efficiently."], answer: 3, explain: "S + V + 方式状语。句中 efficiently 的意思是“高效地”，the editor 的意思是“编辑”。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "简单", keepChoice: true },
  { q: "把下列词排成正确的句子：online / the professor / teaches / .", options: ["The professor teaches online.", "The professor online teaches.", "Teaches the professor online.", "The teaches professor online."], answer: 0, explain: "语序是 S + V + 地点/方式状语。句中 the professor 的意思是“教授”，online 的意思是“在线”。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：他放学后经常在图书馆做作业。", options: ["He usually do his homework in the library after school.", "He usually does his homework in the library after school.", "He after school usually does his homework in the library.", "He usually it does his homework in the library after school."], answer: 1, explain: "频率状语 usually 在动词前面，地点和时间仍在句末。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "简单", keepChoice: true },
  { q: "把下列词排成正确的句子：the lesson / is / interesting / .", options: ["Is the lesson interesting.", "The lesson is interesting.", "The lesson interesting is.", "Interesting the lesson is."], answer: 1, explain: "陈述句的语序是 S + be + 形容词。句中的 interesting 意思是“有趣的”。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "简单", keepChoice: true },
  { q: "把下列词排成正确的句子：the researcher / a question / asks / .", options: ["A question the researcher asks is.", "The researcher asks a question.", "Asks the researcher a question.", "The researcher a question asks."], answer: 1, explain: "句中的 the researcher 意思是“研究者”。动词 asks 在主语后面、宾语前面。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "简单", keepChoice: true },
  { q: "选择两类状语的正确顺序。", options: ["He at the airport arrived yesterday.", "He arrived at the airport yesterday.", "Yesterday he at the airport arrived.", "He arrived yesterday at the airport."], answer: 1, explain: "地点在时间前面。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：她给了弟弟一本新词典。", options: ["She to her younger brother gave a new dictionary.", "She gave a new dictionary to her younger brother.", "She gave a dictionary new to her younger brother.", "She gave a new dictionary to she younger brother."], answer: 1, explain: "有介词 to 时，顺序变成物在前、人在后。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["She gave me a dictionary new.", "She gave me a new dictionary.", "She gave to me a new dictionary.", "She gave a new dictionary me."], answer: 1, explain: "人紧跟在动词后面时不用介词 to。句中的 dictionary 意思是“词典”。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：我每晚在家学英语。", options: ["I is study English at home every evening.", "I studying English at home every evening.", "I study English at home every evening.", "I at home every evening study English."], answer: 2, explain: "Study 和 English 连在一起，然后是地点 at home 和时间 every evening。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：我们昨天在车站遇见 Nam。", options: ["We met Nam at the station yesterday.", "We did met Nam at the station yesterday.", "We at the station yesterday met Nam.", "We met at the station Nam yesterday."], answer: 0, explain: "如果换成 yesterday at the station，在标准英语里听起来不自然。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["I like very much this song.", "I like this song very much.", "I liking this song very much.", "I is like this song very much."], answer: 1, explain: "不要把 very much 插进动词和宾语之间。句中的 much 意思是“很”。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "简单", keepChoice: true },
  { q: "选择语序最自然的句子。", options: ["Very well my sister the piano plays.", "My sister plays the piano very well.", "My sister plays very well the piano.", "My sister the piano plays very well."], answer: 1, explain: "方式状语在宾语后面，不要插进去。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "简单", keepChoice: true },
  // ---- 中等（全排词） ----
  { q: "把下列词排成正确的句子：the scientist / the results / checks / twice / .", options: ["Checks the scientist the results twice.", "The scientist checks twice the results.", "The scientist the results checks twice.", "The scientist checks the results twice."], answer: 3, explain: "句中 the results 的意思是“结果”，twice 的意思是“两次”。通常的顺序是 S + V + O + 状语。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the analyst / carefully / the manuscript / reads / .", options: ["The analyst reads carefully manuscript the.", "The analyst carefully the manuscript reads.", "The analyst reads the manuscript carefully.", "Reads the analyst the manuscript carefully."], answer: 2, explain: "基本语序是 S + V + O + 方式状语。句中 the manuscript 的意思是“稿件”，the analyst 的意思是“分析员”。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：a new approach / the article / describes / .", options: ["The article a new approach describes.", "Describes the article a new approach.", "The article describes a new approach.", "The article describes new a approach."], answer: 2, explain: "S + V + O 结构，名词短语是 new approach。句中的 the article 意思是“文章”。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the report / on the desk / is / .", options: ["The report on the desk is.", "The report is on the desk.", "On the desk the report is.", "The report on is the desk."], answer: 1, explain: "句中 on the desk 的意思是“在桌子上”，the report 的意思是“报告”。主语 + be + 位置短语的结构。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the lesson / is / interesting / .", options: ["Interesting the lesson is.", "Is the lesson interesting.", "The lesson interesting is.", "The lesson is interesting."], answer: 3, explain: "陈述句的语序是 S + be + 形容词。句中的 interesting 意思是“有趣的”。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the summary / on the desk / is / .", options: ["The summary on the desk is.", "On the desk the summary is.", "The summary is on the desk.", "The summary on is the desk."], answer: 2, explain: "句中 the summary 的意思是“摘要”，on the desk 的意思是“在桌子上”。主语 + be + 位置短语的结构。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the scholars / the data / examine / carefully / .", options: ["The scholars examine the data carefully.", "The scholars the data examine carefully.", "Examine the scholars the data carefully.", "The scholars examine carefully the data."], answer: 0, explain: "句中 the scholars 的意思是“学者们”，carefully 的意思是“仔细地”。动词 examine 除了宾语 the data，状语通常在宾语后面。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the analyst / the findings / checks / twice / .", options: ["The findings the analyst checks twice.", "The analyst the findings twice checks.", "The analyst checks twice the findings.", "The analyst checks the findings twice."], answer: 3, explain: "句中 the findings 的意思是“研究发现”，the analyst 的意思是“分析员”。通常的顺序是 S + V + O + 状语。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：a novel method / the article / describes / .", options: ["The article a novel method describes.", "The article describes a novel method.", "The article is describes a novel method.", "Describes the article a novel method."], answer: 1, explain: "S + V + O 结构，名词短语是 new approach（按原站解析原样翻译，原站这里写的是 new approach）。句中的 the article 意思是“文章”。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：carefully / the analyst / writes / the summary / .", options: ["The analyst writes the summary carefully.", "The analyst writes carefully the summary.", "Writes the analyst the summary carefully.", "The analyst the summary writes carefully."], answer: 0, explain: "基本语序是主语 + 动词 + 宾语 + 状语。句中 the analyst 的意思是“分析员”，the summary 的意思是“摘要”。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：remotely / the instructor / teaches / .", options: ["The teaches professor remotely.", "Teaches the instructor remotely.", "The instructor teaches remotely.", "The instructor remotely teaches."], answer: 2, explain: "语序是 S + V + 地点/方式状语。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the samples / in the cabinet / are / .", options: ["The samples in are the cabinet.", "The samples in the cabinet are.", "The samples are in the cabinet.", "Are the samples in the cabinet."], answer: 2, explain: "陈述句语序是 S + be + 介词短语。句中的 samples 意思是“样品”。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：online / the professor / teaches / .", options: ["The professor teaches online.", "Teaches the professor online.", "The professor online teaches.", "The teaches professor online."], answer: 0, explain: "语序是 S + V + 地点/方式状语。句中 the professor 的意思是“教授”，online 的意思是“在线”。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the editor / works / efficiently / .", options: ["Works the editor efficiently.", "The editor efficiently works is.", "The editor works efficiently.", "The editor works efficient."], answer: 2, explain: "S + V + 方式状语。句中 efficiently 的意思是“高效地”，the editor 的意思是“编辑”。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the students / in the library / are / .", options: ["Are the students in the library.", "The students are in the library.", "In the library the students are.", "The students in the library are."], answer: 1, explain: "句中 in the library 的意思是“在图书馆”，the students 的意思是“学生”。陈述句是 S + be + 介词短语。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the scholar / a question / asks / .", options: ["A question the scholar asks is.", "Asks the scholar a question.", "The scholar a question asks.", "The scholar asks a question."], answer: 3, explain: "动词 asks 在主语后面、宾语前面。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the journal / new research / publishes / .", options: ["Publishes the journal new research.", "The journal new research publishes.", "The journal publishes research new.", "The journal publishes new research."], answer: 3, explain: "句中 the journal 的意思是“学术期刊”，research 的意思是“研究”。结构是 S + V + O，形容词 new 在名词前面。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the procedure / is / interesting / .", options: ["The is procedure interesting.", "The procedure is interesting.", "The procedure interesting is.", "Is interesting the procedure."], answer: 1, explain: "陈述句的语序是 S + be + 形容词。句中 the procedure 的意思是“流程”，interesting 的意思是“有趣的”。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the scientist / carefully / the document / reads / .", options: ["Reads the scientist the document carefully.", "The scientist reads carefully document the.", "The scientist carefully the document reads.", "The scientist reads the document carefully."], answer: 3, explain: "基本语序是 S + V + O + 方式状语。句中 the document 的意思是“文件”，carefully 的意思是“仔细地”。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：a reliable model / the group / uses / .", options: ["Uses the group a reliable model.", "The group a reliable model uses.", "The group uses a reliable model.", "The group uses reliable a model."], answer: 2, explain: "句中的 reliable 意思是“可靠的”。主语 team 是单数（按原站解析原样翻译，原站这里写的是 team）；动词 uses 跟在主语后面，宾语在最后。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the laboratory / this morning / is / quiet / .", options: ["The laboratory is this morning quiet.", "The laboratory is quiet this morning.", "The laboratory quiet is this morning.", "Quiet the laboratory is this morning."], answer: 1, explain: "句中的 the laboratory 意思是“实验室”。Be 在形容词补语前面；时间通常在最后。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the researcher / a question / asks / .", options: ["Asks the researcher a question.", "A question the researcher asks is.", "The researcher a question asks.", "The researcher asks a question."], answer: 3, explain: "句中的 the researcher 意思是“研究者”。动词 asks 在主语后面、宾语前面。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the scholars / every day / practise / English / .", options: ["The scholars practise every day English.", "The scholars practise English every day.", "Practise the scholars English every day.", "The scholars English practise every day."], answer: 1, explain: "通常的顺序是 S + V + O + 时间状语。句中的 the scholars 意思是“学者们”。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the specimens / in the cabinet / are / .", options: ["Are the specimens in the cabinet.", "The specimens in the cabinet are.", "The specimens are in the cabinet.", "The specimens in are the cabinet."], answer: 2, explain: "陈述句语序是 S + be + 介词短语。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the researchers / the data / examine / carefully / .", options: ["The researchers examine the data carefully.", "Examine the researchers the data carefully.", "The researchers examine carefully the data.", "The researchers the data examine carefully."], answer: 0, explain: "句中 the researchers 的意思是“研究者们”，carefully 的意思是“仔细地”。动词 examine 除了宾语 the data，状语通常在宾语后面。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the journal / recent research / publishes / .", options: ["Publishes the journal recent research.", "The journal publishes recent research.", "The journal publishes recent researches.", "The journal recent research publishes."], answer: 1, explain: "句中 the journal 的意思是“学术期刊”，research 的意思是“研究”。结构是 S + V + O，形容词 new 在名词前面（按原站解析原样翻译，原站这里写的是 new）。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the students / every day / practise / English / .", options: ["The students English practise every day.", "Practise the students English every day.", "The students practise English every day.", "The students practise every day English."], answer: 2, explain: "通常的顺序是 S + V + O + 时间状语。句中的 the students 意思是“学生”。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the reviewer / works / efficiently / .", options: ["Works the reviewer efficiently.", "The reviewer works efficiently.", "The reviewer works efficient.", "The reviewer efficiently works is."], answer: 1, explain: "S + V + 方式状语。句中 the reviewer 的意思是“审稿人”，efficiently 的意思是“高效地”。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：the institute / this morning / is / quiet / .", options: ["The institute is quiet this morning.", "The institute is this morning quiet.", "Quiet the institute is this morning.", "The institute quiet is this morning."], answer: 0, explain: "句中的 the institute 意思是“研究所”。Be 在形容词补语前面；时间通常在最后。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "中等", keepChoice: true },
  { q: "把下列词排成正确的句子：a reliable model / the team / uses / .", options: ["Uses the team a reliable model.", "The team uses reliable a model.", "The team uses a reliable model.", "The team a reliable model uses."], answer: 2, explain: "句中的 reliable 意思是“可靠的”。主语 team 是单数；动词 uses 跟在主语后面，宾语在最后。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "中等", keepChoice: true },
  // ---- 困难（全排词） ----
  { q: "把下列词排成正确的句子：a reliable model / the team / uses / .", options: ["The team uses a reliable model.", "The team uses reliable a model.", "Uses the team a reliable model.", "The team a reliable model uses."], answer: 0, explain: "句中的 reliable 意思是“可靠的”。主语 team 是单数；动词 uses 跟在主语后面，宾语在最后。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：a novel method / the article / describes / .", options: ["The article describes new a approach.", "The article describes a novel method.", "Describes the article a novel method.", "The article a novel method describes."], answer: 1, explain: "S + V + O 结构，名词短语是 new approach（按原站解析原样翻译，原站这里写的是 new approach）。句中的 the article 意思是“文章”。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the students / in the library / are / .", options: ["In the library the students are.", "The students are in the library.", "Are the students in the library.", "The students in the library are."], answer: 1, explain: "句中 in the library 的意思是“在图书馆”，the students 的意思是“学生”。陈述句是 S + be + 介词短语。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the researchers / the data / examine / carefully / .", options: ["The researchers examine the data carefully.", "The researchers examine carefully the data.", "The researchers the data examine carefully.", "Examine the researchers the data carefully."], answer: 0, explain: "句中 the researchers 的意思是“研究者们”，carefully 的意思是“仔细地”。动词 examine 除了宾语 the data，状语通常在宾语后面。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the scholar / a question / asks / .", options: ["Asks the scholar a question.", "A question the scholar asks is.", "The scholar asks a question.", "The scholar a question asks."], answer: 2, explain: "动词 asks 在主语后面、宾语前面。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the scholars / every day / practise / English / .", options: ["The scholars English practise every day.", "The scholars practise every day English.", "Practise the scholars English every day.", "The scholars practise English every day."], answer: 3, explain: "通常的顺序是 S + V + O + 时间状语。句中的 the scholars 意思是“学者们”。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the journal / new research / publishes / .", options: ["The journal publishes new research.", "The journal new research publishes.", "Publishes the journal new research.", "The journal publishes new researches."], answer: 0, explain: "句中 the journal 的意思是“学术期刊”，research 的意思是“研究”。结构是 S + V + O，形容词 new 在名词前面。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the analyst / carefully / the manuscript / reads / .", options: ["Reads the analyst the manuscript carefully.", "The analyst reads carefully manuscript the.", "The analyst reads the manuscript carefully.", "The analyst carefully the manuscript reads."], answer: 2, explain: "基本语序是 S + V + O + 方式状语。句中 the manuscript 的意思是“稿件”，the analyst 的意思是“分析员”。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the institute / this morning / is / quiet / .", options: ["The institute is quiet this morning.", "The institute quiet is this morning.", "Quiet the institute is this morning.", "The institute is this morning quiet."], answer: 0, explain: "句中的 the institute 意思是“研究所”。Be 在形容词补语前面；时间通常在最后。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the samples / in the cabinet / are / .", options: ["The samples are in the cabinet.", "The samples in the cabinet are.", "The samples in are the cabinet.", "Are the samples in the cabinet."], answer: 0, explain: "陈述句语序是 S + be + 介词短语。句中的 samples 意思是“样品”。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the students / every day / practise / English / .", options: ["Practise the students English every day.", "The students practise every day English.", "The students practise English every day.", "The students English practise every day."], answer: 2, explain: "通常的顺序是 S + V + O + 时间状语。句中的 the students 意思是“学生”。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the scientist / the results / checks / twice / .", options: ["The scientist checks twice the results.", "The scientist checks the results twice.", "The scientist the results checks twice.", "Checks the scientist the results twice."], answer: 1, explain: "句中 the results 的意思是“结果”，twice 的意思是“两次”。通常的顺序是 S + V + O + 状语。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "困难", keepChoice: true },
  { q: "选择正确的选项。把下列词排成正确的句子：the procedure / is / interesting / .", options: ["The procedure interesting is.", "The procedure is interesting.", "Is interesting the procedure.", "The is procedure interesting."], answer: 1, explain: "陈述句的语序是 S + be + 形容词。句中 the procedure 的意思是“流程”，interesting 的意思是“有趣的”。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：a new approach / the article / describes / .", options: ["The article describes a new approach.", "Describes the article a new approach.", "The article a new approach describes.", "The article is describes a new approach."], answer: 0, explain: "S + V + O 结构，名词短语是 new approach。句中的 the article 意思是“文章”。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the summary / on the desk / is / .", options: ["On the desk the summary is.", "The summary on is the desk.", "The summary on the desk is.", "The summary is on the desk."], answer: 3, explain: "句中 the summary 的意思是“摘要”，on the desk 的意思是“在桌子上”。主语 + be + 位置短语的结构。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "困难", keepChoice: true },
  { q: "选择正确的选项。把下列词排成正确的句子：the analyst / the findings / checks / twice / .", options: ["The findings the analyst checks twice.", "The analyst checks the findings twice.", "The analyst checks twice the findings.", "The analyst the findings twice checks."], answer: 1, explain: "句中 the findings 的意思是“研究发现”，the analyst 的意思是“分析员”。通常的顺序是 S + V + O + 状语。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：a reliable model / the group / uses / .", options: ["Uses the group a reliable model.", "The group a reliable model uses.", "The group uses reliable a model.", "The group uses a reliable model."], answer: 3, explain: "句中的 reliable 意思是“可靠的”。主语 team 是单数（按原站解析原样翻译，原站这里写的是 team）；动词 uses 跟在主语后面，宾语在最后。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "困难", keepChoice: true },
  { q: "选择正确的选项。把下列词排成正确的句子：carefully / the analyst / writes / the summary / .", options: ["The summary writes the analyst carefully.", "The analyst the summary writes carefully.", "The analyst writes carefully the summary.", "The analyst writes the summary carefully."], answer: 3, explain: "基本语序是主语 + 动词 + 宾语 + 状语。句中 the analyst 的意思是“分析员”，the summary 的意思是“摘要”。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "困难", keepChoice: true },
  { q: "选择正确的选项。把下列词排成正确的句子：the scholars / in the library / are / .", options: ["The scholars is in the library.", "The scholars in the library are.", "In the library the scholars is.", "The scholars are in the library."], answer: 3, explain: "句中 in the library 的意思是“在图书馆”，the scholars 的意思是“学者们”。陈述句是 S + be + 介词短语。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the specimens / in the cabinet / are / .", options: ["The specimens are in the cabinet.", "The specimens in the cabinet are.", "The specimens in are the cabinet.", "Are the specimens in the cabinet."], answer: 0, explain: "陈述句语序是 S + be + 介词短语。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the reviewer / works / efficiently / .", options: ["The reviewer works efficient.", "The reviewer works efficiently.", "The reviewer efficiently works is.", "Works the reviewer efficiently."], answer: 1, explain: "S + V + 方式状语。句中 the reviewer 的意思是“审稿人”，efficiently 的意思是“高效地”。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the scholars / the data / examine / carefully / .", options: ["The scholars the data examine carefully.", "Examine the scholars the data carefully.", "The scholars examine carefully the data.", "The scholars examine the data carefully."], answer: 3, explain: "句中 the scholars 的意思是“学者们”，carefully 的意思是“仔细地”。动词 examine 除了宾语 the data，状语通常在宾语后面。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：remotely / the instructor / teaches / .", options: ["The instructor remotely teaches.", "The instructor teaches remotely.", "Teaches the instructor remotely.", "The teaches professor remotely."], answer: 1, explain: "语序是 S + V + 地点/方式状语。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the journal / recent research / publishes / .", options: ["Publishes the journal recent research.", "The journal publishes recent research.", "The journal recent research publishes.", "The journal publishes research new."], answer: 1, explain: "句中 the journal 的意思是“学术期刊”，research 的意思是“研究”。结构是 S + V + O，形容词 new 在名词前面（按原站解析原样翻译，原站这里写的是 new）。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the scientist / carefully / the document / reads / .", options: ["The scientist reads carefully document the.", "The scientist reads the document carefully.", "The scientist carefully the document reads.", "Reads the scientist the document carefully."], answer: 1, explain: "基本语序是 S + V + O + 方式状语。句中 the document 的意思是“文件”，carefully 的意思是“仔细地”。在陈述句里，不同功能的成分要放在合适的位置，句子才容易理解。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the report / on the desk / is / .", options: ["On the desk the report is.", "The report on is the desk.", "The report on the desk is.", "The report is on the desk."], answer: 3, explain: "句中 on the desk 的意思是“在桌子上”，the report 的意思是“报告”。主语 + be + 位置短语的结构。动词和宾语构成句子的核心，然后才是关于时间或方式的信息。", difficulty: "困难", keepChoice: true },
  { q: "把下列词排成正确的句子：the laboratory / this morning / is / quiet / .", options: ["The laboratory quiet is this morning.", "The laboratory is this morning quiet.", "The laboratory is quiet this morning.", "Quiet the laboratory is this morning."], answer: 2, explain: "句中的 the laboratory 意思是“实验室”。Be 在形容词补语前面；时间通常在最后。句子里的词序说明了谁做动作、动作作用于什么，以及补充信息放在哪里。", difficulty: "困难", keepChoice: true },
];

// 第 16 课 Negatives & questions（否定句与疑问句）原站题库：简单 20 题、中等 29 题
// （26 选择 + 3 填空）、困难 24 题（21 选择 + 3 填空），共 73 题全收，无待补。
// 答案一律按答案文字定位（不按原站报告的字母）；跨档重复是原站自己的复用，照原样
// 保留不去重。解析里原站写作「同第 X 题」的，按前几课先例直接收录被引题的原站
// 解析全文（交叉引用本身是提取报告的标注，不进 explain）。中等第 9 题原站解析里
// 「用」字重复了一次，按原意翻译、不保留重复。填空题括号提示照原站题干原样保留。
const A1_L16_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "选择正确的疑问句语序。", options: ["Where does she lives?", "Where do she live?", "Where she does live?", "Where does she live?"], answer: 3, explain: "疑问词在助动词前面，然后才是主语。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "简单", keepChoice: true },
  { q: "___ your supervisor work here?", options: ["Are", "Do", "Is", "Does"], answer: 3, explain: "Supervisor 是单数，问习惯用 does。句中的 supervisor 意思是“导师”。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "简单", keepChoice: true },
  { q: "___ the analyst check the figures every day?", options: ["Does", "Is", "Are", "Do"], answer: 0, explain: "Analyst 是单数，所以一般现在时的疑问句用普通动词，以 Does 开头。句中的 the analyst 意思是“分析员”。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["Does she drive? — Yes, she does.", "Does she drives? — Yes, she does.", "Do she drive? — Yes, she does.", "She does drive? — Yes, she does."], answer: 0, explain: "简短回答重复助动词 does。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "简单", keepChoice: true },
  { q: "___ the researchers understand the instructions?", options: ["Does", "Are", "Do", "Is"], answer: 2, explain: "句中的 the researchers 意思是“研究者们”。Researchers 是复数，所以用 Do + 主语 + 动词原形。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：你住得离学校近吗？——近。", options: ["Do you live near the school? — Yes, He do.", "Does you live near the school? — Yes, I do.", "Do you live near the school? — Yes, I do.", "You Do live near the school? — Yes, I do."], answer: 2, explain: "简短回答重复助动词 do，不重复 live。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：她在这里工作吗？", options: ["She work here?", "Does she work here?", "Do she work here?", "Does she works here?"], answer: 1, explain: "Does 带有第三人称单数的标志，所以 work 保持原形。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：你妈妈是做什么工作的？", options: ["What your mother does do?", "What does your mother does?", "What do your mother do?", "What does your mother do?"], answer: 3, explain: "Does 是助动词，第二个 do 是主要动词，意思是“做”。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["Does Nam like football? — No, he doesn't.", "Does Nam likes football? — No, he doesn't.", "Do Nam like football? — No, he doesn't.", "Nam does like football? — No, he doesn't."], answer: 0, explain: "疑问句用 does 加动词原形，回答重复 doesn't。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：你姐姐在哪里学习？", options: ["Where does your sister study?", "Where your sister does study?", "Where does your sister studies?", "Where your sister study?"], answer: 0, explain: "合适的顺序是疑问词 where、助动词 does、主语 your sister，然后是动词原形 study。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "简单", keepChoice: true },
  { q: "___ the participants read English articles?", options: ["Do", "Is", "Are", "Does"], answer: 0, explain: "Participants 是复数，所以问句里用 do。句中的 the participants 意思是“参与者”。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：他们周日不打网球。", options: ["They do not play tennis on Sundays.", "They does not play tennis on Sundays.", "They not play tennis on Sundays.", "They do not plays tennis on Sundays."], answer: 0, explain: "复数主语用 do not；缩写形式是 don't。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：我爸爸晚上不喝茶。", options: ["My father does not drinks tea in the evening.", "My father doesn't drink tea in the evening.", "My father don't drink tea in the evening.", "My father not drink tea in the evening."], answer: 1, explain: "Doesn't 已经带有 -s，所以 drink 回到原形。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["Are you student?", "You are student?", "Is you a student?", "Are you a student?"], answer: 3, explain: "动词 to be 自己倒装构成问句，不用 do。句中的 a student 意思是“一名学生”。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "简单", keepChoice: true },
  { q: "The system ___ not require registration.", options: ["are", "do", "is", "does"], answer: 3, explain: "System 是单数，所以用 does not。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["We don't needs help.", "We doesn't need help.", "We don't need help.", "We not need help."], answer: 2, explain: "We 用 don't，主要动词保持原形。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "简单", keepChoice: true },
  { q: "___ your sister speak Japanese?", options: ["Is", "Do", "Are", "Does"], answer: 3, explain: "Your sister 是第三人称单数，所以用 does。句中的 sister 意思是“姐姐/妹妹”。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["How often you go swimming?", "How often do you goes swimming?", "How often you do go swimming?", "How often do you go swimming?"], answer: 3, explain: "句中的 often 意思是“经常”。You 用 do，主要动词保持原形 go。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：你妈妈是做什么工作的？", options: ["What your mother does do?", "What does your mother does?", "What do your mother do?", "What does your mother do?"], answer: 3, explain: "Does 是助动词，do 是主要动词，意思是做某事。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["She not like tea.", "She does not likes tea.", "She don't like tea.", "She does not like tea."], answer: 3, explain: "普通动词需要助动词 does 来构成否定。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "简单", keepChoice: true },
  // ---- 中等 ----
  { q: "___ your supervisor work here?", options: ["Are", "Does", "Is", "Do"], answer: 1, explain: "Supervisor 是单数，问习惯用 does。句中的 supervisor 意思是“导师”。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "中等", keepChoice: true },
  { q: "___ the result reliable?", options: ["Does", "Is", "Do", "Are"], answer: 1, explain: "句中的 reliable 意思是“可靠的”。补语是形容词 reliable 时，be 放在问句开头。因为主要动词是 be，问句是把 be 的适当形式放到主语前面构成的。", difficulty: "中等", keepChoice: true },
  { q: "The study ___ not contain personal data.", options: ["do", "does", "is", "are"], answer: 1, explain: "句中的 the study 意思是“研究”。Study 是单数，所以用 does not + contain。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "中等", keepChoice: true },
  { q: "___ the participants read English papers?", options: ["Does", "Do", "Are", "Is"], answer: 1, explain: "句中的 the participants 意思是“参与者”。Participants 是复数，所以问句里用 do。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "中等", keepChoice: true },
  { q: "The journal ___ not accept anonymous submissions.", options: ["does", "do", "is", "are"], answer: 0, explain: "Journal 是单数，所以用 does not + accept。句中的 the journal 意思是“学术期刊”。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "中等", keepChoice: true },
  { q: "___ the analyst check the figures every day?", options: ["Does", "Is", "Are", "Do"], answer: 0, explain: "Analyst 是单数，所以一般现在时的疑问句用普通动词，以 Does 开头。句中的 the analyst 意思是“分析员”。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "中等", keepChoice: true },
  { q: "My father ___ （does not，缩写） drink tea in the evening.", options: [], answer: 0, answerText: "doesn't", baseWord: "does not", sentence: "My father doesn't drink tea in the evening.", explain: "句中的 my father 意思是“我爸爸”。第三人称单数用 doesn't。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "中等", kind: "blank" },
  { q: "___ your mentor work here?", options: ["Does", "Do", "Are", "Is"], answer: 0, explain: "mentor 是单数，问习惯用 does。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "中等", keepChoice: true },
  { q: "___ the investigators understand the instructions?", options: ["Are", "Does", "Do", "Is"], answer: 2, explain: "investigators 是复数，所以用 Do + 主语 + 动词原形。句中的 the investigators 意思是“调查人员”。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "中等", keepChoice: true },
  { q: "___ she attend the seminar every week?", options: ["Is", "Do", "Are", "Does"], answer: 3, explain: "She 是单数，所以用 Does + she + 动词原形 attend。句中 the seminar 的意思是“研讨会”，every week 的意思是“每周”。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "中等", keepChoice: true },
  { q: "___ the participants read English articles?", options: ["Are", "Do", "Is", "Does"], answer: 1, explain: "Participants 是复数，所以问句里用 do。句中的 the participants 意思是“参与者”。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "中等", keepChoice: true },
  { q: "The online system ___ not require registration.", options: ["do", "does", "are", "is"], answer: 1, explain: "句中的 online 意思是“在线”。System 是单数，所以用 does not。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "中等", keepChoice: true },
  { q: "___ the researchers understand the instructions?", options: ["Do", "Does", "Are", "Is"], answer: 0, explain: "句中的 the researchers 意思是“研究者们”。Researchers 是复数，所以用 Do + 主语 + 动词原形。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "中等", keepChoice: true },
  { q: "The students ___ not share their passwords.", options: ["are", "does", "do", "is"], answer: 2, explain: "句中的 the students 意思是“学生”。Students 是复数，所以用 do not。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "中等", keepChoice: true },
  { q: "___ the manuscript complete?", options: ["Is", "Does", "Do", "Are"], answer: 0, explain: "句中的 the manuscript 意思是“稿件”。Complete 是形容词；用动词 be 提问。因为主要动词是 be，问句是把 be 的适当形式放到主语前面构成的。", difficulty: "中等", keepChoice: true },
  { q: "___ there any errors in this report?", options: ["Is", "Are", "Does", "Do"], answer: 1, explain: "Errors 在 there are 里是复数。句中的 report 意思是“报告”。因为主要动词是 be，问句是把 be 的适当形式放到主语前面构成的。", difficulty: "中等", keepChoice: true },
  { q: "___ there any errors in this summary?", options: ["Are", "Is", "Does", "Do"], answer: 0, explain: "句中的 summary 意思是“摘要”。Errors 在 there are 里是复数。因为主要动词是 be，问句是把 be 的适当形式放到主语前面构成的。", difficulty: "中等", keepChoice: true },
  { q: "___ they study linguistics?", options: ["Do", "Are", "Does", "Is"], answer: 0, explain: "They 用 Do + 动词原形 study。句中 linguistics 的意思是“语言学”，study 的意思是“学习”。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "中等", keepChoice: true },
  { q: "___ the figures accurate?", options: ["Does", "Is", "Are", "Do"], answer: 2, explain: "Figures 是复数，accurate 是形容词，所以用 Are。句中的 accurate 意思是“准确的”。因为主要动词是 be，问句是把 be 的适当形式放到主语前面构成的。", difficulty: "中等", keepChoice: true },
  { q: "选择正确的选项。", options: ["Do he live here?", "Does he lives here?", "He does live here?", "Does he live here?"], answer: 3, explain: "He 用 does，主要动词回到原形。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "中等", keepChoice: true },
  { q: "___ we need an additional reference?", options: ["Are", "Does", "Is", "Do"], answer: 3, explain: "We 问 need 时用 do。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "中等", keepChoice: true },
  { q: "The research units ___ not open on Sundays.", options: ["are", "is", "do", "does"], answer: 2, explain: "Research units 是复数名词短语，所以用 do not + open。句中的 research 意思是“研究”。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "中等", keepChoice: true },
  { q: "The laboratories ___ not open on Sundays.", options: ["is", "do", "does", "are"], answer: 1, explain: "Laboratories 是复数，所以用 do not + open。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "中等", keepChoice: true },
  { q: "The publisher ___ not accept unverified reports.", options: ["are", "is", "do", "does"], answer: 3, explain: "Publisher 是单数主语；在一般现在时的否定句里用 does not + accept。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "中等", keepChoice: true },
  { q: "What time ___ （it） the shop open?", options: [], answer: 0, answerText: "does", baseWord: "it", sentence: "What time does the shop open?", explain: "The shop 是第三人称单数，所以用 does。句中的 time 意思是“时间”。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "中等", kind: "blank" },
  { q: "___ the researcher check the values every day?", options: ["Does", "Do", "Are", "Is"], answer: 0, explain: "句中的 the researcher 意思是“研究者”。Researcher 是单数主语，所以一般现在时的问句以 Does 开头，动词 check 保持原形。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "中等", keepChoice: true },
  { q: "The system ___ not require registration.", options: ["are", "is", "do", "does"], answer: 3, explain: "System 是单数，所以用 does not。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "中等", keepChoice: true },
  { q: "The scholars ___ not share their passwords.", options: ["is", "does", "are", "do"], answer: 3, explain: "scholars 是复数，所以用 do not。句中的 the scholars 意思是“学者们”。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "中等", keepChoice: true },
  { q: "This machine ___ （does not，缩写） work properly.", options: [], answer: 0, answerText: "doesn't", baseWord: "does not", sentence: "This machine doesn't work properly.", explain: "This machine 相当于 it，所以用 doesn't。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "中等", kind: "blank" },
  // ---- 困难 ----
  { q: "选择正确的选项。", options: ["Does he live here?", "Does he lives here?", "He does live here?", "Do he live here?"], answer: 0, explain: "He 用 does，主要动词回到原形。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "困难", keepChoice: true },
  { q: "The scholars ___ not share their passwords.", options: ["do", "is", "are", "does"], answer: 0, explain: "scholars 是复数，所以用 do not。句中的 the scholars 意思是“学者们”。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "困难", keepChoice: true },
  { q: "The online system ___ not require registration.", options: ["is", "does", "are", "do"], answer: 1, explain: "句中的 online 意思是“在线”。System 是单数，所以用 does not。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "困难", keepChoice: true },
  { q: "The study ___ not contain personal data.", options: ["is", "does", "do", "are"], answer: 1, explain: "Study 是单数，所以用 does not + contain。句中的 the study 意思是“研究”。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "困难", keepChoice: true },
  { q: "___ we need an additional reference?", options: ["Are", "Does", "Is", "Do"], answer: 3, explain: "We 问 need 时用 do。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "困难", keepChoice: true },
  { q: "___ the figures accurate?", options: ["Does", "Are", "Do", "Is"], answer: 1, explain: "Figures 是复数，accurate 是形容词，所以用 Are。句中的 accurate 意思是“准确的”。因为主要动词是 be，问句是把 be 的适当形式放到主语前面构成的。", difficulty: "困难", keepChoice: true },
  { q: "___ there any errors in this summary?", options: ["Is", "Are", "Does", "Do"], answer: 1, explain: "句中的 summary 意思是“摘要”。Errors 在 there are 里是复数。因为主要动词是 be，问句是把 be 的适当形式放到主语前面构成的。", difficulty: "困难", keepChoice: true },
  { q: "___ the manuscript complete?", options: ["Are", "Does", "Do", "Is"], answer: 3, explain: "句中的 the manuscript 意思是“稿件”。Complete 是形容词；用动词 be 提问。因为主要动词是 be，问句是把 be 的适当形式放到主语前面构成的。", difficulty: "困难", keepChoice: true },
  { q: "What time ___ （it） the shop open?", options: [], answer: 0, answerText: "does", baseWord: "it", sentence: "What time does the shop open?", explain: "The shop 是第三人称单数，所以用 does。句中的 time 意思是“时间”。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "困难", kind: "blank" },
  { q: "This machine ___ （does not，缩写） work properly.", options: [], answer: 0, answerText: "doesn't", baseWord: "does not", sentence: "This machine doesn't work properly.", explain: "This machine 相当于 it，所以用 doesn't。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "困难", kind: "blank" },
  { q: "___ there any errors in this report?", options: ["Is", "Does", "Are", "Do"], answer: 2, explain: "Errors 在 there are 里是复数。句中的 report 意思是“报告”。因为主要动词是 be，问句是把 be 的适当形式放到主语前面构成的。", difficulty: "困难", keepChoice: true },
  { q: "My father ___ （does not，缩写） drink tea in the evening.", options: [], answer: 0, answerText: "doesn't", baseWord: "does not", sentence: "My father doesn't drink tea in the evening.", explain: "句中的 my father 意思是“我爸爸”。第三人称单数用 doesn't。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "困难", kind: "blank" },
  { q: "___ your mentor work here?", options: ["Is", "Are", "Do", "Does"], answer: 3, explain: "mentor 是单数，问习惯用 does。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "困难", keepChoice: true },
  { q: "The research units ___ not open on Sundays.", options: ["are", "do", "does", "is"], answer: 1, explain: "Research units 是复数名词短语，所以用 do not + open。句中的 research 意思是“研究”。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "困难", keepChoice: true },
  { q: "___ the researcher check the values every day?", options: ["Does", "Do", "Are", "Is"], answer: 0, explain: "句中的 the researcher 意思是“研究者”。Researcher 是单数主语，所以一般现在时的问句以 Does 开头，动词 check 保持原形。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "困难", keepChoice: true },
  { q: "The publisher ___ not accept unverified reports.", options: ["does", "is", "are", "do"], answer: 0, explain: "Publisher 是单数主语；在一般现在时的否定句里用 does not + accept。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "困难", keepChoice: true },
  { q: "The laboratories ___ not open on Sundays.", options: ["are", "does", "is", "do"], answer: 3, explain: "Laboratories 是复数，所以用 do not + open。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "困难", keepChoice: true },
  { q: "The students ___ not share their passwords.", options: ["is", "do", "does", "are"], answer: 1, explain: "句中的 the students 意思是“学生”。Students 是复数，所以用 do not。对于普通动词，助动词的形式在一般现在时里取决于主语。", difficulty: "困难", keepChoice: true },
  { q: "___ they study linguistics?", options: ["Is", "Do", "Are", "Does"], answer: 1, explain: "They 用 Do + 动词原形 study。句中 linguistics 的意思是“语言学”，study 的意思是“学习”。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "困难", keepChoice: true },
  { q: "___ the participants read English papers?", options: ["Do", "Does", "Is", "Are"], answer: 0, explain: "句中的 the participants 意思是“参与者”。Participants 是复数，所以问句里用 do。如果主要动词是 be，说话人直接用 be 来提问或否定。", difficulty: "困难", keepChoice: true },
  { q: "___ the result reliable?", options: ["Is", "Does", "Are", "Do"], answer: 0, explain: "句中的 reliable 意思是“可靠的”。补语是形容词 reliable 时，be 放在问句开头。因为主要动词是 be，问句是把 be 的适当形式放到主语前面构成的。", difficulty: "困难", keepChoice: true },
  { q: "___ she attend the seminar every week?", options: ["Does", "Do", "Are", "Is"], answer: 0, explain: "句中 the seminar 的意思是“研讨会”，every week 的意思是“每周”。She 是单数，所以用 Does + she + 动词原形 attend。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "困难", keepChoice: true },
  { q: "The journal ___ not accept anonymous submissions.", options: ["is", "are", "do", "does"], answer: 3, explain: "Journal 是单数，所以用 does not + accept。句中的 the journal 意思是“学术期刊”。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "困难", keepChoice: true },
  { q: "___ the investigators understand the instructions?", options: ["Are", "Does", "Do", "Is"], answer: 2, explain: "investigators 是复数，所以用 Do + 主语 + 动词原形。句中的 the investigators 意思是“调查人员”。在疑问句或否定句里用 do/does 时，主要动词保持原形。", difficulty: "困难", keepChoice: true },
];

// 第 17 课 Wh- questions（Wh- 疑问句）原站题库：简单 20 题（19 选择 + 1 填空）、
// 困难 25 题（23 选择 + 2 填空）全收；中等原站共 29 题，只收录选项提取完整的
// 8 题（Q1–Q6 选择 + Q7、Q12 填空），其余 21 题（Q8–Q11、Q13–Q29）选项未提全，
// 只记在下方「待补清单」里（题干 + 答案 + 解析），不编选项、不从简单/困难的
// 平行题借选项。答案一律按答案文字定位；困难第 14、17、19 题原站答后选项字母
// 与答前不一致，答案按文字记 When。5 道填空（简单 Q3、中等 Q7/Q12、困难
// Q7/Q13）原站没有括号提示，按第 5、8、11 课先例用「疑问词」作仅显示的提示词
// （baseWord），题干与答案照原站原样。中等 Q7 / 困难 Q13 的原站正确答案是
// When（"What time" 在原站被判错），按 When 记。
const A1_L17_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "___ does your lecturer teach? — Linguistics.", options: ["When", "Where", "Who", "What"], answer: 3, explain: "What 问的是学科信息。句中 linguistics 的意思是“语言学”，lecturer 的意思是“讲师”。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "简单", keepChoice: true },
  { q: "___ is the deadline? — Next Monday.", options: ["When", "Where", "What", "Who"], answer: 0, explain: "When 问的是时间点。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "简单", keepChoice: true },
  { q: "___ did she leave so early? — Because she felt unwell.", options: [], answer: 0, answerText: "Why", baseWord: "疑问词", sentence: "Why did she leave so early? — Because she felt unwell.", explain: "这个问题的意思是“她为什么这么早就离开了？”。答案以 because（因为）开头，说明了原因，所以要填的词是 why。这个用法是问一个行为的理由。", difficulty: "简单", kind: "blank" },
  { q: "选择翻译最准确的选项：谁打碎了窗户？", options: ["Who did break the window?", "Who broke the window?", "Who did broke the window?", "Who break the window?"], answer: 1, explain: "Who 就是做动作的人，所以不用 did，动词用一般过去时。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：图书馆几点关门？", options: ["What time the library close?", "What time does the library closes?", "What time the library does close?", "What time does the library close?"], answer: 3, explain: "what time 这个短语完整地放在句首，然后才是助动词 does。答案或情景说明了这个问题需要的是哪一类具体信息。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["How do you go to school?", "How you go to school?", "How does you go to school?", "How do you goes to school?"], answer: 0, explain: "How 在开头，然后是助动词 do 和主语 you。句中的 school 意思是“学校”。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "简单", keepChoice: true },
  { q: "___ is the seminar? — On Friday.", options: ["Where", "What", "When", "Who"], answer: 2, explain: "When 用来问时间。句中的 the seminar 意思是“研讨会”。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：你住在哪里？", options: ["Where you live?", "Where does you live?", "Where do you lives?", "Where do you live?"], answer: 3, explain: "四个部分都齐全：疑问词 where、助动词 do、主语 you、动词原形 live。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "简单", keepChoice: true },
  { q: "___ is your supervisor? — Professor Hoa.", options: ["Where", "When", "Who", "What"], answer: 2, explain: "句中的 supervisor 意思是“导师”。Who 用来问人的身份。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["Where your sister is?", "Where is your sister?", "Where does your sister is?", "Where is your sister be?"], answer: 1, explain: "句中的 sister 意思是“姐姐/妹妹”。动词 to be 自己倒装到疑问词后面，不需要 do。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["Who did break the window?", "Who broke the window?", "Who did broke the window?", "Who break the window?"], answer: 1, explain: "句中的 the window 意思是“窗户”。Who 作主语，所以不用助动词 did。答案或情景说明了这个问题需要的是哪一类具体信息。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["Where you live?", "Where does you live?", "Where do you lives?", "Where do you live?"], answer: 3, explain: "普通动词的问句需要助动词 do 放在疑问词后面。答案或情景说明了这个问题需要的是哪一类具体信息。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：她为什么这么早就离开聚会了？", options: ["Why did she leave the party so early?", "Why she leave the party so early?", "Did Why she leave the party so early?", "Why she did leave the party so early?"], answer: 0, explain: "Did 带有过去时的标志，所以 leave 保持原形。答案或情景说明了这个问题需要的是哪一类具体信息。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：今天下午你姐姐在哪里？", options: ["Where is your sister this evening?", "Where does your sister is this afternoon?", "Where is your sister this afternoon?", "Where your sister is this afternoon?"], answer: 2, explain: "动词 to be 自己倒装到疑问词后面，不需要再加 do。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "简单", keepChoice: true },
  { q: "___ is the scientific conference? — In Hanoi.", options: ["Where", "When", "What", "Who"], answer: 0, explain: "Where 用来问地点。句中的 in Hanoi 意思是“在河内”。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "简单", keepChoice: true },
  { q: "___ bag is yours, the red one or the blue one?", options: ["Which", "What", "Whose", "Who"], answer: 0, explain: "Which 用于在一个已给出的几种可能里作选择。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["How many brothers do you have?", "How many brother do you have?", "How much brothers do you have?", "How many brothers does you have?"], answer: 0, explain: "How many 后面跟可数名词复数。句中的 many 意思是“很多”。答案或情景说明了这个问题需要的是哪一类具体信息。", difficulty: "简单", keepChoice: true },
  { q: "___ many researchers are in the team? — Eight.", options: ["When", "Who", "How", "What"], answer: 2, explain: "How many 问可数名词复数的数量。句中的 researchers 意思是“研究者们”。答案或情景说明了这个问题需要的是哪一类具体信息。", difficulty: "简单", keepChoice: true },
  { q: "___ is the report important? — It contains new evidence.", options: ["When", "Where", "What", "Why"], answer: 3, explain: "句中 the report 的意思是“报告”，important 的意思是“重要的”。Why 问理由。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["Who did you call last night?", "Who did you called last night?", "Who you called last night?", "Who you did call last night?"], answer: 0, explain: "Who 在宾语位置，所以问句仍需要助动词 did。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "简单", keepChoice: true },
  // ---- 中等 ----
  { q: "___ is the workshop? — On Friday.", options: ["Where", "When", "What", "Who"], answer: 1, explain: "When 用来问时间。句中的 the workshop 意思是“培训班”。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "中等", keepChoice: true },
  { q: "___ do you practise English? — Every evening.", options: ["Who", "Where", "What", "When"], answer: 3, explain: "When 问时间，答案是关于晚上的。句中的 every evening 意思是“每晚”。答案或情景说明了这个问题需要的是哪一类具体信息。", difficulty: "中等", keepChoice: true },
  { q: "___ is the deadline? — Next Monday.", options: ["Where", "What", "When", "Who"], answer: 2, explain: "When 问的是时间点。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "中等", keepChoice: true },
  { q: "___ is your favourite author? — George Orwell.", options: ["Where", "Who", "What", "When"], answer: 1, explain: "Who 问的是人。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "中等", keepChoice: true },
  { q: "___ is the summary important? — It contains new evidence.", options: ["Where", "When", "What", "Why"], answer: 3, explain: "句中 the summary 的意思是“摘要”，important 的意思是“重要的”。Why 问理由。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "中等", keepChoice: true },
  { q: "___ is this book? — It is a grammar reference.", options: ["Where", "When", "What", "Who"], answer: 2, explain: "What 问的是东西的名称/种类。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "中等", keepChoice: true },
  { q: "___ does the film start? — At eight in the evening.", options: [], answer: 0, answerText: "When", baseWord: "疑问词", sentence: "When does the film start? — At eight in the evening.", explain: "提问的人想知道电影开始的时间。答案给出了具体时间，是晚上八点，所以用 when 问“什么时候”。在一般现在时的问句里，does 后面跟主语 the film，再后面是动词原形 start。", difficulty: "中等", kind: "blank" },
  { q: "___ happened at the meeting? — A disagreement.", options: [], answer: 0, answerText: "What", baseWord: "疑问词", sentence: "What happened at the meeting? — A disagreement.", explain: "这个问题的意思是“会议上发生了什么事？”。答案说的是一个分歧，所以合适的疑问词是 what（什么）。在这个句子里，what 自己担任 happened 的主语。", difficulty: "中等", kind: "blank" },
  // ---- 困难 ----
  { q: "___ do you feel? — Confident.", options: ["How", "When", "Where", "What"], answer: 0, explain: "句中的 confident 意思是“自信的”。How 问状态或感受。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "困难", keepChoice: true },
  { q: "选择翻译最准确的选项：会议上发生了什么事？", options: ["What did happen at the meeting?", "What happened at the meeting?", "What does happen at the meeting?", "What happens at the meeting?"], answer: 1, explain: "What 是主语，所以语序保持和陈述句一样，没有助动词。", difficulty: "困难", keepChoice: true },
  { q: "___ many investigators are in the team? — Eight.", options: ["When", "How", "Where", "What"], answer: 1, explain: "How many 问可数名词复数的数量。句中的 investigators 意思是“调查人员”。答案或情景说明了这个问题需要的是哪一类具体信息。", difficulty: "困难", keepChoice: true },
  { q: "选择正确的选项。", options: ["Where does she live?", "Where does she lives?", "Where she does live?", "Where do she live?"], answer: 0, explain: "Does 已经带有第三人称单数的标志，所以主要动词回到原形。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "困难", keepChoice: true },
  { q: "___ do you practise English? — Every evening.", options: ["Who", "When", "What", "Where"], answer: 1, explain: "When 问时间，答案是关于晚上的。句中的 every evening 意思是“每晚”。答案或情景说明了这个问题需要的是哪一类具体信息。", difficulty: "困难", keepChoice: true },
  { q: "___ is the new reviewer? — Dr Minh.", options: ["Where", "When", "What", "Who"], answer: 3, explain: "Who 问一个人的身份。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "困难", keepChoice: true },
  { q: "___ happened at the meeting? — A disagreement.", options: [], answer: 0, answerText: "What", baseWord: "疑问词", sentence: "What happened at the meeting? — A disagreement.", explain: "这个问题的意思是“会议上发生了什么事？”。答案说的是一个分歧，所以合适的疑问词是 what（什么）。在这个句子里，what 自己担任 happened 的主语。", difficulty: "困难", kind: "blank" },
  { q: "___ is your favourite author? — George Orwell.", options: ["Who", "When", "What", "Where"], answer: 0, explain: "Who 问的是人。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "困难", keepChoice: true },
  { q: "___ is the institute? — On the second floor.", options: ["Where", "When", "What", "Who"], answer: 0, explain: "Where 问位置。句中 on the second floor 的意思是“在二楼”，the institute 的意思是“研究所”。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "困难", keepChoice: true },
  { q: "___ is the new editor? — Dr Minh.", options: ["When", "Who", "What", "Where"], answer: 1, explain: "Who 问一个人的身份。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "困难", keepChoice: true },
  { q: "___ is the scientific symposium? — In Hanoi.", options: ["When", "Where", "What", "Who"], answer: 1, explain: "句中的 in Hanoi 意思是“在河内”。Where 用来问地点。答案或情景说明了这个问题需要的是哪一类具体信息。", difficulty: "困难", keepChoice: true },
  { q: "___ is the summary important? — It contains new evidence.", options: ["Where", "When", "What", "Why"], answer: 3, explain: "句中 the summary 的意思是“摘要”，important 的意思是“重要的”。Why 问理由。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "困难", keepChoice: true },
  { q: "___ does the film start? — At eight in the evening.", options: [], answer: 0, answerText: "When", baseWord: "疑问词", sentence: "When does the film start? — At eight in the evening.", explain: "提问的人想知道电影开始的时间。答案给出了具体时间，是晚上八点，所以用 when 问“什么时候”。在一般现在时的问句里，does 后面跟主语 the film，再后面是动词原形 start。", difficulty: "困难", kind: "blank" },
  { q: "___ is the submission deadline? — Next Monday.", options: ["Where", "When", "What", "Why"], answer: 1, explain: "When 问的是时间点。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "困难", keepChoice: true },
  { q: "___ is the laboratory? — On the second floor.", options: ["When", "Where", "What", "Who"], answer: 1, explain: "Where 问位置。句中 on the second floor 的意思是“在二楼”，the laboratory 的意思是“实验室”。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "困难", keepChoice: true },
  { q: "___ much time do we have before the meeting? — One hour.", options: ["When", "Where", "How", "What"], answer: 2, explain: "句中的 the meeting 意思是“会议”。How much 问不可数名词 time 的量。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "困难", keepChoice: true },
  { q: "___ does the meeting start? — At nine.", options: ["Who", "When", "Where", "What"], answer: 1, explain: "句中的 the meeting 意思是“会议”。When 问时间点。答案或情景说明了这个问题需要的是哪一类具体信息。", difficulty: "困难", keepChoice: true },
  { q: "___ is your mentor? — Professor Hoa.", options: ["Who", "When", "What", "Where"], answer: 0, explain: "Who 用来问人的身份。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "困难", keepChoice: true },
  { q: "___ does the discussion start? — At nine.", options: ["When", "Where", "What", "Who"], answer: 0, explain: "句中的 the discussion 意思是“讨论”。When 问时间点。答案或情景说明了这个问题需要的是哪一类具体信息。", difficulty: "困难", keepChoice: true },
  { q: "___ is your research topic? — Climate change.", options: ["When", "Where", "What", "Who"], answer: 2, explain: "句中的 research 意思是“研究”。What 问的是主题信息。答案或情景说明了这个问题需要的是哪一类具体信息。", difficulty: "困难", keepChoice: true },
  { q: "___ is this book? — It is an English grammar reference.", options: ["When", "What", "Where", "Who"], answer: 1, explain: "What 问的是东西的名称/种类。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "困难", keepChoice: true },
  { q: "___ much time do we have? — One hour.", options: ["When", "Where", "How", "What"], answer: 2, explain: "句中的 much 意思是“很多”。How much 问不可数名词 time 的量。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "困难", keepChoice: true },
  { q: "___ is the workshop? — On Friday.", options: ["When", "Where", "What", "Who"], answer: 0, explain: "When 用来问时间。句中的 the workshop 意思是“培训班”。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。", difficulty: "困难", keepChoice: true },
  { q: "___ is this book? — It is a grammar reference.", options: ["Where", "When", "What", "Who"], answer: 2, explain: "What 问的是东西的名称/种类。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "困难", keepChoice: true },
  { q: "___ does your professor teach? — Mathematics.", options: ["What", "When", "Where", "Who"], answer: 0, explain: "What 问的是学科信息。句中的 mathematics 意思是“数学”。在疑问句里，疑问词必须与要求对方提供的信息相对应。", difficulty: "困难", keepChoice: true },
];

// 第 18 课 There is / There are 原站题库：简单 20 题（19 选择 + 1 填空）、
// 中等 30 题（23 选择 + 7 填空）、困难 27 题（19 选择 + 8 填空），共 77 题全收，
// 无待补。答案一律按答案文字定位。填空：简单 Q2 带原站括号提示（过去时，单数）；
// 其余无括号提示的填空按简报先例用仅显示的提示词——be 动词类用「be 动词」、
// there 类用「存在句」（baseWord），题干与答案照原站原样。困难档多题与中等档
// 同题（原站自己的跨档复用），简报中标「同中等第 X 题」的解析按本站先例收录
// 被引用题的原站解析全文，交叉引用本身是提取报告的标注、不进 explain。
const A1_L18_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "___ are many bicycles in the yard.", options: ["There", "Their", "Theirs", "They're"], answer: 0, explain: "句中的 many 意思是“很多”。表示存在的句型用 there。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "简单", keepChoice: true },
  { q: "There ___ （过去时，单数） a storm last night.", options: [], answer: 0, answerText: "was", baseWord: "过去时，单数", sentence: "There was a storm last night.", explain: "句中的 a storm 意思是“一场暴风雨”。there is 的过去时单数形式是 there was。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "简单", kind: "blank" },
  { q: "There ___ several charts in the appendix.", options: ["are", "am", "is", "be"], answer: 0, explain: "句中 the appendix 的意思是“附录”，several 的意思是“几个”。Charts 是复数，用 there are。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["There are a sofa and there are two cushion.", "There is a sofa and there are two cushions.", "There is a sofa and there is two cushions.", "There are a sofa and there is two cushions."], answer: 1, explain: "每个分句的动词都各自与自己的名词保持一致。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["Is there any sugar?", "Is there some sugar left any?", "Are there any sugar?", "Have there any sugar?"], answer: 0, explain: "Sugar 不可数，所以用 is，问句用 any。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "简单", keepChoice: true },
  { q: "There ___ several laboratories on campus.", options: ["is", "be", "are", "am"], answer: 2, explain: "句中的 several 意思是“几个”。Several laboratories 是复数，用 are。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "简单", keepChoice: true },
  { q: "There ___ a problem with the measurement.", options: ["is", "are", "am", "be"], answer: 0, explain: "名词 problem 是单数，所以用 there is。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：市场附近有一家银行。", options: ["There has a bank near the market.", "There is a bank near the market.", "There is an bank near the market.", "There are a bank near the market."], answer: 1, explain: "A bank 是单数名词，所以用 there is。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["There are a lot of persons here.", "They're a lot of people here.", "There are a lot of people here.", "There is a lot of people here."], answer: 2, explain: "They're 的意思是“他们是”，不用于表示存在的句型。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "简单", keepChoice: true },
  { q: "___ there any evidence in the report?", options: ["Is", "Are", "Does", "Do"], answer: 0, explain: "Evidence 不可数，所以用 Is there。句中 the report 的意思是“报告”，evidence 的意思是“证据”。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：冰箱里有一点牛奶。", options: ["There are some milk in the fridge.", "There has some milk in the fridge.", "There is some milk in the fridge.", "There some milk in the fridge."], answer: 2, explain: "Milk 不可数，所以仍然用 there is。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["There has a bank near here.", "There have a bank near here.", "It has a bank near here.", "There is a bank near here."], answer: 3, explain: "表示存在的句型用 there is，不用 have。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：这栋楼里有电梯吗？", options: ["Is there an lift in this building?", "Is there a lift in these building?", "Is there a lift in this building?", "Are there a lift in this building?"], answer: 2, explain: "问句把 is 倒装到 there 前面。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：我的房间里有两扇窗户。", options: ["There are two window in my room.", "There have two windows in my room.", "There is two windows in my room.", "There are two windows in my room."], answer: 3, explain: "Two windows 是复数，所以用 there are，虽然形式主语仍然是 there。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "简单", keepChoice: true },
  { q: "There ___ some milk in the fridge.", options: ["have", "has", "is", "are"], answer: 2, explain: "Milk 不可数，所以用 is。句中的 some 意思是“一些”。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "简单", keepChoice: true },
  { q: "___ three books on the desk.", options: ["It is", "There has", "There are", "There is"], answer: 2, explain: "Three books 是复数，所以用 there are。句中的 on the desk 意思是“在书桌上”。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：这辆公交车上没有空座位了。", options: ["There aren't any seats left on this bus.", "There aren't any seats left on these bus.", "There isn't any seats left on this bus.", "There aren't any seats did left on this bus."], answer: 0, explain: "否定句里可数名词复数用 aren't any。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["There aren't any students here.", "There not are students here.", "There isn't any students here.", "There aren't some students here."], answer: 0, explain: "句中的 students 意思是“学生”。复数名词用 aren't，否定句用 any。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["There are two windows in my room.", "There have two windows in my room.", "There is two windows in my room.", "There are two window in my room."], answer: 0, explain: "动词要与复数名词 two windows 保持一致。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "简单", keepChoice: true },
  { q: "There ___ many visitors at the museum yesterday.", options: ["were", "are", "was", "is"], answer: 0, explain: "Many visitors 是过去时的复数，所以用 were。句中的 the museum 意思是“博物馆”。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "简单", keepChoice: true },
  // ---- 中等 ----
  { q: "选择正确的选项。", options: ["There are not simple explanation for the decline.", "There are no simple explanations for the decline.", "There have no simple explanations for the decline.", "There is no simple explanations for the decline."], answer: 1, explain: "Explanations 是复数，所以用 are。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "中等", keepChoice: true },
  { q: "There ___ a new notice on the board.", options: ["is", "am", "are", "be"], answer: 0, explain: "这句话的意思是“公告栏上有一张新通知。”Notice 是单数，用 there is。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "中等", keepChoice: true },
  { q: "There ___ a useful reference library near the institute.", options: ["be", "am", "is", "are"], answer: 2, explain: "句中 the institute 的意思是“研究所”，useful 的意思是“有用的”。Library 是单数，用 there is。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "中等", keepChoice: true },
  { q: "There ___ three limitations worth noting.", options: [], answer: 0, answerText: "are", baseWord: "be 动词", sentence: "There are three limitations worth noting.", explain: "句中的 limitations 意思是“局限性”。后面的名词是 limitations，复数。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "中等", kind: "blank" },
  { q: "There ___ sufficient space for two desks.", options: ["are", "is", "am", "be"], answer: 1, explain: "Space 在“面积”这个意思上不可数，用 is。句中的 space 意思是“空间”。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "中等", keepChoice: true },
  { q: "___ there many participants today?", options: ["Do", "Does", "Are", "Is"], answer: 2, explain: "句中 participants 的意思是“参加者”，today 的意思是“今天”。Participants 是复数，所以用 Are there。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "中等", keepChoice: true },
  { q: "选择正确的选项。", options: ["Is there any comparable studies from the region?", "Are there any comparable studies from the region?", "Does there any comparable studies from the region?", "Are there some comparable study from the region?"], answer: 1, explain: "复数名词的问句用 Are there。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "中等", keepChoice: true },
  { q: "There ___ no errors in the final table.", options: ["be", "am", "are", "is"], answer: 2, explain: "Errors 是复数，用 there are。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "中等", keepChoice: true },
  { q: "There ___ a problem with the measurement.", options: ["be", "am", "are", "is"], answer: 3, explain: "名词 problem 是单数，所以用 there is。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "中等", keepChoice: true },
  { q: "There ___ five sources in the bibliography.", options: ["am", "be", "are", "is"], answer: 2, explain: "句中的 the bibliography 意思是“参考文献目录”。Five sources 是复数，所以用 there are。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "中等", keepChoice: true },
  { q: "There ___ several laboratories on campus.", options: ["are", "am", "is", "be"], answer: 0, explain: "句中的 several 意思是“几个”。Several laboratories 是复数，用 are。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "中等", keepChoice: true },
  { q: "There ___ a useful reference library near the institute.", options: ["are", "be", "is", "am"], answer: 2, explain: "Library 是单数，用 there is。句中 the institute 的意思是“研究所”，useful 的意思是“有用的”。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "中等", keepChoice: true },
  { q: "___ there any evidence in the summary?", options: ["Does", "Are", "Do", "Is"], answer: 3, explain: "句中 the summary 的意思是“摘要”，evidence 的意思是“证据”。Evidence 不可数，所以用 Is there。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "中等", keepChoice: true },
  { q: "___ is a post office next to the school.", options: [], answer: 0, answerText: "There", baseWord: "存在句", sentence: "There is a post office next to the school.", explain: "句中 a post office 的意思是“一间邮局”，the school 的意思是“学校”。表示存在的句型以 there 开头。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "中等", kind: "blank" },
  { q: "In the appendix ___ is a full list of excluded records.", options: [], answer: 0, answerText: "there", baseWord: "存在句", sentence: "In the appendix there is a full list of excluded records.", explain: "there + be 的句型用来引出事物的存在。句中的 the appendix 意思是“附录”。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "中等", kind: "blank" },
  { q: "There ___ three important definitions here.", options: ["be", "am", "is", "are"], answer: 3, explain: "Definitions 是复数，用 are。句中的 important 意思是“重要的”。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "中等", keepChoice: true },
  { q: "There ___ much uncertainty about the forecast.", options: ["is", "am", "are", "be"], answer: 0, explain: "Uncertainty 不可数，用 is。句中的 much 意思是“很多”。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "中等", keepChoice: true },
  { q: "There ___ several charts in the appendix.", options: ["is", "be", "am", "are"], answer: 3, explain: "句中 the appendix 的意思是“附录”，several 的意思是“几个”。Charts 是复数，用 there are。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "中等", keepChoice: true },
  { q: "There ___ a discrepancy with the record.", options: ["am", "are", "is", "be"], answer: 2, explain: "名词 discrepancy 是单数，所以用 there is。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "中等", keepChoice: true },
  { q: "选择翻译最准确的选项：办公室里有一张桌子、两把椅子和一盏灯。", options: ["There are a desks, two chairs and a lamp in the office.", "There is an desk, two chairs and a lamp in the office.", "There is a desk, two chair and a lamp in the office.", "There is a desk, two chairs and a lamp in the office."], answer: 3, explain: "这句话的意思是“办公室里有一张办公桌、两把椅子和一盏灯”。there is 这个句型用来引出这些物品的存在。在这种列举里，第一个名词是 a desk（一张桌子），所以用 is 很自然。Two chairs 和 a lamp 说明了房间里其余的物品。", difficulty: "中等", keepChoice: true },
  { q: "There ___ two main arguments in this essay.", options: ["am", "are", "be", "is"], answer: 1, explain: "Two main arguments 是复数，所以用 are。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "中等", keepChoice: true },
  { q: "There ___ no information about the schedule.", options: ["is", "be", "am", "are"], answer: 0, explain: "Information 不可数，用 is。句中的 information 意思是“信息”。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "中等", keepChoice: true },
  { q: "There ___ several diagrams in the supplementary material.", options: ["am", "be", "is", "are"], answer: 3, explain: "Several diagrams 是复数名词短语，所以用 there are。句中的 several 意思是“几个”。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "中等", keepChoice: true },
  { q: "___ there any evidence in the report?", options: ["Are", "Is", "Do", "Does"], answer: 1, explain: "Evidence 不可数，所以用 Is there。句中 the report 的意思是“报告”，evidence 的意思是“证据”。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "中等", keepChoice: true },
  { q: "There ___ little evidence of long-term harm.", options: [], answer: 0, answerText: "is", baseWord: "be 动词", sentence: "There is little evidence of long-term harm.", explain: "Evidence 不可数，所以动词用单数。句中 long-term harm 的意思是“长期危害”，evidence 的意思是“证据”。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "中等", kind: "blank" },
  { q: "___ there a conference room on this floor?", options: ["Are", "Is", "Does", "Do"], answer: 1, explain: "Conference room 是单数，问 Is there。句中的 a conference room 意思是“一间会议室”。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "中等", keepChoice: true },
  { q: "___ there any seats left?", options: [], answer: 0, answerText: "Are", baseWord: "be 动词", sentence: "Are there any seats left?", explain: "Seats 是复数名词，所以用 are，倒装到 there 前面。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "中等", kind: "blank" },
  { q: "There ___ a risk of double counting in the survey.", options: [], answer: 0, answerText: "is", baseWord: "be 动词", sentence: "There is a risk of double counting in the survey.", explain: "句中 the survey 的意思是“调查”，a risk 的意思是“一个风险”。动词按紧跟在后面的名词变位，这里是 a risk。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "中等", kind: "blank" },
  { q: "___ there any textbooks in this room?", options: ["Are", "Is", "Does", "Do"], answer: 0, explain: "Textbooks 是复数，问 Are there。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "中等", keepChoice: true },
  { q: "There ___ reasons to doubt the sampling method.", options: [], answer: 0, answerText: "are", baseWord: "be 动词", sentence: "There are reasons to doubt the sampling method.", explain: "紧跟在后面的名词是 reasons，复数，即使后面还有单数短语。句中的 sampling method 意思是“抽样方法”。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "中等", kind: "blank" },
  // ---- 困难 ----
  { q: "___ there many participants today?", options: ["Does", "Is", "Are", "Do"], answer: 2, explain: "句中 participants 的意思是“参加者”，today 的意思是“今天”。Participants 是复数，所以用 Are there。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "困难", keepChoice: true },
  { q: "There ___ sufficient space for two desks.", options: ["be", "is", "are", "am"], answer: 1, explain: "Space 在“面积”这个意思上不可数，用 is。句中的 space 意思是“空间”。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "困难", keepChoice: true },
  { q: "There ___ a new notice on the board.", options: ["are", "be", "am", "is"], answer: 3, explain: "这句话的意思是“公告栏上有一张新通知。”Notice 是单数，用 there is。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "困难", keepChoice: true },
  { q: "There ___ a risk of double counting in the survey.", options: [], answer: 0, answerText: "is", baseWord: "be 动词", sentence: "There is a risk of double counting in the survey.", explain: "句中 the survey 的意思是“调查”，a risk 的意思是“一个风险”。动词按紧跟在后面的名词变位，这里是 a risk。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "困难", kind: "blank" },
  { q: "There ___ several diagrams in the supplementary material.", options: ["is", "be", "are", "am"], answer: 2, explain: "Several diagrams 是复数名词短语，所以用 there are。句中的 several 意思是“几个”。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "困难", keepChoice: true },
  { q: "There ___ a discrepancy with the record.", options: ["are", "am", "be", "is"], answer: 3, explain: "名词 discrepancy 是单数，所以用 there is。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "困难", keepChoice: true },
  { q: "In the appendix ___ is a full list of excluded records.", options: [], answer: 0, answerText: "there", baseWord: "存在句", sentence: "In the appendix there is a full list of excluded records.", explain: "there + be 的句型用来引出事物的存在。句中的 the appendix 意思是“附录”。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "困难", kind: "blank" },
  { q: "There ___ a useful reference library near the institute.", options: ["am", "be", "are", "is"], answer: 3, explain: "Library 是单数，用 there is。句中 the institute 的意思是“研究所”，useful 的意思是“有用的”。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "困难", keepChoice: true },
  { q: "There ___ five sources in the bibliography.", options: ["are", "am", "is", "be"], answer: 0, explain: "句中的 the bibliography 意思是“参考文献目录”。Five sources 是复数，所以用 there are。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "困难", keepChoice: true },
  { q: "There ___ three important definitions here.", options: ["am", "are", "be", "is"], answer: 1, explain: "Definitions 是复数，用 are。句中的 important 意思是“重要的”。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "困难", keepChoice: true },
  { q: "There ___ little evidence of long-term harm.", options: [], answer: 0, answerText: "is", baseWord: "be 动词", sentence: "There is little evidence of long-term harm.", explain: "Evidence 不可数，所以动词用单数。句中 long-term harm 的意思是“长期危害”，evidence 的意思是“证据”。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "困难", kind: "blank" },
  { q: "___ there any textbooks in this room?", options: ["Does", "Do", "Are", "Is"], answer: 2, explain: "Textbooks 是复数，问 Are there。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "困难", keepChoice: true },
  { q: "There ___ a useful reference library near the institute.", options: ["is", "am", "be", "are"], answer: 0, explain: "Library 是单数，用 there is。句中 the institute 的意思是“研究所”，useful 的意思是“有用的”。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "困难", keepChoice: true },
  { q: "There ___ two main arguments in this essay.", options: ["is", "be", "am", "are"], answer: 3, explain: "Two main arguments 是复数，所以用 are。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "困难", keepChoice: true },
  { q: "选择正确的选项。", options: ["There is no simple explanations for the decline.", "There are not simple explanation for the decline.", "There are no simple explanations for the decline.", "There have no simple explanations for the decline."], answer: 2, explain: "Explanations 是复数，所以用 are。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "困难", keepChoice: true },
  { q: "There ___ much uncertainty about the forecast.", options: ["are", "be", "am", "is"], answer: 3, explain: "Uncertainty 不可数，用 is。句中的 much 意思是“很多”。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "困难", keepChoice: true },
  { q: "There ___ reasons to doubt the sampling method.", options: [], answer: 0, answerText: "are", baseWord: "be 动词", sentence: "There are reasons to doubt the sampling method.", explain: "紧跟在后面的名词是 reasons，复数，即使后面还有单数短语。句中的 sampling method 意思是“抽样方法”。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "困难", kind: "blank" },
  { q: "___ there any evidence in the summary?", options: ["Is", "Does", "Do", "Are"], answer: 0, explain: "句中 the summary 的意思是“摘要”，evidence 的意思是“证据”。Evidence 不可数，所以用 Is there。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "困难", keepChoice: true },
  { q: "选择正确的选项。", options: ["Are there any comparable studies from the region?", "Are there some comparable study from the region?", "Does there any comparable studies from the region?", "Is there any comparable studies from the region?"], answer: 0, explain: "复数名词的问句用 Are there。这个句子不只是说位置，而是首先肯定或询问有没有这个事物。", difficulty: "困难", keepChoice: true },
  { q: "There ___ no errors in the final table.", options: ["is", "am", "are", "be"], answer: 2, explain: "Errors 是复数，用 there are。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "困难", keepChoice: true },
  { q: "There ___ three limitations worth noting.", options: [], answer: 0, answerText: "are", baseWord: "be 动词", sentence: "There are three limitations worth noting.", explain: "句中的 limitations 意思是“局限性”。后面的名词是 limitations，复数。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "困难", kind: "blank" },
  { q: "There ___ growing consensus that the trend is irreversible.", options: [], answer: 0, answerText: "is", baseWord: "be 动词", sentence: "There is growing consensus that the trend is irreversible.", explain: "后面的名词是 consensus，单数。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "困难", kind: "blank" },
  { q: "___ there any seats left?", options: [], answer: 0, answerText: "Are", baseWord: "be 动词", sentence: "Are there any seats left?", explain: "Seats 是复数名词，所以用 are，倒装到 there 前面。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "困难", kind: "blank" },
  { q: "___ is a post office next to the school.", options: [], answer: 0, answerText: "There", baseWord: "存在句", sentence: "There is a post office next to the school.", explain: "句中 a post office 的意思是“一间邮局”，the school 的意思是“学校”。表示存在的句型以 there 开头。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "困难", kind: "blank" },
  { q: "选择翻译最准确的选项：办公室里有一张桌子、两把椅子和一盏灯。", options: ["There is an desk, two chairs and a lamp in the office.", "There are a desks, two chairs and a lamp in the office.", "There is a desk, two chairs and a lamp in the office.", "There is a desk, two chair and a lamp in the office."], answer: 2, explain: "这句话的意思是“办公室里有一张办公桌、两把椅子和一盏灯”。there is 这个句型用来引出这些物品的存在。在这种列举里，第一个名词是 a desk（一张桌子），所以用 is 很自然。Two chairs 和 a lamp 说明了房间里其余的物品。", difficulty: "困难", keepChoice: true },
  { q: "___ there a conference room on this floor?", options: ["Is", "Are", "Do", "Does"], answer: 0, explain: "Conference room 是单数，问 Is there。句中的 a conference room 意思是“一间会议室”。在这个句型里，there 放在句首，用来引出一个事物或一组事物的存在。", difficulty: "困难", keepChoice: true },
  { q: "There ___ no information about the schedule.", options: ["are", "be", "is", "am"], answer: 2, explain: "Information 不可数，用 is。句中的 information 意思是“信息”。用 is 还是 are 由后面的名词短语决定，不由 there 决定。", difficulty: "困难", keepChoice: true },
];

// 第 19 课 Can、could 与祈使句原站题库：简单 20 题（全选择）、中等 29 题
// （24 选择 + 5 填空）、困难 25 题（20 选择 + 5 填空），共 74 题全收，无待补。
// 答案一律按答案文字定位。填空：带原站括号提示的（不要 / 转）照原样收录；
// 无括号提示的 can 类填空按简报先例用仅显示的提示词「情态动词」（baseWord），
// 题干与答案照原站原样。困难档多题与中等档同题（原站自己的跨档复用），简报中
// 标「同中等第 X 题」的解析按本站先例收录被引用题的原站解析全文。
const A1_L19_QUESTIONS: QuizQuestion[] = [
  // ---- 简单 ----
  { q: "选择正确的选项。", options: ["Closing the door.", "You close the door.", "To close the door.", "Close the door."], answer: 3, explain: "句中的 the door 意思是“门”。祈使句省略主语，以动词原形开头。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：她游泳游得很好。", options: ["She cans swim very well.", "She can to swim very well.", "She can swim very well.", "She can swiming very well."], answer: 2, explain: "can 在 she 后面保持原样，swim 用不带 to 的原形。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "简单", keepChoice: true },
  { q: "选择关于能力的问句。", options: ["Can you swim?", "Do you can swim?", "Are you can swim?", "Can you to swim?"], answer: 0, explain: "情态动词自己倒装到主语前面，不需要 do。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：今晚他不能来参加聚会。", options: ["He is can't come to the party tonight.", "He can't come to the party tonight.", "He can't to come to the party tonight.", "He cans't come to the party tonight."], answer: 1, explain: "否定形式连写是 cannot，缩写是 can't。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "简单", keepChoice: true },
  { q: "选择能力与请求帮忙都用对的句子。", options: ["I can't reach the shelf. Can you to help me?", "I can't reach the shelf. Could you help me?", "I can not reach the shelf. Could you helping me?", "I cannot to reach the shelf. Can you helps me?"], answer: 1, explain: "两个情态动词后面都跟不带 to 的动词原形。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "简单", keepChoice: true },
  { q: "选择最礼貌的请求帮忙方式。", options: ["You open the window.", "Open the window.", "Do you open the window?", "Could you open the window, please?"], answer: 3, explain: "Could you 加上 please 是礼貌的请求帮忙句式。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "简单", keepChoice: true },
  { q: "___ the instructions carefully.", options: ["Reads", "Reading", "Read", "To read"], answer: 2, explain: "句中的 carefully 意思是“仔细地”。肯定祈使句以动词原形开头。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["Could you to help me?", "Could you helping me?", "Could you helps me?", "Could you help me?"], answer: 3, explain: "could 后面是动词原形，不带 to。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：你能帮我开一下窗户吗？", options: ["Could you open the window, please?", "Could you to open the window, please?", "You Could open the window, please?", "Could you opening the window, please?"], answer: 0, explain: "Could you 是礼貌的请求帮忙句式，在这里不表示过去。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "简单", keepChoice: true },
  { q: "Please ___ the chart.", options: ["examine", "examines", "examining", "to examine"], answer: 0, explain: "句中的 the chart 意思是“图表”。祈使句里 Please 后面用原形。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：我上学前就会认字了。", options: ["I could read before I started school.", "I could to read before I started school.", "I could reading before I started school.", "I before I started school could read."], answer: 0, explain: "could 是 can 的过去式，用于过去的能力。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：我借用一下你的笔好吗？", options: ["Cans I borrow your pen for a minute?", "Can I borrow your pen for a minutes?", "Can I to borrow your pen for a minute?", "Can I borrow your pen for a minute?"], answer: 3, explain: "Can I 用来请求允许；换成 Could I 会更礼貌。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "简单", keepChoice: true },
  { q: "The program ___ process large datasets.", options: ["can to", "can", "can be", "cans"], answer: 1, explain: "句中的 datasets 意思是“数据集”。can 后面是原形，不带 to，就像 can process 一样。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "简单", keepChoice: true },
  { q: "She can ___ very well.", options: ["swimming", "swim", "to swim", "swims"], answer: 1, explain: "情态动词后面是动词原形，不带 to。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "简单", keepChoice: true },
  { q: "选择翻译最准确的选项：在红绿灯处左转，别过桥。", options: ["Turn left at the traffic lights and doesn't cross the bridge.", "Turn left at the traffics lights and don't cross the bridge.", "Turn left at the traffic lights and don't crosses the bridge.", "Turn left at the traffic lights and don't cross the bridge."], answer: 3, explain: "祈使句没有主语；否定形式在开头加 don't。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "简单", keepChoice: true },
  { q: "选择正确的选项。", options: ["He can playing the piano.", "He can to play the piano.", "He cans play the piano.", "He can play the piano."], answer: 3, explain: "情态动词不加 -s。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "简单", keepChoice: true },
  { q: "选择带礼貌邀请的祈使句。", options: ["You please sit down to.", "Sitting down.", "To sit down.", "Please sit down."], answer: 3, explain: "Please 放在祈使句开头或结尾，让语气更礼貌。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "简单", keepChoice: true },
  { q: "He ___ come to the party tonight.", options: ["can not to", "can't", "couldn't be", "doesn't can"], answer: 1, explain: "cannot 的缩写形式是 can't。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "简单", keepChoice: true },
  { q: "The robot ___ move without electricity.", options: ["cannots", "cannot", "does not can", "can not to"], answer: 1, explain: "Cannot + 动词原形 move 表示不能。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "简单", keepChoice: true },
  { q: "___ you open the document, please?", options: ["Do can", "Are", "Could", "Could to"], answer: 2, explain: "Could you ...? 是礼貌的请求帮忙句式。句中的 the document 意思是“文件”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "简单", keepChoice: true },
  // ---- 中等 ----
  { q: "The software ___ process large collections of records.", options: ["cans", "can to", "can", "can be"], answer: 2, explain: "can 后面是原形，不带 to，就像 can process 一样。句中的 the software 意思是“软件”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "___ （不要） touch the wet paint!", options: [], answer: 0, answerText: "Don't", baseWord: "不要", sentence: "Don't touch the wet paint!", explain: "否定祈使句在句首加 don't。要让听话人不做某事，否定祈使句以 don't 开头。", difficulty: "中等", kind: "blank" },
  { q: "___ the safety instructions carefully.", options: ["To read", "Read", "Reading", "Reads"], answer: 1, explain: "句中的 carefully 意思是“仔细地”。肯定祈使句以动词原形开头。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "中等", keepChoice: true },
  { q: "选择正确的选项。", options: ["To refer to Table 3 for the full breakdown.", "Referring to Table 3 for the full breakdown.", "You refer to Table 3 for the full breakdown please.", "Refer to Table 3 for the full breakdown."], answer: 3, explain: "祈使句以动词原形开头，没有主语。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "中等", keepChoice: true },
  { q: "The volunteers ___ organise the materials.", options: ["are can", "can to", "can", "cans"], answer: 2, explain: "句中的 volunteers 意思是“志愿者”。can 在单数主语和复数主语后面都不加 -s。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "Satellite data ___ reveal changes invisible from the ground.", options: [], answer: 0, answerText: "can", baseWord: "情态动词", sentence: "Satellite data can reveal changes invisible from the ground.", explain: "can 后面用动词原形，不带 to。句中的 data 意思是“数据”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", kind: "blank" },
  { q: "The drone ___ move without its battery.", options: ["cannots", "can not to", "cannot", "does not can"], answer: 2, explain: "Cannot + 动词原形 move 表示不能。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "The intern ___ use the laboratory today.", options: ["can", "is can", "cans", "can to"], answer: 0, explain: "can 在各个人称后面形式都一样，后面跟原形 use。句中 the laboratory 的意思是“实验室”，today 的意思是“今天”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "___ the findings before the presentation.", options: ["To check", "Checking", "Check", "Checks"], answer: 2, explain: "祈使句用 Check 的原形。句中 the presentation 的意思是“报告”，the findings 的意思是“研究结果”。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "中等", keepChoice: true },
  { q: "___ you check the references, please?", options: ["Are", "Do can", "Can to", "Could"], answer: 3, explain: "句中的 references 意思是“参考文献”。Could you + 动词原形是礼貌的请求帮忙句式。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "The intern ___ use the microscope today.", options: ["can to", "can", "is can", "cans"], answer: 1, explain: "句中的 today 意思是“今天”。can 在各个人称后面形式都一样，后面跟原形 use。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "___ （不要） be late for the exam.", options: [], answer: 0, answerText: "Don't", baseWord: "不要", sentence: "Don't be late for the exam.", explain: "否定祈使句里动词是 be 也仍然用 don't。要让听话人不做某事，否定祈使句以 don't 开头。", difficulty: "中等", kind: "blank" },
  { q: "___ you open the document, please?", options: ["Are", "Do can", "Could to", "Could"], answer: 3, explain: "Could you ...? 是礼貌的请求帮忙句式。句中的 the document 意思是“文件”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "The robot ___ move without electricity.", options: ["cannot", "can not to", "does not can", "cannots"], answer: 0, explain: "Cannot + 动词原形 move 表示不能。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "___ （转） left at the traffic lights.", options: [], answer: 0, answerText: "Turn", baseWord: "转", sentence: "Turn left at the traffic lights.", explain: "指路的句子用祈使句加动词原形。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "中等", kind: "blank" },
  { q: "___ quiet in the archive.", options: ["Being", "Be", "To be", "Are"], answer: 1, explain: "句中的 the archive 意思是“档案室”。祈使句可以以 Be + 形容词开头。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "中等", keepChoice: true },
  { q: "选择正确的选项。", options: ["This approach can help, but it can not replaced fieldwork.", "This approach can help, but it cannot replace fieldwork.", "This approach can to help, but it cannot to replace fieldwork.", "This approach can helps, but it cannot replaces fieldwork."], answer: 1, explain: "can 和 cannot 后面都跟动词原形。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "中等", keepChoice: true },
  { q: "___ you open the manuscript, please?", options: ["Could", "Could to", "Are", "Do can"], answer: 0, explain: "句中的 the manuscript 意思是“手稿”。Could you ...? 是礼貌的请求帮忙句式。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "They ___ attend the workshop tomorrow.", options: ["can to", "are can", "can", "cans"], answer: 2, explain: "can 在语境合适时可以表示现在或将来的能力/条件。句中 the workshop 的意思是“研讨会”，tomorrow 的意思是“明天”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "The scientist ___ explain the formula clearly.", options: ["cans", "can", "is can", "can to"], answer: 1, explain: "句中 the formula 的意思是“公式”，clearly 的意思是“清楚地”。Can + explain（动词原形）。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "The analyst ___ explain the formula clearly.", options: ["is can", "cans", "can to", "can"], answer: 3, explain: "Can + explain（动词原形）。句中 the analyst 的意思是“分析员”，the formula 的意思是“公式”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "___ share your password.", options: ["Not", "Doesn't", "Don't", "No"], answer: 2, explain: "否定祈使句的结构是 Don't + 动词原形。要让听话人不做某事，否定祈使句以 don't 开头。", difficulty: "中等", keepChoice: true },
  { q: "You ___ use this reference book.", options: ["can", "can to", "can be", "cans"], answer: 0, explain: "can 表示允许，后面跟动词原形。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "___ touch the equipment without permission.", options: ["Don't", "No", "Doesn't", "Not"], answer: 0, explain: "否定祈使句以 Don't + 动词开头。句中的 the equipment 意思是“设备”。要让听话人不做某事，否定祈使句以 don't 开头。", difficulty: "中等", keepChoice: true },
  { q: "___ the instructions carefully.", options: ["Reading", "To read", "Read", "Reads"], answer: 2, explain: "句中的 carefully 意思是“仔细地”。肯定祈使句以动词原形开头。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "中等", keepChoice: true },
  { q: "___ you help me with the presentation, please?", options: ["Are", "Do can", "Could to", "Could"], answer: 3, explain: "礼貌的请求用 Could you + 原形。句中的 the presentation 意思是“报告”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", keepChoice: true },
  { q: "___ the results before the presentation.", options: ["Checking", "Check", "Checks", "To check"], answer: 1, explain: "句中 the presentation 的意思是“报告”，the results 的意思是“结果”。祈使句用 Check 的原形。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "中等", keepChoice: true },
  { q: "Please ___ the chart.", options: ["examining", "examine", "examines", "to examine"], answer: 1, explain: "句中的 the chart 意思是“图表”。祈使句里 Please 后面用原形。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "中等", keepChoice: true },
  { q: "Even a small sample ___ reveal a strong effect.", options: [], answer: 0, answerText: "can", baseWord: "情态动词", sentence: "Even a small sample can reveal a strong effect.", explain: "句中 a strong effect 的意思是“很强的作用”，sample 的意思是“样本”。can 表示一般的能力，不随主语变化。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "中等", kind: "blank" },
  // ---- 困难 ----
  { q: "___ touch the equipment without permission.", options: ["No", "Don't", "Doesn't", "Not"], answer: 1, explain: "否定祈使句以 Don't + 动词开头。句中的 the equipment 意思是“设备”。要让听话人不做某事，否定祈使句以 don't 开头。", difficulty: "困难", keepChoice: true },
  { q: "___ （转） left at the traffic lights.", options: [], answer: 0, answerText: "Turn", baseWord: "转", sentence: "Turn left at the traffic lights.", explain: "指路的句子用祈使句加动词原形。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "困难", kind: "blank" },
  { q: "___ （不要） be late for the exam.", options: [], answer: 0, answerText: "Don't", baseWord: "不要", sentence: "Don't be late for the exam.", explain: "否定祈使句里动词是 be 也仍然用 don't。要让听话人不做某事，否定祈使句以 don't 开头。", difficulty: "困难", kind: "blank" },
  { q: "The intern ___ use the laboratory today.", options: ["can to", "is can", "can", "cans"], answer: 2, explain: "can 在各个人称后面形式都一样，后面跟原形 use。句中 the laboratory 的意思是“实验室”，today 的意思是“今天”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", keepChoice: true },
  { q: "___ share your password.", options: ["No", "Doesn't", "Don't", "Not"], answer: 2, explain: "否定祈使句的结构是 Don't + 动词原形。要让听话人不做某事，否定祈使句以 don't 开头。", difficulty: "困难", keepChoice: true },
  { q: "___ you open the manuscript, please?", options: ["Do can", "Are", "Could to", "Could"], answer: 3, explain: "句中的 the manuscript 意思是“手稿”。Could you ...? 是礼貌的请求帮忙句式。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", keepChoice: true },
  { q: "___ the safety instructions carefully.", options: ["Read", "Reading", "To read", "Reads"], answer: 0, explain: "句中的 carefully 意思是“仔细地”。肯定祈使句以动词原形开头。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "困难", keepChoice: true },
  { q: "The intern ___ use the microscope today.", options: ["can", "cans", "is can", "can to"], answer: 0, explain: "句中的 today 意思是“今天”。can 在各个人称后面形式都一样，后面跟原形 use。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", keepChoice: true },
  { q: "The scientist ___ explain the formula clearly.", options: ["can to", "cans", "is can", "can"], answer: 3, explain: "句中 the formula 的意思是“公式”，clearly 的意思是“清楚地”。Can + explain（动词原形）。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", keepChoice: true },
  { q: "___ you check the references, please?", options: ["Can to", "Do can", "Could", "Are"], answer: 2, explain: "句中的 references 意思是“参考文献”。Could you + 动词原形是礼貌的请求帮忙句式。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", keepChoice: true },
  { q: "The software ___ process large collections of records.", options: ["cans", "can to", "can", "can be"], answer: 2, explain: "can 后面是原形，不带 to，就像 can process 一样。句中的 the software 意思是“软件”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", keepChoice: true },
  { q: "选择正确的选项。", options: ["Refer to Table 3 for the full breakdown.", "You refer to Table 3 for the full breakdown please.", "To refer to Table 3 for the full breakdown.", "Referring to Table 3 for the full breakdown."], answer: 0, explain: "祈使句以动词原形开头，没有主语。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "困难", keepChoice: true },
  { q: "选择正确的选项。", options: ["This approach can helps, but it cannot replaces fieldwork.", "This approach can help, but it can not replaced fieldwork.", "This approach can help, but it cannot replace fieldwork.", "This approach can to help, but it cannot to replace fieldwork."], answer: 2, explain: "can 和 cannot 后面都跟动词原形。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "困难", keepChoice: true },
  { q: "The analyst ___ explain the formula clearly.", options: ["can", "can to", "is can", "cans"], answer: 0, explain: "Can + explain（动词原形）。句中 the analyst 的意思是“分析员”，the formula 的意思是“公式”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", keepChoice: true },
  { q: "___ quiet in the archive.", options: ["To be", "Be", "Are", "Being"], answer: 1, explain: "句中的 the archive 意思是“档案室”。祈使句可以以 Be + 形容词开头。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "困难", keepChoice: true },
  { q: "___ the findings before the presentation.", options: ["Check", "To check", "Checking", "Checks"], answer: 0, explain: "祈使句用 Check 的原形。句中 the presentation 的意思是“报告”，the findings 的意思是“研究结果”。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "困难", keepChoice: true },
  { q: "They ___ attend the workshop tomorrow.", options: ["can", "are can", "cans", "can to"], answer: 0, explain: "can 在语境合适时可以表示现在或将来的能力/条件。句中 the workshop 的意思是“研讨会”，tomorrow 的意思是“明天”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", keepChoice: true },
  { q: "You ___ use this reference book.", options: ["can to", "can be", "can", "cans"], answer: 2, explain: "can 表示允许，后面跟动词原形。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", keepChoice: true },
  { q: "The drone ___ move without its battery.", options: ["can not to", "cannot", "does not can", "cannots"], answer: 1, explain: "Cannot + 动词原形 move 表示不能。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", keepChoice: true },
  { q: "The volunteers ___ organise the materials.", options: ["are can", "cans", "can", "can to"], answer: 2, explain: "句中的 volunteers 意思是“志愿者”。can 在单数主语和复数主语后面都不加 -s。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", keepChoice: true },
  { q: "___ （不要） touch the wet paint!", options: [], answer: 0, answerText: "Don't", baseWord: "不要", sentence: "Don't touch the wet paint!", explain: "否定祈使句在句首加 don't。要让听话人不做某事，否定祈使句以 don't 开头。", difficulty: "困难", kind: "blank" },
  { q: "Satellite data ___ reveal changes invisible from the ground.", options: [], answer: 0, answerText: "can", baseWord: "情态动词", sentence: "Satellite data can reveal changes invisible from the ground.", explain: "can 后面用动词原形，不带 to。句中的 data 意思是“数据”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", kind: "blank" },
  { q: "Even a small sample ___ reveal a strong effect.", options: [], answer: 0, answerText: "can", baseWord: "情态动词", sentence: "Even a small sample can reveal a strong effect.", explain: "句中 a strong effect 的意思是“很强的作用”，sample 的意思是“样本”。can 表示一般的能力，不随主语变化。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", kind: "blank" },
  { q: "___ you help me with the presentation, please?", options: ["Could", "Could to", "Are", "Do can"], answer: 0, explain: "礼貌的请求用 Could you + 原形。句中的 the presentation 意思是“报告”。can 和 could 是情态动词；跟在它们后面的动词用不带 to 的原形。", difficulty: "困难", keepChoice: true },
  { q: "___ the results before the presentation.", options: ["To check", "Checking", "Check", "Checks"], answer: 2, explain: "句中 the presentation 的意思是“报告”，the results 的意思是“结果”。祈使句用 Check 的原形。祈使句是向听话人发出的，通常直接以动词原形开头。", difficulty: "困难", keepChoice: true },
];

function applyExtractedA1(lesson: GrammarLesson): GrammarLesson {
  if (lesson.id === "g-a2-1") {
    return { ...lesson, ...A2_REFLEXIVE };
  }
  if (lesson.id === "g-a2-2") {
    return { ...lesson, ...A2_PAST_SIMPLE };
  }
  if (lesson.id === "g-a2-3") {
    return { ...lesson, ...A2_WAS_WERE };
  }
  if (lesson.id === "g-a2-4") {
    return { ...lesson, ...A2_MOVEMENT_PREPOSITIONS };
  }
  if (lesson.id === "g-a2-5") {
    return { ...lesson, ...A2_FUTURE };
  }
  if (lesson.id === "g-a2-6") {
    return { ...lesson, ...A2_PERFECT };
  }
  if (lesson.id === "g-a2-7") {
    return { ...lesson, ...A2_OBLIGATION };
  }
  if (lesson.id === "g-a2-8") {
    return { ...lesson, ...A2_ED_ING };
  }
  if (lesson.id === "g-a2-9") {
    return { ...lesson, ...A2_ORDER };
  }
  if (lesson.id === "g-a2-10") {
    return { ...lesson, ...A2_COMPARATIVES };
  }
  if (lesson.id === "g-a2-11") {
    return { ...lesson, ...A2_SUPERLATIVES };
  }
  if (lesson.id === "g-a2-12") {
    return { ...lesson, ...A2_TOO_ENOUGH };
  }
  if (lesson.id === "g-a2-13") {
    return { ...lesson, ...A2_SO_SUCH };
  }
  if (lesson.id === "g-a2-14") {
    return { ...lesson, ...A2_LINKERS };
  }
  if (lesson.id === "g-a2-15") {
    return { ...lesson, ...A2_INDEFINITE };
  }
  if (lesson.id === "g-a2-16") {
    return { ...lesson, ...A2_QUANTIFIERS };
  }
  if (lesson.id === "g-a1-1") {
    // 第 1 课 To be & subject pronouns：测验整课换成原站原题（简单 20 + 中等 30 + 困难前 8），
    // 原有自编题已删除；困难档原站共 28 题、只提取到前 8 题，入口开放练这 8 题，
    // 并如实标注「已收 8/28 题 · 其余 20 题待补」，不用旧题充数。
    return {
      ...lesson,
      questions: A1_L1_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 30, "困难": 28 },
      partialDifficulties: ["困难"],
    };
  }
  if (lesson.id === "g-a1-2") {
    // 第 2 课 Object pronouns：理论页按原站第 2 课理论页原文逐字翻译替换，
    // 旧的部分提取内容（留空待补的对照表与常见错误）已全部删除。
    // 理论结构照原站：重点 / 公式 / 开头示例 / 主要内容 / 功能与示例 / 牢记 /
    // 句式 / 分析步骤 / 示例讲解 / 对照与自改 / 自查，与第 1 课同款模板。
    // 注意：主要内容顶部只列 3 项，功能与示例有 4 项（第 4 项「作间接宾语」
    // 不在顶部列表里），照原样保留；公式在顶部公式节与句式一节重复出现，
    // 也照原样保留两处；句式部分只有三项常见形式，不补肯定/否定/疑问/缩写小节。
    return {
      ...lesson,
      openingExample: { en: "My teacher helps us.", cn: "我的老师帮助我们。" },
      theory: [
        {
          heading: "1 · 重点",
          body: "每个人称代词有两种形式：主格（I、he、we 等）和宾格（me、him、us 等）。代词承受动词的动作或位于介词后面时，用宾格；它还能避免在下一句重复同一个名词短语。",
        },
        {
          heading: "2 · 公式",
          body: "动词 / 介词 + me / you / him / her / it / us / them",
        },
        {
          heading: "3 · 主要内容",
          body: "作动词的直接宾语 / 放在介词后面 / 避免重复已经提到的名词",
        },
        {
          heading: "4 · 功能与示例",
          body: "每个功能都配一个例句，放在语境里马上对照。",
          examples: [
            { en: "I know her. / Please open it.", cn: "我认识她。/ 请打开它。", note: "作动词的直接宾语——代词紧跟在动词后面，指受到动作影响的人或物。" },
            { en: "This letter is for you. / Come with us.", cn: "这封信是给你的。/ 跟我们来。", note: "放在介词后面——所有介词后面都必须用宾格，没有例外。" },
            { en: "I met Mai yesterday. I gave her the book.", cn: "我昨天见到了梅。我把书给了她。", note: "避免重复已经提到的名词——读者已经知道指谁的时候，用宾格代词代替名词短语。" },
            { en: "She sent me a postcard.", cn: "她寄给我一张明信片。", note: "作间接宾语——像 give、send、show 这样的动词，间接宾语指接收的人，放在直接宾语前面。" },
          ],
        },
        {
          heading: "5 · 牢记",
          body: "动词或介词后面用 me、you、him、her、it、us、them。",
        },
        {
          heading: "6 · 句式",
          body: "主要结构：动词 / 介词 + me / you / him / her / it / us / them",
          table: [
            { left: "主格–宾格对照：I / me – you / you – he / him – she / her – it / it – we / us – they / them", right: "We saw them; they did not see us.（我们看见了他们；他们没看见我们。）" },
            { left: "动词后面：主语 + 动词 + 宾语", right: "The dog follows me.（狗跟着我。）" },
            { left: "介词后面：介词 + 宾语", right: "Sit next to him.（坐在他旁边。）" },
          ],
        },
        {
          heading: "7 · 分析步骤",
          body: "",
          examples: [
            { en: "She calls me.", cn: "01 确定代词的角色——如果代词执行动作，用主格；如果接受动作或在介词后面，用宾格。（she 执行动作，me 接受动作。）" },
            { en: "listen to → listen to me", cn: "02 看代词前面紧挨着的词——前面是动词还是介词，这个位置必须用宾格。（听 → 听我说）" },
            { en: "my keys → them", cn: "03 检查所指对象的数和性——一个男人用 him，一个女人用 her，物或动物用 it，多个对象用 them。（我的钥匙 → them）" },
          ],
        },
        {
          heading: "8 · 示例讲解",
          body: "每个例子按意思、结构、语境三层来读。",
          examples: [
            { en: "My teacher helps us after every lesson.", cn: "每节课后老师都帮助我们。", note: "动词的宾语——Us 是 helps 的直接宾语；在这个位置用 we 是错的，因为 we 只作主语。" },
            { en: "Please listen to me for a moment.", cn: "请听我说一会儿。", note: "介词后面——Listen 总是和介词 to 连用，介词后面必须是宾格 me。" },
            { en: "I cannot find my keys. Have you seen them?", cn: "我找不到我的钥匙。你看见它们了吗？", note: "避免重复名词——Them 代替前一句的 my keys，所以读者不用再听一遍整个名词短语。" },
            { en: "Mum made lunch for Hoa and me.", cn: "妈妈给 Hoa 和我做了午饭。", note: "间接宾语——在 and 连接的短语里，每个成分都必须是宾格：for Hoa and me，不是 for Hoa and I。" },
            { en: "The dog is thirsty. Give it some water.", cn: "狗渴了。给它一点水。", note: "指动物、物品——It 用于动物或物品，it 的宾格和主格形式相同。" },
            { en: "She is speaking to Nam and me, so she is speaking to us.", cn: "她正在跟 Nam 和我说话，也就是说正在跟我们说话。", note: "一句里两个代词——Nam and me 合起来就是 us；两种说法都是宾格形式。" },
          ],
        },
        {
          heading: "9 · 对照与自改",
          body: "对照——一个代词容易混淆的三种形式（见下表）。自改——常见错误：",
          table: [
            { left: "she（主格）— 执行动作的人", right: "She writes well.（她写得很好。）" },
            { left: "her（宾格）— 接受动作的人或在介词后面", right: "I wrote to her.（我写信给她。）" },
            { left: "her / hers（所有格）— 表示所属关系，不是宾格", right: "This is her pen. / This pen is hers.（这是她的钢笔。/ 这支钢笔是她的。）" },
          ],
          errors: [
            { wrong: "My teacher helps we.", right: "My teacher helps us.", note: "We 只放在主语位置；动词后面必须用 us。" },
            { wrong: "This gift is for she.", right: "This gift is for her.", note: "介词 for 后面必须用宾格 her。" },
            { wrong: "Lan gave the tickets to I.", right: "Lan gave the tickets to me.", note: "学习者常以为 I 总是比 me 更正式，但介词 to 后面只有 me 是对的。" },
          ],
        },
      ],
      keyPoints: [
        "代词正在接受动作，或在介词后面",
        "用的是宾格，不是主格",
        "代词和所代替对象的数与性一致",
        "在 and 连接的短语里，所有成分都是宾格",
      ],
      // 简单档已按本轮原站重做收齐 1 道填空与 19 道选择题。
      // 困难测验本轮按原站提取内容替换（见 A1_L2_HARD_QUESTIONS）：原站共 29 题，
      // 收录 27 题，第 5、25 题选项未提全、不进题库（见下方待补清单）；
      // 困难档只用本课自己的原题、按原顺序，入口如实标注已收 27/29 题。
      // 中等档尚未提取；只显示已核实的本课题目，不从其他课程拼题。
      questions: [A1_L2_Q1_BLANK, ...A1_L2_EASY_CHOICES, ...A1_L2_HARD_QUESTIONS],
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 30, "困难": 29 },
      pendingDifficulties: ["中等"],
      partialDifficulties: ["困难"],
    };
  }
  if (lesson.id === "g-a1-3") {
    // 第 3 课 Nouns & plurals：理论与中等、困难两档测验按原站提取内容翻译替换，
    // 原有自编理论与自编题已全部移出。中等 30 题、困难 29 题全收（见 A1_L3_QUESTIONS）；
    // 简单档不动，仍只有先前提取到的 Q4、Q15 两道填空（原站共 20 题，其余选项未提全、待补）。
    return {
      ...lesson,
      openingExample: { en: "There are three children outside.", cn: "外面有三个孩子。" },
      theory: [
        {
          heading: "1 · 重点",
          body: "英语中的可数名词在表示超过一个时必须改变形式。大多数名词只需加 -s，但拼写规则会随词尾发音变化；还有一组常用名词的复数形式不规则，需要单独记忆。",
        },
        {
          heading: "2 · 公式",
          body: "book → books · box → boxes · child → children",
        },
        {
          heading: "3 · 主要内容",
          body: "表示超过一个的数量 / 泛指整类或整群事物 / 决定后面动词的形式",
        },
        {
          heading: "4 · 功能与示例",
          body: "每项功能都配有例句，可直接在语境中对照。",
          examples: [
            { en: "I have two sisters.", cn: "我有两个姐妹。", note: "表示超过一个的数量：可数名词必须有复数标记，不能像中文名词那样保持原形。" },
            { en: "Dogs are loyal animals.", cn: "狗是忠诚的动物。", note: "泛指整类或整群事物：不带冠词的复数名词可以表示一般意义上的一类事物。" },
            { en: "The boxes are heavy.", cn: "这些箱子很重。", note: "决定后面动词的形式：复数主语要搭配复数动词。" },
          ],
        },
        {
          heading: "5 · 牢记",
          body: "用 -s、-es 构成复数，同时记住不规则变化。",
        },
        {
          heading: "6 · 句式",
          body: "核心形式：book → books · box → boxes · child → children。",
          table: [
            { left: "加 -s：大多数名词", right: "book → books；table → tables" },
            { left: "加 -es：词尾为 -s、-ss、-sh、-ch、-x、-z", right: "bus → buses；watch → watches；box → boxes" },
            { left: "辅音字母 + y → -ies", right: "city → cities；baby → babies；但 boy → boys" },
            { left: "不规则：改变元音或整个词", right: "man → men；woman → women；child → children；person → people；foot → feet；tooth → teeth；mouse → mice" },
          ],
        },
        {
          heading: "7 · 分析步骤",
          body: "先确定名词可不可数，再看词尾，最后检查是否属于不规则变化。",
          examples: [
            { en: "chair → chairs；water 不变", cn: "01 只有可数名词有复数形式；water、information 不变复数。" },
            { en: "dish → dishes；story → stories", cn: "02 咝音结尾加 -es；辅音字母 + y 把 y 改为 i，再加 -es。" },
            { en: "one tooth — two teeth", cn: "03 人和身体部位等常用名词有不规则变化，要成对记忆。" },
          ],
        },
        {
          heading: "8 · 例句与讲解",
          body: "逐句从意思、结构和语境三个角度看。",
          examples: [
            { en: "She bought two notebooks and three pens.", cn: "她买了两本笔记本和三支笔。", note: "规则复数：数词大于一时，可数名词必须用复数。" },
            { en: "The buses stop in front of two churches.", cn: "公共汽车停在两座教堂前。", note: "加 -es：bus 以 -s 结尾，church 以 -ch 结尾，都要加 -es。" },
            { en: "Both cities have large libraries.", cn: "这两座城市都有大型图书馆。", note: "辅音字母 + y：city、library 都把 y 改为 i，再加 -es。" },
            { en: "There are three children outside and two women in the hall.", cn: "外面有三个孩子，大厅里有两位女士。", note: "表示人的不规则复数：child → children，woman → women，不能只加 -s。" },
            { en: "Many people walk to work in this district.", cn: "这个地区有许多人步行上班。", note: "people 是 person 的复数，要搭配复数动词。" },
            { en: "We saw two sheep and several fish in the pond.", cn: "我们在池塘里看到了两只羊和几条鱼。", note: "sheep、fish 在复数时形式不变；数量由数词表达。" },
          ],
        },
        {
          heading: "9 · 对照与自我纠错",
          body: "对照三种容易混淆的复数形式，并检查常见错误。",
          table: [
            { left: "直接加 -s：词尾易于发音", right: "cat → cats" },
            { left: "加 -es：词尾为咝音，需要增加一个元音", right: "box → boxes" },
            { left: "加 -ies：辅音字母 + y", right: "party → parties" },
          ],
          errors: [
            { wrong: "There are three childs outside.", right: "There are three children outside.", note: "child 的复数不规则，不能加 -s。" },
            { wrong: "I need two box.", right: "I need two boxes.", note: "数词大于一时，可数名词不能保持单数形式。" },
            { wrong: "Many peoples came.", right: "Many people came.", note: "people 本身是复数；peoples 只用于指多个不同民族。" },
          ],
        },
      ],
      keyPoints: [
        "这个名词可数吗？",
        "复数拼写按词尾发音对吗？",
        "是不规则变化吗？",
        "动词和名词的数一致吗？",
      ],
      questions: [A1_L3_Q4_BLANK, A1_L3_Q15_BLANK, ...A1_L3_QUESTIONS],
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 30, "困难": 29 },
      partialDifficulties: ["简单"],
    };
  }
  if (lesson.id === "g-a1-4") {
    // 第 4 课 Countable & uncountable nouns：理论与三档测验按原站提取内容翻译替换，
    // 原有自编题已移出题库。简单 20 题、中等 29 题、困难 25 题全收，无待补。
    return {
      ...lesson,
      openingExample: { en: "We need some information.", cn: "我们需要一些信息。" },
      theory: [
        {
          heading: "1 · 功能",
          body: "可数名词有单数和复数形式，可以与 a/an、数词连用；不可数名词（材料、液体、抽象概念）通常保持单数。中文里可以数的某些名词，在英语里却不可数，需要单独记忆。可数名词单数前要加 a/an；不可数名词与 some、any、much、a little 连用（a chair / some advice）；不可数名词配单数动词（The news is good.）；不可数名词用单位名词来数（two glasses of water / a piece of advice）。记住：不可数名词不加 a/an，也不加复数 -s。",
        },
        {
          heading: "2 · 形式",
          body: "公式：a chair · two chairs · some water。可数：a/an + 单数，数词 + 复数（a book / three books）；不可数：some/any/much + 单数（some water / much time）；单位：a piece/slice/bottle/kilo of + 不可数名词（a piece of furniture）；few / a few：few + 复数名词 = 几乎没有，a few = 少数、一些（Few researchers agree. / A few samples remain.）。",
        },
        {
          heading: "3 · 句中分析",
          body: "①试着用数词数一数——如果不能说「two informations」，它就是不可数（「two advices」是错的）；②去掉冠词和 -s，用 some（肯定句）或 any（否定句/疑问句）——「We need some information.」；③要数的时候加单位名词——复数落在单位名词上，主名词不变（「three pieces of luggage」）。",
        },
        {
          heading: "4 · 例句讲解",
          body: "",
          examples: [
            { en: "We need some information about the course.", cn: "我们需要一些关于这门课的信息。", note: "没有「an information」，也没有「informations」。" },
            { en: "She gave me two pieces of advice.", cn: "她给了我两条建议。", note: "advice 不可数；计数要用单位词 piece，复数 -s 加在 pieces 上。" },
            { en: "There is not much furniture in the room.", cn: "房间里的家具不多。", note: "furniture 不可数，搭配 much 和单数动词 is。" },
            { en: "I bought three chairs and a table.", cn: "我买了三把椅子和一张桌子。", note: "chair、table 可数，因此能用复数和不定冠词 a。" },
            { en: "The news is good and physics is my favourite subject.", cn: "这个消息很好，而且物理是我最喜欢的学科。", note: "news、physics 以 -s 结尾，但是不可数，配单数动词。" },
            { en: "Would you like some coffee? — Yes, two coffees, please.", cn: "要喝点咖啡吗？——好的，请来两杯。", note: "coffee 作液体时不可数，但按杯算时可数。" },
            { en: "Local knowledge of tidal patterns was more reliable than the model.", cn: "当地人对潮汐规律的认识比这个模型更可靠。", note: "knowledge 不可数，用 was 不用 were，尽管后面有复数形式的 patterns。" },
          ],
        },
        {
          heading: "5 · 对照表",
          body: "",
          table: [
            { left: "information", right: "a piece of information" },
            { left: "advice", right: "some useful advice" },
            { left: "furniture", right: "a lot of furniture" },
            { left: "luggage / equipment / homework / knowledge", right: "two items of luggage" },
          ],
        },
        {
          heading: "6 · 常见错误",
          body: "",
          errors: [
            { wrong: "We need an information.", right: "We need some information.", note: "不可数名词不加 a/an。" },
            { wrong: "He gave me many advices.", right: "He gave me a lot of advice.", note: "advice 不可数，不能加 -s，也不用 many。" },
            { wrong: "My homeworks are difficult.", right: "My homework is difficult.", note: "homework 保持单数形式，动词也用单数。" },
          ],
        },
      ],
      keyPoints: [
        "能说「two …」吗？不可数就不用 a/an、不用 -s",
        "量词与名词类型要匹配",
        "不可数名词作主语时动词用单数",
        "需要计数不可数名词时，使用单位词",
      ],
      questions: A1_L4_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 29, "困难": 25 },
    };
  }
  if (lesson.id === "g-a1-5") {
    return {
      ...lesson,
      ...CURRENT_SITE_A1_THEORY["g-a1-5"],
      titleCn: "所有格",
      intro: "所有格 ’s、物主形容词和物主代词",
      questions: A1_L5_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 30, "困难": 27 },
    };
  }
  if (lesson.id === "g-a1-6") {
    // 第 6 课 Demonstratives（指示代词）：理论与三档测验按原站提取内容翻译替换，
    // 原有自编理论与自编题已全部移出。简单 20 题、中等 28 题、困难 24 题全收
    // （见 A1_L6_QUESTIONS），无待补。标题与副标题按原站：指示代词 /
    // this / that / these / those。理论按原站实际结构：重点 / 主要结构 /
    // 开头例句 / 本课要点 / 功能与例句 / 记住 / 句型 / 例句形式 / 动词一致 /
    // 分析步骤 / 例句与讲解 / 对照表 / 常见错误 / 自查。本课要点三条是原站的
    // 静态标签，照原样作正文列出，不做成可点按钮。
    return {
      ...lesson,
      titleCn: "指示代词",
      intro: "this / that / these / those",
      openingExample: { en: "Those books are new.", cn: "那些书是新的。" },
      theory: [
        {
          heading: "1 · 重点",
          body: "指示词帮助说话人指向一个具体的对象。选哪个词同时取决于两个标准：距离（离说话人近用 this/these，远用 that/those）和数量（单数用 this/that，复数用 these/those）。",
        },
        {
          heading: "2 · 主要结构",
          body: "this/that + 单数名词；these/those + 复数名词。",
        },
        {
          heading: "3 · 本课要点",
          body: "指向面前的东西 · 在名词前作限定词 · 单独站立作代词",
        },
        {
          heading: "4 · 功能与例句",
          body: "记住：按距离远近和单复数选指示词。",
          examples: [
            { en: "This seat is free. / Those trees are tall.", cn: "指向面前的东西——this 和 these 用于手边的东西，that 和 those 用于更远的东西。" },
            { en: "I like this song.", cn: "在名词前作限定词——指示词代替冠词的位置，所以不写 this the book。" },
            { en: "These are my notes.", cn: "单独站立作代词——对象已经明确时，指示词自己作主语或宾语。" },
            { en: "This week is busy. / That was a good idea.", cn: "指回时间和刚说过的内容——this 可以指现在这段时间；that 可以指刚刚发生或刚刚提到的事。" },
          ],
        },
        {
          heading: "5 · 句型",
          body: "主要公式：this/that + 单数名词 · these/those + 复数名词。动词一致：this/that + 单数名词 + is/was；these/those + 复数名词 + are/were。",
          examples: [{ en: "Those photos were taken in Hoi An.", cn: "那些照片是在会安拍的。" }],
          table: [
            { left: "近，单数：this + 单数名词", right: "this pen" },
            { left: "近，复数：these + 复数名词", right: "these pens" },
            { left: "远，单数：that + 单数名词", right: "that building" },
            { left: "远，复数：those + 复数名词", right: "those buildings" },
          ],
        },
        {
          heading: "6 · 分析步骤",
          body: "01 确定对象离得近还是远——空间或时间上近就选 this/these 一组；远就选 that/those 一组。手里的东西 → this。02 确定对象是单数还是复数——指示词的数要和名词的数、后面的动词一致。these books are… 03 检查和动词的一致——this/that 配 is，these/those 配 are。",
          examples: [{ en: "That is new. / Those are new.", cn: "那个是新的。／那些是新的。" }],
        },
        {
          heading: "7 · 例句与讲解",
          body: "",
          examples: [
            { en: "Those books on the top shelf are new.", cn: "高架子上的那几本书是新的。", note: "远，复数——books 是复数又在远处，所以用 those，后面跟动词 are。" },
            { en: "These apples here are fresh.", cn: "这里的苹果很新鲜。", note: "近，复数——apples 是复数又在手边，所以用 these。" },
            { en: "This is my new bag.", cn: "这是我的新包。", note: "近，单数——this 单独站立作代词当主语，配 is。" },
            { en: "That house at the end of the street belongs to my uncle.", cn: "街尾那栋房子是我叔叔的。", note: "远，单数——house 是单数又在远处，所以用 that。" },
            { en: "Hello, this is Mai speaking. Is that Mr Nam?", cn: "你好，我是 Mai。请问是 Nam 先生吗？", note: "电话里自我介绍——打电话时，this 指说话人，that 指电话另一端的人。" },
            { en: "The train was late again. That happens every Monday.", cn: "火车又晚点了。这种事每个星期一都会发生。", note: "指回刚说过的事——that 指回前一句刚提到的事。" },
          ],
        },
        {
          heading: "8 · 对照表",
          body: "选指示词的两个标准：",
          table: [
            { left: "近 + 单数：this", right: "This chair is comfortable." },
            { left: "近 + 复数：these", right: "These chairs are comfortable." },
            { left: "远 + 单数：that", right: "That chair looks old." },
            { left: "远 + 复数：those", right: "Those chairs look old." },
          ],
        },
        {
          heading: "9 · 常见错误",
          body: "",
          errors: [
            { wrong: "Those book is new.", right: "Those books are new.", note: "those 要求名词复数、动词复数。" },
            { wrong: "This the pen is mine.", right: "This pen is mine.", note: "指示词已经起了限定词的作用，所以不和冠词 the 连用。" },
            { wrong: "These is my friend.", right: "This is my friend.", note: "一个人用 this；these 只用于复数。" },
          ],
        },
      ],
      keyPoints: [
        "对象离说话人近还是远",
        "后面的名词是单数还是复数",
        "动词已经和指示词一致了",
        "指示词旁边没有冠词",
        "指示词后面跟一致的动词：these/those + 复数名词配 are/were",
      ],
      questions: A1_L6_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 28, "困难": 24 },
    };
  }
  if (lesson.id === "g-a1-7") {
    // 第 7 课 Articles（冠词）：理论与三档测验按原站提取内容翻译替换，
    // 原有自编理论与自编题已全部移出。简单 20 题、中等 30 题、困难 26 题全收
    // （见 A1_L7_QUESTIONS），无待补。标题与副标题按原站：冠词 / a / an / the。
    // 理论按原站实际结构：重点 / 主要结构 / 开头例句 / 本课要点 / 功能与例句 /
    // 记住 / 句型 / 例句形式 / 分析步骤 / 例句与讲解 / 对照表 / 常见错误 / 自查。
    // 例句讲解第 3 例原站写「和越南语不一样」，按用户要求改按中文语境作
    // 「和中文的说法不一样」（与简单第 2 题解析的译法一致）。
    return {
      ...lesson,
      titleCn: "冠词",
      intro: "a / an / the",
      openingExample: { en: "I saw a dog. The dog was friendly.", cn: "我看到一只狗。那只狗很友好。" },
      theory: [
        {
          heading: "1 · 重点",
          body: "不定冠词 a/an 介绍一个新对象，还不清楚具体是哪个。定冠词 the 用于听者已经确切知道说的是哪个对象，因为它前面提过、因为只有一个、或者语境已经说清楚了。选 a 还是 an 取决于后面那个词开头的音，不取决于字母。",
        },
        {
          heading: "2 · 主要结构",
          body: "a + 开头是辅音的词；an + 开头是元音的词；the + 已确定的名词。",
        },
        {
          heading: "3 · 本课要点",
          body: "第一次介绍对象；重复提到已说过的对象；唯一或已明确的对象。",
        },
        {
          heading: "4 · 功能与例句",
          body: "记住：第一次提用 a/an，对象对说话人和听者都已确定时用 the。",
          examples: [
            { en: "I bought a book yesterday.", cn: "第一次介绍对象——a/an 配听者还不知道的可数单数名词。" },
            { en: "The book is about Hue.", cn: "重复提到已说过的对象——第二次起，对象已经确定了，改用 the。" },
            { en: "the sun / Close the door, please.", cn: "唯一或已明确的对象——只有一个这样的对象，或者听者一下子就知道是哪个时，用 the。" },
            { en: "She is an engineer.", cn: "说职业——在 to be 后面，一个人的职业总要加 a/an。" },
          ],
        },
        {
          heading: "5 · 句型",
          body: "主要公式：a + 开头是辅音的词；an + 开头是元音的词；the + 已确定的名词。",
          table: [
            { left: "a——在开头是辅音的词前面", right: "a book；a university；a one-way street" },
            { left: "an——在开头是元音的词前面", right: "an apple；an hour；an MBA" },
            { left: "the——已确定的名词，单数或复数、可数或不可数", right: "the students；the water in this glass" },
            { left: "不用冠词——复数名词或不可数名词表示泛指", right: "Dogs are loyal.；Water is essential." },
          ],
        },
        {
          heading: "6 · 分析步骤",
          body: "01 看听者对这个对象的确定程度——还不知道就用 a/an，已经知道了就用 the。a taxi → the taxi。02 听冠词后面那个词开头的音——后面的词开头是元音就选 an，哪怕首字母是辅音，比如 hour。an hour，但 a university。03 检查是不是不用冠词的情况——复数名词和不可数名词表示泛指时不用冠词。I like music.",
        },
        {
          heading: "7 · 例句与讲解",
          body: "",
          examples: [
            { en: "I saw a dog in the garden. The dog was friendly.", cn: "我在花园里看到一只狗。那只狗很友好。", note: "第一次和第二次——第一次用 a，因为听者还不知道是哪只；第二次用 the，因为对象已经确定了。" },
            { en: "He waited for an hour outside a university.", cn: "他在大学外面等了一个小时。", note: "开头的音说了算——hour 开头的音是元音，所以用 an；university 开头的音是 /j/，所以用 a。" },
            { en: "My aunt is an engineer and my uncle is a teacher.", cn: "我阿姨是工程师，我叔叔是老师。", note: "职业——一个人的职业总要配 a/an，和中文的说法不一样。" },
            { en: "The sun rises in the east.", cn: "太阳从东方升起。", note: "唯一的对象——sun 和 east 都是唯一的对象，所以总用 the。" },
            { en: "Children need sleep and fresh air.", cn: "孩子需要睡眠和新鲜空气。", note: "泛指——复数名词和不可数名词表示泛指时没有冠词。" },
            { en: "Could you turn off the light, please?", cn: "请你把灯关掉好吗？", note: "语境已经明确——两个人都知道是房间里的哪盏灯，所以第一次提就用 the。" },
          ],
        },
        {
          heading: "8 · 对照表",
          body: "a 和 an 容易选错的情况：",
          table: [
            { left: "a university；a European city", right: "首字母是元音字母，但读出来是 /j/ 音" },
            { left: "a useful tool", right: "首字母是元音字母，但读出来是 /j/ 音" },
            { left: "an hour；an honest man", right: "h 不发音，开头的音是元音" },
            { left: "an honour", right: "h 不发音，开头的音是元音" },
            { left: "an MBA；an X-ray", right: "缩写按字母名来读，开头的音是元音" },
            { left: "an MP3 file", right: "缩写按字母名来读，开头的音是元音" },
            { left: "a one-way street", right: "one 读作 /wʌn/，开头的音是辅音" },
            { left: "a one-day trip", right: "one 读作 /wʌn/，开头的音是辅音" },
          ],
        },
        {
          heading: "9 · 常见错误",
          body: "",
          errors: [
            { wrong: "I saw an university.", right: "I saw a university.", note: "university 虽然以字母 u 开头，但开头的音是 /j/，是个辅音。" },
            { wrong: "She is engineer.", right: "She is an engineer.", note: "to be 后面的单数职业必须有冠词。" },
            { wrong: "The life is beautiful.", right: "Life is beautiful.", note: "不可数名词表示泛指时不用 the。" },
          ],
        },
      ],
      keyPoints: [
        "听者知不知道这个对象",
        "紧跟在后面的词开头是元音还是辅音",
        "这个名词需不需要冠词，还是属于不用冠词的情况",
        "单数职业有没有 a/an",
      ],
      questions: A1_L7_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 30, "困难": 26 },
    };
  }
  if (lesson.id === "g-a1-8") {
    // 第 8 课理论依据当前原站页面更新；原站三档题库继续沿用已核对内容。
    return {
      ...lesson,
      ...CURRENT_SITE_A1_THEORY["g-a1-8"],
      titleCn: "some、any、much 和 many",
      intro: "some / any / much / many",
      questions: A1_L8_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 29, "困难": 25 },
    };
  }
  if (lesson.id === "g-a1-9") {
    // 第 9 课理论依据当前原站页面更新；测验仍有中等 4 题、困难 2 题待核对。
    return {
      ...lesson,
      ...CURRENT_SITE_A1_THEORY["g-a1-9"],
      titleCn: "形容词与副词",
      intro: "adjectives & adverbs",
      questions: A1_L9_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 28, "困难": 24 },
      partialDifficulties: ["中等", "困难"],
    };
  }
  if (lesson.id === "g-a1-10") {
    // 第 10 课理论依据当前原站页面更新；三档题库保持原有核对结果。
    return {
      ...lesson,
      ...CURRENT_SITE_A1_THEORY["g-a1-10"],
      titleCn: "频率副词",
      intro: "adverbs of frequency",
      questions: A1_L10_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 26, "困难": 22 },
    };
  }
  if (lesson.id === "g-a1-11") {
    // 第 11 课 Prepositions of time & place（时间地点介词）：理论与三档测验按
    // 原站提取内容翻译替换，原有自编理论与自编题已全部移出。简单 20 题、中等
    // 29 题、困难 25 题全收（见 A1_L11_QUESTIONS），无待补。标题与副标题按
    // 原站：时间地点介词 / prepositions of time & place（分类：介词）。理论按
    // 原站实际结构：重点 / 公式 / 开头示例 / 主要内容 / 功能与示例 / 牢记 /
    // 句式 / 常见形式 / 分析步骤 / 示例讲解 / 对照与自改 / 自查，与第 5–9 课的
    // 模板不同，照原样呈现。计时不动：简单填空 60 秒与站内现行一致。
    return {
      ...lesson,
      titleCn: "时间地点介词",
      intro: "prepositions of time & place",
      openingExample: { en: "The class starts at nine on Monday.", cn: "这门课星期一九点开始。" },
      theory: [
        {
          heading: "1 · 重点",
          body: "at、on、in 这三个介词占了 A1 水平介词错误的大部分。有一个通用规律帮你记住：at 用于点，on 用于线或面，in 用于范围和包围。这个规律对时间和地点都适用。",
        },
        {
          heading: "2 · 公式",
          body: "at 7 · on Monday · in July · under the table",
        },
        {
          heading: "3 · 主要内容",
          body: "具体的时间点和地点 / 日期、星期和表面 / 时间段和包围空间",
        },
        {
          heading: "4 · 功能与示例",
          body: "",
          examples: [
            { en: "at 7 o'clock；at the bus stop", cn: "具体的时间点和地点——At 与时刻连用，也与被看作地图上一个点的地点连用。" },
            { en: "on Monday；on 2 September；on the wall", cn: "日期、星期和表面——On 与星期、日期连用，也与位于一个平面上的物体连用。" },
            { en: "in July；in 2026；in the room", cn: "时间段和包围空间——In 与月份、年份、季节连用，也与有边界包围的地点连用。" },
            { en: "The cat is under the table.", cn: "相对位置——under、behind、between、next to、in front of 这些介词表示两个物体之间的位置关系。" },
            { en: "Submissions must arrive by Friday. / The index has fallen since 2008. / The experiment ran for eighteen months.", cn: "截止、起点和时长——By 表示事情必须在某个时间之前完成；since 表示事情从某个起点开始并一直持续；for 表示一段时间的长度。" },
          ],
        },
        {
          heading: "5 · 牢记",
          body: "At 表示点，on 表示日期和表面，in 表示时间段和内部空间。",
        },
        {
          heading: "6 · 句式",
          body: "公式：at 7 · on Monday · in July · under the table",
          table: [
            { left: "时间：at + 时刻 – on + 日期/星期 – in + 月份/年份/季节", right: "at 9.30；on Friday；in April" },
            { left: "地点：at + 点 – on + 表面 – in + 封闭空间", right: "at the door；on the table；in the box" },
            { left: "相对位置：under – over – behind – in front of – between – next to – opposite", right: "between the bank and the post office" },
            { left: "固定搭配：at night – in the morning – on time – at the weekend", right: "I study best at night." },
            { left: "by · since · for：by + 截止时间（在那之前或正好那时）– since + 开始的起点 – for + 一段时间的长度", right: "by the end of March；since 2008；for eighteen months" },
          ],
        },
        {
          heading: "7 · 分析步骤",
          body: "",
          examples: [
            { en: "at 7（时间）；at school（地点）", cn: "01 确定后面信息的类型——同一个介词，选择要看它后面信息的类型。" },
            { en: "at 7 → on Monday → in July", cn: "02 用点、面、范围的规律——信息越具体、越窄，越靠近 at；越宽、越包围，越靠近 in。" },
            { en: "in the afternoon，但 at night 是例外", cn: "03 记住固定搭配——At night、in the morning、on time 这些搭配要整块记住。" },
          ],
        },
        {
          heading: "8 · 示例讲解",
          body: "",
          examples: [
            { en: "The class starts at nine on Monday.", cn: "课九点开始，在星期一。", note: "时刻和星期——时刻用 at，星期用 on；两个介词出现在同一句里，不能互相代替。" },
            { en: "She was born in July 2010.", cn: "她 2010 年 7 月出生。", note: "年份和月份——月份和年份都是较长的时间段，所以用 in。" },
            { en: "The keys are on the table next to the lamp.", cn: "钥匙在桌子上，灯旁边。", note: "表面——On 表示物体在一个平面上；next to 表示相邻的位置。" },
            { en: "The children are playing in the garden.", cn: "孩子们正在花园里玩。", note: "包围空间——Garden 被理解为一个有边界的区域，所以用 in。" },
            { en: "The post office is between the bank and the market.", cn: "邮局在银行和市场之间。", note: "相对位置——Between 总是与两个参照点连用，用 and 连接。" },
            { en: "I usually read in the evening, but I never study at night.", cn: "我通常晚上看书，但从不在深夜学习。", note: "固定搭配——In the evening 符合规律，at night 是固定搭配里的例外。" },
          ],
        },
        {
          heading: "9 · 对照与自改",
          body: "对照——同一个名词，不同介词（见下表）。自改——常见错误：",
          table: [
            { left: "in the corner——房间里面的角落", right: "The desk is in the corner." },
            { left: "at the corner——街角，交叉路口", right: "Turn left at the corner." },
            { left: "on the corner——就在街角处，在街角的地面上", right: "There is a shop on the corner." },
          ],
          errors: [
            { wrong: "The class starts in nine.", right: "The class starts at nine.", note: "时刻是一个时间点，所以用 at。" },
            { wrong: "I was born on July.", right: "I was born in July.", note: "月份是较长的时间段，所以用 in；on 只与具体的日期连用。" },
            { wrong: "She lives at Hue.", right: "She lives in Hue.", note: "城市被看作包围空间，所以用 in。" },
          ],
        },
      ],
      keyPoints: [
        "介词后面的信息是点、表面还是范围",
        "时间介词和地点介词没有混用",
        "固定搭配整块使用",
        "相对位置介词带齐了所需的参照点",
      ],
      questions: A1_L11_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 29, "困难": 25 },
    };
  }
  if (lesson.id === "g-a1-12") {
    // 第 12 课理论依据当前原站页面更新；三档题库保持原有核对结果。
    return {
      ...lesson,
      ...CURRENT_SITE_A1_THEORY["g-a1-12"],
      titleCn: "一般现在时",
      intro: "present simple",
      questions: A1_L12_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 30, "困难": 27 },
    };
  }
  if (lesson.id === "g-a1-13") {
    // 第 13 课理论依据当前原站页面更新；三档题库保持原有核对结果。
    return {
      ...lesson,
      ...CURRENT_SITE_A1_THEORY["g-a1-13"],
      titleCn: "like、love 与 hate + V-ing",
      intro: "like, love & hate + V-ing",
      questions: A1_L13_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
    };
  }
  if (lesson.id === "g-a1-14") {
    // 第 14 课理论依据当前原站页面更新；三档题库保持原有核对结果。
    return {
      ...lesson,
      ...CURRENT_SITE_A1_THEORY["g-a1-14"],
      titleCn: "现在进行时",
      intro: "present continuous",
      questions: A1_L14_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 30, "困难": 30 },
    };
  }
  if (lesson.id === "g-a1-15") {
    // 第 15 课理论依据当前原站页面更新；三档题库保持原有核对结果。
    return {
      ...lesson,
      ...CURRENT_SITE_A1_THEORY["g-a1-15"],
      titleCn: "基本语序",
      intro: "basic word order",
      questions: A1_L15_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 30, "困难": 27 },
    };
  }
  if (lesson.id === "g-a1-16") {
    // 第 16 课理论依据当前原站页面更新；三档题库保持原有核对结果。
    return {
      ...lesson,
      ...CURRENT_SITE_A1_THEORY["g-a1-16"],
      titleCn: "否定句与疑问句",
      intro: "negatives & questions",
      questions: A1_L16_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 29, "困难": 24 },
    };
  }
  if (lesson.id === "g-a1-17") {
    // 第 17 课理论依据当前原站页面更新；中等题库尚有缺口。
    return {
      ...lesson,
      ...CURRENT_SITE_A1_THEORY["g-a1-17"],
      titleCn: "Wh- 疑问句",
      intro: "wh- questions",
      questions: A1_L17_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 29, "困难": 25 },
      partialDifficulties: ["中等"],
    };
  }
  if (lesson.id === "g-a1-18") {
    return {
      ...lesson,
      ...CURRENT_SITE_A1_THEORY["g-a1-18"],
      questions: A1_L18_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 30, "困难": 27 },
    };
  }
  if (lesson.id === "g-a1-19") {
    return {
      ...lesson,
      ...CURRENT_SITE_A1_THEORY["g-a1-19"],
      titleCn: "Can、could 与祈使句",
      questions: A1_L19_QUESTIONS,
      ownBankOnly: true,
      quizCounts: { "简单": 20, "中等": 29, "困难": 25 },
    };
  }
  return lesson;
}

export const GRAMMAR_101: GrammarLesson[] = GRAMMAR_101_ASSEMBLED.map(applyExtractedA1);

// ---------------- 原站选项待补清单（不进题库，提取回完整选项后再补） ----------------
// 第 1 课困难测验：共 28 题，前 8 题已提取并收录（见 A1_L1_QUESTIONS 困难段），
//   其余 20 题尚未提取，继续待补；困难档入口开放练已收的 8 题，并标注「已收 8/28 题」。
//   困难第 1 题解释的最后一句在原站被浮动按钮遮住未看到，尾句待补（已在该题解释里注明）。
// 第 1 课简单第 1 题：解释最后一句在原站被浮动按钮遮住未看到，尾句待补（已在该题解释里注明）。
// 第 2 课简单测验：已重做原站全部 20 题，1 道填空与 19 道选择题均已收录；
//   原站每次重做会重排题序，按题干与选项收录，不沿用旧的 Q 号。
// 第 3 课简单测验（原站仅提取到题干与答案，选项未给出）：
//   Q1  watch 的复数 → watches
//   Q2  person（泛指）的复数 → people
//   Q3  tooth 的复数 → teeth
//   Q5  选正确句 → Many people came to the festival.
//   Q6  越译「外面有三个孩子，大厅里有两位女士。」→ There are three children outside and two women in the hall.
//   Q7  analysis 的复数 → analyses
//   Q8  knife 的复数 → knives
//   Q9  选正确句 → He has two children.
//   Q10 选正确句 → Many people walk to work in this district.
//   Q11 The fieldwork involves many ___. → people
//   Q12 Two ___ work in the archive. → women
//   Q13 phenomenon 的复数 → phenomena
//   Q14 选正确句 → The buses stop in front of two churches.
//   Q16 选正确句 → Both cities have large libraries.
//   Q17 单复数同形的名词 → sheep
//   Q18 criterion 的复数 → criteria
//   Q19 选正确句 → The boxes are heavy.
//   Q20 选正确句 → We saw two sheep and several fish in the pond.
// 第 4 课中等测验：此前 9 道缺题干的题（原 Q5、Q11、Q13、Q15、Q18、Q20、Q21、Q23、Q26）
//   已于 2026-11-15 重做原站中等档全部找回并按题干入站，中等档 29/29 全收、无待补。
//   原站每次重做会轮换干扰项，选项集合以本次重做记录为准；此前 Q20 的选项记录
//   （much/little/many/few → a few）自相矛盾，已按本次重做的两道 new computers 题为准。
// 第 4 课困难测验：此前 7 道缺题干的题（原 Q1、Q2、Q7、Q8、Q11、Q13、Q23）
//   已于 2026-11-15 重做原站困难档全部找回并按题干入站，困难档 25/25 全收、无待补。
//   原站每次重做会轮换干扰项，多道题的选项集合与此前记录差一个干扰项，以本次
//   重做记录为准；Q 号无法与新题干唯一对应，不强行指认，按题干入站。
// 第 4 课中等第 1、10、17、25 题缺失的解析已于 2026-11-15 补回；困难第 15、21 题
//   （equipment / furniture 两道 pieces 题）缺失的解析也已于 2026-11-15 补回，
//   困难档内不再有「原站解析待补」。
// 第 4 课困难第 12 题（咖啡翻译题）：困难版选项顺序未记录，暂按中等第 9 题顺序收录。
// 第 2 课困难测验（原站共 29 题，已收录 27 题，以下 2 题完整选项未提取，不进题库）：
//   Q5  把中文翻译成英语「她正在跟 Nam 和我说话，也就是说正在跟我们说话。」
//       → 答案文字：She is speaking to us.
//       已知选项片段：A ...to we. / B ...to us. / C ...Nam and I, ...to us. / D She are speaking...
//       解析：Nam and me 合起来就是 us，都用宾格。
//   Q25 把中文翻译成英语「那个包是 Mai 的。我把它给了她。」
//       → 答案文字：...to her.（完整句未记录，只知结尾是 to her）
//       已知选项片段：A ...gave it to hers. / B ...to she. / C ...to herself. / D ...to her.
//       解析：hers 是物主代词；to 后面要接宾格 her。
// 第 9 课中等测验（原站共 28 题，已收录 24 题，以下 4 题选项未提全，不进题库）：
//   M7  The assessment is ___. → accurate
//       解析：连系动词 is 后面需要形容词 accurate 作表语。句中的 accurate 意思是“准确的”。
//       词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。原站选项待补。
//   M16 The measurement is ___. → accurate
//       解析：同 M7。原站选项待补。（不得套用简单档第 6 题的选项，各题以原站实际记录为准。）
//   M25 The analyst works ___. → carefully
//       解析：句中的 carefully 意思是“小心地”。Works 是动作动词；副词 carefully 说明
//       工作的方式。要先确定这个词是修饰名词还是修饰动作，再选择相应的形式。原站选项待补。
//   M27 The speaker talks ___. → quietly
//       解析：Talks 由方式副词 quietly 修饰。词在句中的功能决定了要填的形式，尤其是在它
//       跟在连系动词后面的时候。原站选项待补。
// 第 9 课困难测验（原站共 24 题，已收录 22 题，以下 2 题选项未提全，不进题库）：
//   H3  This is a ___ explanation of the results. → clear
//       解析：放在名词 explanation 前面修饰它，用形容词 clear。句中 the results 的意思是
//       “结果”，clear 的意思是“清楚的”。形容词通常说明人或事物的特点，而方式副词说明
//       一个动作是怎样进行的。原站选项待补。
//   H21 The assessment is ___. → accurate
//       解析：连系动词 is 后面需要形容词 accurate 作表语。句中的 accurate 意思是“准确的”。
//       词在句中的功能决定了要填的形式，尤其是在它跟在连系动词后面的时候。原站选项待补。
// 第 17 课中等测验（原站共 29 题，已收录 8 题：Q1–Q6 选择 + Q7、Q12 填空，见
//   A1_L17_QUESTIONS；以下 21 题选项未提全，不进题库）：
//   M8 ___ is the scientific symposium? — In Hanoi. → Where
//       解析：句中的 in Hanoi 意思是“在河内”。Where 用来问地点。答案或情景说明了这个问题需要的是哪一类具体信息。原站选项待补。
//   M9 ___ is your mentor? — Professor Hoa. → Who
//       解析：Who 用来问人的身份。在疑问句里，疑问词必须与要求对方提供的信息相对应。原站选项待补。
//   M10 ___ many researchers are in the team? — Eight. → How
//       解析：How many 问可数名词复数的数量。句中的 researchers 意思是“研究者们”。答案或情景说明了这个问题需要的是哪一类具体信息。原站选项待补。
//   M11 ___ does your professor teach? — Mathematics. → What
//       解析：What 问的是学科信息。句中的 mathematics 意思是“数学”。在疑问句里，疑问词必须与要求对方提供的信息相对应。原站选项待补。
//   M13 ___ is the report important? — It contains new evidence. → Why
//       解析：句中 the report 的意思是“报告”，important 的意思是“重要的”。Why 问理由。在疑问句里，疑问词必须与要求对方提供的信息相对应。原站选项待补。
//   M14 ___ does your lecturer teach? — Linguistics. → What
//       解析：What 问的是学科信息。句中 linguistics 的意思是“语言学”，lecturer 的意思是“讲师”。在疑问句里，疑问词必须与要求对方提供的信息相对应。原站选项待补。
//   M15 ___ is the new editor? — Dr Minh. → Who
//       解析：Who 问一个人的身份。在疑问句里，疑问词必须与要求对方提供的信息相对应。原站选项待补。
//   M16 ___ is the seminar? — On Friday. → When
//       解析：When 用来问时间。句中的 the seminar 意思是“研讨会”。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。原站选项待补。
//   M17 ___ is the laboratory? — On the second floor. → Where
//       解析：Where 问位置。句中 on the second floor 的意思是“在二楼”，the laboratory 的意思是“实验室”。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。原站选项待补。
//   M18 ___ much time do we have? — One hour. → How
//       解析：句中的 much 意思是“很多”。How much 问不可数名词 time 的量。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。原站选项待补。
//   M19 ___ is the institute? — On the second floor. → Where
//       解析：Where 问位置。句中 on the second floor 的意思是“在二楼”，the institute 的意思是“研究所”。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。原站选项待补。
//   M20 ___ is the new reviewer? — Dr Minh. → Who
//       解析：Who 问一个人的身份。在疑问句里，疑问词必须与要求对方提供的信息相对应。原站选项待补。
//   M21 选择翻译最准确的选项：会议上发生了什么事？ → What happened at the meeting?
//       解析：What 是主语，所以语序保持和陈述句一样，没有助动词。原站选项待补。
//   M22 ___ does the discussion start? — At nine. → When
//       解析：句中的 the discussion 意思是“讨论”。When 问时间点。答案或情景说明了这个问题需要的是哪一类具体信息。原站选项待补。
//   M23 ___ much time do we have before the meeting? — One hour. → How
//       解析：句中的 the meeting 意思是“会议”。How much 问不可数名词 time 的量。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。原站选项待补。
//   M24 ___ many investigators are in the team? — Eight. → How
//       解析：How many 问可数名词复数的数量。句中的 investigators 意思是“调查人员”。答案或情景说明了这个问题需要的是哪一类具体信息。原站选项待补。
//   M25 ___ is this book? — It is an English grammar reference. → What
//       解析：What 问的是东西的名称/种类。在疑问句里，疑问词必须与要求对方提供的信息相对应。原站选项待补。
//   M26 ___ is your research topic? — Climate change. → What
//       解析：句中的 research 意思是“研究”。What 问的是主题信息。答案或情景说明了这个问题需要的是哪一类具体信息。原站选项待补。
//   M27 ___ do you feel? — Confident. → How
//       解析：句中的 confident 意思是“自信的”。How 问状态或感受。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。原站选项待补。
//   M28 ___ is the submission deadline? — Next Monday. → When
//       解析：When 问的是时间点。疑问词决定了这个句子要找的信息方向，所以要把空格后面的内容也读完。原站选项待补。
//   M29 ___ does the meeting start? — At nine. → When
//       解析：句中的 the meeting 意思是“会议”。When 问时间点。答案或情景说明了这个问题需要的是哪一类具体信息。原站选项待补。

export function grammarByLevel101(level: CefrLevel): GrammarLesson[] {
  return GRAMMAR_101.filter((l) => l.level === level);
}

// 确定性洗牌（按种子字符串），保证同一课每次进测验的题序稳定组合一致
function seededShuffle<T>(arr: T[], seedStr: string): T[] {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    const j = seed % (i + 1);
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

export const QUIZ_COUNTS = { "简单": 20, "中等": 30, "困难": 40 } as const;

/** 本课某难度的实际题量（原站题库整课替换的课以自报题量为准） */
export function quizCountFor(lesson: GrammarLesson, difficulty: Difficulty): number {
  return lesson.quizCounts?.[difficulty] ?? QUIZ_COUNTS[difficulty];
}

/** 该难度是否因原站题目尚未提取而待补（入口置灰、不可开始） */
export function isDifficultyPending(lesson: GrammarLesson, difficulty: Difficulty): boolean {
  return lesson.pendingDifficulties?.includes(difficulty) ?? false;
}

/** 该难度是否只提取了一部分（入口开放，但须如实标注已收/总数） */
export function isDifficultyPartial(lesson: GrammarLesson, difficulty: Difficulty): boolean {
  return lesson.partialDifficulties?.includes(difficulty) ?? false;
}

/** 该难度题库里实际已收录的题数（部分收录时用于「已收 N/共 M 题」标注） */
export function collectedCountFor(lesson: GrammarLesson, difficulty: Difficulty): number {
  return lesson.questions.filter((q) => q.difficulty === difficulty).length;
}

// ---------------- 填空题（用括号里单词的正确形式填空） ----------------
// 由已有的单空选择题派生：题干只有一个 ___、正确答案是单个词时，
// 把正确答案填回句子得到完整句，括号里给出原形让学习者自己写出正确形式。

const IRREGULAR_BASE: Record<string, string> = {
  am: "be", is: "be", are: "be", was: "be", were: "be", been: "be",
  has: "have", had: "have", does: "do", did: "do", done: "do",
  went: "go", gone: "go", saw: "see", seen: "see", took: "take", taken: "take",
  gave: "give", given: "give", wrote: "write", written: "write",
  ate: "eat", eaten: "eat", drank: "drink", drunk: "drink",
  began: "begin", begun: "begin", broke: "break", broken: "break",
  chose: "choose", chosen: "choose", drove: "drive", driven: "drive",
  fell: "fall", fallen: "fall", flew: "fly", flown: "fly",
  forgot: "forget", forgotten: "forget", got: "get", grew: "grow", grown: "grow",
  knew: "know", known: "know", left: "leave", lost: "lose",
  made: "make", met: "meet", paid: "pay", ran: "run",
  said: "say", sang: "sing", sung: "sing", sat: "sit",
  sold: "sell", sent: "send", spent: "spend", spoke: "speak", spoken: "speak",
  stood: "stand", stole: "steal", stolen: "steal", swam: "swim",
  taught: "teach", thought: "think", threw: "throw", thrown: "throw",
  told: "tell", understood: "understand", wore: "wear", worn: "wear",
  won: "win", bought: "buy", brought: "bring", caught: "catch",
  felt: "feel", found: "find", heard: "hear", held: "hold",
  kept: "keep", slept: "sleep", built: "build", read: "read", meant: "mean",
  died: "die", lied: "lie", tied: "tie",
  children: "child", men: "man", women: "woman", feet: "foot", teeth: "tooth",
  people: "person", mice: "mouse", geese: "goose",
  better: "good", best: "good", worse: "bad", worst: "bad",
  more: "many", most: "many",
};

// 加 -ing / -ed 时去掉词尾 e 的常见动词词干（making→mak+e）
const E_RESTORE = new Set([
  "mak", "tak", "writ", "com", "giv", "danc", "us", "clos", "lik", "lov", "mov",
  "solv", "smil", "decid", "includ", "creat", "prepar", "arriv", "receiv", "believ",
  "achiev", "requir", "compar", "shar", "car", "wav", "sav", "serv", "improv",
  "introduc", "produc", "reduc", "invit", "promis", "surpris", "practic", "notic",
  "manag", "chang", "encourag", "advanc", "hop", "liv", "agre",
  "nic", "larg", "wid", "simpl", "saf", "brav", "lat", "fin",
]);

function undouble(stem: string): string {
  const last = stem.at(-1);
  if (stem.length < 2 || last === undefined || last !== stem.at(-2) || "aeiou".includes(last)) return stem;
  // 词干本身就是基础词（add、call、tall、pass）时双写是词自带的，不是变形双写
  if (knownBases().has(stem)) return stem;
  // ll / ss / ff 结尾多为词自带双写，拿不准时不动（后续会因词表校验放弃转换）
  if (last === "l" || last === "s" || last === "f") return stem;
  return stem.slice(0, -1);
}

// 常见基础词白名单：后缀还原出的原形必须命中词表（本站词汇目录 + 下表）才采用，
// 命中不了就放弃把这道题转成填空，避免 something→someth 这类截断错误。
const CORE_BASES = new Set([
  "go", "do", "play", "read", "write", "speak", "listen", "look", "watch", "work",
  "live", "love", "like", "make", "take", "come", "give", "help", "open", "close",
  "start", "stop", "run", "walk", "sit", "stand", "eat", "drink", "sleep", "talk",
  "ask", "answer", "call", "try", "study", "learn", "teach", "catch", "buy", "sell",
  "bring", "think", "know", "see", "hear", "feel", "find", "leave", "keep", "begin",
  "grow", "fall", "cut", "hit", "put", "set", "pay", "meet", "say", "tell", "become",
  "show", "happen", "move", "change", "follow", "build", "break", "choose", "draw",
  "drive", "forget", "hide", "ride", "ring", "sing", "swim", "throw", "wake", "wear",
  "win", "lose", "send", "spend", "mean", "wash", "brush", "pass", "miss", "cross",
  "finish", "push", "pull", "carry", "cry", "fly", "enjoy", "stay", "visit", "travel",
  "arrive", "decide", "hope", "dance", "smile", "laugh", "wait", "rain", "snow", "cook",
  "clean", "climb", "jump", "kick", "pick", "drop", "shop", "chat", "plan", "practice",
  "tall", "long", "short", "big", "small", "happy", "easy", "heavy", "busy", "early",
  "late", "fast", "slow", "hard", "soft", "warm", "cool", "cold", "hot", "new", "old",
  "young", "nice", "wide", "large", "safe", "simple", "strong", "weak", "rich", "poor",
  "full", "free", "true", "ready", "kind", "cheap", "dark", "high", "low", "deep",
  "thick", "thin", "quick", "quiet", "loud", "hungry", "tired", "careful", "difficult",
  "city", "baby", "story", "family", "party", "country", "class", "box", "glass",
  "bus", "day", "way", "boy", "toy", "key", "life", "wife", "leaf", "knife",
  "add", "call", "fill", "kill", "pull", "roll", "smell", "spell", "miss", "kiss",
  "small", "egg", "odd", "dress", "grass", "well",
]);

let knownBasesCache: Set<string> | null = null;
function knownBases(): Set<string> {
  if (knownBasesCache) return knownBasesCache;
  const s = new Set<string>(CORE_BASES);
  for (const b of Object.values(IRREGULAR_BASE)) s.add(b);
  for (const set of ALL_VOCAB_LESSONS) {
    for (const wd of set.words) {
      const w = wd.word.toLowerCase();
      s.add(w);
      const head = w.split(/\s+/)[0];
      if (head) s.add(head);
    }
  }
  knownBasesCache = s;
  return s;
}

/**
 * 由变形形式反推原形（用作填空题括号里的提示词）。
 * 还原结果必须可信：不规则表命中、双写还原、去 e 还原，或命中词表；
 * 拿不准时返回 null，调用方会放弃把这道题转成填空。
 * 没有任何变形规则命中时，答案本身就是原形，返回其小写形式。
 */
// 这些词本身不是任何词的变形（代词所有格、-er 施事名词等），转填空只会误导，直接跳过
const NO_CONVERT = new Set([
  "this", "his", "its", "yours", "hers", "ours", "theirs", "news", "always",
  "sometimes", "across", "teacher", "worker", "driver", "writer", "singer",
  "player", "speaker", "reader", "visitor", "farmer", "dancer", "manager",
  "runner", "swimmer", "winner", "letter",
]);

export function baseFormOf(form: string): string | null {
  const w = form.toLowerCase();
  if (NO_CONVERT.has(w)) return null;
  const irregular = IRREGULAR_BASE[w];
  if (irregular) return irregular;
  const known = knownBases();
  const accept = (cand: string, confident: boolean): string | null =>
    cand !== w && (confident || known.has(cand)) ? cand : null;
  if (w.endsWith("iest") && w.length > 5) return accept(`${w.slice(0, -4)}y`, false);
  if (w.endsWith("ier") && w.length > 4) return accept(`${w.slice(0, -3)}y`, false);
  if (w.endsWith("ies") && w.length > 4) return accept(`${w.slice(0, -3)}y`, false);
  if (w.endsWith("ing") && w.length > 4) {
    const stem = w.slice(0, -3);
    const doubled = undouble(stem);
    if (doubled !== stem) return accept(doubled, true);
    if (E_RESTORE.has(stem)) return accept(`${stem}e`, true);
    return accept(stem, false);
  }
  if (w.endsWith("ied") && w.length > 4) return accept(`${w.slice(0, -3)}y`, false);
  if (w.endsWith("ed") && w.length > 3) {
    const stem = w.slice(0, -2);
    const doubled = undouble(stem);
    if (doubled !== stem) return accept(doubled, true);
    if (E_RESTORE.has(stem)) return accept(`${stem}e`, true);
    return accept(stem, false);
  }
  if (w.endsWith("est") && w.length > 4) {
    const stem = w.slice(0, -3);
    const doubled = undouble(stem);
    if (doubled !== stem) return accept(doubled, true);
    if (E_RESTORE.has(stem)) return accept(`${stem}e`, true);
    return accept(stem, false);
  }
  if (w.endsWith("er") && w.length > 4) {
    const stem = w.slice(0, -2);
    const doubled = undouble(stem);
    if (doubled !== stem) return accept(doubled, true);
    if (E_RESTORE.has(stem)) return accept(`${stem}e`, true);
    return accept(stem, false);
  }
  if (/(?:s|x|ch|sh|o)es$/.test(w) && w.length > 3) return accept(w.slice(0, -2), false);
  if (w.endsWith("s") && !w.endsWith("ss") && w.length > 2) return accept(w.slice(0, -1), false);
  return w;
}

const SINGLE_TOKEN = /^[A-Za-z][A-Za-z'-]*$/;

/** 把一道单空选择题派生成填空题；不符合条件时返回 null */
export function toBlankQuestion(src: QuizQuestion): QuizQuestion | null {
  if (src.kind === "dictation" || src.kind === "blank" || src.keepChoice) return null;
  if ((src.q.match(/_{3,}/g) ?? []).length !== 1) return null;
  const answer = src.options[src.answer];
  if (!answer || !SINGLE_TOKEN.test(answer)) return null;
  const base = baseFormOf(answer);
  if (base === null) return null;
  return {
    q: `${src.q}（${base}）`,
    options: [],
    answer: 0,
    answerText: answer,
    baseWord: base,
    sentence: src.q.replace(/_{3,}/, answer),
    explain: src.explain,
    difficulty: src.difficulty,
    kind: "blank",
  };
}

/** 从词条例句派生填空题：例句里含目标词（或其变形）时，把该词挖出来作答 */
export function vocabBlankQuestion(wd: Word, difficulty: "中等" | "困难"): QuizQuestion | null {
  const example = wd.example;
  if (!example) return null;
  const phrase = wd.word.trim();
  let form: string | null = null;
  let at = -1;
  const phraseAt = example.toLowerCase().indexOf(phrase.toLowerCase());
  if (phraseAt >= 0 && phrase.length > 1) {
    form = example.slice(phraseAt, phraseAt + phrase.length);
    at = phraseAt;
  } else {
    const head = (phrase.split(/\s+/)[0] ?? "").toLowerCase();
    if (head.length < 2) return null;
    const re = /[A-Za-z][A-Za-z'-]*/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(example)) !== null) {
      const tok = m[0].toLowerCase();
      if (tok === head || tok.startsWith(head) || head.startsWith(tok)) {
        form = m[0];
        at = m.index;
        break;
      }
    }
  }
  if (form === null || at < 0) return null;
  const sentence = example;
  const blanked = `${example.slice(0, at)}___${example.slice(at + form.length)}`;
  return {
    q: `${blanked}（${wd.word}）`,
    options: [],
    answer: 0,
    answerText: form,
    baseWord: wd.word,
    sentence,
    explain: `这里填 ${form}：${wd.word}（${wd.pos}）是「${wd.meaning}」，整句的意思是「${wd.exampleCn}」。`,
    difficulty,
    kind: "blank",
  };
}

const BLANK_COUNTS = { "简单": 3, "中等": 6, "困难": 9 } as const;

/** 把一组题目从后往前把若干道可派生的选择题换成填空题（题数不变） */
function mixBlanks(qs: QuizQuestion[], want: number): QuizQuestion[] {
  const out = [...qs];
  let done = 0;
  for (let i = out.length - 1; i >= 0 && done < want; i--) {
    const src = out[i];
    if (!src) continue;
    const b = toBlankQuestion(src);
    if (b) {
      out[i] = { ...b, difficulty: src.difficulty };
      done += 1;
    }
  }
  return out;
}

export function buildGrammarQuiz(lesson: GrammarLesson, difficulty: "简单" | "中等" | "困难"): QuizQuestion[] {
  // 原站题库整课替换的课：只用本课自己的原题、按原顺序，不跨课抽题、
  // 不派生填空；待补难度返回空（入口已置灰，正常流程不会进来）。
  // 只替换了部分难度的课（如第 2 课困难档）：被替换的难度同样处理，
  // 其余难度照旧走下面的滚动抽题。
  if (lesson.ownBankOnly || lesson.ownBankDifficulties?.includes(difficulty)) {
    if (isDifficultyPending(lesson, difficulty)) return [];
    return lesson.questions.filter((q) => q.difficulty === difficulty);
  }
  const target = QUIZ_COUNTS[difficulty];
  const levelPool = grammarByLevel101(lesson.level);
  const ownIdx = levelPool.findIndex((l) => l.id === lesson.id);
  const ordered = [levelPool[ownIdx]!, ...levelPool.slice(ownIdx + 1), ...levelPool.slice(0, ownIdx)];
  const pool: QuizQuestion[] = [];
  for (const l of ordered) for (const q of l.questions) pool.push(q);
  const picked = seededShuffle(pool, `${lesson.id}-${difficulty}`).slice(0, target);
  const withDifficulty = picked.map((q) => ({ ...q, difficulty }));
  return mixBlanks(withDifficulty, BLANK_COUNTS[difficulty]);
}

export function buildGrammarPlacement(level: CefrLevel): QuizQuestion[] {
  const pool: QuizQuestion[] = [];
  for (const l of grammarByLevel101(level)) for (const q of l.questions) pool.push(q);
  return mixBlanks(seededShuffle(pool, `placement-${level}`).slice(0, 60), 10);
}

// ---------------- 词汇词池（紧凑词条） ----------------
// [词, 音标, 词性, 中文义, 常见搭配]
type CW = [string, string, string, string, string?];

function cwToWord(c: CW): Word {
  const [word, phonetic, pos, meaning, collocation] = c;
  const templates: Record<string, [string, string, string, string]> = {
    "n.": [`The ${word} is part of everyday life.`, `${meaning}是日常生活的一部分。`, `People often talk about the ${word}.`, `人们经常谈到${meaning}。`],
    "v.": [`You can ${word} in this situation.`, `在这种情况下，你可以${meaning}。`, `They often ${word} together on weekdays.`, `他们平日里经常一起${meaning}。`],
    "adj.": [`This one is ${word}.`, `这个是${meaning}的。`, `It looks ${word} to me.`, `在我看来，它显得${meaning}。`],
    "adv.": [`He finished the task ${word}.`, `他${meaning}完成了任务。`, `She spoke ${word} during the meeting.`, `她在会上${meaning}发言。`],
  };
  const t = templates[pos] ?? templates["n."]!;
  return {
    word, phonetic, pos, meaning,
    example: t[0], exampleCn: t[1], example2: t[2], example2Cn: t[3],
    ...(collocation ? { collocation } : {}),
  };
}

const ED_EXTRA: CW[] = [
  ["primary school", "/ˈpraɪməri skuːl/", "n.", "小学"], ["secondary school", "/ˈsekəndri skuːl/", "n.", "中学"], ["kindergarten", "/ˈkɪndəɡɑːtn/", "n.", "幼儿园"], ["university", "/ˌjuːnɪˈvɜːsəti/", "n.", "大学"], ["classroom", "/ˈklɑːsruːm/", "n.", "教室"], ["textbook", "/ˈtekstbʊk/", "n.", "教科书"], ["exercise book", "/ˈeksəsaɪz bʊk/", "n.", "练习本"], ["blackboard", "/ˈblækbɔːd/", "n.", "黑板"], ["headmaster", "/ˌhedˈmɑːstə(r)/", "n.", "校长"], ["pupil", "/ˈpjuːpl/", "n.", "小学生"], ["classmate", "/ˈklɑːsmeɪt/", "n.", "同班同学"], ["subject", "/ˈsʌbdʒɪkt/", "n.", "科目"], ["maths", "/mæθs/", "n.", "数学"], ["physics", "/ˈfɪzɪks/", "n.", "物理"], ["chemistry", "/ˈkemɪstri/", "n.", "化学"], ["biology", "/baɪˈɒlədʒi/", "n.", "生物"], ["geography", "/dʒiˈɒɡrəfi/", "n.", "地理"], ["history", "/ˈhɪstri ˈsʌbdʒɪkt/", "n.", "历史（科目）"], ["exam", "/ɪɡˈzæm/", "n.", "考试", "pass an exam"], ["test paper", "/test ˈpeɪpə(r)/", "n.", "试卷"], ["mark", "/mɑːk/", "n.", "分数"], ["grade", "/ɡreɪd ˈlevl/", "n.", "年级"], ["term", "/tɜːm/", "n.", "学期"], ["timetable", "/ˈtaɪmteɪbl/", "n.", "课程表"], ["break time", "/breɪk taɪm/", "n.", "课间休息"], ["homework", "/ˈhəʊmwɜːk/", "n.", "家庭作业", "do homework"], ["revision", "/rɪˈvɪʒn/", "n.", "复习", "do revision"], ["knowledge", "/ˈnɒlɪdʒ/", "n.", "知识"], ["skill", "/skɪl/", "n.", "技能"], ["ability", "/əˈbɪləti/", "n.", "能力"], ["progress", "/ˈprəʊɡres/", "n.", "进步", "make progress"], ["effort", "/ˈefət/", "n.", "努力", "make an effort"], ["practice", "/ˈpræktɪs/", "n.", "练习"], ["memory", "/ˈmeməri/", "n.", "记忆力"], ["concentration", "/ˌkɒnsnˈtreɪʃn/", "n.", "专注力"], ["motivation", "/ˌməʊtɪˈveɪʃn/", "n.", "动力"], ["curiosity", "/ˌkjʊəriˈɒsəti/", "n.", "好奇心"], ["creativity", "/ˌkriːeɪˈtɪvəti/", "n.", "创造力"], ["confidence", "/ˈkɒnfɪdəns/", "n.", "信心"], ["achievement", "/əˈtʃiːvmənt/", "n.", "成就"], ["failure", "/ˈfeɪljə(r)/", "n.", "失败"], ["success", "/səkˈses/", "n.", "成功"], ["degree", "/dɪˈɡriː/", "n.", "学位"], ["diploma", "/dɪˈpləʊmə/", "n.", "文凭"], ["certificate", "/səˈtɪfɪkət/", "n.", "证书"], ["course", "/kɔːs/", "n.", "课程"], ["lesson", "/ˈlesn/", "n.", "课时"], ["topic", "/ˈtɒpɪk/", "n.", "话题；专题"], ["chapter", "/ˈtʃæptə(r)/", "n.", "章节"], ["paragraph", "/ˈpærəɡrɑːf/", "n.", "段落"],
  ["sentence", "/ˈsentəns/", "n.", "句子"], ["vocabulary", "/vəˈkæbjələri/", "n.", "词汇"], ["grammar", "/ˈɡræmə(r)/", "n.", "语法"], ["pronunciation", "/prəˌnʌnsiˈeɪʃn/", "n.", "发音"], ["spelling", "/ˈspelɪŋ/", "n.", "拼写"], ["handwriting", "/ˈhændraɪtɪŋ/", "n.", "书写；字迹"], ["dictionary", "/ˈdɪkʃənri/", "n.", "词典", "look up in a dictionary"], ["library", "/ˈlaɪbrəri/", "n.", "图书馆"], ["laboratory", "/ləˈbɒrətri/", "n.", "实验室"], ["experiment", "/ɪkˈsperɪmənt/", "n.", "实验"], ["research", "/rɪˈsɜːtʃ/", "n.", "研究"], ["project", "/ˈprɒdʒekt wɜːk/", "n.", "课题作业"], ["presentation", "/ˌpreznˈteɪʃn/", "n.", "课堂展示"], ["discussion", "/dɪˈskʌʃn/", "n.", "讨论"], ["debate", "/dɪˈbeɪt/", "n.", "辩论"], ["essay", "/ˈeseɪ/", "n.", "短文；作文"], ["composition", "/ˌkɒmpəˈzɪʃn/", "n.", "作文"], ["question", "/ˈkwestʃən/", "n.", "问题", "ask a question"], ["answer", "/ˈɑːnsə(r)/", "n.", "答案", "answer a question"], ["mistake", "/mɪˈsteɪk/", "n.", "错误", "make a mistake"], ["example", "/ɪɡˈzɑːmpl/", "n.", "例子", "for example"], ["rule", "/ruːl/", "n.", "规则"], ["method", "/ˈmeθəd/", "n.", "方法"], ["strategy", "/ˈstrætədʒi/", "n.", "策略"], ["habit", "/ˈhæbɪt/", "n.", "习惯"], ["routine", "/ruːˈtiːn/", "n.", "日常安排"], ["goal", "/ɡəʊl/", "n.", "目标", "set a goal"], ["plan", "/plæn/", "n.", "计划", "make a plan"], ["result", "/rɪˈzʌlt/", "n.", "结果"], ["score", "/skɔː(r)/", "n.", "得分"], ["competition", "/ˌkɒmpəˈtɪʃn/", "n.", "竞赛"], ["prize", "/praɪz/", "n.", "奖品；奖项"], ["reward", "/rɪˈwɔːd/", "n.", "奖励"], ["punishment", "/ˈpʌnɪʃmənt/", "n.", "惩罚"], ["behaviour", "/bɪˈheɪvjə(r)/", "n.", "行为"], ["attendance", "/əˈtendəns/", "n.", "出勤"], ["absence", "/ˈæbsəns/", "n.", "缺席"], ["fee", "/fiː/", "n.", "费用"], ["uniform", "/ˈjuːnɪfɔːm/", "n.", "校服"], ["playground", "/ˈpleɪɡraʊnd/", "n.", "操场"], ["canteen", "/kænˈtiːn/", "n.", "食堂"], ["dormitory", "/ˈdɔːmətri/", "n.", "宿舍"], ["scholar", "/ˈskɒlə(r)/", "n.", "学者；学生"], ["tutor", "/ˈtjuːtə(r)/", "n.", "导师；家教"], ["coach", "/kəʊtʃ/", "n.", "教练"], ["principal", "/ˈprɪnsəpl/", "n.", "校长（美）"], ["professor", "/prəˈfesə(r)/", "n.", "教授"], ["lecture hall", "/ˈlektʃə hɔːl/", "n.", "讲堂"], ["seminar", "/ˈsemɪnɑː(r)/", "n.", "研讨课"], ["workshop", "/ˈwɜːkʃɒp/", "n.", "工作坊"],
  ["learn", "/lɜːn/", "v.", "学习", "learn by heart"], ["memorise", "/ˈmeməraɪz/", "v.", "记住", "memorise words"], ["revise", "/rɪˈvaɪz/", "v.", "复习"], ["practise", "/ˈpræktɪs/", "v.", "练习"], ["understand", "/ˌʌndəˈstænd/", "v.", "理解"], ["explain", "/ɪkˈspleɪn/", "v.", "解释"], ["translate", "/trænzˈleɪt/", "v.", "翻译"], ["pronounce", "/prəˈnaʊns/", "v.", "发音"], ["spell", "/spel/", "v.", "拼写"], ["attend", "/əˈtend/", "v.", "上课；出席"], ["submit", "/səbˈmɪt/", "v.", "提交", "submit an assignment"], ["fail", "/feɪl/", "v.", "不及格"], ["pass", "/pɑːs/", "v.", "通过（考试）"], ["cheat", "/tʃiːt/", "v.", "作弊"], ["concentrate", "/ˈkɒnsntreɪt/", "v.", "专心", "concentrate on"], ["improve", "/ɪmˈpruːv/", "v.", "提高"], ["educate", "/ˈedʒukeɪt/", "v.", "教育"], ["train", "/treɪn/", "v.", "训练"], ["skip", "/skɪp/", "v.", "逃课"], ["review", "/rɪˈvjuː/", "v.", "复习（笔记）"], ["academic", "/ˌækəˈdemɪk/", "adj.", "学术的；学业的"], ["educational", "/ˌedʒuˈkeɪʃənl/", "adj.", "教育的"], ["fluent", "/ˈfluːənt/", "adj.", "流利的"], ["accurate", "/ˈækjərət/", "adj.", "准确的"], ["basic", "/ˈbeɪsɪk/", "adj.", "基础的"], ["advanced", "/ədˈvɑːnst/", "adj.", "高级的"], ["difficult", "/ˈdɪfɪkəlt/", "adj.", "难的"], ["absent", "/ˈæbsənt/", "adj.", "缺席的"], ["present", "/ˈpreznt/", "adj.", "出席的"], ["online", "/ˌɒnˈlaɪn/", "adj.", "在线的", "online courses"],
];

// 其余主题的补充词池（紧凑词条，例句由模板生成；精编词在 content.ts 中带真实例句）
const TOPIC_POOLS: Record<string, CW[]> = {
  "t-health": [["vitamin", "/ˈvɪtəmɪn/", "n.", "维生素"], ["protein", "/ˈprəʊtiːn/", "n.", "蛋白质"], ["appetite", "/ˈæpɪtaɪt/", "n.", "食欲"], ["fever", "/ˈfiːvə(r)/", "n.", "发烧"], ["cough", "/kɒf/", "n./v.", "咳嗽"], ["patient", "/ˈpeɪʃnt/", "n.", "病人"], ["doctor", "/ˈdɒktə(r)/", "n.", "医生"], ["medicine", "/ˈmedsn/", "n.", "药"], ["hygiene", "/ˈhaɪdʒiːn/", "n.", "卫生"], ["sleep", "/sliːp/", "n.", "睡眠"], ["posture", "/ˈpɒstʃə(r)/", "n.", "姿势"], ["recover fully", "/rɪˈkʌvə(r)/", "v.", "康复"]],
  "t-environment": [["waste", "/weɪst/", "n.", "废弃物"], ["soil", "/sɔɪl/", "n.", "土壤"], ["ocean", "/ˈəʊʃn/", "n.", "海洋"], ["forest", "/ˈfɒrɪst/", "n.", "森林"], ["species", "/ˈspiːʃiːz/", "n.", "物种"], ["global warming", "/ˈwɔːmɪŋ/", "n.", "全球变暖"], ["protect nature", "/prəˈtekt/", "v.", "保护"], ["plant trees", "/plɑːnt/", "v.", "种植"], ["reduce waste", "/rɪˈdjuːs/", "v.", "减少"], ["natural", "/ˈnætʃrəl/", "adj.", "自然的"], ["harmful gases", "/ˈhɑːmfl/", "adj.", "有害的"], ["clean energy", "/kliːn/", "adj.", "清洁的"]],
  "t-technology": [["internet", "/ˈɪntənet/", "n.", "互联网"], ["screen", "/skriːn/", "n.", "屏幕"], ["battery", "/ˈbætəri/", "n.", "电池"], ["robot", "/ˈrəʊbɒt/", "n.", "机器人"], ["download files", "/ˌdaʊnˈləʊd/", "v.", "下载"], ["upload files", "/ˌʌpˈləʊd/", "v.", "上传"], ["connect online", "/kəˈnekt/", "v.", "连接"], ["invent", "/ɪnˈvent/", "v.", "发明"], ["smart devices", "/smɑːt/", "adj.", "智能的"], ["wireless", "/ˈwaɪələs/", "adj.", "无线的"], ["online safety", "/ˈseɪfti/", "n.", "安全"], ["password", "/ˈpɑːswɜːd/", "n.", "密码"]],
  "t-work": [["boss", "/bɒs/", "n.", "老板"], ["employee", "/ɪmˈplɔɪiː/", "n.", "雇员"], ["meeting", "/ˈmiːtɪŋ/", "n.", "会议"], ["report", "/rɪˈpɔːt/", "n.", "报告"], ["teamwork", "/ˈtiːmwɜːk/", "n.", "团队合作"], ["leadership", "/ˈliːdəʃɪp/", "n.", "领导力"], ["retire", "/rɪˈtaɪə(r)/", "v.", "退休"], ["resign", "/rɪˈzaɪn/", "v.", "辞职"], ["earn money", "/ɜːn/", "v.", "挣钱"], ["busy schedule", "/ˈbɪzi/", "adj.", "忙碌的"], ["professional", "/prəˈfeʃənl/", "adj.", "专业的"], ["part-time job", "/ˌpɑːt ˈtaɪm/", "adj.", "兼职的"]],
  "t-travel": [["ticket", "/ˈtɪkɪt/", "n.", "票"], ["hotel", "/həʊˈtel/", "n.", "酒店"], ["map", "/mæp/", "n.", "地图"], ["guide", "/ɡaɪd/", "n.", "导游；指南"], ["flight", "/flaɪt/", "n.", "航班"], ["train", "/treɪn/", "n.", "火车"], ["visit places", "/ˈvɪzɪt/", "v.", "参观"], ["book a room", "/bʊk/", "v.", "预订"], ["pack bags", "/pæk/", "v.", "打包"], ["far away", "/fɑː(r)/", "adj.", "遥远的"], ["local food", "/ˈləʊkl/", "adj.", "当地的"], ["famous sights", "/ˈfeɪməs/", "adj.", "著名的"]],
  "t-society": [["citizen", "/ˈsɪtɪzn/", "n.", "公民"], ["law rules", "/lɔː/", "n.", "法律"], ["election", "/ɪˈlekʃn/", "n.", "选举"], ["volunteer", "/ˌvɒlənˈtɪə(r)/", "n.", "志愿者"], ["charity", "/ˈtʃærəti/", "n.", "慈善"], ["elderly people", "/ˈeldəli/", "adj.", "年老的"], ["young people", "/jʌŋ/", "adj.", "年轻的"], ["crowded", "/ˈkraʊdɪd/", "adj.", "拥挤的"], ["safe", "/seɪf/", "adj.", "安全的"], ["support others", "/səˈpɔːt/", "v.", "支持"], ["vote", "/vəʊt/", "v.", "投票"], ["protest", "/ˈprəʊtest/", "n.", "抗议"]],
  "t-culture": [["festival", "/ˈfestɪvl/", "n.", "节日"], ["museum", "/mjuˈziːəm/", "n.", "博物馆"], ["theatre", "/ˈθɪətə(r)/", "n.", "剧院"], ["novel", "/ˈnɒvl/", "n.", "小说"], ["poem", "/ˈpəʊɪm/", "n.", "诗歌"], ["painting", "/ˈpeɪntɪŋ/", "n.", "绘画"], ["folk music", "/fəʊk/", "adj.", "民间的"], ["modern art", "/ˈmɒdn/", "adj.", "现代的"], ["create art", "/kriˈeɪt/", "v.", "创作"], ["perform", "/pəˈfɔːm/", "v.", "表演"], ["celebrate", "/ˈselɪbreɪt/", "v.", "庆祝"], ["heritage", "/ˈherɪtɪdʒ/", "n.", "遗产"]],
  "t-food": [["breakfast", "/ˈbrekfəst/", "n.", "早餐"], ["vegetable", "/ˈvedʒtəbl/", "n.", "蔬菜"], ["fruit", "/fruːt/", "n.", "水果"], ["meat", "/miːt/", "n.", "肉类"], ["soup", "/suːp/", "n.", "汤"], ["taste", "/teɪst/", "n./v.", "味道；品尝"], ["cook", "/kʊk/", "v.", "烹饪"], ["bake", "/beɪk/", "v.", "烘焙"], ["sweet desserts", "/swiːt/", "adj.", "甜的"], ["sour taste", "/ˈsaʊə(r)/", "adj.", "酸的"], ["healthy food", "/ˈhelθi/", "adj.", "健康的"], ["hungry feeling", "/ˈhʌŋɡri/", "adj.", "饥饿的"]],
  "t-shopping": [["shop", "/ʃɒp/", "n.", "商店"], ["price", "/praɪs/", "n.", "价格"], ["sale", "/seɪl/", "n.", "促销"], ["fashion", "/ˈfæʃn/", "n.", "时尚"], ["size", "/saɪz/", "n.", "尺码"], ["try on clothes", "/traɪ ɒn/", "v.", "试穿"], ["pay by card", "/peɪ/", "v.", "付款"], ["return goods", "/rɪˈtɜːn/", "v.", "退货"], ["expensive goods", "/ɪkˈspensɪv/", "adj.", "昂贵的"], ["cheap goods", "/tʃiːp/", "adj.", "便宜的"], ["popular brands", "/ˈpɒpjələ(r)/", "adj.", "受欢迎的"], ["online shopping", "/ˈʃɒpɪŋ/", "n.", "购物"]],
  "t-family": [["parent", "/ˈpeərənt/", "n.", "父母"], ["grandparent", "/ˈɡrænpeərənt/", "n.", "祖辈"], ["sibling", "/ˈsɪblɪŋ/", "n.", "兄弟姐妹"], ["cousin", "/ˈkʌzn/", "n.", "堂（表）兄弟姐妹"], ["household", "/ˈhaʊshəʊld/", "n.", "家庭（成员）"], ["furniture", "/ˈfɜːnɪtʃə(r)/", "n.", "家具"], ["kitchen", "/ˈkɪtʃɪn/", "n.", "厨房"], ["bedroom", "/ˈbedruːm/", "n.", "卧室"], ["garden", "/ˈɡɑːdn/", "n.", "花园"], ["neighbour", "/ˈneɪbə(r)/", "n.", "邻居"], ["chore", "/tʃɔː(r)/", "n.", "家务"], ["raise children", "/reɪz/", "v.", "养育"]],
  "t-body": [["height", "/haɪt/", "n.", "身高"], ["weight", "/weɪt/", "n.", "体重"], ["appearance", "/əˈpɪərəns/", "n.", "外貌"], ["shoulder", "/ˈʃəʊldə(r)/", "n.", "肩膀"], ["muscle", "/ˈmʌsl/", "n.", "肌肉"], ["skin", "/skɪn/", "n.", "皮肤"], ["smile", "/smaɪl/", "n./v.", "微笑"], ["tall", "/tɔːl/", "adj.", "高的"], ["slim", "/slɪm/", "adj.", "苗条的"], ["strong", "/strɒŋ/", "adj.", "强壮的"], ["young", "/jʌŋ/", "adj.", "年轻的"], ["describe", "/dɪˈskraɪb/", "v.", "描述"]],
  "t-weather": [["season", "/ˈsiːzn/", "n.", "季节"], ["temperature", "/ˈtemprətʃə(r)/", "n.", "温度"], ["forecast", "/ˈfɔːkɑːst/", "n.", "预报"], ["thunder", "/ˈθʌndə(r)/", "n.", "雷"], ["lightning", "/ˈlaɪtnɪŋ/", "n.", "闪电"], ["flood", "/flʌd/", "n.", "洪水"], ["sunny", "/ˈsʌni/", "adj.", "晴朗的"], ["cloudy", "/ˈklaʊdi/", "adj.", "多云的"], ["windy", "/ˈwɪndi/", "adj.", "多风的"], ["foggy", "/ˈfɒɡi/", "adj.", "多雾的"], ["freeze", "/friːz/", "v.", "结冰"], ["melt", "/melt/", "v.", "融化"]],
  "t-animals": [["wildlife", "/ˈwaɪldlaɪf/", "n.", "野生动物"], ["pet", "/pet/", "n.", "宠物"], ["species", "/ˈspiːʃiːz/", "n.", "物种"], ["insect", "/ˈɪnsekt/", "n.", "昆虫"], ["bird", "/bɜːd/", "n.", "鸟"], ["fish", "/fɪʃ/", "n.", "鱼"], ["feed", "/fiːd/", "v.", "喂养"], ["hunt", "/hʌnt/", "v.", "捕猎"], ["wild", "/waɪld/", "adj.", "野生的"], ["rare", "/reə(r)/", "adj.", "稀有的"], ["dangerous", "/ˈdeɪndʒərəs/", "adj.", "危险的"], ["nature reserve", "/rɪˈzɜːv/", "n.", "自然保护区"]],
  "t-sports": [["football", "/ˈfʊtbɔːl/", "n.", "足球"], ["swimming", "/ˈswɪmɪŋ/", "n.", "游泳"], ["running", "/ˈrʌnɪŋ/", "n.", "跑步"], ["athlete", "/ˈæθliːt/", "n.", "运动员"], ["champion", "/ˈtʃæmpiən/", "n.", "冠军"], ["competition", "/ˌkɒmpəˈtɪʃn/", "n.", "比赛"], ["exercise", "/ˈeksəsaɪz/", "n.", "锻炼"], ["train", "/treɪn/", "v.", "训练"], ["win", "/wɪn/", "v.", "获胜"], ["team spirit", "/tiːm/", "n.", "团队"], ["stadium", "/ˈsteɪdiəm/", "n.", "体育场"], ["hobby", "/ˈhɒbi/", "n.", "爱好"]],
  "t-arts": [["musician", "/mjuˈzɪʃn/", "n.", "音乐家"], ["instrument", "/ˈɪnstrəmənt/", "n.", "乐器"], ["concert", "/ˈkɒnsət/", "n.", "音乐会"], ["melody", "/ˈmelədi/", "n.", "旋律"], ["rhythm", "/ˈrɪðəm/", "n.", "节奏"], ["sculpture", "/ˈskʌlptʃə(r)/", "n.", "雕塑"], ["gallery", "/ˈɡæləri/", "n.", "画廊"], ["draw", "/drɔː/", "v.", "画画"], ["sing", "/sɪŋ/", "v.", "唱歌"], ["dance", "/dɑːns/", "v./n.", "跳舞"], ["creative", "/kriˈeɪtɪv/", "adj.", "有创意的"], ["classical music", "/ˈklæsɪkl/", "adj.", "古典的"]],
  "t-movies": [["actor", "/ˈæktə(r)/", "n.", "演员"], ["director", "/daɪˈrektə(r)/", "n.", "导演"], ["scene", "/siːn/", "n.", "场景"], ["subtitle", "/ˈsʌbtaɪtl/", "n.", "字幕"], ["audience", "/ˈɔːdiəns/", "n.", "观众"], ["comedy", "/ˈkɒmədi/", "n.", "喜剧"], ["documentary", "/ˌdɒkjuˈmentri/", "n.", "纪录片"], ["animation", "/ˌænɪˈmeɪʃn/", "n.", "动画"], ["review", "/rɪˈvjuː/", "n.", "影评"], ["streaming", "/ˈstriːmɪŋ/", "n.", "流媒体"], ["episode", "/ˈepɪsəʊd/", "n.", "（剧）集"], ["character", "/ˈkærəktə(r)/", "n.", "角色"]],
  "t-farming": [["farmer", "/ˈfɑːmə(r)/", "n.", "农民"], ["crop", "/krɒp/", "n.", "庄稼"], ["harvest", "/ˈhɑːvɪst/", "n.", "收获"], ["field", "/fiːld/", "n.", "田地"], ["village", "/ˈvɪlɪdʒ/", "n.", "村庄"], ["cattle", "/ˈkætl/", "n.", "牛群"], ["seed", "/siːd/", "n.", "种子"], ["grow", "/ɡrəʊ/", "v.", "种植"], ["irrigation", "/ˌɪrɪˈɡeɪʃn/", "n.", "灌溉"], ["organic", "/ɔːˈɡænɪk/", "adj.", "有机的"], ["rural", "/ˈrʊərəl/", "adj.", "乡村的"], ["soil", "/sɔɪl/", "n.", "土壤"]],
  "t-law": [["court", "/kɔːt/", "n.", "法庭"], ["judge", "/dʒʌdʒ/", "n.", "法官"], ["lawyer", "/ˈlɔɪə(r)/", "n.", "律师"], ["prison", "/ˈprɪzn/", "n.", "监狱"], ["evidence", "/ˈevɪdəns/", "n.", "证据"], ["rights", "/raɪts/", "n.", "权利"], ["policy", "/ˈpɒləsi/", "n.", "政策"], ["tax", "/tæks/", "n.", "税"], ["illegal", "/ɪˈliːɡl/", "adj.", "非法的"], ["fair", "/feə(r)/", "adj.", "公正的"], ["punish", "/ˈpʌnɪʃ/", "v.", "惩罚"], ["obey", "/əˈbeɪ/", "v.", "遵守"]],
  "t-economy": [["market", "/ˈmɑːkɪt/", "n.", "市场"], ["trade", "/treɪd/", "n.", "贸易"], ["industry", "/ˈɪndəstri/", "n.", "工业"], ["investment", "/ɪnˈvestmənt/", "n.", "投资"], ["profit", "/ˈprɒfɪt/", "n.", "利润"], ["budget plan", "/ˈbʌdʒɪt/", "n.", "预算"], ["consumer", "/kənˈsjuːmə(r)/", "n.", "消费者"], ["produce", "/prəˈdjuːs/", "v.", "生产"], ["export", "/ɪkˈspɔːt/", "v.", "出口"], ["import", "/ɪmˈpɔːt/", "v.", "进口"], ["economic growth", "/ˌiːkəˈnɒmɪk/", "adj.", "经济的"], ["unemployment", "/ˌʌnɪmˈplɔɪmənt/", "n.", "失业"]],
  "t-science": [["scientist", "/ˈsaɪəntɪst/", "n.", "科学家"], ["theory", "/ˈθɪəri/", "n.", "理论"], ["evidence", "/ˈevɪdəns/", "n.", "证据"], ["discovery", "/dɪˈskʌvəri/", "n.", "发现"], ["invention", "/ɪnˈvenʃn/", "n.", "发明"], ["energy sci", "/ˈenədʒi/", "n.", "能量"], ["gravity", "/ˈɡrævəti/", "n.", "重力"], ["observe", "/əbˈzɜːv/", "v.", "观察"], ["measure", "/ˈmeʒə(r)/", "v.", "测量"], ["accurate", "/ˈækjərət/", "adj.", "准确的"], ["complex", "/ˈkɒmpleks/", "adj.", "复杂的"], ["data analysis", "/ˈdeɪtə/", "n.", "数据"]],
  "t-history": [["century", "/ˈsentʃəri/", "n.", "世纪"], ["ancient times", "/ˈeɪnʃənt/", "adj.", "古代的"], ["empire", "/ˈempaɪə(r)/", "n.", "帝国"], ["revolution", "/ˌrevəˈluːʃn/", "n.", "革命"], ["war", "/wɔː(r)/", "n.", "战争"], ["peace", "/piːs/", "n.", "和平"], ["continent", "/ˈkɒntɪnənt/", "n.", "大陆"], ["border", "/ˈbɔːdə(r)/", "n.", "边界"], ["capital", "/ˈkæpɪtl/", "n.", "首都"], ["landmark", "/ˈlændmɑːk/", "n.", "地标"], ["explore", "/ɪkˈsplɔː(r)/", "v.", "探索"], ["independent", "/ˌɪndɪˈpendənt/", "adj.", "独立的"]],
  "t-emotions": [["emotion", "/ɪˈməʊʃn/", "n.", "情绪"], ["personality", "/ˌpɜːsəˈnæləti/", "n.", "性格"], ["confidence", "/ˈkɒnfɪdəns/", "n.", "自信"], ["anxiety", "/æŋˈzaɪəti/", "n.", "焦虑"], ["joy", "/dʒɔɪ/", "n.", "喜悦"], ["anger", "/ˈæŋɡə(r)/", "n.", "愤怒"], ["cheerful", "/ˈtʃɪəfl/", "adj.", "开朗的"], ["shy", "/ʃaɪ/", "adj.", "害羞的"], ["generous", "/ˈdʒenərəs/", "adj.", "慷慨的"], ["honest", "/ˈɒnɪst/", "adj.", "诚实的"], ["calm", "/kɑːm/", "v.", "冷静下来"], ["express", "/ɪkˈspres/", "v.", "表达"]],
  "t-communication": [["conversation", "/ˌkɒnvəˈseɪʃn/", "n.", "对话"], ["message", "/ˈmesɪdʒ/", "n.", "消息"], ["opinion", "/əˈpɪnjən/", "n.", "观点"], ["argument", "/ˈɑːɡjumənt/", "n.", "争论"], ["greeting", "/ˈɡriːtɪŋ/", "n.", "问候"], ["polite", "/pəˈlaɪt/", "adj.", "礼貌的"], ["formal", "/ˈfɔːml/", "adj.", "正式的"], ["discuss", "/dɪˈskʌs/", "v.", "讨论"], ["persuade", "/pəˈsweɪd/", "v.", "说服"], ["negotiate", "/nɪˈɡəʊʃieɪt/", "v.", "协商"], ["announce", "/əˈnaʊns/", "v.", "宣布"], ["body language", "/ˈlæŋɡwɪdʒ/", "n.", "语言；肢体语言"]],
  "t-internet": [["social media", "/ˈsəʊʃl ˈmiːdiə/", "n.", "社交媒体"], ["follower", "/ˈfɒləʊə(r)/", "n.", "粉丝"], ["influencer", "/ˈɪnfluənsə(r)/", "n.", "网红"], ["viral", "/ˈvaɪrəl/", "adj.", "爆红的"], ["comment", "/ˈkɒment/", "n.", "评论"], ["share", "/ʃeə(r)/", "v.", "分享"], ["post", "/pəʊst/", "v.", "发帖"], ["account", "/əˈkaʊnt/", "n.", "账号"], ["platform", "/ˈplætfɔːm/", "n.", "平台"], ["content", "/ˈkɒntent/", "n.", "内容"], ["community", "/kəˈmjuːnəti/", "n.", "网络社区"], ["advertising", "/ˈædvətaɪzɪŋ/", "n.", "广告"]],
};

export const TOPIC_DEFS: { id: string; cn: string; en: string; emoji: string }[] = [
  { id: "t-education", cn: "教育与学习", en: "Education & Learning", emoji: "🎓" },
  { id: "t-health", cn: "健康与身心福祉", en: "Health & Well-being", emoji: "❤️" },
  { id: "t-environment", cn: "环境与气候", en: "Environment & Climate", emoji: "🌍" },
  { id: "t-technology", cn: "科技与数字生活", en: "Technology & Digital Life", emoji: "💻" },
  { id: "t-work", cn: "工作与就业", en: "Work & Employment", emoji: "💼" },
  { id: "t-travel", cn: "交通与出行", en: "Transport & Mobility", emoji: "🚆" },
  { id: "t-society", cn: "城市与都市生活", en: "Cities & Urban Life", emoji: "🏙️" },
  { id: "t-culture", cn: "媒体与广告", en: "Media & Advertising", emoji: "📰" },
  { id: "t-food", cn: "食物与烹饪", en: "Food & Cooking", emoji: "🍜" },
  { id: "t-shopping", cn: "购物与金钱", en: "Shopping & Money", emoji: "🛍️" },
  { id: "t-family", cn: "家庭与儿童", en: "Family & Children", emoji: "🏠" },
  { id: "t-body", cn: "身体与外貌", en: "Body & Appearance", emoji: "🧍" },
  { id: "t-weather", cn: "天气与季节", en: "Weather & Seasons", emoji: "🌦️" },
  { id: "t-animals", cn: "动物与自然", en: "Animals & Nature", emoji: "🦁" },
  { id: "t-sports", cn: "运动与休闲", en: "Sports & Leisure", emoji: "⚽" },
  { id: "t-arts", cn: "文化与遗产", en: "Culture & Heritage", emoji: "🎨" },
  { id: "t-globalisation", cn: "全球化与贸易", en: "Globalisation & Trade", emoji: "🌐" },
  { id: "t-movies", cn: "电影与娱乐", en: "Movies & Entertainment", emoji: "🎬" },
  { id: "t-farming", cn: "农业与乡村", en: "Farming & Countryside", emoji: "🌾" },
  { id: "t-law", cn: "犯罪与司法", en: "Crime & Justice", emoji: "⚖️" },
  { id: "t-economy", cn: "经济与消费", en: "Economy & Consumerism", emoji: "📈" },
  { id: "t-science", cn: "科学与研究", en: "Science & Research", emoji: "🔬" },
  { id: "t-history", cn: "政府与政策", en: "Government & Policy", emoji: "🏛️" },
  { id: "t-emotions", cn: "情感与性格", en: "Feelings & Personality", emoji: "😊" },
  { id: "t-communication", cn: "日常沟通", en: "Communication", emoji: "💬" },
  { id: "t-internet", cn: "互联网与社交", en: "Internet & Social Media", emoji: "📱" },
];

const TOPIC_WEIGHTS = [10, 12, 14, 16, 18, 20, 22, 24, 28, 36];

function buildTopicLessons(): VocabSet[] {
  const out: VocabSet[] = [];
  for (const def of TOPIC_DEFS) {
    const base = BASE_TOPICS.find((s) => s.id === def.id);
    const pool: Word[] = [
      ...(base?.words ?? []),
      ...(def.id === "t-education" ? ED_EXTRA.map(cwToWord) : []),
      ...((TOPIC_POOLS[def.id] ?? []).map(cwToWord)),
    ];
    if (pool.length === 0) continue;
    let cursor = 0;
    for (let i = 0; i < 10; i++) {
      const size = Math.max(2, Math.min(pool.length, Math.round((pool.length * (TOPIC_WEIGHTS[i] ?? 10)) / 200)));
      const words: Word[] = [];
      for (let k = 0; k < size; k++) {
        const wd = pool[(cursor + k) % pool.length];
        if (wd) words.push(wd);
      }
      cursor += size;
      out.push({
        id: `${def.id}-${i + 1}`,
        kind: "vocab-topic",
        titleCn: `${def.cn} · 第 ${i + 1} 课`,
        titleEn: `${def.en} Lesson ${i + 1}`,
        blurb: `${def.cn}主题第 ${i + 1} 课，共 ${words.length} 个词。先学完词卡，再解锁练习、听写与发音。`,
        words,
      });
    }
  }
  return out;
}

export const TOPIC_LESSONS: VocabSet[] = buildTopicLessons();

for (const [index, sourceWords] of [EDUCATION_FIRST_LESSON, EDUCATION_SECOND_LESSON, EDUCATION_THIRD_LESSON, EDUCATION_FOURTH_LESSON, EDUCATION_FIFTH_LESSON, EDUCATION_SIXTH_LESSON, EDUCATION_SEVENTH_LESSON, EDUCATION_EIGHTH_LESSON, EDUCATION_NINTH_LESSON, EDUCATION_TENTH_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-education-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `教育与学习主题第 ${index + 1} 课：${sourceWords.length} 张原站词卡，释义与用法已译成中文。练习、听写和发音题目仍待逐项核对。`;
  set.extracted = {
    practiceEasy: [],
    dictationWords: [],
    cardsXp: 35,
    practiceXp: 50,
    dictationXp: 50,
    totalStars: 10,
  };
}

for (const [index, sourceWords] of [WORK_FIRST_LESSON, WORK_SECOND_LESSON, WORK_THIRD_LESSON, WORK_FOURTH_LESSON, WORK_FIFTH_LESSON, WORK_SIXTH_LESSON, WORK_SEVENTH_LESSON, WORK_EIGHTH_LESSON, WORK_NINTH_LESSON, WORK_TENTH_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-work-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `工作与就业主题第 ${index + 1} 课，共 ${sourceWords.length} 个词。先学完词卡，再解锁练习、听写与发音。`;
}

for (const [index, sourceWords] of [HEALTH_FIRST_LESSON, HEALTH_SECOND_LESSON, HEALTH_THIRD_LESSON, HEALTH_FOURTH_LESSON, HEALTH_FIFTH_LESSON, HEALTH_SIXTH_LESSON, HEALTH_SEVENTH_LESSON, HEALTH_EIGHTH_LESSON, HEALTH_NINTH_LESSON, HEALTH_TENTH_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-health-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `健康与身心福祉主题第 ${index + 1} 课，共 ${sourceWords.length} 个词。先学完词卡，再解锁练习、听写与发音。`;
}

for (const [index, sourceWords] of [ENVIRONMENT_FIRST_LESSON, ENVIRONMENT_SECOND_LESSON, ENVIRONMENT_THIRD_LESSON, ENVIRONMENT_FOURTH_LESSON, ENVIRONMENT_FIFTH_LESSON, ENVIRONMENT_SIXTH_LESSON, ENVIRONMENT_SEVENTH_LESSON, ENVIRONMENT_EIGHTH_LESSON, ENVIRONMENT_NINTH_LESSON, ENVIRONMENT_TENTH_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-environment-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `环境与气候主题第 ${index + 1} 课，共 ${sourceWords.length} 个词。先学完词卡，再解锁练习、听写与发音。`;
}

for (const [index, sourceWords] of [TECHNOLOGY_FIRST_LESSON, TECHNOLOGY_SECOND_LESSON, TECHNOLOGY_THIRD_LESSON, TECHNOLOGY_FOURTH_LESSON, TECHNOLOGY_FIFTH_LESSON, TECHNOLOGY_SIXTH_LESSON, TECHNOLOGY_SEVENTH_LESSON, TECHNOLOGY_EIGHTH_LESSON, TECHNOLOGY_NINTH_LESSON, TECHNOLOGY_TENTH_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-technology-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `科技与数字生活主题第 ${index + 1} 课，共 ${sourceWords.length} 个词。先学完词卡，再解锁练习、听写与发音。`;
}

for (const [index, sourceWords] of [ECONOMY_FIRST_LESSON, ECONOMY_SECOND_LESSON, ECONOMY_THIRD_LESSON, ECONOMY_FOURTH_LESSON, ECONOMY_FIFTH_LESSON, ECONOMY_SIXTH_LESSON, ECONOMY_SEVENTH_LESSON, ECONOMY_EIGHTH_LESSON, ECONOMY_NINTH_LESSON, ECONOMY_TENTH_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-economy-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `经济与消费主题第 ${index + 1} 课，共 ${sourceWords.length} 个词。先学完词卡，再解锁练习、听写与发音。`;
}

for (const [index, sourceWords] of [SCIENCE_FIRST_LESSON, SCIENCE_SECOND_LESSON, SCIENCE_THIRD_LESSON, SCIENCE_FOURTH_LESSON, SCIENCE_FIFTH_LESSON, SCIENCE_SIXTH_LESSON, SCIENCE_SEVENTH_LESSON, SCIENCE_EIGHTH_LESSON, SCIENCE_NINTH_LESSON, SCIENCE_TENTH_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-science-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `科学与研究主题第 ${index + 1} 课，共 ${sourceWords.length} 个词。先学完词卡，再解锁练习、听写与发音。`;
}

for (const [index, sourceWords] of [CITIES_FIRST_LESSON, CITIES_SECOND_LESSON, CITIES_THIRD_LESSON, CITIES_FOURTH_LESSON, CITIES_FIFTH_LESSON, CITIES_SIXTH_LESSON, CITIES_SEVENTH_LESSON, CITIES_EIGHTH_LESSON, CITIES_NINTH_LESSON, CITIES_TENTH_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-society-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `城市与都市生活主题第 ${index + 1} 课，共 ${sourceWords.length} 个词。先学完词卡，再解锁练习、听写与发音。`;
}

for (const [index, sourceWords] of [TRANSPORT_FIRST_LESSON, TRANSPORT_SECOND_LESSON, TRANSPORT_THIRD_LESSON, TRANSPORT_FOURTH_LESSON, TRANSPORT_FIFTH_LESSON, TRANSPORT_SIXTH_LESSON, TRANSPORT_SEVENTH_LESSON, TRANSPORT_EIGHTH_LESSON, TRANSPORT_NINTH_LESSON, TRANSPORT_TENTH_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-travel-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `交通与出行主题第 ${index + 1} 课，共 ${sourceWords.length} 个词。先学完词卡，再解锁练习、听写与发音。`;
}

for (const [index, sourceWords] of [CRIME_FIRST_LESSON, CRIME_SECOND_LESSON, CRIME_THIRD_LESSON, CRIME_FOURTH_LESSON, CRIME_FIFTH_LESSON, CRIME_SIXTH_LESSON, CRIME_SEVENTH_LESSON, CRIME_EIGHTH_LESSON, CRIME_NINTH_LESSON, CRIME_TENTH_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-law-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `犯罪与司法主题第 ${index + 1} 课，共 ${sourceWords.length} 个词。先学完词卡，再解锁练习、听写与发音。`;
}

for (const [index, sourceWords] of [GOVERNMENT_FIRST_LESSON, GOVERNMENT_SECOND_LESSON, GOVERNMENT_THIRD_LESSON, GOVERNMENT_FOURTH_LESSON, GOVERNMENT_FIFTH_LESSON, GOVERNMENT_SIXTH_LESSON, GOVERNMENT_SEVENTH_LESSON, GOVERNMENT_EIGHTH_LESSON, GOVERNMENT_NINTH_LESSON, GOVERNMENT_TENTH_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-history-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `政府与政策主题第 ${index + 1} 课，共 ${sourceWords.length} 张原站导出词卡。其余课程词卡仍待替换。`;
}

for (const [index, sourceWords] of [MEDIA_FIRST_LESSON, MEDIA_SECOND_LESSON, MEDIA_THIRD_LESSON, MEDIA_FOURTH_LESSON, MEDIA_FIFTH_LESSON, MEDIA_SIXTH_LESSON, MEDIA_SEVENTH_LESSON, MEDIA_EIGHTH_LESSON, MEDIA_NINTH_LESSON, MEDIA_TENTH_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-culture-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `媒体与广告主题第 ${index + 1} 课，共 ${sourceWords.length} 张原站导出词卡。其余课程词卡仍待替换。`;
}

for (const [index, sourceWords] of [CULTURE_FIRST_LESSON, CULTURE_SECOND_LESSON, CULTURE_THIRD_LESSON, CULTURE_FOURTH_LESSON, CULTURE_FIFTH_LESSON, CULTURE_SIXTH_LESSON, CULTURE_SEVENTH_LESSON, CULTURE_EIGHTH_LESSON, CULTURE_NINTH_LESSON, CULTURE_TENTH_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-arts-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `文化与遗产主题第 ${index + 1} 课，共 ${sourceWords.length} 张原站导出词卡。其余课程词卡仍待替换。`;
}

for (const [index, sourceWords] of [GLOBALISATION_FIRST_LESSON, GLOBALISATION_SECOND_LESSON, GLOBALISATION_THIRD_LESSON, GLOBALISATION_FOURTH_LESSON, GLOBALISATION_FIFTH_LESSON, GLOBALISATION_SIXTH_LESSON, GLOBALISATION_SEVENTH_LESSON, GLOBALISATION_EIGHTH_LESSON, GLOBALISATION_NINTH_LESSON, GLOBALISATION_TENTH_LESSON].entries()) {
  TOPIC_LESSONS.push({
    id: `t-globalisation-${index + 1}`,
    kind: "vocab-topic",
    titleCn: `全球化与贸易 · 第 ${index + 1} 课`,
    titleEn: `Globalisation & Trade Lesson ${index + 1}`,
    blurb: `全球化与贸易主题第 ${index + 1} 课，共 ${sourceWords.length} 张原站导出词卡。`,
    words: sourceWords.map(originalTopicToWord),
  });
}

for (const [index, sourceWords] of [FAMILY_FIRST_LESSON, FAMILY_SECOND_LESSON, FAMILY_THIRD_LESSON].entries()) {
  const set = TOPIC_LESSONS.find((item) => item.id === `t-family-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(originalTopicToWord);
  set.blurb = `家庭与儿童主题第 ${index + 1} 课，共 ${sourceWords.length} 张原站导出词卡。其余课程词卡仍待替换。`;
}

export function topicLessons(topicId: string): VocabSet[] {
  return TOPIC_LESSONS.filter((s) => s.id.startsWith(`${topicId}-`));
}

export function topicPool(topicId: string): Word[] {
  const seen = new Map<string, Word>();
  for (const lesson of topicLessons(topicId)) {
    for (const wd of lesson.words) {
      if (!seen.has(wd.word.toLowerCase())) seen.set(wd.word.toLowerCase(), wd);
    }
  }
  return [...seen.values()];
}

// ---------------- CEFR 词汇（247 课） ----------------

const CEFR_EXTRA: Record<CefrLevel, CW[]> = {
  A1: [["apple", "/ˈæpl/", "n.", "苹果"], ["banana", "/bəˈnɑːnə/", "n.", "香蕉"], ["rice", "/raɪs/", "n.", "米饭"], ["milk", "/mɪlk/", "n.", "牛奶"], ["egg", "/eɡ/", "n.", "鸡蛋"], ["fish", "/fɪʃ/", "n.", "鱼"], ["house", "/haʊs/", "n.", "房子"], ["room", "/ruːm/", "n.", "房间"], ["door", "/dɔː(r)/", "n.", "门"], ["window", "/ˈwɪndəʊ/", "n.", "窗户"], ["table", "/ˈteɪbl/", "n.", "桌子"], ["chair", "/tʃeə(r)/", "n.", "椅子"], ["pen", "/pen/", "n.", "钢笔"], ["bag", "/bæɡ/", "n.", "包"], ["car", "/kɑː(r)/", "n.", "汽车"], ["bus", "/bʌs/", "n.", "公交车"], ["mother", "/ˈmʌðə(r)/", "n.", "妈妈"], ["father", "/ˈfɑːðə(r)/", "n.", "爸爸"], ["brother", "/ˈbrʌðə(r)/", "n.", "兄弟"], ["sister", "/ˈsɪstə(r)/", "n.", "姐妹"], ["teacher", "/ˈtiːtʃə(r)/", "n.", "老师"], ["student", "/ˈstjuːdnt/", "n.", "学生"], ["man", "/mæn/", "n.", "男人"], ["woman", "/ˈwʊmən/", "n.", "女人"], ["child", "/tʃaɪld/", "n.", "孩子"], ["day", "/deɪ/", "n.", "天；日子"], ["night", "/naɪt/", "n.", "夜晚"], ["sun", "/sʌn/", "n.", "太阳"], ["rain", "/reɪn/", "n.", "雨"], ["hot", "/hɒt/", "adj.", "热的"], ["cold", "/kəʊld/", "adj.", "冷的"], ["new", "/njuː/", "adj.", "新的"], ["old", "/əʊld/", "adj.", "旧的；老的"], ["good", "/ɡʊd/", "adj.", "好的"], ["come", "/kʌm/", "v.", "来"], ["see", "/siː/", "v.", "看见"], ["look at", "/lʊk/", "v.", "看"], ["listen to", "/ˈlɪsn/", "v.", "听"], ["speak", "/spiːk/", "v.", "说"], ["read", "/riːd/", "v.", "读"], ["write", "/raɪt/", "v.", "写"], ["walk", "/wɔːk/", "v.", "走路"], ["run", "/rʌn/", "v.", "跑"], ["play", "/pleɪ/", "v.", "玩"], ["work", "/wɜːk/", "v.", "工作"], ["live", "/lɪv/", "v.", "住；生活"]],
  A2: [["holiday", "/ˈhɒlədeɪ/", "n.", "假期"], ["journey", "/ˈdʒɜːni/", "n.", "旅程"], ["village", "/ˈvɪlɪdʒ/", "n.", "村庄"], ["city", "/ˈsɪti/", "n.", "城市"], ["garden", "/ˈɡɑːdn/", "n.", "花园"], ["kitchen", "/ˈkɪtʃɪn/", "n.", "厨房"], ["bathroom", "/ˈbɑːθruːm/", "n.", "浴室"], ["market", "/ˈmɑːkɪt/", "n.", "市场"], ["station", "/ˈsteɪʃn/", "n.", "车站"], ["bridge", "/brɪdʒ/", "n.", "桥"], ["river", "/ˈrɪvə(r)/", "n.", "河"], ["mountain", "/ˈmaʊntən/", "n.", "山"], ["forest", "/ˈfɒrɪst/", "n.", "森林"], ["beach", "/biːtʃ/", "n.", "海滩"], ["island", "/ˈaɪlənd/", "n.", "岛"], ["spring", "/sprɪŋ/", "n.", "春天"], ["summer", "/ˈsʌmə(r)/", "n.", "夏天"], ["autumn", "/ˈɔːtəm/", "n.", "秋天"], ["winter", "/ˈwɪntə(r)/", "n.", "冬天"], ["snow", "/snəʊ/", "n.", "雪"], ["wind", "/wɪnd/", "n.", "风"], ["cloud", "/klaʊd/", "n.", "云"], ["break", "/breɪk/", "v.", "打破；休息"], ["carry", "/ˈkæri/", "v.", "搬；携带"], ["climb", "/klaɪm/", "v.", "爬"], ["cook", "/kʊk/", "v.", "做饭"], ["drive", "/draɪv/", "v.", "开车"], ["fly", "/flaɪ/", "v.", "飞"], ["grow", "/ɡrəʊ/", "v.", "生长"], ["help", "/help/", "v.", "帮助"], ["hope", "/həʊp/", "v.", "希望"], ["laugh", "/lɑːf/", "v.", "笑"], ["open", "/ˈəʊpən/", "v.", "打开"], ["close", "/kləʊz/", "v.", "关上"], ["wait", "/weɪt/", "v.", "等待"]],
  B1: [["journey", "/ˈdʒɜːni/", "n.", "旅程"], ["experience", "/ɪkˈspɪəriəns/", "n.", "经历"], ["knowledge", "/ˈnɒlɪdʒ/", "n.", "知识"], ["opportunity", "/ˌɒpəˈtjuːnəti/", "n.", "机会"], ["environment", "/ɪnˈvaɪrənmənt/", "n.", "环境"], ["government", "/ˈɡʌvənmənt/", "n.", "政府"], ["advantage", "/ədˈvɑːntɪdʒ/", "n.", "优势"], ["disadvantage", "/ˌdɪsədˈvɑːntɪdʒ/", "n.", "劣势"], ["purpose", "/ˈpɜːpəs/", "n.", "目的"], ["reason", "/ˈriːzn/", "n.", "原因"], ["habit", "/ˈhæbɪt/", "n.", "习惯"], ["behaviour", "/bɪˈheɪvjə(r)/", "n.", "行为"], ["research", "/rɪˈsɜːtʃ/", "n.", "研究"], ["development", "/dɪˈveləpmənt/", "n.", "发展"], ["population", "/ˌpɒpjuˈleɪʃn/", "n.", "人口"], ["consider", "/kənˈsɪdə(r)/", "v.", "考虑"], ["suggest", "/səˈdʒest/", "v.", "建议"], ["require", "/rɪˈkwaɪə(r)/", "v.", "需要"], ["include", "/ɪnˈkluːd/", "v.", "包括"], ["continue", "/kənˈtɪnjuː/", "v.", "继续"], ["discover", "/dɪˈskʌvə(r)/", "v.", "发现"], ["protect", "/prəˈtekt/", "v.", "保护"], ["reduce", "/rɪˈdjuːs/", "v.", "减少"], ["increase", "/ɪnˈkriːs/", "v.", "增加"], ["particular", "/pəˈtɪkjələ(r)/", "adj.", "特别的"], ["available", "/əˈveɪləbl/", "adj.", "可获得的"], ["responsible", "/rɪˈspɒnsəbl/", "adj.", "负责的"], ["similar", "/ˈsɪmələ(r)/", "adj.", "相似的"]],
  B2: [["analysis", "/əˈnæləsɪs/", "n.", "分析"], ["approach", "/əˈprəʊtʃ/", "n.", "方法"], ["aspect", "/ˈæspekt/", "n.", "方面"], ["benefit", "/ˈbenɪfɪt/", "n.", "益处"], ["circumstance", "/ˈsɜːkəmstəns/", "n.", "情况"], ["crisis problem", "/ˈkraɪsɪs/", "n.", "危机"], ["emphasis stress", "/ˈemfəsɪs/", "n.", "强调"], ["evidence", "/ˈevɪdəns/", "n.", "证据"], ["factor", "/ˈfæktə(r)/", "n.", "因素"], ["impact", "/ˈɪmpækt/", "n.", "影响"], ["majority", "/məˈdʒɒrəti/", "n.", "大多数"], ["phenomenon", "/fɪˈnɒmɪnən/", "n.", "现象"], ["potential", "/pəˈtenʃl/", "n.", "潜力"], ["procedure", "/prəˈsiːdʒə(r)/", "n.", "程序"], ["range", "/reɪndʒ/", "n.", "范围"], ["assess", "/əˈses/", "v.", "评估"], ["assume", "/əˈsjuːm/", "v.", "假定"], ["demonstrate", "/ˈdemənstreɪt/", "v.", "演示；证明"], ["emphasise", "/ˈemfəsaɪz/", "v.", "强调"], ["obtain", "/əbˈteɪn/", "v.", "获得"], ["occur", "/əˈkɜː(r)/", "v.", "发生"], ["perceive", "/pəˈsiːv/", "v.", "察觉"], ["previous", "/ˈpriːviəs/", "adj.", "先前的"], ["sufficient", "/səˈfɪʃnt/", "adj.", "足够的"], ["complex", "/ˈkɒmpleks/", "adj.", "复杂的"], ["initial", "/ɪˈnɪʃl/", "adj.", "最初的"]],
  C1: [["advocate", "/ˈædvəkeɪt/", "v.", "倡导"], ["ambiguous", "/æmˈbɪɡjuəs/", "adj.", "模棱两可的"], ["analogy", "/əˈnælədʒi/", "n.", "类比"], ["anticipate", "/ænˈtɪsɪpeɪt/", "v.", "预料"], ["bias", "/ˈbaɪəs/", "n.", "偏见"], ["coincide", "/ˌkəʊɪnˈsaɪd/", "v.", "同时发生"], ["compile", "/kəmˈpaɪl/", "v.", "汇编"], ["conceive", "/kənˈsiːv/", "v.", "构想"], ["contradiction", "/ˌkɒntrəˈdɪkʃn/", "n.", "矛盾"], ["criteria", "/kraɪˈtɪəriə/", "n.", "标准（复数）"], ["deduce", "/dɪˈdjuːs/", "v.", "推断"], ["deficiency", "/dɪˈfɪʃnsi/", "n.", "不足"], ["deviate", "/ˈdiːvieɪt/", "v.", "偏离"], ["discriminate", "/dɪˈskrɪmɪneɪt/", "v.", "歧视"], ["disposal", "/dɪˈspəʊzl/", "n.", "处理"], ["dynamic", "/daɪˈnæmɪk/", "adj.", "动态的"], ["empirical", "/ɪmˈpɪrɪkl/", "adj.", "实证的"], ["enhance", "/ɪnˈhɑːns/", "v.", "提升"], ["exaggerate", "/ɪɡˈzædʒəreɪt/", "v.", "夸大"], ["explicit", "/ɪkˈsplɪsɪt/", "adj.", "明确的"], ["facilitate", "/fəˈsɪlɪteɪt/", "v.", "促进"], ["fluctuation", "/ˌflʌktʃuˈeɪʃn/", "n.", "波动"], ["fundamental", "/ˌfʌndəˈmentl/", "adj.", "根本的"], ["hierarchy", "/ˈhaɪərɑːki/", "n.", "等级体系"], ["hypothesis", "/haɪˈpɒθəsɪs/", "n.", "假说"], ["implication", "/ˌɪmplɪˈkeɪʃn/", "n.", "含义；影响"], ["incentive", "/ɪnˈsentɪv/", "n.", "激励"], ["incorporate", "/ɪnˈkɔːpəreɪt/", "v.", "纳入"], ["intervene", "/ˌɪntəˈviːn/", "v.", "干预"], ["intrinsic", "/ɪnˈtrɪnzɪk/", "adj.", "内在的"], ["invoke", "/ɪnˈvəʊk/", "v.", "援引"], ["legislation", "/ˌledʒɪsˈleɪʃn/", "n.", "立法"], ["likelihood", "/ˈlaɪklihʊd/", "n.", "可能性"], ["magnitude", "/ˈmæɡnɪtjuːd/", "n.", "量级"], ["manipulate", "/məˈnɪpjuleɪt/", "v.", "操纵"]],
  C2: [["abstain", "/əbˈsteɪn/", "v.", "克制；弃权"], ["acumen", "/ˈækjəmən/", "n.", "敏锐"], ["adversity", "/ədˈvɜːsəti/", "n.", "逆境"], ["alleviate", "/əˈliːvieɪt/", "v.", "缓解"], ["anomaly", "/əˈnɒməli/", "n.", "异常"], ["apathetic", "/ˌæpəˈθetɪk/", "adj.", "漠不关心的"], ["arbitrary", "/ˈɑːbɪtrəri/", "adj.", "武断的"], ["arduous", "/ˈɑːdjuəs/", "adj.", "艰巨的"], ["articulate", "/ɑːˈtɪkjuleɪt/", "v.", "清晰表达"], ["ascertain", "/ˌæsəˈteɪn/", "v.", "查明"], ["assiduous", "/əˈsɪdjuəs/", "adj.", "勤勉的"], ["astute", "/əˈstjuːt/", "adj.", "机敏的"], ["audacious", "/ɔːˈdeɪʃəs/", "adj.", "大胆的"], ["austerity", "/ɒˈsterəti/", "n.", "紧缩"], ["authenticity", "/ˌɔːθenˈtɪsəti/", "n.", "真实性"], ["belligerent", "/bɪˈlɪdʒərənt/", "adj.", "好斗的"], ["benevolent", "/bɪˈnevələnt/", "adj.", "仁慈的"], ["brevity", "/ˈbrevəti/", "n.", "简洁"], ["candour", "/ˈkændə(r)/", "n.", "坦率"], ["censure", "/ˈsenʃə(r)/", "n.", "谴责"], ["circumspect", "/ˈsɜːkəmspekt/", "adj.", "谨慎的"], ["coerce", "/kəʊˈɜːs/", "v.", "胁迫"], ["cogent", "/ˈkəʊdʒənt/", "adj.", "有说服力的"], ["coherent", "/kəʊˈhɪərənt/", "adj.", "连贯的"], ["collaborate", "/kəˈlæbəreɪt/", "v.", "协作"], ["compelling", "/kəmˈpelɪŋ/", "adj.", "引人入胜的"]],
};

export const CEFR_COUNTS: Record<CefrLevel, number> = { A1: 45, A2: 40, B1: 34, B2: 27, C1: 65, C2: 36 };

function buildCefrLessons(): VocabSet[] {
  const out: VocabSet[] = [];
  for (const level of Object.keys(CEFR_COUNTS) as CefrLevel[]) {
    const base = BASE_CEFR.find((s) => s.level === level);
    const pool: Word[] = [...(base?.words ?? []), ...(CEFR_EXTRA[level] ?? []).map(cwToWord)];
    const count = CEFR_COUNTS[level]!;
    for (let i = 0; i < count; i++) {
      const start = (i * 4) % Math.max(1, pool.length);
      const words: Word[] = [];
      for (let k = 0; k < 6 && pool.length > 0; k++) {
        const wd = pool[(start + k) % pool.length];
        if (wd) words.push(wd);
      }
      out.push({
        id: `c-${level.toLowerCase()}-${i + 1}`,
        kind: "vocab-cefr",
        titleCn: `${level} 词汇 · 第 ${i + 1} 课`,
        titleEn: `${level} Vocabulary Lesson ${i + 1}`,
        blurb: `${level} 级词汇第 ${i + 1} 课，含新词与前面课程的滚动复现。先学完词卡，再做练习。`,
        level,
        words,
      });
    }
  }
  return out;
}

export const CEFR_LESSONS: VocabSet[] = buildCefrLessons();

// ---------------- CEFR 词汇 A1 第 1–42 课（原站提取，作者授权翻译） ----------------
// 内容全部来自原站提取（词卡 / 简单档练习 / 听写），不自编、不保留越南语；
// 原站词卡只显示英文例句，没有越南语例句译文；这里保留英文，exampleCn 留空。
// 练习答案一律按答案文字定位（options.indexOf），不按字母；原站重复出题照原样保留，不去重。
// 中等、困难档练习与发音尚未提取，入口如实标「待补」，不编题、不编词表。
// XP 按环节分别记账：词卡记在本课 id，练习记 #practice、听写记 #dictation（服务端按课累计取最高，
// 分开记才能 35 + 50 + 50 = 135 相加；App 的 statsMap 会把分项合并回本课显示）。

type EW = [string, string, string, string, string, string, string]; // 词 / 音标 / 词性 / 意思 / 用法 / 例句1 / 例句2

function ewToWord(e: EW): Word {
  const [word, phonetic, pos, meaning, usage, ex1, ex2] = e;
  return { word, phonetic, pos, meaning, usage, example: ex1, exampleCn: "", example2: ex2, example2Cn: "" };
}

function originalTopicToWord(e: OriginalTopicWord): Word {
  const [word, phonetic, pos, meaning, usage, example, example2, example3] = e;
  const translated = EDUCATION_EXAMPLE_TRANSLATIONS[word] ?? EDUCATION_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? EDUCATION_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? EDUCATION_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? EDUCATION_NINTH_EXAMPLE_TRANSLATIONS[word] ?? EDUCATION_TENTH_EXAMPLE_TRANSLATIONS[word] ?? WORK_FIRST_EXAMPLE_TRANSLATIONS[word] ?? WORK_SECOND_EXAMPLE_TRANSLATIONS[word] ?? WORK_THIRD_EXAMPLE_TRANSLATIONS[word] ?? WORK_FOURTH_EXAMPLE_TRANSLATIONS[word] ?? WORK_FIFTH_EXAMPLE_TRANSLATIONS[word] ?? WORK_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? WORK_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? WORK_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? WORK_NINTH_EXAMPLE_TRANSLATIONS[word] ?? WORK_TENTH_EXAMPLE_TRANSLATIONS[word] ?? HEALTH_FIRST_EXAMPLE_TRANSLATIONS[word] ?? HEALTH_SECOND_EXAMPLE_TRANSLATIONS[word] ?? HEALTH_THIRD_EXAMPLE_TRANSLATIONS[word] ?? HEALTH_FOURTH_EXAMPLE_TRANSLATIONS[word] ?? HEALTH_FIFTH_EXAMPLE_TRANSLATIONS[word] ?? HEALTH_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? HEALTH_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? HEALTH_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? HEALTH_NINTH_EXAMPLE_TRANSLATIONS[word] ?? HEALTH_TENTH_EXAMPLE_TRANSLATIONS[word] ?? ENVIRONMENT_FIRST_EXAMPLE_TRANSLATIONS[word] ?? ENVIRONMENT_SECOND_EXAMPLE_TRANSLATIONS[word] ?? ENVIRONMENT_THIRD_EXAMPLE_TRANSLATIONS[word] ?? ENVIRONMENT_FOURTH_EXAMPLE_TRANSLATIONS[word] ?? ENVIRONMENT_FIFTH_EXAMPLE_TRANSLATIONS[word] ?? ENVIRONMENT_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? ENVIRONMENT_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? ENVIRONMENT_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? ENVIRONMENT_NINTH_EXAMPLE_TRANSLATIONS[word] ?? ENVIRONMENT_TENTH_EXAMPLE_TRANSLATIONS[word] ?? TECHNOLOGY_FIRST_EXAMPLE_TRANSLATIONS[word] ?? TECHNOLOGY_SECOND_EXAMPLE_TRANSLATIONS[word] ?? TECHNOLOGY_THIRD_EXAMPLE_TRANSLATIONS[word] ?? TECHNOLOGY_FOURTH_EXAMPLE_TRANSLATIONS[word] ?? TECHNOLOGY_FIFTH_EXAMPLE_TRANSLATIONS[word] ?? TECHNOLOGY_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? TECHNOLOGY_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? TECHNOLOGY_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? TECHNOLOGY_NINTH_EXAMPLE_TRANSLATIONS[word] ?? TECHNOLOGY_TENTH_EXAMPLE_TRANSLATIONS[word] ?? ECONOMY_FIRST_EXAMPLE_TRANSLATIONS[word] ?? ECONOMY_SECOND_EXAMPLE_TRANSLATIONS[word] ?? ECONOMY_THIRD_EXAMPLE_TRANSLATIONS[word] ?? ECONOMY_FOURTH_EXAMPLE_TRANSLATIONS[word] ?? ECONOMY_FIFTH_EXAMPLE_TRANSLATIONS[word] ?? ECONOMY_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? ECONOMY_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? ECONOMY_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? ECONOMY_NINTH_EXAMPLE_TRANSLATIONS[word] ?? ECONOMY_TENTH_EXAMPLE_TRANSLATIONS[word] ?? SCIENCE_FIRST_EXAMPLE_TRANSLATIONS[word] ?? SCIENCE_SECOND_EXAMPLE_TRANSLATIONS[word] ?? SCIENCE_THIRD_EXAMPLE_TRANSLATIONS[word] ?? SCIENCE_FOURTH_EXAMPLE_TRANSLATIONS[word] ?? SCIENCE_FIFTH_EXAMPLE_TRANSLATIONS[word] ?? SCIENCE_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? SCIENCE_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? SCIENCE_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? SCIENCE_NINTH_EXAMPLE_TRANSLATIONS[word] ?? SCIENCE_TENTH_EXAMPLE_TRANSLATIONS[word] ?? CITIES_FIRST_EXAMPLE_TRANSLATIONS[word] ?? CITIES_SECOND_EXAMPLE_TRANSLATIONS[word] ?? CITIES_THIRD_EXAMPLE_TRANSLATIONS[word] ?? CITIES_FOURTH_EXAMPLE_TRANSLATIONS[word] ?? CITIES_FIFTH_EXAMPLE_TRANSLATIONS[word] ?? CITIES_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? CITIES_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? CITIES_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? CITIES_NINTH_EXAMPLE_TRANSLATIONS[word] ?? CITIES_TENTH_EXAMPLE_TRANSLATIONS[word] ?? TRANSPORT_FIRST_EXAMPLE_TRANSLATIONS[word] ?? TRANSPORT_SECOND_EXAMPLE_TRANSLATIONS[word] ?? TRANSPORT_THIRD_EXAMPLE_TRANSLATIONS[word] ?? TRANSPORT_FOURTH_EXAMPLE_TRANSLATIONS[word] ?? TRANSPORT_FIFTH_EXAMPLE_TRANSLATIONS[word] ?? TRANSPORT_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? TRANSPORT_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? TRANSPORT_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? TRANSPORT_NINTH_EXAMPLE_TRANSLATIONS[word] ?? TRANSPORT_TENTH_EXAMPLE_TRANSLATIONS[word] ?? CRIME_FIRST_EXAMPLE_TRANSLATIONS[word] ?? CRIME_SECOND_EXAMPLE_TRANSLATIONS[word] ?? CRIME_THIRD_EXAMPLE_TRANSLATIONS[word] ?? CRIME_FOURTH_EXAMPLE_TRANSLATIONS[word] ?? CRIME_FIFTH_EXAMPLE_TRANSLATIONS[word] ?? CRIME_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? CRIME_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? CRIME_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? CRIME_NINTH_EXAMPLE_TRANSLATIONS[word] ?? CRIME_TENTH_EXAMPLE_TRANSLATIONS[word] ?? GOVERNMENT_FIRST_EXAMPLE_TRANSLATIONS[word] ?? GOVERNMENT_SECOND_EXAMPLE_TRANSLATIONS[word] ?? GOVERNMENT_THIRD_EXAMPLE_TRANSLATIONS[word] ?? GOVERNMENT_FOURTH_EXAMPLE_TRANSLATIONS[word] ?? GOVERNMENT_FIFTH_EXAMPLE_TRANSLATIONS[word] ?? GOVERNMENT_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? GOVERNMENT_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? GOVERNMENT_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? GOVERNMENT_NINTH_EXAMPLE_TRANSLATIONS[word] ?? GOVERNMENT_TENTH_EXAMPLE_TRANSLATIONS[word] ?? MEDIA_FIRST_EXAMPLE_TRANSLATIONS[word] ?? MEDIA_SECOND_EXAMPLE_TRANSLATIONS[word] ?? MEDIA_THIRD_EXAMPLE_TRANSLATIONS[word] ?? MEDIA_FOURTH_EXAMPLE_TRANSLATIONS[word] ?? MEDIA_FIFTH_EXAMPLE_TRANSLATIONS[word] ?? MEDIA_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? MEDIA_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? MEDIA_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? MEDIA_NINTH_EXAMPLE_TRANSLATIONS[word] ?? MEDIA_TENTH_EXAMPLE_TRANSLATIONS[word] ?? CULTURE_FIRST_EXAMPLE_TRANSLATIONS[word] ?? CULTURE_SECOND_EXAMPLE_TRANSLATIONS[word] ?? CULTURE_THIRD_EXAMPLE_TRANSLATIONS[word] ?? CULTURE_FOURTH_EXAMPLE_TRANSLATIONS[word] ?? CULTURE_FIFTH_EXAMPLE_TRANSLATIONS[word] ?? CULTURE_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? CULTURE_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? CULTURE_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? CULTURE_NINTH_EXAMPLE_TRANSLATIONS[word] ?? CULTURE_TENTH_EXAMPLE_TRANSLATIONS[word] ?? GLOBALISATION_FIRST_EXAMPLE_TRANSLATIONS[word] ?? GLOBALISATION_SECOND_EXAMPLE_TRANSLATIONS[word] ?? GLOBALISATION_THIRD_EXAMPLE_TRANSLATIONS[word] ?? GLOBALISATION_FOURTH_EXAMPLE_TRANSLATIONS[word] ?? GLOBALISATION_FIFTH_EXAMPLE_TRANSLATIONS[word] ?? GLOBALISATION_SIXTH_EXAMPLE_TRANSLATIONS[word] ?? GLOBALISATION_SEVENTH_EXAMPLE_TRANSLATIONS[word] ?? GLOBALISATION_EIGHTH_EXAMPLE_TRANSLATIONS[word] ?? GLOBALISATION_NINTH_EXAMPLE_TRANSLATIONS[word] ?? GLOBALISATION_TENTH_EXAMPLE_TRANSLATIONS[word] ?? FAMILY_FIRST_EXAMPLE_TRANSLATIONS[word] ?? FAMILY_SECOND_EXAMPLE_TRANSLATIONS[word] ?? FAMILY_THIRD_EXAMPLE_TRANSLATIONS[word];
  return {
    word, phonetic, pos, meaning, usage, example, exampleCn: translated?.[0] ?? "",
    example2, example2Cn: translated?.[1] ?? "",
    ...(example3 ? { example3, example3Cn: translated?.[2] ?? "" } : {}),
  };
}

const tfQ = (q: string, answerText: "对" | "错", explain: string): QuizQuestion => ({
  q, options: ["对", "错"], answer: answerText === "对" ? 0 : 1, explain, difficulty: "简单",
});
const chQ = (q: string, options: string[], answerText: string, explain: string): QuizQuestion => ({
  q, options, answer: options.indexOf(answerText), explain, difficulty: "简单",
});
const matchQ = (pairs: [string, string][], rightOrder: string[], explain: string): QuizQuestion => ({
  q: "把每个单词和它的意思连起来。",
  options: [],
  answer: 0,
  explain,
  difficulty: "简单",
  kind: "match",
  pairs: pairs.map(([left, right]) => ({ left, right })),
  matchRight: rightOrder,
});
const fillQ = (stemBlanked: string, sentence: string, answerText: string, explain: string): QuizQuestion => ({
  q: `填入合适的单词：${stemBlanked}`,
  options: [],
  answer: 0,
  answerText,
  explain,
  difficulty: "简单",
  kind: "blank",
  sentence,
  baseWord: "单词", // 原站填空无括号提示词：仅作显示占位，不泄露答案（语法第 5/8/11 课先例）
});

const CEFR_A1_L1_WORDS: EW[] = [
  ["address", "/əˈdres/", "名词", "地址", "指居住地或电子邮箱地址", "What is your home address?", "Write your address on the envelope."],
  ["activity", "/ækˈtɪvəti/", "名词", "活动", "可数名词，复数是 activities", "Swimming is my favourite activity.", "The school has many activities for children."],
  ["add", "/æd/", "动词", "增加；加", "动词，结构 add something to something", "Please add some sugar to the tea.", "Add two and three to make five."],
  ["actress", "/ˈæktrəs/", "名词", "女演员", "指人的名词，女演员", "She wants to be an actress.", "The actress won a big prize."],
  ["across", "/əˈkrɒs/", "介词", "穿过；对面", "介词，表示从一边到另一边的移动", "We walked across the street.", "The shop is across the road."],
  ["above", "/əˈbʌv/", "介词", "在……上方", "介词，表示位置更高，与 below 相反", "The lamp is above the table.", "Birds flew above the trees."],
  ["actor", "/ˈæktə/", "名词", "男演员", "指人的名词，男演员，女演员是 actress", "He is a famous actor.", "The actor played a doctor in the film."],
  ["action", "/ˈækʃn/", "名词", "行动；行为", "名词，take action 是“采取行动”", "We must take action now.", "The film has a lot of action."],
  ["an", "/ən/", "冠词", "一个（不定冠词，用于元音前）", "不定冠词，用于以元音开头的单数名词前", "He ate an apple.", "I need an umbrella."],
  ["about", "/əˈbaʊt/", "介词", "关于；涉及", "介词，表示主题，也有“大约”的意思", "This book is about animals.", "We talked about our plans."],
  ["a", "/ə/", "冠词", "一个（不定冠词，用于辅音前）", "不定冠词，用于以辅音开头的单数可数名词前", "I have a dog.", "She is a teacher."],
  ["adult", "/ˈædʌlt/", "名词", "成年人", "指成年人的名词，与 child 相反", "This film is for adults only.", "Two adults and one child, please."],
];

const CEFR_A1_L1_PRACTICE: QuizQuestion[] = [
  tfQ("“an”的意思是“穿过、越过、对面”，对还是错？", "错", "“an”的意思是“一个（不定冠词，用于元音前）”。“穿过、越过、对面”是“across”的意思。"),
  chQ("哪个单词的意思是“男演员”？", ["actor", "address", "add", "actress"], "actor", "“actor”的意思是“男演员”。例句：He is a famous actor."),
  matchQ(
    [["action", "行动"], ["activity", "活动"], ["actor", "男演员"], ["actress", "女演员"]],
    ["活动", "行动", "女演员", "男演员"],
    "action = 行动 · activity = 活动 · actor = 男演员 · actress = 女演员",
  ),
  chQ("“about”是什么意思？", ["关于、涉及", "行动", "在……上方", "穿过、对面"], "关于、涉及", "“about”的意思是“关于、涉及”。例句：This book is about animals."),
  tfQ("“a”的意思是“在……上方”，对还是错？", "错", "“a”的意思是“一个（不定冠词，用于辅音前）”。“在……上方”是“above”的意思。"),
  chQ("选一个意思是“在……上方”的单词完成句子：The lamp is _____ the table.", ["across", "above", "action", "activity"], "above", "“above”的意思是“在……上方”。例句：The lamp is above the table."),
  chQ("“across”是什么意思？", ["行动", "男演员", "活动", "穿过、对面"], "穿过、对面", "“across”的意思是“穿过、越过、对面”。例句：We walked across the street."),
  fillQ(
    "The delivery driver could not find our house because the ____ was missing from the parcel.",
    "The delivery driver could not find our house because the address was missing from the parcel.",
    "address",
    "“address”= 地址。The delivery driver could not find our house because the address was missing from the parcel.",
  ),
  tfQ("“add”的意思是“一个（不定冠词，用于辅音前）”，对还是错？", "错", "“add”的意思是“增加；加”。“一个（不定冠词，用于辅音前）”是“a”的意思。"),
  chQ("“adult”是什么意思？", ["在……上方", "成年人", "一个（不定冠词，用于辅音前）", "关于、涉及"], "成年人", "“adult”的意思是“成年人”。例句：This film is for adults only."),
  matchQ(
    [["actress", "女演员"], ["add", "增加"], ["address", "地址"], ["adult", "成年人"]],
    ["地址", "增加", "成年人", "女演员"],
    "actress = 女演员 · add = 增加 · address = 地址 · adult = 成年人",
  ),
  chQ("选一个意思是“活动”的单词完成句子：Swimming is my favourite _____.", ["actress", "actor", "add", "activity"], "activity", "“activity”的意思是“活动”。例句：Swimming is my favourite activity."),
  // 第 13 题与第 1 题重复：原站题库重复出题，照原样保留，不去重
  tfQ("“an”的意思是“穿过、越过、对面”，对还是错？", "错", "“an”的意思是“一个（不定冠词，用于元音前）”。“穿过、越过、对面”是“across”的意思。"),
  // 第 14 题与第 2 题重复（选项顺序不同）：照原样保留
  chQ("哪个单词的意思是“男演员”？", ["actor", "add", "address", "actress"], "actor", "“actor”的意思是“男演员”。例句：He is a famous actor."),
  chQ("选一个意思是“行动”的单词完成句子：We must take _____ now.", ["actor", "actress", "activity", "action"], "action", "“action”的意思是“行动”。例句：We must take action now."),
  fillQ(
    "The book is ____ wild animals, with pictures and facts on every page.",
    "The book is about wild animals, with pictures and facts on every page.",
    "about",
    "“about”= 关于。The book is about wild animals, with pictures and facts on every page.",
  ),
];

const CEFR_A1_L2_WORDS: EW[] = [
  ["airport", "/ˈeəpɔːt/", "名词", "机场", "名词，at the airport 是“在机场”", "We met her at the airport.", "The airport is far from the city."],
  ["afternoon", "/ˌɑːftəˈnuːn/", "名词", "下午", "指时间的名词，说 in the afternoon", "I have a class this afternoon.", "We drink tea in the afternoon."],
  ["ago", "/əˈɡəʊ/", "副词", "以前；……之前", "副词，放在时间段之后，与过去时连用", "I saw him two days ago.", "They moved here a long time ago."],
  ["advice", "/ədˈvaɪs/", "名词", "建议；忠告", "不可数名词，说 a piece of advice", "My father gave me good advice.", "Can I ask you for some advice?"],
  ["age", "/eɪdʒ/", "名词", "年龄", "名词，at the age of 是“在……岁时”", "What is your age?", "She started school at the age of six."],
  ["always", "/ˈɔːlweɪz/", "副词", "总是；一直", "频率副词，放在主要动词之前", "She always gets up early.", "I always brush my teeth before bed."],
  ["agree", "/əˈɡriː/", "动词", "同意", "动词，agree with somebody 是“同意某人”", "I agree with you.", "They did not agree about the price."],
  ["after", "/ˈɑːftə/", "介词", "在……之后", "介词或连词，表示一件事之后的时间", "We play after school.", "I felt tired after the long walk."],
  ["all", "/ɔːl/", "限定词", "全部；所有", "限定词，放在名词之前，如 all the students", "All the children are happy.", "I ate all the cake."],
  ["also", "/ˈɔːlsəʊ/", "副词", "也；还", "副词，常放在主要动词之前或 to be 之后", "She sings and she also dances.", "I am also a student here."],
  ["air", "/eə/", "名词", "空气", "不可数名词", "The air is fresh in the mountains.", "Open the window to let in some air."],
  ["again", "/əˈɡen/", "副词", "再一次；又", "副词，常放在句末", "Please say that again.", "I want to watch the film again."],
  ["afraid", "/əˈfreɪd/", "形容词", "害怕的；担心的", "形容词，afraid of something 是“害怕某物”", "She is afraid of dogs.", "Don't be afraid to ask questions."],
];

const CEFR_A1_L2_PRACTICE: QuizQuestion[] = [
  tfQ("“afternoon”的意思是“以前、……之前”，对还是错？", "错", "“afternoon”的意思是“下午”。“以前、……之前”是“ago”的意思。"),
  chQ("哪个单词的意思是“以前、……之前”？", ["airport", "agree", "air", "ago"], "ago", "“ago”的意思是“以前、……之前”。例句：I saw him two days ago."),
  matchQ(
    [["afraid", "害怕"], ["after", "之后"], ["afternoon", "下午"], ["again", "再一次"]],
    ["下午", "再一次", "之后", "害怕"],
    "afraid = 害怕 · after = 之后 · afternoon = 下午 · again = 再一次",
  ),
  chQ("“always”是什么意思？", ["之后", "总是、一直", "害怕", "建议"], "总是、一直", "“always”的意思是“总是、一直”。例句：She always gets up early."),
  tfQ("“also”的意思是“害怕”，对还是错？", "错", "“also”的意思是“也、还”。“害怕”是“afraid”的意思。"),
  chQ("选一个意思是“再一次”的单词完成句子：Please say that _____.", ["again", "age", "ago", "agree"], "again", "“again”的意思是“再一次”。例句：Please say that again."),
  chQ("“all”是什么意思？", ["全部、所有", "也、还", "总是、一直", "建议"], "全部、所有", "“all”的意思是“全部、所有”。例句：All the children are happy."),
  fillQ(
    "We arrived at the ____ two hours before our plane was due to take off.",
    "We arrived at the airport two hours before our plane was due to take off.",
    "airport",
    "“airport”= 机场。We arrived at the airport two hours before our plane was due to take off.",
  ),
  tfQ("“air”的意思是“也、还”，对还是错？", "错", "“air”的意思是“空气”。“也、还”是“also”的意思。"),
  chQ("“age”是什么意思？", ["同意", "以前、……之前", "空气", "年龄"], "年龄", "“age”的意思是“年龄”。例句：What is your age?"),
  matchQ(
    [["after", "之后"], ["afternoon", "下午"], ["again", "再一次"], ["age", "年龄"]],
    ["之后", "年龄", "再一次", "下午"],
    "after = 之后 · afternoon = 下午 · again = 再一次 · age = 年龄",
  ),
  chQ("选一个意思是“建议”的单词完成句子：My father gave me good _____.", ["afraid", "afternoon", "after", "advice"], "advice", "“advice”的意思是“建议”。例句：My father gave me good advice."),
  tfQ("“agree”的意思是“全部、所有”，对还是错？", "错", "“agree”的意思是“同意”。“全部、所有”是“all”的意思。"),
  chQ("哪个单词的意思是“下午”？", ["age", "again", "ago", "afternoon"], "afternoon", "“afternoon”的意思是“下午”。例句：I have a class this afternoon."),
  chQ("选一个意思是“以前、……之前”的单词完成句子：I saw him two days _____.", ["airport", "ago", "agree", "air"], "ago", "“ago”的意思是“以前、……之前”。例句：I saw him two days ago."),
  fillQ(
    "The little boy was ____ of the large dog and hid behind his mother.",
    "The little boy was afraid of the large dog and hid behind his mother.",
    "afraid",
    "“afraid”= 害怕的。The little boy was afraid of the large dog and hid behind his mother.",
  ),
];

const CEFR_A1_L3_WORDS: EW[] = [
  ["anything", "/ˈeniθɪŋ/", "代词", "任何东西；任何事", "代词，常用于疑问句和否定句", "Do you want anything to eat?", "I can't hear anything."],
  ["answer", "/ˈɑːnsə/", "名词", "回答；答案", "名词，也用作动词：answer a question", "I don't know the answer.", "She gave the right answer."],
  ["area", "/ˈeəriə/", "名词", "地区；区域；面积", "可数名词，指空间或区域", "This is a quiet area of the city.", "There is a play area for children."],
  ["apartment", "/əˈpɑːtmənt/", "名词", "公寓（美式英语）", "名词（美式英语）；英式英语叫 flat", "They live in a small apartment.", "My apartment is on the third floor."],
  ["another", "/əˈnʌðə/", "限定词", "另一个；再一个", "限定词，放在单数名词前面", "Can I have another cup of tea?", "Let's try another way."],
  ["anyone", "/ˈeniwʌn/", "代词", "任何人（中性，书面语也用）", "代词，常用于疑问句和否定句", "Is anyone at home?", "I didn't see anyone in the room."],
  ["angry", "/ˈæŋɡri/", "形容词", "生气的；愤怒的", "形容词；angry with somebody 是“生某人的气”", "My mother was angry with me.", "He gets angry when he is tired."],
  ["animal", "/ˈænɪml/", "名词", "动物", "可数名词，复数是 animals", "The lion is a wild animal.", "We saw many animals at the zoo."],
  ["apple", "/ˈæpl/", "名词", "苹果", "可数名词，复数是 apples", "I eat an apple every day.", "She bought some red apples."],
  ["and", "/ænd/", "连词", "和", "连词，连接两个词或两个句子", "I like tea and coffee.", "She opened the door and went out."],
  ["April", "/ˈeɪprəl/", "名词", "四月", "专有名词，指月份，首字母永远大写；说 in April", "My birthday is in April.", "It often rains in April."],
  ["amazing", "/əˈmeɪzɪŋ/", "形容词", "令人惊叹的；了不起的", "形容词，指给人留下深刻印象的事物", "The view from the top is amazing.", "We had an amazing holiday."],
  ["any", "/ˈeni/", "限定词", "任何；一点", "限定词，常用于疑问句和否定句", "Do you have any questions?", "There isn't any milk left."],
];

const CEFR_A1_L3_PRACTICE: QuizQuestion[] = [
  tfQ("“any”的意思是“任何、一点”，对还是错？", "对", "“any”的意思是“任何、一点”。"),
  chQ("哪个单词的意思是“公寓（美式英语）”？", ["apple", "area", "April", "apartment"], "apartment", "“apartment”的意思是“公寓（美式英语）”。例句：They live in a small apartment."),
  matchQ(
    [["answer", "回答；答案"], ["any", "任何、一点"], ["anyone", "任何人（中性，书面语也用）"], ["anything", "任何东西；任何事"]],
    ["任何、一点", "任何人（中性，书面语也用）", "回答；答案", "任何东西；任何事"],
    "answer = 回答；答案 · any = 任何、一点 · anyone = 任何人（中性，书面语也用） · anything = 任何东西；任何事",
  ),
  chQ("“amazing”是什么意思？", ["令人惊叹的；了不起的", "动物", "和", "生气的"], "令人惊叹的；了不起的", "“amazing”的意思是“令人惊叹的；了不起的”。例句：The view from the top is amazing."),
  tfQ("“area”的意思是“生气的”，对还是错？", "错", "“area”的意思是“地区；区域；面积”。“生气的”是“angry”的意思。"),
  chQ("选一个意思是“和”的单词完成句子：I like tea _____ coffee.", ["animal", "angry", "and", "another"], "and", "“and”的意思是“和”。例句：I like tea and coffee."),
  chQ("“apple”是什么意思？", ["令人惊叹的；了不起的", "地区；区域；面积", "苹果", "四月"], "苹果", "“apple”的意思是“苹果”。例句：I eat an apple every day."),
  fillQ(
    "The teacher was ______ because somebody had written on the classroom wall.",
    "The teacher was angry because somebody had written on the classroom wall.",
    "angry",
    "“angry”= 生气的。The teacher was angry because somebody had written on the classroom wall.",
  ),
  tfQ("“April”的意思是“四月”，对还是错？", "对", "“April”的意思是“四月”。"),
  chQ("“another”是什么意思？", ["另一个；再一个", "任何、一点", "回答；答案", "任何人（中性，书面语也用）"], "另一个；再一个", "“another”的意思是“另一个；再一个”。例句：Can I have another cup of tea?"),
  matchQ(
    [["anyone", "任何人（中性，书面语也用）"], ["anything", "任何东西；任何事"], ["apartment", "公寓（美式英语）"], ["apple", "苹果"]],
    ["任何人（中性，书面语也用）", "苹果", "公寓（美式英语）", "任何东西；任何事"],
    "anyone = 任何人（中性，书面语也用） · anything = 任何东西；任何事 · apartment = 公寓（美式英语） · apple = 苹果",
  ),
  chQ("选一个意思是“任何东西；任何事”的单词完成句子：Do you want _____ to eat?", ["apartment", "apple", "anything", "April"], "anything", "“anything”的意思是“任何东西；任何事”。例句：Do you want anything to eat?"),
  tfQ("“animal”的意思是“任何、一点”，对还是错？", "错", "“animal”的意思是“动物”。“任何、一点”是“any”的意思。"),
  chQ("哪个单词的意思是“任何、一点”？", ["apartment", "anything", "any", "anyone"], "any", "“any”的意思是“任何、一点”。例句：Do you have any questions?"),
  chQ("选一个意思是“公寓（美式英语）”的单词完成句子：They live in a small _____.", ["April", "apartment", "area", "apple"], "apartment", "“apartment”的意思是“公寓（美式英语）”。例句：They live in a small apartment."),
  fillQ(
    "He did not know the _____, so he left the question blank on his test.",
    "He did not know the answer, so he left the question blank on his test.",
    "answer",
    "“answer”= 回答；答案。He did not know the answer, so he left the question blank on his test.",
  ),
];

const CEFR_A1_L4_WORDS: EW[] = [
  ["art", "/ɑːt/", "名词", "艺术；美术", "不可数名词；也是一门课 Art", "She loves modern art.", "We have an art class on Monday."],
  ["around", "/əˈraʊnd/", "介词", "在……周围；大约", "介词或副词，表示环绕的位置；也有“大约”的意思", "We sat around the table.", "There are trees around the house."],
  ["as", "/æz/", "介词", "如；作为", "介词；work as a teacher；也用 as ... as 表示同级比较", "She works as a nurse.", "He used a big stone as a chair."],
  ["baby", "/ˈbeɪbi/", "名词", "婴儿", "可数名词；复数是 babies", "The baby is sleeping.", "They have a new baby girl."],
  ["away", "/əˈweɪ/", "副词", "离开；远离；不在", "副词；go away、far away、be away", "Please go away, I am busy.", "She is away on holiday this week."],
  ["at", "/æt/", "介词", "在（某处）；在（某时）", "介词，指具体地点和时间；at home、at seven o'clock", "I am at home now.", "The class starts at nine o'clock."],
  ["aunt", "/ɑːnt/", "名词", "姑姑；阿姨；伯母；婶婶", "指父母的姐妹的亲属名词", "My aunt lives in London.", "I visited my aunt last weekend."],
  ["arrive", "/əˈraɪv/", "动词", "到达", "动词；arrive at（小地方）、arrive in（城市、国家）", "We arrived at the station early.", "They arrived in Hanoi last night."],
  ["autumn", "/ˈɔːtəm/", "名词", "秋天", "名词；in autumn；美式英语用 fall", "The leaves fall in autumn.", "Autumn is my favourite season."],
  ["arm", "/ɑːm/", "名词", "手臂", "可数名词，身体部位；每人有两条手臂", "She broke her arm last week.", "He held the baby in his arms."],
  ["ask", "/ɑːsk/", "动词", "问；请求；要求", "动词；ask a question、ask somebody for something", "Can I ask you a question?", "She asked me for help."],
  ["August", "/ˈɔːɡəst/", "名词", "八月", "专有名词，首字母永远大写；in August", "My birthday is in August.", "We often travel in August."],
  ["article", "/ˈɑːtɪkl/", "名词", "文章；报道", "可数名词；an article about something", "I read an interesting article today.", "He wrote an article about Vietnamese food."],
];

const CEFR_A1_L4_PRACTICE: QuizQuestion[] = [
  tfQ("“arrive”的意思是“如；作为”，对还是错？", "错", "“arrive”的意思是“到达”。“如；作为”是“as”的意思。"),
  chQ("哪个单词的意思是“秋天”？", ["baby", "autumn", "arm", "away"], "autumn", "“autumn”的意思是“秋天”。例句：The leaves fall in autumn."),
  matchQ(
    [["baby", "婴儿"], ["arm", "手臂"], ["around", "在……周围；大约"], ["arrive", "到达"]],
    ["到达", "婴儿", "手臂", "在……周围；大约"],
    "baby = 婴儿 · arm = 手臂 · around = 在……周围；大约 · arrive = 到达",
  ),
  chQ("“August”是什么意思？", ["离开；远离；不在", "姑姑；阿姨；伯母；婶婶", "秋天", "八月"], "八月", "“August”的意思是“八月”。例句：My birthday is in August."),
  tfQ("“away”的意思是“离开；远离；不在”，对还是错？", "对", "“away”的意思是“离开；远离；不在”。"),
  chQ("选一个意思是“在……周围；大约”的单词完成句子：We sat _____ the table.", ["art", "arrive", "around", "article"], "around", "“around”的意思是“在……周围；大约”。例句：We sat around the table."),
  chQ("“at”是什么意思？", ["秋天", "八月", "姑姑；阿姨；伯母；婶婶", "在（某处）；在（某时）"], "在（某处）；在（某时）", "“at”的意思是“在（某处）；在（某时）”。例句：I am at home now."),
  fillQ(
    "The student raised her hand to ______ for an explanation of the difficult word.",
    "The student raised her hand to ask for an explanation of the difficult word.",
    "ask",
    "“ask”= 问；请求；要求。The student raised her hand to ask for an explanation of the difficult word.",
  ),
  tfQ("“arm”的意思是“手臂”，对还是错？", "对", "“arm”的意思是“手臂”。"),
  chQ("“as”是什么意思？", ["问；请求；要求", "如；作为", "八月", "在（某处）；在（某时）"], "如；作为", "“as”的意思是“如；作为”。例句：She works as a nurse."),
  matchQ(
    [["article", "文章；报道"], ["as", "如；作为"], ["ask", "问；请求；要求"], ["at", "在（某处）；在（某时）"]],
    ["文章；报道", "问；请求；要求", "在（某处）；在（某时）", "如；作为"],
    "article = 文章；报道 · as = 如；作为 · ask = 问；请求；要求 · at = 在（某处）；在（某时）",
  ),
  chQ("选一个意思是“艺术；美术”的单词完成句子：She loves modern _____.", ["as", "art", "article", "ask"], "art", "“art”的意思是“艺术；美术”。例句：She loves modern art."),
  tfQ("“aunt”的意思是“姑姑；阿姨；伯母；婶婶”，对还是错？", "对", "“aunt”的意思是“姑姑；阿姨；伯母；婶婶”。"),
  chQ("哪个单词的意思是“到达”？", ["art", "as", "arrive", "article"], "arrive", "“arrive”的意思是“到达”。例句：We arrived at the station early."),
  chQ("选一个意思是“秋天”的单词完成句子：The leaves fall in _____.", ["arm", "away", "baby", "autumn"], "autumn", "“autumn”的意思是“秋天”。例句：The leaves fall in autumn."),
  fillQ(
    "The mother held her newborn ______ gently while it slept.",
    "The mother held her newborn baby gently while it slept.",
    "baby",
    "“baby”= 婴儿。The mother held her newborn baby gently while it slept.",
  ),
];

const CEFR_A1_L5_WORDS: EW[] = [
  ["bad", "/bæd/", "形容词", "坏的；糟糕的；差的", "形容词；比较级 bad, worse, worst", "The weather is bad today.", "This is a bad idea."],
  ["bank", "/bæŋk/", "名词", "银行；河岸", "名词；go to the bank；也指河岸", "I need to go to the bank today.", "She works at a bank."],
  ["bar", "/bɑː/", "名词", "酒吧；吧台；条；块", "名词；a bar, a bar of chocolate", "We met at a bar last night.", "He bought a bar of chocolate."],
  ["back", "/bæk/", "副词", "回来；返回；（名词）背；后面", "副词：come back, go back；也是指背的名词", "Please come back soon.", "He put the book back on the shelf."],
  ["because", "/bɪˈkɒz/", "连词", "因为（最常用，能回答 Why 的问题）", "表示原因的连词；because + 从句", "I stayed home because I was tired.", "She is happy because it is her birthday."],
  ["beach", "/biːtʃ/", "名词", "海滩", "名词；on the beach, go to the beach", "We spent the whole day at the beach.", "The children played on the beach."],
  ["bag", "/bæɡ/", "名词", "包；袋子", "可数名词；a bag of something", "She put the apples in a bag.", "My bag is very heavy."],
  ["bath", "/bɑːθ/", "名词", "泡澡；浴缸", "名词；have a bath, take a bath", "I take a bath every evening.", "The baby loves her bath."],
  ["ball", "/bɔːl/", "名词", "球", "可数名词；play with a ball, kick a ball", "The children are playing with a ball.", "He kicked the ball very hard."],
  ["be", "/biː/", "动词", "是；是……的；在", "动词 to be：am, is, are, was, were", "I am a student.", "They are at school now."],
  ["band", "/bænd/", "名词", "乐队", "可数名词；play in a band, a rock band", "My brother plays in a band.", "The band played all night."],
  ["beautiful", "/ˈbjuːtɪfl/", "形容词", "美丽的；漂亮的", "形容词；形容人、物、景色美", "What a beautiful garden!", "She has a beautiful voice."],
  ["banana", "/bəˈnɑːnə/", "名词", "香蕉", "可数名词；a banana, bananas", "I eat a banana every morning.", "Monkeys love bananas."],
  ["bathroom", "/ˈbɑːθruːm/", "名词", "浴室；卫生间", "名词；go to the bathroom, in the bathroom", "The bathroom is upstairs.", "Can I use your bathroom, please?"],
];

const CEFR_A1_L5_PRACTICE: QuizQuestion[] = [
  tfQ("“bad”的意思是“香蕉”，对还是错？", "错", "“bad”的意思是“坏的；糟糕的；差的”。“香蕉”是“banana”的意思。"),
  chQ("哪个单词的意思是“回来；返回；（名词）背；后面”？", ["ball", "bag", "back", "bad"], "back", "“back”的意思是“回来；返回；（名词）背；后面”。例句：Please come back soon."),
  matchQ(
    [["bar", "酒吧；吧台；条；块"], ["bath", "泡澡；浴缸"], ["bathroom", "浴室；卫生间"], ["be", "是；是……的；在"]],
    ["酒吧；吧台；条；块", "泡澡；浴缸", "浴室；卫生间", "是；是……的；在"],
    "bar = 酒吧；吧台；条；块 · bath = 泡澡；浴缸 · bathroom = 浴室；卫生间 · be = 是；是……的；在",
  ),
  chQ("“bath”是什么意思？", ["浴室；卫生间", "海滩", "泡澡；浴缸", "是；是……的；在"], "泡澡；浴缸", "“bath”的意思是“泡澡；浴缸”。例句：I take a bath every evening."),
  tfQ("“beautiful”的意思是“美丽的；漂亮的”，对还是错？", "对", "“beautiful”的意思是“美丽的；漂亮的”。"),
  chQ("选一个意思是“银行；河岸”的单词完成句子：I need to go to the _____ today.", ["bank", "bath", "bar", "bathroom"], "bank", "“bank”的意思是“银行；河岸”。例句：I need to go to the bank today."),
  chQ("“banana”是什么意思？", ["酒吧；吧台；条；块", "乐队", "香蕉", "银行；河岸"], "香蕉", "“banana”的意思是“香蕉”。例句：I eat a banana every morning."),
  fillQ(
    "The family walked along the sandy _____ and watched the waves come in.",
    "The family walked along the sandy beach and watched the waves come in.",
    "beach",
    "“beach”= 海滩。The family walked along the sandy beach and watched the waves come in.",
  ),
  tfQ("“because”的意思是“因为（最常用，能回答 Why 的问题）”，对还是错？", "对", "“because”的意思是“因为（最常用，能回答 Why 的问题）”。"),
  chQ("“be”是什么意思？", ["是；是……的；在", "美丽的；漂亮的", "因为（最常用，能回答 Why 的问题）", "海滩"], "是；是……的；在", "“be”的意思是“是；是……的；在”。例句：I am a student."),
  matchQ(
    [["band", "乐队"], ["bank", "银行；河岸"], ["bar", "酒吧；吧台；条；块"], ["bath", "泡澡；浴缸"]],
    ["乐队", "银行；河岸", "酒吧；吧台；条；块", "泡澡；浴缸"],
    "band = 乐队 · bank = 银行；河岸 · bar = 酒吧；吧台；条；块 · bath = 泡澡；浴缸",
  ),
  chQ("选一个意思是“球”的单词完成句子：The children are playing with a _____.", ["banana", "band", "bank", "ball"], "ball", "“ball”的意思是“球”。例句：The children are playing with a ball."),
  tfQ("“bathroom”的意思是“美丽的；漂亮的”，对还是错？", "错", "“bathroom”的意思是“浴室；卫生间”。“美丽的；漂亮的”是“beautiful”的意思。"),
  chQ("哪个单词的意思是“包；袋子”？", ["band", "bag", "ball", "banana"], "bag", "“bag”的意思是“包；袋子”。例句：She put the apples in a bag."),
  chQ("选一个意思是“坏的；糟糕的；差的”的单词完成句子：The weather is _____ today.", ["ball", "bag", "banana", "bad"], "bad", "“bad”的意思是“坏的；糟糕的；差的”。例句：The weather is bad today."),
  fillQ(
    "I forgot my phone at school and had to go _____ to get it.",
    "I forgot my phone at school and had to go back to get it.",
    "back",
    "“back”= 回来；返回；（名词）背；后面。I forgot my phone at school and had to go back to get it.",
  ),
];

const CEFR_A1_L6_WORDS: EW[] = [
  ["beginning", "/bɪˈɡɪnɪŋ/", "名词", "开始；开头；开端", "名词；at the beginning of something", "At the beginning, I was very nervous.", "Read the story from the beginning."],
  ["bicycle", "/ˈbaɪsɪkl/", "名词", "自行车（完整说法）", "名词；ride a bicycle；简称是 bike", "She rides her bicycle to school.", "My new bicycle is red."],
  ["behind", "/bɪˈhaɪnd/", "介词", "在……后面", "表示位置的介词；behind + 名词", "The cat is behind the sofa.", "She parked behind my car."],
  ["between", "/bɪˈtwiːn/", "介词", "在（两者）之间", "介词；between A and B", "The shop is between the bank and the park.", "Sit between your mother and me."],
  ["beer", "/bɪə/", "名词", "啤酒", "名词；通常不可数，a beer 是一杯或一瓶啤酒", "He drank a cold beer.", "Would you like a beer?"],
  ["bed", "/bed/", "名词", "床", "名词；go to bed, in bed", "I go to bed at ten o'clock.", "The cat is sleeping on the bed."],
  ["better", "/ˈbetə/", "形容词", "更好的；好一些的", "good 和 well 的比较级；better than", "This book is better than that one.", "I feel better today."],
  ["begin", "/bɪˈɡɪn/", "动词", "开始", "不规则动词：begin, began, begun；begin to do", "The film begins at eight.", "It began to rain."],
  ["before", "/bɪˈfɔː/", "介词", "在……之前", "表示时间的介词和连词；反义词 after", "Please call me before nine o'clock.", "She left before the end of the film."],
  ["believe", "/bɪˈliːv/", "动词", "相信；信任", "动词；believe somebody, believe in something", "I believe you.", "She believes in hard work."],
  ["below", "/bɪˈləʊ/", "介词", "在……下面", "介词和副词；反义词 above", "The sun went below the hills.", "Write your name below the line."],
  ["best", "/best/", "形容词", "最好的；最佳的", "good 和 well 的最高级；the best", "This is the best day of my life.", "She is my best friend."],
  ["become", "/bɪˈkʌm/", "动词", "成为；变得", "不规则动词：become, became, become", "He wants to become a doctor.", "The weather became cold."],
  ["bedroom", "/ˈbedruːm/", "名词", "卧室", "名词；in the bedroom", "My bedroom is small but cosy.", "The house has three bedrooms."],
];

const CEFR_A1_L6_PRACTICE: QuizQuestion[] = [
  tfQ("“believe”的意思是“相信；信任”，对还是错？", "对", "“believe”的意思是“相信；信任”。"),
  chQ("哪个单词的意思是“在（两者）之间”？", ["bed", "between", "bicycle", "become"], "between", "“between”的意思是“在（两者）之间”。例句：The shop is between the bank and the park."),
  matchQ(
    [["before", "在……之前"], ["begin", "开始"], ["beginning", "开始；开头；开端"], ["behind", "在……后面"]],
    ["在……之前", "开始", "开始；开头；开端", "在……后面"],
    "before = 在……之前 · begin = 开始 · beginning = 开始；开头；开端 · behind = 在……后面",
  ),
  chQ("“bed”是什么意思？", ["卧室", "在……之前", "床", "啤酒"], "床", "“bed”的意思是“床”。例句：I go to bed at ten o'clock."),
  tfQ("“become”的意思是“啤酒”，对还是错？", "错", "“become”的意思是“成为；变得”。“啤酒”是“beer”的意思。"),
  chQ("选一个意思是“自行车（完整说法）”的单词完成句子：She rides her _____ to school.", ["bedroom", "bicycle", "bed", "become"], "bicycle", "“bicycle”的意思是“自行车（完整说法）”。例句：She rides her bicycle to school."),
  chQ("“beer”是什么意思？", ["开始", "开始；开头；开端", "啤酒", "在……之前"], "啤酒", "“beer”的意思是“啤酒”。例句：He drank a cold beer."),
  fillQ(
    "The _____ of the film was quiet, but the ending was very exciting.",
    "The beginning of the film was quiet, but the ending was very exciting.",
    "beginning",
    "“beginning”= 开始；开头；开端。The beginning of the film was quiet, but the ending was very exciting.",
  ),
  tfQ("“below”的意思是“在（两者）之间”，对还是错？", "错", "“below”的意思是“在……下面”。“在（两者）之间”是“between”的意思。"),
  chQ("“better”是什么意思？", ["更好的；好一些的", "成为；变得", "自行车（完整说法）", "在（两者）之间"], "更好的；好一些的", "“better”的意思是“更好的；好一些的”。例句：This book is better than that one."),
  matchQ(
    [["best", "最好的；最佳的"], ["better", "更好的；好一些的"], ["between", "在（两者）之间"], ["bicycle", "自行车（完整说法）"]],
    ["最好的；最佳的", "更好的；好一些的", "在（两者）之间", "自行车（完整说法）"],
    "best = 最好的；最佳的 · better = 更好的；好一些的 · between = 在（两者）之间 · bicycle = 自行车（完整说法）",
  ),
  chQ("选一个意思是“开始”的单词。", ["beginning", "believe", "begin", "behind"], "begin", "“begin”的意思是“开始”。例句：The film begins at eight."),
  tfQ("“bedroom”的意思是“开始”，对还是错？", "错", "“bedroom”的意思是“卧室”。“开始”是“begin”的意思。"),
  chQ("哪个单词的意思是“在……后面”？", ["best", "believe", "behind", "below"], "behind", "“behind”的意思是“在……后面”。例句：The cat is behind the sofa."),
  chQ("选一个意思是“相信；信任”的单词完成句子：I _____ you.", ["believe", "best", "below", "better"], "believe", "“believe”的意思是“相信；信任”。例句：I believe you."),
  fillQ(
    "The café is _____ the bank and the library, with one building on each side.",
    "The café is between the bank and the library, with one building on each side.",
    "between",
    "“between”= 在（两者）之间。The café is between the bank and the library, with one building on each side.",
  ),
];

const CEFR_A1_L7_WORDS: EW[] = [
  ["big", "/bɪɡ/", "形容词", "大的", "形容词；比较级 big, bigger, biggest", "They live in a big house.", "That is a very big dog."],
  ["book", "/bʊk/", "名词", "书", "名词；也作动词：预订", "I am reading an interesting book.", "She borrowed three books from the library."],
  ["boot", "/buːt/", "名词", "靴子", "名词，常用于复数：boots", "I wear boots when it rains.", "He bought a pair of black boots."],
  ["blue", "/bluː/", "形容词", "蓝色的", "表示颜色的形容词", "The sky is blue today.", "I bought a new blue T-shirt."],
  ["bird", "/bɜːd/", "名词", "鸟", "可数名词", "A small bird is singing in the tree.", "Many birds fly south in winter."],
  ["bill", "/bɪl/", "名词", "账单", "名词；pay the bill：付账", "Can I have the bill, please?", "We paid the electricity bill yesterday."],
  ["bored", "/bɔːd/", "形容词", "感到无聊的", "形容人的感受的形容词；be bored with sth", "The children were bored at home all day.", "I get bored when there is nothing to do."],
  ["black", "/blæk/", "形容词", "黑色的", "表示颜色的形容词", "He is wearing a black jacket.", "The cat has soft black fur."],
  ["body", "/ˈbɒdi/", "名词", "身体", "名词；the human body", "Exercise is good for your body.", "The human body needs a lot of water."],
  ["blonde", "/blɒnd/", "形容词", "金黄色的（头发）", "形容词，常形容头发；男性用 blond", "She has long blonde hair.", "The little girl is blonde like her mother."],
  ["blog", "/blɒɡ/", "名词", "博客", "名词；write a blog：写博客", "She writes a blog about cooking.", "I read his travel blog every week."],
  ["birthday", "/ˈbɜːθdeɪ/", "名词", "生日", "名词；Happy birthday!：生日快乐！", "My birthday is in May.", "We had a party for her birthday."],
  ["bike", "/baɪk/", "名词", "自行车（简称）", "名词；ride a bike：骑自行车", "I ride my bike to school every day.", "My new bike is red and very fast."],
  ["boat", "/bəʊt/", "名词", "船；小船", "名词；by boat：乘船", "We crossed the lake by boat.", "A small boat is on the river."],
];

const CEFR_A1_L7_PRACTICE: QuizQuestion[] = [
  tfQ("“big”的意思是“大的”，对还是错？", "对", "“big”的意思是“大的”。"),
  chQ("哪个单词的意思是“书”？", ["book", "big", "boot", "bored"], "book", "“book”的意思是“书”。例句：I am reading an interesting book."),
  matchQ(
    [["body", "身体"], ["book", "书"], ["boot", "靴子"], ["bored", "感到无聊的"]],
    ["书", "身体", "感到无聊的", "靴子"],
    "body = 身体 · book = 书 · boot = 靴子 · bored = 感到无聊的",
  ),
  chQ("“bored”是什么意思？", ["自行车（简称）", "大的", "感到无聊的", "账单"], "感到无聊的", "“bored”的意思是“感到无聊的”。例句：The children were bored at home all day."),
  tfQ("“blonde”的意思是“金黄色的（头发）”，对还是错？", "对", "“blonde”的意思是“金黄色的（头发）”。"),
  chQ("选一个意思是“账单”的单词完成句子：Can I have the _____, please?", ["black", "bird", "birthday", "bill"], "bill", "“bill”的意思是“账单”。例句：Can I have the bill, please?"),
  chQ("“boat”是什么意思？", ["靴子", "书", "船；小船", "身体"], "船；小船", "“boat”的意思是“船；小船”。例句：We crossed the lake by boat."),
  fillQ(
    "The student updated her ____ with a new account of her exchange trip.",
    "The student updated her blog with a new account of her exchange trip.",
    "blog",
    "“blog”= 博客。The student updated her blog with a new account of her exchange trip.",
  ),
  tfQ("“bike”的意思是“自行车（简称）”，对还是错？", "对", "“bike”的意思是“自行车（简称）”。"),
  chQ("“boot”是什么意思？", ["自行车（简称）", "感到无聊的", "大的", "靴子"], "靴子", "“boot”的意思是“靴子”。例句：I wear boots when it rains."),
  matchQ(
    [["black", "黑色的"], ["blog", "博客"], ["blonde", "金黄色的（头发）"], ["blue", "蓝色的"]],
    ["蓝色的", "金黄色的（头发）", "黑色的", "博客"],
    "black = 黑色的 · blog = 博客 · blonde = 金黄色的（头发） · blue = 蓝色的",
  ),
  chQ("选一个意思是“鸟”的单词完成句子：A small _____ is singing in the tree.", ["birthday", "black", "bird", "blog"], "bird", "“bird”的意思是“鸟”。例句：A small bird is singing in the tree."),
  tfQ("“blue”的意思是“书”，对还是错？", "错", "“blue”的意思是“蓝色的”。“书”是“book”的意思。"),
  chQ("哪个单词的意思是“生日”？", ["blonde", "bike", "birthday", "black"], "birthday", "“birthday”的意思是“生日”。例句：My birthday is in May."),
  chQ("选一个意思是“大的”的单词完成句子：They live in a _____ house.", ["bill", "big", "bird", "bike"], "big", "“big”的意思是“大的”。例句：They live in a big house."),
  fillQ(
    "I borrowed a ____ from the library and read its two hundred pages.",
    "I borrowed a book from the library and read its two hundred pages.",
    "book",
    "“book”= 书。I borrowed a book from the library and read its two hundred pages.",
  ),
];

const CEFR_A1_L8_WORDS: EW[] = [
  ["boy", "/bɔɪ/", "名词", "男孩", "可数名词", "The boy is playing football.", "A young boy helped me carry the bags."],
  ["both", "/bəʊθ/", "限定词", "两者都", "限定词，放在复数名词前面；both ... and ...", "Both children like ice cream.", "I have two cats and I love them both."],
  ["building", "/ˈbɪldɪŋ/", "名词", "建筑；大楼", "可数名词", "That tall building is a hospital.", "Our office is in this building."],
  ["bottle", "/ˈbɒtl/", "名词", "瓶子", "名词；a bottle of + 饮料", "She drank a whole bottle of water.", "There is some milk in the bottle."],
  ["break", "/breɪk/", "动词", "打破；弄断；（名词）休息", "不规则动词：break, broke, broken", "Be careful, don't break the glass.", "He broke his leg while skiing."],
  ["boring", "/ˈbɔːrɪŋ/", "形容词", "无聊的；令人厌烦的", "形容让人生厌的事物", "The film was long and boring.", "His new job is very boring."],
  ["born", "/bɔːn/", "动词", "出生", "常用被动形式：be born in + 地点/年份", "I was born in 1990.", "She was born in a small town."],
  ["boyfriend", "/ˈbɔɪfrend/", "名词", "男朋友", "可数名词", "Her boyfriend is a doctor.", "I met my boyfriend at school."],
  ["build", "/bɪld/", "动词", "建造", "不规则动词：build, built, built", "They want to build a new house.", "Workers are building a bridge over the river."],
  ["bread", "/bred/", "名词", "面包", "不可数名词；a loaf of bread", "I eat bread and eggs for breakfast.", "She bought a fresh loaf of bread."],
  ["breakfast", "/ˈbrekfəst/", "名词", "早餐", "名词；have breakfast：吃早餐", "I have breakfast at seven o'clock.", "We ate a big breakfast this morning."],
  ["brown", "/braʊn/", "形容词", "棕色的", "表示颜色的形容词", "She has beautiful brown eyes.", "The dog is brown and white."],
  ["brother", "/ˈbrʌðə/", "名词", "哥哥；弟弟", "表示亲属的名词", "My brother is older than me.", "He has two younger brothers."],
  ["box", "/bɒks/", "名词", "盒子；箱子", "可数名词", "He put the books in a big box.", "There are some old toys in the box."],
  ["bring", "/brɪŋ/", "动词", "带来；拿来", "不规则动词：bring, brought, brought", "Please bring your book to class.", "She brought some food to the party."],
];

const CEFR_A1_L8_PRACTICE: QuizQuestion[] = [
  tfQ("“both”的意思是“男孩”，对还是错？", "错", "“both”的意思是“两者都”。“男孩”是“boy”的意思。"),
  chQ("哪个单词的意思是“盒子；箱子”？", ["boy", "box", "bread", "boyfriend"], "box", "“box”的意思是“盒子；箱子”。例句：He put the books in a big box."),
  matchQ(
    [["build", "建造"], ["building", "建筑；大楼"], ["boring", "无聊的；令人厌烦的"], ["born", "出生"]],
    ["建造", "建筑；大楼", "出生", "无聊的；令人厌烦的"],
    "build = 建造 · building = 建筑；大楼 · boring = 无聊的；令人厌烦的 · born = 出生",
  ),
  chQ("“breakfast”是什么意思？", ["棕色的", "早餐", "哥哥；弟弟", "带来；拿来"], "早餐", "“breakfast”的意思是“早餐”。例句：I have breakfast at seven o'clock."),
  tfQ("“bread”的意思是“面包”，对还是错？", "对", "“bread”的意思是“面包”。"),
  chQ("选一个意思是“哥哥；弟弟”的单词完成句子：My _____ is older than me.", ["boy", "brother", "boyfriend", "born"], "brother", "“brother”的意思是“哥哥；弟弟”。例句：My brother is older than me."),
  chQ("“brown”是什么意思？", ["建造", "建筑；大楼", "棕色的", "无聊的；令人厌烦的"], "棕色的", "“brown”的意思是“棕色的”。例句：She has beautiful brown eyes."),
  fillQ(
    "After dating for six months, she introduced her ___ to her parents.",
    "After dating for six months, she introduced her boyfriend to her parents.",
    "boyfriend",
    "“boyfriend”= 男朋友。After dating for six months, she introduced her boyfriend to her parents.",
  ),
  tfQ("“born”的意思是“盒子；箱子”，对还是错？", "错", "“born”的意思是“出生”。“盒子；箱子”是“box”的意思。"),
  chQ("“bottle”是什么意思？", ["瓶子", "早餐", "男孩", "带来；拿来"], "瓶子", "“bottle”的意思是“瓶子”。例句：She drank a whole bottle of water."),
  matchQ(
    [["building", "建筑；大楼"], ["boring", "无聊的；令人厌烦的"], ["born", "出生"], ["both", "两者都"]],
    ["出生", "无聊的；令人厌烦的", "两者都", "建筑；大楼"],
    "building = 建筑；大楼 · boring = 无聊的；令人厌烦的 · born = 出生 · both = 两者都",
  ),
  chQ("选一个意思是“男孩”的单词完成句子：The _____ is playing football.", ["bread", "boy", "boyfriend", "break"], "boy", "“boy”的意思是“男孩”。例句：The boy is playing football."),
  tfQ("“break”的意思是“哥哥；弟弟”，对还是错？", "错", "“break”的意思是“打破；弄断；（名词）休息”。“哥哥；弟弟”是“brother”的意思。"),
  chQ("哪个单词的意思是“带来；拿来”？", ["build", "both", "brown", "bring"], "bring", "“bring”的意思是“带来；拿来”。例句：Please bring your book to class."),
  chQ("选一个意思是“无聊的；令人厌烦的”的单词完成句子：The film was long and _____.", ["both", "born", "bottle", "boring"], "boring", "“boring”的意思是“无聊的；令人厌烦的”。例句：The film was long and boring."),
  fillQ(
    "Anna and Tom are twins, and ____ of them were born on the same day.",
    "Anna and Tom are twins, and both of them were born on the same day.",
    "both",
    "“both”= 两者都。Anna and Tom are twins, and both of them were born on the same day.",
  ),
];

const CEFR_A1_L9_WORDS: EW[] = [
  ["camera", "/ˈkæmrə/", "名词", "相机；摄像机", "可数名词", "He took a photo with his new camera.", "This camera is very small and light."],
  ["butter", "/ˈbʌtə/", "名词", "黄油", "不可数名词", "I put some butter on my bread.", "There is no butter in the fridge."],
  ["bus", "/bʌs/", "名词", "公共汽车", "名词；by bus：乘公共汽车", "I go to work by bus.", "The bus stops near my house."],
  ["business", "/ˈbɪznəs/", "名词", "生意；工作", "名词；on business：出差", "He runs a small business.", "She is in London on business this week."],
  ["can", "/kæn/", "情态动词", "能；可以", "情态动词；can + 动词原形", "I can swim very well.", "Can you help me, please?"],
  ["buy", "/baɪ/", "动词", "买", "不规则动词：buy, bought, bought", "I want to buy a new phone.", "She bought a gift for her mother."],
  ["capital", "/ˈkæpɪtl/", "名词", "首都", "名词；the capital of + 国家名", "Hanoi is the capital of Vietnam.", "Paris is the capital of France."],
  ["call", "/kɔːl/", "动词", "打电话；叫", "动词；call sb：给某人打电话", "I will call you tonight.", "She called her mother on the phone."],
  ["cake", "/keɪk/", "名词", "蛋糕", "名词；a piece of cake：一块蛋糕", "She made a delicious chocolate cake.", "We ate cake at the party."],
  ["but", "/bʌt/", "连词", "但是", "连接两个相反意思的连词", "I like tea but I don't like coffee.", "The room is small but comfortable."],
  ["bye", "/baɪ/", "感叹词", "再见", "告别时用的感叹词，比较亲切", "Bye! See you tomorrow.", "She said bye and left the room."],
  ["cannot", "/ˈkænɒt/", "情态动词", "不能", "can 的否定形式；cannot + 动词原形", "I cannot find my keys.", "She cannot come to the party today."],
  ["by", "/baɪ/", "介词", "被；用；旁边", "介词；表示被动语态中的动作执行者或方式", "This book was written by a famous author.", "We traveled to the city by train."],
  ["busy", "/ˈbɪzi/", "形容词", "忙的", "形容词；be busy with sth / doing sth", "I am very busy today.", "The streets are busy in the morning."],
  ["cafe", "/ˈkæfeɪ/", "名词", "咖啡馆", "可数名词", "Let's meet at the cafe near the station.", "We had coffee at a small cafe."],
];

const CEFR_A1_L9_PRACTICE: QuizQuestion[] = [
  tfQ("“cannot”的意思是“生意；工作”，对还是错？", "错", "“cannot”的意思是“不能”。“生意；工作”是“business”的意思。"),
  chQ("哪个单词的意思是“生意；工作”？", ["but", "business", "butter", "busy"], "business", "“business”的意思是“生意；工作”。例句：He runs a small business."),
  matchQ(
    [["bye", "再见"], ["cafe", "咖啡馆"], ["cake", "蛋糕"], ["call", "打电话；叫"]],
    ["蛋糕", "再见", "打电话；叫", "咖啡馆"],
    "bye = 再见 · cafe = 咖啡馆 · cake = 蛋糕 · call = 打电话；叫",
  ),
  chQ("“bus”是什么意思？", ["生意；工作", "忙的", "公共汽车", "但是"], "公共汽车", "“bus”的意思是“公共汽车”。例句：I go to work by bus."),
  tfQ("“but”的意思是“被；用；旁边”，对还是错？", "错", "“but”的意思是“但是”。“被；用；旁边”是“by”的意思。"),
  chQ("选一个合适的单词填空：I _____ swim very well.", ["cannot", "bye", "can", "call"], "can", "“can”的意思是“能；可以”。例句：I can swim very well."),
  chQ("“camera”是什么意思？", ["忙的", "相机", "被；用；旁边", "不能"], "相机", "“camera”的意思是“相机”。例句：He took a photo with his new camera."),
  fillQ(
    "Please ___ your grandmother on the telephone and ask how she is.",
    "Please call your grandmother on the telephone and ask how she is.",
    "call",
    "“call”= 打电话；叫。Please call your grandmother on the telephone and ask how she is.",
  ),
  tfQ("“cafe”的意思是“相机”，对还是错？", "错", "“cafe”的意思是“咖啡馆”。“相机”是“camera”的意思。"),
  chQ("“cake”是什么意思？", ["蛋糕", "但是", "黄油", "再见"], "蛋糕", "“cake”的意思是“蛋糕”。例句：She made a delicious chocolate cake."),
  matchQ(
    [["capital", "首都"], ["bus", "公共汽车"], ["business", "生意；工作"], ["busy", "忙的"]],
    ["忙的", "公共汽车", "生意；工作", "首都"],
    "capital = 首都 · bus = 公共汽车 · business = 生意；工作 · busy = 忙的",
  ),
  chQ("I want to _____ a new phone.", ["butter", "buy", "business", "call"], "buy", "“buy”的意思是“买”。例句：I want to buy a new phone."),
  tfQ("“butter”的意思是“黄油”，对还是错？", "对", "“butter”的意思是“黄油”。"),
  chQ("哪个单词的意思是“被；用；旁边”？", ["by", "buy", "cafe", "but"], "by", "“by”的意思是“被；用；旁边”。例句：This book was written by a famous author."),
  chQ("I am very _____ today.", ["but", "busy", "cake", "butter"], "busy", "“busy”的意思是“忙的”。例句：I am very busy today."),
  fillQ(
    "The door is locked, so we ___ enter the room without a key.",
    "The door is locked, so we cannot enter the room without a key.",
    "cannot",
    "“cannot”= 不能。The door is locked, so we cannot enter the room without a key.",
  ),
];

const CEFR_A1_L10_WORDS: EW[] = [
  ["cheap", "/tʃiːp/", "形容词", "便宜的", "形容词；反义词 expensive", "This shirt is very cheap.", "We found a cheap hotel near the beach."],
  ["check", "/tʃek/", "动词", "检查", "动词；check sth", "Please check your answers again.", "I need to check my email."],
  ["centre", "/ˈsentə/", "名词", "中心", "名词；center 的英式拼法", "There is a park in the centre of the city.", "We met at the shopping centre."],
  ["cent", "/sent/", "名词", "美分", "名词；100 cent = 1 dollar", "This apple costs fifty cents.", "I don't have a single cent left."],
  ["carrot", "/ˈkærət/", "名词", "胡萝卜", "可数名词", "Rabbits love to eat carrots.", "I put some carrots in the soup."],
  ["cat", "/kæt/", "名词", "猫", "可数名词", "The cat is sleeping on the sofa.", "My sister has a black cat."],
  ["car", "/kɑː/", "名词", "汽车", "可数名词；by car 是乘汽车的意思", "My father drives a red car.", "We go to school by car."],
  ["cheese", "/tʃiːz/", "名词", "奶酪", "不可数名词", "I like cheese on my pizza.", "She bought some cheese at the market."],
  ["change", "/tʃeɪndʒ/", "动词", "改变；零钱", "既是动词也是名词", "I want to change my plans.", "Here is your change, sir."],
  ["chair", "/tʃeə/", "名词", "椅子", "可数名词", "Please sit on this chair.", "There are four chairs around the table."],
  ["chart", "/tʃɑːt/", "名词", "图表", "可数名词", "The teacher drew a chart on the board.", "This chart shows the weather for the week."],
  ["century", "/ˈsentʃəri/", "名词", "世纪；一百年", "可数名词", "This church is over a century old.", "We live in the twenty-first century."],
  ["carry", "/ˈkæri/", "动词", "拿；提；携带", "动词；carry sth", "She carried the heavy bag upstairs.", "Can you carry this box for me?"],
  ["career", "/kəˈrɪə/", "名词", "职业；事业", "名词；a career in + 领域", "She wants a career in medicine.", "He had a long career as a teacher."],
  ["card", "/kɑːd/", "名词", "卡片；贺卡", "可数名词", "She sent me a birthday card.", "I paid with my credit card."],
];

const CEFR_A1_L10_PRACTICE: QuizQuestion[] = [
  tfQ("“century”的意思是“图表”，对还是错？", "错", "“century”的意思是“世纪；一百年”。“图表”是“chart”的意思。"),
  chQ("哪个单词的意思是“椅子”？", ["chair", "car", "cat", "chart"], "chair", "“chair”的意思是“椅子”。例句：Please sit on this chair."),
  matchQ(
    [["carry", "拿；提；携带"], ["cat", "猫"], ["cent", "美分"], ["centre", "中心"]],
    ["中心", "拿；提；携带", "猫", "美分"],
    "carry = 拿；提；携带 · cat = 猫 · cent = 美分 · centre = 中心",
  ),
  chQ("“change”是什么意思？", ["拿；提；携带", "改变；零钱", "图表", "胡萝卜"], "改变；零钱", "“change”的意思是“改变；零钱”。例句：I want to change my plans."),
  tfQ("“cheap”的意思是“汽车”，对还是错？", "错", "“cheap”的意思是“便宜的”。“汽车”是“car”的意思。"),
  chQ("哪个单词的意思是“美分”？", ["cent", "check", "cheap", "card"], "cent", "“cent”的意思是“美分”。例句：This apple costs fifty cents."),
  chQ("“car”是什么意思？", ["职业；事业", "卡片；贺卡", "拿；提；携带", "汽车"], "汽车", "“car”的意思是“汽车”。例句：My father drives a red car."),
  fillQ(
    "The rabbit was eating an orange ___ with green leaves at the top.",
    "The rabbit was eating an orange carrot with green leaves at the top.",
    "carrot",
    "“carrot”= 胡萝卜。The rabbit was eating an orange carrot with green leaves at the top.",
  ),
  tfQ("“cheese”的意思是“职业；事业”，对还是错？", "错", "“cheese”的意思是“奶酪”。“职业；事业”是“career”的意思。"),
  chQ("“career”是什么意思？", ["职业；事业", "卡片；贺卡", "胡萝卜", "检查"], "职业；事业", "“career”的意思是“职业；事业”。例句：She wants a career in medicine."),
  matchQ(
    [["centre", "中心"], ["century", "世纪；一百年"], ["chair", "椅子"], ["change", "改变；零钱"]],
    ["世纪；一百年", "椅子", "改变；零钱", "中心"],
    "centre = 中心 · century = 世纪；一百年 · chair = 椅子 · change = 改变；零钱",
  ),
  chQ("Please _____ your answers again.", ["century", "check", "change", "card"], "check", "“check”的意思是“检查”。例句：Please check your answers again."),
  tfQ("“cat”的意思是“猫”，对还是错？", "对", "“cat”的意思是“猫”。"),
  chQ("哪个单词的意思是“卡片；贺卡”？", ["cat", "chair", "chart", "card"], "card", "“card”的意思是“卡片；贺卡”。例句：She sent me a birthday card."),
  chQ("The teacher drew a _____ on the board.", ["chart", "centre", "cat", "chair"], "chart", "“chart”的意思是“图表”。例句：The teacher drew a chart on the board."),
  fillQ(
    "One _____ is a period of exactly one hundred years.",
    "One century is a period of exactly one hundred years.",
    "century",
    "“century”= 世纪；一百年。One century is a period of exactly one hundred years.",
  ),
];

const CEFR_A1_L11_WORDS: EW[] = [
  ["cinema", "/ˈsɪnəmə/", "名词", "电影院", "名词；go to the cinema 是去看电影", "We went to the cinema last night.", "There is a new cinema in town."],
  ["chocolate", "/ˈtʃɒklət/", "名词", "巧克力", "名词；hot chocolate 是热可可", "She gave me a box of chocolate.", "I love hot chocolate in winter."],
  ["club", "/klʌb/", "名词", "俱乐部", "可数名词", "He joined the football club.", "Our book club meets every month."],
  ["clothes", "/kləʊðz/", "名词", "衣服", "名词，恒用复数形式", "I need to buy some new clothes.", "She washes her clothes on Sunday."],
  ["close", "/kləʊz/", "动词", "关；近的", "动词是关的意思；形容词是近的意思", "Please close the door.", "The shop is close to my house."],
  ["coat", "/kəʊt/", "名词", "外套；大衣", "可数名词", "Put on your coat; it is cold outside.", "She bought a warm winter coat."],
  ["clock", "/klɒk/", "名词", "挂钟；座钟", "可数名词", "The clock on the wall is slow.", "Look at the clock; it is time to go."],
  ["coffee", "/ˈkɒfi/", "名词", "咖啡", "名词；a cup of coffee 是一杯咖啡", "I drink coffee every morning.", "Would you like a cup of coffee?"],
  ["chicken", "/ˈtʃɪkɪn/", "名词", "鸡；鸡肉", "名词；既指鸡这种动物也指鸡肉", "We have chicken for dinner tonight.", "The farmer keeps ten chickens."],
  ["class", "/klɑːs/", "名词", "班级；课", "可数名词", "There are thirty students in my class.", "I have an English class at nine."],
  ["child", "/tʃaɪld/", "名词", "孩子", "可数名词；复数是 children", "The child is playing in the garden.", "Every child in the class has a book."],
  ["climb", "/klaɪm/", "动词", "爬", "动词；climb (up) sth", "The cat climbed up the tree.", "We climbed the mountain together."],
  ["choose", "/tʃuːz/", "动词", "选择", "不规则动词；choose sth", "You can choose any colour you like.", "It is hard to choose between the two."],
  ["city", "/ˈsɪti/", "名词", "城市", "可数名词", "New York is a very big city.", "She lives in a small city."],
  ["clean", "/kliːn/", "形容词", "干净的；打扫", "既是形容词也是动词", "Please keep your room clean.", "I clean the kitchen every morning."],
  ["classroom", "/ˈklɑːsruːm/", "名词", "教室", "可数名词", "Our classroom is on the second floor.", "The students are quiet in the classroom."],
];

const CEFR_A1_L11_PRACTICE: QuizQuestion[] = [
  tfQ("“chocolate”的意思是“巧克力”，对还是错？", "对", "“chocolate”的意思是“巧克力”。"),
  chQ("哪个单词的意思是“电影院”？", ["cinema", "clean", "class", "city"], "cinema", "“cinema”的意思是“电影院”。例句：We went to the cinema last night."),
  matchQ(
    [["city", "城市"], ["class", "班级；课"], ["clean", "干净的；打扫"], ["climb", "爬"]],
    ["城市", "班级；课", "爬", "干净的；打扫"],
    "city = 城市 · class = 班级；课 · clean = 干净的；打扫 · climb = 爬",
  ),
  chQ("“choose”是什么意思？", ["班级；课", "电影院", "选择", "城市"], "选择", "“choose”的意思是“选择”。例句：You can choose any colour you like."),
  tfQ("“class”的意思是“班级；课”，对还是错？", "对", "“class”的意思是“班级；课”。"),
  chQ("选一个意思是“衣服”的单词完成句子：I need to buy some new _____.", ["clothes", "coat", "club", "coffee"], "clothes", "“clothes”的意思是“衣服”。例句：I need to buy some new clothes."),
  chQ("“coat”是什么意思？", ["孩子", "外套；大衣", "咖啡", "鸡；鸡肉"], "外套；大衣", "“coat”的意思是“外套；大衣”。例句：Put on your coat; it is cold outside."),
  fillQ(
    "We had roast _____ with potatoes for Sunday dinner.",
    "We had roast chicken with potatoes for Sunday dinner.",
    "chicken",
    "“chicken”= 鸡；鸡肉。We had roast chicken with potatoes for Sunday dinner.",
  ),
  tfQ("“close”的意思是“外套；大衣”，对还是错？", "错", "“close”的意思是“关；近的”。“外套；大衣”是“coat”的意思。"),
  chQ("“child”是什么意思？", ["孩子", "选择", "电影院", "巧克力"], "孩子", "“child”的意思是“孩子”。例句：The child is playing in the garden."),
  matchQ(
    [["club", "俱乐部"], ["coat", "外套；大衣"], ["coffee", "咖啡"], ["chicken", "鸡；鸡肉"]],
    ["俱乐部", "咖啡", "鸡；鸡肉", "外套；大衣"],
    "club = 俱乐部 · coat = 外套；大衣 · coffee = 咖啡 · chicken = 鸡；鸡肉",
  ),
  chQ("选一个意思是“教室”的单词完成句子：Our _____ is on the second floor.", ["clock", "classroom", "clean", "climb"], "classroom", "“classroom”的意思是“教室”。例句：Our classroom is on the second floor."),
  tfQ("“coffee”的意思是“巧克力”，对还是错？", "错", "“coffee”的意思是“咖啡”。“巧克力”是“chocolate”的意思。"),
  chQ("哪个单词的意思是“干净的；打扫”？", ["clock", "clean", "close", "climb"], "clean", "“clean”的意思是“干净的；打扫”。例句：Please keep your room clean."),
  chQ("选一个意思是“挂钟；座钟”的单词完成句子：The _____ on the wall is slow.", ["clothes", "clock", "club", "close"], "clock", "“clock”的意思是“挂钟；座钟”。例句：The clock on the wall is slow."),
  fillQ(
    "We had to _____ a long flight of stairs to reach the top of the tower.",
    "We had to climb a long flight of stairs to reach the top of the tower.",
    "climb",
    "“climb”= 爬。We had to climb a long flight of stairs to reach the top of the tower.",
  ),
];

const CEFR_A1_L12_WORDS: EW[] = [
  ["cost", "/kɒst/", "动词", "花费；值（多少钱）；（名词）费用；价格", "动词：cost + 金额；How much does it cost?", "How much does this book cost?", "The tickets cost ten dollars."],
  ["complete", "/kəmˈpliːt/", "动词", "完成；完整的", "动词：complete sth；也作形容词，意思是完整的", "Please complete the form.", "I have the complete set of books."],
  ["colour", "/ˈkʌlə/", "名词", "颜色", "名词；color 的英式拼法", "What is your favourite colour?", "The sky is a beautiful blue colour."],
  ["college", "/ˈkɒlɪdʒ/", "名词", "学院；大学", "名词；go to college 是上大学", "My brother goes to college.", "She studies art at college."],
  ["compare", "/kəmˈpeə/", "动词", "比较", "动词：compare A with/to B", "Let's compare the two pictures.", "Compare your answers with a partner."],
  ["cook", "/kʊk/", "动词", "做饭；（名词）厨师", "动词：cook sth；名词指做饭的人", "My mother cooks dinner every evening.", "He is a very good cook."],
  ["cooking", "/ˈkʊkɪŋ/", "名词", "做饭；烹饪", "不可数名词：do the cooking", "I love cooking.", "My dad does the cooking at home."],
  ["common", "/ˈkɒmən/", "形容词", "常见的；普通的", "形容词", "Smith is a common family name.", "Rain is common in this season."],
  ["company", "/ˈkʌmpəni/", "名词", "公司；陪伴", "名词", "He works for a big company.", "Thank you for your company today."],
  ["cold", "/kəʊld/", "形容词", "冷的", "形容词；反义词 hot", "The water is too cold.", "It is very cold in winter."],
  ["correct", "/kəˈrekt/", "形容词", "正确的", "形容词：the correct answer", "That is the correct answer.", "Is my phone number correct?"],
  ["come", "/kʌm/", "动词", "来", "不规则动词；come to, come from", "Please come to my house tonight.", "She comes from Japan."],
  ["concert", "/ˈkɒnsət/", "名词", "音乐会", "名词：go to a concert", "We went to a concert last night.", "The concert starts at eight o'clock."],
  ["computer", "/kəmˈpjuːtə/", "名词", "电脑", "可数名词：on the computer", "I work on my computer every day.", "She has a new computer."],
  ["conversation", "/ˌkɒnvəˈseɪʃn/", "名词", "谈话；对话", "名词：have a conversation with sb", "We had a long conversation about music.", "I had a nice conversation with my teacher."],
  ["cool", "/kuːl/", "形容词", "凉爽的；（口语）酷的；棒的", "形容词：表示天气微凉或夸东西好", "The weather is cool today.", "Your new bike is really cool."],
];

const CEFR_A1_L12_PRACTICE: QuizQuestion[] = [
  tfQ("“compare”的意思是“音乐会”，对还是错？", "错", "“compare”的意思是“比较”。“音乐会”是“concert”的意思。"),
  chQ("哪个单词的意思是“凉爽的；（口语）酷的；棒的”？", ["cool", "correct", "cost", "cold"], "cool", "“cool”的意思是“凉爽的；（口语）酷的；棒的”。例句：The weather is cool today."),
  matchQ(
    [["come", "来"], ["common", "常见的；普通的"], ["company", "公司；陪伴"], ["compare", "比较"]],
    ["来", "比较", "公司；陪伴", "常见的；普通的"],
    "come = 来 · common = 常见的；普通的 · company = 公司；陪伴 · compare = 比较",
  ),
  chQ("“colour”是什么意思？", ["公司；陪伴", "颜色", "来", "常见的；普通的"], "颜色", "“colour”的意思是“颜色”。例句：What is your favourite colour?"),
  tfQ("“cooking”的意思是“做饭；烹饪”，对还是错？", "对", "“cooking”的意思是“做饭；烹饪”。"),
  chQ("选一个意思是“谈话；对话”的单词完成句子：We had a long _____ about music.", ["conversation", "cook", "cooking", "cool"], "conversation", "“conversation”的意思是“谈话；对话”。例句：We had a long conversation about music."),
  chQ("“college”是什么意思？", ["来", "颜色", "学院；大学", "常见的；普通的"], "学院；大学", "“college”的意思是“学院；大学”。例句：My brother goes to college."),
  fillQ(
    "Please _____ all ten questions before you hand in the worksheet.",
    "Please complete all ten questions before you hand in the worksheet.",
    "complete",
    "“complete”= 完成；完整的。Please complete all ten questions before you hand in the worksheet.",
  ),
  tfQ("“correct”的意思是“正确的”，对还是错？", "对", "“correct”的意思是“正确的”。"),
  chQ("“cost”是什么意思？", ["颜色", "花费；值（多少钱）；（名词）费用；价格", "学院；大学", "冷的"], "花费；值（多少钱）；（名词）费用；价格", "“cost”的意思是“花费；值（多少钱）；（名词）费用；价格”。例句：How much does this book cost?"),
  matchQ(
    [["concert", "音乐会"], ["conversation", "谈话；对话"], ["cook", "做饭；（名词）厨师"], ["cooking", "做饭；烹饪"]],
    ["谈话；对话", "音乐会", "做饭；（名词）厨师", "做饭；烹饪"],
    "concert = 音乐会 · conversation = 谈话；对话 · cook = 做饭；（名词）厨师 · cooking = 做饭；烹饪",
  ),
  chQ("选一个意思是“常见的；普通的”的单词完成句子：Smith is a _____ family name.", ["common", "compare", "complete", "company"], "common", "“common”的意思是“常见的；普通的”。例句：Smith is a common family name."),
  tfQ("“company”的意思是“电脑”，对还是错？", "错", "“company”的意思是“公司；陪伴”。“电脑”是“computer”的意思。"),
  chQ("哪个单词的意思是“冷的”？", ["come", "cold", "college", "colour"], "cold", "“cold”的意思是“冷的”。例句：The water is too cold."),
  chQ("选一个意思相符的单词：“做饭；（名词）厨师”。", ["cook", "correct", "cool", "cooking"], "cook", "“cook”的意思是“做饭；（名词）厨师”。例句：My mother cooks dinner every evening."),
  fillQ(
    "I wrote my essay on a _____ using a keyboard and screen.",
    "I wrote my essay on a computer using a keyboard and screen.",
    "computer",
    "“computer”= 电脑。I wrote my essay on a computer using a keyboard and screen.",
  ),
];

const CEFR_A1_L13_WORDS: EW[] = [
  ["create", "/kriˈeɪt/", "动词", "创造；创作", "动词：create sth", "The children created a beautiful picture.", "He wants to create his own website."],
  ["dance", "/dɑːns/", "动词", "跳舞；（名词）舞蹈", "动词：dance with sb；也是名词", "They danced all night at the party.", "Let's dance together."],
  ["customer", "/ˈkʌstəmə(r)/", "名词", "顾客", "名词：a customer in a shop", "The shop has many customers.", "A customer is waiting at the door."],
  ["dangerous", "/ˈdeɪndʒərəs/", "形容词", "危险的", "形容词：a dangerous place", "This road is very dangerous.", "It is dangerous to swim here."],
  ["cup", "/kʌp/", "名词", "杯子", "名词：a cup of tea/coffee", "Can I have a cup of tea?", "She drank two cups of coffee."],
  ["cream", "/kriːm/", "名词", "奶油；奶油色", "不可数名词：cream in coffee", "I like cream in my coffee.", "She put some cream on the cake."],
  ["could", "/kʊd/", "情态动词", "能（can 的过去式）；用于礼貌请求", "情态动词：could + 动词原形", "She could swim when she was five.", "Could you help me, please?"],
  ["course", "/kɔːs/", "名词", "课程", "名词：an English course；of course 是当然的意思", "I am taking an English course.", "She finished a cooking course last month."],
  ["dancing", "/ˈdɑːnsɪŋ/", "名词", "跳舞", "不可数名词：go dancing", "I love dancing.", "We went dancing on Saturday night."],
  ["cousin", "/ˈkʌzn/", "名词", "表兄弟姐妹；堂兄弟姐妹", "名词：my cousin", "My cousin lives in Hanoi.", "I have two cousins in Australia."],
  ["cut", "/kʌt/", "动词", "切；割", "不规则动词：cut, cut, cut", "Please cut the paper in half.", "He cut the apple into four pieces."],
  ["dancer", "/ˈdɑːnsə/", "名词", "舞者", "指人的名词：a good dancer", "She is a famous dancer.", "My sister wants to be a dancer."],
  ["dad", "/dæd/", "名词", "爸爸", "名词（亲切说法）：my dad", "My dad works in a bank.", "Where is your dad?"],
  ["cow", "/kaʊ/", "名词", "母牛", "可数名词：a cow, cows", "The farmer has ten cows.", "A cow is eating grass in the field."],
  ["country", "/ˈkʌntri/", "名词", "国家；乡下", "名词：a country；the country 也指乡下", "Vietnam is a beautiful country.", "How many countries have you visited?"],
  ["culture", "/ˈkʌltʃə/", "名词", "文化", "名词：Vietnamese culture", "I want to learn about Japanese culture.", "Food is an important part of our culture."],
];

const CEFR_A1_L13_PRACTICE: QuizQuestion[] = [
  tfQ("“dancer”的意思是“舞者”，对还是错？", "对", "“dancer”的意思是“舞者”。"),
  chQ("哪个单词的意思是“爸爸”？", ["dance", "dad", "dangerous", "dancer"], "dad", "“dad”的意思是“爸爸”。例句：My dad works in a bank."),
  matchQ(
    [["cow", "母牛"], ["cream", "奶油；奶油色"], ["create", "创造；创作"], ["culture", "文化"]],
    ["文化", "母牛", "创造；创作", "奶油；奶油色"],
    "cow = 母牛 · cream = 奶油；奶油色 · create = 创造；创作 · culture = 文化",
  ),
  chQ("“cup”是什么意思？", ["杯子", "顾客", "爸爸", "切；割"], "杯子", "“cup”的意思是“杯子”。例句：Can I have a cup of tea?"),
  tfQ("“dance”的意思是“跳舞；（名词）舞蹈”，对还是错？", "对", "“dance”的意思是“跳舞；（名词）舞蹈”。"),
  chQ("选一个意思是“切；割”的单词完成句子：Please _____ the paper in half.", ["dad", "dancer", "dance", "cut"], "cut", "“cut”的意思是“切；割”。例句：Please cut the paper in half."),
  chQ("“cousin”是什么意思？", ["创造；创作", "母牛", "奶油；奶油色", "表兄弟姐妹；堂兄弟姐妹"], "表兄弟姐妹；堂兄弟姐妹", "“cousin”的意思是“表兄弟姐妹；堂兄弟姐妹”。例句：My cousin lives in Hanoi."),
  fillQ(
    "The designer was asked to ____ a logo for the new company.",
    "The designer was asked to create a logo for the new company.",
    "create",
    "“create”= 创造；创作。The designer was asked to create a logo for the new company.",
  ),
  tfQ("“culture”的意思是“文化”，对还是错？", "对", "“culture”的意思是“文化”。"),
  chQ("“course”是什么意思？", ["奶油；奶油色", "母牛", "表兄弟姐妹；堂兄弟姐妹", "课程"], "课程", "“course”的意思是“课程”。例句：I am taking an English course."),
  matchQ(
    [["dancing", "跳舞"], ["dangerous", "危险的"], ["could", "能（can 的过去式）；用于礼貌请求"], ["country", "国家；乡下"]],
    ["危险的", "国家；乡下", "跳舞", "能（can 的过去式）；用于礼貌请求"],
    "dancing = 跳舞 · dangerous = 危险的 · could = 能（can 的过去式）；用于礼貌请求 · country = 国家；乡下",
  ),
  chQ("选一个意思是“奶油；奶油色”的单词完成句子：I like _____ in my coffee.", ["culture", "cream", "create", "cup"], "cream", "“cream”的意思是“奶油；奶油色”。例句：I like cream in my coffee."),
  tfQ("“customer”的意思是“跳舞；（名词）舞蹈”，对还是错？", "错", "“customer”的意思是“顾客”。“跳舞；（名词）舞蹈”是“dance”的意思。"),
  chQ("哪个单词的意思是“国家；乡下”？", ["course", "country", "cow", "cousin"], "country", "“country”的意思是“国家；乡下”。例句：Vietnam is a beautiful country."),
  chQ("选一个意思是“危险的”的单词完成句子：This road is very _____.", ["dangerous", "course", "could", "country"], "dangerous", "“dangerous”的意思是“危险的”。例句：This road is very dangerous."),
  fillQ(
    "When I was five, I ____ not ride a bicycle, but now I can.",
    "When I was five, I could not ride a bicycle, but now I can.",
    "could",
    "“could”= 能（can 的过去式）；用于礼貌请求。When I was five, I could not ride a bicycle, but now I can.",
  ),
];

const CEFR_A1_L14_WORDS: EW[] = [
  ["dark", "/dɑːk/", "形容词", "黑暗的；深色的", "形容词：a dark room；dark blue", "It is dark outside.", "She has dark brown hair."],
  ["December", "/dɪˈsembə/", "名词", "十二月", "名词：in December（首字母大写）", "My birthday is in December.", "It is often cold in December."],
  ["decide", "/dɪˈsaɪd/", "动词", "决定", "动词：decide to do sth / decide on sth", "They decided to stay at home.", "I can't decide what to eat."],
  ["describe", "/dɪˈskraɪb/", "动词", "描述", "动词：describe sth/sb", "Can you describe your house?", "Please describe the picture."],
  ["dialogue", "/ˈdaɪəlɒɡ/", "名词", "对话", "名词：a dialogue between two people", "Listen to the dialogue and answer the questions.", "We practiced a short dialogue in class."],
  ["delicious", "/dɪˈlɪʃəs/", "形容词", "好吃的；美味的", "形容词：形容食物、饮料非常好吃", "This cake is delicious.", "We had a delicious lunch."],
  ["dictionary", "/ˈdɪkʃənri/", "名词", "词典", "名词；在词典里查词", "I use a dictionary to find new words.", "She bought a new English dictionary."],
  ["design", "/dɪˈzaɪn/", "名词", "设计；款式；（动词）设计", "名词和动词：a new design；design sth", "I like the design of this phone.", "She wants to design clothes."],
  ["date", "/deɪt/", "名词", "日期；约会", "名词：What's the date today?", "What is the date today?", "They went on a date last weekend."],
  ["description", "/dɪˈskrɪpʃn/", "名词", "描述", "名词：a description of sth", "Write a short description of your city.", "The book gives a good description of the place."],
  ["detail", "/ˈdiːteɪl/", "名词", "细节", "名词：in detail", "Tell me every detail.", "She explained the plan in detail."],
  ["daughter", "/ˈdɔːtə/", "名词", "女儿", "名词：my daughter", "Their daughter is six years old.", "She has one son and one daughter."],
  ["diet", "/ˈdaɪət/", "名词", "饮食；节食", "名词：be/go on a diet", "A healthy diet has lots of vegetables.", "She is on a diet to lose weight."],
  ["day", "/deɪ/", "名词", "天；日子", "名词：every day, one day", "I go to school every day.", "What day is it today?"],
  ["die", "/daɪ/", "动词", "死", "动词：die of/from sth", "The old man died last winter.", "Many plants die without water."],
  ["dear", "/dɪə/", "形容词", "亲爱的", "形容词：Dear... 用于信的开头", "Dear Anna, how are you?", "She is a dear friend of mine."],
  ["desk", "/desk/", "名词", "书桌；办公桌", "名词：at a desk", "There are books on my desk.", "He is sitting at his desk."],
];

const CEFR_A1_L14_PRACTICE: QuizQuestion[] = [
  tfQ("“dark”的意思是“黑暗的；深色的”，对还是错？", "对", "“dark”的意思是“黑暗的；深色的”。"),
  chQ("哪个单词的意思是“描述”？", ["design", "description", "desk", "detail"], "description", "“description”的意思是“描述”。例句：Write a short description of your city."),
  matchQ(
    [["describe", "描述（动词）"], ["description", "描述"], ["design", "设计；款式；（动词）设计"], ["desk", "书桌；办公桌"]],
    ["设计；款式；（动词）设计", "描述", "书桌；办公桌", "描述（动词）"],
    "describe = 描述（动词） · description = 描述 · design = 设计；款式；（动词）设计 · desk = 书桌；办公桌",
  ),
  chQ("“delicious”是什么意思？", ["描述", "描述（动词）", "好吃的；美味的", "设计；款式；（动词）设计"], "好吃的；美味的", "“delicious”的意思是“好吃的；美味的”。例句：This cake is delicious."),
  tfQ("“day”的意思是“决定”，对还是错？", "错", "“day”的意思是“天；日子”。“决定”是“decide”的意思。"),
  chQ("选一个意思是“书桌；办公桌”的单词完成句子：There are books on my _____.", ["detail", "desk", "dictionary", "dialogue"], "desk", "“desk”的意思是“书桌；办公桌”。例句：There are books on my desk."),
  chQ("“design”是什么意思？", ["设计；款式；（动词）设计", "书桌；办公桌", "对话", "细节"], "设计；款式；（动词）设计", "“design”的意思是“设计；款式；（动词）设计”。例句：I like the design of this phone."),
  fillQ(
    "When I did not know the meaning of a word, I looked it up in a _____.",
    "When I did not know the meaning of a word, I looked it up in a dictionary.",
    "dictionary",
    "“dictionary”= 词典。When I did not know the meaning of a word, I looked it up in a dictionary.",
  ),
  tfQ("“die”的意思是“日期；约会”，对还是错？", "错", "“die”的意思是“死”。“日期；约会”是“date”的意思。"),
  chQ("“detail”是什么意思？", ["对话", "词典", "细节", "死"], "细节", "“detail”的意思是“细节”。例句：Tell me every detail."),
  matchQ(
    [["daughter", "女儿"], ["day", "天；日子"], ["dear", "亲爱的"], ["December", "十二月"]],
    ["十二月", "亲爱的", "女儿", "天；日子"],
    "daughter = 女儿 · day = 天；日子 · dear = 亲爱的 · December = 十二月",
  ),
  chQ("选一个意思是“亲爱的”的单词完成句子：_____ Anna, how are you?", ["decide", "delicious", "dear", "December"], "dear", "“dear”的意思是“亲爱的”。例句：Dear Anna, how are you?"),
  tfQ("“decide”的意思是“描述”，对还是错？", "错", "“decide”的意思是“决定”。“描述”是“description”的意思。"),
  chQ("哪个单词的意思是“十二月”？", ["delicious", "December", "decide", "describe"], "December", "“December”的意思是“十二月”。例句：My birthday is in December."),
  chQ("选一个意思是“日期；约会”的单词完成句子：What is the _____ today?", ["date", "dear", "daughter", "December"], "date", "“date”的意思是“日期；约会”。例句：What is the date today?"),
  fillQ(
    "The doctor suggested a healthy _____ with more vegetables and less sugar.",
    "The doctor suggested a healthy diet with more vegetables and less sugar.",
    "diet",
    "“diet”= 饮食；节食。The doctor suggested a healthy diet with more vegetables and less sugar.",
  ),
];

const CEFR_A1_L15_WORDS: EW[] = [
  ["downstairs", "/ˌdaʊnˈsteəz/", "副词", "在楼下；下楼", "副词；反义词 upstairs", "My parents are downstairs in the kitchen.", "He ran downstairs to answer the phone."],
  ["dish", "/dɪʃ/", "名词", "菜；盘子", "名词；指菜或盘子", "This dish is my favourite.", "She washed all the dishes after dinner."],
  ["difficult", "/ˈdɪfɪkəlt/", "形容词", "难的；困难的", "形容词；反义词 easy", "This exam is very difficult.", "It is difficult to learn a new language."],
  ["drink", "/drɪŋk/", "动词", "喝", "动词；喝水、咖啡等", "I drink a lot of water every day.", "Would you like something to drink?"],
  ["doctor", "/ˈdɒktə/", "名词", "医生", "名词；see/go to the doctor", "You should see a doctor about your cough.", "My mother is a doctor."],
  ["down", "/daʊn/", "副词", "向下；在下面", "副词或介词；反义词 up", "Please sit down.", "She walked down the stairs."],
  ["dirty", "/ˈdɜːti/", "形容词", "脏的", "形容词；反义词 clean", "Your hands are dirty. Go and wash them.", "The kitchen floor is very dirty."],
  ["dress", "/dres/", "名词", "连衣裙", "名词；女式连衣裙", "She is wearing a beautiful red dress.", "I need a new dress for the party."],
  ["door", "/dɔː/", "名词", "门", "名词；open/close the door", "The front door is locked.", "Someone is knocking at the door."],
  ["dinner", "/ˈdɪnə/", "名词", "晚餐", "名词；have/eat dinner", "We have dinner at seven o'clock.", "What are we having for dinner?"],
  ["dog", "/dɒɡ/", "名词", "狗", "名词；宠物", "They have a big black dog.", "The dog is sleeping under the table."],
  ["dollar", "/ˈdɒlə/", "名词", "美元", "名词；货币单位，符号 $", "This book costs ten dollars.", "He gave me a dollar."],
  ["do", "/duː/", "动词", "做", "动词；既是助动词也是实义动词", "What do you do every morning?", "I have a lot of work to do today."],
  ["different", "/ˈdɪfrənt/", "形容词", "不同的", "形容词；different from sth", "My sister and I like different music.", "This city is very different from my hometown."],
  ["draw", "/drɔː/", "动词", "画画", "动词；draw a picture", "She likes to draw pictures of animals.", "Can you draw a map for me?"],
  ["difference", "/ˈdɪfrəns/", "名词", "差别", "名词；the difference between A and B", "What is the difference between these two words?", "There is a big difference in price."],
  ["discuss", "/dɪˈskʌs/", "动词", "讨论", "动词；discuss sth，不用 about", "Let's discuss the problem together.", "We discussed our plans for the weekend."],
];

const CEFR_A1_L15_PRACTICE: QuizQuestion[] = [
  tfQ("“draw”的意思是“画画”，对还是错？", "对", "“draw”的意思是“画画”。"),
  chQ("哪个单词的意思是“连衣裙”？", ["dress", "difference", "different", "drink"], "dress", "“dress”的意思是“连衣裙”。例句：She is wearing a beautiful red dress."),
  matchQ(
    [["downstairs", "在楼下；下楼"], ["draw", "画画"], ["dress", "连衣裙"], ["drink", "喝"]],
    ["喝", "画画", "连衣裙", "在楼下；下楼"],
    "downstairs = 在楼下；下楼 · draw = 画画 · dress = 连衣裙 · drink = 喝",
  ),
  chQ("“dinner”是什么意思？", ["晚餐", "脏的", "菜；盘子", "讨论"], "晚餐", "“dinner”的意思是“晚餐”。例句：We have dinner at seven o'clock."),
  tfQ("“down”的意思是“连衣裙”，对还是错？", "错", "“down”的意思是“向下；在下面”。“连衣裙”是“dress”的意思。"),
  chQ("选一个意思是“不同的”的单词完成句子：My sister and I like _____ music.", ["different", "dinner", "dirty", "difficult"], "different", "“different”的意思是“不同的”。例句：My sister and I like different music."),
  chQ("“dish”是什么意思？", ["医生", "菜；盘子", "狗", "做"], "菜；盘子", "“dish”的意思是“菜；盘子”。例句：This dish is my favourite."),
  fillQ(
    "Could you ____ the washing-up while I prepare tomorrow's lunch?",
    "Could you do the washing-up while I prepare tomorrow's lunch?",
    "do",
    "“do”= 做。Could you do the washing-up while I prepare tomorrow's lunch?",
  ),
  tfQ("“dog”的意思是“向下；在下面”，对还是错？", "错", "“dog”的意思是“狗”。“向下；在下面”是“down”的意思。"),
  chQ("“difficult”是什么意思？", ["脏的", "讨论", "晚餐", "难的；困难的"], "难的；困难的", "“difficult”的意思是“难的；困难的”。例句：This exam is very difficult."),
  matchQ(
    [["doctor", "医生"], ["dog", "狗"], ["dollar", "美元"], ["door", "门"]],
    ["狗", "门", "医生", "美元"],
    "doctor = 医生 · dog = 狗 · dollar = 美元 · door = 门",
  ),
  chQ("选一个意思是“讨论”的单词完成句子：Let's _____ the problem together.", ["do", "discuss", "doctor", "dish"], "discuss", "“discuss”的意思是“讨论”。例句：Let's discuss the problem together."),
  tfQ("“door”的意思是“门”，对还是错？", "对", "“door”的意思是“门”。"),
  chQ("哪个单词的意思是“喝”？", ["different", "drink", "difficult", "difference"], "drink", "“drink”的意思是“喝”。例句：I drink a lot of water every day."),
  chQ("选一个意思相符的单词：“美元”。", ["down", "dollar", "door", "downstairs"], "dollar", "“dollar”的意思是“美元”。例句：This book costs ten dollars."),
  fillQ(
    "The kitchen floor was ____ after the dog came in with muddy paws.",
    "The kitchen floor was dirty after the dog came in with muddy paws.",
    "dirty",
    "“dirty”= 脏的。The kitchen floor was dirty after the dog came in with muddy paws.",
  ),
];

const CEFR_A1_L16_WORDS: EW[] = [
  ["each", "/iːtʃ/", "限定词", "每个", "限定词；each + 单数名词", "Each student has a book.", "The rooms cost fifty dollars each."],
  ["east", "/iːst/", "名词", "东方；东边", "名词；the east，反义词 west", "The sun rises in the east.", "They live in the east of the country."],
  ["easy", "/ˈiːzi/", "形容词", "容易的", "形容词；反义词 difficult", "This game is very easy.", "It is easy to make new friends here."],
  ["drive", "/draɪv/", "动词", "开车", "动词；drive a car", "She drives to work every day.", "Can you drive a car?"],
  ["eight", "/eɪt/", "数词", "八（8）", "数词；8", "There are eight people in my family.", "The shop opens at eight."],
  ["email", "/ˈiːmeɪl/", "名词", "电子邮件", "名词；send/get an email", "I send a lot of emails every day.", "She read my email this morning."],
  ["elephant", "/ˈelɪfənt/", "名词", "大象", "名词；动物", "An elephant is a very big animal.", "We saw elephants at the zoo."],
  ["eleven", "/ɪˈlevn/", "数词", "十一（11）", "数词；11", "The train leaves at eleven.", "There are eleven players on a football team."],
  ["eat", "/iːt/", "动词", "吃", "动词；eat breakfast/lunch", "We eat rice every day.", "What do you want to eat?"],
  ["during", "/ˈdjʊərɪŋ/", "介词", "在……期间", "介词；during + 名词", "I fell asleep during the film.", "She visited us during the summer."],
  ["eighty", "/ˈeɪti/", "数词", "八十（80）", "数词；80", "My grandmother is eighty years old.", "The book has eighty pages."],
  ["egg", "/eɡ/", "名词", "鸡蛋", "名词；可数", "I had two eggs for breakfast.", "She is boiling some eggs."],
  ["ear", "/ɪə/", "名词", "耳朵", "名词；身体部位", "The rabbit has long ears.", "She has a pain in her left ear."],
  ["eighteen", "/ˌeɪˈtiːn/", "数词", "十八（18）", "数词；18", "My brother is eighteen years old.", "There are eighteen students in the class."],
  ["driver", "/ˈdraɪvə/", "名词", "司机", "名词；bus/taxi driver", "The bus driver was very friendly.", "My brother is a taxi driver."],
  ["early", "/ˈɜːli/", "形容词", "早；提前", "形容词或副词；反义词 late", "We had an early breakfast.", "She always arrives early."],
  ["else", "/els/", "副词", "其他；另外", "副词；跟在 something/anything/what 后面", "Do you want anything else?", "What else did she say?"],
];

const CEFR_A1_L16_PRACTICE: QuizQuestion[] = [
  tfQ("“eighty”的意思是“八十（80）”，对还是错？", "对", "“eighty”的意思是“八十（80）”。"),
  chQ("哪个单词的意思是“其他；另外”？", ["drive", "driver", "email", "else"], "else", "“else”的意思是“其他；另外”。例句：Do you want anything else?"),
  matchQ(
    [["eight", "八（8）"], ["eighteen", "十八（18）"], ["eighty", "八十（80）"], ["elephant", "大象"]],
    ["大象", "八（8）", "十八（18）", "八十（80）"],
    "eight = 八（8） · eighteen = 十八（18） · eighty = 八十（80） · elephant = 大象",
  ),
  chQ("“driver”是什么意思？", ["在……期间", "耳朵", "司机", "每个"], "司机", "“driver”的意思是“司机”。例句：The bus driver was very friendly."),
  tfQ("“eighteen”的意思是“十八（18）”，对还是错？", "对", "“eighteen”的意思是“十八（18）”。"),
  chQ("选一个意思相符的单词：“耳朵”。", ["easy", "east", "ear", "early"], "ear", "“ear”的意思是“耳朵”。例句：The rabbit has long ears."),
  chQ("“east”是什么意思？", ["容易的", "吃", "鸡蛋", "东方；东边"], "东方；东边", "“east”的意思是“东方；东边”。例句：The sun rises in the east."),
  fillQ(
    "Please stay quiet ___ the film, from the opening scene to the end.",
    "Please stay quiet during the film, from the opening scene to the end.",
    "during",
    "“during”= 在……期间。Please stay quiet during the film, from the opening scene to the end.",
  ),
  tfQ("“eat”的意思是“十八（18）”，对还是错？", "错", "“eat”的意思是“吃”。“十八（18）”是“eighteen”的意思。"),
  chQ("“drive”是什么意思？", ["在……期间", "司机", "每个", "开车"], "开车", "“drive”的意思是“开车”。例句：She drives to work every day."),
  matchQ(
    [["easy", "容易的"], ["eat", "吃"], ["egg", "鸡蛋"], ["eight", "八（8）"]],
    ["鸡蛋", "容易的", "八（8）", "吃"],
    "easy = 容易的 · eat = 吃 · egg = 鸡蛋 · eight = 八（8）",
  ),
  chQ("选一个意思是“十一（11）”的单词完成句子：The train leaves at _____.", ["else", "eleven", "drive", "email"], "eleven", "“eleven”的意思是“十一（11）”。例句：The train leaves at eleven."),
  tfQ("“email”的意思是“电子邮件”，对还是错？", "对", "“email”的意思是“电子邮件”。"),
  chQ("哪个单词的意思是“每个”？", ["ear", "east", "early", "each"], "each", "“each”的意思是“每个”。例句：Each student has a book."),
  chQ("选一个意思相符的单词：“鸡蛋”。", ["eighteen", "eighty", "egg", "eight"], "egg", "“egg”的意思是“鸡蛋”。例句：I had two eggs for breakfast."),
  fillQ(
    "The train was due at nine, but it arrived at eight thirty, half an hour _____.",
    "The train was due at nine, but it arrived at eight thirty, half an hour early.",
    "early",
    "“early”= 早；提前。The train was due at nine, but it arrived at eight thirty, half an hour early.",
  ),
];

const CEFR_A1_L17_WORDS: EW[] = [
  ["euro", "/ˈjʊərəʊ/", "名词", "欧元", "名词；多个欧洲国家的货币单位，说到钱、价格、付款时用", "This book costs ten euros.", "She paid in euros."],
  ["enjoy", "/ɪnˈdʒɔɪ/", "动词", "喜欢；享受", "动词；enjoy + V-ing 或名词；用于表示对一件事、一个活动或一次体验的愉快、舒服感受", "I enjoy listening to music.", "Did you enjoy the party?"],
  ["expensive", "/ɪkˈspensɪv/", "形容词", "贵的；昂贵的", "形容词；反义词 cheap；指东西、商品价格高", "This car is very expensive.", "Gold is more expensive than silver."],
  ["example", "/ɪɡˈzɑːmpl/", "名词", "例子", "名词；for example = 例如", "Can you give me an example?", "I like fruit, for example apples and bananas."],
  ["enough", "/ɪˈnʌf/", "限定词", "足够的", "限定词或副词；enough + 名词，形容词 + enough", "We have enough food for everyone.", "She is old enough to drive."],
  ["ever", "/ˈevə/", "副词", "曾经；从来", "副词；常用于疑问句和否定句", "Have you ever been to Paris?", "Nobody ever helps me."],
  ["event", "/ɪˈvent/", "名词", "事件；活动", "名词；重要事情", "The wedding was a big event.", "There is a sports event at school today."],
  ["end", "/end/", "名词", "结尾；结束", "名词；at the end of sth", "The shop is at the end of the street.", "We were sad at the end of the film."],
  ["exam", "/ɪɡˈzæm/", "名词", "考试", "名词；take/pass/fail an exam", "I have an English exam tomorrow.", "She passed her exam."],
  ["exercise", "/ˈeksəsaɪz/", "名词", "练习；锻炼", "名词（也可作动词）；do exercise", "Do exercise three on page ten.", "I exercise every morning."],
  ["every", "/ˈevri/", "限定词", "每个；每个都", "限定词；后接单数名词", "I brush my teeth every day.", "Every student has a book."],
  ["exciting", "/ɪkˈsaɪtɪŋ/", "形容词", "令人兴奋的；刺激的", "形容词；形容事物令人兴奋", "The film was very exciting.", "We had an exciting game yesterday."],
  ["excited", "/ɪkˈsaɪtɪd/", "形容词", "兴奋的；激动的", "形容词；形容人感到兴奋；excited about sth", "The children are excited about the trip.", "I am so excited to see you."],
  ["everything", "/ˈevriθɪŋ/", "代词", "一切；所有东西", "代词；所有东西", "Everything in the shop is cheap.", "Thank you for everything."],
  ["even", "/ˈiːvn/", "副词", "甚至；就连", "副词；强调出乎意料的事", "He works every day, even on Sunday.", "It was cold, and it even snowed."],
  ["evening", "/ˈiːvnɪŋ/", "名词", "晚上", "名词；in the evening = 在晚上", "I watch TV in the evening.", "Good evening! How are you?"],
  ["everyone", "/ˈevriwʌn/", "代词", "每个人；人人", "代词；中性，书面语也用；和 everybody 用法相同", "Everyone was happy at the party.", "Everyone needs water to live."],
  ["everybody", "/ˈevribɒdi/", "代词", "每个人", "代词；常用于口语；动词用单数形式", "Everybody likes her.", "Is everybody ready?"],
];

const CEFR_A1_L17_PRACTICE: QuizQuestion[] = [
  tfQ("“everything”的意思是“兴奋的；激动的”，对还是错？", "错", "“everything”的意思是“一切；所有东西”。“兴奋的；激动的”是“excited”的意思。"),
  chQ("哪个单词的意思是“结尾；结束”？", ["end", "enough", "euro", "enjoy"], "end", "“end”的意思是“结尾；结束”。例句：The shop is at the end of the street."),
  matchQ(
    [["enough", "足够的"], ["euro", "欧元"], ["even", "甚至；就连"], ["evening", "晚上"]],
    ["足够的", "甚至；就连", "欧元", "晚上"],
    "enough = 足够的 · euro = 欧元 · even = 甚至；就连 · evening = 晚上",
  ),
  chQ("“enjoy”是什么意思？", ["甚至；就连", "欧元", "足够的", "喜欢；享受"], "喜欢；享受", "“enjoy”的意思是“喜欢；享受”。例句：I enjoy listening to music."),
  tfQ("“expensive”的意思是“足够的”，对还是错？", "错", "“expensive”的意思是“贵的；昂贵的”。“足够的”是“enough”的意思。"),
  chQ("选一个意思是“例子”的单词完成句子：Can you give me an _____?", ["exercise", "exciting", "example", "excited"], "example", "“example”的意思是“例子”。例句：Can you give me an example?"),
  chQ("“every”是什么意思？", ["每个人（常用于口语）", "一切；所有东西", "考试", "每个；每个都"], "每个；每个都", "“every”的意思是“每个；每个都”。例句：I brush my teeth every day."),
  fillQ(
    "The sun had already set when we went for a walk in the ____.",
    "The sun had already set when we went for a walk in the evening.",
    "evening",
    "“evening” = 晚上。The sun had already set when we went for a walk in the evening.",
  ),
  tfQ("“exercise”的意思是“练习；锻炼”，对还是错？", "对", "“exercise”的意思是“练习；锻炼”。"),
  chQ("“ever”是什么意思？", ["一切；所有东西", "每个人（常用于口语）", "曾经；从来", "每个；每个都"], "曾经；从来", "“ever”的意思是“曾经；从来”。例句：Have you ever been to Paris?"),
  matchQ(
    [["excited", "兴奋的；激动的"], ["exciting", "令人兴奋的；刺激的"], ["exercise", "练习；锻炼"], ["expensive", "贵的；昂贵的"]],
    ["令人兴奋的；刺激的", "练习；锻炼", "兴奋的；激动的", "贵的；昂贵的"],
    "excited = 兴奋的；激动的 · exciting = 令人兴奋的；刺激的 · exercise = 练习；锻炼 · expensive = 贵的；昂贵的",
  ),
  chQ("选一个意思是“令人兴奋的；刺激的”的单词完成句子：The film was very _____.", ["exciting", "expensive", "end", "exercise"], "exciting", "“exciting”的意思是“令人兴奋的；刺激的”。例句：The film was very exciting."),
  tfQ("“everybody”的意思是“考试”，对还是错？", "错", "“everybody”的意思是“每个人（常用于口语）”。“考试”是“exam”的意思。"),
  chQ("哪个单词的意思是“欧元”？", ["even", "euro", "evening", "event"], "euro", "“euro”的意思是“欧元”。例句：This book costs ten euros."),
  chQ("选一个意思是“甚至；就连”的单词完成句子：He works every day, _____ on Sunday.", ["evening", "even", "ever", "event"], "even", "“even”的意思是“甚至；就连”。例句：He works every day, even on Sunday."),
  fillQ(
    "The charity ____ brought hundreds of people together to raise money.",
    "The charity event brought hundreds of people together to raise money.",
    "event",
    "“event” = 事件；活动。The charity event brought hundreds of people together to raise money.",
  ),
];

const CEFR_A1_L18_WORDS: EW[] = [
  ["farmer", "/ˈfɑːmə/", "名词", "农民", "名词；种地的人；从事种植、养殖和收割，在田里干活", "My uncle is a farmer.", "The farmer grows rice."],
  ["famous", "/ˈfeɪməs/", "形容词", "有名的", "形容词；famous for sth；指被很多人知道和仰慕的人、地方或事物", "She is a famous singer.", "This city is famous for its food."],
  ["father", "/ˈfɑːðə/", "名词", "父亲", "名词；家庭成员；指家里作为父亲的男人，说到家庭时用", "My father works in a bank.", "Her father is very kind."],
  ["family", "/ˈfæməli/", "名词", "家庭", "名词；复数 families", "I have a big family.", "My family lives in a small town."],
  ["fact", "/fækt/", "名词", "事实", "名词；in fact = 实际上", "It is a fact that water is wet.", "In fact, I don't like coffee."],
  ["favourite", "/ˈfeɪvərɪt/", "形容词", "最喜欢的", "形容词；英式拼法（美式：favorite）", "Blue is my favourite colour.", "What is your favourite food?"],
  ["eye", "/aɪ/", "名词", "眼睛", "名词；复数 eyes", "She has big blue eyes.", "Close your eyes and sleep."],
  ["fat", "/fæt/", "形容词", "胖的", "形容词；反义词 thin", "The cat is very fat.", "He was thin, but now he is a bit fat."],
  ["false", "/fɔːls/", "形容词", "错的；不正确的", "形容词；反义词 true", "This answer is false.", "Is the sentence true or false?"],
  ["extra", "/ˈekstrə/", "形容词", "额外的", "形容词；比平常多的", "I need some extra money.", "We have an extra chair for you."],
  ["explain", "/ɪkˈspleɪn/", "动词", "解释", "动词；explain sth to sb", "Can you explain this word to me?", "The teacher explained the lesson."],
  ["fast", "/fɑːst/", "形容词", "快的（指速度）", "形容词和副词；反义词 slow", "This is a fast car.", "He runs very fast."],
  ["face", "/feɪs/", "名词", "脸", "名词；也可作动词（面对）", "He has a happy face.", "Wash your face in the morning."],
  ["fantastic", "/fænˈtæstɪk/", "形容词", "极好的", "形容词；强烈赞美", "We had a fantastic holiday.", "The food here is fantastic."],
  ["February", "/ˈfebruəri/", "名词", "二月", "名词；首字母大写；in February", "My birthday is in February.", "February is a cold month."],
  ["far", "/fɑː/", "副词", "远", "副词；how far = 多远；far from", "The school is not far from my house.", "How far is the beach?"],
  ["farm", "/fɑːm/", "名词", "农场", "名词；on a farm", "They live on a farm.", "There are many cows on the farm."],
  ["fall", "/fɔːl/", "动词", "掉落；跌倒", "不规则动词：fall, fell, fallen", "Be careful, don't fall!", "Leaves fall from the trees in autumn."],
];

const CEFR_A1_L18_PRACTICE: QuizQuestion[] = [
  tfQ("“favourite”的意思是“额外的”，对还是错？", "错", "“favourite”的意思是“最喜欢的”。“额外的”是“extra”的意思。"),
  chQ("哪个单词的意思是“事实”？", ["fall", "fact", "family", "false"], "fact", "“fact”的意思是“事实”。例句：It is a fact that water is wet."),
  matchQ(
    [["explain", "解释"], ["extra", "额外的"], ["eye", "眼睛"], ["face", "脸"]],
    ["额外的", "解释", "眼睛", "脸"],
    "explain = 解释 · extra = 额外的 · eye = 眼睛 · face = 脸",
  ),
  chQ("“fat”是什么意思？", ["父亲", "二月", "最喜欢的", "胖的"], "胖的", "“fat”的意思是“胖的”。例句：The cat is very fat."),
  tfQ("“fantastic”的意思是“极好的”，对还是错？", "对", "“fantastic”的意思是“极好的”。"),
  chQ("选一个意思相符的单词：“眼睛”。", ["face", "fall", "eye", "fact"], "eye", "“eye”的意思是“眼睛”。例句：She has big blue eyes."),
  chQ("“farm”是什么意思？", ["快的（指速度）", "农场", "农民", "胖的"], "农场", "“farm”的意思是“农场”。例句：They live on a farm."),
  fillQ(
    "We invited one more friend, so we need an ____ chair at the table.",
    "We invited one more friend, so we need an extra chair at the table.",
    "extra",
    "“extra” = 额外的。We invited one more friend, so we need an extra chair at the table.",
  ),
  tfQ("“fall”的意思是“掉落；跌倒”，对还是错？", "对", "“fall”的意思是“掉落；跌倒”。"),
  chQ("“far”是什么意思？", ["农场", "农民", "快的（指速度）", "远"], "远", "“far”的意思是“远”。例句：The school is not far from my house."),
  matchQ(
    [["false", "错的；不正确的"], ["family", "家庭"], ["famous", "有名的"], ["fantastic", "极好的"]],
    ["有名的", "极好的", "家庭", "错的；不正确的"],
    "false = 错的；不正确的 · family = 家庭 · famous = 有名的 · fantastic = 极好的",
  ),
  chQ("选一个意思是“快的（指速度）”的单词完成句子：This is a _____ car.", ["father", "fast", "favourite", "fat"], "fast", "“fast”的意思是“快的（指速度）”。例句：This is a fast car."),
  tfQ("“famous”的意思是“农场”，对还是错？", "错", "“famous”的意思是“有名的”。“农场”是“farm”的意思。"),
  chQ("哪个单词的意思是“脸”？", ["fall", "face", "fact", "false"], "face", "“face”的意思是“脸”。例句：He has a happy face."),
  chQ("选一个意思是“父亲”的单词完成句子：My _____ works in a bank.", ["explain", "father", "February", "favourite"], "father", "“father”的意思是“父亲”。例句：My father works in a bank."),
  fillQ(
    "Looking one month ahead from January and one month back from March gives ____.",
    "Looking one month ahead from January and one month back from March gives February.",
    "February",
    "“February” = 二月。Looking one month ahead from January and one month back from March gives February.",
  ),
];

const CEFR_A1_L19_WORDS: EW[] = [
  ["fire", "/ˈfaɪə/", "名词", "火；火灾", "名词；make a fire", "We sat by the fire to keep warm.", "There was a big fire in the city."],
  ["fish", "/fɪʃ/", "名词", "鱼", "名词；复数通常保持不变", "I had fish for dinner.", "There are many fish in the lake."],
  ["five", "/faɪv/", "数词", "五（5）", "基数词", "I have five apples.", "The shop opens at five."],
  ["film", "/fɪlm/", "名词", "电影（英式）", "名词；watch a film", "We watched a funny film last night.", "This film is very long."],
  ["find", "/faɪnd/", "动词", "找到；发现", "不规则动词：find, found, found", "I can't find my keys.", "She found a good book at the shop."],
  ["fill", "/fɪl/", "动词", "装满；填满", "动词；fill sth (with sth)", "Can you fill the glass with water?", "She filled the bottle before the trip."],
  ["fifty", "/ˈfɪfti/", "数词", "五十（50）", "基数词；50", "My grandfather is fifty years old.", "There are fifty pages in this book."],
  ["fine", "/faɪn/", "形容词", "好的；健康的", "形容词；问候身体状况时用", "How are you? I'm fine, thanks.", "The weather is fine today."],
  ["feel", "/fiːl/", "动词", "感觉", "不规则动词：feel, felt, felt", "I feel tired today.", "She felt happy after the test."],
  ["feeling", "/ˈfiːlɪŋ/", "名词", "感觉；情绪", "名词；hurt sb's feeling(s)", "I have a good feeling about this.", "You hurt her feelings."],
  ["finish", "/ˈfɪnɪʃ/", "动词", "完成；结束", "动词；finish doing sth", "I finished my homework.", "The film finishes at ten."],
  ["final", "/ˈfaɪnl/", "形容词", "最后的", "形容词；放在名词前面", "This is the final question.", "The final game is on Sunday."],
  ["fifteen", "/ˌfɪfˈtiːn/", "数词", "十五（15）", "基数词；15", "She is fifteen years old.", "There are fifteen students in my class."],
  ["festival", "/ˈfestɪvl/", "名词", "节日", "名词；文化活动", "Tet is an important festival in Vietnam.", "We go to the music festival every year."],
  ["fifth", "/fɪfθ/", "数词", "第五（序数词）", "序数词；the fifth", "Today is the fifth of May.", "He finished in fifth place."],
  ["few", "/fjuː/", "限定词", "少；几个", "限定词；a few = 几个，few = 很少；后接可数名词", "I have a few friends here.", "Few people came to the party."],
  ["flat", "/flæt/", "名词", "公寓（英式）", "名词（英式）；live in a flat", "They live in a small flat in London.", "My flat is near the station."],
  ["first", "/fɜːst/", "数词", "第一；首先", "序数词；at first", "She won first prize.", "This is my first day at school."],
];

const CEFR_A1_L19_PRACTICE: QuizQuestion[] = [
  tfQ("“five”的意思是“五（5）”，对还是错？", "对", "“five”的意思是“五（5）”。"),
  chQ("哪个单词的意思是“第一；首先”？", ["first", "five", "flat", "fish"], "first", "“first”的意思是“第一；首先”。例句：She won first prize."),
  matchQ(
    [["fifty", "五十（50）"], ["fill", "装满；填满"], ["film", "电影（英式）"], ["final", "最后的"]],
    ["五十（50）", "电影（英式）", "装满；填满", "最后的"],
    "fifty = 五十（50） · fill = 装满；填满 · film = 电影（英式） · final = 最后的",
  ),
  chQ("“final”是什么意思？", ["最后的", "完成；结束", "找到；发现", "好的；健康的"], "最后的", "“final”的意思是“最后的”。例句：This is the final question."),
  tfQ("“find”的意思是“找到；发现”，对还是错？", "对", "“find”的意思是“找到；发现”。"),
  chQ("哪个单词的意思是“完成；结束”？", ["fire", "fish", "first", "finish"], "finish", "“finish”的意思是“完成；结束”。例句：I finished my homework."),
  chQ("“feeling”是什么意思？", ["感觉；情绪", "十五（15）", "最后的", "第五（序数词）"], "感觉；情绪", "“feeling”的意思是“感觉；情绪”。例句：I have a good feeling about this."),
  fillQ(
    "The group and I watched a funny ____ at the cinema and enjoyed the story on the screen.",
    "The group and I watched a funny film at the cinema and enjoyed the story on the screen.",
    "film",
    "“film” = 电影（英式）。The group and I watched a funny film at the cinema and enjoyed the story on the screen.",
  ),
  tfQ("“fine”的意思是“好的；健康的”，对还是错？", "对", "“fine”的意思是“好的；健康的”。"),
  chQ("“fifth”是什么意思？", ["五（5）", "十五（15）", "第五（序数词）", "第一；首先"], "第五（序数词）", "“fifth”的意思是“第五（序数词）”。例句：Today is the fifth of May."),
  matchQ(
    [["flat", "公寓（英式）"], ["feel", "感觉"], ["feeling", "感觉；情绪"], ["festival", "节日"]],
    ["公寓（英式）", "节日", "感觉", "感觉；情绪"],
    "flat = 公寓（英式） · feel = 感觉 · feeling = 感觉；情绪 · festival = 节日",
  ),
  chQ("选一个合适的单词完成句子：We sat by the _____ to keep warm.", ["fire", "fish", "first", "flat"], "fire", "“fire”的意思是“火；火灾”。We sat by the fire to keep warm."),
  tfQ("“fish”的意思是“感觉”，对还是错？", "错", "“fish”的意思是“鱼”。“感觉”是“feel”的意思。"),
  chQ("哪个单词的意思是“节日”？", ["fifteen", "festival", "fifty", "few"], "festival", "“festival”的意思是“节日”。例句：Tet is an important festival in Vietnam."),
  chQ("哪个单词的意思是“十五（15）”？", ["few", "fish", "final", "fifteen"], "fifteen", "“fifteen”的意思是“十五（15）”。例句：She is fifteen years old."),
  fillQ(
    "A ____ people stayed after the meeting to help clean the room.",
    "A few people stayed after the meeting to help clean the room.",
    "few",
    "“few” = 少；几个。A few people stayed after the meeting to help clean the room.",
  ),
];

const CEFR_A1_L20_WORDS: EW[] = [
  ["forget", "/fəˈɡet/", "动词", "忘记", "不规则动词：forget, forgot, forgotten", "Don't forget your umbrella.", "I forgot her name."],
  ["friendly", "/ˈfrendli/", "形容词", "友好的", "形容词；不要和副词弄混", "Our new neighbour is very friendly.", "The staff here are friendly and kind."],
  ["follow", "/ˈfɒləʊ/", "动词", "跟随；跟在后面", "动词；follow sb/sth", "Please follow me to the room.", "The dog follows him everywhere."],
  ["fly", "/flaɪ/", "动词", "飞", "不规则动词：fly, flew, flown", "Birds fly in the sky.", "We will fly to Japan next week."],
  ["floor", "/flɔː/", "名词", "地板；楼层", "名词；on the floor；the first floor", "The children sat on the floor.", "Her office is on the third floor."],
  ["Friday", "/ˈfraɪdeɪ/", "名词", "星期五", "名词；专有名词，首字母大写；on Friday", "We have a test on Friday.", "They go out every Friday evening."],
  ["flower", "/ˈflaʊə/", "名词", "花", "可数名词", "She gave me a beautiful flower.", "The garden is full of flowers."],
  ["foot", "/fʊt/", "名词", "脚", "名词；复数是 feet", "My foot hurts after the long walk.", "He kicked the ball with his left foot."],
  ["forty", "/ˈfɔːti/", "数词", "四十（40）", "基数词；40", "My father is forty years old.", "There are forty students in the class."],
  ["fourth", "/fɔːθ/", "数词", "第四（序数词）", "序数词", "He came fourth in the race.", "Their office is on the fourth floor."],
  ["for", "/fɔː/", "介词", "为；给；在（一段时间）", "介词；a gift for you", "This present is for you.", "We walked for an hour."],
  ["food", "/fuːd/", "名词", "食物", "不可数名词", "The food at this café is very good.", "We need to buy some food."],
  ["form", "/fɔːm/", "名词", "表格", "名词；fill in a form", "Please fill in this form.", "She signed the form at the office."],
  ["friend", "/frend/", "名词", "朋友", "名词；a friend of mine", "My friend is very kind.", "I met an old friend at the park."],
  ["four", "/fɔː/", "数词", "四（4）", "基数词", "I have four books.", "The family has four children."],
  ["fourteen", "/ˌfɔːˈtiːn/", "数词", "十四（14）", "基数词", "She is fourteen years old.", "There are fourteen days left."],
  ["football", "/ˈfʊtbɔːl/", "名词", "足球", "名词；play football", "The boys play football after school.", "He bought a new football."],
  ["flight", "/flaɪt/", "名词", "航班", "名词；a flight to somewhere", "Our flight to Paris is at noon.", "The flight was two hours long."],
  ["free", "/friː/", "形容词", "免费的；空闲的；自由的", "形容词", "The tickets are free for children.", "Are you free this afternoon?"],
];

const CEFR_A1_L20_PRACTICE: QuizQuestion[] = [
  tfQ("“four”的意思是“四（4）”，对还是错？", "对", "“four”的意思是“四（4）”。"),
  chQ("哪个单词的意思是“地板；楼层”？", ["floor", "foot", "food", "flower"], "floor", "“floor”的意思是“地板；楼层”。例句：The children sat on the floor."),
  matchQ(
    [["fourth", "第四（序数词）"], ["free", "免费的；空闲的；自由的"], ["Friday", "星期五"], ["friend", "朋友"]],
    ["第四（序数词）", "朋友", "免费的；空闲的；自由的", "星期五"],
    "fourth = 第四（序数词） · free = 免费的；空闲的；自由的 · Friday = 星期五 · friend = 朋友",
  ),
  chQ("“friendly”是什么意思？", ["航班", "友好的", "花", "地板；楼层"], "友好的", "“friendly”的意思是“友好的”。例句：Our new neighbour is very friendly."),
  tfQ("“forty”的意思是“四十（40）”，对还是错？", "对", "“forty”的意思是“四十（40）”。"),
  chQ("选一个合适的单词完成句子：Please _____ me to the room.", ["food", "fly", "free", "follow"], "follow", "“follow”的意思是“跟随；跟在后面”。Please follow me to the room."),
  chQ("“free”是什么意思？", ["星期五", "朋友", "免费的；空闲的；自由的", "友好的"], "免费的；空闲的；自由的", "“free”的意思是“免费的；空闲的；自由的”。例句：The tickets are free for children."),
  fillQ(
    "Our ____ from London to Rome leaves at six before noon.",
    "Our flight from London to Rome leaves at six before noon.",
    "flight",
    "“flight” = 航班。Our flight from London to Rome leaves at six before noon.",
  ),
  tfQ("“Friday”的意思是“航班”，对还是错？", "错", "“Friday”的意思是“星期五”。“航班”是“flight”的意思。"),
  chQ("“for”是什么意思？", ["四十（40）", "为；给；在（一段时间）", "表格", "忘记"], "为；给；在（一段时间）", "“for”的意思是“为；给；在（一段时间）”。例句：This present is for you."),
  matchQ(
    [["form", "表格"], ["forty", "四十（40）"], ["four", "四（4）"], ["fourteen", "十四（14）"]],
    ["十四（14）", "四（4）", "表格", "四十（40）"],
    "form = 表格 · forty = 四十（40） · four = 四（4） · fourteen = 十四（14）",
  ),
  chQ("选一个合适的单词完成句子：My _____ is very kind.", ["floor", "form", "foot", "friend"], "friend", "“friend”的意思是“朋友”。My friend is very kind."),
  tfQ("“flower”的意思是“花”，对还是错？", "对", "“flower”的意思是“花”。"),
  chQ("哪个单词的意思是“脚”？", ["foot", "forget", "follow", "floor"], "foot", "“foot”的意思是“脚”。例句：My foot hurts after the long walk."),
  chQ("选一个合适的单词完成句子：The _____ at this café is very good.", ["flower", "fly", "forget", "food"], "food", "“food”的意思是“食物”。The food at this café is very good."),
  fillQ(
    "A number exactly one less than 15 is ____.",
    "A number exactly one less than 15 is fourteen.",
    "fourteen",
    "“fourteen” = 十四（14）。A number exactly one less than 15 is fourteen.",
  ),
];

const CEFR_A1_L21_WORDS: EW[] = [
  ["garden", "/ˈɡɑːdn/", "名词", "花园", "名词；in the garden", "We grow flowers in our garden.", "The children are playing in the garden."],
  ["glass", "/ɡlɑːs/", "名词", "玻璃；杯子", "作材料义时不可数；作杯子义时可数", "Can I have a glass of water?", "The window is made of glass."],
  ["from", "/frɒm/", "介词", "从（地点、时间、来源）", "介词；from ... to ...", "I come from Vietnam.", "The shop is open from nine to five."],
  ["fruit", "/fruːt/", "名词", "水果", "名词，通常不可数", "I eat fruit every morning.", "Apples and bananas are my favourite fruit."],
  ["good", "/ɡʊd/", "形容词", "好的；擅长的", "形容词；不规则比较级：good, better, best；good at something", "This is a good book.", "She is good at English."],
  ["geography", "/dʒiˈɒɡrəfi/", "名词", "地理（学科）", "不可数名词；学科", "Geography is my favourite subject.", "We study geography on Mondays."],
  ["front", "/frʌnt/", "名词", "前面；正面", "名词；in front of", "There is a garden in front of the house.", "Please sit at the front of the bus."],
  ["fun", "/fʌn/", "名词", "乐趣；快乐", "不可数名词；have fun", "We had a lot of fun at the party.", "The children are having fun in the pool."],
  ["future", "/ˈfjuːtʃə/", "名词", "未来", "名词；in the future", "I want to be a teacher in the future.", "Nobody knows the future."],
  ["give", "/ɡɪv/", "动词", "给；送", "动词；give somebody something / give something to somebody", "Please give me the book.", "She gave her mother some flowers."],
  ["girlfriend", "/ˈɡɜːlfrend/", "名词", "女朋友", "可数名词", "He is here with his girlfriend.", "My girlfriend loves coffee."],
  ["go", "/ɡəʊ/", "动词", "去", "不规则动词：go, went, gone", "We go to work by bus.", "Let's go to the beach."],
  ["get", "/ɡet/", "动词", "得到；拿到；变得", "动词；多义；get + 形容词表示变得", "I get a lot of emails every day.", "It gets cold in winter."],
  ["girl", "/ɡɜːl/", "名词", "女孩", "可数名词", "The girl is reading a book.", "Two girls are playing in the park."],
  ["game", "/ɡeɪm/", "名词", "游戏；比赛", "名词；play a game", "Let's play a game together.", "The football game starts at three."],
  ["grandfather", "/ˈɡrænfɑːðə/", "名词", "爷爷；外公", "可数名词", "My grandfather is eighty years old.", "His grandfather lives in the countryside."],
  ["full", "/fʊl/", "形容词", "满的；饱的", "形容词；full of sth", "The box is full of books.", "No more rice for me, I'm full."],
  ["goodbye", "/ˌɡʊdˈbaɪ/", "感叹词", "再见", "感叹词；告别时说", "Goodbye! See you tomorrow.", "She said goodbye and left."],
  ["funny", "/ˈfʌni/", "形容词", "好笑的；幽默的", "形容词", "That film is really funny.", "He told a funny story."],
];

const CEFR_A1_L21_PRACTICE: QuizQuestion[] = [
  tfQ("“game”的意思是“得到；拿到；变得”，对还是错？", "错", "“game”的意思是“游戏；比赛”。“得到；拿到；变得”是“get”的意思。"),
  chQ("哪个单词的意思是“女孩”？", ["give", "glass", "girl", "girlfriend"], "girl", "“girl”的意思是“女孩”。例句：The girl is reading a book."),
  matchQ(
    [["full", "满的；饱的"], ["fun", "乐趣；快乐"], ["funny", "好笑的；幽默的"], ["future", "未来"]],
    ["好笑的；幽默的", "满的；饱的", "乐趣；快乐", "未来"],
    "full = 满的；饱的 · fun = 乐趣；快乐 · funny = 好笑的；幽默的 · future = 未来",
  ),
  chQ("“front”是什么意思？", ["前面；正面", "一半", "小组", "极好的；大的"], "前面；正面", "“front”的意思是“前面；正面”。例句：There is a garden in front of the house."),
  tfQ("“fruit”的意思是“好笑的；幽默的”，对还是错？", "错", "“fruit”的意思是“水果”。“好笑的；幽默的”是“funny”的意思。"),
  chQ("选一个意思是“女朋友”的单词完成句子：He is here with his _____.", ["grandfather", "girlfriend", "girl", "grandparent"], "girlfriend", "“girlfriend”的意思是“女朋友”。例句：He is here with his girlfriend."),
  chQ("“go”是什么意思？", ["长大；生长；种植", "绿色", "去", "快乐的"], "去", "“go”的意思是“去”。例句：We go to work by bus."),
  fillQ(
    "Be careful with that _____ because it may break if you drop it.",
    "Be careful with that glass because it may break if you drop it.",
    "glass",
    "“glass” = 玻璃；杯子。Be careful with that glass because it may break if you drop it.",
  ),
  tfQ("“future”的意思是“地理（学科）”，对还是错？", "错", "“future”的意思是“未来”。“地理（学科）”是“geography”的意思。"),
  chQ("“good”是什么意思？", ["一半", "好的；擅长的", "难的；努力地；硬的", "极好的；大的"], "好的；擅长的", "“good”的意思是“好的；擅长的”。例句：This is a good book."),
  matchQ(
    [["goodbye", "再见"], ["grandfather", "爷爷；外公"], ["from", "从（地点、时间、来源）"], ["front", "前面；正面"]],
    ["从（地点、时间、来源）", "前面；正面", "再见", "爷爷；外公"],
    "goodbye = 再见 · grandfather = 爷爷；外公 · from = 从（地点、时间、来源） · front = 前面；正面",
  ),
  chQ("选一个意思是“好笑的；幽默的”的单词完成句子：That film is really _____.", ["funny", "happy", "half", "hard"], "funny", "“funny”的意思是“好笑的；幽默的”。例句：That film is really funny."),
  tfQ("“get”的意思是“给；送”，对还是错？", "错", "“get”的意思是“得到；拿到；变得”。“给；送”是“give”的意思。"),
  chQ("哪个单词的意思是“地理（学科）”？", ["grey", "geography", "go", "garden"], "geography", "“geography”的意思是“地理（学科）”。例句：Geography is my favourite subject."),
  chQ("哪个单词的意思是“给；送”？", ["grey", "give", "go", "garden"], "give", "“give”的意思是“给；送”。例句：Please give me the book."),
  fillQ(
    "The group and I planted tomatoes and roses in the _____ behind our house.",
    "The group and I planted tomatoes and roses in the garden behind our house.",
    "garden",
    "“garden” = 花园。The group and I planted tomatoes and roses in the garden behind our house.",
  ),
];

const CEFR_A1_L22_WORDS: EW[] = [
  ["hate", "/heɪt/", "动词", "讨厌", "hate + V-ing 或 hate + to V", "I hate getting up early.", "He hates cold weather."],
  ["happy", "/ˈhæpi/", "形容词", "开心的；幸福的", "形容词；happy about 或 happy with something", "I am very happy today.", "She looks happy with her new job."],
  ["group", "/ɡruːp/", "名词", "小组", "a group of something", "A group of students is waiting outside.", "We work in small groups."],
  ["hair", "/heə/", "名词", "头发；毛发", "通常是不可数名词", "She has long black hair.", "He is washing his hair."],
  ["grey", "/ɡreɪ/", "形容词", "灰色的", "表示颜色的形容词；美式英语写作 gray", "The sky is grey today.", "He wears a grey jacket."],
  ["guitar", "/ɡɪˈtɑː/", "名词", "吉他", "弹乐器说：play the guitar", "He plays the guitar very well.", "I want to learn the guitar."],
  ["grandmother", "/ˈɡrænmʌðə/", "名词", "奶奶；外婆", "可数名词", "My grandmother makes great cakes.", "Her grandmother tells us stories."],
  ["green", "/ɡriːn/", "形容词", "绿色的", "表示颜色的形容词", "The grass is green.", "She has a green bag."],
  ["happen", "/ˈhæpən/", "动词", "发生", "主语是事情，不用人作主动主语", "What happened yesterday?", "Accidents can happen anywhere."],
  ["great", "/ɡreɪt/", "形容词", "极好的；大的", "形容词；表示极好的意思在口语中很常用", "We had a great time at the party.", "That's a great idea."],
  ["have", "/hæv/", "动词", "有；作助动词", "不规则动词：have, had, had；完成时的助动词", "I have two brothers.", "She has finished her homework."],
  ["hand", "/hænd/", "名词", "手", "可数名词；身体部位", "Wash your hands before dinner.", "She has a pen in her hand."],
  ["grandparent", "/ˈɡrænpeərənt/", "名词", "祖父或祖母", "常用复数形式：grandparents", "I visit my grandparents every summer.", "Her grandparents live near the sea."],
  ["guess", "/ɡes/", "动词", "猜", "也用于表示想必是、估计", "Can you guess my age?", "I guess you are right."],
  ["grow", "/ɡrəʊ/", "动词", "长大；生长；种植", "不规则动词：grow, grew, grown", "Children grow very fast.", "They grow vegetables in the garden."],
  ["gym", "/dʒɪm/", "名词", "健身房", "go to the gym", "I go to the gym three times a week.", "There is a new gym near my house."],
  ["hat", "/hæt/", "名词", "帽子", "戴帽子说：wear a hat", "She is wearing a red hat.", "Put on your hat; it is cold."],
  ["hard", "/hɑːd/", "形容词", "难的；努力地；硬的", "既是形容词也是副词，例如 work hard", "This question is very hard.", "The bed is too hard."],
  ["half", "/hɑːf/", "名词", "一半", "复数是 halves；half of something", "I ate half of the cake.", "The class is half an hour long."],
];

const CEFR_A1_L22_PRACTICE: QuizQuestion[] = [
  tfQ("“hate”的意思是“祖父或祖母；复数 grandparents 指祖父母”，对还是错？", "错", "“hate”的意思是“讨厌”。“祖父或祖母；复数 grandparents 指祖父母”是“grandparent”的意思。"),
  chQ("哪个单词的意思是“开心的；幸福的”？", ["grow", "have", "happy", "hat"], "happy", "“happy”的意思是“开心的；幸福的”。例句：I am very happy today."),
  matchQ(
    [["guess", "猜"], ["guitar", "吉他"], ["gym", "健身房"], ["hair", "头发；毛发"]],
    ["吉他", "头发；毛发", "健身房", "猜"],
    "guess = 猜 · guitar = 吉他 · gym = 健身房 · hair = 头发；毛发",
  ),
  chQ("“grow”是什么意思？", ["健身房", "小组", "猜", "长大；生长；种植"], "长大；生长；种植", "“grow”的意思是“长大；生长；种植”。例句：Children grow very fast."),
  tfQ("“group”的意思是“小组”，对还是错？", "对", "“group”的意思是“小组”。例句：A group of students is waiting outside."),
  chQ("选一个意思是“难的；努力地；硬的”的单词完成句子：This question is very _____.", ["hard", "happen", "have", "hand"], "hard", "“hard”的意思是“难的；努力地；硬的”。例句：This question is very hard."),
  chQ("“hat”是什么意思？", ["难的；努力地；硬的", "一半", "帽子", "长大；生长；种植"], "帽子", "“hat”的意思是“帽子”。例句：She is wearing a red hat."),
  fillQ(
    "My mother is taking me to visit her father, who is my _____.",
    "My mother is taking me to visit her father, who is my grandparent.",
    "grandparent",
    "“grandparent” = 祖父或祖母；复数 grandparents 指祖父母。My mother is taking me to visit her father, who is my grandparent.",
  ),
  tfQ("“great”的意思是“极好的；大的”，对还是错？", "对", "“great”的意思是“极好的；大的”。例句：We had a great time at the party."),
  chQ("“happen”是什么意思？", ["开心的；幸福的", "难的；努力地；硬的", "小组", "发生"], "发生", "“happen”的意思是“发生”。例句：What happened yesterday?"),
  matchQ(
    [["green", "绿色的"], ["grey", "灰色的"], ["group", "小组"], ["grow", "长大；生长；种植"]],
    ["长大；生长；种植", "小组", "灰色的", "绿色的"],
    "green = 绿色的 · grey = 灰色的 · group = 小组 · grow = 长大；生长；种植",
  ),
  chQ("选一个意思是“吉他”的单词完成句子：He plays the _____ very well.", ["grey", "guitar", "happen", "green"], "guitar", "“guitar”的意思是“吉他”。例句：He plays the guitar very well."),
  tfQ("“grandmother”的意思是“绿色的”，对还是错？", "错", "“grandmother”的意思是“奶奶；外婆”。“绿色的”是“green”的意思。"),
  chQ("哪个单词的意思是“一半”？", ["happy", "half", "have", "happen"], "half", "“half”的意思是“一半”。例句：I ate half of the cake."),
  chQ("哪个单词的意思是“手”？", ["猜", "难的；努力地；硬的", "hand", "帽子"], "hand", "“hand”的意思是“手”。例句：Wash your hands before dinner."),
  fillQ(
    "The barber cut my _____ because it had grown too long around my face.",
    "The barber cut my hair because it had grown too long around my face.",
    "hair",
    "“hair” = 头发；毛发。The barber cut my hair because it had grown too long around my face.",
  ),
];

const CEFR_A1_L23_WORDS: EW[] = [
  ["homework", "/ˈhəʊmwɜːk/", "名词", "家庭作业", "不可数名词；do homework", "I do my homework after dinner.", "The teacher gives us a lot of homework."],
  ["here", "/hɪə/", "副词", "在这里", "地点副词", "Come here, please.", "I live here with my family."],
  ["hobby", "/ˈhɒbi/", "名词", "爱好", "可数名词；复数是 hobbies", "My hobby is painting.", "What are your hobbies?"],
  ["help", "/help/", "动词", "帮助", "help somebody do something", "She helped me carry the bags.", "He helps his mother cook dinner."],
  ["him", "/hɪm/", "代词", "他（宾格）", "he 的宾格代词", "I gave him a present.", "Do you know him?"],
  ["hello", "/həˈləʊ/", "感叹词", "你好", "见面时或接电话时说", "Hello! How are you?", "She said hello to the teacher."],
  ["home", "/həʊm/", "名词", "家", "at home：在家；go home：回家", "I stay at home on Sunday.", "She goes home at six."],
  ["head", "/hed/", "名词", "头", "可数名词；身体部位", "My head hurts.", "He put a hat on his head."],
  ["history", "/ˈhɪstri/", "名词", "历史", "不可数名词；也是历史这门课", "I like history at school.", "The city has a long history."],
  ["hear", "/hɪə/", "动词", "听见", "不规则动词：hear, heard, heard；和 listen 不同", "I can hear a dog outside.", "Did you hear that noise?"],
  ["his", "/hɪz/", "限定词", "他的", "所有格，放在名词前面：his book", "This is his bag.", "His sister is a teacher."],
  ["horse", "/hɔːs/", "名词", "马", "可数名词；ride a horse：骑马", "The horse runs very fast.", "She likes to ride a horse."],
  ["holiday", "/ˈhɒlədeɪ/", "名词", "假期；节日", "名词；on holiday 指出门度假", "We are on holiday in Da Nang.", "Christmas is my favourite holiday."],
  ["healthy", "/ˈhelθi/", "形容词", "健康的；有益健康的", "a healthy person；healthy food", "Fruit is a healthy snack.", "They have three healthy children."],
  ["health", "/helθ/", "名词", "健康", "不可数名词", "Smoking is bad for your health.", "She is in good health."],
  ["high", "/haɪ/", "形容词", "高的（离地面、程度）", "用于物、山、价格；人高用 tall", "The mountain is very high.", "Prices are high this year."],
  ["hi", "/haɪ/", "感叹词", "嗨", "亲切的打招呼，比 hello 不正式", "Hi! Nice to meet you.", "She waved and said hi."],
  ["hey", "/heɪ/", "感叹词", "嘿（叫人或亲切打招呼）", "亲切地叫某人或打招呼时用", "Hey, wait for me!", "Hey, how are you doing?"],
  ["hope", "/həʊp/", "动词", "希望", "动词；hope to do 或 hope that", "I hope you feel better soon.", "We hope to see you again."],
  ["her", "/hɜː/", "代词", "她（宾格）；她的", "既是宾格（她）也表示所有格（她的）", "I saw her at school.", "She is doing her homework."],
];

const CEFR_A1_L23_PRACTICE: QuizQuestion[] = [
  tfQ("“her”的意思是“嗨”，对还是错？", "错", "“her”的意思是“她（宾格）；她的”。“嗨”是“hi”的意思。"),
  chQ("哪个单词的意思是“健康的；有益健康的”？", ["hear", "help", "healthy", "hello"], "healthy", "“healthy”的意思是“健康的；有益健康的”。例句：Fruit is a healthy snack."),
  matchQ(
    [["hey", "嘿（叫人或亲切打招呼）"], ["hi", "嗨"], ["high", "高的（离地面、程度）"], ["him", "他（宾格）"]],
    ["嗨", "他（宾格）", "嘿（叫人或亲切打招呼）", "高的（离地面、程度）"],
    "hey = 嘿（叫人或亲切打招呼） · hi = 嗨 · high = 高的（离地面、程度） · him = 他（宾格）",
  ),
  chQ("“history”是什么意思？", ["爱好", "家", "假期；节日", "历史"], "历史", "“history”的意思是“历史”。例句：I like history at school."),
  tfQ("“head”的意思是“听见”，对还是错？", "错", "“head”的意思是“头”。“听见”是“hear”的意思。"),
  chQ("选一个意思是“希望”的单词完成句子：I _____ you feel better soon.", ["health", "hope", "horse", "head"], "hope", "“hope”的意思是“希望”。例句：I hope you feel better soon."),
  chQ("“hi”是什么意思？", ["高的（离地面、程度）", "他的", "他（宾格）", "嗨"], "嗨", "“hi”的意思是“嗨”。例句：Hi! Nice to meet you."),
  fillQ(
    "Our teacher gave us ten maths questions to do at home as ___.",
    "Our teacher gave us ten maths questions to do at home as homework.",
    "homework",
    "“homework” = 家庭作业。Our teacher gave us ten maths questions to do at home as homework.",
  ),
  tfQ("“home”的意思是“家”，对还是错？", "对", "“home”的意思是“家”。"),
  chQ("“him”是什么意思？", ["他的", "爱好", "历史", "他（宾格）"], "他（宾格）", "“him”的意思是“他（宾格）”。例句：I gave him a present."),
  matchQ(
    [["hello", "你好"], ["help", "帮助"], ["her", "她（宾格）；她的"], ["here", "在这里"]],
    ["在这里", "帮助", "她（宾格）；她的", "你好"],
    "hello = 你好 · help = 帮助 · her = 她（宾格）；她的 · here = 在这里",
  ),
  chQ("选一个意思是“帮助”的单词。", ["hey", "help", "her", "here"], "help", "“help”的意思是“帮助”。例句：She helped me carry the bags."),
  tfQ("“hobby”的意思是“家庭作业”，对还是错？", "错", "“hobby”的意思是“爱好”。“家庭作业”是“homework”的意思。"),
  chQ("哪个单词的意思是“马”？", ["healthy", "health", "horse", "head"], "horse", "“horse”的意思是“马”。例句：The horse runs very fast."),
  chQ("选一个意思是“假期；节日”的单词完成句子：We are on _____ in Da Nang.", ["homework", "holiday", "home", "hope"], "holiday", "“holiday”的意思是“假期；节日”。例句：We are on holiday in Da Nang."),
  fillQ(
    "Come ___ beside me, not over there by the door.",
    "Come here beside me, not over there by the door.",
    "here",
    "“here” = 在这里。Come here beside me, not over there by the door.",
  ),
];

const CEFR_A1_L24_WORDS: EW[] = [
  ["husband", "/ˈhʌzbənd/", "名词", "丈夫", "名词；反义词 wife", "Her husband is a doctor.", "My husband cooks dinner every day."],
  ["hour", "/ˈaʊə/", "名词", "小时", "名词；h 不发音，所以用 an hour", "I wait for an hour.", "The film is two hours long."],
  ["hotel", "/həʊˈtel/", "名词", "酒店", "可数名词；stay at a hotel", "We stay at a small hotel.", "The hotel is near the beach."],
  ["hot", "/hɒt/", "形容词", "热的", "形容词；反义词 cold", "The soup is very hot.", "It is hot in summer."],
  ["house", "/haʊs/", "名词", "房子", "可数名词；指住人的建筑", "Their house is very old.", "Our house has a garden."],
  ["how", "/haʊ/", "副词", "怎样；多少", "疑问副词：how old, how much", "How are you today?", "How do you go to school?"],
  ["ice", "/aɪs/", "名词", "冰", "不可数名词", "I want some ice in my drink.", "The ice on the lake is thick."],
  ["include", "/ɪnˈkluːd/", "动词", "包括", "动词；the price includes something", "The price includes breakfast.", "The team includes five new players."],
  ["important", "/ɪmˈpɔːtənt/", "形容词", "重要的", "形容词；important for 或 to sb", "Sleep is important for health.", "This is an important day for us."],
  ["hundred", "/ˈhʌndrəd/", "数词", "一百（100）", "基数词；a hundred，前面有数字时不加 s", "There are a hundred students here.", "This book has two hundred pages."],
  ["hungry", "/ˈhʌŋɡri/", "形容词", "饿的", "形容词；be hungry：觉得饿", "I am very hungry now.", "The children are hungry after school."],
  ["I", "/aɪ/", "代词", "我", "第一人称主格代词，永远大写", "I like playing football.", "I live in Hanoi."],
  ["in", "/ɪn/", "介词", "在……里；在……内", "表示地点或时间的介词", "The keys are in my bag.", "We meet in the morning."],
  ["if", "/ɪf/", "连词", "如果", "表示条件的连词", "If it rains, we stay at home.", "Call me if you need help."],
  ["however", "/haʊˈevə/", "副词", "然而", "连接句子的副词，常放在句首", "I am tired. However, I must finish my work.", "The test was hard. However, she passed."],
  ["imagine", "/ɪˈmædʒɪn/", "动词", "想象", "动词；imagine doing something", "Imagine a world without cars.", "I can't imagine life without music."],
  ["ice cream", "/aɪs kriːm/", "名词", "冰淇淋", "名词短语；冷着吃的甜食", "The children love ice cream.", "I eat a chocolate ice cream."],
  ["idea", "/aɪˈdɪə/", "名词", "想法；意见", "可数名词；a good idea", "That is a good idea.", "I have no idea where she is."],
  ["improve", "/ɪmˈpruːv/", "动词", "改进；提高", "动词；使变得更好", "I want to improve my English.", "Her health is improving now."],
  ["hospital", "/ˈhɒspɪtl/", "名词", "医院", "名词；in hospital 指住院", "My mother works in a hospital.", "He is in hospital now."],
];

const CEFR_A1_L24_PRACTICE: QuizQuestion[] = [
  tfQ("“idea”的意思是“想法；意见”，对还是错？", "对", "“idea”的意思是“想法；意见”。"),
  chQ("哪个单词的意思是“改进；提高”？", ["include", "improve", "in", "hospital"], "improve", "“improve”的意思是“改进；提高”。例句：I want to improve my English."),
  matchQ(
    [["hungry", "饿的"], ["husband", "丈夫"], ["I", "我"], ["ice", "冰"]],
    ["冰", "丈夫", "饿的", "我"],
    "hungry = 饿的 · husband = 丈夫 · I = 我 · ice = 冰",
  ),
  chQ("“in”是什么意思？", ["在……里；在……内", "包括", "热的", "医院"], "在……里；在……内", "“in”的意思是“在……里；在……内”。例句：The keys are in my bag."),
  tfQ("“ice cream”的意思是“冰淇淋”，对还是错？", "对", "“ice cream”的意思是“冰淇淋”。"),
  chQ("选一个意思是“丈夫”的单词完成句子：Her _____ is a doctor.", ["ice", "I", "husband", "ice cream"], "husband", "“husband”的意思是“丈夫”。例句：Her husband is a doctor."),
  chQ("“hotel”是什么意思？", ["酒店", "房子", "怎样；多少", "小时"], "酒店", "“hotel”的意思是“酒店”。例句：We stay at a small hotel."),
  fillQ(
    "The film was long; ____, we enjoyed it and watched until the end.",
    "The film was long; however, we enjoyed it and watched until the end.",
    "however",
    "“however” = 然而。The film was long; however, we enjoyed it and watched until the end.",
  ),
  tfQ("“hour”的意思是“小时”，对还是错？", "对", "“hour”的意思是“小时”。"),
  chQ("“imagine”是什么意思？", ["在……里；在……内", "想象", "重要的", "改进；提高"], "想象", "“imagine”的意思是“想象”。例句：Imagine a world without cars."),
  matchQ(
    [["important", "重要的"], ["improve", "改进；提高"], ["in", "在……里；在……内"], ["include", "包括"]],
    ["包括", "在……里；在……内", "改进；提高", "重要的"],
    "important = 重要的 · improve = 改进；提高 · in = 在……里；在……内 · include = 包括",
  ),
  chQ("选一个意思是“房子”的单词完成句子：Their _____ is very old.", ["however", "how", "hundred", "house"], "house", "“house”的意思是“房子”。例句：Their house is very old."),
  tfQ("“hundred”的意思是“我”，对还是错？", "错", "“hundred”的意思是“一百（100）”。“我”是“I”的意思。"),
  chQ("哪个单词的意思是“怎样；多少”？", ["hungry", "however", "how", "hundred"], "how", "“how”的意思是“怎样；多少”。例句：How are you today?"),
  chQ("选一个意思是“热的”的单词完成句子：The soup is very _____.", ["hot", "house", "hotel", "hour"], "hot", "“hot”的意思是“热的”。例句：The soup is very hot."),
  fillQ(
    "The price of the holiday will ___ transport but not meals.",
    "The price of the holiday will include transport but not meals.",
    "include",
    "“include” = 包括。The price of the holiday will include transport but not meals.",
  ),
];

const CEFR_A1_L25_WORDS: EW[] = [
  ["jacket", "/ˈdʒækɪt/", "名词", "短外套", "可数名词；短外套", "Put on your jacket, it is cold.", "She wears a blue jacket."],
  ["information", "/ˌɪnfəˈmeɪʃn/", "名词", "信息", "不可数名词；a piece of information", "I need more information about the course.", "This website gives useful information."],
  ["it", "/ɪt/", "代词", "它", "指物、动物或事情的代词", "It is a nice day.", "I like this song. It is beautiful."],
  ["into", "/ˈɪntuː/", "介词", "进入……里面", "表示向内移动的介词", "The cat jumps into the box.", "We walk into the room."],
  ["interview", "/ˈɪntəvjuː/", "名词", "采访；面试", "名词；a job interview：求职面试", "She has a job interview tomorrow.", "The interview lasts thirty minutes."],
  ["June", "/dʒuːn/", "名词", "六月", "名词；月份名，永远大写", "School ends in June.", "They got married last June."],
  ["interested", "/ˈɪntrəstɪd/", "形容词", "感兴趣的", "形容人的感受；interested in something", "I am interested in history.", "Are you interested in this job?"],
  ["jeans", "/dʒiːnz/", "名词", "牛仔裤", "复数名词；a pair of jeans", "She is wearing blue jeans.", "I bought a new pair of jeans yesterday."],
  ["interest", "/ˈɪntrəst/", "名词", "兴趣", "名词；interest in something", "She has a strong interest in music.", "He shows no interest in sport."],
  ["island", "/ˈaɪlənd/", "名词", "岛", "名词；s 不发音，读作 /ˈaɪlənd/", "They live on a small island.", "The island is famous for its beaches."],
  ["journey", "/ˈdʒɜːni/", "名词", "旅程", "名词；常指长途旅行", "The journey to London takes three hours.", "We had a long journey home."],
  ["interesting", "/ˈɪntrəstɪŋ/", "形容词", "有趣的", "形容事物、事情让人觉得有趣", "This is an interesting book.", "The museum is very interesting."],
  ["introduce", "/ˌɪntrəˈdjuːs/", "动词", "介绍", "动词；introduce sb to sb", "Let me introduce my friend to you.", "She introduces herself to the class."],
  ["its", "/ɪts/", "限定词", "它的", "所有格；和 it's（it is）不同", "The dog wags its tail.", "The company has its office in the city."],
  ["internet", "/ˈɪntənet/", "名词", "互联网", "名词；常用 the internet, on the internet", "I find the news on the internet.", "The internet is very slow today."],
  ["January", "/ˈdʒænjuəri/", "名词", "一月", "名词；月份名，永远大写", "My birthday is in January.", "It is very cold here in January."],
  ["job", "/dʒɒb/", "名词", "工作", "名词；have/get a job", "He has a good job in a bank.", "My sister is looking for a new job."],
  ["join", "/dʒɔɪn/", "动词", "参加；加入", "动词；join a club/group, join sb", "Do you want to join us for lunch?", "She joined the football club last year."],
  ["juice", "/dʒuːs/", "名词", "果汁", "名词；通常不可数", "I drink orange juice every morning.", "Would you like some apple juice?"],
  ["July", "/dʒuˈlaɪ/", "名词", "七月", "名词；月份名，永远大写", "We go on holiday in July.", "The weather is very hot in July."],
];

const CEFR_A1_L25_PRACTICE: QuizQuestion[] = [
  tfQ("“into”的意思是“进入……里面”，对还是错？", "对", "“into”的意思是“进入……里面”。"),
  chQ("哪个单词的意思是“短外套”？", ["January", "jacket", "job", "jeans"], "jacket", "“jacket”的意思是“短外套”。例句：Put on your jacket, it is cold."),
  matchQ(
    [["island", "岛"], ["it", "它"], ["its", "它的"], ["jacket", "短外套"]],
    ["岛", "它", "它的", "短外套"],
    "island = 岛 · it = 它 · its = 它的 · jacket = 短外套",
  ),
  chQ("“internet”是什么意思？", ["面试", "互联网", "进入……里面", "介绍"], "互联网", "“internet”的意思是“互联网”。例句：I find the news on the internet."),
  tfQ("“interest”的意思是“互联网”，对还是错？", "错", "“interest”的意思是“兴趣”。“互联网”是“internet”的意思。"),
  chQ("选一个意思是“工作”的单词完成句子：He has a good _____ in a bank.", ["January", "juice", "July", "job"], "job", "“job”的意思是“工作”。例句：He has a good job in a bank."),
  chQ("“join”是什么意思？", ["旅程", "七月", "参加；加入", "果汁"], "参加；加入", "“join”的意思是“参加；加入”。例句：Do you want to join us for lunch?"),
  fillQ(
    "The dog wagged ___ tail when it saw Ben coming home.",
    "The dog wagged its tail when it saw Ben coming home.",
    "its",
    "“its” = 它的。The dog wagged its tail when it saw Ben coming home.",
  ),
  tfQ("“June”的意思是“感兴趣的”，对还是错？", "错", "“June”的意思是“六月”。“感兴趣的”是“interested”的意思。"),
  chQ("“interview”是什么意思？", ["岛", "进入……里面", "采访；面试", "介绍"], "采访；面试", "“interview”的意思是“采访；面试”。例句：She has a job interview tomorrow."),
  matchQ(
    [["July", "七月"], ["June", "六月"], ["information", "信息"], ["interest", "兴趣"]],
    ["七月", "六月", "信息", "兴趣"],
    "July = 七月 · June = 六月 · information = 信息 · interest = 兴趣",
  ),
  chQ("I need more _____ about the course.", ["interesting", "information", "interview", "island"], "information", "“information”的意思是“信息”。例句：I need more information about the course."),
  tfQ("“interested”的意思是“面试”，对还是错？", "错", "“interested”的意思是“感兴趣的”。“面试”是“interview”的意思。"),
  chQ("哪个单词的意思是“一月”？", ["join", "jeans", "January", "job"], "January", "“January”的意思是“一月”。例句：My birthday is in January."),
  chQ("选一个意思是“介绍”的单词完成句子：Let me _____ my friend to you.", ["introduce", "interested", "interesting", "into"], "introduce", "“introduce”的意思是“介绍”。例句：Let me introduce my friend to you."),
  fillQ(
    "She squeezed fresh oranges to make a glass of ___ for breakfast.",
    "She squeezed fresh oranges to make a glass of juice for breakfast.",
    "juice",
    "“juice” = 果汁。She squeezed fresh oranges to make a glass of juice for breakfast.",
  ),
];

const CEFR_A1_L26_WORDS: EW[] = [
  ["left", "/left/", "形容词", "左边的；左边", "形容词/名词；on the left", "Write with your left hand.", "The shop is on the left."],
  ["land", "/lænd/", "名词", "土地；陆地", "名词；通常不可数", "The farmer owns a lot of land.", "After the long trip, we were happy to see land."],
  ["last", "/lɑːst/", "形容词", "最后的；刚过去的", "形容词/限定词；last week/year", "December is the last month of the year.", "I saw her last week."],
  ["keep", "/kiːp/", "动词", "保留；保持", "动词；keep sth, keep doing sth", "Please keep this book for me.", "You can keep the change."],
  ["lesson", "/ˈlesn/", "名词", "课", "名词；have a lesson", "Our English lesson starts at nine.", "I have a piano lesson today."],
  ["late", "/leɪt/", "形容词", "晚的；迟的", "形容词/副词；be late for sth", "I was late for school today.", "It is getting late, so let us go home."],
  ["leg", "/leɡ/", "名词", "腿", "名词；身体部位", "The dog has four legs.", "My leg hurts after running."],
  ["know", "/nəʊ/", "动词", "知道；认识", "动词；know sth/sb, know that", "I know the answer to this question.", "Do you know my brother Tom?"],
  ["just", "/dʒʌst/", "副词", "刚刚；只是", "副词；just + 现在完成时/过去完成时", "I have just finished my homework.", "It is just a small problem."],
  ["later", "/ˈleɪtə/", "副词", "后来；以后", "副词；see you later", "I will call you later tonight.", "We can finish this work later."],
  ["large", "/lɑːdʒ/", "形容词", "大的", "形容词；large + 名词", "They live in a large house.", "I would like a large coffee, please."],
  ["key", "/kiː/", "名词", "钥匙", "名词；the key to the door", "I cannot find my car key.", "She put the key in the lock."],
  ["learn", "/lɜːn/", "动词", "学习", "动词；learn to do sth", "I want to learn English.", "She learned to swim last summer."],
  ["kind", "/kaɪnd/", "形容词", "善良的；种类", "形容词：善良的；名词：种类，kind of", "She is very kind to everyone.", "What kind of music do you like?"],
  ["leave", "/liːv/", "动词", "离开；留下", "动词；leave a place, leave sth somewhere", "We leave home at seven o'clock.", "Do not leave your bag on the bus."],
  ["letter", "/ˈletə/", "名词", "信；字母", "名词；write a letter", "I wrote a letter to my friend.", "The word cat has three letters."],
  ["language", "/ˈlæŋɡwɪdʒ/", "名词", "语言", "名词；speak a language", "English is a very useful language.", "How many languages do you speak?"],
  ["laugh", "/lɑːf/", "动词", "笑", "动词；laugh at sb/sth", "The children laughed at the funny clown.", "We laughed together all evening."],
  ["kilometre", "/ˈkɪləmiːtə/", "名词", "公里", "名词；距离单位", "The school is two kilometres from my house.", "We walked about five kilometres today."],
  ["let", "/let/", "动词", "允许；让", "动词；let sb do sth", "Let me help you with that.", "My parents let me stay up late on Friday."],
  ["kitchen", "/ˈkɪtʃɪn/", "名词", "厨房", "名词；in the kitchen", "My mother is cooking in the kitchen.", "We have a big, bright kitchen."],
];

const CEFR_A1_L26_PRACTICE: QuizQuestion[] = [
  tfQ("“kind”的意思是“土地；陆地”，对还是错？", "错", "“kind”的意思是“善良的；种类”。“土地；陆地”是“land”的意思。"),
  chQ("哪个单词的意思是“离开；留下”？", ["leg", "leave", "left", "lesson"], "leave", "“leave”的意思是“离开；留下”。例句：We leave home at seven o'clock."),
  matchQ(
    [["land", "土地；陆地"], ["language", "语言"], ["large", "大的"], ["last", "最后的；刚过去的"]],
    ["土地；陆地", "语言", "大的", "最后的；刚过去的"],
    "land = 土地；陆地 · language = 语言 · large = 大的 · last = 最后的；刚过去的",
  ),
  chQ("“kilometre”是什么意思？", ["善良的；种类", "厨房", "知道；认识", "公里"], "公里", "“kilometre”的意思是“公里”。例句：The school is two kilometres from my house."),
  tfQ("“laugh”的意思是“左边的”，对还是错？", "错", "“laugh”的意思是“笑”。“左边的”是“left”的意思。"),
  chQ("选一个意思是“课”的单词完成句子：Our English _____ starts at nine.", ["land", "lesson", "late", "leg"], "lesson", "“lesson”的意思是“课”。例句：Our English lesson starts at nine."),
  chQ("“left”是什么意思？", ["腿", "左边的；左边", "允许；让", "课"], "左边的；左边", "“left”的意思是“左边的；左边”。例句：Write with your left hand."),
  fillQ(
    "You can _____ this book because I do not need it back.",
    "You can keep this book because I do not need it back.",
    "keep",
    "“keep” = 保留；保持。You can keep this book because I do not need it back.",
  ),
  tfQ("“large”的意思是“后来；以后”，对还是错？", "错", "“large”的意思是“大的”。“后来；以后”是“later”的意思。"),
  chQ("“letter”是什么意思？", ["信；字母", "刚刚；只是", "保留；保持", "钥匙"], "信；字母", "“letter”的意思是“信；字母”。例句：I wrote a letter to my friend."),
  matchQ(
    [["late", "晚的；迟的"], ["later", "后来；以后"], ["laugh", "笑"], ["learn", "学习"]],
    ["晚的；迟的", "后来；以后", "笑", "学习"],
    "late = 晚的；迟的 · later = 后来；以后 · laugh = 笑 · learn = 学习",
  ),
  chQ("选一个意思是“最后的；刚过去的”的单词完成句子：December is the _____ month of the year.", ["language", "last", "laugh", "late"], "last", "“last”的意思是“最后的；刚过去的”。例句：December is the last month of the year."),
  tfQ("“later”的意思是“后来；以后”，对还是错？", "对", "“later”的意思是“后来；以后”。"),
  chQ("哪个单词的意思是“刚刚；只是”？", ["just", "kilometre", "key", "keep"], "just", "“just”的意思是“刚刚；只是”。例句：I have just finished my homework."),
  chQ("选一个意思是“知道；认识”的单词完成句子：I _____ the answer to this question.", ["know", "kilometre", "kind", "kitchen"], "know", "“know”的意思是“知道；认识”。例句：I know the answer to this question."),
  fillQ(
    "My parents will not _____ me stay out late because I have school tomorrow.",
    "My parents will not let me stay out late because I have school tomorrow.",
    "let",
    "“let” = 允许；让。My parents will not let me stay out late because I have school tomorrow.",
  ),
];

const CEFR_A1_L27_WORDS: EW[] = [
  ["lose", "/luːz/", "动词", "丢失；输掉", "不规则动词：lose, lost, lost", "Be careful, don't lose your keys.", "Our team often loses the game."],
  ["like", "/laɪk/", "动词", "喜欢；像", "动词：喜欢；介词：像", "I like chocolate ice cream.", "She looks like her mother."],
  ["live", "/lɪv/", "动词", "生活；居住", "动词；live in a place", "We live in a small town.", "My grandparents live near the sea."],
  ["magazine", "/ˌmæɡəˈziːn/", "名词", "杂志", "可数名词；a magazine", "She reads a fashion magazine every week.", "I bought a magazine at the station."],
  ["line", "/laɪn/", "名词", "线；行", "名词；stand in a line", "Draw a straight line here.", "We stood in a line to buy tickets."],
  ["little", "/ˈlɪtl/", "形容词", "小的；少的", "形容词；a little + 不可数名词", "They have a little dog.", "Can I have a little water, please?"],
  ["listen", "/ˈlɪsn/", "动词", "听", "动词；listen to sb/sth", "I listen to music every day.", "Please listen to your teacher."],
  ["list", "/lɪst/", "名词", "清单", "名词；a list of sth, make a list", "I made a list of things to buy.", "Her name is on the list."],
  ["local", "/ˈləʊkl/", "形容词", "当地的；附近的", "常放在名词前面：local shop, local news", "There is a good local shop near my house.", "We often eat at a local restaurant."],
  ["lion", "/ˈlaɪən/", "名词", "狮子", "名词；动物名", "The lion is a strong animal.", "We saw a lion at the zoo."],
  ["lunch", "/lʌntʃ/", "名词", "午餐", "have lunch：吃午餐；常不用冠词", "We have lunch at twelve o'clock.", "What do you want for lunch?"],
  ["machine", "/məˈʃiːn/", "名词", "机器", "washing machine：洗衣机；coffee machine", "This machine makes coffee.", "My father fixed the washing machine."],
  ["lie", "/laɪ/", "动词", "躺；说谎", "动词；lie down；lie to sb", "I like to lie on the beach in summer.", "Please do not lie to me."],
  ["love", "/lʌv/", "动词", "爱；非常喜欢", "love + 名词 或 love + V-ing/to V", "I love my family very much.", "She loves eating chocolate ice cream."],
  ["library", "/ˈlaɪbrəri/", "名词", "图书馆", "名词；in/at the library", "I borrow books from the library.", "The library is quiet and clean."],
  ["lot", "/lɒt/", "代词", "很多", "a lot of + 名词；thanks a lot：非常感谢", "I have a lot of homework tonight.", "Thanks a lot for your help."],
  ["long", "/lɒŋ/", "形容词", "长的；久的", "指长度或时间；问：how long", "She has very long hair.", "It is a long way to the city."],
  ["look", "/lʊk/", "动词", "看；看起来", "look at：看；look + 形容词：看起来", "Look at that beautiful bird.", "You look tired today."],
  ["life", "/laɪf/", "名词", "生活；生命", "名词；复数是 lives", "City life is very busy.", "She has a happy life."],
  ["main", "/meɪn/", "形容词", "主要的", "总放在名词前面：main road, main idea", "The main street is very busy.", "What is the main reason for this?"],
  ["light", "/laɪt/", "名词", "光；灯", "名词：光/灯；也是形容词：轻的", "Please turn on the light.", "The sun gives us light and heat."],
];

const CEFR_A1_L27_PRACTICE: QuizQuestion[] = [
  tfQ("“machine”的意思是“机器”，对还是错？", "对", "“machine”的意思是“机器”。"),
  chQ("哪个单词的意思是“爱；非常喜欢”？", ["lunch", "love", "magazine", "machine"], "love", "“love”的意思是“爱；非常喜欢”。例句：I love my family very much."),
  matchQ(
    [["local", "当地的；附近的"], ["long", "长的；久的"], ["look", "看；看起来"], ["lose", "丢失；输掉"]],
    ["丢失；输掉", "当地的；附近的", "长的；久的", "看；看起来"],
    "local = 当地的；附近的 · long = 长的；久的 · look = 看；看起来 · lose = 丢失；输掉",
  ),
  chQ("“live”是什么意思？", ["长的；久的", "当地的；附近的", "看；看起来", "生活；居住"], "生活；居住", "“live”的意思是“生活；居住”。例句：We live in a small town."),
  tfQ("“line”的意思是“听”，对还是错？", "错", "“line”的意思是“线；行”。“听”是“listen”的意思。"),
  chQ("选一个意思是“喜欢；像”的单词完成句子：I _____ chocolate ice cream.", ["list", "like", "lion", "line"], "like", "“like”的意思是“喜欢；像”。例句：I like chocolate ice cream."),
  chQ("“lion”是什么意思？", ["小的；少的", "清单", "狮子", "听"], "狮子", "“lion”的意思是“狮子”。例句：The lion is a strong animal."),
  fillQ(
    "The morning _____ came through the curtains as the sun rose.",
    "The morning light came through the curtains as the sun rose.",
    "light",
    "“light” = 光；灯。The morning light came through the curtains as the sun rose.",
  ),
  tfQ("“main”的意思是“生活；生命”，对还是错？", "错", "“main”的意思是“主要的”。“生活；生命”是“life”的意思。"),
  chQ("“little”是什么意思？", ["长的；久的", "生活；居住", "小的；少的", "当地的；附近的"], "小的；少的", "“little”的意思是“小的；少的”。例句：They have a little dog."),
  matchQ(
    [["lot", "很多"], ["love", "爱；非常喜欢"], ["lunch", "午餐"], ["machine", "机器"]],
    ["午餐", "机器", "很多", "爱；非常喜欢"],
    "lot = 很多 · love = 爱；非常喜欢 · lunch = 午餐 · machine = 机器",
  ),
  chQ("选一个意思是“长的；久的”的单词完成句子：She has very _____ hair.", ["lose", "lot", "long", "look"], "long", "“long”的意思是“长的；久的”。例句：She has very long hair."),
  tfQ("“lose”的意思是“午餐”，对还是错？", "错", "“lose”的意思是“丢失；输掉”。“午餐”是“lunch”的意思。"),
  chQ("哪个单词的意思是“看；看起来”？", ["lose", "love", "lot", "look"], "look", "“look”的意思是“看；看起来”。例句：Look at that beautiful bird."),
  chQ("选一个意思是“躺；说谎”的单词完成句子：I like to _____ on the beach in summer.", ["lie", "like", "life", "light"], "lie", "“lie”的意思是“躺；说谎”。例句：I like to lie on the beach in summer."),
  fillQ(
    "He checked his _____ before going shopping to make sure nothing was forgotten.",
    "He checked his list before going shopping to make sure nothing was forgotten.",
    "list",
    "“list” = 清单。He checked his list before going shopping to make sure nothing was forgotten.",
  ),
];

const CEFR_A1_L28_WORDS: EW[] = [
  ["married", "/ˈmærid/", "形容词", "已婚的", "be married to；get married：结婚", "They are married and have two children.", "My sister got married last year."],
  ["menu", "/ˈmenjuː/", "名词", "菜单", "on the menu：在菜单上", "Can I see the menu, please?", "There are many drinks on the menu."],
  ["mean", "/miːn/", "动词", "意思是", "What does ... mean?：……是什么意思？", "What does this word mean?", "A red light means stop."],
  ["meeting", "/ˈmiːtɪŋ/", "名词", "会议", "have a meeting：开会", "I have a meeting at nine o'clock.", "The meeting lasted two hours."],
  ["meaning", "/ˈmiːnɪŋ/", "名词", "意思", "the meaning of：……的意思", "I don't know the meaning of this word.", "Can you explain the meaning of the song?"],
  ["map", "/mæp/", "名词", "地图", "on the map：在地图上", "We looked at the map to find the hotel.", "Can you show me the way on the map?"],
  ["me", "/miː/", "代词", "我（宾格）", "放在动词或介词后面", "Can you call me tonight?", "She gave me a nice present."],
  ["match", "/mætʃ/", "名词", "比赛；火柴", "football match；a box of matches", "We watched a football match on TV.", "He lit the candle with a match."],
  ["message", "/ˈmesɪdʒ/", "名词", "消息", "send/get a message；leave a message", "I got a message from my friend.", "Please leave a message after the beep."],
  ["metre", "/ˈmiːtə/", "名词", "米（长度单位）", "英式拼写；复数：metres", "The room is five metres long.", "He can swim fifty metres."],
  ["maybe", "/ˈmeɪbi/", "副词", "也许", "常放在句首", "Maybe it will rain tomorrow.", "Maybe she is at home now."],
  ["March", "/mɑːtʃ/", "名词", "三月", "月份名，永远大写；in March", "My birthday is in March.", "Spring begins in March here."],
  ["meat", "/miːt/", "名词", "肉", "不可数名词", "My brother doesn't eat meat.", "She bought some meat at the shop."],
  ["May", "/meɪ/", "名词", "五月", "月份名，永远大写；in May", "We often go on holiday in May.", "The flowers bloom in May."],
  ["man", "/mæn/", "名词", "男人", "复数不规则：men", "The old man is sitting on the bench.", "That man is my English teacher."],
  ["meal", "/miːl/", "名词", "一餐", "a big meal；three meals a day", "Dinner is my favourite meal of the day.", "We had a big meal at the restaurant."],
  ["meet", "/miːt/", "动词", "见面", "不规则动词：meet, met, met", "I meet my friends every weekend.", "Nice to meet you."],
  ["member", "/ˈmembə/", "名词", "成员", "a member of：……的成员", "She is a member of the tennis club.", "All the family members were at the party."],
  ["make", "/meɪk/", "动词", "做；制作", "不规则动词：make, made, made", "I make breakfast every morning.", "Let's make a cake for her birthday."],
  ["market", "/ˈmɑːkɪt/", "名词", "市场", "at the market：在市场", "She buys fresh fruit at the market.", "The market is open every morning."],
  ["many", "/ˈmeni/", "限定词", "许多（用于可数名词复数）", "how many：多少；用于疑问句、否定句", "How many brothers do you have?", "There are many books on the shelf."],
];

const CEFR_A1_L28_PRACTICE: QuizQuestion[] = [
  tfQ("“member”的意思是“米（长度单位）”，对还是错？", "错", "“member”的意思是“成员”。“米（长度单位）”是“metre”的意思。"),
  chQ("哪个单词的意思是“会议”？", ["menu", "message", "member", "meeting"], "meeting", "“meeting”的意思是“会议”。例句：I have a meeting at nine o'clock."),
  matchQ(
    [["mean", "意思是"], ["meaning", "意思"], ["meat", "肉"], ["meet", "见面"]],
    ["肉", "意思", "意思是", "见面"],
    "mean = 意思是 · meaning = 意思 · meat = 肉 · meet = 见面",
  ),
  chQ("“man”是什么意思？", ["男人", "地图", "许多（用于可数名词复数）", "三月"], "男人", "“man”的意思是“男人”。例句：The old man is sitting on the bench."),
  tfQ("“maybe”的意思是“也许”，对还是错？", "对", "“maybe”的意思是“也许”。"),
  chQ("选一个意思是“地图”的单词完成句子：We looked at the _____ to find the hotel.", ["market", "map", "March", "married"], "map", "“map”的意思是“地图”。例句：We looked at the map to find the hotel."),
  chQ("“married”是什么意思？", ["也许", "已婚的", "比赛；火柴", "五月"], "已婚的", "“married”的意思是“已婚的”。例句：They are married and have two children."),
  fillQ(
    "How _____ students are there in your class: twenty or thirty?",
    "How many students are there in your class: twenty or thirty?",
    "many",
    "“many” = 许多（用于可数名词复数）。How many students are there in your class: twenty or thirty?",
  ),
  tfQ("“message”的意思是“男人”，对还是错？", "错", "“message”的意思是“消息”。“男人”是“man”的意思。"),
  chQ("“menu”是什么意思？", ["消息", "米（长度单位）", "菜单", "做；制作"], "菜单", "“menu”的意思是“菜单”。例句：Can I see the menu, please?"),
  matchQ(
    [["March", "三月"], ["market", "市场"], ["married", "已婚的"], ["match", "比赛；火柴"]],
    ["市场", "比赛；火柴", "已婚的", "三月"],
    "March = 三月 · market = 市场 · married = 已婚的 · match = 比赛；火柴",
  ),
  chQ("选一个意思是“意思”的单词完成句子：I don't know the _____ of this word.", ["meeting", "meat", "meaning", "meet"], "meaning", "“meaning”的意思是“意思”。例句：I don't know the meaning of this word."),
  tfQ("“match”的意思是“比赛；火柴”，对还是错？", "对", "“match”的意思是“比赛；火柴”。"),
  chQ("哪个单词的意思是“我（宾格）”？", ["meal", "me", "mean", "meaning"], "me", "“me”的意思是“我（宾格）”。例句：Can you call me tonight?"),
  chQ("选一个意思是“米（长度单位）”的单词。", ["many", "metre", "make", "man"], "metre", "“metre”的意思是“米（长度单位）”。例句：The room is five metres long."),
  fillQ(
    "We prepared a special _____ for our guests with three different dishes.",
    "We prepared a special meal for our guests with three different dishes.",
    "meal",
    "“meal” = 一餐。We prepared a special meal for our guests with three different dishes.",
  ),
];

const CEFR_A1_L29_WORDS: EW[] = [
  ["move", "/muːv/", "动词", "移动；搬家", "动词；move house 意思是搬家", "Please move your car.", "We are going to move to a new house."],
  ["Monday", "/ˈmʌndeɪ/", "名词", "星期一", "星期；总写大写，用 on Monday", "I go to school on Monday.", "We have a meeting next Monday."],
  ["more", "/mɔː/", "限定词", "更多", "表示数量更多；与名词或形容词连用", "Can I have more water?", "She wants more time to finish."],
  ["morning", "/ˈmɔːnɪŋ/", "名词", "早上", "名词；in the morning 意思是在早上", "The morning air is very cool.", "Good morning, how are you?"],
  ["midnight", "/ˈmɪdnaɪt/", "名词", "午夜", "at midnight 意思是在午夜", "The party ended at midnight.", "I went to bed after midnight."],
  ["mistake", "/mɪˈsteɪk/", "名词", "错误", "make a mistake 意思是犯错", "I made a mistake in the test.", "Everyone makes mistakes sometimes."],
  ["most", "/məʊst/", "限定词", "大多数", "表示大多数或大部分；most of", "Most children like ice cream.", "She spends most of her time reading."],
  ["mother", "/ˈmʌðə/", "名词", "妈妈", "指人的名词", "My mother cooks dinner for us.", "His mother is a doctor."],
  ["minute", "/ˈmɪnɪt/", "名词", "分钟", "wait a minute 意思是等一下；in ten minutes", "Wait a minute, please.", "The bus leaves in ten minutes."],
  ["million", "/ˈmɪljən/", "数词", "一百万", "a/one million；two million（有数字时不加 s）", "The city has two million people.", "He dreams of winning a million dollars."],
  ["money", "/ˈmʌni/", "名词", "钱", "不可数名词；无复数形式", "I don't have much money.", "She saves her money every month."],
  ["moment", "/ˈməʊmənt/", "名词", "时刻；一会儿", "名词；a moment 意思是一会儿", "Wait a moment, please.", "It was a happy moment."],
  ["milk", "/mɪlk/", "名词", "牛奶", "不可数名词；a glass of milk", "I drink a glass of milk every morning.", "She put some milk in her coffee."],
  ["month", "/mʌnθ/", "名词", "月", "可数名词；next month 意思是下个月", "There are twelve months in a year.", "I will see you next month."],
  ["modern", "/ˈmɒdn/", "形容词", "现代的", "常放在名词前面：modern art, modern house", "They live in a modern house.", "I really like modern art."],
  ["miss", "/mɪs/", "动词", "想念；错过", "miss someone 意思是想念某人；miss the bus 意思是错过公交车", "I miss my family when I am away.", "Hurry up, or we will miss the train."],
  ["mile", "/maɪl/", "名词", "英里", "复数：miles", "We walked three miles today.", "The beach is two miles from here."],
  ["mountain", "/ˈmaʊntən/", "名词", "山", "可数名词", "They climbed a high mountain.", "We can see the mountain from our house."],
  ["movie", "/ˈmuːvi/", "名词", "电影（美式）", "名词；美式英语，英式英语用 film", "Let's watch a movie tonight.", "This movie is very funny."],
  ["mouse", "/maʊs/", "名词", "老鼠；电脑鼠标", "名词；不规则复数 mice", "The cat is chasing a mouse.", "I need a new mouse for my computer."],
  ["mouth", "/maʊθ/", "名词", "嘴", "指身体部位的名词", "Open your mouth and say ah.", "She covered her mouth and laughed."],
  ["model", "/ˈmɒdl/", "名词", "模型；模特", "the newest model；a fashion model", "This is the newest model of the phone.", "She works as a fashion model."],
];

const CEFR_A1_L29_PRACTICE: QuizQuestion[] = [
  tfQ("“mile”的意思是“分钟”，对还是错？", "错", "“mile”的意思是“英里”。“分钟”是“minute”的意思。"),
  chQ("哪个单词的意思是“大多数”？", ["most", "mountain", "mouse", "mother"], "most", "“most”的意思是“大多数”。例句：Most children like ice cream."),
  matchQ(
    [["month", "月"], ["more", "更多"], ["morning", "早上"], ["most", "大多数"]],
    ["早上", "月", "大多数", "更多"],
    "month = 月 · more = 更多 · morning = 早上 · most = 大多数",
  ),
  chQ("“model”是什么意思？", ["星期一", "现代的", "时刻；一会儿", "模型；模特"], "模型；模特", "“model”的意思是“模型；模特”。例句：This is the newest model of the phone."),
  tfQ("“mother”的意思是“嘴”，对还是错？", "错", "“mother”的意思是“妈妈”。“嘴”是“mouth”的意思。"),
  chQ("选一个意思是“一百万”的单词完成句子：The city has two _____ people.", ["million", "mistake", "miss", "minute"], "million", "“million”的意思是“一百万”。例句：The city has two million people."),
  chQ("“mountain”是什么意思？", ["移动；搬家", "老鼠；电脑鼠标", "嘴", "山"], "山", "“mountain”的意思是“山”。例句：They climbed a high mountain."),
  fillQ(
    "She asked for _____ time because ten minutes was not enough.",
    "She asked for more time because ten minutes was not enough.",
    "more",
    "“more” = 更多。She asked for more time because ten minutes was not enough.",
  ),
  tfQ("“midnight”的意思是“午夜”，对还是错？", "对", "“midnight”的意思是“午夜”。"),
  chQ("“movie”是什么意思？", ["英里", "牛奶", "电影（美式）", "午夜"], "电影（美式）", "“movie”的意思是“电影（美式）”。例句：Let's watch a movie tonight."),
  matchQ(
    [["milk", "牛奶"], ["million", "一百万"], ["minute", "分钟"], ["miss", "想念；错过"]],
    ["分钟", "一百万", "牛奶", "想念；错过"],
    "milk = 牛奶 · million = 一百万 · minute = 分钟 · miss = 想念；错过",
  ),
  chQ("选一个意思是“错误”的单词完成句子：I made a _____ in the test.", ["model", "moment", "modern", "mistake"], "mistake", "“mistake”的意思是“错误”。例句：I made a mistake in the test."),
  tfQ("“move”的意思是“英里”，对还是错？", "错", "“move”的意思是“移动；搬家”。“英里”是“mile”的意思。"),
  chQ("哪个单词的意思是“想念；错过”？", ["model", "miss", "mistake", "modern"], "miss", "“miss”的意思是“想念；错过”。例句：I miss my family when I am away."),
  chQ("选一个意思是“老鼠；电脑鼠标”的单词完成句子：The cat is chasing a _____.", ["mouth", "move", "mouse", "movie"], "mouse", "“mouse”的意思是“老鼠；电脑鼠标”。例句：The cat is chasing a mouse."),
  fillQ(
    "As the family discussed the cost, I need some _____ to pay for the bus ticket.",
    "As the family discussed the cost, I need some money to pay for the bus ticket.",
    "money",
    "“money” = 钱。As the family discussed the cost, I need some money to pay for the bus ticket.",
  ),
];

const CEFR_A1_L30_WORDS: EW[] = [
  ["much", "/mʌtʃ/", "限定词", "许多（与不可数名词连用）", "与不可数名词连用；how much 意思是多少", "How much is this book?", "I don't have much time today."],
  ["news", "/njuːz/", "名词", "新闻", "不可数名词；总与单数动词连用", "I watch the news every evening.", "Do you have any good news?"],
  ["new", "/njuː/", "形容词", "新的", "形容词；与 old 反义", "I bought a new phone.", "She is the new teacher."],
  ["my", "/maɪ/", "限定词", "我的（置于名词前）", "所有格形容词；置于名词前", "This is my book.", "My name is Anna."],
  ["nineteen", "/ˌnaɪnˈtiːn/", "数词", "十九", "数词 19", "She is nineteen years old.", "There are nineteen students in the class."],
  ["neighbour", "/ˈneɪbə/", "名词", "邻居", "名词；英式英语，美式英语写作 neighbor", "My neighbour is very kind.", "We invited our neighbours for dinner."],
  ["nice", "/naɪs/", "形容词", "好的；宜人的", "形容词；用于赞美", "You have a nice smile.", "It is a nice day today."],
  ["mum", "/mʌm/", "名词", "妈妈（亲昵称呼）", "亲昵称呼的名词；英式英语，美式英语用 mom", "My mum makes great cakes.", "Can I go out, Mum?"],
  ["never", "/ˈnevə/", "副词", "从不", "频率副词；置于普通动词前", "I never drink coffee at night.", "She never tells lies."],
  ["music", "/ˈmjuːzɪk/", "名词", "音乐", "不可数名词", "I love listening to music.", "She plays music every evening."],
  ["near", "/nɪə/", "介词", "靠近", "表示位置靠近的介词", "The shop is near my house.", "He sat near the window."],
  ["newspaper", "/ˈnjuːzpeɪpə/", "名词", "报纸", "可数名词", "He reads the newspaper every morning.", "There is a photo in the newspaper."],
  ["night", "/naɪt/", "名词", "夜晚；晚上", "名词；at night 意思是在晚上", "I sleep eight hours every night.", "They arrived late at night."],
  ["name", "/neɪm/", "名词", "名字", "名词；first name 意思是名，last name 意思是姓", "What is your name?", "Her name is Linda."],
  ["museum", "/mjuːˈziːəm/", "名词", "博物馆", "可数名词", "We visited the art museum.", "The museum is closed on Mondays."],
  ["negative", "/ˈneɡətɪv/", "形容词", "消极的；否定的", "形容词；与 positive 反义", "He gave a negative answer.", "Try not to be so negative."],
  ["next", "/nekst/", "形容词", "下一个的；接下来的", "形容词；next week 意思是下周", "The next bus comes at ten.", "I will call you next week."],
  ["nine", "/naɪn/", "数词", "九", "数词 9", "I have nine books.", "The shop opens at nine."],
  ["must", "/mʌst/", "情态动词", "必须", "情态动词；must + 动词原形", "You must wear a seatbelt.", "I must finish my homework."],
  ["natural", "/ˈnætʃrəl/", "形容词", "自然的", "形容词；与 artificial 反义", "I like natural food.", "She has natural curly hair."],
  ["ninety", "/ˈnaɪnti/", "数词", "九十", "数词 90", "My grandfather is ninety years old.", "The test has ninety questions."],
  ["need", "/niːd/", "动词", "需要", "动词；need to 意思是需要做", "I need some help.", "Do you need a pen?"],
];

const CEFR_A1_L30_PRACTICE: QuizQuestion[] = [
  tfQ("“need”的意思是“从不”，对还是错？", "错", "“need”的意思是“需要”。“从不”是“never”的意思。"),
  chQ("哪个单词的意思是“消极的；否定的”？", ["negative", "new", "neighbour", "never"], "negative", "“negative”的意思是“消极的；否定的”。例句：He gave a negative answer."),
  matchQ(
    [["music", "音乐"], ["must", "必须"], ["my", "我的（置于名词前）"], ["name", "名字"]],
    ["音乐", "我的（置于名词前）", "必须", "名字"],
    "music = 音乐 · must = 必须 · my = 我的（置于名词前） · name = 名字",
  ),
  chQ("“nine”是什么意思？", ["九十", "九", "十九", "许多（与不可数名词连用）"], "九", "“nine”的意思是“九”。例句：I have nine books."),
  tfQ("“nineteen”的意思是“十九”，对还是错？", "对", "“nineteen”的意思是“十九”。"),
  chQ("选一个意思是“邻居”的单词完成句子：My _____ is very kind.", ["never", "neighbour", "news", "new"], "neighbour", "“neighbour”的意思是“邻居”。例句：My neighbour is very kind."),
  chQ("“newspaper”是什么意思？", ["报纸", "好的；宜人的", "夜晚；晚上", "下一个的；接下来的"], "报纸", "“newspaper”的意思是“报纸”。例句：He reads the newspaper every morning."),
  fillQ(
    "I am looking for _____ coat, the one I left on the chair this morning.",
    "I am looking for my coat, the one I left on the chair this morning.",
    "my",
    "“my” = 我的（置于名词前）。I am looking for my coat, the one I left on the chair this morning.",
  ),
  tfQ("“museum”的意思是“博物馆”，对还是错？", "对", "“museum”的意思是“博物馆”。"),
  chQ("“much”是什么意思？", ["妈妈（亲昵称呼）", "许多（与不可数名词连用）", "博物馆", "音乐"], "许多（与不可数名词连用）", "“much”的意思是“许多（与不可数名词连用）”。例句：How much is this book?"),
  matchQ(
    [["near", "靠近"], ["need", "需要"], ["negative", "消极的；否定的"], ["neighbour", "邻居"]],
    ["靠近", "邻居", "消极的；否定的", "需要"],
    "near = 靠近 · need = 需要 · negative = 消极的；否定的 · neighbour = 邻居",
  ),
  chQ("选一个意思是“名字”的单词完成句子：What is your _____?", ["near", "need", "natural", "name"], "name", "“name”的意思是“名字”。例句：What is your name?"),
  tfQ("“must”的意思是“自然的”，对还是错？", "错", "“must”的意思是“必须”。“自然的”是“natural”的意思。"),
  chQ("哪个单词的意思是“下一个的；接下来的”？", ["next", "nine", "night", "nice"], "next", "“next”的意思是“下一个的；接下来的”。例句：The next bus comes at ten."),
  chQ("选一个意思是“自然的”的单词完成句子：I like _____ food.", ["negative", "near", "natural", "need"], "natural", "“natural”的意思是“自然的”。例句：I like natural food."),
  fillQ(
    "I asked _____ if I could visit my friend after school.",
    "I asked mum if I could visit my friend after school.",
    "mum",
    "“mum” = 妈妈（亲昵称呼）。I asked mum if I could visit my friend after school.",
  ),
];

const CEFR_A1_L31_WORDS: EW[] = [
  ["now", "/naʊ/", "副词", "现在", "表示现在的时间副词", "We need to leave now.", "I am very busy right now."],
  ["old", "/əʊld/", "形容词", "老的；旧的", "形容词；问年龄用 How old…?", "My grandfather is very old.", "How old are you?"],
  ["of", "/ɒv/", "介词", "的", "表示所属或一部分的介词", "This is a photo of my family.", "She drank a cup of tea."],
  ["north", "/nɔːθ/", "名词", "北方", "表示方向的名词；the north", "The birds fly to the north in summer.", "My city is in the north of the country."],
  ["October", "/ɒkˈtəʊbə/", "名词", "十月", "月份名，永远大写，与 in 连用", "School starts in October.", "The weather is cool in October."],
  ["November", "/nəʊˈvembə/", "名词", "十一月", "月份名，永远大写，与 in 连用", "My birthday is in November.", "It often rains in November."],
  ["one", "/wʌn/", "数词", "一；一个（代替名词）", "数词；也可代替前面提到的名词", "I have one brother and two sisters.", "I like the red one."],
  ["not", "/nɒt/", "副词", "不", "否定副词；常缩写为 n't", "I am not tired.", "This is not my bag."],
  ["nobody", "/ˈnəʊbədi/", "代词", "没有人", "否定代词；与单数动词连用", "Nobody is at home.", "Nobody knows the answer."],
  ["number", "/ˈnʌmbə/", "名词", "数字；号码", "名词；phone number = 电话号码", "What is your phone number?", "Please write the number on the board."],
  ["nothing", "/ˈnʌθɪŋ/", "代词", "没有什么", "否定代词，动词仍用肯定形式", "There is nothing in the box.", "I have nothing to do today."],
  ["often", "/ˈɒfn/", "副词", "经常", "频率副词，放在主要动词前面", "I often walk to school.", "How often do you visit your grandmother?"],
  ["off", "/ɒf/", "副词", "关掉；离开", "副词；turn off = 关掉", "Please turn off the lights.", "He took off his shoes at the door."],
  ["note", "/nəʊt/", "名词", "笔记；便条", "名词；make a note = 记下来", "She left a note on the table.", "I made a note of his phone number."],
  ["nurse", "/nɜːs/", "名词", "护士", "表示职业的名词", "The nurse helped the sick child.", "My sister works as a nurse."],
  ["nose", "/nəʊz/", "名词", "鼻子", "表示身体部位的名词", "She has a small nose.", "My nose is cold."],
  ["object", "/ˈɒbdʒɪkt/", "名词", "物品", "表示具体东西的名词", "What is this object on the floor?", "The box is full of small objects."],
  ["no", "/nəʊ/", "限定词", "没有", "放在名词前面的限定词，也可用来拒绝", "There is no milk in the fridge.", "No, thank you."],
  ["office", "/ˈɒfɪs/", "名词", "办公室", "表示工作场所的名词", "My father works in an office.", "The office is on the third floor."],
  ["OK", "/ˌəʊˈkeɪ/", "感叹词", "好的；行", "表示同意或一切都好", "OK, let us go now.", "Are you OK?"],
  ["once", "/wʌns/", "副词", "一次；曾经", "副词；once a week = 每周一次", "I clean my room once a week.", "I have been to Paris once."],
  ["on", "/ɒn/", "介词", "在……上面；在（某天）", "表示在表面上的位置或星期几的介词", "The book is on the table.", "We have a test on Monday."],
  ["oh", "/əʊ/", "感叹词", "哦", "表示惊讶或感情的感叹词", "Oh, I forgot my keys.", "Oh, that is a beautiful dress."],
];

const CEFR_A1_L31_PRACTICE: QuizQuestion[] = [
  tfQ("“not”的意思是“不（用于否定）”，对还是错？", "对", "“not”的意思是“不（用于否定）”。"),
  chQ("哪个单词的意思是“数字；号码”？", ["number", "object", "nurse", "October"], "number", "“number”的意思是“数字；号码”。例句：What is your phone number?"),
  matchQ(
    [["often", "经常"], ["oh", "哦"], ["OK", "好的；行"], ["old", "老的；旧的"]],
    ["经常", "哦", "好的；行", "老的；旧的"],
    "often = 经常 · oh = 哦 · OK = 好的；行 · old = 老的；旧的",
  ),
  chQ("“nose”是什么意思？", ["没有什么", "笔记；便条", "不（用于否定）", "鼻子"], "鼻子", "“nose”的意思是“鼻子”。例句：She has a small nose."),
  tfQ("“north”的意思是“北方”，对还是错？", "对", "“north”的意思是“北方”。"),
  chQ("选一个意思是“十一月”的单词完成句子：My birthday is in _____.", ["number", "November", "nurse", "now"], "November", "“November”的意思是“十一月”。例句：My birthday is in November."),
  chQ("“oh”是什么意思？", ["老的；旧的", "哦", "在……上面；在（某天）", "好的；行"], "哦", "“oh”的意思是“哦”。例句：Oh, I forgot my keys."),
  fillQ(
    "The teacher asked which month precedes November, and we answered ___.",
    "The teacher asked which month precedes November, and we answered October.",
    "October",
    "“October” = 十月。The teacher asked which month precedes November, and we answered October.",
  ),
  tfQ("“office”的意思是“好的；行”，对还是错？", "错", "“office”的意思是“办公室”。“好的；行”是“OK”的意思。"),
  chQ("“object”是什么意思？", ["的", "关掉；离开", "物品", "十月"], "物品", "“object”的意思是“物品”。例句：What is this object on the floor?"),
  matchQ(
    [["OK", "好的；行"], ["old", "老的；旧的"], ["on", "在……上面；在（某天）"], ["once", "一次；曾经"]],
    ["一次；曾经", "在……上面；在（某天）", "好的；行", "老的；旧的"],
    "OK = 好的；行 · old = 老的；旧的 · on = 在……上面；在（某天） · once = 一次；曾经",
  ),
  chQ("选一个意思是“老的；旧的”的单词完成句子：My grandfather is very _____.", ["once", "one", "old", "on"], "old", "“old”的意思是“老的；旧的”。例句：My grandfather is very old."),
  tfQ("“on”的意思是“没有（放在名词前面）”，对还是错？", "错", "“on”的意思是“在……上面；在（某天）”。“没有（放在名词前面）”是“no”的意思。"),
  chQ("哪个单词的意思是“没有什么”？", ["now", "November", "nothing", "number"], "nothing", "“nothing”的意思是“没有什么”。例句：There is nothing in the box."),
  chQ("选一个意思是“的”的单词完成句子：This is a photo _____ my family.", ["often", "of", "off", "office"], "of", "“of”的意思是“的”。例句：This is a photo of my family."),
  fillQ(
    "There were 4 biscuits and 3 were eaten, leaving ___ biscuit.",
    "There were 4 biscuits and 3 were eaten, leaving one biscuit.",
    "one",
    "“one” = 一。There were 4 biscuits and 3 were eaten, leaving one biscuit.",
  ),
];

const CEFR_A1_L32_WORDS: EW[] = [
  ["other", "/ˈʌðə/", "形容词", "其他的；剩下的", "形容词或代词；the other = 剩下的那个", "Do you have any other colours?", "The other students are outside."],
  ["over", "/ˈəʊvə/", "介词", "在……上面；越过", "表示在上方或越过的介词", "There is a lamp over the table.", "The plane flew over the city."],
  ["paint", "/peɪnt/", "动词", "油漆；画画", "动词；paint a wall = 刷墙，paint a picture = 画画", "They want to paint the wall blue.", "She likes to paint pictures of flowers."],
  ["opposite", "/ˈɒpəzɪt/", "形容词", "对面的；相反的", "形容词或介词，表示位置相对或意思相反", "The bank is opposite the school.", "Hot is the opposite of cold."],
  ["orange", "/ˈɒrɪndʒ/", "名词", "橙子；橙色", "表示水果或颜色的名词；也可用作形容词", "I eat an orange every morning.", "Her bag is orange."],
  ["outside", "/ˌaʊtˈsaɪd/", "副词", "在外面", "副词或介词，表示在外面", "The children are playing outside.", "It is cold outside today."],
  ["order", "/ˈɔːdə/", "名词", "点菜；顺序", "名词或动词；take an order = 点菜", "Can I take your order?", "Please put the books in order."],
  ["pair", "/peə/", "名词", "一双；一对", "名词；a pair of = 一双、一对", "I need a new pair of shoes.", "She bought a pair of gloves."],
  ["painting", "/ˈpeɪntɪŋ/", "名词", "画", "表示画作的名词", "There is a beautiful painting on the wall.", "He bought an old painting."],
  ["onion", "/ˈʌnjən/", "名词", "洋葱", "表示蔬菜的名词", "She cut the onion for the soup.", "I do not like raw onion."],
  ["our", "/ˈaʊə/", "限定词", "我们的（放在名词前面）", "所有格形容词，放在名词前面", "This is our new house.", "We love our teacher."],
  ["out", "/aʊt/", "副词", "出去；外面", "表示向外的副词；go out = 出去", "She went out ten minutes ago.", "Please take the dog out."],
  ["paragraph", "/ˈpærəɡrɑːf/", "名词", "段落", "表示文章中一段的名词", "Read the first paragraph aloud.", "Write a short paragraph about your family."],
  ["page", "/peɪdʒ/", "名词", "页", "表示书或本子页数的名词", "Open your book to page ten.", "This page is empty."],
  ["only", "/ˈəʊnli/", "副词", "只；唯一", "表示限定的副词，放在它修饰的词前面", "I have only one dollar.", "She is the only girl in the class."],
  ["opinion", "/əˈpɪnjən/", "名词", "意见；看法", "名词；in my opinion = 在我看来", "In my opinion, this film is boring.", "What is your opinion about the plan?"],
  ["own", "/əʊn/", "形容词", "自己的", "强调所属的形容词，放在所有格后面", "I have my own room.", "She makes her own clothes."],
  ["paper", "/ˈpeɪpə/", "名词", "纸；报纸", "指纸时不可数；指报纸时可数", "I need a piece of paper.", "He reads the paper every morning."],
  ["park", "/pɑːk/", "名词", "公园", "有树木的公共场所，供散步、游玩", "We walked in the park on Sunday.", "There is a big park near my house."],
  ["open", "/ˈəʊpən/", "形容词", "开着的", "形容词；与 closed 反义", "The window is open.", "The shop is open until nine."],
  ["parent", "/ˈpeərənt/", "名词", "父母；家长", "名词；复数 parents = 爸爸妈妈", "My parents live in a small town.", "Each parent received a letter."],
  ["online", "/ˌɒnˈlaɪn/", "形容词", "在线的", "形容词或副词，指使用互联网", "I buy clothes online.", "We had an online class today."],
  ["or", "/ɔː/", "连词", "或者", "连接选择的连词", "Do you want tea or coffee?", "We can go by bus or by train."],
];

const CEFR_A1_L32_PRACTICE: QuizQuestion[] = [
  tfQ("“own”的意思是“画”，对还是错？", "错", "“own”的意思是“自己的”。“画”是“painting”的意思。"),
  chQ("哪个单词的意思是“对面的；相反的”？", ["or", "order", "opposite", "orange"], "opposite", "“opposite”的意思是“对面的；相反的”。例句：The bank is opposite the school."),
  matchQ(
    [["paint", "油漆；画画"], ["painting", "画"], ["pair", "一双；一对"], ["paper", "纸；报纸"]],
    ["油漆；画画", "纸；报纸", "一双；一对", "画"],
    "paint = 油漆；画画 · painting = 画 · pair = 一双；一对 · paper = 纸；报纸",
  ),
  chQ("“other”是什么意思？", ["其他的；剩下的", "出去；外面", "我们的（放在名词前面）", "在……上面；越过"], "其他的；剩下的", "“other”的意思是“其他的；剩下的”。例句：Do you have any other colours?"),
  tfQ("“paragraph”的意思是“洋葱”，对还是错？", "错", "“paragraph”的意思是“段落”。“洋葱”是“onion”的意思。"),
  chQ("选一个意思是“页”的单词完成句子：Open your book to _____ ten.", ["painting", "page", "paint", "pair"], "page", "“page”的意思是“页”。例句：Open your book to page ten."),
  chQ("“pair”是什么意思？", ["纸；报纸", "父母", "一双；一对", "段落"], "一双；一对", "“pair”的意思是“一双；一对”。例句：I need a new pair of shoes."),
  fillQ(
    "Would you like tea ___ coffee for your afternoon drink?",
    "Would you like tea or coffee for your afternoon drink?",
    "or",
    "“or” = 或者。Would you like tea or coffee for your afternoon drink?",
  ),
  tfQ("“online”的意思是“意见；看法”，对还是错？", "错", "“online”的意思是“在线的”。“意见；看法”是“opinion”的意思。"),
  chQ("“over”是什么意思？", ["自己的", "油漆；画画", "在……上面；越过", "页"], "在……上面；越过", "“over”的意思是“在……上面；越过”。例句：There is a lamp over the table."),
  matchQ(
    [["open", "开着的"], ["opinion", "意见；看法"], ["opposite", "对面的；相反的"], ["or", "或者"]],
    ["意见；看法", "对面的；相反的", "或者", "开着的"],
    "open = 开着的 · opinion = 意见；看法 · opposite = 对面的；相反的 · or = 或者",
  ),
  chQ("选一个意思是“出去；外面”的单词完成句子：She went _____ ten minutes ago.", ["page", "own", "out", "over"], "out", "“out”的意思是“出去；外面”。例句：She went out ten minutes ago."),
  tfQ("“paper”的意思是“纸；报纸”，对还是错？", "对", "“paper”的意思是“纸；报纸”。"),
  chQ("哪个单词的意思是“我们的（放在名词前面）”？", ["our", "own", "out", "over"], "our", "“our”的意思是“我们的（放在名词前面）”。例句：This is our new house."),
  chQ("选一个意思是“画”的单词完成句子：There is a beautiful _____ on the wall.", ["paper", "paragraph", "painting", "pair"], "painting", "“painting”的意思是“画”。例句：There is a beautiful painting on the wall."),
  fillQ(
    "I have ___ one pound, so I cannot buy a ticket that costs five pounds.",
    "I have only one pound, so I cannot buy a ticket that costs five pounds.",
    "only",
    "“only” = 只；唯一。I have only one pound, so I cannot buy a ticket that costs five pounds.",
  ),
];

const CEFR_A1_L33_WORDS: EW[] = [
  ["piano", "/piˈænəʊ/", "名词", "钢琴", "play the piano：弹钢琴", "She plays the piano very well.", "There is a piano in the music room."],
  ["pen", "/pen/", "名词", "钢笔；圆珠笔", "用墨水书写的工具", "Can I use your pen?", "She writes with a blue pen."],
  ["people", "/ˈpiːpl/", "名词", "人们", "person 的复数", "Many people like music.", "There are ten people in the room."],
  ["photograph", "/ˈfəʊtəɡrɑːf/", "名词", "照片", "比 photo 更正式", "There is an old photograph on the wall.", "He took a photograph of the city."],
  ["phone", "/fəʊn/", "名词", "电话", "用来打电话和发短信的机器", "My phone is on the table.", "Can I use your phone?"],
  ["picture", "/ˈpɪktʃə/", "名词", "图画；照片", "画或照片", "He drew a picture of his family.", "There are many pictures in this book."],
  ["pig", "/pɪɡ/", "名词", "猪", "农场饲养的动物", "The farmer has three pigs.", "A pig is a pink animal."],
  ["personal", "/ˈpɜːsənl/", "形容词", "个人的；私人的", "属于某一个人", "This is my personal opinion.", "Please do not read my personal letters."],
  ["party", "/ˈpɑːti/", "名词", "聚会", "一起玩乐、吃饭的聚会", "We are having a party on Saturday.", "There were many people at the party."],
  ["piece", "/piːs/", "名词", "一块；一片", "a piece of：某物的一块、一片", "Can I have a piece of cake?", "She gave me a piece of paper."],
  ["person", "/ˈpɜːsn/", "名词", "人", "单独的一个人", "She is a kind person.", "Only one person can win."],
  ["passport", "/ˈpɑːspɔːt/", "名词", "护照", "出国用的证件", "Show me your passport, please.", "I lost my passport at the airport."],
  ["perfect", "/ˈpɜːfɪkt/", "形容词", "完美的", "好到没有缺点", "The weather is perfect today.", "She speaks perfect English."],
  ["phrase", "/freɪz/", "名词", "短语", "几个词组成的一组", "Thank you very much is a common phrase.", "I learned a new phrase in English today."],
  ["past", "/pɑːst/", "名词", "过去", "已经过去的时间；也是介词，意思是经过", "We should learn from the past.", "In the past, people wrote many letters."],
  ["partner", "/ˈpɑːtnə/", "名词", "伴侣；搭档", "一起工作的人，或恋人、配偶", "She dances with her partner.", "He is my business partner."],
  ["pencil", "/ˈpensl/", "名词", "铅笔", "用铅芯书写、画画的工具", "The child draws with a pencil.", "I need a pencil to do this test."],
  ["period", "/ˈpɪəriəd/", "名词", "一段时间；时期", "一段确定的时间", "This was a happy period in my life.", "We studied for a long period of time."],
  ["pink", "/pɪŋk/", "形容词", "粉红色的", "介于红色和白色之间的颜色", "She wears a pink dress.", "The flowers in the garden are pink."],
  ["part", "/pɑːt/", "名词", "部分", "整体的一部分", "This is the best part of the film.", "I only read the first part of the book."],
  ["pay", "/peɪ/", "动词", "付钱", "pay for something：为某物付钱", "I will pay for the dinner.", "How much did you pay for the car?"],
  ["photo", "/ˈfəʊtəʊ/", "名词", "照片", "用相机拍的照片", "I took a photo of the mountain.", "She showed me a photo of her dog."],
  ["pepper", "/ˈpepə/", "名词", "胡椒；甜椒", "salt and pepper：盐和胡椒", "Add some salt and pepper to the soup.", "I like red pepper in my salad."],
];

const CEFR_A1_L33_PRACTICE: QuizQuestion[] = [
  tfQ("“people”的意思是“一段时间；时期”，对还是错？", "错", "“people”的意思是“人们”。“一段时间；时期”是“period”的意思。"),
  chQ("哪个单词的意思是“照片”？", ["photograph", "piece", "piano", "phrase"], "photograph", "“photograph”的意思是“照片”。例句：There is an old photograph on the wall."),
  matchQ(
    [["period", "一段时间；时期"], ["person", "人"], ["personal", "个人的；私人的"], ["phone", "电话"]],
    ["电话", "人", "个人的；私人的", "一段时间；时期"],
    "period = 一段时间；时期 · person = 人 · personal = 个人的；私人的 · phone = 电话",
  ),
  chQ("“past”是什么意思？", ["铅笔", "过去", "付钱", "钢笔；圆珠笔"], "过去", "“past”的意思是“过去”。例句：We should learn from the past."),
  tfQ("“pink”的意思是“聚会”，对还是错？", "错", "“pink”的意思是“粉红色的”。“聚会”是“party”的意思。"),
  chQ("选一个意思是“短语”的单词完成句子：Thank you very much is a common _____.", ["phrase", "picture", "piano", "piece"], "phrase", "“phrase”的意思是“短语”。例句：Thank you very much is a common phrase."),
  chQ("“person”是什么意思？", ["个人的；私人的", "照片", "人", "电话"], "人", "“person”的意思是“人”。例句：She is a kind person."),
  fillQ(
    "The _____ captured the moment our team won the championship.",
    "The photo captured the moment our team won the championship.",
    "photo",
    "“photo” = 照片。The photo captured the moment our team won the championship.",
  ),
  tfQ("“pig”的意思是“猪”，对还是错？", "对", "“pig”的意思是“猪”。"),
  chQ("“passport”是什么意思？", ["过去", "钢笔；圆珠笔", "付钱", "护照"], "护照", "“passport”的意思是“护照”。例句：Show me your passport, please."),
  matchQ(
    [["personal", "个人的；私人的"], ["phone", "电话"], ["photo", "照片"], ["phrase", "短语"]],
    ["照片", "电话", "个人的；私人的", "短语"],
    "personal = 个人的；私人的 · phone = 电话 · photo = 照片 · phrase = 短语",
  ),
  chQ("选一个意思是“铅笔”的单词完成句子：The child draws with a _____.", ["perfect", "people", "pencil", "pepper"], "pencil", "“pencil”的意思是“铅笔”。例句：The child draws with a pencil."),
  tfQ("“pepper”的意思是“胡椒；辣椒”，对还是错？", "对", "“pepper”的意思是“胡椒；辣椒”。"),
  chQ("哪个单词的意思是“聚会”？", ["pay", "passport", "past", "party"], "party", "“party”的意思是“聚会”。例句：We are having a party on Saturday."),
  chQ("选一个意思是“钢琴”的单词完成句子：She plays the _____ very well.", ["piece", "picture", "pig", "piano"], "piano", "“piano”的意思是“钢琴”。例句：She plays the piano very well."),
  fillQ(
    "She travelled with her _____, whom she had been dating for several years.",
    "She travelled with her partner, whom she had been dating for several years.",
    "partner",
    "“partner” = 伴侣；搭档。She travelled with her partner, whom she had been dating for several years.",
  ),
];

const CEFR_A1_L34_WORDS: EW[] = [
  ["plane", "/pleɪn/", "名词", "飞机", "by plane：乘飞机", "The plane leaves at six o'clock.", "We went to Japan by plane."],
  ["pool", "/puːl/", "名词", "游泳池", "swimming pool：游泳池", "The children swim in the pool.", "Our hotel has a big swimming pool."],
  ["poor", "/pɔː/", "形容词", "穷的", "钱少、生活困难", "The family was very poor.", "Many poor people live in that city."],
  ["police", "/pəˈliːs/", "名词", "警察", "总与复数动词连用", "Call the police now.", "The police are looking for the thief."],
  ["practice", "/ˈpræktɪs/", "名词", "练习", "美式英语里 practice 名词动词都用这个拼法", "Football practice is on Monday.", "Practice makes perfect."],
  ["player", "/ˈpleɪə/", "名词", "玩家；球员", "参加游戏或运动的人", "He is a good football player.", "Each player gets five cards."],
  ["plant", "/plɑːnt/", "名词", "植物；种植", "名词：植物；动词：种植", "She has many plants in her house.", "We plant trees every spring."],
  ["pound", "/paʊnd/", "名词", "英镑；磅", "货币符号是 £；也是重量单位 (lb)", "This book costs ten pounds.", "I bought a pound of apples."],
  ["possible", "/ˈpɒsəbl/", "形容词", "可能的", "as soon as possible：尽快", "Is it possible to finish today?", "Please come as soon as possible."],
  ["play", "/pleɪ/", "动词", "玩；扮演", "玩（游戏、运动）；也可以是演角色", "The children play in the garden.", "She plays a queen in the show."],
  ["prefer", "/prɪˈfɜː/", "动词", "更喜欢", "prefer A to B：比起 B 更喜欢 A", "I prefer tea to coffee.", "Do you prefer summer or winter?"],
  ["plan", "/plæn/", "名词", "计划", "事先定好的事", "What is your plan for the weekend?", "We made a plan for the trip."],
  ["positive", "/ˈpɒzətɪv/", "形容词", "积极的", "往好的、开心的方向", "Try to stay positive.", "She has a positive attitude to life."],
  ["practise", "/ˈpræktɪs/", "动词", "练习（动词，英式）", "practise 是动词，practice 是名词（英式）", "I practise English every day.", "She practises the piano after school."],
  ["popular", "/ˈpɒpjələ/", "形容词", "受欢迎的", "被很多人喜欢", "This song is very popular.", "She is popular at school."],
  ["pretty", "/ˈprɪti/", "形容词", "漂亮的", "也是副词，意思是相当：pretty good（相当好）", "She has a pretty dress.", "The small garden is very pretty."],
  ["prepare", "/prɪˈpeə/", "动词", "准备", "prepare for something：为某事做准备", "I prepare dinner for my family.", "We prepare for the test together."],
  ["pizza", "/ˈpiːtsə/", "名词", "比萨", "意大利的扁面包，上面有奶酪", "We ate pizza for dinner.", "I would like a large pizza, please."],
  ["point", "/pɔɪnt/", "名词", "分数；要点；指向", "分数或意思；动词 point at：指着", "Our team scored ten points.", "That is a good point."],
  ["potato", "/pəˈteɪtəʊ/", "名词", "土豆", "可数名词；复数不规则，是 potatoes", "I eat potatoes every day.", "He bought five potatoes."],
  ["place", "/pleɪs/", "名词", "地方", "住、去或做事的地方", "This is a nice place to eat.", "I know a good place for coffee."],
  ["post", "/pəʊst/", "名词", "邮件；帖子", "通过邮局寄的信件；也是网上的帖子", "I sent the letter by post.", "She wrote a new post on her blog."],
  ["please", "/pliːz/", "感叹词", "请", "礼貌请求时用", "Please close the window.", "Pass me the salt, please."],
  ["present", "/ˈpreznt/", "名词", "礼物（日常说法）", "也是形容词（在场的）和动词（展示）", "I got a nice present.", "This is a present for you."],
];

const CEFR_A1_L34_PRACTICE: QuizQuestion[] = [
  tfQ("“pool”的意思是“游泳池”，对还是错？", "对", "“pool”的意思是“游泳池”。"),
  chQ("哪个单词的意思是“穷的”？", ["popular", "possible", "poor", "positive"], "poor", "“poor”的意思是“穷的”。例句：The family was very poor."),
  matchQ(
    [["play", "玩；扮演"], ["player", "玩家；球员"], ["please", "请"], ["point", "分数；要点；指向"]],
    ["玩；扮演", "选手", "分数；要点", "请"],
    "play = 玩；扮演 · player = 玩家；球员 · please = 请 · point = 分数；要点；指向",
  ),
  chQ("“please”是什么意思？", ["请", "游泳池", "警察", "分数；要点"], "请", "“please”的意思是“请”。例句：Please close the window."),
  tfQ("“pizza”的意思是“飞机”，对还是错？", "错", "“pizza”的意思是“比萨”。“飞机”是“plane”的意思。"),
  chQ("选一个意思是“邮件；帖子”的单词完成句子：I sent the letter by _____.", ["potato", "practice", "pound", "post"], "post", "“post”的意思是“邮件；帖子”。例句：I sent the letter by post."),
  chQ("“plane”是什么意思？", ["植物", "选手", "玩；扮演", "飞机"], "飞机", "“plane”的意思是“飞机”。例句：The plane leaves at six o'clock."),
  fillQ(
    "The gardener watered each _____ so it would continue to grow.",
    "The gardener watered each plant so it would continue to grow.",
    "plant",
    "“plant” = 植物。The gardener watered each plant so it would continue to grow.",
  ),
  tfQ("“practice”的意思是“练习”，对还是错？", "对", "“practice”的意思是“练习”。"),
  chQ("“plan”是什么意思？", ["飞机", "玩；扮演", "计划", "植物"], "计划", "“plan”的意思是“计划”。例句：What is your plan for the weekend?"),
  matchQ(
    [["possible", "可能的"], ["post", "邮件；帖子"], ["potato", "土豆"], ["pound", "英镑；磅"]],
    ["邮件；帖子", "可能的", "英镑；磅", "土豆"],
    "possible = 可能的 · post = 邮件；帖子 · potato = 土豆 · pound = 英镑；磅",
  ),
  chQ("选一个意思是“警察”的单词完成句子：Call the _____ now.", ["poor", "popular", "pool", "police"], "police", "“police”的意思是“警察”。例句：Call the police now."),
  tfQ("“positive”的意思是“土豆”，对还是错？", "错", "“positive”的意思是“积极的”。“土豆”是“potato”的意思。"),
  chQ("哪个单词的意思是“玩家；球员”？", ["player", "police", "point", "please"], "player", "“player”的意思是“玩家；球员”。例句：He is a good football player."),
  chQ("选一个意思是“礼物（日常说法）”的单词完成句子：I got a nice _____.", ["pizza", "pretty", "present", "place"], "present", "“present”的意思是“礼物（日常说法）”。例句：I got a nice present."),
  fillQ(
    "She wore a _____ summer hat decorated with flowers.",
    "She wore a pretty summer hat decorated with flowers.",
    "pretty",
    "“pretty” = 漂亮的。She wore a pretty summer hat decorated with flowers.",
  ),
];

const CEFR_A1_L35_WORDS: EW[] = [
  ["quick", "/kwɪk/", "形容词", "快的", "quick 是形容词，quickly 是副词", "He is a quick runner.", "Let's have a quick lunch."],
  // price 的两条例句原站揭示视图未读到（只看到遮住的句式），例句栏如实标「待补」，不猜填（第 31 课 old 先例）
  ["price", "/praɪs/", "名词", "价格", "the price of something：某物的价格", "What is the price of this bag?", "The price is too high for me."],
  ["red", "/red/", "形容词", "红色的", "表示颜色；也用作名词", "She has a red car.", "I want the red apple."],
  ["radio", "/ˈreɪdiəʊ/", "名词", "收音机", "listen to the radio；on the radio", "I listen to the radio in the morning.", "Turn on the radio, please."],
  ["real", "/rɪəl/", "形容词", "真实的", "real 是形容词，really 是副词", "Is this a real diamond?", "He is a real friend to me."],
  ["problem", "/ˈprɒbləm/", "名词", "问题；麻烦", "have a problem with something", "I have a problem with my car.", "This is a very big problem."],
  ["read", "/riːd/", "动词", "读", "过去式拼写仍是 read，但读作 /red/", "I read a book every night.", "Can you read this word for me?"],
  ["reading", "/ˈriːdɪŋ/", "名词", "阅读；阅读材料", "动名词；也是英语阅读技能", "Reading is my favourite hobby.", "We have a reading test tomorrow."],
  ["programme", "/ˈprəʊɡræm/", "名词", "节目（英式：电视、活动）", "美式拼写为 program", "I watch this TV programme every week.", "The programme starts at eight o'clock."],
  ["reason", "/ˈriːzn/", "名词", "原因", "the reason for something；the reason why", "Tell me the reason for this.", "There is no reason to cry."],
  ["purple", "/ˈpɜːpl/", "形容词", "紫色的", "表示颜色；也用作名词", "She likes purple flowers.", "My new bag is purple."],
  ["probably", "/ˈprɒbəbli/", "副词", "大概", "常位于主要动词前：she will probably come", "It will probably rain today.", "He is probably at home now."],
  ["ready", "/ˈredi/", "形容词", "准备好的", "be ready for something / ready to do something", "Are you ready to go?", "Dinner is ready now."],
  ["really", "/ˈrɪəli/", "副词", "真的", "强调副词：really good（很好）", "I really like this song.", "Are you really sure?"],
  ["quickly", "/ˈkwɪkli/", "副词", "快速地", "修饰动词的副词：run quickly", "Please come here quickly.", "She finished her work quickly."],
  ["quiet", "/ˈkwaɪət/", "形容词", "安静的", "反义词 noisy；不要与 quite 混淆", "The library is very quiet.", "Please be quiet in class."],
  ["quite", "/kwaɪt/", "副词", "相当", "quite 意思是“相当”；不要与 quiet（安静）混淆", "The film was quite good.", "It is quite cold today."],
  ["product", "/ˈprɒdʌkt/", "名词", "产品", "可数名词；为销售而制造的东西", "This product is very cheap.", "The shop sells many products."],
  ["question", "/ˈkwestʃən/", "名词", "问题", "ask a question：提问题", "Can I ask a question?", "The teacher answered my question."],
  ["put", "/pʊt/", "动词", "放", "put something on/in something；过去式也是 put", "Put the book on the desk.", "I put my keys in my bag."],
  ["project", "/prəˈdʒekt/", "名词", "项目", "work on a project：做一个项目", "We have a school project this month.", "This is a big new project."],
  ["quarter", "/ˈkwɔːtə/", "名词", "四分之一；15 分钟", "报时用 a quarter past/to；也指季度（三个月）", "It is a quarter past six.", "She ate a quarter of the cake."],
  ["reader", "/ˈriːdə/", "名词", "读者；读本", "指读者，或供学员用的阅读读本", "She is a fast reader.", "This reader has ten short stories."],
  ["rain", "/reɪn/", "名词", "雨（名词）", "也作动词：it is raining（正在下雨）", "I don't like the rain.", "There is a lot of rain today."],
];

const CEFR_A1_L35_PRACTICE: QuizQuestion[] = [
  tfQ("“put”的意思是“快的”，对还是错？", "错", "“put”的意思是“放”。“快的”是“quick”的意思。"),
  chQ("哪个单词的意思是“红色的”？", ["problem", "price", "red", "probably"], "red", "“red”的意思是“红色的”。例句：She has a red car."),
  matchQ(
    [["read", "读"], ["reader", "读者；读本"], ["reading", "阅读；阅读材料"], ["ready", "准备好的"]],
    ["读", "读者；读本", "阅读", "准备好的"],
    "read = 读 · reader = 读者；读本 · reading = 阅读；阅读材料 · ready = 准备好的",
  ),
  chQ("“question”是什么意思？", ["问题", "快的", "安静的", "快速地"], "问题", "“question”的意思是“问题”。例句：Can I ask a question?"),
  tfQ("“quarter”的意思是“快速地”，对还是错？", "错", "“quarter”的意思是“四分之一；15 分钟”。“快速地”是“quickly”的意思。"),
  chQ("选一个意思是“阅读”的单词完成句子：_____ is my favourite hobby.", ["ready", "real", "reading", "really"], "reading", "“reading”的意思是“阅读”。例句：Reading is my favourite hobby."),
  chQ("“quiet”是什么意思？", ["收音机", "相当", "安静的", "雨（名词）"], "安静的", "“quiet”的意思是“安静的”。例句：The library is very quiet."),
  fillQ(
    "My favourite radio _____ includes interviews with interesting people.",
    "My favourite radio programme includes interviews with interesting people.",
    "programme",
    "“programme” = 节目（英式：电视、活动）。My favourite radio programme includes interviews with interesting people.",
  ),
  tfQ("“rain”的意思是“阅读”，对还是错？", "错", "“rain”的意思是“雨（名词）”。“阅读”是“reading”的意思。"),
  chQ("“quickly”是什么意思？", ["收音机", "安静的", "相当", "快速地"], "快速地", "“quickly”的意思是“快速地”。例句：Please come here quickly."),
  matchQ(
    [["project", "项目"], ["purple", "紫色的"], ["put", "放"], ["quarter", "四分之一；15 分钟"]],
    ["放", "项目", "四分之一；15 分钟", "紫色的"],
    "project = 项目 · purple = 紫色的 · put = 放 · quarter = 四分之一；15 分钟",
  ),
  chQ("选一个意思是“准备好的”的单词完成句子：Are you _____ to go?", ["real", "really", "reason", "ready"], "ready", "“ready”的意思是“准备好的”。例句：Are you ready to go?"),
  tfQ("“real”的意思是“红色的”，对还是错？", "错", "“real”的意思是“真实的”。“红色的”是“red”的意思。"),
  chQ("哪个单词的意思是“读者；读本”？", ["reader", "real", "reading", "ready"], "reader", "“reader”的意思是“读者；读本”。例句：She is a fast reader."),
  chQ("选一个意思是“真的”的单词完成句子：I _____ like this song.", ["really", "price", "reason", "red"], "really", "“really”的意思是“真的”。例句：I really like this song."),
  fillQ(
    "The car would not start, and the mechanic had to find the _____.",
    "The car would not start, and the mechanic had to find the problem.",
    "problem",
    "“problem” = 问题；麻烦。The car would not start, and the mechanic had to find the problem.",
  ),
];

const CEFR_A1_L36_WORDS: EW[] = [
  ["ride", "/raɪd/", "动词", "骑；乘", "ride a bike/horse；也作名词，意思是“乘车/骑行”", "I ride my bike to school.", "She can ride a horse."],
  ["river", "/ˈrɪvə/", "名词", "河", "river 是河，不同于 sea（海）", "The river is very long.", "We swim in the river."],
  ["run", "/rʌn/", "动词", "跑", "也作名词；go for a run", "I run in the park every morning.", "Can you run fast?"],
  ["rice", "/raɪs/", "名词", "米饭；大米；稻谷", "不可数名词：a bowl of rice", "I eat rice every day.", "She cooked some rice for lunch."],
  ["return", "/rɪˈtɜːn/", "动词", "回来；归还", "return to a place；return something to someone", "I will return home at six.", "Please return the book to the library."],
  ["rule", "/ruːl/", "名词", "规则", "follow the rules；也作动词，意思是“统治”", "Follow the rules of the game.", "It is a school rule."],
  ["salad", "/ˈsæləd/", "名词", "沙拉", "不可数名词；a bowl of salad", "I eat a green salad for lunch.", "She made a fruit salad."],
  ["result", "/rɪˈzʌlt/", "名词", "结果", "the result of something；as a result（结果是）", "I am happy with my test result.", "What was the result of the game?"],
  ["routine", "/ruːˈtiːn/", "名词", "日常习惯", "daily routine；morning routine", "I follow the same routine every day.", "Brushing my teeth is part of my morning routine."],
  ["same", "/seɪm/", "形容词", "相同的", "the same as；不同于 similar（相似、略像）", "We go to the same school.", "My shirt is the same as yours."],
  ["report", "/rɪˈpɔːt/", "名词", "报告", "也作动词：report something（报告某事）", "I wrote a report for school.", "The news report was very long."],
  ["rich", "/rɪtʃ/", "形容词", "富有的", "反义词 poor（穷）", "My uncle is very rich.", "They live in a rich country."],
  ["restaurant", "/ˈrestrɒnt/", "名词", "餐馆", "eat at/in a restaurant", "We had dinner at a restaurant.", "This restaurant is really good."],
  ["repeat", "/rɪˈpiːt/", "动词", "重复", "repeat something：重复某事", "Please repeat the question.", "Can you repeat that word?"],
  ["sad", "/sæd/", "形容词", "难过的", "feel sad；反义词 happy", "She feels sad today.", "It is a sad story."],
  ["say", "/seɪ/", "动词", "说", "say something to someone；过去式是 said", "What did you say?", "Say hello to your mother."],
  ["room", "/ruːm/", "名词", "房间", "living room（客厅），bedroom（卧室）", "My room is small.", "There are five rooms in the house."],
  ["remember", "/rɪˈmembə/", "动词", "记得", "remember to do something：记得做某事", "Remember to call me tonight.", "I remember her name."],
  ["right", "/raɪt/", "形容词", "对的；右边的", "turn right（右转）；反义词 wrong 或 left", "You are right.", "Turn right at the corner."],
  ["relax", "/rɪˈlæks/", "动词", "放松", "不及物动词：relax at home", "I relax at the weekend.", "Sit down and relax."],
  ["salt", "/sɒlt/", "名词", "盐", "不可数名词；salt and pepper", "Please pass the salt.", "Add a little salt to the soup."],
  ["Saturday", "/ˈsætədeɪ/", "名词", "星期六", "首字母永远大写；on Saturday", "We play football on Saturday.", "I don't work on Saturday."],
  ["sandwich", "/ˈsænwɪdʒ/", "名词", "三明治", "a cheese/ham sandwich", "I have a cheese sandwich.", "He made a sandwich for breakfast."],
  ["road", "/rəʊd/", "名词", "路", "cross the road；on the road", "Cross the road carefully.", "This road goes to the city."],
];

const CEFR_A1_L36_PRACTICE: QuizQuestion[] = [
  tfQ("“sandwich”的意思是“三明治”，对还是错？", "对", "“sandwich”的意思是“三明治”。"),
  chQ("哪个单词的意思是“放松”？", ["report", "repeat", "relax", "remember"], "relax", "“relax”的意思是“放松”。例句：I relax at the weekend."),
  matchQ(
    [["room", "房间"], ["routine", "日常习惯"], ["rule", "规则"], ["run", "跑"]],
    ["日常习惯", "规则", "跑", "房间"],
    "room = 房间 · routine = 日常习惯 · rule = 规则 · run = 跑",
  ),
  chQ("“road”是什么意思？", ["路", "房间", "规则", "日常习惯"], "路", "“road”的意思是“路”。例句：Cross the road carefully."),
  tfQ("“same”的意思是“说”，对还是错？", "错", "“same”的意思是“相同的”。“说”是“say”的意思。"),
  chQ("选一个意思是“日常习惯”的单词完成句子：I follow the same _____ every day.", ["run", "routine", "sad", "rule"], "routine", "“routine”的意思是“日常习惯”。例句：I follow the same routine every day."),
  chQ("“return”是什么意思？", ["骑；乘", "米饭；大米；稻谷", "富有的", "回来；归还"], "回来；归还", "“return”的意思是“回来；归还”。例句：I will return home at six."),
  fillQ(
    "The children were asked to _____ the new word aloud three times.",
    "The children were asked to repeat the new word aloud three times.",
    "repeat",
    "“repeat” = 重复。The children were asked to repeat the new word aloud three times.",
  ),
  tfQ("“say”的意思是“重复”，对还是错？", "错", "“say”的意思是“说”。“重复”是“repeat”的意思。"),
  chQ("“salt”是什么意思？", ["星期六", "三明治", "相同的", "盐"], "盐", "“salt”的意思是“盐”。例句：Please pass the salt."),
  matchQ(
    [["restaurant", "餐馆"], ["result", "结果"], ["return", "回来；归还"], ["rice", "米饭；大米；稻谷"]],
    ["米饭；大米", "回来；归还", "结果", "餐馆"],
    "restaurant = 餐馆 · result = 结果 · return = 回来；归还 · rice = 米饭；大米；稻谷",
  ),
  chQ("选一个意思是“结果”的单词完成句子：I am happy with my test _____.", ["rice", "result", "rich", "return"], "result", "“result”的意思是“结果”。例句：I am happy with my test result."),
  tfQ("“rule”的意思是“规则”，对还是错？", "对", "“rule”的意思是“规则”。"),
  chQ("哪个单词的意思是“星期六”？", ["relax", "say", "remember", "Saturday"], "Saturday", "“Saturday”的意思是“星期六”。例句：We play football on Saturday."),
  chQ("选一个意思是“河”的单词完成句子：The _____ is very long.", ["room", "river", "road", "routine"], "river", "“river”的意思是“河”。例句：The river is very long."),
  fillQ(
    "A pupil wrote a _____ about the experiment, including the results.",
    "A pupil wrote a report about the experiment, including the results.",
    "report",
    "“report” = 报告。A pupil wrote a report about the experiment, including the results.",
  ),
];

const CEFR_A1_L37_WORDS: EW[] = [
  ["sick", "/sɪk/", "形容词", "生病的", "be sick = 生病；feel sick = 觉得恶心", "I feel sick today.", "She is sick and stayed home."],
  ["seventy", "/ˈsevnti/", "数词", "七十（70）", "不同于 seventeen（17）；重音在 se", "My grandfather is seventy.", "The box weighs seventy kilos."],
  ["sentence", "/ˈsentəns/", "名词", "句子", "句首大写，句末句号", "Write a short sentence.", "This sentence is easy to read."],
  ["share", "/ʃeə/", "动词", "分享", "share something with someone；也作名词", "Please share your toys with your sister.", "We share a room."],
  ["shop", "/ʃɒp/", "名词", "商店（英式）", "也作动词“去购物”；at the shop", "There is a small shop near my house.", "The shop is closed today."],
  ["show", "/ʃəʊ/", "动词", "给看；指给", "show somebody something；也作名词“演出”", "Please show me your photos.", "Can you show me the way?"],
  ["seven", "/ˈsevn/", "数词", "七（7）", "放在复数名词前", "I have seven books.", "The shop opens at seven."],
  ["science", "/ˈsaɪəns/", "名词", "科学", "不可数名词；science class", "I like my science class.", "Science is a difficult subject."],
  ["shopping", "/ˈʃɒpɪŋ/", "名词", "购物", "go shopping（去购物）；do the shopping", "She goes shopping every weekend.", "I love shopping for new clothes."],
  ["sheep", "/ʃiːp/", "名词", "绵羊", "复数仍是 sheep", "The farmer has ten sheep.", "A sheep is eating grass."],
  ["seventeen", "/ˌsevnˈtiːn/", "数词", "十七（17）", "重音在 teen", "She is seventeen years old.", "There are seventeen students in the class."],
  ["short", "/ʃɔːt/", "形容词", "短的；矮的", "反义词 long（长）或 tall（高）", "My brother is very short.", "We had a short break."],
  ["scientist", "/ˈsaɪəntɪst/", "名词", "科学家", "从事科学的人", "She wants to be a scientist.", "The scientist works in a lab."],
  ["shoe", "/ʃuː/", "名词", "鞋", "a pair of shoes（一双鞋）", "My shoe is dirty.", "These shoes are very comfortable."],
  ["sell", "/sel/", "动词", "卖", "反义词 buy；过去式 sold", "They sell fresh fruit here.", "I want to sell my old car."],
  ["she", "/ʃiː/", "代词", "她", "指女性的代词；宾格是 her", "She is my sister.", "She works in a hospital."],
  ["section", "/ˈsekʃn/", "名词", "部分", "书或建筑中的部分/章节", "Read the first section of the book.", "This section of the shop sells toys."],
  ["see", "/siː/", "动词", "看见；见面", "过去式 saw；see you later", "I can see the mountain.", "See you tomorrow!"],
  ["should", "/ʃʊd/", "情态动词", "应该", "should + 动词原形（省 to）", "You should drink more water.", "We should go home now."],
  ["September", "/sepˈtembə/", "名词", "九月", "永远大写；in September", "School starts in September.", "My birthday is in September."],
  ["sea", "/siː/", "名词", "海", "at the sea；by the sea", "We swim in the sea.", "The sea is blue and calm."],
  ["school", "/skuːl/", "名词", "学校", "go to school；at school", "I go to school at seven.", "Our school is very big."],
  ["shirt", "/ʃɜːt/", "名词", "衬衫", "wear a shirt；有领有扣的衬衫", "He is wearing a white shirt.", "This shirt is too big."],
  ["shower", "/ˈʃaʊə/", "名词", "淋浴喷头；淋浴", "take/have a shower（淋浴）", "I take a shower every morning.", "The shower is not working."],
  ["send", "/send/", "动词", "发送；寄出", "send something to someone；过去式 sent", "Please send me an email.", "She will send a letter to her friend."],
];

const CEFR_A1_L37_PRACTICE: QuizQuestion[] = [
  tfQ("“share”的意思是“衬衫”，对还是错？", "错", "“share”的意思是“分享”。“衬衫”是“shirt”的意思。"),
  chQ("哪个单词的意思是“她”？", ["shoe", "shirt", "she", "sheep"], "she", "“she”的意思是“她”。例句：She is my sister."),
  matchQ(
    [["science", "科学"], ["scientist", "科学家"], ["sea", "海"], ["section", "部分"]],
    ["科学家", "部分", "科学", "海"],
    "science = 科学 · scientist = 科学家 · sea = 海 · section = 部分",
  ),
  chQ("“shirt”是什么意思？", ["鞋", "商店（英式）", "购物", "衬衫"], "衬衫", "“shirt”的意思是“衬衫”。例句：He is wearing a white shirt."),
  tfQ("“shopping”的意思是“给看；指给”，对还是错？", "错", "“shopping”的意思是“购物”。“给看；指给”是“show”的意思。"),
  chQ("选一个意思是“卖”的单词完成句子：They _____ fresh fruit here.", ["September", "sell", "send", "sentence"], "sell", "“sell”的意思是“卖”。例句：They sell fresh fruit here."),
  chQ("“show”是什么意思？", ["学校", "生病的", "淋浴喷头；淋浴", "给看；指给"], "给看；指给", "“show”的意思是“给看；指给”。例句：Please show me your photos."),
  fillQ(
    "The group and I took a _____ break after working for an hour and then continued.",
    "The group and I took a short break after working for an hour and then continued.",
    "short",
    "“short” = 短的；矮的。The group and I took a short break after working for an hour and then continued.",
  ),
  tfQ("“seven”的意思是“分享”，对还是错？", "错", "“seven”的意思是“七（7）”。“分享”是“share”的意思。"),
  chQ("“should”是什么意思？", ["淋浴喷头；淋浴", "生病的", "给看；指给", "应该"], "应该", "“should”的意思是“应该”。例句：You should drink more water."),
  matchQ(
    [["school", "学校"], ["science", "科学"], ["scientist", "科学家"], ["sea", "海"]],
    ["科学", "海", "科学家", "学校"],
    "school = 学校 · science = 科学 · scientist = 科学家 · sea = 海",
  ),
  chQ("选一个意思是“看见；见面”的单词完成句子：I can _____ the mountain.", ["sentence", "sell", "see", "send"], "see", "“see”的意思是“看见；见面”。例句：I can see the mountain."),
  tfQ("“sea”的意思是“卖”，对还是错？", "错", "“sea”的意思是“海”。“卖”是“sell”的意思。"),
  chQ("哪个单词的意思是“部分”？", ["send", "section", "see", "sell"], "section", "“section”的意思是“部分”。例句：Read the first section of the book."),
  chQ("选一个意思是“九月”的单词完成句子：School starts in _____.", ["September", "seven", "seventeen", "seventy"], "September", "“September”的意思是“九月”。例句：School starts in September."),
  fillQ(
    "When 22 tickets were printed and 5 were cancelled, _____ remained valid.",
    "When 22 tickets were printed and 5 were cancelled, seventeen remained valid.",
    "seventeen",
    "“seventeen” = 十七（17）。When 22 tickets were printed and 5 were cancelled, seventeen remained valid.",
  ),
];

const CEFR_A1_L38_WORDS: EW[] = [
  ["sixteen", "/ˌsɪksˈtiːn/", "数词", "十六（16）", "6 加后缀 -teen；重音在末尾 -teen", "She is sixteen years old.", "There are sixteen students."],
  ["sing", "/sɪŋ/", "动词", "唱歌", "相关名词 song（歌）；sing a song", "I like to sing in the car.", "They sing every morning."],
  ["something", "/ˈsʌmθɪŋ/", "代词", "某物", "指物或事，不用于人", "I want something to eat.", "There is something in the box."],
  ["singer", "/ˈsɪŋə/", "名词", "歌手", "专业歌手；动词 sing 的名词形式", "That singer has a beautiful voice.", "My brother wants to be a singer."],
  ["slow", "/sləʊ/", "形容词", "慢的", "反义词 fast；副词是 slowly", "The bus is very slow.", "He is a slow reader."],
  ["some", "/sʌm/", "限定词", "一些", "用于复数名词或不可数名词：some books, some water", "I need some water.", "She bought some apples."],
  ["somebody", "/ˈsʌmbədi/", "代词", "某人（常用于口语）", "与 someone 同义、可互换", "Somebody is knocking at the door.", "Somebody left a bag here."],
  ["six", "/sɪks/", "数词", "六（6）", "基数词；six o'clock = 六点", "I have six books.", "We wake up at six."],
  ["small", "/smɔːl/", "形容词", "小的", "反义词 big；small size = 小号", "I live in a small house.", "This shirt is too small."],
  ["similar", "/ˈsɪmələ/", "形容词", "相似的", "常与 to 连用：similar to something", "Our bags are similar.", "This color is similar to blue."],
  ["so", "/səʊ/", "连词", "所以", "连接表结果的句子；也作副词表强调“很”：so big", "It was raining, so we stayed home.", "I was tired, so I went to bed."],
  ["soon", "/suːn/", "副词", "很快", "see you soon = 很快再见；as soon as = 一……就", "The train will arrive soon.", "I will call you soon."],
  ["sleep", "/sliːp/", "动词", "睡觉", "go to sleep = 去睡觉；也作名词：a good sleep", "I sleep eight hours a night.", "The baby is sleeping now."],
  ["snow", "/snəʊ/", "名词", "雪", "不可数名词；也作动词：it snows", "The snow is white and cold.", "Children play in the snow."],
  ["sixty", "/ˈsɪksti/", "数词", "六十（60）", "后缀 -ty 表十位数；不同于 sixteen", "My grandfather is sixty.", "This box has sixty pens."],
  ["song", "/sɒŋ/", "名词", "歌", "sing 的名词形式；sing a song = 唱一首歌", "They played my favourite song.", "I know all the words of this song."],
  ["situation", "/ˌsɪtʃuˈeɪʃn/", "名词", "情况", "a difficult situation = 困难的情况", "This is a hard situation.", "The situation is getting better."],
  ["skill", "/skɪl/", "名词", "技能", "可数名词；cooking skills = 烹饪技能", "Reading is a useful skill.", "She has good computer skills."],
  ["sometimes", "/ˈsʌmtaɪmz/", "副词", "有时", "频率副词；常置于句首或动词前", "Sometimes I walk to school.", "She sometimes forgets her keys."],
  ["sit", "/sɪt/", "动词", "坐", "sit down = 坐下；反义词 stand", "Please sit here.", "We sit on the floor."],
  ["someone", "/ˈsʌmwʌn/", "代词", "某人（中性，书面语也用）", "与 somebody 同义，两词可互换", "Someone called you this morning.", "I need someone to help me."],
  ["snake", "/sneɪk/", "名词", "蛇", "可数名词；指爬行动物", "The snake is long and green.", "I am afraid of snakes."],
  ["son", "/sʌn/", "名词", "儿子", "父母的儿子；发音同 sun（太阳）但意义不同", "They have one son.", "My son likes football."],
  ["skirt", "/skɜːt/", "名词", "裙子", "wear a skirt = 穿裙子；不同于 dress（连衣裙）", "She wears a red skirt.", "This skirt is too long."],
  ["sister", "/ˈsɪstə/", "名词", "姐姐；妹妹", "不分年龄；加 older/younger 以区分姐姐/妹妹", "I have one sister.", "My sister is ten years old."],
];

const CEFR_A1_L38_PRACTICE: QuizQuestion[] = [
  tfQ("“skill”的意思是“慢的”，对还是错？", "错", "“skill”的意思是“技能”。“慢的”是“slow”的意思。"),
  chQ("哪个单词的意思是“相似的”？", ["sister", "sing", "singer", "similar"], "similar", "“similar”的意思是“相似的”。例句：Our bags are similar."),
  matchQ(
    [["singer", "歌手"], ["sister", "姐姐；妹妹"], ["sit", "坐"], ["situation", "情况"]],
    ["情况", "歌手", "坐", "姐姐；妹妹"],
    "singer = 歌手 · sister = 姐姐；妹妹 · sit = 坐 · situation = 情况",
  ),
  chQ("“song”是什么意思？", ["歌", "唱歌", "很快", "相似的"], "歌", "“song”的意思是“歌”。例句：They played my favourite song."),
  tfQ("“six”的意思是“六（6）”，对还是错？", "对", "“six”的意思是“六（6）”。"),
  chQ("选一个意思是“雪”的单词完成句子：The _____ is white and cold.", ["so", "some", "somebody", "snow"], "snow", "“snow”的意思是“雪”。例句：The snow is white and cold."),
  chQ("“so”是什么意思？", ["一些", "某人（常用于口语）", "所以", "某物"], "所以", "“so”的意思是“所以”。例句：It was raining, so we stayed home."),
  fillQ(
    "As the group discussed what to do, the difficult _____ became worse when the car broke down in the rain.",
    "As the group discussed what to do, the difficult situation became worse when the car broke down in the rain.",
    "situation",
    "“situation” = 情况。As the group discussed what to do, the difficult situation became worse when the car broke down in the rain.",
  ),
  tfQ("“soon”的意思是“歌手”，对还是错？", "错", "“soon”的意思是“很快”。“歌手”是“singer”的意思。"),
  chQ("“something”是什么意思？", ["儿子", "某物", "歌", "有时"], "某物", "“something”的意思是“某物”。例句：I want something to eat."),
  matchQ(
    [["somebody", "某人（常用于口语）"], ["something", "某物"], ["sometimes", "有时"], ["son", "儿子"]],
    ["某人（常用于口语）", "某物", "有时", "儿子"],
    "somebody = 某人（常用于口语） · something = 某物 · sometimes = 有时 · son = 儿子",
  ),
  chQ("选一个意思是“有时”的单词完成句子：_____ I walk to school.", ["son", "sometimes", "song", "soon"], "sometimes", "“sometimes”的意思是“有时”。例句：Sometimes I walk to school."),
  tfQ("“snake”的意思是“蛇”，对还是错？", "对", "“snake”的意思是“蛇”。"),
  chQ("哪个单词的意思是“六十（60）”？", ["skirt", "sixty", "skill", "sleep"], "sixty", "“sixty”的意思是“六十（60）”。例句：My grandfather is sixty."),
  chQ("选一个意思是“儿子”的单词完成句子：They have one _____.", ["soon", "son", "song", "similar"], "son", "“son”的意思是“儿子”。例句：They have one son."),
  fillQ(
    "The internet connection was very _____, so the page took a long time to load.",
    "The internet connection was very slow, so the page took a long time to load.",
    "slow",
    "“slow” = 慢的。The internet connection was very slow, so the page took a long time to load.",
  ),
];

const CEFR_A1_L39_WORDS: EW[] = [
  ["spring", "/sprɪŋ/", "名词", "春天", "一年中的一个季节；spring 也有“弹簧”的意思", "Flowers bloom in spring.", "Spring is my favorite season."],
  ["still", "/stɪl/", "副词", "还", "表示事情没有变化；放在主要动词前面", "She is still at work.", "I still have your book."],
  ["star", "/stɑː/", "名词", "星星", "天上的星星；也可以指名人：a movie star", "I can see many stars tonight.", "The sky is full of stars."],
  ["sport", "/spɔːt/", "名词", "运动", "play a sport；指具体某项运动时可数", "Football is my favorite sport.", "She loves water sports."],
  ["sound", "/saʊnd/", "名词", "声音", "也可以作动词：that sounds good = 听起来不错", "I hear a strange sound.", "Turn down the sound, please."],
  ["south", "/saʊθ/", "名词", "南方", "也可以作形容词和副词；与 north 相反", "The birds fly to the south in winter.", "Their house is in the south of the city."],
  ["student", "/ˈstjuːdnt/", "名词", "学生", "a good student；college student 是大学生", "She is a student at my school.", "The students read their books."],
  ["stand", "/stænd/", "动词", "站", "stand up = 站起来；与 sit 相反", "Please stand up.", "We stand in line for the bus."],
  ["space", "/speɪs/", "名词", "空间；宇宙", "outer space = 宇宙；也可以指空位", "There is no space in my bag.", "Astronauts travel in space."],
  ["start", "/stɑːt/", "动词", "开始", "也可以作名词（开始）；用 start to do 或 start doing", "The movie starts at seven.", "Let's start our lesson now."],
  ["spelling", "/ˈspelɪŋ/", "名词", "拼写", "spell 的名词；spelling mistake = 拼写错误", "Her spelling is very good.", "Check the spelling of this word."],
  ["stop", "/stɒp/", "动词", "停下", "也可以作名词（停靠点）；stop doing something", "The car stops at the red light.", "Please stop talking now."],
  ["strong", "/strɒŋ/", "形容词", "强壮的", "与 weak 相反；a strong man", "My father is very strong.", "She drinks strong coffee."],
  ["statement", "/ˈsteɪtmənt/", "名词", "声明", "常见搭配：make a statement", "He made a short statement.", "Her statement was very clear."],
  ["spell", "/spel/", "动词", "拼写", "How do you spell it? = 你怎么拼这个词？", "Can you spell your name?", "How do you spell this word?"],
  ["spend", "/spend/", "动词", "花（钱）；花（时间）", "spend money on something；spend time doing something", "I spend too much money on clothes.", "We spend the weekend at home."],
  ["stay", "/steɪ/", "动词", "停留；待着", "也可以作名词；stay at home, stay with someone", "Please stay here with me.", "We stay at a hotel in Hanoi."],
  ["story", "/ˈstɔːri/", "名词", "故事", "常见搭配：tell a story, read a story", "My mother tells me a story at night.", "This is a funny story."],
  ["street", "/striːt/", "名词", "街道", "on the street 或 in the street", "There are many cars on the street.", "I live on a quiet street."],
  ["soup", "/suːp/", "名词", "汤", "不可数名词；a bowl of soup = 一碗汤", "The soup is hot.", "I want some chicken soup."],
  ["speak", "/spiːk/", "动词", "说（一种语言）", "speak English = 说英语；speak to someone = 和某人说话", "I speak a little French.", "Can you speak more slowly?"],
  ["study", "/ˈstʌdi/", "动词", "学习；研究", "也可以作名词；study hard, study English", "I study English every day.", "He wants to study at a good university."],
  ["sorry", "/ˈsɒri/", "形容词", "抱歉；遗憾", "I'm sorry = 我很抱歉；sorry for 或 sorry about", "I'm sorry for being late.", "Sorry, I can't come today."],
  ["station", "/ˈsteɪʃn/", "名词", "车站", "train station（火车站），bus station（汽车站）", "I wait for the train at the station.", "The bus station is near my house."],
  ["special", "/ˈspeʃl/", "形容词", "特别的", "a special day = 特别的一天；副词是 specially/especially", "Today is a special day.", "She made a special cake for me."],
];

const CEFR_A1_L39_PRACTICE: QuizQuestion[] = [
  tfQ("“still”的意思是“街道”，对还是错？", "错", "“still”的意思是“还”。“街道”是“street”的意思。"),
  chQ("哪个单词的意思是“声明”？", ["station", "statement", "stay", "still"], "statement", "“statement”的意思是“声明”。例句：He made a short statement."),
  matchQ(
    [["space", "空间；宇宙"], ["speak", "说（一种语言）"], ["special", "特别的"], ["spell", "拼写"]],
    ["拼写", "空间；宇宙", "特别的", "说（一种语言）"],
    "space = 空间；宇宙 · speak = 说（一种语言） · special = 特别的 · spell = 拼写",
  ),
  chQ("“spend”是什么意思？", ["花（钱）；花（时间）", "运动", "站", "春天"], "花（钱）；花（时间）", "“spend”的意思是“花（钱）；花（时间）”。例句：I spend too much money on clothes."),
  tfQ("“station”的意思是“车站”，对还是错？", "对", "“station”的意思是“车站”。例句：I wait for the train at the station."),
  chQ("选一个意思是“汤”的单词完成句子：The _____ is hot.", ["space", "south", "soup", "speak"], "soup", "“soup”的意思是“汤”。The soup is hot."),
  chQ("“story”是什么意思？", ["故事", "学生", "强壮的", "街道"], "故事", "“story”的意思是“故事”。例句：My mother tells me a story at night."),
  fillQ(
    "I wrote 'freind' rather than 'friend', so my _____ was wrong.",
    "I wrote 'freind' rather than 'friend', so my spelling was wrong.",
    "spelling",
    "“spelling” = 拼写。I wrote 'freind' rather than 'friend', so my spelling was wrong.",
  ),
  tfQ("“stay”的意思是“停留；待着”，对还是错？", "对", "“stay”的意思是“停留；待着”。例句：Please stay here with me."),
  chQ("“study”是什么意思？", ["学习；研究", "声音", "汤", "抱歉；遗憾"], "学习；研究", "“study”的意思是“学习；研究”。例句：I study English every day."),
  matchQ(
    [["speak", "说（一种语言）"], ["special", "特别的"], ["spell", "拼写"], ["spelling", "拼写"]],
    ["特别的", "说（一种语言）", "拼写", "拼写"],
    "speak = 说（一种语言） · special = 特别的 · spell = 拼写 · spelling = 拼写",
  ),
  chQ("选一个意思是“南方”的单词完成句子：The birds fly to the _____ in winter.", ["space", "south", "special", "speak"], "south", "“south”的意思是“南方”。The birds fly to the south in winter."),
  tfQ("“special”的意思是“特别的”，对还是错？", "对", "“special”的意思是“特别的”。例句：Today is a special day."),
  chQ("哪个单词的意思是“星星”？", ["statement", "star", "station", "start"], "star", "“star”的意思是“星星”。例句：I can see many stars tonight."),
  chQ("选一个意思是“站”的单词完成句子：Please _____ up.", ["start", "statement", "star", "stand"], "stand", "“stand”的意思是“站”。Please stand up."),
  fillQ(
    "The birds returned to the garden in _____ when the weather grew warmer.",
    "The birds returned to the garden in spring when the weather grew warmer.",
    "spring",
    "“spring” = 春天。The birds returned to the garden in spring when the weather grew warmer.",
  ),
];

const CEFR_A1_L40_WORDS: EW[] = [
  ["taxi", "/ˈtæksi/", "名词", "出租车", "take a taxi；by taxi（乘出租车）", "We take a taxi to the airport.", "A taxi is waiting outside."],
  ["sweater", "/ˈswetə/", "名词", "毛衣", "wear a sweater；天冷时穿", "I wear a warm sweater in winter.", "She has a red sweater."],
  ["supermarket", "/ˈsuːpəmɑːkɪt/", "名词", "超市", "go to the supermarket；at the supermarket", "My mum buys food at the supermarket.", "There is a big supermarket near here."],
  ["take", "/teɪk/", "动词", "拿", "意思很多；take a bus, take a photo", "Please take this bag.", "I take a bus to school."],
  ["television", "/ˈtelɪvɪʒn/", "名词", "电视", "watch television；简称 TV", "We watch television after dinner.", "There is a big television in the room."],
  ["subject", "/ˈsʌbdʒɪkt/", "名词", "科目；主题", "科目意思：my favourite subject；也可以指主题", "Maths is my favourite subject.", "What is the subject of the book?"],
  ["swim", "/swɪm/", "动词", "游泳", "go swimming；过去式是 swam", "He learned to swim last summer.", "They swim in the sea."],
  ["Sunday", "/ˈsʌndeɪ/", "名词", "星期天", "大写；on Sunday（在星期天）", "We visit grandma on Sunday.", "Sunday is my favourite day."],
  ["sunny", "/ˈsʌni/", "形容词", "晴朗的", "说天气；a sunny day", "It is a sunny day today.", "The weather is warm and sunny."],
  ["telephone", "/ˈtelɪfəʊn/", "名词", "电话", "on the telephone；简称 phone", "The telephone is ringing.", "I talk to her on the telephone."],
  ["team", "/tiːm/", "名词", "队伍；团队", "a football team；on a team（在一个队里）", "Our team won the game.", "He plays on a basketball team."],
  ["tell", "/tel/", "动词", "告诉；讲述", "tell someone something；过去式是 told", "Please tell me your name.", "She tells her children a story."],
  ["success", "/səkˈses/", "名词", "成功（名词）", "a big success；形容词是 successful", "The show was a great success.", "I wish you success."],
  ["tea", "/tiː/", "名词", "茶", "a cup of tea；不可数名词", "I drink a cup of tea in the morning.", "She likes green tea."],
  ["sun", "/sʌn/", "名词", "太阳", "总和 the 连用：the sun", "The sun is very bright today.", "The sun goes down in the evening."],
  ["sure", "/ʃʊə/", "形容词", "确定的", "be sure about 或 of something", "I am sure he will come.", "Are you sure about the answer?"],
  ["swimming", "/ˈswɪmɪŋ/", "名词", "游泳", "动名词；go swimming（去游泳）", "Swimming is good for your health.", "My hobby is swimming."],
  ["teacher", "/ˈtiːtʃə/", "名词", "老师", "教书的人；a teacher of English", "My teacher is very kind.", "He wants to be a teacher."],
  ["teach", "/tiːtʃ/", "动词", "教", "teach someone something；过去式是 taught", "She teaches English at my school.", "My father teaches me to swim."],
  ["style", "/staɪl/", "名词", "风格", "常见搭配：a new style, in style", "I like her style of dress.", "This is a modern style."],
  ["summer", "/ˈsʌmə/", "名词", "夏天", "in summer；summer holiday（暑假）", "We go to the beach in summer.", "Summer is very hot here."],
  ["talk", "/tɔːk/", "动词", "谈话", "也可以作名词；talk to someone, talk about something", "I talk to my friend every day.", "They talk about their new school."],
  ["tall", "/tɔːl/", "形容词", "高的（人、树）", "说人或物；a tall man, a tall tree", "He is a very tall boy.", "The tree is tall."],
  ["sugar", "/ˈʃʊɡə/", "名词", "糖", "不可数名词；a spoon of sugar", "I put sugar in my tea.", "Do you want sugar in your coffee?"],
  ["table", "/ˈteɪbl/", "名词", "桌子", "on the table, at the table（坐在桌边）", "Put the plates on the table.", "We eat dinner at the table."],
  ["teenager", "/ˈtiːneɪdʒə/", "名词", "青少年", "13 到 19 岁的人", "My brother is a teenager.", "Teenagers like music and games."],
];

const CEFR_A1_L40_PRACTICE: QuizQuestion[] = [
  tfQ("“tall”的意思是“教”，对还是错？", "错", "“tall”的意思是“高的（人、树）”。“教”是“teach”的意思。"),
  chQ("哪个单词的意思是“毛衣”？", ["swimming", "swim", "table", "sweater"], "sweater", "“sweater”的意思是“毛衣”。例句：I wear a warm sweater in winter."),
  matchQ(
    [["team", "队伍；团队"], ["teenager", "青少年"], ["telephone", "电话"], ["television", "电视"]],
    ["电视", "青少年", "电话", "队"],
    "team = 队伍；团队 · teenager = 青少年 · telephone = 电话 · television = 电视",
  ),
  chQ("“sun”是什么意思？", ["太阳", "超市", "星期天", "晴朗的"], "太阳", "“sun”的意思是“太阳”。例句：The sun is very bright today."),
  tfQ("“supermarket”的意思是“游泳”，对还是错？", "错", "“supermarket”的意思是“超市”。“游泳”是“swim”的意思。"),
  chQ("选一个意思是“桌子”的单词完成句子：Put the plates on the _____.", ["table", "talk", "take", "tall"], "table", "“table”的意思是“桌子”。Put the plates on the table."),
  chQ("“sunny”是什么意思？", ["超市", "晴朗的", "确定的", "毛衣"], "晴朗的", "“sunny”的意思是“晴朗的”。例句：It is a sunny day today."),
  fillQ(
    "She likes a hot cup of _____ with milk in the afternoon.",
    "She likes a hot cup of tea with milk in the afternoon.",
    "tea",
    "“tea” = 茶。She likes a hot cup of tea with milk in the afternoon.",
  ),
  tfQ("“style”的意思是“糖”，对还是错？", "错", "“style”的意思是“风格”。“糖”是“sugar”的意思。"),
  chQ("“sugar”是什么意思？", ["夏天", "太阳", "星期天", "糖"], "糖", "“sugar”的意思是“糖”。例句：I put sugar in my tea."),
  matchQ(
    [["take", "拿"], ["talk", "谈话"], ["tall", "高的（人、树）"], ["taxi", "出租车"]],
    ["谈话", "高的（人、树）", "拿", "出租车"],
    "take = 拿 · talk = 谈话 · tall = 高的（人、树） · taxi = 出租车",
  ),
  chQ("选一个意思是“教”的单词完成句子：She _____ English at my school.", ["teach", "teacher", "teenager", "team"], "teach", "“teach”的意思是“教”。例句：She teaches English at my school."),
  tfQ("“sure”的意思是“确定的”，对还是错？", "对", "“sure”的意思是“确定的”。例句：I am sure he will come."),
  chQ("哪个单词的意思是“老师”？", ["teacher", "telephone", "team", "teenager"], "teacher", "“teacher”的意思是“老师”。例句：My teacher is very kind."),
  chQ("选一个意思是“夏天”的单词完成句子：We go to the beach in _____.", ["sunny", "sun", "Sunday", "summer"], "summer", "“summer”的意思是“夏天”。We go to the beach in summer."),
  fillQ(
    "He picked up the _____ when it rang and spoke to his grandmother.",
    "He picked up the telephone when it rang and spoke to his grandmother.",
    "telephone",
    "“telephone” = 电话。He picked up the telephone when it rang and spoke to his grandmother.",
  ),
];

const CEFR_A1_L41_WORDS: EW[] = [
  ["terrible", "/ˈterəbl/", "形容词", "糟糕的", "与 wonderful 相反；a terrible day", "The weather is terrible today.", "I had a terrible dream."],
  ["the", "/ðə/", "冠词", "定冠词（指已确定的人或物）", "说具体、已知的人或物时用", "The sun is very hot.", "Close the door, please."],
  ["this", "/ðɪs/", "限定词", "这个（指近处的东西）", "this/that：近/远；复数是 these", "This is my new phone.", "I like this song."],
  ["tennis", "/ˈtenɪs/", "名词", "网球", "play tennis；是一种运动", "I play tennis on Saturday.", "Tennis is a popular sport."],
  ["third", "/θɜːd/", "数词", "第三（序数词）", "three 的序数词；缩写 3rd", "This is my third cup of coffee.", "He finished in third place."],
  ["then", "/ðen/", "副词", "然后", "表示时间顺序：first..., then...", "We ate dinner, then watched TV.", "I woke up and then made coffee."],
  ["thousand", "/ˈθaʊznd/", "数词", "一千", "a thousand, two thousand；前面有数字时不加 s", "A thousand people came to the show.", "This car costs five thousand dollars."],
  ["that", "/ðæt/", "限定词", "那个（指远处的东西）", "this/that：近/远；也可以作代词和关系代词", "That house is very big.", "Who is that woman?"],
  ["thing", "/θɪŋ/", "名词", "东西；事情", "something = 某物；many things = 很多东西", "What is this thing?", "I have many things to do."],
  ["thirteen", "/ˌθɜːˈtiːn/", "数词", "十三（13）", "数字 13；不要和 thirty（30）弄混", "She is thirteen years old.", "There are thirteen boys in the class."],
  ["thirsty", "/ˈθɜːsti/", "形容词", "口渴的", "be thirsty；和 hungry（饿）区分开", "I am very thirsty.", "The dog looks thirsty."],
  ["thanks", "/θæŋks/", "感叹词", "谢谢", "比 thank you 更亲切；thanks a lot = 非常感谢", "Thanks for the gift!", "Thanks, that is very kind."],
  ["three", "/θriː/", "数词", "三（3）", "数字 3", "I have three brothers.", "Give me three apples, please."],
  ["them", "/ðəm/", "代词", "他们／她们／它们（宾格）", "they 是主格，them 是宾格", "I can see them.", "Please give the books to them."],
  ["theatre", "/ˈθɪətə/", "名词", "剧院", "英式写法；美式写作 theater", "We went to the theatre last night.", "The theatre is near my school."],
  ["there", "/ðeə/", "副词", "在那里；有（there is/are）", "there is/there are = 有；区分 their 和 they're", "Your bag is over there.", "There is a cat in the garden."],
  ["test", "/test/", "名词", "考试", "做题：take a test；通过/没通过：pass/fail a test", "I have a test tomorrow.", "She passed the English test."],
  ["text", "/tekst/", "名词", "短信；文本", "发短信：send a text；也可以指一段文字", "I got a text from my mom.", "Please read the text on page five."],
  ["thank", "/θæŋk/", "动词", "感谢（动词，需要宾语）", "结构：thank someone for something", "I want to thank you.", "They thanked the teacher for her help."],
  ["think", "/θɪŋk/", "动词", "想", "think about something；I think that... = 我认为……", "I think you are right.", "Let me think about it."],
  ["than", "/ðæn/", "连词", "比（用于比较）", "用在比较级形容词后：taller than, bigger than", "He is taller than me.", "Today is colder than yesterday."],
  ["through", "/θruː/", "介词", "穿过", "go/walk through；发音 /θruː/", "The train goes through a tunnel.", "We walked through the park."],
  ["they", "/ðeɪ/", "代词", "他们／她们／它们（主格）", "they 是复数主格，和 are/were 连用", "They are my friends.", "They live in a small town."],
  ["their", "/ðeə/", "限定词", "他们／她们／它们的", "所有格形容词，放在名词前面；区分 there 和 they're", "Their car is red.", "The children love their teacher."],
  ["thirty", "/ˈθɜːti/", "数词", "三十（30）", "数字 30；重音和 thirteen 不同", "My father is thirty years old.", "The bus comes at seven thirty."],
  ["ten", "/ten/", "数词", "十", "数字；ten years old（十岁）", "I have ten books.", "The short film lasts ten minutes."],
];

const CEFR_A1_L41_PRACTICE: QuizQuestion[] = [
  tfQ("“theatre”的意思是“然后”，对还是错？", "错", "“theatre”的意思是“剧院”。“然后”是“then”的意思。"),
  chQ("哪个单词的意思是“十”？", ["ten", "test", "tennis", "terrible"], "ten", "“ten”的意思是“十”。例句：I have ten books."),
  matchQ(
    [["thousand", "一千"], ["three", "三（3）"], ["through", "穿过"], ["ten", "十"]],
    ["三（3）", "一千", "十", "穿过"],
    "thousand = 一千 · three = 三（3） · through = 穿过 · ten = 十",
  ),
  chQ("“three”是什么意思？", ["十", "网球", "穿过", "三（3）"], "三（3）", "“three”的意思是“三（3）”。例句：I have three brothers."),
  tfQ("“thirteen”的意思是“十三（13）”，对还是错？", "对", "“thirteen”的意思是“十三（13）”。"),
  chQ("选一个意思是“想”完成句子：I _____ you are right.", ["think", "third", "thirteen", "thirsty"], "think", "“think”的意思是“想”。例句：I think you are right."),
  chQ("“third”是什么意思？", ["第三（序数词）", "口渴的", "三十（30）", "十三（13）"], "第三（序数词）", "“third”的意思是“第三（序数词）”。例句：This is my third cup of coffee."),
  fillQ(
    "She sent me a short ____ on my phone asking when I would arrive.",
    "She sent me a short text on my phone asking when I would arrive.",
    "text",
    "“text” = 短信；文本。She sent me a short text on my phone asking when I would arrive.",
  ),
  tfQ("“that”的意思是“他们／她们／它们的”，对还是错？", "错", "“that”的意思是“那个（指远处的东西）”。“他们／她们／它们的”是“their”的意思。"),
  chQ("“them”是什么意思？", ["东西", "他们／她们／它们（宾格）", "在那里", "然后"], "他们／她们／它们（宾格）", "“them”是 they 的宾格，可以指人或事物。例句：I can see them."),
  matchQ(
    [["through", "穿过"], ["ten", "十"], ["tennis", "网球"], ["terrible", "糟糕的"]],
    ["十", "穿过", "糟糕的", "网球"],
    "through = 穿过 · ten = 十 · tennis = 网球 · terrible = 糟糕的",
  ),
  chQ("选一个意思是“这个（指近处的东西）”完成句子：_____ is my new phone.", ["three", "through", "thousand", "this"], "this", "“this”的意思是“这个（指近处的东西）”。例句：This is my new phone."),
  tfQ("“thirsty”的意思是“口渴的”，对还是错？", "对", "“thirsty”的意思是“口渴的”。"),
  chQ("哪个单词的意思是“感谢（动词，需要宾语）”？", ["the", "theatre", "that", "thank"], "thank", "“thank”的意思是“感谢（动词，需要宾语）”。例句：I want to thank you."),
  chQ("选出定冠词完成句子：_____ sun is very hot.", ["them", "theatre", "their", "the"], "the", "the 是定冠词，用于特指；太阳独一无二，前面用 the。例句：The sun is very hot."),
  fillQ(
    "The teacher gave us a short maths ____ with twenty questions.",
    "The teacher gave us a short maths test with twenty questions.",
    "test",
    "“test” = 考试。The teacher gave us a short maths test with twenty questions.",
  ),
];

const CEFR_A1_L42_WORDS: EW[] = [
  ["Thursday", "/ˈθɜːzdeɪ/", "名词", "星期四", "星期几永远大写；缩写 Thu", "I have a meeting on Thursday.", "See you next Thursday."],
  ["try", "/traɪ/", "动词", "试；努力", "try to do something = 努力做某事", "I want to try this cake.", "Please try to be quiet."],
  ["toilet", "/ˈtɔɪlət/", "名词", "厕所", "go to the toilet；美式常用 bathroom/restroom", "Where is the toilet?", "The toilet is down the hall."],
  ["too", "/tuː/", "副词", "也；太", "句末 = 也；too + 形容词 = 太……", "I am happy, and she is happy too.", "This coffee is too hot."],
  ["trousers", "/ˈtraʊzəz/", "名词", "裤子", "永远复数（英式）；美式是 pants；a pair of trousers", "These trousers are too long.", "He bought a pair of trousers."],
  ["tree", "/triː/", "名词", "树", "climb a tree = 爬树", "A bird is in the tree.", "We planted a tree in the garden."],
  ["title", "/ˈtaɪtl/", "名词", "标题", "书、电影或歌的名字", "What is the title of this book?", "The movie has a funny title."],
  ["tourist", "/ˈtʊərɪst/", "名词", "游客", "a tourist visits places；tourist attraction = 旅游景点", "Many tourists visit this city.", "The tourist took a lot of photos."],
  ["together", "/təˈɡeðə/", "副词", "一起", "do something together；get together = 聚会", "We study together every evening.", "They sang a song together."],
  ["to", "/tuː/", "介词", "到（介词）", "表示方向/目的地：go to school；也可以放在动词原形前面", "I gave the keys to my brother.", "She walks to the shop."],
  ["tooth", "/tuːθ/", "名词", "牙", "复数不规则：teeth", "My tooth hurts.", "The baby has one small tooth."],
  ["town", "/taʊn/", "名词", "镇", "比城市（city）小；in town = 在镇上", "My town has only one school.", "We drove to the next town."],
  ["tonight", "/təˈnaɪt/", "副词", "今晚", "指今天晚上", "Let's watch a film tonight.", "I will stay home tonight."],
  ["tomato", "/təˈmɑːtəʊ/", "名词", "西红柿", "复数是 tomatoes（加 -es）", "I like tomato in my salad.", "She bought some tomatoes at the market."],
  ["Tuesday", "/ˈtjuːzdeɪ/", "名词", "星期二", "大写；on Tuesday = 在星期二", "We have English on Tuesday.", "See you next Tuesday."],
  ["ticket", "/ˈtɪkɪt/", "名词", "票", "a bus ticket；buy a ticket = 买票", "I need a ticket for the bus.", "She bought two movie tickets."],
  ["travel", "/ˈtrævl/", "动词", "旅行", "也可以用作名词（旅行）；travel by plane/train", "I love to travel in summer.", "They travel around the world."],
  ["tired", "/ˈtaɪəd/", "形容词", "累的", "be tired；tired of something = 厌倦某事", "I am tired after work.", "The children are tired and sleepy."],
  ["traffic", "/ˈtræfɪk/", "名词", "交通", "heavy traffic = 车多；traffic jam = 堵车", "There is a lot of traffic today.", "We were late because of the traffic."],
  ["trip", "/trɪp/", "名词", "旅行", "go on a trip = 去旅行", "We went on a trip to the beach.", "Have a nice trip!"],
  ["today", "/təˈdeɪ/", "副词", "今天", "表示现在的时间副词", "We are going to the beach today.", "It is very cold today."],
  ["tomorrow", "/təˈmɒrəʊ/", "副词", "明天", "表示将来的时间副词；see you tomorrow = 明天见", "I will call you tomorrow.", "We have a trip tomorrow."],
  ["topic", "/ˈtɒpɪk/", "名词", "主题", "the topic of the lesson；talk about a topic", "Our topic today is food.", "That is an interesting topic."],
  ["time", "/taɪm/", "名词", "时间", "What time is it? = 几点了；on time = 准时", "What time is it now?", "We don't have much time."],
  ["true", "/truː/", "形容词", "真的；正确的", "come true = 实现；与 false 相反", "Is this story true?", "Her dream came true."],
  ["train", "/treɪn/", "名词", "火车", "主要意思是名词火车；也可以作动词练习、训练", "I go to work by train.", "The train arrives at nine."],
];

const CEFR_A1_L42_PRACTICE: QuizQuestion[] = [
  tfQ("“try”的意思是“票”，对还是错？", "错", "“try”的意思是“试；努力”。“票”是“ticket”的意思。"),
  chQ("哪个单词的意思是“交通”？", ["travel", "traffic", "tree", "train"], "traffic", "“traffic”的意思是“交通”。例句：There is a lot of traffic today."),
  matchQ(
    [["trip", "旅行"], ["trousers", "裤子"], ["true", "真的；正确的"], ["try", "试；努力"]],
    ["试；努力", "真的", "裤子", "旅行"],
    "trip = 旅行 · trousers = 裤子 · true = 真的；正确的 · try = 试；努力",
  ),
  chQ("“town”是什么意思？", ["旅行", "交通", "火车", "镇"], "镇", "“town”的意思是“镇”。例句：My town has only one school."),
  tfQ("“tonight”的意思是“今晚”，对还是错？", "对", "“tonight”的意思是“今晚”。"),
  chQ("选一个意思是“票”的单词完成句子：I need a _____ for the bus.", ["tired", "title", "time", "ticket"], "ticket", "“ticket”的意思是“票”。例句：I need a ticket for the bus."),
  chQ("“today”是什么意思？", ["西红柿", "厕所", "一起", "今天"], "今天", "“today”的意思是“今天”。例句：We are going to the beach today."),
  fillQ(
    "The group and I travelled by _____ along the railway from London to Manchester.",
    "The group and I travelled by train along the railway from London to Manchester.",
    "train",
    "“train” = 火车。The group and I travelled by train along the railway from London to Manchester.",
  ),
  tfQ("“tomato”的意思是“西红柿”，对还是错？", "对", "“tomato”的意思是“西红柿”。"),
  chQ("“Thursday”是什么意思？", ["时间", "星期四", "票", "累的"], "星期四", "“Thursday”的意思是“星期四”。例句：I have a meeting on Thursday."),
  matchQ(
    [["tooth", "牙"], ["topic", "主题"], ["tourist", "游客"], ["town", "镇"]],
    ["游客", "牙", "主题", "镇"],
    "tooth = 牙 · topic = 主题 · tourist = 游客 · town = 镇",
  ),
  chQ("选一个意思是“到（介词）”的单词完成句子：I gave the keys _____ my brother.", ["together", "toilet", "today", "to"], "to", "“to”的意思是“到（介词）”。例句：I gave the keys to my brother."),
  tfQ("“tired”的意思是“今天”，对还是错？", "错", "“tired”的意思是“累的”。“今天”是“today”的意思。"),
  chQ("哪个单词的意思是“游客”？", ["traffic", "train", "town", "tourist"], "tourist", "“tourist”的意思是“游客”。例句：Many tourists visit this city."),
  chQ("选一个意思是“旅行”的单词完成句子：I love to _____ in summer.", ["trip", "tree", "travel", "trousers"], "travel", "“travel”的意思是“旅行”。例句：I love to travel in summer."),
  fillQ(
    "We worked _____ on the project and helped each other finish it.",
    "We worked together on the project and helped each other finish it.",
    "together",
    "“together” = 一起。We worked together on the project and helped each other finish it.",
  ),
];

function applyExtractedCefrA1() {
  const l1 = CEFR_LESSONS.find((s) => s.id === "c-a1-1");
  if (l1) {
    l1.words = CEFR_A1_L1_WORDS.map(ewToWord);
    l1.blurb = "CEFR A1 第 1 课（原站内容）：12 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l1.extracted = {
      practiceEasy: CEFR_A1_L1_PRACTICE,
      dictationWords: ["a", "above", "an", "across", "actor", "activity", "address", "adult", "about", "action"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l2 = CEFR_LESSONS.find((s) => s.id === "c-a1-2");
  if (l2) {
    l2.words = CEFR_A1_L2_WORDS.map(ewToWord);
    l2.blurb = "CEFR A1 第 2 课（原站内容）：13 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l2.extracted = {
      practiceEasy: CEFR_A1_L2_PRACTICE,
      dictationWords: ["afraid", "afternoon", "airport", "air", "ago", "also", "after", "advice", "age", "agree"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l3 = CEFR_LESSONS.find((s) => s.id === "c-a1-3");
  if (l3) {
    l3.words = CEFR_A1_L3_WORDS.map(ewToWord);
    l3.blurb = "CEFR A1 第 3 课（原站内容）：13 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l3.extracted = {
      practiceEasy: CEFR_A1_L3_PRACTICE,
      dictationWords: ["anyone", "apartment", "amazing", "area", "anything", "animal", "answer", "angry", "any", "and"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l4 = CEFR_LESSONS.find((s) => s.id === "c-a1-4");
  if (l4) {
    l4.words = CEFR_A1_L4_WORDS.map(ewToWord);
    l4.blurb = "CEFR A1 第 4 课（原站内容）：13 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l4.extracted = {
      practiceEasy: CEFR_A1_L4_PRACTICE,
      dictationWords: ["ask", "baby", "art", "arm", "August", "aunt", "at", "article", "away", "arrive"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l5 = CEFR_LESSONS.find((s) => s.id === "c-a1-5");
  if (l5) {
    l5.words = CEFR_A1_L5_WORDS.map(ewToWord);
    l5.blurb = "CEFR A1 第 5 课（原站内容）：14 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l5.extracted = {
      practiceEasy: CEFR_A1_L5_PRACTICE,
      dictationWords: ["be", "banana", "bag", "bad", "bar", "bank", "ball", "bathroom", "bath", "because"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l6 = CEFR_LESSONS.find((s) => s.id === "c-a1-6");
  if (l6) {
    l6.words = CEFR_A1_L6_WORDS.map(ewToWord);
    l6.blurb = "CEFR A1 第 6 课（原站内容）：14 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l6.extracted = {
      practiceEasy: CEFR_A1_L6_PRACTICE,
      dictationWords: ["bicycle", "between", "bedroom", "begin", "behind", "best", "beer", "better", "below", "beginning"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l7 = CEFR_LESSONS.find((s) => s.id === "c-a1-7");
  if (l7) {
    l7.words = CEFR_A1_L7_WORDS.map(ewToWord);
    l7.blurb = "CEFR A1 第 7 课（原站内容）：14 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l7.extracted = {
      practiceEasy: CEFR_A1_L7_PRACTICE,
      dictationWords: ["book", "birthday", "big", "bill", "black", "body", "boat", "blog", "bike", "blonde"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l8 = CEFR_LESSONS.find((s) => s.id === "c-a1-8");
  if (l8) {
    l8.words = CEFR_A1_L8_WORDS.map(ewToWord);
    l8.blurb = "CEFR A1 第 8 课（原站内容）：15 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l8.extracted = {
      practiceEasy: CEFR_A1_L8_PRACTICE,
      dictationWords: ["break", "bring", "box", "both", "building", "breakfast", "bread", "boring", "boy", "brother"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l9 = CEFR_LESSONS.find((s) => s.id === "c-a1-9");
  if (l9) {
    l9.words = CEFR_A1_L9_WORDS.map(ewToWord);
    l9.blurb = "CEFR A1 第 9 课（原站内容）：15 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l9.extracted = {
      practiceEasy: CEFR_A1_L9_PRACTICE,
      dictationWords: ["but", "call", "busy", "cannot", "buy", "butter", "bye", "capital", "business", "cake"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l10 = CEFR_LESSONS.find((s) => s.id === "c-a1-10");
  if (l10) {
    l10.words = CEFR_A1_L10_WORDS.map(ewToWord);
    l10.blurb = "CEFR A1 第 10 课（原站内容）：15 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l10.extracted = {
      practiceEasy: CEFR_A1_L10_PRACTICE,
      dictationWords: ["chart", "chair", "carry", "check", "cent", "change", "car", "cheap", "card", "career"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l11 = CEFR_LESSONS.find((s) => s.id === "c-a1-11");
  if (l11) {
    l11.words = CEFR_A1_L11_WORDS.map(ewToWord);
    l11.blurb = "CEFR A1 第 11 课（原站内容）：16 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l11.extracted = {
      practiceEasy: CEFR_A1_L11_PRACTICE,
      dictationWords: ["coat", "club", "chicken", "city", "choose", "cinema", "clean", "clock", "coffee", "climb"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l12 = CEFR_LESSONS.find((s) => s.id === "c-a1-12");
  if (l12) {
    l12.words = CEFR_A1_L12_WORDS.map(ewToWord);
    l12.blurb = "CEFR A1 第 12 课（原站内容）：16 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l12.extracted = {
      practiceEasy: CEFR_A1_L12_PRACTICE,
      dictationWords: ["cold", "conversation", "cool", "colour", "college", "cost", "cooking", "common", "complete", "computer"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l13 = CEFR_LESSONS.find((s) => s.id === "c-a1-13");
  if (l13) {
    l13.words = CEFR_A1_L13_WORDS.map(ewToWord);
    l13.blurb = "CEFR A1 第 13 课（原站内容）：16 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l13.extracted = {
      practiceEasy: CEFR_A1_L13_PRACTICE,
      dictationWords: ["course", "cow", "dangerous", "country", "create", "culture", "dad", "could", "cup", "cream"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l14 = CEFR_LESSONS.find((s) => s.id === "c-a1-14");
  if (l14) {
    l14.words = CEFR_A1_L14_WORDS.map(ewToWord);
    l14.blurb = "CEFR A1 第 14 课（原站内容）：17 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l14.extracted = {
      practiceEasy: CEFR_A1_L14_PRACTICE,
      dictationWords: ["delicious", "daughter", "dear", "dark", "date", "describe", "die", "detail", "dialogue", "description"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l15 = CEFR_LESSONS.find((s) => s.id === "c-a1-15");
  if (l15) {
    l15.words = CEFR_A1_L15_WORDS.map(ewToWord);
    l15.blurb = "CEFR A1 第 15 课（原站内容）：17 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l15.extracted = {
      practiceEasy: CEFR_A1_L15_PRACTICE,
      dictationWords: ["downstairs", "door", "discuss", "dirty", "draw", "drink", "dollar", "difference", "do", "dinner"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l16 = CEFR_LESSONS.find((s) => s.id === "c-a1-16");
  if (l16) {
    l16.words = CEFR_A1_L16_WORDS.map(ewToWord);
    l16.blurb = "CEFR A1 第 16 课（原站内容）：17 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l16.extracted = {
      practiceEasy: CEFR_A1_L16_PRACTICE,
      dictationWords: ["eight", "easy", "eighteen", "ear", "each", "email", "elephant", "else", "eighty", "drive"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l17 = CEFR_LESSONS.find((s) => s.id === "c-a1-17");
  if (l17) {
    l17.words = CEFR_A1_L17_WORDS.map(ewToWord);
    l17.blurb = "CEFR A1 第 17 课（原站内容）：18 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l17.extracted = {
      practiceEasy: CEFR_A1_L17_PRACTICE,
      dictationWords: ["everything", "everybody", "every", "evening", "end", "excited", "euro", "everyone", "expensive", "exam"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l18 = CEFR_LESSONS.find((s) => s.id === "c-a1-18");
  if (l18) {
    l18.words = CEFR_A1_L18_WORDS.map(ewToWord);
    l18.blurb = "CEFR A1 第 18 课（原站内容）：18 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l18.extracted = {
      practiceEasy: CEFR_A1_L18_PRACTICE,
      dictationWords: ["explain", "eye", "father", "fast", "face", "fantastic", "favourite", "famous", "extra", "false"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l19 = CEFR_LESSONS.find((s) => s.id === "c-a1-19");
  if (l19) {
    l19.words = CEFR_A1_L19_WORDS.map(ewToWord);
    l19.blurb = "CEFR A1 第 19 课（原站内容）：18 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l19.extracted = {
      practiceEasy: CEFR_A1_L19_PRACTICE,
      dictationWords: ["festival", "finish", "find", "fifth", "film", "fine", "flat", "feel", "fifteen", "fifty"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l20 = CEFR_LESSONS.find((s) => s.id === "c-a1-20");
  if (l20) {
    l20.words = CEFR_A1_L20_WORDS.map(ewToWord);
    l20.blurb = "CEFR A1 第 20 课（原站内容）：19 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l20.extracted = {
      practiceEasy: CEFR_A1_L20_PRACTICE,
      dictationWords: ["flight", "flower", "free", "football", "friend", "fourteen", "for", "forty", "foot", "form"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l21 = CEFR_LESSONS.find((s) => s.id === "c-a1-21");
  if (l21) {
    l21.words = CEFR_A1_L21_WORDS.map(ewToWord);
    l21.blurb = "CEFR A1 第 21 课（原站内容）：19 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l21.extracted = {
      practiceEasy: CEFR_A1_L21_PRACTICE,
      dictationWords: ["funny", "girl", "front", "full", "go", "future", "game", "goodbye", "fruit", "garden"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l22 = CEFR_LESSONS.find((s) => s.id === "c-a1-22");
  if (l22) {
    l22.words = CEFR_A1_L22_WORDS.map(ewToWord);
    l22.blurb = "CEFR A1 第 22 课（原站内容）：19 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l22.extracted = {
      practiceEasy: CEFR_A1_L22_PRACTICE,
      dictationWords: ["happy", "hand", "half", "grey", "grandmother", "hate", "have", "gym", "great", "happen"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l23 = CEFR_LESSONS.find((s) => s.id === "c-a1-23");
  if (l23) {
    l23.words = CEFR_A1_L23_WORDS.map(ewToWord);
    l23.blurb = "CEFR A1 第 23 课（原站内容）：20 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l23.extracted = {
      practiceEasy: CEFR_A1_L23_PRACTICE,
      dictationWords: ["high", "hobby", "his", "hi", "head", "hey", "hope", "home", "horse", "hear"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l24 = CEFR_LESSONS.find((s) => s.id === "c-a1-24");
  if (l24) {
    l24.words = CEFR_A1_L24_WORDS.map(ewToWord);
    l24.blurb = "CEFR A1 第 24 课（原站内容）：20 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l24.extracted = {
      practiceEasy: CEFR_A1_L24_PRACTICE,
      dictationWords: ["house", "however", "hospital", "I", "hundred", "hot", "imagine", "improve", "important", "hour"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l25 = CEFR_LESSONS.find((s) => s.id === "c-a1-25");
  if (l25) {
    l25.words = CEFR_A1_L25_WORDS.map(ewToWord);
    l25.blurb = "CEFR A1 第 25 课（原站内容）：20 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l25.extracted = {
      practiceEasy: CEFR_A1_L25_PRACTICE,
      dictationWords: ["jacket", "journey", "June", "job", "internet", "into", "interest", "juice", "interested", "interview"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l26 = CEFR_LESSONS.find((s) => s.id === "c-a1-26");
  if (l26) {
    l26.words = CEFR_A1_L26_WORDS.map(ewToWord);
    l26.blurb = "CEFR A1 第 26 课（原站内容）：21 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l26.extracted = {
      practiceEasy: CEFR_A1_L26_PRACTICE,
      dictationWords: ["later", "leave", "laugh", "know", "letter", "keep", "kitchen", "leg", "learn", "key"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l27 = CEFR_LESSONS.find((s) => s.id === "c-a1-27");
  if (l27) {
    l27.words = CEFR_A1_L27_WORDS.map(ewToWord);
    l27.blurb = "CEFR A1 第 27 课（原站内容）：21 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l27.extracted = {
      practiceEasy: CEFR_A1_L27_PRACTICE,
      dictationWords: ["local", "magazine", "lose", "light", "like", "line", "library", "list", "main", "listen"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l28 = CEFR_LESSONS.find((s) => s.id === "c-a1-28");
  if (l28) {
    l28.words = CEFR_A1_L28_WORDS.map(ewToWord);
    l28.blurb = "CEFR A1 第 28 课（原站内容）：21 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l28.extracted = {
      practiceEasy: CEFR_A1_L28_PRACTICE,
      dictationWords: ["mean", "meal", "many", "market", "maybe", "menu", "map", "match", "metre", "member"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l29 = CEFR_LESSONS.find((s) => s.id === "c-a1-29");
  if (l29) {
    l29.words = CEFR_A1_L29_WORDS.map(ewToWord);
    l29.blurb = "CEFR A1 第 29 课（原站内容）：22 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l29.extracted = {
      practiceEasy: CEFR_A1_L29_PRACTICE,
      dictationWords: ["milk", "movie", "midnight", "moment", "mistake", "mountain", "million", "most", "model", "mile"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l30 = CEFR_LESSONS.find((s) => s.id === "c-a1-30");
  if (l30) {
    l30.words = CEFR_A1_L30_WORDS.map(ewToWord);
    l30.blurb = "CEFR A1 第 30 课（原站内容）：22 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l30.extracted = {
      practiceEasy: CEFR_A1_L30_PRACTICE,
      dictationWords: ["nineteen", "newspaper", "much", "nice", "never", "must", "new", "news", "negative", "neighbour"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l31 = CEFR_LESSONS.find((s) => s.id === "c-a1-31");
  if (l31) {
    l31.words = CEFR_A1_L31_WORDS.map(ewToWord);
    l31.blurb = "CEFR A1 第 31 课（原站内容）：23 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l31.extracted = {
      practiceEasy: CEFR_A1_L31_PRACTICE,
      dictationWords: ["north", "no", "often", "off", "object", "oh", "on", "October", "nose", "OK"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l32 = CEFR_LESSONS.find((s) => s.id === "c-a1-32");
  if (l32) {
    l32.words = CEFR_A1_L32_WORDS.map(ewToWord);
    l32.blurb = "CEFR A1 第 32 课（原站内容）：23 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l32.extracted = {
      practiceEasy: CEFR_A1_L32_PRACTICE,
      dictationWords: ["open", "opinion", "paper", "page", "opposite", "painting", "other", "orange", "outside", "only"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l33 = CEFR_LESSONS.find((s) => s.id === "c-a1-33");
  if (l33) {
    l33.words = CEFR_A1_L33_WORDS.map(ewToWord);
    l33.blurb = "CEFR A1 第 33 课（原站内容）：23 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l33.extracted = {
      practiceEasy: CEFR_A1_L33_PRACTICE,
      dictationWords: ["pig", "pencil", "partner", "people", "phone", "photograph", "photo", "period", "past", "pepper"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l34 = CEFR_LESSONS.find((s) => s.id === "c-a1-34");
  if (l34) {
    l34.words = CEFR_A1_L34_WORDS.map(ewToWord);
    l34.blurb = "CEFR A1 第 34 课（原站内容）：24 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l34.extracted = {
      practiceEasy: CEFR_A1_L34_PRACTICE,
      dictationWords: ["player", "prefer", "place", "practise", "prepare", "practice", "plan", "pretty", "plant", "pizza"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l35 = CEFR_LESSONS.find((s) => s.id === "c-a1-35");
  if (l35) {
    l35.words = CEFR_A1_L35_WORDS.map(ewToWord);
    l35.blurb = "CEFR A1 第 35 课（原站内容）：24 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l35.extracted = {
      practiceEasy: CEFR_A1_L35_PRACTICE,
      dictationWords: ["red", "programme", "really", "put", "quarter", "product", "real", "problem", "quite", "reader"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l36 = CEFR_LESSONS.find((s) => s.id === "c-a1-36");
  if (l36) {
    l36.words = CEFR_A1_L36_WORDS.map(ewToWord);
    l36.blurb = "CEFR A1 第 36 课（原站内容）：24 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l36.extracted = {
      practiceEasy: CEFR_A1_L36_PRACTICE,
      dictationWords: ["sandwich", "rule", "rice", "run", "sad", "Saturday", "salt", "rich", "report", "relax"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l37 = CEFR_LESSONS.find((s) => s.id === "c-a1-37");
  if (l37) {
    l37.words = CEFR_A1_L37_WORDS.map(ewToWord);
    l37.blurb = "CEFR A1 第 37 课（原站内容）：25 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l37.extracted = {
      practiceEasy: CEFR_A1_L37_PRACTICE,
      dictationWords: ["short", "sick", "sell", "shirt", "science", "September", "shoe", "see", "sheep", "she"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l38 = CEFR_LESSONS.find((s) => s.id === "c-a1-38");
  if (l38) {
    l38.words = CEFR_A1_L38_WORDS.map(ewToWord);
    l38.blurb = "CEFR A1 第 38 课（原站内容）：25 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l38.extracted = {
      practiceEasy: CEFR_A1_L38_PRACTICE,
      dictationWords: ["somebody", "skill", "slow", "son", "sixteen", "someone", "song", "sixty", "some", "six"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l39 = CEFR_LESSONS.find((s) => s.id === "c-a1-39");
  if (l39) {
    l39.words = CEFR_A1_L39_WORDS.map(ewToWord);
    l39.blurb = "CEFR A1 第 39 课（原站内容）：25 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l39.extracted = {
      practiceEasy: CEFR_A1_L39_PRACTICE,
      dictationWords: ["stand", "still", "spelling", "special", "study", "statement", "sport", "story", "sorry", "stay"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l40 = CEFR_LESSONS.find((s) => s.id === "c-a1-40");
  if (l40) {
    l40.words = CEFR_A1_L40_WORDS.map(ewToWord);
    l40.blurb = "CEFR A1 第 40 课（原站内容）：26 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l40.extracted = {
      practiceEasy: CEFR_A1_L40_PRACTICE,
      dictationWords: ["table", "take", "television", "swim", "style", "talk", "teacher", "swimming", "supermarket", "sweater"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l41 = CEFR_LESSONS.find((s) => s.id === "c-a1-41");
  if (l41) {
    l41.words = CEFR_A1_L41_WORDS.map(ewToWord);
    l41.blurb = "CEFR A1 第 41 课（原站内容）：26 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l41.extracted = {
      practiceEasy: CEFR_A1_L41_PRACTICE,
      dictationWords: ["third", "thirty", "thirsty", "than", "text", "think", "test", "this", "three", "thing"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  const l42 = CEFR_LESSONS.find((s) => s.id === "c-a1-42");
  if (l42) {
    l42.words = CEFR_A1_L42_WORDS.map(ewToWord);
    l42.blurb = "CEFR A1 第 42 课（原站内容）：26 个词。先学完词卡，再做练习（简单档），做完练习解锁听写；中等、困难档与发音待补。";
    l42.extracted = {
      practiceEasy: CEFR_A1_L42_PRACTICE,
      dictationWords: ["title", "trip", "too", "travel", "topic", "toilet", "try", "together", "train", "trousers"],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
  for (let lesson = 43; lesson <= 45; lesson++) {
    const item = CEFR_LESSONS.find((s) => s.id === `c-a1-${lesson}`);
    const sourceWords = A1_TAIL_LESSONS[lesson - 43];
    if (!item || !sourceWords) continue;
    item.words = sourceWords.map(ewToWord);
    item.blurb = `CEFR A1 第 ${lesson} 课：27 个原站词条。词卡可学，练习、听写和发音题目待补。`;
    item.extracted = {
      practiceEasy: [],
      dictationWords: [],
      cardsXp: 35,
      practiceXp: 50,
      dictationXp: 50,
      totalStars: 10,
    };
  }
}
applyExtractedCefrA1();

for (const [index, sourceWords] of [A2_FIRST_LESSON, A2_SECOND_LESSON, A2_THIRD_LESSON, A2_FOURTH_LESSON, A2_FIFTH_LESSON, A2_SIXTH_LESSON, A2_SEVENTH_LESSON, A2_EIGHTH_LESSON, A2_NINTH_LESSON, A2_TENTH_LESSON, A2_ELEVENTH_LESSON, A2_TWELFTH_LESSON, A2_THIRTEENTH_LESSON, A2_FOURTEENTH_LESSON, A2_FIFTEENTH_LESSON, A2_SIXTEENTH_LESSON, A2_SEVENTEENTH_LESSON, A2_EIGHTEENTH_LESSON, A2_NINETEENTH_LESSON, A2_TWENTIETH_LESSON, A2_TWENTY_FIRST_LESSON, A2_TWENTY_SECOND_LESSON, A2_TWENTY_THIRD_LESSON, A2_TWENTY_FOURTH_LESSON, A2_TWENTY_FIFTH_LESSON, A2_TWENTY_SIXTH_LESSON, A2_TWENTY_SEVENTH_LESSON, A2_TWENTY_EIGHTH_LESSON, A2_TWENTY_NINTH_LESSON, A2_THIRTIETH_LESSON, A2_THIRTY_FIRST_LESSON, A2_THIRTY_SECOND_LESSON, A2_THIRTY_THIRD_LESSON, A2_THIRTY_FOURTH_LESSON, A2_THIRTY_FIFTH_LESSON, A2_THIRTY_SIXTH_LESSON, A2_THIRTY_SEVENTH_LESSON, A2_THIRTY_EIGHTH_LESSON, A2_THIRTY_NINTH_LESSON, A2_FORTIETH_LESSON].entries()) {
  const set = CEFR_LESSONS.find((item) => item.id === `c-a2-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(ewToWord);
  set.blurb = `CEFR A2 第 ${index + 1} 课：${sourceWords.length} 张原站词卡，释义与用法已译成中文。练习、听写和发音题目仍待逐项核对。`;
  set.extracted = {
    practiceEasy: [],
    dictationWords: [],
    cardsXp: 35,
    practiceXp: 50,
    dictationXp: 50,
    totalStars: 10,
  };
}

for (const [index, sourceWords] of [B1_FIRST_LESSON, B1_SECOND_LESSON, B1_THIRD_LESSON, B1_FOURTH_LESSON, B1_FIFTH_LESSON, B1_SIXTH_LESSON, B1_SEVENTH_LESSON, B1_EIGHTH_LESSON, B1_NINTH_LESSON, B1_TENTH_LESSON, B1_ELEVENTH_LESSON, B1_TWELFTH_LESSON, B1_THIRTEENTH_LESSON, B1_FOURTEENTH_LESSON, B1_FIFTEENTH_LESSON, B1_SIXTEENTH_LESSON, B1_SEVENTEENTH_LESSON, B1_EIGHTEENTH_LESSON, B1_NINETEENTH_LESSON, B1_TWENTIETH_LESSON, B1_TWENTY_FIRST_LESSON, B1_TWENTY_SECOND_LESSON, B1_TWENTY_THIRD_LESSON, B1_TWENTY_FOURTH_LESSON, B1_TWENTY_FIFTH_LESSON, B1_TWENTY_SIXTH_LESSON, B1_TWENTY_SEVENTH_LESSON, B1_TWENTY_EIGHTH_LESSON, B1_TWENTY_NINTH_LESSON, B1_THIRTIETH_LESSON, B1_THIRTY_FIRST_LESSON, B1_THIRTY_SECOND_LESSON, B1_THIRTY_THIRD_LESSON, B1_THIRTY_FOURTH_LESSON].entries()) {
  const set = CEFR_LESSONS.find((item) => item.id === `c-b1-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(ewToWord);
  set.blurb = `CEFR B1 第 ${index + 1} 课：${sourceWords.length} 张原站词卡，释义与用法已译成中文。练习、听写和发音题目仍待逐项核对。`;
  set.extracted = {
    practiceEasy: [],
    dictationWords: [],
    cardsXp: 35,
    practiceXp: 50,
    dictationXp: 50,
    totalStars: 10,
  };
}

for (const [index, sourceWords] of [B2_FIRST_LESSON, B2_SECOND_LESSON, B2_THIRD_LESSON, B2_FOURTH_LESSON, B2_FIFTH_LESSON, B2_SIXTH_LESSON, B2_SEVENTH_LESSON, B2_EIGHTH_LESSON, B2_NINTH_LESSON, B2_TENTH_LESSON, B2_ELEVENTH_LESSON, B2_TWELFTH_LESSON, B2_THIRTEENTH_LESSON, B2_FOURTEENTH_LESSON, B2_FIFTEENTH_LESSON, B2_SIXTEENTH_LESSON, B2_SEVENTEENTH_LESSON, B2_EIGHTEENTH_LESSON, B2_NINETEENTH_LESSON, B2_TWENTIETH_LESSON, B2_TWENTY_FIRST_LESSON, B2_TWENTY_SECOND_LESSON, B2_TWENTY_THIRD_LESSON, B2_TWENTY_FOURTH_LESSON, B2_TWENTY_FIFTH_LESSON, B2_TWENTY_SIXTH_LESSON, B2_TWENTY_SEVENTH_LESSON].entries()) {
  const set = CEFR_LESSONS.find((item) => item.id === `c-b2-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(ewToWord);
  set.blurb = `CEFR B2 第 ${index + 1} 课：${sourceWords.length} 张原站词卡，释义与用法已译成中文。练习、听写和发音题目仍待逐项核对。`;
  set.extracted = {
    practiceEasy: [],
    dictationWords: [],
    cardsXp: 35,
    practiceXp: 50,
    dictationXp: 50,
    totalStars: 10,
  };
}

for (const [index, sourceWords] of [C1_FIRST_LESSON, C1_SECOND_LESSON, C1_THIRD_LESSON, C1_FOURTH_LESSON, C1_FIFTH_LESSON, C1_SIXTH_LESSON, C1_SEVENTH_LESSON, C1_EIGHTH_LESSON, C1_NINTH_LESSON, C1_TENTH_LESSON, C1_ELEVENTH_LESSON, C1_TWELFTH_LESSON, C1_THIRTEENTH_LESSON, C1_FOURTEENTH_LESSON, C1_FIFTEENTH_LESSON, C1_SIXTEENTH_LESSON, C1_SEVENTEENTH_LESSON, C1_EIGHTEENTH_LESSON, C1_NINETEENTH_LESSON, C1_TWENTIETH_LESSON, C1_TWENTY_FIRST_LESSON, C1_TWENTY_SECOND_LESSON, C1_TWENTY_THIRD_LESSON, C1_TWENTY_FOURTH_LESSON, C1_TWENTY_FIFTH_LESSON, C1_TWENTY_SIXTH_LESSON, C1_TWENTY_SEVENTH_LESSON, C1_TWENTY_EIGHTH_LESSON, C1_TWENTY_NINTH_LESSON, C1_THIRTIETH_LESSON, C1_THIRTY_FIRST_LESSON, C1_THIRTY_SECOND_LESSON, C1_THIRTY_THIRD_LESSON, C1_THIRTY_FOURTH_LESSON, C1_THIRTY_FIFTH_LESSON, C1_THIRTY_SIXTH_LESSON, C1_THIRTY_SEVENTH_LESSON, C1_THIRTY_EIGHTH_LESSON, C1_THIRTY_NINTH_LESSON, C1_FORTIETH_LESSON, C1_FORTY_FIRST_LESSON, C1_FORTY_SECOND_LESSON, C1_FORTY_THIRD_LESSON, C1_FORTY_FOURTH_LESSON, C1_FORTY_FIFTH_LESSON, C1_FORTY_SIXTH_LESSON, C1_FORTY_SEVENTH_LESSON, C1_FORTY_EIGHTH_LESSON, C1_FORTY_NINTH_LESSON, C1_FIFTIETH_LESSON, C1_FIFTY_FIRST_LESSON, C1_FIFTY_SECOND_LESSON, C1_FIFTY_THIRD_LESSON, C1_FIFTY_FOURTH_LESSON, C1_FIFTY_FIFTH_LESSON, C1_FIFTY_SIXTH_LESSON, C1_FIFTY_SEVENTH_LESSON, C1_FIFTY_EIGHTH_LESSON, C1_FIFTY_NINTH_LESSON, C1_SIXTIETH_LESSON, C1_SIXTY_FIRST_LESSON, C1_SIXTY_SECOND_LESSON, C1_SIXTY_THIRD_LESSON, C1_SIXTY_FOURTH_LESSON, C1_SIXTY_FIFTH_LESSON].entries()) {
  const set = CEFR_LESSONS.find((item) => item.id === `c-c1-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(ewToWord);
  set.blurb = `CEFR C1 第 ${index + 1} 课：${sourceWords.length} 张原站词卡，释义与用法已译成中文。练习、听写和发音题目仍待逐项核对。`;
  set.extracted = {
    practiceEasy: [],
    dictationWords: [],
    cardsXp: 35,
    practiceXp: 50,
    dictationXp: 50,
    totalStars: 10,
  };
}

for (const [index, sourceWords] of [C2_FIRST_LESSON, C2_SECOND_LESSON, C2_THIRD_LESSON, C2_FOURTH_LESSON, C2_FIFTH_LESSON, C2_SIXTH_LESSON, C2_SEVENTH_LESSON, C2_EIGHTH_LESSON, C2_NINTH_LESSON, C2_TENTH_LESSON, C2_ELEVENTH_LESSON, C2_TWELFTH_LESSON, C2_THIRTEENTH_LESSON, C2_FOURTEENTH_LESSON, C2_FIFTEENTH_LESSON, C2_SIXTEENTH_LESSON, C2_SEVENTEENTH_LESSON, C2_EIGHTEENTH_LESSON, C2_NINETEENTH_LESSON, C2_TWENTIETH_LESSON, C2_TWENTY_FIRST_LESSON, C2_TWENTY_SECOND_LESSON, C2_TWENTY_THIRD_LESSON, C2_TWENTY_FOURTH_LESSON, C2_TWENTY_FIFTH_LESSON, C2_TWENTY_SIXTH_LESSON, C2_TWENTY_SEVENTH_LESSON, C2_TWENTY_EIGHTH_LESSON, C2_TWENTY_NINTH_LESSON, C2_THIRTIETH_LESSON, C2_THIRTY_FIRST_LESSON, C2_THIRTY_SECOND_LESSON, C2_THIRTY_THIRD_LESSON, C2_THIRTY_FOURTH_LESSON, C2_THIRTY_FIFTH_LESSON, C2_THIRTY_SIXTH_LESSON].entries()) {
  const set = CEFR_LESSONS.find((item) => item.id === `c-c2-${index + 1}`);
  if (!set) continue;
  set.words = sourceWords.map(ewToWord);
  set.blurb = `CEFR C2 第 ${index + 1} 课：${sourceWords.length} 张原站词卡，释义与用法已译成中文。练习、听写和发音题目仍待逐项核对。`;
  set.extracted = {
    practiceEasy: [],
    dictationWords: [],
    cardsXp: 35,
    practiceXp: 50,
    dictationXp: 50,
    totalStars: 10,
  };
}

export function cefrLessons(level: CefrLevel): VocabSet[] {
  return CEFR_LESSONS.filter((s) => s.level === level);
}

// ---------------- 词汇测验与越级考试 ----------------

function meaningQuestion(wd: Word, pool: Word[], seedKey: string): QuizQuestion {
  const others = seededShuffle(pool.filter((p) => p.word !== wd.word), `${seedKey}-${wd.word}`).slice(0, 3);
  const options = others.map((o) => o.meaning);
  const pos = (wd.word.length + seedKey.length) % 4;
  options.splice(Math.min(pos, options.length), 0, wd.meaning);
  return {
    q: `“${wd.word}” ${wd.phonetic} 的中文意思是？`,
    options,
    answer: options.indexOf(wd.meaning),
    explain: `${wd.word}（${wd.pos}）= ${wd.meaning}。例句：${wd.example}`,
    difficulty: "中等",
  };
}

export function buildVocabPractice(set: VocabSet): QuizQuestion[] {
  const pool = set.words;
  const choice = pool.slice(0, 10).map((wd) => ({ ...meaningQuestion(wd, pool.length >= 4 ? pool : [...pool, ...pool], set.id), difficulty: "简单" as const }));
  const blanks: QuizQuestion[] = [];
  for (const wd of pool) {
    if (blanks.length >= 5) break;
    const b = vocabBlankQuestion(wd, blanks.length < 2 ? "中等" : "困难");
    if (b) blanks.push(b);
  }
  // 填空题穿插进选择题之间，其余顺序不变，听写仍在最后
  const mixed: QuizQuestion[] = [];
  let bi = 0;
  choice.forEach((cq, i) => {
    mixed.push(cq);
    if ((i + 1) % 3 === 0 && bi < blanks.length) mixed.push(blanks[bi++]!);
  });
  while (bi < blanks.length) mixed.push(blanks[bi++]!);
  const dictation: QuizQuestion[] = pool.slice(0, 5).map((wd) => ({
    q: `听发音并看提示，拼写单词（${wd.pos} ${wd.meaning}）`,
    options: [],
    answer: 0,
    answerText: wd.word,
    explain: `${wd.word} ${wd.phonetic} = ${wd.meaning}`,
    difficulty: "中等" as const,
    kind: "dictation" as const,
  }));
  return [...mixed, ...dictation];
}

export function buildTopicPlacement(topicId: string): QuizQuestion[] {
  const pool = topicPool(topicId);
  const picked = seededShuffle(pool, `placement-${topicId}`).slice(0, 30);
  const qs: QuizQuestion[] = picked.map((wd, i) => {
    if (i >= 25) {
      return {
        q: `听发音并看提示，拼写单词（${wd.pos} ${wd.meaning}）`,
        options: [],
        answer: 0,
        answerText: wd.word,
        explain: `${wd.word} ${wd.phonetic} = ${wd.meaning}`,
        difficulty: "中等" as const,
        kind: "dictation" as const,
      };
    }
    if (i >= 20) {
      const b = vocabBlankQuestion(wd, "困难");
      if (b) return b;
    }
    return meaningQuestion(wd, pool, topicId);
  });
  return qs;
}

// ---------------- 汇总 ----------------

export const ALL_VOCAB_LESSONS: VocabSet[] = [...TOPIC_LESSONS, ...CEFR_LESSONS];

export function findVocabLesson(id: string): VocabSet | undefined {
  return ALL_VOCAB_LESSONS.find((s) => s.id === id) ?? BASE_TOPICS.find((s) => s.id === id) ?? BASE_CEFR.find((s) => s.id === id);
}

export function countUniqueWords(): number {
  const seen = new Set<string>();
  for (const s of ALL_VOCAB_LESSONS) for (const wd of s.words) seen.add(wd.word.toLowerCase());
  return seen.size;
}

export const TOTAL_WORDS_UNIQUE = countUniqueWords();
export const DAILY_GOAL_XP = 20;
export const WEEKLY_GOAL_XP = 50;
// 原站提取课的 XP 高于普通词汇课（词卡 35 + 练习 50 + 听写 50 = 135），差额计入总 XP
export const TOTAL_XP_FULL =
  GRAMMAR_101.length * GRAMMAR_XP +
  ALL_VOCAB_LESSONS.length * VOCAB_XP +
  ALL_VOCAB_LESSONS.reduce(
    (n, s) => n + (s.extracted ? s.extracted.cardsXp + s.extracted.practiceXp + s.extracted.dictationXp - VOCAB_XP : 0),
    0,
  );
