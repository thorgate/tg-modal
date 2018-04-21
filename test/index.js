// Sham raf
if (!global.requestAnimationFrame) {
    global.requestAnimationFrame = (cb) => {
        return setTimeout(cb, 0);
    };

    global.cancelAnimationFrame = (t) => {
        return clearTimeout(t);
    };
}
