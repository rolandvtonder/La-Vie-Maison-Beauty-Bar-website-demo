import type {ElementType} from 'react';
import type {Line} from '../content';

/** Big serif headline; lines marked `i` are set in italic, the first is indented. */
export function Headline({
  lines,
  as: Tag = 'h2',
  className = '',
  indent = true,
}: {
  lines: Line[];
  as?: ElementType;
  className?: string;
  indent?: boolean;
}) {
  return (
    <Tag className={`display ${className}`}>
      {lines.map((l, i) => (
        <span key={l.t} className={`block ${l.i ? 'it' : ''} ${indent && i === 0 ? 'pl-[1.2em]' : ''}`}>
          {l.t}
        </span>
      ))}
    </Tag>
  );
}
