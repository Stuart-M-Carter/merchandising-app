import router from './router';
import './App.css'
import { RouterProvider } from 'react-router';
import { AuthenticatedTemplate, MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { loginRequest } from './authConfig';

function App({ instance }: { instance: PublicClientApplication }) {

  //const { instance, inProgress } = useMsal(); 

  return (
    <MsalProvider instance={instance}>
        <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={loginRequest}>
        <AuthenticatedTemplate>
            <RouterProvider router={router} />
        </AuthenticatedTemplate>
      </MsalAuthenticationTemplate>
    </MsalProvider>
  )
}

export default App;
