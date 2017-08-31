/**
 * Created by xiekun on 2017/06/05 0005.
 */

export default {
    GET_CUR_USER: WEBPACK_CONIFG_HOST + '/sys/xszyxbapp_tjufe/MobileService/getcurid.do',//获取当前用户
    QUERY_SFSQ: WEBPACK_CONIFG_HOST + '/sys/xszyxbapp_tjufe/MobileService/querysfysq.do',//查询是否已申请1是0否
    QUERY_XBSZ: WEBPACK_CONIFG_HOST + '/sys/xszyxbapp_tjufe/MobileService/queryxbsz.do',//获取新生专业选拔设置表（T_XSZYXB_SZ）
    QUERY_XSSQ: WEBPACK_CONIFG_HOST + '/sys/xszyxbapp_tjufe/MobileService/queryxssq.do',//获取新生专业选拔申请数据（T_XSZYXB_XSSQ）
    QUERY_XBJG: WEBPACK_CONIFG_HOST + '/sys/xszyxbapp_tjufe/MobileService/queryxbjg.do',//获取新生专业选拔结果（T_XSZYXB_XBJG）
    QUERY_XBGS: WEBPACK_CONIFG_HOST + '/sys/xszyxbapp_tjufe/MobileService/queryxbgs.do',//新生专业选拔公示（T_XSZYXB_XBJG）
    SUBMIT_XBSQ: WEBPACK_CONIFG_HOST + '/sys/xszyxbapp_tjufe/MobileService/updatexbsq.do',//新生专业选拔提交（T_XSZYXB_XSSQ）
    QUERY_XBZY: WEBPACK_CONIFG_HOST + '/sys/xszyxbapp_tjufe/MobileService/queryxbzy.do'//获取志愿专业字典表（V_XB_ZY）
}
