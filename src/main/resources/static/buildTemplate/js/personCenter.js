

    // 在键盘按下并释放及提交后验证提交表单
function validform(){
    /*关键在此增加了一个return，返回的是一个validate对象，这个对象有一个form方法，返回的是是否通过验证*/
        return $(".self-form").validate({
            rules: {
                username: {
                    minlength: 5,
                    maxlength: 13
                },
                newpassword: {
                    minlength: 5,
                    maxlength: 20
                },
                renewpassword: {
                    minlength: 5,
                    maxlength: 20,
                    equalTo: "#settingsUserPassword"
                },
                telephone:{
                    minlength: 11,
                    maxlength: 11
                },
                location:{
                    minlength:2,
                    maxlength:8
                }
            },
            messages: {
                username: {
                    minlength: "用户名至少包含5个字符",
                    maxlength: "用户名长度不能超过13个字符"
                },
                newpassword: {
                    minlength: "密码长度不能少于5个字符",
                    maxlength: "密码长度不能多于20个字符"
                },
                renewpassword: {
                    minlength: "密码长度不能少于5个字符",
                    maxlength: "密码长度不能多于20个字符",
                    equalTo: "两次密码输入不一致"
                },
                telephone: {
                    minlength:"请输入正确的电话号码",
                    maxlength:"请输入正确的电话号码"
                },
                location: {
                    minlength: "居住地名称长度果断",
                    maxlength: "居住地长度过长"
                }
            }
        });
    }
$(validform());
function savaInfo(){
    if(validform().form()) {
        alert("YES!");
    } else {
        alert("NO!");
        //校验不通过，什么都不用做，校验信息已经正常显示在表单上
    }
    alert("xx");
}

// $.validator.setDefaults({
//     debug: true
// })
// $("#signupForm").validate({
//     debug:true
// });
