function UpdateJob(container) {
	this.container = container;
	this.id = "";
	this.init();
}

UpdateJob.ModelTemp = `
<div class="modal fade js-updatejob-modal" tabindex="-1" role="dialog" aria-labelledby="UpdateJobLabel">
  	<div class="modal-dialog" role="document">
    	<div class="modal-content">
      		<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        		<h4 class="modal-title" id="UpdateJobLabel">新增求职</h4>
      		</div>
      		<div class="modal-body">
		  		<div class="form-group">
		    		<label for="updatejob-company">姓名</label>
		    		<input type="text" class="form-control js-company" id="updatejob-company" placeholder="请输入姓名">
		  		</div>
		  		
		  		<div class="form-group">
		    		<label for="updatejob-salary">期望薪资</label>
			    		<select class="form-control js-salary" id="updatejob-salary">
						  	<option>10k-15k</option>
						  	<option>15k-20k</option>
						  	<option>20k-25k</option>
						  	<option>25k-30k</option>
						  	<option>35k+</option>
						</select>
		  		</div>
		  		
		  		<div class="form-group">
		    		<label for="updatejob-address">求职职位</label>
		    		<input type="text" class="form-control js-address" id="updatejob-address" placeholder="请输入求职职位">
		  		</div>
		  		
		  		<div class="form-group">
		    		<label for="updatejob-position">所在城市</label>
		    		<input type="text" class="form-control js-position" id="updatejob-position" placeholder="请输入所在城市">
		  		</div>
		  		
		  		<div class="form-group">
		    		<label for="updatejob-logo">求职人照片</label>
		    		<input type="file" class="form-control js-logo" id="updatejob-logo">
		  		</div>
		  		
      		</div>
  			<div class="modal-footer">
    			<button type="button" class="btn btn-primary js-submit">提交</button>
  			</div>
  			<div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px">
      			修改成功
  			</div>
		</div>
  	</div>
</div>`;

$.extend(UpdateJob.prototype, {
	init: function() {
		this.createDom();
		this.bindEvents();
	},
	createDom: function() {
		this.element = $(UpdateJob.ModelTemp);
		this.companyElem = this.element.find(".js-company");
		this.positionElem = this.element.find(".js-position");
		this.salaryElem = this.element.find(".js-salary");
		this.addressElem = this.element.find(".js-address");
		this.logoElem = this.element.find(".js-logo");
		this.succNoticeElem = this.element.find(".js-succ-notice");
		this.container.append(this.element);
	},
	showItem: function(id) {
		this.element.modal("show");
		this.getJobInfo(id);
	},
	getJobInfo: function(id) {
		$.ajax({
			url: "/api/getJob",
			data: {
				id: id
			},
			success: $.proxy(this.handleGetJobInfoSucc, this)
		})
	},
	handleGetJobInfoSucc: function(res) {
		if(res && res.data && res.data.info){
			var info = res.data.info;
			this.companyElem.val(info.company);
			this.positionElem.val(info.position);
			this.salaryElem.val(info.salary);
			this.addressElem.val(info.address);
			this.id = info._id;
		}
	},
	bindEvents: function() {
		var submitBtn = this.element.find(".js-submit");
		submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
	},
	handleSubmitBtnClick: function() {
		var company = this.companyElem.val(),
			position = this.positionElem.val(),
			salary = this.salaryElem.val(),
			address = this.addressElem.val(),
			logo = this.logoElem[0].files[0];
			
			var formData = new FormData();
		formData.append("company", company);
		formData.append("position", position);
		formData.append("salary", salary);
		formData.append("address", address);
		formData.append("id", this.id);
		formData.append("logo", logo);
		
		$.ajax({
			type: "POST",
			url: "/api/updateJob",
			cache: false,
			processData: false,
			contentType: false,
			data: formData,
			success: $.proxy(this.handleUpdateJobSucc, this)
		})
	},
	handleUpdateJobSucc: function(res) {
		if(res && res.data && res.data.update){
			this.succNoticeElem.removeClass("hide");
			setTimeout($.proxy(this.handleDelay,this),2000);
			$(this).trigger("change");
		}
	},
	handleDelay: function() {
		this.succNoticeElem.addClass("hide");
		this.element.modal("hide");
	}
})
