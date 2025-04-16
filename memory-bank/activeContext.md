# Active Context

## Current Work Focus
The UI is under heavy development and requires significant refinement. Current focus areas:
- Improving user experience and navigation flow
- Enhancing visual consistency across components
- Making the UI more intuitive and responsive
- Refining the landing page and signer details pages

## Recent Changes
- Enhanced SignerMetricsTable with sorting functionality:
  - Added ability to sort by Stacked Amount and Response Time
  - Implemented both ascending and descending sort orders
  - Added intuitive sort indicators (↕️ and directional arrows)
  - Made sortable columns visually distinct with hover effects
- Updated response time thresholds and status indicators:
  - 0ms: Red with "DOWN" label
  - >0ms and <10000ms: Green
  - ≥10000ms: Yellow
- Implemented new SignerMetricsTable component that displays metrics for all signers in the current cycle
- Added cycle navigation feature to view historical signer metrics data
- Created direct links from the metrics table to individual signer detail pages
- Enhanced navigation with a dedicated "Metrics" section in the header
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
- Enhanced SignerDetails component with comprehensive improvements:
  - Organized metrics into logical sections (Performance, Staking, Technical)
  - Added visual status indicators for key metrics based on thresholds
  - Implemented loading skeleton animation for better UX
  - Added robust error handling with user-friendly messages
  - Improved responsive design with grid layouts
  - Enhanced dark mode support with better contrast
  - Added proper number formatting and date localization

## Next Steps
1. Set up the SQLite database for storing user preferences and historical data
2. Design and implement the database schema for:
   - User preferences (alert thresholds, notification settings)
   - Historical metrics data for trend analysis
3. Create the AlertsPanel component
4. Implement the alert system with Discord integration

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
  - Response Time: 
    - 0ms: DOWN (Critical)
    - >0ms and <10000ms: Good
    - ≥10000ms: Warning
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
- Updated progress.md and activeContext.md with UI development status and SignerMetricsTable implementation (2025-04-16)
- Updated progress.md and activeContext.md with SignerDetails improvements (2025-04-15)
- Reviewed all memory bank files on 2025-04-04
