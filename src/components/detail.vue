<template>
	<div class="detail">
	 <div class="header">
	 	<div class="header_tips">	 		
		 	<span class="back" @click="goBack">&lt</span>
		 	<img src="../../static/img/share.png" class="share"/>
	 	</div>
		 <img src="../../static/img/banner_img.jpg" alt="" class="detailphpto" />
		 <div class="address_bigicon"><span class="address_big"></span><span class="address_text">路线</span></div>
	 </div> 
	 <div class="info">
	 	<h3 class="detailName">{{itemListArr[0].name}}</h3>
	 	<ul>
	 		<li>星星</li>
	 		<li>人均${{itemListArr[0].biz_ext.cost}}</li>
	 		<li>反馈</li>
	 	</ul>
	 </div>
	 <div class="address">
	 	<span class="address_icon"></span> 
	 	<div class="address_info" @click = "goToMap()">
	 		<span class="distance">距您417米&nbsp;&nbsp;|&nbsp;&nbsp;</span> {{itemListArr[0].address}}
	 	</div>
	 	<span class="phone_icon"></span>
	 </div>
	 <div class="time">
	 	<span class="time_icon"></span> 
	 	<span class="distance">营业时间:&nbsp;&nbsp;{{itemListArr[0].biz_ext.open_time}}</span> 
	 </div>
	 <div class="line"></div>
	 <div class="recommend">
	 	<div class="recommend_text">
	 		<span>网友推荐菜</span>
	 		<span>查看11道推荐菜&gt;</span>
	 	</div>
	 	<div class="recommend_pic">
	 		<div class="food">
		 		<img src="../../static/img/banner_img.jpg"/>
	 			<span class="foodname">
	 				军旗小火锅
	 			</span>
	 		</div>
	 		<div class="food">
		 		<img src="../../static/img/banner_img.jpg"/>
	 			<span class="foodname">
	 				军旗小火锅
	 			</span>
	 		</div>
	 		<div class="food">
		 		<img src="../../static/img/banner_img.jpg"/>
	 			<span class="foodname">
	 				军旗小火锅
	 			</span>
	 		</div>
	 		<div class="food">
		 		<img src="../../static/img/banner_img.jpg"/>
	 			<span class="foodname">
	 				军旗小火锅
	 			</span>
	 		</div>
	 	</div>
	 		<div class="recommentgo">
	 			<span >
	 				菌王奇香锅
	 			</span>
	 			<span >
	 				菌王奇香锅
	 			</span>
	 			<span >
	 				菌王奇香锅
	 			</span>
	 			<span >
	 				菌王奇香锅
	 			</span>
	 			<span >
	 				菌王奇香锅
	 			</span>
	 			<span >
	 				菌王奇香锅
	 			</span>
	 			<span >
	 				菌王奇香锅
	 			</span>
	 			<span >
	 				菌王奇香锅
	 			</span>
	 			<span >
	 				菌王奇香锅
	 			</span>
	 			<span >
	 				菌王奇香锅
	 			</span>
	 			<span >
	 				菌王奇香锅
	 			</span>
	 			<span >
	 				菌王奇香锅
	 			</span>
	 		</div>
	 	<div class="recommend_info"></div>
	 </div>
  </div>
</template>
<script>
//导入封装的星星组件
import mystar from "./mystar/mystar";
export default {
  name: 'list',
  data () {
    return {
      itemListArr:[{'name':"",'address':"",'biz_ext':{"open_time":"","cost":""}}]
  	}
  },
	created(){
		//获取查询字符串的内容
            this.idValue = this.$route.query.idValue;
            console.log(this.idValue)
            var _this=this;
		this.$http.get('http://restapi.amap.com/v3/place/detail',{
			params:{
				key:'0e96c9281f28f99c7621464bf20a7e6f',
				id:this.idValue
			}
		}).then( (response) => {
		    this.itemListArr = response.data.pois;
			console.log(this.itemListArr)
		 }).catch((err)=> {
		    console.log(err);
		  });
	},
	methods:{
		goBack(){
			window.history.go(-1);
		},
		//跳转到地图页面
		goToMap(){
			this.$router.push({ path: '/detailmap'})	
			
		}
	},
	components:{
		mystar
	}
}
</script>


