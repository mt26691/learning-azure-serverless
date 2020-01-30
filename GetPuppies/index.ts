import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import { MongoClient } from 'mongodb';
const auth = {
    user: process.env.CosmosDBUser,
    password: process.env.CosmosDBPassword
}


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    
    MongoClient.connect(`mongodb://${process.env.CosmosDBUser}:${process.env.CosmosDBPassword}@mt2606.documents.azure.com:10255/?ssl=true`, { auth: auth }, function (err, db) {
        if (err) {
            context.res = {
                status: 400,
                body: "Can't connect"
            };
            throw err;
        }

        console.log('Connected mongodb client');

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Connected mongodb client"
        };
        db.close();
        context.done();
    });


};

export default httpTrigger;
