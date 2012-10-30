define({
    jquerify: function(obj) {
        if(!obj.jquery)
            return $(obj);
        else
            return obj;
    }
});