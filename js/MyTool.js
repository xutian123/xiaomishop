
(function (w) {
    w.myTool = {
        $: function (id) {
            return typeof id === 'string' ? document.getElementById(id) : null;
        },
        scroll: function () {
            if (window.pageYOffset !== null) { // 最新的浏览器
                return {
                    "top": window.pageYOffset,
                    "left": window.pageXOffset
                }
            } else if (document.compatMode === 'CSS1Compat') { // W3C
                return {
                    "top": document.documentElement.scrollTop,
                    "left": document.documentElement.scrollLeft
                }
            }
            return {
                "top": document.body.scrollTop,
                "left": document.body.scrollLeft
            }

        },
        client: function () {
            if (window.innerWidth !== null) { // 最新的浏览器
                return {
                    "width": window.innerWidth,
                    "height": window.innerHeight
                }
            } else if (document.compatMode === 'CSS1Compat') { // W3C
                return {
                    "width": document.documentElement.clientWidth,
                    "height": document.documentElement.clientHeight
                }
            }
            return {
                "width": document.body.clientWidth,
                "height": document.body.clientHeight
            }

        },
        getSty1eAttr: function (obj, attr) {
            if (obj.currentStyle) { // IE和opera 
                return obj.currentStyle[attr];
            } else {
                return window.getComputedStyle(obj, null)[attr];
            }
        },
        /**
         * 改变CSS样式
         * @param {Object} eleObj 
         * @param {string} attr 
         * @param {string} value 
         */
        changeCssStyle: function (eleObj, attr, value) {
            eleObj.style[attr] = value;
        },
        /**
         * 获取标签属性
         * @param {Object} obj 
         * @param {string} attr 
         */
        getStyleAttr: function (obj, attr) {
            if (obj.FurrentStyle) { // IE和opera
                return obj.currentStyle[attr];
            } else {
                return window.getComputedStyle(obj, null)[attr];
            }
        },
        /**
         * 
         * @param {Object} eleObj 
         * @param {Object} json 
         * @param {function} fn 
         */
        buffer: function (eleObj, json, fn) {

            //1.清除定时器
            clearInterval(eleObj.timer);

            var speed = 0, begin = 0, target = 0, flag = false;

            //2。设置定时器    
            eleObj.timer = setInterval(function () {

                flag = true;//节流阀

                for (var key in json) {
                    if (json.hasOwnProperty(key)) {
                        if (key === 'opacity') {
                            begin = parseInt(myTool.getStyleAttr(eleObj, key) * 100) || 100;
                            target = parseInt(json[key] * 100);
                        } else if (key === 'scrollTop') {
                            begin = Math.ceil(Number(eleObj.scrollTop));
                            target = parseInt(json[key]);
                        } else {
                            begin = parseInt(myTool.getStyleAttr(eleObj, key)) || 0;
                            target = parseInt(json[key]);
                        }


                        //3.求出步长
                        speed = (target - begin) * 0.2;
                        speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);


                        //4.动起来
                        if (key === 'opacity') {
                            eleObj.style.opacity = (begin + speed) / 100;
                        } else if (key === 'scrollTop') {
                            eleObj.scrollTop = begin + speed;
                        } else if (key === 'z-index') {
                            eleObj.style[key] = json[key];
                        } else {
                            eleObj.style[key] = begin + speed + 'px';
                        }


                        //5.清除定时器
                        if (begin !== target) {
                            flag = false;
                        }
                    }

                }
                if (flag) {
                    clearInterval(eleObj.timer);

                    //开启另一组动画 如果有fn，则执行函数   
                    if (fn) {
                        fn();
                    }
                }

            }, 30)


        }

    }
})(window)


