function edgeInit() {
    fabric.Edge = fabric.util.createClass(fabric.Line, {
        type: 'Edge',

        initialize: function (element, options) {
            options || (options = {});
            this.callSuper('initialize', element, options);
        },

        toObject: function () {
            return fabric.util.object.extend(this.callSuper('toObject'));
        },

        _render: function (ctx) {
            this.callSuper('_render', ctx);

            // do not render if width/height are zeros or object is not visible
            if (this.width === 0 && this.height === 0 || !this.visible) return;
            ctx.save();
            var xDiff = this.x2 - this.x1;
            var yDiff = this.y2 - this.y1;
            var angle = Math.atan2(yDiff, xDiff);
            ctx.translate(xDiff / 2, yDiff / 2);
            ctx.rotate(angle);

            // draw the triangle
            ctx.beginPath();
            ctx.moveTo(-VertexRadius * isDirect - 25 * (1 - isDirect), 0);
            ctx.lineTo(-25, 6);
            ctx.lineTo(-25, -6);
            ctx.closePath();
            ctx.fillStyle = this.stroke;
            ctx.fill();
            ctx.restore();
        },

        clipTo: function (ctx) {
            this._render(ctx);
        }
    });
}

