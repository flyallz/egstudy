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
vm.runInContext(fs.readFileSync('app.js', 'utf8'), context);
assert.match(getNode('#app').innerHTML, /按阶段学习/);
context.location.hash = '#/roadmap';
vm.runInContext('view()', context);
assert.match(getNode('#app').innerHTML, /语法 A1/);
vm.runInContext('openLesson(0)', context);
assert.match(getNode('#modal-root').innerHTML, /简单 · 20 题/);
vm.runInContext('startQuiz(); view(); checkAnswer(true)', context);
assert.match(getNode('#app').innerHTML, /正确答案/);
context.location.hash = '#/history';
vm.runInContext('view()', context);
assert.match(getNode('#app').innerHTML, /练习历史/);
console.log('smoke checks passed');

