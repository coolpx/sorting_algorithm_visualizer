// modules
import Roact from '@rbxts/roact';

// components
import Text from './Text';
import { TextService } from '@rbxts/services';

// types
interface ButtonProps {
    Text: string;
    OnClick: () => void;
    Position?: UDim2;
    Size: UDim2;
    LayoutOrder?: number;
    Bold?: boolean;
    Color?: ColorSequence;
    AutoResize?: boolean;
    BackgroundInvisible?: boolean;
}

interface ButtonState {
    textWidth: UDim;
    buttonWidth: UDim;
}

// component
class Button extends Roact.Component<ButtonProps, ButtonState> {
    state: ButtonState = {
        textWidth: new UDim(0.9, 0),
        buttonWidth: this.props.Size.X
    };

    uiScale: Roact.Ref<UIScale> = Roact.createRef<UIScale>();
    text: Roact.Ref<TextLabel> = Roact.createRef<TextLabel>();

    init() {
        this.state = {
            textWidth: new UDim(0.9, 0),
            buttonWidth: this.props.Size.X
        };

        this.uiScale = Roact.createRef<UIScale>();
        this.text = Roact.createRef<TextLabel>();
    }

    animate(delta: number) {
        const uiScale = this.uiScale.getValue()!;

        uiScale.Scale = 1 + delta * 0.05;
    }

    render() {
        return (
            <textbutton
                Text={''}
                Position={this.props.Position}
                Size={
                    new UDim2(
                        this.state.buttonWidth.Scale,
                        this.state.buttonWidth.Offset,
                        this.props.Size.Y.Scale,
                        this.props.Size.Y.Offset
                    )
                }
                BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                BackgroundTransparency={this.props.BackgroundInvisible ? 1 : 0}
                AutoButtonColor={false}
                LayoutOrder={this.props.LayoutOrder}
                BorderSizePixel={0}
                Event={{
                    Activated: this.props.OnClick,

                    MouseEnter: () => this.animate(1),
                    MouseLeave: () => this.animate(0),
                    MouseButton1Down: () => this.animate(-1),
                    MouseButton1Up: () => this.animate(1)
                }}
            >
                <uiscale Ref={this.uiScale} Scale={1} />
                {!this.props.BackgroundInvisible && (
                    <uistroke
                        Color={Color3.fromRGB(0, 0, 0)}
                        Thickness={4}
                        ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
                        LineJoinMode={Enum.LineJoinMode.Miter}
                    />
                )}

                <Text
                    Text={this.props.Text}
                    Size={
                        new UDim2(this.state.textWidth.Scale, this.state.textWidth.Offset, 0.9, 0)
                    }
                    Position={UDim2.fromScale(0.5, 0.5)}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    TextXAlignment={Enum.TextXAlignment.Center}
                    Ref={this.text}
                />

                {this.props[Roact.Children]}
            </textbutton>
        );
    }

    protected updateTextWidth() {
        // get text
        const text = this.text.getValue()!;

        // calculate text width
        const textBoundsParams = new Instance('GetTextBoundsParams');
        textBoundsParams.Font = text.FontFace;
        textBoundsParams.Text = text.Text;
        textBoundsParams.Size = text.AbsoluteSize.Y;
        textBoundsParams.RichText = text.RichText;

        const textBounds = TextService.GetTextBoundsAsync(textBoundsParams);

        // set state
        this.setState({
            textWidth: new UDim(0, textBounds.X + 2),
            buttonWidth: this.props.BackgroundInvisible
                ? new UDim(0, textBounds.X + 2)
                : new UDim(0, (textBounds.X + 2) / 0.9 + 24)
        });
    }

    protected didMount() {
        if (this.props.AutoResize) {
            const text = this.text.getValue()!;

            (text.Changed as RBXScriptSignal).Connect(() => {
                this.updateTextWidth();
            });
            this.updateTextWidth();
        }

        const animate = (delta: number) => this.animate(delta);

        function updateVisibility(object: GuiObject | ScreenGui | Instance | undefined) {
            if (!object) return;
            if (object.IsA('GuiObject')) {
                object.GetPropertyChangedSignal('Visible').Connect(() => {
                    animate(0);
                });
                updateVisibility(object.Parent);
            } else if (object.IsA('ScreenGui')) {
                object.GetPropertyChangedSignal('Enabled').Connect(() => {
                    animate(0);
                });
                updateVisibility(object.Parent);
            }
        }

        task.spawn(() => {
            while (!this.text.getValue()) task.wait();
            while (!this.text.getValue()!.FindFirstAncestorOfClass('ScreenGui')) task.wait();
            updateVisibility(this.text.getValue()!.Parent);
        });
    }
}

export default Button;
