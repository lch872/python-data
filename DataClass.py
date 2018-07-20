# -*- coding: UTF-8 -*-
import time


class league(object):

    def __init__(self,infoStr):
        infoArr = infoStr.split(",")
        self.lId = infoArr[0]
        self.type = infoArr[1]
        self.color = infoArr[2]
        self.cnName = infoArr[3]
        self.trName = infoArr[4]
        self.enName = infoArr[5]
        self.url = infoArr[6]
        self.important = infoArr[7]
        self.matchNum = 0
        self.showNum = 0
        self.show = 1
        self.shengfu = 0
        self.beidan = 0


class OddsOU(object):
    def __init__(self,infoStr):
        infoArr = infoStr.split(',')
        self.mId = infoArr[0]
        self.cId = infoArr[1]
        self.goalF = infoArr[2]
        self.overF = infoArr[3]
        self.underF = infoArr[4]
        self.goal = infoArr[5]
        self.over = infoArr[6]
        self.under = infoArr[7]

class Match(object):
    def __init__(self,infoStr):
        infoArr = infoStr.split(',')
        self.mId = infoArr[0]
        self.lId = infoArr[1]

        # 使用time
        timeArray = time.localtime(int(infoArr[2][:-3]))
        self.time = time.strftime("%Y-%m-%d %H:%M", timeArray)
        if infoArr[3] != "":
            timeArray = time.localtime(int(infoArr[3][:-3]))
            self.time2 = time.strftime("%Y-%m-%d %H:%M", timeArray)
        self.t1Id = infoArr[4]
        self.t1CnName = infoArr[5]
        self.t1TrName = infoArr[6]
        self.t1EnName = infoArr[7]
        if infoArr[8] != "":
           self.t1Position = "[" + infoArr[8] + "]"
        else:
            self.t1Position = ""
        self.t2Id = infoArr[9]
        self.t2CnName = infoArr[10]
        self.t2TrName = infoArr[11]
        self.t2EnName = infoArr[12]
        if infoArr[13] != "":
           self.t2Position = "[" + infoArr[13] + "]"
        else:
            self.t2Position = ""

        self.state = infoArr[14]
        self.homeScore = infoArr[15]
        self.guestScore = infoArr[16]
        self.tv = infoArr[17]
        self.flag = ""
        if infoArr[18] == "True":
            self.flag = "(中)"
        self.level = infoArr[19]

#亚赔信息
class OddsAsian(object):
    def __init__(self,infoStr):
        infoArr = infoStr.split(",")
        self.mId = infoArr[0]
        self.cId = infoArr[1]
        self.goalF = infoArr[2]
        self.homeF = infoArr[3]
        self.awayF = infoArr[4]
        self.goal = infoArr[5]
        self.home = infoArr[6]
        self.away = infoArr[7]
        self.close = infoArr[8]
        self.zoudi = infoArr[9]

#欧赔信息
class Odds1x2(object):
    def __init__(self,infoStr):
        infoArr = infoStr.split(",")
        self.mId = infoArr[0]
        self.cId = infoArr[1]
        self.hwF = infoArr[2]
        self.stF = infoArr[3]
        self.awF = infoArr[4]
        self.hw = infoArr[5]
        self.st = infoArr[6]
        self.aw = infoArr[7]

#大小赔率信息
class OddsOU(object):
    def __init__(self,infoStr):
        infoArr = infoStr.split(",")
        self.mId = infoArr[0]
        self.cId = infoArr[1]
        self.goalF = infoArr[2]
        self.overF = infoArr[3]
        self.underF = infoArr[4]
        self.goal = infoArr[5]
        self.over = infoArr[6]
        self.under = infoArr[7]

GoalCn = ["0", "0/0.5", "0.5", "0.5/1", "1", "1/1.5", "1.5", "1.5/2", "2", "2/2.5", "2.5", "2.5/3", "3", "3/3.5", "3.5", "3.5/4", "4", "4/4.5", "4.5", "4.5/5", "5", "5/5.5", "5.5", "5.5/6", "6", "6/6.5", "6.5", "6.5/7", "7", "7/7.5", "7.5", "7.5/8", "8", "8/8.5", "8.5", "8.5/9", "9", "9/9.5", "9.5", "9.5/10", "10", "10/10.5", "10.5", "10.5/11", "11", "11/11.5", "11.5", "11.5/12", "12", "12/12.5", "12.5", "12.5/13", "13", "13/13.5", "13.5", "13.5/14", "14"];
GoalCn2 = ["0", "0/-0.5", "-0.5", "-0.5/-1", "-1", "-1/-1.5", "-1.5", "-1.5/-2", "-2", "-2/-2.5", "-2.5", "-2.5/-3", "-3", "-3/-3.5", "-3.5", "-3.5/-4", "-4", "-4/-4.5", "-4.5", "-4.5/-5", "-5", "-5/-5.5", "-5.5", "-5.5/-6", "-6", "-6/-6.5", "-6.5", "-6.5/-7", "-7", "-7/-7.5", "-7.5", "-7.5/-8", "-8", "-8/-8.5", "-8.5", "-8.5/-9", "-9", "-9/-9.5", "-9.5", "-9.5/-10", "-10", "-10/-10.5", "-10.5", "-10.5/-11", "-11", "-11/-11.5", "-11.5", "-11.5/-12", "-12","-12/-12.5", "-12.5", "-12.5/-13", "-13", "-13/-13.5", "-13.5", "-13.5/-14", "-14"];

def Goal2GoalCn(goal):
    goal = float(goal)
    if (goal == ""):
        return ""
    else:
        if (goal >= 0):
            return GoalCn[int(goal*4)]
        else:
            return GoalCn2[abs(int(goal*4))]