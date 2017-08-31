<template>
    <div class="content">
        <div class="mt-10"></div>
        <div class="result-div" @click="toResult" v-if="openPublicity && openResult">
            <span>选拔结果</span>
            <i class="iconfont">&#xe79e;</i>
        </div>
        <div class="select-instr-div">
            <span class="select-instr-label">选拔说明</span>
            <div class="line"></div>
            <span id="xbsm" class="select-instr-text"></span>
        </div>
        <div class="line"></div>
        <div class="select-intention-div">
            <span class="select-instr-label">符合专业<br>（请必须点击下方专业，查看相关通知）</span>
            <div class="line"></div>
            <div class="fhzy-div" v-if="xbzys1.length > 0">
                <span class="fhzy-text" v-for="fhzy in xbzys1" v-if="fhzy.ZYDM != '99'" @click="showZYJS(fhzy)">{{ fhzy.ZYMC }}</span>
            </div>
            <span class="select-instr-text" v-else>暂时没有符合专业</span>
        </div>
        <div class="line"></div>
        <div class="select-intention-div">
            <span class="select-intention-label">意向选择</span>
            <div class="line"></div>
            <mu-radio label="已阅读各专业选拔说明，同意转入，并已承诺按期缴费" name="intention" nativeValue="1" v-model="intention"
                      class="intention-radio" :disabled="intention_disabled"/>
            <!--<mu-select-field v-model="canTimelyPay" label="是否可以按期缴费" class="select-timely-pay"-->
            <!--:disabled="canTimelyPay_disabled">-->
            <!--<mu-menu-item value="1" title="是"/>-->
            <!--<mu-menu-item value="0" title="否"/>-->
            <!--</mu-select-field>-->
            <mu-radio label="自愿放弃以下所有项目进入资格" name="intention" nativeValue="0" v-model="intention"
                      class="intention-radio" :disabled="intention_disabled"/>
        </div>
        <div class="line"></div>
        <div id="selected-enabled" class="select-volunteer-div">
            <span class="select-volunteer-label">志愿选择</span>
            <div class="line"></div>
            <mu-select-field v-model="volunteer1" label="第一志愿">
                <mu-menu-item v-for="xbzy in xbzys1" :value="xbzy.ZYDM" :title="xbzy.ZYMC" :disabled="disabled1"/>
            </mu-select-field>

            <mu-select-field v-model="volunteer2" label="第二志愿">
                <mu-menu-item v-for="xbzy in xbzys2" :value="xbzy.ZYDM" :title="xbzy.ZYMC" :disabled="disabled2"/>
            </mu-select-field>

            <mu-select-field v-model="volunteer3" label="第三志愿">
                <mu-menu-item v-for="xbzy in xbzys3" :value="xbzy.ZYDM" :title="xbzy.ZYMC" :disabled="disabled3"/>
            </mu-select-field>

            <mu-select-field v-model="volunteer4" label="第四志愿">
                <mu-menu-item v-for="xbzy in xbzys4" :value="xbzy.ZYDM" :title="xbzy.ZYMC" :disabled="disabled4"/>
            </mu-select-field>

            <mu-select-field v-model="volunteer5" label="第五志愿">
                <mu-menu-item v-for="xbzy in xbzys5" :value="xbzy.ZYDM" :title="xbzy.ZYMC" :disabled="disabled5"/>
            </mu-select-field>

            <mu-select-field v-model="volunteer6" label="第六志愿">
                <mu-menu-item v-for="xbzy in xbzys6" :value="xbzy.ZYDM" :title="xbzy.ZYMC" :disabled="disabled6"/>
            </mu-select-field>

            <mu-select-field v-model="volunteer7" label="第七志愿">
                <mu-menu-item v-for="xbzy in xbzys7" :value="xbzy.ZYDM" :title="xbzy.ZYMC" :disabled="disabled7"/>
            </mu-select-field>
        </div>
        <div id="selected-disabled" class="select-volunteer-div display-none">
            <span class="select-volunteer-label">志愿选择</span>
            <div class="line"></div>
            <mu-select-field label="第一志愿" disabled>
            </mu-select-field>

            <mu-select-field label="第二志愿" disabled>
            </mu-select-field>

            <mu-select-field label="第三志愿" disabled>
            </mu-select-field>

            <mu-select-field label="第四志愿" disabled>
            </mu-select-field>

            <mu-select-field label="第五志愿" disabled>
            </mu-select-field>

            <mu-select-field label="第六志愿" disabled>
            </mu-select-field>

            <mu-select-field label="第七志愿" disabled>
            </mu-select-field>
        </div>
        <mu-raised-button v-if="openSelect && tempApplyed && openResult" label="您已申请过，不可重复申请" disabled fullWidth primary
                          class="submit-btn"/>
        <mu-raised-button v-else-if="openSelect && tempApplyed && !openResult" label="修改" fullWidth secondary
                          class="submit-btn" @click="doEdit"/>
        <div v-else-if="openSelect && !tempApplyed && !openResult">
            <mu-raised-button label="保存" fullWidth primary class="submit-btn" @click="checkDataAndSubmit"/>
            <mu-raised-button label="取消" v-show="applyed" class="submit-btn" @click="doCancel"/>
        </div>
        <mu-raised-button v-else label="专业选拔当前未开放" disabled fullWidth primary class="submit-btn"/>

        <mt-popup class="popup-div" v-model="popupVisible" position="right">
            <div class="zyjs-div">
                <span class="zyjs-title"></span>
                <div class="zyjs-js"></div>
            </div>
            <div class="close-btn-div">
                <mu-raised-button label="确定" fullWidth primary class="closeZYJS-btn" @click="closeZYJS"/>
            </div>
        </mt-popup>
    </div>
