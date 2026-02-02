#!/bin/bash

# What's Up? - Start Server Script
# Starts a local HTTP server on port 8000

PORT=8000
DIR="$(cd "$(dirname "$0")" && pwd)"

# Check if server is already running
if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "Server is already running on port $PORT"
    echo "Open http://localhost:$PORT in your browser"
    exit 0
fi

echo "Starting What's Up? server..."
echo "Open http://localhost:$PORT in your browser"
echo "Press Ctrl+C to stop the server"
echo ""

cd "$DIR"
python3 -m http.server $PORT
