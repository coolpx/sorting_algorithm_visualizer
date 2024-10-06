// modules
import Roact from '@rbxts/roact';

// components
import { Players, ReplicatedStorage, RunService } from '@rbxts/services';
import Button from 'shared/components/Button';
import Menu from 'shared/components/Menu';
import Text from 'shared/components/Text';
import SortingAlgorithm from 'shared/modules/SortingAlgorithm';

// types
interface AlgorithmMenuState {
    enabled: boolean;
    algorithmName: string;
    algorithm: SortingAlgorithm;
    entries: number[];
    highlight: number[];
    done: boolean;
}

// component
class AlgorithmMenu extends Roact.Component<{}, AlgorithmMenuState> {
    state = {
        enabled: false,
        algorithmName: '',
        algorithm: new SortingAlgorithm(1),
        entries: [] as number[],
        highlight: [] as number[],
        done: false
    };

    async init() {
        // set state
        this.setState({
            enabled: false,
            entries: []
        });
    }

    render() {
        // create entry frames
        const entries: Roact.Element[] = this.state.entries.map((entry, index) => {
            const special = this.state.done
                ? 'done'
                : this.state.highlight.includes(index)
                  ? 'highlight'
                  : 'none';
            return (
                <frame
                    Size={
                        new UDim2(
                            1 / this.state.entries.size(),
                            -4,
                            (entry + 1) / (this.state.entries.size() + 1),
                            0
                        )
                    }
                    LayoutOrder={index}
                    BackgroundColor3={
                        special === 'done'
                            ? Color3.fromRGB(128, 255, 128)
                            : special === 'highlight'
                              ? Color3.fromRGB(255, 128, 128)
                              : Color3.fromRGB(255, 255, 255)
                    }
                    BorderSizePixel={0}
                />
            );
        });

        // render
        return (
            <Menu
                Enabled={this.state.enabled}
                Padding={{
                    Left: new UDim(0.2, 0),
                    Right: new UDim(0.2, 0),
                    Top: new UDim(0.1, 0),
                    Bottom: new UDim(0.1, 0)
                }}
            >
                <Text
                    Text={this.state.algorithmName}
                    Size={UDim2.fromScale(1, 0.15)}
                    Position={UDim2.fromScale(0.5, 0)}
                    AnchorPoint={new Vector2(0.5, 0)}
                    TextXAlignment={Enum.TextXAlignment.Center}
                />
                <frame
                    Size={UDim2.fromScale(0.7, 0.6)}
                    Position={UDim2.fromScale(0.5, 0.5)}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    BackgroundTransparency={1}
                >
                    <uilistlayout
                        FillDirection={Enum.FillDirection.Horizontal}
                        HorizontalAlignment={Enum.HorizontalAlignment.Center}
                        VerticalAlignment={Enum.VerticalAlignment.Bottom}
                        SortOrder={Enum.SortOrder.LayoutOrder}
                        Padding={new UDim(0, 4)}
                    />
                    {entries}
                </frame>
                <frame
                    Size={UDim2.fromScale(1, 0.15)}
                    Position={UDim2.fromScale(0.5, 1)}
                    AnchorPoint={new Vector2(0.5, 1)}
                    BackgroundTransparency={1}
                >
                    <uilistlayout
                        FillDirection={Enum.FillDirection.Horizontal}
                        HorizontalAlignment={Enum.HorizontalAlignment.Center}
                        VerticalAlignment={Enum.VerticalAlignment.Center}
                        SortOrder={Enum.SortOrder.LayoutOrder}
                        Padding={new UDim(0.05, 0)}
                    />
                    <Button
                        Text={'Step'}
                        Size={UDim2.fromScale(0.5, 1)}
                        AutoResize={true}
                        OnClick={() => {
                            const iterationResult = this.state.algorithm.runIteration();
                            this.setState({
                                entries: this.state.algorithm.array,
                                highlight: iterationResult.highlight,
                                done: iterationResult.done
                            });
                        }}
                    />
                    <Button
                        Text={'Run'}
                        Size={UDim2.fromScale(0.5, 1)}
                        AutoResize={true}
                        OnClick={() => {
                            while (!this.state.done) {
                                const iterationResult = this.state.algorithm.runIteration();
                                this.setState({
                                    entries: this.state.algorithm.array,
                                    highlight: iterationResult.highlight,
                                    done: iterationResult.done
                                });
                                RunService.RenderStepped.Wait();
                            }
                        }}
                    />
                    <Button
                        Text={'Reset'}
                        Size={UDim2.fromScale(0.5, 1)}
                        AutoResize={true}
                        OnClick={() => {
                            // find algorithm
                            const algorithmModuleScript =
                                ReplicatedStorage.algorithms.FindFirstChild(
                                    this.state.algorithmName || ''
                                ) as ModuleScript;
                            if (!algorithmModuleScript) return;
                            const algorithm = new (
                                require(algorithmModuleScript) as {
                                    default: typeof SortingAlgorithm;
                                }
                            ).default(50);

                            // set state
                            this.setState({
                                algorithm,
                                entries: algorithm.array,
                                highlight: [],
                                done: false
                            });
                        }}
                    />
                </frame>
            </Menu>
        );
    }

    didMount() {
        ReplicatedStorage.connections.playAlgorithm.Event.Connect((algorithmName: string) => {
            this.setState({
                enabled: true,
                algorithmName: algorithmName
            });

            // find algorithm
            const algorithmModuleScript = ReplicatedStorage.algorithms.FindFirstChild(
                this.state.algorithmName || ''
            ) as ModuleScript;
            if (!algorithmModuleScript) return;
            const algorithm = new (
                require(algorithmModuleScript) as { default: typeof SortingAlgorithm }
            ).default(50);

            // set state
            this.setState({
                enabled: true,
                algorithm,
                entries: algorithm.array,
                highlight: [],
                done: false
            });
        });
    }
}

Roact.mount(<AlgorithmMenu />, Players.LocalPlayer.WaitForChild('PlayerGui'), 'algorithm');
