
<?php
//the codes base is based on Mikael Hasselmans code for this project and the rebuit by me

//database description
// table bok
//isbn varchar(13) primary key,
//bnamn varchar(50) not null ,
//fnamn varchar(50) not null,
//antlas int not null,
//beskriv varchar(300)  not null
//

// Get HTTP method, path and input of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);

//checks if the url contains the word books
if($request[0] != "books"){ 
	http_response_code(404);
	exit();
}

//

// Send return header information
header("Content-Type: application/json; charset=UTF-8");
header("access-control-allow-origin: *");


//database connection
$conn = mysqli_connect("localhost","","","") or die("Error connecting to database.");;

$db_connected = mysqli_select_db($conn, "boklogg"); // Work with the database named 'testrest' 


// HTTP method implementations of GET, POST, PUT and DELETE
switch ($method){
	case "GET":
		$sql = "SELECT isbn, bnamn, fnamn, antlas, beskriv FROM bok";
		if(isset($request[1])) $sql = $sql . " WHERE isbn = " . $request[1] . ";";
		break;
	case "PUT":
		$sql = "UPDATE bok SET bnamn = '" . $input['bnamn'] . "', fnamn = '" . $input['fnamn'] . "', antlas = '" . $input['antlas'] . "', beskriv = '" . $input['beskriv'] ."' WHERE isbn = " . $request[1] . ";";
    	break;
	case "POST":
		$sql = "INSERT INTO bok (isbn, bnamn, fnamn, antlas, beskriv) VALUES ( '" . $input['isbn'] . "', '" . $input['bnamn'] . "', '" . $input['fnamn']."', '"  . $input['antlas'] . "', '" . $input['beskriv'] ."');";
		break;

	case "DELETE":
   		$sql = "DELETE FROM bok WHERE isbn = " . $request[1] . ";";
   		break;
}

//
// Always response with json array of books except for GET 
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

	$harr = [];
	if($method != "GET") $sql = "SELECT isbn, bnamn, fnamn, antlas, beskriv FROM bok";
   $result = mysqli_query($conn,$sql) or die(mysqli_error($conn));
    
    while($row = mysqli_fetch_assoc($result)){
			$row_arr['isbn'] = $row['isbn'];
			$row_arr['bnamn'] = $row['bnamn'];
			$row_arr['fnamn'] = $row['fnamn'];
            $row_arr['antlas'] = $row['antlas'];
            $row_arr['beskriv'] = $row['beskriv'];
			
			array_push($harr,$row_arr);
	}


	mysqli_close($conn);
	$json = json_encode($harr, JSON_PRETTY_PRINT);
    echo $json;
   



    ?>
    