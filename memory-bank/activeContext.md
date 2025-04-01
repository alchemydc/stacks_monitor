# Active Context

## Current Work Focus
- Setting up the basic project structure with Next.js, TypeScript, and Tailwind CSS.
- Integrating with the Stacks POX api
- Implementing the signer selection component.

## Recent Changes
- Created the initial memory bank files: `productContext.md`, `systemPatterns.md`, and `techContext.md`.
- Documented the project overview, system architecture, and technical context.
- Read all memory bank files.
- Implemented the Stacks API integration to fetch data from the /v2/pox endpoint.
- Generalized the fetchCurrentCycle function to return all data from /v2/pox and renamed it to fetchPoxData.

## Next Steps
1. Build the SignerSelector component to allow users to select signers to monitor.
2. Create the SignerList component to display the selected signers and their data.
3. Set up the SQLite database for storing user preferences and historical data.

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
- Next.js App Router simplifies the development of server-rendered React applications.
- Tailwind CSS enables rapid UI development with consistent design patterns.
- The Stacks API integration now correctly fetches signer data using the `/v2/pox` endpoint to determine the current cycle.
