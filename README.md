# Talc Warm Transfer Lead Form

This is a static, no-backend lead form that works on Vercel.

## What it does

- Sends lead data to Ringba IDE using:
  - `https://display.ringba.com/enrich/2932042226064164839`
- Sends an email copy of each submitted lead using FormSubmit (no backend required)
- Shows DID instructions after successful submit

## Campaign details included

- DID: `+18337622152`
- HOO: M-F 8:30am-12pm PST and 1:15pm-5pm PST
- GEO: Nationwide (excluding MI and TX)

## Required Ringba fields mapped

- `callerid` (E.164 format)
- `first_name`
- `last_name`
- `email`
- `comments` (built automatically from incident fields)

## Deploy in one click

1. Push this folder to a GitHub repository.
2. Import the repo into Vercel.
3. Deploy with default settings (no server setup needed).

## Important email setup note

This form sends the email copy through FormSubmit endpoint:

- `https://formsubmit.co/<owner_email>`

On the first submission to a new email address, FormSubmit sends an activation email.
You must click the activation link once. After that, submissions deliver normally.
