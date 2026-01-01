import {useState, useEffect} from 'react';

function msUntilNextMidnight() {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);

  return nextMidnight.getTime() - now.getTime();
}

export function useDate() {
  const [date, setDate] = useState(() => new Date());

  useEffect(() => {
    let timeoutId: number;

    function scheduleNextUpdate() {
      timeoutId = window.setTimeout(() => {
        setDate(new Date());
        scheduleNextUpdate();
      }, msUntilNextMidnight());
    }

    scheduleNextUpdate();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return date;
}
