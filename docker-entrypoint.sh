#!/bin/sh
set -e

echo "Starting FlowMaster Website..."

# Check if database exists, if not initialize it
if [ ! -f "/app/data/flowmaster.db" ]; then
    echo "Initializing database..."
    cd /app
    npx prisma db push
    echo "Seeding database..."
    npx tsx prisma/seed.ts
    echo "Database initialized and seeded!"
fi

echo "Starting Next.js server..."
exec node server.js
