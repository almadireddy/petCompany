USE PET_SALON;
/*Show count of largest population (pets)*/
SELECT Count(*)
FROM PET;

/*Show a listing of a key entity in the database*/
SELECT Fname, Lname, MInit
FROM CLIENT;

/*Show a list of entities that must function together 
(Show a list of managers and receptionists who work together (JOIN))*/
SELECT DISTINCT r.name, m.name
FROM EMPLOYEE r, EMPLOYEE m, SHIFT s
WHERE s.supervisor = r.employee_id AND s.receptionist = m.employee_id;

/*Show the cost of an occurrence, derived using aggregate functions (Cost to groom a pet)*/
SELECT AVG((HOUR(a.duration) + MINUTE(a.duration)/60) * g.hourly_wage)
FROM APPOINTMENT a, EMPLOYEE g
WHERE a.groomer_id = g.employee_id;

/*Show a schedule for multiple occurrences, sorted by date and time (today’s appointments)*/
SELECT *
FROM APPOINTMENT
WHERE date(start_time) = CURDATE()
ORDER BY start_time;

/*How many Groomers are working during a particular shift*/
SELECT COUNT(gs.groomer_id), gs.shift_id
FROM GROOMER_SHIFT gs, SHIFT s
WHERE gs.shift_id = s.shift_id
GROUP BY gs.shift_id;

/*Which manager is working a particular shift*/
SELECT m.name, s.shift_id
FROM SHIFT s, EMPLOYEE m
WHERE EXISTS(SELECT * FROM MANAGER WHERE m.employee_id = manager_id)
AND m.employee_id = s.supervisor;

/*How many appointments did a particular groomer handle all last year*/
SELECT COUNT(*) as appointmentCount, g.name, g.employee_id
FROM APPOINTMENT a, EMPLOYEE g
WHERE g.employee_id = a.groomer_id
GROUP BY g.employee_id;


/*How many appointments did we do in the past week*/
SELECT COUNT(*)
FROM APPOINTMENT a
WHERE DATEDIFF(CURDATE(), DATE(a.start_time)) < 7;

/*How many clients are inactive (have not had an appointment in a year)*/
SELECT c.Fname, c.Lname
FROM CLIENT c
WHERE NOT EXISTS(SELECT * 
				FROM APPOINTMENT a 
                WHERE a.owner_id = c.client_id 
                AND DATEDIFF(CURDATE(), a.start_time) < 365 );

/*How many appointments are scheduled for today*/
SELECT COUNT(*), CURDATE()
FROM APPOINTMENT a
WHERE DATE(a.start_time) = CURDATE();