# Active Context

## Current Work Focus
- Setting up the basic project structure with Next.js, TypeScript, and Tailwind CSS.
- Integrating with the Stacks Signer API to fetch signer data.
- Implementing the signer selection component.

## Recent Changes
- Created the initial memory bank files: `productContext.md`, `systemPatterns.md`, and `techContext.md`.
- Documented the project overview, system architecture, and technical context.

## Next Steps
1. Implement the Stacks API integration to fetch signer data.
2. Build the SignerSelector component to allow users to select signers to monitor.
3. Create the SignerList component to display the selected signers and their data.
4. Set up the SQLite database for storing user preferences and historical data.

## Active Decisions and Considerations
- **API Endpoint**: Determine the correct Stacks API endpoint for fetching signer data.
- **Data Structure**: Define the data structure for storing signer information in the database.
- **Alert Thresholds**: Determine appropriate default alert thresholds for STX balance, latency, and block participation rate.
- **Notification Mechanism**: Decide on the best way to deliver alerts to users (e.g., email, push notifications).

## Important Patterns and Preferences
- Use TypeScript for all code.
- Follow the component-based architecture with React.
- Use Tailwind CSS for styling.
- Document all code thoroughly.

## Learnings and Project Insights
- The Stacks Signer API provides comprehensive data about signers on the Stacks blockchain.
- Next.js App Router simplifies the development of server-rendered React applications.
- Tailwind CSS enables rapid UI development with consistent design patterns.
