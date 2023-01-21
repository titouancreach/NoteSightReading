import { useEffect, useState } from "react";
import { Note } from "./Note";

function remainingSecondFromNow(endTimestamp: number) {
  return Math.floor((endTimestamp - Date.now()) / 1000);
}

const possibleNotes = "CDEFGAB";

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

  const [buttonText, setButtonText] = useState(possibleNotes);

  const [currentNote, setCurrentNote] = useState(
    possibleNotes[Math.floor(Math.random() * possibleNotes.length)]
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
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center mt-4">
        <div className="text-2xl font-bold">{remainingSeconds}</div>
      </div>

      <Note note={currentNote} />
      <div className="grid grid-cols-2 p-4 mt-10">
        {[...buttonText].map((noteLetter, i) => {
          return (
            <button
              key={i}
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold rounded-lg px-5 py-2.5 text-center mr-2 mt-auto mb-6"
              onClick={(x) => {
                if (noteLetter == currentNote) {
                  let newNote = currentNote;
                  while (newNote == currentNote) {
                    newNote =
                      possibleNotes[
                        Math.floor(Math.random() * possibleNotes.length)
                      ];
                  }

                  setButtonText(possibleNotes);
                  setCurrentNote(newNote);
                } else {
                  setButtonText(possibleNotes.replace(noteLetter, "😳"));
                }
              }}
            >
              {noteLetter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
