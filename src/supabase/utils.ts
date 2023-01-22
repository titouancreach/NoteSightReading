import { createClient } from "@supabase/supabase-js";
import { Database } from "../lib/database.types";

export const supabase =
  window.location.hostname === "localhost"
    ? createClient<Database>(
        "http://localhost:54321",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
      )
    : createClient<Database>(
        "https://sheoeyvbryexbvsnybbj.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZW9leXZicnlleGJ2c255YmJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQzMjY3NjcsImV4cCI6MTk4OTkwMjc2N30.rkbNktk0m9y2UZQRESBeSYuSB3VF7C3MkFjjyEz1EQ4"
      );
