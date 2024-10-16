import React from "react";
import ReusablePriorityPage from "../reusablePriority";
import { Priority } from "@/state/api";

type Props = {}

const Urgent = (props: Props) => {
    return(
        <div>
            <ReusablePriorityPage priority={Priority.Urgent} />
        </div>
    )
}

export default Urgent