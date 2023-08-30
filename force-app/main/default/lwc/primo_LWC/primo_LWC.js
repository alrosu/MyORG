// è l'importa della lbreria per l'lwc
import { LightningElement } from 'lwc';

export default class Primo_LWC extends LightningElement {
    // qua definisco le mie funzioni 
    prima = false;
    seconda = false;
    terza = false;
    //citta=this.template.querySelector("lightning-button");
    

    //creazione funzioni
    mostra(event){
        // richiamo l'html per fare i case sulla label
        var citta= event.target.label;
        switch(citta){
           case "Roma":
            this.prima=true;
            this.seconda=false;
            this.terza=false;
            break;
            case "Napoli":
            this.seconda=true;
            this.prima=false;
            this.terza=false;
            break;
            case "Milano":
            this.terza=true;
            this.seconda=false;
            this.prima=false;
            break;

        }
        



    }
}