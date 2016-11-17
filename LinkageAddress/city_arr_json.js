//工作地点
var ja=[];
var parent=[];
$.getJSON('/supervise/Freight/getAll',function(json){
	$(json).each(function(i){
		//var option = '<option value="'+json[i].id+'">'+json[i].name+'</option>';

		ja[json[i].id] = [json[i].name];
		parent[json[i].id]=[json[i].parentid];
	});

});
//主要城市数据字典
var maincity=[['直辖市',['6','7','16','17','18','20','21','29','31','34']]];

var region = [];
//所有省份数据字典
$.getJSON('/supervise/Freight/getAllpro',function(json){
	$(json).each(function(i){
		region[i] = json[i];

	});

});

var allprov=[['浙江沪',['2','30']],['华东',['3','9','26']],['华南',['22','33']],['华中',['4','15','23','25']],['华北',['28','32']],['东北',['1','8','27']],['西北',['5','10','13','14']],['西南',['11','12','19','24']]];
//var allprovArray=new Array('1600','2100','2800','2300','2400','2200','0700','0800','1500','1100','1300','1200','0300','1400','1000','1700','1800','1900','2000','2700','3200','2900','3100','0900','2600','2500','3000');

//所有省+直辖市
var all = [];
$.getJSON('/supervise/Freight/getAllpros',function(json){
	$(json).each(function(i){
		all[i] = json[i].id;
	});

});
var allProvDuchy= all;

function getAreaIDs(id){
	var newArr = new Array();
		for(var i in parent){
		if(parent[i]==id){
		//if(i == idx){
			newArr[newArr.length]=i;
		}
	};
	return newArr;
}


