#!/bin/bash

# What's Up? - Stop Server Script
# Stops the local HTTP server running on port 8000

PORT=8000

# Find and kill the process
PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "No server running on port $PORT"
    exit 0
fi

echo "Stopping server (PID: $PID)..."
kill $PID 2>/dev/null

# Verify it stopped
sleep 0.5
if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "Force stopping..."
    kill -9 $PID 2>/dev/null
fi

echo "Server stopped"
