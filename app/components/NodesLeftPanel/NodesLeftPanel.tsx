import React, { useState } from 'react';
import useStore from '@/app/store';
import { Button } from '@nextui-org/react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Input} from "@nextui-org/react";

const NodesLeftPanel = () => {
    const nodes = useStore((state) => state.nodes);
    const updateText = useStore((state) => state.updateText);

    const handleInputChange = (id: string, newText: string) => {
        updateText(id, newText);
    };

    return (
        <div className="grid grid-cols-1 gap-0">
        {nodes.map((node, index) => (
            <Card key={node.id} className="rounded-none">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                    <p className="text-md">{node.data.label}</p>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <Input
                        variant="bordered"
                        radius="sm"
                        label="Text"
                        value={node.data.text}
                        onChange={(e) => handleInputChange(node.id, e.target.value)}
                    />
                </CardBody>
            </Card>
        ))}
        </div>
    );
};
export default NodesLeftPanel;