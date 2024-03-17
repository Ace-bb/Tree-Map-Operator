import emergencyNode from "../components/tree/node/TreeNode.vue";
import baseLabel from '../components/tree/edgeLabel/TreeEdgeLabel.vue';

const endpointLeft = {
  id: 'left',
  orientation: [-1, 0],
  pos: [0, 0.5],
  expandArea: {
    left: 20,
    right: 20,
    top: 20,
    botton: 20
  }
};

const endpointTop = {
  id: 'top',
  orientation: [0, -1],
  pos: [0.5, 0],
  expandArea: {
    left: 20,
    right: 20,
    top: 20,
    botton: 20
  }
};

const endpointRight = {
  id: 'right',
  orientation: [1, 0],
  pos: [0, 0.5],
  expandArea: {
    left: 20,
    right: 20,
    top: 20,
    botton: 20
  }
};

const endpointButtom = {
  id: 'bottom',
  orientation: [0, 1],
  pos: [0.5, 0],
  expandArea: {
    left: 20,
    right: 20,
    top: 20,
    botton: 20
  }
};


export {
  endpointLeft,
  endpointTop,
  endpointRight,
  endpointButtom
}
export default {
  groups: [],
  nodes: [
    {
      id: '0',
      // top: 10,
      // left: 370,
      render: emergencyNode,
      endpoints: [
        endpointButtom
      ],
      nodeData: {
        Name: 'Fire Incident',
        width: 100,
      },
    },
    {
      id: '1',
      // top: 110,
      // left: 350,
      render: emergencyNode,
      endpoints: [
        endpointLeft,
        endpointTop,
        endpointRight,
        endpointButtom
      ],
      nodeData: {
        Name: 'Auto alarm activated',
      },
    },
    {
      id: '2',
      // top: 110,
      // left: 50,
      render: emergencyNode,
      endpoints: [
        endpointRight,
        endpointButtom
      ],
      nodeData: {
        Name: 'Employees manua…',
      },
    },
    {
      id: '3',
      // top: 110,
      // left: 700,
      render: emergencyNode,
      endpoints: [
        endpointLeft,
        endpointButtom
      ],
      nodeData: {
        Name: 'Actiate evacuation',
      },
    },
    {
      id: '4',
      // top: 210,
      // left: 350,
      render: emergencyNode,
      endpoints: [
        endpointLeft,
        endpointTop,
        endpointButtom
      ],
      nodeData: {
        Name: 'Alarm monitoring service…',
      },
    },
    {
      id: '5',
      // top: 210,
      // left: 50,
      render: emergencyNode,
      endpoints: [
        endpointTop,
        endpointRight,
      ],
      nodeData: {
        Name: 'Employees informs pri…',
      },
    },
    {
      id: '6',
      // top: 190,
      // left: 700,
      render: emergencyNode,
      endpoints: [
        endpointTop,
        endpointButtom
      ],
      nodeData: {
        Name: 'Evacuees report …',
      },
    },
    {
      id: '7',
      // top: 280,
      // left: 700,
      render: emergencyNode,
      endpoints: [
        endpointTop,
        endpointButtom
      ],
      nodeData: {
        Name: 'Roll call taken by …',
      },
    },
    {
      id: '8',
      // top: 370,
      // left: 700,
      render: emergencyNode,
      endpoints: [
        endpointTop,
      ],
      nodeData: {
        Name: 'Floor Marshals brief…',
      },
    },
    {
      id: '9',
      // top: 310,
      // left: 200,
      render: emergencyNode,
      endpoints: [
        endpointTop,
        endpointButtom
      ],
      nodeData: {
        Name: 'Primary contact con…',
      },
    },
    {
      id: '10',
      // top: 410,
      // left: 200,
      render: emergencyNode,
      endpoints: [
        endpointTop,
        endpointButtom
      ],
      nodeData: {
        Name: 'Primary contect infor…',
      },
    },
    {
      id: '11',
      // top: 510,
      // left: 200,
      render: emergencyNode,
      endpoints: [
        endpointTop,
      ],
      nodeData: {
        Name: 'Emergency response…',
      },
    },
    {
      id: '12',
      // top: 310,
      // left: 500,
      render: emergencyNode,
      endpoints: [
        endpointTop,
        endpointButtom
      ],
      nodeData: {
        Name: 'Primary contact fire…',
      },
    },
    {
      id: '13',
      // top: 410,
      // left: 500,
      render: emergencyNode,
      endpoints: [
        endpointTop,
        endpointButtom
      ],
      nodeData: {
        Name: 'Service Provider…',
      },
    },
    {
      id: '14',
      // top: 510,
      // left: 500,
      render: emergencyNode,
      endpoints: [
        endpointTop,
      ],
      nodeData: {
        Name: 'Fire Engines arr…',
      },
    }
    
  ],
  edges: [
    {
      id: '0.bottom-1.top',
      sourceNode: '0',
      targetNode: '1',
      source: 'bottom',
      target: 'top',
    },
    {
      id: '1.left-2.right',
      sourceNode: '1',
      targetNode: '2',
      source: 'left',
      target: 'right',
      arrowPosition: 0.7,
      render: baseLabel,
      nodeData: {
        Name: 'no'
      },
    },
    {
      id: '1.right-3.left',
      sourceNode: '1',
      targetNode: '3',
      source: 'right',
      target: 'left',
    },
    {
      id: '1.bottom-4.top',
      sourceNode: '1',
      targetNode: '4',
      source: 'bottom',
      target: 'top',
      arrowPosition: 0.8,
      render: baseLabel,
      nodeData: {
        Name: 'Yes'
      },
    },
    {
      id: '2.bottom-5.top',
      sourceNode: '2',
      targetNode: '5',
      source: 'bottom',
      target: 'top',
    },
    {
      id: '5.right-4.left',
      sourceNode: '5',
      targetNode: '4',
      source: 'right',
      target: 'left',
    },
    {
      id: '3.bottom-6.top',
      sourceNode: '3',
      targetNode: '6',
      source: 'bottom',
      target: 'top',
    },
    {
      id: '6.bottom-7.top',
      sourceNode: '6',
      targetNode: '7',
      source: 'bottom',
      target: 'top',
    },
    {
      id: '7.bottom-8.top',
      sourceNode: '7',
      targetNode: '8',
      source: 'bottom',
      target: 'top',
    },
    {
      id: '9.bottom-10.top',
      sourceNode: '9',
      targetNode: '10',
      source: 'bottom',
      target: 'top',
    },
    {
      id: '10.bottom-11.top',
      sourceNode: '10',
      targetNode: '11',
      source: 'bottom',
      target: 'top',
    },
    {
      id: '12.bottom-13.top',
      sourceNode: '12',
      targetNode: '13',
      source: 'bottom',
      target: 'top',
    },
    {
      id: '13.bottom-14.top',
      sourceNode: '13',
      targetNode: '14',
      source: 'bottom',
      target: 'top',
    },
    {
      id: '4.bottom-9.top',
      sourceNode: '4',
      targetNode: '9',
      source: 'bottom',
      target: 'top',
      shapeType: 'AdvancedBezier',
    },
    {
      id: '4.bottom-12.top',
      sourceNode: '4',
      targetNode: '12',
      source: 'bottom',
      target: 'top',
      shapeType: 'AdvancedBezier',
    }
  ],
};
