import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  const [actions, setActions] = useState([]);

  const handleAction = (action) => {
    setActions((prevActions) => [...prevActions, action]);
  };

  const onDropAction = (action) => {
    setActions((prevActions) => [...prevActions, action]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-blue-100 pt-6 font-sans">
        <div className="h-screen overflow-hidden flex flex-row">
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar onAction={handleAction} />
            <MidArea actions={actions} onDropAction={onDropAction} />
          </div>
          <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea actions={actions} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
