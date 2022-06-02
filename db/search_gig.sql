select * from gig g
where g.title ilike $2 
and user_id = $1