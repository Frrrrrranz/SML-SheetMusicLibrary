# Workflow

## Git Commit Email Policy

To avoid GitHub push rejection (`GH007: publish a private email address`), this repository must use the GitHub noreply email for commits.

- Required email: `Frrrrrranz@users.noreply.github.com`
- Scope: repository local config

### One-time setup (this repo)

```bash
git config user.name "35221"
git config user.email "Frrrrrranz@users.noreply.github.com"
```

### Verify before push

```bash
git config --get user.name
git config --get user.email
git log -1 --pretty=format:"%an <%ae>"
```

Expected latest commit email: `Frrrrrranz@users.noreply.github.com`

### If push was rejected by GH007

```bash
git config user.email "Frrrrrranz@users.noreply.github.com"
git commit --amend --no-edit --reset-author
git push origin main
```

### Optional: make it global

```bash
git config --global user.email "Frrrrrranz@users.noreply.github.com"
```

