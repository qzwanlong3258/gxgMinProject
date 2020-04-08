import {
	request
} from '@/config/http.js';
import {
	GET_THEME,
	GET_CATEGORY,
	GET_STYLE_LIST
} from '@/config/api.js';

export function getList(data) {
	let p_theme = request({
		url: GET_THEME,
		data: {
			showLoading: false,
			size: 999
		},
		
	});
	let p_style = request({
		url: GET_STYLE_LIST,
		data: {
			showLoading: false,
			size: 999
		},
		needToken: false,
	})
	return Promise.all([p_theme, p_style]).then(res => {
		let theme = res[0];
		let style = res[1];

		// 样式列表中的品类ID
		let cids = Array.from(new Set(style.list.map(item => item.cid)));

		return {
			topBoxImg: {
				navImage: theme.backgroundImgUrl,
				privateImg: theme.themeImgUrl
			},
			styleList: cids.map(cid => {
				let item = style.list.find(item => item.cid == cid);
				let clothesList = style.list.filter(item => item.cid == cid);
				return {
					id: cid,
					name: item.cname,
					componentInfo: {
						topImg: item.cshowurl,
						btnImg: theme.finishedImgUrl,
						componentCounts: item.Ccount,
						clothesList: clothesList.map(clothes => {
							return {
								id: clothes.gid,
								clothesImg: clothes.goodsurl,
								name: clothes.gname,
								price: clothes.gmoney
							}
						})
					}
				}
			})
		}
	});
}