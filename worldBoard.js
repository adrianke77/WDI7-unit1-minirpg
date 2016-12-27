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

function WorldBoard( width, height ) {
  this.height = height;
  this.width = width;
  this.landTiles = [];
  this.creatureLocs = [];
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
      var cellJO = $( "<div></div>" );
      cellJO.addClass( "box R" + rowidx + "C" + colidx + " spritesheet" );
      var rowshift =
        rowidx % 2 === 0 ? 15 : 0;
      var topPos = 24 * rowidx;
      var leftPos = 30 * colidx + rowshift;
      cellJO.css( {
        "top": topPos,
        "left": leftPos
      } );
      $( ".gameBoard" ).append( cellJO );
    } );
  } );
}
WorldBoard.prototype.drawTerrain = function() {
  this.landTiles.forEach( function( row, rowidx ) {
    row.forEach( function( tile, colidx ) {
      var xpos = landTileSprites[ tile ][ 0 ];
      var ypos = landTileSprites[ tile ][ 1 ];
      var posString = xpos + "px " + ypos + "px";
      $( ".R" + rowidx + "C" + colidx ).css( "background-position", posString );
    } );
  } );
}
WorldBoard.prototype.randomizeTerrain = function() {
  //numberseed is a number between 0 and 1 with 17 decimal places
  var tilesNumber = 0
  this.landTiles.forEach( function( row, rowidx, arr ) {
    row.forEach( function( tile, colidx, row ) {
      arr[ rowidx ][ colidx ] = "plain" //initialize all as plain
      tilesNumber++
    } )
  } )
  var swampTiles = Math.floor( tilesNumber /4 )
  var forestTiles = Math.floor( tilesNumber / 3 )
  var mountainTiles = Math.floor( tilesNumber / 5 )
  var waterTiles = Math.floor( tilesNumber / 2 )
  var y = this.height
  var x = this.width
  for ( var i = 0; i < waterTiles; i++ )
    this.landTiles[ this.makeInt( y ) ][ this.makeInt( x ) ] = "water"
  for ( var i = 0; i < swampTiles; i++ )
    this.landTiles[ this.makeInt( y ) ][ this.makeInt( x ) ] = "swamp"
  for ( var i = 0; i < forestTiles; i++ )
    this.landTiles[ this.makeInt( y ) ][ this.makeInt( x ) ] = "forest"
  for ( var i = 0; i < mountainTiles; i++ )
    this.landTiles[ this.makeInt( y ) ][ this.makeInt( x ) ] = "mountain"
}
WorldBoard.prototype.makeInt = function( max ) {
  //uses genNum to return an integer between 0 and one less than limit
  //
  return Math.floor( genNum() * ( max ) );
}