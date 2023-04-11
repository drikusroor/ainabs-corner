---
title: "A ChatGPT prompt generation script to summarize & review the code changes between two branches"
date: "2023-04-11"
categories: 
  - "notebook"
tags: 
  - "chatgpt"
  - "gist"
---


## summareview.sh

```sh
#!/bin/bash

# This script will help you to generate a ChatGPT prompt that you can use to summarize and review the changes between two branches.
# It will prompt you for the feature branch, the branch to compare to, the ticket/story/bug description, and any additional feedback.
# It will then output the changes and the prompt to a file called summareview.txt.

# Get the current branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Prompt for feature branch (default: current branch)
read -p "Enter the feature branch to compare (default: $current_branch): " feature_branch
feature_branch=${feature_branch:-$current_branch}

# Prompt for branch to compare to (default: develop)
read -p "Enter the branch to compare to (default: develop): " compare_branch
compare_branch=${compare_branch:-develop}

# Prompt for ticket/story/bug description
read -p "Enter the ticket/story/bug description: " ticket_description

# Prompt for additional feedback
read -p "Enter any additional feedback (optional): " additional_feedback

# Execute git log command and store the output in a variable
git_log_output=$(git log $compare_branch..$feature_branch --oneline)

# Execute git diff command and store the output in a variable
git_diff_files_output=$(git diff --name-status $compare_branch..$feature_branch -- . ':(exclude)./**/package-lock.json' ':(exclude)./**/composer.lock')

# Execute git diff command and store the output in a variable, excluding package-lock.json and composer.lock
git_diff__lines_output=$(git diff $compare_branch..$feature_branch -- . ':(exclude)./**/package-lock.json' ':(exclude)./**/composer.lock')

# Add ChatGPT prompt
prompt="
Below are the changes between $feature_branch and $compare_branch branches.
Ticket/Story/Bug Description:
$ticket_description
Additional Feedback:
$additional_feedback
Please summarize and review the changes like below in a markdown code block (using backticks!):
\\\`\\\`\\\`md
## 1. Summary (1-2 paragraphs)
Lorem ispum dolor sit amet, consectetur adipiscing elit.
## 2. Changed files
- file1.php
- file2.php
- file3.php
## 3. ChatGPT review of changes and advice for improvement (1-2 paragraphs)
Lorem ispum dolor sit amet, consectetur adipiscing elit.
\\\`\\\`\\\`
"

# Output both variables to summareview.txt
{
  echo "$prompt"
  echo "================="
  echo "Git Log Output:"
  echo "$git_log_output"
  echo ""
  echo "Git Diff Files Output:"
  echo "$git_diff_files_output"
  echo ""
  echo "Git Diff Lines Output:"
  echo "$git_diff__lines_output"
  echo "================="
} > summareview.txt

echo "Changes have been saved to summareview.txt."
```

See also: https://gist.github.com/drikusroor/0c9249b1393306fbce46458a99e9e04f
