(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  let layer = layui.layer;

  var $image = $("#image");

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);
  // 点击上传，模拟点击文件域
  $("#uploadBtn").click(function () {
    $("#file").click();
  });

  // 监听文件域的选择文件的变化
  $("#file").on("change", function () {
    // 当事件的 文件改变了 该 事件就会触发
    //  files属性是文件的DOM对象的属性，记录所有用户选择的文件
    // 以下代码获取到用户选择的文件（头像）
    // 1. 拿到用户选择的文件
    var file = this.files[0];
    // 2. 根据选择的文件，创建一个对应的 URL 地址：
    var newImgURL = URL.createObjectURL(file);
    // 3. 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // 上传头像
  $("#sureBtn").click(function () {
    let dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("更换头像失败！");
        }
        layer.msg("更换头像成功");
        window.parent.AndName();
      },
    });
  });
})();
