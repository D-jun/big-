(function () {
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    newPwd: function (value, item) {
      //   console.log(value);
      let oldPwd = $("[name=oldPwd]").val();
      if (oldPwd === value) {
        return "两次输入的密码相同";
      }
    },
    rePwd: function (value, item) {
      let newPwd = $("[name=newPwd]").val();
      if (newPwd !== value) {
        return "和新密码输入不一致";
      }
    },
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });

  $("#pwdForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("密码修改失败");
        }
        layer.msg("密码修改成功");
        $("#pwdForm")[0].reset();
      },
    });
  });
})();
