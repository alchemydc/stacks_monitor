# Tech Context

## Technologies Used
- **TypeScript**: Primary programming language for type safety and maintainability
- **Next.js**: React framework with app router for building the user interface
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **SQLite**: Database for development and testing
- **Docker**: Containerization for consistent environments
- **GitHub**: Version control and collaboration
- **Stacks Signer API**: For interacting with the Stacks blockchain

## Development Setup
1. **Install Node.js and npm**: Ensure you have Node.js and npm installed on your system.
2. **Clone the Repository**: Clone the project repository from GitHub.
3. **Install Dependencies**: Run `npm install` to install project dependencies.
4. **Configure Environment Variables**: Set up any necessary environment variables, such as API keys or database connection strings.
5. **Run the Development Server**: Start the development server using `npm run dev`.

## Technical Constraints
- **Stacks API Rate Limits**: Be mindful of rate limits when interacting with the Stacks API. Implement caching or other strategies to avoid exceeding these limits.
- **Blockchain Data Consistency**: Ensure data consistency when retrieving and displaying information from the Stacks blockchain.
- **Security**: Implement appropriate security measures to protect user data and prevent unauthorized access.
- **Performance**: Optimize the application for performance, especially when monitoring multiple signers in real-time.

## Dependencies
- **axios**: For making HTTP requests to the Stacks API
- **react**: For building the user interface
- **next**: For the Next.js framework
- **tailwindcss**: For styling the application
- **sqlite3**: For interacting with the SQLite database

## Tool Usage Patterns
- **VS Code**: Recommended IDE for development
- **npm**: Package manager for installing dependencies and running scripts
- **Docker**: For building and running containerized applications
- **Git**: For version control and collaboration
