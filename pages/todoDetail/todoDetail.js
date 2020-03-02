import {
	request
} from '@/config/http.js';
import {
	TODO_SUOFANG,
	TODO_QUEDING,
	TODO_SHANCHU,
} from '@/config/image.js';
import {
	gxgConfirm
} from '@/config/package.js';
import {
	PERVIEW_DETAIL
} from '@/config/router.js';
import {
	anglePoint,
	getBLen
} from '@/utils/util.js';
import {
	getStorage
} from '@/utils/storage.js';
import regeneratorRuntime from '@/utils/regenerator-runtime/runtime.js';
import {
	loadElement,
	getSeries,
	getPattern,
	getProductImgs,
	getFontColor,
	getFontFamily,
	getFontSize,
	saveDesign
} from '@/api/todoDetail.js';
import {
	mapMutations
} from 'vuex';
import types from '@/store/mutationTypes.js';
import {
	toast,
	model
} from '@/config/package.js'
const app = getApp();
const moveViewWidth = app.globalData.moveViewWidth
const moveViewHeight = app.globalData.moveViewHeight

// 初始化设计结果
const resultList = [{
		url: '',
		patternUrl: '',
		localtion: 'positive',
		choosedDesign: {
			elements: [],
			font: []
		}
	},
	{
		url: '',
		patternUrl: '',
		localtion: 'negative',
		choosedDesign: {
			elements: [],
			font: []
		}
	},
];

//初始字体格式
const fontHv = [{
		id: 1,
		name: '横版'
	},
	{
		id: 2,
		name: '竖版'
	}
]

let fontFailmy = [];
let fontSize = [];
let fontColor = [];

