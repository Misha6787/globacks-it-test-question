SET STATISTICS TIME ON;

WITH RecursiveCTE AS (
    SELECT id, parent_id, name, 0 AS level
    FROM subdivisions
    WHERE parent_id IS NULL

    UNION ALL

    SELECT t.id, t.parent_id, t.name, level + 1
    FROM subdivisions t
    INNER JOIN RecursiveCTE r ON t.parent_id = r.id
)

SELECT
  t1.id,
  t1.name,
  t2.name as sub_name,
  t1.subdivision_id as sub_id,
  t2.level as sub_level,
  (SELECT COUNT(*) FROM collaborators WHERE t2.id = collaborators.subdivision_id) as colls_count
FROM
  collaborators t1,
  RecursiveCTE t2
WHERE
  t1.subdivision_id = t2.id and
  t2.parent_id is not null and
  t2.id NOT IN (100055, 100059) and 
  t1.age < 40 and
  len(t1.name) > 11

ORDER by t1.id ASC