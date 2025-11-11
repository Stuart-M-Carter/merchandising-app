import { Container } from 'inversify';
import { GraphService, type IGraphService } from './graph.service';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../authConfig';
import IDENTIFIERS from './identifiers';

const msalInstance = new PublicClientApplication(msalConfig);

const container = new Container();

container.bind<PublicClientApplication>(IDENTIFIERS.MsalInstance).toConstantValue(msalInstance);

container.bind<IGraphService>(IDENTIFIERS.GraphService).to(GraphService).inSingletonScope();

export { container };
