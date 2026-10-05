/**
 * Phase 0 Security Verification Spec for Firestore Rules ("Dirty Dozen" Payloads)
 */
export interface DirtyPayloadTestCase {
  id: number;
  name: string;
  collection: 'leaderboard' | 'rooms';
  operation: 'create' | 'update' | 'list';
  expectedResult: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_TESTS: DirtyPayloadTestCase[] = [
  { id: 1, name: 'Identity Spoofing on Leaderboard Create', collection: 'leaderboard', operation: 'create', expectedResult: 'PERMISSION_DENIED' },
  { id: 2, name: 'Unverified Email Write Rejection', collection: 'leaderboard', operation: 'create', expectedResult: 'PERMISSION_DENIED' },
  { id: 3, name: 'Shadow Field Injection on Leaderboard Update', collection: 'leaderboard', operation: 'update', expectedResult: 'PERMISSION_DENIED' },
  { id: 4, name: 'Client Timestamp Forgery Rejection', collection: 'leaderboard', operation: 'create', expectedResult: 'PERMISSION_DENIED' },
  { id: 5, name: 'Immortal Field Mutation (createdAt / userId)', collection: 'leaderboard', operation: 'update', expectedResult: 'PERMISSION_DENIED' },
  { id: 6, name: 'Oversized String (>60 chars) Resource Exhaustion', collection: 'leaderboard', operation: 'update', expectedResult: 'PERMISSION_DENIED' },
  { id: 7, name: 'Unbounded Array (>20 items) Rejection', collection: 'leaderboard', operation: 'update', expectedResult: 'PERMISSION_DENIED' },
  { id: 8, name: 'Path Variable ID Poisoning Guard', collection: 'rooms', operation: 'create', expectedResult: 'PERMISSION_DENIED' },
  { id: 9, name: 'Terminal State Locking (status == completed)', collection: 'rooms', operation: 'update', expectedResult: 'PERMISSION_DENIED' },
  { id: 10, name: 'Unauthorized Third-Party Room Score Update', collection: 'rooms', operation: 'update', expectedResult: 'PERMISSION_DENIED' },
  { id: 11, name: 'Value Poisoning on Whitelisted Key', collection: 'rooms', operation: 'update', expectedResult: 'PERMISSION_DENIED' },
  { id: 12, name: 'Query Enforcer Check on List Operation', collection: 'leaderboard', operation: 'list', expectedResult: 'PERMISSION_DENIED' },
];
