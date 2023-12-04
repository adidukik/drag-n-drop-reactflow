// 'use client';

import React from 'react';
import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { shallow } from 'zustand/shallow';
import useStore from '../../store';
import { Bakbak_One } from 'next/font/google';
import { InputNode } from '../CustomNode/InputNode';
import { OutputNode } from '../CustomNode/OutputNode';
import { randomUUID } from 'crypto';

const nodeTypes = {
    inputNode: InputNode,
    outputNode: OutputNode,
};

const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

export default function Flow() {
// Using the useStore hook with the selector to get the state and actions
const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector);

const reactFlowInstance = useReactFlow();

  const onDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowInstance.project({ x: 0, y: 0 });
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.x,
        y: event.clientY - reactFlowBounds.y,
      });

      const newNode = {
        id: crypto.randomUUID(),
        type: type === 'Input' ? 'inputNode' : 'outputNode',
        position,
        data: { label: `${type}` },
      };
      useStore.getState().addNode(newNode);
    },
    [reactFlowInstance]
  );

  const onDragOver = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
return (
    <div style={{ height: 1080 }} onDrop={onDrop} onDragOver={onDragOver}>
    <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
    >
        <Background 
            color="grey"
            variant={BackgroundVariant.Dots} />
    </ReactFlow>
    </div>
);
}