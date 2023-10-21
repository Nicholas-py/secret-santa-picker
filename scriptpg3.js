var blockednames
var names

function pg3load() {
  var template = document.getElementById('template');
  var boxholder = document.getElementById('boxholder');
  
  blockednames = JSON.parse(localStorage.getItem('bigarray'));
  names = JSON.parse(localStorage.getItem('names'));
  selections = makeselections();

  for (let i=0; i<names.length; i++) {
    let clone = template.cloneNode(true);
    clone.children[0].innerHTML = names[i]
    clone.children[5].innerHTML = selections[i]
    clone.style.display = 'block'
    boxholder.appendChild(clone)
    
  }
}

function randint(a,b) {
  var randseed = Math.random();
  randseed *= b-a;
  randseed = Math.floor(randseed);
  return randseed + a;
}

function listfullydefined(list) {
  var b = true;
  for (let i=0; i<list.length; i++) {
    if (typeof list[i] == 'undefined') {
      b = false;
    }
  }
  return b;
}


function randomelement(list) {
  var randindex = randint(0,list.length);
  return list[randindex];
}

function copy(list) {
  return JSON.parse(JSON.stringify(list));
}

function deleteaname(namessquare,name, starti) {
  for (let i = starti; i < namessquare.length; i++) {
    let indexplace = namessquare[i].indexOf(name);
    if (indexplace !== -1) {
      namessquare[i].splice(indexplace,1);
      if (namessquare[i].length == 0) {
        console.log('returned false');
        return false;
      }
    }
  }
  return true;
}

function attemptselections(namessquare) {
  console.log('attempting');
  var items = [];
  var b = true;
  var worked = true;
  for (let i = 0; i < namessquare.length; i++) {
    let item = randomelement(namessquare[i]);
    worked = deleteaname(namessquare,item,i+1);
    if (!worked) {
      return false;
    }

    items.push(item);

  }  
  return items;
}

function makeselections () {
  var clone = copy(blockednames);
  var blerp = false;
  var i = 0;
  var failed = false;
  while (!blerp && i < 100){
    blerp = attemptselections(copy(blockednames));
    console.log(blerp);
    i++
  }
  return blerp;
}

function reveal(buttonsending) {
  var parent = buttonsending.parentElement;
  var texttoshow = parent.children[5];
  
  if (buttonsending.innerHTML == "Click to reveal") {
    buttonsending.innerHTML = 'Hide';
    texttoshow.style.display = 'block'
  }
  else {
    buttonsending.innerHTML = 'Click to reveal';
    texttoshow.style.display = 'none'

  }
}
