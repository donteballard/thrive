# Thrive - Technology Stack and Packages

## Frontend Stack

### Core Framework
- Next.js 13+ (React 18+)
- TypeScript
- TailwindCSS
- Shadcn/ui

### State Management
- Redux Toolkit
- React Query

### Wallet Integration
- @solana/web3.js
- @solana/wallet-adapter-react
- @solana/wallet-adapter-wallets

### UI/UX Components
- Framer Motion (animations)
- Chart.js (data visualization)
- React Icons
- React Hook Form
- Zod (validation)

### AI Integration
- OpenAI API
- TensorFlow.js (client-side ML)
- LangChain (AI orchestration)

## Backend Stack

### API Layer
- Node.js
- Express.js
- TypeScript
- GraphQL (Apollo Server)

### Database
- PostgreSQL (primary database)
- Redis (caching)
- MongoDB (activity feeds)

### Blockchain
- Solana Program Library (SPL)
- Anchor Framework
- Metaplex (NFTs)

### AI/ML Services
- OpenAI GPT-4
- TensorFlow
- Scikit-learn
- Pandas

### Cloud Infrastructure
- AWS
  - EC2 (compute)
  - RDS (database)
  - S3 (storage)
  - CloudFront (CDN)
  - Lambda (serverless)

### DevOps
- Docker
- GitHub Actions
- Jest (testing)
- Cypress (E2E testing)

## Smart Contract Development

### Solana Tools
- Anchor Framework
- Solana CLI
- SPL Token Program
- Metaplex
- Solana Program Library

### Development Tools
- Rust
- Anchor
- Solana Web3.js

## Security

### Authentication
- JWT
- Wallet signatures
- OAuth 2.0

### Encryption
- bcrypt
- AES-256
- SSL/TLS

## External APIs

### Health Integration
- Fitbit API
- Apple HealthKit
- Google Fit
- Strava API

### Financial Services
- CoinGecko API
- Chainlink (price feeds)
- Jupiter (DEX aggregator)

### Analytics
- Google Analytics
- Mixpanel
- Amplitude

## Development Tools

### IDE and Extensions
- VS Code
- Rust Analyzer
- Solidity
- ESLint
- Prettier

### Version Control
- Git
- GitHub
- Conventional Commits

### Documentation
- Swagger/OpenAPI
- TypeDoc
- Storybook

## Package Versions

```json
{
  "dependencies": {
    "next": "^13.4.0",
    "react": "^18.2.0",
    "typescript": "^5.0.0",
    "@solana/web3.js": "^1.75.0",
    "@solana/wallet-adapter-react": "^0.15.32",
    "tailwindcss": "^3.3.0",
    "@reduxjs/toolkit": "^1.9.5",
    "react-query": "^3.39.3",
    "framer-motion": "^10.12.0",
    "chart.js": "^4.3.0",
    "openai": "^3.2.1",
    "langchain": "^0.0.92"
  },
  "devDependencies": {
    "jest": "^29.5.0",
    "cypress": "^12.11.0",
    "eslint": "^8.39.0",
    "prettier": "^2.8.8"
  }
} 