var inputsrow
var namesblockcentered
function initiate() {
  inputsrow = document.getElementById("namesrow1");
  namesblockcentered = document.getElementById("namesblockcentered");
}

function morerows () {
  var clonedrow = inputsrow.cloneNode(true);
  namesblockcentered.appendChild(clonedrow);
}

