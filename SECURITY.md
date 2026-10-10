# Security Policy

Thank you for helping keep this project and its users safe. This document
explains how to report a security vulnerability and what happens after you do.

## Reporting A Vulnerability

**Do not report security vulnerabilities through public GitHub issues, pull
requests, or discussions.** Public reports expose the problem before it can be
fixed.

Report privately through GitHub instead:

1. Go to the repository's
   [Security tab](https://github.com/axelcouldrey/Tax-Application/security).
2. Select **Report a vulnerability**.
3. Fill in the form. Only the maintainer can see your report.

Please include as much of the following as you can:

- the type of problem, for example cross-site scripting or exposed secrets
- the affected file paths, commit, or version
- step-by-step instructions to reproduce it
- the impact: what an attacker could do with it
- a proof of concept, if you have one

Please do not access, modify, or delete data that does not belong to you, and
do not run tests that could degrade the service for others.

## What Happens Next

This is a project maintained by one person, so the timings below are targets,
not guarantees.

| Step                  | Target                                         |
| --------------------- | ---------------------------------------------- |
| Acknowledge receipt   | Within 7 days                                  |
| Initial assessment    | Within 14 days: confirmed or not, and severity |
| Fix for critical/high | As soon as possible, aiming for 30 days        |
| Fix for medium/low    | In a future release, aiming for 90 days        |

The process:

1. The report is reviewed in a private GitHub security advisory, where we can
   discuss it with you.
2. If confirmed, the fix is developed privately and released as a new PATCH
   version (see [versioning-and-releases.md](docs/versioning-and-releases.md)).
3. The advisory is then published, with release notes listing the fix under
   **Security**. A CVE identifier is requested where appropriate.
4. You are credited in the advisory, unless you prefer to remain anonymous.

If a report is not accepted, you will be told why.

Please keep the details private until the advisory is published, or until 90
days after your report if no fix has been agreed by then.

## Supported Versions

The project is in initial development (`0.y.z`). Only the latest release and
the current `master` branch receive security fixes.

| Version          | Supported |
| ---------------- | --------- |
| Latest release   | Yes       |
| `master`         | Yes       |
| Earlier releases | No        |

## Scope

This policy covers vulnerabilities in this repository: its source code,
configuration, CI workflows, and dependency manifests.

**Planned security work is not a vulnerability.** Application-level hardening,
such as security headers, secrets management, and dependency scanning, is
planned in the Security Hardening phase (see
[ROADMAP.md](ROADMAP.md) and issue #81). Missing items from that phase can be
raised as normal issues or comments on #81.

**Out of scope:**

- vulnerabilities in third-party dependencies that are already publicly known;
  report new ones to the dependency's own maintainers
- findings that need physical access to a user's device, or a compromised
  browser or operating system
- the accuracy of tax calculations, which is not a security issue; report it
  with the **Bug report** issue form

The application currently runs entirely in the browser and does not store
user data, so its attack surface is small. This will change as the backend,
database, and authentication are added, and this policy will be updated then.
