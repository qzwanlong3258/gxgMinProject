import {
	request
} from '@/config/http.js';
import {
	GET_RELEASE_DETAIL,
	GET_PRODUCT_SIZE,
	GET_PRODUCT_BY_RELEASEID_COLOR_SIZE_SEX,
	GET_PRODUCT_IMG_BY_RELEASEID_COLOR_SIZE_SEX
} from '@/config/api.js';
import {
	formatGender
} from '@/config/filter';
import {
	mapState,
	mapActions
} from 'vuex';

/**
 * 判断是否为数组是否有empty
 * */
 function isEmpty(obj) {
     for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
        }
     return true;
 }
/**
 * 去重
 */
function removeDuplicates(array, key) {
	if(!array.length){
		return 
	} 
	let keys = Array.from(new Set(array.map(item => {
		  return item[key]
	})));
	return keys.map(i => array.find(j => j && j[key] == i));
}

/*
 *尺码排序
*/
function sortSizeList(arr) {
	let result = []
	arr.length && arr.map(item=>{
		switch(item.size){
			case 'XS': result[0] = item;
			break;
			case 'S': result[1] = item;
			break;
			case 'M': result[2] = item;
			break;
			case 'L': result[3] = item;
			break;
			case 'XL': result[4] = item;
			break;
			case 'XXL': result[5] = item;
			break;
			case 'XXXL': result[6] = item;
			break;
			case '90': result[7] = item;
			break;
			case '100': result[8] = item;
			break;
			case '110': result[9] = item;
			break;
			case '120': result[10] = item;
			break;
			case '130': result[11] = item;
			break;
			case '140': result[12] = item;
			break;
			case '150': result[13] = item;
			break;
			default: break;
		}
	})
	return result
}

/**
 * 去掉数组里面的empty的值
 * */
function clearEmpty(arr) {
	// const resArr = arr.map(item=>{
	// 	 if(!isEmpty(item)){
	// 		 return item
	// 	 }
	//  })
	//  return resArr
	return arr.filter(item => !isEmpty(item))
 }

export function getTypeInfo(data) {
	return request({
		url: GET_RELEASE_DETAIL,
		data
	}).then(res => {
		return {
			vid: res.list[0].vid,
			localtion: [{
					localId: 'qewqe',
					name: '前胸',
				},
				{
					localId: 'ihqewqe',
					name: '后背',
				},
				{
					localId: 'ihqewqe',
					name: '前后双面',
				},
			],
			sex: removeDuplicates(res.list, 'sex')
				.map((sexItem, sexIndex) => {
					return {
						sexId: sexIndex,
						name: formatGender(sexItem.sex),
						value: sexItem.sex,
						color: removeDuplicates(res.list.filter(colorItem => colorItem.sex == sexItem.sex), 'color')
							.map((colorItem, colorIndex) => {
								return {
									colorId: colorIndex,
									name: colorItem.color,
									value: colorItem.color
								}
							})
					}
				})
		}
	});
}

export function getSizeInfo(data) {
	return request({
		url: GET_PRODUCT_SIZE,
		data
	}).then(res => {
		let changeArr = clearEmpty(sortSizeList(removeDuplicates(res.list,'size')))
		return {
			list: changeArr.map(item => {
				return {
					sizeId: item.id,
					name: item.size,
					value: item.size
				}
			}),
			productId: res.list[0].modelid
		}
	})
}

export function getClotheInfo(data) {
	let p_info = request({
		url: GET_PRODUCT_BY_RELEASEID_COLOR_SIZE_SEX,
		data
	});
	let p_img = request({
		url: GET_PRODUCT_IMG_BY_RELEASEID_COLOR_SIZE_SEX,
		data
	});
	return Promise.all([p_info, p_img]).then(res => {
		let info = res[0].list[0];
		let imgs = res[1].list;
		getApp().globalData.productImgList = imgs;
		return {
			clotheId: info.id,
			type: '',
			name: info.name,
			price: info.money,
			material: info.material,
			sizeImg: info.sizeImg,
			imgList: [
				...imgs.filter(item => item.type == 'zimg'),
				...imgs.filter(item => item.type == 'fimg'),
				...imgs.filter(item => item.type == 'qimg')
			]
		}
	});
}
