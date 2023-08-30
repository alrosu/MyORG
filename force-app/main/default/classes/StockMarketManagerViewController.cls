public with sharing class StockMarketManagerViewController {

    // metodo che contiene la formula per calcolare le medie ponderate 
public static Decimal[] calculateWeightedAverage(List<Stock__c> stocks, String fieldName) {
    // imposto numeratore e denominatore a 0
    Decimal totalNumer = 0;
    Decimal totalDenom = 0;

    for (Stock__c stock : stocks) {
          // salvo il valore di starting price e marketWeight
        Decimal marketWeight = stock.MarketWeight__c;
        Decimal value = (Decimal)stock.get(fieldName);

        if (marketWeight != 0) {
            totalNumer += value * marketWeight;
            totalDenom += marketWeight;
        }
    }
    
    // controllo se totalDEnom è diverso da 0 e  calcolo la media ponderata 
    Decimal average = 0;
    if (totalDenom != 0) {
        average = totalNumer / totalDenom;
    }
    return new Decimal[]{average, totalDenom};
}

// metodo per calcolare le medie ponderate 
@AuraEnabled
public static List<Decimal> averagesS() {
    List<Stock__c> stocks = [SELECT StartingPrice__c, ForecastPrice__c, Revenue__c, MarketWeight__c FROM Stock__c];

    // lista di decimal da usare per il ritorno 
    List<Decimal> averages = new List<Decimal>();

    // decimal[] è un array che conterrà due valori: il valore medio calcolato e il denominatore totale utilizzato nel calcolo
    // richiamo il metodo creato sopra e gli do in input la lista dell'oggetto custom e il campo per il quale voglio che calcoli la media ponderata 
    Decimal[] startingValues = calculateWeightedAverage(stocks, 'StartingPrice__c');
    Decimal[] forecastValues = calculateWeightedAverage(stocks, 'ForecastPrice__c');
    Decimal[] revenueValues = calculateWeightedAverage(stocks, 'Revenue__c');
    // .setScale(nr) fa si che dopo la , ci siano solo tot numeri, quindi arrotonda 
    averages.add(startingValues[0].setScale(3));
    averages.add(forecastValues[0].setScale(3));
    averages.add(revenueValues[0].setScale(3));

    return averages;
}

    // metodo per cancellare i record dove marketaction='sell' e ritorna i dati da inseire per aggionare il datatable
    @AuraEnabled
    public static void deleteRecords() {
        List<Stock__c> recordsToDelete = [SELECT Id FROM Stock__c WHERE MarketAction__c = 'SELL'];
        delete recordsToDelete;
        
    
}
// metodo per ricaricare una volta premuto SELL
@AuraEnabled(cacheable=true)
    public static List<stock__c> fetchData() {
        return [select Name, CloseDate__c,StartingPrice__c,Revenue__c,ForecastPrice__c,MarketWeight__c,MarketAction__c from Stock__c];
    }
}
