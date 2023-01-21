import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { createNewGameSession } from "../firebase/repository";
import { auth } from "../firebase/utils";
import { DashboardChart } from "./DashboardChart";
import { GameHistoryCard } from "./GameHistoryCard";
import { Summary } from "./Summary";

export function Dashboard() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className="rounded-lg flex-col flex min-h-screen px-2">
      <h1 className="text-xl text-center m-6 font-medium">
        {user?.displayName} - Expert
      </h1>

      <Summary className="mt-5" />
      <DashboardChart />

      <div className="space-y-4 pt-6 mb-6">
        <GameHistoryCard />
        <GameHistoryCard />
        <GameHistoryCard />
        <GameHistoryCard />
      </div>

      <button
        type="button"
        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold rounded-lg px-5 py-2.5 text-center mr-2 mt-auto mb-6"
        onClick={async () => {
            if (user?.uid) {
                const doc = await createNewGameSession(user?.uid)
                navigate('/play/' + doc.id)
            }
        }}
      >
        Start
      </button>
    </div>
  );
}
