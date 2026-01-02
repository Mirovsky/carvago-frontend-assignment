import {useId, useState, useEffect, useRef, ReactNode} from 'react';

import IconMore from '@assets/icons/icon-more.svg?react';

type MenuProps = {
  children?: ReactNode;
  disabled?: boolean;
};

export function Menu({children, disabled}: MenuProps) {
  const buttonId = useId();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);

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

  function close() {
    setOpen(false);
    requestAnimationFrame(() => {
      const btn = rootRef.current?.querySelector<HTMLButtonElement>(`#${CSS.escape(buttonId)}`);
      btn?.focus();
    });
  }

  function onMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        className={`w-10 h-10 px-0 simple-button button-white ${open ? 'bg-fill-gray' : ''}`}
        onClick={() => setOpen((v) => !v)}
      >
        <IconMore />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-labelledby={buttonId}
          className="absolute top-[calc(100%+4px)] right-0 p-2 z-10 bg-fill-white border border-gray rounded-2xl"
          onKeyDown={onMenuKeyDown}
        >
          {children}
        </div>
      )}
    </div>
  );
}
