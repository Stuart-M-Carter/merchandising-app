import "reflect-metadata";

import { Provider } from 'inversify-react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { container } from "./services/container";

const msalInstance = container.get<PublicClientApplication>(Symbol.for("MsalInstance")) as PublicClientApplication;

msalInstance.initialize().then(() => {
  // Default to using the first account if no account is active on page load
  if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  // Optional - This will update account state if a user signs in from another tab or window
  msalInstance.enableAccountStorageEvents();

  msalInstance.addEventCallback((event:any) => {
    if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS || event.eventType === EventType.SSO_SILENT_SUCCESS) {
      const account = event.payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider container={container}>
      <StyledEngineProvider injectFirst>
        <App instance={msalInstance}/>
      </StyledEngineProvider>
    </Provider>    
  </StrictMode>
  );

});
