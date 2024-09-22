#!/bin/bash
# bash bin/canvas-auto-commit.sh

# Check if an argument is passed
if [ -z "$1" ]
then
  echo "Please provide the number of commits as an argument, e.g., ./canvas-auto-commit.sh 10"
  exit 1
fi

# Assign the argument to a variable
commit_count=$1

# Get current date in YYYY-MM-DD format
current_date=$(date +"%Y-%m-%d")

# Create a file with the current date as the name
file_name="$current_date.txt"
cd .. && cd commit-art-canvas && touch "$file_name"

# Loop to make the specified number of commits
for i in $(seq 1 "$commit_count")
do
  # Append a space to the file
  cd .. && cd commit-art-canvas && echo -n " " >> "$file_name"

  # Add the file to the staging area
  cd .. && cd commit-art-canvas && git add "$file_name"

  # Commit the change
  cd .. && cd commit-art-canvas && git commit -m "chore: $i/$commit_count add a space to $file_name"
done

cd .. && cd commit-art-canvas && git push

echo "Done! $commit_count commits have been made."
