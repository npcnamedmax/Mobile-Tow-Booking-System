import { type AnnMsg } from "@/types";
import dayjs from "dayjs";

const anns: AnnMsg[] = [
    {
        id: "1",
        datetime: dayjs("2024-10-15T16:00:00Z"),
        title: "Announcement 1",
        message: "This is an announcement",
        priority: 1,
    },
    {
        id: "2",
        datetime: dayjs("2023-10-15T16:00:00Z"),
        title: "Announcement 2",
        message: "This is an announcement",
        priority: 2,
    },
    {
        id: "3",
        datetime: dayjs("2022-10-15T16:00:00Z"),
        title: "Announcement 3",
        message: "This is an announcement",
        priority: 3,
    },
    {
        id: "4",
        datetime: dayjs("2021-10-15T16:00:00Z"),
        title: "Announcement 4",
        message: "This is an announcement",
        priority: 4,
    },
    {
        id: "5",
        datetime: dayjs("2020-10-15T16:00:00Z"),
        title: "Announcement 5",
        message: "This is an announcement",
        priority: 5,
    },
];

export default anns;