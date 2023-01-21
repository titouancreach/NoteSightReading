import { doc, setDoc, collection, addDoc, QueryDocumentSnapshot, SnapshotOptions, DocumentData, getDoc } from "firebase/firestore";

import { db } from "./utils";

export interface GameSession {
    userId: string;
    startedAt: number;
    endTime: number;
    successCount: number;
    failureCount: number;
};

export async function createNewGameSession(userId: string) {
  const gameSessionsRef = collection(db, "game_sessions");
  const startTime = Date.now();
  const endTime = startTime + 60000;

  const doc = await addDoc(gameSessionsRef, {
    userId,
    startedAt: startTime,
    endTime,
    successCount: 0,
    failureCount: 0,
    tentatives: [],
  });

  return doc;
}

const gameSessionConverter = {
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): GameSession {
        const data = snapshot.data(options);
        return { userId: data.userId, startedAt: data.startedAt, endTime: data.endTime, successCount: data.successCount, failureCount: data.failureCount };
    },
    toFirestore(gameSession: GameSession): DocumentData {
        return {}
    }
}

export async function getGameSession(gameSessionId: string) {
  const ref = doc(db, "game_sessions", gameSessionId).withConverter(gameSessionConverter);
  return await getDoc(ref);
}
