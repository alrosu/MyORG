// è l'importa della lbreria per l'lwc
import { LightningElement, track } from 'lwc';
import riempiDTacc from '@salesforce/apex/RiempiDataTable.riempiDTacc';
import riempiDTopp from '@salesforce/apex/RiempiDataTable.riempiDTopp';

//Qua definisco le librerie da importare

const columnsAcc = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Billing City', fieldName: 'BillingCity', type: 'String' },
    { label: 'Industry', fieldName: 'Industry', type: 'String' },

];

const columnsOpp = [
    { label: 'Opportunity Name', fieldName: 'Name' },
    { label: 'Stage Name', fieldName: 'StageName', type: 'String' },
    { label: 'Closed Date', fieldName: 'CloseDate', type: 'Date' },
    { label: 'Amount', fieldName: 'Amount', type: 'Decimal' },

];

export default class Lwc1 extends LightningElement {

//Qua definisce le FUNZIONI

dataAcc = [];
dataOpp = [];
@track columnsAcc = columnsAcc;
@track columnsOpp = columnsOpp;
@track booleanAcc = false;
@track booleanOpp = false;

//variabili in cui ci salviamo gli import

@track booleanUnicorn = false;
showImg()
{
    this.booleanUnicorn = true;
}

notShowImg()
{
    this.booleanUnicorn = false;
}
getAcc()
{
    if(this.booleanAcc == true)
    {
    this.booleanAcc = false;
    }
    else
    {
    this.booleanAcc = true;
    }
}

 

getOpp()
{

    if(this.booleanOpp == true)

    {

    this.booleanOpp = false;

    }

    else

    {

    this.booleanOpp = true;

    }

}

 

connectedCallback()

{

this.loadContext();

}

 

async loadContext()

{

    await this.getAccount();

    await this.getOpportunity();

}

 

async getAccount()

{

    //salviamo in una variabile il risultato del metodo APEX IMPORTATO

    const risACC = await riempiDTacc();

    //salviamo all'interno della variabile in HTML dataAcc[] i risultati del metodo APEX

    //Così da riempire la Data Table nell'HTML

    this.dataAcc = risACC;

}

 

async getOpportunity()

{

    //salviamo in una variabile il risultato del metodo APEX IMPORTATO

    const risOPP = await riempiDTopp();

    //salviamo all'interno della variabile in HTML dataAcc[] i risultati del metodo APEX

    //Così da riempire la Data Table nell'HTML

    this.dataOpp = risOPP;

}

 

}