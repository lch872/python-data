# -*- coding: UTF-8 -*-

import shutil
import os
from handleData import catchData



month = ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
day = ['31', '30', '29', '28', '27', '26', '25', '24', '23', '22', '21', '20', '19', '18', '17', '16', '15', '14', '13', '12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']


shutil.rmtree('errorLog')
os.mkdir('errorLog')
for m in month:
    for d in day:
        if m in ['12', '11', '10', '09', '08']:
            continue
        if m == '07' and d in ['31', '30', '29', '28', '27', '26', '25','24', '23', '22', '21', '20']:
            continue
        if m == '02' and d in ["29","30",'31']:
            continue
        if m in ['02','04','06','09','11'] and d == '31':
            continue
        date = '2018-'+m+'-'+d
        catchData(date,deBug=0)

