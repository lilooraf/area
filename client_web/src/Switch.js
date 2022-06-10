import React from "react";
import Switch from "react-switch";
import { updateUserServiceStatus } from "./Request";

const SwitchMode = ({ text, collection, state, modal }) => {

    return (
        <div className="flex justify-between space-x-5">
            <span>{text}</span>
            <Switch
                onChange={() => {updateUserServiceStatus({collection, data: {status: !state}}); modal(!state)}}
                checked={state}
                className="react-switch"
            />
        </div>
    );
};

export default SwitchMode
