import type { PublicClientApplication } from '@azure/msal-browser';
import { injectable, inject } from 'inversify';
import IDENTIFIERS from './identifiers';


interface IGraphService {
    getUserAvatar(): Promise<string>;
}

@injectable()
class GraphService implements IGraphService {

    static endPoint = "https://graph.microsoft.com";

    private msalInstance: PublicClientApplication;

     constructor(@inject(IDENTIFIERS.MsalInstance) msalInstance: PublicClientApplication) {
         this.msalInstance = msalInstance;
     }

    async getUserAvatar(): Promise<string> {
        // try to find an access token in common places - adjust to your auth flow
        // const accessToken =
        // (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('access_token')) ||
        // (typeof localStorage !== 'undefined' && localStorage.getItem('access_token')) ||
        // (typeof window !== 'undefined' ? (window as any).__ACCESS_TOKEN__ : undefined);

        // if (!accessToken) {
        // return Promise.reject(
        //     new Error(
        //     'No access token found. Store a Graph access token as "access_token" in sessionStorage/localStorage or set window.__ACCESS_TOKEN__.'
        //     )
        // );
        // }

        const response = await this.msalInstance.acquireTokenSilent({scopes: ['user.read']});
        const accessToken = response.accessToken

        const url = `${GraphService.endPoint}/v1.0/me/photo/$value`;

        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Graph API request failed: ${res.status} ${res.statusText}`);
            }

            const contentType = res.headers.get('content-type') || 'image/jpeg';
            const arrayBuffer = await res.arrayBuffer();
            const bytes = new Uint8Array(arrayBuffer);

            // Convert to binary string in chunks to avoid call stack issues for large images
            let binary = '';
            const chunkSize = 0x8000;
            for (let i = 0; i < bytes.length; i += chunkSize) {
                binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
            }

                const base64 = btoa(binary);
                return `data:${contentType};base64,${base64}`;
            } catch (err) {
            return Promise.reject(err);
        }
    }
}

export type { IGraphService };
export { GraphService };