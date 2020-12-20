Component({
    properties: {
        pop_active:{
            type: Boolean
        },
        pop_goods_tip:{
            type: Object
        }
    },

    methods: {
        pop2_comp:function(){
            this.triggerEvent('comp');
        }
    }
});