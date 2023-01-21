import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { GameSession } from "../firebase/repository";
import { db } from "../firebase/utils";

export function useGameSession(gameSessionId: string) {
  const [gameSession, setGameSession] = useState<GameSession>();

  const [value, loading, error] = useDocument(
    doc(db, "game_sessions", gameSessionId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (value) {
      setGameSession(value.data() as GameSession);
    }
  }, [value?.data]);

  return [gameSession, loading, error];
}
