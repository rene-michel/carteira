class usuario{
    constructor(nome, enail, senha, salario){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.salario = salario;
    }
}

function envia(){
    cot = 0;
	$.getJSON("https://economia.awesomeapi.com.br/json/last/USD-BRL", function(data){
		console.log(data);
        cot = data['USDBRL']['ask'];
		console.log(cot * 1100);
		console.log(inss(1100 * cot));
		console.log(irrf(1100 * cot));
	});
}

function inss(salario){
	if(salario >= 0 && salario <= 1212)
		return salario * 0.075;
	if(salario >= 1212.01 && salario <= 1427.35)
		return salario * 0.09;
	if(salario >= 1427.36 && salario <= 3641.03)
		return salario * 0.12;
	if(salario >= 3641.04 && salario <= 7087.22)
		return salario * 0.14;
	return 0;
}

function irrf(salario){
	if(salario >= 1903.99 && salario <= 2826.65)
		return salario * 0.075;
	if(salario >= 2826.66 && salario <= 3751.05)
		return salario * 0.15;
	if(salario >= 3751.06 && salario <= 4664.68)
		return salario * 0.225;
	if(salario >= 4664.69)
		return salario * 0.275;
}
