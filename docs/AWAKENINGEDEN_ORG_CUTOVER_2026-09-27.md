# awakeningeden.org cutover checklist

The domain name was confirmed by Benjy on 27 September 2026. Registrar
ownership, Cloudflare zone status, and account access have not been verified in
this execution environment. This branch prepares a production build; it does
not attach DNS, deploy, or change the public site.

## Release order

1. Review and release Work with Benjy mission PR #23 separately.
2. Confirm `awakeningeden.org` is an active zone in the Cloudflare account that
   hosts the staging Worker. Check for existing DNS and email records before
   making routing changes. The apex must not have a conflicting CNAME.
3. Merge this branch only after the domain and page review. Run
   `pnpm run build:production`; verify `dist/robots.txt`, `dist/sitemap.xml`,
   canonical, Open Graph, and JSON-LD URLs on the generated pages. Run the
   desktop/mobile browser suite and `pnpm test:worker`.
4. With explicit release approval and authenticated Wrangler in the intended
   Cloudflare account, use `pnpm exec wrangler deploy --config wrangler.production.jsonc`.
   It creates the separate `awakening-eden` Worker and attaches the apex custom
   domain. Keep `awakening-eden-library-staging` untouched.
5. Verify HTTPS, key clean routes, assets, mobile navigation, social preview,
   sitemap, robots, 404 exclusions, and WhatsApp/email links on the real apex.
   The enquiry form is still hidden; do not activate it in this cutover.
6. Configure `www.awakeningeden.org` as a path-preserving 301 to the apex
   through Cloudflare after verifying its DNS. Keep the Netlify fallback until
   old URLs can be redirected path for path, then submit the new sitemap to
   Search Console. Do not break already shared links.

The pre-existing PDFs may still contain links to the Netlify fallback. Their
next editorial regeneration should change these to the new public domain only
after the apex is working. The fallback therefore remains reachable during
this transition.
