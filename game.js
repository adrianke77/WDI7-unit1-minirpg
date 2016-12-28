function GameSys() {
  this.food = 0
  this.health = 0
  this.experience = 0
  this.level = 0
  this.seedNumb
}
GameSys.prototype.initNumbSeedFromString = function( string ) {
  // returns a number betwen 0 and 1 that will always generate for the string
  var valuesArr = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ ".split( "" )
  var stringArr = string.split( "" )
  var seed = 13 // start value only
  for ( var i = 0; i < string.length; i++ ) {
    charValue = valuesArr.indexOf( stringArr[ i ] )
    seed += charValue
  }
  var x = Math.sin( seed++ ) * 10000;
  numbSeed = x - Math.floor( x );
}

//testing stuff
var worldBoard = new WorldBoard( 20, 20 );
var gameSys = new GameSys()
worldBoard.makeBlankBoardHtml();
gameSys.initNumbSeedFromString("Jeremiah" )
console.log( numbSeed )
worldBoard.randomizeTerrain()
worldBoard.drawTerrain()
worldBoard.randomizeCreatures()
worldBoard.drawCreatures()