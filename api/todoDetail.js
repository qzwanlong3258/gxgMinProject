import {
	request
} from '@/config/http.js';
import {
	LOAD_ELEMENT,
	GET_SERIES,
	GET_PATTERN,
	GET_PRODUCT_IMG,
	GET_FONT_COLOR,
	GET_FONT_FAMILY,
	GET_FONT_SIZE,
	SAVE_DESIGN,
	GET_MODEL
} from '@/config/api.js';
import {
	formatGender
} from '@/config/filter.js';
import regeneratorRuntime from '@/utils/regenerator-runtime/runtime.js';
const app = getApp();
const moveViewWidth = app.globalData.moveViewWidth
const moveViewHeight = app.globalData.moveViewHeight
//判断元素的宽高
function changeElmentArea({width=0,height=0}={}){
	let eleWidth = parseInt(width)
	let eleHeight = parseInt(height)
	if (eleWidth < moveViewWidth && eleHeight > moveViewHeight) {
		eleWidth = eleWidth / (eleHeight / moveViewHeight)
		eleHeight = moveViewHeight
	} else if (eleWidth > moveViewWidth && eleHeight < moveViewHeight) {
		eleHeight = eleHeight / (eleWidth / moveViewWidth)
		eleWidth = moveViewWidth
	} else if (eleWidth > moveViewWidth && eleHeight > moveViewHeight) {
		if (eleHeight > eleWidth) {
			eleWidth = eleWidth / (eleHeight / moveViewHeight)
			eleHeight = moveViewHeight
		} else {
			eleHeight = eleHeight / (eleWidth / moveViewWidth)
			eleWidth = moveViewWidth
		}
	}
	return {
		eleHeight,
		eleWidth
	}
}


//获取设置画布宽高与该装置下的画布宽高，计算比率
function getCanvasRatio({setWidth='',currentWidth=''}={}){
	return Number(setWidth)/Number(currentWidth)
}

/**
 * 获取元素
 */
export function loadElement(data, viewWidth, viewHeight) {
	return request({
		url: LOAD_ELEMENT,
		data: {
			...data,
			//type: data.type==2?'goods':judgeType(data.type)
			type: typeName(data.type)
		}
	}).then(res => {
		if (!res.list.img) return;
		let GoodsInfo = res.list.GoodsInfo;
		let img = res.list.img;
		let font = res.list.font;
		let isProduct = data.type == 0;
		let ratio = getCanvasRatio({
			setWidth: res.info.length?res.info[0].width:moveViewWidth,
			currentWidth: moveViewWidth
		});
		return [{
				clotheImg: GoodsInfo.zimg,
				localtion: 'positive',
				choosedDesign: {
					elements: img.filter(item => item.location == 1).map(item => {
						if (isProduct) {
							const obj=changeElmentArea({width:item.pwidth,height:item.pheight})
							item.width = obj.eleWidth;
							item.height = obj.eleHeight;
							item.y = (viewHeight - item.height) / 2;
							item.x = (viewWidth - item.width) / 2;
						}
						return {
							y: Number(item.y)/ratio,
							x: Number(item.x)/ratio,
							angle: item.angle,
							id: item.imgid,
							zIndex: 1,
							width: Number(item.width)/ratio,
							height: Number(item.height)/ratio,
							imgUrl: item.thurl,
							originalUrl: item.hdurl,
							thUrl: item.thurl,
						}
					}),
					font: font.filter(item => item.location == 1).map(item=>{
						item.y =  Number(item.y)/ratio
						item.x = Number(item.x)/ratio
						return item
					})
				}
			},{
				clotheImg: GoodsInfo.fimg,
				localtion: 'negative',
				choosedDesign: {
					elements: img.filter(item => item.location == 2).map(item => {
						return {
							y: Number(item.y)/ratio,
							x: Number(item.x)/ratio,
							angle: item.angle,
							zIndex: 1,
							id: item.imgid,
							width: Number(item.width)/ratio,
							height: Number(item.height)/ratio,
							imgUrl: item.thurl,
							originalUrl: item.hdurl,
							thUrl: item.thurl,
						}
					}),
					font: font.filter(item => item.location == 2).map(item=>{
							item.y =  Number(item.y)/ratio
							item.x = Number(item.x)/ratio
							return item
					})
				}
			}
		];
	})
}

/**
 * 获取系列列表
 */
export function getSeries() {
	return request({
		url: GET_SERIES
	});
}

