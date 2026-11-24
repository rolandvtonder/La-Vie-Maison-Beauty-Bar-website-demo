import {StrictMode, type ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';

// Scroll-driven stages depend on position; always open a page at its top
// (unless a #hash asks for a section).
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

export function mount(node: ReactNode) {
  createRoot(document.getElementById('root')!).render(<StrictMode>{node}</StrictMode>);
}
