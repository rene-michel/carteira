<?

include_once("../conf/postgres_conn.php");
include_once("../conf/carteira.conf");
//print_r($_POST);
$json = file_get_contents('https://economia.awesomeapi.com.br/json/last/USD-BRL');
$obj = json_decode($json);
print_r($obj);

$code = $obj->USDBRL->code;
$codein = $obj->USDBRL->codein;
$name = $obj->USDBRL->name;
$high = $obj->USDBRL->high;
$low = $obj->USDBRL->low;
$varBid = $obj->USDBRL->varBid;
$pctChange = $obj->USDBRL->pctChange;
$bid = $obj->USDBRL->bid;
$ask = $obj->USDBRL->ask;
$timestamp = $obj->USDBRL->timestamp * 1000;
$create_date = $obj->USDBRL->create_date;

$banco = new postgres($HOST , $USUARIO, $SENHA, $BANCO);
$banco->executa("select id from cotacao where create_date = '$create_date'");
$r = $banco->proximo(null);

if($r == null){
    $data = date("d/m/Y H:i:s");
    echo "checado em ".$data."\n";
    $query = "insert into cotacao (data_acesso,
                                   ask,
                                   bid,
                                   high,
                                   low,
                                   pct_change,
                                   var_bid,
                                   code,
                                   code_in,
                                   create_date,
                                   name,
                                   timestamp)
                                 values ('$data',
                                          $ask,
                                          $bid,
                                          $high,
                                          $low,
                                          $pctChange,
                                          $varBid,
                                          '$code',
                                          '$codein',
                                          '$create_date',
                                          '$name',
                                           $timestamp)";
    $banco->executa($query);
}
else{
    echo "já existe";
}
?>
