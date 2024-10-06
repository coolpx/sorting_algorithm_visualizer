// modules
import Roact from '@rbxts/roact';

// components
import { Players, ReplicatedStorage } from '@rbxts/services';
import Text from 'shared/components/Text';
import Button from 'shared/components/Button';
import ListMenu from 'shared/components/ListMenu';

// types
interface MainMenuState {
    enabled: boolean;
}

// constants
const buttonData: {
    text: string;
    action: (setState: (state: Partial<MainMenuState>) => void) => void;
}[] = [
    {
        text: 'Algorithms',
        action: (setState) => {
            setState({ enabled: false });
            ReplicatedStorage.connections.setAlgorithmMenu.Fire(true);
        }
    }
];

// component
class MainMenu extends Roact.Component<{}, MainMenuState> {
    render() {
        // create buttons
        const buttons: Roact.Element[] = buttonData.map((data, index) => {
            return (
                <Button
                    Text={data.text}
                    LayoutOrder={index}
                    Size={new UDim2(0.5, 0, 0.15, 0)}
                    AutoResize={true}
                    OnClick={() => data.action((state) => this.setState(state as any))}
                />
            );
        });

        // render
        return (
            <ListMenu Enabled={this.state.enabled} Title={'Sorting Algorithm Visualizer'}>
                {buttons}
            </ListMenu>
        );
    }

    didMount() {
        ReplicatedStorage.connections.setMainMenu.Event.Connect((enabled: boolean) => {
            this.setState({ enabled });
        });
    }
}

Roact.mount(<MainMenu />, Players.LocalPlayer.WaitForChild('PlayerGui'), 'mainMenu');
