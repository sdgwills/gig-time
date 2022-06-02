delete from task
where gig_id = $1;

delete from gig
where id = $1;

