# ShopSense

A credited open-source grocery comparison adaptation for Aayushi’s portfolio.

## Original work and licence
Forked from [Rhymond/product-compare-react](https://github.com/Rhymond/product-compare-react), MIT licensed. The original catalogue, product selection, Redux state and comparison table originate upstream. The original LICENSE is retained.

## Added in this adaptation
- A maximum listed-price input and Fresh/Frozen preference within the selected-product comparison.
- Explicit matching and lowest-matching-price explanations, including no-match guidance.
- Visible upstream attribution and honest demo boundaries.
- A Vite/Dart Sass build replacing the original obsolete native Sass/webpack setup.

The guide assesses listed price and condition only. Pack size, shipping, live inventory, quality and nutritional needs are not evaluated. Catalogue prices are illustrative, not current offers. No checkout, payment processing, AI recommendations or adoption claims.

## Validation
Component checks cover rendering, budget constraints, condition filtering, no matching products and an empty selection. Deployment build and browser verification are tracked separately.

## Run / deploy
Install with `npm install --package-lock=false --legacy-peer-deps`, then `npm run dev` or `npm run build`. The inherited lockfile belongs to the legacy toolchain; Vercel uses the tracked install override. Output is `dist`.
