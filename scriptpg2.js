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
  console.log(JSON.stringify(bigarray));
  console.log(JSON.parse(JSON.stringify(bigarray))[0]);
  console.log(bigarray[0]);
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
  console.log(button);
  if (typeof topbuttonselection !== 'undefined') {
    topbuttonselection.disabled = false;
  }
  button.disabled = true;
  topbuttonselection = button;
  hide(hiddentext);
}

function bottombuttonclicked(button) {
  console.log(button);
  topbuttonselection.disabled = false;
  var topbuttonname = topbuttonselection.innerHTML;
  var bottombuttonname = button.innerHTML;
  var topbuttonindex = names.indexOf(topbuttonname);
  var listtodelfrom = bigarray[topbuttonindex];
  var indextodelfrom = listtodelfrom.indexOf(bottombuttonname);
  if (indextodelfrom !== -1) {
    listtodelfrom.splice(indextodelfrom,1);
  }
  console.log(listtodelfrom);

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
}
