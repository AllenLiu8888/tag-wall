# Frontend AI Coding Rules

## Mandatory Rule

Every AI coding tool must read and follow this file before writing, editing, refactoring, or reviewing frontend code in this project.

The tool must also read `PRD.md` before implementation. Product behavior, messaging, and feature meaning must trace back to the PRD.

## Current Scope

- Build frontend only.
- The current target is a React + TailwindCSS product display page based on `PRD.md`.
- Do not implement backend services, databases, authentication, payment, analytics pipelines, push infrastructure, or native app code unless the user explicitly asks for it later.
- The PRD intentionally does not prescribe UI design. The AI coding tool may decide layout, visual language, animation, and component structure.

## Product Invariants From PRD

These are non-negotiable for frontend work:

- Voice & Difference is the product core: different voices must have visible value.
- Do not add public likes, upvotes, rankings, "best answer", or popularity sorting.
- The Voice Spectrum concept must include exactly three response modes: 共鸣, 建议, 反观.
- The product story must make clear that the feature is not trying to select one winning answer.
- "为我而答" must be represented as the help seeker's private sense of inspiration, not public validation.
- Anonymous expression and visibility range must be framed as ways to lower the barrier to honest expression.
- The reflection/复盘 loop must show that answers create an emotional and informational feedback cycle.
- Product copy can be adapted for page flow, but must not contradict the PRD's meaning.

## SOLID For Frontend

Apply SOLID pragmatically. Do not create abstractions for their own sake.

### Single Responsibility

- Each component should have one clear reason to change.
- Keep static product data, visual components, state transitions, and utility functions separated.
- Prefer small components such as `Hero`, `FeatureSection`, `VoiceSpectrum`, `ScenarioCard`, `MetricCard`, and `PrincipleChip` when they improve clarity.

### Open/Closed

- Prefer data-driven rendering over duplicated markup.
- Put repeated options in constants, for example principles, scenarios, voice types, feature cards, metrics, and content blocks.
- Adding a new scenario, metric, or content block should usually mean updating data, not changing rendering logic.

### Liskov Substitution

- Reusable components must keep predictable props and behavior.
- Generic components such as cards, chips, tabs, or section headers should work across content types without hidden special cases.

### Interface Segregation

- Components should receive only the props they need.
- Avoid passing entire page-level state objects into leaf components.
- Avoid broad `config` props when explicit props are clearer.

### Dependency Inversion

- High-level UI should depend on product data and small rendering contracts, not hard-coded repeated DOM fragments.
- Keep constants and mock data in clearly named files or sections.
- Avoid coupling reusable UI pieces to one specific section unless the component is intentionally section-specific.

## DRY Rules

- Do not duplicate repeated cards, chips, section headers, buttons, or feature blocks.
- Do not repeat Voice Spectrum metadata in multiple places. Define label, meaning, and examples once.
- Do not repeat class strings when a small helper or component improves readability.
- Do not over-DRY one-off product moments. Keep important narrative moments explicit when abstraction would hide intent.

## KISS Rules

- Use the simplest implementation that clearly communicates the product.
- Use local React state only where the display page needs interaction.
- Avoid global state libraries, routers, backend calls, animation libraries, or complex architecture unless the user explicitly requests them.
- Prefer plain arrays, objects, and small functions over patterns that add ceremony.
- Do not implement features outside the PRD just because they seem useful.

## Readability Rules

- Use clear, product-language names: `voiceTypes`, `productPrinciples`, `coreScenarios`, `contentSections`, `selectedVoiceType`.
- Keep JSX shallow enough to scan. Extract components when a block becomes hard to read.
- Keep component order logical: constants, utilities, shared components, section components, page root.
- Use semantic HTML where practical: `button`, `section`, `article`, `header`, `main`.
- Buttons and interactive elements must have clear accessible labels through visible text or `aria-label`.
- Avoid clever code, nested ternaries, and long inline conditionals.
- Prefer explicit state names over compressed names.
- Comments should explain product intent or non-obvious behavior, not restate the code.

## Visual Freedom With Product Discipline

- The AI coding tool may choose colors, layout, typography, spacing, animation, and responsive behavior.
- Visual choices should support the product meaning: warm, human, plural, and anti-ranking.
- The display page should feel like a real product story, not a generic template.
- The UI must not make one voice type look like the winner by default.
- Text must not overflow or overlap its container.
- The page should be responsive unless the user asks for a fixed-size mockup.

## Acceptance Checklist

Before finishing, the AI coding tool must verify:

- `PRD.md` was read and followed.
- This rules file was read and followed.
- The implementation is frontend-only.
- The page explains the product positioning, target users, core scenarios, Voice Spectrum, 为我而答, anonymous expression, reflection loop, and key metrics.
- No public like/upvote/ranking/best-answer behavior was added.
- The three Voice Spectrum modes are represented as 共鸣, 建议, 反观.
- The implementation follows SOLID, DRY, KISS, and readability rules without unnecessary abstraction.
