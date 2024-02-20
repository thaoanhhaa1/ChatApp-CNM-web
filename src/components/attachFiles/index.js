import { useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFiles } from '~/features/attachFiles/attachFilesSlice';
import { reorder } from '~/utils';
import AttachFile from './AttachFile';
import Header from './Header';

const AttachFiles = () => {
    const { files } = useSelector((state) => state.attachFiles);
    const dispatch = useDispatch();
    const dragEl = useRef(document.getElementById('draggable'));

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = reorder(files, result.source.index, result.destination.index);

        dispatch(setFiles(items));
    };

    const optionalPortal = (styles, element) => {
        if (styles?.position === 'fixed') return createPortal(element, dragEl.current);
        return element;
    };

    return (
        <div className="flex flex-col mt-2 sm:-mr-4 pt-2 ex:pt-3 border-t border-separate dark:border-dark-separate max-h-[180px] -mb-2">
            <Header />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            className="attach-files flex overflow-x-hidden overflow-y-auto flex-wrap w-full"
                            {...provided.droppableProps}
                        >
                            {files.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) =>
                                        optionalPortal(
                                            provided.draggableProps.style,
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={provided.draggableProps.style}
                                                className="mr-2 mb-2"
                                            >
                                                <AttachFile file={item} />
                                            </div>,
                                        )
                                    }
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

AttachFiles.propTypes = {};

export default AttachFiles;
