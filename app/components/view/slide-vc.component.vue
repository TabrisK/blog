<template>
    <div class="slide-vc">
        <transition name="fade">
            <div class="popup" v-show="status.show">
                <transition name="fade">
                    <div v-show="status.move == 1">
                        <div class="cut-block-bg" :style="cutBlockBg"></div>
                        <div class="cut-block" :style="cutBlock"></div>
                        <p class="error" v-if="error.code">{{error.msg}}</p>
                    </div>
                </transition>
                <div class="vc-bg">
                    <div :class="{'light': status.move == -1}"></div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="notice" v-if="status.move == 0">拖动滑块，完成拼图验证:)</div>
            <div class="notice" v-else-if="status.move == -1">通过验证</div>
        </transition>
        <div class="path"><span class="slide-bar"
                                :class="{'ready': status.move == 0, 'move': status.move == 1, 'ok': status.move == -1}"></span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import bus from "../../bus";

    function getPath(el) {
        return el.getElementsByClassName("path")[0];
    }

    function getSlideBar(pathEl) {
        return pathEl.getElementsByClassName("slide-bar")[0];
    }

    function getCutBlock(el) {
        return el.getElementsByClassName("cut-block")[0];
    }

    function registerEvent(vm) {
        let pathEl = getPath(vm.$el),
            slideBar = getSlideBar(pathEl),
            cutBlock = getCutBlock(vm.$el),
            downPoint;
        pathEl.addEventListener("mouseover", e => {//进入验证区域，显示验证块
            vm.status.show = 1;
        });

        pathEl.addEventListener("mouseout", e => {//离开验证区域，隐藏验证块
            let enteredEl = e.relatedTarget;
            if (enteredEl == pathEl || enteredEl.parentElement == pathEl) {
                return;
            }

            if (vm.status.move == 0 || vm.status.move == -1) {//用户没有正在拖动的操作
                vm.status.show = 0;
            }
        });

        slideBar.addEventListener("mousedown", mouseDown);//即将拖动滑条，显示move icon

        window.addEventListener("mouseup", valid);//停止拖动滑条，验证结果。
        function move(e) {//拖动滑条，同步滑块位置
            let offsetX = e.screenX - downPoint.x;
            if (offsetX < 0) {//超出左侧
                setLeft(0);
                return;
            } else if (offsetX > pathEl.offsetWidth - slideBar.offsetWidth) {//超出右侧
                setLeft(pathEl.offsetWidth - slideBar.offsetWidth);
                return;
            }
            setLeft(offsetX);
            return;
        }

        function valid(e) {
            let slideBarResetBeginTime,
                slideBarResetBeginX = Number(slideBar.style["marginLeft"].replace("px", "")),
                slideBarResetDuration = 200;//ms
            window.removeEventListener("mousemove", move);//注销监听鼠标移动事件
            if (Math.abs((slideBarResetBeginX + 10) - vm.vcInfo.x) < 1.5) {//验证通过
                setError(false);
                vm.status.move = -1;
                vm.$emit("vc", vm.vcInfo);//发送验证成功事件
                setTimeout(function () {
                    slideBarResetBeginTime = Date.now();
                    slideBar.removeEventListener("mousedown", mouseDown);
                    window.removeEventListener("mouseup", valid);
                    slideBarReset();
                }, 1000);
            } else {//验证失败
                setError(true);
                setTimeout(function () {
                    slideBarResetBeginTime = Date.now();
                    setError(false);
                    vm.status.move = 0;
                    slideBarReset();
                }, 1000);
            }

            function slideBarReset() {
                let percent = (Date.now() - slideBarResetBeginTime) / slideBarResetDuration;
                let offsetX = slideBarResetBeginX * (1 - percent);
                if (offsetX <= 0) {
                    setLeft(0);
                    return;
                }
                setLeft(offsetX);
                requestAnimationFrame(slideBarReset);
            }
        }

        function mouseDown(e) {
            vm.status.move = 1;
            downPoint = {
                x: e.screenX,
                y: e.screenY
            };
            window.addEventListener("mousemove", move);//注册监听鼠标移动事件
        }

        function setLeft(left) {
            slideBar.style["marginLeft"] = left + "px";
            cutBlock.style["marginLeft"] = (left + 10) + "px";
        }

        function setError(hasError) {
            if (hasError) {
                vm.error = Object.assign(
                    vm.error,
                    {
                        code: 1,
                        msg: "验证失败，请重试！"
                    });
            } else {
                vm.error = Object.assign(
                    vm.error,
                    {
                        code: 0,
                        msg: null
                    });
            }
        }
    }


    /**
     * description  前端解密
     *
     * ---------------------------
     * |   |-------10--------|   |
     * |10 |                 |10 |
     * |   |                 |   | 高150
     * |   |-------10--------|   |
     * ---------------------------
     *            宽220
     *  拼图高宽为44x44
     */
    function randomOffset() {
        let time = Date.now().toString();
        return {
            x: Number(time.slice(-1)) / 10 * (210 - 20 - 44) + 20,//210。。。+20为了防止只+10的话会出现滑块正好在黑影上方的情况
            y: Number(time.slice(-2, -1)) / 10 * (150 - 20 - 44) + 10,
            date: time
        }
    }

    /**
     * description  设置滑块位置信息
     * @param vm    实例化vc对象
     * @param x     图块左上角x坐标
     * @param y     图块左上角y坐标
     */
    function cutImgBlock(vm) {
        let x = vm.vcInfo.x,
            y = vm.vcInfo.y,
            cutBlockStyle = {
                "backgroundImage": "url(../../assets/img/vc/Dock_of_Mitsubishi.jpg)",
                "marginTop": y + "px",
                "backgroundPosition": -x + "px " + -y + "px"
            }, cutBlockBgStyle = {
                "marginLeft": (x + 1) + "px",//偏移量 + 边线1px
                "marginTop": y + "px"
            };
        vm.cutBlock = Object.assign(vm.cutBlock, cutBlockStyle);
        vm.cutBlockBg = Object.assign(vm.cutBlockBg, cutBlockBgStyle);
    }

    function reset(vm){
        vm.vcInfo = Object.assign(vm.vcInfo, randomOffset());
        registerEvent(vm);
        cutImgBlock(vm);
    }

    export default {
        props: {},
        data() {
            return {
                status: {
                    show: 0,
                    move: 0

                },
                cutBlock: {},
                cutBlockBg: {},
                vcInfo: {},
                error: {
                    code: 0,
                    msg: null
                }
            }
        },
        methods: {},
        mounted: function () {
            reset(this);

            bus.$on("comment:reset", () => {
                reset(this);
            });
        }
    }
