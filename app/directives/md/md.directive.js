/**
 * Created by Helex on 2017/8/25.
 */

import marked from "marked";

let defaultOpts = {
        github_md_css: false
    }
    , opts = {}
    , renderer = new marked.Renderer();


export default {
    install: function (Vue, options) {
        Vue.directive("md", {
            bind: function (el, binding, vnode) {
                // binding: 一个对象，包含以下属性：
                //  name: 指令名，不包括 v- 前缀。
                //  value: 指令的绑定值， 例如： v-my-directive="1 + 1", value 的值是 2。
                //  oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
                //  expression: 绑定值的字符串形式。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。
                //  arg: 传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
                //  modifiers: 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。

                opts = Object.assign(defaultOpts, binding.modifiers || {});
            },
            inserted: function (el, binding, vnode) {
            },
            update: function (el, binding, vnode, oldVnode) {
                let vm = vnode.context,
                    raw = binding.value;
                let ripe = marked(raw, {
                    renderer: renderer,
                    breaks: true
                });

                if (opts.github_md_css) {//Wrap result with github-markdown-css
                    ripe = "<article class='markdown-body editormd-preview-container'>" +
                        ripe +
                        "</article>";
                }
                ripe = ripe.replace(/<pre>/g, "<pre class='prettyprint linenums'>");
                el.innerHTML = ripe;
                PR.prettyPrint(() => {
                }, el);
            },
            componentUpdated: function (el, binding, vnode, oldVnode) {
            }
        });
    }
}