<template>
    <div class="tip-div" v-if="xbxx.SFTGXB === '0'">
        <span>很遗憾，您未通过选拔，请按照录取通知书上的院系专业到相关系部报到。</span>
    </div>
    <div v-else>
        <div class="tip-div">
            <span>请在电脑上打印录取专业通知书，并持打印的通知书到相关院系报到。</span>
        </div>
        <div class="content">
            <div>
                <span class="label-text">学号：</span>
                <span class="value-text">{{ xbxx.XH }}</span>
            </div>
            <div class="line"></div>
            <div>
                <span class="label-text">姓名：</span>
                <span class="value-text">{{ xbxx.XM }}</span>
            </div>
            <div class="line"></div>
            <div>
                <span class="label-text">通知书号：</span>
                <span class="value-text">{{ xbxx.TZSH }}</span>
            </div>
            <div class="line"></div>
            <div>
                <span class="label-text">高考生号：</span>
                <span class="value-text">{{ xbxx.GKSH }}</span>
            </div>
            <div class="line"></div>
            <div>
                <span class="label-text">生源学校：</span>
                <span class="value-text">{{ xbxx.SYXX }}</span>
            </div>
            <div class="line"></div>
            <div>
                <span class="label-text">生源省份：</span>
                <span class="value-text">{{ xbxx.SYSF }}</span>
            </div>
            <div class="line"></div>
            <div>
                <span class="label-text">文/理科：</span>
                <span class="value-text">{{ xbxx.KM }}</span>
            </div>
            <div class="line"></div>
            <div>
                <span class="label-text">是否同意转入：</span>
                <span class="value-text" v-if="xbxx.SFTYZR === '0'">否</span>
                <span class="value-text" v-else>是</span>
            </div>
            <div class="line"></div>
            <!--<div>-->
                <!--<span class="label-text">是否可以按期缴费：</span>-->
                <!--<span class="value-text" v-if="xbxx.SFAQJF === '0'">否</span>-->
                <!--<span class="value-text" v-else>是</span>-->
            <!--</div>-->
            <!--<div class="line"></div>-->
            <div>
                <span class="label-text">是否通过选拔：</span>
                <span class="value-text" v-if="xbxx.SFTGXB === '0'">否</span>
                <span class="value-text" v-else>是</span>
            </div>
            <div class="line"></div>
            <div>
                <span class="label-text">原录取学院：</span>
                <span class="value-text">{{ xbxx.YLQXY }}</span>
            </div>
            <div class="line"></div>
            <div>
                <span class="label-text">原录取系部：</span>
                <span class="value-text">{{ xbxx.YLQXB }}</span>
            </div>
            <div class="line"></div>
            <div>
                <span class="label-text">原录取专业：</span>
                <span class="value-text">{{ xbxx.YLQZY }}</span>
            </div>
            <div class="line"></div>
            <div>
                <span class="label-text">现录取学院：</span>
                <span class="value-text">{{ xbxx.XLQXY }}</span>
            </div>
            <div class="line"></div>
            <div>
                <span class="label-text">现录取系部：</span>
                <span class="value-text">{{ xbxx.XLQXB }}</span>
            </div>
            <div class="line"></div>
            <div>
                <span class="label-text">现录取专业：</span>
                <span class="value-text">{{ xbxx.XLQZY }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .tip-div {
        padding: 10PX;
        background-color: #e8e8e8;
    }

    .tip-div span {
        font-size: 14PX;
        color: #464c5b;
    }

    .content {
        padding: 0PX 0PX 0PX 20PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .label-text {
        font-size: 14PX;
        color: #9ea7b4;
        line-height: 40PX;
    }

    .value-text {
        font-size: 16PX;
        color: #464c5b;
    }

    .line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }
</style>

<script type="text/javascript">
    import $ from 'jquery';
    import Api from '../../api';
    import {Indicator} from 'mint-ui';

    export default {
        data() {
            return {
                xbxx: {}
            }
        },
        components: {},
        created() {
            SDK.setTitleText('选拔结果');

            Indicator.open();
            this.$http.get(Api.GET_CUR_USER)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    if (res.status === '200') {
                        this.$http.get(Api.QUERY_XBJG + '?XH=' + res.msg)
                            .then(res => {
                                return res.json();
                            })
                            .then(res => {
                                this.xbxx = res.msg;
                                Indicator.close();
                            });
                    } else {
                        Utils.methods.showTip('获取用户信息失败');
                    }
                    Indicator.close();
                });
        }
    }
</script>