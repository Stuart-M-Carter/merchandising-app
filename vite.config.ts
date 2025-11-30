import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { MsalReactTesterPlugin } from 'msal-react-tester';
import { vi, expect } from 'vitest';

MsalReactTesterPlugin.init({
  spyOn: vi.spyOn,
  expect: expect,
  resetAllMocks: vi.resetAllMocks
} as any);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ tsDecorators: true })],
    test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'], // Path to your setup file
  } ,
} as UserConfig)

// export default defineConfig({
//   plugins: [react({ tsDecorators: true })],
// })
