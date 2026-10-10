# Muhammad Azeem — Portfolio V1

A responsive, black-and-green bento portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Lucide, and Motion. The homepage includes a prominent SaaS / AI hero, circular profile, supporting name panel, core stack, interactive project browser, career timeline, engineering capabilities, target markets, philosophy, and contact. No database, API keys, CMS, or backend service is needed.

## Local development

Use Node.js 20.9+ (Node 24 LTS is recommended) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production verification:

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Content maintenance

All personal content is in `src/data/portfolio.ts`: identity, email, social links, availability, positioning, regional variants, expertise, employment, and project case studies. No CV was supplied; supplied brief facts need comparison with the authoritative original CV. Employment dates intentionally preserve the supplied overlap.

- Resume PDFs belong in `public/resumes/`. Set `markets.global.resume` and optionally `markets.saudi.resume` to paths such as `/resumes/muhammad-azeem-global.pdf` only after adding the actual verified files. Saudi falls back to the global file; without either, resume actions open an email request.
- Market switching lives in the project panel, defaults to Global / Remote, and updates the hero positioning, configured project order, and shared hero/navigation resume actions; switching market returns to its flagship project. The arrows and named project tabs browse all three case studies. OdooPilot is featured in both supplied market variants. Global puts DockOps next; Saudi puts AiShop next. The selection is shared with navigation during the current browsing session; a reload resets to Global.
- Projects swipe automatically every `projectRotationMs` milliseconds (10 seconds by default), with a countdown bar and pause/play control. Rotation pauses during hover or keyboard focus and while the panel is outside the viewport or the browser tab is hidden. Reduced-motion preferences disable autoplay and decorative animation.
- Homepage and case-study sections reveal once on scroll; project previews animate AI response lines and operational rows when visible or selected. Keyboard focus reveals pending content, and reduced-motion preferences disable these sequences. Anchor navigation briefly illuminates its destination, and a decorative grid/dot layer sits behind the solid cards. Social links use local SVG icons; GitHub stays hidden until its URL is verified.
- `github` is null until a verified URL is supplied; the link is hidden.
- Project images are original CSS illustrations, clearly labeled. Add a `screenshot` object to each project in the data module (`src`, `alt`, `width`, `height`) to display a permitted local screenshot using `next/image`. Put screenshot files in `public/images/`. Set the optional `portrait` field to a local image path to replace the MA monogram with a genuine portrait.
- Expertise lists only technologies named in the brief. Testing tools remain pending CV confirmation.
- Case studies describe supplied capabilities, not individual ownership, architectural decisions, or measured results. Add verified detail to each project's `sections` ; previews remain labeled as illustrations until real screenshots are supplied.

## Information and assets needed

- [ ] Authoritative non-KSA CV; confirm role titles, companies, employment dates, current role, and expertise.
- [ ] Verified global resume PDF; optional Saudi-specific English PDF.
- [ ] Optional genuine portrait, with permission to use it.
- [ ] Product screenshots for OdooPilot, AiShop Solution, and DockOps, with permission to publish and sensitive information removed.
- [ ] Each project's exact personal responsibilities, team context, technical challenges, decisions, and verified outcomes. Metrics only if supported.
- [ ] Confirm project names, descriptions, technologies, and public disclosure permissions.
- [ ] Verified GitHub URL, optional repositories and live demo URLs.
- [ ] Confirm email, LinkedIn, availability, and relocation preferences.
- [ ] Final domain and desired Open Graph preview content.

## Vercel deployment

1. Replace or approve the content above and run all verification commands.
2. Push this folder to a Git repository, then import it in Vercel as a Next.js project.
3. Keep the root directory as this project directory. Use `npm run build`; allow Next.js to manage the output directory. Select a compatible Node runtime (24 recommended).
4. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS origin, without a trailing slash (e.g. your verified custom domain or assigned Vercel URL). Do not deploy `.env.example`'s sample value. Sitemap entries and canonical URLs are only emitted when this variable is set.
5. Deploy a preview, verify links, downloadable PDFs, mobile layout, metadata, and case studies. Add the custom domain in Vercel, configure its DNS, and redeploy if the origin changes.

## Before deployment

- [ ] Complete content and privacy review; replace illustration assets when available.
- [ ] Add resume files and verify downloads.
- [ ] Set the real site origin and inspect `/sitemap.xml`, `/robots.txt`, and Open Graph metadata.
- [ ] Run lint, type checking, and production build after content edits.
- [ ] Review keyboard navigation and mobile layouts; smoke-test email, LinkedIn, market switch, and all case-study routes.
- [ ] Connect the repository, Vercel project, and custom domain.

### Dependency audit

The installation audit reports one upstream `braces` stack-exhaustion advisory propagated through five development-only lint packages (`braces`, `micromatch`, `fast-glob`, `@next/eslint-plugin-next`, and `eslint-config-next`). At implementation time the registry's latest `braces` is still 3.0.3, which is affected. The suggested automatic fix downgrades the Next lint configuration to 14 and is not compatible with this setup. Keep linting limited to trusted project source and update the lint dependency chain when a compatible patch is available. Check runtime dependencies separately with `npm audit --omit=dev`.

The site is intentionally local-only until these deployment steps are authorized. There are no invented business metrics, client testimonials, product screenshots, public repositories, or demo links.
