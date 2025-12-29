import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StartAndFilter from "@/components/StartAndFilter";
import TaskList from "@/components/TaskList";
import TaskListPaginaion from "@/components/TaskListPaginaion";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [completeTaskCount, setCompleteTaskCount] = useState(0);
    const [filter, setFilter] = useState("all");
    const [dateQuery, setDateQuery] = useState("today");
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTasks();
    }, [dateQuery]);

    useEffect(() => {
        setPage(1);
    }, [filter, dateQuery]);

    const fetchTasks = async () => {
        try {
            const res = await api.get(`/tasks?filter=${dateQuery}`);
            const allTasks = res.data.tasks || []; // Lấy mảng nhiệm vụ
            const activeCount = allTasks.filter(
                (t) => t.status === "Active"
            ).length;
            const completeCount = allTasks.filter(
                (t) => t.status === "Complete"
            ).length;

            setTaskBuffer(allTasks);
            setActiveTaskCount(activeCount);
            setCompleteTaskCount(completeCount);
        } catch (error) {
            console.error("Lỗi xảy ra khi truy xuất: ", error);
            toast.error("Lỗi xảy ra khi truy xuất tasks ");
        }
    };

    const handleTaskChange = () => {
        fetchTasks();
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Biến
    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case "active":
                return task.status === "Active";
            case "completed":
                return task.status === "Complete";
            default:
                return true;
        }
    });

    const visibleTasks = filteredTasks.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
    );

    if (visibleTasks.length == 0) {
        handlePrev();
    }

    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

    return (
        <div className="min-h-screen w-full relative">
            {/* Radial Gradient Background from Bottom */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
                }}
            />
            {/* Your Content/Components */}
            <div className="container pt-8 mx-auto relative z-10">
                <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                    {/* header */}
                    <Header />
                    {/* Tạo nhiệm vụ */}
                    <AddTask handleNewTaskAdded={handleTaskChange} />
                    {/* Thống kê và bộ lọc */}
                    <StartAndFilter
                        filter={filter}
                        setFilter={setFilter}
                        activeTaskCount={activeTaskCount}
                        // SỬA TÊN BÊN TRÁI: Thêm chữ 'd' để giống với component con nhận
                        completedTaskCount={completeTaskCount}
                    />
                    {/* Danh sach nhiệm vụ */}
                    <TaskList
                        filterTasks={visibleTasks}
                        filter={filter}
                        handleTaskChange={handleTaskChange}
                    />
                    {/* Phân trang và lọc theo ngày */}
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <TaskListPaginaion
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handlePageChange={handlePageChange}
                            page={page}
                            totalPages={totalPages}
                        />
                        <DateTimeFilter
                            dateQuery={dateQuery}
                            setDateQuery={setDateQuery}
                        />
                    </div>
                    {/* Footer */}
                    <Footer
                        activeTaskCount={activeTaskCount}
                        completedTaskCount={completeTaskCount}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
