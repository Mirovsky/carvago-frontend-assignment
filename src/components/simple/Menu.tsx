import {useState, useEffect, useRef, ReactNode} from 'react';

type MenuProps = {
  children?: ReactNode;
};

export function Menu({children}: MenuProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onDocumentMouseDown(e: MouseEvent) {
      if (!open) {
        return;
      }

      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', onDocumentMouseDown);
    return () => document.removeEventListener('mousedown', onDocumentMouseDown);
  }, [open]);

  return (
    <div>
      <div ref={rootRef} className="relative inline-flex">
        <button onClick={() => setOpen((v) => !v)}>Open</button>
      </div>

      {open && <div>{children}</div>}
    </div>
  );
}
