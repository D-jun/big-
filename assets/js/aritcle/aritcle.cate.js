(function () {
  let layer = layui.layer;
  let form = layui.form;

  getCate();
  function getCate() {
    $.ajax({
      url: "/my/article/cates",
      success: function (res) {
        //   console.log(res);
        let htmlStr = template("trTpl", res);
        //   console.log(htmlStr);
        $("tbody").html(htmlStr);
      },
    });
  }

  let index;
  //   添加功能
  $("#btnAdd").click(function () {
    index = layer.open({
      type: 1,
      title: "添加文章分类",
      area: "500px",
      content: $("#addForm").html(),
    });
  });
  $("body").on("submit", "#form", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      url: "/my/article/addcates",
      type: "POST",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取用户基本信息失败！");
        }
        layer.msg("获取用户基本信息成功！");
        layer.close(index);
        getCate();
      },
    });
  });

  //  弹出修改框  发出请求  获取数值
  $("tbody").on("click", ".editBtn", function () {
    let id = $(this).attr("data-id");
    // console.log(id);
    index = layer.open({
      type: 1,
      title: "添加文章分类",
      area: "500px",
      content: $("#editFormTpl").html(),
    });
    $.ajax({
      url: "/my/article/cates/" + id,
      success: function (res) {
        console.log(res);
        form.val("editForm", res.data);
      },
    });
  });
  //  修改
  $("body").on("submit", "#editForm", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      url: "/my/article/updatecate",
      type: "POST",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("更新分类信息失败！");
        }
        layer.msg("更新分类信息成功！");
        layer.close(index);
        getCate();
      },
    });
  });

  // 删除
  $("body").on("click", ".btnDelete", function () {
    let id = $(this).attr("data-id");
    layer.confirm("是否确定删除？", { icon: 3, title: "提示" }, function (index) {
       $.ajax({
         url: "/my/article/deletecate/" + id,
         success: function (res) {
           console.log(res);
           if (res.status !== 0) {
             return layer.msg("删除文章分类失败！");
           }
           layer.msg("删除文章分类成功！");
           getCate();
         },
       });

      layer.close(index);
    });
   
  });
})();
