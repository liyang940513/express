function Register(container,modelContainer){
	this.container = container;
	this.modelContainer = modelContainer;
	this.init();
}

Register.btnTemp = `
<li>
	<a href='#' data-toggle='modal' data-target='.js-reg-Modal'>注册</a>
</li>
`;

Register.ModelTemp = `
<div class="modal fade js-reg-Modal" tabindex="-1" role="dialog" aria-labelledby="RegisterLabel">
  	<div class="modal-dialog" role="document">
    	<div class="modal-content">
      		<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        		<h4 class="modal-title" id="RegisterLabel">注册</h4>
      		</div>
      		<div class="modal-body">
		  		<div class="form-group">
		    		<label for="reg-username">用户名</label>
		    		<input type="email" class="form-control js-user" id="reg-username" placeholder="请输入用户名">
		  		</div>
		  		<div class="form-group">
		    		<label for="reg-password">密码</label>
		    			<input type="password" class="form-control js-pass" id="reg-password" placeholder="请输入密码">
		  		</div>
      		</div>
  			<div class="modal-footer">
    			<button type="button" class="btn btn-primary js-submit">提交</button>
  			</div>
  			<div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px">
      			恭喜您,注册成功
  			</div>
  			<div class="alert alert-danger hide js-err-notice" role="alert" style="margin:20px">
  				对不起,您所注册的用户已存在
  			</div>
		</div>
  	</div>
</div>`;

$.extend(Register.prototype, {
	init : function(){
		this.createBtn();
		this.createModel();
		this.bindEvents();
	},
	createBtn : function(){
		this.btn = $(Register.btnTemp);
		this.container.append(this.btn);
	},
	createModel : function(){
		this.model = $(Register.ModelTemp);
		this.succNoticeElem = this.model.find(".js-succ-notice");
		this.errNoticeElem = this.model.find(".js-err-notice");
		this.modelContainer.append(this.model);
	},
	bindEvents : function(){
		var submitBtn = this.model.find(".js-submit");
		submitBtn.on("click",$.proxy(this.handleSubmitBtnClick,this));
	},	
	handleSubmitBtnClick : function(){
		var username = this.model.find(".js-user").val(),
			password = this.model.find(".js-pass").val();
		$.ajax({
			url:"/api/register",
			type:"post",
			data:{
				username : username,
				password : password
			},
			success : $.proxy(this.handleRegisterSucc,this)
		});	
	},
	handleRegisterSucc : function(res){
		if(res.ret && res.data && res.data.register){
			this.succNoticeElem.removeClass("hide");
			setTimeout($.proxy(this.handleModeFade,this),3000);
		}else{
			this.errNoticeElem.removeClass("hide");
			setTimeout($.proxy(this.handleErrorFade,this),3000);
		}
	},
	handleModeFade : function(){
		this.succNoticeElem.addClass("hide");
		this.model.modal("hide");
	},
	handleErrorFade : function(){
		this.errNoticeElem.addClass("hide");
	}
})