const detail = {
	data() {
		return {
			localtionName: '正面',
			resultList: [{
					clotheImg: '',
					localtion: 'positive',
					choosedDesign: {
						elements: [],
						font: []
					}
				},
				{
					clotheImg: '',
					localtion: 'negative',
					choosedDesign: {
						elements: [],
						font: []
					}
				},
			],
			pnIndex: 0,
			isShowPnIcon: true,
			clotheIndex: 0,
			navList: [{
					id: 1,
					name: '添加图案'
				},
				{
					id: 2,
					name: '添加字体'
				},
				{
					id: 3,
					name: '预览设计'
				}
			],
			navIndex: 0,
			typeList: [],
			typeIndex: 0,
			elementList: [],
			clotheList: [],
			choosedDesign: {
				elements: [],
				font: []
			},
			todoIndex: -1, //选中的元素编辑
			local: { //是否拖动完成
				detail: {}
			},
			sliderValue: 50,
			lastX: 0,
			lastY: 0,
			iconList: [{
					id: 1,
					icon: 'iconfangda_',
					name: '放大',
					imgUrl: TODO_SUOFANG,
					isSelect: false
				},
				{
					id: 2,
					icon: 'iconsuoxiao_',
					name: '缩小',
					isSelect: false
				},
				{
					id: 4,
					icon: 'iconqueding',
					name: '确定',
					imgUrl: TODO_QUEDING,
					isSelect: false
				},
				{
					id: 5,
					icon: 'iconshanchu',
					name: '删除',
					imgUrl: TODO_SHANCHU,
					isSelect: false
				}
			], //图案可操作按钮
			isTouch: false, //能否进行拖动
			fontIconList: [{
					id: 1,
					icon: 'iconziti1',
					name: '字体',
					isSelect: true
				},
				{
					id: 2,
					icon: 'iconzihao',
					name: '字号',
					isSelect: true
				},
				{
					id: 3,
					icon: 'iconyanse',
					name: '颜色',
					isSelect: true
				},
				{
					id: 4,
					icon: 'iconhengshuqiehuanshu',
					name: '横竖',
					isSelect: true
				},
				{
					id: 5,
					icon: 'iconqueding',
					name: '确定',
					isSelect: false
				},
				{
					id: 6,
					icon: 'iconshanchu',
					name: '删除',
					isSelect: false
				},
			], //字体可操作的按钮
			fontIndex: -1,
			isShowText: false, //input和text转换
			showSelectList: -1, //是否显示下放选择列表
			selectList: [], //选择列表内容
			isFontTouch: false,
			moveViewWidth, //画布宽
			moveViewHeight, //画布高
			clotheMariginTop: 0, //背景衣服上移下移
			moveViewTop: 110, //画布下移
			options: {}, //链接携带参数
			inPreviewDesign: false, // 在预览设计事件中
			scalingRatio: 1, //印花进行缩放时印花宽高的比例，确保缩放后不会变形
		}
	},
	onLoad(options) {
		this.options = options;
		const phoneHeight = getStorage('sysInfo').windowHeight - 624
		if (getStorage('sysInfo').windowWidth <= 700) {
			if (phoneHeight < 0) {
				if (getStorage('sysInfo').model == "iPhone 5") {
					this.clotheMariginTop = -26
				} else {
					this.clotheMariginTop = phoneHeight / 2;
				}
			} else {
				this.moveViewTop = 150
			}
		} else if (getStorage('sysInfo').windowWidth > 700 && getStorage('sysInfo').windowWidth <= 800) {
			this.clotheMariginTop = -260
			this.moveViewTop = 100
		} else {
			this.clotheMariginTop = -260
			this.moveViewTop = 90
		}
	},
	async onShow() {
		// if (getApp().globalData.backToDoOption.hasOwnProperty('id') && getApp().globalData.backToDoOption.id) {
		// 	this.options = getApp().globalData.backToDoOption
		// }
		this.judgeLocation(this.options.localIndex);
		this.loadData();
		this.initLoad();
	},
	onHide() {
		// 清除来源类型
		getApp().globalData.choosedProduceId = '';
		// 清除现有图案
		this.choosedDesign = {
			elements: [],
			font: []
		};
		// 清除衣服图案
		this.clotheList = [{
			localtion: 'positive',
			clotheImg: ''
		}, {
			localtion: 'negative',
			clotheImg: ''
		}];
		fontFailmy = []; // 清除字体类型
		fontSize = []; // 清除字体大小
		fontColor = []; // 清楚字体颜色
		this.typeList = []; // 清除系列列表
		this.elementList = []; // 清除图案列表
		this.resultList = resultList; // 清除设计结果
		this.options = {}; // 清除传参
	},
	onUnload() {
		// this.clearData();
		getApp().globalData.backToDoOption = {
			id: '',
			type: ''
		} //清除从预览返回过来的参数
	},
	methods: {
		...mapMutations('order', [types.SET_ORDER_ITEM]),

		/**
		 * 判断要定制的位置
		 */
		judgeLocation(localIndex) {
			if (localIndex == 0) {
				this.pnIndex = 0;
				this.localtionName == '正面';
				this.isShowPnIcon = false;
				this.resultList[this.pnIndex].choosedDesign = {
					elements: [],
					font: []
				};
			} else if (localIndex == 1) {
				this.changePnEvent();
				this.isShowPnIcon = false;
				this.resultList[this.pnIndex].choosedDesign = {
					elements: [],
					font: []
				};
			} else if (localIndex == 2) {
				this.pnIndex = 0;
				this.localtionName == '正面';
			}
		},

		/**
		 * 初始化加载
		 */
		async initLoad() {
			let type = this.options.type;
			if (type == 0 || type == 2) {
				this.resultList = await loadElement({
					id: type == 0 ? getApp().globalData.choosedProduceId : this.options.id,
					type: this.options.type
				}, this.moveViewWidth, this.moveViewHeight);
			}
			this.choosedDesign = this.resultList[this.pnIndex].choosedDesign;
			await this.loadFontType()
		},

		/**
		 * 加载时的数据若有特殊字体则显示特殊字体
		 * */
		async loadFontType() {
			const tempFont = this.choosedDesign.font
			tempFont.length && tempFont.map(item => {
				if (item.familyUrl) {
					uni.showLoading({title: "字体加载中"});
					uni.loadFontFace({
						family: item.family,
						source: `url("${item.familyUrl}")`,
						success: (res) => {
							uni.hideLoading()
						},
						fail: function(res) {
							uni.hideLoading()
							uni.showToast({
								title: '字体加载失败',
								icon: 'none',
								duration: 2000
							})
							console.log(res);
							console.log(`url("${item.familyUrl}")`);
						}
					});
				}
			})
		},

		/**
		 * 加载数据，可作为刷新方法
		 */
		async loadData() {
			this.getProductImgs();
			this.getFont();
			this.typeList = await getSeries();
			this.elementList = await getPattern(this.typeList[this.typeIndex].id);
		},

		/**
		 * 获取商品图片
		 */
		getProductImgs() {
			getProductImgs(this.options).then(async res => {
				// 如果用户中途退出,再次进入没有数据,则返回上一页
				if (!res && this.clotheList.find(item => !item.clotheImg)) {
					await model({
						content: "数据未缓存，请返回上一页重新操作"
					})
					uni.navigateBack({
						delta: 1
					})
				}
				this.clotheList = [{
					localtion: 'positive',
					clotheImg: res.zimg
				}, {
					localtion: 'negative',
					clotheImg: res.fimg
				}];
			})
		},

		/**
		 * 获取字体属性
		 */
		getFont() {
			getFontColor().then(res => {
				fontColor = res.map(item => {
					return {
						id: item.id,
						color: item.value
					}
				});
			});
			getFontFamily().then(res => {
				fontFailmy = res.map(item => {
					return {
						id: item.id,
						name: item.name,
						url: item.fonturl
					}
				});
			});
			getFontSize().then(res => {
				fontSize = res.map(item => {
					return {
						id: item.id,
						name: item.value,
						size: item.value
					}
				});
			})
		},

		/**
		 * 清理数据
		 */
		clearData() {
			// 清除来源类型
			getApp().globalData.choosedProduceId = '';
			// 清除现有图案
			this.choosedDesign = {
				elements: [],
				font: []
			};
			// 清除衣服图案
			this.clotheList = [{
				localtion: 'positive',
				clotheImg: ''
			}, {
				localtion: 'negative',
				clotheImg: ''
			}];
			fontFailmy = []; // 清除字体类型
			fontSize = []; // 清除字体大小
			fontColor = []; // 清楚字体颜色
			this.typeList = []; // 清除系列列表
			this.elementList = []; // 清除图案列表
			this.resultList = resultList; // 清除设计结果
			this.options = {}; // 清除传参
			getApp().globalData.backToDoOption = {
				id: '',
				type: ''
			} //清除从预览返回过来的参数
		},

		/*正反切换*/
		changePnEvent: function() {
			if (!this.isShowPnIcon) return;
			this.resultList[this.pnIndex].choosedDesign = this.choosedDesign
			this.pnIndex = this.pnIndex ? 0 : 1
			this.clotheMariginTop = parseInt(this.clotheMariginTop) + (this.pnIndex ? (-25) : 25)
			this.choosedDesign = this.resultList[this.pnIndex].choosedDesign
			this.localtionName = this.localtionName == '反面' ? '正面' : '反面'
			this.loadFontType()
		},
		changeType: function(e) {
			this.clotheIndex = e.detail.current;
		},
		changeNav: function(e) {
			this.navIndex = e.currentTarget.dataset.index
			if (this.navIndex == 1) {
				this.todoIndex = -1;
			} else if (this.navIndex == 0) {
				this.fontIndex = -1;
			} else if (this.navIndex == 2) {
				this.preview();
			}
		},

		/**
		 * 预览设计
		 */
		async preview() {
			if (this.inPreviewDesign) return;
			this.inPreviewDesign = true;
			this.resultList[this.pnIndex].choosedDesign = this.choosedDesign;
			this.resultList.find(item => item.localtion == 'positive') == this.clotheList.find(item => item.localtion ==
				'positive');
			this.resultList.find(item => item.localtion == 'negative') == this.clotheList.find(item => item.localtion ==
				'negative');
			if (!this.options.id || !this.options.type) {
				await toast({
					title: '该设计没有ID,请返回首页',
					mask: true,
					icon: 'none',
					duration: 1000
				})
				this.inPreviewDesign = false;
				return;
			}
			saveDesign({
				...this.options,
				size: getApp().globalData.clotheInfo.size.sizeId,
				widths: this.moveViewWidth,
				heights: this.moveViewHeight,
				resultList: this.resultList
			}).then(res => {
				res.resultList.find(item => item.localtion == 'positive').url = this.clotheList.find(item => item.localtion ==
					'positive').clotheImg;
				res.resultList.find(item => item.localtion == 'negative').url = this.clotheList.find(item => item.localtion ==
					'negative').clotheImg;
				getApp().globalData.previewInfo = res;
				uni.redirectTo({
					url: PERVIEW_DETAIL,
					success: () => {
						this.inPreviewDesign = false;
						// this.clearData();
					}
				})
			}).catch(res => {
				this.inPreviewDesign = false;
			})
		},

		/**
		 * 切换系列
		 */
		changeNavType: async function(e) {
			this.typeIndex = e.currentTarget.dataset.index;
			this.elementList = await getPattern(this.typeList[this.typeIndex].id, true);
		},

		/**
		 * 添加图案
		 */
		//选择图片
		choosedImg: function(e) {
			const elementDetail = this.elementList[e.currentTarget.dataset.img]
			let eleWidth = parseInt(elementDetail.width)
			let eleHeight = parseInt(elementDetail.height)
			if (eleWidth < this.moveViewWidth && eleHeight > this.moveViewHeight) {
				eleWidth = eleWidth / (eleHeight / this.moveViewHeight)
				eleHeight = this.moveViewHeight
			} else if (eleWidth > this.moveViewWidth && eleHeight < this.moveViewHeight) {
				eleHeight = eleHeight / (eleWidth / this.moveViewWidth)
				eleWidth = this.moveViewWidth
			} else if (eleWidth > this.moveViewWidth && eleHeight > this.moveViewHeight) {
				if (eleHeight > (eleWidth * 8 / 7)) {
					eleWidth = eleWidth / (eleHeight / this.moveViewHeight)
					eleHeight = this.moveViewHeight
				} else {
					eleHeight = eleHeight / (eleWidth / this.moveViewWidth)
					eleWidth = this.moveViewWidth
				}
			}
			let tempElement = Object.assign({}, elementDetail, {
				x: eleWidth < this.moveViewWidth ? (this.moveViewWidth - eleWidth) / 2 : 0,
				y: eleHeight < this.moveViewHeight ? (this.moveViewHeight - eleHeight) / 2 : 0,
				angle: 0,
				zIndex: this.choosedDesign.elements.length,
				width: eleWidth,
				height: eleHeight
			});
			this.choosedDesign.elements.push(tempElement);
			this.todoIndex = this.choosedDesign.elements.length - 1;
			this.isTouch = true;
			this.sliderValue = 50;
		},
		//改变元素选择
		changeElment: function(e) {
			let temp = {}
			this.isTouch = false
			this.todoIndex = this.choosedDesign.elements.length - 1
			if (e.currentTarget.dataset.index != this.choosedDesign.elements.length - 1) {
				temp = this.choosedDesign.elements[e.currentTarget.dataset.index]

				this.choosedDesign.elements[e.currentTarget.dataset.index] = this.choosedDesign.elements[this.choosedDesign.elements
					.length - 1]
				this.choosedDesign.elements[this.choosedDesign.elements.length - 1] = temp
			}
			let angle = this.choosedDesign.elements[this.choosedDesign.elements.length - 1].angle
			let rotate = -360
			this.sliderValue = angle / rotate * 100 + 50
			this.isTouch = true
		},
		ontouchStartEvent: function() {
			this.local = {}
		},
		//拖动过程中触发的事件
		changeLocal: function(e) {
			e.preventDefault();
			if (this.todoIndex == e.currentTarget.dataset.index && this.isTouch) {
				this.local = e
			}
		},
		//拖动结束监听位置
		ontouchend: function(e) {
			e.stopPropagation()
			if (this.todoIndex == e.currentTarget.dataset.index && this.isTouch) {
				try {
					let x = this.local.detail.x
					let y = this.local.detail.y
					this.choosedDesign.elements[e.currentTarget.dataset.index].x = x
					this.choosedDesign.elements[e.currentTarget.dataset.index].y = y
					if (this.sliderValue != 50) {
						this.isOverflow()
					}
				} catch (e) {
					console.log(e)
				}
				this.local = {}
			}
		},
		//监听是否溢出
		isOverflow: function() {
			let x = this.choosedDesign.elements[this.todoIndex].x
			let y = this.choosedDesign.elements[this.todoIndex].y
			let w = this.choosedDesign.elements[this.todoIndex].width
			let h = this.choosedDesign.elements[this.todoIndex].height
			let rotate = -(this.choosedDesign.elements[this.todoIndex].angle / 180) * Math.PI
			let pointArr = []
			pointArr.push(anglePoint({
				ox: x + w / 4,
				oy: -y - h / 4,
				ax: x,
				ay: -y,
				angle: rotate
			}))
			pointArr.push(anglePoint({
				ox: x + w / 4,
				oy: -y - h / 4,
				ax: x + (w / 2),
				ay: -y,
				angle: rotate
			}))
			pointArr.push(anglePoint({
				ox: x + w / 4,
				oy: -y - h / 4,
				ax: x,
				ay: -y - (h / 2),
				angle: rotate
			}))
			pointArr.push(anglePoint({
				ox: x + w / 4,
				oy: -y - h / 4,
				ax: x + (w / 2),
				ay: -y - (h / 2),
				angle: rotate
			}))
			pointArr.forEach(item => {
				if (item.c < 2 || item.c > 197 || item.d > 2 || item.d < -225) {
					wx.showToast({
						title: '您设计的图案超出边界，超出部分将无法打印',
						icon: 'none',
						duration: 1000,
					})
				}
			})
		},

		//用户对图案进行icon操作:放大，缩小，分层，删除
		clickIcon: function(e) {
			this.isTouch = false
			let currentEle = this.choosedDesign.elements[e.currentTarget.dataset.index]
			if (e.currentTarget.dataset.id == 1) {
				//放大
				const scale = 0.1
				currentEle.width = currentEle.width * (1 + scale)
				currentEle.height = currentEle.height * (1 + scale)
			} else if (e.currentTarget.dataset.id == 2) {
				//缩小
				const scale = 0.1
				currentEle.width = currentEle.width * (1 - scale)
				currentEle.height = currentEle.height * (1 - scale)
			} else if (e.currentTarget.dataset.id == 3) {
				//旋转
				// const rotate = 5
				// currentEle.angle += 5 
			} else if (e.currentTarget.dataset.id == 4) {
				//确定
				this.todoIndex = -1
			} else if (e.currentTarget.dataset.id == 5) {
				//删除
				this.choosedDesign.elements.splice(e.currentTarget.dataset.index, 1)
				this.todoIndex = -1
			}
			this.isTouch = true
		},
		//slider滑动旋转角度
		sliderChange: function(e) {
			let currentEle = this.navIndex ? this.choosedDesign.font[this.fontIndex] : this.choosedDesign.elements[this.todoIndex]
			if (!currentEle.content && this.navIndex) {
				uni.showToast({
					title: '请先输入文字！',
					icon: 'none'
				})
				return ""
			}
			this.isShowText = true;
			if (e.detail.value >= 50) {
				currentEle.angle = 360 * ((e.detail.value - 50) / 100)
			} else {
				currentEle.angle = -360 * ((50 - e.detail.value) / 100)
			}
			this.sliderValue = e.detail.value
		},
		//拖动结束
		sliderEnd: function() {
			if (!this.navIndex) {
				this.isOverflow()
			}
			//this.isShowText = false
		},
		//印花缩放
		touchStart: function(e) {
			this.isTouch = false
			this.lastX = e.touches[0].pageX
			this.lastY = e.touches[0].pageY
			//确保被放大后印花不会变形
			this.scalingRatio = this.choosedDesign.elements[this.todoIndex].width / this.choosedDesign.elements[this.todoIndex]
				.height
		},
		touch: function(e) {
			let currentX = e.changedTouches[0].pageX
			let currentY = e.changedTouches[0].pageY
			let tx = currentX - this.lastX
			let ty = currentY - this.lastY
			let currentEle = this.choosedDesign.elements[this.todoIndex]
			let temp = currentEle.height - currentEle.width
			const num = 0.05
			if (e.currentTarget.dataset.localtion == 'bottomRight') {
				if ((Math.abs(tx) >= Math.abs(ty) && tx >= 0) || (Math.abs(ty) >= Math.abs(tx) && ty >= 0)) {
					if (temp > 0 ? (currentEle.height + currentEle.y) < (this.moveViewHeight) : (currentEle.width + currentEle.x) <
						(this.moveViewWidth)) {
						currentEle.height = currentEle.height * (1 + num)
						currentEle.width = currentEle.width * (1 + num)
					} else {
						uni.showToast({
							title: '印花不能超出画布',
							icon: 'none',
							duration: 1000
						})
					}
				} else if ((Math.abs(ty) > Math.abs(tx) && ty < 0) || (Math.abs(tx) > Math.abs(ty) && tx < 0)) {
					if (temp > 0 ? currentEle.width > 30 : currentEle.height > 30) {
						currentEle.height = currentEle.height * (1 - num)
						currentEle.width = currentEle.width * (1 - num)
					} else {
						uni.showToast({
							title: '无法再缩小了',
							icon: 'none',
							duration: 1000
						})
					}
				}
				if (currentEle.angle != 0) {
					this.isOverflow()
				}
			}
			// if (Math.abs(tx) > Math.abs(ty)) {
			// 	//左右方向滑动
			// 	if (tx < 0) {
			// 		//左
			// 		// if(e.currentTarget.dataset.localtion == 'topLeft'){
			// 		// 	currentEle.width += mun
			// 		// 	currentEle.height += mun
			// 		// 	currentEle.x -= mun/2
			// 		// 	currentEle.y -= mun/2
			// 		// } else if(e.currentTarget.dataset.localtion == 'bottomLeft') {
			// 		// 	currentEle.width += mun
			// 		// 	currentEle.height += mun
			// 		// 	currentEle.x -= mun/2
			// 		// } else if(e.currentTarget.dataset.localtion == 'topRight'){
			// 		// 	currentEle.width -= mun
			// 		// 	currentEle.height -= mun
			// 		// 	currentEle.y += mun/2
			// 		// } else if(e.currentTarget.dataset.localtion == 'bottomRight') {
			// 		// 	currentEle.width -= mun
			// 		// 	currentEle.height -= mun
			// 		// }
			// 		if (e.currentTarget.dataset.localtion == 'bottomRight') {
			// 			currentEle.width -= mun
			// 			currentEle.height -= mun
			// 		}
			// 		// if (e.currentTarget.dataset.localtion == 'topLeft' || e.currentTarget.dataset.localtion == 'bottomLeft') {
			// 		// 	currentEle.width += mun
			// 		// 	currentEle.height += mun
			// 		// 	currentEle.x -= mun
			// 		// 	currentEle.y -= mun
			// 		// } else if (e.currentTarget.dataset.localtion == 'topRight' || e.currentTarget.dataset.localtion == 'bottomRight') {
			// 		// 	currentEle.width -= mun
			// 		// 	currentEle.height -= mun
			// 		// }
			// 	} else if (tx > 0) {
			// 		//右
			// 		// if(e.currentTarget.dataset.localtion == 'topLeft'){
			// 		// 	currentEle.width -= mun
			// 		// 	currentEle.height -= mun
			// 		// 	currentEle.x += mun/2
			// 		// 	currentEle.y += mun/2
			// 		// } else if(e.currentTarget.dataset.localtion == 'bottomLeft') {
			// 		// 	currentEle.width -= mun
			// 		// 	currentEle.height -= mun
			// 		// 	currentEle.x += mun/2
			// 		// } else if(e.currentTarget.dataset.localtion == 'topRight'){
			// 		// 	currentEle.width += mun
			// 		// 	currentEle.height += mun
			// 		// 	currentEle.y -= mun/2
			// 		// } else if(e.currentTarget.dataset.localtion == 'bottomRight') {
			// 		// 	currentEle.width += mun
			// 		// 	currentEle.height += mun
			// 		// }
			// 		if (e.currentTarget.dataset.localtion == 'bottomRight') {
			// 			currentEle.width += mun
			// 			currentEle.height += mun
			// 		}
			// 		// if (e.currentTarget.dataset.localtion == 'topLeft' || e.currentTarget.dataset.localtion == 'bottomLeft') {
			// 		// 	currentEle.width -= mun
			// 		// 	currentEle.height -= mun
			// 		// } else if (e.currentTarget.dataset.localtion == 'topRight' || e.currentTarget.dataset.localtion == 'bottomRight') {
			// 		// 	currentEle.width += mun
			// 		// 	currentEle.height += mun
			// 		// }
			// 	}
			// } else {
			// 	//上下方向滑动
			// 	if (ty < 0) {
			// 		//上
			// 		// if(e.currentTarget.dataset.localtion == 'topLeft'){
			// 		// 	currentEle.width += mun
			// 		// 	currentEle.height += mun
			// 		// 	currentEle.x -= mun/2
			// 		// 	currentEle.y -= mun/2
			// 		// } else if(e.currentTarget.dataset.localtion == 'bottomLeft') {
			// 		// 	currentEle.width -= mun
			// 		// 	currentEle.height -= mun
			// 		// 	currentEle.x += mun/2
			// 		// } else if(e.currentTarget.dataset.localtion == 'topRight'){
			// 		// 	currentEle.width += mun
			// 		// 	currentEle.height += mun
			// 		// 	currentEle.y -= mun/2
			// 		// } else if(e.currentTarget.dataset.localtion == 'bottomRight') {
			// 		// 	currentEle.width -= mun
			// 		// 	currentEle.height -= mun
			// 		// }
			// 		if (e.currentTarget.dataset.localtion == 'bottomRight') {
			// 			currentEle.width -= mun
			// 			currentEle.height -= mun
			// 		}
			// 		// if (e.currentTarget.dataset.localtion == 'topLeft' || e.currentTarget.dataset.localtion == 'topRight') {
			// 		// 	currentEle.width += mun
			// 		// 	currentEle.height += mun
			// 		// } else if (e.currentTarget.dataset.localtion == 'bottomLeft' || e.currentTarget.dataset.localtion ==
			// 		// 	'bottomRight') {
			// 		// 	currentEle.width -= mun
			// 		// 	currentEle.height -= mun
			// 		// }
			// 	} else if (ty > 0) {
			// 		//下
			// 		// if(e.currentTarget.dataset.localtion == 'topLeft'){
			// 		// 	currentEle.width -= mun
			// 		// 	currentEle.height -= mun
			// 		// 	currentEle.x += mun/2
			// 		// 	currentEle.y += mun/2
			// 		// } else if(e.currentTarget.dataset.localtion == 'bottomLeft') {
			// 		// 	currentEle.width += mun
			// 		// 	currentEle.height += mun
			// 		// 	currentEle.x -= mun/2
			// 		// } else if(e.currentTarget.dataset.localtion == 'topRight'){
			// 		// 	currentEle.width -= mun
			// 		// 	currentEle.height -= mun
			// 		// 	currentEle.y += mun/2
			// 		// } else if(e.currentTarget.dataset.localtion == 'bottomRight') {
			// 		// 	currentEle.width += mun
			// 		// 	currentEle.height += mun
			// 		// }
			// 		if (e.currentTarget.dataset.localtion == 'bottomRight') {
			// 			currentEle.width += mun
			// 			currentEle.height += mun
			// 		}
			// 		// if (e.currentTarget.dataset.localtion == 'topLeft' || e.currentTarget.dataset.localtion == 'topRight') {
			// 		// 	currentEle.width -= mun
			// 		// 	currentEle.height -= mun
			// 		// } else if (e.currentTarget.dataset.localtion == 'bottomLeft' || e.currentTarget.dataset.localtion ==
			// 		// 	'bottomRight') {
			// 		// 	currentEle.width += mun
			// 		// 	currentEle.height += mun
			// 		// }
			// 	}
			// }
			this.choosedDesign.elements[this.todoIndex] = currentEle
			this.lastX = currentX
			this.lastY = currentY
		},
		touchEnd: function(e) {
			e.stopPropagation()
			this.isTouch = true
			let currentEle = this.choosedDesign.elements[this.todoIndex]
			if (currentEle.height > this.moveViewHeight) {
				currentEle.height = this.moveViewHeight
				currentEle.width = currentEle.height * this.scalingRatio
			}
			if (currentEle.width > this.moveViewWidth) {
				currentEle.width = this.moveViewWidth
				currentEle.height = currentEle.width / this.scalingRatio
			}
			currentEle.width > this.moveViewWidth && (currentEle.width = this.moveViewWidth)
		},

		/**
		 * 添加字体
		 */
		//添加字体编辑器
		addFont: function() {
			this.choosedDesign.font.push({
				id: fontFailmy.length ? fontFailmy[0].id : null,
				content: '',
				familyid: fontFailmy.length ? fontFailmy[0].id : null,
				family: fontFailmy.length ? fontFailmy[0].name : null,
				familyUrl: fontFailmy.length ? fontFailmy[0].url : null,
				size: '30',
				color: '#fff',
				angle: '0',
				isHorizontal: false,
				lineHeight: 100,
				x: 31,
				y: 87,
				width: '133',
				height: '35'
			});
			this.fontIndex = this.choosedDesign.font.length - 1;
			this.isShowText = false;
			this.isFontTouch = true;
			this.sliderValue = 50;
		},
		clickFontIcon: function(e) {
			const selectIndex = e.currentTarget.dataset.index
			const pindex = e.currentTarget.dataset.pindex
			this.showSelectList = selectIndex
			if (selectIndex == 0) {
				this.selectList = fontFailmy
			} else if (selectIndex == 1) {
				this.selectList = fontSize
			} else if (selectIndex == 2) {
				this.selectList = fontColor
			} else if (selectIndex == 3) {
				this.selectList = fontHv
			} else if (selectIndex == 4) {
				this.fontIndex = -1
				this.isShowText = false
				this.isFontTouch = true
				this.sliderValue = 50
			} else if (selectIndex == 5) {
				this.fontIndex -= 1
				this.selectList = []
				this.choosedDesign.font.splice(pindex, 1)
			}
		},
		// 记录移动数据
		changeFontLocal: function(e) {
			if (this.fontIndex === e.currentTarget.dataset.index) {
				this.local = {}
				this.local = e
			}
		},
		//拖动字体
		ontouchfontend: function(e) {
			if (this.fontIndex === e.currentTarget.dataset.index && this.local.detail && this.local.detail.x !== undefined &&
				this.local.detail.y !== undefined) {
				try {
					this.choosedDesign.font[e.currentTarget.dataset.index].x = this.local.detail.x
					this.choosedDesign.font[e.currentTarget.dataset.index].y = this.local.detail.y
				} catch (e) {
					console.log(e);
				}
				this.local = {}
			}
		},
		// //输入聚焦，失焦，清除输入框漂移问题(很奇怪)
		// clearLocal: function(item, index) {
		// 	if (typeof(item.x) == 'undefined' || item.x == 31) {
		// 		this.choosedDesign.font[index].x = 31
		// 		this.choosedDesign.font[index].y = 87
		// 	}
		// },
		//编辑框的宽度随着字体数量而改变
		changeFontWidth: function(e) {
			let font = this.choosedDesign.font[this.fontIndex]
			let w = font.width
			let size = font.size
			let lengths = getBLen(font.content)
			if (lengths) {
				this.choosedDesign.font[this.fontIndex].width = lengths * size * 0.55
			} else {
				w = size * 2
			}
		},
		changeFontEvent: function(e) {
			this.isFontTouch = false
			const selectIndex = e.currentTarget.dataset.iconindex
			const keyIndex = e.currentTarget.dataset.index
			const selectId = e.currentTarget.dataset.id
			const pindex = e.currentTarget.dataset.pindex
			let id = this.choosedDesign.font[pindex].id
			let font = this.choosedDesign.font[pindex]
			let name = this.selectList[keyIndex].name
			let url = this.selectList[keyIndex].url
			let familyid = this.selectList[keyIndex].id
			if (font.content) {
				this.isShowText = true
				if (selectIndex == 0) {
					uni.showLoading({
						title: '加载字体中',
					})
					uni.loadFontFace({
						family: name,
						source: `url("${url}")`,
						success: (res) => {
							this.choosedDesign.font[pindex].familyid = familyid
							this.choosedDesign.font[pindex].family = name
							this.choosedDesign.font[pindex].familyUrl = url
							uni.hideLoading()
						},
						fail: (res) => {
							uni.hideLoading()
							uni.showToast({
								title: '加载失败，请重试',
								icon: 'none',
								duration: 2000
							})
							console.log(res.status)
						}
					});
				} else if (selectIndex == 1) {
					let size = this.selectList[keyIndex].size;
					let multiple = font.size / size;
					font.size = size;
					font.width = font.width / multiple;
					font.height = size;
					this.changeFontWidth()
				} else if (selectIndex == 2) {
					font.color = this.selectList[keyIndex].color
				} else if (selectIndex == 3) {
					wx.showToast({
						title: '若想让文字变为竖版，请只写中文，其他文字很好支持，谢谢合作',
						icon: 'none',
						duration: 2000,
						success: () => {
							const temp = font.width
							font.width = font.height
							font.height = temp
							font.isHorizontal = (selectId == 1) ? false : true
						}
					})
				}
				this.selectList = []
				this.showSelectList = -1
			} else {
				uni.showToast({
					title: '请输入内容',
					icon: 'none',
					duration: 2000
				})
			}
			this.isFontTouch = true
		},
		//点击字体进行编辑
		clickTextEvent: function(e) {
			if (this.navIndex === 1) {
				this.isFontTouch = false
				let angle = this.choosedDesign.font[e.currentTarget.dataset.index].angle
				let rotate = -360
				let fontObj = this.choosedDesign.font[this.choosedDesign.font.length - 1];
				if (fontObj.content) {
					this.fontIndex = e.currentTarget.dataset.index;
					this.isShowText = false;
					this.sliderValue = angle / rotate * 100 + 50;
				} else {
					wx.showToast({
						title: '请先在文字栏输入文字或者删除',
						icon: 'none'
					})
				}
				this.isFontTouch = true
			}
		}
	}
}

export default detail
