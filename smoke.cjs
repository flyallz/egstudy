const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const nodes = new Map();
const getNode = key => {
  if (!nodes.has(key)) nodes.set(key, {innerHTML: '', textContent: '', value: '', disabled: false});
  return nodes.get(key);
};
const storage = new Map();
const context = vm.createContext({
  document: {querySelector: getNode, querySelectorAll: () => []},
  localStorage: {getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value)},
  location: {hash: '#/'},
  window: {addEventListener: () => {}},
  setInterval: () => 1,
  clearInterval: () => {},
  alert: () => {},
  Date,
  URL,
  Blob
});
vm.runInContext(fs.readFileSync('curriculum.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('vocabulary.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('materials.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('app.js', 'utf8'), context);
assert.match(getNode('#app').innerHTML, /按阶段学习/);
context.location.hash = '#/roadmap';
vm.runInContext('view()', context);
assert.match(getNode('#app').innerHTML, /语法 A1/);
vm.runInContext('openLesson(0)', context);
assert.match(getNode('#modal-root').innerHTML, /简单 · 20 题/);
vm.runInContext('startQuiz(); view(); checkAnswer(true)', context);
assert.match(getNode('#app').innerHTML, /正确答案/);
vm.runInContext('state.lesson=1; theory()', context);
assert.match(getNode('#app').innerHTML, /宾格代词/);
assert.doesNotMatch(getNode('#app').innerHTML, /主语 \+ am \/ is \/ are/);
assert.equal(vm.runInContext('curriculum.length', context), 19);
assert.equal(vm.runInContext('curriculum[0].questions.length', context), 20);
assert.equal(vm.runInContext('curriculum[1].questions.length', context), 20);
assert.equal(vm.runInContext('curriculum[2].questions.length', context), 20);
assert.equal(vm.runInContext('learningMaterials.length', context), 6);
assert.equal(vm.runInContext('topicVocabulary.length', context), 25);
assert.equal(vm.runInContext('topicVocabulary.every(x=>x.length===10)', context), true);
assert.equal(vm.runInContext('curriculum.every(l=>l.focus&&l.formula&&l.explanation&&l.examples.length&&l.mistake.length===3&&l.questions.every(q=>q[1].includes(q[2])))', context), true);
vm.runInContext('state.lesson=1; state.quiz={index:0,selected:null,feedback:null,difficulty:"easy",remaining:30,answers:[],id:"grammar:1"}; quizPage()', context);
assert.match(getNode('#app').innerHTML, /Please listen to/);
vm.runInContext('state.quiz.total=quizTotal(); quizPage()', context);
assert.match(getNode('#app').innerHTML, /第 1\/20 题/);
vm.runInContext('state.lesson=3; state.quiz=null; startQuiz(); quizPage()', context);
assert.match(getNode('#app').innerHTML, /第 1\/4 题/);
context.location.hash = '#/materials';
vm.runInContext('view(); materialDetail(0)', context);
assert.match(getNode('#app').innerHTML, /自己试一试/);
vm.runInContext('state.track="topic";state.level=0;state.lesson=0;state.cardIndex=0;advanceCard(false)', context);
assert.equal(vm.runInContext('data.decks[0].cards.length', context), 1);
vm.runInContext('for(let i=1;i<10;i++)advanceCard(true)', context);
assert.equal(vm.runInContext('data.vocabProgress[lessonId()].cards', context), true);
assert.equal(vm.runInContext('Boolean(data.completed[lessonId()])', context), false);
vm.runInContext('startVocabExercise("practice");for(let i=0;i<10;i++){checkVocabAnswer(0);nextVocabQuestion()}', context);
assert.equal(vm.runInContext('data.completed[lessonId()].score', context), 100);
assert.equal(vm.runInContext('data.attempts[0].total', context), 10);
context.location.hash = '#/history';
vm.runInContext('view()', context);
assert.match(getNode('#app').innerHTML, /练习历史/);
console.log('smoke checks passed');

