import './CustomNode.css';
import { Input } from '@nextui-org/react';
import { Handle, Position } from 'reactflow';
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import useStore
 from '@/app/store';
type NodeData = {
  label: string;
};

interface CustomNodeProps {
  id: string;
  data: NodeData;
}

export const InputNode: React.FC<CustomNodeProps> = ({ id, data }) => {
  const updateText = useStore((state) => state.updateText);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateText(id, event.target.value);
  };

  return (
    <>
      <Handle 
        className="react-flow__handle"
        type="source" 
        position={Position.Right} 
        id="a" 
      />
      <Card>
      <CardHeader className="flex gap-3">
          <div className="flex flex-col">
          <p className="text-md">{data.label}</p>
          </div>
      </CardHeader>
      <Divider/>
      <CardBody>
          <Input 
            variant="bordered"
            radius="sm"
            label="Text" 
            onChange={handleInputChange}
          />
      </CardBody>
      </Card>
    </>
  );
};

// export const InputNode: React.FC<CustomNodeProps> = ({ id, data }) => {
//   return (
//     <>
//       <Handle type="source" position={Position.Right} id="a" />
//       <div className="custom-node__header">
//         {data.label}
//       </div>
//       <div className="custom-node__body">
//         <Input className="bg-white" label="Text" />
//       </div>
//     </>
//   );
// };