(function () {
  let layer = layui.layer;

  // 把请求参数单独抽离出来作为query对象
  //  以后发送请求，按照对应的query即可获取到数据
  let query = {
    pagenum: 1,
    pagesize: 2,
    cate_id: "",
    state: "",
  };

  $.ajax({
    url: "/my/article/list",
    data: query,
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg("获取文章列表失败！");
      }
      let htmlStr = template("trTpl", res);
      $("tbody").html(htmlStr);
    },
  });

  const paddZero = (n) => (n < 10 ? "0" + n : n);

  template.defaults.imports.formatTime = function (time) {
    // time ==> 需要处理的数据
    // return 处理好的数据

    let d = new Date(time);
    let y = d.getFullYear();
    let m = paddZero(d.getMonth() + 1);
    let day = paddZero(d.getDate());

    let h = paddZero(d.getHours());
    let mm = paddZero(d.getMinutes());
    let s = paddZero(d.getSeconds());

    return `${y}-${m}-${day} ${h}:${mm}:${s}`;
  };
})();
