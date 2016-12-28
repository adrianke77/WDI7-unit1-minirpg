const landTileSprites = {
  plain: [ 0, 0 ],
  swamp: [ -36, 0 ],
  hill: [ -72, 0 ],
  water: [ -18, -33 ],
  mountain: [ -54, -33 ],
  snow: [ 0, -66 ],
  forest: [ -36, -66 ],
  dune: [ -72, -66 ]
}

const creatureTypes = {
  //name:[0:health 1:movement 2:strength 3:speed 4:treasureMin 5:treasureMax
  // 6: spriteX, 7: spriteY 8:rarity]
  //sprite X and Y are in 1-index
  //the higher the rarity the less common the monster
  goblin: [ 3, "walk", 2, 1, 2, 2, 4, 2, 10 ],
  dog: [ 2, "walk", 2, 2, 1, 2, 7, 3, 20 ],
  eagle: [ 2, "fly", 1, 3, 1, 2, 6, 5, 30 ]

}

var numbSeed = 0
  // this number will change every time genNumbSeed is called

function genNum() {
  //every time this function is called it will both 
  // replace global numbSeed value as well as
  // return the new numbSeed value
  var x = Math.sin( numbSeed++ ) * 10000;
  numbSeed = x - Math.floor( x );
  return numbSeed
}

function genInt( max ) {
  //uses genNum to return an integer between 0 and one less than limit
  //
  return Math.floor( genNum() * ( max ) );
}

function Creature( type, statsArr ) {
  this.type = type;
  this.health = statsArr[ 0 ];
  this.movement = statsArr[ 1 ];
  this.strength = statsArr[ 2 ];
  this.speed = statsArr[ 3 ];
  this.treasureMin = statsArr[ 4 ];
  this.treasureMax = statsArr[ 5 ];
}

function WorldBoard( width, height ) {
  this.height = height;
  this.width = width;
  this.landTiles = []; // stores terrain as strings
  this.creatureLocs = []; //stores creatures as Creature instances
  this.objectLocs = [];
  for ( var i = 0; i < this.height; i++ ) {
    this.landTiles[ i ] = [];
    this.creatureLocs[ i ] = [];
    this.objectLocs[ i ] = []
    for ( var j = 0; j < this.width; j++ ) {
      this.landTiles[ i ][ j ] = null;
      this.creatureLocs[ i ][ j ] = null;
      this.objectLocs[ i ][ j ] = null;
    }
  }
}
WorldBoard.prototype.makeBlankBoardHtml = function() {
  this.landTiles.forEach( function( row, rowidx ) {
    row.forEach( function( tile, colidx ) {
      var landCell = $( "<div></div>" );
      var creatureCell = $( "<div></div>" );
      landCell.addClass(
        "landbox landR" + rowidx + "C" + colidx + " background" );
      creatureCell.addClass(
        "creatbox creatR" + rowidx + "C" + colidx );
      var rowshift =
        rowidx % 2 === 0 ? 15 : 0;
      var topPos = 24 * rowidx;
      var leftPos = 30 * colidx + rowshift;
      landCell.css( {
        "top": topPos,
        "left": leftPos
      } );
      creatureCell.css( {
        "top": topPos,
        "left": leftPos
      } );
      $( ".gameBoard" ).append( landCell ).append( creatureCell );
    } );
  } );
}
WorldBoard.prototype.drawTerrain = function() {
  this.landTiles.forEach( function( row, rowidx ) {
    row.forEach( function( tile, colidx ) {
      var xpos = landTileSprites[ tile ][ 0 ];
      var ypos = landTileSprites[ tile ][ 1 ];
      var posString = xpos + "px " + ypos + "px";
      $( ".landR" + rowidx + "C" + colidx ).css( "background-position", posString );
    } );
  } );
}
WorldBoard.prototype.randomizeTerrain = function() {
  var x = this.width;
  var y = this.height;
  var tilesNumber = x * y;
  this.landTiles.forEach( function( row, rowidx, arr ) {
    row.forEach( function( tile, colidx, row ) {
      arr[ rowidx ][ colidx ] = "plain" //initialize all as plain
    } )
  } )
  var swampTiles = Math.floor( tilesNumber / 4 );
  var forestTiles = Math.floor( tilesNumber / 3 );
  var mountainTiles = Math.floor( tilesNumber / 5 );
  var waterTiles = Math.floor( tilesNumber / 2 );
  for ( var i = 0; i < waterTiles; i++ )
    this.landTiles[ genInt( y ) ][ genInt( x ) ] = "water";
  for ( var i = 0; i < swampTiles; i++ )
    this.landTiles[ genInt( y ) ][ genInt( x ) ] = "swamp";
  for ( var i = 0; i < forestTiles; i++ )
    this.landTiles[ genInt( y ) ][ genInt( x ) ] = "forest";
  for ( var i = 0; i < mountainTiles; i++ )
    this.landTiles[ genInt( y ) ][ genInt( x ) ] = "mountain";
}
WorldBoard.prototype.randomizeCreatures = function() {
  //name:[health,movement,strength,speed,treasureMin,treasureMax,spriteX,spriteY]
  //sprite X and Y are in 1-index
  self = this
  for ( creatureType in creatureTypes ) {
    var y = this.height;
    var x = this.width;
    var tilesNumber = x * y;
    noOfMonster = Math.floor( tilesNumber / creatureTypes[ creatureType ][ 8 ] );
    for ( var i = 0; i < noOfMonster; i++ ) {
      this.makeACreature(self,x,y)
    }
  }
}
WorldBoard.prototype.makeACreature = function(self,x,y) {
  xpos = genInt( x )
  ypos = genInt( y )
  var terrainHere = self.landTiles[ ypos ][ xpos ];
  var movement = creatureTypes[ creatureType ][ 1 ]
  if ( !( movement === "walk" && terrainHere === "water" ) )
    if ( !( movement === "fly" && terrainHere === "forest" ) ) {
      this.creatureLocs[ ypos ][ xpos ] =
        new Creature( creatureType, creatureTypes[ creatureType ] );
      return
    }
  self = this; // if fail make the same creature again, at new random point
  self.makeACreature(self,x,y)
}
WorldBoard.prototype.drawCreatures = function() {
  this.creatureLocs.forEach( function( row, rowidx ) {
    row.forEach( function( creature, colidx ) {
      if ( creature ) {
        var xpos = ( creatureTypes[ creature.type ][ 6 ] - 1 ) * -20
        var ypos = ( creatureTypes[ creature.type ][ 7 ] - 1 ) * -20.5
        var posString = xpos + "px " + ypos + "px";
        // make string to shift spritesheet to
        var terrainHere = self.landTiles[ rowidx ][ colidx ];
        $( ".creatR" + rowidx + "C" + colidx )
          .addClass( "creature" )
          .css( "background-position", posString );
      }
    } )
  } )
}