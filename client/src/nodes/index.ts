import type { Node, NodeTypes } from "reactflow";
import factory from "../factory.json";
import { Factory } from "../types/core-types";
import { MachineNode } from "./MachineNode";
import { GroupNode } from "./GroupNode";

function getNodesForFactory(factory: Factory): Node[] {
  const nodes = [];

  for (let [i, machine] of Object.values(factory).entries()) {
    nodes.push({
      id: machine.id,
      type: "machine",
      position: { x: 100 + 100*i, y: 100 },
      data: { machine: machine },
      style: {
        width: 350,
        height: 300,
      }
    } as Node);


    for (let [i, group] of Object.values(machine.groups).entries()) {
      console.log(group.id)
      nodes.push({
        id: group.id,
        type: "slot-group",
        position: { x: 10 + 50*i, y: 30 },
        data: { group: group },
        style: {
          width: 35 + 10 * group.slots.length,
        },
        parentId: machine.id,
        extent: "parent",
      } as Node);
    }
  }

  return nodes;
}

export const initialNodes = getNodesForFactory(factory);
export const nodeTypes = {
  "machine": MachineNode,
  "slot-group": GroupNode,
} satisfies NodeTypes;