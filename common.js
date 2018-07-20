var GoalCn = ["0", "0/0.5", "0.5", "0.5/1", "1", "1/1.5", "1.5", "1.5/2", "2", "2/2.5", "2.5", "2.5/3", "3", "3/3.5", "3.5", "3.5/4", "4", "4/4.5", "4.5", "4.5/5", "5", "5/5.5", "5.5", "5.5/6", "6", "6/6.5", "6.5", "6.5/7", "7", "7/7.5", "7.5", "7.5/8", "8", "8/8.5", "8.5", "8.5/9", "9", "9/9.5", "9.5", "9.5/10", "10", "10/10.5", "10.5", "10.5/11", "11", "11/11.5", "11.5", "11.5/12", "12", "12/12.5", "12.5", "12.5/13", "13", "13/13.5", "13.5", "13.5/14", "14"];
var GoalCn2 = ["0", "0/-0.5", "-0.5", "-0.5/-1", "-1", "-1/-1.5", "-1.5", "-1.5/-2", "-2", "-2/-2.5", "-2.5", "-2.5/-3", "-3", "-3/-3.5", "-3.5", "-3.5/-4", "-4", "-4/-4.5", "-4.5", "-4.5/-5", "-5", "-5/-5.5", "-5.5", "-5.5/-6", "-6", "-6/-6.5", "-6.5", "-6.5/-7", "-7", "-7/-7.5", "-7.5", "-7.5/-8", "-8", "-8/-8.5", "-8.5", "-8.5/-9", "-9", "-9/-9.5", "-9.5", "-9.5/-10", "-10", "-10/-10.5", "-10.5", "-10.5/-11", "-11", "-11/-11.5", "-11.5", "-11.5/-12", "-12","-12/-12.5", "-12.5", "-12.5/-13", "-13", "-13/-13.5", "-13.5", "-13.5/-14", "-14"];
var week = new Array("(日)", "(一)", "(二)", "(三)", "(四)", "(五)", "(六)");

function Goal2GoalCn(goal) {
    if (goal == "")
        return "";
    else {
        if (goal >= 0) return GoalCn[parseInt(goal * 4)];
        else return GoalCn2[Math.abs(parseInt(goal * 4))];
    }
}
function Goal2GoalCn2(goal) {
    if (goal == "")
        return "";
    else {
        if (goal >= 0) return GoalCn[parseInt(goal * 4)];
        else return GoalCn2[Math.abs(parseInt(goal * 4))];
    }
}
function BgColor(odds1, odds2) {
    var bg = "normal";
    if (odds1 < odds2) bg = "up";
    if (odds1 > odds2) bg = "down";
    return bg;
}
function TdBgColor(odds1, odds2) {
    var bg = "";
    if (odds1 < odds2) bg = "#ff8888";
    if (odds1 > odds2) bg = "#88ff88";
    return bg;
}

function Hashtable2() {
    this._hash = new Object();
    this.add = function (key, value) {
        if (typeof (key) != "undefined") {
            this._hash[key] = typeof (value) == "undefined" ? null : value;
            return true;
        }
        else
            return false;
    }
    this.remove = function (key) { delete this._hash[key]; }
    this.keys = function () {
        var keys = new Array();
        for (var key in this._hash) {
            keys.push(key);
        }
        return keys;
    }
    this.count = function () { var i = 0; for (var k in this._hash) { i++; } return i; }
    this.items = function (key) { return this._hash[key]; }
    this.contains = function (key) {
        return typeof (this._hash[key]) != "undefined";
    }
    this.clear = function () { for (var k in this._hash) { delete this._hash[k]; } }
}

var state_ch = [];
state_ch[0] = "推迟,推遲,Defer";
state_ch[1] = "中断,中斷,Halt";
state_ch[2] = "腰斩,腰斬,Halt";
state_ch[3] = "<font color=green>待定</font>,<font color=green>待定</font>,<font color=green>Wait</font>";
state_ch[4] = "取消,取消,Cancel";
state_ch[13] = "<b>完</b>,<b>完</b>,<b>Ft</b>";
state_ch[14] = ",,";
state_ch[15] = "上,上,Part1";
state_ch[16] = "<font color=blue>中</font>,<font color=blue>中</font>,<font color=blue>Half</font>";
state_ch[17] = "下,下,Part2";
state_ch[18] = "加,加,Ot";
state_ch[19] = "点,點,PSO";


