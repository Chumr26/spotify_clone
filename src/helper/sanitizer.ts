function sanitizer(videoLink: string) {
    if (videoLink.length > 11) {
        const regex_browser = /v=([a-zA-Z0-9_-]+)/;
        const regex_app = /youtu.be\/([a-zA-Z0-9_-]+)/;
        let match;
        if (videoLink.includes('youtube.com')) {
            match = regex_browser.exec(videoLink);
        } else if (videoLink.includes('youtu.be')) {
            match = regex_app.exec(videoLink);
        }
        if (match) {
            videoLink = match[1];
        } else return { error: 'Not match: Invalid Youtube video link' };
    } else if (videoLink.length < 11) {
        return { error: 'Invalid video link' };
    }
    return { videoId: videoLink };
}

export default sanitizer;
