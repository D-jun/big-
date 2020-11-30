(function () {
  let form = layui.form;
  let layer = layui.layer;
  let state = "";
  let id = location.search.split("?id=")[1]; // 文章id
  //   console.log(id);
  // 获取类别
  $.ajax({
    url: "/my/article/cates",
    success: function (res) {
      console.log(res);
      let htmlStr = "";
      res.data.forEach((item) => {
        htmlStr += `
          <option value="${item.Id}">${item.name}</option>
          `;
      });
      //   把option添加到下拉框中
      $("[name=cate_id]").append(htmlStr);
      //坑
      form.render();

      //发送ajax获取到对应文章的信息
      getArtInfo();
    },
  });
  function getArtInfo() {
    $.ajax({
      url: "/my/article/" + id,
      success: function (res) {
        console.log(res);

        // 初始化富文本编辑器（注意，这个位置放到success里面来，否则可能会有出现内容没有的bug）
        initEditor();

        state = res.data.state;

        form.val("form", res.data);

        $image
          .attr("src", "http://ajax.frontend.itheima.net" + res.data.cover_img)
          .cropper(options);
      },
    });
  }

  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  // 选择封面功能
  $("#chooseBtn").click(function () {
    // 模拟点击了文件域
    $("#file").click();
  });

  // 选择好之后替换封面
  $("#file").on("change", function () {
    // 获取用户选择的图片
    let file = this.files[0];
    let newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // 点击发布和存为草稿 修改文章的状态
  $("#pubBtn").click(function () {
    state = "已发布";
  });
  $("#pubBtn2").click(function () {
    state = "草稿";
  });

  // // 提交form表单数据
  $("#form").on("submit", function (e) {
    e.preventDefault();

    // 把裁切的图片转成对应的文件
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob((blob) => {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 收集表单数据
        // let data = $(this).serialize(); // 不行
        // 因为由于此接口涉及到文件上传的功能，因此提交的请求体，必须是 FormData 格式！

        let fd = new FormData(this);
        fd.append("cover_img", blob);
        // append 可以追加追加数据
        fd.append("state", state);
        fd.append("Id", id);
        fd.forEach((item) => console.log(item));

        //发ajax
        pubArt(fd);
      });
  });
  function pubArt(fd) {
    $.ajax({
      url: "/my/article/edit",
      type: "POST",
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        console.log(res);

        if (res.status !== 0) {
          return layer.msg("发布文章失败！");
        }

        layer.msg("发布文章成功！");
        // 跳转页面到文章列表页面
        location.href = "/aritcle/aritcle.list.html";
      },
    });
  }
})();
