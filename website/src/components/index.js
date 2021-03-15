import BackTop from "@components/BackTop";
import Section from "@components/Section";
import Card from "@components/Card";
import SideMenu from "@components/SideMenu";

// 组件包(不能是小写的HTML标签和大小写的svg标签/slot标签/component标签  模板解析用Button)
const components = {
    BackTop,
    Section,
    Card,
    SideMenu,
};

// 格式化组件名(不符合命名条件的给组件名加前缀i，模板解析用i-button)
const formatComponents = {
    ...components,
};

// 默认导出FanUI组件库
export default {
    // 定义install方法，它将作为export暴露的对象的方法被Vue.use调用
    install: function (Vue) {
        // 遍历components，依次注册每个组件
        Object.keys(formatComponents).forEach(key => {
            Vue.component(key, formatComponents[key]);
        });
    },
    // 可按需引入
    ...components,
}