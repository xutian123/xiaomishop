window.addEventListener('load', function (ev) {
    //轮播图
    var bg = document.getElementsByClassName('goods')[0];
    var pre_btn = document.getElementsByClassName('pre_btn')[0];
    var next_btn = document.getElementsByClassName('next_btn')[0];
    var ul = document.querySelector('.dro').querySelector('ul');
    // 动态创建原点
    for (var i = 0; i < 4; i++) {
        let li = '<li></li>'
        ul.insertAdjacentHTML('beforeend', li)
        ul.children[i].onclick = function () {
            for (var i = 0; i < ul.children.length; i++) {
                ul.children[i].className = ''
                bg.style.background = 'background: url(../images/bigimage2.jpg) no-repeat center/100%;';
            }
            this.className = 'current'
        }
    }
    console.log(bg);

    ul.children[0].className = 'current'
    // var index = 2, indexMax = 4, indexMin = 1;
    // pre_btn.addEventListener('click', function (ev1) {
    //     if (index === indexMin) {
    //         index = 4;

    //     } else {
    //         index--;
    //     }
    //     // bg.style.background = 'url(../images/bigimage' + index + '.jpg) no-repeat center/100%';
    //     bg.style.background = 'url(../images/bigimage' + index + '.jpg) no-repeat center/100%';
    // })
    // console.log(bg.style.background);
    // next_btn.addEventListener('click', function (ev1) {
    //     if (index === indexMax) {
    //         index = 1;
    //     } else {
    //         index++;
    //     }
    //     bg.style.background = 'url(../images/bigimage' + index + '.jpg) no-repeat center/100%';
    // })


    // 滚动显示顶部按钮
    var scrollTop = 0, timer = null; var begin = 0, end = 0;
    window.addEventListener('scroll', function () {
        var toTop = myTool.$('toTop');
        scrollTop = myTool.scroll().top;
        if (scrollTop > 400) { toTop.style.display = 'block'; } else { toTop.style.display = 'none'; };
        begin = scrollTop;
    })
    // 点击回到顶部
    toTop.onclick = function () {
        clearInterval(timer);
        //开启缓冲动画
        timer = setInterval(function () {
            begin += (end - begin) * 0.2;
            window.scrollTo(0, begin);
            console.log(begin);
            if (Math.round(begin) === end) {
                clearInterval(timer);
            }
        }, 20)
    }

    // 右侧服务选项
    var tool_bar = document.getElementsByClassName('tool_bar')[0];
    var a = tool_bar.getElementsByTagName('a');
    var imgs = tool_bar.getElementsByTagName('img');
    var two = document.getElementsByClassName('two')[0];
    for (var i = 0; i < a.length; i++) {
        var sa = a[i];
        (function (tag) {
            sa.onmouseover = function (ev1) {
                if (tag == 1) {
                    imgs[tag - 1].src = 'images/t' + tag + '.' + tag + '.png';
                    two.style.display = 'block';
                }
                imgs[tag - 1].src = 'images/t' + tag + '.' + tag + '.png';
            }

            sa.onmouseout = function (ev1) {
                if (tag == 1) {
                    imgs[tag - 1].src = 'images/t' + tag + '.png';
                    two.style.display = 'none';
                }
                imgs[tag - 1].src = 'images/t' + tag + '.png';
            }
        })(i + 1)

    }

    // 显示侧边商品菜单
    var ln = document.getElementsByClassName('ln')[0];
    var lis = ln.getElementsByTagName('li');
    var lgs = document.getElementsByClassName('lg');
    for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        (function (index) {
            li.onmouseover = function (ev1) {
                lgs[index].style.display = 'block';
            }

            li.onmouseout = function (ev1) {
                lgs[index].style.display = 'none';
            }
        })(i)
    }

    (function () {
        var timers = null;
        var qb = document.getElementsByClassName('qb')[0];
        var hours = qb.getElementsByTagName('span')[0];
        var minute = qb.getElementsByTagName('span')[1];
        var second = qb.getElementsByTagName('span')[2];
        timers = setInterval(function () {
            second.innerText -= 1;
            if (second.innerText === '0') {
                minute.innerText -= 1;
                second.innerText = 59;
            }
        }, 1000)
    })()
})