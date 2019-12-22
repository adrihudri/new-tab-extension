function randombg() {
    var random = Math.floor(Math.random() * 6) + 0;
    var bigSize = ["url('https://images.unsplash.com/photo-1567864636772-b1dc19aadc8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80')",
        "url('https://images.unsplash.com/photo-1567913300214-364d5256df1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80')",
        "url('https://images.unsplash.com/photo-1567858454417-310520189493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80')",
        "url('https://images.unsplash.com/photo-1567852071315-c4b6191559c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')",
        "url('https://images.unsplash.com/photo-1567883355078-92589656db63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')",
        "url('https://images.unsplash.com/photo-1567818768422-6e920c919a29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80')"
    ];
    document.getElementById("main").style.backgroundImage = bigSize[random];
}

document.addEventListener('DOMContentLoaded', function() {
    randombg();
});

document.addEventListener("DOMContentLoaded", function() {
    chrome.management.getAll(getAllCallback);
});

var getAllCallback = function(list) {
    var apps = document.getElementById("apps");
    for (var i in list) {
        // we don't want to do anything with extensions yet.
        var extInf = list[i];
        if (extInf.isApp && extInf.enabled) {
            var app = document.createElement("div");

            var img = new Image();
            img.className = "image";
            img.src = find128Image(extInf.icons);
            img.addEventListener("click", (function(ext) {
                return function() {
                    chrome.management.launchApp(ext.id);
                };
            })(extInf));

            var name = document.createElement("div");
            name.className = "name";
            name.textContent = extInf.name;

            app.className = "app";
            app.appendChild(img);
            app.appendChild(name);
            apps.appendChild(app);
        }
    }
};

var find128Image = function(icons) {
    for (var icon in icons) {
        if (icons[icon].size == "128") {
            return icons[icon].url;
        }
    }

    return "/noicon.png";
};