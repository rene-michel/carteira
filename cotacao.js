let dat = 0;
let ask = 0;
let bid = 0;
let high = 0;
let low = 0;

function obter_cot(){
    $.getJSON("https://economia.awesomeapi.com.br/json/last/USD-BRL", function(d){
        dat = d;
        ask = dat == 0 ? 0 : dat['USDBRL']['ask'];
        bid = dat == 0 ? 0 : dat['USDBRL']['bid'];
        high = dat == 0 ? 0 : dat['USDBRL']['high'];
        low = dat == 0 ? 0 : dat['USDBRL']['low'];
        console.log(d);
    });
}

obter_cot();

let u=new Usuario('rene','rene.michel@gmail.com', '123456', 1000)
let date = new Date();
console.log(date);

function guarda_cotacao(){
    if(dat == 0)
        return;
    data = new Date();
    ts = new Date(dat['USDBRL']['timestamp'] * 1000);
    var p = $.post("cotacao/cotacao.php", {
        'data_acesso' : data.toLocaleDateString() + " " + data.toLocaleTimeString(),
        'ask' : dat['USDBRL']['ask'],
        'bid' : dat['USDBRL']['bid'],
        'high' : dat['USDBRL']['high'],
        'low' : dat['USDBRL']['low'],
        'pctChange' : dat['USDBRL']['pctChange'],
        'varBid' : dat['USDBRL']['varBid'],
        'code' : dat['USDBRL']['code'],
        'codeIn' : dat['USDBRL']['codein'],
        'create_date' : dat['USDBRL']['create_date'],
        'timestamp' : ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
        'name' : dat['USDBRL']['name']
    });
    p.done(function(d){
        console.log(d);
    });
}

setInterval(function(){
    obter_cot();
    console.log("Salario bruto " + u.salBr());
    console.log("Salario líquido " + u.liq());
    console.log(date);
    guarda_cotacao();
}, 60000);
