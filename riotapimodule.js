/*
By Chris Cates. Enjoy :)
MIT License 2014


*/

//The Riot API object
var riotAPI = new Object();
	//Basic literals
	riotAPI.key = "0";
	riotAPI.region = "na";
	
//Get summoner by name	
riotAPI.getSummoner = function(summonerName, result) {
	var name = summonerName.toLowerCase().replace(/\s/g, '');
	var src = "https://prod.api.pvp.net/api/lol/"+this.region+"/v1.3/summoner/by-name/"+summonerName+"?api_key="+this.key;
	$.get(src, function(obj) {
		var data = new Array();
		for (key in obj[name]) {
			data[key] = obj[name][key];
		}		
		return result(data);
	});
}
//Get summoner by ID
riotAPI.getSummonerId = function(summonerId, result) {
	var src = "https://prod.api.pvp.net/api/lol/"+this.region+"/v1.3/summoner/by-name/"+summonerId+"?api_key="+this.key;
	$.get(src, function(obj) {
		var data = new Array();
		for (key in obj[name]) {
			data[key] = obj[name][key];
		}		
		return result(data);
	});
}
//Get summoner masteries
riotAPI.getMasteries = function(summonerId, result) {
	var src = "https://prod.api.pvp.net/api/lol/"+this.region+"/v1.3/summoner/"+summonerId+"/masteries?api_key="+this.key;
	$.get(src, function(obj) {
		var data = new Array();
		for (key in obj[summonerId]) {
			if (key === "pages") {
				for (page in obj[summonerId][key]) {
					data[page] = new Array();
					for (contents in obj[summonerId][key][page]) {
						if (contents === "name") {
							data[page][contents] = obj[summonerId][key][page][contents];
						}
						if (contents === "current") {
							data[page][contents] = obj[summonerId][key][page][contents];
						}
						if (contents === "talents") {
							data[page]["talents"] = new Array();
							for (mastery in obj[summonerId][key][page][contents]) {
								var mName = obj[summonerId][key][page][contents][mastery]["name"];
								data[page]["talents"][mName] = mName;						
								data[page]["talents"][mName] = obj[summonerId][key][page][contents][mastery]["rank"];
							}
						}
					}
				}
			}
		}
		return result(data);
	});
}
//Get runes from summoner
riotAPI.getRunes = function(summonerId, result) {
	var src = "https://prod.api.pvp.net/api/lol/"+this.region+"/v1.3/summoner/"+summonerId+"/runes?api_key="+this.key;
	$.get(src, function(obj) {
		var data = new Array();
		for (key in obj[summonerId]) {
			var summoner = obj[summonerId];
			if (key === "pages") {
				p = summoner["pages"];
				for (page in p) {
					data[page] = new Array();
					for (pData in p[page]) {
						if (pData === "current") {
							data[page][pData] = p[page]["current"];
						}
						if (pData === "name") {
							data[page][pData] = p[page]["name"];
						}
						if (pData === "slots") {
							data[page]["slots"] = new Array();
							for (slotId in p[page]["slots"]) {
								data[page]["slots"][slotId] = new Array();
								data[page]["slots"][slotId] = p[page]["slots"][slotId];
							}
						}
					}
				}
				
			}
		}
		return result(data);
	});	
}

riotAPI.getTeamBySummoner = function(summonerId, result) {
	var src = "https://prod.api.pvp.net/api/lol/"+this.region+"/v2.2/team/by-summoner/"+summonerId+"?api_key="+this.key;
	$.get(src, function(obj) {
		var data = new Array();
		for (teamIndex in obj) {
			data[teamIndex] = new Array();
			for (teamInfo in obj[teamIndex]) {
				data[teamIndex][teamInfo] = obj[teamIndex][teamInfo];
			}
		}
		
		return result(data);
	});
}