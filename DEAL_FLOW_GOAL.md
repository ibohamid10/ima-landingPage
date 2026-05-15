# AJIONE Deal Flow Landing Page Goal

## Objective

Build a new experimental AJIONE landing page on a separate test route without overwriting the current homepage.

Use route:

`/deal-flow`

Do not modify the existing `/` homepage or `app/page.tsx`.

## Brand And Design Direction

The new page must feel like the current AJIONE site, not a new brand.

Use the existing visual language:

- Same AJIONE logo assets.
- Same existing hero image / creator production image assets.
- Same or very similar color world.
- Same typography logic: Geist for sans, serif italic accents.
- Premium editorial feel, cinematic whitespace, large confident headings.
- Smooth high-end motion similar to the current site.
- Keep the page elegant, calm, and premium. Do not turn it into a generic SaaS template.

The current site can be used as visual reference, but the new test route should sharpen the business positioning and conversion flow.

## Business Model

AJIONE is not a classic creator growth studio and not just an influencer database/platform.

AJIONE is a success-based matchmaking and deal facilitation model between brands and creators.

Core business logic:

- AJIONE internally discovers and analyzes relevant brands and creators.
- An internal system helps find potential matches faster and draft suitable outreach emails.
- AJIONE handles the outreach, introduction, and deal facilitation between brand and creator.
- AJIONE earns a commission only when both sides agree to a paid collaboration.
- No upfront fees.
- No monthly retainers.
- No self-service platform busywork.
- Do not fake customers, logos, testimonials, case studies, or performance numbers.

## Core Positioning

Main message:

`Creator-brand deals. Brokered on success.`

Supporting idea:

AJIONE matches brands and creators, handles the outreach, and only earns when a paid collaboration is agreed.

Do not over-emphasize "international" as the main hook. Use "cross-market" or "across markets" as a secondary scope signal if useful.

Avoid positioning AJIONE as:

- Creator growth studio
- AI platform
- Influencer database
- Agency with upfront retainers

The internal AI/system should be described as an efficiency advantage, not the product itself.

## Required Route And File Structure

Create:

- `app/deal-flow/page.tsx`
- New components under `components/deal-flow/`
- Isolated styles with clearly prefixed classes, for example `deal-...`, or a CSS module.

Existing homepage route `/` must remain untouched.

## Required Sections

### 1. Hero

Use the same hero image style/assets as the current homepage.

Hero copy:

Headline:

`Creator-brand deals. Brokered on success.`

Subheadline:

`AJIONE matches brands and creators, handles the outreach, and only earns when a paid collaboration is agreed.`

Primary CTA:

`Join the first deal batch`

Secondary CTA:

`See how it works`

Trust line below CTA:

`No upfront fees · Outreach handled · Success-based commission · Cross-market matching`

### 2. Two-Sided Audience Section

Create a clear split between the two audiences.

For Brands:

`Get relevant creator deal opportunities without retainers, platform work or cold outreach.`

CTA:

`I'm a Brand`

For Creators:

`Get introduced to brand opportunities that fit your audience, niche and content style.`

CTA:

`I'm a Creator`

### 3. Signature Matching Animation

This is the main SOTA section. It should be cinematic, premium, and visually aligned with the current AJIONE aesthetic.

Headline:

`From signal to signed creator deal.`

Concept:

Left side brand cards:

- Aurelia / skincare
- North Form / apparel
- Atlas & Co / travel
- Kinfolk Park / hospitality

Right side creator cards:

- @maren.a / beauty
- @theo.tells / style
- @isla.frame / travel
- @nico.sees / food
- @orla.draws / home

Middle AJIONE matching layer:

- Audience fit
- Brand safety
- Deal potential
- Outreach angle

Animation behavior:

- Brand cards and creator cards appear staggered.
- Lines connect possible matches.
- Weak connections dim.
- Strong matches glow subtly.
- An outreach email card slides in.
- Final badge appears:

`Paid deal agreed`

`Success fee unlocked`

Important:

The animation must not communicate "AJIONE is just a software platform". It must show that AJIONE uses internal discovery/matching logic and then handles outreach and deal facilitation until a paid deal exists.

Respect reduced motion.

### 4. Trust Without Fake Social Proof

Section headline:

`Built to remove upfront risk.`

Bullets:

- No upfront agency fee
- No monthly retainer
- No self-service platform work
- Outreach handled by AJIONE
- Commission only after a paid deal is agreed
- First batch currently onboarding

### 5. Comparison Table

Create a comparison between:

- Traditional agency
- Influencer platform
- AJIONE

Traditional agency:

- Upfront fees
- Slow onboarding
- Expensive retainers
- Outcome not guaranteed

Influencer platform:

- Data access only
- Brand does the outreach
- Brand negotiates alone
- High manual workload

AJIONE:

- Matching plus outreach
- Deal facilitation handled
- Success-based commission
- Payment only after a paid collaboration is agreed

### 6. How It Works

Steps:

1. Signal scan
2. Match validation
3. Personalized outreach
4. Deal introduction
5. Success fee only

Copy:

`Our internal system helps us discover relevant brand and creator signals faster. AJIONE then handles the outreach and facilitates the introduction until both sides decide whether a paid collaboration makes sense.`

### 7. First Batch Offer

Headline:

`Join the first deal batch.`

Copy:

`AJIONE is onboarding selected brands and creators for its first deal batch. Early partners get a hands-on, success-based introduction process with no upfront fees.`

CTA:

`Apply for the first batch`

### 8. FAQ

Include these questions:

- When does AJIONE earn?
- Do brands pay upfront?
- Does it cost creators anything?
- Is AJIONE a platform or an agency?
- Which markets do you cover?
- Who handles outreach?
- What makes a match relevant?

## Design Requirements

- Premium, modern, SOTA.
- Visually connected to the current AJIONE homepage.
- Same hero image world and same brand mood.
- No generic SaaS look.
- No fake social proof.
- No fake customer logos.
- No fake testimonials.
- No fake metrics.
- Strong typography and hierarchy.
- Mobile must feel intentional, not just stacked.
- CTA must be visible and strong on mobile.
- Use Framer Motion or GSAP where useful.
- Respect `prefers-reduced-motion`.
- Avoid over-selling AI. The system is internal; the offer is managed matchmaking and deal facilitation.

## Technical Requirements

- Do not overwrite the current homepage.
- Keep `/` working as it is.
- Use route `/deal-flow`.
- Isolate components and styles.
- Reuse existing assets and fonts where appropriate.
- `npm run build` must pass.
- Start the local dev server after implementation and provide the test link:

`http://localhost:3000/deal-flow`

## After Implementation

After the implementation is complete and verified:

1. Run `npm run build`.
2. Review the new route locally.
3. Commit the changes.
4. Push to `main` so Cloudflare can deploy automatically and the changes can be viewed live.

