<!--
PR title: use Conventional Commits, e.g. "fix(calc): apply student loan threshold".
It becomes the commit message on master. See docs/commit-conventions.md.
-->

## Linked issue

<!-- Use a closing keyword so the issue closes automatically on merge. -->

Closes #

## Summary

<!-- What does this change do, and why? Keep it short; link to an ADR or doc for detail. -->

## Verification

<!-- List the commands you ran and anything you checked by hand. Delete lines that do not apply. -->

```sh
npm run lint
npm run format:check
npm run test:run
npm run build
```

## Risk and rollback

<!-- What could break, and who or what is affected? How would we undo this if it goes wrong? -->

- **Risk:**
- **Rollback:**

## Checklist

- [ ] Tests added or updated for changed behaviour (or not applicable)
- [ ] Documentation updated (README, ROADMAP, ADRs, or code comments)
- [ ] Follows naming conventions in `docs/naming-conventions.md`
- [ ] Branch name follows `<type>/<issue-number>-<short-description>`
- [ ] PR title follows Conventional Commits (`<type>(<scope>): <description>`)
