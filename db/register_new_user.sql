insert into _user (
first_name, 
last_name,
email, 
phone_number, 
pass_hash, 
venmo
) values (
$1, 
$2, 
$3, 
$4, 
$5,
$6 
)

returning first_name, last_name, email, phone_number, id