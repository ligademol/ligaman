SELECT ranktemp.nr, plg.naam, sum(matchgespeeld) as m, sum(gvoor) as dv, sum(gtegen) as dt, (sum(gvoor) - sum(gtegen)) as ds, sum(winst) as w, sum(verlies) as v, sum(gelijk) as g,  ((sum(winst)*2) + sum(gelijk)) as p  FROM (

SELECT thuisnr as nr, sum(thuisscore) as gvoor, sum(uitscore) as gtegen, 
	sum(case when thuisscore > uitscore then 1 else 0 end) as winst, 
	sum(case when thuisscore < uitscore then 1 else 0  end) as verlies, 
	sum(case when thuisscore = uitscore then 1 else 0  end) as gelijk, 
	count(*) as matchgespeeld 

 FROM [Liga].[dbo].[wedstrijd]
 WHERE comp ='LIGA' AND gespeeld = 1
 group by thuisnr 

 UNION ALL

SELECT uitnr as nr, sum(uitscore) as gvoor, sum(thuisscore) as gtegen, 
	sum(case when thuisscore < uitscore then 1 else 0 end) as winst,
	sum(case when thuisscore > uitscore then 1 else 0 end)as verlies,
	sum(case when thuisscore = uitscore then 1 else 0  end) as gelijk,
	count(*) as matchgespeeld 
 FROM [Liga].[dbo].[wedstrijd] 

 WHERE comp ='LIGA' AND gespeeld = 1
 group by uitnr ) as ranktemp
  Inner Join [Liga].[dbo].[ploeg] plg 
 ON ranktemp.nr = plg.nr
 group by ranktemp.nr, plg.naam
 order by p desc, ds desc"
 