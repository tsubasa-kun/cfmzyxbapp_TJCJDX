<template>
    <div>
        <div>
            <input class="keyword-input" v-model="keyword" type="text" placeholder="请输入姓名/通知书号/现录取专业">
            <mu-raised-button label="搜索" primary class="search-btn" @click="doSearch"/>
        </div>
        <div class="item-div" v-for="data in searchResult">
            <span class="label-text">姓名：<span class="value-text">{{ data.XM }}</span></span>
            <span class="label-text">通知书号：<span class="value-text">{{ data.TZSH }}</span></span>
            <span class="label-text">现录取专业：<span class="value-text">{{ data.XLQZY }}</span></span>
        </div>
    </div>
</template>

<style scoped>
    .keyword-input {
        width: calc(100% - 108PX);
        border: solid 1PX #e8e8e8;
        border-right: none;
        font-size: 12PX;
        display: inline-block;
        height: 30PX;
        margin-right: -5PX;
        margin-top: -2PX;
        margin-left: 10PX;
        padding-left: 6PX;
    }

    .search-btn {
        width: 20PX;
        height: 30PX;
        margin-top: 10PX;
        margin-right: 10PX;
        display: inline-block;
    }

    .item-div {
        border: solid 1PX #e8e8e8;
        margin: 10PX;
        padding: 10PX;
    }

    .label-text {
        font-size: 14PX;
        color: #9ea7b4;
        display: block;
    }

    .value-text {
        font-size: 16PX;
        color: #464c5b;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import {Indicator} from 'mint-ui';

    export default {
        data() {
            return {
                dataList: [],
                searchResult: [],
                keyword: ''
            }
        },
        created() {
            SDK.setTitleText('专业选拔');

            Indicator.open();
            let params = '?TZSH=&XM=&XLQZY=';
            this.$http.get(Api.QUERY_XBGS + params)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.dataList = res.msg;
                    this.searchResult = this.dataList;
                    Indicator.close();
                });
        },
        methods: {
            doSearch: function () {
                if (this.keyword === '') {
                    this.searchResult = this.dataList;
                } else {
                    this.searchResult = [];
                    for (let i = 0; i < this.dataList.length; i++) {
                        let data = this.dataList[i];
                        if ((data.TZSH.indexOf(this.keyword) >= 0) || (data.XLQZY.indexOf(this.keyword) >= 0) || (data.XM.indexOf(this.keyword) >= 0)) {
                            this.searchResult.push(data);
                        }
                    }
                }
            }
        }
    }
</script>