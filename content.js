
var mouseX,mouseY,windowWidth,windowHeight;
   var  popupLeft,popupTop;
 $(document).ready(function(){
 	$('<button id="poll_btn">Poll</button>').insertAfter('#_chatSendTool');

 	function getTemplates(){
    return new Promise(function(resolve){
	        $.ajax({
	            url: chrome.extension.getURL('content.html'),
	            success: function(data) {
	            	if ($('#poll_content').length == 0) {
	            		$elVal = '<div id="poll_content" style="display:none; position:absolute;">'+ data + '</div>';
	                	$('#_chatSendTool').append($elVal);
	            	} 
	            }
	        });
    	});
	}

	$(document).mousemove(function(e){
	       mouseX = e.pageX;
	       mouseY = e.pageY;
	       //To Get the relative position
	       if( this.offsetLeft !=undefined)
	         mouseX = e.pageX - this.offsetLeft;
	       if( this.offsetTop != undefined)
	         mouseY = e.pageY; - this.offsetTop;

	       if(mouseX < 0)
	            mouseX =0;
	       if(mouseY < 0)
	           mouseY = 0;

	       windowWidth  = $(window).width()+$(window).scrollLeft();
	       windowHeight = $(window).height()+$(window).scrollTop();
	});

		getTemplates();
	$('#poll_btn').click(function(e){
	//$('#poll_content').show();
	var popupWidth  = $('#poll_content').outerWidth();
	var popupHeight =  $('#poll_content').outerHeight();

	if(mouseX+popupWidth > windowWidth)
	popupLeft = mouseX-popupWidth;
	else
	popupLeft = mouseX;

	if(mouseY+popupHeight > windowHeight)
	popupTop = mouseY-popupHeight;
	else
	popupTop = mouseY; 

	if( popupLeft < $(window).scrollLeft()){
	popupLeft = $(window).scrollLeft();
	}

	if( popupTop < $(window).scrollTop()){
	popupTop = $(window).scrollTop();
	}

	if(popupLeft < 0 || popupLeft == undefined)
	   popupLeft = 0;
	if(popupTop < 0 || popupTop == undefined)
	   popupTop = 0;
	console.log(popupHeight);
	console.log(popupWidth);
	$('#poll_content').offset({top: e.pageY-popupHeight,left: e.pageX});
	$('#poll_content').show();
	});
 });