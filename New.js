document.addEventListener("DOMContentLoaded", function () {
    function isMobile() {
        return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    function checkDesktopMode() {
        if (window.innerWidth > 768) {
            document.getElementById("mobile-warning").classList.add("hidden");
            document.getElementById("main-content").style.display = "block";
        } else {
            alert("You are still in mobile mode. Please enable Desktop Mode in your browser settings.");
        }
    }

    if (isMobile()) {
        document.getElementById("main-content").style.display = "none";
        document.getElementById("mobile-warning").classList.remove("hidden");
        window.checkDesktopMode = checkDesktopMode;
    }
});
