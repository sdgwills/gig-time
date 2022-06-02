select * from gig g
join task t on g.id = t.gig_id
where user_id = $1