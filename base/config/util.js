export default {
	/*分页导出数据获取方法 开始。。。。。。*/
	// 入参 所有页已选中项 当前页的数据 当前页的选中项 当前点击行
	getAllSelectedRows: function (rows, currentPageData, currentSelectedRows, currentSelectedRow) {
		var selectRows = rows;
		//单行选
		if (currentSelectedRow) {
			var delFlag = true;
			for (var a=0; a < currentSelectedRows.length; a++) {
				if (currentSelectedRow.leaveApplicationId == currentSelectedRows[a].leaveApplicationId) {
					selectRows = selectRows.concat(currentSelectedRows);
					delFlag = false;
				}
			}
			if (delFlag) {
				var unselectRow = [];
				unselectRow.push(currentSelectedRow);
				this.deleteUnSelectRow(selectRows, unselectRow);
			}
			//全选
		} else {
			if (currentSelectedRows.length == currentPageData.length) {
	    		selectRows = selectRows.concat(currentSelectedRows);
	    	} else {
	    		this.deleteUnSelectRow(selectRows, currentPageData);
	    	}
		}

		return selectRows;
	},
	deleteUnSelectRow: function (selectRows, delRows) {
    	var self = this;
    	for (var k=0; k < delRows.length; k++) {
    		for (var h=0; h < selectRows.length; h++) {
    			if (delRows[k].leaveApplicationId == selectRows[h].leaveApplicationId) {
    				console.log(delRows[k].leaveApplicationId);
    				console.log(selectRows[h].leaveApplicationId);
    				selectRows.splice(h, 1);
    			}
    		}
    	}
    	console.log('selectRows length:' + selectRows.length);
    },
    getCurrentPageSelect: function (selectRows, currentPageData) {
    	var selection = [];
    	for (var i=0; i < currentPageData.length; i++) {
			for (var j=0; j < selectRows.length; j++) {
				if (currentPageData[i].leaveApplicationId == selectRows[j].leaveApplicationId) {
					selection.push(currentPageData[i]);
				}
			}
		}
		return selection;
    },
    clearSelectRows: function () {
    	return [];
    },
    /*分页导出数据获取方法 结束。。。。。。*/
}