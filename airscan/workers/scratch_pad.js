//unique metric name
[
  "dust",
  "uv",
  "ammonia",
  "carbon_monoxide",
  "nitrogen_dioxide",
  "oxygen",
  "humidity",
  "temperature",
  "sound",
  "pressure",
  "carbon_dioxide",
  "altitude",
  "propane",
  "butane",
  "methane",
  "hydrogen",
  "ethanol"
]

db.mycollection.find({"IMAGE URL":{$ne:null}});

{
  "metric_name" : "dust",
  "lower_value" : 23,
  "higher_value" : 25,
  "display_unit" : "PPM, SPM2.5"
}
{
  "metric_name" : "uv",
  "lower_value" : 0.299,
  "higher_value" : 1.027,
  "display_unit" : "mW/m^2"
}

{
  "metric_name" : "sound",
  "lower_value" : 30,
  "higher_value" : 50,
  "display_unit" : "dB"
}
{
  "metric_name" : "humidity",
  "lower_value" : 25,
  "higher_value" : 60,
  "display_unit" : "%"
}










{
  "metric_name" : "ammonia",
  "lower_value" : 400,
  "higher_value" : 400,
  "display_unit" : "μg/m^3"
}
{
  "metric_name" : "carbon_monoxide",
  "lower_value" : 4000,
  "higher_value" : 4000,
  "display_unit" : "μg/m^3"
}
{
  "metric_name" : "nitrogen_dioxide",
  "lower_value" : 80,
  "higher_value" : 80,
  "display_unit" : "μg/m^3"
}
                                {
                                  "metric_name" : "oxygen",
                                  "lower_value" : 19.5,
                                  "higher_value" : 23.5,
                                  "display_unit" : " %vol"
                                }

{
  "metric_name" : "carbon_dioxide",
  "lower_value" : 62889,
  "higher_value" : 80857,
  "display_unit" : "μg/m^3"
}

{
  "metric_name" : "propane",
  "lower_value" : 3781.03,
  "higher_value" : 27039.1,
  "display_unit" : "μg/m^3"
}
{
  "metric_name" : "butane",
  "lower_value" : 3559.3,
  "higher_value" : 35593.4,
  "display_unit" : "μg/m^3"
}
{
  "metric_name" : "methane",
  "lower_value" : 654.87,
  "higher_value" : 8513.34,
  "display_unit" : "μg/m^3"
}

{
  "metric_name" : "hydrogen",
  "lower_value" : 16.33,
  "higher_value" : 24.49,
  "display_unit" : "μg/m^3"
}
{
  "metric_name" : "ethanol",
  "lower_value" : 47.01,
  "higher_value" : 564.15,
  "display_unit" : "μg/m^3"
}