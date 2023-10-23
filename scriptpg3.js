var blockednames
var names
var selections

function pg3load() {
  var template = document.getElementById('template');
  var boxholder = document.getElementById('boxholder');
  
  blockednames = JSON.parse(localStorage.getItem('bigarray'));
  names = JSON.parse(localStorage.getItem('names'));
  selections = JSON.parse(localStorage.getItem('selections'));

  var rowcount = Math.floor(Math.sqrt(names.length)-0.001)+1
  for (let i=0; i<names.length; i++) {
    let clone = template.cloneNode(true);
    clone.children[0].innerHTML = names[i]
    clone.children[5].innerHTML = selections[i]
    clone.setAttribute('lex',i%rowcount+1)
    clone.setAttribute('ley',Math.floor(i/rowcount)+1)
    clone.style.display = 'block'
    boxholder.appendChild(clone)
    
  }
}


function hideall() {
  var boxholder = document.getElementById('boxholder');
  for (let i = 0; i < boxholder.children.length; i++) {
    element = boxholder.children[i]
    element.children[3].innerHTML = 'Click to reveal';
    element.children[5].style.visibility = "hidden"

  }
}

function reveal(buttonsending) {
  var parent = buttonsending.parentElement;
  var texttoshow = parent.children[5];
  
  if (buttonsending.innerHTML == "Click to reveal") {
    hideall()
    buttonsending.innerHTML = 'Hide';
    texttoshow.style.visibility = "visible"
  }
  else {
    buttonsending.innerHTML = 'Click to reveal';
    texttoshow.style.visibility = "hidden"

  }
}