var company = new Array(40);
company[0] = "足彩";
company[1] = "澳彩";
company[2] = "波音";
company[3] = "Crown";
company[4] = "立博";
company[5] = "云鼎";
company[7] = "SNAI";
company[8] = "Bet365";
company[9] = "威廉";
company[12] = "易胜博";
company[14] = "韦德";
company[15] = "SSP";
company[17] = "明陞";
company[18] = "Eurobet";
company[19] = "Interwetten";
company[22] = "10Bet";
company[23] = "金宝博";
company[24] = "12bet";
company[29] = "乐天堂";
company[31] = "利记";
company[33] = "永利高";
company[35] = "盈禾";

var riseColor = "#FFB0B0";
var fallColor = "#00FF44";
var changePkColor = "#D06666";
var nofityTimer = "";
var oldLevel = -1;
var selDate = "";
var matchType = 0;
var strZuodiList = ",", strNotOpenList = ",", strRunList = ",";
var sclassSelectNum = 0;
//定义namespace
var _glodds = new Object();
//公共变量
_glodds.SplitDomain = "$";
_glodds.SplitRecord = ";";
_glodds.SplitColumn = ",";


//通用列表类
_glodds.List = function () {
    this.items = new Array();
    this.keys = new Object();

    this.Add = function (key, value) {
        if (typeof (key) != "undefined") {
            var vv = typeof (value) == "undefined" ? null : value;
            var idx = this.keys[key];
            if (idx == null) {
                idx = this.items.length;
                this.keys[key] = idx;
            }
            this.items[idx] = vv;
        }
    }

    this.Get = function (key) {
        var idx = this.keys[key];
        if (idx != null)
            return this.items[idx];
        return null;
    }

    this.Clear = function () {
        for (var k in this.keys) {
            delete this.keys[k];
        }
        delete this.keys;
        this.keys = null;
        this.keys = new Object();

        for (var i = 0; i < this.items.length; i++) {
            delete this.items(i);
        }
        delete this.items;
        this.items = null;
        this.items = new Array();
    }
}


//联赛项类
_glodds.League = function (infoStr) {
    var infoArr = infoStr.split(_glodds.SplitColumn);
    this.lId = infoArr[0];
    this.type = infoArr[1];
    this.color = infoArr[2];
    this.cnName = infoArr[3];
    this.trName = infoArr[4];
    this.enName = infoArr[5];
    this.url = infoArr[6];
    this.important = infoArr[7];
    this.matchNum = 0;
    this.showNum = 0;
    this.show = true;
    this.shengfu = 0;
    this.beidan = 0;

    this.getName = function () {
        if (lang == "2")
            return this.enName;
        else if (lang == "1")
            return this.trName;
        else
            return this.cnName;
    }
}


//比赛项类
_glodds.Match = function (infoStr) {
    var infoArr = infoStr.split(_glodds.SplitColumn); //265454,539,2009-5-6 23:00:00,,6734,学生体育,學生體育,Sportul Studentesc,14,6730,德尔塔,德爾塔,Delta Tulcea,2,0,0,0,,False;
    this.mId = infoArr[0];
    this.lId = infoArr[1];
    this.time = new Date(parseInt(infoArr[2]));
    if (infoArr[3] != "") this.time2 = new Date(parseInt(infoArr[3]));
    this.t1Id = infoArr[4];
    this.t1CnName = infoArr[5];
    this.t1TrName = infoArr[6];
    this.t1EnName = infoArr[7];
    this.t1Position = infoArr[8] != "" ? "[" + infoArr[8] + "]" : "";
    this.t2Id = infoArr[9];
    this.t2CnName = infoArr[10];
    this.t2TrName = infoArr[11];
    this.t2EnName = infoArr[12];
    this.t2Position = infoArr[13] != "" ? "[" + infoArr[13] + "]" : "";
    this.state = infoArr[14];
    this.homeScore = infoArr[15];
    this.guestScore = infoArr[16];
    this.tv = infoArr[17];
    this.flag = "";
    if (infoArr[18] == "True") this.flag = "(中)";
    this.level = infoArr[19];
    this.h_redcard = infoArr[20];
    this.g_redcard = infoArr[21];
    this.h_yellow = infoArr[22];
    this.g_yellow = infoArr[23];
    if (infoArr[20] != "0") this.H_redcard = "<img src='../images/redcard" + infoArr[20] + ".gif'>"; else this.H_redcard = "";
    if (infoArr[21] != "0") this.G_redcard = "<img src='../images/redcard" + infoArr[21] + ".gif'>"; else this.G_redcard = "";
    if (infoArr[22] != "0") this.H_yellow = "<img src='../images/yellow" + infoArr[22] + ".gif'>"; else this.H_yellow = "";
    if (infoArr[23] != "0") this.G_yellow = "<img src='../images/yellow" + infoArr[23] + ".gif'>"; else this.G_yellow = "";
    this.getT1Name = function () {
        if (lang == "2")
            return this.t1EnName;
        else if (lang == "1")
            return this.t1TrName;
        else
            return this.t1CnName;
    }

    this.getT2Name = function () {
        if (lang == "2")
            return this.t2EnName;
        else if (lang == "1")
            return this.t2TrName;
        else
            return this.t2CnName;
    }
}


