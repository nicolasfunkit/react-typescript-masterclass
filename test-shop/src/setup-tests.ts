import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";

import "./testHelpers"
import "mutationobserver-shim"


expect.extend(matchers);

afterEach(() => {
  cleanup();
});