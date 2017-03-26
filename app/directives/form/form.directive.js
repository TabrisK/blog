/**
 * Created by Helex on 2017/2/12.
 */
/*
 ValidityState Reference: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 var errorMsg = {
 //Is a Boolean indicating the user has provided input that the browser is unable to convert.
 badInput: false,
 //Is a Boolean indicating the element's custom validity message has been set to a non-empty string
 //by calling the element's setCustomValidity() method.
 customError: false,
 //Is a Boolean indicating the value does not match the specified pattern.
 patternMismatch: false,
 //Is a Boolean indicating the value is greater than the maximum specified by the max attribute.
 rangeOverflow: false,
 //Is a Boolean indicating the value is less than the minimum specified by the min attribute.
 rangeUnderflow: false,
 //Is a Boolean indicating the value does not fit the rules determined by the step attribute
 //(that is, it's not evenly divisible by the step value).
 stepMismatch: false,
 //Is a Boolean indicating the value exceeds the specified maxlength for HTMLInputElement or HTMLTextAreaElement objects.
 //Note: This will never be true in Gecko, because elements' values are prevented from being longer than maxlength.
 tooLong: false,
 //Is a Boolean indicating the value fails to meet the specified minlength for HTMLInputElement or HTMLTextAreaElement objects.
 tooShort: false,
 //Is a Boolean indicating the value is not in the required syntax (when type is email or url).
 typeMismatch: false,
 //Is a Boolean indicating the element meets all constraint validations, and is therefore considered to be valid.
 valid: true,
 //Is a Boolean indicating the element has a required attribute, but no value.
 valueMissing: false
 }*/

//正则表达式
let reg = {};

export default {
    install: function (Vue, options) {
        Vue.directive("form", {
            bind: function (el, binding, vnode) {
            },
            inserted: function (el, binding, vnode) {
                var vm = vnode.context,//rendered in this component's scope
                    formObj = {},//用户表单对象；
                    formNode = vnode.elm;//表单virtual dom
                for (let node of vnode.elm) {
                    //匹配到需要监控的输入控件
                    if (node.nodeName == "INPUT") {
                        updateStatusListerner(node);
                        node.addEventListener("keyup", (e)=> {
                            updateStatusListerner(node, e)
                        });

                    } else if (node.nodeName == "SELECT") {
                        updateStatusListerner(node);
                        node.addEventListener("change", (e)=> {
                            updateStatusListerner(node, e)
                        });
                    }
                }

                /**
                 *
                 * @param isValid   form是否通过验证
                 * @param msg       用户本次操作验证元素信息
                 */
                function setValidation(isValid, msg, e) {//设置用户表单对象合法性
                    "use strict";
                    formObj.$valid = isValid;
                    formObj.$invalid = !isValid;
                    formObj.$dirty = !!e;
                    setErrorMsg(formObj, msg, !!e);

                    console.log(formObj);
                    vm.$data[binding.expression] = Object.assign({}, vm.$data[binding.expression], formObj);

                    function setErrorMsg(err, msg, userOperation) {
                        err[msg.name] = {$dirty: userOperation};
                        err[msg.name].$valid = msg.validation.valid;
                        err[msg.name].$invalid = !msg.validation.valid;
                        for (let key in msg.validation) {
                            if (msg.validation[key] && key != "valid")
                                err[msg.name][key] = msg.validation[key];
                        }
                    }
                }

                function updateStatusListerner(node, e) {//监听更新用户表单状态方法
                    "use strict";
                    setValidation(formNode.checkValidity(), {
                        name: node.name,//元素名
                        validation: node.validity//校验状态
                    }, e);
                }
            },
            update: function (el, binding, vnode, oldVnode) {
            },
            componentUpdated: function (el, binding, vnode, oldVnode) {
            }
        });
    }
}