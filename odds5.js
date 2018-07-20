var pageIndex = 5;
function LoadData() {
    //获取数据
    var oXmlHttp = zXmlHttp.createRequest();
    oXmlHttp.open("get", "oddsData.aspx?date=" + defaultdate, false);

    oXmlHttp.send(null);
    var data = oXmlHttp.responseText;

    var recommends = GetRecommend();

    strNotOpenList = ",";
    strRunList = ",";
    strZuodiList = ",";
    matchdata.LeagueList = new _glodds.List();
    matchdata.MatchList = new _glodds.List();
    matchdata.CompanyList = new _glodds.List();
    matchdata.Odds1List = new _glodds.List();
    matchdata.Odds2List = new _glodds.List();
    matchdata.Odds3List = new _glodds.List();

    matchdata.CTypeNum = new Object();

    //分隔大数据域
    var domains = data.split(_glodds.SplitDomain);
    var leagueItem, matchItem, companyItem, nd;

    //处理联赛数据域
    var leagueDomain = domains[0].split(_glodds.SplitRecord);
    matchdata.LeagueNum = leagueDomain.length;
    for(var i=0; i<leagueDomain.length; i++) {
        leagueItem = new _glodds.League(leagueDomain[i]);
        matchdata.LeagueList.Add(leagueItem.lId, leagueItem);
    }
    //处理亚赔数据域
    var oddsDomain = domains[2].split(_glodds.SplitRecord);
    for(var i=0; i<oddsDomain.length; i++) {
        oddsItem = new _glodds.OddsAsian(oddsDomain[i]);
        matchdata.Odds1List.Add(oddsItem.mId+"_"+oddsItem.cId, oddsItem);
    }
    //处理欧赔数据域
    var oddsDomain = domains[3].split(_glodds.SplitRecord);
    for(var i=0; i<oddsDomain.length; i++) {
        oddsItem = new _glodds.Odds1x2(oddsDomain[i]);
        matchdata.Odds2List.Add(oddsItem.mId+"_"+oddsItem.cId, oddsItem);
    }
    //处理大小球数据域
    var oddsDomain = domains[4].split(_glodds.SplitRecord);
    for(var i=0; i<oddsDomain.length; i++) {
        oddsItem = new _glodds.OddsOU(oddsDomain[i]);
        matchdata.Odds3List.Add(oddsItem.mId+"_"+oddsItem.cId, oddsItem);
    }

    //处理比赛数据
    var matchDomain = domains[1].split(_glodds.SplitRecord);
    matchdata.MatchNum = 0;
    var html=new Array();
    for(var i=0; i<matchDomain.length; i++) {
        matchItem = new _glodds.Match(matchDomain[i]);
        if(matchItem.level>level) continue;
        var haveOdds=false;
        for(var j=0;j<SelCompany.length;j++){
            if(matchdata.Odds1List.Get(matchItem.mId +"_" +SelCompany[j])!=null) {haveOdds=true;break;};
            if(matchdata.Odds2List.Get(matchItem.mId +"_" +SelCompany[j])!=null) {haveOdds=true;break;};
            if(matchdata.Odds3List.Get(matchItem.mId +"_" +SelCompany[j])!=null) {haveOdds=true;break;};
        }
        if(!haveOdds) continue;
        matchdata.MatchNum++;
		
        matchdata.MatchList.Add(matchItem.mId, matchItem);
        leagueItem = matchdata.LeagueList.Get(matchItem.lId);
        leagueItem.matchNum++;
        leagueItem.showNum++;

        if (matchItem.level == -1 || matchItem.level == 0)//胜负彩
        {
            leagueItem.shengfu++;
        }
        if (matchItem.level == -2 || matchItem.level == 0)//北京单场
        {
            leagueItem.beidan++;
        }
		
        html.push("<table width='100%'  border=0 align=center cellpadding=0 cellspacing=1 class=b_tab id='table_" + matchItem.mId +"'><tr class=stit align=center height=20>");
        html.push("<td width=25% bgcolor=" + leagueItem.color +" style='color:white'><table border=0 cellpadding=0 cellspacing=0 width=95%><tr><td width=15% style='text-align:left'><img src='images/close.gif' style='cursor:pointer;' onclick='hidematch(" + matchItem.mId +")'></td><td style='text-align:left' width=45%>");
        if(leagueItem.url!="")
            html.push("<a href='http://info.win007.com/" + leagueItem.url +"' target=_blank style='color:white'>" + leagueItem.getName() +"</a>");
        else
            html.push(leagueItem.getName());
        html.push("</td><td width=40% id='mt_"+ matchItem.mId +"'>" + _oddsUitl.getDtStr(matchItem.time) +"</td></tr></table></td>");
		
        html.push("<td width=8%>公司</td><td width=7%>主队</td><td width=7%>让球</td><td width=7%>客队</td>");
        html.push("<td width=7% style='background:#32ACEB'>主胜</td><td width=7% style='background:#32ACEB'>和局</td><td width=7% style='background:#32ACEB'>客胜</td>");
        html.push("<td width=7%>大球</td><td width=7%>盘口</td><td width=7%>小球</td>");
        html.push("<td width=4%>变化</td></tr>");   
		
        html.push("<tr><td rowspan=" +(SelCompany.length+1) +" bgcolor='#F2F2F2' style='text-align:left; padding:6px;line-height:20px;'>");
        html.push("<table width='100%'  border=0 cellpadding=0 cellspacing=0><tr><td style='text-align:left;' width=85%>");		
        html.push("<div id='home_" + matchItem.mId + "'><a href=javascript:TeamPanlu_10(" + matchItem.mId + ")><b>" + matchItem.getT1Name() + "</b></a>" + matchItem.flag + matchItem.t1Position + "</div>");
        html.push("<div>vs</div>");
        html.push("<div id='guest_" + matchItem.mId + "'><a  href=javascript:TeamPanlu_10(" + matchItem.mId + ")><b>" + matchItem.getT2Name() + "</b></a>" + matchItem.t2Position + "</div></td>");

        if(matchItem.state=="0")
            html.push("<td width=15%><div id=hs_" + matchItem.mId + " class=score></div><div id=time_" + matchItem.mId + "> </div><div id=gs_" + matchItem.mId + " class=score></div></td>");
        else{
            var state=state_ch[parseInt(matchItem.state)+14].split(",")[lang];		
            switch(matchItem.state){
                case "1":
                    state = Math.floor((new Date()-matchItem.time2-difftime)/60000);
                    if(state>45) state = "45+"
                    if(state<1) state = "1";
                    state = state + "<img src='images/in.gif'>";
                    break;
                case "3":
                    state = Math.floor((new Date()-matchItem.time2-difftime)/60000)+46;
                    if(state>90) state = "90+";
                    if(state<46) state = "46";
                    state = state + "<img src='images/in.gif'>";
                    break;
            }		firstodds
            html.push("<td width=15%><div id=hs_" + matchItem.mId + " class=score>" + matchItem.homeScore + "</div><div id=time_" + matchItem.mId + ">" + state +"</div><div id=gs_" + matchItem.mId + " class=score>" + matchItem.guestScore + "</div></td>");
        }
        html.push("</tr></td></tr></table>");
        html.push("<ul class='toolimg' style='padding-top:10px'>");        
        html.push("<li><a href=javascript: onclick=\"AsianOdds("+ matchItem.mId +");return false\"><img src='images/ty1.gif' /></a></li>");
        html.push("<li><a href='javascript:EuropeOdds(" + matchItem.mId +")'><img src='images/ty2.gif' /></a></li>");
        //html.push("<li><a href='javascript:dxq(" + matchItem.mId +")'><img src='images/ty3.gif' /></a></li>");
        html.push("<li><a href='javascript:showgoallist(" + matchItem.mId + ")'><img src='images/ty5.gif' /></a></li>");
        html.push("<li><a href=javascript: onclick=analysis(" + matchItem.mId + ")><img src='images/ty4.gif' /></a></li>");
        if (recommends.indexOf(matchItem.mId) > -1) {
            html.push("<li><a href=javascript: onclick='Recommend(" + matchItem.mId + ")'><img src='images/ty6.gif' /></a></li>");
        }
        html.push("</ul>");
        html.push("<ul class='toolimg'>");

        html.push("</ul>");
        html.push("</td><td colspan=11 style='height:0px;'></td></tr>");

        var haszoudi = false;
        for(var j=0;j<SelCompany.length;j++){
            oddsItem = matchdata.Odds1List.Get(matchItem.mId + "_" + SelCompany[j]);
            if (oddsItem != null && oddsItem.zoudi == "True") {
                haszoudi = haszoudi || true;
            }
            html.push("<tr style='background-color:"+ (oddsItem!=null && oddsItem.close=="True" ? "#ccc":"white")+ "' id='odds_" + matchItem.mId +"_" +SelCompany[j] +"' onmouseover=\"this.style.backgroundColor='#F0F4FF';\" onmouseout=\"this.style.backgroundColor='"+ (oddsItem!=null && oddsItem.close=="True" ? "#ccc":"white")+ "';\">");
            html.push("<td height=30>"+ company[SelCompany[j]] + (oddsItem!=null && oddsItem.zoudi=="True" ?"<img src='images/t3.gif'>":"") +"</td>");  

            if(oddsItem!=null){
                html.push("<td><div class=firstodds>"+oddsItem.homeF+"</div><div class='"+BgColor(oddsItem.homeF,oddsItem.home)+"'>" + oddsItem.home +"</div></td>");
                html.push("<td><div class=firstodds>"+Goal2GoalCn(oddsItem.goalF)+"</div><div class='"+BgColor(oddsItem.goalF,oddsItem.goal)+"'>" + Goal2GoalCn(oddsItem.goal)+"</div></td>");
                html.push("<td><div class=firstodds>"+oddsItem.awayF+"</div><div class='"+BgColor(oddsItem.awayF,oddsItem.away)+"'>" + oddsItem.away +"</div></td>");
            }
            else
                html.push("<td></td><td></td><td></td>");		
	   
            oddsItem = matchdata.Odds2List.Get(matchItem.mId +"_" +SelCompany[j]);
            if(oddsItem!=null){
                html.push("<td style='background:#F0F4FF'><div class=firstodds>"+oddsItem.hwF+"</div><div class='"+BgColor(oddsItem.hwF,oddsItem.hw)+"'>" + oddsItem.hw +"</div></td>");
                html.push("<td style='background:#F0F4FF'><div class=firstodds>"+oddsItem.stF+"</div><div class='"+BgColor(oddsItem.stF,oddsItem.st)+"'>" + oddsItem.st +"</div></td>");
                html.push("<td style='background:#F0F4FF'><div class=firstodds>"+oddsItem.awF+"</div><div class='"+BgColor(oddsItem.awF,oddsItem.aw)+"'>" + oddsItem.aw +"</div></td>");
            }
            else
                html.push("<td style='background:#F0F4FF'></td><td style='background:#F0F4FF'></td><td style='background:#F0F4FF'></td>");		

            oddsItem = matchdata.Odds3List.Get(matchItem.mId +"_" +SelCompany[j]);
            if(oddsItem!=null){
                html.push("<td><div class=firstodds>"+oddsItem.overF+"</div><div class='"+BgColor(oddsItem.overF,oddsItem.over)+"'>" + oddsItem.over +"</div></td>");
                html.push("<td><div class=firstodds>"+Goal2GoalCn(oddsItem.goalF)+"</div><div class='"+BgColor(oddsItem.goalF,oddsItem.goal)+"'>" + Goal2GoalCn(oddsItem.goal)+"</div></td>");
                html.push("<td><div class=firstodds>"+oddsItem.underF+"</div><div class='"+BgColor(oddsItem.underF,oddsItem.under)+"'>" + oddsItem.under +"</div></td>");
            }
            else
                html.push("<td></td><td></td><td></td>");		
		 
            html.push("<td width=6%><a href='javascript:oddsDetail("+ matchItem.mId +"," +SelCompany[j]+")'><img src='images/t1.gif'></a></td></tr>");			
        }
        html.push("</table>");
        if (haszoudi) {
            strZuodiList += matchItem.mId + ",";
        }
    }
    document.getElementById("odds").innerHTML=html.join("");

    var j=0;
    RenderLeaguelist(pageIndex);
    //if(oldLevel!=-1 && oldLevel!=level) document.getElementById("matchType"+oldLevel).className="";
    //if(oldLevel!=level) document.getElementById("matchType"+level).className="selected";
    //oldLevel=level;
	
    document.getElementById("scoreLoading").style.display="none";
}


