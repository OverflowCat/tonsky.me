function talks_render_version_idx(event, idx) {
    var version = event.currentTarget,
        details = version.parentNode.parentNode,
        inner   = details.parentNode,
        talk    = inner.parentNode;
    talks_render_version(talk, talk.querySelectorAll("script[type=talk-version]")[idx]);
}

function talks_render_version(talk, version) {
    var html     = version.innerHTML,
        versions = talk.querySelectorAll("script[type=talk-version]"),
        suffix   = "";
    for (var i = 0; i < versions.length; ++i) {
        var lang   = versions[i].getAttribute("data-lang"),
            date   = versions[i].getAttribute("data-date"),
            event  = versions[i].getAttribute("data-event"),
            active = versions[i] === version,
            idx    = html.lastIndexOf("</div>");
        suffix += "<div"
               +  " class='talk-version" + (active ? " talk-version_active" : "") + "'"
               +  (active ? "" : " onclick='talks_render_version_idx(event, " + i + ")'")
               +  ">"
               +    "<span class='talk-version-lang'>" + lang + "</span> "
               +    date
               +    ((event === null || event === "") ? "" : " × " + event)
               +  "</div>";
    }
    html = html.substring(0, idx) + "<div class='talk-versions'>" + suffix + "</div>" + html.substring(idx);
    talk.querySelector(".talk-inner").innerHTML = html;
}

function talks_on_scroll(e) {
    var wh     = window.innerHeight,
        offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        talks  = document.querySelectorAll(".talk_hidden");
    for (var i = 0; i < talks.length; ++i) {
        var talk = talks[i],
            talk_top = talk.offsetTop,
            talk_bottom = talk_top + talk.clientHeight,
            visible = talk_bottom > offset && talk_top < offset + wh;
        if (visible) {
            talk.classList.remove("talk_hidden");
            talks_render_version(talk, talk.querySelector("script[data-default]"));
        }
    }
}

window.addEventListener("load", function(e) {
    talks_on_scroll(e);
    window.addEventListener("scroll", talks_on_scroll);
});