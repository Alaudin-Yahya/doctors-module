<?php
session_start();
require "connect.php";

if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') != 0){
    throw new Exception('Request method must be POST!');
}
 
//Make sure that the content type of the POST request has been set to application/json
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
if(strcasecmp($contentType, 'application/json') != 0){
    throw new Exception('Content type must be: application/json');
}
 
//Receive the RAW post data.
$content = trim(file_get_contents("php://input"));
 
//Attempt to decode the incoming RAW post data from JSON.
$decoded = json_decode($content, true);
 
//If json_decode failed, the JSON is invalid.
if(!is_array($decoded)){
    throw new Exception('Received content contained invalid JSON!');
}


$email=$decoded["email"];
$name = $decoded["name"];
$phone = $decoded["phone"];
$speciality = $decoded["speciality"];
$address = $decoded["address"];
$timing = $decoded["timing"];

$phone = strval($phone);
$query = "UPDATE doctor 
          SET 
          doctor_name='$name' 
          doctor_speciality = '$speciality' 
          doctor_timing='$timing' 
          doctor_phone= '$phone' 
          doctor_address='$address' 
          WHERE doctor_email='$email'";

    if ($conn->query($sql)===TRUE){
         echo 1;
    }
    else echo 0;
?>
