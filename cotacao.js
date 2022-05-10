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
        console.log('ask ' + ask);
        console.log('bid ' + bid);
        console.log('low ' + low);
        console.log('high ' + high);
    });
}

obter_cot();

let u=new Usuario('rene','rene.michel@gmail.com', '123456', 1200)
let date = new Date();
console.log(date);

setInterval(function(){
    obter_cot();
    console.log("Salario bruto " + u.salBr());
    console.log("Salario líquido " + u.liq());
    console.log(date);
}, 60000);