</template>

<style scoped>
    .mt-10 {
        margin-top: 10PX;
    }

    .result-div {
        position: relative;
        margin-bottom: 10PX;
        padding: 10PX 0PX 10PX 20PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .result-div i {
        font-size: 20PX;
        position: absolute;
        right: 20PX;
        top: 7PX;
    }

    .select-instr-div {
        padding: 20PX 0PX 20PX 20PX;
        border-top: solid 1PX #e8e8e8;
    }

    .select-instr-label {
        display: block;
        font-size: 16PX;
        color: #464c5b;
        margin: 0PX 0PX 10PX 0PX;
    }

    .select-instr-text {
        display: block;
        font-size: 14PX;
        color: #464c5b;
        margin: 10PX;
    }

    .fhzy-div {
        margin-top: 10PX;
    }

    .fhzy-text {
        display: inline-block;
        line-height: 24PX;
        font-size: 14PX;
        padding: 4PX;
        color: white;
        background-color: #06c1ae;
        margin: 4PX;
    }

    .line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }

    .select-intention-div {
        padding: 20PX 0PX 20PX 20PX;
    }

    .select-intention-label {
        display: block;
        font-size: 16PX;
        color: #464c5b;
        margin: 0PX 0PX 10PX 0PX;
    }

    .intention-radio {
        display: block;
        margin: 20PX 0PX 0PX 0PX;
        font-size: 14PX;
    }

    .select-timely-pay {
        display: block;
    }

    .select-volunteer-div {
        padding: 20PX 0PX 20PX 20PX;
    }

    .select-volunteer-label {
        display: block;
        font-size: 16PX;
        color: #464c5b;
        margin: 0PX 0PX 10PX 0PX;
    }

    .submit-btn {
        width: calc(100% - 20PX);
        margin: 0PX 10PX 10PX 10PX;
    }

    .display-none {
        display: none;
    }

    .popup-div {
        width: 100vw;
        height: 100vh;
    }

    .zyjs-title {
        font-size: 16PX;
        font-weight: bold;
    }

    .zyjs-div {
        width: 100vw;
        height: calc(100% - 50PX);
        overflow: scroll;
    }

    .close-btn-div {
        padding: 10PX;
        background-color: white;
    }

    .closeZYJS-btn {

    }
</style>

