import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import AgencyProperties from './AgencyProperties';
import AgencySettings from './AgencySettings';

const AgencyTabs = () => {

    const [key, setKey] = useState('settings');

    return (
        <div className='border'>
            <Tabs
                defaultActiveKey="properties"
                id="justify-tab-example"
                className="bg-white pt-2 px-2  "
            >
                <Tab eventKey="properties" title="Properties">
                    <AgencyProperties />
                </Tab>             
                <Tab eventKey="settings" title="Settings" >
                    <AgencySettings />
                </Tab>
            </Tabs>
        </div>
    );
}

export default AgencyTabs
