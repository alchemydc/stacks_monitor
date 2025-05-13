# Stacks Monitor Project Brief
ref: https://docs.cline.bot/getting-started/getting-started-new-coders/our-favorite-tech-stack
ref: https://docs.cline.bot/improving-your-prompting-skills/cline-memory-bank#memory-bank-files-explained

## Overview
Build an app that will continuously monitor the performance of a signer on the Stacks blockchain network. 

## Core Features
- Use the stacks API to enumerate data for the current POX cycle
- Use the stacks API to enumerate all of the signers active for the current POX cycle
- Allow the user to select a single signer to monitor
- Use the stacks API to fetch signer metrics for a particular signer during the current cycle
- Send alerts if the signer's stacked STX falls below the threshold for the next POX cycle
- Send alerts if the signer's performance (latency or rejected/missing blocks rate) falls outside acceptable thresholds
- Send an alert when the prepare phase of the next POX cycle is about to begin

## Target Users
This app will be used by pool operators on the Stacks network.  The target users are technical and are responsible for both the economic and technical performance of the pool and supporting infrastructure

## Technical Preferences
- Typescript
- Vite and React frameworks
- Tailwind CSS
- sqlite db for dev/testing.  May migrate to Supabase for production
- Docker for packaging and deployment for dev/test. May migrate to Vercel for production.
- Github for version control
