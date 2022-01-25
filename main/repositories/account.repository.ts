import { promises as fs } from "fs";

const { readFile, writeFile } = fs;


//Função que realiza a operação expecificada no parâmetro "operação"
async function operação(codigo: number, NovoSaldo: number, operação: any) {
    const data = JSON.parse((await readFile('data.json')).toString());
    const index = data.accounts.findIndex(a => a.codigo === codigo);
    
    data.accounts[index].saldo = NovoSaldo;

    await writeFile('data.json', JSON.stringify(data, null, 4));

    return (`${operação} efetuado com sucesso. //\n 
            Titular: ${data.accounts[index].nome} //\n
            ${data.accounts[index].tipo_de_conta} //\n
            Saldo: B$ ${data.accounts[index].saldo}`) ;
}


//Função que confere a existência e retorna a conta respectiva ao código.
async function getAccount(codigo: number) {
    const data = JSON.parse((await readFile('data.json')).toString());
    const account = data.accounts.find((account: { codigo: number; }) => account.codigo === codigo);
    if (account){
        return account;
    }
    throw new Error("Registro não encontrado.");
}

//Função que cria um conta
async function criar_conta(account) {
    const data = JSON.parse((await readFile('data.json')).toString());
    account = {
        nome: account.nome,
        tipo_de_conta: account.tipo_de_conta,
        saldo: account.saldo,
        codigo: account.codigo
    }

    data.accounts.push(account);

    await writeFile('data.json', JSON.stringify(data, null, 4));

    return account;
}

export default {
    operação,
    getAccount,
    criar_conta
}