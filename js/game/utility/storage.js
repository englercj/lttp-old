define({
    save: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    load: function(key) {
        var val = localStorage.getItem(key);

        try {
            val = JSON.parse(val);
        } catch(e) {}

        return val;
    }
})