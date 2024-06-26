'use client';
// TabsComponent.tsx
import { useState } from 'react';

interface TabsComponentProps {
  description: string;
  technicalSheet: string;
  recommendations: string;
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  description,
  technicalSheet,
  recommendations,
}) => {
  const [activeTab, setActiveTab] = useState('descripcion');

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, tab: string) => {
    event.preventDefault();
    setActiveTab(tab);
  };

  return (
    <div className="mt-10 mb-10">
      <ul className="flex border-b justify-between">
        <li className="-mb-px mr-1">
          <a
            className="py-2 text-customRed font-bold"
            href="#"
            onClick={(event) => handleClick(event, 'descripcion')}
          >
            Descripción
          </a>
        </li>
      </ul>
      <div className="tab-content mt-4">
        {activeTab === 'descripcion' && <div>{description}</div>}
      </div>
    </div>
  );
};

export default TabsComponent;
