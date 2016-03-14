<?php
$url = "http://svcs.ebay.com/services/search/FindingService/v1";
$url .= "?OPERATION-NAME=findItemsByKeywords";
$url .= "&SERVICE-VERSION=1.0.0";
$url .= "&SECURITY-APPNAME=Autentik-37f9-43de-93e3-38b5ad1f0407";
$url .= "&GLOBAL-ID=EBAY-US";
$url .= "&RESPONSE-DATA-FORMAT=JSON";
$url .= "&REST-PAYLOAD";
$url .= "&".$_SERVER["QUERY_STRING"];


$json = file_get_contents($url);

echo $json;
?>