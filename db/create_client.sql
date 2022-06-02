insert into client (
  client_first, 
  client_last, 
  client_email, 
  client_phone, 
  current_on_payment
) values (
  $1, 
  $2, 
  $3, 
  $4, 
  true
)

returning id
