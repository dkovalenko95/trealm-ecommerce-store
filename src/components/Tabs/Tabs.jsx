import React, { useState } from 'react';
import styles from './Tabs.module.css';

function TabView({ tabs = [] }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
 
  const activateTab = i => {
    setActiveTabIndex(i);
  };

  return (
    <div className={styles.TabView}>
      <div className={styles.body}>

        {/* TABS */}
        {Object.keys(tabs).length === 0 ? (
          <div className={styles.tabs}>
            <div>No Tabs</div>
          </div>
        ) : (
          <div>
            <div className={styles.tabs}>
              {tabs.map((tab, i) => (
                <label
                  key={i}
                  className={i === activeTabIndex ? `${styles['active-tab']}}` : `${styles.tab}`}
                  onClick={() => activateTab(i)}
                >
                  {tab.name}
                </label>
              ))}
            </div>

            {/* Content */}
            <div className={styles.content}>
              {tabs[activeTabIndex].content.map(item => <li key={item}>{item}</li> )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabView;

