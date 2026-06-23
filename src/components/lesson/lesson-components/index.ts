/**
 * Lesson component registry.
 *
 * Every component exported from here can be referenced by name
 * in the lesson JSON via the "component" block type:
 *
 *   { "type": "component", "render": "<Graph initial={10} />" }
 *
 * Just add your new component's export here and it becomes available
 * without touching any other file.
 */

export { Graph } from './Graph';
// export { DerivativeExplorer } from './DerivativeExplorer';
// export { UnitCircle } from './UnitCircle';
// export { IntegralVisualizer } from './IntegralVisualizer';
