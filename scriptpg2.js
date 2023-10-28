var names;
var buttonrow;
var buttonrow2;
var bigarray = [];
var hiddentext;

var topbuttonselection;

function buildbigarray(names) {
  var currentlist;
  for (let i = 0; i<names.length; i++) {
    currentlist = [...names];
    currentlist.splice(i,1);
    bigarray.push(currentlist);
  }
}



function stringify(names) {
  return JSON.stringify(names);
}

function parse(names) {
  return JSON.parse(names);
}

function show(element) {
  element.style.display = "block";
}

function hide(element) {
  element.style.display = "none";
}


function topbuttonclicked(button) {
  if (typeof topbuttonselection !== 'undefined') {
    topbuttonselection.disabled = false;
  }
  button.disabled = true;
  topbuttonselection = button;
  hide(hiddentext);
}

function bottombuttonclicked(button) {
  var topbuttonname = topbuttonselection.innerHTML;
  var bottombuttonname = button.innerHTML;
  var topbuttonindex = names.indexOf(topbuttonname);
  var listtodelfrom = bigarray[topbuttonindex];
  var indextodelfrom = listtodelfrom.indexOf(bottombuttonname);
  if (indextodelfrom !== -1) {
    listtodelfrom.splice(indextodelfrom,1);
  }

  hiddentext.innerHTML = topbuttonname+" can't get "+bottombuttonname;
  show(hiddentext);

  
}


function pg2load() {
  names = parse(localStorage.getItem("names"));
  buildbigarray(names);

  hiddentext = document.getElementById("hiddentext");
  buttonrow = document.getElementById("buttonrow1");
  buttonrow2 = document.getElementById("buttonrow2");

  var buttontocopy = document.getElementById('mainbutton');
  buttontocopy.innerHTML = names[0];


  var clone2;
  var currentclone;
  for (let i = 0; i < names.length; i++) {
    currentclone = buttontocopy.cloneNode(true);
    currentclone.innerHTML = names[i];
    clone2 = currentclone.cloneNode(true);
    
    currentclone.addEventListener("click",function() {topbuttonclicked(this)});
    clone2.addEventListener("click",function() {bottombuttonclicked(this)});

    buttonrow.appendChild(currentclone);
    buttonrow2.appendChild(clone2);
  }
  
  hide(buttontocopy);
}

function nextpage() {
  localStorage.setItem('bigarray',stringify(bigarray));
  var selections = makeselections(bigarray)
  localStorage.setItem('selections',stringify(selections))
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
        return false;
      }
    }
  }
  return true;
}

function attemptselections(namessquare) {
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

function makeselections (array) {
  var blerp = false;
  var i = 0;
  while (!blerp && i < 100){
    blerp = attemptselections(copy(array));
    i++
  }
  return blerp;
}
