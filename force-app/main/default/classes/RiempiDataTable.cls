public with sharing class RiempiDataTable {
    @AuraEnabled  //servirà anche se siamo su LWC
    public static List<Account> riempiDTacc() {
        return [select id, name, phone, billingCity, industry from Account];

    }
    @AuraEnabled  //servirà anche se siamo su LWC
    public static List<Opportunity> riempiDTopp() {
        return [select id, name, stageName, amount, closeDate from Opportunity where stageName = 'Closed Won'];
    }
}