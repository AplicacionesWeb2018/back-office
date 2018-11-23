document.getElementById('title').focus();
$(document).ready(function() {
$('#productstable').dataTable( {
    select: {
        style: 'multi'
    }
  } );
} );