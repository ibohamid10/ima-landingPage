# AJIONE — Email assets

Two ready-to-paste HTML pieces that keep manual outbound mail
visually consistent with the auto-reply the contact form fires.
Both use the same warm-bone palette, the same fonts and the same
"Vienna · AT" mono-uppercase footer as `worker/index.ts`.

## `signature.html` — Gmail signature

For every email sent from `partnership@ajione.com`. Stays attached
to threads so even short replies still read as AJIONE.

1. Gmail → ⚙ → **See all settings** → **General** → **Signature**
2. **Create new** → name it `AJIONE`
3. Make sure the editor is in **Rich-text** mode (not Plain text)
4. Open `signature.html`, copy everything between the
   `COPY FROM HERE` / `COPY UNTIL HERE` markers
5. Paste into the signature editor
6. Set **Signature defaults** → "On new emails" and "On reply" both
   to `AJIONE`
7. **Save changes** at the bottom of the settings page

Logo loads from `https://ajione.com/ajione-logo.png` — once the
domain is live the image renders inline. Recipients on first
contact may need to click "Show images"; after that Gmail
remembers per sender.

## `template.html` — Gmail full-body template

For new outreach (not thread replies — the signature handles
those). Mirrors the auto-reply layout one-to-one so the first
manual touch from your inbox feels like the auto-reply continued.

1. Gmail → ⚙ → **See all settings** → **Advanced** →
   **Templates** → **Enable** → **Save changes**
2. Compose a new email
3. Switch the compose body to **Rich-text** if it isn't already
4. Open `template.html`, copy everything between the markers,
   paste into the compose body
5. Three dots (More options) at the bottom right → **Templates**
   → **Save draft as template** → **Save as new template** →
   name it `AJIONE branded`

When sending a new branded email:

1. Compose → three dots → **Templates** → `AJIONE branded`
2. The structure loads into the body
3. Replace each placeholder:
   - `[LABEL]` — small uppercase kicker, e.g., `Following up`,
     `Next step`, `Quick note`
   - `[NAME]` — recipient first name or brand
   - `[ITALIC ACCENT]` — short editorial closer in serif italic,
     e.g., `We've got you.`, `A quick thought.`, `One moment.`
   - `[BODY PARAGRAPH]` — your message
4. Send

## When to use which

- Thread reply to an existing auto-reply → just type, the
  signature carries the brand
- New outreach / first manual reply you want fully branded →
  use the template, then the signature lands beneath it
