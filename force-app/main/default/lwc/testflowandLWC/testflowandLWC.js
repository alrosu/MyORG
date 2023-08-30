import { LightningElement} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
 
 
export default class ContactToastMsgLWC extends NavigationMixin(LightningElement){
 
handleStatusChange(event) {
    console.log("event detail",event.detail.status);
 
if(event.detail.status === "FINISHED") {
 
    //Get the flow output variable and store it.
    const outputVariables = event.detail.outputVariables;
             for(let i= 0; i < outputVariables.length; i++) {
                const outputVar = outputVariables[i];
                //contactId is a variable created in flow.
                if(outputVar.name === 'ContactId') {
                    console.log(outputVar.value);
                    if(outputVar.value != null){
                    //Call ShowToast Function
                    this.showToast("Success","Contact Created Sucessfully","success");
                    //Pass the contactId variable value to navigateToRecord.
                    this.navigateToRecord(outputVar.value);
 
                    }else{
                        console.log('contact is not created');
                    }
                     
                }
            }
}
 
if(event.detail.status === "ERROR") {
  this.showToast("error","Error occurred while creation of contact","error");
}
}
//Toast Message
showToast(title,message,variant) {
    const evt = new ShowToastEvent({
        title,
        message,
        variant
    });
    this.dispatchEvent(evt)
}
//Navigate to contact detail page.
navigateToRecord(recordId) {
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId,
            actionName: 'view'
        }
    });
}
}