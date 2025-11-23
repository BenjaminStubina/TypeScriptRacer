# Design Token System

This project uses a comprehensive design token system for maintainable, consistent styling.

## Token Hierarchy

The token system is organized into three layers:

### 1. **Primitive Tokens** (`--primitive-*`)
Raw color and spacing values. These are the foundation but should rarely be used directly in components.

Examples:
- `--primitive-amber-600`
- `--primitive-green-200`
- `--primitive-space-4`
- `--primitive-font-xl`

### 2. **Semantic Tokens** (`--token-*`)
Context-specific tokens that reference primitives. Use these in components for meaning-based styling.

Examples:
- `--token-bg-base` - Base background color
- `--token-text-primary` - Primary text color
- `--token-brand-primary` - Primary brand color
- `--token-space-lg` - Large spacing
- `--token-font-size-xl` - Extra large font size

### 3. **Component Tokens** (`--component-*`)
Specific use-case tokens for consistent component styling.

Examples:
- `--component-card-padding`
- `--component-button-shadow`
- `--component-modal-backdrop`

## Token Categories

### Colors

**Backgrounds:**
- `--token-bg-base` - Base background
- `--token-bg-elevated` - Raised surfaces (cards, modals)
- `--token-bg-input` - Input fields

**Text:**
- `--token-text-primary` - Main content
- `--token-text-secondary` - Supporting text
- `--token-text-muted` - Subtle text

**Brand:**
- `--token-brand-primary` - Primary brand color
- `--token-brand-secondary` - Secondary brand color

**Status:**
- `--token-status-error`
- `--token-status-warning`
- `--token-status-success`
- `--token-status-info`

### Spacing

Use semantic spacing tokens:
- `--token-space-xs` (0.25rem)
- `--token-space-sm` (0.5rem)
- `--token-space-md` (1rem)
- `--token-space-lg` (1.5rem)
- `--token-space-xl` (2rem)
- `--token-space-2xl` (2.5rem)
- `--token-space-3xl` (3rem)

### Typography

**Font Sizes:**
- `--token-font-size-xs` through `--token-font-size-6xl`

**Font Properties:**
- `--token-font-family`
- `--token-font-weight`
- `--token-letter-spacing`
- `--token-line-height-tight`
- `--token-line-height-normal`
- `--token-line-height-relaxed`

### Effects

**Glows:**
- `--token-effect-glow` - Subtle glow
- `--token-effect-glow-strong` - Strong glow

**Shadows:**
- `--token-effect-shadow-light`
- `--token-effect-shadow-medium`
- `--token-effect-shadow-heavy`

## Theme Support

The token system automatically adapts between light (amber terminal) and dark (green phosphor) themes:

- Light theme: Amber/brown color palette
- Dark theme: Green phosphor color palette

Simply toggle the `.dark` class on the root element to switch themes.

## Best Practices

1. **Use semantic tokens** in components, not primitives
2. **Use component tokens** for consistent UI patterns
3. **Avoid hardcoded values** - use tokens instead
4. **Follow the hierarchy**: Primitives → Semantic → Component
5. **Use the legacy aliases** during migration if needed

## Legacy Compatibility

For backward compatibility, legacy variable names (like `--bg`, `--text`, `--primary`) are aliased to the new token system. These will be gradually phased out.

## Example Usage

```css
/* ❌ Don't use primitives directly */
.my-card {
  padding: var(--primitive-space-8);
  color: var(--primitive-amber-900);
}

/* ✅ Use semantic tokens */
.my-card {
  padding: var(--token-space-xl);
  color: var(--token-text-primary);
}

/* ✅ Even better: use component tokens */
.my-card {
  padding: var(--component-card-padding);
  color: var(--token-text-primary);
  border: var(--component-card-border);
  box-shadow: var(--component-card-shadow);
}
```

## Adding New Tokens

When adding new tokens:

1. Add primitive values in the `:root` section
2. Create semantic mappings for both light and dark themes
3. Add component-specific tokens if needed
4. Update this documentation
