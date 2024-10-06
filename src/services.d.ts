interface ReplicatedStorage extends Instance {
    algorithms: Folder & {
        [key: string]: ModuleScript;
    };
    connections: Folder & {
        setMainMenu: BindableEvent;
        setAlgorithmMenu: BindableEvent;
        playAlgorithm: BindableEvent;
    };
}
