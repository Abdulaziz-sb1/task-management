import React from "react";
import ReusablePriorityPage from "../reusablePriority";
import { Priority } from "@/state/api";

const High = () => {
    return(
        <div>
            <ReusablePriorityPage priority={Priority.High} />
        </div>
    )
}

export default High