export type Story = {
    id: number;
    title: string;
  };

export type KanbanListStruct = {
    id: number;
    title: string;
    stories: Array<Story>;
};