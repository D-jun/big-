(function () {
  getInfo();
  function getInfo() {
    var layer = layui.layer;
    var form = layui.form;
    $.ajax({
      url: "/my/userinfo",
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        form.val("userForm", res.data);
      },
    });
  }
  $("#resetBtn").click(function (e) {
    e.preventDefault();
    getInfo();
  });
  //提交表单注释

  $("#userForm").submit(function (e) {
    e.preventDefault();
    let data = $("#userForm").serialize();

    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("提交失败");
        }
        layer.msg("提交成功");
        console.log(res);
        window.parent.AndName();
      },
    });
  });

  //需要写在ajax的外面 要是写在里面 第一次提交的时候不执行
  // 猜测时layui 自身的问题
  // 用户名 1 ~ 6 还没有写
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    nickname: function (value, item) {
      console.log(value);
      if (value.length > 6) {
        return "请输入1~6位";
      }
    },
  });
})();
