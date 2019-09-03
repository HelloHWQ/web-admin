export default {
    max6:{
        test:function(val){
            if(val.length>6) {
                return false;
            }
            return true;
        },
        message:"最大为6位"
    },
    require: {
        test: function(val) {
            if(val && val.length>0) {
                return true;
            } else {
                return false;
            }
        },
        message: '此项为必填项！'
    }
}
