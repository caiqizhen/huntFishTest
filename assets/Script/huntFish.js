
let fishSwimAlgorithm = require("fishSwimAlgorithm");
let utils = require("utils");

cc.Class({
    extends: cc.Component,

    properties: {
        fishPrefab: cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        this.fishArr = new Array();
        let fishNode = this.addFishToRoot(cc.v2(utils.getMinX(), utils.getMinY()), "fishOne");
        this.fishArr.push(fishNode);
        fishSwimAlgorithm.updateInterpolationSpeed(0.001);
    },

    /**
     * 添加鱼到画布上
     * @param position
     * @param nodeName
     */
    addFishToRoot: function(position, nodeName){
        if(!this.fishPrefab){
            return;
        }
        let fishNode = cc.instantiate(this.fishPrefab);
        if(!position || !position instanceof cc.v2){
            return;
        }
        fishNode.setName(nodeName);
        fishNode.setPosition(position);
        this.node.addChild(fishNode);
        return fishNode;
    },

    // called every frame
    update: function (dt) {
        this.moveFishPosition();
        if(fishSwimAlgorithm.getInterpolationSpeed() >= 1){
            return;
        }
        fishSwimAlgorithm.updateInterpolationSpeed(fishSwimAlgorithm.getInterpolationSpeed() + 0.001);
    },

    moveFishPosition: function(){
        if(!fishSwimAlgorithm.getInterpolationSpeed()){
            return;
        }
        for(let index = 0; index < this.fishArr.length; index++){
            let fishNode = this.fishArr[index];
            //传递当前位置进去会导致速度变慢
            // let movementPos = fishSwimAlgorithm.lineMovement(cc.v2(utils.getMinX(), utils.getMinY()), cc.v2(utils.getMaxX(), utils.getMaxY()));
            // let movementPos = fishSwimAlgorithm.lineMovement(cc.v2(utils.getMaxX(), utils.getMaxY()), cc.v2(utils.getMinX(), utils.getMinY()));
            // let movementPos = fishSwimAlgorithm.lineMovement(cc.v2(utils.getMaxX(), 0), cc.v2(utils.getMinX(), 0));
            // let movementPos = fishSwimAlgorithm.quadraticBezierMovement(cc.v2(utils.getMinX(), 0), cc.v2(0, utils.getMaxY()), cc.v2(utils.getMaxX(), 0));
            // let movementPos = fishSwimAlgorithm.cubicBezierMovement(cc.v2(utils.getMinX(), 0), cc.v2(utils.getMinX() / 2, utils.getMaxY()),cc.v2(utils.getMaxX() / 2, utils.getMaxY()), cc.v2(utils.getMaxX(), 0));
            let movementPos = fishSwimAlgorithm.archimedeanSpiralMovement();
            let rotateDegree = fishSwimAlgorithm.changeRoleDegree(fishNode.getPosition(), movementPos);
            let isNeedToFlipY = fishSwimAlgorithm.isNeedToFlipFish(fishNode.getPosition(), movementPos);
            fishNode.rotation = rotateDegree;
            fishNode.setPosition(movementPos);
            if(isNeedToFlipY) {
                //相当于调用flipY
                fishNode.setScaleY(-1);
            }
        }
    },
});
