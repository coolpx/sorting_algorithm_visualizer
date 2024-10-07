// modules
import { RunService, TweenService, Workspace } from '@rbxts/services';
import Bezier2 from 'shared/modules/Bezier2';

// constants
const camera = Workspace.CurrentCamera!;

const pointCoint = 10;

let points: {
    position: Vector2;
    object: BasePart;
    tweeningUntil?: number;
}[] = [];

// wait for camera
while (camera.ViewportSize.Magnitude <= 2) task.wait();

// create base plane
const plane = new Instance('Part');
plane.Name = 'backgroundEffectPlane';
plane.Size = new Vector3(4096, 4096, 1);
plane.Anchored = true;
plane.Color = new Color3(0, 0, 0);
plane.Parent = Workspace;

// create points
for (let i = 0; i < pointCoint; i++) {
    // position
    const random = new Random();
    const position = new Vector2(
        random.NextInteger(0, camera.ViewportSize.X),
        random.NextInteger(0, camera.ViewportSize.Y)
    );

    // size
    const size = random.NextNumber(8, 32);

    // object
    const object = new Instance('Part');
    object.Size = new Vector3(size, size, 0.1);
    object.Anchored = true;
    object.Transparency = 1;
    object.CanCollide = false;
    object.CanTouch = false;
    object.CanQuery = false;
    object.Parent = Workspace;

    // color
    const color = new Color3(
        math.random() * 0.2 + 0.15,
        math.random() * 0.2 + 0.15,
        math.random() * 0.2 + 0.2
    );

    // decal
    const decal = new Instance('Decal');
    decal.Face = Enum.NormalId.Back;
    decal.Texture = 'rbxassetid://122944917685434';
    decal.Color3 = color;
    decal.ZIndex = i;
    decal.Parent = object;

    // push
    points.push({ position, object });
}

// functions
function screenToWorldPosition(position: Vector2): Vector3 | undefined {
    // raycast
    const ray = camera.ViewportPointToRay(position.X, position.Y);
    const raycast = Workspace.Raycast(ray.Origin, ray.Direction.mul(1024));

    if (!raycast) return;
    if (!raycast.Instance) return;
    if (!raycast.Instance.IsA('BasePart')) return;

    // return position
    return raycast.Position;
}

function update() {
    // move camera
    camera.CameraType = Enum.CameraType.Scriptable;
    camera.CFrame = new CFrame();

    // move plane
    plane.Position = camera.CFrame.Position.add(camera.CFrame.LookVector.mul(10));

    // move objects
    for (const [index, data] of pairs(points)) {
        /* print(data); */
        // raycast
        const worldPosition = screenToWorldPosition(data.position);
        if (!worldPosition) continue;

        // move if no active tween
        if (!data.tweeningUntil || data.tweeningUntil - tick() <= 0) {
            // set position if no tween
            if (!data.tweeningUntil) data.object.Position = worldPosition;

            // get position
            const random = new Random();
            const newPosition = new Vector2(
                random.NextInteger(0, camera.ViewportSize.X),
                random.NextInteger(0, camera.ViewportSize.Y)
            );
            const newWorldPosition = screenToWorldPosition(newPosition);

            // create tween
            const tweenInfo = new TweenInfo(
                random.NextNumber(1.25, 2),
                Enum.EasingStyle.Sine,
                Enum.EasingDirection.InOut
            );
            const tween = TweenService.Create(data.object, tweenInfo, {
                Position: newWorldPosition
            });

            // play tween
            tween.Play();

            // update tween
            data.tweeningUntil = tick() + tweenInfo.Time;
        }
    }
}

// update
RunService.BindToRenderStep('updateBackgroundEffect', Enum.RenderPriority.Camera.Value + 1, update);
