const fs = require('fs');
const unit = require('../reference/forumflash-a2-original.json').units[12];
const prompts = [
  '选出与 good news 搭配正确的短语。','选出与 expensive cars 搭配正确的短语。','选出只表示强调、不说明结果的句子。',
  '选择正确的句子。','选择正确的句子。','选出符合中文意思的英语句子。','选出符合中文意思的英语句子。',
  '选出符合中文意思的英语句子。','选出符合中文意思的英语句子。','选出符合中文意思的英语句子。',
  '选出符合中文意思的英语句子。','选择正确的句子。','选择填入空格的词。','选择填入空格的词。',
  '选择正确的句子。','选择正确的句子。','选择填入空格的词。','选择填入空格的词。',
  '选择填入空格的词。','选择填入空格的词。',
];
const explanations = [
  'news 是不可数名词，such good news 不加冠词。',
  'cars 是复数名词，such 后直接接 expensive cars，不加冠词。',
  'kind 单独作形容词，用 so kind；单纯强调时不必接 that 从句。',
  'tired 后面没有名词，用 so tired；that 从句说明结果。',
  'an interesting book 是单数可数名词短语，用 such an；that 从句说明读了两遍这一结果。',
  'news 不可数，such good news 不加 a 或 an。',
  'a cold night 是单数可数名词短语，用 such，并保留冠词 a。',
  'cold 单独作形容词，前面用 so；that 从句说明待在室内的结果。',
  'quietly 是副词，前面用 so；that 从句说明无人听见的结果。',
  'many 后面虽然有名词 people，数量结构仍用 so many。',
  'so kind 强调形容词 kind，不需要接结果从句。',
  'a cold night 是名词短语，前面用 such，不用 so。',
  '空格后是 a cold night，属于名词短语，应填 such。',
  'quietly 是副词，so quietly that 表示“如此轻声，以至于……”。',
  'a long journey 是名词短语，用 such a；tired 单独作形容词，用 so。',
  'much traffic 表示数量，搭配 so much；traffic 不可数，动词用 was。',
  'a lovely day 是单数可数名词短语，前面用 such。',
  'sleepy 是形容词，so sleepy that 连接程度和早睡这一结果。',
  'funny 是形容词，so funny that 说明有趣到再次观看的程度。',
  'friendly neighbours 是复数名词短语，用 such 且不加冠词。',
];
const questions = unit.levels.easy.map((id, i) => {
  const source = unit.pool[id];
  const q = { q: prompts[i], options: source.options, answer: source.options.indexOf(source.answer), explain: explanations[i], difficulty: '简单', keepChoice: true };
  if (source.sentence) q.q = source.sentence;
  return q;
});
if (questions.length !== 20 || questions.some(q => q.answer < 0)) throw new Error('题库数量或答案异常');
fs.writeFileSync('client/src/data/currentSiteA2SoSuchEasy.ts', `import type { QuizQuestion } from "./content";\n\n// 原站 A2 第 13 课简单档 20 题；英文选项、答案和顺序保留。\nexport const A2_SO_SUCH_EASY: QuizQuestion[] = ${JSON.stringify(questions, null, 2)};\n`);