<style scoped>
	
	.header{	
		height: 4.277777rem;
		position: relative;
	}
	.header_tips{
		display: flex;
		justify-content: space-between;
		padding: 0 0.388888rem;
		height: 1.324074rem;
		background: rgba(0,0,0,0.3);
		align-items: center; /* 子项目垂直排列方式 */
	}
	.recommend_pic{
		/*padding-left: 0.092592rem;*/
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
		overflow-x: scroll;
	}
	.recommend_pic .food{
		flex-shrink: 0;
		margin-right: 0.138888rem;
		position: relative;
		width: 3.222222rem;
		height: 2.361111rem;
	}
	 .recommentgo{
	 	height: 1.833333rem;
	 	align-content: space-between;
	 	padding: 0 0.462962rem;
	 }
	 .recommentgo span{
	 	line-height: 0.611111rem;
	 	color: #717171;
	 	font-size: 0.37037rem;
	 	margin-right: 0.462962rem;
	 }
	.recommend_pic .food img{
		width: 100%;
		height: 100%;
	}
	.recommend_pic .food .foodname{
		position: absolute;
		left: 26%;
		bottom: 20%;
		color: white;
		font-size: 0.37037rem;
	}
	.address_bigicon{
		width: 1.851851rem;
		height: 1.851851rem;
		border-radius: 50%;
		background: white;
		z-index: 999;
		position: absolute;
		right: 0.462962rem;
		bottom: -0.925925rem;
	}
	.header .back{
		font-size: 0.555555rem;
		color: #ffffff;
	}
	.header .share{
		height: 0.5rem;
		width: 0.5rem;
	}
	.detail .detailphpto{
		width: 100%;
		height: 4.277777rem;
		 /*相对于整个页面的body定位*/
		position: absolute;  
		top: 0;
		left: 0;
		z-index: -99;
	}
	.detail .info{
		width: 100%;
		display: flex;
		flex-direction: column; /*子元素上下结构布局*/
		background: #4287ff;
		height: 2.574074rem;
		color: #f2ffff;
		justify-content: space-between;   /*设置主轴的排列顺序*/
		box-sizing: border-box;
		padding: 0.648148rem 0 0.648148rem 0.555555rem;
	}
	.detail .info ul{
		display: flex;
	}
	.detail .info ul li{
		margin-right: 0.25rem;
		font-size: 0.351851rem;
	}
	.detail .info ul li:last-child{
		color: #9ac7ff;
	}
	.detail .info ul li:last-child:before{
		display: inline-block;
		margin-right:0.138888rem ;
		content: "";
		width: 0.398148rem;
		height: 0.379629rem;
		background: url(../../static/img/backques.jpg) no-repeat center bottom;
		background-size: 0.398148rem 0.379629rem;
	}
	.detail .info .detailName{
		font-size: 0.537037rem;
		font-weight: bold;
	}
	.address_icon,.phone_icon,.time_icon,.address_big{
		display: inline-block;
		width: 0.435185rem;
		height: 0.546296rem;
		background:url(../../static/img/Satyr.png) no-repeat;
		background-size:cover;
		background-clip: border-box;
	}
	.address_icon{
		background-position: 0px 0px;
	}
	.phone_icon{
		background-position: -0.555555rem 0px;	
	}
	.time_icon{
		background-position: -1.6666rem 0px;	
	}
	.address_big{
		background-position: -1.111111rem 0px;	
		position: absolute;
		left: 44%;
		top: 20%;
		
	}
	.address_text{
		position: absolute;
		left: 34%;
		top: 60%;
		color: #4488f7;
	}
	.address{
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 0.37037rem;
		color: #1f1f1f;
		height: 1.574074rem;
	}
	.address_info{
		width:70%;
		padding-right: 0.046296rem;
		border-right:2px solid #CCCCCC ;
	}
	.recommend{
		display: flex;
		flex-direction: column;
	}
	.recommend .recommend_text{
		display: flex;
		justify-content: space-between;
		line-height: 1.462962rem;
		padding: 0 0.462962rem;
		font-size: 0.425925rem;
		color: #1f1f1f;
	}
	.recommend .recommend_text span:last-child{
		color: #757575;
	}
	.time{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 0.462962rem;
		font-size: 0.37037rem;
		color: #1f1f1f;
		height: 1.574074rem;
	}
	.line{
		width: 100%;
		height: 0.157407rem;
		background: #f4f4f4;
	}
</style>