//亚赔信息
_glodds.OddsAsian = function (infoStr) {
    var infoArr = infoStr.split(_glodds.SplitColumn); //209092,8,0.5,0.95,0.95,0.5,1.025,0.875,False,False;
    this.mId = infoArr[0];
    this.cId = infoArr[1];
    this.goalF = infoArr[2];
    this.homeF = infoArr[3];
    this.awayF = infoArr[4];
    this.goal = infoArr[5];
    this.home = infoArr[6];
    this.away = infoArr[7];
    this.close = infoArr[8];
    this.zoudi = infoArr[9];
}
//欧赔信息
_glodds.Odds1x2 = function (infoStr) {
    var infoArr = infoStr.split(_glodds.SplitColumn); //209092,8,2.25,3.95,2.95,2.25,3.025,2.875
    this.mId = infoArr[0];
    this.cId = infoArr[1];
    this.hwF = infoArr[2];
    this.stF = infoArr[3];
    this.awF = infoArr[4];
    this.hw = infoArr[5];
    this.st = infoArr[6];
    this.aw = infoArr[7];
}
//大小赔率信息
_glodds.OddsOU = function (infoStr) {
    var infoArr = infoStr.split(_glodds.SplitColumn); //209092,8,0.5,0.95,0.95,0.5,1.025,0.875
    this.mId = infoArr[0];
    this.cId = infoArr[1];
    this.goalF = infoArr[2];
    this.overF = infoArr[3];
    this.underF = infoArr[4];
    this.goal = infoArr[5];
    this.over = infoArr[6];
    this.under = infoArr[7];
}


var _oddsUitl = new Object();
var matchdata = new Object();

_oddsUitl.getDayStr = function (dt) {
    return (dt.getMonth() + 1) + "-" + dt.getDate();
}

