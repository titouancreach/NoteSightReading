import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Note } from "./Note";
import { supabase } from "../supabase/utils";

function remainingSecondFromNow(endTimestamp: number) {
  return Math.floor((endTimestamp - Date.now()) / 1000);
}

const possibleNotes = "CDEFGAB";

export function Play() {
  const { gameSessionId } = useParams();

  if (gameSessionId === undefined) {
    throw new Error("gameSessionId is undefined");
  }

  const [gameSession, setGameSession] = useState<any>(null);

  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await supabase
        .from("game_sessions")
        .select("*")
        .eq("uid", gameSessionId)
        .single();
      setGameSession(result!.data);
      setRemainingSeconds(
        remainingSecondFromNow(new Date(result!.data.end_at).getTime())
      );
    })();
  }, [gameSessionId]);

  const [buttonText, setButtonText] = useState(possibleNotes);

  const [currentNote, setCurrentNote] = useState(
    possibleNotes[Math.floor(Math.random() * possibleNotes.length)]
  );

  const navigate = useNavigate();

  useEffect(() => {
    let interval: any = 0;
    if (gameSession) {
      interval = setInterval(() => {
        const seconds = remainingSecondFromNow(
          new Date(gameSession.end_at).getTime()
        );
        if (seconds <= 0) {
        // end game
          clearInterval(interval);
          navigate("/dashboard")
        }
        setRemainingSeconds(seconds);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [gameSession]);

  // still loading
  if (!gameSession || remainingSeconds === 0) {
    return null;
  }

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
              onClick={async (x) => {
                if (noteLetter === currentNote) {
                  // correct
                  let newNote = currentNote;
                  while (newNote === currentNote) {
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

                await supabase.from("attempts").insert({
                  is_success: noteLetter === currentNote,
                  game_session_id: gameSessionId,
                });
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
