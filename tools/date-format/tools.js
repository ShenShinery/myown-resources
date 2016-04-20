/**
 * 
 * @requires jQuery
 * 
 * @returns object
 */
serializeObject = function(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
		}
	});
	return o;
};

getFormJson = function(array){
    var o = {};
    $.each(array, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}


formatString = function(str) {
	for ( var i = 0; i < arguments.length - 1; i++) {
		str = str.replace("{" + i + "}", arguments[i + 1]);
	}
	return str;
};

/**
*
*
*
*/
Date.prototype.format = function(format){
    var o =
    {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds(), //millisecond
        "w" : this.getDay()
    };
    if(/(y+)/.test(format))
    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
    if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
};


/**
*
* eg:1988-02-01 8:30:00
*
*/
function dateFormatWithTime(date){
	if(date!=null){
		var date=new Date(date);
		s = date.getFullYear() + "-";
		s+=("0"+(date.getMonth()+1)).slice(-2) + "-";
		s+= ("0"+date.getDate()).slice(-2) + " ";
		s+= ("0"+date.getHours()).slice(-2) + ":";	    
		s+= ("0"+date.getMinutes()).slice(-2) + ":"	;        
		s+=("0"+date.getSeconds()).slice(-2);
		return s;
	}
}

/**
 *
 * eg:1988-02-01 8:30
 *
 */
function dateFormatWithMin(date){
	if(date!=null){
		var date=new Date(date);
		s = date.getFullYear() + "-";
		s+=("0"+(date.getMonth()+1)).slice(-2) + "-";
		s+= ("0"+date.getDate()).slice(-2) + " ";
		s+= ("0"+date.getHours()).slice(-2) + ":";	    
		s+= ("0"+date.getMinutes()).slice(-2);        
		return s;
	}
}

/**
 * eg: 1988-02-01
 * @author chenyun
 * @param date
 * @returns
 */
function dateFormatWithDate(date){
	if(date!=null){
		var date=new Date(date);
		s = date.getFullYear() + "-";
		s+=("0"+(date.getMonth()+1)).slice(-2) + "-";
		s+= ("0"+date.getDate()).slice(-2) + " ";
		return s;
	}
}

/**
 * eg: 8:30
 * @author chenyun
 * @param date
 * @returns
 */
function dateFormatOnlyTime(date){
	if(date!=null){
		var date=new Date(date);
		var time='';
		time+= conventNumTo2(date.getHours())+":";    
		time+= conventNumTo2(date.getMinutes())+"";
		return time;
	}
}

/**
 * @author chenyun
 * @param year<br> month
 * @returns maxday
 */
function maxDay(year,month){
	return new Date(year, month,0).getDate();
}

/**
 * @author chenyun
 * @param Year
 * @returns {Boolean}
 */
function isLeapYear (Year) {
	if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
		return true;
	}else {
		return false;
	}
}

/*var myview = $.extend({},$.fn.datagrid.defaults.view,{
	onAfterRender:function(target){
		$.fn.datagrid.defaults.view.onAfterRender.call(this,target);
		var opts = $(target).datagrid('options');
		var vc = $(target).datagrid('getPanel').children('div.datagrid-view');
		vc.children('div.datagrid-empty').remove();
		if (!$(target).datagrid('getRows').length){
			var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || 'no records').appendTo(vc);
			d.css({
				position:'absolute',
				left:0,
				top:50,
				width:'100%',
				textAlign:'center'
			});
		}
	}
});*/

/**
 * chen.yu  
 * like 1988-1-1  to 1988-01-01
 * @param num
 * @returns
 */
//Determine the value is greater than or equal to 10
function conventNumTo2(num){
	if(num>=10){
		return num;
	}else{
		return "0"+num;
	}
}


function judgeAtteng()
{
	}

/**
 * @author chen yun
 * @param msd
 * @returns {Number}
 */
function MillisecondToDate(msd) {
  var time = parseFloat(msd) /1000;
  if (null!= time &&""!= time) {
      if (time >60&& time <60*60) {
          time = parseInt(time /60.0) +"min";
      }else if (time >=60*60&& time <60*60*24) {
      	var _time=null;
      	_time = parseInt(time /3600.0) +"hour";
          if(parseInt((parseFloat(time /3600.0) -parseInt(time /3600.0)) *60)==0){
          	
          }else{
          	_time = _time+(parseInt((parseFloat(time /3600.0) -
          			parseInt(time /3600.0)) *60)+1) +"min";
          }
          time=_time;
      }else {
          time = "0hour";
      }
  }else{
      time = "0hour";
  }
  return time;
}
	
	/**
	 *get the parameter of url
	 * 
	 */
	function GetRequest() {
	var url = location.search;
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
	
	

	function formatDateWithOutSeconds(date) {
	var month = date.getMonth() + 1;
	if ("" != date) {
		if (date.getMonth() + 1 < 10) {
			month = '0' + (date.getMonth() + 1);
		}
		var day = date.getDate();
		if (date.getDate() < 10) {
			day = '0' + date.getDate();
		}
		
		var _hours = date.getHours();
		if (date.getHours() < 10) {
			_hours = '0' + date.getHours();
		}
		
		var _minutes = date.getMinutes();
		if (date.getMinutes() < 10) {
			_minutes = '0' + date.getMinutes();
		}

		return date.getFullYear() + '-' + month + '-' + day + " "
				+ _hours + ":" + _minutes;
	} else {
		return "";
	}
}
	
	
	function formatDateOnlyDate(date) {
		var month = date.getMonth() + 1;
		if ("" != date) {
			if (date.getMonth() + 1 < 10) {
				month = '0' + (date.getMonth() + 1);
			}
			var day = date.getDate();
			if (date.getDate() < 10) {
				day = '0' + date.getDate();
			}
			
			return date.getFullYear() + '-' + month + '-' + day;
		} else {
			return "";
		}
	}
