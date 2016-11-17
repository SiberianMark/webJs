$(function(){
	//1.构造地址插件的构造函数
	var addressPlus=function(ele,opt){
		this.$elem=ele;//操作的DOM节点列表
		this.defaults={};//默认配置，opt为传入配置参数
		this.options=$.extend({},defaults,opt);//
	};
	//2.构造地址插件的接口方法
	addressPlus.prototype={
		jobAreaSelect:function(index){//组件，1.构造html大框架
			var dragHtml ='<div id="jobAreaAlpha">';		//地区
			dragHtml+='		<dl id="jobAreSelected"><dt>已选地点：</dt><dd></dd></dl>';
			dragHtml+='		<div id="maincity2"></div>';//主要城市
			dragHtml+='		<div id="allProv2"></div>';	//所有省市
			dragHtml+='</div>';
			$('#drag_h').html('<b>请选择地区</b><span onclick="jobArea.confirm('+index+')">确定</span>');
			$('#drag_con').html(dragHtml);
			_jobAreaSelected(index);
			_Show(index);
			_boxAlpha();
			//_draglayer();
		},
		_jobAreaSelected:function(index){
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
		},
		_Show : function(index,selected){
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
			// 全屏遮罩层
		_boxAlpha: function (){
			if (masked==false){
				_maskLayer();
				masked=true;
			}
			else{
				$('#maskLayer').hide();
				masked=false;
			}
		},

		_maskLayer :function(){
			var FW=document.body.scrollWidth;
			var FH=document.body.scrollHeight;
			var SH=window.screen.height;
			FH=FH<SH?SH:FH;
			$("#alphadiv").height(FH).width(FW);
			$('#maskLayer').show();
			$('#maskLayer_iframe').css({position:"absolute",left:"0px",top:"0px"}).height(FH).width(FW);
		},
	}
	//在插件中使用Beautifier对象
    $.fn.addressLD = function(options) {
        //创建Beautifier的实体
        var addressPlus = new addressPlus(this, options);
        //调用其方法
        return addressPlus;
    }
})();
 