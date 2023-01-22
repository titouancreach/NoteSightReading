create policy "Private operation on attemps"
on "public"."attempts"
as permissive
for all
to public
using ((game_session_id IN ( SELECT game_sessions.uid
   FROM game_sessions
  WHERE (game_sessions.user_id = auth.uid()))));


create policy "Private operation on game_sessions"
on "public"."game_sessions"
as permissive
for all
to public
using ((auth.uid() = user_id));



