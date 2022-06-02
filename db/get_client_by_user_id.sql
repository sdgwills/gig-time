select * from gig g
join client c on g.client_id = c.id
join _user u on g.user_id = u.id
where u.id = $1