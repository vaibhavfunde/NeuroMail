import { EmailMessage } from "@/type";
import axios from "axios";


export class Account {
    private token :string;
    constructor(token: string) {
        this.token = token;
    }

    private async startSync() {
       const response= await axios.post<SyncResponse>('https://api.aurinko.io/v1/email/sync',{},{
        headers: { Authorization: `Bearer ${this.token}` }, params: {
            daysWithin:2,
            bodyType: 'html'
        }
       })
       return response.data;
    }


    async getUpdatedEmails({ deltaToken, pageToken }: { deltaToken?: string, pageToken?: string }): Promise<SyncUpdatedResponse> {
        // console.log('getUpdatedEmails', { deltaToken, pageToken });
        let params: Record<string, string> = {};
        if (deltaToken) {
            params.deltaToken = deltaToken;
        }
        if (pageToken) {
            params.pageToken = pageToken;
        }
        const response = await axios.get<SyncUpdatedResponse>(
            `https://api.aurinko.io/v1/email/sync/updated`,
            {
                params,
                headers: { Authorization: `Bearer ${this.token}` }
            }
        );
        return response.data;
    } 
    async performInitialSync() {
    try {
        let syncResponse = await this.startSync();
        while (!syncResponse.ready) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            syncResponse = await this.startSync();
        }

        // get the bookmark delta token 
        let storeDeltaToken:string = syncResponse.syncUpdatedToken;
         let updatedResponse = await this.getUpdatedEmails({ deltaToken: storeDeltaToken });

         if(updatedResponse.nextDeltaToken){
            //sync has completed

            storeDeltaToken=updatedResponse.nextDeltaToken;
         }
         let allEmails :EmailMessage[] = updatedResponse.records;
         while(updatedResponse.nextPageToken){
             updatedResponse = await this.getUpdatedEmails({pageToken: updatedResponse.nextPageToken});
             allEmails= allEmails.concat(updatedResponse.records);
             if(updatedResponse.nextDeltaToken){
                //sync has end
                storeDeltaToken=updatedResponse.nextDeltaToken;
             }
         }
         console.log("initial sync completed",allEmails.length);
         //store a latest delta token for future sync

         return {
            emails: allEmails,
            deltaToken: storeDeltaToken,
        }


    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error during sync:', JSON.stringify(error.response?.data, null, 2));
        } else {
            console.error('Error during sync:', error);
        }
    }
    }


}