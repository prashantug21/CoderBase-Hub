'use client'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation"
import { useState } from "react"

const page = () => {
    const [data, setData] = useState();
    const username = useParams().id
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ["user", username],
        queryFn: async () => {
            const res = await fetch(`/api/userdata`, {
                method: "POST",
                body: JSON.stringify({ handle: username }),
            })
            return res.json();
        }
    })
    console.log(query.data)
    return (
        <div>

        </div>
    )
}

export default page
