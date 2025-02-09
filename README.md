# steel-bot

A Discord bot that automatically creates GitHub issues from Discord messages. The project consists of:
- An API built with Fastify, Discord.js, and TypeScript
- A modern UI dashboard built with Next.js and TypeScript

## Features

- Listens to Discord messages in configured channels
- Saves messages to a database using Prisma
- Automatically creates GitHub issues from saved messages
- RESTful API endpoints for message management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Discord bot token
- GitHub access token
- Docker and Docker Compose (for containerized deployment)

## Environment Variables

Create `.env` files in both `api/` and `ui/` directories:

### API Environment Variables
```env
DISCORD_TOKEN=your_discord_bot_token
GITHUB_TOKEN=your_github_token
DATABASE_URL=your_postgresql_database_url
```

### UI Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Installation

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/your-username/steel-bot.git
cd steel-bot
```

2. Start the services:
```bash
docker-compose up -d
```

The API will be available at http://localhost:3000 and the UI at http://localhost:3001

### Manual Installation

1. Clone and set up the API:
```bash
git clone https://github.com/your-username/steel-bot.git
cd steel-bot/api
npm install
npm run prisma:generate
npm run prisma:migrate
```

2. Set up the UI:
```bash
cd ../ui
npm install
```

## Development

### API Development
```bash
cd api
npm run dev
```

### UI Development
```bash
cd ui
npm run dev
```

## Production

### Using Docker
```bash
docker-compose -f docker-compose.yml up -d
```

### Manual Deployment
Build and start the API:
```bash
cd api
npm run build
npm start
```

Build and start the UI:
```bash
cd ui
npm run build
npm start
```

## Available Scripts

### API Scripts
- `npm run dev` - Start development server with hot reload
- `npm run start` - Start production server
- `npm run build` - Build the TypeScript project
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### UI Scripts
- `npm run dev` - Start Next.js development server
- `npm run build` - Build the Next.js application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

### API
- `api/src/index.ts` - Main API entry point
- `api/src/lib/` - Core utilities (Discord client, GitHub integration)
- `api/src/services/` - Business logic services
- `api/src/modules/` - Route handlers and API endpoints

### UI
- `ui/src/app/` - Next.js application code
- `ui/src/app/components/` - Reusable React components
- `ui/src/app/types/` - TypeScript type definitions
- `ui/src/app/data/` - Data fetching and state management

## License

ISC
