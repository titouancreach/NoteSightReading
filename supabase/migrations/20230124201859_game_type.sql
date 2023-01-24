CREATE TABLE ref_game_types (
    code VARCHAR(50) primary key,
    label VARCHAR(100)
);

INSERT INTO ref_game_types
    (code, label) values ('FIND_NOTE_NAME', 'Find the right note');

INSERT INTO ref_game_types
    (code, label) values ('FIND_DEGREE', 'Find the right degree in the scale');

Alter table game_sessions add game_type_code  varchar(50) CONSTRAINT fk_game_sessions_ref_game_types references ref_game_types (code);

UPDATE game_sessions set game_type_code = 'FIND_NOTE_NAME';

alter table game_sessions alter column game_type_code set not null;


