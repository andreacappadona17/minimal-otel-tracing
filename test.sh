#!/bin/bash

# Define the frontend service URL (adjust if different)
FRONTEND_URL="http://localhost:3001"

# Loop to send 100 requests to the write endpoint (no need to send numbers as they are generated server-side)
echo "Sending 100 requests to the write endpoint..."
for i in $(seq 1 100); do
  # Send a POST request to the write endpoint to trigger random number generation
  curl -s -X POST "$FRONTEND_URL/write" -d "{}" -H "Content-Type: application/json"

  # Print a message for each request
  echo "Triggered write request #$i"
done

# Wait for a moment to ensure all numbers are written to the database
sleep 2

# Fetch the latest 100 numbers from the read endpoint
echo "Fetching the latest 100 numbers from the read endpoint..."
curl -s "$FRONTEND_URL/read" | jq . # Assuming jq is installed to format the JSON response
