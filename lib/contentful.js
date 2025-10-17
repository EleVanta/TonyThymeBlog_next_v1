const contentful = require("contentful");

// Create clients lazily so imports at build-time don't throw when env vars
// are not present (e.g. on Vercel during certain build steps).
function createClient({ preview = false } = {}) {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const token = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!space || !token) {
    // Return null instead of throwing. Callers should handle null and
    // return a friendly error at runtime if credentials are missing.
    return null;
  }

  const opts = {
    space,
    accessToken: token,
  };
  if (preview) opts.host = "preview.contentful.com";

  return contentful.createClient(opts);
}

export function getClient() {
  return createClient({ preview: false });
}

export function getPreviewClient() {
  return createClient({ preview: true });
}
