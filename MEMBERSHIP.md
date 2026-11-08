# Membership maintenance

Reviewed: November 7, 2026.

The canonical public membership comparison is https://www.outliertrading.io/pro.
Earlier plans/specifications under docs/superpowers describe historical designs;
their /tier-comparison URLs and conflicting benefits are superseded by this reference.

## Approved membership facts

- Active presentation: Outlier Pro (24436187), Outlier Pro Plus (25098583), Coaching (25824765).
- Ask Erik Q&A: included with all three paid tiers.
- Pro Plus and Coaching: two interactive workshops monthly, automatically included.
- Coaching: one private 60-minute call monthly, roadmap, collaboration folder, direct email.
- Inner Circle is unlisted and removed from active presentations. Its legacy ID remains
  recognized by the Wix Patreon adapter; recognition does not make it a public offer.
- First-time Pro members: 30% off the first month by emailing Erik before regular-price checkout.
  This offer does not automatically extend to Pro Plus or Coaching.
- Free onboarding remains available. Paid members verify in Discord and connect the
  same Discord account through Patreon; free members only need server verification.

## Updating membership

Patreon controls billing, current prices, availability, access, schedules, and links.
Wix synchronizes prices/descriptions/availability; its authored comparison benefits
are maintained separately. A description-change review flag does not update onboarding.

For any membership change, review both repositories together:

1. Wix: src/public/tierComparisonConfig.js and src/public/pageDefinitions/tierComparison.js.
2. Onboarding: index.html table, tier details, FAQ, and access instructions.
3. Update membership-facts.json identically in both repositories and this reference.
4. Run node --test tests/membership-contract.test.cjs in each repository. Set
   MEMBERSHIP_PEER_ROOT to the other checkout to compare the two manifests.
5. Run the Wix validation suite. Check rendered desktop/mobile pages before publishing.
6. Review Patreon/Discord links and record the actual review date in onboarding README.

Keep marketing copy, onboarding detail, fonts, colors, and layout independent.
Do not replace billing-management or gated-resource links with the public comparison URL.
Do not bulk-rewrite historical plans or intentionally invalid URL test cases.
After publishing, verify the old /tier-comparison path redirects to /pro in Wix.
