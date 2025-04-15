# Active Context

## Current Work Focus
Adding support for displaying signer metrics

## Recent Changes
- Created the initial memory bank files: `productContext.md`, `systemPatterns.md`, and `techContext.md`.
- Documented the project overview, system architecture, and technical context.
- Read all memory bank files.
- Implemented the Stacks API integration to fetch data from the /v2/pox endpoint and generalized the function to return all data.
- Added a link to the POX info page from the landing page using React Router.
- Created a reusable component for styled links (`StyledLink.tsx`).
- Fixed the TypeScript errors related to the `PoxResponse` type in `src/main.tsx` and `src/components/PoxDataDisplay.tsx`.
- Implemented the SignerSelector component to allow users to select a single signer to monitor.
- Created a new component called `SignerDetails` to show the details for a selected signer.
- Created a new API call to fetch signer metrics for a particular signer during the current cycle.

## Next Steps
1. Update the `SignerDetails` component to display the signer metrics.
2. Work on the UI to make it less buggy and better looking.
2. Set up the SQLite database for storing user preferences and historical data.
3. Implement the alert system.

## Active Decisions and Considerations
- **API Endpoints**:
  - Base API URI: `https://api.hiro.so`
  - `/v2/pox`: Used to determine the current POX data.
  - `/signer-metrics/v1/cycles/{currentCycle}/signers`: Used to get info about all of the signers that are active for a given POX cycle.
- **Data Structure**:
  - The data structure for POX data is defined by the `PoxResponse` interface in `src/services/StacksAPIService.ts`.
  - The data structure for signer data is defined by the `CycleSigner` and `Signer` interfaces in `src/services/StacksAPIService.ts`.
  - Note: The signers API may sometimes return no results despite a HTTP 200 OK response.
- **Alert Thresholds**:
  - STX Balance: 100,000 STX
  - Latency: 500ms
  - Block Participation Rate: 95%
- **Notification Mechanism**: Discord

## Important Patterns and Preferences
- Use TypeScript for all code.
- Follow the component-based architecture with React.
- Use Tailwind CSS for styling.
- Document all code thoroughly.

## Learnings and Project Insights
- The Stacks Signer API provides comprehensive data about signers on the Stacks blockchain.
- Tailwind CSS enables rapid UI development with consistent design patterns.
- The Stacks API integration now correctly fetches signer data using the `/v2/pox` endpoint to determine the current cycle.

## Recent Documentation Updates
- Reviewed all memory bank files on 2025-04-04.
