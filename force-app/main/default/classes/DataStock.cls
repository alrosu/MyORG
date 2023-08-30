public with sharing class DataStock {
    // metodo per riempire il datatable con i dati presenti nell'oggetto custom Stock__c
    @AuraEnabled(cacheable = true) //servirà anche se siamo su LWC
    public static List<Stock__c> getStock() {
        return [select Name, CloseDate__c,StartingPrice__c,Revenue__c,ForecastPrice__c,MarketWeight__c,MarketAction__c from Stock__c];

    }
}