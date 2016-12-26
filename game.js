function WorldBoard( width, height ) {
  this.height = height;
  this.width = width;
  this.cells = [];
  for ( var i = 0; i < this.height; i++ ) {
    this.cells[ i ] = [];
    for ( var j = 0; j < this.width; j++ ) {
      this.cells[ i ][ j ] = null;
    }
  }
}
WorldBoard.prototype.makeBlankBoardHtml = function() {
  this.cells.forEach( function( col, colidx ) {
    col.forEach( function( cell, rowidx ) {
      var cellJO = $( "<div></div>" )
      cellJO.addClass( "box R" + rowidx + "C" + colidx + " spritesheet")
      rowshift =
        rowidx % 2 === 0 ? 15 : 0
      topPos = 24 * rowidx 
      leftPos = 30 * colidx + rowshift
      cellJO.css( {
        "top": topPos,
        "left": leftPos
      } )
      $( ".gameBoard" ).append( cellJO )
    } )
  } )
}

var worldBoard = new WorldBoard( 15, 15 );
worldBoard.makeBlankBoardHtml()