// types
type Points2D = [Vector2, Vector2, ...Vector2[]];

// class
class Bezier2 {
    private points: Points2D;

    constructor(points: Points2D) {
        // set points
        this.points = points;
    }

    private lerp(p0: Vector2, p1: Vector2, t: number): Vector2 {
        return new Vector2(p0.X + (p1.X - p0.X) * t, p0.Y + (p1.Y - p0.Y) * t);
    }

    private deCasteljau(points: Vector2[], t: number): Vector2 {
        if (points.size() === 1) {
            return points[0]; // Base case: only one point left
        }

        const newPoints: Vector2[] = [];
        for (let i = 0; i < points.size() - 1; i++) {
            newPoints.push(this.lerp(points[i], points[i + 1], t)); // Interpolate between each pair of points
        }

        return this.deCasteljau(newPoints, t); // Recursive call
    }

    getPoint(t: number): Vector2 {
        return this.deCasteljau(this.points, t);
    }

    getCurve(resolution: number): Vector2[] {
        // create curve
        const curve = new Array<Vector2>();

        // calculate curve
        for (let i = 0; i <= resolution; i++) {
            curve.push(this.getPoint(i / resolution));
        }

        // return curve
        return curve;
    }
}

export = Bezier2;
