alter table "public"."attempts" enable row level security;

alter table "public"."game_sessions" enable row level security;

create or replace view "public"."game_histories" as  SELECT g.uid,
    g.started_at,
    q.total,
    g.user_id
   FROM (game_sessions g
     JOIN ( SELECT attempts.game_session_id,
            sum(
                CASE attempts.is_success
                    WHEN true THEN 15
                    ELSE '-10'::integer
                END) AS total
           FROM attempts
          GROUP BY attempts.game_session_id) q ON ((q.game_session_id = g.uid)))
  WHERE (g.user_id = auth.uid());



