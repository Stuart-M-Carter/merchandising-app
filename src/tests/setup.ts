import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import '@testing-library/jest-dom/vitest'; // Optional for 'afterEach' cleanup
import { MsalReactTesterPlugin } from 'msal-react-tester';
import { waitFor } from "@testing-library/react";

expect.extend(matchers);

MsalReactTesterPlugin.init({
  spyOn: vi.spyOn,
  expect: expect,
  resetAllMocks: vi.resetAllMocks,
  waitingFor: waitFor
} as any);
