(function () {
  var layer = layui.layer;
  AndName();
  
  $("#logoutBtn").click(function () {
    layer.confirm("确定退出？", { icon: 3, title: "提示" }, function (index) {
      localStorage.removeItem("token");
      location.href = "login.html";

      layer.close(index);
    });
  });
})();

function AndName() {
  $.ajax({
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token"),
    // },
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      let name = res.data.nickname || res.data.username;
      $("#welcome").text("欢迎 " + name);
      // console.log(name[0]);

      // 结果为null为 布尔值为默认为false
      // console.log(res.data.user_pic);
      // 头像

      if (res.data.user_pic) {
        $(".layui-nav-img").show().attr("src", res.data.user_pic);
        $(".text-avatar").hide();
      } else {
        $(".layui-nav-img").hide();
        $(".text-avatar").text(name[0]).show();
      }


    },

    // complete: function (xhr) {
    //   // console.log(xhr);
    //   if (
    //     xhr.responseJSON.status === 1 &&
    //     xhr.responseJSON.message === "身份认证失败！"
    //   ) {
    //     localStorage.removeItem("token");
    //     location.href = "login.html";
    //   }
    // },
  });
}
