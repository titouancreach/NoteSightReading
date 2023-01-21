import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { route } from "../App";
import { supabase } from "../supabase/utils";

export function Login() {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg flex-col flex min-h-screen justify-around">
      <div className="text-center m-6">
        <h1 className="text-4xl">Improve your sight reading</h1>
        <h2 className="text-lg mt-4 font-medium">
          All keys, individual notes and complex chords
        </h2>
      </div>
      <div className="flex">
        <MusicalNoteIcon className="w-52 m-auto" />
      </div>
      <div className="flex">
        <button
          type="button"
          onClick={async () => {
            const { data, error } = await supabase.auth.signInWithOAuth({
              provider: "google",
            });

            // should not happen since supabase auth redirect
            if (error === null) {
              navigate(route("/dashboard"));
            }
          }}
          className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-[#4285F4]/55 inline-flex mx-auto"
        >
          <svg
            className="w-4 h-4 mr-2 -ml-1"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
