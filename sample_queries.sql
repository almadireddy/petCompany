/*Show count of largest population (pets)*/
SELECT Count(*)
FROM PET;

/*Show a listing of a key entity in the database*/
SELECT Fname, Lname, MInit
FROM CLIENT;

/*Show a list of entities that must function together 
(Show a list of managers and receptionists who work together (JOIN))*/
SELECT r.Fname, r.Lname, m.Fname, m.Lname
FROM MANAGER m, SHIFT s, RECEPTIONIST r
WHERE s.supervisor = m.id AND s.receptionist = r.id;

/*Show the cost of an occurrence, derived using aggregate functions (Cost to groom a pet)*/
SELECT AVG(a.duration * g.hourly_wage)
FROM APPOINTMENT a, GROOMER g
WHERE a.groomer_id = g.id;

/*Show a schedule for multiple occurrences, sorted by date and time (today’s appointments)*/
SELECT *
FROM APPOINTMENT
WHERE date(start_time) = CAST(getdate() AS date)
ORDER BY start_time;

/*How many Groomers are working during a particular shift*/
SELECT COUNT(gs.groomer_id), gs.shift_id
FROM GROOMERSHIFTS gs, SHIFT s
WHERE gs.shift_id = s.id
GROUP BY gs.shift_id;

/*Which manager is working a particular shift*/
SELECT m.Fname, n.Lname, s.id
FROM SHIFT s, MANAGER m
WHERE m.id = s.supervisor;

/*How many appointments did a particular groomer handle all last year*/
SELECT COUNT(*) as appointmentCount, g.Fname, g.Lname, g.id
FROM APPOINTMENT a, GROOMER g
WHERE g.id = a.groomer_id
GROUP BY g.id;

/*How many appointments did we do last week*/

/*How many clients are inactive (have not had an appointment in a year)*/

/*How many appointments are scheduled for today*/