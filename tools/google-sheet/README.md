# Saving form responses to a Google Sheet

The interest form and the updates sign-up send each response to a Google Sheet through the small script in `Code.gs`.

## Set-up, once

1. Create a Google Sheet in the account that should own the responses, and name it.
2. In the Sheet, open Extensions, then Apps Script. Delete what is there and paste all of `Code.gs`.
3. Choose Deploy, then New deployment, and pick the type "Web app". Set "Execute as" to "Me" and "Who has access" to "Anyone".
4. Approve the permissions Google asks for, then copy the "Web app URL".
5. Paste that URL into `src/content/site.ts` as `forms.endpoint`, and publish the site.

The script adds 2 tabs, "interest form" and "updates list", with their header rows, the first time each form is used.

## Notes

- Until `forms.endpoint` is filled in, both forms tell the visitor that the response was not saved.
- "Who has access: Anyone" lets the website send responses. It does not let anyone read the Sheet; only people the Sheet is shared with can open it.
- After changing `Code.gs`, choose Deploy, then Manage deployments, edit the deployment and select "New version". The address stays the same.