/**
 * 获取图案列表
 */
export function getPattern(id,showLoading) {
	return request({
		url: GET_PATTERN,
		data: {
			id: id
		},
		showLoading
	}).then(res => {
		return res.map(item => {
			return {
				id: item.id,
				imgUrl: item.thurl,
				originalUrl: item.imgurl,
				thUrl: item.thurl,
				width: item.width,
				height: item.height
			}
		})
	});
}

/**
 * 获取产品图片
 */
export function getProductImgs({id=0,type=1}={}) {
    if(Number(type) === 2){
		return request({
			url: GET_PRODUCT_IMG,
			data: {
				id: id
			}
		}).then(res => {
			return {
				zimg: res.find(item => item.type == 'zimg').url,
				fimg: res.find(item => item.type == 'fimg').url
			}
		})
	}else{
		return request({
			url: GET_MODEL,
			data: {
				id: id
			}
		}).then(res => {
			return res.list[0]
		})
	}
	
}

/**
 * 获取字体类型
 */
export function getFontFamily() {
	return request({
		url: GET_FONT_FAMILY
	});
}

/**
 * 获取字体大小
 */
export function getFontSize() {
	return request({
		url: GET_FONT_SIZE
	});
}

/**
 * 获取字体颜色
 */
export function getFontColor() {
	return request({
		url: GET_FONT_COLOR
	});
}

/**
 * 元素转化为提交格式
 */
function conversionElement(array) {
	return array.map(item => {
		return {
			imgUrl: item.originalUrl,
			imgid: item.id,
			width: Math.round(item.width),
			height: Math.round(item.height),
			x: Math.round(item.x),
			y: Math.round(item.y),
			angle: item.angle < 0 ? item.angle + 360 : item.angle,
			zIndex: item.zIndex
		}
	});
}
/*
 * 获取元素类型枚举， 0：goods(产品)，1：model(模板)，2：goods(作品)
*/
function typeName(type) {
	switch (Number(type)) {
		case 0:
			return 'goods';
		case 1:
			return 'model';
		case 2:
			return 'goods';
	}
}

/**
 * 类型分析
 */
function judgeType(type) {
	switch (Number(type)) {
		case 0:
			return 'model';
		case 1:
			return 'model';
		case 2:
			return 'works';
	}
}

/**
 * 字体转化为提交格式
 */
function conversionFont(array) {
	return array.map(item => {
		let res = {
			content: item.content,
			familyid: item.familyid,
			color: item.color,
			familyUrl: item.familyUrl,
			width: Math.round(item.width),
			height: Math.round(item.height),
			size: item.size,
			angle: item.angle < 0 ? item.angle + 360 : item.angle,
			x: Math.round(item.x),
			y: Math.round(item.y),
			isHorizontal: item.isHorizontal
		}
		res.lineHeight = res.isHorizontal ? res.size * 1.1 : res.height;
		return res;
	});
}

/**
 * 保存设计
 */
export function saveDesign(data) {
	let params = {
		type: judgeType(data.type),
		id: data.id,
		size: data.size,
		zimg: conversionElement(data.resultList.find(item => item.localtion == 'positive').choosedDesign.elements),
		zfont: conversionFont(data.resultList.find(item => item.localtion == 'positive').choosedDesign.font),
		fimg: conversionElement(data.resultList.find(item => item.localtion == 'negative').choosedDesign.elements),
		ffont: conversionFont(data.resultList.find(item => item.localtion == 'negative').choosedDesign.font),
		widths: data.widths,
		heights: data.heights
	}
	return request({
		method: 'POST',
		url: SAVE_DESIGN,
		showLoading: true,
		data: params
	}).then(res => {
		return {
			id: res.info.id,
			worksId: res.gid,
			resultList: [{
					url: '',
					patternUrl: res.img.zthpath,
					localtion: 'positive',
					choosedDesign: {
						elements: [],
						font: []
					}
				},
				{
					url: '',
					patternUrl: res.img.fthpath,
					localtion: 'negative',
					choosedDesign: {
						elements: [],
						font: []
					}
				},
			],
			price: res.info.price,
			name: res.info.name,
			categoryName: res.info.categoryName,
			sexName: formatGender(res.info.sexName),
			sexValue: res.info.sexName,
			typeName: res.info.typeName,
			sizeName: res.info.sizeName,
			state: 1
		}
	})
}