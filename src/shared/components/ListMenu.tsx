// modules
import Roact from '@rbxts/roact';

// types
type MenuProps = {
    Enabled: boolean;
    Title: string;
    ReturnToParentMenu?: () => void;
};

// components
import Button from './Button';
import Text from './Text';
import Menu from './Menu';

// component
class ListMenu extends Roact.Component<MenuProps> {
    render() {
        return (
            <Menu
                Enabled={this.props.Enabled}
                Padding={{
                    Left: new UDim(0.1, 0),
                    Right: new UDim(0.3, 0),
                    Top: new UDim(0.2, 0),
                    Bottom: new UDim(0.2, 0)
                }}
            >
                <uilistlayout
                    FillDirection={Enum.FillDirection.Vertical}
                    HorizontalAlignment={Enum.HorizontalAlignment.Left}
                    VerticalAlignment={Enum.VerticalAlignment.Center}
                    SortOrder={Enum.SortOrder.LayoutOrder}
                    Padding={new UDim(0.05, 0)}
                />
                {this.props.ReturnToParentMenu && (
                    <Button
                        Text={'&lt; Back'}
                        AutoResize={true}
                        LayoutOrder={-2}
                        BackgroundInvisible={true}
                        Size={UDim2.fromScale(1, 0.15)}
                        OnClick={this.props.ReturnToParentMenu}
                    />
                )}
                <Text Text={this.props.Title} LayoutOrder={-1} Size={UDim2.fromScale(1, 0.15)} />
                {this.props[Roact.Children]}
            </Menu>
        );
    }
}

export default ListMenu;
