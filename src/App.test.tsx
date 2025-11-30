import { render, screen } from '@testing-library/react';
import App from './App';
import { MsalReactTester } from 'msal-react-tester';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import { type IGraphService, GraphService } from './services/graph.service';
import IDENTIFIERS from './services/identifiers';

const container = new Container();

vi.mock('./services/graph.service');

container.bind<IGraphService>(IDENTIFIERS.GraphService).to(GraphService).inSingletonScope();

describe('App', () => {

    let msalTester: MsalReactTester;

  beforeAll(() => {
    msalTester = new MsalReactTester();
    msalTester.spyMsal(); // Mocks all required MSAL React methods & events
  });

  beforeEach(() => {
    vi.clearAllMocks(); // Clears call info but keeps implementations
  });

  afterEach(() => {
    msalTester.resetSpyMsal();
  });

  it('renders the Merchandising text', async () => {

    await msalTester.isLogged();

    render(
    <Provider container={container}>
      <App instance={msalTester.client as any}/>
    </Provider>
  );
  
    await msalTester.waitForRedirect();

    // Use a query from React Testing Library to find the element
    const linkElement = screen.getByText(/Merchandising/i);
    // Use a jest-dom matcher to check if it's in the document
    expect(linkElement).toBeInTheDocument();
  });
});