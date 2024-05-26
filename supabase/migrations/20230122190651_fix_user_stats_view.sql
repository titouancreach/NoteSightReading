
CREATE OR REPLACE VIEW user_stats AS 

SELECT security.user_id
    , security.best_attempt
    , security.rank
    , security.attempts_count
FROM (
    SELECT gs.user_id
        , max(q.total) AS best_attempt
        , rank() OVER (
            ORDER BY (sum(q.total)) DESC
            ) AS rank
        , count(q.total) AS attempts_count
    FROM game_sessions gs
    JOIN (
        SELECT attempts.game_session_id
            , sum(CASE attempts.is_success
                    WHEN true
                        THEN 15
                    ELSE '-10'::INTEGER
                    END) AS total
        FROM attempts
        GROUP BY attempts.game_session_id
        ) q
        ON q.game_session_id = gs.uid
    GROUP BY gs.user_id
    ) security
WHERE security.user_id = auth.uid()
    OR CURRENT_USER = 'postgres'::name
    OR CURRENT_USER = 'postgres'::name;

