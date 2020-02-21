console.log('json & ajax');// testing script.js

//TO TEST JQUERY
	$(document).ready(function(){
		
//MYKEY FROM JSON FILE
  var myKey = JSON.parse(apiKey);
  console.log(myKey[0]);
  myKey = myKey[0].key;
  //console.log(myKey);

//READING USER CHOICE
var endPoint;
var size;

document.getElementById('submit').addEventListener('click', function(){
  endPoint= document.getElementById('endPoints').value;
  size= document.getElementById('sizes').value;
  console.log(endPoint,size);
  displayData(endPoint,size);
}); //reading user choice


//DISPLAY DATA FUNCTIONRIGHT BEFORE AJAX, you can name the variables as you want ep/si
function displayData(ep, si){
//AJAX METHOD
$.ajax({
  url:`https://api.unsplash.com/${ep}/?client_id=${myKey}`, // use back tick for E6 syntax
  type:'GET',
  data:'json',
  success: function(data){
    console.log(data);

//CREATE A FUNCTION TO ACCESS COLLECTIONS separate from photos as it does not have same sub variable
  if (ep === 'collections'){
      collections(data, ep, si); //declare data to know the lenght later in the function
    } else if (ep === 'photos'){
      photos(data,ep,si);
    }
    function collections(d, e,s){
      var userChoiseCol; //user choise collection
      var userSize; // user choise size

        document.getElementById('result').innerHTML = '';
      for(userChoiseCol = 0; userChoiseCol < d.length; userChoiseCol++ ){
        if (s === 'full') {
          userSize = d[userChoiseCol].cover_photo.urls.full;
        } else if (s === 'raw') {
          userSize = d[userChoiseCol].cover_photo.urls.raw;
        } else if (s === 'regular') {
          userSize = d[userChoiseCol].cover_photo.urls.regular;
        }else if (s === 'small') {
          userSize = d[userChoiseCol].cover_photo.urls.small;
        } else if (s === 'thumb') {
          userSize = d[userChoiseCol].cover_photo.urls.thumb;
        }
        document.getElementById('result').innerHTML +=
        '<div class="col">' +
          '<img class="img-thumbnail" alt="Image" src="' + userSize + '">' +
        '</div>';
      }
    }

//CREATE A FUNCTION TO ACCESS PHOTOS
      function photos(d, e,s){
          var j;
        var photoSize;

          document.getElementById('result').innerHTML = '';
      for(j = 0; j < d.length; j++ ){
        if (s === 'full') {
          photoSize = d[j].urls.full;
        } else if (s === 'raw') {
          photoSize = d[j].urls.raw;
        } else if (s === 'regular') {
          photoSize = d[j].urls.regular;
        }else if (s === 'small') {
          photoSize = d[j].urls.small;
        } else if (s === 'thumb') {
          photoSize = d[j].urls.thumb;
        }


        document.getElementById('result').innerHTML +=
        '<div class="col">' +
          '<img class="img-thumbnail" alt="Image" src="' + photoSize + '">' +
        '</div>';
      }
    }

  },//success
  error:function(){
    console.log('error');
  }//error

});//ajax
}// end function to display user data



});//document.ready
