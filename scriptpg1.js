var inputsrow;
var namesblockcentered;
var names = [];

function stringify(names) {
  return JSON.stringify(names);
}
function parse(names) {
  return JSON.parse(names);
}

function initiate() {
  inputsrow = document.getElementById("namesrow1");
  namesblockcentered = document.getElementById("namesblockcentered");
  names = parse(localStorage.getItem('names'));
  var rowsneeded = Math.floor(names.length/4)+1;
  for (let i = 1; i < rowsneeded; i++) {
    morerows();
  }

  console.log(names);
  var lastindexused = 0;
  var rows = namesblockcentered.childNodes;
  for (let i = 0; i < rows.length; i++) {
    var items = rows[i].childNodes;
    for (let j = 0; j < items.length; j++) {
      console.log(j);
      console.log(items[j]);
      if (typeof items[j].value !== 'undefined') {
        items[j].value = names[lastindexused];
        console.log(items[j].value);
        lastindexused++;
      }
      if (lastindexused >= names.length){
        break;
      }
    }
  }
}

function morerows () {
  var clonedrow = inputsrow.cloneNode(true);
  var clonedchildren = clonedrow.childNodes;
  for (i = 0; i < clonedchildren.length; i++) {
    if (typeof clonedchildren[i].value !== 'undefined') {
      clonedchildren[i].value = ''
    }
  }
  namesblockcentered.appendChild(clonedrow);
  
}

function nextpage () {
  names = [];
  var children = namesblockcentered.childNodes;
  var childrenchildren;
  var childrenchildrenchild;
  for (let i = 0; i < children.length; i++){
    childrenchildren = children[i].childNodes;

    for (let j=0; j < childrenchildren.length; j++) {
      childrenchildrenchild = childrenchildren[j];
      
      if (typeof childrenchildrenchild.value !== 'undefined' && childrenchildrenchild.value != '') {
        names.push(childrenchildrenchild.value);
      }
    }
  }
  localStorage.setItem('names',stringify(names));
  console.log(localStorage.getItem('names'));
}