_oddsUitl.getTimeStr = function (dt) {
    return dt.getHours() + ":" + (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes();
}

_oddsUitl.getDtStr = function (dt) {
    return (dt.getMonth() + 1) + "-" + dt.getDate() + " " + (dt.getHours() < 10 ? "0" : "") + dt.getHours() + ":" + (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes();
}

_oddsUitl.getDateTimeStr = function (dt) {
    return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + (dt.getHours() < 10 ? "0" : "") + dt.getHours() + ":" + (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes();
}

_oddsUitl.getDate = function (str) {
    var p = str.split("-");
    return new Date(p[0], parseInt(p[1], 10) - 1, p[2]);
}

function clearNotify() {
    document.getElementById("notify").innerHTML = "";
}


function CheckLeague(obj) {
    if (obj.checked)
        obj.parentElement.style.backgroundColor = "#ffeeee";
    else {
        obj.parentElement.style.backgroundColor = "white";
    }

    leagueItem = matchdata.LeagueList.Get(obj.value);
    leagueItem.showNum = 1;
}

function SelectAll(value) {
    var i, inputs;
    inputs = document.getElementById("league").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        var obj = inputs[i];
        if (obj.type != "checkbox") continue;
        obj.checked = value;
        if (obj.checked) {
            obj.parentElement.style.backgroundColor = "#ffeeee";
        }
        else {
            obj.parentElement.style.backgroundColor = "white";
        }
    }

    for (var i = 0; i < matchdata.LeagueList.items.length; i++) {
        matchdata.LeagueList.items[i].showNum = value == false ? 0 : 1;
    }
}

function SelectAllMatch() {
    changeSclassSelect(0);
    SelectAll(true);
    writeCookie("sclassSelectNum_" + pageIndex, 0);
    writeCookie("currentLeague_" + pageIndex, "")
}

function ShowAllMatch() {
    SelectAllMatch();
    SelectOK(true);
}



function SetLanguage(l) {
    document.getElementById("Language" + lang).className = "";
    document.getElementById("Language" + l).className = "selected";
    lang = l;
    LoadData();
    writeCookie("lang", lang);
}


var hsLeagueCount = new Hashtable2();

function changeSclassSelect(t) {
    var strLeagueList = getLegList(t)
    sclassSelectNum = t;
    createLeague(t, strLeagueList);
    document.getElementById("selectLeague" + t).checked = "checked";
}

function getLegList(t) {
    hsLeagueCount = new Hashtable2();
    var strLeagueList = ",";
    for (var i = 0; i < matchdata.MatchNum; i++) {
        matchItem = matchdata.MatchList.items[i];
        if (t == 1 && strZuodiList.indexOf("," + matchItem.mId + ",") != -1) {
            if (hsLeagueCount.contains(matchItem.lId)) {
                var num = parseInt(hsLeagueCount.items(matchItem.lId)) + 1;
                hsLeagueCount.add(matchItem.lId, num);
            }
            else
                hsLeagueCount.add(matchItem.lId, 1);
            if (strLeagueList.indexOf("," + matchItem.mId + ",") == -1)
                strLeagueList += matchItem.lId + ",";
        }
        else if (t == 2 && strNotOpenList.indexOf("," + matchItem.mId + ",") != -1) {
            if (hsLeagueCount.contains(matchItem.lId)) {
                var num = parseInt(hsLeagueCount.items(matchItem.lId)) + 1;
                hsLeagueCount.add(matchItem.lId, num);
            }
            else
                hsLeagueCount.add(matchItem.lId, 1);
            if (strLeagueList.indexOf("," + matchItem.mId + ",") == -1)
                strLeagueList += matchItem.lId + ",";
        }
        else if (t == 3 && strRunList.indexOf("," + matchItem.mId + ",") != -1) {
            if (hsLeagueCount.contains(matchItem.lId)) {
                var num = parseInt(hsLeagueCount.items(matchItem.lId)) + 1;
                hsLeagueCount.add(matchItem.lId, num);
            }
            else
                hsLeagueCount.add(matchItem.lId, 1);
            if (strLeagueList.indexOf("," + matchItem.mId + ",") == -1)
                strLeagueList += matchItem.lId + ",";
        }
    }
    return strLeagueList;
}

function createLeague(t, strLeagueList) {
    html = new Array();
    html.push("<ul>");
    var j = 0;
    for (var i = 0; i < matchdata.LeagueNum; i++) {
        leagueItem = matchdata.LeagueList.items[i];
        if (strLeagueList.indexOf("," + leagueItem.lId + ",") != -1 || t == 0) {
            if (leagueItem.matchNum > 0) {
                if (leagueItem.showNum > 0) {
                    html.push("<li style='background-color:#fff0f0'><input onclick='CheckLeague(this)' checked type=checkbox id='myleague_" + i + "' value='" + leagueItem.lId + "'><label style='cursor:pointer;color:" + (leagueItem.important == "1" ? "red" : "black") + "' for='myleague_" + i + "'>" + leagueItem.getName() + "[" + (t == 0 ? leagueItem.matchNum : hsLeagueCount.items(leagueItem.lId)) + "]</label></li>");
                    leagueItem.showNum = 1;
                }
                else {
                    html.push("<li style='background-color:#fff0f0'><input onclick='CheckLeague(this)'  type=checkbox id='myleague_" + i + "' value='" + leagueItem.lId + "'><label style='cursor:pointer;color:" + (leagueItem.important == "1" ? "red" : "black") + "' for='myleague_" + i + "'>" + leagueItem.getName() + "[" + (t == 0 ? leagueItem.matchNum : hsLeagueCount.items(leagueItem.lId)) + "]</label></li>");
                    leagueItem.showNum = 0;
                }
            }
        }
    }
    html.push("</ul>");
    document.getElementById("league").innerHTML = html.join("");
}

function getImportant() {
    var inputs = document.getElementById("league").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        var obj = inputs[i];
        if (obj.type != "checkbox") continue;
        leagueItem = matchdata.LeagueList.Get(obj.value);
        if (leagueItem.important == "1") {
            obj.checked = true;
            leagueItem.showNum = 1;
        }
        else {
            obj.checked = false;
            leagueItem.showNum = 0;
        }

    }
}

function getShengfu() {
    var inputs = document.getElementById("league").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        var obj = inputs[i];
        if (obj.type != "checkbox") continue;
        leagueItem = matchdata.LeagueList.Get(obj.value);
        if (leagueItem.shengfu > 0) {
            obj.checked = true;
            leagueItem.showNum = 1;
        }
        else {
            obj.checked = false;
            leagueItem.showNum = 0;
        }
    }
}

