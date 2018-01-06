function AddJob(container) {
	this.container = container;
	this.init();
}

AddJob.BtnTemp = `
	<button type="button" class="btn btn-info" data-toggle='modal' data-target='.js-addjob-Modal'>增加</button>
`;

AddJob.ModelTemp = `
<div class="modal fade js-addjob-Modal" tabindex="-1" role="dialog" aria-labelledby="AddJobLabel">
  	<div class="modal-dialog" role="document">
    	<div class="modal-content">
      		<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        		<h4 class="modal-title" id="AddPositionLabel">新增求职</h4>
      		</div>
      		<div class="modal-body">
		  		<div class="form-group">
		    		<label for="addpos-company">姓名</label>
		    		<input type="text" class="form-control js-company" id="addpos-company" placeholder="请输入姓名">
		  		</div>
		  		
		  		<div class="form-group">
		    		<label for="addpos-salary">期望薪资</label>
			    		<select class="form-control js-salary" id="addpos-salary">
						  	<option>10k-15k</option>
						  	<option>15k-20k</option>
						  	<option>20k-25k</option>
						  	<option>25k-30k</option>
						  	<option>35k+</option>
						</select>
		  		</div>
		  		
		  		<div class="form-group">
		    		<label for="addpos-address">求职职位</label>
		    		<input type="text" class="form-control js-address" id="addpos-address" placeholder="请输入求职职位">
		  		</div>
		  		
		  		<div class="form-group">
		    		<label for="addpos-position">所在城市</label>
		    		<input type="text" class="form-control js-position" id="addpos-position" placeholder="请输入所在城市">
		  		</div>
		  		
		  		<div class="form-group">
		    		<label for="addpos-logo">求职人照片</label>
		    		<input type="file" class="form-control js-logo" id="addpos-logo">
		  		</div>
		  		
      		</div>
  			<div class="modal-footer">
    			<button type="button" class="btn btn-primary js-submit">提交</button>
  			</div>
  			<div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px">
      			添加成功
  			</div>
		</div>
  	</div>
</div>`;

$.extend(AddJob.prototype, {
	init: function() {
		this.createDom();
		this.bindEvents();
	},
	createDom: function() {
		this.btn = $(AddJob.BtnTemp);
		this.modal = $(AddJob.ModelTemp);
		this.succNoticeElem = this.modal.find(".js-succ-notice");
		this.container.append(this.btn);
		this.container.append(this.modal);
	},
	bindEvents: function() {
		var submitBtn = this.modal.find(".js-submit");
		submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
	},
	handleSubmitBtnClick: function() {
		var company = this.modal.find(".js-company").val(),
			position = this.modal.find(".js-position").val(),
			salary = this.modal.find(".js-salary").val(),
			address = this.modal.find(".js-address").val(),
			logo = this.modal.find(".js-logo")[0].files[0];
			
		var formData = new FormData();
		formData.append("company", company);
		formData.append("position", position);
		formData.append("salary", salary);
		formData.append("address", address);
		formData.append("logo", logo);
		
		$.ajax({
			type: "POST",
			url: "/api/addJob",
			cache: false,
			processData: false,
			contentType: false,
			data: formData,
			success: $.proxy(this.handleAddJobSucc, this)
		})
	},
	handleAddJobSucc: function(res) {
		if(res && res.data && res.data.inserted){
			this.succNoticeElem.removeClass("hide");
			setTimeout($.proxy(this.handleDelay, this), 2000);
			$(this).trigger("change");
		}
	},
	handleDelay: function() {
		this.succNoticeElem.addClass("hide");
		this.modal.modal("hide");
	}
})
