// modules
import Roact from '@rbxts/roact';

// types
type MenuProps = {
    Enabled: boolean;
    Padding?: {
        Left: UDim;
        Right: UDim;
        Top: UDim;
        Bottom: UDim;
    };
};

// component
class Menu extends Roact.Component<MenuProps> {
    render() {
        return (
            <screengui
                ResetOnSpawn={false}
                IgnoreGuiInset={true}
                Enabled={this.props.Enabled}
                ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
            >
                <frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1} BorderSizePixel={0}>
                    <uipadding
                        PaddingLeft={this.props.Padding?.Left || new UDim(0.2, 0)}
                        PaddingRight={this.props.Padding?.Right || new UDim(0.2, 0)}
                        PaddingTop={this.props.Padding?.Top || new UDim(0.2, 0)}
                        PaddingBottom={this.props.Padding?.Bottom || new UDim(0.2, 0)}
                    />

                    {this.props[Roact.Children]}
                </frame>
            </screengui>
        );
    }
}

export default Menu;
