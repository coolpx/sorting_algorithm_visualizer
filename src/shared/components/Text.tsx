// modules
import Roact from '@rbxts/roact';

// types
interface TextProps {
    Text: string;
    Position?: UDim2;
    Size?: UDim2;
    AnchorPoint?: Vector2;
    LayoutOrder?: number;
    TextXAlignment?: Enum.TextXAlignment;
    TextYAlignment?: Enum.TextYAlignment;
    Ref?: Roact.Ref<TextLabel>;
    Event?: Roact.JsxInstanceEvents<TextLabel>;
}

// component
class Text extends Roact.Component<TextProps> {
    render() {
        return (
            <textlabel
                Text={`<stroke thickness="2" color="#000000" joins="miter">${this.props.Text}</stroke>`}
                Position={this.props.Position}
                Size={this.props.Size}
                AnchorPoint={this.props.AnchorPoint}
                TextScaled={true}
                RichText={true}
                BackgroundTransparency={1}
                TextColor3={Color3.fromRGB(255, 255, 255)}
                FontFace={Font.fromId(12187371840)}
                LayoutOrder={this.props.LayoutOrder}
                TextXAlignment={this.props.TextXAlignment || Enum.TextXAlignment.Left}
                TextYAlignment={this.props.TextYAlignment || Enum.TextYAlignment.Center}
                Ref={this.props.Ref}
                Event={this.props.Event}
            >
                {this.props[Roact.Children]}
            </textlabel>
        );
    }
}

export default Text;
