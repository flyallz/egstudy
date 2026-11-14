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
assert.equal(vm.runInContext('topicVocabulary.length', context), 25);
assert.equal(vm.runInContext('topicVocabulary.every(x=>x.length===10)', context), true);
assert.equal(vm.runInContext('curriculum.every(l=>l.focus&&l.formula&&l.explanation&&l.examples.length&&l.mistake.length===3&&l.questions.every(q=>q[1].includes(q[2])))', context), true);
vm.runInContext('state.lesson=1; state.quiz={index:0,selected:null,feedback:null,difficulty:"easy",remaining:30,answers:[],id:"grammar:1"}; quizPage()', context);
assert.match(getNode('#app').innerHTML, /Please listen to/);
context.location.hash = '#/history';
vm.runInContext('view()', context);
assert.match(getNode('#app').innerHTML, /练习历史/);
console.log('smoke checks passed');

