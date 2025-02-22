#!/bin/bash

while true; do
    # Get the PIDs of all dotnet processes
    PIDS=$(pgrep dotnet)
    
    # Check if there are any dotnet processes
    if [ -n "$PIDS" ]; then
        echo "Killing dotnet processes: $PIDS"
        # Kill all dotnet processes
        echo $PIDS | xargs kill -9
    else
        echo "No dotnet processes found."
    fi
    
    # Wait for 5 seconds before checking again
    sleep 5
done
