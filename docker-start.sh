#!/bin/bash

# FlowMaster Docker Start Script
# Usage: ./docker-start.sh [dev|prod]

MODE=${1:-prod}

echo "=========================================="
echo "   FlowMaster Website - Docker Launcher"
echo "=========================================="

case $MODE in
  dev)
    echo "Starting in DEVELOPMENT mode..."
    echo "Hot reload enabled - changes will reflect automatically"
    docker-compose --profile dev up flowmaster-dev
    ;;
  prod)
    echo "Starting in PRODUCTION mode..."
    docker-compose up -d flowmaster-web
    echo ""
    echo "Container started in background."
    echo "View logs: docker-compose logs -f flowmaster-web"
    ;;
  build)
    echo "Building Docker images..."
    docker-compose build
    ;;
  stop)
    echo "Stopping all containers..."
    docker-compose down
    ;;
  logs)
    echo "Showing logs..."
    docker-compose logs -f
    ;;
  *)
    echo "Usage: ./docker-start.sh [dev|prod|build|stop|logs]"
    echo ""
    echo "Commands:"
    echo "  dev   - Start in development mode with hot reload"
    echo "  prod  - Start in production mode (default)"
    echo "  build - Build Docker images"
    echo "  stop  - Stop all containers"
    echo "  logs  - Show container logs"
    exit 1
    ;;
esac

echo ""
echo "=========================================="
echo "Access the website at: http://localhost:3000"
echo "Admin panel: http://localhost:3000/admin/login"
echo ""
echo "Login credentials:"
echo "  Email: admin@flow-master.ai"
echo "  Password: admin123"
echo "=========================================="
