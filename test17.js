let arr = [
  {
    id: '1',
  },
  {
    id: '1-1',
    parent: '1',
  },
  {
    id: '1-2',
    parent: '1',
  },
  {
    id: '1-3',
    parent: '1',
  },
  {
    id: '2',
  },
  {
    id: '2-1',
    parent: '2',
  },
  {
    id: '2-2',
    parent: '2',
  },
  {
    id: '2-3',
    parent: '2',
  },
  {
    id: '2-3-1',
    parent: '2-3',
  },
];
[{id: 1, children: [{id: 1-1, parent: 1}]}]


function newTree(arr) {
  let map = {}
  for(let i = 0;i<arr.length;i++){
    arr[i].children = []
    map[arr[i].id] = arr[i]
  }
  let root = []
  for(let i = arr.length-1;i>=0;i--){
    if(!arr[i].parent) {
      root.push(arr[i])
      continue
    }
    let parent = map[arr[i].parent]
    parent.children.push(arr[i])
  }
  return root
}
console.log(JSON.stringify(newTree(arr)) ); 