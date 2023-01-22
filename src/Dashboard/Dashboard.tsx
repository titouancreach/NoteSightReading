import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../App";
import { supabase } from "../supabase/utils";
import { DashboardChart } from "./DashboardChart";
import { GameHistoryCard } from "./GameHistoryCard";
import { Summary } from "./Summary";

export function Dashboard() {
  const navigate = useNavigate();

  const [history, setHistory] = useState<
    { total: number; started_at: Date; uid: string }[] | null
  >(null);

  const [userStat, setUserStat] = useState<{
    user_id: string;
    best_attempt: number;
    rank: number;
    attempts_count: number;
  } | null>(null);

  var session = useContext(SessionContext);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("game_histories")
        .select("*")
        .eq("user_id", (session as any).user.id)
        .order("started_at", { ascending: false })
        .limit(50);

      const { data: data2, error: error2 } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", (session as any).user.id)
        .limit(1);

      if (error) {
        console.log(error);
      }

      if (error2) {
        console.log(error2);
      }

      if (data) {
        setHistory(
          data.map((x) => ({
            started_at: new Date(x.started_at as string),
            total: x.total as number,
            uid: x.uid as string,
          }))
        );

        if (data2) {
          if (data2.length === 0) {
            setUserStat({
              user_id: "a5b1f562-0030-4668-82ab-8f110aeb5b76",
              best_attempt: 0,
              rank: 0,
              attempts_count: 0,
            });
          } else {
            const data = data2[0];
            setUserStat({
              attempts_count: data.attempts_count as number,
              best_attempt: data.best_attempt as number,
              rank: data.rank as number,
              user_id: data.user_id as string,
            });
          }
        }
      }
    })();
  }, []);

  if (history === null || userStat === null) {
    return null;
  }

  return (
    <div className="rounded-lg flex-col flex min-h-screen px-4">
      <h1 className="text-xl text-center m-6 font-medium">
        {history.length === 0 ? "Welcome 👋" : "Expert"}
      </h1>

      <Summary
        className="mt-5"
        attemptsCount={userStat.attempts_count}
        bestAttempt={userStat.best_attempt}
        rank={userStat.rank}
      />

      {history.length > 1 && (
        <DashboardChart history={[...history].reverse()} className="-mx-4" />
      )}

      {history.length === 1 && (
        <div className="text-center text-gray-500 mt-10 px-5">
          {" "}
          Play at least two games to see your progress curve
        </div>
      )}

      {history.length === 0 && (
        <div>
          <div className="text-center text-gray-500 mt-10">
            No game history yet
          </div>
          <div className="text-center text-gray-500 ">
            Play some games to become a better musician
          </div>
        </div>
      )}

      <div className="space-y-4 pt-6 mb-6">
        {history.slice(0, 4).map((h) => (
          <GameHistoryCard key={h.uid} total={h.total} date={h.started_at} />
        ))}
      </div>

      <button
        type="button"
        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold rounded-lg px-5 py-2.5 text-center mr-2 mt-auto mb-6"
        onClick={async () => {
          const { data } = await supabase.auth.getSession();
          const inserted = await supabase
            .from("game_sessions")
            .insert({
              user_id: data.session?.user.id,
              started_at: new Date().toISOString(),
              end_at: new Date(new Date().getTime() + 60 * 1000).toISOString(),
            })
            .select("uid");

          navigate("/play/" + inserted!.data![0]!["uid"]);
        }}
      >
        Start
      </button>
    </div>
  );
}
