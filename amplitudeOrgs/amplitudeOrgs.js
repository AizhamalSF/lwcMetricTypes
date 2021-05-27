import { LightningElement, api, wire } from 'lwc';
import getAllOrgs from '@salesforce/apex/AmplitudeHelper.getAllOrg';

export default class AmplitudeOrgs extends LightningElement {
    @api recordId;

    orgs = {};
    options = [{label:'', value:''}];
    selectedOrgMatrics = [];
    // metricsKeys = [];
    totalUser;
    showDetails = false;

    // wire adapter to call apex and passing account id
    @wire(getAllOrgs, { accId:'$recordId' })
    wiredAllOrg({ error, data }){
        
        if(data){
            this.orgs = data;
            // building org name select list options
            for(let key in this.orgs){
                
                let org = this.orgs[key]['org'];
                this.options = [...this.options, {label:org.Name, value:org.Id}];
            }
        }

    };

    handleOrgChange(event){
        let orgId = event.target.value;
        // org is selected
        if(orgId){
            // showing metrics
            this.showDetails = true;
            // bliding matrics strings to print
            for(let key in this.orgs[key]['metrics']) {
                this.selectedOrgMatrics.push(key+': '+ this.orgs[orgId]['metrics'][key]);
            }
            // this.selectedOrgMatrics = this.orgs[orgId]['org']['Amplitude_Org_Metrics__r'];
            this.totalUser = this.orgs[orgId]['totalUsers'];
        } else {
            // clearing out the values when no org is selected
            this.showDetails =  false;
            this.totalUser = undefined;
            this.selectedOrgMatrics = [];
            
        }
    }
}