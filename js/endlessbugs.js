var password=["可完成序列：987665433211078106772"];
$(function(){
	var clickorder='';
	$('.list-frame').on('click',function(){
		var C_ele=$(this).find('.list-btn');
		var C_ord=$(this).find('.list-btn').attr('data-order')-0;
		var C_val=$(this).find('.list-btn').attr('data-value');
		clickorder=clickorder+C_ord;
		localStorage.setItem('clickorder','点击序列为：'+clickorder);
		/*
		*  data-oder:序列
		* data-value:开关值0/1
		*
		*可完成点击序列： 987665433211078106772
		*可完成点击序列： 135687125
		*
		*点击序列：75749066218340	共14位
		*按键绑定：1048576			共7位
		*点击奇偶：11101000010100	共6位
		*键关联数：131012			共6位
		*关联基数：1 4 5 6 7 8 0		(绑定基数)
		*对应关系：选取1048576涉及到的数字，去匹配对应位的2097152数字。
		*		  并通过MOD11-2算法的序列12485109736顺序加入组合中。
		*		原		绑			算法			组合
		*		1		2			1			1-2
		*		2					2			2
		*		3					4			3-4
		*		4		10			8			4-10-8
		*		5		9			5			5-9
		*		6		7			10			6-7-10
		*		7		1			9			7-1-9
		*		8		5			7			8-5-7
		*		9					3			9-3
		*		10		2			6			10-2-6
		*关联组合：
		*		1  :  1-2
		*		2  :  2
		*		3  :  3-4
		*		4  :  4-10-8
		*		5  :  5-9
		*		6  :  6-7-10
		*		7  :  7-1-9
		*		8  :  8-5-7
		*		9  :  9-3
		*		10 : 10-2-6
		*额外规则：重复出现的数字，点击第二次的时候需要多增加一个规则
		*		  新定的规则为Connect(baseord,ord1,ord2,ord3)
		*切换规则：Cvalue(order)，将序列号输入，即可切换按钮的开关状态
		*
		*/
		// switch(C_ord){
		// 	case 1:
		// 		Cvalue(1);
		// 		Cvalue(10);
		// 		break;
		// 	case 2:
		// 		Cvalue(2);
		// 		break;
		// 	case 3:
		// 		Cvalue(3);
		// 		break;
		// 	case 4:
		// 		Cvalue(4);
		// 		Cvalue(2);
		// 		Cvalue(3);
		// 		Cvalue(9);
		// 		break;
		// 	case 5:
		// 		Cvalue(5);
		// 		Cvalue(2);
		// 		break;
		// 	case 6:
		// 		Cvalue(6);
		// 		Cvalue(8);
		// 		break;
		// 	case 7:
		// 		Cvalue(7);
		// 		Cvalue(3);
		// 		break;
		// 	case 8:
		// 		Cvalue(8);
		// 		Cvalue(6);
		// 		Cvalue(9);
		// 		break;
		// 	case 9:
		// 		Cvalue(9);
		// 		break;
		// 	case 10:
		// 		Cvalue(10);
		// 		Cvalue(6);
		// 		break;
		// 	default:
		// 		break;
		// }
		// switch(C_ord){
		// 	case 1:
		// 		Cvalue(1);
		// 		Cvalue(10);
		// 		break;
		// 	case 2:
		// 		Cvalue(2);
		// 		break;
		// 	case 3:
		// 		Cvalue(3);
		// 		break;
		// 	case 4:
		// 		Cvalue(4);
		// 		Cvalue(2);
		// 		break;
		// 	case 5:
		// 		Cvalue(5);
		// 		Cvalue(6);
		// 		Cvalue(9);
		// 		break;
		// 	case 6:
		// 		Cvalue(6);
		// 		Cvalue(8);
		// 		break;
		// 	case 7:
		// 		Cvalue(7);
		// 		Cvalue(3);
		// 		break;
		// 	case 8:
		// 		Cvalue(8);
		// 		break;
		// 	case 9:
		// 		Cvalue(9);
		// 		break;
		// 	case 10:
		// 		Cvalue(10);
		// 		Cvalue(2);
		// 		Cvalue(3);
		// 		Cvalue(9);
		// 		break;
		// 	default:
		// 		break;
		// }
		switch(C_ord){
			case 1:
				Connect(1,3,4,5,5);
				Cvalue(1);
				Cvalue(2);
				break;
			case 2:
				Connect(2,2,9,10,6);
				Cvalue(2);
				break;
			case 3:
				Cvalue(3);
				Cvalue(4);
				break;
			case 4:
				Connect(4,5,7,9,3);
				Cvalue(4);
				Cvalue(10);
				Cvalue(8);
				break;
			case 5:
				Cvalue(5);
				Cvalue(9);
				break;
			case 6:
				Connect(6,5,7,8,9);
				Cvalue(6);
				Cvalue(7);
				Cvalue(10);
				break;
			case 7:
				Connect(7,7,1,5,10);
				Cvalue(7);
				Cvalue(1);
				Cvalue(9);
				break;
			case 8:
				Cvalue(8);
				Cvalue(5);
				Cvalue(7);
				break;
			case 9:
				Cvalue(9);
				Cvalue(3);
				break;
			case 10:
				Cvalue(10);
				Cvalue(2);
				Cvalue(6);
				break;
		}
		win();

		/*重置按钮*/
		$('button').off().on('click',function(){
			$('.list-btn').css('margin-left','3px');
			$('.list-btn').attr('data-value','0');
			clickorder='';
			console.log(localStorage.getItem('clickorder'));
		})

	})
});
var win=(function(){
	/*判断结果*/
	var count=0;
	for (var i = 0; i < 10; i++) {
		count+=$('.list-frame').eq(i).find('.list-btn').attr('data-value')-0;
	}
	if (count==10) {
		alert(
			'恭喜你改完了所有Bug！！！🎉'
			+'\n'+localStorage.getItem('clickorder')
		);
	}
});
/*切换按钮值的可传递函数*/
var Cvalue=(function(order){
	var element=$('.list-frame').eq(order-1).find('.list-btn');
	var value=$('.list-frame').eq(order-1).find('.list-btn').attr('data-value');
	if (value=='0') {
		element.attr('data-value','1');
		element.css('margin-left','30px');
	}else if (value=='1') {
		element.css('margin-left','3px');
		element.attr('data-value','0');
	}
});
var Connect=(function(baseord,ord1,ord2,ord3,neword){
	/*需要第一步执行*/
	var C_ord1=$('.list-frame').eq(ord1-1).find('.list-btn').attr('data-value');
	var C_ord2=$('.list-frame').eq(ord2-1).find('.list-btn').attr('data-value');
	var C_ord3=$('.list-frame').eq(ord3-1).find('.list-btn').attr('data-value');
	if (C_ord1=='1'&C_ord2=='1'&C_ord3=='1') {
		switch(baseord){
			case 1:case 2:case 4:case 6:case 7:Cvalue(neword);break;
		}
	}
});