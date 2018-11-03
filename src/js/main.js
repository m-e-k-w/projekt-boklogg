


"use strict";
var URL = "http://localhost/projekt-boklogg/src/books.php/books/";


//var URL = "http://studenter.miun.se/~mawe1310/writeable/src/books.php/books/";
console.log("hello");
//
// DOM onload
document.addEventListener("DOMContentLoaded", function(){ // Wait for DOM tree to get parsed
  //



  // Click on delete book button - DELETE
  document.getElementById("logg-form").addEventListener("click", function(ev){ 
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", URL+"/"+ev.target.id, true);
    xmlhttp.send();

    xmlhttp.onload = function() {
        location.reload();
    }
})
console.log(URL);
console.log("jso");
//


  // Click on add book button - POST
  document.getElementById("add").addEventListener("click", function(ev){
      
    let isbn = document.getElementById("isbn").value;
    let bnamn = document.getElementById("bnamn").value;
    let fnamn = document.getElementById("fnamn").value;
    let antlas = document.getElementById("antlas").value;
    let beskriv = document.getElementById("beskriv").value;
    if( !(isbn != '' && bnamn != '' && fnamn != '' && antlas != '' && beskriv != '') ) location.reload();
    let json =  {"isbn": isbn, "bnamn": bnamn, "fnamn": fnamn, "antlas": antlas, "beskriv": beskriv};
    
    var xmlhttp = new XMLHttpRequest();
    console.log("world");
    xmlhttp.open("POST", URL, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send( JSON.stringify(json) );
   
    xmlhttp.onload = function() {
        location.reload();
    }
   
  })
  //
  // Click on update book button - PUT
    document.getElementById("update").addEventListener("click", function(ev){
        let isbn = document.getElementById("isbnny").value;
        let bnamn = document.getElementById("bnamnny").value;
        let fnamn = document.getElementById("fnamnny").value;
        let antlas = document.getElementById("antlasny").value;
        let beskriv = document.getElementById("beskrivny").value;
        if( !(isbn != '' && bnamn != '' && fnamn != '' && antlas != ''&& beskriv != '') ) location.reload();

        let json =  {"isbn": isbn, "bnamn": bnamn, "fnamn": fnamn, "antlas": antlas, "beskriv": beskriv};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("PUT", URL+"/"+isbn, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send( JSON.stringify(json) );

        xmlhttp.onload = function() {

            location.reload();
        }  
  })
 
  //
  // Show all books in table - GET
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
          
                var jsonData = JSON.parse(xmlhttp.responseText);
           
               for(var i=0; i < jsonData.length; i++){

               // document.getElementById("logg-form").innerHTML += "</td><td>"+jsonData[i].bnamn+"</td><td>" + jsonData[i].fnamn + "</td><td>" + jsonData[i].antlas+ "</td><td><button id='"+jsonData[i].isbn+"'>Delete #"+jsonData[i].isbn+"</button></td>";    
              
                   document.getElementById("logg-form").innerHTML += "<div class='onebook'>"+"<h3>"+jsonData[i].bnamn+ "</h3><h4>" + jsonData[i].fnamn + "</h4><h5>Antal läsningar " + jsonData[i].antlas +  "</h5><h5>ISBN: " + jsonData[i].isbn +  "</h5><p>" + jsonData[i].beskriv + "</p><button id='"+jsonData[i].isbn+ "'>Ta bort</button></div>";    
                }
                
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
       
    };

    xmlhttp.open("GET", URL, true);

    xmlhttp.send();
    
}); 


