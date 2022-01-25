import { logger } from "../../src/application";
import AccountService from "../services/account.service"

async function saque(req, res: any, next: any) {
    try{
        let codigo: number = req.body.codigo;
        let valor: number = req.body.valor;

        //Validando requisições

        if(valor == null || codigo == null){
            throw new Error("Código e valor são obrigatórios para a operação.")
        }else if(valor > 600){
            throw new Error("O valor limite de saque é B$ 600,00");
        }else{
            res.send(await AccountService.saque(codigo, valor));
            logger.info(`PUT /saque - Código: ${codigo} // Valor: ${valor}`)
        }
    }catch (err){
        next(err)
    }
    
}

async function deposito(req: any, res: any, next: any) {
    try{
        let codigo: number = req.body.codigo;
        let valor: number = req.body.valor;

        //Validando requisições

        if(valor == null || codigo == null){
            throw new Error("Código e valor são obrigatórios para a operação.")
        }else{
            res.send(await AccountService.deposito(codigo, valor));
            logger.info(`PUT /depósito - Código: ${codigo} // Valor: ${valor}`)
        }

    }catch (err){
        next(err)
    }
    
}


async function criar_conta(req: any, res: any, next: any) {
    try {
        let account = req.body;
        
        //Validando requisições
        
        if(!account.nome || account.codigo == null || !account.tipo_de_conta){
            throw new Error("Nome, código e tipo de conta são obrigatórios")
        }else if(account.tipo_de_conta.toUpperCase() != "CONTA POUPANCA" && (account.tipo_de_conta).toUpperCase() != "CONTA CORRENTE"){
            throw new Error("O tipo de conta deve ser Conta poupança ou Conta corrente")
        }else{
            account = await AccountService.criar_conta(account);
            res.send(account);
            logger.info(`POST /criar_conta - ${JSON.stringify(account)}`);
        }


    } catch (err) {
        next(err)
    }
    
}

export default {
    saque,
    deposito,
    criar_conta
}