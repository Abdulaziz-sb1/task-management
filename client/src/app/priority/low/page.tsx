import React from "react";
import ReusablePriorityPage from "../reusablePriority";
import { Priority } from "@/state/api";

const Low = () => {
    return(
        <div>
            <ReusablePriorityPage priority={Priority.Low} />
        </div>
    )
}

export default Low