<template>
	<view>
		<view class='container box-bg-color'>
			<view class='design-top' ref='photo'>
				<view @click='changePnEvent' class="pn-change"><i v-if='isShowPnIcon' class="iconfont iconxunhuan"></i><text class="tip-font">{{localtionName}}</text></view>
				<image :style="{marginTop: `${clotheMariginTop}px`}" class='clothe-bg' :src='clotheList[pnIndex].clotheImg' mode='widthFix'></image>
				<view v-if='(todoIndex >= 0 || fontIndex >= 0)' class='rate-slider'>
					<i class="iconfont iconicon_rotate"></i>
					<view class="tip-line-slider"></view>
					<slider @changing='sliderChange' @change='sliderEnd' block-color="#000" selected-color='#fff' backgroundColor="#000"
					 class="slider-box" block-size="12" v-model='sliderValue' />
					 <view class="rotate-num">{{parseInt((sliderValue-50)*3.6)}}°</view>
				</view>
				<movable-area class='move-area' :style="{top:`${moveViewTop}px`,width: `${moveViewWidth}px`,height:`${moveViewHeight}px`}">
					<movable-view direction='all' v-for='(item,indexLocal) in choosedDesign.elements' :key='indexLocal' :disabled='(!(todoIndex===indexLocal))||(!isTouch)'
					 :data-index='indexLocal' :style='{height:`${item.height}px`,width:`${item.width}px`}' :x='item.x' :y='item.y'
					@touchstart='ontouchStartEvent'  @change="changeLocal($event)" @touchend="ontouchend($event)" :animation='false' >
						<view :class='[todoIndex===indexLocal?"move-view":""]' :style='[{width:"100%", height:"100%",transform:`rotate(${item.angle}deg)`}]'>
							<view v-if="todoIndex===indexLocal" class='image-border image-border1' @touchstart='touchStart' @touchmove='touch'
							 @touchend='touchEnd' data-localtion='topLeft'>
								<image :src='iconList[3].imgUrl' @click="clickIcon" :data-id='iconList[3].id' :data-isSelect='iconList[3].isSelect' :data-index='indexLocal'></image>
							</view>
							<view v-if="todoIndex===indexLocal" class='image-border image-border2' @touchstart='touchStart' @touchmove='touch'
							 @touchend='touchEnd' data-localtion='topRight'>
							 <image :src='iconList[2].imgUrl' @click="clickIcon" :data-id='iconList[2].id' :data-isSelect='iconList[2].isSelect' :data-index='indexLocal'></image>
							</view>
							<!-- <view v-if="todoIndex===indexLocal" class='image-border image-border3' @touchstart='touchStart' @touchmove='touch'
							 @touchend='touchEnd' data-localtion='bottomLeft'>
							</view> -->
							<view v-if="todoIndex===indexLocal" class='image-border image-border4' @touchstart='touchStart' @touchmove.stop.prevent='touch'
							 @touchend='touchEnd' data-localtion='bottomRight'>
							 <image :src='iconList[0].imgUrl'></image>
							</view>
							<image @click='navIndex === 0 && changeElment($event)' :data-index='indexLocal' class='choosed-image' :src='item.imgUrl' mode="scaleToFill" />
						</view>
						<!-- <view v-if="todoIndex===indexLocal"   class='icon-list'>
							<view class='icon-clonum' v-for='(item,iconIndex) in iconList' :key='iconIndex' @click='clickIcon' :data-id='item.id'
							 :data-isSelect='item.isSelect' :data-index='indexLocal'>
								<i :class='["iconfont",item.icon]'></i>
								<i v-if='item.isSelect' class='iconfont iconbelow-s' style='font-size:20upx;'></i>
								<view class='icon-name'>{{item.name}}</view>
							</view>
						</view> -->
					</movable-view>
					<movable-view direction='all' v-for='(item,index) in choosedDesign.font' :key='index' :disabled='!(fontIndex===index)'
					 :data-index='index' :style='{height:`${item.height}px`,width:`${item.width}px`}' :x='item.x' :y='item.y' @change.stop="isFontTouch&&changeFontLocal($event)" 
					 @touchend.stop="isFontTouch&&ontouchfontend($event)" :animation='false'>
						<view :style="{height:`${item.height}px`,width:`${item.width}px`,transform:`rotate(${item.angle}deg)`}">
							<view :class='{"font-box":fontIndex===index}'>
								<view v-if='fontIndex===index' class='font-border font-border1'></view>
								<view v-if='fontIndex===index' class='font-border font-border2'></view>
								<view v-if='fontIndex===index' class='font-border font-border3'></view>
								<view v-if='fontIndex===index' class='font-border font-border4'></view>
								<text class="customize-font" v-if="(isShowText || fontIndex!==index)" @click='clickTextEvent' :data-index='index' :style='[{fontFamily:`${item.family}`,width:`${item.width}px`,
								height:`${item.height}px`,fontSize:`${item.size}px`,color:`${item.color}`,writingMode:item.isHorizontal?"lr-tb":"",lineHeight:`${(item.isHorizontal === true || item.isHorizontal === "true")?(item.size*1.1):item.height}px`,textAlign:"center",display:"block"}]'>
									{{item.content}}
								</text>
								<input v-if="!isShowText && fontIndex===index" placeholder='输入文字' :data-index='index' maxlength="8" :placeholder-style='[{color:item.color,fontSize:`${item.size}px`}]'
								 :style='[{width:`${item.width}px`,height:`${item.height}px`,fontFamily:`${item.family}`,fontSize:`${item.size}px`,color:`${item.color}`,textAlign:"center"}]'
								 v-model="item.content" @input="changeFontWidth($event)"></input>
							</view>
							<view v-if='fontIndex===index' class="h-line"></view>
							<view v-if='fontIndex===index' class='icon-list'>
								<view class='icon-clonum' v-for='(item,iconIndex) in fontIconList' :key='iconIndex' @click='clickFontIcon'
								 :data-isSelect='item.isSelect' :data-index='iconIndex' :data-pindex='index'>
									<i :class='["iconfont",item.icon]'></i>
									<view class='icon-name'>{{ item.name }}</view>
									<view v-if='item.isSelect && showSelectList === iconIndex' class='select-icon-list'>
										<view class="select-icon-clonum" v-for="(v,k) in selectList" :key='k' :style="{backgroundColor: v.color?v.color:''}"
										 :data-id='v.id' :data-index='k' :data-iconindex='iconIndex' :data-pindex='index' @click.stop='changeFontEvent'>{{v.name?v.name:''}}</view>
									</view>
								</view>
							</view>
						</view>
					</movable-view>
				</movable-area>
			</view>
			<view class='nav-list'>
			<view @click='changeNavPhoto' :class='["nav-clonum", navIndex === 0 ? "swiper-dot-active" : ""]'>
				添加图案
			</view>
			<view @click='changeNavText' :class='["nav-clonum", navIndex === 1 ? "swiper-dot-active" : ""]'>
				添加字体
			</view>
			<view @click='changeNavDesign' v-if='getStorageData' :class='["nav-clonum", navIndex === 2 ? "swiper-dot-active" : ""]'>
				预览设计
			</view>
			<button  v-if='!getStorageData' style="padding: 0;margin: 0;" :class='["nav-clonum", navIndex === 2 ? "swiper-dot-active" : ""]' open-type="getUserInfo" @getuserinfo="getUserInfo" >
				预览设计
			</button>
				<!-- <view @click='changeNav' :class='["nav-clonum", navIndex === index ? "swiper-dot-active" : ""]' v-for="(item,index) in navList"
				 :key="index" :data-index='index'>{{item.name}}</view> -->
			</view>
			<view v-if="navIndex === 0">
				<view class='type-list'>
					<view @click='changeNavType' :class='["type-clonum","tip-font",typeIndex === index ? "swiper-dot-active" : ""]'
					 v-for="(item,index) in typeList" :key="index" :data-index='index'>{{item.name}}</view>
				</view>
				<scroll-view scroll-x class='element-style'>
					<view class='element-list'>
						<view v-for='(item,index) in elementList' :key='index'>
							<image @click='choosedImg' :data-img="index" class='style-clonum' :src='item.imgUrl' mode='aspectFit'></image>
						</view>
					</view>
				</scroll-view>
			</view>
			<view v-if="navIndex === 1" @click="addFont" class="add-icon">
				<i class='iconfont iconziti'></i>
				<view class="add-font-tip">添加文字</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import detail from './todoDetail.js'
	export default {
		...detail,
	}
</script>

<style scoped>
	@import "./todoDetail.css";
</style>