<script type="text/javascript">
    import $ from 'jquery';
    import Api from '../../api';
    import Utils from '../../utils';
    import {Indicator, MessageBox, Popup} from 'mint-ui';

    export default {
        data() {
            return {
                xsbh: '',
                openSelect: false,
                tempApplyed: false,
                applyed: false,
                instr: '',
                tssm: '',
                xbxx: {},
                openResult: false,
                xbzys1: [],
                xbzys2: [],
                xbzys3: [],
                xbzys4: [],
                xbzys5: [],
                xbzys6: [],
                xbzys7: [],
                intention: '',
                canTimelyPay: '',
                volunteer1: '',
                volunteer2: '',
                volunteer3: '',
                volunteer4: '',
                volunteer5: '',
                volunteer6: '',
                volunteer7: '',
                intention_disabled: false,
                canTimelyPay_disabled: false,
                disabled1: false,
                disabled2: true,
                disabled3: true,
                disabled4: true,
                disabled5: true,
                disabled6: true,
                disabled7: true,
                fhzy: '',
                xssq: '',
                popupVisible: false,
                openPublicity: false
            }
        },
        components: {
            [Popup.name]: Popup
        },
        created() {
            SDK.setTitleText('专业选拔');

            Indicator.open();
            this.$http.get(Api.QUERY_XBSZ)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.instr = res.msg.xbsm;
                    $('#xbsm').html(this.instr);
                    this.tssm = res.msg.tssm;
                    this.setSelect(res.msg.xbkssj, res.msg.xbjssj);
                    this.setPublicityPage(res.msg.gskssj, res.msg.gsjssj);
                    Indicator.close();
                });

            Indicator.open();
            this.$http.get(Api.GET_CUR_USER)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    if (res.status === '200') {
                        this.xsbh = res.msg;
                        this.$http.get(Api.QUERY_SFSQ + '?XH=' + this.xsbh)
                            .then(res => {
                                return res.json();
                            })
                            .then(res => {
                                if (res.msg.SFYY === '1') {
                                    this.applyed = true;
                                    this.tempApplyed = true;
                                } else {
                                    this.applyed = false;
                                    this.tempApplyed = false;
                                }
                                Indicator.close();

                                Indicator.open();
                                this.$http.get(Api.QUERY_XBJG + '?XH=' + this.xsbh)
                                    .then(res => {
                                        return res.json();
                                    })
                                    .then(res => {
                                        this.xbxx = res.msg;
                                        if (this.xbxx.TZSH) {
                                            this.openResult = true;
                                        } else {
                                            this.openResult = false;
                                        }
                                        Indicator.close();

                                        Indicator.open();
                                        this.$http.get(Api.QUERY_XBZY + '?XH=' + this.xsbh)
                                            .then(res => {
                                                return res.json();
                                            })
                                            .then(res => {
                                                this.xbzys1 = res.msg;
                                                this.xbzys2 = res.msg;
                                                this.xbzys3 = res.msg;
                                                this.xbzys4 = res.msg;
                                                this.xbzys5 = res.msg;
                                                this.xbzys6 = res.msg;

                                                for (let i = 0; i < this.xbzys1.length; i++) {
                                                    if (this.xbzys1[i].ZYDM !== '99') {
                                                        this.fhzy = this.fhzy + '，' + this.xbzys1[i].ZYMC;
                                                    }
                                                }
                                                this.fhzy = this.fhzy.substr(1);
                                                Indicator.close();

                                                Indicator.open();
                                                this.$http.get(Api.QUERY_XSSQ + '?XH=' + this.xsbh)
                                                    .then(res => {
                                                        return res.json();
                                                    })
                                                    .then(res => {
                                                        this.xssq = res.msg;
                                                        if (this.openSelect && this.tempApplyed && !this.openResult) {
                                                            this.setOriginalStatus();
                                                        }
                                                        Indicator.close();
                                                    });
                                            });
                                    });
                            });
                    } else {
                        Utils.methods.showTip('获取用户信息失败');
                    }
                    Indicator.close();
                });
        },
        methods: {
            setOriginalStatus: function () {
                this.intention = this.xssq.SFTY;
                if (this.intention === '1') {
//                    $('.select-timely-pay').show();
                    $('#selected-enabled').show();
                    $('#selected-disabled').hide();
                } else {
//                    $('.select-timely-pay').hide();
                    $('#selected-enabled').hide();
                    $('#selected-disabled').show();
                }
//                this.canTimelyPay = this.xssq.SFAQJF;
                this.canTimelyPay = '';
                this.volunteer1 = this.xssq.ZY1;
                this.volunteer2 = this.xssq.ZY2;
                this.volunteer3 = this.xssq.ZY3;
                this.volunteer4 = this.xssq.ZY4;
                this.volunteer5 = this.xssq.ZY5;
                this.volunteer6 = this.xssq.ZY6;
                this.volunteer7 = this.xssq.ZY7;
                this.intention_disabled = true;
                this.canTimelyPay_disabled = true;
                this.disabled1 = true;
                this.disabled2 = true;
                this.disabled3 = true;
                this.disabled4 = true;
                this.disabled5 = true;
                this.disabled6 = true;
                this.disabled7 = true;
            },
            doSubmit: function () {
                MessageBox.confirm(this.tssm, '请仔细阅读一下说明信息，再确认提交')
                    .then(action => {
                        Indicator.open();
                        let params = '?XH=' + this.xsbh +
                            '&SFTY=' + this.intention +
                            '&BZ=' + Utils.methods.getCurrentDateTime() +
                            '&SFAQJF=' + this.canTimelyPay +
                            '&ZY1=' + this.volunteer1 +
                            '&ZY2=' + this.volunteer2 +
                            '&ZY3=' + this.volunteer3 +
                            '&ZY4=' + this.volunteer4 +
                            '&ZY5=' + this.volunteer5 +
                            '&ZY6=' + this.volunteer6 +
                            '&ZY7=' + this.volunteer7;

                        this.$http.get(Api.SUBMIT_XBSQ + params)
                            .then(res => {
                                return res.json();
                            })
                            .then(res => {
                                if (res.status === '200') {
                                    Utils.methods.showTip('提交成功');
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 1000);
                                } else {
                                    Utils.methods.showTip('提交失败');
                                }
                                Indicator.close();
                            });
                    });
            },
            checkDataAndSubmit: function () {
                if (this.intention === '') {
                    Utils.methods.showTip('请选择意向');
                } else {
                    if(this.intention === '1') {
                        if (this.volunteer1 === '' || this.volunteer2 === '' || this.volunteer3 === '' || this.volunteer4 === '' || this.volunteer5 === '' || this.volunteer6 === '' || this.volunteer7 === '') {
                            Utils.methods.showTip('请选择志愿');
                        } else {
                            this.doSubmit();
                        }
                    } else {
                        this.doSubmit();
                    }
                }
            },
            doEdit: function () {
                this.tempApplyed = false;
                this.intention_disabled = false;
                this.canTimelyPay_disabled = false;
                this.disabled1 = false;
                this.disabled2 = false;
                this.disabled3 = false;
                this.disabled4 = false;
                this.disabled5 = false;
                this.disabled6 = false;
                this.disabled7 = false;
                this.xbzys2 = this.changeXbzys(this.volunteer1, this.xbzys1);
                this.xbzys3 = this.changeXbzys(this.volunteer2, this.xbzys2);
                this.xbzys4 = this.changeXbzys(this.volunteer3, this.xbzys3);
                this.xbzys5 = this.changeXbzys(this.volunteer4, this.xbzys4);
                this.xbzys6 = this.changeXbzys(this.volunteer5, this.xbzys5);
                this.xbzys7 = this.changeXbzys(this.volunteer6, this.xbzys6);
            },
            doCancel: function () {
                this.setOriginalStatus();
                this.tempApplyed = true;
                this.intention_disabled = true;
                this.canTimelyPay_disabled = true;
                this.disabled1 = true;
                this.disabled2 = true;
                this.disabled3 = true;
                this.disabled4 = true;
                this.disabled5 = true;
                this.disabled6 = true;
                this.disabled7 = true;
            },
            toResult: function () {
                this.$router.push('/resultPage');
            },
            setSelect: function (date1, date2) {
                if (Utils.methods.compareDate(Utils.methods.getCurrentDate(), Utils.methods.formatDate(date1))
                    && Utils.methods.compareDate(Utils.methods.formatDate(date2), Utils.methods.getCurrentDate())) {
                    this.openSelect = true;
                } else {
                    this.openSelect = false;
                }
            },
            setPublicityPage: function (date1, date2) {
                if (Utils.methods.compareDate(Utils.methods.getCurrentDate(), Utils.methods.formatDate(date1))
                    && Utils.methods.compareDate(Utils.methods.formatDate(date2), Utils.methods.getCurrentDate())) {
                    this.openPublicity = true;
                } else {
                    this.openPublicity = false;
                }
            },
            changeXbzys(_volunteer, _xbzys) {
                let aa = Array.from(_xbzys);
                for (let i = 0; i < aa.length; i++) {
                    if (_volunteer == "99") {

                    } else if (_volunteer == aa[i].ZYDM) {
                        aa.splice(i, 1);
                    }
                }
                return aa;
            },
            showZYJS: function (fhzy) {
                this.popupVisible = true;
                $('.zyjs-title').html(fhzy.ZYMC);
                $('.zyjs-js').html(fhzy.ZYJS);
                $('.zyjs-div').animate({scrollTop: '0px'}, 800);
            },
            closeZYJS: function () {
                this.popupVisible = false;
            }
        },
        watch: {
            volunteer1: function () {
                if (!this.disabled1) {
                    this.disabled2 = false;
                    this.xbzys2 = this.changeXbzys(this.volunteer1, this.xbzys1);
                    if (this.volunteer1 === '99') {
                        this.volunteer2 = '99';
                        this.volunteer3 = '99';
                        this.volunteer4 = '99';
                        this.volunteer5 = '99';
                        this.volunteer6 = '99';
                        this.volunteer7 = '99';
                        this.disabled2 = true;
                        this.disabled3 = true;
                        this.disabled4 = true;
                        this.disabled5 = true;
                        this.disabled6 = true;
                        this.disabled7 = true;
                    }
                }
            },
            volunteer2: function () {
                this.disabled3 = false;
                this.xbzys3 = this.changeXbzys(this.volunteer2, this.xbzys2)
                if (this.volunteer2 === '99') {
                    this.volunteer3 = '99';
                    this.volunteer4 = '99';
                    this.volunteer5 = '99';
                    this.volunteer6 = '99';
                    this.volunteer7 = '99';
                    this.disabled3 = true;
                    this.disabled4 = true;
                    this.disabled5 = true;
                    this.disabled6 = true;
                    this.disabled7 = true;
                }
            },
            volunteer3: function () {
                this.disabled4 = false;
                this.xbzys4 = this.changeXbzys(this.volunteer3, this.xbzys3)
                if (this.volunteer3 === '99') {
                    this.volunteer4 = '99';
                    this.volunteer5 = '99';
                    this.volunteer6 = '99';
                    this.volunteer7 = '99';
                    this.disabled4 = true;
                    this.disabled5 = true;
                    this.disabled6 = true;
                    this.disabled7 = true;
                }
            },
            volunteer4: function () {
                this.disabled5 = false;
                this.xbzys5 = this.changeXbzys(this.volunteer4, this.xbzys4)
                if (this.volunteer4 === '99') {
                    this.volunteer5 = '99';
                    this.volunteer6 = '99';
                    this.volunteer7 = '99';
                    this.disabled5 = true;
                    this.disabled6 = true;
                    this.disabled7 = true;
                }
            },
            volunteer5: function () {
                this.disabled6 = false;
                this.xbzys6 = this.changeXbzys(this.volunteer5, this.xbzys5)
                if (this.volunteer5 === '99') {
                    this.volunteer6 = '99';
                    this.volunteer7 = '99';
                    this.disabled6 = true;
                    this.disabled7 = true;
                }
            },
            volunteer6: function () {
                this.disabled7 = false;
                this.xbzys7 = this.changeXbzys(this.volunteer6, this.xbzys6)
                if (this.volunteer6 === '99') {
                    this.volunteer7 = '99';
                    this.disabled7 = true;
                }
            },
            intention: function () {
                if (this.intention === '1') {
                    $('#selected-enabled').show();
                    $('#selected-disabled').hide();

                    this.volunteer1 = this.xssq.ZY1 || '';
                    this.volunteer2 = this.xssq.ZY2 || '';
                    this.volunteer3 = this.xssq.ZY3 || '';
                    this.volunteer4 = this.xssq.ZY4 || '';
                    this.volunteer5 = this.xssq.ZY5 || '';
                    this.volunteer6 = this.xssq.ZY6 || '';
                    this.volunteer7 = this.xssq.ZY7 || '';
                } else {
                    $('#selected-enabled').hide();
                    $('#selected-disabled').show();

                    this.volunteer1 = '';
                    this.volunteer2 = '';
                    this.volunteer3 = '';
                    this.volunteer4 = '';
                    this.volunteer5 = '';
                    this.volunteer6 = '';
                    this.volunteer7 = '';
                }
            }
        }
    }
</script>