</script>
<style lang="scss" type="text/scss">
    @import "~scss/variables.scss";

    .slide-vc {
        .popup {
            transition: all .2s;
            padding: 10px;
            position: absolute;
            margin-top: -180px;
            margin-left: -10px;
            background-color: #f2ece1;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            border-radius: 15px;
            .cut-block {
                position: absolute;
                width: 44px;
                height: 44px;
                margin-left: 10px;
                box-shadow: 0px 0px 6px;
                -webkit-background-size: 220px auto;
                background-size: 220px auto;
            }
            .cut-block-bg {
                position: absolute;
                width: 44px;
                height: 44px;
                background-color: rgba(0, 0, 0, .4);
                border: none;
                box-shadow: 0px 0px 3px;
            }
            .vc-bg {
                background-image: url(../../assets/img/vc/Dock_of_Mitsubishi.jpg);
                background-repeat: no-repeat;
                -webkit-background-size: 220px auto;
                background-size: 220px auto;
                width: 220px;
                height: 150px;
                overflow: hidden;
            }
            .error {
                position: absolute;
                width: 215px;
                bottom: 0px;
                margin-bottom: 10px;
                background-color: rgba(0, 0, 0, .5);
                color: orangered;
                padding-left: 5px;
                font-size: 12px;
            }
        }
        .path {
            width: 220px;
            height: 28px;
            background-color: white;
            -webkit-border-radius: 14px;
            -moz-border-radius: 14px;
            border-radius: 14px;
            background-image: url(../../assets/img/sprite2x.3.2.0.png);
            background-position: 0px 0px;
            background-size: 354px auto;
            .slide-bar {
                background-image: url(../../assets/img/sprite2x.3.2.0.png);
                width: 44px;
                height: 44px;
                background-size: 354px auto;
                display: block;
                position: absolute;
                margin-top: -9px;

                &.ready {
                    background-position: 0px -84px;
                }

                &.move {
                    background-position: 0px -216px;
                }

                &.ok {
                    background-position: 0px -260px;
                }
            }
        }
        .notice {
            position: absolute;
            font-size: 12px;
            margin-left: 44px;
            line-height: 28px;
            color: #486c80;
        }
        .light {
            position: relative;
            height: 20px;
            width: 300px;
            background-color: rgba(255, 255, 255, 0.6);
            transform: rotate(-45deg);
            left: -280px;
            top: 90px;
            -webkit-animation: light-move 1s infinite;
            -o-animation: light-move 1s infinite;
            animation: light-move 1s;
        }

        @keyframes light-move {
            from {
                left: -250px;
            }

            to {
                left: 135px;
            }
        }
    }
</style>