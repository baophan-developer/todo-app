import {DndContext, useDraggable, useDroppable} from "@dnd-kit/core";
import "./App.css";
import {PropsWithChildren, useState} from "react";

type DroppableProps = {
	id: string | number;
};
const Droppable = (props: PropsWithChildren<DroppableProps>) => {
	const {id, children} = props;
	const {isOver, setNodeRef} = useDroppable({
		id: id,
	});

	return (
		<div
			ref={setNodeRef}
			style={{
				width: "100px",
				height: "200px",
				padding: "10px",
				background: "grey",
				color: isOver ? "green" : undefined,
			}}
		>
			{children}
		</div>
	);
};

type DraggableProps = {
	id: string | number;
};
const Draggable = (props: PropsWithChildren<DraggableProps>) => {
	const {id, children} = props;
	const {attributes, listeners, setNodeRef, transform} = useDraggable({
		id: id,
	});

	return (
		<div
			ref={setNodeRef}
			style={{
				background: "yellow",
				transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
			}}
			{...listeners}
			{...attributes}
		>
			{children}
		</div>
	);
};

type StatusType = {
	id: string | number;
	tasks: {
		id: string | number;
		children: React.ReactNode;
	}[];
};

function App() {
	const [status, setStatus] = useState<StatusType[]>([
		{
			id: "new",
			tasks: [
				{id: "1", children: "Text 1"},
				{id: "2", children: "Text 2"},
			],
		},
		{id: "inProgress", tasks: []},
		{id: "done", tasks: []},
	]);

	return (
		<DndContext
			onDragMove={(e) => {
				console.log(e);
			}}
			onDragCancel={(e) => {
				console.log(e);
			}}
			onDragEnd={(e) => {
				console.log(e);
			}}
		>
			<div style={{display: "flex", padding: "10px", gap: 10}}>
				{status.map((s, i) => (
					<Droppable key={i} id={s.id}>
						<div
							style={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								gap: "10",
							}}
						>
							{s.tasks.map((t, ic) => (
								<Draggable key={ic} id={t.id}>
									{t.children}
								</Draggable>
							))}
						</div>
					</Droppable>
				))}
			</div>
		</DndContext>
	);
}

export default App;
