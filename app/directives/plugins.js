/**
 * Created by Helex on 2017/2/12.
 */

import formDir from './form/form.directive';
import mdDir from './md/md.directive';

export default {
    install: function(Vue, options){
        Vue.use(formDir);
        Vue.use(mdDir);
    }
}