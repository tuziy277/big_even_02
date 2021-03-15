$(function () {

    let form = layui.form;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        newpwd: function (value) {

            if (value === $('input[name=oldPwd]').val()) {
                return "新密码不能跟原密码一样"
            }

        },
        repwd: function (value) {
            // console.log(value);
            //  console.log($('input[name=newPwd]').val());
            if (value !== $('input[name=newPwd]').val()) {
                return "俩次密码不一致"
            }

        }



    })


    $('.layui-form').on('submit', function (e) {
        e.preventDefault();


        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {

                if (res.status != 1) {
                    return layui.layer.msg("密码修改失败");
                }

                layui.layer.msg("密码修改成功");
                $('form')[0].reset();
            }
        })
    })


















})