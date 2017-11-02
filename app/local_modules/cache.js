let hot, latest;

let validity = 10 * 60 * 1000;

export default {
    hot: {
        get() {
            if(hot){
                if(hot.expiration - Date.now() > validity){
                    hot = null;
                    return null;
                } else
                    return hot.data;
            } else
                return null;
        },
        set(cache) {
            hot = {
                expiration: Date.now(),
                data: cache
            }
        }
    },
    latest: {
        get() {
            if(latest){
                if(latest.expiration - Date.now() > validity){
                    latest = null;
                    return null;
                } else
                    return latest.data;
            } else
                return null;
        },
        set(cache) {
            latest = {
                expiration: Date.now(),
                data: cache
            }
        }
    }
}