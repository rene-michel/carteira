let dat = 0;
class Usuario{
    constructor(nome, email, senha, salDolar){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.salDolar = salDolar;
        this.cot = dat == 0 ? 0 : dat['USDBRL']['ask'];
        this.salBr = this.salDolar * this.cot;
        this.liq = this.salBr - this.inss() - this.irrf();
    }

    atualiza_cot(){
        this.cot = dat == 0 ? 0 : dat['USDBRL']['ask'];
    }

    inss(){
        if(this.salBr >= 0 && this.salBr <= 1212)
            return this.salBr * 0.075;
        if(this.salBr >= 1212.01 && this.salBr <= 1427.35)
            return this.salBr * 0.09;
        if(this.salBr >= 1427.36 && this.salBr <= 3641.03)
            return this.salBr * 0.12;
        if(this.salBr >= 3641.04 && this.salBr <= 7087.22)
            return this.salBr * 0.14;
        return 0;
    }

    irrf(){
        if(this.salBr >= 1903.99 && this.salBr <= 2826.65)
            return this.salBr * 0.075;
        if(this.salBr >= 2826.66 && this.salBr <= 3751.05)
            return this.salBr * 0.15;
        if(this.salBr >= 3751.06 && this.salBr <= 4664.68)
            return this.salBr * 0.225;
        if(this.salBr >= 4664.69)
            return this.salBr * 0.275;
    }
}

setInterval(function(){
    obter_cot();
}, 60000);

function obter_cot(){
    $.getJSON("https://economia.awesomeapi.com.br/json/last/USD-BRL", function(d){
        dat = d;
        console.log(d);
    });
}

obter_cot();
