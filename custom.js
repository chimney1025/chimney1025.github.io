function Words() {
    var dict = {};
    reset();

    function reset() {
        if (localStorage.getItem("words")) {
            dict = JSON.parse(localStorage.getItem("words"));
        } else {
            dict = {};
        }
    }

    return {
        add: function(key, value) {
            dict[key] = value;
            localStorage.setItem("words", JSON.stringify(dict));
        },

        search: function(key) {
            return dict[key];
        },

        getAll: function() {
            return dict;
        },

        reset: function() {
            reset();
        }
    };
}

function Display() {

    var words = new Words();

    function getAll() {
        var results = words.getAll();
        document.getElementById('result').innerHTML = "";
        for (var key in results) {
            var node = document.createElement("div");
            node.innerHTML = "- " + key + " : " + results[key] + "<br>";
            document.getElementById('result').appendChild(node);
        }
    }

    function addWord() {
        var key = document.getElementById('key').value.trim();
        var value = document.getElementById('value').value.trim();
        if (key && value) {
            words.add(key, value);
            document.getElementById('key').value = '';
            document.getElementById('value').value = '';
            document.getElementById('key').focus();

            getAll();
        }
    }

    function searchSong() {
        var song = document.getElementById('song').value.trim();
        
        $.ajax({
            url: "http://geci.me/api/lyric/" + song,
            type: "GET",
            crossDomain: true,
            dataType: "json"
        }).done(function(data) {
            console.log(data);
        });
    }

    return {

        import: function(orig) {
            var dict = {};
            //var orig = document.getElementById("result").textContent;
            var arr = orig.split('- ');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]) {
                    var key = arr[i].split(" : ")[0];
                    var value = arr[i].split(" : ")[1];
                    dict[key] = value;
                    localStorage.setItem("words", JSON.stringify(dict));
                }
            }
        },

        clearStorage: function() {
            localStorage.removeItem("words");
            words.reset();
        },

        setStorage: function(json) {
            localStorage.setItem("words", JSON.stringify(json));
            words.reset();
        },

        init: function() {
            document.getElementById('search').addEventListener('click', searchSong);
            document.getElementById('song').addEventListener('keydown', function(event) {
                if (event.keyCode == 13) {
                    searchSong();
                }
            });
            document.getElementById('add').addEventListener('click', addWord);

            document.getElementById('value').addEventListener('keydown', function(event) {
                if (event.keyCode == 13) {
                    addWord();
                }
            });

            document.getElementById('getAll').addEventListener('click', getAll);

            document.getElementById('lyric').addEventListener('click', function() {
                document.getElementById('result').innerHTML = "";
                var list = document.getElementById('lyricInput').value.trim().split('');

                for (var i = 0; i < list.length; i++) {
                    var key = list[i];
                    if (key) {
                        if (key == "\n" || key == "\r\n") {
                            var node = document.createElement("div");
                            node.innerHTML = "<br>";
                            document.getElementById('result').appendChild(node);
                        } else {
                            var value = words.search(key);
                            if (!value) {
                                value = "";
                            }

                            var node = document.createElement("span");
                            node.innerHTML = key + value + " ";
                            document.getElementById('result').appendChild(node);
                        }
                    }
                }
            });
        }
    };
}