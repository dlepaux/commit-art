#!/bin/bash
# bash bin/canvas-initialization.sh
set -e

# Load .env
if [ -r ".env" ]; then
  source .env
fi

# Create ssh keys
mkdir "~/.ssh"

echo "$DEPLOY_KEY_PRIVATE" > "~/.ssh/id_ed25519"
echo "$DEPLOY_KEY_PUBLIC" > "~/.ssh/id_ed25519.pub"

# Fix the permissions after copy
chmod 600 "~/.ssh/id_ed25519"
chmod 600 "~/.ssh/id_ed25519.pub"

# Add ssh config to ignore prompt
cp assets/ssh/config "~/.ssh/config"

# Create minimal .gitconfig 
git config --global user.name "$GIT_CONFIG_NAME"
git config --global user.username "$GIT_CONFIG_USERNAME"
git config --global user.email "$GIT_CONFIG_EMAIL"

# Activate ssh agent and add the key to it
eval "$(ssh-agent -s)"
ssh-add "~/.ssh/id_ed25519"

# Test connexion to github
ssh -T git@github.com

# Clone canvas repository
cd .. && git clone "$GIT_SSH_CANVAS" commit-art-canvas
