"use client";
// TabsComponent.tsx
import { useState } from 'react';

interface TabsComponentProps {
  description: string;
  technicalSheet: string;
  recommendations: string;
}

const TabsComponent: React.FC<TabsComponentProps> = ({ description, technicalSheet, recommendations }) => {
  const [activeTab, setActiveTab] = useState('descripcion');

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, tab: string) => {
    event.preventDefault();
    setActiveTab(tab);
  };

  return (
    <div className="mt-10">
      <ul className="flex border-b justify-between">
        <li className="-mb-px mr-1">
          <a
            className={`py-2 px-4 ${
              activeTab === 'descripcion' ? 'text-blue-700 font-semibold' : 'text-blue-500 hover:text-blue-700'
            }`}
            href="#"
            onClick={(event) => handleClick(event, 'descripcion')}
          >
            Descripción
          </a>
        </li>
        <li className="mr-1">
          <a
            className={`inline-block py-2 px-4 ${
              activeTab === 'fichaTecnica' ? 'text-blue-700 font-semibold' : 'text-blue-500 hover:text-blue-700'
            }`}
            href="#"
            onClick={(event) => handleClick(event, 'fichaTecnica')}
          >
            Ficha técnica
          </a>
        </li>
        <li className="mr-1">
          <a
            className={`inline-block py-2 px-4 ${
              activeTab === 'recomendaciones' ? 'text-blue-700 font-semibold' : 'text-blue-500 hover:text-blue-700'
            }`}
            href="#"
            onClick={(event) => handleClick(event, 'recomendaciones')}
          >
            Recomendaciones
          </a>
        </li>
      </ul>
      <div className="tab-content mt-4">
        {activeTab === 'descripcion' && <div>{description}</div>}
        {activeTab === 'fichaTecnica' && <div>{technicalSheet}</div>}
        {activeTab === 'recomendaciones' && <div>{recommendations}</div>}
      </div>
    </div>
  );
};

export default TabsComponent;
