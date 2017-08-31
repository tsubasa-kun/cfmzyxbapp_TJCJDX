<template>
    <div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">专业选拔</mt-tab-item>
            <mt-tab-item v-if="openPublicity" id="2">选拔公示</mt-tab-item>
        </mt-navbar>
        <div class="line"></div>

        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <v-select-page></v-select-page>
            </mt-tab-container-item>
            <mt-tab-container-item v-if="openPublicity" id="2">
                <v-publicity-page></v-publicity-page>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<style scoped>
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 3PX solid #06c1ae;
        color: #06c1ae;
        margin-bottom: -3PX;
    }

    .mint-tab-item {
        color: black;
    }

    .line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }
</style>

<script type="text/javascript">
    import {Navbar, TabItem, TabContainer, TabContainerItem, Indicator} from 'mint-ui';
    import selectPage from '../selectPage/selectPage.vue';
    import publicityPage from '../publicityPage/publicityPage.vue';
    import Api from '../../api';
    import Utils from '../../utils';

    export default {
        data(){
            return {
                selected: '1',
                instr: '',
                openPublicity: false
            }
        },
        components: {
            [Navbar.name]: Navbar,
            [TabItem.name]: TabItem,
            [TabContainer.name]: TabContainer,
            [TabContainerItem.name]: TabContainerItem,
            'v-select-page': selectPage,
            'v-publicity-page': publicityPage
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
//                    this.setPublicityPage(res.msg.gskssj, res.msg.gsjssj);//临时去掉
                    Indicator.close();
                });
        },
        methods: {
            setPublicityPage: function (date1, date2) {
                if (Utils.methods.compareDate(Utils.methods.getCurrentDate(), date1) && Utils.methods.compareDate(date2, Utils.methods.getCurrentDate())) {
//                    console.log('可以公示');
                    this.openPublicity = true;
                } else {
//                    console.log('不可以公示');
                    this.openPublicity = false;
                }
            }
        }
    }
</script>