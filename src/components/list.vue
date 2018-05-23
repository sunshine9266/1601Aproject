<template>
	<div class="list">
	 <div class="header">
	 	<span class="back" @click="goBack()"><</span>
	 	<h3 class="title">{{keyWords}}</h3>
	 	<img src="../../static/img/list_right.png"/>
	 </div>
	 <div class="search">
	 	<select name="">
	 		<option value="5000米">5000米</option>
	 	</select>
	 	<select name="">
	 		<option value="5000米">全部分类</option>
	 	</select>
	 	<select name="sorts" v-model="selected" @change="changeValue()">
	 		<!--<option value="default">综合排序</option>
	 		<option value="price">价格排序</option>
	 		<option value="ratings">评分排序</option>-->
	 		<option v-for="option in options" :value="option.value">{{option.text}}</option> 		
	 	</select>
	 	<select name="">
	 		<option value="5000米">更多筛选</option>
	 	</select>
	 </div>
	 <ul class="businesslist">
	 	
	 	<li class="listitem" v-for="data in itemListArr" @click="goToDetail(data.id)">
	 		<div class="itemleft">
	 			<h3 class="itemname">{{data.name}}</h3>
	 			<ul>
	 				<li class="star">
		 				<mystar :score="data.biz_ext.rating*2"></mystar>
	 				</li>
	 				<li class="ratings">673条评论</li>
	 				<li class="per" v-if="data.biz_ext.cost.length">人均<span>${{data.biz_ext.cost}}</span>元</li>
	 			</ul>
	 			<ul class="address">
	 				<li>{{data.type}}</li>
	 				<li>{{data.address}}</li>
	 				<li v-if="data.distance[0]">{{data.distance}}米</li>
	 			</ul>
	 			<ul class="tag">
	 				<li v-for = "datas in data.type.split(';')">{{datas}}</li>
	 			</ul>
	 		</div>
	 		<img v-lazy="data.photos[0].url"/>
	 	</li>
	 </ul>
  </div>
</template>

<script>
//导入封装的星星组件
import mystar from "./mystar/mystar";
export default {
  name: 'list',
  data () {
    return {
      defaultItemListArr:[],
      itemListArr:[],
      keyWords:"美食",
      selected:"defaults",
       options: [{
            text: '综合排序',
            value: 'defaults'
        }, {
            text: '评分排序',
            value: 'ratings'
        }, {
            text: '价格排序',
            value: 'prices'
        }]
    }
  	
  },
	created(){
		//获取查询字符串的内容
            this.keyWords = this.$route.query.list;
            window.onscroll = function(){
            	console.log(document.documentElement.scrollTop)
            }
            var _this=this;
		this.$http.get('http://restapi.amap.com/v3/place/text',{
			params:{
				key:'0e96c9281f28f99c7621464bf20a7e6f',
				keywords:_this.keyWords,
				city:"北京",
				extensions:"all"
			}
		}).then( (response) => {
		    this.itemListArr = response.data.pois;
		    //想法1
//		    this.defaultItemListArr = this.itemListArr;
			//想法2
//		    this.defaultItemListArr = response.data.pois;
//			想法3  --可行
//			for(var i=0;i<response.data.pois.length;i++){
//				this.$set(this.defaultItemListArr,i,this.itemListArr[i])
//			}
//			想法4 --可行
			this.defaultItemListArr = JSON.parse(JSON.stringify(response.data.pois))
//			console.log(this.defaultItemListArr)
		 }).catch((response)=> {
		    console.log(response);
		  });
	},
	methods:{
		//点击排序的方法
		changeValue(){
			console.log(this.selected);
			switch(this.selected){
				case "defaults":
//				console.log(this.defaultItemListArr);
//				this.itemListArr = this.defaultItemListArr;
				this.itemListArr =JSON.parse(JSON.stringify(this.defaultItemListArr));
//				console.log(this.itemListArr);

				break;
				case "prices":
					this.itemListArr = this.itemListArr.sort((a,b)=>{
						return a.biz_ext.cost-b.biz_ext.cost;
					})
				break;
				case "ratings":
				console.log(this.defaultItemListArr);
					this.itemListArr = this.itemListArr.sort((a,b)=>{
						return b.biz_ext.rating-a.biz_ext.rating
					})
//					this.itemListArr = this.sortByRequire("ratings");
				break;
			}
		},
//				封装一个方法,传入关键词(ratings,prices....,以及原来的数据,返回对应排序好了的数组)
		
//		sortByRequire(req){
//			if(req=="ratings"){
//				return this.itemListArr.sort((a,b)=>{
//					return b.biz_ext.rating-a.biz_ext.rating
//				})
//
//			}
//			
//		},
		
		
		goBack(){
			window.history.go(-1);
		},
//		跳转到详情页的方法
		goToDetail(value){
			console.log("要跳转到详情页店铺id是:"+value);
			this.$router.push({ path: '/detail',query:{idValue:value} })	
		}
	},
	components:{
		mystar
	}
	
}
</script>


<style scoped>
	.list{
		padding-top: 2.444444rem;
	}
	.header{
		display: flex;
		justify-content: space-between;
		width: 95%;
		padding: 0 0.259259rem;
		height:1.333333rem;
		border-bottom: 1px solid #cccccc;
		align-items: center; /* 子项目垂直排列方式 */
		position: fixed;
		left: 0;
		top: 0;
		background: #FFFFFF;
	}
	.header img{
		width: 1.666666rem;
		height: 0.629629rem;
	}
	.header .title,.header .back{
		font-size: 0.462962rem;
		color: #262626;
		font-weight: bold;
	}
	.header .back{
		margin-left: 0.185185rem;
		font-size: 0.555555rem;
	}
	.search{
		display: flex;
		flex-grow: 1;
		align-items: center;
		justify-content: space-around;
		height: 1.111111rem;
		background: white;
		color: #6e6e6e;
		font-size: 0.37037rem;
		border-bottom: 1px solid #e8e8e8;
		width: 100%;
		position: fixed;
		left: 0;
		top: 1.333333rem;
		background: #FFFFFF;

	}
	.search select{
		color: #6e6e6e;
		border: none;
		background: white;
	}
	.listitem{
		display: flex;
		/*height: 3.194444rem;*/
		padding: 0.592592rem 0.444444rem 0.324074rem 0.444444rem;
		border-bottom: 1px solid #e8e8e8;
	}
	.listitem .itemleft{
		flex-grow: 1;
		/*border: 1px solid red;*/
		height: 2.268518rem;
	}
	.itemleft .star{
		width: 1.851851rem;
		
	}
	.itemleft ul{
		display: flex;
		align-items: flex-end;
		height: 0.611111rem;
		color: #747474;
		font-size: 0.351851rem;
		/*border: 1px solid red;*/
	}
	.itemleft .address li:first-child{
		width: 1.851851rem;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.itemleft .address li:nth-child(2){
		width: 1.111111rem;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.itemleft ul li{
		margin-right: 0.296296rem;
	}
	.itemleft ul li span{
		color: #ff5e63;
		font-weight: bold;
	}
	.listitem img{
		width: 1.962962rem;
		height: 1.962962rem;
	}

 	.tag{
		display: flex;
		flex-direction: row;
	}
	.itemleft .tag li{
		border: 1px solid #6b6b6b;
		border-radius:0.074074rem;
		padding: 0.046296rem 0.074074rem;
		font-size: 0.277777rem !important;
		/*align-self:flex-start;*/
		
	}
	.itemname{
		font-size: 0.462962rem;
		color: #1f1f1f;
		height: 0.462962rem;
		font-weight: bolder;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		width: 86%;
	}
</style>
