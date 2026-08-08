# Save to Links iOS Shortcut

This Shortcut sends a shared URL to the site's protected link-ingestion API.
The API writes directly to Notion and invalidates the cached `/links` page.

## Required environment variables

Set these locally in `.env.local` and in the Vercel project settings:

```env
NOTION_TOKEN=secret_...
NOTION_DATABASE_ID=...
LINK_INGEST_TOKEN=...
```

Generate the ingestion token with:

```bash
openssl rand -hex 32
```

Do not prefix the token with `NEXT_PUBLIC_` and do not commit it.

## Build the Shortcut

1. Create a new Shortcut named **Save to Links**.
2. Open its details, enable **Show in Share Sheet**, and limit accepted input to
   URLs and Safari web pages.
3. Add **Get URLs from Shortcut Input**.
4. Add **Get Contents of URL** and configure it as follows:
   - URL: `https://rashadphz.com/api/links`
   - Method: `POST`
   - Header `Authorization`: `Bearer YOUR_LINK_INGEST_TOKEN`
   - Header `Content-Type`: `application/json`
   - Request body: JSON
   - JSON field `url`: the URL produced by **Get URLs from Shortcut Input**
5. Add **Get Dictionary Value** for the `message` field returned by the API.
6. Add **Show Notification** using that message.

## Test locally

With the development server running and `.env.local` configured:

```bash
curl -i http://localhost:3000/api/links \
  -H "Authorization: Bearer $LINK_INGEST_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"url":"https://example.com"}'
```

The first request should return `201` and `Link saved`. Sending the same URL
again should return `200` and `Link already saved`.
