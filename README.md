# FluxSpace

FluxSpace is a multi-tenant SaaS platform for social media content creation, integrating OpenAI, Canva, and Meta.

## Features

- **Multi-tenant Workspaces**: Manage multiple brands and teams.
- **Content Wizard**: Streamlined flow from Brief -> AI -> Design -> Schedule.
- **AI Integration**: Generate captions and image prompts using OpenAI.
- **Canva Connect**: Create and edit designs directly within FluxSpace.
- **Meta Scheduling**: Schedule posts to Instagram and Facebook.

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL

### Installation

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Set up environment variables:
    Copy `.env.example` to `.env` and fill in your API keys.
    ```env
    DATABASE_URL="postgresql://..."
    OPENAI_API_KEY="..."
    CANVA_CLIENT_ID="..."
    CANVA_CLIENT_SECRET="..."
    META_APP_ID="..."
    ```

3.  Initialize the database:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

## Architecture

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Radix UI.
- **Backend**: Next.js API Routes.
- **Database**: PostgreSQL, Prisma ORM.
- **Auth**: Custom JWT/Session mock (replace with NextAuth in production).

## Project Structure

- `/app`: Next.js App Router pages and API routes.
- `/components`: Reusable UI components.
- `/lib`: Utility functions (DB, Auth).
- `/prisma`: Database schema.
