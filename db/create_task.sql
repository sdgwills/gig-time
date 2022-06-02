insert into task(
    gig_id,
    task_title,
    task_desc
)values(
    ${gigId},
    ${taskTitle},
    ${taskDesc}
)
returning task;