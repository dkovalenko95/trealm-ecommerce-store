import React, { useState } from 'react';
import styles from './Tabs.module.css';

function TabView({ tabs }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  console.log(activeTabIndex)
 
  const activateTab = i => {
    setActiveTabIndex(i);
  };

  return (
    <div className={styles.tabView}>
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
                  className={i === activeTabIndex ? `${styles['active-tab']}` : `${styles.tab}`}
                  onClick={() => activateTab(i)}
                >
                  {tab.name}
                </label>
              ))}
            </div>

            {/* Content */}
            <ul className={styles.content}>
              {tabs[activeTabIndex].content.map((item, i) => <li key={i}>{item}</li> )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabView;

