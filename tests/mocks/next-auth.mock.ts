import { Session } from 'next-auth';
import { createMockSession } from '../utils/test-helpers';

/**
 * Mock helpers para next-auth
 */

let mockSessionData: Session | null = null;

export function setMockSession(session: Session | null) {
  mockSessionData = session;
}

export function getMockSession() {
  return mockSessionData;
}

export function mockUseSession(session?: Session | null) {
  const sessionData = session !== undefined ? session : mockSessionData;
  
  return {
    data: sessionData,
    status: sessionData ? 'authenticated' : 'unauthenticated',
    update: jest.fn(),
  };
}

export function resetMockSession() {
  mockSessionData = null;
}
