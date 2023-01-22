# Note sight reading

<div style="display: flex">
  <img style="display: block" src="https://user-images.githubusercontent.com/3995719/213889075-0821775f-3925-4efa-957c-fdad8b9ad563.png" width="200" height="auto">
  <img style="display: block; margin-left: 48px" src="https://user-images.githubusercontent.com/3995719/213889198-6d7e9245-b977-4b94-aa28-5a60b8bab8bd.png" width="200" height="auto">
  </div>


Give it a try: https://note-sight-reading.vercel.app/

ps1: it's a mobile project so don't open it with your computer browser)


[Week end side project]

Improve your sight reading on various keys (incoming) and complex chords (incoming too)
This use [Supabase](https://supabase.com/) for auth and data storage, Reactjs and tailwind.

TODO: 
  - bass clef
  - triade chords
  - jazz chords (half diminished, diminished, augmented, Major7...)
  - chords on both hands (treble + bass key) left hand root and right hand voicings 


## Supabase cheatsheet

```
        API URL : http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
```

Edit database directly via studio or not
```
supabase db diff migration_name -f migration_file
```

push migration to prod
```
supabase db push
```

when pushing to prod, postgres user is used so we need to make him owner of tables or views before:

```
ALTER TABLE public.user_stats OWNER TO "postgres";
```
