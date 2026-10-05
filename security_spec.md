# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Zero PII in Public Collections**: Neither `/leaderboard/{userId}` nor `/rooms/{roomId}` may contain email addresses, phone numbers, or physical addresses.
2. **Identity & Ownership**:
   - A `/leaderboard/{userId}` document can only be created or updated when `request.auth.uid == userId`, `incoming().userId == userId`, and `request.auth.token.email_verified == true`.
   - A `/rooms/{roomId}` document can only be created when `incoming().hostId == request.auth.uid`, `incoming().roomId == roomId`, and `incoming().status == 'waiting'`.
3. **Immutable & Temporal Fields**:
   - `createdAt` must equal `request.time` on creation and cannot be modified on update (`incoming().createdAt == existing().createdAt`).
   - `updatedAt` must equal `request.time` on both creation and update.
   - `userId` in `/leaderboard/{userId}` and `roomId`, `roomCode`, `hostId`, `hostName`, `category` in `/rooms/{roomId}` are immutable once created.
4. **Terminal State Locking**:
   - Once `/rooms/{roomId}` reaches `existing().status == 'completed'`, no further updates are permitted.
5. **Query Enforcement (`allow list`)**:
   - Blanket `allow list: if isSignedIn();` is strictly forbidden. Every `list` query must satisfy `resource.data.visibility == 'public'`.

## 2. The "Dirty Dozen" Payloads
1. **Identity Spoofing (Leaderboard Create)**: Authenticated user `uid_attacker` writes to `/leaderboard/uid_victim` with `userId: "uid_victim"`. -> `PERMISSION_DENIED`
2. **Unverified Email Write**: Authenticated user with `email_verified: false` attempts to create `/leaderboard/uid_unverified`. -> `PERMISSION_DENIED`
3. **Shadow Field Injection (Leaderboard Update)**: Owner updates `/leaderboard/uid_1` adding `{ isAdmin: true }`. -> `PERMISSION_DENIED`
4. **Timestamp Forgery**: Owner creates `/leaderboard/uid_1` with a past client timestamp (`createdAt != request.time`). -> `PERMISSION_DENIED`
5. **Immortal Field Mutation**: Owner updates `/leaderboard/uid_1` changing `createdAt` or `userId`. -> `PERMISSION_DENIED`
6. **Denial of Wallet / Oversized String**: Owner updates `displayName` with a 5,000-character string (`> 60`). -> `PERMISSION_DENIED`
7. **Unbounded Array Injection**: Owner updates `unlockedBadges` with 50 items (`> 20`). -> `PERMISSION_DENIED`
8. **ID Poisoning**: Attacker attempts to create `/rooms/bad$id!@#` failing `isValidId()`. -> `PERMISSION_DENIED`
9. **Terminal State Bypass**: Host attempts to update `/rooms/room_1` after `existing().status == 'completed'`. -> `PERMISSION_DENIED`
10. **Unauthorized Room Mutation**: Third-party user `uid_stranger` (neither `hostId` nor `guestId`) attempts to update score on an `active` room. -> `PERMISSION_DENIED`
11. **Value Poisoning on Update**: Host updates `hostScore` with a string `"99999"` instead of an integer. -> `PERMISSION_DENIED`
12. **Unfiltered List Scraping**: Client executes a `list` query on `/leaderboard` without filtering `visibility == 'public'` where a non-public record exists. -> `PERMISSION_DENIED`
