import SheetMusic from "@slnsw/react-sheet-music";
import { useEffect, useState } from "react";
import { Notation } from 'react-abc';

function remainingSecondFromNow(endTimestamp: number) {
  return Math.floor((endTimestamp - Date.now()) / 1000);
}

export function Play({
  endTimestamp,
  gameId,
}: {
  endTimestamp: number;
  gameId: string;
}) {
  const [remainingSeconds, setRemainingSeconds] = useState(
    remainingSecondFromNow(endTimestamp)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = remainingSecondFromNow(endTimestamp);
      if (seconds <= 0) {
        // end game
        clearInterval(interval);
      }
      setRemainingSeconds(seconds);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex justify-center mt-4">
        <div className="text-2xl font-bold">{remainingSeconds}</div>
      </div>
      <Notation notation={"CDEF GABc|"} />;
    </div>
  );
}
