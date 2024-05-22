import { useState, useMemo } from "react";
import StatusCard from "../StatusCard/StatusCard";
import { useFetchedData } from "../../hooks/useFetchedData";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Select from 'react-select';
import { ENGINEERING, MACHINE_DOWN, MAINTANCE, statusOptions } from "../../constants";
import "./StatusGrid.scss"

const StatusGrid = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [expandAll, setExpandAll] = useState(false);
    const { data, error, loading } = useFetchedData("https://testproject-6334a-default-rtdb.firebaseio.com/tools.json/");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusChange = (selectedOptions) => {
        setSelectedStatuses(selectedOptions || []);
    };

    const toggleExpandAll = () => {
        setExpandAll(prevExpandAll => !prevExpandAll);
    };

    const filteredData = useMemo(() => {
        let filtered = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        if (selectedStatuses.length > 0) {
            filtered = filtered.filter(item => selectedStatuses.some(status => status.value === item.status));
        }
        return filtered;
    }, [data, searchQuery, selectedStatuses]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data!</p>;

    const totalTools = data.length;
    const upTools = data.filter(item => item.status === ENGINEERING).length;
    const downTools = data.filter(item => item.status === MACHINE_DOWN).length;
    const maintenanceTools = data.filter(item => item.status === MAINTANCE).length;

    return (
        <div className="status-grid">
            <div className="status-grid__header">
                <div className="status-grid__info">
                    <span className="status-grid__info-text">TOOLS ({totalTools})</span>
                    <span className="status-grid__info-up">{upTools} Up</span>
                    <span className="status-grid__info-down">{downTools} Down</span>
                    <span className="status-grid__info-maintenance">{maintenanceTools} Maint.</span>
                </div>
                <div className="status-grid__controls">
                    <button className="status-grid__button" onClick={toggleExpandAll} disabled={!expandAll}>
                        <ExpandLessIcon />
                    </button>
                    <button className="status-grid__button" onClick={toggleExpandAll} disabled={expandAll}>
                        <ExpandMoreIcon />
                    </button>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="status-grid__search"
                    />
                    <Select
                        isMulti
                        placeholder="Filter"
                        name="statuses"
                        options={statusOptions}
                        className="status-grid__select"
                        classNamePrefix="select"
                        onChange={handleStatusChange}
                    />
                </div>
            </div>
            <div className="status-grid__cards">
                {filteredData.map((item, index) => (
                    <StatusCard key={index} title={item.name} status={item.status} description={item.alert} isExpandedAll={expandAll} />
                ))}
            </div>
        </div>
    );
};

export default StatusGrid;
