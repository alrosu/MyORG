// il primo import abilita l'utilizzo dei LWC e associa il componente ai LWC, in questa maniera abilito il file a contenere dei controller per il componente 
import { LightningElement, track } from 'lwc';
// serve per mostrare un messaggio di successo o errore nel momento in cui si clicca SELL
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// import dei metodi apex 
import getStock from '@salesforce/apex/DataStock.getStock';
import averagesS from '@salesforce/apex/StockMarketManagerViewController.averagesS';
import deleteRecords from '@salesforce/apex/StockMarketManagerViewController.deleteRecords';
import fetchData from '@salesforce/apex/StockMarketManagerViewController.fetchData';

// definisco i nomi delle colonne della tabella 
const columnsStock= [
    { label: 'Stock Number', fieldName: 'Name' },
    { label: 'Starting Price', fieldName: 'StartingPrice__c', type: 'currency' },
    { label: 'Revenue', fieldName: 'Revenue__c', type: 'number' },
    { label: 'Close Date', fieldName: 'CloseDate__c', type: 'datetime' },
    { label: 'Forecast Price', fieldName: 'ForecastPrice__c', type: 'currency' },
    { label: 'Market Weight', fieldName: 'MarketWeight__c', type: 'number' },
    { label: 'Market Action', fieldName: 'MarketAction__c', type: 'formula(text)' },
];

export default class StockMarketManagerView extends LightningElement {

    // definisco le funzioni 
    columnsStock=columnsStock;
    @track data=[];
    @track averageStartingPrice;
    @track averageForecastPrice;
    @track averageRevenue;
    
    //  per impostare i dati nel datatable
connectedCallback(){
        this.loadContext();
}
async loadContext(){
    await this.getStocks();
}
async getStocks(){
    //salvo in una variabile il risultato del metodo APEX IMPORTATO
    const risSTOCK = await getStock();
    //salvo all'interno della variabile in HTML data[] i risultati del metodo APEX
    //Così da riempire la Data Table nell'HTML
    this.data = risSTOCK;
}

// hendler per il calolo delle medie 
handleCalculateClick() {
    console.log('Clicked Calculate button');
   
    // richiamo il metodo apex
    averagesS()
    // con .then(result => .... uso un metodo promessa di javascript e quando averagesS() completa la sua operazione e restituisce il risultato esso verrà contato in result
    //  
    .then(result =>{
        if(result){
            // assegno cosa deve mostrare
            this.averageStartingPrice=result[0];
            this.averageForecastPrice=result[1];
            this.averageRevenue=result[2];
            //console.log(result);
        }
    })

}
            

// hendler per il pulsante SELL
handleSellClick() {
    //console.log('SELL button OK');
    // richiamo il metodo deleteRecords e gli do l'input che si aspetta
    deleteRecords()
        .then(() => {
         // assegno a showToast cosa deve mostrare se l'oprazione va a buon fine
            this.showToast('Success', 'Record with MarketAction "SELL" deleted successfully', 'Success');
            this.refreshData();
            //this.data=result;
           // richiamo la funzione handleCalculateClick() così dopo aver cancellato i  record con MarkerAction='SELL' ricalcola le average
            this.handleCalculateClick()
        .catch(error => {
            console.log('Error deleting records:', error);

            // assegno a showToast cosa mostrare in caso di errore
            this.showToast('error', 'Error deleting records with MarketAction "SELL"', 'error');
        });
        
})
}
refreshData() {
    fetchData()
        .then(result => {
            this.data = result;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}



// per mostrare success or error dopo aver premuto sell

// definisco una funzione che prende in input title, message e variant
showToast(title, message, variant) {
    // shoeToastEvent è un'api fornita da Salseforce per mostrare messaggi popup (toast) di avviso 
    // è un evento e di conseguenza viene inviato da un componente e ascoltata da un altro componente
    const event = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant
    });
    //  this.dispatchEvent(event) scatena l'evento creato sopra, l'evento viene emesso dal componente altri componenti lo ascoltano e possono reagire di conseguenza, in questo caso mostrano un toast
    this.dispatchEvent(event);
}

}