// modules
import Roact from '@rbxts/roact';

// components
import Button from 'shared/components/Button';
import { Players, ReplicatedStorage } from '@rbxts/services';
import ListMenu from 'shared/components/ListMenu';

// types
interface AlgorithmChoiceMenuState {
    enabled: boolean;
}

// constants
const algorithms: {
    name: string;
}[] = [
    {
        name: 'Bubble'
    }
];

// component
class AlgorithmChoiceMenu extends Roact.Component<{}, AlgorithmChoiceMenuState> {
    state = {
        enabled: false
    };

    init() {
        this.setState({
            enabled: false
        });
    }

    render() {
        // create buttons
        const buttons: Roact.Element[] = algorithms.map((data, index) => {
            return (
                <Button
                    Text={data.name}
                    LayoutOrder={index}
                    Size={new UDim2(0.5, 0, 0.15, 0)}
                    AutoResize={true}
                    OnClick={() => {
                        this.setState({ enabled: false });
                        ReplicatedStorage.connections.playAlgorithm.Fire(data.name);
                    }}
                />
            );
        });

        // render
        return (
            <ListMenu
                Enabled={this.state.enabled}
                Title="Algorithms"
                ReturnToParentMenu={() => {
                    this.setState({ enabled: false });
                    ReplicatedStorage.connections.setMainMenu.Fire(true);
                }}
            >
                {buttons}
            </ListMenu>
        );
    }

    didMount() {
        ReplicatedStorage.connections.setAlgorithmMenu.Event.Connect((enabled: boolean) => {
            this.setState({ enabled });
        });
    }
}

Roact.mount(
    <AlgorithmChoiceMenu />,
    Players.LocalPlayer.WaitForChild('PlayerGui'),
    'algorithmMenu'
);
