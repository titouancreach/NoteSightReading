alter table "public"."ref_game_types" add column "subtitle" character varying(200);

create or replace view "public"."user_stats" as  SELECT security.user_id,
    security.best_attempt,
    security.rank,
    security.attempts_count
   FROM ( SELECT gs.user_id,
            max(q.total) AS best_attempt,
            rank() OVER (PARTITION BY gs.user_id ORDER BY (sum(q.total))) AS rank,
            count(q.total) AS attempts_count
           FROM (game_sessions gs
             JOIN ( SELECT attempts.game_session_id,
                    sum(
                        CASE attempts.is_success
                            WHEN true THEN 15
                            ELSE '-10'::integer
                        END) AS total
                   FROM attempts
                  GROUP BY attempts.game_session_id) q ON ((q.game_session_id = gs.uid)))
          GROUP BY gs.user_id) security
  WHERE ((security.user_id = auth.uid()) OR (CURRENT_USER = 'postgres'::name) OR (CURRENT_USER = 'supabase_admin'::name));


update ref_game_types set subtitle = 'Guess the note displayed on stave' where code = 'FIND_NOTE_NAME';

update ref_game_types set subtitle = 'Find the degree of the note in the given scale' where code = 'FIND_DEGREE';
