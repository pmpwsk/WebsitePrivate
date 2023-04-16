function Redirect() {
    try {
        let query = new URLSearchParams(window.location.search);
        if (query.has("redirect")) {
            let redirect = query.get("redirect");
            if (redirect.startsWith("/")) {
                if (redirect.startsWith("/api/")) {
                    window.location.assign("/");
                } else {
                    window.location.assign(redirect);
                }
            } else {
                window.location.assign("/");
            }
        } else {
            window.location.assign("/");
        }
    } catch {
        window.location.assign("/");
    }
}