$(function () {

    // 点击显示隐藏 登录和注册框
    $('#go-reg').on('click', function () {
        $('.regBox').show();
        $('.loginBox').hide();
    })
    $('#go-login').on('click', function () {
        $('.regBox').hide();
        $('.loginBox').show();
    })



    // 登录 注册框逻辑验证
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // value为 设置repwd属性的值
        repwd: function (value) {
            let pwd = $('.regBox [name=possword]').val();
            //console.log(pwd);

            if (pwd !== value) {
                return "俩次密码不一样"
            }
            // console.log(value);
        }
    })


    // 注册请求
    $('#formReg').on('submit', function (e) {
        // 阻止默认触发提交事件
        e.preventDefault();


        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.regBox [name = username]').val(),
                password: $('.regBox [name = possword]').val()

            },
            success: function (res) {
                console.log(res);

                if (res.status == 0) {
                    layer.msg('注册成功', { icon: 6 });

                    $('#go-login').click();

                    // reset() 只能给dom元素的表单 使用
                    $('#formReg')[0].reset();
                } else {


                    layer.msg(res.message, { icon: 5 });
                }
            }
        })
    })


    // 登录 请求

    $('#formLogin').on('submit', function (e) {
        // 阻止默认触发提交事件
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: {
                username: $('.loginBox [name = username]').val(),
                password: $('.loginBox [name = possword]').val()

            },
            success: function (res) {
                console.log(res);
                if (res.status == 0) {

                    // 提示成功
                    layer.msg('登录成功', { icon: 6 });

                    // 保存token
                    localStorage.setItem('token', res.token)

                    // 跳转页面
                    location.href = '/index.html';
                } else {


                    layer.msg(res.message, { icon: 5 });
                }
            }
        })
    })

















})