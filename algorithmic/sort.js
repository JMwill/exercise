// Helper
function swap(nums, i, j) {
  const tmp = nums[i];
  nums[i] = nums[j];
  nums[j] = tmp;
}

function genRandomNums(min, max, num = 0) {
  const range = max - min;
  const nums = [];
  for (let i = 0; i < num; i++) {
    const n = Math.floor(Math.random() * range) + min;
    nums.push(n);
  }
  return nums;
}

// Bubble Sort
function BubbleSort(nums) {
  const len = nums.length;
  let i, j, noswap = true;
  for (i = 0; i < len; i++) {
    for (j = i+1; j < len; j++) {
      if (nums[i] < nums[j]) {
        swap(nums, i, j);
        noswap = false;
      }
    }
    if (noswap) break;
    noswap = true;
  }
  return nums;
}

// Insert Sort
function InsertSort(nums) {
  const len = nums.length;
  let i, j, mi;
  for (i = 0; i < len; i++) {
    mi = i;
    for (j = i+1; j < len; j++) {
      if (nums[mi] < nums[j]) { mi = j; }
    }
    swap(nums, i, mi);
  }
  return nums;
}

const root = {
  _id: 1,
  children: [{
    _id: 2,
    children: [],
  }, {
    _id: 3,
    children: [],
  }, {
    _id: 4,
    children: [{
      _id: 5,
      children: [{
        _id: 6,
        children: []
      }, {
        _id: 7,
        children: [{
          _id: 8,
          children: [],
        }, {
          _id: 9,
          children: [],
        }]
      }, {
        _id: 10,
        children: []
      }]
    }]
  }]
};

function isObj(obj) {
  return Object.toString(obj) === '[Object object]';
}

function searchPath(root, id) {
  const stack = [];
  const node = searchNode(root, id, stack);

  const path = stack.join('-');
  const children = node.children;

  console.log(`path: ${path}`);
  console.log(`children: ${children.map(i => i._id)}`);
}

function searchNode(root, id, stack) {
  if (root._id === id) return root;
  else stack.push(root._id);

  let result = null;
  for (let i = 0; i < root.children.length; i++) {
    result = searchNode(root.children[i], id, stack);
    if (result) return result;
  }
  stack.pop();
}