module.exports = {

    getMinX: function () {
        let frameSize = cc.view.getFrameSize();
        return -(frameSize.width / 2);
    },

    getMaxX: function () {
        let frameSize = cc.view.getFrameSize();
        return frameSize.width / 2;
    },

    getMinY: function () {
        let frameSize = cc.view.getFrameSize();
        return -(frameSize.height / 2);
    },

    getMaxY: function () {
        let frameSize = cc.view.getFrameSize();
        return frameSize.height / 2;
    },
};