import React from 'react';
import * as LessonComponents from '../lesson-components';
import type { ComponentBlockData } from '../lesson.types';

interface Props {
  block: ComponentBlockData;
}

// ---------------------------------------------------------------------------
// Prop value parser
// Handles: {number}, {true/false}, {null}, {"string"}, {[array]}, {{object}},
//          "string", 'string'
// ---------------------------------------------------------------------------
function parseValue(raw: string): unknown {
  const s = raw.trim();
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (s === 'null') return null;
  if (s === 'undefined') return undefined;
  if (!isNaN(Number(s)) && s !== '') return Number(s);
  // JSON arrays / objects
  if (s.startsWith('[') || s.startsWith('{')) {
    try { return JSON.parse(s); } catch { /* fall through */ }
  }
  // Quoted string
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1);
  }
  return s;
}

// ---------------------------------------------------------------------------
// Minimal JSX-like string parser
// Handles: <Name prop={val} prop2="val2" boolProp />
// Does NOT support children — lesson components are always self-closing.
// ---------------------------------------------------------------------------
interface ParsedComponent {
  name: string;
  props: Record<string, unknown>;
}

function parseComponentString(render: string): ParsedComponent | null {
  const str = render.trim();
  // Match opening tag with optional self-close
  const tagMatch = str.match(/^<(\w+)([\s\S]*?)\/?\s*>$/);
  if (!tagMatch) return null;

  const name = tagMatch[1];
  const attrsStr = tagMatch[2].trim();
  const props: Record<string, unknown> = {};

  // Regex matches three forms:
  //   name={...}   →  group 1 & 2
  //   name="..."   →  group 3 & 4
  //   name='...'   →  group 5 & 6
  //   name         →  group 7  (boolean shorthand = true)
  const attrRegex =
    /(\w+)=\{([^}]*)\}|(\w+)="([^"]*)"|(\w+)='([^']*)'|(\w+)/g;
  let m: RegExpExecArray | null;

  while ((m = attrRegex.exec(attrsStr)) !== null) {
    if (m[1] !== undefined) {
      // name={value}
      props[m[1]] = parseValue(m[2]);
    } else if (m[3] !== undefined) {
      // name="value"
      props[m[3]] = m[4];
    } else if (m[5] !== undefined) {
      // name='value'
      props[m[5]] = m[6];
    } else if (m[7] !== undefined) {
      // boolean shorthand
      props[m[7]] = true;
    }
  }

  return { name, props };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function ComponentBlock({ block }: Props) {
  const parsed = parseComponentString(block.render);

  if (!parsed) {
    return (
      <div className="my-4 px-4 py-3 rounded-lg border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20 text-red-500 text-xs font-mono" dir="ltr">
        ⚠ Failed to parse: <code>{block.render}</code>
      </div>
    );
  }

  const ComponentMap = LessonComponents as Record<
    string,
    React.ComponentType<Record<string, unknown>>
  >;
  const Component = ComponentMap[parsed.name];

  if (!Component) {
    return (
      <div className="my-4 px-4 py-3 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 text-xs font-mono" dir="ltr">
        ⚠ Component not found in registry:{' '}
        <code className="font-bold">{parsed.name}</code>
        <br />
        <span className="text-amber-500/70">
          Export it from lesson-components/index.ts
        </span>
      </div>
    );
  }

  return (
    <div className="my-6">
      <Component {...parsed.props} />
    </div>
  );
}
