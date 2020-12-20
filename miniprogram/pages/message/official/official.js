Component({
    properties: {
        message: {
            type: Object
        }
    },

    data: {},

    methods: {
        official:function(){
            swan.navigateTo({
                url: "/pages/notification/notification"
            })
        }
    }
});