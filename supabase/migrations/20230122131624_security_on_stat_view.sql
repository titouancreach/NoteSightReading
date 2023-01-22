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
  WHERE (security.user_id = auth.uid());



