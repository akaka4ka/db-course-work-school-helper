import React, { useEffect, useState } from "react";

const ActionDropDown = ({ config }) => {
    const [action, isAction] = useState(true);

    useEffect(() => {
        if (!config.enabled) {
            document.getElementById("dropdownActionButton" + config.name).classList.remove("hover:bg-gray-100");
            document.getElementById("dropdownActionButton" + config.name).classList.remove("bg-white");
            document.getElementById("dropdownActionButton" + config.name).classList.add("bg-gray-100");
            document.getElementById("dropdownActionButton" + config.name).classList.add("opacity-[0.5]");
        }
    }, []);

    return (
        <div style={{ marginLeft: "15px" }}>
            <button
                disabled={!config.enabled}
                style={!config.visible && {visibility: "hidden"}}
                id={"dropdownActionButton" + config.name}
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5"
                onClick={(e) => isAction(!action)}
            >
                <span className="sr-only">Action button</span>
                Action
                <svg
                    className="ml-2 w-3 h-3"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div
                id="dropdownAction"
                className=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow absolute"
                hidden={action}
            >
                <ul
                    className="py-1 text-sm text-gray-700"
                    aria-labelledby="dropdownActionButton"
                >
                    <li>
                        <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100"
                        >
                            Reward
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100"
                        >
                            Promote
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100"
                        >
                            Activate account
                        </a>
                    </li>
                </ul>
                <div className="py-1">
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Delete User
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ActionDropDown;
