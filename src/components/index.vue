<template>
	<div class="index">
	  <div class="header">
	   <img src="../../static/img/logo.jpg"/>
		  <div class="right">
		  	<span class="active">分类</span>
		  	<span>登录</span>
		  	<span>搜索</span>
		  </div>
	  </div>
	  <div class="search">
	  	<input type="search" placeholder="请输入关键字" results="s" ref='serchKeyWords' @input="serchItem('serch.value')"/>
	  	<ul v-if="pullArr.length">
	  		<li v-for="(data,index) in pullArr" @click="goToDetail(index)" v-bind:class="data.id ? 'hightlight':'' ">
	  			<span ref="serchlist">{{data.name}}</span>
	  			<span class="addre" v-if="data.district.length">{{data.district}}</span>
	  		</li>
	  	</ul>
	  </div>
	  <div class="container">
		  <ul class="main_left" >
		  	<li v-for = "(data,index) in leftArr" @click="getnum(index)" :class="{activeli:index==num}" >{{data.tit}}</li>
		  </ul>
		  <ul class="main_right">
		  	<li v-for = "data in leftArr[num].datainfo" @click="jumpToList(data.name)">
		  		<img :src="data.img"/>
		  		<h3>{{data.name}}</h3>
		  		<span v-if="data.datatype">{{data.datatype}}</span>
		  	</li>
		  </ul>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      leftArr:[{ datainfo: [] }],
      num:0,
      serchArr:[], //用来检索用户输入的值是否存在整体列表
      pullArr:[]  //用来级联展示的数组
  	}
  },
	created(){
		this.$http.get('../static/list.json')
//		this.$http.get('http://127.0.0.1:8899/api/selectgoods')
		  .then( (response) => {
		  	console.log(response);
		    this.leftArr = response.data.type;
			this.serchArr = this.getTypeArr(this.leftArr);
		  })
		  .catch((response)=> {
		    console.log(response);
		  });
		
//		要在这里获取到当前的地理位置
//		if (navigator.geolocation) {  
//	    navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError,{  
//	        // 指示浏览器获取高精度的位置，默认为false  
//	        enableHighAcuracy: true,  
//	        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒  
//	        timeout: 5000,  
//	        // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。  
//	        maximumAge: 3000  
//	    });  
//		}else{  
//		    alert("Your browser does not support Geolocation!");  
//		}

	},
	methods:{
//		一个获取分类并去重数组的方法
		getTypeArr(alltype){
			var newArr = [];
			for(var item of alltype){
				for(var type of item.datainfo){
//				var arr = [...new Set(newArr.push(type.name))];
					newArr.push(type.name)
				}
			}
//				进行去重
//				var arr = Array.from(new Set(newArr))  
				//new Set() 对象中生成的值是唯一的,不能重复的,利用这个特性可以进行输入去重
				//Array新增了一个静态方法Array.from，可以把类似数组的对象转换为数组
				var arr = [...new Set(newArr)];  //...     展开运算符
//				console.log(arr);
				return arr;
		},
		getnum(index){
			this.num = index;
		},
		//点击选项直接跳转到列表页面
		jumpToList(value){
			//字符串方式
			this.$router.push({ path: '/list',query:{list:value} })
		},
		//输入框搜索的方法
		serchItem(value){
			//如何来获取dom元素
			var keyword = this.$refs.serchKeyWords.value;
//			keyword 是用户输入的谁,现在想在下面级联想象到了谁
			this.$http.get("http://restapi.amap.com/v3/assistant/inputtips",{
				params:{
					key:'0e96c9281f28f99c7621464bf20a7e6f',
					keywords:keyword,
					datatype:"all",
					location:"116.481488,39.990464",
					city:"北京"
//					type:"050301"
				}
		}).then((res)=>{
//				console.log(res.data.tips);
				this.pullArr = res.data.tips;
			}).catch((err)=> {
		   	 	console.log(err);
		  });		
//			if(this.serchArr.indexOf(keyword)==-1){
////				去详情页
//				this.$router.push({ path: '/detail',query:{list:keyword} })
//			}else{
////				去列表页
//				this.$router.push({ path: '/list',query:{list:keyword} })
//			}
			/*
			 作用:
			 * 用户输入搜索的关键词,
			 * 2如果是具体的店铺,
			 * 	2.1
			 * 将所有的已有分类放到一个数组里面
			 * 2.2
			 * 对数组进行去重
			 * 3.得到用户输入的值.
			 * 对用户输入的值进行判断,如果是已有分类的
			 * 跳转到detail详情页(第三个)
			 * 4如果输入的是品类下面的,跳转到第二个列表页面
			 * 可能会用到哪些知识点(写一些伪代码): 
			 * 调错
			 * */
	},
	//是否跳转到详情页
	goToDetail(index){
		//获得到用户点击的数据
		var selectValue = this.$refs.serchlist[index].innerHTML;
		if(this.serchArr.indexOf(selectValue)==-1){
//				去详情页
//				if(如果用户输入的东西没有的话){
				//在此处进行判断    让框输入的字变红
				//return}
			this.$router.push({ path: '/detail',query:{list:selectValue} })
		}else{
//				去列表页
			this.$router.push({ path: '/list',query:{list:selectValue} })
		}	
	},
	locationSuccess(){
		var lat = position.coords.latitude; //纬度 
		  var lag = position.coords.longitude; //经度 
		  alert('纬度:'+lat+',经度:'+lag); 
//			this.$refs.serchKeyWords.value = '纬度:'+lat+',经度:'+lag
	},
	locationError(error){
		switch(error.code) { 
	    case error.PERMISSION_DENIED: 
	      alert("定位失败,用户拒绝请求地理定位"); 
	      break; 
	    case error.POSITION_UNAVAILABLE: 
	      alert("定位失败,位置信息是不可用"); 
	      break; 
	    case error.TIMEOUT: 
	      alert("定位失败,请求获取用户位置超时"); 
	      break; 
	    case error.UNKNOWN_ERROR: 
	      alert("定位失败,定位系统失效"); 
	      break; 
	  } 
	}
	
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header{
		display: flex;
		justify-content: space-between;
		padding: 0 0.259259rem;
		height: 1.074074rem;
		border-bottom: 1px dashed #cccccc;
		align-items: center; /* 子项目垂直排列方式 */
	}
	.right .active{
		color:orange;
	}
	.search input{
		color: #1F1F1F !important;
	}
	.header img{
		width: 2.879629rem;
		height: 0.842592rem;
	}
	.header .right{
		width: 4.12037rem;
		display: flex;
		justify-content: space-between;
		height: 1.074074rem;
		line-height: 1.074074rem;
		font-size: 0.462962rem;
		font-weight: 600;
		color: #656565;
	}
	.search ul .hightlight{
		color: floralwhite;
		font-weight: bold;
	}
	.search{
		display: flex;
		padding: 0 0.259259rem;
		align-items: center;
		height: 1.166666rem;
		background: #f6f6f6;
		border-bottom: 3px solid #e8e8e8;
		position: relative;
		/*flex-direction: column;*/
	}
	.search	input{
		width: 100%;
		height: 0.814814rem;
		border: 0.015625rem solid #D4D4D4;
		border-radius: 0.125rem;
		color: #DCDCDC;
		text-indent: 0.138888rem;
	}
	.search ul{
		background: rgba(0,0,0,0.3);
		border: 1px solid #CCCCCC;
		border-radius: 0.092592rem;
		flex-grow: 1;
		position: absolute;
		top: 0.981481rem;
		right: 0.277777rem;
		left: 0.277777rem;	
	}
	.search ul li{
		height: 0.648148rem;
		line-height: 0.648148rem;
		border-bottom:1px dashed #D4D4D4 ;
		width: 90%;
		padding: 0.138888rem;
		color: white;
		display: flex;
		justify-content: space-between;
		
	}
	.search ul li:last-child{
		border-bottom:none;

	}
	.container{
		display: flex;
		background: #f6f6f6;
	}
	.main_left .activeli{
		background: #f6f6f6;
		border-left: 4px solid #4caaf4;
		border-bottom-left-radius: 3px;
		border-top-left-radius: 3px;
		border-right:1px solid #f6f6f6;
	}
	.main_left{
		display: flex;
		flex-direction: column;
		background: white;
		flex-grow: 1;
	}
	.main_left li{
		height: 1.722222rem;
		width: 2.453703rem;
		color: #3a3a3a;
		font-size: 0.537037rem;
		border-left: 4px solid transparent;
		border-right: 1px solid #e8e8e8;
		border-bottom: 1px solid #e8e8e8;
		text-align: center;
		line-height: 1.722222rem;
	}
	.main_right{
		width: 7.527777rem;
	}
	.main_right li{
		width: 100%;
		height: 1.722222rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e8e8e8;
		color: #3a3a3a;

	}
	.main_right li img{
		width: 1.342592rem;
		height: 1.342592rem;
		margin-left: 0.462962rem;
		margin-right: 0.185185rem;
		flex-shrink: 0;
	}
	.main_right  h3{
		flex-grow: 1;
		font-size: 0.425925rem;
	}
	.main_right li span{
		color: #626262;
		margin-right: 0.277777rem;
	}
</style>
