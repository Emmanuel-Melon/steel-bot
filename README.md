# steel-bot

A Discord bot that automatically creates GitHub issues from Discord messages. Built with Fastify, Discord.js, and TypeScript.

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

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DISCORD_TOKEN=your_discord_bot_token
GITHUB_TOKEN=your_github_token
DATABASE_URL=your_postgresql_database_url
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/steel-bot.git
cd steel-bot
```

2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Run database migrations:

```bash
npm run prisma:migrate
```

## Development

Start the development server with hot reload:

```bash
npm run dev
```

## Production

Build and start the production server:

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run start` - Start production server
- `npm run build` - Build the TypeScript project
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Project Structure

- `src/index.ts` - Main application entry point
- `src/lib/` - Core utilities (Discord client, GitHub integration)
- `src/services/` - Business logic services
- `src/modules/` - Route handlers and API endpoints

## License

ISC