function SelectOK(c){
    var i,j,inputs;
    var hh = 0;
    var leagueIds = ",";
    inputs = document.getElementById("league").getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
        var obj = inputs[i];
        if (obj.type != "checkbox") continue;
        if (obj.checked) {
            leagueIds += obj.value + ",";
        }
    }

    for (var j = 0; j < matchdata.MatchNum; j++) {
        var matchItem = matchdata.MatchList.items[j];
        if (leagueIds.indexOf("," + matchItem.lId + ",") > -1) {
            document.getElementById("table_" + matchItem.mId).style.display = "";
        }
        else {
            document.getElementById("table_" + matchItem.mId).style.display = "none";
            hh++;
        }
    }

    document.getElementById("LeagueDiv").style.visibility = "hidden";
}

function hidematch(id){
    document.getElementById("table_" +  id).style.display="none";
    document.getElementById("hiddenCount").innerHTML=parseInt(document.getElementById("hiddenCount").innerHTML)+1;
}

function SetDate(y, m, d) {
    selDate = new Date(y, m - 1, d);
    //writeCookie("currentLeague_" + pageIndex, "");
    LoadData();
}


function SelectCompany() {
    var i, inputs;
    var j = 0;
    SelCompany = new Array();
    strCompanyId = ",";
    inputs = document.getElementById("companyList").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox" && inputs[i].checked) {
            SelCompany[j++] = inputs[i].value;
            strCompanyId += inputs[i].value + ",";
        }
    }
    writeCookie("companyHis", strCompanyId.substring(1, strCompanyId.length - 1));
    LoadData();
    document.getElementById("divMatchType5").style.visibility = "hidden";
}

function DefaultCompany() {
    strCompanyId = "1,12,8,3,24";
    SelCompany = strCompanyId.split(",");
    strCompanyId = "," + strCompanyId + ",";
    writeCookie("companyHis", "");
    LoadData();
    inputs = document.getElementById("companyList").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type != "checkbox") continue;
        inputs[i].checked = false;
        if (strCompanyId.indexOf("," + inputs[i].value + ",") >= 0) inputs[i].checked = true;

    }

    for (var i = 0; i < SelCompany.length; i++) {
        document.getElementById("company" + SelCompany[i]).checked = true;
    }
    document.getElementById("divMatchType5").style.visibility = "hidden";
}

var strCompanyId = getCookie("companyHis");
if (strCompanyId == null || strCompanyId == "") strCompanyId = "1,12,8,3,24";
var SelCompany = strCompanyId.split(",");
strCompanyId = "," + strCompanyId + ",";

var level = getCookie("level");
if (level == null || level == "") level = "2";

var lang = getCookie("lang");
if (lang == null || lang == "") lang = "1";

LoadData();
for (var i = 0; i < SelCompany.length; i++)
    document.getElementById("company" + SelCompany[i]).checked = true;