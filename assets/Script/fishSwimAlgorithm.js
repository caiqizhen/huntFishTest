module.exports = {

    /**
     * 更新插值速度
     */
    updateInterpolationSpeed: function(speed){
        this.interpolationSpeed = speed;
    },

    getInterpolationSpeed: function(){
        return this.interpolationSpeed;
    },

    isNeedToFlipFish: function(lastPos, curPos){
        if (!lastPos || !curPos) {
            return false;
        }
        if(lastPos === curPos){
            return false;
        }

        let directionHorizontal = curPos.x - lastPos.x > 0 ? 0 : 1;
        if (directionHorizontal){
            return false;
        } else{
            return true;
        }
    },

    //改变角色的方向 https://blog.csdn.net/i646372587/article/details/46852835
    changeRoleDegree: function(lastPos, curPos){
        if (!lastPos || !curPos) {
            return 0;
        }
        if(lastPos === curPos){
            return 0;
        }

        let direction = curPos.x - lastPos.x > 0 ? 0 : 1;
        //垂直方向的走
        let k = 0;
        if(curPos.x - lastPos.x === 0){
            if(curPos.y - lastPos.y > 0){
                return 90;
            }else {
                return -90;
            }
        }else{//水平方向的走
            k = (curPos.x - lastPos.x) / (curPos.y - lastPos.y);
            console.log("fishSwimAlgorithm::changeRoleDegree k = " + k);
            let degree = Math.atan(k);
            if(k > 0){
                return degree * 180 / Math.PI - 90 + 180 * direction;
            }else {
                return degree * 180 / Math.PI + 90 - 180 * direction;
            }
        }
    },

    //阿基米德螺旋线
    archimedeanSpiralMovement: function(){
        //注意点：因为interpolationSpeed最大只到1，所以到达1后就不动了
        let r = 360 * this.interpolationSpeed;
        let x = r * Math.cos(0.1 * this.interpolationSpeed * 360);
        let y = r * Math.sin(0.1 * this.interpolationSpeed * 360);
        console.log("archimedeanSpiralMovement r = " + r + ",x = " + x + ",y = " + y);
        return cc.v2(x, y);
    },

    //线性运动的插值算法 y = kx + b k为斜率
    lineMovement: function (posOne, posTwo) {
        if (!posOne || !posTwo) {
            return;
        }
        if (!posOne instanceof cc.v2 || !posTwo instanceof cc.v2) {
            return;
        }
        let k = (posOne.y - posTwo.y) / (posOne.x - posTwo.x);
        let b = posOne.y - k * posOne.x;

        let movementX = posOne.x + this.interpolationSpeed * (posTwo.x - posOne.x);
        let movementY = k * movementX + b;
        return cc.v2(movementX, movementY);
    },

    //贝塞尔曲线解释https://juejin.im/post/5b854e1451882542fe28a53d

    //二次方贝塞尔曲线,套公式即可
    quadraticBezierMovement: function (posOne, posTwo, posThree) {
        let movementX = 0;
        let movementY = 0;

        movementX = (1 - this.interpolationSpeed) * (1 - this.interpolationSpeed) * posOne.x + 2 * this.interpolationSpeed * (1 - this.interpolationSpeed) * posTwo.x
            + this.interpolationSpeed * this.interpolationSpeed * posThree.x;

        movementY = (1 - this.interpolationSpeed) * (1 - this.interpolationSpeed) * posOne.y + 2 * this.interpolationSpeed * (1 - this.interpolationSpeed) * posTwo.y
            + this.interpolationSpeed * this.interpolationSpeed * posThree.y;
        return cc.v2(movementX, movementY);
    },

    //三次方贝塞尔曲线
    cubicBezierMovement: function (posOne, posTwo, posThree, posFour) {
        let movementX = 0;
        let movementY = 0;

        movementX = (1 - this.interpolationSpeed) * (1 - this.interpolationSpeed) * (1 - this.interpolationSpeed) * posOne.x
            + 3 * this.interpolationSpeed * (1 - this.interpolationSpeed) * (1 - this.interpolationSpeed) * posTwo.x
            + 3 * this.interpolationSpeed * this.interpolationSpeed * (1 - this.interpolationSpeed) * posThree.x
            + this.interpolationSpeed * this.interpolationSpeed * this.interpolationSpeed * posFour.x;

        movementY = (1 - this.interpolationSpeed) * (1 - this.interpolationSpeed) * (1 - this.interpolationSpeed) * posOne.y
            + 3 * this.interpolationSpeed * (1 - this.interpolationSpeed) * (1 - this.interpolationSpeed) * posTwo.y
            + 3 * this.interpolationSpeed * this.interpolationSpeed * (1 - this.interpolationSpeed) * posThree.y
            + this.interpolationSpeed * this.interpolationSpeed * this.interpolationSpeed * posFour.y;
        return cc.v2(movementX, movementY);
    },
};