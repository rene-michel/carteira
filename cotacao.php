<?
//print_r($_POST);
$json = file_get_contents('https://economia.awesomeapi.com.br/json/last/USD-BRL');
$obj = json_decode($json);
echo $obj->USDBRL->code."\n";
echo $obj->USDBRL->codein."\n";
echo $obj->USDBRL->name."\n";
echo $obj->USDBRL->high."\n";
echo $obj->USDBRL->low."\n";
echo $obj->USDBRL->varBid."\n";
echo $obj->USDBRL->pctChange."\n";
echo $obj->USDBRL->bid."\n";
echo $obj->USDBRL->ask."\n";
echo $obj->USDBRL->timestamp."\n";
echo $obj->USDBRL->create_date."\n";


?>
