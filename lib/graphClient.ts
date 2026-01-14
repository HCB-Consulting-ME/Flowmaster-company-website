import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import "isomorphic-fetch";

let _graphClient: Client | null = null;

function getGraphClient(): Client {
    if (_graphClient) {
        return _graphClient;
    }

    const tenantId = process.env.AZURE_TENANT_ID;
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;

    if (!tenantId || !clientId || !clientSecret) {
        throw new Error("Missing Azure environment variables");
    }

    // 1. Create the credential
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    // 2. Create the Auth Provider using the dedicated Graph class
    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
        scopes: ["https://graph.microsoft.com/.default"],
    });

    // 3. Initialize the client
    _graphClient = Client.initWithMiddleware({
        authProvider: authProvider,
    });

    return _graphClient;
}

// Export a proxy that lazily initializes the client
export const graphClient = new Proxy({} as Client, {
    get(_target, prop) {
        const client = getGraphClient();
        const value = client[prop as keyof Client];
        if (typeof value === 'function') {
            return value.bind(client);
        }
        return value;
    }
});