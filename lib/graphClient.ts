
import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import "isomorphic-fetch";

const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_CLIENT_ID;
const clientSecret = process.env.AZURE_CLIENT_SECRET;

if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Missing Azure environment variables");
}

// 1. Create the credential
const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

// 2. Create the Auth Provider using the dedicated Graph class
// This solves the 'done' implicit any and type mismatch issues
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ["https://graph.microsoft.com/.default"],
});

// 3. Initialize the client
export const graphClient = Client.initWithMiddleware({
    authProvider: authProvider,
});