function getBeidan() {
    var inputs = document.getElementById("league").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        var obj = inputs[i];
        if (obj.type != "checkbox") continue;
        leagueItem = matchdata.LeagueList.Get(obj.value);
        if (leagueItem.beidan > 0) {
            obj.checked = true;
            leagueItem.showNum = 1;
        }
        else {
            obj.checked = false;
            leagueItem.showNum = 0;
        }
    }
}

function getZucai() {
    var inputs = document.getElementById("league").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        var obj = inputs[i];
        if (obj.type != "checkbox") continue;
        leagueItem = matchdata.LeagueList.Get(obj.value);
        if (leagueItem.beidan > 0 || leagueItem.shengfu > 0) {
            obj.checked = true;
            leagueItem.showNum = 1;
        }
        else {
            obj.checked = false;
            leagueItem.showNum = 0;
        }
    }
}


function setMatchTime() {
    var matchItem, goTime;
    for (var j = 0; j < matchdata.MatchNum; j++) {
        try {
            matchItem = matchdata.MatchList.items[j];
            if (matchItem.state == "1") {  //part 1			
                goTime = Math.floor((new Date() - matchItem.time2 - difftime) / 60000);
                if (goTime > 45) goTime = "45+";
                if (goTime < 1) goTime = "1";
                document.getElementById("time_" + matchItem.mId).innerHTML = goTime + "<img src='images/in.gif' border=0>";
            }
            if (matchItem.state == "3") {  //part 2		
                goTime = Math.floor((new Date() - matchItem.time2 - difftime) / 60000) + 46;
                if (goTime > 90) goTime = "90+";
                if (goTime < 46) goTime = "46";
                document.getElementById("time_" + matchItem.mId).innerHTML = goTime + "<img src='images/in.gif' border=0>";
            }
        } catch (e) { }
    }
    runtimeTimer = window.setTimeout("setMatchTime()", 30000);
}

function RenderLeaguelist()
{
    sclassSelectNum = getCookie("sclassSelectNum_" + pageIndex);
    var leagueids = getCookie("currentLeague_" + pageIndex);

    if (sclassSelectNum == null || sclassSelectNum == "")
    {
        sclassSelectNum = 0;
    }

    if (leagueids == null || leagueids == "")
    {
        leagueids = "";
    }

    var html = new Array();
    html.push("<ul>");
    for (var i = 0; i < matchdata.LeagueNum; i++) {
        leagueItem = matchdata.LeagueList.items[i];
        if (leagueItem.matchNum > 0 && (leagueids.indexOf("," + leagueItem.lId + ",") > -1 || leagueids=="")) {
            html.push("<li style='background-color:#fff0f0'><input onclick='CheckLeague(this)' checked type=checkbox id='myleague_" + i + "' value='" + leagueItem.lId + "'><label style='cursor:pointer;color:" + (leagueItem.important == "1" ? "red" : "black") + "' for='myleague_" + i + "'>" + leagueItem.getName() + "[" + leagueItem.matchNum + "]</label></li>");
            leagueItem.showNum = 1;
        }
        else {
            html.push("<li style='background-color:#fff0f0'><input onclick='CheckLeague(this)' type=checkbox id='myleague_" + i + "' value='" + leagueItem.lId + "'><label style='cursor:pointer;color:" + (leagueItem.important == "1" ? "red" : "black") + "' for='myleague_" + i + "'>" + leagueItem.getName() + "[" + leagueItem.matchNum + "]</label></li>");
            leagueItem.showNum = 0;
        }
    }
    html.push("</ul>");
    document.getElementById("league").innerHTML = html.join("");
    changeSclassSelect(sclassSelectNum)
    SelectOK(true);

}

function GetRecommend()
{
    var rXmlHttp = zXmlHttp.createRequest();
    rXmlHttp.open("get", "/data/GetRecommend.aspx", false);  //strCompanyId

    rXmlHttp.send(null);
    var data = rXmlHttp.responseText;
    return data;
}


