
const app = new nx.ui.Application();

const initialize = () => {
    let topology = new nx.graphic.Topology({
        width: document.documentElement.clientWidth-16,
        height: document.documentElement.clientHeight-48,
        dataProcessor: 'force',
        nodeConfig: {
            label: 'model.name',
            iconType:'model.icon'
        },
        identityKey: 'id',
        showIcon: true
    });
    topology.attach(app);
    return topology
}

const setHorizontalLayout = (topology) =>{
    var layout = topology.getLayout('hierarchicalLayout');
    layout.direction('horizontal');
    layout.levelBy(function(node, model) {
        return model.get('layerSortPreference');
    });
    topology.activateLayout('hierarchicalLayout');
}

const visualize = (topology) => {
    setHorizontalLayout(topology);
    topology.data(topologyData);
}

const setElementsEventListener = (key, action, func) => {
    const all = document.querySelectorAll(key);
    console.log(all)
    for(const item of all) {
        item.addEventListener(action, (event) => { func(event) });
    }
}

const main = () => {
    topology = initialize()
    setElementsEventListener('#visualize-action', 'click', (event) => {
        visualize(topology);
    })
}
main()