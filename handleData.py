# -*- coding: UTF-8 -*-

from DataClass import *
from items import LchItem
import MySQLdb
import requests
import urllib,urllib2
import json
from config import *

def catchData(date,retry=3,deBug=0):
    print ('开始日期: ' + date)
    filePath = "/Users/lch/Desktop/dataLog/" + date + '.txt'
    data =''
    try:
        with open(filePath,'r') as f:
            data = f.read()
    except:
        url = 'http://score.nowscore.com/odds/oddsData.aspx?date=' + date
        header_dict = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36'}
        print(url)
        req = urllib2.Request(url=url,headers=header_dict)
        try:
            res = urllib2.urlopen(req)
            data = res.read()
        except urllib2.HTTPError as e:
            print(e)
            data =''
            if retry > 0:
                return catchData(data,retry-1)
            return

        filePath = "/Users/lch/Desktop/dataLog/" + date + '.txt'
        with open(filePath,"w") as f:
            f.write(data)

    if len(data) < 100:
        with open('errorLog/'+date+'.json',"w") as f:
            f.write(json.dumps(['empty date']))
        return

    #分隔大数据域
    domains = data.split('$')

    #处理联赛数据域
    matchdata = dict()
    leagueDomain = domains[0].split(';')
    matchdata['LeagueNum'] = len(leagueDomain)
    leagueDict = dict()
    for item in leagueDomain:
        leagueItem = league(item)
        leagueDict[leagueItem.lId] = leagueItem.trName



    #处理亚赔数据域
    A_oods = dict()
    oddsDomain = domains[2].split(';')
    for item in oddsDomain:
        oddsItem = OddsAsian(item)
        A_oods[oddsItem.mId+"_"+oddsItem.cId] = oddsItem

    #处理欧赔数据域
    E_oods = dict()
    oddsDomain = domains[3].split(';')
    for item in oddsDomain:
        oddsItem = Odds1x2(item)
        E_oods[oddsItem.mId+"_"+oddsItem.cId] = oddsItem


    #处理大小球数据域
    oddsDomain = domains[4].split(";")
    OddsOUList = dict()
    for item in oddsDomain:
        oddsItem = OddsOU(item)
        OddsOUList[oddsItem.mId+"_"+oddsItem.cId] = oddsItem

    #处理比赛信息
    matchDomain = domains[1].split(";")
    numbers = 0
    total = len(matchDomain)

    #错误容器
    errorList = list()
    errorDetail = dict()
    sqlDone = 0

    if deBug:
        db = MySQLdb.connect("127.0.0.1", username, "123", tableName, charset='utf8')
    else:
        db = MySQLdb.connect(database, username, password, tableName, charset='utf8')
    cursor = db.cursor()

    for item in matchDomain:
        numbers = numbers + 1
        #创建类
        SQLItem = LchItem()

        matchItem = Match(item)

        SQLItem["matchId"] = matchItem.mId
        SQLItem["leagueName"] = leagueDict[matchItem.lId]
        SQLItem["homeTeam"] = matchItem.t1CnName
        SQLItem["guestTeam"] = matchItem.t2CnName
        SQLItem["homeScore"] = matchItem.homeScore
        SQLItem["guestScore"] = matchItem.guestScore
        SQLItem["startTime"] = matchItem.time
        SQLItem["matchDay"] = date
        if matchItem.mId+'_'+'3' in A_oods.keys():
            sss = A_oods[matchItem.mId+'_'+'3']
            SQLItem["homeFirstOdds_1"] = sss.homeF
            SQLItem["homeUpOdds_1"] = sss.home
            try:
                SQLItem["firstOdds_1"] = Goal2GoalCn(sss.goalF)
                SQLItem["upOdds_1"] = Goal2GoalCn(sss.goal)
            except:
                pass

            SQLItem["guestFirstOdds_1"] = sss.awayF
            SQLItem["guestUpOdds_1"] = sss.away

        if matchItem.mId+'_'+'3' in E_oods.keys():
            sss = E_oods[matchItem.mId+'_'+'3']
            SQLItem["homeWinFirstOdds"] = sss.hwF
            SQLItem["homeWinUpOdds"] = sss.hw
            SQLItem["firsDrawnOdds"] = sss.stF
            SQLItem["upDrawnOdds"] = sss.st
            SQLItem["guestWinFirstOdds"] = sss.awF
            SQLItem["guestWinUpOdds"] = sss.aw




        if matchItem.mId+'_'+'3' in OddsOUList.keys():
            sss = OddsOUList[matchItem.mId+'_'+'3']
            SQLItem["homeFirstOdds_3"] = sss.overF
            SQLItem["homeUpOdds_3"] = sss.over

            try:
                SQLItem["firstOdds_3"] = Goal2GoalCn(sss.goalF)
                SQLItem["upOdds_3"] = Goal2GoalCn(sss.goal)
            except :
                print "-----------"
                print SQLItem["homeTeam"]
                print "-----------"
                pass

            SQLItem["guestFirstOdds_3"] = sss.underF
            SQLItem["guestUpOdds_3"] = sss.under


        if matchItem.mId+'_'+'3' in A_oods.keys() or matchItem.mId+'_'+'3' in E_oods.keys() or matchItem.mId+'_'+'3' in OddsOUList.keys():
            if cursor is None:
                if deBug:
                    db = MySQLdb.connect("127.0.0.1", username, "123", tableName, charset='utf8')
                else:
                    db = MySQLdb.connect(database, username, password, tableName, charset='utf8')
                cursor = db.cursor()
            else:
                sql = SQLItem.makeSQL()
                try:
                    cursor.execute(sql)
                    db.commit()
                    sqlDone = sqlDone + 1
                except MySQLdb.Error,e:
                    errDict = dict()
                    errDict['error'] = str(e)
                    errDict['item'] = SQLItem
                    errorList.append(errDict)
                    errorDetail[date] = errorList



    print ('完成日期: ' + date)
    print('SQL写入: %s ,错误 %s ,'%(sqlDone,len(errorList)) )
    print('Processing: ' + str(numbers) + ' / ' + str(total))
    print ('------------')
    if len(errorDetail) > 0:
        with open('errorLog/'+date+'.json',"w") as f:
            f.write(json.dumps(errorDetail))
