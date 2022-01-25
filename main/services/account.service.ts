import AccountRepository from "../repositories/account.repository"

//Função que calcula se a conta possui saldo suficiente e o valor no saldo após o saque.
async function saque(codigo: number, valor: number) {
    const account = await AccountRepository.getAccount(codigo);
    if (valor > account.saldo){
        throw new Error(`Você não possui saldo suficiente. Seu saldo é de B$ ${account.saldo}`);
    }else{
    const NovoSaldo = parseFloat((account.saldo - valor - 0.3).toFixed(2));
    return await AccountRepository.operação(codigo, NovoSaldo, "Saque");
    }
}

//Função que calcula o valor no saldo após o depósito.
async function deposito(codigo: number, valor: any) {
    const account = await AccountRepository.getAccount(codigo);
    const NovoSaldo = parseFloat((account.saldo + valor).toFixed(2));
    return await AccountRepository.operação(codigo, NovoSaldo, "Depósito");
}


//Função que torna o saldo igual a 0 se não expecificado
async function criar_conta(account) {
    if(account.saldo == null){
        account.saldo = 0;
    }
    account.tipo_de_conta = account.tipo_de_conta.toLowerCase();
    return await AccountRepository.criar_conta(account);
}

export default {
    saque,
    deposito,
    criar_conta
}

