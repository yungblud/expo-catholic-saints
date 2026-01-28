#!/bin/bash
# install-skill.sh - Install a skill package into .agents/skills/
# Usage: ./install-skill.sh <source-path-or-git-url> [skill-name]

set -e

SOURCE="$1"
SKILL_NAME="$2"
SKILLS_DIR=".agents/skills"

if [ -z "$SOURCE" ]; then
    echo "Usage: $0 <source-path-or-git-url> [skill-name]"
    echo ""
    echo "Examples:"
    echo "  $0 ./path/to/skill                    # Copy from local directory"
    echo "  $0 https://github.com/org/skill.git   # Clone from Git repository"
    echo "  $0 https://github.com/org/skill.git my-skill  # Clone with custom name"
    exit 1
fi

# Create skills directory if it doesn't exist
mkdir -p "$SKILLS_DIR"

# Determine if source is a Git URL or local path
if [[ "$SOURCE" == http* ]] || [[ "$SOURCE" == git@* ]]; then
    # Git repository
    if [ -z "$SKILL_NAME" ]; then
        # Extract skill name from URL
        SKILL_NAME=$(basename "$SOURCE" .git)
    fi

    TARGET_DIR="$SKILLS_DIR/$SKILL_NAME"

    if [ -d "$TARGET_DIR" ]; then
        echo "Skill '$SKILL_NAME' already exists at $TARGET_DIR"
        echo "To update, use: git -C $TARGET_DIR pull"
        exit 1
    fi

    echo "Cloning skill from $SOURCE..."
    git clone "$SOURCE" "$TARGET_DIR"
else
    # Local directory
    if [ ! -d "$SOURCE" ]; then
        echo "Error: Source directory '$SOURCE' does not exist"
        exit 1
    fi

    if [ -z "$SKILL_NAME" ]; then
        SKILL_NAME=$(basename "$SOURCE")
    fi

    TARGET_DIR="$SKILLS_DIR/$SKILL_NAME"

    if [ -d "$TARGET_DIR" ]; then
        echo "Skill '$SKILL_NAME' already exists at $TARGET_DIR"
        exit 1
    fi

    echo "Copying skill from $SOURCE..."
    cp -r "$SOURCE" "$TARGET_DIR"
fi

# Validate the installed skill
if [ ! -f "$TARGET_DIR/SKILL.md" ]; then
    echo "Warning: SKILL.md not found in $TARGET_DIR"
    echo "The skill may not be properly structured."
fi

if [ ! -d "$TARGET_DIR/rules" ]; then
    echo "Warning: rules/ directory not found in $TARGET_DIR"
    echo "The skill may not have any rules defined."
fi

echo ""
echo "Skill '$SKILL_NAME' installed successfully!"
echo "Location: $TARGET_DIR"
echo ""
echo "Verify installation by asking AI:"
echo "  'What skills are available in this project?'"
