function Page() {

}

$.extend(Page.prototype,{
	init: function() {
		this.createHeader();
		this.createAddJob();
		this.createJobList();
		this.createPagination();
	},
	createHeader: function() {
		var headerContainer = $(".js-header");
		this.header = new Header(headerContainer, 2);
	},
	createAddJob: function() {
		var jobContainer = $(".js-container");
		this.addJob = new AddJob(jobContainer);
		$(this.addJob).on("change", $.proxy(this.handleAddJob, this));
	},
	createJobList: function() {
		var jobContainer = $(".js-container");
		this.jobList = new JobList(jobContainer);
		$(this.jobList).on("change", $.proxy(this.handleListChange, this));
		$(this.jobList).on("update", $.proxy(this.handleListUpdate, this));
	},
	createPagination: function() {
		var paginationContainer = $(".js-pagination");
		this.pagination = new Pagination(paginationContainer);
		$(this.pagination).on("change", $.proxy(this.handlePaginationChange, this));
	},
	handleListChange: function(e) {
		this.pagination.setTotal(e.total);
	},
	handlePaginationChange: function(e) {
		this.jobList.changePage(e.page);
	},
	handleAddJob: function() {
		this.jobList.getListInfo();
	}
})
