/**
 * Created by ypj on 18-4-25.
 */
$(()=>{
    var $login = $('#login');
    var $register = $('#register');

    $login.find('a.colMint').on('click',()=>{
        $register.show();
        $login.hide();
    });

    $register.find('a.colMint').on('click',()=>{
        $login.show();
        $register.hide();
    });

    $register.find('button').on('click',()=>{
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:$register.find('[name="username"]').val(),
                password:$register.find('[name="password"]').val(),
                repassword:$register.find('[name="repassword"]').val()
            },
            dataType: 'json',
            success:(result)=>{
                $register.find('.colWarning').html(result.message);
                if(!result.code){
                    setTimeout(()=>{
                        $login.show();
                        $register.hide();
                    },1000)
                }
            }
        })
    })

    $login.find('button').on('click',()=>{
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:$login.find('[name="username"]').val(),
                password:$login.find('[name="password"]').val()
            },
            dataType:'json',
            success:(result)=>{
                $login.find('.colWarning').html(result.message);
                window.location.reload();
            }
        })
    });

    $('#logout').on('click',()=>{
        $.ajax({
            url:'/api/user/logout',
            success:(result)=>{
                if(!result.code){
                    window.location.reload();

                }
            }
        })
    })
});