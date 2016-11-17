var residency_hukou_flag=0;	// 居住地 / 户口所在地   开关
var residency = {
	// 居住地输出
	Show : function(){
		var k=0;
		var Div=new Array('maincity','allProv');
		while(k<=1){
			var output='<h4>主要城市：</h4>';
			var arr=maincity,area;
			if(k==1){
				output='<h4>主要城市：</h4>';
				arr=allprov;
			}
			for (var i in arr){
				area=arr[i][0];
				output+='<dl><dt>'+area+'</dt><dd>';
				for (var j in arr[i][1] ){
					id=arr[i][1][j];
					if(k==0){
						output+='<li onclick="residency.Chk(\''+id+'\')">'+ja[id]+'</li>';
					}else{
						if(area=='其它') output+='<li onclick="residency.Chk(\''+id+'\')">'+ja[id]+'</li>';
						else output+='<li onclick="residency.SubLayer(\''+id+'\')">'+ja[id]+'</li>';
					}
				}
				output+='</dd></dl>';
			}
			$('#'+Div[k]).html(output);
			k++;
		}
		$('#drag').width('580px');
		// 鼠标悬停变色
		$('#residencyAlpha li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass()});
		// 点击弹出子菜单
		$('#allProv li').click(function(e){$("#sublist").css({top:e.pageY-4,left:e.pageX-4}).hover(function(){$(this).show()},function(){$(this).hide()})})
	},
	// 所有省份 下拉 城市菜单
	SubLayer : function(id){
		var output='<div id="sub_city">',width,ischecked,key;
		var arr=getAreaIDs(id);
		width=Math.ceil(Math.sqrt(arr.length-1))*60;
		output+='<ul style="width:'+width+'px"><h4 onclick="residency.Chk(\''+id+'\')"><a href="javascript:">'+ja[id]+'</a></h4>';
		for (var i=1;i<arr.length;i++){
			key=arr[i];
			output+='<li><a href="javascript:" onclick="residency.Chk(\''+key+'\')">'+ja[key]+'</a></li>';
		}
		output=output+'</ul></div>';
		$("#sublist").html(output).show();
	},


	Chk : function(id){
		if(residency_hukou_flag==0){
			$('#btn_residency').val(ja[id]);
			$('#residency').val(id);
		}else{
			$('#btn_hukou').val(ja[id]);
			$('#hukou').val(id);
		}
		$("#sublist").hide().empty();
		boxAlpha();
	}
}

function residencySelect(){
	residency_hukou_flag=0;
	var dragHtml ='<div id="residencyAlpha">';		//居住地
	dragHtml+='		<div id="maincity"></div>';	//主要城市
	dragHtml+='		<div id="allProv"></div>';	//所有省市
	dragHtml+='</div>';
	$('#drag_h').html('<b>请选择居住地</b><span onclick="boxAlpha()">关闭</span>');
	$('#drag_con').html(dragHtml);
	residency.Show();
	boxAlpha();
	draglayer();
}
function hukouSelect(){
	residency_hukou_flag=1;
	var dragHtml ='<div id="residencyAlpha">';		//居住地
	dragHtml+='		<div id="maincity"></div>';	//主要城市
	dragHtml+='		<div id="allProv"></div>';	//所有省市
	dragHtml+='</div>';
	$('#drag_h').html('<b>请选择户口所在地</b><span onclick="boxAlpha()">关闭</span>');
	$('#drag_con').html(dragHtml);
	residency.Show();
	boxAlpha();
	draglayer();
}


/* **************************************************************************** */

var jobArea_Arr = new Array();
//var jobArea_Arr = new Array('0100','0200','2402');

var jobArea = {
	// 请选择地区
	init : function(index){
		var _str='',_id='';
		var elem='#btn_jobArea'+index;
		if (jobArea_Arr.length>0){
			for (var i in jobArea_Arr){
				_str+=','+ja[jobArea_Arr[i]];
				_id+=','+jobArea_Arr[i];
			}
			$(elem).val(_str.substring(1));
			$('#jobAreaID').val(_id.substring(1));
		}
	},
	Show : function(index,selected){
		var k=0,output='',output2='',arr,area,select_ed;
		var Div		= new Array('maincity2','allProv2');
		var Title	= new Array('<h4>主要城市：</h4>','<h4>所有省份：</h4>');
		var LoopArr	= new Array(maincity,allprov);
		//var unsupportedValue=$('#editnot input:last').attr('value');
		var unsupportedValues;
		var isuns;
		if($('#editnot input:last').attr('value')){
			unsupportedValues=$('#editnot input:last').attr('value').split(',')
		}
		
		for(var i in jobArea_Arr){
			output2+='<li class="jobArea'+jobArea_Arr[i]+' chkON" onclick="jobArea.Chk(\''+jobArea_Arr[i]+'\','+index+','+'1'+')">'+ja[jobArea_Arr[i]]+'</li>';
		}
		$('#jobAreSelected dd').html(output2);

		while(k<=1){
			output	= Title[k];
			arr		= LoopArr[k]
			for (var i in arr){
				area=arr[i][0];
				output+='<dl><dt>'+area+'</dt><dd>';
				for (var j in arr[i][1] ){
					id=arr[i][1][j];
					if(unsupportedValues){
						 isuns=in_array(id,unsupportedValues);
					}
					if(k==0){
						select_ed=in_array(id,jobArea_Arr)?' chkON':'';
						if(isuns==true){
							output+='<li style="text-decoration:line-through" class="jobArea'+id+select_ed+'">'+ja[id]+'</li>';
						}else{
							output+='<li class="jobArea'+id+select_ed+'" onclick="jobArea.Chk(\''+id+'\')">'+ja[id]+'</li>';
						}
						
					}else{
						if(isuns==true){
							if(area=='其它') output+='<li style="text-decoration:line-through" class="jobArea'+id+'">'+ja[id]+'</li>';
							else output+='<li style="text-decoration:line-through" >'+ja[id]+'</li>';
						}else{
							if(area=='其它') output+='<li class="jobArea'+id+'" onclick="jobArea.Chk(\''+id+'\')">'+ja[id]+'</li>';
						else output+='<li onclick="jobArea.SubLayer(\''+id+'\','+index+')">'+ja[id]+'</li>';
						}
						
					}
				}
				output+='</dd></dl>';
			}

			$('#'+Div[k]).html(output);
			k++;
		}
		$('#drag').width('580px');
		// 鼠标悬停变色
		$('#jobAreaAlpha li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass('over')});
		// 点击弹出子菜单
		$('#allProv2 li').click(function(e){$("#sublist").css({top:e.pageY-4,left:e.pageX-4}).hover(function(){$(this).show()},function(){$(this).hide()})})
	},
	chkAll:function(id,index){
		var arr=getAreaIDs(id);
		var unsupportedValues;
		var isuns;
		if(!$('.jobArea'+id).hasClass('chkON')){
			$('.jobArea'+id).addClass('chkON');
		}else{
			$('.jobArea'+id).removeClass('chkON');
		};
		if($('#editnot input:last').attr('value')){
			unsupportedValues=$('#editnot input:last').attr('value').split(',')
		}

		for(var i=0;i<arr.length;i++){
			if(!in_array(arr[i],unsupportedValues)){
				this.Chk(arr[i],index);
			}
		}
	},
	// 所有省份 下拉 城市菜单
	SubLayer : function(id,index){
		var output='<div id="sub_jobArea">',width,select_ed,key;
		var unsupportedValues;
		var isuns;
		if($('#editnot input:last').attr('value')){
			unsupportedValues=$('#editnot input:last').attr('value').split(',');
		}
		select_ed=in_array(id,jobArea_Arr)?' chkON':'';
		var arr=getAreaIDs(id);
		width=Math.ceil(Math.sqrt(arr.length-1))*120;
		output+='<ul style="width:'+width+'px"><h4 onclick="jobArea.chkAll(\''+id+'\','+index+');"><a href="javascript:" class="jobArea'+id+'">'+ja[id]+'</a></h4>';
		output+='';

		for (var i=1;i<arr.length;i++){
			key=arr[i];
			if(unsupportedValues){
				isuns=in_array(key,unsupportedValues);
			}
			select_ed=in_array(key,jobArea_Arr)?' chkON':'';
			if(isuns==true){
				output+='<li style="width:auto;margin: 0 5px;"><a href="javascript:" class="jobArea' + key + select_ed +'" style="text-decoration:line-through;width:auto;margin: 0 5px;" ><p>'+ja[key]+'</p></a></li>';

			}else{
				output+='<li style="width:auto;margin: 0 5px;"><a href="javascript:"  class="jobArea' + key + select_ed +'" onclick="jobArea.Chk(\''+key+'\')"><p>'+ja[key]+'</p></a></li>';

			}
					}
		output=output+'</ul></div>';
		$("#sublist").html(output).show();
	},


	Chk : function(id,index,selected){
		// var unsupportedValue=$('#editnot input:last').attr('value');
		// if(unsupportedValue ){
		// 	var isunsupport=unsupportedValue.indexOf(id);
		// 	if(isunsupport>=0 && !selected){
		// 		alert("此地区不支持配送，请重新选择");
		// 		return;
		// 	}
		// };
		if(index==1){//不可配送
			if(!in_array(id,jobArea_Arr)){
				var subArea,myid;
	  			if(id.substr(2)=='00'){	// 选中父类清除子类
					subArea=getAreaIDs(id);
					for(var i in subArea){
						if(in_array(subArea[i],jobArea_Arr)) this.del(subArea[i]);
					}
				}else{	// 选中子类清除父类
					myid=id.substr(0,2)+'00';
					if(in_array(myid,jobArea_Arr)) this.del(myid);
				};
				if(jobArea_Arr.length<500){
					jobArea_Arr[jobArea_Arr.length]=id;
					var html='<li class="jobArea'+id+'" onclick="jobArea.Chk(\''+id+'\','+index+','+'1'+')">'+ja[id]+'</li>';
					$('#jobAreSelected dd').append(html);
					$('.jobArea'+id).addClass('chkON');
					$('#jobAreSelected li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass('over')});
				}// else{
				// 	alert('您最多能选择5项');
				// 	return false;
				// }
			}else{
				this.del(id);
				$('.jobArea'+id).attr('onclick','jobArea.Chk(\''+id+'\''+')');
				$('.jobArea'+id).css('text-decoration','none');
			}
		}else{//可配送
			if(!in_array(id,jobArea_Arr)){
						var subArea,myid;
			  			if(id.substr(2)=='00'){	// 选中父类清除子类
							subArea=getAreaIDs(id);
							for(var i in subArea){
								if(in_array(subArea[i],jobArea_Arr)) this.del(subArea[i]);
							}
						}else{	// 选中子类清除父类
							myid=id.substr(0,2)+'00';
							if(in_array(myid,jobArea_Arr)) this.del(myid);
						};
						if(jobArea_Arr.length<500){
							jobArea_Arr[jobArea_Arr.length]=id;
							var html='<li class="jobArea'+id+'" onclick="jobArea.Chk(\''+id+'\','+index+','+'1'+')">'+ja[id]+'</li>';
							$('#jobAreSelected dd').append(html);
							$('.jobArea'+id).addClass('chkON');
							$('#jobAreSelected li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass('over')});
						}// else{
						// 	alert('您最多能选择5项');
						// 	return false;
						// }
					}else{
						this.del(id);
					}
		}
		
	},
	del : function(id){
		for (var i in jobArea_Arr){
			if(jobArea_Arr[i]==id) jobArea_Arr.splice(i,1);;
		}
		$('#jobAreSelected .jobArea'+id).remove();
		$('.jobArea'+id).removeClass('chkON');
	},
	// 确定
	confirm : function(index){
		var areaStr='';
		var btn_jobArea='.btn_jobArea'+index;
		var jobAreaID='.jobAreaID'+index;
		for(var i in jobArea_Arr){
			areaStr+=','+ja[jobArea_Arr[i]];
		}
		areaStr=areaStr.substring(1)?areaStr.substring(1):'请选择地区';
		$(btn_jobArea).val(areaStr);
		$(jobAreaID).val(jobArea_Arr);
		boxAlpha();
		$('#jobAreSelected dd').empty();
	}
}

function jobAreaSelect(index){//组件，1.构造html大框架
	var dragHtml ='<div id="jobAreaAlpha">';		//地区
	dragHtml+='		<dl id="jobAreSelected"><dt>已选地点：</dt><dd></dd></dl>';
	dragHtml+='		<div id="maincity2"></div>';//主要城市
	dragHtml+='		<div id="allProv2"></div>';	//所有省市
	dragHtml+='</div>';
	$('#drag_h').html('<b>请选择地区</b><span onclick="jobArea.confirm('+index+')">确定</span>');
	$('#drag_con').html(dragHtml);
	jobAreaSelected(index);
	jobArea.Show(index);
	boxAlpha();
	draglayer();
}

function jobAreaSelected(index){
	var classSlected=".jobAreaID"+index;
	var selectArea=$(classSlected);
	var selectedValue=selectArea.attr('value');
	jobArea_Arr.length=0;
	if(selectedValue){
		var selectedids= selectedValue.split(',')

		for(var i=0;i<selectedids.length;i++){
			jobArea_Arr.push(selectedids[i]);

		}
		// alert(jobArea_Arr);
	}
}

window.index=1;
function addDIQU(){
	$('#content #selectArea').empty();
	if(!window.index){widow.index=1;}
	var html='<input id="btn_jobArea" class="btn_jobArea'+window.index+'" type="button" value="请选择地区" onclick="jobAreaSelect('+window.index+')" /><input id="jobAreaID" class="jobAreaID'+window.index+'" type="hidden" name="jobAreaID[]" value="" />多选<br /><br />';
	$('#content #selectArea').html(html);
	window.index=window.index+1;

}
