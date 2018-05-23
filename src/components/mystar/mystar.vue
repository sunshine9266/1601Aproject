<template>
	<div class="starcom">
		<span v-for="myclass in allStarClass" :class="myclass" class="itemstar"> </span>
		<!--
			星星组件步骤,这里是要根据props传递进来的分数得到不同颜色的星星,星星用图片代替
			所以星星用图片背景图展示.要想一个办法把
			1:整数分数变为对应的彩色星,
			2:小数>=0.5分的为半颗星,
			3:分数小数<0.5的不用管,
			5.满分为5颗星,剩余不是半星和全星的就是灰色星 
		-->
	</div>
	
</template>
<script>
	export default {
		props:["score"],
//		created(){
//			console.log(this.score);
//		},
		computed:{
			//要计算一个装载样式的数组,时为了将来循环遍历样式名的
			allStarClass(){
//				要把所有的样式放到这个里面,放到一个数组里面
				let starClassesArr = [];
				//我想得到有多少颗全星
				let num = Math.floor(this.score/2) ;//得到所有全星有多少颗
				let hasDecimal =false;  //判断是否有半颗星星
				if(Math.round(this.score/2)<=num){
					hasDecimal =false;
				}else{
					hasDecimal =true;
				}
				//得到所有的半星
				for(var i=0;i<num;i++){
					starClassesArr.push("itemstaron");
				}
				if(hasDecimal){
					starClassesArr.push("itemstarhalf");
				}
				while(starClassesArr.length<5){
					starClassesArr.push("itemstarhui");
				}
				return starClassesArr
			}
		}
	}
</script>
<style scoped>
	.itemstar{
		/*border: 1px solid red;*/
		display: inline-block;
		width: 0.324074rem;
		height: 0.324074rem;
	}
	.itemstaron{
		background: url(./star24_on@2x.png);
		background-size: 0.324074rem;
		
	}
	.itemstarhui{
		background: url(./star24_off@2x.png);
		background-size: 0.324074rem;
		
	}
	.itemstarhalf{
		background: url(./star24_half@2x.png);
		background-size: 0.324074rem;
		
	}
</style>