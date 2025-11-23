import { EditorView } from '@codemirror/view';
import type { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// Create a theme that matches the retro terminal aesthetic
export const createTerminalTheme = (isDark: boolean): Extension => {
  const theme = EditorView.theme(
    {
      '&': {
        backgroundColor: isDark 
          ? 'oklch(0.08 0.02 150) !important' // --primitive-green-975 for dark
          : 'oklch(0.93 0.03 85) !important',  // --primitive-amber-200 for light
        color: isDark 
          ? 'oklch(0.78 0.12 145) !important' // --primitive-green-100 for dark
          : 'oklch(0.25 0.04 40) !important',  // --primitive-amber-900 for light
        fontFamily: 'VT323, monospace',
        fontSize: '24px',
        letterSpacing: '0.5px',
        lineHeight: '36px',
      },
      '.cm-content': {
        caretColor: isDark 
          ? 'oklch(0.78 0.12 145)' // green cursor in dark mode
          : 'oklch(0.55 0.10 50)',  // amber cursor in light mode
        padding: '0',
        color: isDark 
          ? 'oklch(0.78 0.12 145) !important'
          : 'oklch(0.25 0.04 40) !important',
      },
      '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: isDark 
          ? 'oklch(0.78 0.12 145)'
          : 'oklch(0.55 0.10 50)',
        borderLeftWidth: '2px',
      },
      '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
        backgroundColor: isDark 
          ? 'rgba(51, 255, 102, 0.3)'
          : 'rgba(204, 136, 0, 0.3)',
      },
      '.cm-activeLine': {
        backgroundColor: 'transparent',
      },
      '.cm-gutters': {
        backgroundColor: isDark 
          ? 'oklch(0.08 0.02 150) !important'
          : 'oklch(0.93 0.03 85) !important',
        color: isDark 
          ? 'oklch(0.55 0.09 145) !important'
          : 'oklch(0.50 0.03 40) !important',
        border: 'none',
        borderRight: '1px solid ' + (isDark ? 'oklch(0.40 0.08 145)' : 'oklch(0.50 0.03 40)'),
        fontFamily: 'VT323, monospace',
        minWidth: '3rem',
        paddingRight: '1rem',
      },
      '.cm-activeLineGutter': {
        backgroundColor: 'transparent',
      },
      '.cm-foldPlaceholder': {
        backgroundColor: 'transparent',
        border: 'none',
        color: isDark 
          ? 'oklch(0.60 0.11 145)'
          : 'oklch(0.40 0.08 40)',
      },
      '.cm-line': {
        paddingLeft: '0.5rem',
      },
    },
    { dark: isDark }
  );

  // Syntax highlighting colors matching your design tokens
  const highlightStyle = HighlightStyle.define([
    { 
      tag: t.keyword,
      color: isDark 
        ? 'oklch(0.72 0.12 190)' // --token-syntax-keyword dark (cyan)
        : 'oklch(0.50 0.10 280)', // --token-syntax-keyword light (purple)
    },
    {
      tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
      color: isDark 
        ? 'oklch(0.78 0.12 145)'
        : 'oklch(0.25 0.04 40)',
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: isDark 
        ? 'oklch(0.68 0.10 200)' // --token-syntax-function dark (sky blue)
        : 'oklch(0.45 0.09 240)', // --token-syntax-function light (blue)
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: isDark 
        ? 'oklch(0.70 0.10 155)'
        : 'oklch(0.45 0.09 240)',
    },
    {
      tag: [t.definition(t.name), t.separator],
      color: isDark 
        ? 'oklch(0.78 0.12 145)'
        : 'oklch(0.25 0.04 40)',
    },
    {
      tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: isDark 
        ? 'oklch(0.70 0.10 155)' // --token-syntax-number dark (emerald)
        : 'oklch(0.55 0.09 50)',  // --token-syntax-number light (orange)
    },
    {
      tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
      color: isDark 
        ? 'oklch(0.72 0.11 95)'
        : 'oklch(0.50 0.10 50)',
    },
    {
      tag: [t.meta, t.comment],
      color: isDark 
        ? 'oklch(0.55 0.09 145)' // --token-text-muted dark
        : 'oklch(0.50 0.03 40)',  // --token-text-muted light
    },
    {
      tag: t.strong,
      fontWeight: '400',
    },
    {
      tag: t.emphasis,
      fontStyle: 'italic',
    },
    {
      tag: t.strikethrough,
      textDecoration: 'line-through',
    },
    {
      tag: t.link,
      color: isDark 
        ? 'oklch(0.70 0.12 190)'
        : 'oklch(0.55 0.10 50)',
      textDecoration: 'underline',
    },
    {
      tag: t.heading,
      fontWeight: '400',
      color: isDark 
        ? 'oklch(0.82 0.14 145)'
        : 'oklch(0.25 0.04 40)',
    },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: isDark 
        ? 'oklch(0.70 0.10 155)'
        : 'oklch(0.55 0.09 50)',
    },
    {
      tag: [t.processingInstruction, t.string, t.inserted],
      color: isDark 
        ? 'oklch(0.72 0.11 95)' // --token-syntax-string dark (lime)
        : 'oklch(0.55 0.09 150)', // --token-syntax-string light (green)
    },
    {
      tag: t.invalid,
      color: isDark 
        ? 'oklch(0.60 0.14 25)'
        : 'oklch(0.50 0.11 25)',
    },
  ]);

  return [theme, syntaxHighlighting(highlightStyle)];
};
