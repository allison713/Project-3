import pandas as pd 
data=pd.read_csv("complete.csv",on_bad_lines='skip')

new_data={}
for i in range(len(data.columns)):
    new_data[data.columns[i]]=list(data[data.columns[i]])
    

import json

# Serializing json
json_object = json.dumps(new_data, indent=4)
 
# Writing to sample.json
with open("complete.json", "w") as outfile:
    outfile.write(json_object)