// GAME SYSTEM CONSTRUCTOR
function GameSys() {
  this.food = 0
  this.health = 0
  this.experience = 0
  this.level = 0
  this.seedNumb
}
GameSys.prototype.initNumbSeedFromString = function(string) {
  // returns a number betwen 0 and 1 that will always generate for the string
  var valuesArr = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ ".split("")
  var stringArr = string.split("")
  var seed = 13 // start value only
  for (var i = 0; i < string.length; i++) {
    charValue = valuesArr.indexOf(stringArr[i])
    seed += charValue
  }
  var x = Math.sin(seed++) * 10000;
  numbSeed = x - Math.floor(x);
}
GameSys.prototype.makeKeyListeners = function() {
  $(document).keyup(function(event) {
    switch (event.which) {
      case 87: //w, NW direction
        this.NW()
        break
      case 69: //e, NE direction
        this.NE()
        break
      case 68: //d, E direction
        this.E()
        break
      case 65: //a, W direction
        this.W()
        break
      case 88: //x, SE direction
        this.SE()
        break
      case 90: //z, SW direction
        this.SW()
        break
    }
  })
}

//testing stuff
var worldBoard = new WorldBoard(20, 20);
var gameSys = new GameSys()
gameSys.initNumbSeedFromString("gargamel")
console.log(numbSeed)
worldBoard.makeBlankBoardHtml();
worldBoard.randomizeTerrain()
worldBoard.drawTerrain()
worldBoard.initPlayer()
worldBoard.randomizeCreatures()
console.log(worldBoard.creatureLocs)
worldBoard.drawCreatures()
  // gameSys.makeKeyListeners()