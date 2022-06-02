select * from _user u
join gig g on u.id = g.user_id 
join client c on g.client_id = c.id
join task t on t.gig_id = g.id
where u.id = $1