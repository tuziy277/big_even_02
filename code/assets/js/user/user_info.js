$(function () {

    let form = layui.form;

    form.verify({
        nickname: function (value) {
            //console.log(value.trim().length);
            if (value.trim().length <= 1 || value.trim().length > 6) {

                //console.log(11);
                return ("昵称长度必须在 2 ~ 6 个字符之间！")


            }
        }


    })




    initUserInfo();

    // 获取用户基本信息
    function initUserInfo() {

        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {

                // console.log(res);

                if (res.status != 0) {
                    return layer.msg("获取用户信息失败！")
                };

                // 表单渲染  layui自带的函数
                form.val('formUserInfo', res.data);
            }
        })

    }



    // 重置按钮
    $('#btnReset').on('click', function (e) {
        // 阻止重置的默认事件
        e.preventDefault();

        initUserInfo();
    })


    // 提交 更新用户的信息
    $('.layui-form').on('submit', function (e) {

        e.preventDefault();


        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);

                if (res.status != 0) {
                    return "修改信息失败"
                }


                // 修改信息成功 调用父页面的 渲染用户信息的资料
                window.parent.getUserInfo();

            }
        })


    })




})
