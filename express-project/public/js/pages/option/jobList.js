function JobList(container) {
	this.container = container;
	this.page = 1;
	this.size = 10;
	this.init();
}

JobList.Temp = `
	<table class="table" style="margin-top:20px;">
		<thead>
			<tr>
				<th>序号</th>
				<th>照片</th>
				<th>姓名</th>
				<th>薪资</th>
				<th>职位</th>
				<th>城市</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody class="js-tbody"></tbody>
	</table>
`;

$.extend(JobList.prototype,{
	init: function(){
		this.createDom();
		this.createUpdateJob();
		this.bindEvents();
		this.getListInfo();
	},
	createDom: function() {
		this.element = $(JobList.Temp);
		this.container.append(this.element);
	},
	createUpdateJob: function() {
		this.updateJob = new UpdateJob(this.container);
		$(this.updateJob).on("change", $.proxy(this.getListInfo, this));
	},
	bindEvents: function() {
		this.container.on("click", $.proxy(this.handleTableClick, this));
	},
	handleTableClick: function(e) {
		var target = $(e.target),
			isDeleteClick = target.hasClass("js-delete"),
			isUpdateClick = target.hasClass("js-update");
		if(isDeleteClick) {
			this.deleteItem(target.attr("data-id"));
		}
		if(isUpdateClick) {
			this.updateJob.showItem(target.attr("data-id"));
		}
	},
	deleteItem: function(id) {
		$.ajax({
			url: "/api/removeJob",
			data: {
				id: id
			},
			success: $.proxy(this.handleItemDeleteSucc, this)
		})
	},
	handleItemDeleteSucc: function(res) {
		if(res && res.data && res.data.delete) {
			this.getListInfo();
		}
	},
	getListInfo: function(){
		$.ajax({
			url: "/api/getJobList",
			data: {
				page: this.page,
				size: this.size
			},
			success: $.proxy(this.handleGetListInfoSucc,this)
		})
	},
	handleGetListInfoSucc: function(res) {
		if(res && res.data && res.data.list){
			this.createItems(res.data.list);
			if (this.page > res.data.totalPage) {
				this.page = res.data.totalPage;
				this.getListInfo();
			} else{
				$(this).trigger(new $.Event("change", {
					total: res.data.totalPage
				}))
			}
		}
	},
	createItems: function(list){
		var itemContainer = this.element.find(".js-tbody"),
			str = "";
		for (var i = 0;i < list.length;i ++) {
			var item = list[i],
				file = item.filename ? item.filename : "1515133633416IMG_2061[1].JPG";
			str += `
				<tr>
					<th>${i + 1}</th>
					<th><img src="/uploads/${file}" style="width:30px;height:30px;"/></th>
					<th>${item.company}</th>
					<th>${item.salary}</th>
					<th>${item.address}</th>
					<th>${item.position}</th>
					<th>
						<span class="js-update" data-id="${item._id}">修改</span>
						<span class="js-delete" data-id="${item._id}">删除</span>
					</th>
				</tr>
			`;
		}
		itemContainer.html(str);
	},
	changePage: function(page) {
		this.page = page;
		this.getListInfo();
	}
})
