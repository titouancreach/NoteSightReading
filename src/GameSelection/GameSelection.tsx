import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/utils";

export function GameSelector() {
  const [gameList, setGameList] = useState<
    { code: string; label: string | null; subtitle: string | null }[] | null
  >(null);

  useEffect(() => {
    const getGameAvailableList = async () => {
      const { data } = await supabase.from("ref_game_types").select("*");
      setGameList(data);
    };

    getGameAvailableList();
  }, []);

  return (
    <div className="rounded-lg flex-col flex min-h-screen px-4 max-w-xl m-auto">
      <h1 className="text-xl text-center mt-6 font-medium">Welcome 👋</h1>
      <p className="text-center font-medium mb-6">Select a game to start</p>

      <div className="flex flex-col space-y-6">
        {gameList &&
          gameList?.map((game) => (
            <Link to={`/dashboard/${game.code}`}
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 rounded-lg px-5 py-2.5 mr-2 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 flex-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
              <div className="ml-3">
                <div className="font-bold">{game.label}</div>
                <div className="">{game.subtitle}</div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
