import React from "react";
import ReusablePriorityPage from "../reusablePriority";
import { Priority } from "@/state/api";

const Medium = () => {
    return(
        <div>
            <ReusablePriorityPage priority={Priority.Medium} />
        </div>
    )
}

export default Medium